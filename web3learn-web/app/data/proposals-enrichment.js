// Rigor-upgrade content for the Proposals track.
//
// Keyed by lesson id. Each entry is merged onto the matching lesson object at
// load time (see index.js). Fields are all optional on the Lesson type, so any
// lesson without an entry here simply renders the classic slides + quick check.
//
// Layers:
//   summary       – upgraded hook for the overview
//   sources       – authoritative links shown on the overview + deep dive
//   deepDive      – long-form reading experience (Layer 2)
//   matchingPairs – active-recall matching game (Layer 3, Mode A)
//   scenarioQuiz  – scenario questions; misses become weak spots (Layer 3, Mode B)

const enrichment = {
  // ───────────────────────────────────────────────────────────────────────
  // EIP-1559 — The Fee Market Revolution (gold-standard reference)
  // ───────────────────────────────────────────────────────────────────────
  proposals_eth_l4: {
    summary:
      'Before August 2021, sending an Ethereum transaction meant guessing at a blind auction — and users routinely overpaid 5–10x or got stuck for hours. EIP-1559 replaced that first-price auction with an algorithmic "base fee" that every block adjusts automatically, and then burns. Vitalik first floated it in 2018; miners fought it for three years because the burn destroyed revenue they used to keep. In its first year live, the mechanism burned over $5B of ETH. Today every wallet "max fee / priority fee" field you see is EIP-1559 at work.',
    sources: [
      { label: 'EIP-1559: Fee market change for ETH 1.0', url: 'https://eips.ethereum.org/EIPS/eip-1559' },
      { label: 'ethereum.org — Gas and fees', url: 'https://ethereum.org/en/developers/docs/gas/' },
      { label: 'Tim Beiko — A Definitive Guide to EIP-1559', url: 'https://hackmd.io/@timbeiko/1559-resources' },
    ],
    deepDive: {
      readingTime: '9 min',
      sections: [
        {
          heading: 'The Blind Auction Nobody Could Win',
          body:
            'Before EIP-1559, Ethereum priced block space with a first-price auction. Every transaction carried a single number — gasPrice — and miners simply packed the highest bids into each block. The catch: you were bidding blind. You could not see what everyone else was bidding, so wallets fell back to crude heuristics ("fast / standard / slow") that lagged reality by minutes.\n\nThe result was chronic overpayment. During a busy moment you might set 200 gwei when 60 would have cleared, because guessing low meant your transaction sat unconfirmed indefinitely. Studies of the era found users routinely overpaid by 5–10x relative to the lowest price that would have landed in the same block. Worse, the experience was spiky and unpredictable: a single NFT mint or token launch could send prices to absurd levels for everyone on the network at once.\n\nThe deeper problem was that a first-price auction is the wrong tool for a resource whose demand swings wildly minute to minute. It optimizes for extracting the maximum a panicked user will pay, not for a smooth, legible price. Ethereum needed a fee market that behaved less like an auction house and more like a thermostat.',
        },
        {
          heading: 'How It Works: Base Fee, Tip, and the Burn',
          body:
            'EIP-1559 split the single gasPrice into two parts and added an automatic price-setting algorithm.\n\nFirst, every block now has a protocol-set "base fee" — a price per unit of gas that the network calculates for you. The base fee adjusts each block based on how full the previous block was, targeting 50% fullness. Blocks have an elastic limit: a 15M-gas target with a 30M-gas hard cap. If the previous block was more than half full, the base fee rises by up to 12.5%; if it was less than half full, it falls by up to 12.5%. Demand sustained above target makes fees climb predictably; demand below target makes them decay. No guessing required — your wallet can read the next block\'s base fee deterministically.\n\nSecond, users add a "priority fee" (the tip) on top, paid directly to the validator as an incentive to include the transaction. You also set a "max fee" ceiling so you never pay more than you authorized; you are refunded the difference between your max fee and (base fee + tip).\n\nThe radical part: the base fee is burned — permanently removed from circulation — rather than paid to the validator. Only the tip goes to whoever produces the block.',
        },
        {
          heading: 'Why the Miners Fought It',
          body:
            'Vitalik Buterin first proposed the design in 2018. It then spent roughly three years in debate, and the fight was largely economic. Burning the base fee meant taking the single largest component of transaction revenue away from miners.\n\nUnder the old auction, miners captured 100% of the fee on every transaction. Under EIP-1559, they capture only the tip — often a small fraction of the total. Miners argued this cut their income at a precarious time and even threatened a "show of force" to block the change. Proponents countered that a burn aligns the network: it makes ETH scarcer as usage grows, turning heavy block-space demand into value accruing to every holder rather than to a handful of block producers.\n\nThe change shipped in the London hard fork on 5 August 2021. The economics proved enormous: in its first year the base-fee burn destroyed over $5B worth of ETH, and during high-activity periods Ethereum became net deflationary — issuing fewer new coins than it burned. EIP-1559 reframed gas from a pure cost into a monetary-policy lever.',
        },
        {
          heading: 'Reading the Base Fee On-Chain',
          body:
            'Solidity 0.8.7 added the `block.basefee` global so contracts can read the current block\'s base fee directly. This is useful for fee-aware logic — refund estimators, gas oracles, or contracts that want to behave differently when the network is congested. The transaction-level fields (max fee and priority fee) are set by the wallet, not the contract, but the effective price a block charges is derived from them and the base fee.',
          lang: 'solidity',
          code:
            '// SPDX-License-Identifier: MIT\npragma solidity ^0.8.7;\n\ncontract FeeAware {\n    // The protocol sets block.basefee every block (wei per unit of gas).\n    function currentBaseFee() external view returns (uint256) {\n        return block.basefee;\n    }\n\n    // Charge a premium only when the network is congested.\n    function isCongested(uint256 thresholdGwei) external view returns (bool) {\n        return block.basefee > thresholdGwei * 1 gwei;\n    }\n}\n\n// What the WALLET sets on a Type-2 (EIP-1559) transaction:\n//   maxFeePerGas         = the most you will pay per gas (base fee + tip ceiling)\n//   maxPriorityFeePerGas = your tip to the validator\n//\n// Effective price per gas the block charges you:\n//   min(maxFeePerGas, block.basefee + maxPriorityFeePerGas)\n// The base-fee portion is BURNED; only the tip goes to the validator.',
        },
        {
          heading: 'Mental Model',
          body:
            'Hold one image in your head: the base fee is the floor the market sets, and the tip is your offer to jump the queue.\n\nThe base fee is not something you bid — it is a posted price the protocol computes from recent demand, the same for everyone in that block, and it rises and falls like a thermostat reacting to how crowded the chain has been. You cannot undercut it; you can only choose to transact or wait for it to fall. The tip is the only part that is truly an auction, and it is usually small because all it buys is ordering priority within a block.\n\nFor a developer this means fees became legible: you can read the next base fee and quote a near-exact cost. For an investor it means every unit of Ethereum demand now quietly burns ETH — block space is no longer just a miner\'s paycheck, it is a sink that makes the asset scarcer as the network is used. That single design choice is why "ultrasound money" entered the Ethereum vocabulary.',
        },
      ],
      sources: [
        { label: 'EIP-1559: Fee market change for ETH 1.0', url: 'https://eips.ethereum.org/EIPS/eip-1559' },
        { label: 'ethereum.org — Gas and fees', url: 'https://ethereum.org/en/developers/docs/gas/' },
        { label: 'Tim Beiko — A Definitive Guide to EIP-1559', url: 'https://hackmd.io/@timbeiko/1559-resources' },
        { label: 'ultrasound.money — live ETH burn dashboard', url: 'https://ultrasound.money/' },
      ],
    },
    matchingPairs: [
      { term: 'Base fee', definition: 'Protocol-set price per gas that adjusts each block toward 50% fullness, and is burned' },
      { term: 'Priority fee (tip)', definition: 'Optional payment to the validator to prioritize your transaction within a block' },
      { term: 'maxFeePerGas', definition: 'The ceiling you authorize; you are refunded anything above the actual base fee + tip' },
      { term: 'The burn', definition: 'Permanent removal of the base fee from circulation, making ETH scarcer as usage grows' },
      { term: 'block.basefee', definition: 'Solidity global that lets a contract read the current block’s base fee on-chain' },
      { term: 'Elastic block limit', definition: '15M-gas target with a 30M-gas hard cap, letting blocks absorb demand spikes' },
    ],
    scenarioQuiz: [
      {
        id: 'eip1559_s1',
        question:
          'A wallet wants to quote users an accurate gas cost a few seconds before they sign, without a "fast/standard/slow" guess. What property of EIP-1559 makes this possible?',
        options: [
          'Validators publish their minimum acceptable bid each block',
          'The base fee for the next block is deterministically derived from how full recent blocks were',
          'Gas prices are fixed by the Ethereum Foundation daily',
          'The tip is always exactly 1 gwei',
        ],
        correct: 1,
        explanation:
          'Because the base fee adjusts by a known formula based on the previous block’s fullness, a wallet can compute the next block’s base fee deterministically and quote a near-exact price. That legibility is the whole point of replacing the blind first-price auction.',
      },
      {
        id: 'eip1559_s2',
        question:
          'During a popular NFT mint, the network stays well above its gas target for several blocks. What happens to the base fee, and who receives it?',
        options: [
          'It stays flat, and miners receive all of it',
          'It rises by up to 12.5% per block, and it is burned (not paid to the validator)',
          'It falls to encourage more usage, and validators receive it',
          'It is capped at the target and refunded to users',
        ],
        correct: 1,
        explanation:
          'Sustained demand above the 50%-full target pushes the base fee up by up to 12.5% each block. The base fee is burned — removed from supply — while only the priority tip goes to the validator. This is why heavy usage can make ETH net deflationary.',
      },
      {
        id: 'eip1559_s3',
        question:
          'An investor asks why EIP-1559 is described as a monetary-policy change, not just a UX fix. What is the strongest answer?',
        options: [
          'It made transactions free for token holders',
          'It pays a dividend in ETH to every wallet',
          'Burning the base fee ties network usage to ETH scarcity, so demand for block space reduces supply',
          'It increased the maximum ETH supply cap',
        ],
        correct: 2,
        explanation:
          'By burning the base fee, EIP-1559 turned block-space demand into a supply sink: the more the network is used, the more ETH is destroyed. That links usage to scarcity for every holder — a monetary effect, not merely a smoother fee interface.',
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────
  // ERC-20 — The Standard That Started DeFi
  // ───────────────────────────────────────────────────────────────────────
  proposals_eth_l2: {
    summary:
      'In 2015, every Ethereum token spoke its own language — exchanges had to write bespoke code to list each one, and wallets integrated them one by one. Fabian Vogelsteller’s ERC-20 proposed a six-function interface every token would share, so any wallet, DEX, or lending market could support a new token the moment it shipped. That single agreement is the reason Uniswap can swap any pair and Compound can accept almost any token as collateral. USDC, WBTC, UNI, LINK — all ERC-20. DeFi’s composability is ERC-20’s composability.',
    sources: [
      { label: 'EIP-20: Token Standard', url: 'https://eips.ethereum.org/EIPS/eip-20' },
      { label: 'OpenZeppelin ERC20 implementation', url: 'https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol' },
      { label: 'ethereum.org — ERC-20 Token Standard', url: 'https://ethereum.org/en/developers/docs/standards/tokens/erc-20/' },
    ],
    deepDive: {
      readingTime: '8 min',
      sections: [
        {
          heading: 'The Problem Before ERC-20',
          body:
            'Ethereum launched in July 2015 and almost immediately people began issuing tokens on it. The trouble was that nothing said how a token should behave. One contract called its transfer function `sendCoin`, another called it `transfer`, a third tracked balances in a public array you had to index yourself. Each token was effectively a bespoke API.\n\nFor the ecosystem this was a combinatorial nightmare. An exchange that wanted to list 50 tokens had to write and audit 50 different integrations. A wallet showing your balances had to special-case every asset. Two tokens could not be composed in a single contract without custom glue. The promise of "programmable money" was real, but without a shared interface every integration was a one-off, and the network could not develop the network effects that make a platform valuable.',
        },
        {
          heading: 'Vogelsteller’s Six Functions',
          body:
            'In November 2015, developer Fabian Vogelsteller proposed a minimal standard interface in the 20th Ethereum Request for Comments — hence ERC-20. The insight was not to dictate how a token works internally, only how the outside world talks to it.\n\nThe core is six functions and two events. `totalSupply()` reports how many tokens exist. `balanceOf(address)` reports one account’s holdings. `transfer(to, amount)` moves your own tokens. Then the powerful pair: `approve(spender, amount)` lets you authorize another address to spend up to an allowance, and `transferFrom(from, to, amount)` lets that approved spender pull the tokens. `allowance(owner, spender)` reports how much is still authorized. Two events, `Transfer` and `Approval`, let off-chain systems (block explorers, wallets, indexers) follow activity without polling state.\n\nThat is the entire contract every wallet, exchange, and protocol can rely on. Anything that implements those signatures is, to the rest of Ethereum, a token.',
          lang: 'solidity',
          code:
            'interface IERC20 {\n    function totalSupply() external view returns (uint256);\n    function balanceOf(address account) external view returns (uint256);\n    function transfer(address to, uint256 amount) external returns (bool);\n\n    // The two-step spending pattern that powers DeFi:\n    function approve(address spender, uint256 amount) external returns (bool);\n    function allowance(address owner, address spender) external view returns (uint256);\n    function transferFrom(address from, address to, uint256 amount) external returns (bool);\n\n    event Transfer(address indexed from, address indexed to, uint256 value);\n    event Approval(address indexed owner, address indexed spender, uint256 value);\n}',
        },
        {
          heading: 'How DeFi Was Built On It',
          body:
            'The approve/transferFrom pair is what makes a decentralized exchange possible without trusting it with your keys. You do not send tokens to Uniswap; you `approve` the router to move up to some amount, and when you swap, the contract calls `transferFrom` to pull exactly what the trade needs. The same pattern lets Compound and Aave pull collateral, lets a vault auto-compound your position, and lets an aggregator route across ten protocols in one transaction.\n\nBecause every ERC-20 exposes the same interface, these protocols are composable by default: Uniswap can list a token that did not exist when Uniswap was written, and a yield aggregator can stack on top of a lending market that was built independently. This is the "money Lego" property. The standard also exposes the standard’s sharpest edge — the infinite-approval habit. Many apps request an unlimited allowance for convenience, which means a malicious or buggy contract you approved can drain that token later. Understanding allowances is core to staying safe on-chain.',
        },
        {
          heading: 'Mental Model',
          body:
            'Think of ERC-20 not as "a coin" but as "a shared socket." The standard does not care what the token represents — a stablecoin, a governance vote, a wrapped Bitcoin — it only guarantees the shape of the plug. Any device built to that socket works with any token built to that socket, forever, without coordination.\n\nFor a developer, that means you almost never write token logic from scratch; you inherit a battle-tested implementation (OpenZeppelin’s) and spend your effort on what makes your token different. For an investor, ERC-20 is why liquidity is shared infrastructure: a new token is tradable, lendable, and composable on day one, which is exactly why launching one is so cheap — and why scrutinizing what a token actually does (beyond implementing the interface) matters so much.',
        },
      ],
      sources: [
        { label: 'EIP-20: Token Standard', url: 'https://eips.ethereum.org/EIPS/eip-20' },
        { label: 'OpenZeppelin ERC20 implementation', url: 'https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol' },
        { label: 'ethereum.org — ERC-20 Token Standard', url: 'https://ethereum.org/en/developers/docs/standards/tokens/erc-20/' },
        { label: 'Original ERC-20 issue (ethereum/EIPs #20)', url: 'https://github.com/ethereum/EIPs/issues/20' },
      ],
    },
    matchingPairs: [
      { term: 'totalSupply()', definition: 'Returns the total number of tokens in existence' },
      { term: 'balanceOf(addr)', definition: 'Returns the token balance held by a given address' },
      { term: 'transfer(to, amt)', definition: 'Moves the caller’s own tokens directly to another address' },
      { term: 'approve(spender, amt)', definition: 'Authorizes another address to spend up to an allowance on your behalf' },
      { term: 'transferFrom(from, to, amt)', definition: 'Lets an approved spender pull tokens from an owner — the basis of DEX swaps' },
      { term: 'allowance(owner, spender)', definition: 'Reports how much an approved spender is still permitted to move' },
    ],
    scenarioQuiz: [
      {
        id: 'erc20_s1',
        question:
          'A DEX wants users to swap tokens without first depositing them into the exchange contract. Which ERC-20 mechanism lets the DEX move a user’s tokens only when a trade executes?',
        options: [
          'transfer() called by the user for each swap',
          'approve() to set an allowance, then transferFrom() called by the DEX at swap time',
          'balanceOf() to read the user’s balance and move it automatically',
          'mint() new tokens to the DEX',
        ],
        correct: 1,
        explanation:
          'The user calls approve() to authorize an allowance, and the DEX calls transferFrom() to pull exactly the tokens a swap needs. The user never hands over custody, and the same two-step pattern underpins lending, vaults, and aggregators.',
      },
      {
        id: 'erc20_s2',
        question:
          'A wallet shows a security warning that a dapp is requesting an "unlimited" token approval. Why is this riskier than approving an exact amount?',
        options: [
          'Unlimited approvals cost more gas every transaction',
          'The dapp can mint new tokens to itself',
          'The approved contract can call transferFrom for any amount of that token later, even if buggy or malicious',
          'It permanently locks the token in the dapp',
        ],
        correct: 2,
        explanation:
          'An allowance persists until you change it. An unlimited approval means the spender can transferFrom your entire balance of that token at any future time. If that contract is compromised, the allowance becomes a drain — which is why limiting or revoking approvals matters.',
      },
      {
        id: 'erc20_s3',
        question:
          'A team launches a new token and is surprised that Uniswap and several wallets support it within minutes, with no integration work on their side. What explains this?',
        options: [
          'Uniswap pre-approves every new contract address',
          'The token implements the shared ERC-20 interface, so any ERC-20-aware app can interact with it immediately',
          'Ethereum broadcasts new tokens to all dapps automatically',
          'Wallets scan GitHub for new token repos',
        ],
        correct: 1,
        explanation:
          'Because the apps were written against the ERC-20 interface, anything implementing those function signatures is usable the moment it deploys. That composability — support without coordination — is the core network effect ERC-20 created.',
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────
  // ERC-721 — NFTs and Digital Ownership
  // ───────────────────────────────────────────────────────────────────────
  proposals_eth_l3: {
    summary:
      'ERC-20 treats every token as interchangeable — one USDC is exactly like any other. But how do you represent a deed, a ticket, or a one-of-a-kind artwork, where token #4220 must be distinguishable from #4221? In 2017, CryptoKitties exploded in popularity and congested all of Ethereum, proving the demand for unique on-chain assets. ERC-721 formalized the answer: a standard where every token has a unique ID owned by exactly one address. It became the backbone of a multi-billion-dollar NFT market — Bored Apes, Art Blocks, ENS names, and on-chain game items all live on it.',
    sources: [
      { label: 'EIP-721: Non-Fungible Token Standard', url: 'https://eips.ethereum.org/EIPS/eip-721' },
      { label: 'OpenZeppelin ERC721 implementation', url: 'https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol' },
      { label: 'ethereum.org — ERC-721 (NFT) Standard', url: 'https://ethereum.org/en/developers/docs/standards/tokens/erc-721/' },
    ],
    deepDive: {
      readingTime: '8 min',
      sections: [
        {
          heading: 'Why Fungibility Wasn’t Enough',
          body:
            'ERC-20 made tokens interchangeable, and for money that is exactly right — you do not care which dollar you hold. But a huge class of valuable things are not interchangeable. A house deed, a concert ticket in a specific seat, a username, a rare in-game sword, a piece of art: each is unique, and ownership must be tracked per item, not per balance.\n\nYou cannot model that with ERC-20. A balance of "3" tells you nothing about which three. The community needed a standard where the unit of ownership is a specific, individually-addressable token. The pressure became concrete in late 2017 when CryptoKitties — collectible cat NFTs — went viral and congested the entire Ethereum network, the first time a single application showed both the demand for unique digital assets and the need for a clean shared standard.',
        },
        {
          heading: 'How It Works: The tokenId',
          body:
            'ERC-721, authored by William Entriken, Dieter Shirley, Jacob Evans, and Nastassia Sachs and finalized in 2018, centers on one idea: every token has a unique `uint256 tokenId`, and the contract maps each tokenId to a single owner address.\n\n`ownerOf(tokenId)` returns who holds a specific token. `balanceOf(owner)` returns how many tokens of the collection an address holds (a count, not which ones). Transfers are per-token: `transferFrom(from, to, tokenId)` and the safer `safeTransferFrom(...)`, which checks that a contract recipient implements `onERC721Received` so the NFT cannot be stranded in a contract that does not know how to handle it. Approvals come in two flavors: `approve(spender, tokenId)` authorizes one specific token, while `setApprovalForAll(operator, true)` grants an operator control over your entire collection — which is exactly what marketplaces like OpenSea request so they can transfer an item the instant it sells. Finally, the optional metadata extension adds `tokenURI(tokenId)`, a pointer (often to IPFS) describing the token’s name, image, and traits.',
          lang: 'solidity',
          code:
            'interface IERC721 {\n    function balanceOf(address owner) external view returns (uint256);\n    function ownerOf(uint256 tokenId) external view returns (address);\n\n    // Per-token transfer; safe variant checks the recipient can receive NFTs\n    function safeTransferFrom(address from, address to, uint256 tokenId) external;\n    function transferFrom(address from, address to, uint256 tokenId) external;\n\n    // Approve ONE token vs. an operator for ALL your tokens\n    function approve(address to, uint256 tokenId) external;\n    function setApprovalForAll(address operator, bool approved) external;\n    function getApproved(uint256 tokenId) external view returns (address);\n    function isApprovedForAll(address owner, address operator) external view returns (bool);\n}',
        },
        {
          heading: 'Real-World Impact and Footguns',
          body:
            'ERC-721 turned "digital ownership" from a slogan into infrastructure. Bored Ape Yacht Club, Art Blocks generative art, ENS names (yourname.eth is an NFT), Uniswap v3 liquidity positions, and countless game items are all ERC-721 tokens. Because the interface is shared, a single marketplace can list any compliant collection, and a wallet can display any of them.\n\nThe sharpest footgun is `setApprovalForAll`. Granting an operator approval-for-all is convenient — list once, sell many — but it hands that operator the ability to move every token in the collection. The majority of high-profile NFT thefts have come from users signing an approval-for-all to a malicious contract dressed up as a mint or airdrop, not from a "stolen private key." A second subtlety: most NFT images live off-chain at the `tokenURI`, so "owning the NFT" means owning the on-chain pointer and provenance, while the asset it points to may be hosted on IPFS or a server — durability depends on how the project stored it.',
        },
        {
          heading: 'Mental Model',
          body:
            'If ERC-20 is a pile of identical coins, ERC-721 is a ledger of numbered certificates. The contract is the registry; the tokenId is the certificate number; `ownerOf` is the registrar telling you whose name is on certificate #4220. Two certificates from the same registry can have wildly different value precisely because they are not interchangeable.\n\nFor a developer, the practical consequences flow from "per-token, single owner": you iterate ownership per id, you reach for `safeTransferFrom` to avoid stranding tokens, and you treat `setApprovalForAll` as a privileged grant. For an investor, the mental model clarifies what you are actually buying: a unique, transferable on-chain record plus whatever rights and metadata the project attached to it — which is why the question "what does this NFT actually entitle me to, and where does its data live?" is the one that matters.',
        },
      ],
      sources: [
        { label: 'EIP-721: Non-Fungible Token Standard', url: 'https://eips.ethereum.org/EIPS/eip-721' },
        { label: 'OpenZeppelin ERC721 implementation', url: 'https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol' },
        { label: 'ethereum.org — ERC-721 (NFT) Standard', url: 'https://ethereum.org/en/developers/docs/standards/tokens/erc-721/' },
      ],
    },
    matchingPairs: [
      { term: 'tokenId', definition: 'The unique uint256 identifier for each individual NFT in a collection' },
      { term: 'ownerOf(tokenId)', definition: 'Returns the single address that currently owns a specific token' },
      { term: 'safeTransferFrom()', definition: 'Transfers a token and verifies a contract recipient can handle ERC-721' },
      { term: 'approve(to, tokenId)', definition: 'Authorizes another address to transfer ONE specific token' },
      { term: 'setApprovalForAll()', definition: 'Grants an operator permission to manage ALL of your tokens in a collection' },
      { term: 'tokenURI(tokenId)', definition: 'Pointer (often IPFS) to a token’s metadata: name, image, and traits' },
    ],
    scenarioQuiz: [
      {
        id: 'erc721_s1',
        question:
          'A marketplace wants to transfer any item in your collection the moment a buyer pays, without you signing each sale. Which call do they request, and what is the trade-off?',
        options: [
          'approve(marketplace, tokenId) — but it only covers one token',
          'setApprovalForAll(marketplace, true) — convenient, but the operator can then move every token you own in that collection',
          'transfer(marketplace, balance) — moves all tokens immediately',
          'ownerOf(tokenId) — grants the marketplace ownership',
        ],
        correct: 1,
        explanation:
          'setApprovalForAll lets a marketplace move any token in the collection on demand, which is why listings feel instant. The trade-off is real: that operator can transfer all of them, so granting it to a malicious contract is the leading cause of NFT theft.',
      },
      {
        id: 'erc721_s2',
        question:
          'A developer is building a contract that should receive and hold NFTs on a user’s behalf. Why prefer safeTransferFrom over transferFrom when moving tokens into it?',
        options: [
          'safeTransferFrom is cheaper on gas',
          'safeTransferFrom checks the recipient implements onERC721Received, preventing tokens from being stranded in a contract that can’t handle them',
          'transferFrom only works for fungible tokens',
          'safeTransferFrom automatically lists the token for sale',
        ],
        correct: 1,
        explanation:
          'safeTransferFrom calls onERC721Received on contract recipients. If the contract does not implement it, the transfer reverts — protecting against irretrievably locking an NFT inside a contract that has no logic to ever move it out.',
      },
      {
        id: 'erc721_s3',
        question:
          'Two tokens, #101 and #102, come from the same ERC-721 contract but sell for very different prices. A newcomer asks how that’s possible if they share a contract. Best explanation?',
        options: [
          'The contract is buggy; identical tokens should cost the same',
          'ERC-721 tokens are non-fungible — each tokenId is a distinct asset with its own owner and metadata, so value is per-token, not per-contract',
          'Price differences mean one of them is an ERC-20',
          'The cheaper one has fewer decimals',
        ],
        correct: 1,
        explanation:
          'Non-fungibility is the whole point: each tokenId is individually owned and can carry distinct metadata and rarity. Sharing a contract just means they follow the same standard, not that they’re interchangeable — unlike ERC-20 balances.',
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────
  // ERC-4337 — Account Abstraction
  // ───────────────────────────────────────────────────────────────────────
  proposals_eth_l5: {
    summary:
      'For most of Ethereum’s history, the account that holds your funds — an Externally Owned Account — had exactly one rule: a single private key signs everything, you must hold ETH to pay gas, and lose the key and the funds are gone forever. ERC-4337 changes that without touching the core protocol. It lets wallets be smart contracts with programmable rules: social recovery, multisig, biometric keys, spending limits, and gasless transactions paid by a sponsor. Deployed on mainnet in March 2023, it’s the foundation under Coinbase Smart Wallet, Safe’s modular accounts, and the "no seed phrase" wallets onboarding millions of new users.',
    sources: [
      { label: 'EIP-4337: Account Abstraction via Entry Point', url: 'https://eips.ethereum.org/EIPS/eip-4337' },
      { label: 'erc4337.io — documentation hub', url: 'https://www.erc4337.io/' },
      { label: 'eth-infinitism reference implementation', url: 'https://github.com/eth-infinitism/account-abstraction' },
    ],
    deepDive: {
      readingTime: '9 min',
      sections: [
        {
          heading: 'The Tyranny of the EOA',
          body:
            'Every wallet most people have ever used — MetaMask, a hardware wallet — is an Externally Owned Account. An EOA is defined entirely by a single keypair, and that rigidity causes nearly every painful thing about self-custody.\n\nYou must own the native token to do anything: no ETH, no transactions, even if your wallet is full of stablecoins. There is no recovery: lose the seed phrase and the funds are permanently inaccessible; an estimated millions of ETH are lost this way. There is no flexibility: you cannot require two-of-three approval for large transfers, cap daily spending, batch ten actions into one click, or rotate to a new key if you suspect compromise. The signing logic is hardcoded into the protocol. Changing it for everyone would require a contentious base-layer hard fork — which is precisely why earlier account-abstraction proposals stalled for years.',
        },
        {
          heading: 'How It Works: A Higher-Level Mempool',
          body:
            'ERC-4337’s breakthrough is that it achieves account abstraction without any consensus change. Instead of modifying how Ethereum validates transactions, it builds a parallel system on top.\n\nUsers express intent as a `UserOperation` — a struct describing what they want done, which account should do it, and how gas will be paid. These do not go into the normal transaction mempool; they go into a separate higher-level mempool. Actors called `Bundlers` collect UserOperations and submit them in a batch to a single audited singleton contract, the `EntryPoint`. The EntryPoint calls each user’s smart-contract wallet to validate the operation (the wallet decides what "valid" means — one signature, three signatures, a passkey, whatever) and then to execute it. A `Paymaster` contract can optionally agree to pay the gas, enabling gasless or pay-in-USDC transactions. The result: wallets become programmable contracts, while the protocol underneath never had to learn about any of it.',
          lang: 'solidity',
          code:
            '// Simplified UserOperation — the "transaction intent" a smart account submits\nstruct UserOperation {\n    address sender;             // the smart-contract wallet\n    uint256 nonce;\n    bytes   initCode;           // deploys the wallet if it does not exist yet\n    bytes   callData;           // what the wallet should execute\n    uint256 callGasLimit;\n    uint256 verificationGasLimit;\n    uint256 preVerificationGas;\n    uint256 maxFeePerGas;\n    uint256 maxPriorityFeePerGas;\n    bytes   paymasterAndData;   // a sponsor that pays gas (optional)\n    bytes   signature;          // validated by the wallet’s OWN logic\n}\n\n// The wallet defines what "valid" means — multisig, passkey, session key, etc.\ninterface IAccount {\n    function validateUserOp(\n        UserOperation calldata userOp,\n        bytes32 userOpHash,\n        uint256 missingAccountFunds\n    ) external returns (uint256 validationData);\n}',
        },
        {
          heading: 'What It Unlocks',
          body:
            'Once the wallet is a contract that defines its own validation, a long wishlist becomes possible. Social recovery: designate guardians who can collectively help you rotate to a new key if you lose access — no single seed phrase to lose. Gasless onboarding: a Paymaster (often the app) sponsors gas so a brand-new user can transact with zero ETH, or pays gas in the token they already hold. Batching: approve and swap in one signature instead of two transactions. Session keys: grant a game a limited, time-boxed key so it can act without a popup on every move. Spending limits and allowlists enforced by the wallet itself.\n\nThis is the layer behind Coinbase Smart Wallet’s passkey sign-in, Safe’s modular smart accounts, and the wave of consumer wallets that hide seed phrases entirely. EIP-4337 shipped as an ERC (application-layer, opt-in) in March 2023; later work like EIP-7702 brings some of these powers to existing EOAs too, but 4337 established the architecture.',
        },
        {
          heading: 'Mental Model',
          body:
            'Stop thinking of "your account" as a key and start thinking of it as a programmable vault with its own rulebook. The protocol no longer dictates "one key signs"; your wallet contract does, and you can write the rules: who can authorize, under what limits, recoverable by whom, paid for by which party.\n\nThe enabling trick is the indirection: a separate mempool, Bundlers, and the EntryPoint let all of this run on top of an unchanged Ethereum. For a developer, that means you can ship wallet UX that feels like a normal app — no seed phrase, sponsored gas, one-click flows — by integrating a smart-account stack rather than waiting on a fork. For an investor, account abstraction is the quiet unlock for mainstream adoption: it removes the two scariest cliffs (lose-your-keys-lose-everything, and must-buy-ETH-before-you-can-do-anything) that stop ordinary users at the door.',
        },
      ],
      sources: [
        { label: 'EIP-4337: Account Abstraction via Entry Point', url: 'https://eips.ethereum.org/EIPS/eip-4337' },
        { label: 'erc4337.io — documentation hub', url: 'https://www.erc4337.io/' },
        { label: 'eth-infinitism reference implementation', url: 'https://github.com/eth-infinitism/account-abstraction' },
        { label: 'Vitalik — Road to account abstraction', url: 'https://notes.ethereum.org/@vbuterin/account_abstraction_roadmap' },
      ],
    },
    matchingPairs: [
      { term: 'UserOperation', definition: 'A struct expressing a smart account’s intended action, submitted to a separate mempool' },
      { term: 'EntryPoint', definition: 'Audited singleton contract that validates and executes bundled UserOperations' },
      { term: 'Bundler', definition: 'Actor that collects UserOperations and submits them on-chain in a batch' },
      { term: 'Paymaster', definition: 'Contract that can sponsor gas — enabling gasless or pay-in-token transactions' },
      { term: 'validateUserOp()', definition: 'Wallet function that defines what counts as a valid signature/authorization' },
      { term: 'Social recovery', definition: 'Guardians can help rotate to a new key, removing the single-seed-phrase failure point' },
    ],
    scenarioQuiz: [
      {
        id: 'erc4337_s1',
        question:
          'A consumer app wants brand-new users to make their first on-chain action without buying ETH first. Which ERC-4337 component makes this possible?',
        options: [
          'The Bundler, by refunding gas afterward',
          'A Paymaster that sponsors (or accepts alternative payment for) the gas',
          'The EntryPoint, by waiving fees for new accounts',
          'A higher maxFeePerGas on the UserOperation',
        ],
        correct: 1,
        explanation:
          'A Paymaster can agree to pay the gas for a UserOperation — or let the user pay in a token they already hold. This removes the "must own ETH before doing anything" cliff, which is central to onboarding non-crypto-native users.',
      },
      {
        id: 'erc4337_s2',
        question:
          'Why could ERC-4337 ship and gain adoption without a contentious Ethereum hard fork, when earlier account-abstraction efforts stalled for years?',
        options: [
          'It changed the EOA signature scheme directly in consensus',
          'It runs as an opt-in application-layer system — a separate mempool, Bundlers, and the EntryPoint contract — on top of unchanged Ethereum',
          'It was approved by a vote of all validators',
          'It only works on layer-2 networks',
        ],
        correct: 1,
        explanation:
          'ERC-4337 deliberately avoided touching consensus. UserOperations flow through their own mempool to Bundlers and the EntryPoint contract, so smart-account features work on top of the base protocol without requiring everyone to fork.',
      },
      {
        id: 'erc4337_s3',
        question:
          'A user worries about losing their seed phrase the way they lost access to an old EOA. How does a 4337 smart account address this?',
        options: [
          'It stores the seed phrase on-chain encrypted',
          'It cannot — all wallets share the same single-key model',
          'The wallet contract can implement social recovery, letting designated guardians help rotate to a new signing key',
          'It emails the user a backup key',
        ],
        correct: 2,
        explanation:
          'Because the smart account defines its own validation logic, it can support social recovery: guardians collectively authorize rotating to a new key. There is no single seed phrase whose loss is fatal — the failure mode that strands funds in EOAs.',
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────
  // ERC-1155 — The Multi-Token Standard
  // ───────────────────────────────────────────────────────────────────────
  proposals_erc_adv_l2: {
    summary:
      'A blockchain game might have a thousand item types — fungible gold coins, semi-fungible potions, unique legendary swords. With ERC-20 and ERC-721 you would deploy a separate contract for each, paying deployment gas a thousand times and forcing users into a thousand separate approvals and transfers. ERC-1155, created by the Enjin team in 2018, fixes this: one contract manages many token types at once — fungible, non-fungible, or semi-fungible — and can transfer batches of them in a single call. It became the default for on-chain gaming and editions, and powers OpenSea’s shared "Collections" contract.',
    sources: [
      { label: 'EIP-1155: Multi Token Standard', url: 'https://eips.ethereum.org/EIPS/eip-1155' },
      { label: 'OpenZeppelin ERC1155 implementation', url: 'https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC1155/ERC1155.sol' },
      { label: 'ethereum.org — ERC-1155 Multi-Token Standard', url: 'https://ethereum.org/en/developers/docs/standards/tokens/erc-1155/' },
    ],
    deepDive: {
      readingTime: '7 min',
      sections: [
        {
          heading: 'The One-Contract-Per-Token Tax',
          body:
            'ERC-20 and ERC-721 each assume a contract represents a single asset type. That is fine for one token, but it collapses under inventories. A game with potions, currencies, skins, and unique items would need a new contract per type — each costing deployment gas, each needing its own approval, each transferred separately. Sending a player a starter pack of ten different items meant ten transactions and ten gas payments.\n\nThere was also no clean way to express a "semi-fungible" asset: a concert ticket that is one of 500 identical GA tickets (fungible) right up until it is used, after which it becomes a unique collectible (non-fungible). The existing standards forced you to pick fungible or non-fungible up front, per contract.',
        },
        {
          heading: 'How It Works: IDs and Batches',
          body:
            'ERC-1155, authored primarily by Witek Radomski and the Enjin team, makes a single contract a registry of many token IDs, each with its own supply. A token ID with a supply of millions behaves fungibly; an ID with a supply of one behaves like an NFT; the same contract holds both.\n\nBalances are tracked per (account, id): `balanceOf(account, id)`. The signature feature is batching. `safeBatchTransferFrom(from, to, ids[], amounts[], data)` moves any mix of token types in one transaction — ten items, one gas payment, one atomic operation. `balanceOfBatch` reads many balances at once. Approvals use a single `setApprovalForAll(operator, true)` that covers every token ID in the contract, so a marketplace gets one approval instead of one per asset. The standard is also more gas-efficient on transfers and uses a single parameterized `uri(id)` for metadata across all IDs.',
          lang: 'solidity',
          code:
            'interface IERC1155 {\n    // Balance is per (account, token id) — one contract, many token types\n    function balanceOf(address account, uint256 id) external view returns (uint256);\n    function balanceOfBatch(address[] calldata accounts, uint256[] calldata ids)\n        external view returns (uint256[] memory);\n\n    // Move a whole inventory of mixed token types in ONE atomic call\n    function safeBatchTransferFrom(\n        address from,\n        address to,\n        uint256[] calldata ids,\n        uint256[] calldata amounts,\n        bytes calldata data\n    ) external;\n\n    // One approval covers every token id in the contract\n    function setApprovalForAll(address operator, bool approved) external;\n}',
        },
        {
          heading: 'Where It Wins',
          body:
            'ERC-1155 became the standard for on-chain gaming and large editions. A game studio deploys one contract for its entire item catalog, mints new types over time, and airdrops bundles to thousands of players cheaply via batch transfers. Editioned art (1,000 copies of the same piece) and POAP-style collectibles fit naturally. OpenSea’s shared storefront contract uses ERC-1155 so creators can mint without deploying anything.\n\nThe trade-off is that ERC-1155 is less universally supported than ERC-721 for one-of-one art, and per-token metadata conventions differ, so some NFT tooling treats 721 as the default for unique collectibles. The rule of thumb: reach for ERC-1155 when you have many token types or need cheap batch operations; reach for ERC-721 when each token is a distinct one-of-one and maximum marketplace compatibility matters.',
        },
        {
          heading: 'Mental Model',
          body:
            'ERC-20 is one drawer of identical coins. ERC-721 is a cabinet of numbered one-of-one certificates. ERC-1155 is a warehouse with numbered shelves: each shelf (token ID) can hold one item or a million identical items, and you can pick from many shelves in a single trip (batch transfer).\n\nFor a developer, that warehouse view tells you when 1155 pays off: any time you would otherwise deploy and approve many contracts, collapse them into one with per-ID balances and batch transfers. For an investor or collector, it reframes what you hold — a balance of a specific ID, where the ID’s total supply (one vs. thousands) is what determines whether the thing is unique or an edition.',
        },
      ],
      sources: [
        { label: 'EIP-1155: Multi Token Standard', url: 'https://eips.ethereum.org/EIPS/eip-1155' },
        { label: 'OpenZeppelin ERC1155 implementation', url: 'https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC1155/ERC1155.sol' },
        { label: 'ethereum.org — ERC-1155 Multi-Token Standard', url: 'https://ethereum.org/en/developers/docs/standards/tokens/erc-1155/' },
      ],
    },
    matchingPairs: [
      { term: 'ERC-1155', definition: 'One contract that manages many token types: fungible, non-fungible, or semi-fungible' },
      { term: 'token id', definition: 'A type within the contract; its total supply decides if it behaves fungibly or as an NFT' },
      { term: 'balanceOf(account, id)', definition: 'Returns how many of a specific token type an account holds' },
      { term: 'safeBatchTransferFrom()', definition: 'Moves a mix of token types and amounts in one atomic transaction' },
      { term: 'Semi-fungible token', definition: 'An asset that is interchangeable now but can become unique later (e.g. a ticket)' },
      { term: 'setApprovalForAll()', definition: 'A single approval covering every token id in the contract' },
    ],
    scenarioQuiz: [
      {
        id: 'erc1155_s1',
        question:
          'A game needs to airdrop a starter pack of 10 different item types to 5,000 players as cheaply as possible. Why is ERC-1155 a better fit than 10 separate ERC-721/20 contracts?',
        options: [
          'ERC-1155 makes the items free to mint',
          'A single ERC-1155 contract holds all item types and can send a mixed bundle in one batch transfer, avoiding per-contract deployment and per-item transactions',
          'ERC-1155 automatically markets the items',
          'ERC-721 cannot be airdropped',
        ],
        correct: 1,
        explanation:
          'ERC-1155 manages many token IDs in one contract and supports safeBatchTransferFrom, so a 10-item pack is one atomic transfer instead of ten. You also avoid deploying and approving ten separate contracts — exactly the inventory use case 1155 was built for.',
      },
      {
        id: 'erc1155_s2',
        question:
          'A ticketing platform wants 500 identical general-admission tickets that become unique collectibles after the event. Which property of ERC-1155 supports this?',
        options: [
          'It forbids fungible tokens',
          'It supports semi-fungible tokens — a token ID can be fungible (many identical) and later be treated as unique within one standard',
          'It requires a separate contract per ticket',
          'It only supports one token ID per contract',
        ],
        correct: 1,
        explanation:
          'ERC-1155 can represent semi-fungible assets: 500 interchangeable tickets under one ID, which can transition to unique collectibles. ERC-20/721 force a fungible-or-not choice per contract up front; 1155 does not.',
      },
      {
        id: 'erc1155_s3',
        question:
          'A team is launching a single one-of-one digital artwork and wants the widest possible marketplace and wallet support. Which standard is usually the safer default, and why?',
        options: [
          'ERC-1155, because it is newer',
          'ERC-721, because it is the established default for unique one-of-one collectibles and has the broadest tooling support',
          'ERC-20, because art is fungible',
          'It does not matter; all standards are identical',
        ],
        correct: 1,
        explanation:
          'For a single unique collectible, ERC-721 is the widely-supported default with the most mature NFT tooling. ERC-1155 shines for many token types and batch efficiency, but for one-of-one art, 721 maximizes compatibility.',
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────
  // ERC-6551 — Token-Bound Accounts
  // ───────────────────────────────────────────────────────────────────────
  proposals_erc_adv_l5: {
    summary:
      'An NFT can be owned, but it can’t own anything — a Bored Ape can’t hold its own tokens, wear its own accessories, or build a history. ERC-6551, proposed in 2023 by the Future Primitive team (Benny Giang and others, who also helped create CryptoKitties), gives every existing ERC-721 token its own smart-contract wallet. The NFT becomes an account that can hold tokens, other NFTs, and execute transactions — with zero changes to the original NFT contract. It turns flat collectibles into composable, on-chain identities: a character that carries its own inventory, reputation, and assets wherever it goes.',
    sources: [
      { label: 'ERC-6551: Non-fungible Token Bound Accounts', url: 'https://eips.ethereum.org/EIPS/eip-6551' },
      { label: 'tokenbound.org — reference & docs', url: 'https://tokenbound.org/' },
      { label: 'Reference implementation (erc6551)', url: 'https://github.com/erc6551/reference' },
    ],
    deepDive: {
      readingTime: '7 min',
      sections: [
        {
          heading: 'The NFT That Could Own Nothing',
          body:
            'ERC-721 made NFTs ownable, but an NFT itself is just an entry in a registry — it has no agency. It cannot hold a balance of tokens, cannot own a second NFT, cannot sign a transaction, cannot accumulate a record of what it has done. A game character minted as an NFT could not actually carry its own sword and potions; those items had to be tracked separately and re-associated by off-chain logic or bespoke contracts.\n\nProjects worked around this with custom "wrapper" or "vault" contracts, but each was one-off, incompatible with others, and often required minting a new NFT or migrating the asset. There was no standard way to say "this NFT is also an account."',
        },
        {
          heading: 'How It Works: A Registry and a Deterministic Account',
          body:
            'ERC-6551 introduces a singleton `Registry` contract with a `createAccount` function and, crucially, an `account` function that computes the address of a token’s account deterministically — using CREATE2 — from the NFT’s contract address and token ID. Because the address is deterministic, the account "exists" as an address before it is even deployed; you can send assets to it ahead of time, and deploy the account contract only when it first needs to act.\n\nEach token-bound account is itself a smart contract wallet that can hold ERC-20s, ERC-721s, and ERC-1155s, and can execute arbitrary calls. Authorization flows from ownership: whoever owns the NFT controls its bound account. The elegant part is that none of this requires modifying the original ERC-721 — it works with every NFT that already exists, including ones minted years ago.',
          lang: 'solidity',
          code:
            '// The registry derives a token’s account address deterministically (CREATE2)\ninterface IERC6551Registry {\n    function createAccount(\n        address implementation,\n        bytes32 salt,\n        uint256 chainId,\n        address tokenContract,   // the NFT collection\n        uint256 tokenId          // the specific NFT\n    ) external returns (address account);\n\n    function account(\n        address implementation,\n        bytes32 salt,\n        uint256 chainId,\n        address tokenContract,\n        uint256 tokenId\n    ) external view returns (address);\n}\n\n// The bound account is a wallet controlled by whoever owns the NFT\ninterface IERC6551Account {\n    function token() external view returns (uint256 chainId, address tokenContract, uint256 tokenId);\n    function execute(address to, uint256 value, bytes calldata data, uint8 operation)\n        external payable returns (bytes memory);\n}',
        },
        {
          heading: 'What Becomes Possible',
          body:
            'Once an NFT is an account, NFTs become composable. A game character can literally hold its own equipment as NFTs in its bound account; sell the character and the whole inventory transfers with it, atomically, because it all lives in the account the character controls. A profile-picture NFT can accumulate a portfolio, an on-chain history, and credentials — a portable identity. Membership NFTs can hold the perks and assets earned through membership.\n\nThe standard composes with the rest of the ecosystem rather than replacing it: the bound account holds standard ERC-20/721/1155 assets, so existing tooling still works. The main things to reason about are nesting (an account owning an NFT that has its own account) and the security model — control follows NFT ownership, so transferring the NFT hands over everything inside its account, which is powerful but demands care.',
        },
        {
          heading: 'Mental Model',
          body:
            'Think of an ordinary NFT as a name tag, and ERC-6551 as giving that name tag a backpack. The name tag still works exactly as before — same contract, same marketplaces — but now it carries a bag that can hold money, other items, and a logbook of where it has been. Whoever holds the name tag holds the backpack with it.\n\nFor a developer, the deterministic-address trick is the key idea: you can address and fund an NFT’s wallet before deploying it, and bolt accounts onto NFTs that already exist without touching their contracts. For an investor or collector, it reframes an NFT from a static picture into a container — its value can include everything its account holds and the history it accrues, which is why "NFTs as on-chain identity" became a serious thesis only after 6551.',
        },
      ],
      sources: [
        { label: 'ERC-6551: Non-fungible Token Bound Accounts', url: 'https://eips.ethereum.org/EIPS/eip-6551' },
        { label: 'tokenbound.org — reference & docs', url: 'https://tokenbound.org/' },
        { label: 'Reference implementation (erc6551)', url: 'https://github.com/erc6551/reference' },
      ],
    },
    matchingPairs: [
      { term: 'Token-bound account', definition: 'A smart-contract wallet owned by a specific NFT, able to hold and move assets' },
      { term: 'Registry', definition: 'Singleton contract that creates and derives the address of each NFT’s account' },
      { term: 'CREATE2 / deterministic address', definition: 'Lets an NFT’s account address be known (and funded) before it is deployed' },
      { term: 'Control follows ownership', definition: 'Whoever owns the NFT controls its bound account and everything inside it' },
      { term: 'No contract changes', definition: 'Works with every existing ERC-721 without modifying the original collection' },
      { term: 'execute()', definition: 'The bound account function that runs arbitrary transactions on the NFT’s behalf' },
    ],
    scenarioQuiz: [
      {
        id: 'erc6551_s1',
        question:
          'A studio wants game characters (ERC-721) to carry their own equipment NFTs, so selling a character transfers its whole inventory atomically. How does ERC-6551 enable this without re-minting the characters?',
        options: [
          'It modifies the ERC-721 contract to add an inventory field',
          'It gives each NFT a token-bound smart-account wallet that can hold other NFTs; transferring the character transfers control of that account',
          'It stores items in the buyer’s EOA',
          'It wraps each character in a new ERC-1155 token',
        ],
        correct: 1,
        explanation:
          'ERC-6551 attaches a smart-account wallet to each existing NFT via a registry — no changes to the original 721. The character’s gear lives in its bound account, and since control follows NFT ownership, selling the character hands over the whole inventory at once.',
      },
      {
        id: 'erc6551_s2',
        question:
          'A platform wants to send assets to an NFT’s account before deploying that account contract. Which design choice makes this possible?',
        options: [
          'Accounts are pre-funded by the registry owner',
          'The account address is computed deterministically (CREATE2) from the NFT’s contract and token id, so it exists as an address before deployment',
          'Ethereum reserves an address for every NFT at mint',
          'The NFT contract forwards funds automatically',
        ],
        correct: 1,
        explanation:
          'The registry derives each token’s account address deterministically with CREATE2. Because the address is known in advance, you can send assets to it and deploy the account contract lazily, only when it first needs to act.',
      },
      {
        id: 'erc6551_s3',
        question:
          'A collector asks what security property they must keep in mind for an NFT with a token-bound account holding $10k of tokens. What is the key point?',
        options: [
          'The account is frozen unless re-deployed',
          'Control follows NFT ownership — transferring or selling the NFT hands over everything in its bound account, so the NFT itself now carries that value',
          'Only the registry can move the account’s funds',
          'The tokens are locked permanently inside the account',
        ],
        correct: 1,
        explanation:
          'Authorization flows from ownership of the NFT. Whoever holds the NFT controls its account, so transferring the NFT transfers all assets inside it. That is the power of 6551 — and the risk to reason about before trading such an NFT.',
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────
  // EIP-4844 — Proto-Danksharding and Blobs
  // ───────────────────────────────────────────────────────────────────────
  proposals_eip_adv_l3: {
    summary:
      'Layer-2 rollups make Ethereum cheap by executing transactions off-chain and posting compressed data back to L1 — but before 2024, that data competed for the same expensive block space as everything else, so rollup fees stayed stubbornly high. EIP-4844, shipped in the Dencun upgrade in March 2024, introduced "blobs": a new, separate, temporary data lane priced by its own fee market. Rollups post their data as blobs that are guaranteed available for ~18 days and then pruned. The result was immediate and dramatic — L2 transaction fees on networks like Base, Arbitrum, and Optimism dropped by roughly 10x or more overnight.',
    sources: [
      { label: 'EIP-4844: Shard Blob Transactions', url: 'https://eips.ethereum.org/EIPS/eip-4844' },
      { label: 'ethereum.org — Danksharding', url: 'https://ethereum.org/en/roadmap/danksharding/' },
      { label: 'proto-danksharding FAQ (notes.ethereum.org)', url: 'https://notes.ethereum.org/@vbuterin/proto_danksharding_faq' },
    ],
    deepDive: {
      readingTime: '8 min',
      sections: [
        {
          heading: 'Why Rollups Were Still Expensive',
          body:
            'Rollups scale Ethereum by doing computation off-chain and posting the resulting transaction data to L1, where it can be verified and, if needed, used to reconstruct state. That posted data is the rollup’s single largest cost. The problem before 4844: rollups wrote their data into regular transaction `calldata`, which lives in blocks permanently and competes directly with every swap, mint, and transfer for the same scarce gas.\n\nSo even though rollups removed execution costs, they inherited Ethereum’s data costs at the worst possible price — paying for permanent storage of data that only needs to be available briefly (long enough for anyone to challenge or reconstruct it). When mainnet was busy, L2 fees spiked right along with it, undercutting the whole promise of cheap rollups.',
        },
        {
          heading: 'How It Works: A Separate Blob Lane',
          body:
            'EIP-4844, a stepping stone toward full "Danksharding," added a new transaction type that carries `blobs` — large packets of data (~128 KB each, up to a target of 3 and max of 6 per block) attached to a block but stored separately from normal execution data.\n\nThree design choices make blobs cheap. First, they are temporary: consensus nodes keep blob data for roughly 18 days (4096 epochs) and then prune it, because data only needs to be available long enough to guarantee rollup safety — not forever. Second, the EVM cannot read blob contents directly; it only sees a cryptographic commitment (a KZG commitment) to the blob, which keeps blobs from bloating execution state. Third, and most important, blobs have their own independent fee market with its own `blob_base_fee` that adjusts up and down based on blob demand. Because blob space does not compete with regular gas, a quiet blob market stays cheap even when execution gas is expensive.',
          lang: 'solidity',
          code:
            '// EIP-4844 adds opcodes so contracts can work with blob data + fees:\n//\n//   BLOBHASH(index)  -> the versioned KZG hash of the blob at `index`\n//   block.blobbasefee -> the current blob base fee (Solidity >= 0.8.24)\n//\n// A rollup’s verifier references the blob by its hash, NOT its contents:\ncontract RollupInbox {\n    function submitBatch(uint256 blobIndex) external {\n        bytes32 blobCommitment = blobhash(blobIndex); // versioned hash\n        require(blobCommitment != bytes32(0), "no blob at index");\n        // store the commitment; the data itself lives in the temporary blob lane\n        // ...verification / fraud-proof logic references this commitment...\n    }\n\n    function currentBlobFee() external view returns (uint256) {\n        return block.blobbasefee;\n    }\n}',
        },
        {
          heading: 'The Impact and the Roadmap',
          body:
            'The effect of Dencun (March 2024) was immediate and visible: L2 fees on Base, Arbitrum, Optimism, zkSync and others fell by roughly an order of magnitude, with many transactions dropping from tens of cents to fractions of a cent. For the first time, "Ethereum-secured but pennies to use" was real at scale.\n\n4844 is explicitly a first step. It implements the transaction format, fee market, and KZG machinery of full Danksharding, but with a modest blob count and with every node still downloading every blob. Full Danksharding aims to scale blob capacity far higher using data availability sampling, where nodes verify data is available without each downloading all of it. The blob fee market also means L2 costs are now elastic: as more rollups compete for blob space, the blob base fee can rise, which is why continued capacity increases (more blobs per block) remain on the roadmap.',
        },
        {
          heading: 'Mental Model',
          body:
            'Picture Ethereum’s block as having two compartments. The first is the permanent filing cabinet — execution state and calldata, kept forever, priced by the regular gas market. The second, added by 4844, is a temporary loading dock — blobs — where bulky packages sit for about 18 days and are then cleared out, priced by their own separate meter.\n\nRollups don’t need their data in the permanent cabinet; they only need it on the dock long enough for anyone to verify or reconstruct it. By moving rollup data to the cheap, self-priced, short-lived dock, 4844 decoupled L2 costs from mainnet congestion. For a developer building an L2-native app, this is why your users’ fees collapsed and why you reference blob data by commitment, not contents. For an investor, it reframes Ethereum’s scaling thesis: the base layer increasingly sells cheap, temporary data availability to a fleet of rollups, and blob capacity is the dial that sets how cheap that gets.',
        },
      ],
      sources: [
        { label: 'EIP-4844: Shard Blob Transactions', url: 'https://eips.ethereum.org/EIPS/eip-4844' },
        { label: 'ethereum.org — Danksharding', url: 'https://ethereum.org/en/roadmap/danksharding/' },
        { label: 'proto-danksharding FAQ (notes.ethereum.org)', url: 'https://notes.ethereum.org/@vbuterin/proto_danksharding_faq' },
        { label: 'l2fees.info — live L2 fee comparison', url: 'https://l2fees.info/' },
      ],
    },
    matchingPairs: [
      { term: 'Blob', definition: 'A ~128 KB packet of data attached to a block but stored separately and temporarily' },
      { term: 'blob_base_fee', definition: 'The blob lane’s own fee, independent of regular execution gas' },
      { term: '~18-day pruning', definition: 'Blobs are kept ~4096 epochs then deleted — data only needs short-term availability' },
      { term: 'KZG commitment', definition: 'A cryptographic commitment the EVM sees instead of the blob’s raw contents' },
      { term: 'BLOBHASH opcode', definition: 'Lets a contract reference a blob by its versioned hash, not its data' },
      { term: 'Proto-danksharding', definition: 'The first step toward full Danksharding — same format, modest capacity' },
    ],
    scenarioQuiz: [
      {
        id: 'eip4844_s1',
        question:
          'After Dencun, an L2 team sees their users’ fees fall ~10x even though mainnet execution gas is unchanged. What did EIP-4844 change to cause this?',
        options: [
          'It made calldata free for rollups',
          'It moved rollup data into blobs — a separate, temporary data lane with its own fee market that does not compete with execution gas',
          'It doubled the block gas limit',
          'It removed the need for rollups to post any data',
        ],
        correct: 1,
        explanation:
          'Blobs give rollup data its own lane and its own blob_base_fee, decoupled from execution gas. Because blob space does not compete with swaps and transfers, it stays cheap, so L2 fees dropped dramatically without changing the regular gas market.',
      },
      {
        id: 'eip4844_s2',
        question:
          'Why is it acceptable that blob data is pruned by nodes after roughly 18 days, when normal calldata is stored permanently?',
        options: [
          'Blob data is encrypted so it can be deleted safely',
          'Rollup data only needs to be available long enough for anyone to verify or reconstruct state and raise challenges; permanent storage is unnecessary and wasteful',
          'Nodes back up blobs to a central server first',
          'Blobs are recreated automatically when needed',
        ],
        correct: 1,
        explanation:
          'Rollups need data availability for a bounded window — long enough to verify, challenge, or reconstruct. After that the data is no longer needed on-chain, so pruning blobs after ~18 days makes them far cheaper than permanently-stored calldata.',
      },
      {
        id: 'eip4844_s3',
        question:
          'A contract needs to verify a rollup batch references real blob data. Why does it use the BLOBHASH opcode rather than reading the blob contents directly?',
        options: [
          'BLOBHASH is cheaper than reading a storage slot',
          'The EVM cannot read blob contents at all; it only sees the blob’s KZG commitment (versioned hash), which keeps blobs out of execution state',
          'Blob contents are encrypted with the validator’s key',
          'Reading blob contents would delete them',
        ],
        correct: 1,
        explanation:
          'By design the EVM never sees raw blob data — only its versioned KZG commitment via BLOBHASH. This keeps the large blob payloads from bloating execution state while still letting contracts cryptographically reference the data a rollup posted.',
      },
    ],
  },
};

export default enrichment;
