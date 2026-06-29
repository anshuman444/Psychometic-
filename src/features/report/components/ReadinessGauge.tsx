import React from 'react';
import { VidyaLoopBrandingProfile } from '../../../utils/branding/brandingProfile';

interface ReadinessGaugeProps {
  score: number;
}

export const ReadinessGauge: React.FC<ReadinessGaugeProps> = ({ score }) => {
  const { colors } = VidyaLoopBrandingProfile;
  
  // Calculate stroke dash array for a semi-circle gauge
  const radius = 60;
  const circumference = radius * Math.PI;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  let statusColor = colors.primary;
  let statusText = 'Emerging';
  if (score >= 65) { statusColor = colors.secondary; statusText = 'Strong'; }
  if (score >= 85) { statusColor = colors.accent; statusText = 'Exceptional'; }

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold mb-4" style={{ color: colors.textPrimary }}>Future Readiness</h3>
      
      <div className="relative w-40 h-24 overflow-hidden flex items-end justify-center">
        <svg className="w-full h-full" viewBox="0 0 140 70">
          {/* Background Arc */}
          <path
            d="M 10 70 A 60 60 0 0 1 130 70"
            fill="none"
            stroke={colors.background}
            strokeWidth="12"
            strokeLinecap="round"
          />
          {/* Foreground Score Arc */}
          <path
            d="M 10 70 A 60 60 0 0 1 130 70"
            fill="none"
            stroke={statusColor}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute bottom-0 text-3xl font-bold" style={{ color: statusColor }}>
          {score}
        </div>
      </div>
      
      <p className="mt-4 text-sm font-medium uppercase tracking-wider" style={{ color: colors.textSecondary }}>
        {statusText} Profile
      </p>
    </div>
  );
};
