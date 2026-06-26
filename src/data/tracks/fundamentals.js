const fundamentals = {
  id: 'fundamentals',
  title: 'Blockchain Fundamentals',
  emoji: '⛓',
  color: '#0A6FFF',
  gradient: ['#0044CC', '#0A6FFF'],
  description: 'The foundation every crypto person must know — from blocks to consensus to advanced protocol design.',
  category: 'Core Knowledge',
  modules: [

    // ─── BEGINNER ────────────────────────────────────────────────────────────
    {
      id: 'fund_beg',
      level: 'beginner',
      title: 'What is Blockchain?',
      emoji: '🧱',
      description: 'Understand how blockchains work from the ground up — no prior knowledge needed.',
      color: '#0A6FFF',
      lessons: [
        {
          id: 'fund_beg_l1',
          title: 'The Problem Blockchain Solves',
          slides: [
            { type: 'intro', title: 'Trust Without a Middleman', body: 'Every time you send money, buy something online, or sign a contract, you rely on a trusted third party — a bank, PayPal, or a lawyer. Blockchain eliminates that requirement entirely.' },
            { type: 'text', title: 'The Double-Spend Problem', body: 'Digital files can be copied infinitely. If you send someone a digital dollar, what stops you from copying it and sending it again? Before Bitcoin, this required a central authority to track who owned what.' },
            { type: 'text', title: 'What Satoshi Solved', body: 'In 2008, Satoshi Nakamoto published the Bitcoin whitepaper — a peer-to-peer electronic cash system that solved double-spending without a central authority. The solution was a public ledger maintained by thousands of computers simultaneously.' },
            { type: 'highlight', title: 'The Core Insight', body: 'If thousands of independent computers all hold identical copies of the same ledger, and all agree on every update, no single entity can corrupt it. Manipulation would require controlling the majority of all computers simultaneously.' },
            { type: 'text', title: 'Beyond Money', body: 'The same principle applies to any valuable information: property records, supply chains, medical records, votes, identity, intellectual property. Blockchain is a trust layer for the internet.' },
            { type: 'summary', title: 'Lesson Complete! +20 XP', body: 'Blockchain solves the trust problem — enabling strangers to transact without middlemen by maintaining a shared, tamper-resistant ledger across thousands of computers.' },
          ],
        },
        {
          id: 'fund_beg_l2',
          title: 'Inside a Block',
          slides: [
            { type: 'intro', title: 'What Actually Gets Recorded?', body: 'A blockchain is a chain of "blocks." Each block is a container of data — permanently recorded and cryptographically linked to every block before it.' },
            { type: 'text', title: 'Block Contents', body: 'Every block contains: (1) Transaction data — who sent what to whom. (2) A timestamp — exactly when the block was created. (3) A nonce — a number used in mining. (4) The previous block\'s hash. (5) Its own hash.' },
            { type: 'text', title: 'What is a Hash?', body: 'A hash is a fixed-length digital fingerprint of data. The SHA-256 algorithm (used by Bitcoin) always produces a 64-character string. Change even one letter in the input, and the hash changes completely and unpredictably.' },
            { type: 'highlight', title: 'Example', body: '"Hello" → SHA-256 → 185f8db32921bd46d35817de130b. "hello" → SHA-256 → 2cf24dba5fb0a30e26e83b2ac5b. Tiny input change = completely different output. This is called the avalanche effect.' },
            { type: 'text', title: 'The Chain', body: 'Because each block includes the previous block\'s hash, changing any historical block changes its hash — which breaks the next block\'s reference — which breaks every block after that. The entire chain becomes invalid.' },
            { type: 'summary', title: 'Lesson Complete! +20 XP', body: 'Blocks contain transactions, timestamps, and cryptographic hashes. The chain of hashes makes tampering immediately obvious — any change cascades through all subsequent blocks.' },
          ],
        },
        {
          id: 'fund_beg_l3',
          title: 'Decentralization Explained',
          slides: [
            { type: 'intro', title: 'Why Thousands of Computers?', body: 'A single computer running a database is efficient but vulnerable — it can be hacked, shut down, or corrupted. Blockchain distributes copies across thousands of independent "nodes" worldwide.' },
            { type: 'text', title: 'What is a Node?', body: 'A node is any computer participating in the blockchain network. Full nodes download and verify every transaction ever made. Light nodes verify only block headers. As of 2024, Bitcoin has over 17,000 publicly reachable nodes — and many more private ones.' },
            { type: 'text', title: 'Centralized vs Decentralized', body: 'Chase Bank: 1 company controls 1 database. If Chase fails, your money is inaccessible. Bitcoin: 17,000+ nodes in 100+ countries. To stop Bitcoin, you\'d need to simultaneously shut down every node worldwide — practically impossible.' },
            { type: 'highlight', title: 'No Single Point of Failure', body: 'Bitcoin has operated continuously since January 3, 2009, with 99.98% uptime. No central server to hack. No company to go bankrupt. No government to shut down. The network has survived exchange hacks, country bans, and global bear markets.' },
            { type: 'text', title: 'The Tradeoff', body: 'Decentralization has costs: speed (global consensus takes time), efficiency (every node stores everything), and coordination (upgrades require community agreement). These tradeoffs are deliberate — security and censorship resistance over raw speed.' },
            { type: 'summary', title: 'Lesson Complete! +20 XP', body: 'Decentralization spreads control across thousands of independent nodes worldwide. No single point of failure. No single point of control. Security comes from the network\'s distributed nature.' },
          ],
        },
        {
          id: 'fund_beg_l4',
          title: 'How Transactions Work',
          slides: [
            { type: 'intro', title: 'From Click to Confirmation', body: 'When you send crypto, what actually happens? Understanding the transaction lifecycle demystifies blockchain and explains why transactions take time — and why they\'re irreversible.' },
            { type: 'text', title: 'Step 1: You Create a Transaction', body: 'You specify the recipient address, amount, and fee. Your wallet software creates a transaction message and signs it with your private key — creating a unique cryptographic signature that proves you authorized it.' },
            { type: 'text', title: 'Step 2: Broadcasting', body: 'Your wallet broadcasts the signed transaction to nearby nodes. Those nodes pass it to their neighbors. Within seconds, the transaction has propagated across the entire global network — sitting in the "mempool" (memory pool of unconfirmed transactions).' },
            { type: 'highlight', title: 'Step 3: Mining/Validation', body: 'Miners/validators pick transactions from the mempool (usually highest-fee first), bundle them into a block, and compete to add that block to the chain. Your transaction gets its first "confirmation" when included in a block.' },
            { type: 'text', title: 'Confirmations', body: 'Each new block added after yours is another "confirmation." Bitcoin standard: wait 6 confirmations (~60 minutes) for large transactions. Each confirmation makes reversal exponentially harder — after 6 blocks, reversal requires more energy than the world produces.' },
            { type: 'summary', title: 'Lesson Complete! +20 XP', body: 'Transactions are signed, broadcast to the mempool, included in a block, and confirmed by subsequent blocks. Once deeply confirmed, reversal is computationally infeasible.' },
          ],
        },
        {
          id: 'fund_beg_l5',
          title: 'Why Blockchain Matters',
          slides: [
            { type: 'intro', title: 'Real-World Impact Today', body: 'Blockchain isn\'t hypothetical future technology — it\'s actively changing financial access, asset ownership, and organizational structures right now, in measurable ways.' },
            { type: 'text', title: 'Financial Inclusion', body: '1.4 billion adults worldwide have no bank account — but 4 billion have smartphones. Mobile crypto wallets give the unbanked access to savings, credit, and international transfers for the first time. In Nigeria, El Salvador, and Argentina, crypto adoption is driven by necessity, not speculation.' },
            { type: 'text', title: 'Programmable Money', body: 'Smart contracts make money programmable. Send payment automatically when a shipment arrives. Split royalties instantly every time a song streams. Release funds from escrow when code passes tests. These were impossible without blockchain — now they\'re live.' },
            { type: 'highlight', title: 'Unstoppable Transfers', body: 'A $500M SWIFT international wire takes 3-5 business days and requires both parties to have bank accounts. A $500M blockchain transfer takes minutes, runs 24/7, costs a few dollars, and requires only a wallet address. No banks, no borders, no business hours.' },
            { type: 'text', title: 'The Bigger Picture', body: 'Blockchain is creating an internet of value — a layer where assets can move as freely as information. Web1 was read. Web2 was read/write. Web3 is read/write/own. For the first time, people can truly own digital assets, not just license them from companies.' },
            { type: 'summary', title: 'Module Almost Done! +20 XP', body: 'Blockchain enables financial inclusion, programmable money, instant global transfers, and true digital ownership. These aren\'t promises — they\'re live systems used by millions today.' },
          ],
        },
      ],
      quiz: [
        { id: 'fund_beg_q1', question: 'What problem did Bitcoin\'s blockchain originally solve?', options: ['Making transactions faster', 'The double-spend problem — preventing digital money from being copied and spent twice without a central authority', 'Reducing transaction fees', 'Encrypting user identities'], correct: 1, explanation: 'Before Bitcoin, digital payments required a trusted third party (like a bank) to prevent double-spending. Blockchain solved this by having thousands of nodes publicly agree on the transaction history.' },
        { id: 'fund_beg_q2', question: 'What happens to a block\'s hash if even one character of its data changes?', options: ['It changes slightly', 'It stays the same', 'It changes completely and unpredictably, breaking the link to the next block', 'It becomes invalid immediately'], correct: 2, explanation: 'Hash functions have the "avalanche effect" — tiny input changes produce completely different outputs. This means any tampering is immediately detectable and cascades through all subsequent blocks.' },
        { id: 'fund_beg_q3', question: 'How many publicly reachable Bitcoin nodes existed as of 2024?', options: ['About 100', 'About 1,000', 'Over 17,000 in 100+ countries', 'About 50,000'], correct: 2, explanation: 'Bitcoin has over 17,000 publicly reachable nodes across 100+ countries. This geographic distribution makes the network practically impossible to shut down.' },
        { id: 'fund_beg_q4', question: 'What is the Bitcoin mempool?', options: ['A type of mining hardware', 'The pool of unconfirmed transactions waiting to be included in a block', 'The total supply of Bitcoin', 'A type of wallet'], correct: 1, explanation: 'The mempool (memory pool) holds broadcast transactions that haven\'t yet been included in a block. Miners select from the mempool — typically highest-fee transactions first.' },
        { id: 'fund_beg_q5', question: 'Why do large Bitcoin transactions wait for 6 confirmations?', options: ['Network rules require it', 'Each confirmation makes reversal exponentially harder — 6 blocks makes reversal computationally infeasible', 'It takes that long to verify the signature', 'Exchange regulations require it'], correct: 1, explanation: 'Each new block added after yours makes rewriting history harder. After 6 blocks (~60 min), an attacker would need to redo more computational work than the world produces — effectively impossible.' },
      ],
    },

    // ─── INTERMEDIATE ─────────────────────────────────────────────────────────
    {
      id: 'fund_int',
      level: 'intermediate',
      title: 'Consensus Mechanisms',
      emoji: '⚡',
      description: 'How blockchains reach agreement at scale — from Proof of Work to the cutting edge.',
      color: '#0A6FFF',
      lessons: [
        {
          id: 'fund_int_l1',
          title: 'Proof of Work: Deep Dive',
          slides: [
            { type: 'intro', title: 'The Original Consensus', body: 'Proof of Work (PoW) was the first consensus mechanism, invented by Satoshi for Bitcoin. It\'s been securing the largest blockchain since 2009 with zero successful 51% attacks on Bitcoin itself.' },
            { type: 'text', title: 'The Mining Process', body: 'Miners take the block data (transactions, timestamp, previous hash) and repeatedly hash it with different "nonce" values until the output starts with enough zeros. The difficulty target adjusts every 2016 blocks (~2 weeks) to maintain ~10 minute block times.' },
            { type: 'text', title: 'Why Zeros?', body: 'Finding a hash that starts with N zeros requires roughly 16^N attempts on average. With Bitcoin\'s current difficulty, miners make quadrillions of hashes per second globally — all competing to find one valid hash. The winner earns the block reward (currently 3.125 BTC post-2024 halving).' },
            { type: 'highlight', title: 'Hash Rate = Security', body: 'Bitcoin\'s network currently processes ~600 exahashes/second (6×10²⁰ hashes/sec). A 51% attack requires matching this. At current energy costs, a 51% attack on Bitcoin would cost ~$5-10 billion to execute — and would likely destroy the value of BTC in the process.' },
            { type: 'text', title: 'The Halving Cycle', body: 'Bitcoin\'s block reward halves every 210,000 blocks (~4 years). Started at 50 BTC, now 3.125 BTC. By 2140, all 21 million BTC will be mined and miners will be compensated entirely by transaction fees. This is a deliberate, predictable monetary policy baked into code.' },
            { type: 'summary', title: 'Lesson Complete! +20 XP', body: 'PoW secures blockchains through physical energy expenditure. Bitcoin\'s hash rate of 600 exahashes/second makes attacks economically irrational. The halving cycle creates predictable, disinflationary supply.' },
          ],
        },
        {
          id: 'fund_int_l2',
          title: 'Proof of Stake: Mechanics',
          slides: [
            { type: 'intro', title: 'Staking Over Mining', body: 'Proof of Stake (PoS) replaces energy expenditure with economic collateral. Validators lock up (stake) cryptocurrency as a security deposit. Dishonest behavior loses them their stake — aligning incentives without burning electricity.' },
            { type: 'text', title: 'Ethereum\'s Validators', body: 'Ethereum requires 32 ETH (~$100k at current prices) to run a solo validator. As of 2024, over 1 million validators secure Ethereum, representing ~32 million ETH staked. This is the largest PoS deployment ever built.' },
            { type: 'text', title: 'How Validators Are Selected', body: 'Every 12 seconds (one "slot"), a validator is pseudo-randomly chosen to propose a new block, weighted by stake size. A committee of 128 validators then attests (votes) that the block is valid. This parallel attestation speeds finality dramatically vs PoW.' },
            { type: 'highlight', title: 'Slashing: The Penalty', body: 'Slashing destroys a portion of a validator\'s staked ETH for provable misbehavior: double voting (signing two different blocks for the same slot) or surround voting (a specific pattern of contradictory attestations). Slashed validators are also ejected from the network.' },
            { type: 'text', title: 'The Energy Difference', body: 'Ethereum\'s Merge (September 15, 2022) switched from PoW to PoS, reducing energy consumption by ~99.95%. Pre-Merge, Ethereum used ~78 TWh/year — similar to Chile. Post-Merge, it uses ~0.01 TWh/year — similar to a few thousand homes.' },
            { type: 'summary', title: 'Lesson Complete! +20 XP', body: 'PoS uses staked capital rather than energy for security. Ethereum\'s 1M+ validators, slashing penalties, and 99.95% energy reduction make it the most battle-tested PoS system ever built.' },
          ],
        },
        {
          id: 'fund_int_l3',
          title: 'Other Consensus Algorithms',
          slides: [
            { type: 'intro', title: 'One Size Doesn\'t Fit All', body: 'PoW and PoS are the most common consensus mechanisms, but dozens of variants exist — each optimizing for different tradeoffs between speed, decentralization, and security.' },
            { type: 'text', title: 'Delegated Proof of Stake (DPoS)', body: 'Token holders vote for delegates who run nodes and produce blocks. EOS uses 21 block producers; Tron uses 27 super representatives. DPoS achieves high throughput (thousands of TPS) but sacrifices decentralization — 21 nodes is a narrow attack surface.' },
            { type: 'text', title: 'Proof of History (PoH)', body: 'Solana\'s innovation: a cryptographic clock that timestamps transactions before consensus. Validators can verify time passed between events without communicating with every other validator. Enables Solana\'s 65,000 TPS theoretical throughput (typically 2,000-4,000 in practice).' },
            { type: 'highlight', title: 'Tendermint / BFT Consensus', body: 'Used by Cosmos, Binance Chain, and others. Byzantine Fault Tolerant consensus achieves immediate finality (no waiting for confirmations) as long as <1/3 of validators are malicious. Much faster than PoW but requires a known validator set.' },
            { type: 'text', title: 'The Blockchain Trilemma', body: 'Vitalik Buterin coined this: blockchains can only optimize 2 of 3 — security, decentralization, scalability. Bitcoin: secure + decentralized but slow. Solana: fast + secure but less decentralized. No perfect solution exists — only tradeoffs.' },
            { type: 'summary', title: 'Lesson Complete! +20 XP', body: 'DPoS, PoH, and BFT all make different tradeoffs. No consensus mechanism is universally best. The right choice depends on what properties matter most for your use case.' },
          ],
        },
        {
          id: 'fund_int_l4',
          title: 'Layer 2 Scaling Solutions',
          slides: [
            { type: 'intro', title: 'Scaling Without Sacrificing Security', body: 'Base blockchains are secure and decentralized but slow and expensive. Layer 2 solutions process transactions off the main chain while inheriting its security — having their cake and eating it too.' },
            { type: 'text', title: 'Optimistic Rollups', body: 'Optimistic Rollups (Arbitrum, Optimism, Base) assume transactions are valid by default and post them to L1. A 7-day challenge window allows fraud proofs to dispute invalid transactions. Result: 10-100x cheaper than L1, same security, ~2 second finality for most uses.' },
            { type: 'text', title: 'ZK Rollups', body: 'ZK Rollups (zkSync, Starknet, Polygon zkEVM) generate cryptographic proofs (ZK-SNARKs or ZK-STARKs) that mathematically prove every transaction is valid. Posted to L1 with the proof — no challenge window needed. Faster finality than Optimistic Rollups but computationally heavier.' },
            { type: 'highlight', title: 'The Numbers', body: 'Ethereum L1: ~15 TPS, $5-50 per transaction. Arbitrum One: ~40,000 TPS capacity, $0.05-0.50 per transaction. zkSync Era: ~2,000 TPS, $0.02-0.20 per transaction. As of 2024, L2s process more transactions daily than Ethereum L1.' },
            { type: 'text', title: 'State Channels & Plasma', body: 'Older L2 approaches: State Channels (Lightning Network for Bitcoin) open a direct payment channel between two parties and settle on-chain when closed. Plasma creates child chains that periodically commit to the main chain. Both limited in use cases vs rollups.' },
            { type: 'summary', title: 'Lesson Complete! +20 XP', body: 'Rollups are the dominant L2 approach. Optimistic Rollups are live and widely used; ZK Rollups are maturing fast. L2s already process more daily transactions than Ethereum L1.' },
          ],
        },
        {
          id: 'fund_int_l5',
          title: 'Ethereum\'s Architecture',
          slides: [
            { type: 'intro', title: 'The World Computer', body: 'Ethereum is more than a cryptocurrency — it\'s a globally shared computation platform. Understanding its architecture explains why it became the foundation for DeFi, NFTs, and Web3.' },
            { type: 'text', title: 'The EVM', body: 'The Ethereum Virtual Machine (EVM) is a sandboxed computing environment that runs identically on every Ethereum node worldwide. It executes bytecode (compiled from Solidity). Every node re-executes every transaction — guaranteeing deterministic results.' },
            { type: 'text', title: 'Accounts: EOAs vs Contracts', body: 'Externally Owned Accounts (EOAs) are controlled by private keys — your MetaMask wallet. Contract Accounts contain EVM code and are controlled by that code\'s logic. Contracts have no private key; they execute autonomously when triggered by transactions.' },
            { type: 'highlight', title: 'The Gas System', body: 'Every EVM operation costs gas (measured in "gwei" of ETH). Simple ETH transfers cost 21,000 gas. Complex DeFi interactions can cost 300,000+ gas. EIP-1559 introduced a base fee (burned) + optional tip. The burn mechanism makes ETH deflationary during high activity.' },
            { type: 'text', title: 'Post-Merge Architecture', body: 'After the Merge, Ethereum has two layers: the Execution Layer (handles transactions, smart contracts, state) and the Consensus Layer (handles PoS validator coordination, finality). Validators stake on the Beacon Chain while users transact on the execution chain.' },
            { type: 'summary', title: 'Module Almost Done! +20 XP', body: 'Ethereum\'s EVM, account model, gas system, and post-Merge dual-layer architecture make it the most programmable blockchain. Its composability enables the DeFi and NFT ecosystems built on top.' },
          ],
        },
      ],
      quiz: [
        { id: 'fund_int_q1', question: 'How many hashes per second does Bitcoin\'s network perform as of 2024?', options: ['About 1 million', 'About 1 trillion', 'About 600 exahashes (6×10²⁰)', 'About 1 billion'], correct: 2, explanation: '600 exahashes/second means 600,000,000,000,000,000,000 hash attempts per second globally. This makes a 51% attack on Bitcoin cost billions of dollars in hardware and electricity.' },
        { id: 'fund_int_q2', question: 'How much did Ethereum\'s energy consumption drop after The Merge?', options: ['About 10%', 'About 50%', 'About 90%', 'About 99.95%'], correct: 3, explanation: 'The Merge reduced Ethereum\'s energy use by ~99.95% — from ~78 TWh/year (similar to Chile) to ~0.01 TWh/year. This was possible because PoS uses economic collateral rather than physical computation.' },
        { id: 'fund_int_q3', question: 'What is "slashing" in Ethereum\'s Proof of Stake?', options: ['Reducing validator rewards during bear markets', 'Destroying a portion of a validator\'s staked ETH as punishment for provable dishonest behavior', 'Cutting transaction fees', 'Reducing the total ETH supply'], correct: 1, explanation: 'Slashing destroys ETH staked by validators who sign contradictory messages (double voting or surround voting). It\'s the economic penalty that makes PoS attacks irrational.' },
        { id: 'fund_int_q4', question: 'What is the key difference between Optimistic and ZK Rollups?', options: ['Optimistic Rollups are faster', 'ZK Rollups use fraud proofs; Optimistic use validity proofs', 'Optimistic Rollups assume validity and use fraud proofs with a 7-day window; ZK Rollups use cryptographic validity proofs for instant mathematical verification', 'There is no meaningful difference'], correct: 2, explanation: 'Optimistic = assume valid, allow 7-day fraud challenges. ZK = mathematically prove validity instantly. ZK Rollups have faster finality but are more computationally expensive to generate proofs.' },
        { id: 'fund_int_q5', question: 'What does EIP-1559 change about Ethereum transaction fees?', options: ['Made all transactions free', 'Introduced a base fee (burned, not paid to validators) + optional tip — making ETH potentially deflationary', 'Removed gas entirely', 'Made fees fixed regardless of network congestion'], correct: 1, explanation: 'EIP-1559 introduced a base fee that adjusts per block and is permanently burned. During high activity, this burn exceeds new ETH issuance, making ETH net-deflationary. A major shift in ETH monetary policy.' },
      ],
    },

    // ─── EXPERT ───────────────────────────────────────────────────────────────
    {
      id: 'fund_exp',
      level: 'expert',
      title: 'Advanced Blockchain Architecture',
      emoji: '🔬',
      description: 'MEV, data availability, ZK cryptography, interoperability, and protocol design at the frontier.',
      color: '#0A6FFF',
      lessons: [
        {
          id: 'fund_exp_l1',
          title: 'MEV: Maximal Extractable Value',
          slides: [
            { type: 'intro', title: 'The Dark Forest', body: 'Ethereum researcher Phil Daian coined the term "dark forest" — the mempool is a hostile environment where sophisticated bots monitor every pending transaction and exploit profitable opportunities before they confirm.' },
            { type: 'text', title: 'Types of MEV', body: 'Frontrunning: copy a profitable trade and pay higher gas to go first. Backrunning: follow a large trade to profit from price impact. Sandwich attacks: surround a victim\'s trade with your own buy and sell. Liquidation MEV: race to liquidate undercollateralized DeFi positions for the liquidation bonus.' },
            { type: 'text', title: 'The Scale', body: 'MEV Bot Watcher estimates cumulative MEV extracted on Ethereum exceeds $1.5 billion. In competitive periods, 50%+ of gas paid goes to MEV extraction. MEV exists on every public blockchain with a mempool — it\'s structural, not a bug.' },
            { type: 'highlight', title: 'MEV-Boost and PBS', body: 'Proposer-Builder Separation (PBS): specialized "builders" construct optimal blocks (maximizing MEV extraction), then "searchers" submit MEV bundles to builders. Validators (proposers) simply pick the highest-paying block. MEV-Boost is the middleware enabling this — ~90% of Ethereum validators use it.' },
            { type: 'text', title: 'MEV as a Research Field', body: 'Flashbots (an MEV research org) created MEV-Boost and publishes transparent MEV data. Their goal: democratize MEV rather than allowing it to accrue to hidden actors. Encrypted mempools (like SUAVE) aim to eliminate harmful MEV while preserving beneficial arbitrage.' },
            { type: 'summary', title: 'Lesson Complete! +20 XP', body: 'MEV is structural to transparent blockchains. PBS + MEV-Boost brings some order. Encrypted mempools are the frontier. Understanding MEV is essential for protocol design and DeFi trading.' },
          ],
        },
        {
          id: 'fund_exp_l2',
          title: 'Data Availability: The Forgotten Layer',
          slides: [
            { type: 'intro', title: 'The Data Availability Problem', body: 'For a rollup to be secure, the data needed to reconstruct state must be available. A malicious operator could post a valid ZK proof but withhold the underlying data — users couldn\'t exit or verify the chain\'s state.' },
            { type: 'text', title: 'What is Data Availability?', body: 'DA guarantees that block data has been published and is accessible to anyone who wants to verify it. Without DA, light clients and rollups can\'t independently verify chain correctness — they must trust validators blindly.' },
            { type: 'text', title: 'Ethereum\'s DA: EIP-4844', body: 'EIP-4844 (Proto-Danksharding), launched March 2024, introduced "blobs" — large data attachments to blocks that are stored for ~18 days then pruned. Blobs reduced L2 transaction costs by 10-100x by providing cheap DA. Full Danksharding will bring even more DA capacity.' },
            { type: 'highlight', title: 'Alternative DA Layers', body: 'Celestia: a modular blockchain specialized purely for DA — consensus and ordering only, no execution. EigenDA: EigenLayer-based DA using Ethereum\'s security. Avail: Polygon-backed DA chain. These let chains outsource DA to a cheaper specialist layer.' },
            { type: 'text', title: 'DAS: Data Availability Sampling', body: 'Full Danksharding will use DAS: light clients randomly sample tiny pieces of block data. If the data is available, enough pieces will always be found. Statistically, withholding even a small portion of data is detectable without downloading the full block.' },
            { type: 'summary', title: 'Lesson Complete! +20 XP', body: 'DA is foundational to rollup security. EIP-4844 blobs slashed L2 costs. Celestia and EigenDA offer modular DA alternatives. DAS enables scalable DA verification by light clients.' },
          ],
        },
        {
          id: 'fund_exp_l3',
          title: 'Zero-Knowledge Proofs',
          slides: [
            { type: 'intro', title: 'Proving Without Revealing', body: 'Zero-knowledge proofs allow one party to prove to another that they know something — without revealing what that something is. First described in 1985, ZK proofs are now at the heart of blockchain scaling and privacy.' },
            { type: 'text', title: 'ZK-SNARKs', body: 'Succinct Non-interactive ARguments of Knowledge. "Succinct" = small proof size. "Non-interactive" = no back-and-forth needed. ZK-SNARKs require a trusted setup (a one-time ceremony). Used by: Zcash (privacy), zkSync (scaling), Groth16 is the most common proving system.' },
            { type: 'text', title: 'ZK-STARKs', body: 'Scalable Transparent ARguments of Knowledge. No trusted setup required (transparent = public randomness). Larger proof sizes than SNARKs but faster proving and quantum-resistant. Used by: Starknet, StarkEx. Hash-based cryptography rather than elliptic curves.' },
            { type: 'highlight', title: 'Real Applications', body: 'Scaling: ZK rollups prove thousands of transactions with one small proof posted to L1. Privacy: Tornado Cash used ZK proofs to enable anonymous transfers (later sanctioned). Identity: Worldcoin\'s Semaphore uses ZK to prove unique personhood without revealing identity. Voting: on-chain ballots with anonymous voters.' },
            { type: 'text', title: 'ZK EVM', body: 'The holy grail: a ZK proof of full EVM execution. This allows any existing Ethereum smart contract to run on a ZK rollup with no changes. Type 1 ZK-EVMs (fully Ethereum-equivalent) vs Type 2 (EVM-equivalent) vs Type 3-4 (partial compatibility). All major ZK rollup teams are racing toward Type 1.' },
            { type: 'summary', title: 'Lesson Complete! +20 XP', body: 'ZK proofs enable verifiable computation without revealing private data. SNARKs are compact but need trusted setups; STARKs are transparent and quantum-safe. ZK-EVMs will unlock full composability with Ethereum at scale.' },
          ],
        },
        {
          id: 'fund_exp_l4',
          title: 'Cross-Chain Interoperability',
          slides: [
            { type: 'intro', title: 'The Multi-Chain World', body: 'Over 100 Layer 1 blockchains and hundreds of Layer 2s exist in 2024. The future is multi-chain. But making assets and data move securely between them is one of the hardest unsolved problems in blockchain engineering.' },
            { type: 'text', title: 'Bridge Architecture Types', body: 'Lock-and-mint: lock asset on chain A, mint wrapped version on chain B. Native liquidity bridges: pool on both sides, swap assets. Message bridges: pass arbitrary data between chains (Wormhole, LayerZero). ZK bridges: use cryptographic proofs of source chain state.' },
            { type: 'text', title: 'The Attack Record', body: 'Bridge exploits have cost over $2.5B: Ronin Bridge ($625M, 2022), Wormhole ($320M, 2022), Nomad ($190M, 2022), Harmony Horizon ($100M, 2022). The pattern: complex cross-chain logic with large TVL = massive attack surface. Bridge security is an unsolved problem.' },
            { type: 'highlight', title: 'Canonical vs Third-Party Bridges', body: 'Canonical bridges (official L1-L2 bridges, e.g. Arbitrum Bridge, Optimism Gateway) inherit L1 security — as secure as Ethereum itself. Third-party bridges offer speed and chain variety but introduce custom trust assumptions. Always prefer canonical bridges for large amounts.' },
            { type: 'text', title: 'The IBC Protocol', body: 'Inter-Blockchain Communication (IBC) is Cosmos\'s standardized cross-chain messaging protocol. Chains that implement IBC can communicate trustlessly using light client proofs. As of 2024, 50+ chains are IBC-connected. This is the closest thing to a standardized internet routing protocol for blockchains.' },
            { type: 'summary', title: 'Lesson Complete! +20 XP', body: 'Bridges enable the multi-chain world but represent the largest attack surface in crypto. Prefer canonical bridges. IBC offers a standardized, trust-minimized approach. ZK bridges are the future.' },
          ],
        },
        {
          id: 'fund_exp_l5',
          title: 'Protocol Design Principles',
          slides: [
            { type: 'intro', title: 'Designing Blockchains', body: 'Building a blockchain protocol means making dozens of interconnected decisions — each with cascading consequences. Understanding the design space helps you evaluate any blockchain critically.' },
            { type: 'text', title: 'Finality', body: 'Probabilistic finality (Bitcoin): blocks become more final over time as more blocks build on them. Economic finality (Ethereum PoS): rewriting history would require slashing so much ETH it becomes uneconomical. Absolute finality (BFT chains): blocks are final immediately once 2/3 of validators sign — but requires a known validator set.' },
            { type: 'text', title: 'The Nakamoto Coefficient', body: 'The minimum number of entities needed to collude to attack the network. Bitcoin: ~4 mining pools control >50% of hash rate (NC=4). Ethereum: ~4 staking providers hold >33% of stake. Higher NC = more decentralized. This metric lets you compare decentralization quantitatively.' },
            { type: 'highlight', title: 'Modular vs Monolithic', body: 'Monolithic chains (Bitcoin, Ethereum L1) handle consensus, execution, DA, and settlement in one layer. Modular chains (Celestia + rollups + settlement) separate these concerns. Modular chains can upgrade each layer independently — theoretically better long-term scalability.' },
            { type: 'text', title: 'Economic Security', body: 'A blockchain\'s security budget is the total cost to attack it. For PoW: market cap of block rewards × attack duration. For PoS: cost to acquire 33% of stake. As block rewards decrease (Bitcoin halving), long-term security depends on transaction fee revenue. Will fees be sufficient by 2140? An open question.' },
            { type: 'summary', title: 'Module Complete! +20 XP', body: 'Protocol design requires choosing between finality models, optimizing the Nakamoto Coefficient, and deciding on modular vs monolithic architecture. Economic security is the long-term open question every blockchain must answer.' },
          ],
        },
      ],
      quiz: [
        { id: 'fund_exp_q1', question: 'What is a "sandwich attack" in the context of MEV?', options: ['A double-spend attempt', 'Surrounding a victim\'s pending trade with your own buy before and sell after — profiting from the price impact the victim creates', 'A type of smart contract vulnerability', 'A governance attack'], correct: 1, explanation: 'Sandwich attacks: attacker buys before your trade (raising price), lets your trade execute at a worse price, then sells immediately after (locking in profit). The victim pays more slippage than expected.' },
        { id: 'fund_exp_q2', question: 'What did EIP-4844 introduce to Ethereum, and what was the practical effect?', options: ['A new token standard; enabled new DeFi protocols', '"Blobs" — cheap large data attachments stored temporarily; reduced L2 transaction costs by 10-100x', 'Proof of Stake; reduced energy consumption', 'Smart contract upgrades; enabled DAO governance'], correct: 1, explanation: 'EIP-4844 (Proto-Danksharding) added blob transactions — large temporary data attachments specifically for rollup data. By creating a separate, cheaper data market, L2 fees dropped dramatically in March 2024.' },
        { id: 'fund_exp_q3', question: 'What is the difference between ZK-SNARKs and ZK-STARKs?', options: ['SNARKs are newer; STARKs are legacy', 'SNARKs require a trusted setup and are compact; STARKs need no trusted setup, are larger but quantum-resistant', 'They are interchangeable terms', 'SNARKs are for privacy; STARKs are for scaling only'], correct: 1, explanation: 'SNARKs: small proofs, fast verification, but require a trusted setup ceremony (a potential attack vector). STARKs: larger proofs, no trusted setup, hash-based cryptography makes them quantum-safe.' },
        { id: 'fund_exp_q4', question: 'Why have cross-chain bridges been the largest hack targets in crypto?', options: ['They are poorly audited compared to other protocols', 'Bridges hold large concentrated TVL with complex cross-chain validation logic — a large, high-value attack surface', 'Bridge teams are less experienced', 'Bridges are unregulated, making them easy targets'], correct: 1, explanation: 'Bridges lock billions in assets while running complex cross-chain verification code. Complex multi-chain code with large TVL creates enormous incentive and surface area — the $2.5B+ in bridge hacks shows the difficulty of getting this right.' },
        { id: 'fund_exp_q5', question: 'What is the Nakamoto Coefficient?', options: ['Bitcoin\'s price-to-hash-rate ratio', 'The minimum number of independent entities needed to collude to compromise a network\'s security', 'The ratio of nodes to validators', 'Satoshi\'s original formula for block time'], correct: 1, explanation: 'The Nakamoto Coefficient quantifies decentralization. Bitcoin\'s NC≈4 means just 4 mining pools could collude for a 51% attack. Higher NC = more decentralized. A critical metric for comparing blockchain security.' },
      ],
    },

  ],
};

export default fundamentals;
