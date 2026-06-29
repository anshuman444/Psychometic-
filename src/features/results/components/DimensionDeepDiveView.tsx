import React, { useState } from 'react';
import { DimensionNarrativeEngine } from '../../../utils/report/narratives/dimensionNarrativeEngine';
import dimensionsPart1 from '../../../data/dimensions_part1.json';
import { useCurrentUser } from '../../../lib/PlatformContext';
import { 
  BookOpen, Brain, Briefcase, Users, Target,
  Info, Star, Compass, Lightbulb
} from 'lucide-react';

interface DimensionDeepDiveViewProps {
  dimensions: {
    id: string;
    normalizedScore: number;
    rawScore: number;
    tier: 'low' | 'medium' | 'high';
  }[];
}

const renderMarkdown = (text: string) => {
  if (!text) return null;
  return text.split('\n\n').map((paragraph, i) => {
    const parts = paragraph.split(/(\*\*.*?\*\*)/g);
    return (
      <p key={i} style={{ marginBottom: '1.25rem', lineHeight: 1.7, margin: i === 0 ? '0 0 1.25rem 0' : '1.25rem 0' }}>
        {parts.map((part, j) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={j} style={{ color: '#0f172a', fontWeight: 700 }}>{part.slice(2, -2)}</strong>;
          }
          return <React.Fragment key={j}>{part}</React.Fragment>;
        })}
      </p>
    );
  });
};

export const DimensionDeepDiveView: React.FC<DimensionDeepDiveViewProps> = ({ dimensions }) => {
  const { user } = useCurrentUser();
  const [selectedDimId, setSelectedDimId] = useState<string | null>(null);

  // Filter to only dimensions we have deep dive data for (currently part 1)
  const availableDefs = dimensionsPart1 as any[];
  const dimDefsMap = new Map(availableDefs.map(d => [d.id, d]));
  
  const supportedDimensions = dimensions.filter(d => dimDefsMap.has(d.id));

  if (supportedDimensions.length === 0) {
    return null; // No enriched dimensions to show yet
  }

  // Set first dimension as selected by default if none selected
  const activeDimId = selectedDimId || supportedDimensions[0].id;
  
  const activeScore = supportedDimensions.find(d => d.id === activeDimId);
  const activeDef = dimDefsMap.get(activeDimId);

  if (!activeScore || !activeDef) return null;

  // Generate the deep dive content dynamically
  const deepDive = DimensionNarrativeEngine.generateDimensionDeepDive(
    activeDef, 
    { dimensionId: activeScore.id, score: activeScore.rawScore || 15, tier: activeScore.tier },
    activeScore.normalizedScore,
    user.name
  );

  return (
    <div className="dimension-deep-dive-view" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div className="card">
        <h3 className="card-title" style={{ fontSize: '1.5rem', marginBottom: '1rem', display: 'flex', alignItems: 'center' }}>
          <BookOpen size={24} color="var(--primary)" style={{ marginRight: '0.5rem' }} />
          Dimension Deep Dives
        </h3>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
          Explore the comprehensive, multi-page analysis for each of your cognitive dimensions. 
          Select a dimension below to read its full deep dive.
        </p>

        {/* Dimension Selector */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
          {supportedDimensions.map(d => {
            const def = dimDefsMap.get(d.id);
            const isSelected = d.id === activeDimId;
            return (
              <button
                key={d.id}
                onClick={() => setSelectedDimId(d.id)}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '9999px',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  border: 'none',
                  transition: 'all 0.2s',
                  backgroundColor: isSelected ? 'var(--primary)' : 'var(--bg-card-alt)',
                  color: isSelected ? 'white' : 'var(--text-secondary)',
                  boxShadow: isSelected ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none'
                }}
              >
                {def?.name || d.id}
              </button>
            );
          })}
        </div>

        {/* Deep Dive Content Container */}
        <div style={{ backgroundColor: 'white', borderRadius: '1rem', border: '1px solid var(--border-light)', overflow: 'hidden' }} data-pdf-block="true">
          
          {/* Header */}
          <div style={{ background: 'linear-gradient(to right, #1e293b, #0f172a)', padding: '2rem', color: 'white' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span style={{ color: '#93c5fd', fontWeight: 600, letterSpacing: '0.05em', fontSize: '0.875rem', textTransform: 'uppercase', marginBottom: '0.5rem', display: 'block' }}>
                  {deepDive.category} Cluster
                </span>
                <h2 style={{ fontSize: '2.25rem', fontWeight: 'bold', margin: '0 0 0.5rem 0' }}>{deepDive.dimensionName}</h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1rem' }}>
                  <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '0.5rem', padding: '0.5rem 1rem', backdropFilter: 'blur(4px)' }}>
                    <span style={{ display: 'block', color: 'rgba(255,255,255,0.7)', fontSize: '0.75rem', textTransform: 'uppercase' }}>Score</span>
                    <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{Math.round(deepDive.normalizedScore)}/100</span>
                  </div>
                  <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '0.5rem', padding: '0.5rem 1rem', backdropFilter: 'blur(4px)' }}>
                    <span style={{ display: 'block', color: 'rgba(255,255,255,0.7)', fontSize: '0.75rem', textTransform: 'uppercase' }}>Tier</span>
                    <span style={{ fontSize: '1.25rem', fontWeight: 600, textTransform: 'capitalize' }}>{deepDive.tier}</span>
                  </div>
                </div>
              </div>
              <Brain size={64} style={{ opacity: 0.2 }} />
            </div>
          </div>

          <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            
            {/* Score Interpretation */}
            <section>
              <h4 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', display: 'flex', alignItems: 'center', color: '#1e293b' }}>
                <Info style={{ marginRight: '0.5rem', color: '#3b82f6' }} size={20} />
                Understanding Your Score
              </h4>
              <div style={{ color: '#475569', backgroundColor: '#f8fafc', padding: '2rem', borderRadius: '0.75rem' }}>
                {renderMarkdown(deepDive.scoreInterpretation)}
              </div>
            </section>

            {/* Did You Know */}
            <section style={{ backgroundColor: '#fffbeb', border: '1px solid #fef3c7', borderRadius: '0.5rem', padding: '1.5rem' }}>
              <h4 style={{ fontWeight: 'bold', color: '#92400e', marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>
                <Lightbulb style={{ marginRight: '0.5rem' }} size={18} />
                Did You Know?
              </h4>
              <p style={{ color: '#78350f', margin: 0, lineHeight: 1.6 }}>{deepDive.didYouKnow}</p>
            </section>

            {/* Detailed Analysis */}
            <section>
              <h4 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', display: 'flex', alignItems: 'center', color: '#1e293b' }}>
                <Brain style={{ marginRight: '0.5rem', color: '#a855f7' }} size={20} />
                Psychometric Analysis
              </h4>
              <div style={{ color: '#334155' }}>
                {renderMarkdown(deepDive.detailedAnalysis)}
              </div>
            </section>

            {/* 2-Column Section */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
              {/* Academic Implications */}
              <section style={{ backgroundColor: 'rgba(239, 246, 255, 0.5)', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid #dbeafe' }}>
                <h4 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', color: '#1e3a8a' }}>
                  <BookOpen style={{ marginRight: '0.5rem', color: '#2563eb' }} size={18} />
                  Academic Impact
                </h4>
                <p style={{ color: '#334155', lineHeight: 1.6, margin: 0 }}>{deepDive.academicImplications}</p>
              </section>

              {/* Social Dynamics */}
              <section style={{ backgroundColor: 'rgba(236, 253, 245, 0.5)', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid #d1fae5' }}>
                <h4 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', color: '#064e3b' }}>
                  <Users style={{ marginRight: '0.5rem', color: '#059669' }} size={18} />
                  Social Dynamics
                </h4>
                <p style={{ color: '#334155', lineHeight: 1.6, margin: 0 }}>{deepDive.socialDynamics}</p>
              </section>
            </div>

            {/* Behavioral Indicators */}
            <section>
              <h4 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', display: 'flex', alignItems: 'center', color: '#1e293b' }}>
                <Target style={{ marginRight: '0.5rem', color: '#ef4444' }} size={20} />
                How This Shows Up in Real Life
              </h4>
              <ul style={{ padding: 0, margin: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {deepDive.behavioralIndicators.map((behavior, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '0.5rem' }}>
                    <div style={{ backgroundColor: 'white', padding: '0.25rem', borderRadius: '9999px', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)', marginRight: '1rem', marginTop: '0.125rem' }}>
                      <Star size={14} style={{ color: '#eab308' }} />
                    </div>
                    <span style={{ color: '#334155', lineHeight: 1.5 }}>{behavior}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Career & Growth */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
              <section>
                <h4 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', color: '#1e293b' }}>
                  <Briefcase style={{ marginRight: '0.5rem', color: '#6366f1' }} size={18} />
                  Career Connections
                </h4>
                <p style={{ color: '#334155', lineHeight: 1.6, margin: 0 }}>{deepDive.careerConnections}</p>
              </section>
              
              <section>
                <h4 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', color: '#1e293b' }}>
                  <Compass style={{ marginRight: '0.5rem', color: '#14b8a6' }} size={18} />
                  Growth Strategies
                </h4>
                <ul style={{ margin: 0, paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', color: '#334155' }}>
                  {deepDive.growthStrategies.map((strategy, idx) => (
                    <li key={idx} style={{ lineHeight: 1.6 }}>{strategy}</li>
                  ))}
                </ul>
              </section>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
