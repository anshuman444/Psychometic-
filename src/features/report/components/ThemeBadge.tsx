import React from 'react';
import { VidyaLoopBrandingProfile } from '../../../utils/branding/brandingProfile';

interface ThemeBadgeProps {
  themeName: string;
  rank: 1 | 2 | 3;
}

export const ThemeBadge: React.FC<ThemeBadgeProps> = ({ themeName, rank }) => {
  const { colors } = VidyaLoopBrandingProfile;
  
  const sizeClasses = rank === 1 ? 'px-6 py-3 text-lg font-bold' : 'px-4 py-2 text-md font-semibold';

  const dynamicBgColor = rank === 1 ? colors.primary : colors.secondary;
  const dynamicTextColor = rank === 1 ? '#FFFFFF' : colors.primary;

  return (
    <div 
      className={`inline-flex items-center justify-center rounded-full ${sizeClasses}`}
      style={{ 
        backgroundColor: rank === 1 ? dynamicBgColor : `${dynamicBgColor}20`, 
        color: dynamicTextColor,
        border: rank !== 1 ? `1px solid ${dynamicBgColor}40` : 'none'
      }}
    >
      {rank === 1 && <span className="mr-2">⭐</span>}
      {themeName}
    </div>
  );
};
