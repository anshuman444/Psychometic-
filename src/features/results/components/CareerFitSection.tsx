import React from 'react';
import { Briefcase, TrendingUp, Lightbulb, Compass, ArrowRight } from 'lucide-react';

interface CareerScore {
  clusterId: string;
  fitScore: number;
}

interface CareerFitSectionProps {
  careerScores: CareerScore[];
}

/** Readable cluster names */
const CLUSTER_NAMES: Record<string, string> = {
  TECH_ENGINEERING: 'Technology & Engineering',
  SCIENCE_RESEARCH: 'Science & Research',
  BUSINESS_MANAGEMENT: 'Business & Management',
  CREATIVE_ARTS: 'Creative Arts & Design',
  HEALTH_MEDICINE: 'Health & Medicine',
  EDUCATION_TRAINING: 'Education & Training',
  LAW_GOVERNANCE: 'Law & Governance',
  SOCIAL_IMPACT: 'Social Impact & NPO',
  MEDIA_COMMUNICATION: 'Media & Communication',
  FINANCE_ANALYTICS: 'Finance & Analytics',
};

export const CareerFitSection: React.FC<CareerFitSectionProps> = ({ careerScores }) => {
  const topCareers = careerScores.slice(0, 5);

  if (topCareers.length === 0) {
    return null;
  }

  return (
    <div className="career-fit-section">
      <h3 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.4rem' }}>
        <Lightbulb size={24} color="var(--primary)" />
        Career Insights: Choosing Your Path
      </h3>
      
      <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '24px', fontSize: '1rem' }}>
        Based on our deep understanding of your cognitive strengths, personality themes, and learning style, we have synthesized these powerful insights into recommended career clusters. These recommendations answer the core question of <strong>"what career should I choose?"</strong> and serve as the perfect starting point for your journey into our Career Library.
      </p>

      <div className="career-fit-section__list" style={{ display: 'grid', gap: '12px' }}>
        {topCareers.map((career, index) => {
          const name = CLUSTER_NAMES[career.clusterId] || career.clusterId;
          const isTop = index === 0;
          return (
            <div
              key={career.clusterId}
              className={`career-fit-item ${isTop ? 'career-fit-item--top' : ''}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '16px',
                background: isTop ? 'rgba(45, 168, 255, 0.05)' : 'var(--bg-card)',
                border: `1px solid ${isTop ? 'var(--primary)' : 'var(--border-light)'}`,
                borderRadius: '12px',
                gap: '16px'
              }}
            >
              <div className="career-fit-item__rank" style={{
                width: '32px', height: '32px', 
                borderRadius: '50%', background: isTop ? 'var(--primary)' : 'var(--surface)',
                color: isTop ? 'white' : 'var(--dark)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold'
              }}>
                {index + 1}
              </div>
              <div className="career-fit-item__info" style={{ flex: 1 }}>
                <span className="career-fit-item__name" style={{ fontWeight: 600, fontSize: '1.1rem', color: 'var(--dark)' }}>
                  {name}
                </span>
                <div className="career-fit-item__bar" style={{ height: '6px', background: 'var(--surface)', borderRadius: '3px', marginTop: '8px', overflow: 'hidden' }}>
                  <div
                    className="career-fit-item__bar-fill"
                    style={{ width: `${career.fitScore}%`, height: '100%', background: isTop ? 'var(--primary)' : 'var(--text-muted)' }}
                  />
                </div>
              </div>
              <div className="career-fit-item__score" style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 'bold', color: 'var(--dark)' }}>
                <Compass size={16} color="var(--primary)" />
                {career.fitScore.toFixed(0)}% Match
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: '32px', padding: '24px', background: 'linear-gradient(135deg, rgba(45, 168, 255, 0.1), rgba(45, 168, 255, 0.02))', borderRadius: '12px', border: '1px solid rgba(45, 168, 255, 0.2)' }}>
        <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.2rem', marginBottom: '12px', color: 'var(--dark)' }}>
          <Briefcase size={20} color="var(--primary)" />
          Next Step: The Career Library
        </h4>
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '16px' }}>
          Now that you have a deep understanding of your ideal career directions, it's time to validate and explore. Head over to the Career Library to take specialized course tests for your recommended clusters.
        </p>
        <button className="btn-primary" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '14px', borderRadius: '8px', fontWeight: 'bold', border: 'none', cursor: 'pointer', background: 'var(--primary)', color: 'white' }}>
          Explore Recommended Courses <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};
