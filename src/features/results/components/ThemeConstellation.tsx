import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { Compass } from 'lucide-react';
import type { DisplayData } from '../hooks/useAssessmentResults';

interface ThemeConstellationProps {
  themes: DisplayData['themes'];
}

export const ThemeConstellation: React.FC<ThemeConstellationProps> = ({ themes }) => {
  // Format data for the radar chart
  const radarData = themes.map(t => ({
    subject: t.name.replace('The ', ''), // Remove "The " for cleaner labels if present
    score: t.score,
    fullMark: 100,
  }));

  // Recharts custom tooltip to show clean percentages
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          padding: '8px 12px',
          border: '1px solid var(--border-light)',
          borderRadius: '8px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        }}>
          <p style={{ margin: 0, fontWeight: 'bold', color: 'var(--dark)' }}>
            {payload[0].payload.subject}
          </p>
          <p style={{ margin: 0, color: 'var(--primary)' }}>
            Score: {payload[0].value.toFixed(1)}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="card results-radar-card">
      <h3 className="card-title">
        <Compass size={20} color="#8B5CF6" />
        Theme Constellation
      </h3>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '20px' }}>
        A multi-axial view of your 12 core personality themes, showing how your broader psychological archetype is distributed.
      </p>
      
      <div className="results-radar-container" style={{ height: '350px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
            <PolarGrid stroke="var(--border-light)" />
            <PolarAngleAxis 
              dataKey="subject" 
              tick={{ fill: 'var(--text-muted)', fontSize: 11 }} 
            />
            <PolarRadiusAxis 
              angle={90} 
              domain={[0, 100]} 
              tick={{ fill: 'var(--text-muted)', fontSize: 10 }}
              axisLine={false} 
            />
            <Tooltip content={<CustomTooltip />} />
            <Radar
              name="Theme Score"
              dataKey="score"
              stroke="#8B5CF6"
              fill="#8B5CF6"
              fillOpacity={0.25}
              strokeWidth={2}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
