const layer2 = {
  id: 'layer2',
  title: 'Layer 2 & Scaling Solutions',
  emoji: '⚡',
  color: '#8B5CF6',
  gradient: ['#7C3AED', '#8B5CF6'],
  description: 'Explore how Layer 2 networks like Optimism, Arbitrum, and zkSync solve Ethereum\'s scalability trilemma. Learn rollup technology, state channels, and the architecture that makes blockchain fast and affordable without sacrificing security.',
  category: 'Infrastructure',
  modules: [
    {
      id: 'l2_beg',
      level: 'beginner',
      title: 'Why Scaling Matters',
      emoji: '📈',
      description: 'Understand why Ethereum gets congested and how Layer 2 solutions fix it.',
      color: '#8B5CF6',
      lessons: [
        {
          id: 'l2_beg_l1',
          title: 'The Scalability Trilemma',
          slides: [
            { type: 'intro', title: 'The Core Problem', body: 'Blockchain networks face a fundamental trade-off known as the scalability trilemma: you can optimize for at most two of three properties: security, decentralization, and scalability.' },
            { type: 'text', title: 'Ethereum\'s Bottleneck', body: 'Ethereum processes roughly 15-30 transactions per second. Visa handles 24,000. During peak demand, gas fees spike to hundreds of dollars, pricing out everyday users.' },
            { type: 'highlight', title: 'The Layer 2 Answer', body: 'Instead of changing Ethereum itself, Layer 2 protocols process transactions off-chain and post compressed summaries back to Ethereum. Security comes from Ethereum; speed and cost come from L2.' },
            { type: 'text', title: 'Real Numbers', body: 'Arbitrum processes transactions for under $0.10 that would cost $5-50 on mainnet. Optimism settles in seconds. zkSync Era handles 2,000+ TPS. All while inheriting Ethereum\'s security.' },
            { type: 'summary', title: 'Lesson Complete! +20 XP', body: 'Layer 2 networks solve the scalability problem by processing transactions off-chain while anchoring security to Ethereum mainnet.' },
          ],
        },
        {
          id: 'l2_beg_l2',
          title: 'Types of Layer 2',
          slides: [
            { type: 'intro', title: 'Not All L2s Are Alike', body: 'There are several approaches to Layer 2 scaling, each with different security models and trade-offs. The main types are: optimistic rollups, ZK rollups, state channels, and plasma.' },
            { type: 'text', title: 'Optimistic Rollups', body: 'Assume transactions are valid by default ("optimistic"). Anyone can challenge invalid transactions during a dispute window (usually 7 days). Used by Arbitrum and Optimism. Simple to build, slower to withdraw.' },
            { type: 'text', title: 'ZK Rollups', body: 'Generate cryptographic proofs (zero-knowledge proofs) that transactions are valid before submitting to Ethereum. No dispute window needed. Withdrawals are fast. Used by zkSync, StarkNet, Polygon zkEVM.' },
            { type: 'highlight', title: 'State Channels', body: 'Open a private channel between two parties, transact freely off-chain, then settle the final state on-chain. Lightning Network for Bitcoin uses this model. Great for repeated bilateral transactions.' },
            { type: 'summary', title: 'Lesson Complete! +20 XP', body: 'Optimistic rollups are simpler but slower to finalize. ZK rollups are faster and more secure but computationally heavy. State channels work best for repeated transactions between fixed parties.' },
          ],
        },
        {
          id: 'l2_beg_l3',
          title: 'Using Layer 2 Networks',
          slides: [
            { type: 'intro', title: 'Bridging to L2', body: 'To use Layer 2 networks, you bridge assets from Ethereum mainnet (L1) to the L2. Your assets are locked on L1 and represented on L2, where you can transact cheaply and quickly.' },
            { type: 'text', title: 'The Bridging Process', body: 'Connect your wallet, go to the bridge UI (e.g., Arbitrum Bridge), select the asset and amount, confirm the transaction on L1. Assets appear on L2 within minutes for optimistic rollups.' },
            { type: 'text', title: 'Withdrawal Times', body: 'Depositing to optimistic rollups is fast (minutes). Withdrawing back to L1 takes 7 days (challenge period). Third-party bridges like Hop Protocol or Across offer instant withdrawals for a small fee.' },
            { type: 'highlight', title: 'Ecosystems to Explore', body: 'Arbitrum One: large DeFi ecosystem, Uniswap, Aave, GMX. Optimism: Synthetix, Velodrome, Worldcoin. Base (Coinbase\'s L2): growing consumer apps. zkSync Era: focus on native account abstraction.' },
            { type: 'summary', title: 'Lesson Complete! +20 XP', body: 'Bridging moves assets between L1 and L2. Deposits are fast, withdrawals from optimistic rollups take 7 days without a fast-bridge. Each L2 has its own growing ecosystem of apps.' },
          ],
        },
      ],
      quiz: [
        { id: 'l2_beg_q1', question: 'What is the main trade-off described by the "scalability trilemma"?', options: ['Speed vs cost vs security', 'Security, decentralization, and scalability cannot all be maximized simultaneously', 'Mining difficulty vs network size vs transaction speed', 'Gas fees vs block size vs node count'], correct: 1, explanation: 'The scalability trilemma states that a blockchain can only optimize two of three properties: security, decentralization, and scalability.' },
        { id: 'l2_beg_q2', question: 'How long is the typical challenge/dispute window for optimistic rollups?', options: ['1 hour', '24 hours', '7 days', '30 days'], correct: 2, explanation: 'Optimistic rollups have a 7-day dispute window where anyone can challenge invalid transactions before they are finalized on L1.' },
      ],
    },
    {
      id: 'l2_int',
      level: 'intermediate',
      title: 'Rollup Architecture Deep Dive',
      emoji: '🏗️',
      description: 'Understand sequencers, fraud proofs, and validity proofs in detail.',
      color: '#7C3AED',
      lessons: [
        {
          id: 'l2_int_l1',
          title: 'How Rollups Work Internally',
          slides: [
            { type: 'intro', title: 'The Sequencer', body: 'Rollups use a "sequencer" to order and batch transactions. The sequencer collects user transactions, orders them, executes them off-chain, and periodically publishes compressed transaction data and state roots to Ethereum.' },
            { type: 'text', title: 'Calldata Compression', body: 'Instead of re-executing every transaction on Ethereum (expensive), rollups post compressed transaction data as "calldata" to L1. Ethereum only verifies the proof or allows challenges, not re-execute.' },
            { type: 'highlight', title: 'State Roots', body: 'After each batch, the rollup posts a state root: a cryptographic commitment to the entire L2 state (all account balances and contract storage). This is how L1 knows the L2 state is correct.' },
            { type: 'text', title: 'EIP-4844 and Blobs', body: 'EIP-4844 (Dencun upgrade, March 2024) introduced "blob" transactions, a cheaper way for rollups to post data to Ethereum. This reduced L2 gas fees by 10-100x.' },
            { type: 'summary', title: 'Lesson Complete! +25 XP', body: 'Sequencers batch L2 transactions and post compressed data plus state roots to Ethereum L1. EIP-4844 blobs made this dramatically cheaper in 2024.' },
          ],
        },
      ],
      quiz: [
        { id: 'l2_int_q1', question: 'What did EIP-4844 introduce to help Layer 2 rollups?', options: ['Proof-of-stake for L2', 'Blob transactions for cheaper data posting', 'Cross-chain bridges', 'Faster block times on Ethereum'], correct: 1, explanation: 'EIP-4844 introduced blob transactions, which give rollups a cheaper way to post data to Ethereum L1, reducing L2 fees by 10-100x.' },
      ],
    },
  ],
};

export default layer2;
