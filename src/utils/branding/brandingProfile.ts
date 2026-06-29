export interface BrandingProfile {
  brandId: string;
  brandName: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    textPrimary: string;
    textSecondary: string;
  };
  logoUrl: string;
}

export const VidyaLoopBrandingProfile: BrandingProfile = {
  brandId: 'VIDYALOOP_CORE',
  brandName: 'VidyaLoop',
  colors: {
    primary: '#2DA8FF',
    secondary: '#57B7FF',
    accent: '#0D8BFF',
    background: '#F8FAFC',
    surface: '#FFFFFF',
    textPrimary: '#1F2937',
    textSecondary: '#6B7280'
  },
  logoUrl: '/assets/branding/vidyaloop_logo_light.svg'
};
