const identity = {
  id: 'identity',
  title: 'Decentralized Identity',
  emoji: '🪪',
  color: '#06B6D4',
  gradient: ['#0891B2', '#06B6D4'],
  description: 'Learn how self-sovereign identity (SSI) lets you own your credentials without relying on Google, Facebook, or governments. Explore DIDs, verifiable credentials, ENS names, and the future where your identity is truly yours.',
  category: 'Web3 Concepts',
  modules: [
    {
      id: 'identity_beg',
      level: 'beginner',
      title: 'Who Owns Your Identity?',
      emoji: '🔑',
      description: 'Understand the problems with centralized identity and the SSI alternative.',
      color: '#06B6D4',
      lessons: [
        {
          id: 'identity_beg_l1',
          title: 'The Problem with Passwords',
          slides: [
            { type: 'intro', title: 'Your Identity is Rented', body: 'Your Google account, your Facebook profile, your email address, your bank login. You use them daily, but you do not own them. The companies that provide them can suspend, delete, or monetize them at will.' },
            { type: 'text', title: 'The Honeypot Problem', body: 'Centralized identity providers store billions of usernames and passwords in single databases. When breached, millions of identities are compromised simultaneously. Have I Been Pwned lists 14+ billion compromised accounts.' },
            { type: 'text', title: 'Surveillance by Design', body: '"Sign in with Google" is convenient, but it tells Google every app you use, when, and how often. Your identity becomes a surveillance tool. Your data is the product.' },
            { type: 'highlight', title: 'Self-Sovereign Identity', body: 'SSI flips the model: you hold your own credentials in a digital wallet. You share only what is needed (e.g., prove you are over 18 without revealing your birthday). No central authority can revoke your identity.' },
            { type: 'summary', title: 'Lesson Complete! +20 XP', body: 'Centralized identity is rented, surveilled, and vulnerable to breaches. Self-sovereign identity gives you full ownership and selective disclosure of your credentials.' },
          ],
        },
        {
          id: 'identity_beg_l2',
          title: 'DIDs and Verifiable Credentials',
          slides: [
            { type: 'intro', title: 'Decentralized Identifiers', body: 'A DID (Decentralized Identifier) is a new type of globally unique identifier that you create and control, with no central registry. It looks like: did:ethr:0x1234...abcd.' },
            { type: 'text', title: 'How DIDs Work', body: 'A DID is anchored to a blockchain or distributed ledger. Your DID document (stored on-chain or via IPFS) contains your public keys and service endpoints. You prove ownership with your private key.' },
            { type: 'text', title: 'Verifiable Credentials', body: 'A Verifiable Credential (VC) is a digital version of a real-world credential: a diploma, driver\'s license, or vaccination record. It is cryptographically signed by the issuer (e.g., a university) and stored in your wallet.' },
            { type: 'highlight', title: 'Selective Disclosure', body: 'With VCs, you can prove you have a degree without revealing which university. You can prove you are an adult without sharing your birth date. Zero-knowledge proofs make this possible.' },
            { type: 'summary', title: 'Lesson Complete! +20 XP', body: 'DIDs are blockchain-anchored unique identifiers you control. Verifiable Credentials are cryptographically signed attestations that let you prove things about yourself with selective disclosure.' },
          ],
        },
        {
          id: 'identity_beg_l3',
          title: 'ENS: Your Web3 Username',
          slides: [
            { type: 'intro', title: 'Ethereum Name Service', body: 'ENS (Ethereum Name Service) is the Web3 equivalent of DNS. Instead of remembering 0x742d35Cc6634C0532925a3b844Bc454e4438f44e, you use vitalik.eth.' },
            { type: 'text', title: 'What ENS Resolves To', body: 'ENS names can point to: Ethereum addresses, other crypto addresses (BTC, SOL), IPFS website content, social profile data, email addresses. One name, your entire Web3 identity.' },
            { type: 'text', title: 'Registering an ENS Name', body: 'Go to app.ens.domains, search your desired name, pay a yearly registration fee (roughly $5/year for 5+ character names), and you own it. The name is an NFT you fully control.' },
            { type: 'highlight', title: 'The Power of .eth', body: 'ENS names are already supported by MetaMask, Coinbase Wallet, Rainbow, Uniswap, and thousands of apps. Send crypto to friend.eth instead of a hex address. No intermediary, no censorship.' },
            { type: 'summary', title: 'Lesson Complete! +20 XP', body: 'ENS maps human-readable .eth names to blockchain addresses and data. It is the foundation of your on-chain identity, owned as an NFT and supported across the Web3 ecosystem.' },
          ],
        },
      ],
      quiz: [
        { id: 'identity_beg_q1', question: 'What does SSI stand for?', options: ['Secure System Interface', 'Self-Sovereign Identity', 'Shared Signature Infrastructure', 'Standard Security Index'], correct: 1, explanation: 'SSI stands for Self-Sovereign Identity, a model where individuals control their own digital identities without relying on centralized authorities.' },
        { id: 'identity_beg_q2', question: 'What type of asset is an ENS name?', options: ['A fungible token', 'A stablecoin', 'An NFT', 'A smart contract'], correct: 2, explanation: 'ENS names are NFTs (non-fungible tokens) that you own and fully control. They can be transferred, sold, or held indefinitely.' },
      ],
    },
    {
      id: 'identity_int',
      level: 'intermediate',
      title: 'Building with Identity Protocols',
      emoji: '🛠️',
      description: 'Explore Ceramic Network, Lens Protocol, and on-chain reputation systems.',
      color: '#0891B2',
      lessons: [
        {
          id: 'identity_int_l1',
          title: 'On-Chain Reputation and Attestations',
          slides: [
            { type: 'intro', title: 'Your On-Chain History', body: 'Your wallet address accumulates a history: DeFi interactions, NFT ownership, DAO votes, protocol usage. This history is public, verifiable, and can form the basis of trustless reputation.' },
            { type: 'text', title: 'Ethereum Attestation Service', body: 'EAS (Ethereum Attestation Service) is an open protocol for making on-chain or off-chain attestations. Anyone can attest to anything about any address: KYC status, skills, affiliations, contributions.' },
            { type: 'highlight', title: 'Soulbound Tokens', body: 'Vitalik Buterin proposed "soulbound" tokens (SBTs): non-transferable NFTs representing credentials, memberships, and achievements. Unlike regular NFTs, they cannot be sold, only earned or revoked.' },
            { type: 'text', title: 'Lens Protocol', body: 'Lens Protocol is a decentralized social graph on Polygon. Your profile, followers, and content are NFTs you own. Switch apps without losing your social graph. Build a following that no platform can take away.' },
            { type: 'summary', title: 'Lesson Complete! +25 XP', body: 'On-chain reputation uses your transaction history and attestations to build verifiable credibility. Soulbound tokens and protocols like EAS enable a richer, trustless identity layer.' },
          ],
        },
      ],
      quiz: [
        { id: 'identity_int_q1', question: 'What makes a "soulbound" token different from a regular NFT?', options: ['It has no monetary value', 'It cannot be transferred or sold, only earned or revoked', 'It is stored off-chain', 'It requires KYC to mint'], correct: 1, explanation: 'Soulbound tokens are non-transferable NFTs that represent credentials or achievements. They are tied to the wallet that earned them and cannot be bought or sold.' },
      ],
    },
  ],
};

export default identity;
