'use client';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Logo from './components/Logo';

// Warm-dark palette (mirrors amonaayoola.com/about). The wordmark in <Logo />
// reads var(--text-primary); force it to warm cream on this dark surface.
const logoCream = { '--text-primary': '#f4f0ea' } as React.CSSProperties;

const CREAM = '#f4f0ea';
const BG = '#0a0806';
const ACCENT = '#7C3AED';
const RULE = 'rgba(244, 240, 234, 0.1)';

// Stat with count-up that fires when scrolled into view.
function Stat({ value, label, border }: { value: string; label: string; border: boolean }) {
  const target = parseInt(value, 10) || 0;
  const suffix = value.replace(/[0-9]/g, '');
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(target);
      return;
    }
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const start = performance.now();
        const dur = 1300;
        const tick = (t: number) => {
          const p = Math.min((t - start) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setDisplay(Math.round(eased * target));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        obs.unobserve(e.target);
      });
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);

  return (
    <div ref={ref} style={{
      textAlign: 'center',
      padding: '8px 24px',
      borderRight: border ? `1px solid ${RULE}` : 'none',
    }}>
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 72, fontWeight: 900, color: CREAM, lineHeight: 1, marginBottom: 16, letterSpacing: '-0.03em' }}>{display}{suffix}</div>
      <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, color: 'rgba(244,240,234,0.5)', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase' }}>{label}</div>
    </div>
  );
}

type Blob = {
  top: string;
  left?: string;
  right?: string;
  size: number;
  opacity: number;
  anim: string;
  duration: number;
  delay: number;
};

// Almost invisible violet wash. The warmth of the background does the work,
// not the blobs. Opacity stays under 0.07, drift loops run 15s-20s.
const GLOW_ORBS: Blob[] = [
  { top: '-10%', left: '-8%',  size: 820, opacity: 0.06, anim: 'orbDrift1', duration: 18, delay: 0 },
  { top: '34%',  right: '-12%', size: 760, opacity: 0.05, anim: 'orbDrift2', duration: 20, delay: 1.5 },
  { top: '74%',  left: '20%',  size: 680, opacity: 0.045, anim: 'orbDrift3', duration: 16, delay: 0.8 },
];

// Chapter-style overline label, e.g. "THE PLATFORM / 01".
function Overline({ children, color }: { children: React.ReactNode; color?: string }) {
  return (
    <div style={{
      fontFamily: "'Outfit', sans-serif",
      fontSize: 11,
      color: color ?? ACCENT,
      letterSpacing: '0.15em',
      fontWeight: 600,
      textTransform: 'uppercase',
    }}>{children}</div>
  );
}

export default function LandingPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    try {
      const user = localStorage.getItem('maiden_user');
      if (user) {
        router.replace('/home');
        return;
      }
    } catch { /* ignore */ }
    setReady(true);
  }, [router]);

  // Scroll-triggered reveals + nav shadow on scroll.
  useEffect(() => {
    if (!ready) return;

    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    if (reduce) {
      els.forEach((el) => el.classList.add('reveal-in'));
      return () => window.removeEventListener('scroll', onScroll);
    }
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('reveal-in');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    els.forEach((el) => obs.observe(el));

    return () => {
      window.removeEventListener('scroll', onScroll);
      obs.disconnect();
    };
  }, [ready]);

  if (!ready) {
    return (
      <div style={{ minHeight: '100vh', background: BG, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 36, height: 36, border: '3px solid rgba(124,58,237,0.25)', borderTopColor: ACCENT, borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: BG, fontFamily: "'DM Sans', 'Outfit', sans-serif", color: CREAM, overflowX: 'hidden', position: 'relative' }}>
      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes tickerScroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }

        html { scroll-behavior: smooth; }

        /* On-load hero entrance, slow and deliberate */
        .hero-anim { opacity: 0; animation: fadeUp 0.9s cubic-bezier(0.22,1,0.36,1) forwards; }

        /* Scroll reveals, 0.9s ease-out, staggered 150ms apart in markup */
        [data-reveal] {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1);
          will-change: opacity, transform;
        }
        [data-reveal="left"]  { transform: translateX(-48px); }
        [data-reveal="right"] { transform: translateX(48px); }
        .reveal-in { opacity: 1 !important; transform: none !important; }

        @media (prefers-reduced-motion: reduce) {
          .hero-anim { animation: none !important; opacity: 1 !important; }
          [data-reveal] { opacity: 1 !important; transform: none !important; transition: none !important; }
          .glow-orb, .ticker-track { animation: none !important; }
        }

        /* Barely-there violet glow orbs, very slow drift */
        .glow-orb { position: absolute; border-radius: 50%; will-change: transform; filter: blur(120px); }
        @keyframes orbDrift1 {
          0%,100% { transform: translate(0,0) scale(1); }
          50%     { transform: translate(50px, 40px) scale(1.06); }
        }
        @keyframes orbDrift2 {
          0%,100% { transform: translate(0,0) scale(1); }
          50%     { transform: translate(-55px, 30px) scale(0.95); }
        }
        @keyframes orbDrift3 {
          0%,100% { transform: translate(0,0) scale(1); }
          50%     { transform: translate(40px, -45px) scale(1.08); }
        }

        /* Nav */
        .nav-link {
          font-family: 'Outfit', sans-serif;
          font-size: 14px;
          color: rgba(244,240,234,0.7);
          text-decoration: none;
          transition: color 200ms;
          font-weight: 500;
          letter-spacing: 0.01em;
        }
        .nav-link:hover { color: ${CREAM}; }

        /* Buttons */
        .btn-primary {
          background: ${ACCENT};
          color: ${CREAM};
          border: none;
          padding: 16px 36px;
          border-radius: 4px;
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
          font-family: 'Outfit', sans-serif;
          letter-spacing: 0.02em;
          transition: background 250ms, transform 250ms, box-shadow 250ms;
          text-decoration: none;
          display: inline-block;
          box-shadow: 0 4px 24px rgba(124,58,237,0.25);
        }
        .btn-primary:hover { background: #6D28D9; transform: translateY(-2px); box-shadow: 0 10px 36px rgba(124,58,237,0.4); }

        .btn-secondary {
          background: transparent;
          color: ${CREAM};
          border: 1px solid rgba(244,240,234,0.3);
          padding: 16px 30px;
          border-radius: 4px;
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
          font-family: 'Outfit', sans-serif;
          letter-spacing: 0.02em;
          transition: border-color 250ms, background 250ms;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 10px;
        }
        .btn-secondary:hover { border-color: rgba(244,240,234,0.6); background: rgba(244,240,234,0.04); }

        .btn-signin {
          background: transparent;
          color: rgba(244,240,234,0.7);
          border: none;
          padding: 9px 14px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          font-family: 'Outfit', sans-serif;
          transition: color 200ms;
          text-decoration: none;
          display: inline-block;
        }
        .btn-signin:hover { color: ${CREAM}; }

        .btn-getstarted {
          background: ${ACCENT};
          color: ${CREAM};
          border: none;
          padding: 10px 22px;
          border-radius: 4px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          font-family: 'Outfit', sans-serif;
          letter-spacing: 0.02em;
          transition: background 200ms, transform 200ms;
          text-decoration: none;
          display: inline-block;
        }
        .btn-getstarted:hover { background: #6D28D9; transform: translateY(-1px); }

        /* Cards: barely stand out, content reads not the container */
        .quiet-card {
          background: rgba(244,240,234,0.04);
          border: 1px solid rgba(244,240,234,0.08);
          border-radius: 8px;
          box-shadow: 0 8px 40px rgba(0,0,0,0.2);
          transition: transform 300ms ease, border-color 300ms ease, background 300ms ease;
        }
        .step-card { padding: 44px 36px; }
        .step-card:hover { transform: translateY(-4px); border-color: rgba(124,58,237,0.4); background: rgba(244,240,234,0.05); }

        .course-card {
          padding: 30px 26px;
          flex-shrink: 0;
          width: 230px;
        }
        .course-card:hover { transform: translateY(-4px); border-color: rgba(124,58,237,0.4); background: rgba(244,240,234,0.05); }

        .game-tile {
          background: rgba(244,240,234,0.04);
          border: 1px solid rgba(244,240,234,0.08);
          border-radius: 6px;
          padding: 20px 12px;
          text-align: center;
          transition: transform 200ms, border-color 200ms;
        }
        .game-tile:hover { transform: translateY(-2px); border-color: rgba(124,58,237,0.4); }

        .feature-row { display: flex; align-items: center; gap: 90px; padding: 130px 0; }
        @media (max-width: 768px) {
          .feature-row { flex-direction: column !important; gap: 48px; padding: 80px 0; }
          .feature-row-reverse { flex-direction: column !important; }
          .hero-headline { font-size: 52px !important; }
          .section-headline { font-size: 38px !important; }
          .stat-grid { grid-template-columns: repeat(2, 1fr) !important; row-gap: 48px !important; }
          .stat-grid > div { border-right: none !important; }
          .step-grid { grid-template-columns: 1fr !important; }
          .nav-links { display: none !important; }
          .course-scroll { gap: 16px !important; }
          .maia-section { flex-direction: column !important; gap: 56px !important; }
          .feature-mock { flex: 0 0 auto !important; width: 100% !important; }
        }

        .mock-card {
          background: rgba(244,240,234,0.04);
          border: 1px solid rgba(244,240,234,0.08);
          border-radius: 10px;
          box-shadow: 0 24px 60px rgba(0,0,0,0.35);
          overflow: hidden;
        }

        .difficulty-badge {
          font-size: 10px; font-weight: 600; padding: 5px 12px;
          border-radius: 100px; font-family: 'Outfit', sans-serif;
          letter-spacing: 0.12em; text-transform: uppercase;
        }
        .difficulty-badge-beginner { background: rgba(124,58,237,0.12); color: #A78BFA; }
        .difficulty-badge-intermediate { background: rgba(124,58,237,0.2); color: #C4B5FD; }
        .difficulty-badge-expert { background: ${ACCENT}; color: ${CREAM}; }

        .ticker-track { display: flex; width: max-content; animation: tickerScroll 40s linear infinite; }
        .feature-link {
          color: ${CREAM};
          text-decoration: none;
          border-bottom: 1px solid transparent;
          transition: border-color 200ms;
        }
        .feature-link:hover { border-bottom-color: ${ACCENT}; }
      `}</style>

      {/* Ambient warm-dark glow orbs, full page, almost invisible */}
      <div aria-hidden="true" style={{ position: 'fixed', inset: 0, zIndex: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {GLOW_ORBS.map((b, i) => (
          <div
            key={i}
            className="glow-orb"
            style={{
              top: b.top, left: b.left, right: b.right,
              width: b.size, height: b.size,
              background: ACCENT, opacity: b.opacity,
              animation: `${b.anim} ${b.duration}s ease-in-out ${b.delay}s infinite`,
            }}
          />
        ))}
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* ── NAV ── */}
        <nav style={{
          position: 'sticky', top: 0, zIndex: 100,
          background: 'rgba(10,8,6,0.8)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: `1px solid ${scrolled ? RULE : 'transparent'}`,
          transition: 'border-color 300ms ease',
        }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 32px', height: 72, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={logoCream}>
              <Logo size="md" showText={true} />
            </div>

            <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: 38 }}>
              <a href="#how-it-works" className="nav-link">How it Works</a>
              <a href="#courses" className="nav-link">Courses</a>
              <a href="#games" className="nav-link">Games</a>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Link href="/auth" className="btn-signin">Sign In</Link>
              <Link href="/auth" className="btn-getstarted">Get Started</Link>
            </div>
          </div>
        </nav>

        {/* ── HERO ── */}
        <section style={{ position: 'relative' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', padding: '150px 32px 110px', textAlign: 'center' }}>
            <div className="hero-anim" style={{ marginBottom: 36 }}>
              <Overline>The Platform / 01</Overline>
            </div>

            <h1 className="hero-headline hero-anim" style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 92,
              fontWeight: 900,
              lineHeight: 1.02,
              letterSpacing: '-2px',
              color: CREAM,
              margin: '0 auto 32px',
              maxWidth: 900,
              animationDelay: '0.12s',
            }}>
              Learn Web3 the way<br />it was meant{' '}
              <span style={{ color: ACCENT }}>to be</span>.
            </h1>

            <p className="hero-anim" style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 19,
              color: 'rgba(244,240,234,0.8)',
              lineHeight: 1.7,
              maxWidth: 600,
              margin: '0 auto 44px',
              fontWeight: 400,
              animationDelay: '0.24s',
            }}>
              From Bitcoin to zero-knowledge proofs. MAIDEN turns complex blockchain technology into a journey you actually enjoy.
            </p>

            <div className="hero-anim" style={{ display: 'flex', gap: 16, justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', animationDelay: '0.36s' }}>
              <Link href="/auth" className="btn-primary">Start for Free</Link>
              <Link href="#courses" className="btn-secondary">See the Courses <span style={{ fontSize: 18, lineHeight: 1 }}>&#8594;</span></Link>
            </div>

            <p className="hero-anim" style={{ fontSize: 13, color: 'rgba(244,240,234,0.5)', fontFamily: "'Outfit', sans-serif", marginTop: 32, letterSpacing: '0.02em', animationDelay: '0.48s' }}>
              <span style={{ color: ACCENT }}>&#9733;&#9733;&#9733;&#9733;&#9733;</span>
              {'  '}Trusted by 2,400+ learners
            </p>
          </div>
          <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 32px' }}>
            <hr style={{ border: 'none', borderTop: `1px solid ${RULE}`, margin: 0 }} />
          </div>
        </section>

        {/* ── TICKER STRIP ── */}
        <section aria-hidden="true" style={{ background: 'rgba(244,240,234,0.06)', borderBottom: `1px solid ${RULE}`, padding: '22px 0', overflow: 'hidden' }}>
          <div className="ticker-track">
            {[0, 1].map((dup) => (
              <div key={dup} style={{ display: 'flex', flexShrink: 0 }}>
                {['Bitcoin', 'Blockchain', 'DeFi', 'Smart Contracts', 'Zero-Knowledge Proofs', 'Layer 2', 'NFTs', 'DAOs', 'MEV', 'Consensus', 'Wallets', 'Staking'].map((topic) => (
                  <span key={topic} style={{ display: 'inline-flex', alignItems: 'center', fontFamily: "'Outfit', sans-serif", fontSize: 14, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(244,240,234,0.55)', fontWeight: 500, padding: '0 32px' }}>
                    {topic}
                    <span style={{ color: ACCENT, marginLeft: 32 }}>&#9670;</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* ── STATS ── */}
        <section style={{ padding: '110px 0' }}>
          <div className="stat-grid" style={{ maxWidth: 1100, margin: '0 auto', padding: '0 32px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0 }}>
            {[
              { value: '16', label: 'Courses' },
              { value: '200+', label: 'Vocabulary Terms' },
              { value: '9', label: 'Games' },
              { value: '3', label: 'Difficulty Levels' },
            ].map((s, i) => (
              <Stat key={s.label} value={s.value} label={s.label} border={i < 3} />
            ))}
          </div>
        </section>

        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 32px' }}>
          <hr style={{ border: 'none', borderTop: `1px solid ${RULE}`, margin: 0 }} />
        </div>

        {/* ── HOW IT WORKS ── */}
        <section id="how-it-works" style={{ padding: '140px 0' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 32px' }}>
            <div data-reveal="" style={{ textAlign: 'center', marginBottom: 80 }}>
              <Overline>The Method / 02</Overline>
              <h2 className="section-headline" style={{ fontFamily: "'Playfair Display', serif", fontSize: 56, fontWeight: 900, letterSpacing: '-1.5px', color: CREAM, margin: '20px 0 0' }}>
                Three steps to mastery
              </h2>
            </div>

            <div className="step-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }}>
              {[
                { num: '01', title: 'Sign up free', desc: 'Create an account or jump straight in. No credit card needed. Pick your skill level and you are in within 60 seconds.' },
                { num: '02', title: 'Choose your path', desc: 'Browse 16 structured tracks from Bitcoin basics to ZK proofs. Each course has clear modules so you always know where you stand.' },
                { num: '03', title: 'Play to learn', desc: 'Earn XP through lessons and play 9 games that reinforce what you learned. Word Match, Speed Quiz, Crypto Wordle, and more.' },
              ].map((s, i) => (
                <div key={s.num} className="quiet-card step-card" data-reveal="" style={{ transitionDelay: `${i * 150}ms` }}>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 40, fontWeight: 900, color: ACCENT, marginBottom: 24, lineHeight: 1 }}>{s.num}</div>
                  <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 22, fontWeight: 600, color: CREAM, marginBottom: 14, letterSpacing: '-0.01em' }}>{s.title}</h3>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: 'rgba(244,240,234,0.7)', lineHeight: 1.75, margin: 0 }}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 32px' }}>
          <hr style={{ border: 'none', borderTop: `1px solid ${RULE}`, margin: 0 }} />
        </div>

        {/* ── FEATURE 1: Learning that sticks ── */}
        <section>
          <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 32px' }}>
            <div className="feature-row">
              <div className="feature-mock" data-reveal="left" style={{ flex: '0 0 440px' }}>
                <div className="mock-card" style={{ padding: 30 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 22 }}>
                    <div style={{ width: 38, height: 38, borderRadius: 8, background: 'rgba(124,58,237,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>⛓</div>
                    <div>
                      <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, fontWeight: 600, color: CREAM }}>Blockchain Fundamentals</div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'rgba(244,240,234,0.5)' }}>Module 3 of 8</div>
                    </div>
                    <div style={{ marginLeft: 'auto', background: ACCENT, color: CREAM, fontSize: 11, fontWeight: 600, padding: '5px 12px', borderRadius: 100, fontFamily: "'Outfit', sans-serif" }}>+40 XP</div>
                  </div>
                  <div style={{ height: 5, background: 'rgba(244,240,234,0.08)', borderRadius: 100, marginBottom: 22, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: '37%', background: ACCENT, borderRadius: 100 }} />
                  </div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: 'rgba(244,240,234,0.7)', lineHeight: 1.75, marginBottom: 22 }}>
                    <strong style={{ color: CREAM, fontWeight: 500 }}>Consensus mechanisms</strong> determine how nodes in a network agree on a single source of truth without a central authority.
                  </div>
                  <div style={{ background: 'rgba(244,240,234,0.03)', borderRadius: 8, padding: 18, border: `1px solid ${RULE}` }}>
                    <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 12, fontWeight: 600, color: 'rgba(244,240,234,0.5)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 14 }}>Quick Check</div>
                    {['Proof of Work', 'Proof of Stake', 'Delegated PoS'].map((opt, i) => (
                      <div key={opt} style={{
                        padding: '10px 14px', borderRadius: 6, marginBottom: 8,
                        background: i === 1 ? 'rgba(124,58,237,0.18)' : 'rgba(244,240,234,0.03)',
                        border: `1px solid ${i === 1 ? 'rgba(124,58,237,0.5)' : RULE}`,
                        fontFamily: "'DM Sans', sans-serif", fontSize: 13,
                        color: i === 1 ? CREAM : 'rgba(244,240,234,0.6)', fontWeight: i === 1 ? 500 : 400,
                      }}>{opt}</div>
                    ))}
                  </div>
                </div>
              </div>

              <div data-reveal="right" style={{ flex: 1 }}>
                <Overline>Retention / 03</Overline>
                <h2 className="section-headline" style={{ fontFamily: "'Playfair Display', serif", fontSize: 48, fontWeight: 900, letterSpacing: '-1.5px', color: CREAM, margin: '20px 0 24px', lineHeight: 1.08 }}>
                  Learning that sticks
                </h2>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 17, color: 'rgba(244,240,234,0.8)', lineHeight: 1.75, margin: '0 0 28px' }}>
                  Every lesson ends with a quiz. Spaced repetition surfaces concepts you have not seen in a while. An XP system rewards consistency, not cramming.
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {['Quizzes after every lesson', 'XP and streak rewards', 'Spaced repetition built in'].map(item => (
                    <li key={item} style={{ display: 'flex', alignItems: 'center', gap: 14, fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: 'rgba(244,240,234,0.8)', marginBottom: 14 }}>
                      <span style={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(124,58,237,0.15)', color: ACCENT, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, flexShrink: 0, fontWeight: 700 }}>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 32px' }}>
          <hr style={{ border: 'none', borderTop: `1px solid ${RULE}`, margin: 0 }} />
        </div>

        {/* ── FEATURE 2: Games ── */}
        <section id="games">
          <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 32px' }}>
            <div className="feature-row feature-row-reverse">
              <div data-reveal="left" style={{ flex: 1 }}>
                <Overline>Gamified Learning / 04</Overline>
                <h2 className="section-headline" style={{ fontFamily: "'Playfair Display', serif", fontSize: 48, fontWeight: 900, letterSpacing: '-1.5px', color: CREAM, margin: '20px 0 24px', lineHeight: 1.08 }}>
                  Compete, don&#39;t just complete
                </h2>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 17, color: 'rgba(244,240,234,0.8)', lineHeight: 1.75, marginBottom: 28 }}>
                  Nine games reinforce concepts through play. Stake XP on Chess or Draughts, solve Crypto Wordle, build blocks, and race through Consensus Rush.
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {['9 unique games to play', 'Stake XP on competitive modes', 'Leaderboards per game'].map(item => (
                    <li key={item} style={{ display: 'flex', alignItems: 'center', gap: 14, fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: 'rgba(244,240,234,0.8)', marginBottom: 14 }}>
                      <span style={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(124,58,237,0.15)', color: ACCENT, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, flexShrink: 0, fontWeight: 700 }}>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="feature-mock" data-reveal="right" style={{ flex: '0 0 440px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
                  {[
                    { icon: '♟', name: 'Chess' },
                    { icon: '🔲', name: 'Draughts' },
                    { icon: '🔤', name: 'Wordle' },
                    { icon: '🧱', name: 'Block Builder' },
                    { icon: '⚡', name: 'Speed Quiz' },
                    { icon: '🔗', name: 'Consensus Rush' },
                    { icon: '🃏', name: 'Flashcards' },
                    { icon: '🎯', name: 'Word Match' },
                    { icon: '🔀', name: 'Chain Sort' },
                  ].map(g => (
                    <div key={g.name} className="game-tile">
                      <div style={{ fontSize: 26, marginBottom: 8 }}>{g.icon}</div>
                      <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, color: 'rgba(244,240,234,0.6)', fontWeight: 500 }}>{g.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 32px' }}>
          <hr style={{ border: 'none', borderTop: `1px solid ${RULE}`, margin: 0 }} />
        </div>

        {/* ── FEATURE 3: Your pace ── */}
        <section>
          <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 32px' }}>
            <div className="feature-row">
              <div className="feature-mock" data-reveal="left" style={{ flex: '0 0 440px' }}>
                <div className="mock-card" style={{ padding: 30 }}>
                  <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 12, fontWeight: 600, color: 'rgba(244,240,234,0.5)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 24 }}>Your Learning Path</div>
                  {[
                    { name: 'Bitcoin Basics', done: true, xp: '120 XP' },
                    { name: 'How Blockchain Works', done: true, xp: '160 XP' },
                    { name: 'Wallets and Keys', done: false, xp: '140 XP', active: true },
                    { name: 'DeFi Fundamentals', done: false, xp: '200 XP', locked: true },
                    { name: 'Smart Contracts', done: false, xp: '220 XP', locked: true },
                  ].map((course, i) => (
                    <div key={course.name} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{
                          width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                          background: course.done ? ACCENT : course.active ? 'rgba(124,58,237,0.2)' : 'rgba(244,240,234,0.06)',
                          border: course.active ? `2px solid ${ACCENT}` : 'none',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: 12, color: course.done ? CREAM : ACCENT,
                          fontWeight: 700,
                        }}>
                          {course.done ? '✓' : course.locked ? '🔒' : ''}
                        </div>
                        {i < 4 && <div style={{ width: 2, height: 22, background: i < 2 ? ACCENT : 'rgba(244,240,234,0.1)', marginTop: 2, marginBottom: 2 }} />}
                      </div>
                      <div style={{
                        flex: 1,
                        padding: '11px 16px',
                        borderRadius: 8,
                        background: course.active ? 'rgba(124,58,237,0.15)' : 'transparent',
                      }}>
                        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500, color: course.locked ? 'rgba(244,240,234,0.4)' : CREAM }}>{course.name}</div>
                        <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, color: course.locked ? 'rgba(244,240,234,0.4)' : ACCENT, fontWeight: 600 }}>{course.xp}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div data-reveal="right" style={{ flex: 1 }}>
                <Overline>Progression / 05</Overline>
                <h2 className="section-headline" style={{ fontFamily: "'Playfair Display', serif", fontSize: 48, fontWeight: 900, letterSpacing: '-1.5px', color: CREAM, margin: '20px 0 24px', lineHeight: 1.08 }}>
                  Your path, your pace
                </h2>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 17, color: 'rgba(244,240,234,0.8)', lineHeight: 1.75, marginBottom: 28 }}>
                  Courses unlock progressively as you build knowledge. MAIA, your personal AI guide, nudges you forward. No overwhelm, just momentum.
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {['3 difficulty levels', 'Unlocking path system', 'MAIA AI guide assists you'].map(item => (
                    <li key={item} style={{ display: 'flex', alignItems: 'center', gap: 14, fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: 'rgba(244,240,234,0.8)', marginBottom: 14 }}>
                      <span style={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(124,58,237,0.15)', color: ACCENT, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, flexShrink: 0, fontWeight: 700 }}>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 32px' }}>
          <hr style={{ border: 'none', borderTop: `1px solid ${RULE}`, margin: 0 }} />
        </div>

        {/* ── COURSES ── */}
        <section id="courses" style={{ padding: '140px 0' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 32px' }}>
            <div data-reveal="" style={{ textAlign: 'center', marginBottom: 72 }}>
              <Overline>What You&#39;ll Learn / 06</Overline>
              <h2 className="section-headline" style={{ fontFamily: "'Playfair Display', serif", fontSize: 56, fontWeight: 900, letterSpacing: '-1.5px', color: CREAM, margin: '20px 0 0' }}>
                The curriculum
              </h2>
            </div>

            <div className="course-scroll" style={{ display: 'flex', gap: 22, overflowX: 'auto', paddingBottom: 16, scrollbarWidth: 'none' }}>
              {[
                { icon: '⛓', name: 'Blockchain Fundamentals', level: 'beginner' },
                { icon: '🏦', name: 'DeFi Deep Dive', level: 'intermediate' },
                { icon: '🔒', name: 'Zero Knowledge Proofs', level: 'expert' },
                { icon: '📜', name: 'Protocol Proposals', level: 'intermediate' },
                { icon: '🌑', name: 'MEV and Dark Pools', level: 'expert' },
                { icon: '⚡', name: 'Layer 2 and Scaling', level: 'intermediate' },
                { icon: '🎨', name: 'NFTs and Digital Ownership', level: 'beginner' },
                { icon: '🏛', name: 'DAOs and Governance', level: 'intermediate' },
              ].map((c, i) => (
                <div key={c.name} className="quiet-card course-card" data-reveal="" style={{ transitionDelay: `${i * 90}ms` }}>
                  <div style={{ fontSize: 32, marginBottom: 18 }}>{c.icon}</div>
                  <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 16, fontWeight: 600, color: CREAM, marginBottom: 16, lineHeight: 1.35 }}>{c.name}</div>
                  <span className={`difficulty-badge difficulty-badge-${c.level}`}>{c.level}</span>
                </div>
              ))}
            </div>
            <style>{`.course-scroll::-webkit-scrollbar { display: none; }`}</style>

            <div style={{ textAlign: 'center', marginTop: 56 }}>
              <Link href="/auth" className="btn-primary">Browse All Courses</Link>
            </div>
          </div>
        </section>

        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 32px' }}>
          <hr style={{ border: 'none', borderTop: `1px solid ${RULE}`, margin: 0 }} />
        </div>

        {/* ── MEET MAIA ── */}
        <section style={{ padding: '140px 0' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 32px' }}>
            <div className="maia-section" style={{ display: 'flex', alignItems: 'center', gap: 100 }}>
              <div data-reveal="left" style={{ flex: '0 0 380px', position: 'relative' }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', height: 340 }}>
                  <div style={{ position: 'absolute', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.18) 0%, transparent 70%)' }} />
                  <div style={{
                    width: 120, height: 120, borderRadius: 28,
                    background: ACCENT,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: "'Playfair Display', serif", fontSize: 56, fontWeight: 900, color: CREAM,
                    boxShadow: '0 20px 60px rgba(124,58,237,0.4)',
                    position: 'relative', zIndex: 2,
                  }}>M</div>

                  <div style={{
                    position: 'absolute', top: 30, right: 0,
                    background: 'rgba(244,240,234,0.06)', borderRadius: '12px 12px 12px 2px',
                    padding: '10px 16px', boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
                    border: `1px solid ${RULE}`,
                    fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'rgba(244,240,234,0.7)',
                    maxWidth: 180, lineHeight: 1.5,
                  }}>
                    What is a gas fee and why does it change?
                  </div>

                  <div style={{
                    position: 'absolute', bottom: 40, right: 10,
                    background: ACCENT, borderRadius: '12px 12px 2px 12px',
                    padding: '10px 16px',
                    fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: CREAM, fontWeight: 400,
                    maxWidth: 200, lineHeight: 1.5,
                    boxShadow: '0 8px 24px rgba(124,58,237,0.35)',
                  }}>
                    Great question. Gas fees are paid to validators who process your transaction on Ethereum.
                  </div>

                  <div style={{
                    position: 'absolute', top: 80, left: 0,
                    background: 'rgba(244,240,234,0.06)', borderRadius: '12px 12px 12px 2px',
                    padding: '10px 16px', boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
                    border: `1px solid ${RULE}`,
                    fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'rgba(244,240,234,0.7)',
                    maxWidth: 160, lineHeight: 1.5,
                  }}>
                    Explain Layer 2 like I know Ethereum basics
                  </div>
                </div>
              </div>

              <div data-reveal="right" style={{ flex: 1 }}>
                <Overline>Your AI Companion / 07</Overline>
                <h2 className="section-headline" style={{ fontFamily: "'Playfair Display', serif", fontSize: 52, fontWeight: 900, letterSpacing: '-1.5px', color: CREAM, margin: '20px 0 24px', lineHeight: 1.08 }}>
                  Meet MAIA
                </h2>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 17, color: 'rgba(244,240,234,0.8)', lineHeight: 1.75, marginBottom: 28 }}>
                  MAIA is your personal web3 guide. Ask her anything as you go through courses. She explains concepts at your level, suggests next steps, and never judges where you are starting from.
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 40px' }}>
                  {['Answers any web3 question instantly', 'Adapts to your learning level', 'Available throughout every course'].map(item => (
                    <li key={item} style={{ display: 'flex', alignItems: 'center', gap: 14, fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: 'rgba(244,240,234,0.8)', marginBottom: 14 }}>
                      <span style={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(124,58,237,0.15)', color: ACCENT, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, flexShrink: 0, fontWeight: 700 }}>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href="/auth" className="btn-primary">Try MAIA Free</Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA: deep violet ── */}
        <section style={{ background: '#4C1D95', padding: '130px 24px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ maxWidth: 720, margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <Overline color="rgba(244,240,234,0.6)">Begin / 08</Overline>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 60, fontWeight: 900, letterSpacing: '-1.5px', color: CREAM, margin: '24px 0 24px', lineHeight: 1.05 }}>
              Ready to understand web3?
            </h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, color: 'rgba(244,240,234,0.75)', marginBottom: 48, lineHeight: 1.65 }}>
              Join thousands learning blockchain the fun way.
            </p>
            <Link href="/auth" style={{
              background: CREAM,
              color: '#4C1D95',
              border: 'none',
              padding: '18px 48px',
              borderRadius: 4,
              fontSize: 16,
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: "'Outfit', sans-serif",
              letterSpacing: '0.02em',
              textDecoration: 'none',
              display: 'inline-block',
              boxShadow: '0 12px 40px rgba(0,0,0,0.3)',
            }}>
              Start for Free
            </Link>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer style={{ background: BG, borderTop: `1px solid ${RULE}`, padding: '52px 32px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>
            <div style={logoCream}>
              <Logo size="sm" showText={true} />
            </div>

            <div style={{ display: 'flex', gap: 30 }}>
              {[['Courses', '#courses'], ['Games', '#games'], ['Sign In', '/auth']].map(([label, href]) => (
                <Link key={label} href={href} className="nav-link" style={{ fontSize: 13 }}>
                  {label}
                </Link>
              ))}
            </div>

            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 12, color: 'rgba(244,240,234,0.4)', margin: 0, letterSpacing: '0.02em' }}>
              &copy; 2025 MAIDEN. Made with purpose.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
