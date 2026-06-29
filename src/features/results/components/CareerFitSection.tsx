/**
 * CareerFitSection — Ranked career clusters with fit scores
 */

import React from 'react';
import { Briefcase, TrendingUp } from 'lucide-react';

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
      <h3 className="card-title">
        <Briefcase size={20} />
        Career Pathway Fit
      </h3>
      <div className="career-fit-section__list">
        {topCareers.map((career, index) => {
          const name = CLUSTER_NAMES[career.clusterId] || career.clusterId;
          const isTop = index === 0;
          return (
            <div
              key={career.clusterId}
              className={`career-fit-item ${isTop ? 'career-fit-item--top' : ''}`}
            >
              <div className="career-fit-item__rank">#{index + 1}</div>
              <div className="career-fit-item__info">
                <span className="career-fit-item__name">{name}</span>
                <div className="career-fit-item__bar">
                  <div
                    className="career-fit-item__bar-fill"
                    style={{ width: `${career.fitScore}%` }}
                  />
                </div>
              </div>
              <div className="career-fit-item__score">
                <TrendingUp size={14} />
                {career.fitScore.toFixed(1)}%
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
