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

import { Routes, Route, Navigate } from 'react-router-dom';
import { AssessmentPage } from './features/assessment/pages/AssessmentPage';
import { ResultsPage } from './features/results/pages/ResultsPage';
import { CareerLibraryPage } from './features/career/pages/CareerLibraryPage';
import './index.css';

export default function App() {
  return (
    <div className="psychometric-module">
      <Routes>
        <Route path="/assessment" element={<AssessmentPage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/career-library" element={<CareerLibraryPage />} />
        <Route path="/" element={<Navigate to="/assessment" replace />} />
        <Route path="*" element={<Navigate to="/assessment" replace />} />
      </Routes>
    </div>
  );
}
