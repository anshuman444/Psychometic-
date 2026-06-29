# Architecture Spec: 05 Scale & Migration Path

## Objective
Detail the exact migration strategy for evolving the MVP (3 tables, JSON-first) into the Enterprise Multi-Tenant Platform (21+ tables, strict relational) without data loss, system downtime, or breaking existing psychometric profiles.

## Phase 1: Current State (Lean MVP)
*   **Tables:** `users`, `assessment_results` (JSON), `reports` (JSON)
*   **Focus:** Core assessment functionality, fast UI/UX, direct to consumer/student.

## Phase 2: Relational Intelligence Extraction
*Trigger: When we need to run complex analytics across thousands of students (e.g., "What is the average Conscientiousness score of 9th graders?"). Doing this via JSONB is slow.*

1.  **Create Normalized Tables:** `assessment_dimensions`, `theme_scores`, `career_scores`.
2.  **Backfill Data:** Write a Supabase Edge Function that reads `dimension_scores_json` from `assessment_results` and inserts rows into the new normalized tables.
3.  **Update API Service:** The Scoring Engine now writes to *both* the JSON column (for fast dashboard reads) and the normalized tables (for analytics).

## Phase 3: School Deployment & Multi-Tenant Isolation
*Trigger: When VidyaLoop sells the platform to School Districts.*

1.  **Create Tenant Tables:** `schools`, `school_admins`.
2.  **Update Users Table:** Add `school_id` foreign key to `users`.
3.  **Migrate Existing Users:** Assign early beta testers to a default "VidyaLoop Global" school.
4.  **Update RLS Policies (Critical):**
    ```sql
    -- Example of new School Admin RLS policy
    CREATE POLICY "Admins can view students in their school" 
    ON public.users FOR SELECT USING (
      auth.uid() IN (SELECT id FROM school_admins WHERE school_id = users.school_id)
    );
    ```

## Phase 4: Counselor Workflows
*Trigger: When schools request internal tracking and counselor assignments.*

1.  **Create Counselor Tables:** `counselors`, `counselor_assignments`, `counselor_notes`.
2.  **Update Dashboards:** Create the Counselor Dashboard view in the frontend, leveraging the new relational mappings.

## Why this strategy works:
By starting JSON-first, the startup avoids spending months building Multi-Tenant School RLS policies before the core Assessment logic is proven. When scaling is required, PostgreSQL's JSONB capabilities make data extraction into normalized tables safe and predictable.
