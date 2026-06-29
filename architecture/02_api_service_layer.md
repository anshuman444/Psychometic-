# Architecture Spec: 02 API Service Layer

## Objective
Define the TypeScript interfaces and API contracts that act as the bridge between the React frontend, the Intelligence Engines, and the JSON-first Supabase backend.

## 1. Type Safety & JSON Schemas

Since we are using `JSONB` in the database, the TypeScript layer must strictly enforce the shapes of these objects before they are written.

```typescript
// src/data/intelligence/schemas.ts

export interface DimensionScoresJSON {
  version: "1.0";
  dimensions: Array<{
    id: string; // e.g., "DIM_PERS_01"
    rawScore: number;
    normalizedScore: number;
    tier: 'low' | 'medium' | 'high';
  }>;
}

export interface ThemeScoresJSON {
  version: "1.0";
  themes: Array<{
    id: string; // e.g., "THEME_INNOVATOR"
    score: number;
    rankPosition: number;
  }>;
}

export interface CareerScoresJSON {
  version: "1.0";
  clusters: Array<{
    clusterId: string;
    fitScore: number;
    recommendedRoles: string[];
  }>;
}
```

## 2. API Contracts (Supabase RPCs / Edge Functions)

To keep the frontend thin and secure, complex psychometric aggregations should run securely on the server/edge before being saved to the database.

### Endpoint: `POST /api/assessments/submit`
*   **Trigger:** Called when the student finishes the 132-question assessment.
*   **Payload:** Array of 132 `questionId` and `rawValue` responses.
*   **Execution Flow:**
    1.  Validates payload.
    2.  Invokes `scoringEngine.ts` to generate `dimension_scores_json`.
    3.  Invokes `themeEngine.ts`, `readinessEngine.ts`, and `successEngine.ts`.
    4.  Invokes `careerFitEngine.ts`.
    5.  Saves the aggregated outputs to the `assessment_results` table in a single transaction.

### Endpoint: `POST /api/reports/generate`
*   **Trigger:** Called automatically after assessment submission, or manually triggered by a student requesting their 30-page PDF.
*   **Execution Flow:**
    1.  Fetches `assessment_results`.
    2.  Invokes `reportDataAssembler.ts` to build the `FullReportPayload`.
    3.  Passes payload to the Node.js PDF generation service (e.g., Puppeteer).
    4.  Uploads PDF buffer to Supabase Storage bucket `reports`.
    5.  Saves the `FullReportPayload` as `report_json` and the storage URL as `pdf_url` into the `reports` table.

## 3. Data Fetching Strategy (Frontend)

The frontend uses standard Supabase SDK calls to retrieve these large JSON blobs, but abstracts them behind custom hooks to ensure components remain clean.

```typescript
// src/hooks/useIntelligenceProfile.ts
import { supabase } from '../supabaseClient';
import { useQuery } from '@tanstack/react-query';

export function useIntelligenceProfile(userId: string) {
  return useQuery({
    queryKey: ['assessment_results', userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('assessment_results')
        .select('*')
        .eq('user_id', userId)
        .single();
        
      if (error) throw new Error(error.message);
      
      // The frontend simply treats the JSONB columns as native typed objects
      return data; 
    }
  });
}
```
