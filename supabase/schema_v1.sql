-- ==============================================================================
-- VidyaLoop Psychometric Intelligence Module — Lean Schema V1
-- 
-- Design Principles:
--   1. Minimal tables (2) — optimized for fast development and simplicity
--   2. JSONB-first — complex nested outputs stored as typed JSON blobs
--   3. NO auth.users references — user_id comes from the parent VidyaLoop platform
--   4. NO RLS using auth.uid() — the parent platform manages access control
--   5. Indexed for fast dashboard reads
-- ==============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==========================================
-- 1. assessment_results
-- Stores all computed psychometric intelligence outputs from the 132-question assessment.
-- Each row = one completed assessment for one student.
-- ==========================================

CREATE TABLE public.assessment_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Foreign key to the parent platform's user system.
    -- NOT referencing auth.users — the VidyaLoop platform owns user management.
    user_id UUID NOT NULL,
    
    -- Versioning for forward compatibility
    assessment_version VARCHAR(50) NOT NULL DEFAULT '1.0.0',
    
    -- Assessment lifecycle
    status VARCHAR(20) NOT NULL DEFAULT 'completed'
        CHECK (status IN ('in_progress', 'completed', 'flagged')),
    
    -- Top-level scores (indexed for fast dashboard rendering)
    readiness_score NUMERIC(5,2) NOT NULL,
    success_score NUMERIC(5,2) NOT NULL,
    
    -- Intelligence Fingerprint hash (e.g., "VL-A4X9F2-3C")
    fingerprint_hash VARCHAR(100),
    
    -- ========================================
    -- JSONB Intelligence Blobs
    -- Each blob is a typed, versioned JSON object.
    -- See src/data/intelligence/schemas.ts for TypeScript type safety.
    -- ========================================
    
    -- 22 Dimension Scores: { version, dimensions: [{ id, rawScore, normalizedScore, tier }] }
    dimension_scores JSONB NOT NULL,
    
    -- 12 Theme Scores: { version, themes: [{ id, name, score, rankPosition }] }
    theme_scores JSONB NOT NULL,
    
    -- Career Cluster Fit: { version, clusters: [{ clusterId, fitScore, recommendedRoles }] }
    career_scores JSONB NOT NULL,
    
    -- Top Strengths: [{ id, score }]
    strengths JSONB NOT NULL,
    
    -- Hidden Strengths: [{ id, score }]
    hidden_strengths JSONB NOT NULL,
    
    -- Blind Spots / Growth Areas: [{ id, score }]
    blind_spots JSONB NOT NULL,
    
    -- Motivation Profile: { primary, secondary }
    motivation_profile JSONB NOT NULL,
    
    -- 365-Day Growth Roadmap: { 30_DAYS: {...}, 90_DAYS: {...}, ... }
    roadmap JSONB NOT NULL,
    
    -- Raw 132 question responses for auditing and re-scoring
    raw_responses JSONB NOT NULL,
    
    -- Quality control metrics: { isStraightLined, isSpeedCompleted, consistencyScore }
    quality_metrics JSONB,
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Performance indexes
CREATE INDEX idx_assessment_results_user_id ON public.assessment_results(user_id);
CREATE INDEX idx_assessment_results_created ON public.assessment_results(created_at DESC);
-- GIN index for querying into JSONB (e.g., find students by top theme)
CREATE INDEX idx_assessment_results_themes ON public.assessment_results USING GIN (theme_scores);


-- ==========================================
-- 2. reports
-- Stores the fully assembled 30-page report payload and PDF artifact reference.
-- ==========================================

CREATE TABLE public.reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Foreign key to parent platform user
    user_id UUID NOT NULL,
    
    -- Links to the specific assessment this report was generated from
    assessment_result_id UUID NOT NULL 
        REFERENCES public.assessment_results(id) ON DELETE CASCADE,
    
    -- The fully assembled 30-page data payload (FullReportPayload)
    report_json JSONB NOT NULL,
    
    -- URL to the generated static PDF in Supabase Storage (or external CDN)
    pdf_url VARCHAR(1024),
    
    -- Report versioning
    report_version VARCHAR(50) NOT NULL DEFAULT '1.0.0',
    
    generated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Performance indexes
CREATE INDEX idx_reports_user_id ON public.reports(user_id);
CREATE INDEX idx_reports_assessment ON public.reports(assessment_result_id);
