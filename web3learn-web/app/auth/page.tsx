'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import Logo from '../components/Logo';

// signIn from next-auth/react, dynamically imported so build doesn't break
// if next-auth isn't installed yet. Run `npm install next-auth` first.
let _signIn: ((provider: string) => void) | null = null;
if (typeof window !== 'undefined') {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  import('next-auth/react' as any).then((mod: any) => { _signIn = mod.signIn; }).catch(() => {});
}

const FLOATING_ICONS = [
  { icon: '₿', x: 12, y: 18, size: 36, delay: 0,    dur: 7  },
  { icon: '◆', x: 75, y: 55, size: 24, delay: 1.5,  dur: 9  },
  { icon: '⬡', x: 35, y: 72, size: 28, delay: 0.8,  dur: 8  },
  { icon: '∞', x: 82, y: 22, size: 32, delay: 2.2,  dur: 10 },
  { icon: '🔗',x: 55, y: 40, size: 20, delay: 1.0,  dur: 6  },
  { icon: '◎', x: 20, y: 60, size: 22, delay: 3.0,  dur: 11 },
  { icon: '⟠', x: 65, y: 80, size: 18, delay: 0.5,  dur: 8  },
  { icon: '⧫', x: 88, y: 65, size: 26, delay: 1.8,  dur: 9  },
];

export default function AuthPage() {
  const [tab, setTab]         = useState<'signin' | 'signup'>('signin');
  const [name, setName]       = useState('');
  const [email, setEmail]     = useState('');
  const [pw, setPw]           = useState('');
  const [pw2, setPw2]         = useState('');
  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp, continueAsGuest, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      try {
        const u = JSON.parse(localStorage.getItem('maiden_user') || '{}');
        // Guests go to onboarding, not home
        if (!u.isGuest) router.replace('/home');
      } catch {
        router.replace('/home');
      }
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email.trim() || !pw.trim()) { setError('Please fill in all fields.'); return; }
    if (tab === 'signup' && pw !== pw2) { setError('Passwords do not match.'); return; }
    setLoading(true);
    try {
      if (tab === 'signin') await signIn(email, pw);
      else await signUp(email, pw);
      const hasOnboarded = localStorage.getItem('maiden_onboarded');
      router.replace(hasOnboarded ? '/home' : '/onboarding');
    } catch {
      setError('Something went wrong. Try again.');
    } finally { setLoading(false); }
  };

  const handleGuest = () => {
    continueAsGuest();
    const guestUser = { name: 'Explorer', avatar: '🧭', level: 'beginner', isGuest: true, xp: 0, mp: 0 };
    localStorage.setItem('maiden_user', JSON.stringify(guestUser));
    router.replace('/onboarding');
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex',
      fontFamily: "'Inter', -apple-system, sans-serif",
      background: 'var(--bg)',
    }}>
      <style>{`
        @keyframes driftUp {
          0%   { transform: translateY(0px);      opacity: 0;   }
          8%   { opacity: 0.18; }
          88%  { opacity: 0.12; }
          100% { transform: translateY(-110vh);   opacity: 0;   }
        }
        @keyframes auroraBlob {
          0%,100% { transform: translate(0,0) scale(1);          opacity: 0.9; }
          33%      { transform: translate(50px,-40px) scale(1.12); opacity: 1;   }
          66%      { transform: translate(-25px,30px) scale(0.94); opacity: 0.7; }
        }
        .auth-input{transition:all 150ms ease;}
        .auth-input:focus{outline:none;border-color:var(--accent)!important;background:var(--glass-hover)!important;box-shadow:0 0 0 3px var(--accent-glow)!important;}
        .tab-btn:hover{background:var(--glass-hover)!important;}
      `}</style>

      {/* Left panel: brand hero */}
      <div style={{
        flex: '0 0 60%', position: 'relative', overflow: 'hidden',
        background: 'linear-gradient(145deg, #1A0533 0%, #05070F 40%, #051A2E 100%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: '60px 80px',
      }}>
        {/* Animated aurora blobs */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          <div style={{
            position: 'absolute', width: 700, height: 700, borderRadius: '50%',
            top: -280, left: -220,
            background: 'radial-gradient(circle, rgba(109,40,217,0.30) 0%, transparent 65%)',
            filter: 'blur(50px)',
            animation: 'auroraBlob 10s ease-in-out infinite',
          }} />
          <div style={{
            position: 'absolute', width: 580, height: 580, borderRadius: '50%',
            bottom: -160, right: -130,
            background: 'radial-gradient(circle, rgba(6,182,212,0.24) 0%, transparent 65%)',
            filter: 'blur(50px)',
            animation: 'auroraBlob 14s ease-in-out infinite reverse',
            animationDelay: '-5s',
          }} />
          <div style={{
            position: 'absolute', width: 400, height: 400, borderRadius: '50%',
            top: '38%', left: '45%', transform: 'translate(-50%,-50%)',
            background: 'radial-gradient(circle, rgba(245,158,11,0.10) 0%, transparent 70%)',
            filter: 'blur(35px)',
            animation: 'auroraBlob 18s ease-in-out infinite',
            animationDelay: '-9s',
          }} />
          {/* Grid overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: [
              'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)',
              'linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
            ].join(','),
            backgroundSize: '50px 50px',
          }} />
        </div>

        {/* Crypto symbols drifting upward */}
        {FLOATING_ICONS.map((item, i) => (
          <div key={i} style={{
            position: 'absolute', left: `${item.x}%`, bottom: '-4%',
            fontSize: item.size, pointerEvents: 'none',
            animation: `driftUp ${item.dur + 6}s ease-in infinite`,
            animationDelay: `${item.delay * 1.5 + i * 0.8}s`,
            color: i % 3 === 0 ? '#6D28D9' : i % 3 === 1 ? '#06B6D4' : '#F59E0B',
            filter: 'blur(0.4px)',
          }}>{item.icon}</div>
        ))}

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', animation: 'fadeUp 0.7s ease both' }}>
          <div style={{ marginBottom: 32 }}>
            <Logo size="lg" showText={true} />
          </div>

          <h1 style={{
            fontSize: 48, fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.03em',
            color: '#F8FAFC', marginBottom: 16,
          }}>
            Your maiden voyage<br />
            <span className="gradient-text">into Web3</span>
            {' '}starts here.
          </h1>
          <p style={{ fontSize: 17, color: 'rgba(248,250,252,0.55)', lineHeight: 1.65, maxWidth: 440, margin: '0 auto 56px' }}>
            Master blockchain, DeFi, NFTs, and the future of the internet through gamified lessons built for every level.
          </p>

          {/* Stats */}
          <div style={{ display: 'flex', gap: 40, justifyContent: 'center' }}>
            {[['10+', 'Learning Tracks'], ['50+', 'Lessons'], ['6', 'Mini-Games']].map(([val, lab]) => (
              <div key={lab} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 32, fontWeight: 800, background: 'linear-gradient(135deg, #6D28D9, #06B6D4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', letterSpacing: '-0.02em' }}>{val}</div>
                <div style={{ fontSize: 11, color: 'rgba(248,250,252,0.4)', letterSpacing: '0.06em', marginTop: 2, fontWeight: 500 }}>{lab.toUpperCase()}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Quote */}
        <div style={{
          position: 'absolute', bottom: 36, left: 60, right: 60, zIndex: 1,
          borderLeft: '2px solid rgba(109,40,217,0.5)', paddingLeft: 16,
        }}>
          <p style={{ fontSize: 13, color: 'rgba(248,250,252,0.35)', fontStyle: 'italic', lineHeight: 1.6 }}>
            "The blockchain is an incorruptible digital ledger of economic transactions that can be programmed to record virtually everything of value."
          </p>
          <div style={{ fontSize: 11, color: 'rgba(248,250,252,0.2)', marginTop: 6 }}>- Don & Alex Tapscott</div>
        </div>
      </div>

      {/* Right panel: auth form */}
      <div style={{
        flex: '0 0 40%', display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '40px 48px', background: 'var(--bg)', position: 'relative',
      }}>
        <div style={{ width: '100%', maxWidth: 380, animation: 'fadeUp 0.5s 0.15s ease both', animationFillMode: 'both' }}>
          <div style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: 26, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.025em', marginBottom: 6 }}>
              {tab === 'signin' ? 'Welcome back' : 'Create account'}
            </h2>
            <p style={{ fontSize: 14, color: 'var(--text-tertiary)' }}>
              {tab === 'signin' ? 'Sign in to continue your journey.' : 'Start your maiden voyage today.'}
            </p>
          </div>

          {/* Tab toggle */}
          <div style={{ display: 'flex', marginBottom: 24, background: 'var(--glass)', border: '1px solid var(--glass-border)', borderRadius: 10, padding: 3 }}>
            {(['signin', 'signup'] as const).map(t => (
              <button key={t} className="tab-btn"
                onClick={() => { setTab(t); setError(''); }}
                style={{
                  flex: 1, padding: '8px', borderRadius: 7, border: 'none', cursor: 'pointer', fontSize: 13,
                  background: tab === t ? 'var(--accent)' : 'transparent',
                  color: tab === t ? '#fff' : 'var(--text-secondary)',
                  fontWeight: tab === t ? 600 : 400,
                  transition: 'all 150ms',
                }}
              >{t === 'signin' ? 'Sign In' : 'Create Account'}</button>
            ))}
          </div>

          {/* Google OAuth button */}
          <button
            onClick={() => {
              try {
                if (_signIn) _signIn('google');
              } catch (err) {
                console.error('Google sign-in error:', err);
              }
            }}
            style={{
              width: '100%', padding: '11px', borderRadius: 10, border: '1px solid var(--glass-border)',
              background: 'var(--glass)', color: 'var(--text-primary)', fontSize: 14, fontWeight: 500,
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
              marginBottom: 16, transition: 'all 150ms',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--glass-hover)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent-glow)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'var(--glass)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--glass-border)'; }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Continue with Google
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <div style={{ flex: 1, height: 1, background: 'var(--glass-border)' }} />
            <span style={{ fontSize: 11, color: 'var(--text-tertiary)', letterSpacing: '0.06em' }}>OR</span>
            <div style={{ flex: 1, height: 1, background: 'var(--glass-border)' }} />
          </div>

          <form onSubmit={handleSubmit}>
            {tab === 'signup' && (
              <div style={{ marginBottom: 10 }}>
                <input className="auth-input" type="text" placeholder="Display name" value={name} onChange={e => setName(e.target.value)}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: 10, fontSize: 14, background: 'var(--input-bg)', border: '1px solid var(--input-border)', color: 'var(--text-primary)', boxSizing: 'border-box' }} />
              </div>
            )}
            <div style={{ marginBottom: 10 }}>
              <input className="auth-input" type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)}
                style={{ width: '100%', padding: '12px 14px', borderRadius: 10, fontSize: 14, background: 'var(--input-bg)', border: '1px solid var(--input-border)', color: 'var(--text-primary)', boxSizing: 'border-box' }} />
            </div>
            <div style={{ marginBottom: tab === 'signup' ? 10 : 6 }}>
              <input className="auth-input" type="password" placeholder="Password" value={pw} onChange={e => setPw(e.target.value)}
                style={{ width: '100%', padding: '12px 14px', borderRadius: 10, fontSize: 14, background: 'var(--input-bg)', border: '1px solid var(--input-border)', color: 'var(--text-primary)', boxSizing: 'border-box' }} />
            </div>
            {tab === 'signup' && (
              <div style={{ marginBottom: 6 }}>
                <input className="auth-input" type="password" placeholder="Confirm password" value={pw2} onChange={e => setPw2(e.target.value)}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: 10, fontSize: 14, background: 'var(--input-bg)', border: '1px solid var(--input-border)', color: 'var(--text-primary)', boxSizing: 'border-box' }} />
              </div>
            )}
            {tab === 'signin' && (
              <div style={{ textAlign: 'right', marginBottom: 16 }}>
                <button type="button" style={{ fontSize: 12, color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer' }}>Forgot password?</button>
              </div>
            )}

            {error && (
              <div style={{ padding: '10px 14px', borderRadius: 9, background: 'var(--error-bg)', border: '1px solid var(--error)', fontSize: 13, color: 'var(--error)', marginBottom: 14 }}>{error}</div>
            )}

            <button type="submit" disabled={loading} style={{
              width: '100%', padding: '13px', borderRadius: 10, border: 'none',
              background: loading ? 'var(--glass-border)' : 'var(--accent)',
              color: '#fff', fontSize: 15, fontWeight: 600, cursor: loading ? 'wait' : 'pointer',
              transition: 'all 150ms', letterSpacing: '-0.01em',
              
              marginBottom: 14,
            }}>
              {loading ? 'Loading…' : (tab === 'signin' ? 'Sign In' : 'Create Account')}
            </button>
          </form>

          <button onClick={handleGuest} style={{
            width: '100%', padding: '12px', borderRadius: 10, border: '1px solid var(--glass-border)',
            background: 'transparent', color: 'var(--text-secondary)', fontSize: 14, cursor: 'pointer',
            transition: 'all 150ms',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-hover)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--glass-border)'; }}
          >Continue as Guest</button>

          <p style={{ textAlign: 'center', fontSize: 11, color: 'var(--text-disabled)', marginTop: 20 }}>
            By continuing, you agree to MAIDEN's Terms of Service.
          </p>
        </div>
      </div>
    </div>
  );
}
