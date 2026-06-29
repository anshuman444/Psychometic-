/**
 * AssessmentProgress — Visual progress indicator
 * 
 * Shows completion percentage, current dimension, and estimated time remaining.
 */

import React from 'react';

interface AssessmentProgressProps {
  progress: number;        // 0-100
  currentDimension: string;
  estimatedMinutes: number;
  currentIndex: number;
  totalQuestions: number;
}

export const AssessmentProgress: React.FC<AssessmentProgressProps> = ({
  progress,
  currentDimension,
  estimatedMinutes,
  currentIndex,
  totalQuestions,
}) => {
  return (
    <div className="assessment-progress">
      <div className="assessment-progress__bar-container">
        <div
          className="assessment-progress__bar-fill"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="assessment-progress__info">
        <span className="assessment-progress__dimension">
          {currentDimension}
        </span>
        <span className="assessment-progress__meta">
          {currentIndex + 1}/{totalQuestions} • ~{estimatedMinutes} min left
        </span>
      </div>
    </div>
  );
};
