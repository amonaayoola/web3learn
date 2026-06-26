'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAllTracks } from '../lib/data';
import Logo from '../components/Logo';
import ShareableCard from '../components/ShareableCard';

const AVATARS = [
  { emoji: '🦊', label: 'Fox' },
  { emoji: '🐉', label: 'Dragon' },
  { emoji: '🦁', label: 'Lion' },
  { emoji: '🐺', label: 'Wolf' },
  { emoji: '🦅', label: 'Eagle' },
  { emoji: '🐬', label: 'Dolphin' },
  { emoji: '🦋', label: 'Butterfly' },
  { emoji: '🔮', label: 'Oracle' },
];

interface AssessQuestion {
  q: string;
  opts: { label: string; pts: number }[];
  correctIdx: number;
  explanation: string;
}

const QUESTION_LIBRARY: AssessQuestion[] = [
  {
    q: 'On Ethereum, if the base fee is 15 gwei and you set a max fee of 12 gwei, what happens to your transaction?',
    opts: [
      { label: 'It executes immediately', pts: 0 },
      { label: 'It gets included but you overpay', pts: 0 },
      { label: 'It stays pending until the base fee drops below 12 gwei', pts: 2 },
      { label: 'It fails with an out-of-gas error', pts: 0 },
    ],
    correctIdx: 2,
    explanation: 'If your max fee is below the current base fee, validators cannot include your transaction without losing money. It stays in the mempool pending until the base fee drops, or you cancel and resubmit with a higher max fee.',
  },
  {
    q: 'A DeFi protocol has $100M TVL. An attacker borrows $50M via flash loan, manipulates the price oracle, borrows against inflated collateral, then repays the flash loan in the same transaction. What vulnerability did they exploit?',
    opts: [
      { label: 'A reentrancy attack', pts: 0 },
      { label: 'An oracle manipulation (price manipulation) attack', pts: 3 },
      { label: 'A front-running attack', pts: 0 },
      { label: 'A 51% attack', pts: 0 },
    ],
    correctIdx: 1,
    explanation: 'This is a classic flash loan oracle manipulation attack. The attacker exploits a protocol relying on a DEX spot price as its oracle. By temporarily moving the pool price with the flash loan, they borrow far more than their collateral is worth, repay the flash loan, and pocket the profit.',
  },
  {
    q: 'You deploy a smart contract and discover a critical bug after deployment. There is no proxy pattern. What can you do?',
    opts: [
      { label: 'Call the owner function to patch the bytecode', pts: 0 },
      { label: 'Submit a governance proposal to fix the bytecode on-chain', pts: 0 },
      { label: 'Nothing: smart contracts are immutable once deployed', pts: 2 },
      { label: 'Use selfdestruct to delete and redeploy at the same address', pts: 0 },
    ],
    correctIdx: 2,
    explanation: 'Without an upgradeable proxy pattern, deployed contract bytecode is permanent. You cannot modify it. The only options are deploying a new contract at a new address and migrating users, or triggering an emergency pause if one was built in.',
  },
  {
    q: 'In a Uniswap V2 ETH/USDC pool, you provide liquidity when ETH = $2000. ETH later drops to $1000. Compared to simply holding the same assets, your LP position is:',
    opts: [
      { label: 'Worth more because of accumulated trading fees', pts: 0 },
      { label: 'Worth less due to impermanent loss, partially offset by fees earned', pts: 3 },
      { label: 'Identical in value since the pool always rebalances to the same ratio', pts: 0 },
      { label: 'Worth nothing because the position was liquidated', pts: 0 },
    ],
    correctIdx: 1,
    explanation: 'Impermanent loss occurs because the AMM rebalances your position as price moves. When ETH drops 50%, your LP holds more ETH and less USDC than a simple hold — but at the lower price that means less total value. The loss is only impermanent if price returns to entry. Fees partially offset this.',
  },
  {
    q: 'An Ethereum validator runs two clients that both sign blocks for the same slot. What is the consequence?',
    opts: [
      { label: 'The validator earns double block rewards', pts: 0 },
      { label: 'The validator gets slashed and loses a portion of their 32 ETH stake', pts: 3 },
      { label: 'Both blocks are rejected and no one is penalized', pts: 0 },
      { label: 'The network forks into two chains permanently', pts: 0 },
    ],
    correctIdx: 1,
    explanation: 'Signing two different blocks for the same slot is equivocation, a slashable offense under Ethereum PoS. Slashing destroys a portion of the validator\'s 32 ETH deposit and forcibly exits them. A correlation penalty applies if many validators are slashed simultaneously, indicating a coordinated attack.',
  },
  {
    q: 'A DEX trader notices a large pending swap in the mempool and places two transactions: one before and one after it. What is this strategy called?',
    opts: [
      { label: 'Arbitrage: exploiting price differences between two DEXes', pts: 0 },
      { label: 'Sandwich attack: manipulating the victim\'s slippage for profit', pts: 3 },
      { label: 'Wash trading: artificially inflating volume', pts: 0 },
      { label: 'Flash loan attack: borrowing and repaying in a single block', pts: 0 },
    ],
    correctIdx: 1,
    explanation: 'A sandwich attack is a form of MEV. The attacker front-runs with a buy order to push the price up, lets the victim\'s trade execute at the worse price, then back-runs with a sell to capture the impact. The victim experiences excess slippage; the attacker pockets the difference.',
  },
  {
    q: 'An Optimistic Rollup posts a transaction batch to Ethereum. When can funds be safely withdrawn back to L1?',
    opts: [
      { label: 'Immediately, since all transactions are confirmed on L2', pts: 0 },
      { label: 'After the challenge period ends (typically 7 days)', pts: 3 },
      { label: 'After the next Ethereum hard fork', pts: 0 },
      { label: 'Only if a ZK proof is submitted within 1 hour', pts: 0 },
    ],
    correctIdx: 1,
    explanation: 'Optimistic Rollups assume validity and only run fraud proofs if challenged. The 7-day withdrawal window gives anyone time to submit a fraud proof if a transaction is invalid. ZK Rollups can withdraw faster because they submit cryptographic validity proofs immediately.',
  },
  {
    q: 'You want to store your seed phrase securely. Which practice is most dangerous?',
    opts: [
      { label: 'Writing it on paper and storing it in a fireproof safe', pts: 0 },
      { label: 'Splitting it across two laminated cards in separate locations', pts: 0 },
      { label: 'Taking a screenshot and saving it to your cloud photo library', pts: 2 },
      { label: 'Engraving it on a metal plate', pts: 0 },
    ],
    correctIdx: 2,
    explanation: 'Cloud storage is online and accessible to anyone who compromises your account. A screenshot in iCloud or Google Photos has been the attack vector in numerous wallet drains. Seed phrases must stay offline. Never digital.',
  },
  {
    q: 'A constant-product AMM pool contains 100 ETH and 200,000 USDC (k = 20,000,000). A trader swaps in 10 ETH. Ignoring fees, how much USDC do they receive?',
    opts: [
      { label: '20,000 USDC (10 ETH at the current spot price)', pts: 0 },
      { label: 'Approximately 18,182 USDC', pts: 3 },
      { label: '22,000 USDC due to a slippage premium', pts: 0 },
      { label: 'Exactly 19,048 USDC', pts: 0 },
    ],
    correctIdx: 1,
    explanation: 'Using x * y = k: after adding 10 ETH, (100+10) * y_out = 20,000,000, so y_remaining = 181,818 USDC. The trader receives 200,000 - 181,818 = 18,182 USDC. This is less than the spot price value of 20,000 due to price impact. Larger trades suffer more slippage.',
  },
  {
    q: 'A lending protocol requires 150% collateralization. You deposit $1,500 of ETH and borrow $900 USDC. ETH price drops 25%. What happens?',
    opts: [
      { label: 'Nothing. You are still above the 150% threshold', pts: 0 },
      { label: 'You receive a margin call and have 24 hours to add collateral', pts: 0 },
      { label: 'Your position is liquidated because your collateral ratio dropped below 150%', pts: 2 },
      { label: 'Your borrow is automatically converted to ETH', pts: 0 },
    ],
    correctIdx: 2,
    explanation: 'After the 25% drop, your ETH is worth $1,125. Your ratio is 1,125 / 900 = 125%, below the 150% minimum. This triggers liquidation: a liquidator repays part of your debt and claims your collateral at a discount. DeFi liquidations are instant and automated.',
  },
  {
    q: 'What is the core difference between ERC-20 and ERC-721 token standards?',
    opts: [
      { label: 'ERC-721 tokens can be burned; ERC-20 tokens cannot', pts: 0 },
      { label: 'ERC-20 tokens are fungible (interchangeable); ERC-721 tokens are non-fungible (unique)', pts: 2 },
      { label: 'ERC-20 is for Ethereum mainnet only; ERC-721 works on all EVM chains', pts: 0 },
      { label: 'ERC-721 supports fractional ownership natively; ERC-20 does not', pts: 0 },
    ],
    correctIdx: 1,
    explanation: 'ERC-20 defines fungible tokens where every unit is identical (1 DAI = 1 DAI). ERC-721 defines non-fungible tokens where each has a unique ID and distinct properties. The NFT standard enables ownership of unique digital assets: art, game items, domain names, and more.',
  },
  {
    q: 'What does "not your keys, not your coins" mean in practice?',
    opts: [
      { label: 'You should encrypt your private keys with a strong password', pts: 0 },
      { label: 'If you do not control the private keys, a third party controls your funds and can freeze or lose them', pts: 2 },
      { label: 'Hardware wallets are mandatory for any serious holder', pts: 0 },
      { label: 'Multi-sig wallets are always safer than single-key wallets', pts: 0 },
    ],
    correctIdx: 1,
    explanation: 'When funds sit on an exchange or custodial wallet, you hold an IOU. The platform controls the actual private keys. If the exchange gets hacked, goes bankrupt, or freezes withdrawals, you have no direct recourse. Self-custody means you are the sole authority over your funds.',
  },
  {
    q: 'What is the primary purpose of EIP-1559 in Ethereum\'s gas mechanism?',
    opts: [
      { label: 'To increase the block gas limit automatically during congestion', pts: 0 },
      { label: 'To replace the auction model with a protocol-defined base fee that is burned, improving fee predictability', pts: 2 },
      { label: 'To allow users to pay gas fees in any ERC-20 token', pts: 0 },
      { label: 'To eliminate MEV by randomizing transaction ordering', pts: 0 },
    ],
    correctIdx: 1,
    explanation: 'EIP-1559 replaced the first-price auction with a base fee set by the protocol based on demand. This fee is burned (reducing ETH supply) and makes fees more predictable. Users also set a priority fee (tip) to incentivize validators. The base fee rises when blocks are full and falls when below half capacity.',
  },
  {
    q: 'You find a wallet containing 1,000 ETH secured by a standard 12-word seed phrase. Attempting brute force at 1 trillion guesses per second, roughly how long would it take?',
    opts: [
      { label: 'A few hours on a powerful GPU cluster', pts: 0 },
      { label: 'About 10 years with a supercomputer', pts: 0 },
      { label: 'Longer than the current age of the universe', pts: 3 },
      { label: 'It is impossible because wallets cannot be recovered from a seed phrase', pts: 0 },
    ],
    correctIdx: 2,
    explanation: 'BIP-39 phrases use 2048 possible words. A 12-word phrase has 2048^12 approximately 5.4 x 10^39 combinations. At 10^12 guesses per second, that is roughly 1.7 x 10^20 years, vastly older than the universe (~1.4 x 10^10 years). The entropy is mathematically unbreakable by brute force.',
  },
  {
    q: 'Why does storing data in contract storage (SSTORE) cost far more gas than emitting an event (LOG)?',
    opts: [
      { label: 'Events require a separate cryptographic signature per emission', pts: 0 },
      { label: 'Contract storage persists forever across all full nodes; event logs are cheaper to store and not accessible by smart contracts', pts: 3 },
      { label: 'Events are processed off-chain by validators and billed separately', pts: 0 },
      { label: 'SSTORE uses a different hashing algorithm that costs more computation', pts: 0 },
    ],
    correctIdx: 1,
    explanation: 'SSTORE costs 20,000 gas for a new storage slot because that data must be held by every full node forever. LOG opcodes cost around 375 gas plus 8 gas per byte because receipts are cheaper to store. Crucially, smart contracts cannot read event data, it is only accessible off-chain via indexers.',
  },
  {
    q: 'A ZK-SNARK lets a verifier confirm a prover knows a secret without learning it. What additional property makes ZK Rollups secure?',
    opts: [
      { label: 'They make computation faster than running it directly', pts: 0 },
      { label: 'Anyone can verify the proof without trusting the prover or re-executing the full computation', pts: 3 },
      { label: 'They permanently delete the original data after verification', pts: 0 },
      { label: 'They require a trusted third party to sign off on each proof', pts: 0 },
    ],
    correctIdx: 1,
    explanation: 'ZK proofs are succinct and non-interactive. The verifier does not need to trust the prover or re-execute the computation. This is how ZK Rollups scale Ethereum: thousands of transactions are compressed into a single small proof that Ethereum verifies cheaply, enabling massive throughput gains.',
  },
  {
    q: 'You are considering depositing into a new high-yield "farm" where both tokens are newly launched with no locked liquidity. What is the primary risk?',
    opts: [
      { label: 'Regulatory risk from SEC enforcement', pts: 0 },
      { label: 'A rug pull where the team drains the liquidity pool and disappears', pts: 3 },
      { label: 'Gas costs will exceed farming rewards over time', pts: 0 },
      { label: 'The APY will collapse to zero because bots claim all rewards', pts: 0 },
    ],
    correctIdx: 1,
    explanation: 'When liquidity is not locked (via a timelock or burned LP tokens), the team retains the ability to remove all liquidity, instantly crashing the token price to near zero. Always check whether LP tokens are locked before depositing. Unlocked liquidity is one of the clearest red flags in DeFi.',
  },
  {
    q: 'What is the key technical difference between Optimistic Rollups and ZK Rollups?',
    opts: [
      { label: 'Optimistic Rollups use EVM; ZK Rollups use a different virtual machine entirely', pts: 0 },
      { label: 'Optimistic Rollups assume validity and use fraud proofs; ZK Rollups produce cryptographic validity proofs for every batch', pts: 3 },
      { label: 'ZK Rollups are faster to execute; Optimistic Rollups have higher throughput', pts: 0 },
      { label: 'Optimistic Rollups post data off-chain; ZK Rollups post all data on-chain', pts: 0 },
    ],
    correctIdx: 1,
    explanation: 'Optimistic Rollups post batches assuming correctness and give a challenge window for fraud proofs, hence the long withdrawal delay. ZK Rollups generate a validity proof that mathematically proves the entire batch is correct before finalizing, enabling near-instant finality at the cost of heavier proof generation.',
  },
  {
    q: 'Token A has high velocity: holders earn it constantly from rewards but immediately sell it. Token B has lockup incentives and governance rights. Which is more likely to hold a higher price per unit?',
    opts: [
      { label: 'Token A, because high velocity means more people interact with it', pts: 0 },
      { label: 'Token B, because lockups reduce circulating supply and governance rights create demand for holding', pts: 3 },
      { label: 'They should be equal, since market cap only depends on supply', pts: 0 },
      { label: 'Token A, because reward tokens always appreciate over time', pts: 0 },
    ],
    correctIdx: 1,
    explanation: 'Applying MV = PQ to tokens: high velocity (V) directly suppresses price (P). Tokens earned and immediately sold create sustained sell pressure. Lockups reduce effective circulating supply, and governance rights create non-speculative demand. Lower velocity plus utility equals better long-term price support.',
  },
  {
    q: 'A governance vote requires 10% quorum of circulating token supply. Total supply is 100M tokens but 40M are locked in vesting. How many tokens must participate to meet quorum?',
    opts: [
      { label: '10,000,000 (10% of total supply)', pts: 0 },
      { label: '6,000,000 (10% of circulating supply of 60M)', pts: 2 },
      { label: '4,000,000 (10% of locked supply)', pts: 0 },
      { label: 'Quorum cannot be reached while tokens are locked', pts: 0 },
    ],
    correctIdx: 1,
    explanation: 'Quorum is calculated on circulating supply (100M - 40M locked = 60M). 10% of 60M = 6M tokens must participate. Quorum rules prevent governance attacks where a small minority passes proposals when others are absent. Low-participation votes on major protocols are controversial for this reason.',
  },
];

function scoreToLevel(score: number): { level: 'beginner' | 'intermediate' | 'expert'; emoji: string; desc: string } {
  if (score <= 4) return { level: 'beginner', emoji: '🌱', desc: "You are just starting out. We will guide you from the ground up." };
  if (score <= 8) return { level: 'intermediate', emoji: '⚒️', desc: "You know the basics. Time to go deeper into DeFi, NFTs, and more." };
  return { level: 'expert', emoji: '⚡', desc: "You are already advanced. We will challenge you with expert-level content." };
}

// Step 0: Experience Assessment
// Step 1: Avatar
// Step 2: Name
// Step 3: Track
// Step 4: Celebration

const STEP_LABELS = ['Assessment', 'Avatar', 'Name', 'Track', 'Ready'];

export default function OnboardingPage() {
  const router = useRouter();
  const tracks = getAllTracks();

  const [step, setStep] = useState(0);

  // Pick 5 random questions at mount
  const [assessQuestions] = useState<AssessQuestion[]>(() => {
    const shuffled = [...QUESTION_LIBRARY].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 5);
  });

  // Assessment state
  const [assessIdx, setAssessIdx] = useState(0);
  const [assessAnswers, setAssessAnswers] = useState<number[]>([]);
  const [assessSelected, setAssessSelected] = useState<number | null>(null);
  const [assessSelectedIdx, setAssessSelectedIdx] = useState<number | null>(null);
  const [assessExplaining, setAssessExplaining] = useState(false);
  const [assessDone, setAssessDone] = useState(false);

  // Profile state
  const [avatar, setAvatar] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState('');

  // Track state
  const [selectedTrack, setSelectedTrack] = useState<string | null>(null);

  // Share card state
  const [cardBusy, setCardBusy] = useState(false);

  const totalScore = assessAnswers.reduce((s, pts) => s + pts, 0);
  const deduced = scoreToLevel(totalScore);
  const maxScore = assessQuestions.reduce((s, q) => s + Math.max(...q.opts.map(o => o.pts)), 0);

  async function handleDownloadCard() {
    setCardBusy(true);
    try {
      const html2canvas = (await import('html2canvas')).default;
      const el = document.getElementById('share-card');
      if (!el) return;
      const canvas = await html2canvas(el, { backgroundColor: '#0a0806', scale: 2, useCORS: true, logging: false });
      const link = document.createElement('a');
      link.download = `maiden-score-${deduced.level}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (e) {
      console.error('Card generation failed', e);
    } finally {
      setCardBusy(false);
    }
  }

  function handleShareX() {
    const text = `Just scored ${totalScore}/${maxScore} on my web3 knowledge assessment on MAIDEN, ranked ${deduced.level.toUpperCase()}. Start your own journey: https://web3learn-web.vercel.app`;
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&hashtags=MAIDEN,Web3,LearnWeb3`;
    window.open(tweetUrl, '_blank', 'noopener,noreferrer');
  }

  const finish = () => {
    localStorage.setItem('maiden_onboarded', '1');
    const user = {
      name: displayName,
      avatar: avatar ?? '🦊',
      difficulty: deduced.level,
      level: deduced.level,
      onboardingScore: totalScore,
      xp: 0,
      mp: 0,
      streak: 0,
      joined: new Date().toISOString(),
    };
    localStorage.setItem('maiden_user', JSON.stringify(user));
    if (selectedTrack) localStorage.setItem('maiden_first_track', selectedTrack);
    router.replace('/home');
  };

  function pickAssessAnswer(pts: number, optIdx: number) {
    if (assessSelected !== null) return;
    setAssessSelected(pts);
    setAssessSelectedIdx(optIdx);
    setAssessExplaining(true);
  }

  function nextAssessQuestion() {
    const pts = assessSelected ?? 0;
    const next = assessIdx + 1;
    setAssessAnswers(prev => [...prev, pts]);
    setAssessExplaining(false);
    setAssessSelected(null);
    setAssessSelectedIdx(null);
    if (next >= assessQuestions.length) {
      setAssessDone(true);
    } else {
      setAssessIdx(next);
    }
  }

  // Tracks filtered by level
  const levelToTrackLevel: Record<string, number[]> = {
    beginner: [1, 2],
    intermediate: [1, 2, 3],
    expert: [1, 2, 3, 4],
  };
  const visibleTrackLevels = levelToTrackLevel[deduced.level] ?? [1, 2];

  const TRACK_LEVELS: Record<string, number> = {
    fundamentals: 1, trading: 1, ai: 1,
    defi: 2, nft: 2, security: 2, tokenomics: 2,
    dev: 3, layer2: 3, proposals: 3, identity: 3, dao: 3, marketing: 3, business: 3,
    crosschain: 4, zkproofs: 4,
  };

  const filteredTracks = tracks.filter(t => {
    const lvl = TRACK_LEVELS[t.id] ?? 2;
    return visibleTrackLevels.includes(lvl);
  });

  const stepContent = [
    // Step 0: Experience Assessment
    <div key="s0" style={{ animation: 'slideInUp 0.4s ease both' }}>
      {!assessDone ? (
        <>
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <div style={{ fontSize: 40, marginBottom: 10 }}>🧠</div>
            <h2 style={{ fontSize: 26, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.025em', marginBottom: 6 }}>Experience Check</h2>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>5 quick questions to personalise your path. No right or wrong.</p>
          </div>

          <div style={{ marginBottom: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text-muted)', marginBottom: 6 }}>
              <span>Question {assessIdx + 1} of {assessQuestions.length}</span>
              <span>{assessIdx}/{assessQuestions.length} done</span>
            </div>
            <div style={{ height: 4, background: 'var(--glass-border)', borderRadius: 2, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${(assessIdx / assessQuestions.length) * 100}%`, background: 'linear-gradient(90deg,#6D28D9,#06B6D4)', borderRadius: 2, transition: 'width 400ms ease' }} />
            </div>
          </div>

          <div style={{ background: 'var(--glass)', border: '1px solid var(--glass-border)', borderRadius: 16, padding: '20px 22px', marginBottom: 20 }}>
            <p style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-primary)', margin: 0, lineHeight: 1.5 }}>{assessQuestions[assessIdx].q}</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {assessQuestions[assessIdx].opts.map((opt, i) => {
              const isSelected = assessSelectedIdx === i;
              const isCorrect = i === assessQuestions[assessIdx].correctIdx;
              const answered = assessSelected !== null;
              let bg = 'var(--glass)', border = '1px solid var(--glass-border)', col = 'var(--text-primary)';
              if (answered && isCorrect) { bg = 'rgba(16,185,129,0.12)'; border = '1px solid #10B981'; col = '#10B981'; }
              else if (answered && isSelected && !isCorrect) { bg = 'rgba(239,68,68,0.10)'; border = '1px solid #EF4444'; col = '#EF4444'; }
              else if (answered) { col = 'var(--text-disabled)'; }
              return (
                <button key={i} onClick={() => pickAssessAnswer(opt.pts, i)}
                  style={{ padding: '13px 16px', borderRadius: 12, background: bg, border, color: col, fontSize: 14, fontWeight: 500, cursor: answered ? 'default' : 'pointer', textAlign: 'left', transition: 'all 200ms' }}
                  onMouseEnter={e => { if (!answered) (e.currentTarget as HTMLElement).style.background = 'var(--glass-hover)'; }}
                  onMouseLeave={e => { if (!answered) (e.currentTarget as HTMLElement).style.background = 'var(--glass)'; }}
                >
                  <span style={{ marginRight: 10, opacity: 0.4, fontSize: 12 }}>{['A','B','C','D'][i]}.</span>{opt.label}
                  {answered && isCorrect && <span style={{ marginLeft: 8, fontSize: 12 }}>✓</span>}
                  {answered && isSelected && !isCorrect && <span style={{ marginLeft: 8, fontSize: 12 }}>✗</span>}
                </button>
              );
            })}
          </div>

          {assessExplaining && (
            <div style={{ marginTop: 16, padding: '14px 16px', borderRadius: 12, background: assessSelectedIdx === assessQuestions[assessIdx].correctIdx ? 'rgba(16,185,129,0.08)' : 'rgba(239,68,68,0.06)', border: `1px solid ${assessSelectedIdx === assessQuestions[assessIdx].correctIdx ? '#10B981' : '#EF4444'}30` }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: assessSelectedIdx === assessQuestions[assessIdx].correctIdx ? '#10B981' : '#EF4444', marginBottom: 6 }}>
                {assessSelectedIdx === assessQuestions[assessIdx].correctIdx ? 'Correct!' : 'Not quite.'}
              </div>
              <p style={{ margin: 0, fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{assessQuestions[assessIdx].explanation}</p>
              <button onClick={nextAssessQuestion} style={{ marginTop: 12, padding: '9px 20px', borderRadius: 10, border: 'none', background: 'linear-gradient(135deg,#6D28D9,#06B6D4)', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
                {assessIdx + 1 < assessQuestions.length ? 'Next Question' : 'See Results'}
              </button>
            </div>
          )}
        </>
      ) : (
        // Assessment result
        <div style={{ animation: 'slideInUp 0.4s ease both', textAlign: 'center' }}>
          <div style={{ fontSize: 52, marginBottom: 14 }}>{deduced.emoji}</div>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 8 }}>
            Score: {totalScore}/{maxScore}
          </h2>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 28, lineHeight: 1.6 }}>
            Based on your answers, you are starting as:
            <br /><strong style={{ color: 'var(--accent)', textTransform: 'capitalize', fontSize: 18 }}>{deduced.level}</strong>
          </p>
          <div style={{ background: 'var(--glass)', border: '1px solid var(--glass-border)', borderRadius: 14, padding: '16px 20px', marginBottom: 28, textAlign: 'left' }}>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 6 }}>What this means for you</div>
            <div style={{ fontSize: 14, color: 'var(--text-primary)', lineHeight: 1.6 }}>{deduced.desc}</div>
          </div>
          <div style={{ background: 'var(--glass)', border: '1px solid var(--glass-border)', borderRadius: 14, padding: '14px 20px', marginBottom: 24, textAlign: 'left', fontSize: 13, color: 'var(--text-muted)' }}>
            {deduced.level === 'beginner' && 'You will see Level 1 tracks unlocked and Level 2 visible but locked.'}
            {deduced.level === 'intermediate' && 'You will see Levels 1 and 2 unlocked, Level 3 visible but locked.'}
            {deduced.level === 'expert' && 'All tracks are visible. Some locked by prerequisites, which unlock as you progress.'}
          </div>
          <button onClick={() => setStep(1)}
            style={{ width: '100%', padding: '13px', borderRadius: 12, border: 'none', background: 'linear-gradient(135deg,#6D28D9,#06B6D4)', color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 20px rgba(109,40,217,0.3)' }}>
            Continue →
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '24px 0 16px' }}>
            <div style={{ flex: 1, height: 1, background: 'var(--glass-border)' }} />
            <span style={{ fontSize: 11, color: 'var(--text-disabled)', letterSpacing: '0.08em', fontWeight: 600 }}>SHARE YOUR RESULT</span>
            <div style={{ flex: 1, height: 1, background: 'var(--glass-border)' }} />
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={handleDownloadCard} disabled={cardBusy}
              style={{ flex: 1, padding: '12px', borderRadius: 10, border: '1px solid var(--glass-border)', background: 'var(--glass)', color: 'var(--text-primary)', fontSize: 13, fontWeight: 600, cursor: cardBusy ? 'default' : 'pointer', opacity: cardBusy ? 0.6 : 1 }}>
              {cardBusy ? 'Generating card…' : '⬇ Download Card'}
            </button>
            <button onClick={handleShareX}
              style={{ flex: 1, padding: '12px', borderRadius: 10, border: 'none', background: '#000', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
              <span style={{ fontSize: 14 }}>𝕏</span> Share on X
            </button>
          </div>

          <div style={{ position: 'fixed', left: -9999, top: 0 }}>
            <ShareableCard score={totalScore} maxScore={maxScore} level={deduced.level} />
          </div>
        </div>
      )}
    </div>,

    // Step 1: Avatar selection
    <div key="s1" style={{ animation: 'slideInUp 0.4s ease both' }}>
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <div style={{ fontSize: 40, marginBottom: 10 }}>🎭</div>
        <h2 style={{ fontSize: 26, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.025em', marginBottom: 6 }}>Choose your avatar</h2>
        <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Pick your spirit guide for the journey ahead.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 28 }}>
        {AVATARS.map(a => (
          <button key={a.emoji} onClick={() => setAvatar(a.emoji)}
            style={{
              padding: '16px 8px', borderRadius: 14,
              border: `2px solid ${avatar === a.emoji ? 'var(--accent)' : 'var(--glass-border)'}`,
              background: avatar === a.emoji ? 'var(--accent-subtle)' : 'var(--glass)',
              cursor: 'pointer', textAlign: 'center', transition: 'all 150ms',
              boxShadow: avatar === a.emoji ? '0 0 16px var(--accent-glow)' : 'none',
            }}
            onMouseEnter={e => { if (avatar !== a.emoji) (e.currentTarget as HTMLElement).style.background = 'var(--glass-hover)'; }}
            onMouseLeave={e => { if (avatar !== a.emoji) (e.currentTarget as HTMLElement).style.background = 'var(--glass)'; }}
          >
            <div style={{ fontSize: 32, marginBottom: 4 }}>{a.emoji}</div>
            <div style={{ fontSize: 10.5, color: avatar === a.emoji ? 'var(--accent)' : 'var(--text-tertiary)', fontWeight: 500 }}>{a.label}</div>
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 10 }}>
        <button onClick={() => { setStep(0); setAssessDone(false); setAssessIdx(0); setAssessAnswers([]); setAssessSelected(null); }}
          style={{ flex: 1, padding: '13px', borderRadius: 10, border: '1px solid var(--glass-border)', background: 'transparent', color: 'var(--text-secondary)', fontSize: 14, cursor: 'pointer' }}>
          ← Back
        </button>
        <button disabled={!avatar} onClick={() => setStep(2)}
          style={{ flex: 2, padding: '13px', borderRadius: 10, border: 'none', background: avatar ? 'linear-gradient(135deg,#6D28D9,#06B6D4)' : 'var(--glass-border)', color: avatar ? '#fff' : 'var(--text-disabled)', fontSize: 14, fontWeight: 600, cursor: avatar ? 'pointer' : 'not-allowed', boxShadow: avatar ? '0 4px 20px rgba(109,40,217,0.3)' : 'none' }}>
          Continue →
        </button>
      </div>
    </div>,

    // Step 2: Name input
    <div key="s2" style={{ animation: 'slideInUp 0.4s ease both' }}>
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <div style={{ fontSize: 40, marginBottom: 10 }}>{avatar ?? '🦊'}</div>
        <h2 style={{ fontSize: 26, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.025em', marginBottom: 6 }}>What should we call you?</h2>
        <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>This is how you will appear on the leaderboard.</p>
      </div>

      <div style={{ marginBottom: 28 }}>
        <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-tertiary)', letterSpacing: '0.07em', display: 'block', marginBottom: 8 }}>DISPLAY NAME</label>
        <input type="text" placeholder="e.g. crypto_wizard" value={displayName} onChange={e => setDisplayName(e.target.value)}
          style={{ width: '100%', padding: '13px 16px', borderRadius: 10, fontSize: 15, background: 'var(--input-bg)', border: '1px solid var(--input-border)', color: 'var(--text-primary)', outline: 'none', boxSizing: 'border-box', transition: 'border-color 150ms' }}
          onFocus={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.boxShadow = '0 0 0 3px var(--accent-glow)'; }}
          onBlur={e => { e.currentTarget.style.borderColor = 'var(--input-border)'; e.currentTarget.style.boxShadow = 'none'; }}
        />
      </div>

      <div style={{ display: 'flex', gap: 10 }}>
        <button onClick={() => setStep(1)}
          style={{ flex: 1, padding: '13px', borderRadius: 10, border: '1px solid var(--glass-border)', background: 'transparent', color: 'var(--text-secondary)', fontSize: 14, cursor: 'pointer' }}>
          ← Back
        </button>
        <button disabled={!displayName.trim()} onClick={() => setStep(3)}
          style={{ flex: 2, padding: '13px', borderRadius: 10, border: 'none', background: displayName.trim() ? 'linear-gradient(135deg,#6D28D9,#06B6D4)' : 'var(--glass-border)', color: displayName.trim() ? '#fff' : 'var(--text-disabled)', fontSize: 14, fontWeight: 600, cursor: displayName.trim() ? 'pointer' : 'not-allowed', boxShadow: displayName.trim() ? '0 4px 20px rgba(109,40,217,0.3)' : 'none' }}>
          Continue →
        </button>
      </div>
    </div>,

    // Step 3: Track selection (filtered by level)
    <div key="s3" style={{ animation: 'slideInUp 0.4s ease both' }}>
      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <div style={{ fontSize: 40, marginBottom: 10 }}>🗺️</div>
        <h2 style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.025em', marginBottom: 6 }}>Pick your first track</h2>
        <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
          Showing tracks matched to your <strong style={{ color: 'var(--accent)', textTransform: 'capitalize' }}>{deduced.level}</strong> level.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10, marginBottom: 20, maxHeight: 320, overflowY: 'auto', paddingRight: 4 }}>
        {filteredTracks.map(t => {
          const g0 = t.gradient?.[0] ?? '#6D28D9';
          const g1 = t.gradient?.[1] ?? '#06B6D4';
          const sel = selectedTrack === t.id;
          return (
            <button key={t.id} onClick={() => setSelectedTrack(t.id)}
              style={{ padding: '14px 16px', borderRadius: 14, border: `2px solid ${sel ? g0 : 'var(--glass-border)'}`, background: sel ? `${g0}12` : 'var(--glass)', cursor: 'pointer', textAlign: 'left', transition: 'all 150ms', boxShadow: sel ? `0 0 16px ${g0}30` : 'none' }}
              onMouseEnter={e => { if (!sel) (e.currentTarget as HTMLElement).style.background = 'var(--glass-hover)'; }}
              onMouseLeave={e => { if (!sel) (e.currentTarget as HTMLElement).style.background = 'var(--glass)'; }}
            >
              <div style={{ height: 2, background: `linear-gradient(90deg,${g0},${g1})`, borderRadius: 1, marginBottom: 10 }} />
              <div style={{ fontSize: 24, marginBottom: 6 }}>{t.emoji}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: sel ? g0 : 'var(--text-primary)', lineHeight: 1.3 }}>{t.title}</div>
              <div style={{ fontSize: 10.5, color: 'var(--text-tertiary)', marginTop: 2 }}>{t.modules.length} modules</div>
            </button>
          );
        })}
      </div>

      <div style={{ display: 'flex', gap: 10 }}>
        <button onClick={() => setStep(2)}
          style={{ flex: 1, padding: '13px', borderRadius: 10, border: '1px solid var(--glass-border)', background: 'transparent', color: 'var(--text-secondary)', fontSize: 14, cursor: 'pointer' }}>
          ← Back
        </button>
        <button disabled={!selectedTrack} onClick={() => setStep(4)}
          style={{ flex: 2, padding: '13px', borderRadius: 10, border: 'none', background: selectedTrack ? 'linear-gradient(135deg,#6D28D9,#06B6D4)' : 'var(--glass-border)', color: selectedTrack ? '#fff' : 'var(--text-disabled)', fontSize: 14, fontWeight: 600, cursor: selectedTrack ? 'pointer' : 'not-allowed', boxShadow: selectedTrack ? '0 4px 20px rgba(109,40,217,0.3)' : 'none' }}>
          Continue →
        </button>
      </div>
    </div>,

    // Step 4: Celebration with level reveal
    <div key="s4" style={{ animation: 'scaleIn 0.5s ease both', textAlign: 'center' }}>
      <div style={{ fontSize: 72, marginBottom: 20, animation: 'float 3s ease-in-out infinite' }}>🚀</div>
      <h2 style={{ fontSize: 30, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em', marginBottom: 12 }}>
        You are all set, {displayName || 'Explorer'}!
      </h2>
      <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 8, padding: '24px 40px', borderRadius: 20, background: 'linear-gradient(135deg,rgba(109,40,217,0.15),rgba(6,182,212,0.10))', border: '1px solid var(--accent-glow)', marginBottom: 28, boxShadow: '0 0 40px rgba(109,40,217,0.2)' }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-tertiary)', letterSpacing: '0.08em' }}>YOU ARE STARTING AS</div>
        <div style={{ fontSize: 52, marginBottom: 4 }}>{deduced.emoji}</div>
        <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--gold)', textTransform: 'capitalize', letterSpacing: '-0.02em' }}>{deduced.level}</div>
        <div style={{ fontSize: 13, color: 'var(--text-tertiary)', maxWidth: 260, lineHeight: 1.5, marginTop: 4 }}>{deduced.desc}</div>
      </div>
      <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 28, lineHeight: 1.65 }}>
        Complete lessons to earn XP and MP. Spend MP to play games. Win more than you stake.
      </p>
      <button onClick={finish}
        style={{ width: '100%', padding: '15px', borderRadius: 12, border: 'none', background: 'var(--accent)', color: '#fff', fontSize: 16, fontWeight: 700, cursor: 'pointer', letterSpacing: '-0.01em', transition: 'all 150ms' }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.filter = 'brightness(1.1)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'; }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.filter = 'brightness(1)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
      >Start Learning →</button>
    </div>,
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', fontFamily: "'Outfit', sans-serif", position: 'relative' }}>
      <style>{`
        @keyframes slideInUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
        @keyframes scaleIn{from{opacity:0;transform:scale(0.92)}to{opacity:1;transform:scale(1)}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
      `}</style>

      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', width: 600, height: 600, borderRadius: '50%', top: -200, left: -200, background: 'radial-gradient(circle,rgba(109,40,217,0.12) 0%,transparent 65%)' }} />
        <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', bottom: -100, right: -100, background: 'radial-gradient(circle,rgba(6,182,212,0.10) 0%,transparent 65%)' }} />
      </div>

      <div style={{ marginBottom: 36, position: 'relative', zIndex: 1 }}>
        <Logo size="md" showText={true} />
      </div>

      {/* Step indicators */}
      <div style={{ display: 'flex', gap: 0, marginBottom: 36, position: 'relative', zIndex: 1 }}>
        {STEP_LABELS.map((label, i) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
              <div style={{ width: 30, height: 30, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: i < step ? 'var(--accent)' : i === step ? 'linear-gradient(135deg,#6D28D9,#06B6D4)' : 'var(--glass)', border: `2px solid ${i <= step ? 'var(--accent)' : 'var(--glass-border)'}`, fontSize: 11, fontWeight: 700, color: i <= step ? '#fff' : 'var(--text-disabled)', transition: 'all 300ms', boxShadow: i === step ? '0 0 16px var(--accent-glow)' : 'none' }}>
                {i < step ? '✓' : i + 1}
              </div>
              <div style={{ fontSize: 9, fontWeight: 500, color: i === step ? 'var(--accent)' : 'var(--text-disabled)', letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>{label}</div>
            </div>
            {i < STEP_LABELS.length - 1 && (
              <div style={{ width: 44, height: 2, margin: '0 4px', marginBottom: 18, background: i < step ? 'var(--accent)' : 'var(--glass-border)', transition: 'background 300ms', borderRadius: 1 }} />
            )}
          </div>
        ))}
      </div>

      <div style={{ width: '100%', maxWidth: 500, position: 'relative', zIndex: 1, background: 'var(--glass)', border: '1px solid var(--glass-border)', borderRadius: 24, padding: '36px 36px 32px' }}>
        {stepContent[step]}
      </div>

      <div style={{ marginTop: 20, fontSize: 11, color: 'var(--text-disabled)' }}>Step {step + 1} of 5</div>
    </div>
  );
}
