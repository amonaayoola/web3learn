'use client';

interface ExternalCourse {
  institution: string;
  logo: string; // emoji / glyph stand-in for a logo
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  url: string;
}

const DIFFICULTY_COLORS: Record<string, string> = {
  Beginner: '#30d158',
  Intermediate: '#ff9f0a',
  Advanced: '#ff453a',
};

const COURSES: { group: string; accent: string; items: ExternalCourse[] }[] = [
  {
    group: 'Google',
    accent: '#4285F4',
    items: [
      {
        institution: 'Google',
        logo: '🔷',
        title: 'Machine Learning Crash Course',
        description: "Google's fast-paced, hands-on intro to ML fundamentals with TensorFlow exercises and interactive visualizations.",
        difficulty: 'Beginner',
        url: 'https://developers.google.com/machine-learning/crash-course',
      },
      {
        institution: 'Google Cloud',
        logo: '☁️',
        title: 'Generative AI Learning Path',
        description: 'A curated set of free courses on LLMs, generative AI, and responsible AI on Google Cloud Skills Boost.',
        difficulty: 'Beginner',
        url: 'https://www.cloudskillsboost.google/paths/118',
      },
      {
        institution: 'Google',
        logo: '✍️',
        title: 'Prompt Engineering (Gemini)',
        description: "Google's guidance and prompting guide for getting reliable results out of Gemini and other LLMs.",
        difficulty: 'Beginner',
        url: 'https://cloud.google.com/discover/what-is-prompt-engineering',
      },
    ],
  },
  {
    group: 'Anthropic',
    accent: '#D97757',
    items: [
      {
        institution: 'Anthropic',
        logo: '📘',
        title: 'Claude Developer Documentation',
        description: 'Official guides for the Claude API: prompting, tool use, agents, and the Model Context Protocol.',
        difficulty: 'Intermediate',
        url: 'https://docs.anthropic.com/',
      },
      {
        institution: 'Anthropic',
        logo: '🗂️',
        title: 'Anthropic Prompt Library',
        description: 'A collection of ready-to-use, optimized prompts for a wide range of business and creative tasks.',
        difficulty: 'Beginner',
        url: 'https://docs.anthropic.com/en/resources/prompt-library/library',
      },
      {
        institution: 'Anthropic',
        logo: '🎓',
        title: 'Anthropic Courses (GitHub)',
        description: 'Free, hands-on courses covering the Claude API, prompt engineering, tool use, and building with Claude.',
        difficulty: 'Intermediate',
        url: 'https://github.com/anthropics/courses',
      },
    ],
  },
  {
    group: 'From the Ecosystem',
    accent: '#8B5CF6',
    items: [
      {
        institution: 'DeepLearning.AI',
        logo: '🧠',
        title: 'ChatGPT Prompt Engineering for Developers',
        description: "Andrew Ng and OpenAI's short course on prompting principles and building applications with the API.",
        difficulty: 'Beginner',
        url: 'https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/',
      },
      {
        institution: 'DeepLearning.AI',
        logo: '🧠',
        title: 'Building Systems with the ChatGPT API',
        description: 'Chain LLM calls into multi-step pipelines and build a working, evaluated end-to-end system.',
        difficulty: 'Intermediate',
        url: 'https://www.deeplearning.ai/short-courses/building-systems-with-chatgpt/',
      },
      {
        institution: 'fast.ai',
        logo: '⚡',
        title: 'Practical Deep Learning for Coders',
        description: "Jeremy Howard's free, top-down course that gets you training real models from lesson one.",
        difficulty: 'Intermediate',
        url: 'https://course.fast.ai/',
      },
      {
        institution: 'Hugging Face',
        logo: '🤗',
        title: 'The Hugging Face NLP Course',
        description: 'A free, comprehensive course on transformers, tokenizers, and building with the open-source ecosystem.',
        difficulty: 'Intermediate',
        url: 'https://huggingface.co/learn/nlp-course',
      },
    ],
  },
];

export default function ExternalCourses() {
  return (
    <section style={{ marginTop: 8, marginBottom: 48, animation: 'fadeUp 0.4s ease both' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
        <h2 style={{ margin: 0, fontSize: 30, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.025em' }}>
          Learn More.
        </h2>
        <span style={{
          fontSize: 11, fontWeight: 700, letterSpacing: '0.05em', padding: '4px 11px', borderRadius: 999,
          color: '#8B5CF6', background: '#8B5CF614', border: '1px solid #8B5CF633',
        }}>EXTERNAL</span>
      </div>
      <p style={{ margin: '0 0 28px', fontSize: 15, color: 'var(--text-tertiary)', lineHeight: 1.6, maxWidth: 640 }}>
        Free courses from Google, Anthropic, and the wider AI ecosystem. These are external resources that open in a new tab.
      </p>

      {COURSES.map(section => (
        <div key={section.group} style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <span style={{ width: 8, height: 8, borderRadius: 999, background: section.accent }} />
            <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', letterSpacing: '0.02em' }}>
              {section.group}
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
            {section.items.map(course => {
              const dc = DIFFICULTY_COLORS[course.difficulty];
              return (
                <a
                  key={course.title}
                  href={course.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex', flexDirection: 'column', textDecoration: 'none',
                    padding: '20px 22px', borderRadius: 16,
                    background: 'var(--bg-card)', border: '1px solid var(--border)',
                    transition: 'all 200ms ease',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget;
                    el.style.background = 'var(--bg-card-hover)';
                    el.style.borderColor = section.accent + '66';
                    el.style.transform = 'translateY(-2px)';
                    el.style.boxShadow = `0 12px 32px ${section.accent}22`;
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget;
                    el.style.background = 'var(--bg-card)';
                    el.style.borderColor = 'var(--border)';
                    el.style.transform = 'translateY(0)';
                    el.style.boxShadow = 'none';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                      <span style={{ fontSize: 22 }}>{course.logo}</span>
                      <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-tertiary)' }}>{course.institution}</span>
                    </div>
                    <span style={{
                      fontSize: 10.5, fontWeight: 600, padding: '3px 9px', borderRadius: 999,
                      color: dc, background: dc + '14', border: `1px solid ${dc}33`,
                    }}>{course.difficulty}</span>
                  </div>
                  <h3 style={{ margin: '0 0 8px', fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.01em', lineHeight: 1.3 }}>
                    {course.title}
                  </h3>
                  <p style={{ margin: '0 0 16px', flex: 1, fontSize: 13.5, color: 'var(--text-tertiary)', lineHeight: 1.55 }}>
                    {course.description}
                  </p>
                  <span style={{ fontSize: 13, fontWeight: 600, color: section.accent }}>
                    Visit Course →
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      ))}
    </section>
  );
}
