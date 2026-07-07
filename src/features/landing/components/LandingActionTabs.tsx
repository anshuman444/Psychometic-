import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ACTION_TABS } from '../content';

export const LandingActionTabs: React.FC = () => {
  const [active, setActive] = useState('assessment');
  const navigate = useNavigate();

  const current = ACTION_TABS.find((t) => t.id === active) || ACTION_TABS[0];

  useEffect(() => {
    const handler = (e: any) => {
      const id = e?.detail;
      if (id && ACTION_TABS.some((t) => t.id === id)) setActive(id);
    };
    window.addEventListener('vl-set-tab', handler);
    return () => window.removeEventListener('vl-set-tab', handler);
  }, []);

  const handleCta = () => {
    if (current.route) {
      navigate(current.route);
    } else {
      alert(`${current.cta} — coming soon\n\nThis is a landing page preview. The full flow launches shortly.`);
    }
  };

  return (
    <section id="action" className="relative bg-white" style={{ padding: '112px 0', overflow: 'hidden' }}>
      <div className="blur-orb" style={{ width: 460, height: 460, bottom: -160, right: -100, background: 'rgba(41,171,226,0.14)' }} />

      <div className="lp-container relative z-10">
        <div style={{ maxWidth: 720, marginBottom: 48 }}>
          <div className="reveal eyebrow">Ready to get started?</div>
          <h2
            className="reveal font-display"
            style={{ fontSize: 'clamp(38px, 4vw, 56px)', lineHeight: 1.02, fontWeight: 500, marginTop: 16, color: 'var(--vl-ink)', transitionDelay: '80ms' }}
          >
            Choose your{' '}
            <span style={{ fontStyle: 'italic', fontWeight: 300, color: 'var(--vl-blue)' }}>starting</span>{' '}
            point.
          </h2>
        </div>

        {/* Segmented control */}
        <div
          role="tablist"
          aria-label="Action tabs"
          className="reveal glass"
          style={{ display: 'inline-flex', padding: 6, gap: 4, flexWrap: 'wrap', borderRadius: 999 }}
        >
          {ACTION_TABS.map((t) => {
            const isActive = t.id === active;
            return (
              <button
                key={t.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(t.id)}
                style={{
                  position: 'relative',
                  padding: '10px 20px',
                  fontSize: 13.5,
                  fontWeight: 600,
                  transition: 'colors 0.2s',
                  color: isActive ? '#fff' : 'var(--vl-ink-2)',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  borderRadius: 999,
                  outline: 'none',
                }}
              >
                {isActive && (
                  <span
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'var(--vl-ink)',
                      borderRadius: 999,
                      boxShadow: '0 10px 24px -12px rgba(11,31,42,0.5)',
                    }}
                  />
                )}
                <span style={{ position: 'relative' }}>{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* Panel */}
        <div className="tab-panel-grid" style={{ marginTop: 40 }}>
          <div
            key={current.id}
            role="tabpanel"
            className="tab-panel-main glass-strong"
            style={{ padding: '32px 40px', animation: 'landingFadeUp 0.5s cubic-bezier(0.22,1,0.36,1)' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span className="dot" />
              <span className="eyebrow">{current.eyebrow}</span>
            </div>
            <h3 className="font-display" style={{ marginTop: 16, fontSize: 'clamp(28px, 3vw, 36px)', lineHeight: 1.05, color: 'var(--vl-ink)' }}>
              {current.heading}
            </h3>
            <p style={{ marginTop: 16, fontSize: 15.5, lineHeight: 1.65, color: 'var(--vl-muted)', maxWidth: 560 }}>
              {current.body}
            </p>

            <div style={{ marginTop: 32 }}>
              <button type="button" onClick={handleCta} className="btn-accent">
                {current.cta}
                <svg className="arrow" width="15" height="15" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>

          <div className="tab-panel-meta">
            {current.meta.map((m) => (
              <div key={m.k} className="glass" style={{ padding: 24 }}>
                <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.16em', color: 'var(--vl-muted)' }}>
                  {m.k}
                </div>
                <div className="font-display" style={{ marginTop: 8, fontSize: 19, lineHeight: 1.4, color: 'var(--vl-ink)' }}>
                  {m.v}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .tab-panel-grid { display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); gap: 24px; align-items: stretch; }
        .tab-panel-main { grid-column: span 12 / span 12; }
        .tab-panel-meta { grid-column: span 12 / span 12; display: grid; gap: 16px; }

        @media (min-width: 1024px) {
          .tab-panel-main { grid-column: span 7 / span 7; }
          .tab-panel-meta { grid-column: span 5 / span 5; }
        }
      `}</style>
    </section>
  );
};
