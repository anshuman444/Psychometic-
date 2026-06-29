/**
 * ScoreRings — Dual circular progress rings for Readiness + Success scores
 */

import React from 'react';

interface ScoreRingsProps {
  readinessScore: number;
  successIndex: number;
}

const ProgressRing: React.FC<{ score: number; label: string; color: string }> = ({ score, label, color }) => {
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="score-ring">
      <svg width="160" height="160" viewBox="0 0 160 160">
        <circle
          cx="80" cy="80" r={radius}
          stroke="var(--border-light)"
          strokeWidth="10"
          fill="none"
        />
        <circle
          cx="80" cy="80" r={radius}
          stroke={color}
          strokeWidth="10"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform="rotate(-90 80 80)"
          className="score-ring__arc"
        />
        <text x="80" y="75" textAnchor="middle" className="score-ring__value">
          {Math.round(score)}
        </text>
        <text x="80" y="98" textAnchor="middle" className="score-ring__unit">
          / 100
        </text>
      </svg>
      <span className="score-ring__label">{label}</span>
    </div>
  );
};

export const ScoreRings: React.FC<ScoreRingsProps> = ({ readinessScore, successIndex }) => {
  return (
    <div className="score-rings-container">
      <ProgressRing score={readinessScore} label="Future Readiness Score" color="var(--primary)" />
      <ProgressRing score={successIndex} label="Future Success Index" color="var(--accent)" />
    </div>
  );
};
