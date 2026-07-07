import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SUCCESS_BLUEPRINT, CAREER_BLUEPRINT, HERO_STATS } from '../content';

export const LandingHero: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section id="top" className="relative bg-mist" style={{ paddingTop: 160, paddingBottom: 96, overflow: 'hidden' }}>
      {/* Orbs */}
      <div className="blur-orb" style={{ width: 420, height: 420, top: -80, right: -120, background: 'rgba(41,171,226,0.22)' }} />
      <div className="blur-orb" style={{ width: 320, height: 320, bottom: -140, left: -80, background: 'rgba(41,171,226,0.14)' }} />

      <div className="lp-container relative z-10" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, minmax(0, 1fr))', gap: 40, alignItems: 'center' }}>
        {/* Left */}
        <div className="hero-left-col">
          <div className="reveal glass-tint" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, borderRadius: 999, padding: '6px 14px' }}>
            <span className="dot" />
            <span className="eyebrow" style={{ letterSpacing: '0.2em' }}>Career Intelligence · Classes 10–12</span>
          </div>

          <h1
            className="reveal font-display"
            style={{ 
              fontSize: 'clamp(44px, 5vw, 76px)', 
              lineHeight: 0.98, 
              fontWeight: 500, 
              marginTop: 24,
              color: 'var(--vl-ink)',
              transitionDelay: '80ms' 
            }}
          >
            Discover who you <span style={{ fontStyle: 'italic', fontWeight: 300, color: 'var(--vl-blue)' }}>really</span> are —
            <br className="hero-br" />
            and where you're <span style={{ fontStyle: 'italic', fontWeight: 300 }}>headed</span>.
          </h1>

          <p
            className="reveal"
            style={{ 
              marginTop: 28, 
              maxWidth: 560, 
              fontSize: 'clamp(16px, 1.5vw, 17.5px)', 
              lineHeight: 1.6, 
              color: 'var(--vl-muted)',
              transitionDelay: '160ms' 
            }}
          >
            A scientifically structured assessment that maps your personality, learning style,
            abilities and interests into a clear picture of your strengths and career direction.
          </p>

          <div
            className="reveal"
            style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 12, marginTop: 36, transitionDelay: '240ms' }}
          >
            <button className="btn-primary" onClick={() => navigate('/assessment')}>
              Take the Assessment
              <svg className="arrow" width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <a href="#action" className="btn-ghost">
              See a Sample Report
            </a>
          </div>

          {/* Stat row */}
          <div className="reveal hero-stats" style={{ marginTop: 56, maxWidth: 640, transitionDelay: '320ms' }}>
            {HERO_STATS.map((s) => (
              <div key={s.l} style={{ borderLeft: '1px solid var(--vl-line)', paddingLeft: 16 }}>
                <div className="font-display" style={{ fontSize: 34, lineHeight: 1, letterSpacing: '-0.02em', color: 'var(--vl-ink)' }}>
                  {s.n}
                </div>
                <div style={{ marginTop: 6, fontSize: 12.5, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--vl-muted)' }}>
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — floating blueprint preview */}
        <div className="hero-right-col" style={{ position: 'relative' }}>
          <div className="reveal" style={{ position: 'relative', transitionDelay: '180ms' }}>
            {/* Back card */}
            <div className="glass" style={{ position: 'absolute', top: -24, right: -24, width: '78%', height: '86%', transform: 'rotate(3deg)', zIndex: 0 }} />
            {/* Front card */}
            <div className="glass-strong" style={{ position: 'relative', padding: 28, zIndex: 2 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span className="dot" />
                  <span className="eyebrow">Sample Blueprint</span>
                </div>
                <span style={{ fontSize: 11, color: 'var(--vl-muted)', fontWeight: 500, letterSpacing: '0.05em' }}>v.01</span>
              </div>

              <h3 className="font-display" style={{ fontSize: 22, lineHeight: 1.1, color: 'var(--vl-ink)', margin: 0 }}>
                Student Success Blueprint
              </h3>
              <p style={{ fontSize: 12.5, color: 'var(--vl-muted)', marginTop: 6, margin: 0 }}>
                Built around how you actually think, learn and work.
              </p>

              <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '10px 16px', marginTop: 20, padding: 0, listStyle: 'none' }}>
                {SUCCESS_BLUEPRINT.slice(0, 6).map((b) => (
                  <li key={b} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 12.5, color: 'var(--vl-ink-2)' }}>
                    <span style={{ marginTop: 6, height: 4, width: 4, borderRadius: '50%', backgroundColor: 'var(--vl-blue)', flexShrink: 0 }} />
                    <span style={{ lineHeight: 1.4 }}>{b}</span>
                  </li>
                ))}
              </ul>

              {/* Progress bars visual */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 20 }}>
                {[
                  { label: "Analytical Reasoning", pct: 88 },
                  { label: "Creative Thinking", pct: 74 },
                  { label: "Leadership Potential", pct: 62 },
                ].map((r) => (
                  <div key={r.label}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11.5, color: 'var(--vl-muted)', marginBottom: 4 }}>
                      <span>{r.label}</span>
                      <span style={{ fontWeight: 500, color: 'var(--vl-ink-2)' }}>{r.pct}</span>
                    </div>
                    <div style={{ height: 3, width: '100%', borderRadius: 999, backgroundColor: 'rgba(11,31,42,0.06)', overflow: 'hidden' }}>
                      <div
                        style={{ height: '100%', borderRadius: 999, width: `${r.pct}%`, background: 'linear-gradient(90deg, var(--vl-blue), #7BC9EA)' }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="hairline" style={{ margin: '20px 0' }} />

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.16em', color: 'var(--vl-muted)' }}>Career Fit</div>
                  <div className="font-display" style={{ fontSize: 17, marginTop: 2, color: 'var(--vl-ink)' }}>
                    {CAREER_BLUEPRINT[0]}
                  </div>
                </div>
                <div style={{ height: 44, width: 44, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--vl-blue-50)' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M7 17L17 7M17 7H9M17 7V15" stroke="var(--vl-blue-600)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Floating tag */}
            <div className="reveal glass-tint hero-floating-tag" style={{ position: 'absolute', bottom: -24, display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', whiteSpace: 'nowrap', zIndex: 3, transitionDelay: '260ms' }}>
              <div style={{ height: 36, width: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--vl-blue)' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M20 6L9 17l-5-5" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--vl-muted)' }}>Recommended</div>
                <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--vl-ink)' }}>Science + Research Track</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hero-left-col { grid-column: span 12 / span 12; }
        .hero-right-col { grid-column: span 12 / span 12; display: none; }
        .hero-br { display: none; }
        .hero-stats { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px; }
        .hero-floating-tag { left: 16px; }

        @media (min-width: 640px) {
          .hero-br { display: block; }
          .hero-stats { grid-template-columns: repeat(4, minmax(0, 1fr)); }
          .hero-floating-tag { left: -24px; }
        }

        @media (min-width: 1024px) {
          .hero-left-col { grid-column: span 7 / span 7; }
          .hero-right-col { grid-column: span 5 / span 5; display: block; }
          .hero-floating-tag { left: -40px; }
        }
      `}</style>
    </section>
  );
};
