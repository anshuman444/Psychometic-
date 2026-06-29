# Architecture Spec: 03 Frontend Architecture

## Objective
Define the precise React/Vite frontend structure required to support the massive Intelligence Platform. To manage the complexity of the Assessment flow (132 questions) and the 30-page Report dashboards, we use a strictly enforced **Feature-Based Architecture**.

## 1. Top-Level Folder Structure

```text
src/
├── app/                  # Application root, Context providers, global error boundaries
├── components/           # Generic, reusable UI (Buttons, Cards, Modals) - No business logic
├── features/             # Feature-based domains (Assessment, Intelligence, Report, Dashboard)
├── layouts/              # Structural layouts (DashboardLayout, AssessmentLayout)
├── lib/                  # Third-party integrations (Supabase client, Recharts setup)
├── routes/               # React Router definitions
├── types/                # Global TypeScript definitions
└── utils/                # Global utilities (Formatting, general math)
```

## 2. Feature-Based Architecture

Every major psychometric component operates as a self-contained "Feature". This prevents the `components/` folder from becoming a massive dumping ground.

### 2.1 Assessment Feature (`src/features/assessment/`)
Handles the 132-question flow.
*   **`components/`:** `QuestionCard`, `ProgressRing`, `ReverseScoreWarning`.
*   **`hooks/`:** `useAssessmentState` (Handles fast local state for the 132 questions to prevent rendering lag).
*   **`utils/`:** `straightLineDetector.ts` (Runs Quality Control locally before submission).

### 2.2 Intelligence Feature (`src/features/intelligence/`)
Contains the core psychometric logic that we built earlier.
*   **`components/`:** `IntelligenceFingerprint`, `ThemeBadge`, `CareerClusterCard`.
*   **`hooks/`:** `useIntelligenceProfile` (Fetches the massive JSONB blobs from Supabase).
*   **`utils/`:** `normalizationEngine.ts`, `themeEngine.ts`, `careerFitEngine.ts`.
*   **`data/`:** `themes.json`, `questions.json`.

### 2.3 Report Feature (`src/features/report/`)
Handles the 30-page report rendering and PDF assembly.
*   **`components/`:** `RadarVisualization`, `ReadinessGauge`, `ExecutiveSummaryView`.
*   **`hooks/`:** `useReportDataResolver` (Maps the global payload to the specific page).
*   **`utils/`:** `reportDataAssembler.ts`, `pageRendererEngine.ts`.

## 3. State Management Strategy

*   **Global State (React Query):** Used strictly for asynchronous data fetching from Supabase (e.g., loading the user's report history).
*   **Feature State (Zustand or Context):** Used for the active 132-question assessment session. This state must be lightning-fast and persist to `localStorage` every 5 questions to prevent data loss if the student's browser crashes.
*   **Local State (useState):** Used for UI-only toggles (e.g., opening a modal).

## 4. Route Structure

```typescript
const routes = [
  { path: '/login', element: <AuthPage /> },
  { 
    path: '/dashboard', 
    element: <DashboardLayout />, 
    children: [
      { path: 'student', element: <StudentDashboard /> },
      { path: 'reports', element: <ReportListView /> },
      { path: 'reports/:id', element: <ReportViewer /> }
    ]
  },
  { 
    path: '/assessment', 
    element: <AssessmentLayout />, 
    children: [
      { path: 'intro', element: <AssessmentIntro /> },
      { path: 'active', element: <ActiveAssessment /> },
      { path: 'calculating', element: <CalculationScreen /> }
    ]
  }
]
```
