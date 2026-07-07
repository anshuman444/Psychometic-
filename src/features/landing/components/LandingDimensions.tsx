import React from 'react';
import { DIMENSIONS } from '../content';

const ICONS: Record<string, React.ReactNode> = {
  personality: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4.5 20c1.2-3.6 4.2-5.5 7.5-5.5s6.3 1.9 7.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  learning: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M3 6.5l9-3.5 9 3.5-9 3.5L3 6.5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M7 8.5v5c0 2 2.2 3.5 5 3.5s5-1.5 5-3.5v-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M21 6.5V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  skills: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M4 20V10M10 20V4M16 20v-8M22 20H2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  interest: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 3v18M3 12h18M5.5 5.5l13 13M18.5 5.5l-13 13" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
    </svg>
  ),
};

export const LandingDimensions: React.FC = () => {
  return (
    <section id="dimensions" className="relative bg-mist-2" style={{ padding: '112px 0', overflow: 'hidden' }}>
      <div className="blur-orb" style={{ width: 500, height: 500, top: 100, left: '50%', transform: 'translateX(-50%)', background: 'rgba(41,171,226,0.10)' }} />

      <div className="lp-container relative z-10">
        <div className="dim-header">
          <div style={{ maxWidth: 640 }}>
            <div className="reveal eyebrow">What we measure</div>
            <h2
              className="reveal font-display"
              style={{ fontSize: 'clamp(38px, 4vw, 56px)', lineHeight: 1.02, fontWeight: 500, marginTop: 16, color: 'var(--vl-ink)', transitionDelay: '80ms' }}
            >
              Four dimensions.{' '}
              <span style={{ fontStyle: 'italic', fontWeight: 300, color: 'var(--vl-blue)' }}>Twenty-two</span>{' '}
              precise signals.
            </h2>
          </div>
          <p className="reveal" style={{ maxWidth: 380, fontSize: 15, color: 'var(--vl-muted)', lineHeight: 1.65, transitionDelay: '140ms' }}>
            Hover any card to reveal its sub-dimensions. Every signal maps into your personalized blueprint.
          </p>
        </div>

        <div className="dim-grid">
          {DIMENSIONS.map((d, i) => (
            <div
              key={d.id}
              tabIndex={0}
              role="group"
              aria-label={d.title}
              className="dim-card reveal glass-strong"
              style={{ transitionDelay: `${i * 80}ms`, padding: 32, textAlign: 'left', outline: 'none', transition: 'all 0.5s ease' }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div
                    className="dim-icon"
                    style={{
                      height: 44,
                      width: 44,
                      borderRadius: 12,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'var(--vl-blue-50)',
                      color: 'var(--vl-blue-600)',
                      transition: 'colors 0.3s'
                    }}
                  >
                    {ICONS[d.id]}
                  </div>
                  <div>
                    <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'var(--vl-muted)' }}>
                      Dimension · {d.number}
                    </div>
                    <h3 className="font-display" style={{ fontSize: 'clamp(22px, 2vw, 24px)', fontWeight: 500, marginTop: 4, color: 'var(--vl-ink)' }}>
                      {d.title}
                    </h3>
                  </div>
                </div>
                <span
                  className="dim-plus"
                  style={{ marginTop: 4, color: 'var(--vl-blue-600)', transition: 'transform 0.5s ease' }}
                  aria-hidden="true"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </span>
              </div>

              <div className="dim-reveal">
                <div>
                  <div className="hairline" style={{ margin: '20px 0' }} />
                  <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--vl-muted)', marginBottom: 12 }}>
                    Sub-Dimensions
                  </div>
                  <ul className="dim-subs">
                    {d.subs.map((s, idx) => (
                      <li key={s} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 13.5, color: 'var(--vl-ink-2)' }}>
                        <span className="font-display" style={{ fontStyle: 'italic', fontSize: 13, color: 'var(--vl-blue)', width: 20 }}>
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .dim-header { display: flex; flex-direction: column; gap: 24px; margin-bottom: 56px; }
        .dim-grid { display: grid; grid-template-columns: 1fr; gap: 20px; }
        .dim-subs { display: grid; grid-template-columns: 1fr; gap: 8px 24px; padding: 0; list-style: none; margin: 0; }

        @media (min-width: 768px) {
          .dim-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .dim-subs { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }

        @media (min-width: 1024px) {
          .dim-header { flex-direction: row; align-items: flex-end; justify-content: space-between; }
        }
      `}</style>
    </section>
  );
};
