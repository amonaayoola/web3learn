const zkproofs = {
  id: 'zkproofs',
  title: 'Zero Knowledge Proofs',
  emoji: '🔮',
  color: '#EC4899',
  gradient: ['#DB2777', '#EC4899'],
  description: 'Master one of cryptography\'s most powerful ideas: proving something is true without revealing why it is true. From the basic intuition to ZK-SNARKs and ZK-STARKs, this track explains the math and the applications that are reshaping privacy in Web3.',
  category: 'Cryptography',
  modules: [
    {
      id: 'zk_beg',
      level: 'beginner',
      title: 'The Idea of Zero Knowledge',
      emoji: '🕵️',
      description: 'Develop intuition for zero-knowledge proofs before touching any math.',
      color: '#EC4899',
      lessons: [
        {
          id: 'zk_beg_l1',
          title: 'Proving Without Revealing',
          slides: [
            { type: 'intro', title: 'A Magic Trick', body: 'Imagine you claim to know the solution to a puzzle, but you do not want to reveal it. A zero-knowledge proof lets you convince someone you know the answer without revealing the answer itself. This sounds impossible, but it is not.' },
            { type: 'text', title: 'The Classic Example: Ali Baba Cave', body: 'You are in a circular cave with a locked door in the middle. I claim to know the secret word. To prove it, I enter the cave while you wait outside. You shout "come out the left path" or "right path." If I always emerge from the correct side, you become convinced I know the word, even without me ever saying it.' },
            { type: 'text', title: 'Three Properties', body: 'A valid ZK proof has three properties: (1) Completeness: if the claim is true, the prover can convince the verifier. (2) Soundness: if the claim is false, the prover cannot fake a valid proof. (3) Zero-knowledge: the verifier learns nothing except that the claim is true.' },
            { type: 'highlight', title: 'Why This Matters', body: 'With ZK proofs, you can: prove you are over 18 without revealing your age, prove you have enough balance without showing your balance, prove you completed a task correctly without revealing your inputs. Privacy and verification combined.' },
            { type: 'summary', title: 'Lesson Complete! +20 XP', body: 'Zero-knowledge proofs let you prove the truth of a statement without revealing any information beyond the truth itself. They combine completeness, soundness, and the zero-knowledge property.' },
          ],
        },
        {
          id: 'zk_beg_l2',
          title: 'ZK in the Real World',
          slides: [
            { type: 'intro', title: 'From Theory to Practice', body: 'ZK proofs were theoretical cryptography for decades. In the 2010s, efficient constructions like ZK-SNARKs made them practical. Today they power some of the most important Web3 infrastructure.' },
            { type: 'text', title: 'ZK Rollups', body: 'ZK rollups (zkSync, StarkNet, Polygon zkEVM) use ZK proofs to verify thousands of transactions at once. The proof is posted to Ethereum, which can verify it cheaply. No need for the 7-day optimistic window.' },
            { type: 'text', title: 'Privacy Applications', body: 'Zcash uses ZK proofs (zk-SNARKs) to enable shielded transactions where sender, receiver, and amount are all hidden. Tornado Cash (before sanctions) used ZK to break the transaction graph, enabling private Ethereum transfers.' },
            { type: 'highlight', title: 'zkLogin and Identity', body: 'Mysten Labs\' zkLogin (used in Sui) lets you create a blockchain wallet using your Google or Apple account, but the blockchain never learns which Google account you used. ZK proves you have a valid OAuth token without revealing the token.' },
            { type: 'summary', title: 'Lesson Complete! +20 XP', body: 'ZK proofs power ZK rollups (faster L2 finality), private transactions (Zcash), and privacy-preserving identity (zkLogin). They are becoming foundational infrastructure for Web3.' },
          ],
        },
        {
          id: 'zk_beg_l3',
          title: 'SNARKs vs STARKs',
          slides: [
            { type: 'intro', title: 'The Two Families', body: 'The two dominant ZK proof systems are SNARKs (Succinct Non-interactive ARguments of Knowledge) and STARKs (Scalable Transparent ARguments of Knowledge). Both prove statements with zero knowledge, but with different trade-offs.' },
            { type: 'text', title: 'ZK-SNARKs', body: 'SNARKs produce very small proofs (a few hundred bytes) that verify quickly. They require a "trusted setup" ceremony to generate public parameters. Used by: Zcash, Groth16, PlonK, and most ZK rollups (zkSync, Hermez). Vulnerable to quantum computers (uses elliptic curves).' },
            { type: 'text', title: 'ZK-STARKs', body: 'STARKs require no trusted setup (transparent). Proofs are larger but computationally faster to generate. Quantum-resistant (uses hash functions). Used by: StarkNet, StarkEx, and proving systems like Cairo VM.' },
            { type: 'highlight', title: 'The Trusted Setup', body: 'SNARKs require a one-time trusted setup ceremony where "toxic waste" (secret randomness) must be destroyed. If any participant keeps the toxic waste, they could forge proofs. Zcash\'s Powers of Tau ceremony had 200+ participants; if even one was honest, the setup is secure.' },
            { type: 'summary', title: 'Lesson Complete! +20 XP', body: 'SNARKs produce tiny, fast-to-verify proofs but need a trusted setup and are not quantum-resistant. STARKs need no trusted setup, are quantum-resistant, but produce larger proofs. Both are actively used in production.' },
          ],
        },
      ],
      quiz: [
        { id: 'zk_beg_q1', question: 'What are the three properties of a valid zero-knowledge proof?', options: ['Speed, cost, security', 'Completeness, soundness, zero-knowledge', 'Privacy, scalability, decentralization', 'Encryption, signing, verification'], correct: 1, explanation: 'A valid ZK proof must be complete (a true claim can always be proven), sound (a false claim cannot be proven), and zero-knowledge (the verifier learns nothing beyond the truth of the claim).' },
        { id: 'zk_beg_q2', question: 'What advantage do ZK-STARKs have over ZK-SNARKs?', options: ['Smaller proof size', 'Faster verification time', 'No trusted setup required and quantum resistance', 'Lower computational cost to generate'], correct: 2, explanation: 'ZK-STARKs require no trusted setup ceremony (they are transparent) and are quantum-resistant because they rely on hash functions rather than elliptic curve cryptography.' },
      ],
    },
    {
      id: 'zk_int',
      level: 'intermediate',
      title: 'ZK Circuits and Applications',
      emoji: '⚙️',
      description: 'Understand how ZK circuits are built and explore advanced ZK applications.',
      color: '#DB2777',
      lessons: [
        {
          id: 'zk_int_l1',
          title: 'How ZK Circuits Work',
          slides: [
            { type: 'intro', title: 'From Code to Constraints', body: 'ZK proofs do not work directly on arbitrary programs. The computation must first be expressed as an arithmetic circuit: a set of mathematical constraints that describe what a valid computation looks like.' },
            { type: 'text', title: 'R1CS and Arithmetic Circuits', body: 'A Rank-1 Constraint System (R1CS) expresses computations as a series of quadratic constraints: A * B = C. The prover provides a "witness" (the secret inputs) and proves the constraints are satisfied without revealing the witness.' },
            { type: 'text', title: 'Writing ZK Programs', body: 'Languages like Circom (used with SnarkJS), Cairo (used by StarkNet), and Noir (by Aztec) let developers write ZK programs at a higher level. The compiler converts them to the underlying constraint system.' },
            { type: 'highlight', title: 'The Prover and Verifier', body: 'The prover (who knows the secret) generates a proof: a small piece of data that encodes "I know a value that satisfies these constraints." The verifier checks the proof against the public constraints and accepts or rejects in milliseconds.' },
            { type: 'summary', title: 'Lesson Complete! +25 XP', body: 'ZK circuits express computations as arithmetic constraints. Languages like Circom and Cairo compile high-level logic into these circuits. The prover generates a proof; the verifier checks it efficiently.' },
          ],
        },
      ],
      quiz: [
        { id: 'zk_int_q1', question: 'What is a "witness" in the context of ZK proofs?', options: ['A third-party observer of a transaction', 'The secret inputs known only to the prover that satisfy the circuit constraints', 'A node that validates ZK proofs on-chain', 'The public parameters of a trusted setup'], correct: 1, explanation: 'In ZK proofs, the witness refers to the private inputs known only to the prover. The prover demonstrates knowledge of a valid witness without revealing it to the verifier.' },
      ],
    },

    // EXPERT MODULE
    {
      id: 'zk_exp',
      level: 'expert',
      title: 'ZK Proof Systems Deep Dive',
      emoji: '🧬',
      description: 'Groth16 internals, FRI-based STARKs, Plonk and recursive composition, and the ZK-EVM landscape.',
      color: '#9D174D',
      lessons: [
        {
          id: 'zk_exp_l1',
          title: 'ZK Proofs from First Principles',
          slides: [
            { type: 'intro', title: 'The Prover-Verifier Model', body: 'Every ZK proof system has two parties: a prover who knows a secret and wants to convince a verifier the secret satisfies some property, and a verifier who checks the proof efficiently. The prover does expensive work; the verifier does cheap verification. This asymmetry is what makes ZK proofs useful for blockchains.' },
            { type: 'text', title: 'Completeness, Soundness, Zero-Knowledge', body: 'Completeness means an honest prover with a valid witness can always convince an honest verifier. Soundness means a cheating prover cannot convince a verifier of a false statement (except with negligible probability). Zero-knowledge means the verifier learns nothing about the witness beyond the fact that a valid one exists. All three properties must hold simultaneously.' },
            { type: 'text', title: 'Interactive vs Non-Interactive Proofs', body: 'Early ZK proofs were interactive: the verifier sends random challenges, the prover responds, and many rounds build confidence. Interactive proofs cannot be broadcast to many verifiers at once. The Fiat-Shamir heuristic converts interactive proofs to non-interactive ones: the prover simulates the verifier\'s challenges using a hash function (in the random oracle model), enabling a single proof object that anyone can verify.' },
            { type: 'highlight', title: 'Intuition: The Color-Blind Verifier and Sudoku', body: 'Ali Baba cave (choose left or right path) builds interactive confidence: after 20 correct rounds, probability of cheating is 1/2^20. A more practical example: proving you know a Sudoku solution. Commit to each cell with a cryptographic commitment, then reveal each row, column, and box shuffled so the verifier sees all 9 values are used without seeing the actual positions. The solution stays hidden; validity is proven.' },
            { type: 'text', title: 'Polynomial Commitments: The Heart of Modern ZK', body: 'Modern SNARK and STARK systems reduce all claims to polynomial evaluation proofs. You commit to a polynomial P(x) and prove that P(z) = y for some specific z and y, without revealing P entirely. Different commitment schemes (KZG, FRI, Pedersen) have different tradeoffs in proof size, setup requirements, and post-quantum security. The polynomial encoding is what makes ZK proofs succinct.' },
            { type: 'summary', title: 'Lesson Complete! +20 XP', body: 'ZK proofs: prover knows a witness, convinces verifier via a proof. Three properties: completeness (honest prover always succeeds), soundness (cheating prover almost never succeeds), zero-knowledge (verifier learns nothing about witness). Fiat-Shamir converts interactive to non-interactive. Polynomial commitments underlie most modern systems.' },
          ],
        },
        {
          id: 'zk_exp_l2',
          title: 'zk-SNARKs: How Groth16 Works',
          slides: [
            { type: 'intro', title: 'Arithmetic Circuits and Constraint Systems', body: 'Groth16 is the most widely deployed SNARK. To prove computation with Groth16, you first express it as an arithmetic circuit (additions and multiplications over a finite field). The circuit is then converted to a Rank-1 Constraint System (R1CS): a set of equations of the form (a * b = c) where a, b, c are linear combinations of the computation\'s variables and constants.' },
            { type: 'text', title: 'From R1CS to QAP', body: 'R1CS is converted to a Quadratic Arithmetic Program (QAP). Each constraint becomes a polynomial. The key insight: a valid witness satisfies all constraints if and only if a specific polynomial is divisible by a target polynomial. This divisibility check becomes the core of the proof. The prover evaluates these polynomials at a secret point that only the trusted setup knows.' },
            { type: 'text', title: 'The Trusted Setup: Ceremony and Toxic Waste', body: 'Groth16 requires a circuit-specific trusted setup. During the ceremony, random secret values (the "toxic waste") are used to generate public proving and verifying keys. If the toxic waste is not destroyed, someone who keeps it can forge proofs for any statement in the circuit. Multi-party computation (MPC) ceremonies address this: if even one participant honestly destroys their share, the setup is secure. Zcash\'s Sapling ceremony had 90+ participants.' },
            { type: 'highlight', title: 'Groth16 Proof Structure', body: 'A Groth16 proof consists of just three elliptic curve group elements: (A, B, C). Total size is roughly 192 bytes regardless of computation size. Verification requires 3 pairing operations, taking about 3ms on modern hardware. This extreme succinctness is why Groth16 is ideal for on-chain verification where calldata and computation are expensive.' },
            { type: 'text', title: 'Real Blockchains: Zcash and Tornado Cash', body: 'Zcash Sapling uses Groth16 with a circuit that proves: you know a spending key for a shielded note, the note exists in the Merkle tree, and you are not double-spending. The proof is 192 bytes and verifies in milliseconds. Early Tornado Cash used Groth16 to prove: you know the preimage of a commitment in the deposit Merkle tree, enabling private withdrawals without linking to the deposit transaction.' },
            { type: 'summary', title: 'Lesson Complete! +20 XP', body: 'Groth16: computation expressed as R1CS, converted to QAP polynomial representation, evaluated at a trusted-setup secret point. Proof is 3 elliptic curve points (192 bytes), verified with 3 pairings (~3ms). Circuit-specific trusted setup is the key vulnerability. Used in Zcash (Sapling) and early Tornado Cash.' },
          ],
        },
        {
          id: 'zk_exp_l3',
          title: 'zk-STARKs: Trustless and Post-Quantum',
          slides: [
            { type: 'intro', title: 'No Trusted Setup, No Elliptic Curves', body: 'STARKs (Scalable Transparent ARguments of Knowledge) were designed to eliminate two weaknesses of SNARKs: trusted setup ceremonies and vulnerability to quantum computers. STARKs rely only on cryptographic hash functions, which are believed to be quantum-resistant. The setup is fully transparent: anyone can verify the public parameters were generated correctly.' },
            { type: 'text', title: 'Algebraic Intermediate Representation (AIR)', body: 'Instead of R1CS, STARKs encode computation as an Algebraic Intermediate Representation (AIR): a set of polynomial constraints over a computation trace. The trace is a table where each row is a step of computation and columns represent variables. Constraints must hold between consecutive rows (transition constraints) and on boundary rows (boundary constraints). This formulation maps naturally to recursive computations like hash functions.' },
            { type: 'text', title: 'FRI: Fast Reed-Solomon IOP', body: 'The core of a STARK is FRI (Fast Reed-Solomon Interactive Oracle Proof), a protocol for proving a polynomial has low degree. FRI works by repeatedly folding the polynomial in half (reducing its degree) and using hash-based commitments (Merkle trees) to commit to evaluations. The prover opens a few random positions to convince the verifier the polynomial is well-formed. This is quantum-resistant because it only uses hashes.' },
            { type: 'highlight', title: 'STARKs vs SNARKs Tradeoffs', body: 'SNARKs: tiny proofs (192 bytes for Groth16), fast verification (3ms), require trusted setup, not quantum-resistant. STARKs: larger proofs (100-400KB), slightly slower verification (10-50ms), no trusted setup, quantum-resistant. For on-chain verification where proof size matters, SNARKs win on cost. For off-chain verification or long-term security planning, STARKs are preferred.' },
            { type: 'text', title: 'Real Blockchains: StarkNet and StarkEx', body: 'StarkNet is a permissionless ZK rollup using Cairo VM (a STARK-friendly virtual machine) and SHARP (SHARed Prover) for proof aggregation. StarkEx powers dYdX v3 (derivatives), Immutable X (NFTs), and Sorare (fantasy sports NFTs), each running as an application-specific rollup. Cairo 1.0 improved the developer experience with a Rust-like language that compiles to STARK-provable bytecode.' },
            { type: 'summary', title: 'Lesson Complete! +20 XP', body: 'STARKs: computation encoded as AIR, proven via FRI (repeated polynomial folding with Merkle commitments). No trusted setup, quantum-resistant, proof sizes 100-400KB. SNARKs win on proof size and verification cost; STARKs win on setup transparency and post-quantum security. StarkNet (Cairo VM) and StarkEx (dYdX, Immutable X) are the primary deployments.' },
          ],
        },
        {
          id: 'zk_exp_l4',
          title: 'Plonk, PLOOKUP and Modern SNARK Systems',
          slides: [
            { type: 'intro', title: 'Universal Trusted Setup: One Ceremony, Many Programs', body: 'Groth16 requires a new trusted setup for every circuit. Plonk (Permutations over Lagrange-bases for Oecumenical Noninteractive arguments of Knowledge) introduced universal trusted setups: a single ceremony generates parameters usable for any circuit up to a size bound. This dramatically improved the practical deployment of SNARKs, enabling the Powers of Tau ceremony used across many protocols.' },
            { type: 'text', title: 'Plonk\'s Permutation Argument', body: 'Plonk encodes circuits using a permutation argument: it proves that a set of wire values in a circuit are consistent across gates by showing they are a permutation of a reference set. This is more expressive than R1CS and enables custom gates that encode complex operations (elliptic curve arithmetic, hash functions) as single constraints rather than thousands of gates, dramatically reducing proof size for specialized circuits.' },
            { type: 'text', title: 'PLOOKUP: Range Proofs and Table Lookups', body: 'PLOOKUP extends Plonk with lookup arguments: efficiently proving that a value exists in a precomputed table. This is extremely useful for range proofs (prove x is in [0, 2^32] without range constraints for each bit) and for encoding large lookup tables (SHA-256 S-boxes, XOR operations) as single lookup constraints. UltraPlonk combines Plonk with PLOOKUP, enabling efficient proofs for operations that would otherwise be circuit bottlenecks.' },
            { type: 'highlight', title: 'Recursive Proof Composition', body: 'Recursive SNARKs prove the correctness of another SNARK verification inside a circuit. A recursive proof says: I have a valid proof P for statement X, and here is a proof of that fact. Chains of recursive proofs enable proof aggregation (many proofs verified in one), proof compression (multiple L2 blocks proven as one L1 proof), and infinite incrementally verifiable computation (IVC). Halo2 achieves recursion without a trusted setup using Pasta curves.' },
            { type: 'text', title: 'Real Blockchains: Aztec, zkSync Era, Scroll', body: 'Aztec Network uses Noir (a Rust-like ZK language) and UltraPlonk to build a privacy-first L2 where transactions have programmable privacy. zkSync Era uses a custom Plonk variant with PLOOKUP for its zkEVM. Scroll uses Halo2 (no trusted setup, recursive proofs) targeting Type 2/3 EVM equivalence. Each made different tradeoffs between proving speed, EVM compatibility, and setup trust requirements.' },
            { type: 'summary', title: 'Lesson Complete! +20 XP', body: 'Plonk: universal trusted setup (one ceremony, many circuits), permutation argument for circuit consistency, custom gates for complex operations. PLOOKUP adds efficient table lookups (range proofs, XOR, SHA-256 S-boxes). Recursive SNARKs enable proof aggregation and IVC. Aztec (UltraPlonk), zkSync Era (Plonk), Scroll (Halo2) are the key deployments.' },
          ],
        },
        {
          id: 'zk_exp_l5',
          title: 'ZK in Practice: ZK-EVMs and ZK Rollups',
          slides: [
            { type: 'intro', title: 'The ZK-EVM Type Classification', body: 'Vitalik Buterin classified ZK-EVMs into types 1-4 based on EVM equivalence. Type 1: fully equivalent to Ethereum (including same hash functions, storage layout). Proving is very slow but no changes to dApps needed. Type 4: proves a high-level language (like Solidity) compiled to a ZK-friendly VM, very fast proving but not bytecode compatible. Types 2 and 3 are intermediate tradeoffs.' },
            { type: 'text', title: 'Proving Time vs EVM Equivalence Tradeoff', body: 'Every step away from full EVM equivalence enables faster proving. Type 1 (Taiko): can reuse Ethereum execution clients but takes hours to prove a block. Type 2/3 (Scroll): small EVM modifications enable faster proving while maintaining compatibility with most dApps. Type 4 (zkSync Era): compiles Solidity to a custom VM, proving in seconds, but some Ethereum-specific patterns do not work.' },
            { type: 'text', title: 'Proof Aggregation and Recursive SNARKs for Scale', body: 'Individual ZK proofs are expensive to generate. Proof aggregation batches many transaction proofs into one layer-level proof, amortizing the on-chain verification cost. StarkNet uses SHARP to aggregate proofs from multiple applications into one Ethereum proof. Recursive SNARKs enable this by proving the verification of many sub-proofs inside a single outer proof. This is what enables ZK rollups to achieve costs far below L1.' },
            { type: 'highlight', title: 'Privacy vs Scalability: Two Different Goals', body: 'ZK rollups (zkSync, Scroll, Polygon zkEVM) use ZK proofs for scalability: batch transactions off-chain, prove their correctness, post a single proof to L1. The transactions themselves are public. Privacy applications (Aztec, Zcash, Tornado Cash) use ZK proofs to hide transaction details. These are orthogonal: you can have public scalable transactions or private unscalable ones. Aztec attempts to combine both.' },
            { type: 'text', title: 'Real Blockchains: zkSync Era, Scroll, Polygon zkEVM, Linea, Aztec', body: 'zkSync Era (Type 4, custom VM, Plonk+PLOOKUP, fastest proving, not bytecode compatible). Scroll (Type 2/3, Halo2 circuits, bytecode compatible, moderate proving time). Polygon zkEVM (Type 2, Plonk with recursive proofs, EVM bytecode compatible). Linea (ConsenSys, Type 2, gnark proving stack, fastest Type 2 prover). Aztec (privacy L2, programmable privacy via shielded accounts and private functions, Noir language).' },
            { type: 'summary', title: 'Lesson Complete! +20 XP', body: 'ZK-EVM types 1-4 trade EVM equivalence for proving speed. Type 1 (Taiko): hours to prove, full compatibility. Type 4 (zkSync Era): seconds to prove, not bytecode compatible. Proof aggregation (SHARP, recursive SNARKs) amortizes on-chain verification costs. ZK for scalability (public transactions, cheaper L1 settlement) vs ZK for privacy (Aztec, Zcash) are distinct use cases.' },
          ],
        },
      ],
      quiz: [
        { id: 'zk_exp_q1', question: 'What is the "toxic waste" in a Groth16 trusted setup and why is it dangerous?', options: ['The computing power consumed during proof generation', 'The secret randomness used to generate proving and verifying keys, which if kept by any participant enables forging valid proofs for any statement in the circuit', 'The private witness data that the prover must discard after proving', 'The cryptographic hash that is deleted after the ceremony completes'], correct: 1, explanation: 'During a Groth16 trusted setup, secret random values are used to generate the proving and verifying keys. Anyone who keeps these values can produce proofs for false statements in the circuit without detection. Multi-party computation (MPC) ceremonies distribute the secret so that all participants must collude to compromise the setup. If even one participant honestly destroys their share, the setup is secure.' },
        { id: 'zk_exp_q2', question: 'What makes STARKs quantum-resistant while SNARKs are not?', options: ['STARKs use larger field sizes that quantum computers cannot factor', 'STARKs rely only on hash functions (believed quantum-resistant), while SNARKs rely on elliptic curve discrete logarithm hardness (broken by Shor\'s algorithm on quantum computers)', 'STARKs use a different type of trusted setup that quantum computers cannot attack', 'STARKs produce larger proofs that take too long for quantum computers to verify'], correct: 1, explanation: 'SNARKs use elliptic curve pairings whose security relies on the hardness of the elliptic curve discrete logarithm problem. Shor\'s algorithm on a sufficiently powerful quantum computer can solve this in polynomial time. STARKs rely only on collision-resistant hash functions, for which no known quantum algorithm provides an exponential speedup.' },
        { id: 'zk_exp_q3', question: 'What problem does PLOOKUP solve in ZK circuit design?', options: ['It reduces the size of the trusted setup ceremony', 'It efficiently proves that a value is contained in a precomputed table, enabling range proofs and lookup-based operations without expensive constraint overhead', 'It enables recursive proofs without a trusted setup', 'It reduces the number of rounds needed in the FRI protocol'], correct: 1, explanation: 'PLOOKUP enables lookup arguments: proving a witness value exists in a precomputed table using sub-linear constraints. This is valuable for range proofs (proving x is in [0, 2^32] without 32 boolean constraints) and for encoding complex operations like SHA-256 S-box lookups that would otherwise require thousands of arithmetic constraints in a standard circuit.' },
        { id: 'zk_exp_q4', question: 'In Vitalik\'s ZK-EVM type classification, what is the tradeoff between Type 1 and Type 4?', options: ['Type 1 is faster to prove but incompatible with Ethereum dApps; Type 4 is fully compatible but slow to prove', 'Type 1 is fully EVM-equivalent (slow to prove); Type 4 compiles to a ZK-friendly VM (fast to prove) but is not bytecode compatible with Ethereum', 'Type 1 uses SNARKs; Type 4 uses STARKs, with proving time the only difference', 'Type 1 supports only simple transfers; Type 4 supports full smart contract execution'], correct: 1, explanation: 'Type 1 ZK-EVMs are fully equivalent to Ethereum: they can reuse existing execution clients and require no changes to dApps, but proving an Ethereum block takes hours because Ethereum\'s design was not optimized for ZK proving. Type 4 ZK-EVMs compile Solidity or other high-level languages to a ZK-friendly custom VM, enabling second-scale proving but sacrificing bytecode compatibility.' },
        { id: 'zk_exp_q5', question: 'What is recursive proof composition and why does it matter for ZK rollups?', options: ['Recursively running the same computation multiple times to reduce errors', 'Proving the correctness of another ZK proof verification inside a circuit, enabling aggregation of many proofs into one and amortizing on-chain verification costs across many transactions', 'Re-using the same trusted setup parameters across multiple circuits', 'A technique for reducing circuit size by splitting proofs into smaller pieces'], correct: 1, explanation: 'Recursive SNARKs prove that a valid proof for some statement exists, without re-running the underlying computation. Chains of recursive proofs aggregate many transaction proofs into one rollup-level proof. StarkNet\'s SHARP batches proofs from multiple applications. This amortizes the on-chain verification cost (which is constant per proof) across thousands of transactions, making ZK rollups economically viable.' },
      ],
    },
  ],
};

export default zkproofs;
