/**
 * CalculatingScreen — Animated loading screen shown while the orchestrator processes results.
 * 
 * Displays a sequence of processing steps to keep the user engaged
 * during the ~2-3 second computation.
 */

import React, { useState, useEffect } from 'react';
import { Brain, Sparkles, Target, TrendingUp, Fingerprint } from 'lucide-react';

const PROCESSING_STEPS = [
  { icon: Brain, label: 'Analyzing 22 cognitive dimensions...', delay: 0 },
  { icon: Sparkles, label: 'Calculating your Future Potential Themes...', delay: 600 },
  { icon: Target, label: 'Mapping career pathways...', delay: 1200 },
  { icon: TrendingUp, label: 'Building your growth roadmap...', delay: 1800 },
  { icon: Fingerprint, label: 'Generating your Intelligence Fingerprint...', delay: 2400 },
];

export const CalculatingScreen: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const timers = PROCESSING_STEPS.map((step, index) =>
      setTimeout(() => setActiveStep(index), step.delay)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="calculating-screen">
      <div className="calculating-screen__pulse-ring">
        <div className="calculating-screen__pulse-ring-inner" />
        <Brain size={56} strokeWidth={1.5} className="calculating-screen__icon" />
      </div>

      <h2 className="calculating-screen__title">Computing Your Intelligence Profile</h2>
      <p className="calculating-screen__subtitle">
        Processing 132 responses through our psychometric engine...
      </p>

      <div className="calculating-screen__steps">
        {PROCESSING_STEPS.map((step, index) => {
          const Icon = step.icon;
          const isActive = index <= activeStep;
          return (
            <div
              key={index}
              className={`calculating-screen__step ${isActive ? 'calculating-screen__step--active' : ''}`}
            >
              <Icon size={18} />
              <span>{step.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
