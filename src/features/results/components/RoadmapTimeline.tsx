/**
 * RoadmapTimeline — Visual 30 → 90 → 180 → 365 day milestone timeline
 */

import React from 'react';
import { Calendar, Target, Rocket, Star } from 'lucide-react';

interface RoadmapTimelineProps {
  roadmap: Record<string, any>;
}

const TIMEFRAME_CONFIG = [
  { key: '30_DAYS', label: '30 Days', subtitle: 'Quick Wins', icon: Target, color: '#4ECDC4' },
  { key: '90_DAYS', label: '90 Days', subtitle: 'Build Momentum', icon: Calendar, color: '#2DA8FF' },
  { key: '180_DAYS', label: '180 Days', subtitle: 'Deep Growth', icon: Rocket, color: '#FFE66D' },
  { key: '365_DAYS', label: '365 Days', subtitle: 'Transformation', icon: Star, color: '#FF6B6B' },
];

export const RoadmapTimeline: React.FC<RoadmapTimelineProps> = ({ roadmap }) => {
  if (!roadmap || Object.keys(roadmap).length === 0) {
    return null;
  }

  return (
    <div className="roadmap-timeline">
      <h3 className="card-title">
        <Rocket size={20} />
        Your Growth Roadmap
      </h3>
      <div className="roadmap-timeline__track">
        {TIMEFRAME_CONFIG.map((tf, index) => {
          const data = roadmap[tf.key];
          if (!data) return null;

          const Icon = tf.icon;
          return (
            <div key={tf.key} className="roadmap-timeline__node">
              <div className="roadmap-timeline__connector">
                <div
                  className="roadmap-timeline__dot"
                  style={{ backgroundColor: tf.color }}
                >
                  <Icon size={16} />
                </div>
                {index < TIMEFRAME_CONFIG.length - 1 && (
                  <div className="roadmap-timeline__line" />
                )}
              </div>
              <div className="roadmap-timeline__content">
                <div className="roadmap-timeline__header">
                  <h4>{tf.label}</h4>
                  <span className="roadmap-timeline__subtitle">{tf.subtitle}</span>
                </div>
                <p className="roadmap-timeline__focus">{data.focus || data.description}</p>
                {data.milestones && data.milestones.length > 0 && (
                  <ul className="roadmap-timeline__milestones">
                    {data.milestones.map((m: string, i: number) => (
                      <li key={i}>{m}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
