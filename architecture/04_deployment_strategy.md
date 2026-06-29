# Architecture Spec: 04 Deployment Strategy

## Objective
Define the Vercel + Supabase deployment pipeline optimized for fast iteration, low cost, and high availability for the Lean MVP (targeting 100-1,000 active users initially, scaling to 100k+).

## 1. Environment Strategy

We will maintain three strict environments to protect production data while allowing rapid MVP iteration.

| Environment | Frontend Hosting | Backend Database | Purpose |
| :--- | :--- | :--- | :--- |
| **Local** | `localhost:5173` (Vite) | Supabase Local CLI | Rapid prototyping, UI component development. |
| **Preview** | Vercel Preview URLs | Supabase Staging Project | Feature branch testing, QA, internal team review. |
| **Production** | Vercel Production (`vidyaloop.com`) | Supabase Production Project | Live student assessments. Strict access controls. |

## 2. CI/CD Pipeline (GitHub -> Vercel)

1.  **Branching Model:** Trunk-based development. Engineers branch off `main` for features (`feat/assessment-ui`).
2.  **Pull Request:** Opening a PR triggers a Vercel Preview Build.
3.  **Quality Gates:**
    *   TypeScript compilation check (`tsc --noEmit`).
    *   ESLint / Oxlint check.
    *   Unit tests for Intelligence Engines (critical).
4.  **Merge:** Merging to `main` triggers a Vercel Production Build.

## 3. Caching & Performance

*   **Vercel Edge Caching:** Static assets (CSS, JS, generic dashboard wrappers) are cached at the Vercel Edge Network.
*   **Supabase Query Optimization:** Because we are using the JSON-First strategy (`assessment_results` table), we avoid heavy SQL joins. Fetching a user's entire psychometric profile is a single row `SELECT * FROM assessment_results WHERE user_id = X`, ensuring < 50ms latency.
*   **Lazy Loading PDF Engine:** The heavy dependencies required for PDF generation (e.g., `jspdf` or `html2canvas`) must be lazy-loaded using dynamic imports (`import()`) only when the user clicks "Download Report", keeping the initial Assessment UI bundle size incredibly small.

## 4. Monitoring & Error Tracking

*   **Frontend Errors:** Sentry is integrated into the React Error Boundary. If a visualization component crashes due to bad data, the boundary catches it and reports to Sentry.
*   **Database Analytics:** Supabase built-in analytics monitor API request latency and Postgres CPU usage.
