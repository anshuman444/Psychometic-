import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Briefcase } from 'lucide-react';
import type { CareerRecommendation } from '../../../utils/career/careerRecommendationEngine';
import careerLibrary from '../../../data/career/careerLibrary.json';

interface CareerAffinityChartProps {
  careerRecommendations: CareerRecommendation | null;
  allCareerScores: { clusterId: string; fitScore: number }[];
}

export const CareerAffinityChart: React.FC<CareerAffinityChartProps> = ({ careerRecommendations, allCareerScores }) => {
  if (!careerRecommendations || allCareerScores.length === 0) return null;

  // Show ALL departments, not just top 7
  const allDepts = [...allCareerScores]
    .sort((a, b) => b.fitScore - a.fitScore)
    .map((score, index) => {
      const deptMatch = careerLibrary.departments.find(d => d.id === score.clusterId);
      const name = deptMatch ? deptMatch.name : score.clusterId.replace('DEPT_', '').replace(/_/g, ' ');
      
      return {
        department: name,
        score: parseFloat(score.fitScore.toFixed(1)),
        isTop3: index < 3
      };
    });

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
            {payload[0].payload.department}
          </p>
          <p style={{ margin: 0, color: 'var(--primary)' }}>
            Fit Score: {payload[0].value}%
          </p>
        </div>
      );
    }
    return null;
  };

  // Dynamic height: 40px per bar + 50px padding
  const chartHeight = allDepts.length * 40 + 50;

  return (
    <div style={{
      padding: '24px',
      background: 'var(--bg-card)',
      border: '1px solid var(--border-light)',
      borderRadius: '16px',
      marginTop: '24px'
    }}>
      <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.2rem', marginBottom: '8px', color: 'var(--dark)' }}>
        <Briefcase size={20} color="var(--primary)" />
        Career Affinity Distribution
      </h4>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '24px' }}>
        A breakdown of your fit scores across all {allDepts.length} career domains. This helps identify if you have a 
        strong singular focus or a broad range of viable alternative paths.
      </p>

      <div style={{ height: `${chartHeight}px`, width: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={allDepts}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="var(--border-light)" />
            <XAxis type="number" domain={[0, 100]} hide />
            <YAxis 
              type="category" 
              dataKey="department" 
              width={170}
              tick={{ fill: 'var(--text-muted)', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,0,0,0.02)' }} />
            <Bar dataKey="score" radius={[0, 4, 4, 0]} barSize={20}>
              {allDepts.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.isTop3 ? 'var(--primary)' : 'rgba(45, 168, 255, 0.35)'} 
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
