import React, { useState } from 'react';
import {
  Sparkles, Brain, BookOpen, Target, Heart, Palette,
  ChevronDown, ChevronUp, TrendingUp, Zap, Lightbulb,
  Compass, Users, Flame, Shield, Eye, Puzzle, Rocket,
  GraduationCap, BarChart3, Wrench, Star
} from 'lucide-react';
import { DIMENSION_INSIGHTS } from '../../../data/intelligence/dimensionInsights';
import { DimensionInfographic } from './DimensionInfographic';

interface Dimension {
  id: string;
  name: string;
  category: string;
  description: string;
  normalizedScore: number;
  tier: 'low' | 'medium' | 'high';
}

interface DimensionBreakdownProps {
  dimensions: Dimension[];
}

// ─── Icon Mapping Per Dimension ───
const DIMENSION_ICONS: Record<string, React.ElementType> = {
  DIM_PERS_01: Compass,
  DIM_PERS_02: Target,
  DIM_PERS_03: Users,
  DIM_PERS_04: Shield,
  DIM_PERS_05: Heart,
  DIM_COG_01: Puzzle,
  DIM_COG_02: BarChart3,
  DIM_COG_03: Lightbulb,
  DIM_COG_04: Sparkles,
  DIM_LRN_01: Rocket,
  DIM_LRN_02: Wrench,
  DIM_LRN_03: Users,
  DIM_LRN_04: BookOpen,
  DIM_MOT_01: Flame,
  DIM_MOT_02: TrendingUp,
  DIM_MOT_03: Eye,
  DIM_WRK_01: Zap,
  DIM_WRK_02: Star,
  DIM_WRK_03: Compass,
  DIM_INT_01: Brain,
  DIM_INT_02: GraduationCap,
  DIM_INT_03: Palette,
};

// ─── Category Config ───
const CATEGORY_CONFIG: Record<string, { color: string; gradient: string; icon: React.ElementType; label: string }> = {
  Personality: {
    color: '#FF6B6B',
    gradient: 'linear-gradient(135deg, #FF6B6B, #ee5a6f)',
    icon: Heart,
    label: 'Personality Cluster',
  },
  Cognitive: {
    color: '#4ECDC4',
    gradient: 'linear-gradient(135deg, #4ECDC4, #44b8b0)',
    icon: Brain,
    label: 'Cognitive Cluster',
  },
  Learning: {
    color: '#F59E0B',
    gradient: 'linear-gradient(135deg, #F59E0B, #d97706)',
    icon: BookOpen,
    label: 'Learning Cluster',
  },
  Motivation: {
    color: '#8B5CF6',
    gradient: 'linear-gradient(135deg, #8B5CF6, #7c3aed)',
    icon: Flame,
    label: 'Motivation Cluster',
  },
  'Work Style': {
    color: '#EC4899',
    gradient: 'linear-gradient(135deg, #EC4899, #db2777)',
    icon: Target,
    label: 'Work Style Cluster',
  },
  Interests: {
    color: '#2DA8FF',
    gradient: 'linear-gradient(135deg, #2DA8FF, #0D8BFF)',
    icon: Palette,
    label: 'Interests Cluster',
  },
};

const TIER_CONFIG: Record<string, { label: string; emoji: string; bg: string; color: string; border: string }> = {
  high: {
    label: 'Strong',
    emoji: '🟢',
    bg: 'rgba(16, 185, 129, 0.08)',
    color: '#059669',
    border: 'rgba(16, 185, 129, 0.25)',
  },
  medium: {
    label: 'Moderate',
    emoji: '🟡',
    bg: 'rgba(245, 158, 11, 0.08)',
    color: '#D97706',
    border: 'rgba(245, 158, 11, 0.25)',
  },
  low: {
    label: 'Developing',
    emoji: '🔴',
    bg: 'rgba(239, 68, 68, 0.08)',
    color: '#DC2626',
    border: 'rgba(239, 68, 68, 0.25)',
  },
};

// ─── Circular Gauge Component ───
const CircularGauge: React.FC<{ score: number; color: string; size?: number }> = ({ score, color, size = 80 }) => {
  const radius = (size - 12) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;
  const center = size / 2;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="dim-card__gauge-svg">
      <circle
        cx={center} cy={center} r={radius}
        stroke="rgba(0,0,0,0.06)"
        strokeWidth="8"
        fill="none"
      />
      <circle
        cx={center} cy={center} r={radius}
        stroke={color}
        strokeWidth="8"
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        transform={`rotate(-90 ${center} ${center})`}
        className="dim-card__gauge-arc"
      />
      <text x={center} y={center - 2} textAnchor="middle" dominantBaseline="central"
        className="dim-card__gauge-value" fill="var(--dark)">
        {Math.round(score)}
      </text>
      <text x={center} y={center + 14} textAnchor="middle" dominantBaseline="central"
        className="dim-card__gauge-unit" fill="var(--text-muted)">
        / 100
      </text>
    </svg>
  );
};

// ─── Dimension Card Component ───
const DimensionCard: React.FC<{ dim: Dimension; categoryColor: string; index: number }> = ({ dim, categoryColor, index }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const tierConfig = TIER_CONFIG[dim.tier];
  const DimIcon = DIMENSION_ICONS[dim.id] || Sparkles;

  // Pull personalized insights from the database
  const insightData = DIMENSION_INSIGHTS[dim.id];
  const tierInsights = insightData?.[dim.tier];

  return (
    <div
      className="dim-card"
      data-pdf-block="true"
      style={{
        borderLeft: `4px solid ${categoryColor}`,
        animationDelay: `${index * 0.05}s`,
      }}
    >
      {/* ── Card Header ── */}
      <div className="dim-card__header" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="dim-card__header-left">
          <div className="dim-card__icon-wrap" style={{ backgroundColor: `${categoryColor}15`, color: categoryColor }}>
            <DimIcon size={20} />
          </div>
          <div>
            <h4 className="dim-card__name">{dim.name}</h4>
            <span className="dim-card__category-label" style={{ color: categoryColor }}>
              {dim.category}
            </span>
          </div>
        </div>
        <div className="dim-card__header-right">
          <div
            className="dim-card__tier-pill"
            style={{ backgroundColor: tierConfig.bg, color: tierConfig.color, borderColor: tierConfig.border }}
          >
            <span>{tierConfig.emoji}</span>
            <span>{tierConfig.label}</span>
          </div>
          <CircularGauge score={dim.normalizedScore} color={categoryColor} size={72} />
          <button className="dim-card__toggle" aria-label={isExpanded ? 'Collapse' : 'Expand'}>
            {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
        </div>
      </div>

      {/* ── Score Bar ── */}
      <div className="dim-card__score-bar-wrap">
        <div className="dim-card__score-bar">
          <div
            className="dim-card__score-bar-fill"
            style={{ width: `${dim.normalizedScore}%`, background: `linear-gradient(90deg, ${categoryColor}, ${categoryColor}cc)` }}
          />
        </div>
        <div className="dim-card__score-labels">
          <span>0</span>
          <span>25</span>
          <span>50</span>
          <span>75</span>
          <span>100</span>
        </div>
      </div>

      {/* ── Expandable Body ── */}
      {isExpanded && (
        <div className="dim-card__body">
          <DimensionInfographic 
            score={dim.normalizedScore} 
            tier={dim.tier} 
            categoryColor={categoryColor} 
            dimensionId={dim.id}
            insightText={tierInsights?.strengths?.[0] || 'A unique facet of your cognitive profile.'}
          />
          
          {/* 3-Column Insight Grid */}
          <div className="dim-card__insight-grid">
            {/* Strength Profile */}
            <div className="dim-card__insight dim-card__insight--strength">
              <div className="dim-card__insight-header">
                <span className="dim-card__insight-icon dim-card__insight-icon--strength">✦</span>
                <h5>Core Strength Profile</h5>
              </div>
              <ul className="dim-card__insight-list">
                {(tierInsights?.strengths || []).slice(0, 2).map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>

            {/* Growth Area */}
            <div className="dim-card__insight dim-card__insight--growth">
              <div className="dim-card__insight-header">
                <span className="dim-card__insight-icon dim-card__insight-icon--growth">◬</span>
                <h5>Key Growth Area</h5>
              </div>
              <ul className="dim-card__insight-list dim-card__insight-list--growth">
                {(tierInsights?.growth || []).slice(0, 1).map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>

            {/* Actionable Tips */}
            <div className="dim-card__insight dim-card__insight--tips">
              <div className="dim-card__insight-header">
                <span className="dim-card__insight-icon dim-card__insight-icon--tips">➤</span>
                <h5>Actionable Steps</h5>
              </div>
              <ul className="dim-card__insight-list">
                {(tierInsights?.tips || []).slice(0, 2).map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
          </div>

          {/* Mini Stats Row */}
          <div className="dim-card__stats-row">
            <div className="dim-card__stat">
              <span className="dim-card__stat-label">Your Score</span>
              <span className="dim-card__stat-value" style={{ color: categoryColor }}>{Math.round(dim.normalizedScore)}%</span>
            </div>
            <div className="dim-card__stat-divider" />
            <div className="dim-card__stat">
              <span className="dim-card__stat-label">Tier</span>
              <span className="dim-card__stat-value">{tierConfig.label}</span>
            </div>
            <div className="dim-card__stat-divider" />
            <div className="dim-card__stat">
              <span className="dim-card__stat-label">Percentile (est.)</span>
              <span className="dim-card__stat-value">
                {dim.tier === 'high' ? 'Top 15%' : dim.tier === 'medium' ? 'Middle 40%' : 'Bottom 25%'}
              </span>
            </div>
            <div className="dim-card__stat-divider" />
            <div className="dim-card__stat">
              <span className="dim-card__stat-label">Category</span>
              <span className="dim-card__stat-value">{dim.category}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Main Component ───
export const DimensionBreakdown: React.FC<DimensionBreakdownProps> = ({ dimensions }) => {
  // Group by category
  const grouped = dimensions.reduce<Record<string, Dimension[]>>((acc, dim) => {
    if (!acc[dim.category]) acc[dim.category] = [];
    acc[dim.category].push(dim);
    return acc;
  }, {});

  // Order categories in a logical sequence
  const categoryOrder = ['Personality', 'Cognitive', 'Learning', 'Motivation', 'Work Style', 'Interests'];
  const orderedEntries = categoryOrder
    .filter(cat => grouped[cat])
    .map(cat => [cat, grouped[cat]] as [string, Dimension[]]);

  return (
    <div className="dim-breakdown">
      <div className="dim-breakdown__header" data-pdf-block="true">
        <div className="dim-breakdown__header-text">
          <h3 className="card-title">
            <Brain size={22} color="var(--primary)" />
            Detailed 22-Dimension Intelligence Profile
          </h3>
          <p className="dim-breakdown__subtitle">
            Your comprehensive, personalized breakdown across all 22 psychometric dimensions.
            Each dimension has been deeply analyzed based on your unique responses to provide
            targeted strengths, growth areas, and actionable advice tailored specifically to your score.
          </p>
        </div>
        <div className="dim-breakdown__total-badge">
          <span className="dim-breakdown__total-count">{dimensions.length}</span>
          <span className="dim-breakdown__total-label">Dimensions<br/>Analyzed</span>
        </div>
      </div>

      {orderedEntries.map(([category, dims]) => {
        const config = CATEGORY_CONFIG[category] || { color: '#2DA8FF', gradient: 'linear-gradient(135deg, #2DA8FF, #0D8BFF)', icon: Sparkles, label: category };
        const avgScore = Math.round(dims.reduce((s, d) => s + d.normalizedScore, 0) / dims.length);
        const CatIcon = config.icon;

        return (
          <div key={category} className="dim-category">
            {/* Category Banner */}
            <div className="dim-category__banner" data-pdf-block="true" style={{ background: config.gradient }}>
              <div className="dim-category__banner-left">
                <div className="dim-category__banner-icon">
                  <CatIcon size={22} />
                </div>
                <div>
                  <h3 className="dim-category__banner-title">{config.label}</h3>
                  <span className="dim-category__banner-count">{dims.length} Dimensions</span>
                </div>
              </div>
              <div className="dim-category__banner-right">
                <span className="dim-category__banner-avg-label">Cluster Average</span>
                <span className="dim-category__banner-avg-value">{avgScore}%</span>
              </div>
            </div>

            {/* Dimension Cards */}
            <div className="dim-category__cards">
              {dims.map((dim, index) => (
                <DimensionCard key={dim.id} dim={dim} categoryColor={config.color} index={index} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};
