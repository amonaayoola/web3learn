export interface Slide {
  type: 'intro' | 'text' | 'highlight' | 'summary';
  title: string;
  body: string;
}

export interface SourceLink {
  label: string;
  url: string;
}

export interface DeepDiveSection {
  heading: string;
  body: string;
  /** Optional code block rendered in a monospace panel. */
  code?: string;
  /** Optional language label shown above the code block (e.g. "solidity"). */
  lang?: string;
}

/** A YouTube video embedded inside a lesson's deep dive. */
export interface VideoEmbed {
  /** YouTube video id (the part after watch?v=). */
  youtubeId: string;
  title: string;
  speaker?: string;
}

/** A pull quote (e.g. an original tweet) surfaced in a lesson. */
export interface PullQuote {
  text: string;
  attribution: string;
  url?: string;
}

/** A research paper, article, or doc link for the Further Reading bibliography. */
export interface FurtherReadingItem {
  title: string;
  author: string;
  /** Publication name and/or date, e.g. "arXiv · 2017" or "Anthropic docs". */
  publication: string;
  url: string;
  description: string;
}

export interface DeepDive {
  readingTime: string;
  sections: DeepDiveSection[];
  sources: SourceLink[];
  /** Optional video rendered at the top of the deep dive. */
  video?: VideoEmbed;
  /** Optional pull quote rendered after the video. */
  pullQuote?: PullQuote;
  /** Optional bibliography of research papers / articles. */
  furtherReading?: FurtherReadingItem[];
}

export interface MatchingPair {
  term: string;
  definition: string;
}

export interface ScenarioQuestion {
  /** Stable id so weak-spot tracking survives reordering. */
  id?: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export interface MoneyAngleStrategy {
  name: string;
  description: string;
  risk: 'low' | 'medium' | 'high';
  effort: 'low' | 'medium' | 'high';
}

export interface MoneyAngle {
  title: string;
  content: string;
  strategies: MoneyAngleStrategy[];
}

export interface Lesson {
  id: string;
  title: string;
  slides: Slide[];
  xp?: number;
  // ── Rigor upgrade (all optional; rendered only when present) ──
  /** Short hook + problem + solution + real example. */
  summary?: string;
  /** Long-form reading experience unlocked after the Quick Check. */
  deepDive?: DeepDive;
  /** Active-recall matching game (6-8 pairs). */
  matchingPairs?: MatchingPair[];
  /** Scenario-based questions (3-5). Misses are recorded as weak spots. */
  scenarioQuiz?: ScenarioQuestion[];
  /** Source links surfaced on the overview card. */
  sources?: SourceLink[];
  /** "How people make money from this" — shown after lesson content, before the quiz. */
  moneyAngle?: MoneyAngle;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export interface Module {
  id: string;
  level: 'beginner' | 'intermediate' | 'expert';
  title: string;
  emoji: string;
  description: string;
  color: string;
  lessons: Lesson[];
  quiz: QuizQuestion[];
  quizXp?: number;
}

export interface Track {
  id: string;
  title: string;
  emoji: string;
  color: string;
  gradient: string[];
  description: string;
  category: string;
  modules: Module[];
}
