import fundamentals from './fundamentals';
import trading from './trading';
import dev from './dev';
import defi from './defi';
import nft from './nft';
import marketing from './marketing';
import dao from './dao';
import security from './security';
import tokenomics from './tokenomics';
import business from './business';
import layer2 from './layer2';
import identity from './identity';
import crosschain from './crosschain';
import zkproofs from './zkproofs';
import proposals from './proposals';
import mevAdvanced from './mev-advanced';
import ai from './ai';
import vibecoding from './vibecoding';
import proposalsEnrichment from './proposals-enrichment';

// Merge rigor-upgrade content (deep dive, matching pairs, scenario quiz, sources)
// onto Proposals lessons by id. Lessons without an entry are left untouched.
for (const mod of proposals.modules) {
  for (const lesson of mod.lessons) {
    const extra = proposalsEnrichment[lesson.id];
    if (extra) Object.assign(lesson, extra);
  }
}

const tracks = [
  fundamentals,
  trading,
  ai,
  vibecoding,
  dev,
  defi,
  nft,
  marketing,
  dao,
  security,
  tokenomics,
  business,
  layer2,
  identity,
  crosschain,
  zkproofs,
  proposals,
  mevAdvanced,
];

export default tracks;
