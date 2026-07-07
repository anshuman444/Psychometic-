import React from 'react';
import { Briefcase, Lightbulb, Compass, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { CareerRecommendation } from '../../../utils/career/careerRecommendationEngine';

interface CareerFitSectionProps {
  careerRecommendations: CareerRecommendation | null;
}

/** Icon color palette for ranked departments */
const RANK_COLORS = ['#2DA8FF', '#8B5CF6', '#10B981'];
const RANK_BG = ['rgba(45, 168, 255, 0.06)', 'rgba(139, 92, 246, 0.06)', 'rgba(16, 185, 129, 0.06)'];
const RANK_BORDER = ['rgba(45, 168, 255, 0.25)', 'rgba(139, 92, 246, 0.25)', 'rgba(16, 185, 129, 0.25)'];

export const CareerFitSection: React.FC<CareerFitSectionProps> = ({ careerRecommendations }) => {
  const navigate = useNavigate();

  if (!careerRecommendations || careerRecommendations.topDepartments.length === 0) {
    return null;
  }

  const { topDepartments } = careerRecommendations;

  return (
    <div className="career-fit-section">
      <h3 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.4rem' }}>
        <Lightbulb size={24} color="var(--primary)" />
        Career Insights: Your Recommended Domains
      </h3>

      <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '24px', fontSize: '1rem' }}>
        Based on your cognitive strengths, personality themes, and learning style, we have identified the
        career <strong>departments</strong> and <strong>categories</strong> where you are most likely to thrive.
        These are your ideal domains — explore them further in the Career Library.
      </p>

      {/* ── Top 3 Departments ── */}
      <div style={{ display: 'grid', gap: '16px', marginBottom: '32px' }}>
        {topDepartments.map((dept, index) => (
          <div
            key={dept.departmentId}
            onClick={() => navigate('/career-library', {
              state: {
                recommendedDepartments: topDepartments.map(d => d.departmentId),
                preSelectedDepartment: dept.departmentId,
              },
            })}
            style={{
              padding: '20px',
              background: RANK_BG[index] || 'var(--bg-card)',
              border: `1px solid ${RANK_BORDER[index] || 'var(--border-light)'}`,
              borderRadius: '14px',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              cursor: 'pointer',
              position: 'relative'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.06)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {/* Click indicator icon */}
            <div style={{ position: 'absolute', top: '20px', right: '20px', color: RANK_COLORS[index] || 'var(--text-muted)' }}>
              <ArrowRight size={20} style={{ opacity: 0.6 }} />
            </div>

            {/* Department Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px', paddingRight: '32px' }}>
              <div style={{
                width: '36px', height: '36px',
                borderRadius: '50%',
                background: RANK_COLORS[index] || 'var(--surface)',
                color: 'white',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 'bold', fontSize: '1rem',
                flexShrink: 0,
              }}>
                {index + 1}
              </div>
              <div style={{ flex: 1 }}>
                <span style={{ fontWeight: 700, fontSize: '1.15rem', color: 'var(--dark)' }}>
                  {dept.departmentName}
                </span>
                <div style={{ height: '5px', background: 'var(--surface)', borderRadius: '3px', marginTop: '6px', overflow: 'hidden' }}>
                  <div
                    style={{
                      width: `${dept.fitScore}%`,
                      height: '100%',
                      background: RANK_COLORS[index] || 'var(--text-muted)',
                      borderRadius: '3px',
                      transition: 'width 0.8s ease',
                    }}
                  />
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 'bold', color: 'var(--dark)', flexShrink: 0 }}>
                <Compass size={16} color={RANK_COLORS[index]} />
                {dept.fitScore.toFixed(0)}%
              </div>
            </div>

            {/* Categories within this department */}
            {dept.topCategories.length > 0 && (
              <div style={{ paddingLeft: '50px' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Categories you can explore
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
                  {dept.topCategories.map((cat) => (
                    <span
                      key={cat}
                      style={{
                        padding: '5px 12px',
                        background: 'var(--bg-card)',
                        border: '1px solid var(--border-light)',
                        borderRadius: '20px',
                        fontSize: '0.85rem',
                        color: 'var(--dark)',
                        fontWeight: 500,
                      }}
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>



      {/* ── Go to Career Library CTA ── */}
      <div style={{
        marginTop: '8px',
        padding: '24px',
        background: 'linear-gradient(135deg, rgba(45, 168, 255, 0.1), rgba(45, 168, 255, 0.02))',
        borderRadius: '12px',
        border: '1px solid rgba(45, 168, 255, 0.2)',
      }}>
        <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.2rem', marginBottom: '12px', color: 'var(--dark)' }}>
          <Briefcase size={20} color="var(--primary)" />
          Next Step: Explore the Career Library
        </h4>
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '16px' }}>
          Your domains are set — now explore the full Career Library to discover all the professions 
          within your recommended departments. Browse categories, search careers, and plan your path.
        </p>
        <button
          onClick={() => navigate('/career-library', {
            state: {
              recommendedDepartments: topDepartments.map(d => d.departmentId),
            },
          })}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '14px',
            borderRadius: '8px',
            fontWeight: 'bold',
            border: 'none',
            cursor: 'pointer',
            background: 'var(--primary)',
            color: 'white',
            fontSize: '1rem',
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
        >
          Go to Career Library <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};
