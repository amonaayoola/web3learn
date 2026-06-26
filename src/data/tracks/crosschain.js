const crosschain = {
  id: 'crosschain',
  title: 'Cross-Chain & Interoperability',
  emoji: '🌉',
  color: '#F59E0B',
  gradient: ['#D97706', '#F59E0B'],
  description: 'Discover how bridges, messaging protocols, and multi-chain architectures connect the fragmented blockchain ecosystem. Learn how assets and data move between Ethereum, Solana, Cosmos, and beyond, and why interoperability is the key to Web3\'s future.',
  category: 'Infrastructure',
  modules: [
    {
      id: 'crosschain_beg',
      level: 'beginner',
      title: 'The Multi-Chain World',
      emoji: '🗺️',
      description: 'Understand the fragmented blockchain landscape and why interoperability matters.',
      color: '#F59E0B',
      lessons: [
        {
          id: 'crosschain_beg_l1',
          title: 'Why So Many Chains?',
          slides: [
            { type: 'intro', title: 'A Fragmented Ecosystem', body: 'There are hundreds of active blockchains: Ethereum, Solana, BNB Chain, Avalanche, Cosmos, Polkadot, Aptos, Sui, and countless others. Each has different strengths, communities, and ecosystems.' },
            { type: 'text', title: 'Competing Design Choices', body: 'Ethereum prioritizes security and decentralization. Solana prioritizes speed and low cost. Cosmos prioritizes sovereignty and interoperability. These trade-offs mean no single chain is optimal for everything.' },
            { type: 'text', title: 'The Liquidity Problem', body: 'Fragmentation hurts: liquidity is split across chains, users need multiple wallets and bridge flows, developers must choose one chain or build everywhere. A user on Solana cannot use an Ethereum DeFi protocol without bridging.' },
            { type: 'highlight', title: 'The Interoperability Vision', body: 'The goal is a world where assets and messages flow freely between chains, users do not need to think about which chain they are on, and developers can build apps that span multiple networks seamlessly.' },
            { type: 'summary', title: 'Lesson Complete! +20 XP', body: 'The multi-chain world exists because different blockchains make different design choices. Interoperability solves the fragmentation problem, letting assets and data move freely across the ecosystem.' },
          ],
        },
        {
          id: 'crosschain_beg_l2',
          title: 'How Bridges Work',
          slides: [
            { type: 'intro', title: 'Moving Assets Across Chains', body: 'A bridge is a protocol that allows assets to move from one blockchain to another. When you bridge ETH from Ethereum to Arbitrum, your ETH is locked on Ethereum and an equivalent amount is minted on Arbitrum.' },
            { type: 'text', title: 'Lock and Mint', body: 'The most common bridge model: (1) Lock asset on the source chain in a smart contract. (2) Bridge monitors detect the lock. (3) An equivalent "wrapped" asset is minted on the destination chain. (4) To return, burn the wrapped asset and unlock the original.' },
            { type: 'text', title: 'Bridge Security Models', body: 'Bridges vary in security. Trusted bridges use a multisig or federation of validators. Trustless bridges use cryptographic proofs verified on-chain. Native bridges (like Arbitrum\'s official bridge) inherit L1 security.' },
            { type: 'highlight', title: 'Bridge Hacks', body: 'Bridges are the most targeted attack surface in Web3. The Ronin bridge lost $625M (2022), Wormhole lost $320M (2022), Nomad lost $190M (2022). Over $2B was stolen from bridges in 2022 alone. Verify bridge security before using.' },
            { type: 'summary', title: 'Lesson Complete! +20 XP', body: 'Bridges use lock-and-mint to move assets between chains. Security varies widely: always prefer native bridges or highly audited protocols. Bridges are high-value targets for attackers.' },
          ],
        },
        {
          id: 'crosschain_beg_l3',
          title: 'Cross-Chain Messaging',
          slides: [
            { type: 'intro', title: 'Beyond Asset Transfers', body: 'Cross-chain interoperability is not just about moving tokens. It is also about passing arbitrary messages and data between chains: trigger a contract on Chain B from Chain A, sync governance votes, or coordinate liquidity across networks.' },
            { type: 'text', title: 'LayerZero', body: 'LayerZero is an omnichain messaging protocol. It allows smart contracts on different chains to communicate directly. A token built on LayerZero (OFT standard) can move natively between chains without wrapping.' },
            { type: 'text', title: 'Chainlink CCIP', body: 'Chainlink\'s Cross-Chain Interoperability Protocol (CCIP) provides programmable token transfers and cross-chain messaging with Chainlink\'s decentralized oracle security model backing it.' },
            { type: 'highlight', title: 'Cosmos IBC', body: 'Inter-Blockchain Communication (IBC) is the gold standard of cross-chain messaging within the Cosmos ecosystem. It is a trustless, open standard that connects 100+ chains: Osmosis, dYdX, Celestia, and more.' },
            { type: 'summary', title: 'Lesson Complete! +20 XP', body: 'Cross-chain messaging lets smart contracts communicate across chains, enabling omnichain apps. LayerZero, Chainlink CCIP, and Cosmos IBC are leading protocols each with different trust models.' },
          ],
        },
      ],
      quiz: [
        { id: 'crosschain_beg_q1', question: 'What happened in the Ronin bridge hack of 2022?', options: ['A bug in the smart contract minted unlimited tokens', '$625M was stolen by compromising validator keys', 'The bridge was shut down by regulators', 'A 51% attack on the Ronin chain'], correct: 1, explanation: 'The Ronin bridge hack involved compromising 5 of 9 validator keys, allowing attackers to approve fraudulent withdrawals totaling $625M in ETH and USDC.' },
        { id: 'crosschain_beg_q2', question: 'What is the "lock and mint" bridge model?', options: ['Lock the bridge code and mint new validators', 'Lock assets on the source chain and mint equivalent wrapped assets on the destination chain', 'Lock gas fees and mint proof tokens', 'Lock liquidity on both chains simultaneously'], correct: 1, explanation: 'Lock and mint is the standard bridge model: assets are locked in a smart contract on the source chain, and equivalent wrapped tokens are minted on the destination chain.' },
      ],
    },
    {
      id: 'crosschain_int',
      level: 'intermediate',
      title: 'Omnichain App Architecture',
      emoji: '🔮',
      description: 'Build mental models for designing applications that span multiple chains.',
      color: '#D97706',
      lessons: [
        {
          id: 'crosschain_int_l1',
          title: 'Designing for Multiple Chains',
          slides: [
            { type: 'intro', title: 'The Omnichain Stack', body: 'Omnichain apps run logic and hold state across multiple chains simultaneously. A DEX might have liquidity on 10 chains, a governance system might coordinate votes across 5 networks. Designing for this requires a new mental model.' },
            { type: 'text', title: 'Shared vs. Fragmented State', body: 'The core challenge: state (who owns what, what the current value is) is local to each chain. Keeping shared state synchronized across chains requires careful design. IBC, LayerZero, and CCIP each have different consistency models.' },
            { type: 'highlight', title: 'Account Abstraction + Chains', body: 'ERC-4337 account abstraction combined with cross-chain messaging enables "one account, all chains." Your smart contract wallet on Ethereum can authorize actions on Arbitrum without bridging first.' },
            { type: 'text', title: 'Real Examples', body: 'Uniswap v4 hooks + LayerZero: route liquidity across chains. Aave\'s GHO stablecoin: mint on multiple chains with shared collateral. Synthetix Perps: execute on Optimism with collateral on Ethereum.' },
            { type: 'summary', title: 'Lesson Complete! +25 XP', body: 'Omnichain design requires thinking about cross-chain state, consistency, and execution. The ecosystem is rapidly converging on standards that make multi-chain apps feel as simple as single-chain ones.' },
          ],
        },
      ],
      quiz: [
        { id: 'crosschain_int_q1', question: 'What is a key challenge when designing omnichain applications?', options: ['Higher gas costs on all chains', 'Synchronizing shared state across chains that each have local state', 'Lack of developer tools', 'Regulatory compliance on multiple jurisdictions'], correct: 1, explanation: 'The core challenge of omnichain design is that each chain maintains its own local state. Keeping shared state consistent across chains requires careful design using cross-chain messaging protocols.' },
      ],
    },
  ],
};

export default crosschain;
