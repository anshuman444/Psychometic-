import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LOGO_URL } from '../content';

export const LandingNav: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50 }}>
      <div className="lp-container" style={{ paddingTop: 20 }}>
        <div
          className="glass"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingLeft: 12,
            paddingRight: 12,
            paddingTop: 8,
            paddingBottom: 8,
            borderRadius: 999,
          }}
        >
          <a
            href="#top"
            style={{ display: 'flex', alignItems: 'center', gap: 10, paddingLeft: 4, textDecoration: 'none' }}
            aria-label="Vidyaloop home"
          >
            <img
              src={LOGO_URL}
              alt="Vidyaloop"
              style={{ height: 44, width: 'auto', objectFit: 'contain' }}
            />
          </a>

          <nav
            style={{
              display: 'none',
              alignItems: 'center',
              gap: 32,
              fontSize: 14,
              fontWeight: 500,
              color: 'var(--vl-ink-2)',
            }}
            className="lp-nav-links"
          >
            <a href="#dimensions" className="ink-link">Dimensions</a>
            <a href="#how" className="ink-link">How it helps</a>
            <a href="#action" className="ink-link">Get started</a>
          </nav>

          <button
            className="btn-accent"
            onClick={() => navigate('/assessment')}
            style={{ padding: '10px 16px', fontSize: 13.5 }}
          >
            Take the Assessment
            <svg className="arrow" width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .lp-nav-links { display: flex !important; }
        }
      `}</style>
    </header>
  );
};
