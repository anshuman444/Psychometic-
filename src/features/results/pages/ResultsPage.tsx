/**
 * ResultsPage — Full psychometric results dashboard
 * 
 * Displays all computed intelligence data:
 * - Readiness + Success scores (circular rings)
 * - Intelligence Fingerprint radar chart
 * - Top 3 Themes
 * - 22-Dimension breakdown
 * - Strengths, Blind Spots, Hidden Strengths, Motivation
 * - Career Fit rankings
 * - Growth Roadmap (30/90/180/365 day)
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, Tooltip
} from 'recharts';
import { Sparkles, Download, Fingerprint, RefreshCw } from 'lucide-react';
import { useCurrentUser } from '../../../lib/PlatformContext';
import { useAssessmentResults } from '../hooks/useAssessmentResults';
import { ScoreRings } from '../components/ScoreRings';
import { DimensionBreakdown } from '../components/DimensionBreakdown';
import { ThemeCards } from '../components/ThemeCards';
import { CareerFitSection } from '../components/CareerFitSection';
import { RoadmapTimeline } from '../components/RoadmapTimeline';
import { StrengthsBlindSpots } from '../components/StrengthsBlindSpots';
import { ProfileInfographics } from '../components/ProfileInfographics';
import { ThemeConstellation } from '../components/ThemeConstellation';
import { CareerAffinityChart } from '../components/CareerAffinityChart';
import { HeadVsHeartGauge } from '../components/HeadVsHeartGauge';

import { useState } from 'react';
import { exportReportToPDF } from '../../../utils/report/pdfEngine';

export const ResultsPage: React.FC = () => {
  const { user } = useCurrentUser();
  const navigate = useNavigate();
  const { loading, displayData, hasResults, error } = useAssessmentResults();
  const [isExporting, setIsExporting] = useState(false);

  const handleDownload = async () => {
    if (!displayData) return;
    try {
      setIsExporting(true);
      await exportReportToPDF('report-dashboard', user.name);
    } catch (err) {
      console.error('Failed to export PDF', err);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  if (loading) {
    return (
      <div className="results-page results-page--loading">
        <div className="results-loading-spinner" />
        <p>Loading your intelligence profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="results-page results-page--error">
        <h2>Unable to load results</h2>
        <p>{error}</p>
        <button className="btn btn-primary" onClick={() => navigate('/assessment')}>
          Take Assessment
        </button>
      </div>
    );
  }

  if (!hasResults || !displayData) {
    return (
      <div className="results-page results-page--empty">
        <div className="results-empty">
          <Sparkles size={56} strokeWidth={1.5} />
          <h2>No Assessment Results Yet</h2>
          <p>Complete the psychometric assessment to discover your Intelligence Fingerprint.</p>
          <button className="btn btn-primary" onClick={() => navigate('/assessment')}>
            <Sparkles size={18} />
            Start Assessment
          </button>
        </div>
      </div>
    );
  }

  // Build radar chart data from dimensions
  const radarData = displayData.dimensions.map(d => ({
    subject: d.name,
    score: d.normalizedScore,
    fullMark: 100,
  }));

  return (
    <div className="results-page relative" id="report-dashboard">
      {/* Logo */}
      <div className="absolute top-6 left-6 z-10 hidden sm:block">
        <img src="/logo.png" alt="VidyaLoop" style={{ height: '32px', width: 'auto' }} className="object-contain" />
      </div>

      {/* Hero Header */}
      <header className="results-page__header" data-pdf-block="true">
        <div>
          <h1>
            <Sparkles size={28} color="var(--primary)" />
            Welcome to Your Future, {user.name}
          </h1>
          <p className="text-lg">
            Your Intelligence Fingerprint:{' '}
            <code className="results-page__fingerprint-hash">{displayData.fingerprintHash}</code>
          </p>
        </div>
        <div className="results-page__actions">
          <button className="btn btn-secondary" onClick={() => navigate('/assessment')} disabled={isExporting}>
            <RefreshCw size={16} />
            Retake
          </button>
          <button className="btn btn-primary" onClick={handleDownload} disabled={isExporting}>
            <Download size={16} />
            {isExporting ? 'Generating PDF...' : 'Download Report'}
          </button>
        </div>
      </header>

      {/* Score Rings */}
      <section className="results-section" data-pdf-block="true">
        <ScoreRings
          readinessScore={displayData.readinessScore}
          successIndex={displayData.successIndex}
        />
      </section>

      {/* Intelligence Fingerprint Radar */}
      <section className="results-section" data-pdf-block="true">
        <div className="card results-radar-card">
          <h3 className="card-title">
            <Fingerprint size={20} color="var(--primary)" />
            Intelligence Fingerprint — 22 Dimensions
          </h3>
          <div className="results-radar-container">
            <ResponsiveContainer width="100%" height={420}>
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                <PolarGrid stroke="var(--border-light)" />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={{ fill: 'var(--text-muted)', fontSize: 10 }}
                />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar
                  name="Your Score"
                  dataKey="score"
                  stroke="var(--accent)"
                  strokeWidth={2}
                  fill="var(--primary)"
                  fillOpacity={0.15}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: '8px',
                    border: '1px solid var(--border-light)',
                    boxShadow: 'var(--shadow-subtle)',
                    fontSize: '0.875rem',
                  }}
                  formatter={(value: unknown) => [`${Math.round(Number(value))}%`, 'Score']}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Theme Constellation & Cards */}
      <section className="results-section" data-pdf-block="true">
        <ThemeConstellation themes={displayData.themes} />
      </section>

      <section className="results-section" data-pdf-block="true">
        <div className="card">
          <ThemeCards themes={displayData.themes} />
        </div>
      </section>

      {/* Profile Infographics & Balance Gauge */}
      <section className="results-section" data-pdf-block="true">
        <div className="card">
          <HeadVsHeartGauge dimensions={displayData.dimensions} />
          <ProfileInfographics
            dimensions={displayData.dimensions}
            readinessScore={displayData.readinessScore}
            successIndex={displayData.successIndex}
          />
        </div>
      </section>

      {/* Strengths, Blind Spots, Motivation */}
      <section className="results-section" data-pdf-block="true">
        <div className="card">
          <StrengthsBlindSpots
            strengths={displayData.topStrengths}
            blindSpots={displayData.blindSpots}
            hiddenStrengths={displayData.hiddenStrengths}
            motivationProfile={displayData.motivationProfile}
          />
        </div>
      </section>

      {/* Dimension Breakdown */}
      <section className="results-section">
        <div className="card">
          <DimensionBreakdown dimensions={displayData.dimensions} />
        </div>
      </section>



      {/* Career Fit & Affinity Distribution */}
      <section className="results-section" data-pdf-block="true">
        <div className="card">
          <CareerFitSection careerRecommendations={displayData.careerRecommendations} />
          <CareerAffinityChart 
            careerRecommendations={displayData.careerRecommendations} 
            allCareerScores={displayData.careerScores} 
          />
        </div>
      </section>

      {/* Growth Roadmap */}
      <section className="results-section" data-pdf-block="true">
        <div className="card">
          <RoadmapTimeline roadmap={displayData.roadmap} />
        </div>
      </section>


    </div>
  );
};
