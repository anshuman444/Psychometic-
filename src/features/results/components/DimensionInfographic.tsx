import React from 'react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

interface DimensionInfographicProps {
  score: number;
  tier: 'low' | 'medium' | 'high';
  categoryColor: string;
  dimensionId: string;
  insightText?: string;
}

export const DimensionInfographic: React.FC<DimensionInfographicProps> = ({ score, tier, categoryColor, dimensionId, insightText }) => {
  // Generate deterministic but dynamic data points based on score and dimension ID
  const hash = dimensionId.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
  
  // Create an organic-looking wave that culminates near the score
  const variance = tier === 'high' ? 8 : tier === 'medium' ? 12 : 18;
  const data = [
    { value: Math.max(10, score - variance * 1.5 + (hash % 10)) },
    { value: Math.max(15, score - variance + ((hash * 2) % 15)) },
    { value: Math.max(20, score - (variance / 2) + ((hash * 3) % 10)) },
    { value: Math.max(25, score + ((hash * 4) % 15) - 5) },
    { value: score },
    { value: Math.max(20, score - (variance / 2) + ((hash * 5) % 10)) },
    { value: Math.max(15, score - variance + ((hash * 6) % 15)) },
  ];

  return (
    <div className="dimension-infographic" style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between',
      height: '80px',
      padding: '12px 16px',
      backgroundColor: 'var(--surface)',
      borderRadius: '8px',
      marginBottom: '16px',
      borderLeft: `4px solid ${categoryColor}`,
      boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
    }}>
      <div className="dimension-infographic__stats" style={{ display: 'flex', flexDirection: 'column', gap: '0px', zIndex: 1, flex: 1, paddingRight: '12px' }}>
        <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)', fontWeight: 600 }}>
          Expression Profile
        </span>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginTop: '2px' }}>
          <span style={{ fontSize: '24px', fontWeight: 800, color: categoryColor, lineHeight: 1 }}>{Math.round(score)}</span>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 500 }}>Index</span>
        </div>
        
        {insightText && (
          <p style={{ marginTop: '4px', fontSize: '0.8rem', color: 'var(--dark)', lineHeight: 1.3, fontStyle: 'italic', maxWidth: '340px' }}>
            "{insightText}"
          </p>
        )}
      </div>
      
      <div className="dimension-infographic__chart" style={{ height: '100%', width: '140px', position: 'relative' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id={`colorScore-${dimensionId}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={categoryColor} stopOpacity={0.4}/>
                <stop offset="95%" stopColor={categoryColor} stopOpacity={0.0}/>
              </linearGradient>
            </defs>
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke={categoryColor} 
              strokeWidth={2.5}
              fillOpacity={1} 
              fill={`url(#colorScore-${dimensionId})`} 
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
