/**
 * App — Root component with React Router
 * 
 * Routes:
 *   /assessment → AssessmentPage (132-question flow)
 *   /results    → ResultsPage (full dashboard)
 *   /           → Redirect based on assessment status
 * 
 * No auth routes — authentication is managed by the parent VidyaLoop platform.
 */

import { Routes, Route } from 'react-router-dom';
import { AssessmentPage } from './features/assessment/pages/AssessmentPage';
import { ResultsPage } from './features/results/pages/ResultsPage';
import { CareerLibraryPage } from './features/career/pages/CareerLibraryPage';
import { LandingPage } from './features/landing/pages/LandingPage';
import './index.css';

export default function App() {
  return (
    <div className="psychometric-module">
      <Routes>
        <Route path="/assessment" element={<AssessmentPage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/career-library" element={<CareerLibraryPage />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </div>
  );
}
