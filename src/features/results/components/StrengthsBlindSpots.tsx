/**
 * StrengthsBlindSpots — Side-by-side display of strengths vs blind spots + hidden strengths
 */

import React from 'react';
import { Zap, AlertTriangle, Eye } from 'lucide-react';

interface DimensionItem {
  id: string;
  name: string;
  score: number;
}

interface StrengthsBlindSpotsProps {
  strengths: DimensionItem[];
  blindSpots: DimensionItem[];
  hiddenStrengths: DimensionItem[];
  motivationProfile: { primary: string; secondary: string };
}

export const StrengthsBlindSpots: React.FC<StrengthsBlindSpotsProps> = ({
  strengths,
  blindSpots,
  hiddenStrengths,
  motivationProfile,
}) => {
  return (
    <div className="strengths-blindspots">
      {/* Top Strengths */}
      <div className="strengths-blindspots__section strengths-blindspots__section--strengths">
        <h3 className="card-title">
          <Zap size={20} color="#4ECDC4" />
          Top Strengths
        </h3>
        <div className="strengths-blindspots__list">
          {strengths.map((s) => (
            <div key={s.id} className="strength-item strength-item--positive">
              <span className="strength-item__name">{s.name}</span>
              <span className="strength-item__score">{Math.round(s.score)}%</span>
            </div>
          ))}
          {strengths.length === 0 && (
            <p className="text-muted text-sm">Complete the assessment to see your strengths</p>
          )}
        </div>
      </div>

      {/* Blind Spots */}
      <div className="strengths-blindspots__section strengths-blindspots__section--blindspots">
        <h3 className="card-title">
          <AlertTriangle size={20} color="#FF6B6B" />
          Growth Areas
        </h3>
        <div className="strengths-blindspots__list">
          {blindSpots.map((b) => (
            <div key={b.id} className="strength-item strength-item--growth">
              <span className="strength-item__name">{b.name}</span>
              <span className="strength-item__score">{Math.round(b.score)}%</span>
            </div>
          ))}
          {blindSpots.length === 0 && (
            <p className="text-muted text-sm">No critical blind spots identified — great balance!</p>
          )}
        </div>
      </div>

      {/* Hidden Strengths */}
      {hiddenStrengths.length > 0 && (
        <div className="strengths-blindspots__section strengths-blindspots__section--hidden">
          <h3 className="card-title">
            <Eye size={20} color="#FFE66D" />
            Hidden Strengths
          </h3>
          <div className="strengths-blindspots__list">
            {hiddenStrengths.map((h) => (
              <div key={h.id} className="strength-item strength-item--hidden">
                <span className="strength-item__name">{h.name}</span>
                <span className="strength-item__score">{Math.round(h.score)}%</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Motivation Profile */}
      <div className="strengths-blindspots__section strengths-blindspots__section--motivation">
        <h3 className="card-title">Motivation DNA</h3>
        <div className="motivation-profile">
          <div className="motivation-profile__item motivation-profile__item--primary">
            <span className="motivation-profile__label">Primary Drive</span>
            <span className="motivation-profile__value">{motivationProfile.primary}</span>
          </div>
          <div className="motivation-profile__item motivation-profile__item--secondary">
            <span className="motivation-profile__label">Secondary Drive</span>
            <span className="motivation-profile__value">{motivationProfile.secondary}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
