/**
 * ThemeCards — Top 3 Future Potential Themes with descriptions and learning style
 */

import React from 'react';
import { Award, Lightbulb, BookOpen } from 'lucide-react';

interface ThemeData {
  id: string;
  name: string;
  description: string;
  score: number;
  rank: number;
  coreStrengths: string[];
  learningStyle: string;
}

interface ThemeCardsProps {
  themes: ThemeData[];
}

const RANK_COLORS = ['#FFD700', '#C0C0C0', '#CD7F32']; // Gold, Silver, Bronze

export const ThemeCards: React.FC<ThemeCardsProps> = ({ themes }) => {
  const top3 = themes.slice(0, 3);

  return (
    <div className="theme-cards">
      <h3 className="card-title">Your Future Potential Themes</h3>
      <div className="theme-cards__grid">
        {top3.map((theme, index) => (
          <div key={theme.id} className={`theme-card theme-card--rank-${index + 1}`}>
            <div className="theme-card__rank-badge" style={{ backgroundColor: RANK_COLORS[index] }}>
              <Award size={16} />
              #{theme.rank}
            </div>
            <h4 className="theme-card__name">{theme.name}</h4>
            <p className="theme-card__description">{theme.description}</p>
            <div className="theme-card__score-bar">
              <div className="theme-card__score-fill" style={{ width: `${theme.score}%` }} />
              <span className="theme-card__score-value">{Math.round(theme.score)}%</span>
            </div>

            {theme.coreStrengths.length > 0 && (
              <div className="theme-card__section">
                <div className="theme-card__section-header">
                  <Lightbulb size={14} />
                  <span>Core Strengths</span>
                </div>
                <div className="theme-card__tags">
                  {theme.coreStrengths.map((s, i) => (
                    <span key={i} className="theme-card__tag">{s}</span>
                  ))}
                </div>
              </div>
            )}

            {theme.learningStyle && (
              <div className="theme-card__section">
                <div className="theme-card__section-header">
                  <BookOpen size={14} />
                  <span>Learning Style</span>
                </div>
                <p className="theme-card__learning-style">{theme.learningStyle}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
