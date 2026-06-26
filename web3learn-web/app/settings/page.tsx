'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface UserData {
  name: string;
  avatar: string;
  difficulty: string;
  xp: number;
  mp: number;
  streak: number;
  joined: string;
  isGuest?: boolean;
  level?: string;
  track?: string | null;
}

type Tab = 'profile' | 'progress' | 'preferences' | 'account' | 'about';

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id:'profile',     label:'Profile',     icon:'👤' },
  { id:'progress',    label:'Progress',    icon:'📊' },
  { id:'preferences', label:'Preferences', icon:'⚙️' },
  { id:'account',     label:'Account',     icon:'🔐' },
  { id:'about',       label:'About',       icon:'ℹ️' },
];

const AVATARS = ['🧑','👩','🧙','🦸','🤖','🦊','🐉','🦋'];

export default function SettingsPage() {
  const [tab, setTab]               = useState<Tab>('profile');
  const [user, setUser]             = useState<UserData | null>(null);
  const [editName, setEditName]     = useState('');
  const [editAvatar, setEditAvatar] = useState('');
  const [theme, setTheme]           = useState<'dark'|'light'>('dark');
  const [notifications, setNotifications] = useState(true);
  const [soundFx, setSoundFx]       = useState(true);
  const [saved, setSaved]           = useState(false);

  // Developer mode
  const [devTaps, setDevTaps]       = useState(0);
  const [devUnlocked, setDevUnlocked] = useState(false);
  const [testMode, setTestMode]     = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('maiden_user');
      if (raw) {
        const u = JSON.parse(raw) as UserData;
        setUser(u); setEditName(u.name); setEditAvatar(u.avatar);
      }
      const t = (localStorage.getItem('maiden_theme') as 'dark'|'light') ?? 'dark';
      setTheme(t);
      setNotifications(localStorage.getItem('maiden_notifications') !== 'false');
      setSoundFx(localStorage.getItem('maiden_soundfx') !== 'false');
      setTestMode(localStorage.getItem('maiden_test_mode') === 'true');
    } catch { /* ignore */ }
  }, []);

  function handleVersionTap() {
    const next = devTaps + 1;
    setDevTaps(next);
    if (next >= 5) setDevUnlocked(true);
  }

  function toggleTestMode() {
    const newMode = !testMode;
    setTestMode(newMode);
    localStorage.setItem('maiden_test_mode', newMode ? 'true' : 'false');
    if (newMode) {
      const raw = localStorage.getItem('maiden_user');
      if (raw) {
        try {
          const u = JSON.parse(raw);
          u.xp = 9999;
          u.mp = 9999;
          localStorage.setItem('maiden_user', JSON.stringify(u));
          setUser({ ...u });
        } catch { /* ignore */ }
      }
      const progress = JSON.parse(localStorage.getItem('maiden_progress') || '{}');
      progress.testMode = true;
      localStorage.setItem('maiden_progress', JSON.stringify(progress));
    } else {
      const progress = JSON.parse(localStorage.getItem('maiden_progress') || '{}');
      progress.testMode = false;
      localStorage.setItem('maiden_progress', JSON.stringify(progress));
    }
  }

  function saveProfile() {
    if (!user) return;
    const updated = { ...user, name: editName.trim() || user.name, avatar: editAvatar };
    localStorage.setItem('maiden_user', JSON.stringify(updated));
    setUser(updated);
    setSaved(true); setTimeout(() => setSaved(false), 2000);
  }

  function toggleTheme() {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('maiden_theme', next);
  }

  function savePrefs() {
    localStorage.setItem('maiden_notifications', String(notifications));
    localStorage.setItem('maiden_soundfx', String(soundFx));
    setSaved(true); setTimeout(() => setSaved(false), 2000);
  }

  function resetProgress() {
    if (!confirm('Reset all progress? This cannot be undone.')) return;
    if (!user) return;
    const reset = { ...user, xp: 0, mp: 0, streak: 0 };
    localStorage.setItem('maiden_user', JSON.stringify(reset));
    setUser(reset);
  }

  function deleteAccount() {
    if (!confirm('Delete your account and all data? This cannot be undone.')) return;
    localStorage.clear();
    window.location.href = '/';
  }

  const xpToNext = user ? Math.ceil((user.xp / 100 + 1)) * 100 - user.xp : 0;
  const level    = user ? Math.floor(user.xp / 100) + 1 : 1;

  return (
    <div style={{ minHeight:'100vh', background:'var(--bg)', fontFamily:"'Outfit',sans-serif", padding:'40px 24px' }}>
      <div style={{ maxWidth:760, margin:'0 auto' }}>
        <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:36 }}>
          <Link href="/home" style={{ fontSize:13, color:'var(--text-muted)', textDecoration:'none' }}>← Dashboard</Link>
          <div style={{ flex:1 }} />
          {saved && <span style={{ fontSize:12, color:'#10B981', fontWeight:600 }}>Saved!</span>}
        </div>

        <h1 style={{ margin:'0 0 32px', fontSize:28, fontWeight:800, color:'var(--text-primary)' }}>Settings</h1>

        <div style={{ display:'grid', gridTemplateColumns:'200px 1fr', gap:24 }}>
          <div style={{ display:'flex', flexDirection:'column', gap:4 }}>
            {TABS.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)} style={{
                padding:'11px 16px', borderRadius:12, textAlign:'left', cursor:'pointer', fontWeight:600, fontSize:14,
                display:'flex', alignItems:'center', gap:10, border:'none',
                background: tab===t.id ? 'var(--accent-subtle)' : 'transparent',
                color: tab===t.id ? 'var(--accent)' : 'var(--text-secondary)',
                transition:'all 150ms',
              }}>
                <span>{t.icon}</span>{t.label}
              </button>
            ))}
          </div>

          <div style={{ background:'var(--glass)', border:'1px solid var(--glass-border)', borderRadius:20, padding:'28px 32px', boxShadow:'var(--card-shadow)' }}>

            {tab === 'profile' && (
              <div>
                <h2 style={{ margin:'0 0 24px', fontSize:18, fontWeight:700, color:'var(--text-primary)' }}>Profile</h2>
                <div style={{ marginBottom:24 }}>
                  <div style={{ fontSize:12, fontWeight:600, color:'var(--text-muted)', marginBottom:10, letterSpacing:'0.06em' }}>AVATAR</div>
                  <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
                    {AVATARS.map(a => (
                      <button key={a} onClick={() => setEditAvatar(a)} style={{
                        width:48, height:48, borderRadius:12, fontSize:24, cursor:'pointer',
                        border:`2px solid ${editAvatar===a ? 'var(--accent)' : 'var(--glass-border)'}`,
                        background: editAvatar===a ? 'var(--accent-subtle)' : 'var(--glass)',
                        transition:'all 150ms',
                      }}>{a}</button>
                    ))}
                  </div>
                </div>
                <div style={{ marginBottom:24 }}>
                  <label style={{ fontSize:12, fontWeight:600, color:'var(--text-muted)', letterSpacing:'0.06em', display:'block', marginBottom:8 }}>DISPLAY NAME</label>
                  <input value={editName} onChange={e => setEditName(e.target.value)} maxLength={32}
                    style={{ width:'100%', padding:'11px 14px', borderRadius:10, border:'1px solid var(--glass-border)', background:'var(--glass)', color:'var(--text-primary)', fontSize:14, outline:'none', boxSizing:'border-box' }} />
                </div>
                {user && (
                  <div style={{ marginBottom:24, padding:'14px 18px', borderRadius:12, background:'var(--glass)', border:'1px solid var(--glass-border)' }}>
                    <div style={{ fontSize:12, color:'var(--text-muted)', marginBottom:6 }}>LEVEL</div>
                    <div style={{ fontSize:15, fontWeight:600, color:'var(--text-primary)', textTransform:'capitalize' }}>{user.level ?? user.difficulty}</div>
                  </div>
                )}
                <button onClick={saveProfile} style={{ padding:'11px 24px', borderRadius:12, border:'none', cursor:'pointer', background:'var(--accent)', color:'#fff', fontWeight:700, fontSize:14 }}>Save Profile</button>
              </div>
            )}

            {tab === 'progress' && (
              <div>
                <h2 style={{ margin:'0 0 24px', fontSize:18, fontWeight:700, color:'var(--text-primary)' }}>Progress</h2>
                {user ? (
                  <>
                    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginBottom:24 }}>
                      {[
                        ['Level', String(level), 'var(--accent)'],
                        ['Total XP', String(user.xp), '#F59E0B'],
                        ['MAIDEN Points', String(user.mp ?? 0), '#A78BFA'],
                        ['Day Streak', `${user.streak} days`, '#10B981'],
                      ].map(([lab, val, col]) => (
                        <div key={lab} style={{ background:'var(--glass)', border:'1px solid var(--glass-border)', borderRadius:14, padding:'16px 18px' }}>
                          <div style={{ fontSize:22, fontWeight:800, color:col }}>{val}</div>
                          <div style={{ fontSize:11, color:'var(--text-muted)', marginTop:4 }}>{lab}</div>
                        </div>
                      ))}
                    </div>
                    <div style={{ marginBottom:20 }}>
                      <div style={{ display:'flex', justifyContent:'space-between', fontSize:12, color:'var(--text-muted)', marginBottom:8 }}>
                        <span>Level {level}</span><span>Level {level+1}</span>
                      </div>
                      <div style={{ height:8, background:'var(--glass-border)', borderRadius:4, overflow:'hidden' }}>
                        <div style={{ height:'100%', width:`${((user.xp % 100)/100)*100}%`, background:'linear-gradient(90deg,var(--accent),#06B6D4)', borderRadius:4, transition:'width 600ms ease' }} />
                      </div>
                      <div style={{ fontSize:11, color:'var(--text-muted)', marginTop:4 }}>{xpToNext} XP to next level</div>
                    </div>
                    <button onClick={resetProgress} style={{ padding:'10px 20px', borderRadius:10, border:'1px solid #EF4444', background:'rgba(239,68,68,0.08)', color:'#EF4444', fontWeight:600, fontSize:13, cursor:'pointer' }}>Reset Progress</button>
                  </>
                ) : (
                  <p style={{ color:'var(--text-muted)' }}>No progress data found.</p>
                )}
              </div>
            )}

            {tab === 'preferences' && (
              <div>
                <h2 style={{ margin:'0 0 24px', fontSize:18, fontWeight:700, color:'var(--text-primary)' }}>Preferences</h2>
                <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
                  {[
                    { label:'Dark Mode', sub:'Toggle between dark and light theme', value:theme==='dark', toggle:toggleTheme },
                    { label:'Notifications', sub:'Receive streak reminders and achievements', value:notifications, toggle:()=>setNotifications(n=>!n) },
                    { label:'Sound Effects', sub:'Play sounds during games', value:soundFx, toggle:()=>setSoundFx(s=>!s) },
                  ].map(row => (
                    <div key={row.label} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'16px 18px', borderRadius:14, background:'var(--glass)', border:'1px solid var(--glass-border)' }}>
                      <div>
                        <div style={{ fontWeight:600, color:'var(--text-primary)', fontSize:14 }}>{row.label}</div>
                        <div style={{ fontSize:12, color:'var(--text-muted)', marginTop:2 }}>{row.sub}</div>
                      </div>
                      <button onClick={row.toggle} style={{ width:48, height:26, borderRadius:13, border:'none', cursor:'pointer', position:'relative', transition:'background 200ms', background: row.value ? 'var(--accent)' : 'var(--glass-border)' }}>
                        <div style={{ position:'absolute', top:3, left: row.value ? 25 : 3, width:20, height:20, borderRadius:'50%', background:'#fff', transition:'left 200ms', boxShadow:'0 1px 4px rgba(0,0,0,0.3)' }} />
                      </button>
                    </div>
                  ))}
                </div>
                <button onClick={savePrefs} style={{ marginTop:20, padding:'11px 24px', borderRadius:12, border:'none', cursor:'pointer', background:'var(--accent)', color:'#fff', fontWeight:700, fontSize:14 }}>Save Preferences</button>
              </div>
            )}

            {tab === 'account' && (
              <div>
                <h2 style={{ margin:'0 0 24px', fontSize:18, fontWeight:700, color:'var(--text-primary)' }}>Account</h2>
                <div style={{ padding:'18px 20px', borderRadius:14, background:'var(--glass)', border:'1px solid var(--glass-border)', marginBottom:20 }}>
                  <div style={{ fontSize:12, color:'var(--text-muted)', marginBottom:4 }}>Account Type</div>
                  <div style={{ fontWeight:600, color:'var(--text-primary)' }}>Local (No cloud sync)</div>
                  <div style={{ fontSize:12, color:'var(--text-muted)', marginTop:8 }}>Your progress is saved locally on this device.</div>
                </div>
                <button onClick={() => {
                  if (user?.isGuest) localStorage.removeItem('maiden_user');
                  localStorage.removeItem('w3l_auth');
                  window.location.href = '/';
                }} style={{ display:'flex', alignItems:'center', gap:8, width:'100%', padding:'13px 20px', borderRadius:12, border:'1px solid var(--glass-border)', background:'var(--glass)', color:'var(--text-primary)', fontWeight:600, fontSize:14, cursor:'pointer', marginBottom:16, transition:'all 150ms' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)'; (e.currentTarget as HTMLElement).style.color = 'var(--accent)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--glass-border)'; (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)'; }}
                >
                  <span style={{ fontSize:16 }}>🚪</span> {user?.isGuest ? 'End Guest Session' : 'Sign Out'}
                </button>
                <div style={{ padding:'18px 20px', borderRadius:14, background:'rgba(239,68,68,0.05)', border:'1px solid rgba(239,68,68,0.2)', marginBottom:16 }}>
                  <div style={{ fontWeight:600, color:'#EF4444', marginBottom:8, fontSize:14 }}>Danger Zone</div>
                  <p style={{ fontSize:13, color:'var(--text-muted)', marginBottom:16, lineHeight:1.5 }}>Permanently delete your account and all learning data. This cannot be undone.</p>
                  <button onClick={deleteAccount} style={{ padding:'10px 20px', borderRadius:10, border:'1px solid #EF4444', background:'rgba(239,68,68,0.1)', color:'#EF4444', fontWeight:600, fontSize:13, cursor:'pointer' }}>Delete Account</button>
                </div>
                <button onClick={() => { localStorage.removeItem('maiden_onboarded'); window.location.href = '/onboarding'; }} style={{ padding:'10px 20px', borderRadius:10, border:'1px solid var(--glass-border)', background:'var(--glass)', color:'var(--text-secondary)', fontWeight:600, fontSize:13, cursor:'pointer' }}>Restart Onboarding</button>
              </div>
            )}

            {tab === 'about' && (
              <div>
                <h2 style={{ margin:'0 0 24px', fontSize:18, fontWeight:700, color:'var(--text-primary)' }}>About MAIDEN</h2>
                <div style={{ marginBottom:20 }}>
                  <div style={{ fontSize:40, marginBottom:12 }}>⚓</div>
                  <div style={{ fontSize:22, fontWeight:800, color:'var(--text-primary)', marginBottom:4 }}>MAIDEN</div>
                  <button
                    onClick={handleVersionTap}
                    style={{ fontSize:13, color: devUnlocked ? 'var(--accent)' : 'var(--text-muted)', background:'none', border:'none', cursor:'pointer', padding:0, fontFamily:'inherit' }}
                  >
                    v1.0.0-beta{devUnlocked ? ' (Dev Mode)' : ''}
                  </button>
                </div>
                <p style={{ color:'var(--text-secondary)', fontSize:14, lineHeight:1.7, marginBottom:20 }}>MAIDEN is your maiden voyage into Web3. Learn blockchain, DeFi, NFTs, and more through interactive games, quizzes, and structured tracks.</p>
                <div style={{ display:'flex', flexDirection:'column', gap:10, marginBottom:20 }}>
                  {[
                    ['200+ vocabulary terms', 'Spanning beginner to expert topics'],
                    ['6 learning games', 'Word Match, Flashcards, Fill the Blank, Speed Quiz, Chess, Draughts'],
                    ['3 experience levels', 'Beginner, Intermediate, Expert'],
                    ['Dual currency: XP and MP', 'XP tracks progress, MP powers games'],
                  ].map(([title, desc]) => (
                    <div key={title} style={{ padding:'14px 18px', borderRadius:12, background:'var(--glass)', border:'1px solid var(--glass-border)' }}>
                      <div style={{ fontWeight:600, color:'var(--text-primary)', fontSize:13 }}>{title}</div>
                      <div style={{ fontSize:12, color:'var(--text-muted)', marginTop:2 }}>{desc}</div>
                    </div>
                  ))}
                </div>

                {/* Developer section, unlocked by tapping version 5 times */}
                {devUnlocked && (
                  <div style={{ padding:'20px', borderRadius:14, background:'rgba(239,68,68,0.06)', border:'1px solid rgba(239,68,68,0.25)' }}>
                    <div style={{ fontWeight:700, color:'#EF4444', marginBottom:12, fontSize:14, display:'flex', alignItems:'center', gap:8 }}>
                      <span>🛠</span> Developer Mode
                    </div>
                    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:8 }}>
                      <div>
                        <div style={{ fontWeight:600, color:'var(--text-primary)', fontSize:14 }}>Test Mode</div>
                        <div style={{ fontSize:12, color:'var(--text-muted)', marginTop:2 }}>Unlocks all tracks, grants 9999 XP and MP, bypasses MP gate on games.</div>
                      </div>
                      <button onClick={toggleTestMode} style={{ width:48, height:26, borderRadius:13, border:'none', cursor:'pointer', position:'relative', transition:'background 200ms', background: testMode ? '#EF4444' : 'var(--glass-border)', flexShrink:0, marginLeft:16 }}>
                        <div style={{ position:'absolute', top:3, left: testMode ? 25 : 3, width:20, height:20, borderRadius:'50%', background:'#fff', transition:'left 200ms', boxShadow:'0 1px 4px rgba(0,0,0,0.3)' }} />
                      </button>
                    </div>
                    {testMode && (
                      <div style={{ fontSize:12, color:'#EF4444', fontWeight:600, marginTop:8 }}>
                        TEST MODE ACTIVE: All restrictions bypassed.
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
