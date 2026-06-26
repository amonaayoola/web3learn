import { curriculum } from '../data/curriculum';

const ANTHROPIC_API_URL = 'https://api.anthropic.com/v1/messages';

const CURRICULUM_SUMMARY = curriculum
  .map(m => `- ${m.emoji} ${m.title}: ${m.lessons.map(l => l.title).join(', ')}`)
  .join('\n');

export function buildSystemPrompt(userContext) {
  const { xp = 0, rankName = 'Crypto Curious', streak = 0, completedModules = [], hearts = 5 } = userContext;

  return `You are SAGE — the AI tutor inside MAIDEN. You're sharp, warm, and genuinely excited about helping people understand Web3. You explain complex things simply without being condescending.

LEARNER SNAPSHOT:
- XP: ${xp} | Rank: ${rankName}
- Streak: ${streak} days
- Modules completed: ${completedModules.length > 0 ? completedModules.join(', ') : 'none yet — just getting started'}
- Hearts: ${hearts}/5

APP CURRICULUM (what they can learn here):
${CURRICULUM_SUMMARY}

HOW TO RESPOND:
- Keep it concise and mobile-friendly — 2 to 4 short paragraphs max
- Use real-world analogies to make concepts click (banks, vending machines, locked mailboxes, etc.)
- Reference what they've already learned when it's relevant
- If they ask about a module they haven't touched, briefly explain the concept and gently encourage them to try that lesson
- Occasional emojis are fine, but don't overdo it
- Never speculate on prices or give financial advice — you teach concepts, not investment strategies
- When it makes sense, suggest what to learn or practice next based on their progress
- Be encouraging — learning Web3 is genuinely hard and they're doing it`;
}

export async function sendMessage(messages, userContext) {
  const apiKey = process.env.EXPO_PUBLIC_ANTHROPIC_KEY;

  if (!apiKey || apiKey === 'your-anthropic-api-key-here') {
    throw new Error('NO_API_KEY');
  }

  const response = await fetch(ANTHROPIC_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 600,
      system: buildSystemPrompt(userContext),
      messages,
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`API_ERROR:${response.status}:${errText}`);
  }

  const data = await response.json();
  return data.content[0].text;
}

export const SUGGESTED_PROMPTS = [
  "What's a blockchain in simple terms?",
  "How does a crypto wallet actually work?",
  "What should I learn next based on my progress?",
  "Explain gas fees like I'm 10",
  "What's the difference between DeFi and traditional finance?",
  "Why do NFTs have value?",
];
