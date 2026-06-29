import React from 'react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, Tooltip } from 'recharts';
import { VidyaLoopBrandingProfile } from '../../../utils/branding/brandingProfile';

interface RadarData {
  subject: string;
  A: number;
  fullMark: number;
}

interface IntelligenceRadarProps {
  data: RadarData[];
  title: string;
}

export const IntelligenceRadar: React.FC<IntelligenceRadarProps> = ({ data, title }) => {
  const { colors } = VidyaLoopBrandingProfile;

  return (
    <div className="w-full h-96 p-6 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col">
      <h3 className="text-lg font-semibold mb-2" style={{ color: colors.textPrimary }}>{title}</h3>
      <div className="flex-grow w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
            <PolarGrid stroke={colors.background} strokeWidth={2} />
            <PolarAngleAxis 
              dataKey="subject" 
              tick={{ fill: colors.textSecondary, fontSize: 12, fontFamily: "'Inter', sans-serif" }} 
            />
            <Radar
              name="Student Score"
              dataKey="A"
              stroke={colors.primary}
              fill={colors.secondary}
              fillOpacity={0.5}
              strokeWidth={3}
              isAnimationActive={true}
            />
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
