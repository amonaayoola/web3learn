const proposals = {
  id: 'proposals',
  title: 'Protocol Proposals',
  emoji: '📜',
  color: '#7C3AED',
  gradient: ['#7C3AED', '#4F46E5'],
  description: 'Making blockchain proposals fun for developers. Learn why ERC-20 changed everything, what EIP-1559 did to fees, and how Bitcoin BIPs shape the protocol, through stories, not specs.',
  category: 'Advanced Knowledge',
  modules: [

    // MODULE 1: ETHEREUM PROPOSALS
    {
      id: 'proposals_eth',
      level: 'intermediate',
      title: 'Ethereum Proposals',
      emoji: '🔷',
      description: 'EIPs, ERCs, and the standards that built DeFi, NFTs, and the next generation of wallets.',
      color: '#7C3AED',
      lessons: [
        {
          id: 'proposals_eth_l1',
          title: 'What are EIPs and ERCs?',
          slides: [
            {
              type: 'intro',
              title: 'Two Types of Proposals',
              body: 'Ethereum evolves through a public proposal process. Anyone can write a proposal, post it to GitHub, and get it debated by the community. But not all proposals are the same: some change the core protocol, others define how tokens and contracts should behave.',
            },
            {
              type: 'text',
              title: 'EIPs: Protocol Upgrades',
              body: 'An EIP (Ethereum Improvement Proposal) proposes a change to the Ethereum protocol itself. Things like how gas is calculated, how the consensus mechanism works, or how the virtual machine handles opcodes. EIPs require node operators, miners, and validators to upgrade their software.',
            },
            {
              type: 'text',
              title: 'ERCs: Application Standards',
              body: 'An ERC (Ethereum Request for Comments) is a subset of EIPs focused on application-layer standards. ERCs define how smart contracts should behave so that wallets, exchanges, and other contracts can interact with them predictably. ERC-20, ERC-721, and ERC-4337 are all ERCs.',
            },
            {
              type: 'highlight',
              title: 'The Process',
              body: 'A proposal starts as a Draft, gets discussed by the community and core developers, moves to Review, then Last Call, then Final. Some proposals get Stagnated or Withdrawn. The whole process is public on GitHub at eips.ethereum.org.',
            },
            {
              type: 'text',
              title: 'Why This Matters for Builders',
              body: 'When you write a smart contract that follows an ERC standard, every wallet, DEX, and NFT marketplace can interact with it automatically. Standards are the language that makes composability possible in Web3.',
            },
            {
              type: 'summary',
              title: 'Lesson Complete! +20 XP',
              body: 'EIPs change the Ethereum protocol itself. ERCs define application-layer standards like token interfaces. Both go through a public proposal and review process on GitHub.',
            },
          ],
          quiz: [
            {
              id: 'proposals_eth_l1_q1',
              question: 'What does EIP stand for?',
              options: ['Ethereum Interface Protocol', 'Ethereum Improvement Proposal', 'Ethereum Integration Package', 'Ethereum Instruction Procedure'],
              correctIndex: 1,
            },
            {
              id: 'proposals_eth_l1_q2',
              question: 'What is the key difference between an EIP and an ERC?',
              options: [
                'EIPs are only for tokens; ERCs are for anything',
                'EIPs change the core protocol; ERCs define application-layer standards',
                'ERCs require a network upgrade; EIPs do not',
                'There is no difference, they are the same thing',
              ],
              correctIndex: 1,
            },
            {
              id: 'proposals_eth_l1_q3',
              question: 'Where is the EIP proposal process publicly tracked?',
              options: ['On the Ethereum Foundation website', 'On a private Ethereum committee server', 'On GitHub at eips.ethereum.org', 'Inside the Ethereum client software'],
              correctIndex: 2,
            },
            {
              id: 'proposals_eth_l1_q4',
              question: 'Which of these is an ERC rather than a core protocol EIP?',
              options: ['EIP-1559 (fee market change)', 'EIP-4895 (validator withdrawals)', 'ERC-20 (token standard)', 'EIP-1 (EIP purpose and guidelines)'],
              correctIndex: 2,
            },
            {
              id: 'proposals_eth_l1_q5',
              question: 'Why are ERC standards important for smart contract developers?',
              options: [
                'They make contracts run faster on the EVM',
                'They allow wallets, DEXes, and contracts to interact with yours automatically',
                'They are required by Ethereum law',
                'They reduce gas costs automatically',
              ],
              correctIndex: 1,
            },
          ],
        },

        {
          id: 'proposals_eth_l2',
          title: 'ERC-20: The Standard That Started DeFi',
          slides: [
            {
              type: 'intro',
              title: 'Before ERC-20, Chaos',
              body: 'In 2015, every token on Ethereum had a completely different interface. To support a new token, exchanges had to write custom code for each one. Wallets had to manually integrate every token individually. Composability was impossible at scale.',
            },
            {
              type: 'text',
              title: 'Fabian Vogelsteller\'s Proposal',
              body: 'In November 2015, developer Fabian Vogelsteller proposed ERC-20: a standard interface for fungible tokens. It defined six functions every token must implement: totalSupply, balanceOf, transfer, transferFrom, approve, and allowance.',
            },
            {
              type: 'text',
              title: 'How DeFi Was Built on ERC-20',
              body: 'Because every ERC-20 token shares the same interface, Uniswap could be built to swap any two of them. Compound could accept any ERC-20 as collateral. USDC, WBTC, UNI, LINK, and thousands of other tokens are all ERC-20. DeFi\'s composability comes directly from this standard.',
            },
            {
              type: 'highlight',
              title: 'The approve/transferFrom Pattern',
              body: 'When you approve a DEX to spend your tokens, you call approve(), which sets an allowance. The DEX then calls transferFrom() on your behalf. This two-step pattern lets smart contracts move your tokens without you needing to send them first. It is the foundation of every swap, lending protocol, and yield farm.',
            },
            {
              type: 'text',
              title: 'Known Limitations',
              body: 'ERC-20 has a known flaw: if you transfer tokens directly to a contract that does not expect them, they can get stuck forever. There is no callback for contracts to handle incoming tokens. ERC-777 tried to fix this, but ERC-1155 and careful design patterns are the more common solutions today.',
            },
            {
              type: 'summary',
              title: 'Lesson Complete! +20 XP',
              body: 'ERC-20 standardized fungible tokens in 2015. Its six-function interface made wallets, exchanges, and DeFi protocols composable. Every major DeFi primitive runs on top of ERC-20.',
            },
          ],
          quiz: [
            {
              id: 'proposals_eth_l2_q1',
              question: 'Who proposed ERC-20?',
              options: ['Vitalik Buterin', 'Fabian Vogelsteller', 'Gavin Wood', 'Nick Szabo'],
              correctIndex: 1,
            },
            {
              id: 'proposals_eth_l2_q2',
              question: 'What is the approve/transferFrom pattern used for?',
              options: [
                'Minting new tokens',
                'Letting smart contracts move your tokens on your behalf after you grant permission',
                'Burning tokens permanently',
                'Upgrading a token contract',
              ],
              correctIndex: 1,
            },
            {
              id: 'proposals_eth_l2_q3',
              question: 'Which of these is NOT a function defined by ERC-20?',
              options: ['totalSupply', 'balanceOf', 'tokenURI', 'transfer'],
              correctIndex: 2,
            },
            {
              id: 'proposals_eth_l2_q4',
              question: 'What problem does ERC-20 solve for DeFi protocols like Uniswap?',
              options: [
                'It provides gas-free transactions',
                'It creates a shared interface so any token can be swapped without custom code',
                'It automatically provides liquidity',
                'It prevents flash loan attacks',
              ],
              correctIndex: 1,
            },
            {
              id: 'proposals_eth_l2_q5',
              question: 'What is a known limitation of ERC-20?',
              options: [
                'It does not support more than 18 decimal places',
                'Tokens transferred directly to a contract may get stuck with no recovery',
                'It requires a centralized admin to approve transfers',
                'It only works on Ethereum mainnet',
              ],
              correctIndex: 1,
            },
          ],
        },

        {
          id: 'proposals_eth_l3',
          title: 'ERC-721: NFTs and Digital Ownership',
          slides: [
            {
              type: 'intro',
              title: 'The Non-Fungible Token Standard',
              body: 'ERC-20 tokens are interchangeable: one USDC equals any other USDC. ERC-721 introduced non-fungible tokens, where every token is unique and has a distinct ID. This distinction made digital ownership of unique assets possible on Ethereum.',
            },
            {
              type: 'text',
              title: 'The CryptoPunks Precedent',
              body: 'CryptoPunks launched in June 2017, before ERC-721 was finalized. Larva Labs created 10,000 unique pixel characters with a custom contract. Their popularity showed there was demand for uniquely-owned digital items, which motivated ERC-721.',
            },
            {
              type: 'text',
              title: 'William Entriken and the Standard',
              body: 'William Entriken, Dieter Shirley, Jacob Evans, and Nastassia Sachs proposed ERC-721 in January 2018. It added a tokenURI function that returns metadata for each unique token ID, enabling art, collectibles, game items, and any unique asset to be represented on-chain.',
            },
            {
              type: 'highlight',
              title: 'How Bored Apes Work',
              body: 'A Bored Ape is token ID 1234 in the BAYC contract. The contract maps that ID to an owner address. tokenURI(1234) returns a JSON file with the image and traits. The image itself is usually stored on IPFS. Owning the NFT means your address controls that specific token ID.',
            },
            {
              type: 'text',
              title: 'Beyond Art: Real Use Cases',
              body: 'ERC-721 is used for event tickets, domain names (ENS), real estate deed fractions, gaming items, and license certificates. The standard is the same: each token ID is unique, belongs to one address, and can represent anything. The metadata is what gives it meaning.',
            },
            {
              type: 'summary',
              title: 'Lesson Complete! +20 XP',
              body: 'ERC-721 defines non-fungible tokens where every token ID is unique. It powers NFT collections, domain names, event tickets, and any asset where uniqueness matters.',
            },
          ],
          quiz: [
            {
              id: 'proposals_eth_l3_q1',
              question: 'What makes ERC-721 tokens different from ERC-20 tokens?',
              options: [
                'ERC-721 tokens can be split into fractions',
                'Each ERC-721 token has a unique ID and is not interchangeable with others',
                'ERC-721 tokens have lower gas fees',
                'ERC-721 tokens cannot be transferred',
              ],
              correctIndex: 1,
            },
            {
              id: 'proposals_eth_l3_q2',
              question: 'What does the tokenURI function return in ERC-721?',
              options: [
                'The owner\'s wallet address',
                'The token\'s price in ETH',
                'A link to the token\'s metadata (image, traits)',
                'The block number when the token was minted',
              ],
              correctIndex: 2,
            },
            {
              id: 'proposals_eth_l3_q3',
              question: 'Which NFT collection predated ERC-721 and helped inspire it?',
              options: ['Bored Ape Yacht Club', 'CryptoPunks', 'Azuki', 'Pudgy Penguins'],
              correctIndex: 1,
            },
            {
              id: 'proposals_eth_l3_q4',
              question: 'Where are NFT images usually stored?',
              options: [
                'Directly on the Ethereum blockchain',
                'On the NFT marketplace\'s servers',
                'On IPFS or other decentralized storage systems',
                'Inside the smart contract bytecode',
              ],
              correctIndex: 2,
            },
            {
              id: 'proposals_eth_l3_q5',
              question: 'Which of these is a real-world use case for ERC-721 beyond digital art?',
              options: [
                'Stable coins pegged to fiat currency',
                'Decentralized exchange liquidity pools',
                'ENS domain names and event tickets',
                'Cross-chain bridges',
              ],
              correctIndex: 2,
            },
          ],
        },

        {
          id: 'proposals_eth_l4',
          title: 'EIP-1559: The Fee Market Revolution',
          slides: [
            {
              type: 'intro',
              title: 'The Gas Fee Problem Before 1559',
              body: 'Before August 2021, Ethereum used a first-price auction for fees. You guessed how much to bid, miners picked the highest bidders, and gas fees were opaque and volatile. During congestion, users either overpaid massively or waited hours for confirmation.',
            },
            {
              type: 'text',
              title: 'The EIP-1559 Solution',
              body: 'EIP-1559, proposed by Vitalik Buterin and implemented in the London hard fork (August 2021), replaced the auction with a protocol-calculated base fee. The base fee adjusts every block based on how full the previous block was. Full block: base fee goes up by 12.5%. Empty block: base fee goes down by 12.5%.',
            },
            {
              type: 'text',
              title: 'Burns and Tips',
              body: 'Here is the key innovation: the base fee is burned. Destroyed. Gone from circulation. Users can also add a priority fee (tip) to incentivize validators to include their transaction sooner. Validators only keep the tip, not the base fee.',
            },
            {
              type: 'highlight',
              title: 'ETH Becomes Deflationary',
              body: 'Since EIP-1559, over 4 million ETH has been burned. During high-activity periods, the burn rate exceeds new ETH issuance from staking rewards, making ETH net deflationary. This is why Ethereum supporters call ETH "ultrasound money." The supply actually shrinks when the network is busy.',
            },
            {
              type: 'text',
              title: 'Better UX, Not Lower Fees',
              body: 'A common misconception: EIP-1559 did not reduce fees. It made fees more predictable. Wallets now show an accurate base fee, so you no longer need to guess. You still pay high fees during congestion, but you rarely overpay or have transactions stuck for hours.',
            },
            {
              type: 'summary',
              title: 'Lesson Complete! +20 XP',
              body: 'EIP-1559 replaced fee auctions with a protocol-calculated base fee that gets burned. The result: predictable fees, ETH supply reduction during high activity, and better UX for all users.',
            },
          ],
          quiz: [
            {
              id: 'proposals_eth_l4_q1',
              question: 'What happened to gas fees before EIP-1559?',
              options: [
                'They were always very low and predictable',
                'Users bid in a first-price auction and often overpaid or waited hours',
                'Gas fees were set by the Ethereum Foundation',
                'Miners charged a flat rate per transaction',
              ],
              correctIndex: 1,
            },
            {
              id: 'proposals_eth_l4_q2',
              question: 'What happens to the base fee in EIP-1559?',
              options: ['It goes to miners', 'It goes to validators', 'It is burned and removed from circulation', 'It is sent to a community treasury'],
              correctIndex: 2,
            },
            {
              id: 'proposals_eth_l4_q3',
              question: 'What is a priority fee (tip) in EIP-1559?',
              options: [
                'A fee that replaces the base fee entirely',
                'An optional extra fee paid directly to the validator to prioritize inclusion',
                'A penalty for overpaying',
                'A fee for smart contract execution only',
              ],
              correctIndex: 1,
            },
            {
              id: 'proposals_eth_l4_q4',
              question: 'How does EIP-1559 affect ETH supply during high network activity?',
              options: [
                'More ETH is minted to pay validators',
                'ETH supply is unaffected by network activity',
                'The burn rate can exceed issuance, making ETH net deflationary',
                'All burned ETH is redistributed to stakers',
              ],
              correctIndex: 2,
            },
            {
              id: 'proposals_eth_l4_q5',
              question: 'What did EIP-1559 primarily improve compared to the old fee model?',
              options: [
                'It made fees dramatically lower on average',
                'It made fees more predictable so users no longer overpay',
                'It eliminated fees for simple transfers',
                'It made miners much more profitable',
              ],
              correctIndex: 1,
            },
          ],
        },

        {
          id: 'proposals_eth_l5',
          title: 'ERC-4337: Account Abstraction',
          slides: [
            {
              type: 'intro',
              title: 'The UX Problem with Ethereum Wallets',
              body: 'Every Ethereum account is controlled by a private key. Lose the key, lose everything. Want someone else to pay your gas? Impossible. Want to set daily spending limits? Impossible. Want social recovery if you lose your phone? Not natively. Private key wallets are secure but unusable for most people.',
            },
            {
              type: 'text',
              title: 'What Account Abstraction Does',
              body: 'ERC-4337, proposed by Vitalik Buterin and others, makes every wallet a smart contract. Smart contract wallets can have any logic you define: multi-signature approval, biometric authentication, spending limits, session keys, and gas payment by third parties (paymasters).',
            },
            {
              type: 'text',
              title: 'Gasless Transactions',
              body: 'With ERC-4337, a "paymaster" contract can pay gas fees on behalf of users. This means apps can sponsor transactions for new users. You can use a dApp without ever holding ETH. The app or protocol covers your gas, similar to how apps cover server costs instead of charging users per request.',
            },
            {
              type: 'highlight',
              title: 'No More Seed Phrases',
              body: 'ERC-4337 wallets can implement social recovery: designate trusted friends or devices as guardians. If you lose access, guardians can vote to restore it. Or use biometrics from your phone as the signing key. Seed phrases become optional, not mandatory, opening crypto to billions more users.',
            },
            {
              type: 'text',
              title: 'The EntryPoint Contract',
              body: 'ERC-4337 introduced a shared EntryPoint contract deployed on every chain. Wallets send UserOperations (not regular transactions) to a mempool of bundlers, who pack them into regular transactions and submit them. The EntryPoint validates and executes them. No changes needed to the Ethereum protocol itself.',
            },
            {
              type: 'summary',
              title: 'Lesson Complete! +20 XP',
              body: 'ERC-4337 turns wallets into smart contracts with programmable logic. It enables gasless transactions, social recovery, spending limits, and biometric auth, without changing the core Ethereum protocol.',
            },
          ],
          quiz: [
            {
              id: 'proposals_eth_l5_q1',
              question: 'What is the main problem ERC-4337 solves?',
              options: [
                'High gas fees on Ethereum mainnet',
                'The limited programmability of private-key wallets and poor UX',
                'Slow transaction confirmation times',
                'The lack of NFT standards on Ethereum',
              ],
              correctIndex: 1,
            },
            {
              id: 'proposals_eth_l5_q2',
              question: 'What is a "paymaster" in ERC-4337?',
              options: [
                'A validator that processes transactions first',
                'A contract that pays gas fees on behalf of users',
                'A fee marketplace for gas auctions',
                'A bridge contract for cross-chain payments',
              ],
              correctIndex: 1,
            },
            {
              id: 'proposals_eth_l5_q3',
              question: 'How does ERC-4337 enable social recovery?',
              options: [
                'By storing your seed phrase on a social media account',
                'By requiring KYC verification through social media',
                'By allowing trusted guardians to restore wallet access if you lose your key',
                'By syncing wallet state to cloud storage automatically',
              ],
              correctIndex: 2,
            },
            {
              id: 'proposals_eth_l5_q4',
              question: 'What did ERC-4337 require in terms of Ethereum protocol changes?',
              options: [
                'A complete rewrite of the EVM',
                'A hard fork of the Ethereum network',
                'No core protocol changes: it uses a shared EntryPoint contract',
                'Changes to the consensus layer',
              ],
              correctIndex: 2,
            },
            {
              id: 'proposals_eth_l5_q5',
              question: 'What is a UserOperation in ERC-4337?',
              options: [
                'A regular Ethereum transaction with extra metadata',
                'An off-chain message that describes what a smart wallet should do, sent to bundlers',
                'A governance vote for ERC standards',
                'A signature for approving ERC-20 spending',
              ],
              correctIndex: 1,
            },
          ],
        },
      ],
      quiz: [
        { id: 'proposals_eth_q1', question: 'What does ERC stand for in Ethereum?', options: ['Ethereum Request for Comments', 'Ethereum Runtime Contract', 'Ethereum Registry Certificate', 'Ethereum Resource Control'], correct: 0, explanation: 'ERC stands for Ethereum Request for Comments. ERCs are a subset of EIPs focused on application-layer standards that define how smart contracts, tokens, and wallets should interact.' },
        { id: 'proposals_eth_q2', question: 'Which EIP replaced the gas fee auction system with a burned base fee?', options: ['EIP-721', 'EIP-4337', 'EIP-1559', 'EIP-2930'], correct: 2, explanation: 'EIP-1559 (London hard fork, August 2021) introduced the base fee + tip model. The base fee is burned every block, which can make ETH deflationary during high activity periods.' },
        { id: 'proposals_eth_q3', question: 'What problem does ERC-4337 account abstraction primarily solve?', options: ['High gas costs on mainnet', 'Poor wallet UX: lost keys, no gasless txs, no social recovery', 'Slow block finality times', 'NFT metadata storage costs'], correct: 1, explanation: 'ERC-4337 turns wallets into smart contracts with programmable logic, enabling social recovery, biometric auth, gasless transactions via paymasters, and spending limits without changing the core protocol.' },
        { id: 'proposals_eth_q4', question: 'What is the approve/transferFrom pattern in ERC-20 used for?', options: ['Minting new tokens', 'Letting a smart contract move your tokens after you grant permission', 'Burning tokens permanently', 'Upgrading a token contract'], correct: 1, explanation: 'The two-step approve/transferFrom pattern lets DEXes and protocols move your tokens without you sending them first. You approve an allowance; the protocol calls transferFrom to pull the tokens.' },
        { id: 'proposals_eth_q5', question: 'What makes ERC-721 tokens different from ERC-20 tokens?', options: ['ERC-721 tokens cost less gas', 'Each ERC-721 token has a unique ID and is not interchangeable', 'ERC-721 tokens can be split into fractions', 'ERC-721 tokens have no supply limit'], correct: 1, explanation: 'ERC-721 tokens are non-fungible: each has a unique token ID and belongs to exactly one address. ERC-20 tokens are fungible: one token is identical to any other of the same type.' },
      ],
    },

    // MODULE 2: BITCOIN PROPOSALS
    {
      id: 'proposals_btc',
      level: 'intermediate',
      title: 'Bitcoin Proposals',
      emoji: '₿',
      description: 'BIPs: how Bitcoin upgrades without a CEO. From HD wallets to Schnorr signatures to Taproot.',
      color: '#F59E0B',
      lessons: [
        {
          id: 'proposals_btc_l1',
          title: 'What are BIPs?',
          slides: [
            {
              type: 'intro',
              title: 'Bitcoin Has No CEO',
              body: 'Bitcoin has no company behind it, no foundation that approves upgrades, and no CEO to decide the roadmap. So how does it evolve? Through Bitcoin Improvement Proposals: a public process where anyone can suggest a change and the community debates it.',
            },
            {
              type: 'text',
              title: 'The BIP Process',
              body: 'Amir Taaki proposed the BIP system itself in 2011, modeled after Python\'s PEP process. A BIP starts as an idea, gets assigned a number, is written up with technical detail, and goes through community review. Some BIPs define standards (like wallet formats), others propose protocol changes (like Taproot).',
            },
            {
              type: 'text',
              title: 'Types of BIPs',
              body: 'There are three types: Standards Track BIPs change the Bitcoin protocol (consensus rules, networking, APIs). Informational BIPs describe guidelines or design issues without changing the protocol. Process BIPs describe processes around Bitcoin development, like the BIP process itself.',
            },
            {
              type: 'highlight',
              title: 'Rough Consensus: No Voting',
              body: 'Bitcoin does not vote on BIPs. Activation requires "rough consensus" among developers, miners, and node operators. A controversial BIP, even if miners signal for it, will not activate if the economic majority of full nodes reject it. Users running full nodes have the final say.',
            },
            {
              type: 'text',
              title: 'Soft Forks vs Hard Forks',
              body: 'Protocol BIPs can activate via soft fork (backward compatible: old nodes still work) or hard fork (requires everyone to upgrade, or the chain splits). Bitcoin strongly prefers soft forks because they do not force anyone to upgrade immediately. Taproot, SegWit, and most major Bitcoin upgrades were soft forks.',
            },
            {
              type: 'summary',
              title: 'Lesson Complete! +20 XP',
              body: 'BIPs are how Bitcoin evolves without central authority. Through public proposals, community debate, and rough consensus among developers, miners, and node operators, the protocol upgrades safely.',
            },
          ],
          quiz: [
            {
              id: 'proposals_btc_l1_q1',
              question: 'Who proposed the BIP system itself?',
              options: ['Satoshi Nakamoto', 'Gavin Andresen', 'Amir Taaki', 'Pieter Wuille'],
              correctIndex: 2,
            },
            {
              id: 'proposals_btc_l1_q2',
              question: 'What is a Standards Track BIP?',
              options: [
                'A BIP that describes how to run a Bitcoin node',
                'A BIP that changes the Bitcoin protocol, consensus rules, or networking',
                'A BIP that explains the history of Bitcoin',
                'A BIP for wallet user interface guidelines',
              ],
              correctIndex: 1,
            },
            {
              id: 'proposals_btc_l1_q3',
              question: 'Who has the final say on whether a Bitcoin BIP activates?',
              options: [
                'Bitcoin miners through hash rate votes',
                'The Bitcoin Foundation',
                'Full node operators representing the economic majority',
                'Bitcoin Core developers',
              ],
              correctIndex: 2,
            },
            {
              id: 'proposals_btc_l1_q4',
              question: 'Why does Bitcoin prefer soft forks over hard forks?',
              options: [
                'Soft forks are faster to implement',
                'Soft forks are backward compatible and do not force everyone to upgrade immediately',
                'Hard forks are not allowed by Bitcoin\'s rules',
                'Soft forks increase block size automatically',
              ],
              correctIndex: 1,
            },
            {
              id: 'proposals_btc_l1_q5',
              question: 'What model was the BIP process based on?',
              options: ['Ethereum\'s EIP process', 'Python\'s PEP process', 'IETF RFC process', 'Linux kernel patch process'],
              correctIndex: 1,
            },
          ],
        },

        {
          id: 'proposals_btc_l2',
          title: 'BIP-32: HD Wallets',
          slides: [
            {
              type: 'intro',
              title: 'One Seed, Infinite Addresses',
              body: 'Before BIP-32, Bitcoin wallets generated random private keys independently. If you backed up your wallet and then created a new address, that new address was not in your backup. You could lose coins just by using your wallet normally.',
            },
            {
              type: 'text',
              title: 'The HD Wallet Solution',
              body: 'BIP-32, proposed by Pieter Wuille in 2012, introduced Hierarchical Deterministic (HD) wallets. A single 512-bit seed generates a master key, from which an unlimited tree of child keys can be derived deterministically. The same seed always generates the same addresses, in the same order.',
            },
            {
              type: 'text',
              title: 'The Derivation Tree',
              body: 'Keys are organized in a tree: m/0/0 is the first key of the first account. m/0/1 is the second. m/1/0 is the first key of the second account. This structure lets wallets generate separate keys for different purposes (receiving, change, different coins) while backing up everything with one seed.',
            },
            {
              type: 'highlight',
              title: 'Extended Keys: xpub and xprv',
              body: 'BIP-32 introduced extended public keys (xpub) and extended private keys (xprv). An xpub lets you watch all addresses derived from it without exposing private keys. Hardware wallets give your exchange the xpub so it can generate deposit addresses, while the private keys stay offline.',
            },
            {
              type: 'text',
              title: 'BIP-39 and BIP-44 Complete the Picture',
              body: 'BIP-39 standardized the 12 or 24-word mnemonic phrase (seed words) as a human-readable backup for the HD seed. BIP-44 defined the derivation path standard across different cryptocurrencies. Together, these three BIPs define how every modern hardware and software wallet works.',
            },
            {
              type: 'summary',
              title: 'Lesson Complete! +20 XP',
              body: 'BIP-32 HD wallets derive an unlimited tree of keys from one seed. One backup covers all past and future addresses. Extended public keys enable watch-only wallets and hardware wallet integrations.',
            },
          ],
          quiz: [
            {
              id: 'proposals_btc_l2_q1',
              question: 'What problem did BIP-32 solve?',
              options: [
                'Transaction fees were too high',
                'Wallets generated random independent keys, so new addresses were not covered by old backups',
                'Bitcoin was too slow to confirm transactions',
                'Nodes were running out of disk space',
              ],
              correctIndex: 1,
            },
            {
              id: 'proposals_btc_l2_q2',
              question: 'What does HD in "HD wallet" stand for?',
              options: ['Hard Drive', 'Hierarchical Deterministic', 'High Definition', 'Hash Derived'],
              correctIndex: 1,
            },
            {
              id: 'proposals_btc_l2_q3',
              question: 'What can an xpub (extended public key) do?',
              options: [
                'Sign transactions without the private key',
                'Watch all addresses derived from it without exposing private keys',
                'Generate a new seed phrase',
                'Encrypt the wallet backup file',
              ],
              correctIndex: 1,
            },
            {
              id: 'proposals_btc_l2_q4',
              question: 'Which BIP standardized the 12 or 24 word mnemonic phrase?',
              options: ['BIP-32', 'BIP-44', 'BIP-39', 'BIP-141'],
              correctIndex: 2,
            },
            {
              id: 'proposals_btc_l2_q5',
              question: 'If you derive key m/0/1 from your seed, what does that represent?',
              options: [
                'The master key of the wallet',
                'The second key of the first account in the HD tree',
                'The first key of the second account in the HD tree',
                'A special key used only for multisig',
              ],
              correctIndex: 1,
            },
          ],
        },

        {
          id: 'proposals_btc_l3',
          title: 'BIP-141: SegWit',
          slides: [
            {
              type: 'intro',
              title: 'The Transaction Malleability Bug',
              body: 'Bitcoin had a long-standing bug: transaction IDs could be changed by anyone before confirmation. A third party could modify the signature data (without invalidating it) and produce a different TXID. This made it impossible to build reliable payment channels on top of Bitcoin, blocking the Lightning Network.',
            },
            {
              type: 'text',
              title: 'Segregated Witness: The Fix',
              body: 'BIP-141, proposed by Pieter Wuille and others, introduced Segregated Witness (SegWit). The key idea: separate the signature data (witness) from the transaction data. The TXID is calculated without the witness, so modifying witness data does not change the TXID. Malleability fixed.',
            },
            {
              type: 'text',
              title: 'Block Size vs Block Weight',
              body: 'SegWit also changed how block size is calculated. Instead of a 1MB block size limit, it introduced a 4 million weight unit limit. Witness data counts as 1 weight unit per byte; other data counts as 4. In practice, SegWit transactions are about 30 to 40% smaller, effectively increasing throughput.',
            },
            {
              type: 'highlight',
              title: 'SegWit Enabled Lightning',
              body: 'With malleability fixed, the Lightning Network became possible. Lightning uses pre-signed refund transactions that reference specific TXIDs. If those TXIDs could change, the refunds would be invalid. SegWit made TXID stable, turning Lightning from a theoretical proposal into a buildable system.',
            },
            {
              type: 'text',
              title: 'Soft Fork Activation',
              body: 'SegWit activated in August 2017 via a soft fork. Old nodes can still validate SegWit transactions (they see the witness as anyone-can-spend, which is still valid under old rules). Only upgraded nodes validate the actual witness data. This backward compatibility made the upgrade safer.',
            },
            {
              type: 'summary',
              title: 'Lesson Complete! +20 XP',
              body: 'BIP-141 SegWit fixed transaction malleability by separating signatures from transaction data. It increased effective throughput by 30 to 40% and unlocked the Lightning Network as a viable payment system.',
            },
          ],
          quiz: [
            {
              id: 'proposals_btc_l3_q1',
              question: 'What was the transaction malleability bug?',
              options: [
                'Transactions could not be broadcast to the network',
                'Third parties could modify signature data to change the TXID before confirmation',
                'Bitcoin nodes could double-spend transactions',
                'Block timestamps could be manipulated by miners',
              ],
              correctIndex: 1,
            },
            {
              id: 'proposals_btc_l3_q2',
              question: 'How did SegWit fix transaction malleability?',
              options: [
                'By encrypting all transaction data',
                'By removing signatures from Bitcoin entirely',
                'By separating witness data from the transaction so the TXID is calculated without it',
                'By requiring two confirmations before a TXID is assigned',
              ],
              correctIndex: 2,
            },
            {
              id: 'proposals_btc_l3_q3',
              question: 'What replaced the 1MB block size limit in SegWit?',
              options: [
                '2MB hard limit',
                '4 million weight unit limit with witness data counted at 1/4 the weight',
                '8MB limit for SegWit transactions only',
                'No limit: blocks can be any size after SegWit',
              ],
              correctIndex: 1,
            },
            {
              id: 'proposals_btc_l3_q4',
              question: 'Why did SegWit enable the Lightning Network?',
              options: [
                'It reduced fees to zero for Lightning channels',
                'It made TXIDs stable so pre-signed refund transactions in payment channels work reliably',
                'It increased Bitcoin\'s block size to fit more Lightning transactions',
                'It added smart contract functionality to Bitcoin',
              ],
              correctIndex: 1,
            },
            {
              id: 'proposals_btc_l3_q5',
              question: 'When did SegWit activate on Bitcoin?',
              options: ['January 2016', 'August 2017', 'November 2021', 'March 2019'],
              correctIndex: 1,
            },
          ],
        },

        {
          id: 'proposals_btc_l4',
          title: 'BIP-340: Schnorr Signatures',
          slides: [
            {
              type: 'intro',
              title: 'Beyond ECDSA',
              body: 'Since its launch, Bitcoin used ECDSA (Elliptic Curve Digital Signature Algorithm) for signing transactions. It worked, but it had known inefficiencies: signatures were large, multi-signatures required complex workarounds, and privacy leaks were unavoidable. Schnorr signatures fix all three.',
            },
            {
              type: 'text',
              title: 'What Makes Schnorr Better',
              body: 'Schnorr signatures are mathematically simpler than ECDSA, formally provable under standard assumptions, and linearly aggregatable. That last property is key: multiple Schnorr signatures can be combined into one signature that is indistinguishable from a single-key signature.',
            },
            {
              type: 'text',
              title: 'MuSig and Multi-Signature Efficiency',
              body: 'With ECDSA, a 2-of-3 multisig reveals on-chain that it is a multisig, shows all three public keys, and requires three separate signature verifications. With Schnorr and the MuSig protocol, a 2-of-3 multisig produces one signature and one public key on-chain, indistinguishable from a regular single-key transaction.',
            },
            {
              type: 'highlight',
              title: 'Privacy by Default',
              body: 'When complex spending conditions (multisig, time locks, contract conditions) look identical on-chain to simple payments, chain analysis becomes much harder. Blockchain surveillance companies cannot tell if a transaction used a hardware wallet security setup, a business account with multiple signers, or a simple personal wallet.',
            },
            {
              type: 'text',
              title: 'Part of the Taproot Upgrade',
              body: 'BIP-340 (Schnorr), BIP-341 (Taproot), and BIP-342 (Tapscript) were proposed and activated together in November 2021. Schnorr alone enables signature aggregation. Taproot (the next lesson) builds on it to enable smart contract conditions on Bitcoin while maintaining privacy.',
            },
            {
              type: 'summary',
              title: 'Lesson Complete! +20 XP',
              body: 'BIP-340 Schnorr signatures are smaller, formally provable, and aggregatable. Multiple signatures combine into one, making multisig indistinguishable from single-key transactions and improving privacy across the network.',
            },
          ],
          quiz: [
            {
              id: 'proposals_btc_l4_q1',
              question: 'What signature algorithm did Bitcoin use before Schnorr?',
              options: ['RSA-2048', 'EdDSA', 'ECDSA', 'SHA-256'],
              correctIndex: 2,
            },
            {
              id: 'proposals_btc_l4_q2',
              question: 'What is the key mathematical property of Schnorr signatures that ECDSA lacks?',
              options: ['Quantum resistance', 'Linear aggregation: multiple signatures can combine into one', 'Zero-knowledge proof compatibility', 'Faster signing speed'],
              correctIndex: 1,
            },
            {
              id: 'proposals_btc_l4_q3',
              question: 'What does MuSig enable with Schnorr signatures?',
              options: [
                'Mining multiple blocks simultaneously',
                'A multi-signature setup that looks like a single-key signature on-chain',
                'Automatic coin mixing for privacy',
                'Cross-chain atomic swaps',
              ],
              correctIndex: 1,
            },
            {
              id: 'proposals_btc_l4_q4',
              question: 'How does Schnorr improve privacy on Bitcoin?',
              options: [
                'It hides transaction amounts',
                'It encrypts all transaction data',
                'Complex spending conditions (multisig, time locks) look like simple payments on-chain',
                'It removes all metadata from transactions',
              ],
              correctIndex: 2,
            },
            {
              id: 'proposals_btc_l4_q5',
              question: 'When did Schnorr signatures activate on Bitcoin?',
              options: ['August 2017 with SegWit', 'November 2021 with Taproot', 'January 2023', 'April 2024 with the halving'],
              correctIndex: 1,
            },
          ],
        },

        {
          id: 'proposals_btc_l5',
          title: 'BIP-341: Taproot',
          slides: [
            {
              type: 'intro',
              title: 'Bitcoin\'s Biggest Upgrade in Years',
              body: 'Taproot activated in November 2021 and was widely considered the most significant Bitcoin upgrade since SegWit in 2017. It combined Schnorr signatures with a new script structure called MAST to make Bitcoin more expressive while simultaneously improving privacy for everyone.',
            },
            {
              type: 'text',
              title: 'The Problem: All Conditions Exposed',
              body: 'Before Taproot, when you used a complex Bitcoin script (time-locked funds, multisig, smart contracts), the entire script was revealed on-chain when you spent. Even if you only used one spending path, all other possible paths were visible to everyone. This was wasteful and leaked information.',
            },
            {
              type: 'text',
              title: 'MAST: Merkelized Alternative Script Trees',
              body: 'Taproot uses MAST to hide all spending conditions except the one actually used. You commit to a tree of possible scripts at the time of deposit (just a hash). When spending, you only reveal the path you used. Unused conditions stay private. A 5-of-8 multisig where everyone cooperates looks identical to a single-key payment.',
            },
            {
              type: 'highlight',
              title: 'The Key Path and Script Path',
              body: 'Every Taproot output has two ways to spend: the key path (if all parties cooperate, produce one Schnorr signature and spend immediately, no script revealed) and the script path (reveal only the specific script condition used). The happy path is always fastest and most private.',
            },
            {
              type: 'text',
              title: 'Ordinals and the Unexpected Consequence',
              body: 'Taproot had an unintended consequence: it made it much cheaper to embed large amounts of data in Bitcoin transactions. This enabled Ordinals (Bitcoin NFTs) in 2023, where arbitrary data including images and text is inscribed directly onto satoshis. Whether this is a feature or a misuse is still debated in the Bitcoin community.',
            },
            {
              type: 'summary',
              title: 'Lesson Complete! +20 XP',
              body: 'BIP-341 Taproot uses MAST to hide unused script conditions and Schnorr to make cooperative spends look like single-key transactions. It is Bitcoin\'s most expressive and privacy-preserving upgrade to date.',
            },
          ],
          quiz: [
            {
              id: 'proposals_btc_l5_q1',
              question: 'What does MAST stand for in the context of Taproot?',
              options: [
                'Multi-Address Script Transaction',
                'Merkelized Alternative Script Trees',
                'Multi-Asset Storage Tree',
                'Merkle Aggregated Signature Technology',
              ],
              correctIndex: 1,
            },
            {
              id: 'proposals_btc_l5_q2',
              question: 'What is the "key path" in a Taproot spend?',
              options: [
                'The path that reveals all script conditions',
                'A spend where all parties cooperate and produce one Schnorr signature with no script revealed',
                'The derivation path used to generate the Taproot key',
                'A fallback path used when the main script fails',
              ],
              correctIndex: 1,
            },
            {
              id: 'proposals_btc_l5_q3',
              question: 'What privacy benefit does Taproot provide for multisig users?',
              options: [
                'Multisig transactions are now completely untraceable',
                'When all parties cooperate, their transaction looks identical to a single-key payment',
                'Multisig keys are automatically rotated after each transaction',
                'Transaction amounts are hidden by default',
              ],
              correctIndex: 1,
            },
            {
              id: 'proposals_btc_l5_q4',
              question: 'What is an unexpected consequence of Taproot that was not part of the original design?',
              options: [
                'Taproot accidentally enabled zero-knowledge proofs on Bitcoin',
                'Taproot made atomic swaps impossible',
                'Taproot made it cheap to inscribe large data, enabling Ordinals (Bitcoin NFTs)',
                'Taproot reduced block rewards faster than scheduled',
              ],
              correctIndex: 2,
            },
            {
              id: 'proposals_btc_l5_q5',
              question: 'When did Taproot activate on Bitcoin?',
              options: ['August 2017', 'January 2020', 'November 2021', 'April 2024'],
              correctIndex: 2,
            },
          ],
        },
      ],
      quiz: [
        { id: 'proposals_btc_q1', question: 'What is a BIP?', options: ['Bitcoin Interface Protocol', 'Bitcoin Improvement Proposal', 'Bitcoin Integration Package', 'Bitcoin Instruction Procedure'], correct: 1, explanation: 'BIP stands for Bitcoin Improvement Proposal. The BIP system was proposed by Amir Taaki in 2011, modeled on Python\'s PEP process, and is how Bitcoin evolves without a central authority.' },
        { id: 'proposals_btc_q2', question: 'What did BIP-32 introduce?', options: ['SegWit transaction format', 'Schnorr signatures', 'Hierarchical Deterministic wallets derived from a single seed', 'The Lightning Network'], correct: 2, explanation: 'BIP-32 HD wallets derive an unlimited tree of key pairs from one master seed. The same seed always generates the same addresses, so one backup covers all past and future addresses.' },
        { id: 'proposals_btc_q3', question: 'What bug did SegWit (BIP-141) fix?', options: ['High mining fees', 'Transaction malleability: third parties could change a TXID before confirmation', 'Block timestamp manipulation', 'Double-spend attacks'], correct: 1, explanation: 'SegWit separated signature (witness) data from the transaction data used to calculate the TXID. This made TXIDs stable, which was the prerequisite for building the Lightning Network.' },
        { id: 'proposals_btc_q4', question: 'What is the key mathematical property of Schnorr signatures (BIP-340)?', options: ['Quantum resistance', 'Linear aggregation: multiple signatures combine into one', 'Faster signing than ECDSA', 'Smaller public key size'], correct: 1, explanation: 'Schnorr signatures are linearly aggregatable. The MuSig protocol uses this to combine multiple signers into one key and one signature on-chain, making multisig indistinguishable from single-key transactions.' },
        { id: 'proposals_btc_q5', question: 'What unexpected use case did Taproot (BIP-341) accidentally enable?', options: ['Cross-chain atomic swaps', 'Zero-knowledge proofs on Bitcoin', 'Ordinals: inscribing arbitrary data on satoshis', 'Lightning channel capacity increases'], correct: 2, explanation: 'Taproot made it cheap to embed large amounts of data in Bitcoin transactions. This was exploited by the Ordinals protocol in 2023 to inscribe images, text, and other data directly onto individual satoshis.' },
      ],
    },

    // MODULE 3: SOLANA PROPOSALS
    {
      id: 'proposals_sol',
      level: 'intermediate',
      title: 'Solana Proposals',
      emoji: '◎',
      description: 'SIMDs and the Solana Program Library: how Solana upgrades governance by GitHub PR.',
      color: '#9945FF',
      lessons: [
        {
          id: 'proposals_sol_l1',
          title: 'What are SIMDs?',
          slides: [
            {
              type: 'intro',
              title: 'Solana\'s Proposal Process',
              body: 'Solana uses SIMDs (Solana Improvement Documents) to formalize changes to the protocol, runtime, and tooling. Like Ethereum\'s EIPs and Bitcoin\'s BIPs, SIMDs are the structured way Solana evolves. Unlike both, Solana moves much faster and has a more centralized initial development process.',
            },
            {
              type: 'text',
              title: 'Governance by GitHub PR',
              body: 'SIMDs live in the solana-foundation/solana-improvement-documents repository on GitHub. Anyone can open a pull request with a new SIMD. The Solana core team, validators, and community review and debate it. Once accepted, it gets a number and moves through Draft, Review, and Activation stages.',
            },
            {
              type: 'text',
              title: 'Feature Flags and Activation',
              body: 'Solana uses a feature flag system for protocol changes. A new feature is first added behind a disabled flag. Validators signal support by staking their votes for the feature. Once a supermajority of stake supports it, the feature activates at a specific epoch. This allows gradual rollout without a hard fork.',
            },
            {
              type: 'highlight',
              title: 'Faster Iteration Than Bitcoin or Ethereum',
              body: 'Ethereum EIPs often take years from proposal to activation. Bitcoin BIPs can take even longer. Solana SIMDs move faster because Solana Labs drives development more centrally and the validator set is smaller and more coordinated. The tradeoff is a more opinionated governance process with less decentralized oversight.',
            },
            {
              type: 'text',
              title: 'Not Just Protocol Changes',
              body: 'SIMDs cover the core protocol but Solana also evolves through the Solana Program Library (SPL): a set of on-chain programs (smart contracts) that serve as standards. SPL Token, the Solana equivalent of ERC-20, and SPL Governance are both part of this library. SPL programs are upgraded more like open source software than protocol proposals.',
            },
            {
              type: 'summary',
              title: 'Lesson Complete! +20 XP',
              body: 'SIMDs are Solana\'s formal proposal process, managed via GitHub PRs. Feature flags allow gradual activation by validator vote. Solana moves faster than Bitcoin or Ethereum but with more centralized direction.',
            },
          ],
          quiz: [
            {
              id: 'proposals_sol_l1_q1',
              question: 'What does SIMD stand for?',
              options: ['Solana Instance Management Directive', 'Solana Improvement Document', 'Solana Interface Module Definition', 'Scalable Instruction Memory Design'],
              correctIndex: 1,
            },
            {
              id: 'proposals_sol_l1_q2',
              question: 'How are SIMDs submitted and tracked?',
              options: [
                'Through the Solana Foundation\'s internal ticket system',
                'Via GitHub pull requests to the solana-improvement-documents repository',
                'By submitting a proposal directly to the Solana Labs engineering team',
                'Through on-chain governance voting',
              ],
              correctIndex: 1,
            },
            {
              id: 'proposals_sol_l1_q3',
              question: 'How do Solana features activate after a SIMD is accepted?',
              options: [
                'They activate immediately when the PR is merged',
                'They require a hard fork coordinated by Solana Labs',
                'Validators signal support via stake votes and features activate when a supermajority is reached',
                'They activate after a fixed 90-day waiting period',
              ],
              correctIndex: 2,
            },
            {
              id: 'proposals_sol_l1_q4',
              question: 'Why does Solana move faster than Bitcoin or Ethereum in adopting upgrades?',
              options: [
                'Solana has a larger validator set with more coordination',
                'Solana Labs drives development more centrally and the validator set is smaller and more coordinated',
                'Solana does not require community consensus for changes',
                'Solana uses a faster programming language for its node software',
              ],
              correctIndex: 1,
            },
            {
              id: 'proposals_sol_l1_q5',
              question: 'What is the Solana Program Library (SPL)?',
              options: [
                'The Solana programming language specification',
                'A set of standard on-chain programs like SPL Token that serve as application-layer standards',
                'A library of SIMD proposals awaiting review',
                'The Solana validator client software',
              ],
              correctIndex: 1,
            },
          ],
        },

        {
          id: 'proposals_sol_l2',
          title: 'SIMD-0033: Timely Vote Credits',
          slides: [
            {
              type: 'intro',
              title: 'How Validators Are Rewarded',
              body: 'Solana validators earn credits for voting on blocks. These vote credits convert to SOL rewards at the end of each epoch. Before SIMD-0033, validators earned the same reward for voting on a block whether they voted immediately or many slots later. This created a perverse incentive.',
            },
            {
              type: 'text',
              title: 'The Latency Problem',
              body: 'Under the old system, validators could delay their votes to observe other validators\' behavior and free-ride on their work. This "latency exploitation" meant validators could avoid the cost of being a fast, well-connected node while still earning full rewards. It was economically rational but bad for network health.',
            },
            {
              type: 'text',
              title: 'SIMD-0033\'s Solution',
              body: 'SIMD-0033 introduced Timely Vote Credits: validators earn more credits for voting early (within 1-2 slots of block confirmation) and fewer credits for voting late. The maximum reward requires consistently fast votes. This directly incentivizes validators to invest in low-latency infrastructure.',
            },
            {
              type: 'highlight',
              title: 'The Credit Formula',
              body: 'Under Timely Vote Credits, a validator earns up to 8 credits for voting within 1 slot, scaling down to 1 credit for voting after 32 or more slots. Late votes still count for consensus but earn minimal economic reward. This aligns validator income with network performance.',
            },
            {
              type: 'text',
              title: 'Impact on Network Performance',
              body: 'After SIMD-0033 activated, Solana validators had a direct financial incentive to optimize for speed. This contributed to lower average vote latency across the network and improved block confirmation times. Good protocol design creates the right economic incentives without requiring trust.',
            },
            {
              type: 'summary',
              title: 'Lesson Complete! +20 XP',
              body: 'SIMD-0033 Timely Vote Credits rewards validators for fast voting and penalizes slow voting economically. It aligned validator incentives with network health and drove improvements in vote latency.',
            },
          ],
          quiz: [
            {
              id: 'proposals_sol_l2_q1',
              question: 'What problem did SIMD-0033 address?',
              options: [
                'High transaction fees for Solana users',
                'Validators could earn full rewards while voting late, creating no incentive to be fast',
                'Validators were colluding to censor transactions',
                'Block size was too small for Solana\'s throughput',
              ],
              correctIndex: 1,
            },
            {
              id: 'proposals_sol_l2_q2',
              question: 'Under Timely Vote Credits, when does a validator earn maximum credits?',
              options: [
                'When voting after 32 or more slots',
                'When voting within 1 slot of block confirmation',
                'When voting before the block is produced',
                'When voting in the same slot as the leader',
              ],
              correctIndex: 1,
            },
            {
              id: 'proposals_sol_l2_q3',
              question: 'Do late votes under SIMD-0033 still count for consensus?',
              options: [
                'No, late votes are completely ignored',
                'Yes, but they earn minimal economic reward',
                'Yes, and they earn the same reward as early votes',
                'No, validators are slashed for voting late',
              ],
              correctIndex: 1,
            },
            {
              id: 'proposals_sol_l2_q4',
              question: 'What behavior did SIMD-0033 specifically discourage?',
              options: [
                'Running multiple validator nodes',
                'Delaying votes to observe others and free-ride on their work',
                'Voting on forks instead of the main chain',
                'Setting high commission rates',
              ],
              correctIndex: 1,
            },
            {
              id: 'proposals_sol_l2_q5',
              question: 'What is the main design principle behind SIMD-0033?',
              options: [
                'Punish validators for any behavior outside the spec',
                'Align validator economic incentives with network performance through the reward structure',
                'Give Solana Labs more control over validator behavior',
                'Reduce the total SOL supply by burning late votes',
              ],
              correctIndex: 1,
            },
          ],
        },

        {
          id: 'proposals_sol_l3',
          title: 'SPL Token Standard',
          slides: [
            {
              type: 'intro',
              title: 'Solana\'s Answer to ERC-20',
              body: 'The Solana Program Library (SPL) Token program is the standard for fungible and non-fungible tokens on Solana. Like ERC-20 on Ethereum, it provides a shared interface so every wallet, DEX, and protocol can interact with any SPL token without custom code.',
            },
            {
              type: 'text',
              title: 'How SPL Token Differs from ERC-20',
              body: 'Unlike ERC-20 where each token is a separate deployed contract, all SPL tokens use the same shared Token program. A token is just a "mint account" (defines supply, decimals, authority) and "token accounts" (hold balances per wallet). This is more efficient but requires wallets to create a token account before receiving a new token.',
            },
            {
              type: 'text',
              title: 'Associated Token Accounts',
              body: 'Every wallet has an "Associated Token Account" (ATA) for each token it holds. The ATA address is deterministic: you can always calculate it from the wallet address and token mint. This eliminates the need to look up account addresses. Sending tokens to a new wallet automatically creates the ATA (the sender pays the account creation rent).',
            },
            {
              type: 'highlight',
              title: 'Token-2022: Extensions',
              body: 'In 2023, the Token-2022 program launched as an upgrade to the original SPL Token. It added extension capabilities: transfer fees (charged automatically on every transfer), confidential transfers (ZK-based private balances), non-transferable tokens (soulbound), and interest-bearing tokens. Projects choose between the original and Token-2022 based on needs.',
            },
            {
              type: 'text',
              title: 'NFTs on Solana',
              body: 'Solana NFTs use SPL Token with a supply of exactly 1 and 0 decimals, making the token non-fungible. Metadata (name, image, attributes) is stored in a separate Metadata account defined by the Metaplex standard. Metaplex is the most widely used NFT standard on Solana, similar to how ERC-721 plus tokenURI works on Ethereum.',
            },
            {
              type: 'summary',
              title: 'Lesson Complete! +20 XP',
              body: 'SPL Token is the Solana equivalent of ERC-20. All tokens share one program. Token-2022 adds extensions like transfer fees and confidential transfers. NFTs use a supply of 1 with Metaplex for metadata.',
            },
          ],
          quiz: [
            {
              id: 'proposals_sol_l3_q1',
              question: 'How does SPL Token differ from ERC-20 in terms of deployment?',
              options: [
                'SPL Token requires each token to deploy its own contract like ERC-20',
                'All SPL tokens use one shared Token program; each token is a mint account, not a separate contract',
                'SPL Token does not support fungible tokens',
                'SPL Token is a subset of ERC-20 running on Solana',
              ],
              correctIndex: 1,
            },
            {
              id: 'proposals_sol_l3_q2',
              question: 'What is an Associated Token Account (ATA)?',
              options: [
                'A special account for validators to store rewards',
                'A deterministic token account address derived from the wallet and mint, used to hold a specific token',
                'The main account used to pay transaction fees',
                'A multisig account for joint token ownership',
              ],
              correctIndex: 1,
            },
            {
              id: 'proposals_sol_l3_q3',
              question: 'What is Token-2022?',
              options: [
                'The original Solana token standard released in 2022',
                'An upgraded token program with extensions like transfer fees and confidential transfers',
                'A Solana NFT marketplace launched in 2022',
                'A cross-chain bridge for ERC-20 tokens to Solana',
              ],
              correctIndex: 1,
            },
            {
              id: 'proposals_sol_l3_q4',
              question: 'How are Solana NFTs represented using SPL Token?',
              options: [
                'Using a special NFT program separate from SPL Token',
                'Using SPL Token with a supply of exactly 1 and 0 decimals, with Metaplex for metadata',
                'Using ERC-721 bridged to Solana',
                'NFTs are not supported natively on Solana',
              ],
              correctIndex: 1,
            },
            {
              id: 'proposals_sol_l3_q5',
              question: 'What does a confidential transfer extension in Token-2022 provide?',
              options: [
                'Faster transaction confirmation times',
                'Zero-knowledge proof-based private balances that hide transfer amounts',
                'Lower transaction fees for large transfers',
                'Automatic tax reporting for regulatory compliance',
              ],
              correctIndex: 1,
            },
          ],
        },

        {
          id: 'proposals_sol_l4',
          title: 'Solana Program Library Overview',
          slides: [
            {
              type: 'intro',
              title: 'On-Chain Standard Library',
              body: 'The Solana Program Library (SPL) is a collection of on-chain programs (smart contracts) maintained by Solana Labs and the community. Think of it as Solana\'s standard library: audited, battle-tested building blocks that any developer can call instead of building from scratch.',
            },
            {
              type: 'text',
              title: 'Key SPL Programs',
              body: 'SPL Token handles all fungible and non-fungible tokens. SPL Stake Pool lets users pool SOL for staking without running a validator. SPL Governance powers DAOs with proposal creation and on-chain voting. SPL Name Service handles domain names (like .sol domains). Each is an audited, shared on-chain program.',
            },
            {
              type: 'text',
              title: 'How SPL Programs Work',
              body: 'On Solana, programs are stateless: they contain only code, not data. State is stored in separate "accounts" owned by the program. SPL Token defines the program logic; your token balance is stored in a token account your wallet creates. This separation of code and state enables parallel processing.',
            },
            {
              type: 'highlight',
              title: 'Composability Through Shared Programs',
              body: 'Because every Solana dApp uses the same SPL Token program, they all share the same token interface. A new DEX does not need to integrate each token individually: any SPL Token works automatically. This is the same composability advantage ERC-20 provides on Ethereum, but implemented more efficiently.',
            },
            {
              type: 'text',
              title: 'Metaplex: Beyond SPL',
              body: 'Not all Solana standards are in the official SPL. Metaplex provides the most widely used NFT standard on Solana: the Token Metadata program, Candy Machine (NFT minting), and Auction House (marketplace). These are community-maintained programs that have become de facto standards through adoption.',
            },
            {
              type: 'summary',
              title: 'Lesson Complete! +20 XP',
              body: 'The Solana Program Library is Solana\'s standard on-chain library. SPL Token, Stake Pool, Governance, and Name Service are all shared programs. Metaplex extends this with NFT standards through community adoption.',
            },
          ],
          quiz: [
            {
              id: 'proposals_sol_l4_q1',
              question: 'What is the Solana Program Library (SPL)?',
              options: [
                'A library of offline tools for Solana developers',
                'A collection of audited on-chain programs that serve as Solana\'s standard building blocks',
                'A set of programming languages supported by Solana',
                'The documentation for Solana\'s core protocol',
              ],
              correctIndex: 1,
            },
            {
              id: 'proposals_sol_l4_q2',
              question: 'Why are Solana programs described as "stateless"?',
              options: [
                'Solana programs do not execute any code',
                'Programs contain only code; all state is stored in separate accounts owned by the program',
                'Solana programs reset their data after each transaction',
                'Solana does not support persistent data storage',
              ],
              correctIndex: 1,
            },
            {
              id: 'proposals_sol_l4_q3',
              question: 'What does SPL Governance provide?',
              options: [
                'Staking pools for SOL holders',
                'Domain name registration for .sol addresses',
                'DAO infrastructure with proposal creation and on-chain voting',
                'A bridge to Ethereum governance protocols',
              ],
              correctIndex: 2,
            },
            {
              id: 'proposals_sol_l4_q4',
              question: 'How does composability work with SPL Token?',
              options: [
                'Each dApp must integrate tokens individually with custom code',
                'Any dApp using SPL Token automatically works with all SPL tokens through the shared interface',
                'SPL Token composability requires a special license from Solana Labs',
                'Composability only works for tokens on the same Solana cluster',
              ],
              correctIndex: 1,
            },
            {
              id: 'proposals_sol_l4_q5',
              question: 'What is Metaplex on Solana?',
              options: [
                'The official SPL NFT program maintained by Solana Labs',
                'A community-maintained set of NFT standards including Token Metadata and Candy Machine',
                'A cross-chain protocol connecting Solana and Ethereum NFTs',
                'A staking program for Solana validators',
              ],
              correctIndex: 1,
            },
          ],
        },

        {
          id: 'proposals_sol_l5',
          title: 'SIMD-0096: Core BPF Migration',
          slides: [
            {
              type: 'intro',
              title: 'Built-In Programs vs BPF Programs',
              body: 'Solana has two types of on-chain programs. Built-in programs (also called native programs) are compiled directly into the validator client: they handle staking, voting, the BPF loader itself. BPF programs are user-deployed and run in the BPF virtual machine. The distinction matters for upgradeability.',
            },
            {
              type: 'text',
              title: 'The Problem with Native Programs',
              body: 'Because native programs are baked into the validator binary, upgrading them requires all validators to update their node software and restart. A bug in a native program cannot be patched quickly. Any improvement requires a full network upgrade, which takes weeks of coordination. This is a significant operational risk.',
            },
            {
              type: 'text',
              title: 'What SIMD-0096 Proposes',
              body: 'SIMD-0096 proposes migrating core built-in programs (like the Stake program, Vote program, and BPF Loader) to run as BPF programs instead. BPF programs can be upgraded permissionlessly or with controlled authority, fixed quickly if bugs are found, and improved without requiring a full validator upgrade.',
            },
            {
              type: 'highlight',
              title: 'Faster Bug Fixes and Iteration',
              body: 'If a vulnerability is discovered in a BPF-migrated program, Solana Labs can deploy a fix in hours rather than weeks. The validator set just needs to accept the upgraded program account. This dramatically improves Solana\'s ability to respond to security incidents and ship improvements faster.',
            },
            {
              type: 'text',
              title: 'Why This Is Hard',
              body: 'Migrating native programs to BPF requires extreme care. These programs handle staking and consensus, so any bug introduced during migration could be catastrophic. The migration needs to be byte-for-byte compatible with the existing behavior during the transition period. It is one of the most complex engineering changes Solana has undertaken.',
            },
            {
              type: 'summary',
              title: 'Lesson Complete! +20 XP',
              body: 'SIMD-0096 migrates core Solana programs from compiled-in native code to upgradeable BPF programs. The goal: faster bug fixes, easier iteration, and reduced dependency on full validator upgrades for program changes.',
            },
          ],
          quiz: [
            {
              id: 'proposals_sol_l5_q1',
              question: 'What are "native programs" on Solana?',
              options: [
                'Programs written in native Rust without the Solana SDK',
                'Programs compiled directly into the validator client software',
                'Programs deployed by the Solana community without Solana Labs involvement',
                'Programs that run on the native Solana hardware',
              ],
              correctIndex: 1,
            },
            {
              id: 'proposals_sol_l5_q2',
              question: 'Why is upgrading a native program difficult?',
              options: [
                'Native programs cannot be changed once deployed',
                'It requires all validators to update and restart their node software',
                'Native programs require a governance vote from all SOL holders',
                'Only Solana Labs has the keys to upgrade native programs',
              ],
              correctIndex: 1,
            },
            {
              id: 'proposals_sol_l5_q3',
              question: 'What does SIMD-0096 propose migrating built-in programs to?',
              options: ['WebAssembly (WASM)', 'BPF (Berkeley Packet Filter) programs', 'Ethereum EVM bytecode', 'LLVM IR'],
              correctIndex: 1,
            },
            {
              id: 'proposals_sol_l5_q4',
              question: 'What is the key benefit of running core programs as BPF instead of native?',
              options: [
                'BPF programs run significantly faster than native programs',
                'Bug fixes can be deployed in hours without requiring all validators to upgrade',
                'BPF programs pay lower transaction fees',
                'BPF programs can be run off-chain for cheaper computation',
              ],
              correctIndex: 1,
            },
            {
              id: 'proposals_sol_l5_q5',
              question: 'Why is the SIMD-0096 migration technically difficult?',
              options: [
                'BPF does not support all the operations native programs use',
                'These programs handle staking and consensus, so any migration bug could be catastrophic',
                'Solana Labs does not have the source code for the native programs',
                'The migration requires shutting down Solana mainnet temporarily',
              ],
              correctIndex: 1,
            },
          ],
        },
      ],
      quiz: [
        { id: 'proposals_sol_q1', question: 'What does SIMD stand for?', options: ['Solana Instance Management Directive', 'Solana Improvement Document', 'Scalable Instruction Module Definition', 'Solana Interface Module Descriptor'], correct: 1, explanation: 'SIMD stands for Solana Improvement Document. SIMDs are submitted via GitHub pull requests and go through community review before being activated on the Solana network through validator stake votes.' },
        { id: 'proposals_sol_q2', question: 'How does SPL Token differ from Ethereum\'s ERC-20?', options: ['SPL Token is only for NFTs', 'All SPL tokens share one program; each token is a mint account, not a separate contract', 'SPL Token requires KYC approval', 'SPL Token only works on Solana testnet'], correct: 1, explanation: 'On Ethereum, every ERC-20 token deploys its own contract. On Solana, all tokens use the single shared SPL Token program. Token state is stored in separate mint and token accounts, making the system more efficient.' },
        { id: 'proposals_sol_q3', question: 'What did SIMD-0033 Timely Vote Credits change about validator rewards?', options: ['It doubled all validator rewards', 'It penalized validators that vote too early', 'It rewards validators more for voting quickly and penalizes slow votes economically', 'It removed vote credits entirely'], correct: 2, explanation: 'SIMD-0033 introduced a sliding scale: validators earn up to 8 credits for voting within 1 slot, down to 1 credit for very late votes. This aligned economic incentives with fast, well-connected infrastructure.' },
        { id: 'proposals_sol_q4', question: 'What is Token-2022 on Solana?', options: ['The original token program from 2022', 'An upgraded token program with extensions like transfer fees and confidential transfers', 'A cross-chain bridge for ERC-20 tokens', 'A Solana NFT marketplace'], correct: 1, explanation: 'Token-2022 is an extension of the original SPL Token program adding optional features: automatic transfer fees, ZK-based confidential transfers, non-transferable (soulbound) tokens, and interest-bearing tokens.' },
        { id: 'proposals_sol_q5', question: 'Why does SIMD-0096 propose migrating native programs to BPF?', options: ['BPF programs run faster than native programs', 'BPF programs can be patched quickly without requiring all validators to update their node software', 'Native programs cost more in transaction fees', 'BPF programs are easier to audit'], correct: 1, explanation: 'Native programs are compiled into the validator binary, so fixing a bug requires a full network upgrade coordinated across all validators. BPF programs can be upgraded in hours, dramatically reducing incident response time.' },
      ],
    },

    // MODULE 4: ERC TOKEN STANDARDS DEEP DIVE
    {
      id: 'proposals_erc_advanced',
      level: 'intermediate',
      title: 'ERC Token Standards Deep Dive',
      emoji: '🪙',
      description: 'ERC-777, ERC-1155 multi-token, ERC-2981 royalties, ERC-4626 tokenized vaults, and ERC-6551 token-bound accounts.',
      color: '#7C3AED',
      lessons: [
        {
          id: 'proposals_erc_adv_l1',
          title: 'ERC-777: Operator Model and Transfer Hooks',
          slides: [
            { type: 'intro', title: 'Fixing ERC-20\'s Callback Gap', body: 'ERC-20 has a known problem: if you send tokens directly to a contract that does not expect them, they get stuck forever. There is no callback to notify the receiving contract. ERC-777 was designed to fix this by adding "hooks" that fire whenever tokens are sent or received.' },
            { type: 'text', title: 'The Operator Pattern', body: 'ERC-777 introduced operators: addresses that are authorized to send tokens on behalf of a holder, similar to approve/transferFrom in ERC-20 but with a cleaner interface. You can authorize operators globally (for all holders) or per-address. This enabled more expressive DeFi primitives.' },
            { type: 'text', title: 'tokensToSend and tokensReceived Hooks', body: 'When tokens are sent, ERC-777 calls the sender\'s tokensToSend hook (if registered). When tokens arrive, it calls the recipient\'s tokensReceived hook. This lets contracts react to incoming tokens automatically, solving the "stuck token" problem entirely.' },
            { type: 'highlight', title: 'The Reentrancy Problem', body: 'ERC-777\'s hooks, while powerful, introduced a dangerous reentrancy attack surface. The infamous imBTC/Uniswap hack exploited this: when a transfer fires a hook, the attacker\'s contract can call back into the original contract before the transfer completes, draining funds. ERC-777 was quietly abandoned by most of DeFi for this reason.' },
            { type: 'text', title: 'Why ERC-1155 Won Instead', body: 'ERC-1155 addressed the multi-token use case more practically. ERC-777 never saw wide adoption in DeFi due to the reentrancy risk. It remains a cautionary tale: elegant APIs can introduce subtle security problems when deployed in adversarial environments with composable smart contracts.' },
            { type: 'summary', title: 'Lesson Complete! +20 XP', body: 'ERC-777 added transfer hooks and an operator model to fix ERC-20 limitations. However, its hooks created reentrancy vulnerabilities that led to real exploits. It serves as a lesson in the unintended consequences of callback-based designs.' },
          ],
        },
        {
          id: 'proposals_erc_adv_l2',
          title: 'ERC-1155: The Multi-Token Standard',
          slides: [
            { type: 'intro', title: 'One Contract, Many Token Types', body: 'Gaming and NFT projects often need dozens or hundreds of different token types: 1000 swords, 50 shields, 1 legendary axe. Before ERC-1155, you would deploy a separate ERC-20 or ERC-721 contract for each. ERC-1155 lets a single contract manage unlimited token types, fungible and non-fungible.' },
            { type: 'text', title: 'The Token ID Space', body: 'In ERC-1155, every token type is identified by an ID. ID 1 might be a fungible gold coin with supply 1,000,000. ID 2 might be a non-fungible legendary sword with supply 1. The same contract handles both. balanceOf(address, id) returns how many of token ID the address holds.' },
            { type: 'text', title: 'Batch Operations', body: 'ERC-1155\'s killer feature is batching. safeBatchTransferFrom lets you send multiple token types in a single transaction. Instead of 10 separate ERC-721 transfers (10 gas payments), one ERC-1155 batch transfer moves all 10 item types at once. This dramatically reduces gas costs for gaming and marketplace operations.' },
            { type: 'highlight', title: 'Real-World Adoption', body: 'OpenSea, the largest NFT marketplace, supports ERC-1155 natively. Enjin built their entire gaming ecosystem on it. Gods Unchained card game uses ERC-1155 for cards. The standard is especially dominant in gaming because game items naturally come in quantities (10 health potions) rather than unique 1-of-1 pieces.' },
            { type: 'text', title: 'Metadata URI Pattern', body: 'ERC-1155 uses a URI function that includes a substitution variable: uri(id) returns a URL with {id} replaced by the token ID. This single pattern handles metadata for unlimited token types. The JSON metadata format is standardized: name, description, image, properties. Opensea and most NFT tools read this format.' },
            { type: 'summary', title: 'Lesson Complete! +20 XP', body: 'ERC-1155 manages multiple token types (fungible and non-fungible) in one contract. Batch transfers save gas dramatically. It is the dominant standard in blockchain gaming and any use case requiring multiple item types.' },
          ],
        },
        {
          id: 'proposals_erc_adv_l3',
          title: 'ERC-2981: On-Chain Royalties',
          slides: [
            { type: 'intro', title: 'The Creator Royalty Problem', body: 'When an NFT is resold on a marketplace, should the original creator earn a percentage? Most NFT creators expected yes. But royalties were enforced at the marketplace level, not the protocol level. When new marketplaces emerged that waived royalties to attract sellers, creators had no recourse.' },
            { type: 'text', title: 'What ERC-2981 Does', body: 'ERC-2981 adds a standard royaltyInfo(tokenId, salePrice) function to NFT contracts. It returns the royalty recipient address and the royalty amount for a given sale price. Marketplaces that support ERC-2981 query this function and automatically route the royalty payment to the creator.' },
            { type: 'text', title: 'The Limits of a Standard', body: 'ERC-2981 is advisory: it tells marketplaces what the royalty should be, but cannot enforce payment. A marketplace that wants to attract sellers by waiving royalties simply does not call royaltyInfo. On-chain enforcement requires all sales to go through a royalty-enforcing contract, which limits liquidity.' },
            { type: 'highlight', title: 'The Royalty Wars', body: 'In 2022, Blur launched as a marketplace that waived royalties by default. To compete, OpenSea also made royalties optional. Creator royalties collapsed from a reliable income stream to an optional courtesy. This episode showed that protocol standards without enforcement mechanisms are only as good as voluntary adoption.' },
            { type: 'text', title: 'Operator Filter and Beyond', body: 'Some projects tried to enforce royalties by using operator filter registries: blocking sales on any marketplace that did not honor royalties. This created fragmentation and limited secondary market liquidity. The debate continues: royalties remain a contested space at the intersection of creator economics and market efficiency.' },
            { type: 'summary', title: 'Lesson Complete! +20 XP', body: 'ERC-2981 standardizes royalty info via royaltyInfo(). It cannot enforce payment but enables marketplaces to query and honor royalties. The "royalty wars" of 2022 demonstrated that voluntary standards break down under competitive pressure.' },
          ],
        },
        {
          id: 'proposals_erc_adv_l4',
          title: 'ERC-4626: Tokenized Vaults',
          slides: [
            { type: 'intro', title: 'The Yield Aggregator Problem', body: 'DeFi has dozens of yield-bearing protocols: Aave, Compound, Yearn, Convex, and hundreds more. Each one had its own custom interface for depositing assets and withdrawing the yield-bearing shares. Composing them together required custom integration code for every pair, creating massive developer overhead.' },
            { type: 'text', title: 'What ERC-4626 Defines', body: 'ERC-4626 is a standard for tokenized vaults: contracts that accept a base asset (like USDC), generate yield, and issue shares representing proportional ownership of the vault. It defines deposit(), withdraw(), mint(), redeem(), previewDeposit(), totalAssets(), and convertToShares() functions with a standard ABI.' },
            { type: 'text', title: 'Composability Unlocked', body: 'Because all ERC-4626 vaults share the same interface, a yield aggregator can route funds to any compliant vault without custom code. A lending protocol can accept ERC-4626 vault shares as collateral automatically. A risk dashboard can display APY across all compliant vaults with one integration. This is DeFi composability at the protocol layer.' },
            { type: 'highlight', title: 'Who Adopted It', body: 'Yearn Finance upgraded their yVaults to ERC-4626. Aave\'s wrapped aTokens are ERC-4626 compliant. Morpho and Euler built on it natively. Maker uses it for the DSR (DAI Savings Rate). The standard has become the lingua franca of yield vaults in DeFi, with billions of dollars flowing through compliant implementations.' },
            { type: 'text', title: 'Security Considerations', body: 'ERC-4626 vaults are susceptible to a first-depositor inflation attack: if the vault is empty, an attacker can donate a large amount of the base asset before the first real deposit, inflating the share price and stealing a portion of the depositor\'s funds. Implementations use virtual shares or minimum initial deposits as mitigations.' },
            { type: 'summary', title: 'Lesson Complete! +20 XP', body: 'ERC-4626 standardizes yield-bearing vaults with deposit/withdraw/share conversion functions. It enables seamless composability across DeFi protocols and has been adopted by Yearn, Aave, Maker, and many others.' },
          ],
        },
        {
          id: 'proposals_erc_adv_l5',
          title: 'ERC-6551: Token-Bound Accounts',
          slides: [
            { type: 'intro', title: 'NFTs That Own Things', body: 'Standard NFTs are owned by wallets. But what if an NFT could have its own wallet? What if your Bored Ape could own tokens, other NFTs, or even its own ENS domain? ERC-6551 makes this possible: every NFT gets a deterministic smart contract wallet bound to that specific token ID.' },
            { type: 'text', title: 'How It Works', body: 'ERC-6551 uses CREATE2 to deploy a Token Bound Account (TBA) at a deterministic address for any ERC-721 token. The address is computed from the registry address, the NFT contract address, the token ID, and a salt. Anyone can deploy it. The NFT\'s owner controls the TBA: only they can sign transactions from it.' },
            { type: 'text', title: 'Nested Ownership', body: 'Because TBAs are EIP-1271 compatible smart contract wallets, they can hold any Ethereum asset: ETH, ERC-20 tokens, other NFTs. An Ape can own a wardrobe of ERC-1155 wearables. A game character NFT can accumulate in-game items and currency over time. When you sell the NFT, you transfer everything it owns.' },
            { type: 'highlight', title: 'Identity and Provenance', body: 'TBAs enable NFT-based identity. A PFP (profile picture NFT) can accumulate transaction history, badges, and credentials in its own account. When you sell it, you sell the identity and its reputation. This opens entirely new design spaces: NFTs that evolve based on their history, not just their metadata.' },
            { type: 'text', title: 'Current Adoption and Challenges', body: 'ERC-6551 was adopted by projects like Sapienz, Parallel, and various gaming protocols. Challenges include: circular ownership (a TBA owning its own NFT could deadlock), smart contract wallet compatibility, and the need for ecosystem-wide support in wallets and marketplaces. The standard is still maturing.' },
            { type: 'summary', title: 'Lesson Complete! +20 XP', body: 'ERC-6551 gives every ERC-721 NFT a deterministic smart contract wallet. NFTs can own assets, accumulate history, and carry identity. Selling the NFT transfers its entire associated balance and provenance.' },
          ],
        },
      ],
      quiz: [
        { id: 'proposals_erc_adv_q1', question: 'Why did ERC-777 fail to gain wide DeFi adoption despite its elegant design?', options: ['It was too expensive to deploy', 'Its transfer hooks created reentrancy vulnerabilities that were exploited in real attacks', 'It was incompatible with MetaMask', 'Ethereum deprecated it in EIP-1559'], correct: 1, explanation: 'ERC-777\'s tokensToSend and tokensReceived hooks created reentrancy attack surfaces. The imBTC/Uniswap exploit demonstrated this in production. DeFi protocols largely avoided ERC-777 and it was quietly abandoned as a standard.' },
        { id: 'proposals_erc_adv_q2', question: 'What makes ERC-1155 more efficient for blockchain games than ERC-721?', options: ['ERC-1155 tokens have no gas cost', 'Batch transfers let you move multiple token types in one transaction, dramatically reducing gas', 'ERC-1155 tokens are stored off-chain', 'ERC-1155 has no supply limits per token type'], correct: 1, explanation: 'ERC-1155\'s safeBatchTransferFrom transfers multiple token IDs in a single transaction. Instead of 10 separate ERC-721 transfers, one batch call handles all. This can reduce gas costs by 80-90% for multi-item operations.' },
        { id: 'proposals_erc_adv_q3', question: 'What happened to creator royalties after Blur launched in 2022?', options: ['Royalties increased because of market competition', 'NFT royalties became mandatory by law', 'Royalties collapsed as marketplaces competed by waiving them, showing advisory standards break under competitive pressure', 'ERC-2981 was deprecated and replaced'], correct: 2, explanation: 'Blur offered zero-royalty trading to attract sellers. OpenSea matched to stay competitive. Creator royalties went from expected to optional. This demonstrated that ERC-2981\'s advisory standard cannot enforce payment without protocol-level mechanisms.' },
        { id: 'proposals_erc_adv_q4', question: 'What is ERC-4626 the standard for?', options: ['NFT marketplace royalties', 'Cross-chain token bridges', 'Tokenized yield vaults with standard deposit/withdraw/share conversion interfaces', 'Governance voting tokens'], correct: 2, explanation: 'ERC-4626 standardizes yield-bearing vault interfaces. Any DeFi protocol can integrate with any ERC-4626 compliant vault using the same deposit(), withdraw(), convertToShares(), and totalAssets() functions without custom code.' },
        { id: 'proposals_erc_adv_q5', question: 'What does ERC-6551 enable for NFTs?', options: ['NFTs that can be fractionalized automatically', 'Each NFT gets its own smart contract wallet that can hold assets and accumulate history', 'NFTs with on-chain royalty enforcement', 'Cross-chain NFT transfers without a bridge'], correct: 1, explanation: 'ERC-6551 Token Bound Accounts use CREATE2 to deploy a deterministic smart contract wallet for every ERC-721 token. The wallet\'s owner is whoever holds the NFT. NFTs can hold ETH, ERC-20 tokens, other NFTs, and on-chain credentials.' },
      ],
    },

    // MODULE 5: ADVANCED EIPS - PROTOCOL LAYER
    {
      id: 'proposals_eip_advanced',
      level: 'expert',
      title: 'Advanced EIPs: Protocol Layer',
      emoji: '⚡',
      description: 'EIP-2718 typed tx envelopes, EIP-2930 access lists, EIP-4844 proto-danksharding, EIP-7251 max effective balance, EIP-7702 EOA code execution.',
      color: '#4F46E5',
      lessons: [
        {
          id: 'proposals_eip_adv_l1',
          title: 'EIP-2718: Typed Transaction Envelope',
          slides: [
            { type: 'intro', title: 'The Problem with One Transaction Format', body: 'Before EIP-2718, Ethereum had one transaction type. Adding new features (like access lists or blob transactions) would require hacking that single format, adding optional fields with complex backward compatibility rules. EIP-2718 introduced a clean extensibility mechanism: typed transaction envelopes.' },
            { type: 'text', title: 'How Typed Transactions Work', body: 'EIP-2718 defines a new serialization format: a one-byte type prefix followed by the transaction payload. Type 0 (legacy) is the original format. Type 1 (EIP-2930) adds access lists. Type 2 (EIP-1559) adds maxFeePerGas and maxPriorityFeePerGas. Type 3 (EIP-4844) adds blob data. Each type has its own encoding and validation rules.' },
            { type: 'text', title: 'Why This Matters', body: 'Before EIP-2718, every Ethereum client had to handle the messy evolution of a single transaction format with ever-growing optional fields. With typed envelopes, each new transaction type is cleanly defined. Old clients can reject unknown types. New features are backward compatible. The ecosystem can evolve without accumulating technical debt.' },
            { type: 'highlight', title: 'The Foundation for L2 and EIP-4844', body: 'EIP-4844 blob transactions (proto-danksharding) are Type 3 transactions defined using the EIP-2718 framework. Without typed envelopes, adding blob data to transactions would have been far more complex. EIP-2718 is infrastructure: invisible to end users but critical to Ethereum\'s ability to evolve cleanly.' },
            { type: 'text', title: 'Adoption and Current State', body: 'All major Ethereum wallets and clients support multiple transaction types. MetaMask automatically selects Type 2 (EIP-1559) for most transactions. Blob transactions (Type 3) for L2 data posting became available with EIP-4844 in the Dencun upgrade (March 2024). Typed transactions are now the default Ethereum transaction model.' },
            { type: 'summary', title: 'Lesson Complete! +20 XP', body: 'EIP-2718 introduced typed transaction envelopes: a type byte prefix enabling clean extensibility. It is the foundation for EIP-2930, EIP-1559, and EIP-4844 blob transactions. Without it, Ethereum\'s transaction format would have become increasingly messy over time.' },
          ],
        },
        {
          id: 'proposals_eip_adv_l2',
          title: 'EIP-2930: Access Lists',
          slides: [
            { type: 'intro', title: 'The Berlin Hard Fork\'s EIP', body: 'EIP-2930 introduced Type 1 transactions with optional access lists. An access list is a declaration of which contract addresses and storage slots your transaction will read or write. This sounds bureaucratic, but it was a direct response to a gas repricing that broke existing DeFi contracts.' },
            { type: 'text', title: 'The SLOAD Gas Repricing Problem', body: 'EIP-2929 (activated with EIP-2930 in Berlin, April 2021) increased the gas cost of cold SLOAD (reading storage for the first time) from 800 to 2100. This broke some existing smart contracts that relied on the old gas costs for re-entrancy guards and gas estimation. EIP-2930 access lists were the mitigation.' },
            { type: 'text', title: 'How Access Lists Work', body: 'A Type 1 transaction includes a list of { address, storageKeys[] } pairs. Addresses and storage slots in the access list are pre-warmed: their first access costs 100 gas instead of 2100. You pay a flat fee of 2400 gas per address and 1900 per storage slot upfront at the start of the transaction, which is cheaper than the cold access cost.' },
            { type: 'highlight', title: 'Pre-warming for Efficiency', body: 'For contracts with predictable access patterns (like a DEX router that always reads a specific AMM\'s reserves), adding an access list can save significant gas. The savings are most pronounced in transactions touching many different contracts and storage slots. Off-chain tools can statically analyze transactions and automatically generate optimal access lists.' },
            { type: 'text', title: 'Current Relevance', body: 'With EIP-1559 Type 2 transactions now standard, EIP-2930 Type 1 sees less use. However, the access list concept carries forward: EIP-7702 (EOA code execution) and future EIPs reference access list patterns. The gas savings from pre-warming remain valid, and some MEV bots use access lists to optimize complex multi-call transactions.' },
            { type: 'summary', title: 'Lesson Complete! +20 XP', body: 'EIP-2930 Type 1 transactions include an access list pre-warming addresses and storage slots from 2100 to 100 gas per cold access. It was introduced alongside EIP-2929\'s SLOAD repricing as a mitigation for breaking changes.' },
          ],
        },
        {
          id: 'proposals_eip_adv_l3',
          title: 'EIP-4844: Proto-Danksharding and Blobs',
          slides: [
            { type: 'intro', title: 'The L2 Data Cost Problem', body: 'Ethereum Layer 2 rollups (Optimism, Arbitrum, zkSync) process transactions off-chain and post compressed transaction data to Ethereum as calldata. As L2 adoption grew, L2s were spending enormous amounts on calldata costs: Ethereum had no mechanism for cheap, temporary data availability. EIP-4844 changed this.' },
            { type: 'text', title: 'What Are Blobs?', body: 'EIP-4844 introduced a new transaction type (Type 3) with attached "blob sidecar" data. Each blob is 128 KB of binary data. Blobs are NOT stored by the EVM: they are not accessible to smart contracts. They are stored by consensus layer nodes and pruned after a target of 18 days. Blobs have their own fee market separate from regular gas.' },
            { type: 'text', title: 'Why This Matters for L2s', body: 'L2s that previously posted 100 KB of data as EVM calldata at 16 gas/byte (expensive, stored forever) can now use blobs at a fraction of the cost. Blobs are temporarily available for fraud provers (optimistic rollups) or ZK verifiers to check. After the retention period they are pruned, keeping the Ethereum state manageable.' },
            { type: 'highlight', title: 'The Dencun Upgrade Impact', body: 'EIP-4844 activated in the Dencun upgrade on March 13, 2024. Within days, L2 transaction fees dropped 90%+ on Arbitrum, Optimism, Base, and zkSync. Blob fees were nearly zero for months. The cost of posting data to Ethereum plummeted, making L2s dramatically cheaper to use and validating the rollup-centric roadmap.' },
            { type: 'text', title: 'The Path to Full Danksharding', body: 'Proto-danksharding (EIP-4844) is the first step. Full danksharding will expand blob capacity from 3-6 blobs per block to hundreds, using Data Availability Sampling (DAS): nodes only need to download small random samples to verify data availability, not the full blob. This allows validators to verify availability with minimal bandwidth, supporting a vastly more scalable L2 ecosystem.' },
            { type: 'summary', title: 'Lesson Complete! +20 XP', body: 'EIP-4844 introduced Type 3 blob transactions: 128 KB data packets stored by consensus nodes and pruned after ~18 days. L2 data posting costs dropped 90%+ after Dencun (March 2024). Full danksharding will scale this further with DAS.' },
          ],
        },
        {
          id: 'proposals_eip_adv_l4',
          title: 'EIP-7251: Max Effective Balance',
          slides: [
            { type: 'intro', title: 'The 32 ETH Cap Problem', body: 'Ethereum\'s proof-of-stake design caps each validator\'s "effective balance" at 32 ETH. A large staking operation holding 3,200 ETH must run 100 separate validators. This creates massive overhead: 100 BLS keys to manage, 100 validator processes to run, and 100 separate attestations to broadcast per epoch. The network drowns in validator messages.' },
            { type: 'text', title: 'What EIP-7251 Proposes', body: 'EIP-7251 raises the maximum effective balance (MaxEB) from 32 ETH to 2,048 ETH per validator. Large stakers can consolidate: instead of 64 validators of 32 ETH each, one validator holds 2,048 ETH. The staking reward scales with balance up to the new cap. Small stakers below 32 ETH can also earn on partial balances.' },
            { type: 'text', title: 'Network Efficiency Gains', body: 'Ethereum currently has over 1 million active validators. This is far more than the protocol needs for security and creates significant overhead in the consensus layer: attestation aggregation, sync committees, and peer-to-peer message passing all scale with validator count. EIP-7251 would let the validator set shrink without reducing total staked ETH.' },
            { type: 'highlight', title: 'Security Considerations', body: 'Critics worry that allowing large consolidated validators reduces decentralization pressure. With 32 ETH cap, large stakers are forced to run many distributed nodes. With 2,048 ETH cap, they can consolidate into fewer nodes. However, proponents argue the current validator bloat is reducing performance and the real security comes from stake distribution, not validator count.' },
            { type: 'text', title: 'Status and Timeline', body: 'EIP-7251 is targeted for the Electra hard fork (part of the Prague/Electra upgrade, expected in 2025). It is one of several consensus layer improvements aimed at reducing validator set overhead while maintaining Ethereum\'s security guarantees. Paired with EIP-7002 (execution layer exits), it will significantly simplify large staking operations.' },
            { type: 'summary', title: 'Lesson Complete! +20 XP', body: 'EIP-7251 raises the validator effective balance cap from 32 ETH to 2,048 ETH. Large stakers consolidate validators, reducing protocol overhead. The validator set can shrink significantly without reducing total staked ETH or security.' },
          ],
        },
        {
          id: 'proposals_eip_adv_l5',
          title: 'EIP-7702: EOA Code Execution',
          slides: [
            { type: 'intro', title: 'The Last Piece of Account Abstraction', body: 'ERC-4337 gave us smart contract wallets with great UX, but there was a problem: existing EOA (externally owned account) users could not upgrade to smart contract wallets without migrating their addresses and losing their transaction history, ENS names, and airdrop eligibility. EIP-7702 solves this.' },
            { type: 'text', title: 'What EIP-7702 Does', body: 'EIP-7702 lets an EOA temporarily delegate its execution to a smart contract for the duration of one transaction. The EOA signs an authorization specifying a contract address. During that transaction, calls to the EOA execute the target contract\'s code. After the transaction, the EOA returns to normal. No permanent migration required.' },
            { type: 'text', title: 'Batch Transactions for EOAs', body: 'The most immediately useful application: batch transactions. Currently, to do a swap on a DEX you need two transactions: approve() then swap(). With EIP-7702, an EOA can batch both calls into a single transaction using a smart wallet contract. This eliminates the UX friction of multi-step DeFi interactions for existing wallet users.' },
            { type: 'highlight', title: 'Gasless Transactions for EOAs', body: 'EIP-7702 also enables paymasters for EOAs: the delegated contract can implement gas sponsorship. A dApp can pay gas on behalf of the user without requiring the user to hold ETH. Combined with ERC-4337\'s paymaster infrastructure, this brings gasless UX to the billions of users with existing EOA wallets.' },
            { type: 'text', title: 'EIP-7702 vs ERC-4337', body: 'ERC-4337 creates new smart contract wallets. EIP-7702 upgrades existing EOAs. They complement each other: ERC-4337 is the long-term destination for new users, EIP-7702 is the migration path for existing users. EIP-7702 was proposed by Vitalik Buterin and is targeted for inclusion in the Prague/Electra upgrade.' },
            { type: 'summary', title: 'Lesson Complete! +20 XP', body: 'EIP-7702 lets EOAs temporarily delegate to smart contract code within a single transaction. It enables batch transactions, gasless UX, and smart wallet features for existing Ethereum addresses without permanent migration.' },
          ],
        },
      ],
      quiz: [
        { id: 'proposals_eip_adv_q1', question: 'What is the primary purpose of EIP-2718 typed transaction envelopes?', options: ['To reduce gas fees for all transactions', 'To add a type prefix enabling clean extensibility of the transaction format without breaking changes', 'To encrypt transaction data for privacy', 'To speed up transaction confirmation times'], correct: 1, explanation: 'EIP-2718 introduces a one-byte type prefix that allows each new transaction type (EIP-1559, EIP-2930, EIP-4844 blobs) to define its own encoding. This replaces the old approach of cramming new features into one bloated transaction format.' },
        { id: 'proposals_eip_adv_q2', question: 'What was the effect of EIP-4844 on Layer 2 transaction fees?', options: ['It doubled L2 fees due to new blob costs', 'L2 fees dropped 90%+ as blob data posting replaced expensive calldata', 'EIP-4844 had no effect on L2 fees', 'L2 fees increased initially then gradually decreased'], correct: 1, explanation: 'After Dencun activated EIP-4844 on March 13, 2024, Arbitrum, Optimism, Base, and zkSync fees dropped 90%+ almost immediately. Blob data is far cheaper than EVM calldata and is pruned after ~18 days, not stored forever in state.' },
        { id: 'proposals_eip_adv_q3', question: 'Why does EIP-7251 propose raising the max effective balance from 32 to 2,048 ETH?', options: ['To reduce staking rewards for large validators', 'To allow large stakers to consolidate validators, reducing the bloated validator set and network message overhead', 'To make ETH more deflationary', 'To increase the minimum staking requirement for small stakers'], correct: 1, explanation: 'With 1M+ validators, Ethereum\'s consensus layer processes enormous attestation traffic. EIP-7251 lets large stakers run fewer validators with higher balances, shrinking the validator set without reducing total staked ETH or security.' },
        { id: 'proposals_eip_adv_q4', question: 'What does EIP-7702 enable for existing EOA wallets?', options: ['Permanent conversion to a smart contract wallet', 'Temporary delegation to smart contract code within a single transaction, enabling batching and gasless UX', 'Cross-chain signing with one key', 'Hidden transaction amounts like ZK proofs'], correct: 1, explanation: 'EIP-7702 allows an EOA to sign an authorization delegating execution to a contract for one transaction. After that transaction, the EOA reverts to normal. No permanent migration. This enables batch transactions and paymaster gas sponsorship for existing wallets.' },
        { id: 'proposals_eip_adv_q5', question: 'What are EIP-4844 blobs, and where is their data stored?', options: ['Blob = EVM opcodes stored permanently in Ethereum state', 'Blob = 128 KB data packets stored by consensus nodes and pruned after ~18 days, not accessible to smart contracts', 'Blob = compressed calldata stored in the transaction receipt', 'Blob = off-chain data stored on IPFS with on-chain hash'], correct: 1, explanation: 'Blobs are 128 KB binary data packets attached to Type 3 transactions. They are stored by consensus layer nodes (not execution layer) and pruned after a target of 18 days. Smart contracts cannot read blob data; it is for L2 data availability only.' },
      ],
    },

    // MODULE 6: CROSS-CHAIN STANDARDS
    {
      id: 'proposals_crosschain',
      level: 'expert',
      title: 'Cross-Chain Standards',
      emoji: '🌉',
      description: 'ICS-20 IBC token transfers, CCIP overview, AIP-1 Arbitrum improvement proposals, OIP Optimism improvement proposals, and CAIP-2 chain ID standards.',
      color: '#0891B2',
      lessons: [
        {
          id: 'proposals_cc_l1',
          title: 'ICS-20: IBC Token Transfers',
          slides: [
            { type: 'intro', title: 'The Cosmos Interoperability Standard', body: 'The Inter-Blockchain Communication protocol (IBC) is Cosmos\'s native interoperability framework. It lets independent sovereign blockchains communicate with cryptographic guarantees. ICS-20 is the specific IBC standard for fungible token transfers between chains. It is the backbone of the Cosmos ecosystem\'s cross-chain liquidity.' },
            { type: 'text', title: 'How IBC Works', body: 'IBC uses light client proofs. Chain A maintains a light client of Chain B (tracking its block headers). When you send tokens from A to B, you create a packet on A and submit a proof on B that the packet exists. B verifies the proof against its light client of A, then releases tokens. No trusted bridge operator: the security is cryptographic.' },
            { type: 'text', title: 'The Escrow and Mint Model', body: 'ICS-20 uses a lock-and-mint model. When you send ATOM from the Cosmos Hub to Osmosis, the ATOM is locked in an escrow account on the Cosmos Hub. Osmosis mints a voucher (IBC/xxxx ATOM). When you send it back, the voucher is burned and the original ATOM is released from escrow. Token denominations include the transfer path.' },
            { type: 'highlight', title: 'Channel and Port Abstraction', body: 'IBC packets travel over channels, which are established between ports on two chains. Token transfers use the standard transfer port. Each channel has a unique ID: channel-0 might connect Cosmos Hub to Osmosis, channel-1 to Juno. IBC tokens carry their full path in their denomination: ibc/[hash of port/channel/denom].' },
            { type: 'text', title: 'Security Model vs Bridges', body: 'IBC\'s light-client-based security means there is no external validator set that can be compromised. The security of a transfer equals the security of both connected chains. This contrasts with most Ethereum bridges (LayerZero, Wormhole, Multichain), which rely on external validator sets that have been repeatedly hacked.' },
            { type: 'summary', title: 'Lesson Complete! +20 XP', body: 'ICS-20 enables IBC token transfers using light-client proofs, not trusted validators. Tokens are locked on the source chain and vouchers minted on the destination. Security derives from cryptographic proofs rather than external validator sets.' },
          ],
        },
        {
          id: 'proposals_cc_l2',
          title: 'CCIP: Chainlink Cross-Chain Interoperability Protocol',
          slides: [
            { type: 'intro', title: 'Chainlink\'s Interop Layer', body: 'Chainlink Cross-Chain Interoperability Protocol (CCIP) is a general-purpose messaging and token transfer protocol built by Chainlink Labs. Unlike IBC (Cosmos-native), CCIP targets EVM-compatible chains and uses Chainlink\'s Decentralized Oracle Network (DON) as the validation layer for cross-chain messages.' },
            { type: 'text', title: 'Architecture: The Risk Management Network', body: 'CCIP has two validation layers. The Primary DON relays messages between chains. An independent Risk Management Network (RMN) monitors the Primary DON and can independently verify messages. If the Primary DON and RMN disagree, the transaction is blocked. This redundancy is designed to prevent catastrophic bridge failures.' },
            { type: 'text', title: 'Programmable Token Transfers', body: 'CCIP\'s key feature: programmable token transfers. You can send tokens AND a message in one atomic operation. The receiving contract gets the tokens and immediately executes the accompanying message. This enables cross-chain DeFi flows: borrow on Aave, bridge to another chain, and supply to another protocol in a single user-signed transaction.' },
            { type: 'highlight', title: 'Major Adopters', body: 'Swift (SWIFT banking network) used CCIP to connect 12 global banks in a cross-chain settlement pilot. Circle\'s CCTP (Cross-Chain Transfer Protocol) for native USDC minting integrates with CCIP on some routes. Synthetix, Aave, and several major protocols have integrated CCIP for cross-chain operations, giving it significant DeFi footprint.' },
            { type: 'text', title: 'CCIP vs IBC Security Model', body: 'CCIP relies on Chainlink\'s oracle network security. If the DON misbehaves, funds can be at risk (mitigated by the RMN). IBC relies on light clients of connected chains, which is cryptographically stronger but requires both chains to maintain light clients of each other. CCIP is more flexible (any EVM chain) but has a trust assumption around Chainlink\'s DON.' },
            { type: 'summary', title: 'Lesson Complete! +20 XP', body: 'CCIP is Chainlink\'s cross-chain protocol using DON validation with a Risk Management Network for redundancy. Programmable token transfers enable cross-chain DeFi flows in single transactions. Adopted by SWIFT, Circle CCTP, and major DeFi protocols.' },
          ],
        },
        {
          id: 'proposals_cc_l3',
          title: 'AIP-1: Arbitrum Improvement Proposals',
          slides: [
            { type: 'intro', title: 'L2 Governance via AIPs', body: 'Arbitrum launched its governance token ARB in March 2023 and established the Arbitrum DAO. AIP-1 was the first (and most contentious) governance proposal: it proposed to fund the Arbitrum Foundation with 750 million ARB tokens from the DAO treasury. The controversy around it revealed the challenges of L2 governance.' },
            { type: 'text', title: 'What AIP-1 Proposed', body: 'AIP-1 (called the "Foundation Budget" proposal) asked the DAO to ratify an already-executed transfer of 750M ARB tokens to the Arbitrum Foundation. The problem: the Foundation had already transferred the tokens before the DAO voted. The community erupted, calling it a governance theater situation where the vote was presented as a formality after the fact.' },
            { type: 'text', title: 'The DAO\'s Response', body: 'AIP-1 failed in its original form. The Arbitrum Foundation revised the proposal into AIP-1.1 and AIP-1.2, providing more transparency and breaking it into smaller pieces. This was a landmark moment showing that decentralized governance can push back even on decisions made by the founding team, if token holders organize.' },
            { type: 'highlight', title: 'The AIP Process Today', body: 'The Arbitrum AIP process evolved significantly after the AIP-1 controversy. Today it requires community forum discussion, a temperature check Snapshot vote, an on-chain Tally vote with a 5% quorum requirement, and a 3-day timelock before execution. The process is more structured and the Foundation has less unilateral authority.' },
            { type: 'text', title: 'ARB Treasury and Grant Programs', body: 'The Arbitrum DAO controls one of the largest L2 treasuries in crypto: over 3 billion ARB as of 2025. It has funded grant programs (LTIPP, STIP), funded research, and negotiated deals with DeFi protocols. AIPs continue to be used for treasury allocations, protocol upgrades, and strategic decisions about the Arbitrum ecosystem.' },
            { type: 'summary', title: 'Lesson Complete! +20 XP', body: 'AIP-1 was controversial because the Arbitrum Foundation transferred treasury funds before the DAO voted. The community\'s pushback forced revision and led to a more robust AIP process. The Arbitrum DAO now controls a multi-billion dollar treasury.' },
          ],
        },
        {
          id: 'proposals_cc_l4',
          title: 'OIP: Optimism Governance and the Collective',
          slides: [
            { type: 'intro', title: 'The Optimism Collective', body: 'Optimism has one of the most sophisticated governance structures in crypto: the Optimism Collective. It uses a bicameral system with two houses: the Token House (OP token holders, one vote per token) and the Citizen House (non-transferable soul-bound "Citizenship" NFT holders, one vote per person). Different proposal types require different house approval.' },
            { type: 'text', title: 'Optimism Improvement Proposals (OIPs)', body: 'OIPs govern changes to the OP Stack, treasury allocations, token model changes, and major strategic decisions. The Token House handles most OIPs. The Citizen House focuses specifically on Retroactive Public Goods Funding (RetroPGF): distributing OP tokens to projects that have provided value to the Optimism ecosystem after the fact.' },
            { type: 'text', title: 'RetroPGF: Funding What Already Works', body: 'RetroPGF is Optimism\'s radical experiment: instead of predicting which projects will be valuable (grants), reward projects that have already proven their value (retroactive). The Citizen House votes on which public goods created value. Millions of OP tokens have been distributed across four rounds of RetroPGF, funding open source tools, documentation, developer education, and infrastructure.' },
            { type: 'highlight', title: 'The Superchain and Governance Scaling', body: 'The OP Stack is being adopted by Coinbase (Base), Binance (opBNB), and dozens of other chains as the "Superchain." Each Superchain member contributes a percentage of transaction fees to the Optimism Collective. As the Superchain grows, the Collective\'s treasury and governance scope expand. The OIP process governs how this shared infrastructure evolves.' },
            { type: 'text', title: 'Governance Failures and Lessons', body: 'Optimism has experienced governance controversies: low voter participation in Token House votes, disputes over RetroPGF vote secrecy, and debates over whether large OP holders dominate Token House decisions. These are fundamental challenges in tokenized governance. The Citizen House was partly designed as a check on plutocracy, but balancing the two houses remains an ongoing experiment.' },
            { type: 'summary', title: 'Lesson Complete! +20 XP', body: 'Optimism\'s bicameral governance (Token House + Citizen House) separates financial votes from public-goods funding. RetroPGF retroactively rewards proven value. The Superchain extends this governance to multiple L2 chains sharing the OP Stack.' },
          ],
        },
        {
          id: 'proposals_cc_l5',
          title: 'CAIP-2: Chain Agnostic Chain ID Standard',
          slides: [
            { type: 'intro', title: 'The Chain Identification Problem', body: 'When you have hundreds of blockchains (Ethereum mainnet, Polygon, Arbitrum, Solana, Cosmos Hub, Bitcoin...), how do you uniquely and unambiguously identify each one in a software system? Ethereum has chain IDs (e.g., 1 for mainnet, 137 for Polygon), but Solana has cluster names, Cosmos chains have their own identifiers. There is no universal standard. CAIP-2 fixes this.' },
            { type: 'text', title: 'The CAIP-2 Format', body: 'CAIP-2 (Chain Agnostic Improvement Proposal 2) defines a universal chain identifier format: namespace:reference. The namespace identifies the chain type (eip155 for EVM chains, solana for Solana, cosmos for Cosmos). The reference is the chain-specific identifier. Examples: eip155:1 (Ethereum mainnet), eip155:137 (Polygon), solana:4sGjMW1 (Solana mainnet), cosmos:cosmoshub-4 (Cosmos Hub).' },
            { type: 'text', title: 'Why It Matters for Wallets', body: 'A multi-chain wallet needs to know which chain a dApp is talking about. Without CAIP-2, every wallet integrator has to handle different ID formats per blockchain. With CAIP-2, a single WalletConnect session can specify any chain: the wallet knows if the dApp means Ethereum or Polygon or Solana by parsing the namespace. WalletConnect v2 uses CAIP-2 natively.' },
            { type: 'highlight', title: 'CAIP Family: Accounts and Assets', body: 'CAIP-2 is part of a family of chain-agnostic standards. CAIP-10 defines account addresses (eip155:1:0x1234... identifies an Ethereum mainnet address). CAIP-19 identifies assets (eip155:1/erc20:0xA0b8... identifies an ERC-20 on mainnet). Together they form a universal addressing scheme for cross-chain applications.' },
            { type: 'text', title: 'Adoption and Use Cases', body: 'WalletConnect, MetaMask, Ledger, and most major wallets reference CAIP standards internally. NFT indexers use CAIP-19 to identify cross-chain NFTs unambiguously. Cross-chain messaging protocols like CCIP use similar namespace patterns. As crypto becomes increasingly multi-chain, CAIP standards are becoming foundational infrastructure for developer tooling.' },
            { type: 'summary', title: 'Lesson Complete! +20 XP', body: 'CAIP-2 defines a universal chain identifier: namespace:reference (e.g., eip155:1 for Ethereum). The CAIP family (2, 10, 19) provides universal addressing for chains, accounts, and assets. WalletConnect v2 and major wallets use CAIP standards natively.' },
          ],
        },
      ],
      quiz: [
        { id: 'proposals_cc_q1', question: 'What is the security model of IBC (ICS-20) compared to most Ethereum bridges?', options: ['IBC uses a trusted validator set like most Ethereum bridges', 'IBC uses light-client cryptographic proofs; security equals the security of both connected chains with no external validator set', 'IBC uses zero-knowledge proofs for all transfers', 'IBC relies on Chainlink oracles for cross-chain verification'], correct: 1, explanation: 'IBC verifies cross-chain messages using light clients: Chain B maintains a light client of Chain A and verifies packet proofs against it cryptographically. This eliminates the external validator trust assumption that has led to repeated hacks of EVM bridges (Wormhole, Ronin, Multichain).' },
        { id: 'proposals_cc_q2', question: 'What made AIP-1 (Arbitrum\'s first governance proposal) controversial?', options: ['It tried to remove ARB token voting rights', 'The Arbitrum Foundation transferred 750M ARB tokens to itself before the DAO voted, making the vote a formality', 'It proposed merging Arbitrum with Optimism', 'It tried to change the ARB token supply'], correct: 1, explanation: 'AIP-1 asked token holders to retroactively ratify a transfer that had already occurred. The community saw this as governance theater. The backlash forced the Foundation to revise into AIP-1.1 and AIP-1.2 with more transparency and genuine community input.' },
        { id: 'proposals_cc_q3', question: 'What is Optimism\'s Retroactive Public Goods Funding (RetroPGF)?', options: ['A system that predicts and pre-funds promising projects', 'A retroactive reward system where the Citizen House distributes OP to projects that have already proven their value', 'A token buyback program using sequencer fees', 'A grants program for developers building on OP Stack'], correct: 1, explanation: 'RetroPGF is Optimism\'s experiment in impact-based funding. Instead of guessing which projects will be valuable (forward-looking grants), the Citizen House distributes OP tokens after the fact to projects that demonstrably created value for the Optimism ecosystem.' },
        { id: 'proposals_cc_q4', question: 'What does the CAIP-2 identifier eip155:137 represent?', options: ['Ethereum mainnet (chain ID 1)', 'Polygon PoS (chain ID 137) using the EIP-155 namespace', 'A Solana cluster', 'A Cosmos Hub validator address'], correct: 1, explanation: 'CAIP-2 format is namespace:reference. "eip155" is the namespace for EVM chains (following EIP-155 chain ID standard). "137" is Polygon\'s chain ID. So eip155:137 = Polygon PoS mainnet. eip155:1 = Ethereum mainnet.' },
        { id: 'proposals_cc_q5', question: 'What is CCIP\'s Risk Management Network (RMN)?', options: ['A committee that approves large cross-chain transfers manually', 'An independent second validation layer that can block transactions if it disagrees with the Primary DON', 'A Chainlink token staking contract that covers bridge losses', 'A legal framework for cross-chain dispute resolution'], correct: 1, explanation: 'The RMN is a separate validator network that independently verifies messages relayed by the Primary DON. If the RMN disagrees with the Primary DON\'s relay, the transaction is blocked. This redundancy is designed to prevent catastrophic failures like Ronin or Wormhole hacks.' },
      ],
    },

    // MODULE 7: THE FOUNDATIONAL TOKEN STANDARDS
    {
      id: 'proposals_eip_foundational',
      level: 'beginner',
      title: 'The Foundational Token Standards',
      emoji: '🧱',
      description: 'ERC-20, ERC-721, ERC-1155, ERC-4626, and ERC-777: the interfaces that decide what a token even is on Ethereum.',
      color: '#10B981',
      lessons: [
        {
          id: 'proposals_found_l1',
          title: 'ERC-20: The Six Functions That Power Every Altcoin',
          slides: [
            { type: 'intro', title: 'A Token Is Just a Spreadsheet', body: 'Strip away the hype and a token is a mapping of addresses to balances, plus a few rules for moving numbers between rows. ERC-20, proposed by Fabian Vogelsteller in 2015, decided exactly what that mapping and those rules should look like so every wallet and exchange could read it the same way.' },
            { type: 'text', title: 'The Six Functions', body: 'totalSupply tells you how many tokens exist. balanceOf tells you what one address holds. transfer moves tokens directly. approve and allowance set up permission for a third party to spend on your behalf. transferFrom is how that third party actually pulls the funds. Six functions, and that is the entire contract every exchange needs to support a new coin.' },
            { type: 'text', title: 'Why One Standard Beats a Thousand Custom Contracts', body: 'Imagine if every bank used a different file format for account balances. That was Ethereum before ERC-20. Once every token spoke the same six-function language, Uniswap could list any of them without custom code, MetaMask could display any of them without a special integration, and Compound could accept any of them as collateral. USDC, UNI, LINK, and thousands of others are all just implementations of this one interface.' },
            { type: 'highlight', title: 'Decimals: The Detail Everyone Forgets', body: 'Solidity has no concept of decimal numbers, so ERC-20 tokens store balances as whole integers and a separate decimals() function tells wallets where to put the decimal point. 1 USDC is actually stored as 1,000,000 (6 decimals). 1 DAI is stored as 1 followed by 18 zeros. Get this wrong in your own contract and you will mint a billion times too many tokens by accident, a mistake that has genuinely happened.' },
            { type: 'summary', title: 'Lesson Complete! +20 XP', body: 'ERC-20 defines six functions: totalSupply, balanceOf, transfer, approve, allowance, and transferFrom. That shared interface is the reason any wallet or exchange can support any token without custom integration work, and it remains the single most used standard in all of crypto.' },
          ],
        },
        {
          id: 'proposals_found_l2',
          title: 'ERC-721: When Token #4220 Is Not the Same as Token #4221',
          slides: [
            { type: 'intro', title: 'Fungible Means Interchangeable', body: 'Any USDC is identical to any other USDC. That is what "fungible" means, and it is exactly what ERC-20 was built for. But a concert ticket for seat 14B is not interchangeable with seat 14C, and a Bored Ape with blue fur is not interchangeable with one with red fur. ERC-721, finalized in January 2018, gave Ethereum a way to represent things that are unique.' },
            { type: 'text', title: 'One Owner, One ID, One Truth', body: 'Every ERC-721 token has a tokenId, and the contract maps each tokenId to exactly one owner address. ownerOf(4220) returns who holds that specific item. There is no quantity, no decimals, no splitting it in half. You either own token 4220 or you do not, and the blockchain is the single source of truth for who does.' },
            { type: 'text', title: 'tokenURI Is Where the Magic Lives', body: 'The contract itself usually stores nothing more than an owner mapping and a number. tokenURI(tokenId) is what returns a link, typically to a JSON file on IPFS, describing the image, name, and traits. That separation is intentional: the chain guarantees ownership, while the metadata describes what the thing actually is. This is also why "rug pulls" sometimes happen by swapping the metadata after mint.' },
            { type: 'highlight', title: 'Far Beyond Profile Pictures', body: 'CryptoPunks predated the standard and helped inspire it. But ERC-721 quietly runs ENS domain names, event tickets that cannot be counterfeited, in-game items with provable scarcity, and fractional real estate deeds. Anywhere "this one specific thing belongs to this one specific person" matters, ERC-721 is candidate infrastructure.' },
            { type: 'summary', title: 'Lesson Complete! +20 XP', body: 'ERC-721 gives every token a unique ID mapped to exactly one owner, with tokenURI pointing to off-chain metadata. It is the foundation for NFT art, domain names, tickets, and any asset where uniqueness, not interchangeability, is the point.' },
          ],
        },
        {
          id: 'proposals_found_l3',
          title: 'ERC-1155: The Inventory System Ethereum Was Missing',
          slides: [
            { type: 'intro', title: 'A Video Game Has Hundreds of Item Types', body: 'A single RPG might have 50 sword variants, 200 potion types, and one legendary cape with only one copy in existence. Deploying a separate ERC-20 or ERC-721 contract for each would be absurd. ERC-1155, championed by the Enjin team, lets one contract hold an unlimited number of token types, fungible and non-fungible side by side.' },
            { type: 'text', title: 'IDs as a Filing Cabinet', body: 'In ERC-1155, balanceOf takes both an address and an id. ID 1 could be gold coins with a supply in the millions. ID 2 could be a one-of-one legendary cape. Same contract, same interface, completely different scarcity profiles. You query balanceOf(player, 1) for coins and balanceOf(player, 2) for the cape, and the contract handles both identically under the hood.' },
            { type: 'text', title: 'Batching Is the Real Innovation', body: 'safeBatchTransferFrom moves multiple token types in a single transaction. Sending 10 different item types used to mean 10 separate ERC-721 transfers and 10 separate gas bills. ERC-1155 collapses that into one call and one gas payment, which is the difference between a game being financially viable on-chain and not.' },
            { type: 'highlight', title: 'Why Gaming and Marketplaces Converged On It', body: 'OpenSea supports ERC-1155 natively, Enjin built an entire ecosystem on it, and Gods Unchained issues its cards through it. The pattern fits naturally: games deal in quantities (10 health potions, 3 keys) far more often than 1-of-1 art pieces, and ERC-1155 is built for exactly that shape of data.' },
            { type: 'summary', title: 'Lesson Complete! +20 XP', body: 'ERC-1155 manages unlimited token types, fungible and non-fungible, in a single contract, and its batch transfers cut gas costs dramatically for multi-item operations. It is the standard of choice for blockchain gaming and any marketplace dealing in item quantities.' },
          ],
        },
        {
          id: 'proposals_found_l4',
          title: 'ERC-4626: One Interface for Every Yield Vault in DeFi',
          slides: [
            { type: 'intro', title: 'Every Vault Used to Speak Its Own Dialect', body: 'Aave, Compound, Yearn, and Convex all let you deposit an asset and earn yield, but for years each had its own custom deposit and withdraw functions. Integrating with five vaults meant writing five different adapters. ERC-4626, finalized in 2022, fixed this by standardizing what a "vault" even looks like on-chain.' },
            { type: 'text', title: 'Shares, Not IOUs', body: 'You deposit a base asset, like USDC, and the vault mints you shares representing your proportional claim on everything the vault holds, including the yield it has generated. deposit(), withdraw(), mint(), redeem(), totalAssets(), and convertToShares() form a standard ABI: the same six functions whether the vault is a lending pool, a staking wrapper, or a complex yield strategy.' },
            { type: 'text', title: 'Composability Without Custom Code', body: 'Because every compliant vault shares the same interface, a lending protocol can accept any ERC-4626 vault token as collateral automatically, a dashboard can display the APY of any compliant vault with one integration, and an aggregator can route funds wherever yield is highest without writing protocol-specific logic. Yearn\'s yVaults, Aave\'s wrapped aTokens, and Maker\'s DSR all run on this standard now.' },
            { type: 'highlight', title: 'The First-Depositor Trap', body: 'A subtle attack exists: if a vault is brand new and empty, an attacker can donate a large amount of the underlying asset directly to the contract before anyone else deposits, artificially inflating the share price and stealing a slice of the next depositor\'s funds through rounding. Modern implementations defend against this with virtual shares or a minimum seed deposit.' },
            { type: 'summary', title: 'Lesson Complete! +25 XP', body: 'ERC-4626 standardizes yield-bearing vaults around deposit, withdraw, and share conversion functions. It turned DeFi composability up a notch by letting any protocol plug into any compliant vault without custom integration, though implementations must guard against first-depositor inflation attacks.' },
          ],
        },
        {
          id: 'proposals_found_l5',
          title: 'ERC-777: The Standard With Hooks That Got Too Clever',
          slides: [
            { type: 'intro', title: 'Solving ERC-20\'s Stuck Token Problem', body: 'Send an ERC-20 token straight to a contract address that was not built to expect it, and those tokens are usually gone forever: there is no way for the receiving contract to even know it got paid. ERC-777 set out to fix this with callbacks that fire automatically whenever tokens move.' },
            { type: 'text', title: 'tokensToSend and tokensReceived', body: 'Before a transfer completes, ERC-777 calls the sender\'s tokensToSend hook if one is registered. The moment tokens land, it calls the recipient\'s tokensReceived hook. Contracts can now react to incoming tokens instantly: a DEX could auto-execute a swap the moment funds arrive, instead of requiring a separate approve-then-call sequence.' },
            { type: 'text', title: 'Operators: A Cleaner approve/transferFrom', body: 'ERC-777 also replaced ERC-20\'s clunky two-step approval pattern with operators, addresses authorized to move tokens on a holder\'s behalf, set globally or per-address. It read as a genuine upgrade on paper: fewer transactions, more expressive permissions, automatic notifications.' },
            { type: 'highlight', title: 'The Hook That Opened the Door to Reentrancy', body: 'Hooks hand control back to an external contract mid-transfer, and that is precisely the pattern reentrancy attacks exploit. The imBTC and Uniswap incident showed this in production: an attacker\'s contract used the tokensReceived callback to call back into the pool before the original transfer had finished updating its accounting, draining funds in the process.' },
            { type: 'text', title: 'A Standard That Taught the Industry a Lesson', body: 'Most of DeFi quietly stopped integrating ERC-777 after that. ERC-1155 absorbed the multi-token use case, and careful design patterns, like checks-effects-interactions and reentrancy guards, became the more trusted defense. ERC-777 is still technically live, but it stands today mainly as a cautionary tale about what callbacks can cost in an adversarial, fully composable environment.' },
            { type: 'summary', title: 'Lesson Complete! +20 XP', body: 'ERC-777 added transfer hooks and an operator model to fix ERC-20\'s stuck-token problem, but those same hooks opened a reentrancy attack surface that was exploited in the imBTC/Uniswap incident. DeFi largely moved on, and the standard remains a lesson in unintended consequences.' },
          ],
        },
      ],
      quiz: [
        { id: 'proposals_found_q1', question: 'Which six functions does ERC-20 require a token contract to implement?', options: ['mint, burn, pause, freeze, lock, unlock', 'totalSupply, balanceOf, transfer, transferFrom, approve, allowance', 'create, read, update, delete, list, search', 'deposit, withdraw, stake, unstake, claim, compound'], correct: 1, explanation: 'These six functions form the entire ERC-20 interface. Together they let any wallet or exchange query balances, move tokens directly, and grant third-party spending permission, all without custom integration per token.' },
        { id: 'proposals_found_q2', question: 'In ERC-721, what does tokenURI(tokenId) actually return?', options: ['The current market price of the token', 'A link, usually to off-chain JSON metadata describing the image, name, and traits', 'The wallet address of the original minter', 'The total number of tokens in the collection'], correct: 1, explanation: 'The chain itself just tracks an owner mapping and an ID. tokenURI points to the metadata, typically hosted on IPFS, that gives that ID meaning, like its image and traits.' },
        { id: 'proposals_found_q3', question: 'What is the main efficiency advantage ERC-1155 has over deploying separate ERC-721 contracts for a game with many item types?', options: ['ERC-1155 transactions are free', 'Batch transfers let you move multiple token types in one transaction instead of one gas payment per item', 'ERC-1155 tokens cannot be stolen', 'ERC-1155 does not require a blockchain'], correct: 1, explanation: 'safeBatchTransferFrom moves several token types in a single call. Without batching, sending 10 different item types would mean 10 separate transactions and 10 separate gas bills.' },
        { id: 'proposals_found_q4', question: 'What is the first-depositor inflation attack that ERC-4626 vault implementations must defend against?', options: ['A hacker draining the vault by calling withdraw() in a loop', 'An attacker donating assets directly to an empty vault to inflate share price and steal from the next depositor', 'A flash loan that empties the vault in one block', 'A governance vote that changes the vault\'s fee structure'], correct: 1, explanation: 'If a vault is empty, an attacker can directly transfer in a large amount of the underlying asset before anyone else deposits, skewing the share-to-asset ratio so the next real depositor gets shorted through rounding.' },
        { id: 'proposals_found_q5', question: 'Why did most of DeFi move away from ERC-777 despite its more expressive design?', options: ['It was too expensive to deploy', 'Its tokensReceived and tokensToSend hooks created a reentrancy attack surface exploited in real incidents like imBTC/Uniswap', 'Ethereum deprecated the standard entirely', 'It could not support 18 decimal places'], correct: 1, explanation: 'Hooks that fire mid-transfer hand control to external contracts, which is exactly what reentrancy attacks exploit. The risk outweighed the convenience for most production DeFi protocols.' },
      ],
    },
  ],
};

export default proposals;
