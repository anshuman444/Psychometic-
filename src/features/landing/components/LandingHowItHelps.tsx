import React from 'react';
import { BENEFITS, SUCCESS_BLUEPRINT_TOP, CAREER_BLUEPRINT_TOP } from '../content';

const SampleLink: React.FC = () => {
  const goToSample = (e: React.MouseEvent) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('vl-set-tab', { detail: 'sample' }));
    const el = document.getElementById('action');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  
  return (
    <a
      href="#action"
      onClick={goToSample}
      style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 13.5, fontWeight: 600, color: 'var(--vl-blue-600)', textDecoration: 'none', transition: 'color 0.2s' }}
      onMouseEnter={(e) => e.currentTarget.style.color = 'var(--vl-blue)'}
      onMouseLeave={(e) => e.currentTarget.style.color = 'var(--vl-blue-600)'}
    >
      Full blueprint includes 8 sections — see a sample report
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </a>
  );
};

export const LandingHowItHelps: React.FC = () => {
  return (
    <section id="how" className="relative bg-white" style={{ padding: '112px 0', overflow: 'hidden' }}>
      <div className="lp-container">
        <div style={{ maxWidth: 680, marginBottom: 56 }}>
          <div className="reveal eyebrow">From data to direction</div>
          <h2
            className="reveal font-display"
            style={{ fontSize: 'clamp(38px, 4vw, 56px)', lineHeight: 1.02, fontWeight: 500, marginTop: 16, color: 'var(--vl-ink)', transitionDelay: '80ms' }}
          >
            How it{' '}
            <span style={{ fontStyle: 'italic', fontWeight: 300, color: 'var(--vl-blue)' }}>actually</span>{' '}
            helps.
          </h2>
        </div>

        {/* 4 benefit cards */}
        <div className="benefits-grid">
          {BENEFITS.map((b, i) => (
            <div
              key={b.title}
              className="reveal glass benefit-card"
              style={{ padding: 28, display: 'flex', flexDirection: 'column', height: '100%', transitionDelay: `${i * 80}ms` }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
                <span className="font-display" style={{ fontStyle: 'italic', fontSize: 38, lineHeight: 1, color: 'var(--vl-blue)' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span style={{ height: 32, width: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--vl-blue-50)' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14M13 5l7 7-7 7" stroke="var(--vl-blue-600)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </div>
              <h3 className="font-display" style={{ fontSize: 19, lineHeight: 1.1, color: 'var(--vl-ink)', fontWeight: 500, margin: 0 }}>
                {b.title}
              </h3>
              <p style={{ marginTop: 12, fontSize: 14, lineHeight: 1.6, color: 'var(--vl-muted)', flex: 1, margin: '12px 0 0 0' }}>
                {b.body}
              </p>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="hairline" style={{ margin: '80px 0' }} />

        {/* Two Blueprints */}
        <div style={{ maxWidth: 680, marginBottom: 40 }}>
          <div className="reveal eyebrow">Two personalized outputs</div>
          <h3
            className="reveal font-display"
            style={{ fontSize: 'clamp(32px, 3.5vw, 46px)', lineHeight: 1.05, fontWeight: 500, marginTop: 16, color: 'var(--vl-ink)', transitionDelay: '80ms' }}
          >
            Your{' '}
            <span style={{ fontStyle: 'italic', fontWeight: 300, color: 'var(--vl-blue)' }}>two</span>{' '}
            blueprints.
          </h3>
        </div>

        <div className="blueprints-grid">
          <div className="reveal glass" style={{ padding: '32px 40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <span className="dot" />
              <span className="eyebrow">Student Success Blueprint</span>
            </div>
            <ul style={{ marginTop: 16, listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {SUCCESS_BLUEPRINT_TOP.map((b, i) => (
                <li key={b} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, fontSize: 15.5, color: 'var(--vl-ink-2)' }}>
                  <span className="font-display" style={{ fontStyle: 'italic', fontSize: 14, color: 'var(--vl-blue)', marginTop: 2, width: 24 }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span style={{ lineHeight: 1.4 }}>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="reveal glass-strong" style={{ padding: '32px 40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <span className="dot" />
              <span className="eyebrow">Career Discovery Blueprint</span>
            </div>
            <ul style={{ marginTop: 16, listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {CAREER_BLUEPRINT_TOP.map((b, i) => (
                <li key={b} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, fontSize: 15.5, color: 'var(--vl-ink-2)' }}>
                  <span className="font-display" style={{ fontStyle: 'italic', fontSize: 14, color: 'var(--vl-blue)', marginTop: 2, width: 24 }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span style={{ lineHeight: 1.4 }}>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="reveal" style={{ marginTop: 32, display: 'flex', justifyContent: 'flex-start', transitionDelay: '80ms' }}>
          <SampleLink />
        </div>
      </div>

      <style>{`
        .benefits-grid { display: grid; grid-template-columns: 1fr; gap: 20px; }
        .blueprints-grid { display: grid; grid-template-columns: 1fr; gap: 24px; }
        
        .benefit-card { transition: transform 0.5s ease; }
        .benefit-card:hover { transform: translateY(-4px); }

        @media (min-width: 768px) {
          .benefits-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
        
        @media (min-width: 1024px) {
          .benefits-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); }
          .blueprints-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
      `}</style>
    </section>
  );
};
