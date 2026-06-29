/**
 * ProfileInfographics — Visual summary infographics for the psychometric report.
 * 
 * Contains:
 * 1. Cluster Averages — Horizontal bar chart for 6 category clusters
 * 2. Tier Distribution — Donut chart showing High/Medium/Low breakdown
 * 3. Score Spectrum — All 22 dimensions as a sorted horizontal bar visualization
 */

import React from 'react';
import { BarChart3, PieChart, TrendingUp, Award, AlertTriangle, Zap } from 'lucide-react';

interface Dimension {
  id: string;
  name: string;
  category: string;
  normalizedScore: number;
  tier: 'low' | 'medium' | 'high';
}

interface ProfileInfographicsProps {
  dimensions: Dimension[];
  readinessScore: number;
  successIndex: number;
}

const CATEGORY_COLORS: Record<string, string> = {
  Personality: '#FF6B6B',
  Cognitive: '#4ECDC4',
  Learning: '#F59E0B',
  Motivation: '#8B5CF6',
  'Work Style': '#EC4899',
  Interests: '#2DA8FF',
};

const CATEGORY_ORDER = ['Personality', 'Cognitive', 'Learning', 'Motivation', 'Work Style', 'Interests'];

// ─── SVG Donut Chart ───
const DonutChart: React.FC<{
  high: number; medium: number; low: number; total: number;
}> = ({ high, medium, low, total }) => {
  const size = 160;
  const strokeWidth = 22;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;

  const highPct = high / total;
  const medPct = medium / total;
  const lowPct = low / total;

  const highDash = highPct * circumference;
  const medDash = medPct * circumference;
  const lowDash = lowPct * circumference;

  const highOffset = 0;
  const medOffset = -highDash;
  const lowOffset = -(highDash + medDash);

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* Low segment */}
      <circle
        cx={center} cy={center} r={radius}
        stroke="#EF4444" strokeWidth={strokeWidth} fill="none"
        strokeDasharray={`${lowDash} ${circumference - lowDash}`}
        strokeDashoffset={lowOffset}
        transform={`rotate(-90 ${center} ${center})`}
        strokeLinecap="round"
      />
      {/* Medium segment */}
      <circle
        cx={center} cy={center} r={radius}
        stroke="#F59E0B" strokeWidth={strokeWidth} fill="none"
        strokeDasharray={`${medDash} ${circumference - medDash}`}
        strokeDashoffset={medOffset}
        transform={`rotate(-90 ${center} ${center})`}
        strokeLinecap="round"
      />
      {/* High segment */}
      <circle
        cx={center} cy={center} r={radius}
        stroke="#10B981" strokeWidth={strokeWidth} fill="none"
        strokeDasharray={`${highDash} ${circumference - highDash}`}
        strokeDashoffset={highOffset}
        transform={`rotate(-90 ${center} ${center})`}
        strokeLinecap="round"
      />
      {/* Center text */}
      <text x={center} y={center - 6} textAnchor="middle" dominantBaseline="central"
        fontSize="28" fontWeight="800" fill="var(--dark)">
        {total}
      </text>
      <text x={center} y={center + 16} textAnchor="middle" dominantBaseline="central"
        fontSize="10" fontWeight="600" fill="var(--text-muted)">
        DIMENSIONS
      </text>
    </svg>
  );
};

export const ProfileInfographics: React.FC<ProfileInfographicsProps> = ({
  dimensions, readinessScore, successIndex,
}) => {

  // ─── Compute Cluster Averages ───
  const clusterData = CATEGORY_ORDER.map(cat => {
    const dims = dimensions.filter(d => d.category === cat);
    const avg = dims.length > 0
      ? Math.round(dims.reduce((s, d) => s + d.normalizedScore, 0) / dims.length)
      : 0;
    return { category: cat, avg, count: dims.length, color: CATEGORY_COLORS[cat] || '#999' };
  }).filter(c => c.count > 0);

  // ─── Compute Tier Distribution ───
  const highCount = dimensions.filter(d => d.tier === 'high').length;
  const medCount = dimensions.filter(d => d.tier === 'medium').length;
  const lowCount = dimensions.filter(d => d.tier === 'low').length;

  // ─── Top & Bottom 5 dimensions ───
  const sorted = [...dimensions].sort((a, b) => b.normalizedScore - a.normalizedScore);
  const top5 = sorted.slice(0, 5);
  const bottom5 = sorted.slice(-5).reverse();

  // Overall average
  const overallAvg = Math.round(dimensions.reduce((s, d) => s + d.normalizedScore, 0) / dimensions.length);

  return (
    <div className="infographics">
      <h3 className="card-title">
        <BarChart3 size={20} color="var(--primary)" />
        Profile Snapshot &amp; Infographics
      </h3>
      <p className="infographics__subtitle">
        A visual summary of your performance across all 22 dimensions — at a glance.
      </p>

      {/* ── Row 1: Key Metrics ── */}
      <div className="infographics__metrics-row">
        <div className="infographics__metric-card">
          <div className="infographics__metric-icon" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#059669' }}>
            <TrendingUp size={20} />
          </div>
          <div>
            <span className="infographics__metric-label">Overall Average</span>
            <span className="infographics__metric-value">{overallAvg}%</span>
          </div>
        </div>
        <div className="infographics__metric-card">
          <div className="infographics__metric-icon" style={{ background: 'rgba(45, 168, 255, 0.1)', color: '#0D8BFF' }}>
            <Award size={20} />
          </div>
          <div>
            <span className="infographics__metric-label">Readiness Score</span>
            <span className="infographics__metric-value">{readinessScore}%</span>
          </div>
        </div>
        <div className="infographics__metric-card">
          <div className="infographics__metric-icon" style={{ background: 'rgba(139, 92, 246, 0.1)', color: '#7c3aed' }}>
            <Zap size={20} />
          </div>
          <div>
            <span className="infographics__metric-label">Success Index</span>
            <span className="infographics__metric-value">{successIndex}%</span>
          </div>
        </div>
        <div className="infographics__metric-card">
          <div className="infographics__metric-icon" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#DC2626' }}>
            <AlertTriangle size={20} />
          </div>
          <div>
            <span className="infographics__metric-label">Areas to Develop</span>
            <span className="infographics__metric-value">{lowCount}</span>
          </div>
        </div>
      </div>

      {/* ── Row 2: Cluster Bars + Tier Donut ── */}
      <div className="infographics__charts-row">
        {/* Cluster Averages */}
        <div className="infographics__chart-card infographics__chart-card--bars">
          <h4 className="infographics__chart-title">
            <BarChart3 size={16} />
            Cluster Performance
          </h4>
          <div className="infographics__bars">
            {clusterData.map(c => (
              <div key={c.category} className="infographics__bar-row">
                <div className="infographics__bar-label">
                  <span className="infographics__bar-dot" style={{ backgroundColor: c.color }} />
                  <span>{c.category}</span>
                </div>
                <div className="infographics__bar-track">
                  <div
                    className="infographics__bar-fill"
                    style={{ width: `${c.avg}%`, backgroundColor: c.color }}
                  />
                </div>
                <span className="infographics__bar-value">{c.avg}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tier Distribution Donut */}
        <div className="infographics__chart-card infographics__chart-card--donut">
          <h4 className="infographics__chart-title">
            <PieChart size={16} />
            Tier Distribution
          </h4>
          <div className="infographics__donut-wrap">
            <DonutChart high={highCount} medium={medCount} low={lowCount} total={dimensions.length} />
            <div className="infographics__donut-legend">
              <div className="infographics__legend-item">
                <span className="infographics__legend-dot" style={{ backgroundColor: '#10B981' }} />
                <span>Strong</span>
                <strong>{highCount}</strong>
              </div>
              <div className="infographics__legend-item">
                <span className="infographics__legend-dot" style={{ backgroundColor: '#F59E0B' }} />
                <span>Moderate</span>
                <strong>{medCount}</strong>
              </div>
              <div className="infographics__legend-item">
                <span className="infographics__legend-dot" style={{ backgroundColor: '#EF4444' }} />
                <span>Developing</span>
                <strong>{lowCount}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Row 3: Top 5 & Bottom 5 ── */}
      <div className="infographics__charts-row">
        <div className="infographics__chart-card">
          <h4 className="infographics__chart-title infographics__chart-title--green">
            <Award size={16} />
            Top 5 Strengths
          </h4>
          <div className="infographics__rank-list">
            {top5.map((d, i) => (
              <div key={d.id} className="infographics__rank-item">
                <span className="infographics__rank-num infographics__rank-num--green">{i + 1}</span>
                <div className="infographics__rank-info">
                  <span className="infographics__rank-name">{d.name}</span>
                  <div className="infographics__rank-bar-track">
                    <div
                      className="infographics__rank-bar-fill infographics__rank-bar-fill--green"
                      style={{ width: `${d.normalizedScore}%` }}
                    />
                  </div>
                </div>
                <span className="infographics__rank-score infographics__rank-score--green">{Math.round(d.normalizedScore)}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="infographics__chart-card">
          <h4 className="infographics__chart-title infographics__chart-title--red">
            <AlertTriangle size={16} />
            Top 5 Growth Areas
          </h4>
          <div className="infographics__rank-list">
            {bottom5.map((d, i) => (
              <div key={d.id} className="infographics__rank-item">
                <span className="infographics__rank-num infographics__rank-num--red">{i + 1}</span>
                <div className="infographics__rank-info">
                  <span className="infographics__rank-name">{d.name}</span>
                  <div className="infographics__rank-bar-track">
                    <div
                      className="infographics__rank-bar-fill infographics__rank-bar-fill--red"
                      style={{ width: `${d.normalizedScore}%` }}
                    />
                  </div>
                </div>
                <span className="infographics__rank-score infographics__rank-score--red">{Math.round(d.normalizedScore)}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
