import React from 'react';
import { useReveal } from '../hooks/useReveal';
import { LandingNav } from '../components/LandingNav';
import { LandingHero } from '../components/LandingHero';
import { LandingDimensions } from '../components/LandingDimensions';
import { LandingHowItHelps } from '../components/LandingHowItHelps';
import { LandingActionTabs } from '../components/LandingActionTabs';
import { LandingFooter } from '../components/LandingFooter';

import '../landing.css';

export const LandingPage: React.FC = () => {
  const rootRef = useReveal();

  return (
    <div ref={rootRef} className="landing-page">
      <LandingNav />
      <main>
        <LandingHero />
        <LandingDimensions />
        <LandingHowItHelps />
        <LandingActionTabs />
      </main>
      <LandingFooter />
    </div>
  );
};
