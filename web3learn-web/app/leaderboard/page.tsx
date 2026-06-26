'use client';
import DashboardLayout from '../components/DashboardLayout';
import { useProgress } from '../context/ProgressContext';
import { useAuth } from '../context/AuthContext';

const RANKS = [
  { title: 'Newcomer', min: 0, emoji: '🌱' },
  { title: 'Explorer', min: 100, emoji: '🔭' },
  { title: 'Builder', min: 300, emoji: '⚒️' },
  { title: 'Developer', min: 700, emoji: '💻' },
  { title: 'Architect', min: 1500, emoji: '🏗️' },
  { title: 'Expert', min: 3000, emoji: '⚡' },
  { title: 'Master', min: 6000, emoji: '👑' },
];

function getRank(xp: number) {
  return RANKS.slice().reverse().find(r => xp >= r.min) || RANKS[0];
}

const MOCK_USERS = [
  { name: 'crypto_whale',   xp: 8400, streak: 47, avatar: '🐋' },
  { name: 'defi_wizard',    xp: 6210, streak: 33, avatar: '🧙' },
  { name: 'satoshi_jr',     xp: 5950, streak: 28, avatar: '₿'  },
  { name: 'blockchain_dev', xp: 4800, streak: 21, avatar: '⛓'  },
  { name: 'nft_artist',     xp: 3700, streak: 15, avatar: '🎨' },
  { name: 'web3_builder',   xp: 2900, streak: 12, avatar: '⚒️' },
  { name: 'smart_contract', xp: 2200, streak: 9,  avatar: '📝' },
  { name: 'eth_explorer',   xp: 1600, streak: 8,  avatar: '🔭' },
  { name: 'dao_member',     xp: 1100, streak: 6,  avatar: '🏛️' },
  { name: 'token_trader',   xp: 750,  streak: 4,  avatar: '💱' },
];

export default function LeaderboardPage() {
  const { xp, streak } = useProgress();
  const { email, isGuest } = useAuth();

  const displayName = isGuest ? 'You (Guest)' : (email?.split('@')[0] ?? 'You');
  const userRank = getRank(xp);

  const allUsers = [...MOCK_USERS, { name: displayName, xp, streak, avatar: '⭐', isYou: true }]
    .sort((a, b) => b.xp - a.xp);
  const userPosition = allUsers.findIndex(u => (u as { isYou?: boolean }).isYou) + 1;

  return (
    <DashboardLayout title="Leaderboard">
      <section style={{ marginBottom: 40 }}>
        <h1 style={{ margin: '0 0 8px', fontSize: 48, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
          Leaderboard.
        </h1>
        <p style={{ margin: 0, fontSize: 16, color: 'var(--text-tertiary)' }}>Global ranking by XP earned.</p>
      </section>

      <div style={{ maxWidth: 820 }}>
        {/* Your rank banner */}
        <div style={{
          background: 'var(--accent-subtle)', border: '1px solid var(--accent-glow)',
          borderRadius: 20, padding: '20px 24px', marginBottom: 20,
          display: 'flex', alignItems: 'center', gap: 16,
        }}>
          <div style={{
            width: 44, height: 44, borderRadius: 12, flexShrink: 0,
            background: 'var(--accent-subtle)', border: '1px solid var(--accent-glow)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
          }}>⭐</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 10.5, color: 'var(--text-disabled)', fontWeight: 600, letterSpacing: '0.06em', marginBottom: 3 }}>YOUR POSITION</div>
            <div style={{ fontSize: 17, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>#{userPosition}: {displayName}</div>
            <div style={{ fontSize: 12.5, color: 'var(--text-tertiary)', marginTop: 2 }}>
              {xp.toLocaleString()} XP · {userRank.emoji} {userRank.title} · {streak}d streak
            </div>
          </div>
          <div style={{ fontSize: 40, fontWeight: 800, color: 'var(--accent)', letterSpacing: '-0.03em' }}>#{userPosition}</div>
        </div>

        {/* Table */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 20, overflow: 'hidden' }}>
          <div style={{
            display: 'grid', gridTemplateColumns: '52px 1fr 110px 100px 100px',
            padding: '12px 20px', borderBottom: '1px solid var(--border-subtle)',
            fontSize: 10.5, fontWeight: 600, color: 'var(--text-disabled)', letterSpacing: '0.07em',
          }}>
            <div>#</div><div>PLAYER</div>
            <div style={{ textAlign: 'right' }}>XP</div>
            <div style={{ textAlign: 'right' }}>STREAK</div>
            <div style={{ textAlign: 'right' }}>RANK</div>
          </div>

          {allUsers.map((user, i) => {
            const pos   = i + 1;
            const isYou = (user as { isYou?: boolean }).isYou;
            const rank  = getRank(user.xp);
            return (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: '52px 1fr 110px 100px 100px',
                padding: '13px 20px',
                borderBottom: i < allUsers.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                background: isYou ? 'var(--accent-subtle)' : 'transparent',
                transition: 'background 150ms',
              }}
              onMouseEnter={e => { if (!isYou) (e.currentTarget as HTMLElement).style.background = 'var(--bg-card-low)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = isYou ? 'var(--accent-subtle)' : 'transparent'; }}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {pos <= 3 ? (
                    <span style={{ fontSize: 18 }}>{pos === 1 ? '🥇' : pos === 2 ? '🥈' : '🥉'}</span>
                  ) : (
                    <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-disabled)' }}>#{pos}</span>
                  )}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: 8, flexShrink: 0,
                    background: isYou ? 'var(--accent-subtle)' : 'var(--bg-card-hover)',
                    border: `1px solid ${isYou ? 'var(--accent-glow)' : 'var(--border)'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16,
                  }}>{user.avatar}</div>
                  <div style={{ fontSize: 14, fontWeight: 500, color: isYou ? 'var(--accent)' : 'var(--text-primary)' }}>
                    {user.name} {isYou && <span style={{ fontSize: 10.5, fontWeight: 600, color: 'var(--text-disabled)' }}>(you)</span>}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--gold)' }}>{user.xp.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 3 }}>
                  <span style={{ fontSize: 12 }}>🔥</span>
                  <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)' }}>{user.streak}d</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 4 }}>
                  <span style={{ fontSize: 13 }}>{rank.emoji}</span>
                  <span style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>{rank.title}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ textAlign: 'center', marginTop: 18, fontSize: 12, color: 'var(--text-disabled)' }}>
          Ranking updates as you complete lessons and quizzes.
        </div>
      </div>
    </DashboardLayout>
  );
}
