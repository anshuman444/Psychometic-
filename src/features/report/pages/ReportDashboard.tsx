import React from 'react';
import { ReadinessGauge } from '../components/ReadinessGauge';
import { IntelligenceRadar } from '../components/IntelligenceRadar';
import { ThemeBadge } from '../components/ThemeBadge';
import { VidyaLoopBrandingProfile } from '../../../utils/branding/brandingProfile';

export const ReportDashboard: React.FC = () => {
  const { colors } = VidyaLoopBrandingProfile;

  // Mock data for MVP implementation verification
  const mockRadarData = [
    { subject: 'Cognitive', A: 85, fullMark: 100 },
    { subject: 'Personality', A: 70, fullMark: 100 },
    { subject: 'Learning', A: 90, fullMark: 100 },
    { subject: 'Motivation', A: 75, fullMark: 100 },
    { subject: 'Work Style', A: 60, fullMark: 100 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-8 font-sans">
      <header className="mb-10 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight" style={{ color: colors.textPrimary }}>
            Intelligence Report
          </h1>
          <p className="mt-2 text-gray-500">Alex Student • Grade 10 • Generated Today</p>
        </div>
        <img src={VidyaLoopBrandingProfile.logoUrl} alt="VidyaLoop Logo" className="h-10" />
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        
        {/* Left Column: Top Themes & Readiness */}
        <div className="lg:col-span-1 space-y-8">
          <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-6" style={{ color: colors.textPrimary }}>Your Top Themes</h2>
            <div className="flex flex-col gap-4 items-start">
              <ThemeBadge themeName="The Strategist" rank={1} />
              <ThemeBadge themeName="The Problem Solver" rank={2} />
              <ThemeBadge themeName="The Innovator" rank={3} />
            </div>
          </section>

          <section>
            <ReadinessGauge score={82} />
          </section>
        </div>

        {/* Right Column: Radar Chart */}
        <div className="lg:col-span-2">
          <IntelligenceRadar data={mockRadarData} title="Psychometric Profile Map" />
        </div>

      </div>
    </div>
  );
};
