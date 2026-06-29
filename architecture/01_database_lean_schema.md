# Architecture Spec: 01 Database Lean Schema (JSON-First)

## Objective
Implement Version 1 of the VidyaLoop Psychometric Intelligence Platform using a minimal 3-table Supabase/PostgreSQL schema. By leveraging `JSONB` for deeply nested intelligence objects, we prioritize extreme development velocity, eliminate initial migration friction, and maintain low database operational costs while securely supporting 1,000+ early users.

## Execution Requirements
*   **Database:** Supabase (PostgreSQL)
*   **Authentication:** Supabase Auth (`auth.users`)
*   **Storage Strategy:** JSON-First schema for complex nested outputs (Themes, Dimensions, Roadmaps).
*   **Future Proofing:** Do NOT normalize psychometric domains in V1. Normalization will occur in V2 using database migrations.

---

## 1. `users` Table
Stores the application-level user profile, extending the base `auth.users`.

```sql
CREATE TABLE public.users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    role VARCHAR(50) DEFAULT 'student', -- Enum: student, parent, counselor, admin
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Policies
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read own profile" ON public.users 
    FOR SELECT USING (auth.uid() = id);
```

## 2. `assessment_results` Table
Stores the mathematical outcomes and intelligence generation outputs of the 132-question assessment.

```sql
CREATE TABLE public.assessment_results (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    assessment_version VARCHAR(50) NOT NULL DEFAULT '1.0.0',
    
    -- High-Level Scores (Indexed for fast dashboard rendering)
    readiness_score NUMERIC(5,2) NOT NULL,
    success_score NUMERIC(5,2) NOT NULL,
    
    -- JSONB Intelligence Blobs
    dimension_scores_json JSONB NOT NULL,
    theme_scores_json JSONB NOT NULL,
    career_scores_json JSONB NOT NULL,
    strengths_json JSONB NOT NULL,
    hidden_strengths_json JSONB NOT NULL,
    growth_areas_json JSONB NOT NULL,
    roadmap_json JSONB NOT NULL,
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Performance Indexing
CREATE INDEX idx_assessment_user_id ON public.assessment_results(user_id);
-- Index into JSONB to quickly find a student's top theme without loading the whole object
CREATE INDEX idx_top_theme ON public.assessment_results USING GIN (theme_scores_json); 

-- RLS Policies
ALTER TABLE public.assessment_results ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Students can read own assessment results" ON public.assessment_results 
    FOR SELECT USING (auth.uid() = user_id);
```

## 3. `reports` Table
Handles the storage, versioning, and PDF artifact mapping for the 30-page Intelligence Reports.

```sql
CREATE TABLE public.reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    assessment_result_id UUID NOT NULL REFERENCES public.assessment_results(id) ON DELETE CASCADE,
    
    -- Fully assembled 30-page data payload and narrative blobs
    report_json JSONB NOT NULL,
    
    -- URL to the generated static asset in Supabase Storage
    pdf_url VARCHAR(1024),
    
    report_version VARCHAR(50) NOT NULL DEFAULT '1.0.0',
    generated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Performance Indexing
CREATE INDEX idx_reports_user_id ON public.reports(user_id);

-- RLS Policies
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Students can read own reports" ON public.reports 
    FOR SELECT USING (auth.uid() = user_id);
```

---

## Migration Warning 
Do **NOT** add tables for `schools` or `counselor_assignments` at this stage. Stick strictly to this MVP setup to unblock the frontend and intelligence engine engineering.
