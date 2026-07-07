import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LOGO_URL } from '../content';

export const LandingFooter: React.FC = () => {
  const navigate = useNavigate();

  return (
    <footer className="relative bg-white" style={{ paddingTop: 64, paddingBottom: 48, borderTop: '1px solid var(--vl-line)' }}>
      <div className="lp-container">
        <div className="glass-tint footer-main">
          <div>
            <div className="eyebrow">Vidyaloop</div>
            <div className="font-display" style={{ marginTop: 12, fontSize: 'clamp(26px, 3vw, 32px)', lineHeight: 1.1, color: 'var(--vl-ink)', maxWidth: 560 }}>
              Built for how you think.{' '}
              <span style={{ fontStyle: 'italic', fontWeight: 300, color: 'var(--vl-blue)' }}>Designed</span>{' '}
              for where you're going.
            </div>
          </div>
          <button className="btn-primary" onClick={() => navigate('/assessment')} style={{ flexShrink: 0 }}>
            Take the Assessment
            <svg className="arrow" width="15" height="15" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <div className="footer-bottom">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <img src={LOGO_URL} alt="Vidyaloop" style={{ height: 40, width: 'auto', objectFit: 'contain' }} />
            <span style={{ margin: '0 4px', color: 'var(--vl-muted)' }}>·</span>
            <span style={{ fontSize: 13, color: 'var(--vl-muted)' }}>
              Building India's future, one student at a time.
            </span>
          </div>
          <div style={{ fontSize: 12.5, color: 'var(--vl-muted)' }}>
            © {new Date().getFullYear()} Vidyaloop. All rights reserved.
          </div>
        </div>
      </div>

      <style>{`
        .footer-main { padding: 32px; display: flex; flex-direction: column; gap: 24px; }
        .footer-bottom { margin-top: 40px; display: flex; flex-direction: column; align-items: center; justify-content: space-between; gap: 16px; text-align: center; }

        @media (min-width: 1024px) {
          .footer-main { padding: 40px; flex-direction: row; alignItems: center; justify-content: space-between; }
          .footer-bottom { flex-direction: row; text-align: left; }
        }
      `}</style>
    </footer>
  );
};
