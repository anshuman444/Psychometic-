import React from 'react';
import { Brain, Heart } from 'lucide-react';
import type { DisplayData } from '../hooks/useAssessmentResults';

interface HeadVsHeartGaugeProps {
  dimensions: DisplayData['dimensions'];
}

export const HeadVsHeartGauge: React.FC<HeadVsHeartGaugeProps> = ({ dimensions }) => {
  // We classify certain clusters as "Head" (Cognitive, Learning) and "Heart" (Personality, Motivation, Interests)
  const headDims = dimensions.filter(d => ['Cognitive', 'Learning'].includes(d.category));
  const heartDims = dimensions.filter(d => ['Personality', 'Motivation', 'Interests'].includes(d.category));

  const headAvg = headDims.length ? headDims.reduce((acc, d) => acc + d.normalizedScore, 0) / headDims.length : 0;
  const heartAvg = heartDims.length ? heartDims.reduce((acc, d) => acc + d.normalizedScore, 0) / heartDims.length : 0;

  const total = headAvg + heartAvg;
  // If no data, default to 50/50
  const headPct = total > 0 ? (headAvg / total) * 100 : 50;
  const heartPct = total > 0 ? (heartAvg / total) * 100 : 50;

  return (
    <div style={{
      padding: '24px',
      background: 'var(--bg-card)',
      border: '1px solid var(--border-light)',
      borderRadius: '16px',
      marginTop: '24px',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    }}>
      <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.2rem', margin: 0, color: 'var(--dark)' }}>
        <Brain size={20} color="#3B82F6" />
        Head vs. Heart Balance
        <Heart size={20} color="#EC4899" style={{ marginLeft: '4px' }} />
      </h4>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', margin: 0 }}>
        A high-level view of how your logical/cognitive traits (Head) balance against your emotional/interpersonal traits (Heart).
      </p>

      <div style={{ position: 'relative', height: '24px', width: '100%', borderRadius: '12px', overflow: 'hidden', display: 'flex', marginTop: '12px' }}>
        <div style={{
          width: `${headPct}%`,
          background: 'linear-gradient(90deg, #60A5FA, #3B82F6)',
          display: 'flex', alignItems: 'center', paddingLeft: '12px',
          color: 'white', fontWeight: 'bold', fontSize: '0.85rem'
        }}>
          {headPct > 15 && `Head (${headPct.toFixed(0)}%)`}
        </div>
        <div style={{
          width: `${heartPct}%`,
          background: 'linear-gradient(90deg, #F472B6, #EC4899)',
          display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: '12px',
          color: 'white', fontWeight: 'bold', fontSize: '0.85rem'
        }}>
          {heartPct > 15 && `Heart (${heartPct.toFixed(0)}%)`}
        </div>
      </div>
    </div>
  );
};
