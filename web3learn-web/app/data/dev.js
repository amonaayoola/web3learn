const dev = {
  id: 'dev',
  title: 'Web3 Development',
  emoji: '💻',
  color: '#8B5CF6',
  gradient: ['#6D28D9', '#8B5CF6'],
  description: 'Build smart contracts, DApps, and full Web3 products from scratch with Solidity and modern tooling.',
  category: 'Engineering',
  modules: [

    // ─── BEGINNER ────────────────────────────────────────────────────────────
    {
      id: 'dev_beg',
      level: 'beginner',
      title: 'Smart Contracts 101',
      emoji: '📝',
      description: 'Write, deploy, and interact with your first Ethereum smart contract — no prior blockchain experience needed.',
      color: '#8B5CF6',
      lessons: [
        {
          id: 'dev_beg_l1',
          title: 'What Are Smart Contracts?',
          slides: [
            { type: 'intro', title: 'Code That Runs Itself', body: 'Smart contracts are programs stored on the blockchain that execute automatically when predefined conditions are met. No lawyer, no bank, no middleman. Once deployed, the code runs exactly as written — immutable, transparent, and unstoppable.' },
            { type: 'text', title: 'The Vending Machine Analogy', body: 'Nick Szabo coined "smart contract" in 1994 using the vending machine analogy: insert money (condition), get product (automatic execution). No negotiation, no human discretion. Smart contracts apply this to any arbitrary logic: DeFi lending, NFT minting, DAO voting, escrow, insurance.' },
            { type: 'text', title: 'What Smart Contracts CAN\'T Do', body: 'Smart contracts can\'t natively access off-chain data (stock prices, weather, sports results). They need "oracles" — trusted external data feeds — for real-world data. Chainlink is the dominant oracle network, securing over $75B in value across 1,500+ projects. This is a critical limitation to understand.' },
            { type: 'highlight', title: 'EVM: Where Contracts Live', body: 'Ethereum smart contracts run on the Ethereum Virtual Machine — a sandboxed runtime that executes identically on every node. The EVM is Turing-complete: it can compute anything a regular computer can. Contracts are written in Solidity, compiled to EVM bytecode, and deployed on-chain.' },
            { type: 'text', title: 'The $100B Code Base', body: 'DeFi smart contracts hold over $100B in user assets. The top protocols — Uniswap, Aave, MakerDAO, Compound — are all smart contracts. Uniswap v2 is about 500 lines of Solidity. Its contracts have processed trillions in trading volume. The code-to-impact ratio is extraordinary.' },
            { type: 'summary', title: 'Lesson Complete! +20 XP', body: 'Smart contracts are self-executing programs on the blockchain. They\'re immutable, transparent, and trustless. Their limitation: no native off-chain data access. Their power: holding and moving $100B+ in value through 500 lines of code.' },
          ],
        },
        {
          id: 'dev_beg_l2',
          title: 'Solidity Basics',
          slides: [
            { type: 'intro', title: 'The Language of Smart Contracts', body: 'Solidity is a statically-typed, contract-oriented programming language designed for the EVM. It looks like JavaScript/C++ but has unique blockchain-specific features. First released in 2014, it\'s now the most widely used smart contract language.' },
            { type: 'text', title: 'Your First Contract', body: 'pragma solidity ^0.8.0;\n\ncontract HelloWorld {\n  string public greeting;\n  \n  constructor() {\n    greeting = "Hello, Web3!";\n  }\n  \n  function setGreeting(string memory _greeting) public {\n    greeting = _greeting;\n  }\n}\n\nThis contract stores a greeting string, initializes it in the constructor, and exposes a function to update it.' },
            { type: 'text', title: 'Data Types', body: 'uint256: unsigned integer, 0 to 2^256-1. address: 20-byte Ethereum address. bool: true/false. string: dynamic text. bytes32: fixed 32-byte data. mapping(key => value): like a hash map. These are the types you\'ll use in 90% of contracts. Solidity uses strong typing — incompatible types won\'t compile.' },
            { type: 'highlight', title: 'State vs Memory vs Calldata', body: 'Storage: persistent on-chain — expensive. Memory: temporary during function execution — cheap. Calldata: read-only function arguments — cheapest. Getting this wrong wastes gas. Rule: use calldata for external function parameters when you\'re not modifying the data, memory for arrays you create inside functions, storage for anything that persists.' },
            { type: 'text', title: 'Functions and Visibility', body: 'public: callable by anyone. private: only this contract. internal: this contract and inherited contracts. external: only callable from outside (cheaper for large arguments). pure: no state read or write. view: reads state but doesn\'t write. payable: can receive ETH. These modifiers are not optional safety features — they\'re how you define your contract\'s interface and protect its internals.' },
            { type: 'summary', title: 'Lesson Complete! +20 XP', body: 'Solidity is strongly-typed with blockchain-specific primitives. Storage/memory/calldata data location is a gas optimization decision. Visibility modifiers define your contract\'s security surface.' },
          ],
        },
        {
          id: 'dev_beg_l3',
          title: 'Development Environment Setup',
          slides: [
            { type: 'intro', title: 'The Modern Web3 Stack', body: 'Professional Solidity development uses Hardhat or Foundry for compilation, testing, and deployment. The local development workflow lets you test contracts instantly with a local blockchain before spending real money on testnet or mainnet.' },
            { type: 'text', title: 'Hardhat Setup', body: 'mkdir my-contract && cd my-contract\nnpm init -y\nnpm install --save-dev hardhat\nnpx hardhat init\n\nChoose "Create a JavaScript project." This scaffolds a full project with sample contract, test, and deployment script. Run "npx hardhat compile" to compile. "npx hardhat test" to run tests.' },
            { type: 'text', title: 'Foundry: The Alternative', body: 'Foundry (by Paradigm) is a Rust-based toolchain that\'s faster and more gas-focused than Hardhat. Tests are written in Solidity itself (not JS). forge build, forge test, forge deploy. Foundry is becoming the professional standard for serious contracts. Learning both is ideal.' },
            { type: 'highlight', title: 'Remix: Start Here', body: 'Remix (remix.ethereum.org) is a browser-based IDE — zero setup required. Perfect for learning: paste Solidity, click Compile, deploy to an in-browser JavaScript VM, interact with functions instantly. All the top security auditors started on Remix. Use it until you outgrow it.' },
            { type: 'text', title: 'Testnets: Free ETH for Testing', body: 'Sepolia and Goerli are Ethereum testnets — identical to mainnet but with worthless test ETH from faucets. Always test on testnets before mainnet. Get free Sepolia ETH from sepoliafaucet.com. Deploying to testnet costs test ETH; deploying to mainnet costs real ETH (can range from $5 to $500+ depending on gas prices).' },
            { type: 'summary', title: 'Lesson Complete! +20 XP', body: 'Start with Remix for learning, graduate to Hardhat/Foundry for production. Always test on Sepolia testnet before mainnet deployment. The local → testnet → mainnet progression protects against expensive mistakes.' },
          ],
        },
        {
          id: 'dev_beg_l4',
          title: 'Token Standards: ERC-20',
          slides: [
            { type: 'intro', title: 'The Standard That Created DeFi', body: 'ERC-20 is a token standard proposed by Fabian Vogelsteller in 2015. It defines a common interface that all fungible tokens implement, enabling any wallet, exchange, or DApp to work with any ERC-20 token without custom integration.' },
            { type: 'text', title: 'The 6 Required Functions', body: 'totalSupply(): total token supply. balanceOf(address): balance of an address. transfer(to, amount): send tokens. approve(spender, amount): allow spender to move your tokens. allowance(owner, spender): check approved amount. transferFrom(from, to, amount): move tokens using allowance. These 6 functions power the entire ERC-20 ecosystem.' },
            { type: 'text', title: 'Implementing with OpenZeppelin', body: 'import "@openzeppelin/contracts/token/ERC20/ERC20.sol";\n\ncontract MyToken is ERC20 {\n  constructor() ERC20("MyToken", "MTK") {\n    _mint(msg.sender, 1_000_000 * 10**18);\n  }\n}\n\nOpenZeppelin is battle-tested, audited, and used by billions of dollars of protocols. Never write ERC-20 from scratch.' },
            { type: 'highlight', title: 'Decimals: The Gotcha', body: 'ETH has 18 decimals: 1 ETH = 1,000,000,000,000,000,000 wei. ERC-20 tokens also use 18 by default. This means if you want to send 1 token, you actually pass 1 * 10^18 to transfer(). Forgetting decimals is one of the most common beginner mistakes and can destroy user funds.' },
            { type: 'text', title: 'Real Examples', body: 'USDC (Circle): ERC-20 on Ethereum. Stablecoin pegged to USD. $30B+ in circulation. Aave\'s aTokens: ERC-20 tokens that represent deposits and automatically accrue interest. Uniswap\'s UNI governance token: ERC-20. Every major DeFi protocol is built on ERC-20 tokens interacting with each other.' },
            { type: 'summary', title: 'Lesson Complete! +20 XP', body: 'ERC-20\'s 6-function interface enables composability across all of DeFi. Always use OpenZeppelin\'s battle-tested implementation. Never forget the 18-decimal math — it\'s a common source of catastrophic bugs.' },
          ],
        },
        {
          id: 'dev_beg_l5',
          title: 'Deploying Your First Contract',
          slides: [
            { type: 'intro', title: 'From Code to Blockchain', body: 'Deploying a contract is a one-time transaction that stores bytecode permanently on-chain and assigns it an address. From that address, anyone in the world can call your contract\'s public functions. Let\'s walk through the full process.' },
            { type: 'text', title: 'The Deployment Script', body: 'In Hardhat:\n\nasync function main() {\n  const Token = await ethers.getContractFactory("MyToken");\n  const token = await Token.deploy();\n  await token.deployed();\n  console.log("Token deployed to:", token.address);\n}\n\nmain().catch(console.error);\n\nRun: npx hardhat run scripts/deploy.js --network sepolia' },
            { type: 'text', title: 'What Happens During Deployment', body: 'Your wallet signs a transaction with no "to" address (indicating contract creation). The EVM processes the constructor bytecode. The contract\'s runtime bytecode is stored at a new address derived from your wallet address and nonce. You pay gas for every byte of bytecode stored — typically $20-$500 on mainnet.' },
            { type: 'highlight', title: 'Verifying on Etherscan', body: 'After deployment, verify your contract on Etherscan so users can read the source code and interact with functions through the browser UI. Use the Hardhat Etherscan plugin or Foundry\'s forge verify-contract. Unverified contracts are a red flag — professional protocols always verify.' },
            { type: 'text', title: 'Interacting with Your Contract', body: 'Once deployed, interact via ethers.js:\n\nconst token = await ethers.getContractAt("MyToken", contractAddress);\nconst balance = await token.balanceOf(yourAddress);\nconsole.log("Balance:", ethers.formatUnits(balance, 18));\nawait token.transfer(recipientAddress, ethers.parseUnits("100", 18));\n\nOr use Hardhat console: npx hardhat console --network sepolia' },
            { type: 'summary', title: 'Module Complete! +20 XP', body: 'Deployment is a one-time transaction that permanently publishes bytecode. Always verify source code on Etherscan. Use ethers.js to interact programmatically. Your first deployed contract on Sepolia is a real milestone — do it today.' },
          ],
        },
      ],
      quiz: [
        { id: 'dev_beg_q1', question: 'What prevents smart contracts from accessing real-world data like stock prices?', options: ['Smart contracts are too slow', 'The blockchain is isolated from the internet — contracts need oracles (like Chainlink) as trusted external data feeds', 'Solidity doesn\'t support external calls', 'It\'s blocked by Ethereum\'s protocol rules'], correct: 1, explanation: 'Smart contracts are deterministic and isolated — they can only access on-chain data. Oracles like Chainlink are external services that fetch off-chain data and post it on-chain, where contracts can read it.' },
        { id: 'dev_beg_q2', question: 'In Solidity, which data location is most expensive for gas?', options: ['calldata', 'memory', 'storage', 'stack'], correct: 2, explanation: 'Storage persists on-chain indefinitely. Writing to storage costs 20,000 gas for a new slot (SSTORE). Memory is temporary and much cheaper. Calldata is read-only input data — the cheapest of all. Use storage only when you need data to persist between transactions.' },
        { id: 'dev_beg_q3', question: 'What is the purpose of the OpenZeppelin library in Solidity development?', options: ['A testing framework for smart contracts', 'A battle-tested, audited library of secure smart contract implementations — use it instead of writing from scratch', 'A deployment tool for mainnet', 'A frontend library for Web3 apps'], correct: 1, explanation: 'OpenZeppelin provides audited implementations of ERC-20, ERC-721, access control, and more. Billions of dollars rely on OpenZeppelin contracts. Always inherit from their implementations rather than writing standard token logic from scratch.' },
        { id: 'dev_beg_q4', question: 'If an ERC-20 token has 18 decimals and you want to transfer 5 tokens, what value do you pass to transfer()?', options: ['5', '50', '5000000000000000000 (5 × 10^18)', '5.18'], correct: 2, explanation: 'ERC-20 tokens store values as integers without decimal points. "1 token" is represented as 1 × 10^18 in the contract. To transfer 5 tokens: 5 × 10^18 = 5000000000000000000. Use ethers.parseUnits("5", 18) in ethers.js to handle this correctly.' },
        { id: 'dev_beg_q5', question: 'Why should you always verify your smart contract on Etherscan?', options: ['It\'s required by Ethereum protocol', 'It reduces gas costs', 'So users can read the source code, audit functions, and interact through the browser — unverified contracts are a red flag for legitimacy', 'It enables automatic bug fixes'], correct: 2, explanation: 'Verification publishes your Solidity source to Etherscan, where anyone can audit it. Legitimate protocols always verify. Unverified contracts prevent community security review and signal potential malicious intent.' },
      ],
    },

    // ─── INTERMEDIATE ─────────────────────────────────────────────────────────
    {
      id: 'dev_int',
      level: 'intermediate',
      title: 'DApp Development',
      emoji: '🌐',
      description: 'Build full-stack decentralized applications with React, ethers.js, and MetaMask integration.',
      color: '#8B5CF6',
      lessons: [
        {
          id: 'dev_int_l1',
          title: 'The Web3 Frontend Stack',
          slides: [
            { type: 'intro', title: 'From Smart Contract to User Interface', body: 'A DApp is a smart contract with a user-friendly frontend. The blockchain is your backend — always on, censorship-resistant, globally accessible. The frontend is how users interact with it. Building great DApp UX is what separates protocols people use from ones they abandon.' },
            { type: 'text', title: 'Core Libraries', body: 'ethers.js: the most popular JS library for interacting with Ethereum. Connects wallets, calls contracts, formats values. web3.js: older alternative, still widely used. viem: modern, TypeScript-first, increasingly popular. wagmi: React hooks wrapper over viem/ethers — the modern choice for React DApps. RainbowKit: pre-built wallet connection UI built on wagmi.' },
            { type: 'text', title: 'Connecting MetaMask', body: 'const provider = new ethers.BrowserProvider(window.ethereum);\nawait provider.send("eth_requestAccounts", []);\nconst signer = await provider.getSigner();\nconst address = await signer.getAddress();\n\nwindow.ethereum is injected by MetaMask. BrowserProvider wraps it in ethers.js. getSigner() gets the connected wallet to sign transactions.' },
            { type: 'highlight', title: 'Reading Contract State', body: 'const contract = new ethers.Contract(contractAddress, abi, provider);\nconst balance = await contract.balanceOf(userAddress);\nconst formatted = ethers.formatUnits(balance, 18);\n\nThe ABI (Application Binary Interface) is a JSON description of your contract\'s functions and events — it\'s how ethers.js knows how to encode/decode calls.' },
            { type: 'text', title: 'Writing Transactions', body: 'const contract = new ethers.Contract(contractAddress, abi, signer);\nconst tx = await contract.transfer(recipientAddress, ethers.parseUnits("100", 18));\nawait tx.wait(); // wait for 1 confirmation\nconsole.log("Transaction confirmed:", tx.hash);\n\nNote: reads (view/pure functions) use provider; writes (state changes) need a signer and cost gas.' },
            { type: 'summary', title: 'Lesson Complete! +20 XP', body: 'The DApp stack: smart contract backend + React frontend + ethers.js/wagmi bridge + MetaMask wallet. Reads use provider; writes use signer. The ABI is the contract\'s interface description.' },
          ],
        },
        {
          id: 'dev_int_l2',
          title: 'Events and The Graph',
          slides: [
            { type: 'intro', title: 'Querying Blockchain History', body: 'Smart contracts emit "events" when things happen — token transfers, price updates, votes. Querying historical events directly from a node is slow and expensive at scale. The Graph Protocol solves this by indexing blockchain events into a queryable GraphQL API.' },
            { type: 'text', title: 'Defining Events', body: 'In Solidity:\nevent Transfer(address indexed from, address indexed to, uint256 amount);\n\nThe indexed keyword allows filtering by that parameter. Emitting: emit Transfer(msg.sender, recipient, amount);\n\nERC-20\'s Transfer and Approval events are the foundation of all DeFi frontends — every balance update you see is read from on-chain events.' },
            { type: 'text', title: 'Querying Events with ethers.js', body: 'const filter = contract.filters.Transfer(null, userAddress);\nconst events = await contract.queryFilter(filter, -1000, "latest");\n// Gets last 1000 blocks of transfers to userAddress\nevents.forEach(e => {\n  console.log(`Received ${ethers.formatUnits(e.args.amount, 18)} tokens`);\n});\n\nFor production, querying all events from block 0 is too slow. Use The Graph instead.' },
            { type: 'highlight', title: 'The Graph Protocol', body: 'The Graph indexes blockchain events and exposes them via GraphQL. Create a "subgraph" that defines what events to index and how to map them. Deploy to The Graph\'s decentralized network. Query with standard GraphQL. Uniswap, Aave, and Compound all serve their analytics data through The Graph — it\'s the standard data layer for DeFi.' },
            { type: 'text', title: 'Writing a Subgraph', body: 'schema.graphql defines your data models. mappings.ts defines event handlers that transform raw events into your schema entities. The Graph CLI: graph init, graph codegen, graph build, graph deploy. Once deployed, query: { transfers(where: { to: "0x..." }) { amount, from, blockTimestamp } }' },
            { type: 'summary', title: 'Lesson Complete! +20 XP', body: 'Solidity events are the logging system of smart contracts. ethers.js can query recent events; The Graph indexes all history into GraphQL. Production DApps should always use The Graph for historical data — never queryFilter over large block ranges.' },
          ],
        },
        {
          id: 'dev_int_l3',
          title: 'Testing Smart Contracts',
          slides: [
            { type: 'intro', title: 'Code That Holds Money Needs Tests', body: 'A bug in a smart contract can be catastrophic and irreversible. The DAO hack ($60M, 2016), Parity wallet bug ($300M frozen), and dozens of DeFi exploits all resulted from untested edge cases. Comprehensive testing is not optional — it\'s professional responsibility.' },
            { type: 'text', title: 'Hardhat Tests with ethers.js', body: 'describe("MyToken", function() {\n  it("Should mint tokens to deployer", async function() {\n    const [owner] = await ethers.getSigners();\n    const Token = await ethers.getContractFactory("MyToken");\n    const token = await Token.deploy();\n    const balance = await token.balanceOf(owner.address);\n    expect(balance).to.equal(ethers.parseUnits("1000000", 18));\n  });\n});\n\nRun: npx hardhat test' },
            { type: 'text', title: 'Foundry Tests', body: 'Tests in Foundry are Solidity contracts:\n\ncontract MyTokenTest is Test {\n  MyToken token;\n  function setUp() public { token = new MyToken(); }\n  function test_InitialSupply() public {\n    assertEq(token.balanceOf(address(this)), 1_000_000e18);\n  }\n  function testFuzz_Transfer(uint256 amount) public {\n    vm.assume(amount <= 1_000_000e18);\n    token.transfer(address(1), amount);\n    assertEq(token.balanceOf(address(1)), amount);\n  }\n}' },
            { type: 'highlight', title: 'Fuzz Testing', body: 'Foundry\'s built-in fuzzer automatically generates random inputs and tries to break your invariants. testFuzz_ prefix triggers it. It\'ll run thousands of random inputs, finding edge cases you\'d never think of manually. For critical contracts, fuzz testing catches bugs that manual testing misses.' },
            { type: 'text', title: 'Coverage and Invariants', body: 'forge coverage shows what % of your contract code is covered by tests. Aim for 100% line coverage on security-critical contracts. Invariant testing (Foundry) defines properties that must always hold — e.g., "total supply always equals sum of all balances." The fuzzer runs thousands of transactions trying to violate the invariant.' },
            { type: 'summary', title: 'Lesson Complete! +20 XP', body: 'Untested smart contracts hold money at risk. Write unit tests for every function, edge case, and failure mode. Foundry\'s fuzzing auto-discovers edge cases. Invariant tests define properties that must always hold. 100% coverage is the target.' },
          ],
        },
        {
          id: 'dev_int_l4',
          title: 'DeFi Primitives in Code',
          slides: [
            { type: 'intro', title: 'Building Blocks of DeFi', body: 'AMMs, lending protocols, and stablecoins all build on the same underlying smart contract patterns. Understanding these patterns lets you read any DeFi protocol\'s code, audit for bugs, and compose protocols in novel ways.' },
            { type: 'text', title: 'AMM: Constant Product Formula', body: 'Uniswap v2 AMM in its simplest form: x * y = k. If a pool has 100 ETH and 200,000 USDC (k=20,000,000), buying 10 ETH: new ETH reserve = 90, new USDC reserve = k/90 = 222,222. You paid 22,222 USDC for 10 ETH. Price impact = the difference from the "naive" price of 2,000 USDC/ETH.' },
            { type: 'text', title: 'Flash Loans', body: 'Flash loans are uncollateralized loans that must be borrowed and repaid within a single transaction. If not repaid, the transaction reverts as if it never happened. Use cases: arbitrage (borrow $10M, execute trades, repay, keep profit), liquidations, collateral swaps. Aave offers flash loans with a 0.09% fee. They\'re only possible because of atomic transactions.' },
            { type: 'highlight', title: 'Reentrancy: The Most Dangerous Bug', body: 'The DAO hack used reentrancy: a malicious contract calls your withdraw() function. Before balance updates, it calls back into withdraw() again — draining funds in a loop. Fix: use the Checks-Effects-Interactions pattern (update state BEFORE external calls) or the ReentrancyGuard from OpenZeppelin. Never make external calls before updating state.' },
            { type: 'text', title: 'Access Control Patterns', body: 'OpenZeppelin\'s Ownable: single owner with ownership transfer. AccessControl: role-based (ADMIN_ROLE, MINTER_ROLE, PAUSER_ROLE). Multisig: require multiple signatures (Gnosis Safe). Timelock: delay all admin actions by 48-72 hours (gives users time to exit if they disagree with changes). Production protocols use 2-of-3 multisig + 48-hour timelock minimum.' },
            { type: 'summary', title: 'Lesson Complete! +20 XP', body: 'AMM math, flash loans, reentrancy protection, and access control are the fundamental DeFi code patterns. Reentrancy is the most dangerous bug — always update state before external calls. Production protocols use multisig + timelock.' },
          ],
        },
        {
          id: 'dev_int_l5',
          title: 'Gas Optimization',
          slides: [
            { type: 'intro', title: 'Every Byte Costs Money', body: 'On Ethereum, computation costs gas. A poorly optimized contract can cost users 10-50x more than an optimized one. At scale, gas optimization directly translates to user adoption vs. abandonment.' },
            { type: 'text', title: 'Storage is the Expensive Operation', body: 'SSTORE (write to storage): 20,000 gas for a new slot, 2,900 to update. SLOAD (read from storage): 2,100 gas. ADD (addition): 3 gas. Implication: if you can replace a storage read with arithmetic, always do. Pack multiple values into a single storage slot using bit manipulation. OpenZeppelin\'s ERC-20 is carefully optimized for this.' },
            { type: 'text', title: 'Packing and uint256', body: 'Solidity packs adjacent storage variables that fit into 32 bytes into a single slot. uint128 a; uint128 b; = 1 storage slot. uint256 a; uint256 b; = 2 slots. But: reading a uint128 costs the same as reading a uint256 (you still read the full slot). Packing saves storage, but don\'t assume it saves gas on reads — test it.' },
            { type: 'highlight', title: 'calldata vs memory', body: 'For external functions that don\'t modify string/array parameters:\nfunction process(string calldata data) external  // cheaper than:\nfunction process(string memory data) external\n\ncalldata doesn\'t copy data — it reads directly from transaction input. Saves gas proportional to data size. For large arrays, this can be 50%+ cheaper.' },
            { type: 'text', title: 'Profiling with Hardhat Gas Reporter', body: 'npm install --save-dev hardhat-gas-reporter\nIn hardhat.config.js: gasReporter: { enabled: true, currency: "USD", gasPrice: 30 }\n\nRun tests and see a table showing gas costs for each function. Foundry: forge test --gas-report. Profile first, optimize second. Never optimize blindly — measure the actual savings.' },
            { type: 'summary', title: 'Module Complete! +20 XP', body: 'Storage operations dominate gas costs. Pack variables into slots. Use calldata for unmodified array/string parameters. Profile with gas reporter before and after optimizations. 10x gas savings are achievable with disciplined optimization.' },
          ],
        },
      ],
      quiz: [
        { id: 'dev_int_q1', question: 'What is the ABI (Application Binary Interface) in the context of ethers.js?', options: ['A security standard for smart contracts', 'A JSON description of a contract\'s functions and events that ethers.js uses to encode/decode calls', 'A type of smart contract storage', 'An alternative to the EVM'], correct: 1, explanation: 'The ABI tells ethers.js how to encode function calls and decode return values for a specific contract. Without the ABI, your code doesn\'t know what functions exist or what types their parameters are.' },
        { id: 'dev_int_q2', question: 'What is a flash loan\'s key constraint?', options: ['Maximum loan amount of 1 ETH', 'Must be repaid within 24 hours', 'Must be borrowed and repaid within a single transaction — if not repaid, the entire transaction reverts', 'Requires collateral of 150%'], correct: 2, explanation: 'Flash loans leverage Ethereum\'s atomicity. If you don\'t repay the loan (plus fee) before the transaction ends, the entire transaction reverts — including the borrow. This makes flash loans effectively risk-free for the protocol.' },
        { id: 'dev_int_q3', question: 'What is the Checks-Effects-Interactions pattern?', options: ['A UI design pattern for DApps', 'Always update state (effects) BEFORE making external calls (interactions) — prevents reentrancy attacks', 'A testing methodology for smart contracts', 'A gas optimization technique'], correct: 1, explanation: 'The DAO hack exploited that balances weren\'t updated before external calls, allowing recursive withdrawals. CEI pattern: first check conditions, then update state, then make external calls. OpenZeppelin\'s ReentrancyGuard enforces this mechanically.' },
        { id: 'dev_int_q4', question: 'The Graph Protocol is used for what purpose in DApp development?', options: ['Generating smart contract ABIs', 'Indexing blockchain events into a GraphQL API for efficient historical data queries', 'Optimizing gas costs', 'Testing contracts before deployment'], correct: 1, explanation: 'The Graph indexes on-chain events and exposes them via GraphQL subgraphs. This is how Uniswap, Aave, and all major DeFi protocols serve analytics and historical data without querying every node directly — which would be impossibly slow at scale.' },
        { id: 'dev_int_q5', question: 'Why is using `calldata` instead of `memory` for external function parameters sometimes more efficient?', options: ['calldata is stored permanently, reducing re-computation', 'calldata reads directly from transaction input without copying — saving gas proportional to data size, especially for large arrays', 'calldata parameters can be modified during execution', 'calldata has a higher gas limit'], correct: 1, explanation: 'memory copies the data into a new allocation during execution. calldata reads the raw transaction input directly. For large strings or arrays in external (not internal) functions, calldata can save 50%+ in gas costs.' },
      ],
    },

    // ─── EXPERT ───────────────────────────────────────────────────────────────
    {
      id: 'dev_exp',
      level: 'expert',
      title: 'Smart Contract Security',
      emoji: '🔐',
      description: 'Audit protocols, prevent exploits, and design production-grade systems that hold real value safely.',
      color: '#8B5CF6',
      lessons: [
        {
          id: 'dev_exp_l1',
          title: 'The Attack Taxonomy',
          slides: [
            { type: 'intro', title: 'How $5B Was Stolen', body: 'Smart contract exploits have stolen over $5B since 2016. They\'re not random — the same attack classes appear over and over. Understanding every major attack vector is the foundation of security-first development.' },
            { type: 'text', title: 'Reentrancy (1/5)', body: 'The classic. External call before state update allows attacker to re-enter and drain. 2016: The DAO ($60M). 2022: Cream Finance ($130M in multiple attacks). Fix: CEI pattern, ReentrancyGuard. Modern variant: read-only reentrancy (manipulate state during a view call to corrupt a calculation in another contract).' },
            { type: 'text', title: 'Integer Overflow/Underflow (2/5)', body: 'Pre-Solidity 0.8.0: uint256 overflow would wrap (2^256 - 1 + 1 = 0). Attackers would trigger overflows to bypass balance checks. Fix: Solidity 0.8.0+ has built-in overflow checks (reverts on overflow). For pre-0.8: use SafeMath. Never use unchecked{} blocks without careful analysis.' },
            { type: 'highlight', title: 'Oracle Manipulation (3/5)', body: 'If your contract uses on-chain DEX prices as an oracle, attackers can manipulate the price within a single transaction using flash loans. Buy all of one asset in a pool → price spikes → your contract thinks the asset is worth 10x → attacker exploits the inflated valuation → repay flash loan in same tx. Fix: use Chainlink or time-weighted average prices (TWAP).' },
            { type: 'text', title: 'Access Control Bugs (4/5) and Front-Running (5/5)', body: 'Access Control: missing onlyOwner modifier on privileged functions. Parity wallet bug: uninitialized library contract, anyone could call initialize() and self-destruct it, freezing $300M. Fix: explicitly test every privileged function. Front-Running: your pending transaction reveals profitable intent; bots pay more gas to execute first. Fix: commit-reveal schemes, slippage limits, private mempools (Flashbots Protect).' },
            { type: 'summary', title: 'Lesson Complete! +20 XP', body: 'The 5 major attack classes: reentrancy, overflow, oracle manipulation, access control, front-running. Each has known fixes. Knowing the attacks is prerequisite to writing secure code.' },
          ],
        },
        {
          id: 'dev_exp_l2',
          title: 'Formal Verification & Fuzzing',
          slides: [
            { type: 'intro', title: 'Proof vs. Testing', body: 'Testing proves the absence of specific bugs you thought to check for. Formal verification mathematically proves that code satisfies all specified properties, for all possible inputs. For contracts holding hundreds of millions, both approaches are necessary.' },
            { type: 'text', title: 'Foundry Invariant Testing', body: 'Define invariants (properties that must always hold) as functions prefixed invariant_:\n\nfunction invariant_TotalSupplyMatchesSumOfBalances() public {\n  assertEq(token.totalSupply(), sumAllBalances());\n}\n\nFoundry runs thousands of random transactions against your contract, checking the invariant after each one. This finds bugs that unit tests completely miss.' },
            { type: 'text', title: 'Echidna: Property-Based Fuzzer', body: 'Trail of Bits\' Echidna is a professional smart contract fuzzer. Define properties in Solidity, Echidna generates random transaction sequences trying to violate them. More powerful than Foundry\'s built-in fuzzer for complex systems. Used by top auditing firms. Run: echidna-test contracts/MyContract.sol --contract MyContract' },
            { type: 'highlight', title: 'Certora Prover: Formal Verification', body: 'Certora allows writing formal specifications in CVL (Certora Verification Language) that the Prover exhaustively checks. If a property is provable, it\'s guaranteed to hold for ALL possible inputs — not just tested ones. Used by Aave, Compound, Balancer to formally verify their contracts. The gold standard of smart contract correctness.' },
            { type: 'text', title: 'Halmos and Symbolic Execution', body: 'Halmos (a16z) applies symbolic execution to Solidity tests — it runs your test with symbolic inputs, exploring all possible execution paths. If any path leads to a failure, it finds the specific inputs that trigger it. Combines the accessibility of unit tests with the exhaustiveness of formal verification.' },
            { type: 'summary', title: 'Lesson Complete! +20 XP', body: 'Testing finds known bugs; formal verification proves security. Foundry invariants, Echidna fuzzing, Certora formal verification, and Halmos symbolic execution form a comprehensive correctness toolkit for production contracts.' },
          ],
        },
        {
          id: 'dev_exp_l3',
          title: 'Upgrade Patterns',
          slides: [
            { type: 'intro', title: 'Immutability vs. Fixability', body: 'Smart contracts are immutable — but bugs happen. Upgrade patterns allow deploying new logic while preserving state. The tension: upgradeability introduces trust assumptions (who controls upgrades?). Every decision is a security/flexibility tradeoff.' },
            { type: 'text', title: 'Transparent Proxy Pattern', body: 'Two contracts: Proxy (holds state, delegatecalls to Logic) and Logic (holds code, stateless). Users interact with Proxy; Proxy delegatecalls Logic, which reads/writes Proxy\'s storage. Upgrade = deploy new Logic, update Proxy to point to new address. OpenZeppelin\'s TransparentUpgradeableProxy implements this pattern. Risk: storage slot collisions between Proxy and Logic.' },
            { type: 'text', title: 'UUPS: Universal Upgradeable Proxy Standard', body: 'Unlike Transparent Proxy, UUPS puts the upgrade logic inside the implementation contract. The proxy is simpler — just delegatecall, no admin logic. EIP-1822. More gas-efficient than Transparent Proxy. But: if you deploy a UUPS implementation without the upgrade function, you permanently brick the proxy. Extra care required.' },
            { type: 'highlight', title: 'Diamond Pattern (EIP-2535)', body: 'Multiple implementation contracts ("facets") share a single proxy. Each facet handles different function selectors. Enables unlimited contract size (beyond the 24KB limit) and modular upgrades (replace one facet without touching others). Used by complex protocols. Auditing is significantly harder — a significant tradeoff.' },
            { type: 'text', title: 'Governance-Controlled Upgrades', body: 'Who controls upgrades? Options from least to most trusted: 5-of-9 multisig (e.g., Uniswap early stage). DAO governance vote (1 token = 1 vote, 48-hour timelock minimum). Immutable (no upgrades ever — Uniswap v2, v3 core). The community expects progression from multisig → DAO → immutable as protocols mature.' },
            { type: 'summary', title: 'Lesson Complete! +20 XP', body: 'Proxy patterns enable upgradeable contracts. Transparent and UUPS are the standard approaches. UUPS is more gas-efficient but riskier if misconfigured. Governance of upgrades evolves from multisig to DAO to immutability.' },
          ],
        },
        {
          id: 'dev_exp_l4',
          title: 'Protocol Architecture',
          slides: [
            { type: 'intro', title: 'Designing Systems at Scale', body: 'Building a protocol that secures hundreds of millions requires thinking beyond individual contracts to the system as a whole: how contracts interact, where trust boundaries lie, how the system behaves under adversarial conditions.' },
            { type: 'text', title: 'The Trust Model', body: 'Map every trust assumption in your system. Who can upgrade contracts? Who controls protocol parameters? What external protocols does your system depend on (their failures become your failures)? Can a single actor drain the protocol? Draw the full trust graph — every arrow is an attack surface.' },
            { type: 'text', title: 'Circuit Breakers', body: 'Production protocols implement emergency stops: pause() functions that halt deposits/withdrawals. Rate limits (max X ETH withdrawn per hour). Anomaly detection (if total supply drops >10% in 1 block, pause). Aave\'s Guardian multisig can pause the protocol instantly. MakerDAO\'s Emergency Shutdown Module can freeze the entire system. These are "break glass" mechanisms — you hope never to use them.' },
            { type: 'highlight', title: 'Economic Security', body: 'Protocol design must consider economic attacks, not just code attacks. Governance attacks: buy 51% of governance tokens, vote to drain the treasury. Tokenomics attacks: manipulate your own token price to manipulate oracle-dependent logic. Protocol invariant violations: find inputs that break economic assumptions. Simulate adversarial behavior during design, not just post-audit.' },
            { type: 'text', title: 'The Audit Process', body: 'Professional audit timeline for a major protocol: 1-2 weeks: audit firm onboarding, codebase review, context gathering. 2-3 weeks: intensive manual review + automated tool runs. 1 week: report drafting, severity classification. 1-2 weeks: developer fixes + auditor fix review. Total: 5-8 weeks, $50k-$500k cost. This is not optional for protocols that will hold >$1M.' },
            { type: 'summary', title: 'Lesson Complete! +20 XP', body: 'Protocol architecture requires mapping the full trust model, implementing circuit breakers, designing for economic security, and budgeting a professional audit. The audit is not the finish line — it\'s a periodic checkpoint.' },
          ],
        },
        {
          id: 'dev_exp_l5',
          title: 'The Auditor\'s Mindset',
          slides: [
            { type: 'intro', title: 'Think Like an Attacker', body: 'Security auditing is applied adversarial thinking. Your job is not to confirm the code does what the developer intended — it\'s to find every way the code can be exploited for profit or disruption. This mindset shift is the foundation of effective auditing.' },
            { type: 'text', title: 'The Audit Checklist', body: 'External call safety: reentrancy, gas griefing. Token safety: fee-on-transfer tokens, rebase tokens, ERC-20 non-compliant tokens. Math safety: overflow/underflow, rounding errors, precision loss. Access control: all admin functions protected, initialization secured. Oracle safety: TWAP vs spot price, oracle failure handling.' },
            { type: 'text', title: 'Reading the Codebase', body: 'Start with the specification/whitepaper — understand what the system is supposed to do. Read tests to understand expected behavior. Map the system: contracts, their relationships, who can call what. Read for what\'s MISSING — missing checks, missing events, missing reentrancy guards. The absence of something important is often the bug.' },
            { type: 'highlight', title: 'The Competitive Audit Circuit', body: 'Code4rena, Sherlock, and Cantina run competitive audits where hundreds of security researchers race to find bugs in exchange for prize pools ($10k-$500k). Top auditors earn $500k-$2M+ per year. The audit circuit is the fastest path to expertise — real code, real money, real incentives. Getting started requires Solidity fundamentals and knowledge of the attack taxonomy.' },
            { type: 'text', title: 'The Path to Becoming an Auditor', body: 'Step 1: Master Solidity and common vulnerability patterns. Step 2: Practice on CTF (Capture the Flag) challenges — Ethernaut, Damn Vulnerable DeFi, OpenZeppelin CTF. Step 3: Participate in public audit competitions on Code4rena or Sherlock. Step 4: Build a track record of verified findings. Step 5: Apply to audit firms (Trail of Bits, OpenZeppelin, Spearbit) or go independent.' },
            { type: 'summary', title: 'Module Complete! +20 XP', body: 'Auditing requires an adversarial mindset, a comprehensive checklist, and systematic codebase analysis. The competitive audit circuit is the fastest path to expertise and significant income. CTF challenges build the practical skills needed to compete.' },
          ],
        },
      ],
      quiz: [
        { id: 'dev_exp_q1', question: 'How does oracle manipulation via flash loans work?', options: ['Attackers hack Chainlink\'s servers', 'Flash loan to buy all of one asset in a DEX pool, spiking its spot price, exploit protocols that use that price as an oracle within the same transaction, repay flash loan', 'Validators manipulate oracle data during block production', 'It requires 51% of hash rate'], correct: 1, explanation: 'Flash loans enable borrowing millions within one transaction. Buying all of a small pool\'s asset spikes the spot price. If a protocol uses that spot price as an oracle, the inflated price enables profitable exploits. TWAP oracles resist this because they average over time.' },
        { id: 'dev_exp_q2', question: 'What is the key advantage of UUPS over Transparent Proxy pattern?', options: ['UUPS allows unlimited contract size', 'UUPS is more gas efficient because the proxy has no admin logic, and upgrade authorization is in the implementation', 'UUPS requires no governance to upgrade', 'UUPS eliminates storage collision risk'], correct: 1, explanation: 'Transparent Proxy includes admin checks on every call (gas overhead). UUPS moves upgrade logic to the implementation, making the proxy cheaper. The tradeoff: if you deploy a UUPS implementation without the upgrade function, the proxy is permanently bricked.' },
        { id: 'dev_exp_q3', question: 'What is a "read-only reentrancy" attack?', options: ['An attack that only reads data without modifying state', 'Manipulating state during a view function call to corrupt calculations in another contract that reads that state', 'A type of DOS attack on read functions', 'Reading private state variables'], correct: 1, explanation: 'During a view call, if your contract calls an external contract that can re-enter, the external contract can manipulate the state that a third contract will read. The third contract sees an inconsistent state and makes incorrect calculations — even though no funds moved through the view call.' },
        { id: 'dev_exp_q4', question: 'What is the competitive audit circuit and why is it valuable for learning security?', options: ['A game for blockchain developers', 'Platforms like Code4rena and Sherlock where security researchers compete for prize pools — providing real code, real incentives, and a track record of verified findings', 'A certification process for smart contract auditors', 'A formal education program'], correct: 1, explanation: 'Competitive audits (Code4rena, Sherlock, Cantina) pay researchers for finding real bugs in real production code. Top researchers earn $500k-$2M+/year. The combination of real stakes, community knowledge sharing, and verifiable track record makes it the fastest path from learning to professional auditing.' },
        { id: 'dev_exp_q5', question: 'In protocol architecture, what is a "governance attack"?', options: ['A bug in the voting smart contract', 'Acquiring enough governance tokens to pass a proposal that drains the treasury or modifies protocol parameters maliciously', 'A DDOS attack on the governance frontend', 'Manipulating governance token prices'], correct: 1, explanation: 'If governance tokens are cheap enough and the protocol treasury large enough, buying voting power for a malicious proposal becomes profitable. The 2022 Beanstalk exploit used a flash loan to temporarily acquire 79% voting power, pass a malicious proposal, and drain $182M — all in one transaction.' },
      ],
    },

  ],
};

export default dev;
