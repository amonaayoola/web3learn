// Vibe Coding track.
//
// Andrej Karpathy coined "vibe coding" in a February 2025 post. This track
// teaches the practice end to end: what it is, the tools, prompting for code,
// shipping real apps, and what it means for the future of software.
//
// Each lesson follows the 3-layer rigor system:
//   slides        - the core walkthrough + Quick Check
//   deepDive      - long-form reading (Layer 2), with optional video / pull quote
//   matchingPairs - active-recall matching game (Layer 3, Mode A)
//   scenarioQuiz  - scenario questions; misses become weak spots (Layer 3, Mode B)
//   sources       - authoritative links on the overview + deep dive
//   furtherReading- research papers, articles, and docs (bibliography)
//
// House style: no em dashes.

const vibecoding = {
  id: 'vibecoding',
  title: 'Vibe Coding',
  emoji: '🎛️',
  color: '#8B5CF6',
  gradient: ['#7C3AED', '#A78BFA'],
  description:
    'Andrej Karpathy coined "vibe coding" in early 2025: describe what you want in plain English and let AI write the code. This track takes you from the Karpathy moment through the tools (Cursor, Claude Code, Copilot, Bolt, v0), prompt craft, shipping real apps, and what it all means for the future of software.',
  category: 'AI & Building',
  modules: [
    {
      id: 'vibecoding_m1',
      level: 'beginner',
      title: 'What Is Vibe Coding?',
      emoji: '🌊',
      description: 'The Karpathy moment, how the workflow actually works, what you still need to know, the tools landscape, and where it meets production.',
      color: '#8B5CF6',
      lessons: [
        {
          id: 'vibecoding_m1_l1',
          title: 'The Karpathy Moment',
          xp: 20,
          slides: [
            { type: 'intro', title: 'A Throwaway Tweet That Named an Era', body: 'On 2 February 2025, Andrej Karpathy fired off what he later called "a shower of thoughts throwaway tweet." It named something thousands of people were already feeling: a new way of making software where you describe the vibe and let the AI write the code. The post was viewed millions of times within days.' },
            { type: 'text', title: 'What He Actually Said', body: 'Karpathy described "a new kind of coding I call vibe coding, where you fully give in to the vibes, embrace exponentials, and forget that the code even exists." He was talking to Cursor Composer with Sonnet, often by voice through SuperWhisper, accepting diffs without reading them, and pasting errors back in until things worked.' },
            { type: 'text', title: 'Why It Went Viral', body: 'The phrase landed because it was honest about a shift people felt but had not named. Karpathy is a former Tesla AI director and OpenAI founding member, so when he said he barely reads the code anymore, it gave permission to a feeling: the models had crossed a threshold where talking to them beat typing.' },
            { type: 'highlight', title: 'From Engineering to Directing', body: 'The deeper idea is a change of role. Software engineering was about writing instructions a machine executes literally. Vibe coding is closer to directing: you describe intent, judge the result, and steer. The unit of work moves from the line of code to the prompt and the review.' },
            { type: 'summary', title: 'Lesson Complete! +20 XP', body: 'Vibe coding is letting AI write the code while you describe what you want and judge the output. Karpathy named it in February 2025, and the term spread because it captured a real shift from writing software to directing it. The rest of this track turns that vibe into a craft.' },
          ],
          summary:
            'In February 2025 Andrej Karpathy posted that there is "a new kind of coding I call vibe coding, where you fully give in to the vibes." He meant leaning so hard on capable models that you stop reading the code and just describe, run, and iterate. The tweet went viral because it named a shift everyone felt: the models had gotten good enough that English became a real programming interface. This lesson covers what he meant, why it resonated, and the move from software engineering to software directing.',
          sources: [
            { label: 'Karpathy: the original "vibe coding" post (X, Feb 2025)', url: 'https://x.com/karpathy/status/1886192184808149383' },
            { label: 'Andrej Karpathy: Software Is Changing (Again) (YouTube)', url: 'https://www.youtube.com/watch?v=LCEmiRjPEtQ' },
            { label: 'Simon Willison: AI-assisted programming notes', url: 'https://simonwillison.net/tags/ai-assisted-programming/' },
          ],
          deepDive: {
            readingTime: '8 min',
            video: {
              youtubeId: 'LCEmiRjPEtQ',
              title: 'Software Is Changing (Again)',
              speaker: 'Andrej Karpathy, AI Startup School 2025',
            },
            pullQuote: {
              text: "There's a new kind of coding I call vibe coding, where you fully give in to the vibes, embrace exponentials, and forget that the code even exists.",
              attribution: 'Andrej Karpathy, X, 2 February 2025',
              url: 'https://x.com/karpathy/status/1886192184808149383',
            },
            sections: [
              {
                heading: 'The Tweet, In Context',
                body:
                  'Karpathy did not invent AI-assisted coding. Autocomplete, Copilot, and chat assistants had been around for years. What he did was name a posture: trusting the model so completely that the code itself fades into the background. In his words you "embrace exponentials and forget that the code even exists."\n\nThe specifics matter. He was using Cursor Composer driven by Anthropic Sonnet, talking to it out loud through a voice tool, and accepting changes without reading them line by line. When something broke, he pasted the error back and asked for a fix. That loop, describe then run then paste the error, is the whole method in miniature.\n\nHe was careful that this was a vibe, not a recommendation for production systems. He called it good for "throwaway weekend projects." That nuance got lost as the term spread, which is exactly why a track like this is useful: to separate the genuinely new capability from the hype that rode on top of it.',
              },
              {
                heading: 'Why This Particular Phrase Spread',
                body:
                  'Plenty of people had described AI coding. The phrase "vibe coding" stuck because it was emotionally accurate and slightly transgressive. It admitted out loud that you were not reading the code, which felt taboo to engineers trained to understand every line.\n\nIt also came from a credible source at the right moment. Karpathy helped build the deep learning systems behind modern models, so his casual admission carried weight. And early 2025 was an inflection point: Claude and GPT-class models had crossed from "impressive demo" to "actually finishes the task" for a lot of everyday web work.\n\nThe result was permission. Developers who had been quietly leaning on AI felt seen, and non-developers realized the door was open to them too. A single word turned a private habit into a public movement with a name you could put in a tweet, a job posting, or a product tagline.',
              },
              {
                heading: 'From Software Engineering To Software Directing',
                body:
                  'The most important idea in the original moment is not the tooling, it is the change of role. Traditional programming is literal: the machine does exactly what your code says, so the skill is expressing intent precisely in a formal language.\n\nVibe coding pushes the formal language into the background and puts a probabilistic collaborator in front of you. You express intent in English, the model proposes an implementation, and your job becomes judgment: is this right, is it secure, does it match what I pictured. You are directing a capable but fallible builder rather than laying every brick yourself.\n\nKarpathy later framed this as "Software 3.0," where the prompt is the program and English is the new interface, building on his earlier "Software 2.0" essay about neural networks replacing handwritten logic. The practical takeaway is that taste, specification, and review become the high-value skills, while raw syntax recall matters less.',
              },
              {
                heading: 'What This Track Will Teach You',
                body:
                  'The danger with a viral term is that it flattens into a slogan. The goal here is to turn "vibe coding" into a repeatable craft. Over five modules you will go from the moment itself to the tools that make it possible, the prompt patterns that separate good output from garbage, building and shipping real applications, and finally the economic and safety implications.\n\nYou will also learn where the vibe ends. Karpathy himself scoped it to throwaway projects. Knowing when to stop vibing and start engineering, when to read the code, add tests, and review for security, is the difference between a fun demo and something you can put in front of real users.\n\nKeep one frame in mind as you go: AI writes the code, but you are still responsible for it. The vibe gets you to a working draft fast. Judgment turns that draft into something worth shipping.',
              },
            ],
            sources: [
              { label: 'Karpathy: the original "vibe coding" post (X, Feb 2025)', url: 'https://x.com/karpathy/status/1886192184808149383' },
              { label: 'Andrej Karpathy: Software Is Changing (Again) (YouTube)', url: 'https://www.youtube.com/watch?v=LCEmiRjPEtQ' },
              { label: 'Karpathy: Software 2.0 (Medium, 2017)', url: 'https://karpathy.medium.com/software-2-0-a64152b37c35' },
            ],
            furtherReading: [
              { title: 'There\'s a new kind of coding I call "vibe coding"', author: 'Andrej Karpathy', publication: 'X (Twitter) · Feb 2025', url: 'https://x.com/karpathy/status/1886192184808149383', description: 'The original post that named the practice and described the describe-run-paste-error loop.' },
              { title: 'Software Is Changing (Again)', author: 'Andrej Karpathy', publication: 'YouTube · AI Startup School 2025', url: 'https://www.youtube.com/watch?v=LCEmiRjPEtQ', description: 'The keynote framing software as moving from 1.0 (code) to 2.0 (weights) to 3.0 (English prompts).' },
              { title: 'Attention Is All You Need', author: 'Vaswani et al.', publication: 'arXiv · 2017', url: 'https://arxiv.org/abs/1706.03762', description: 'The transformer paper that underlies every model powering vibe coding today.' },
              { title: 'GPT-4 Technical Report', author: 'OpenAI', publication: 'arXiv · 2023', url: 'https://arxiv.org/abs/2303.08774', description: 'The report on the model class that first made everyday natural-language coding feel reliable.' },
              { title: 'The End of Programming', author: 'Matt Welsh', publication: 'Communications of the ACM · 2023', url: 'https://cacm.acm.org/magazines/2023/1/267976-the-end-of-programming/', description: 'An early, provocative argument that writing code by hand is on its way out.' },
            ],
          },
          matchingPairs: [
            { term: 'Vibe coding', definition: 'Describing what you want and letting AI write the code while you judge and steer' },
            { term: 'Andrej Karpathy', definition: 'Former Tesla AI director and OpenAI founder who coined the term in February 2025' },
            { term: 'Cursor Composer', definition: 'The AI coding tool Karpathy was driving (with Sonnet) when he described the practice' },
            { term: 'Software directing', definition: 'Expressing intent and reviewing output rather than writing every line yourself' },
            { term: 'Software 3.0', definition: "Karpathy's framing where the prompt is the program and English is the interface" },
            { term: 'The describe-run-fix loop', definition: 'Describe the change, run it, paste the error back, and repeat until it works' },
          ],
          scenarioQuiz: [
            {
              id: 'vc_m1_l1_s1',
              question: 'A friend says vibe coding means "you never need to understand anything, just keep prompting." Based on what Karpathy actually described, what is the most accurate correction?',
              options: [
                'He is right; vibe coding requires no judgment at all',
                'Karpathy framed it as a fast, low-friction style good for throwaway projects, where you still judge and steer the output',
                'Vibe coding only works if you read every line the AI writes',
                'Karpathy said it should replace all software engineering immediately',
              ],
              correct: 1,
              explanation: 'Karpathy scoped vibe coding to throwaway weekend projects and described judging and steering the model, not blind faith. The role shifts to directing, but judgment remains.',
            },
            {
              id: 'vc_m1_l1_s2',
              question: 'Why did the phrase "vibe coding" spread so fast when AI coding tools already existed?',
              options: [
                'It was the first time anyone had used AI to write code',
                'It named a real, slightly taboo shift (not reading the code) and came from a highly credible source at an inflection point',
                'It was heavily advertised by tool vendors',
                'It described a brand new programming language',
              ],
              correct: 1,
              explanation: 'The capability was not new, but the honest name from a credible figure, at the moment models crossed a usefulness threshold, gave people permission to admit how they were already working.',
            },
            {
              id: 'vc_m1_l1_s3',
              question: 'In the shift from "software engineering" to "software directing," which skill becomes MORE valuable?',
              options: [
                'Memorizing language syntax',
                'Typing speed',
                'Judgment: specifying intent clearly and reviewing whether output is correct and secure',
                'Avoiding all use of AI tools',
              ],
              correct: 2,
              explanation: 'When the model proposes the implementation, your value moves to specification and review. Taste and judgment matter more; raw syntax recall matters less.',
            },
          ],
        },
        {
          id: 'vibecoding_m1_l2',
          title: 'How It Actually Works',
          xp: 20,
          slides: [
            { type: 'intro', title: 'The Core Loop', body: 'Strip away the hype and vibe coding is a tight loop: describe what you want, let the AI generate it, run and test the result, then iterate. Each pass through the loop is fast, so you make progress by taking many small steps instead of one perfect plan.' },
            { type: 'text', title: 'The Tools That Run The Loop', body: 'Cursor and Windsurf are AI-first code editors. Claude Code is a terminal agent. GitHub Copilot lives inside your existing editor. They differ in surface, but all of them turn a natural-language request into edits across your files and run commands for you.' },
            { type: 'text', title: 'Prompts That Work Vs. Garbage', body: 'Vague prompts produce vague code. "Make a login page" gives you a generic guess. "Add an email and password login form to app/login using our existing Button component, validate with zod, and show inline errors" gives you something usable. Specificity, context, and constraints are everything.' },
            { type: 'highlight', title: 'The Context Window Is Your Working Memory', body: 'The model only knows what is in its context: the files it has seen, your instructions, and recent messages. Treat the context window like working memory. When it fills with stale or irrelevant detail, output quality drops. Curating what the model sees is half the skill.' },
            { type: 'summary', title: 'Lesson Complete! +20 XP', body: 'Vibe coding runs on a describe, generate, test, iterate loop powered by tools like Cursor, Windsurf, Claude Code, and Copilot. Specific prompts with context and constraints beat vague ones, and managing the context window like working memory keeps output sharp.' },
          ],
          summary:
            'Underneath the vibe is a concrete workflow: describe, generate, test, iterate, repeated quickly. The tools (Cursor, Windsurf, Claude Code, Copilot) all serve that loop. The two skills that separate smooth sessions from frustrating ones are writing specific prompts with real context and constraints, and managing the context window like the model\'s working memory.',
          sources: [
            { label: 'Cursor documentation', url: 'https://docs.cursor.com/' },
            { label: 'Claude Code overview (Anthropic)', url: 'https://docs.anthropic.com/en/docs/claude-code/overview' },
            { label: 'GitHub Copilot documentation', url: 'https://docs.github.com/en/copilot' },
          ],
          deepDive: {
            readingTime: '8 min',
            sections: [
              {
                heading: 'The Loop In Detail',
                body:
                  'Every vibe coding session is the same four-beat loop. First you describe a change in plain language. Second the tool generates edits, often across several files at once. Third you run the code, look at the result, or run the tests. Fourth you iterate: accept what works, and feed back what does not.\n\nThe reason this beats writing everything by hand is speed of iteration, not magic. Each loop might take thirty seconds. You are not trying to get the whole design right in your head before you type. You are steering toward the target with many small corrections, the way you park a car by adjusting rather than computing the exact trajectory.\n\nThis is why working software, even rough, appears fast. You are always one short loop away from seeing something real, and seeing something real is what tells you what to ask for next.',
              },
              {
                heading: 'How The Tools Differ',
                body:
                  'The tools fall into three rough shapes. IDE assistants like Cursor and Windsurf wrap a full editor around the model: you see files, diffs, and an agent that can edit many of them and run terminal commands. Terminal agents like Claude Code live in your shell and operate on the whole project, which suits larger codebases and automation. Inline assistants like GitHub Copilot add completion and chat to the editor you already use.\n\nThey share a core ability: translate a request into concrete edits and actions. Where they differ is how much they take over. A completion tool suggests the next few lines. An agent mode plans a multi-step change, edits several files, runs the tests, reads the errors, and tries again before handing back control.\n\nPicking a tool is mostly about how much autonomy you want and where you like to work, the editor or the terminal. You will compare them directly in the next module.',
              },
              {
                heading: 'Prompts That Work And Prompts That Fail',
                body:
                  'The single biggest lever on output quality is the prompt. Garbage prompts are vague, contextless, and unconstrained. "Make a login page" forces the model to guess your stack, your components, your validation rules, and your styling, so it returns a generic page you then have to rewrite.\n\nGood prompts supply three things: specificity about what you want, context about the existing code, and constraints on how to do it. "Add an email and password form to app/login.tsx, reuse our Button and Input components, validate with zod, surface inline errors, and do not add a new dependency" gives the model a narrow target it can actually hit.\n\nA useful habit is to state the file, the existing pieces to reuse, the behavior you expect, and the things to avoid. You are not being polite, you are removing degrees of freedom so the model stops guessing.',
              },
              {
                heading: 'Context As Working Memory',
                body:
                  'A model has no memory of your project beyond what is in its context window: the files it has been shown, your system instructions, and the recent conversation. Think of that window as working memory with a fixed size.\n\nTwo failure modes follow. If the window is missing key files, the model invents details that do not match your code. If the window is stuffed with stale, irrelevant, or contradictory content, quality degrades, a problem people call context rot. Either way the fix is curation: show the model the files that matter, keep instructions current, and start a fresh session when a thread has wandered.\n\nGood vibe coders manage context deliberately. They open the relevant files before asking, they keep a project rules file so standards are always present, and they break big tasks into focused conversations rather than one sprawling thread that slowly fills with noise.',
              },
            ],
            sources: [
              { label: 'Cursor documentation', url: 'https://docs.cursor.com/' },
              { label: 'Claude Code overview (Anthropic)', url: 'https://docs.anthropic.com/en/docs/claude-code/overview' },
              { label: 'Anthropic: prompt engineering overview', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview' },
            ],
            furtherReading: [
              { title: 'Prompt engineering overview', author: 'Anthropic', publication: 'Anthropic docs', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview', description: 'Practical, model-specific guidance on writing prompts that get reliable results.' },
              { title: 'Cursor documentation', author: 'Anysphere', publication: 'Cursor docs', url: 'https://docs.cursor.com/', description: 'How tab completion, Composer, and agent mode actually run the loop.' },
              { title: 'AI-assisted programming', author: 'Simon Willison', publication: 'simonwillison.net', url: 'https://simonwillison.net/tags/ai-assisted-programming/', description: 'An ongoing, hands-on log of what works and what fails when coding with LLMs.' },
            ],
          },
          matchingPairs: [
            { term: 'The vibe coding loop', definition: 'Describe, generate, test, iterate, repeated quickly in small steps' },
            { term: 'Specificity', definition: 'Naming the file, components, behavior, and constraints so the model stops guessing' },
            { term: 'Context window', definition: "The model's working memory: only what it has been shown affects the output" },
            { term: 'Context rot', definition: 'Quality drop when the window fills with stale or irrelevant content' },
            { term: 'Agent mode', definition: 'The tool plans a multi-step change, edits files, runs tests, and retries' },
            { term: 'Inline assistant', definition: 'Completion and chat added to your existing editor, like GitHub Copilot' },
          ],
          scenarioQuiz: [
            {
              id: 'vc_m1_l2_s1',
              question: 'You ask "make a login page" and get a generic result that ignores your design system. What is the best fix?',
              options: [
                'Ask the exact same prompt again and hope for better luck',
                'Rewrite the prompt with specifics: the file, the components to reuse, the validation rules, and what not to add',
                'Switch to a different model',
                'Give up and write it all by hand',
              ],
              correct: 1,
              explanation: 'Vague prompts force the model to guess. Adding the target file, the components to reuse, expected behavior, and constraints removes the guesswork.',
            },
            {
              id: 'vc_m1_l2_s2',
              question: 'After a long session, the model starts contradicting earlier decisions and referencing code that no longer exists. What is happening and what helps?',
              options: [
                'The model is broken; restart your computer',
                'Context rot: the window is full of stale content. Start a focused fresh session and re-share the files that matter',
                'You need a more expensive model',
                'The code is fine; ignore it',
              ],
              correct: 1,
              explanation: 'A bloated context window degrades output. Curating context, sometimes by starting fresh and re-sharing the relevant files, restores quality.',
            },
            {
              id: 'vc_m1_l2_s3',
              question: 'Why does rough but working software tend to appear quickly in vibe coding?',
              options: [
                'Because the model writes perfect code on the first try',
                'Because each describe-generate-test-iterate loop is short, so you steer toward the target with many fast corrections',
                'Because tests are skipped entirely',
                'Because the tools cache previous projects',
              ],
              correct: 1,
              explanation: 'Progress comes from fast iteration, not first-try perfection. Short loops let you see something real and adjust, rather than planning everything up front.',
            },
          ],
        },
        {
          id: 'vibecoding_m1_l3',
          title: 'What You Still Need to Know',
          xp: 20,
          slides: [
            { type: 'intro', title: 'Vibe Coding Is Not Zero Knowledge', body: 'The seductive promise is that you need to know nothing. The reality is that you need to know different things. You may not write every line, but you have to recognize good output, catch the model when it is wrong, and make the calls it cannot.' },
            { type: 'text', title: 'Recognizing Good Output', body: 'You cannot steer toward quality you cannot recognize. Knowing what a clean component, a sensible database schema, or a reasonable API looks like lets you tell when the model nailed it and when it produced something that merely runs.' },
            { type: 'text', title: 'Spotting Hallucinations', body: 'Models confidently invent things: functions that do not exist, libraries that were never published, APIs with the wrong signature. The most dangerous output is the plausible one. A basic mental model of how the system works is your hallucination detector.' },
            { type: 'highlight', title: 'Pilot Vs. Autopilot', body: 'Autopilot flies the plane, but a trained pilot is in the seat who knows where they are going, watches the instruments, and takes over when something is off. Vibe coding is autopilot for code. You still need to be a pilot: enough knowledge to set the destination and catch failures.' },
            { type: 'summary', title: 'Lesson Complete! +20 XP', body: 'Vibe coding lowers how much you type, not how much you understand. You need to recognize good output, detect hallucinations, make architecture and security calls, and act like a pilot supervising autopilot rather than a passenger.' },
          ],
          summary:
            'The myth is that vibe coding needs no technical knowledge. The truth is it needs a different distribution of it. You trade syntax recall for judgment: recognizing good output, catching hallucinated functions and libraries, making architecture and security decisions, and knowing when to take the controls. The pilot versus autopilot analogy captures it: the autopilot is powerful, but a knowledgeable pilot stays responsible for the flight.',
          sources: [
            { label: 'Simon Willison: AI-assisted programming notes', url: 'https://simonwillison.net/tags/ai-assisted-programming/' },
            { label: 'Anthropic: reducing hallucinations', url: 'https://docs.anthropic.com/en/docs/test-and-evaluate/strengthen-guardrails/reduce-hallucinations' },
            { label: 'OWASP Top 10 (web security basics)', url: 'https://owasp.org/www-project-top-ten/' },
          ],
          deepDive: {
            readingTime: '8 min',
            sections: [
              {
                heading: 'The Myth Of Zero Knowledge',
                body:
                  'The most damaging misreading of vibe coding is that it abolishes the need to understand anything. It does not. It changes which knowledge pays off. The hours you used to spend memorizing exact syntax and API signatures matter less, because the model recalls those instantly. The judgment about what to build and whether the result is any good matters more, because the model cannot supply your intent or your standards.\n\nThink of it as moving up a level of abstraction, not removing yourself from the work. A bridge engineer who uses simulation software still needs to understand loads and materials, or they cannot tell when the simulation output is dangerous. Vibe coding gives you a powerful simulator for software. It does not give you the understanding that tells you when its answer is wrong.',
              },
              {
                heading: 'Knowing What Good Looks Like',
                body:
                  'You can only steer toward quality you can recognize. If you do not know what a clean React component looks like, every component the model returns looks equally fine, and you accept the one that merely runs over the one that is actually maintainable.\n\nThis is why a baseline of literacy across the stack matters even when you are not writing it by hand. You want enough of a mental picture of components, state, data models, API design, and error handling to react to what you see. The good news is that vibe coding is itself a fast way to build that literacy: you can ask the model to explain its choices, propose alternatives, and walk you through tradeoffs, turning every session into a tutorial if you let it.\n\nThe failure mode to avoid is accepting output you do not understand on the assumption that it must be right because it ran.',
              },
              {
                heading: 'The Hallucination Problem',
                body:
                  'Models generate the most likely continuation of your prompt, which is usually correct and occasionally confidently fictional. They invent functions that do not exist, import libraries that were never published, and call real APIs with invented parameters. Because the wrong output is fluent and well formatted, it is easy to trust.\n\nThe defense is a working model of the system in your head, plus the discipline to verify. If the code imports a package, does that package exist and is it the real one. If it calls an API, does that method actually take those arguments. Running the code catches many hallucinations immediately, which is one more reason the test step of the loop is not optional.\n\nHallucinated dependencies are also a security issue, not just a bug. Attackers have begun publishing malicious packages under names that models commonly hallucinate, so an unverified import can be an attack vector. You will revisit this in the safety lesson.',
              },
              {
                heading: 'Be The Pilot, Not The Passenger',
                body:
                  'Modern aircraft fly on autopilot for most of a journey, yet no airline removes the pilot. The autopilot handles the routine; the pilot sets the destination, monitors the instruments, and takes over the moment something is off. That is exactly the right posture for vibe coding.\n\nAs the pilot you own a few things the autopilot cannot: where you are going (the actual requirements), the instruments (does it run, is it secure, is it fast enough), and the decision to intervene (stop vibing and read or rewrite the code). A passenger, by contrast, just trusts the system and finds out about the problem on impact.\n\nThe practical line is this: let the AI handle the typing, but keep your hands near the controls. The more important or long-lived the software, the more you fly it yourself.',
              },
            ],
            sources: [
              { label: 'Simon Willison: AI-assisted programming notes', url: 'https://simonwillison.net/tags/ai-assisted-programming/' },
              { label: 'Anthropic: reducing hallucinations', url: 'https://docs.anthropic.com/en/docs/test-and-evaluate/strengthen-guardrails/reduce-hallucinations' },
              { label: 'OWASP Top 10 (web security basics)', url: 'https://owasp.org/www-project-top-ten/' },
            ],
            furtherReading: [
              { title: 'Hallucination of computer terms and packages', author: 'Security researchers / Lasso, Socket', publication: 'Industry reporting · 2024', url: 'https://www.lasso.security/blog/ai-package-hallucinations', description: 'How models invent package names and why that creates a real supply-chain attack surface.' },
              { title: 'Reduce hallucinations', author: 'Anthropic', publication: 'Anthropic docs', url: 'https://docs.anthropic.com/en/docs/test-and-evaluate/strengthen-guardrails/reduce-hallucinations', description: 'Concrete techniques to make model output more grounded and verifiable.' },
              { title: 'OWASP Top 10', author: 'OWASP Foundation', publication: 'owasp.org', url: 'https://owasp.org/www-project-top-ten/', description: 'The baseline web-security risks every vibe coder should be able to recognize.' },
            ],
          },
          matchingPairs: [
            { term: 'Zero-knowledge myth', definition: 'The false idea that vibe coding requires understanding nothing technical' },
            { term: 'Recognizing good output', definition: 'The literacy to tell maintainable code from code that merely runs' },
            { term: 'Hallucination', definition: 'Confident, fluent output that is invented: fake functions, libraries, or APIs' },
            { term: 'Pilot vs autopilot', definition: 'You set the destination and watch the instruments; AI handles the routine flying' },
            { term: 'Plausible-but-wrong', definition: 'The most dangerous output, because it looks right and runs' },
            { term: 'Verification', definition: 'Running and checking output to catch invented dependencies and bad logic' },
          ],
          scenarioQuiz: [
            {
              id: 'vc_m1_l3_s1',
              question: 'The model generates code that imports a package you have never heard of, and it looks plausible. What should you do before shipping?',
              options: [
                'Trust it; the model rarely makes mistakes',
                'Verify the package actually exists and is the legitimate one, since models hallucinate dependencies that can even be malicious',
                'Delete all imports to be safe',
                'Ship it and fix problems later',
              ],
              correct: 1,
              explanation: 'Hallucinated package names are common and have become an attack vector. Always confirm a dependency is real and legitimate before trusting it.',
            },
            {
              id: 'vc_m1_l3_s2',
              question: 'Which statement best captures how knowledge requirements change with vibe coding?',
              options: [
                'You need no knowledge at all',
                'You need the same knowledge as before, just typed faster',
                'You trade syntax recall for judgment: recognizing good output, catching errors, and making design and security calls',
                'You only need to know how to copy and paste',
              ],
              correct: 2,
              explanation: 'Vibe coding moves you up a level of abstraction. Memorized syntax matters less; judgment about quality, correctness, and security matters more.',
            },
            {
              id: 'vc_m1_l3_s3',
              question: 'Using the pilot versus autopilot analogy, when should you "take the controls"?',
              options: [
                'Never; the autopilot is always right',
                'On routine, low-stakes changes only',
                'When the software is important or long-lived, or when the instruments show something is wrong',
                'Only if the AI explicitly asks you to',
              ],
              correct: 2,
              explanation: 'Let autopilot handle the routine, but intervene as stakes rise or when checks (does it run, is it secure) reveal a problem.',
            },
          ],
        },
        {
          id: 'vibecoding_m1_l4',
          title: 'The Tools Landscape',
          xp: 20,
          slides: [
            { type: 'intro', title: 'A Crowded, Fast-Moving Field', body: 'There is no single vibe coding tool. There is a landscape: AI-first editors, terminal agents, inline assistants, and full-app generators. Each is optimized for a different job, and the right choice depends on what you are building and where you like to work.' },
            { type: 'text', title: 'Editors And Agents', body: 'Cursor and Windsurf are AI-native editors built around an agent that edits your project. Claude Code is a terminal-native agent strong on large codebases. GitHub Copilot adds AI to the editor you already use. These are for working on real, ongoing codebases.' },
            { type: 'text', title: 'Prompt-To-App Generators', body: 'Bolt.new and v0 by Vercel go from a text prompt to a running app or UI in minutes. They are unbeatable for prototypes and starting points, and they hit limits as the app grows past their templates and assumptions.' },
            { type: 'highlight', title: 'MCP Extends Everything', body: 'The Model Context Protocol is an open standard that lets AI coding tools connect to external systems: your database, your issue tracker, your docs, your design files. MCP is how a coding agent stops being limited to your files and starts acting on your whole stack.' },
            { type: 'summary', title: 'Lesson Complete! +20 XP', body: 'The landscape splits into editors and agents (Cursor, Windsurf, Claude Code, Copilot) for ongoing codebases and generators (Bolt.new, v0) for fast prototypes. MCP is the open protocol that connects any of them to your external tools and data.' },
          ],
          summary:
            'There is no one tool, there is a landscape. AI-first editors (Cursor, Windsurf) and terminal agents (Claude Code) and inline assistants (Copilot) serve ongoing codebases. Prompt-to-app generators (Bolt.new, v0 by Vercel) produce running prototypes in minutes but hit template limits. Tying it together, the Model Context Protocol lets any of these tools reach beyond your files into your database, docs, and other systems.',
          sources: [
            { label: 'Cursor', url: 'https://www.cursor.com/' },
            { label: 'Windsurf', url: 'https://windsurf.com/' },
            { label: 'Model Context Protocol', url: 'https://modelcontextprotocol.io/' },
          ],
          deepDive: {
            readingTime: '9 min',
            sections: [
              {
                heading: 'Four Shapes Of Tool',
                body:
                  'It helps to sort the field into four shapes rather than a long brand list. AI-first editors (Cursor, Windsurf) put a model at the center of a full IDE. Terminal agents (Claude Code) operate on your project from the command line and are comfortable with large repositories and automation. Inline assistants (GitHub Copilot) bolt AI completion and chat onto the editor you already use. App generators (Bolt.new, v0) turn a prompt directly into a running app or interface.\n\nThe shapes answer different questions. Editors and agents answer "help me build and maintain this codebase." Generators answer "give me a working starting point right now." Most serious builders end up using more than one: a generator to bootstrap, then an editor or terminal agent to grow it.',
              },
              {
                heading: 'Cursor And Windsurf',
                body:
                  'Cursor, from Anysphere, is the tool most associated with the AI coding wave. It is a fork of VS Code with deep model integration: smart tab completion, a chat that knows your codebase, and Composer or agent modes that make multi-file changes and run commands. Its rules files let you encode your stack and standards so output matches your project.\n\nWindsurf, from the team formerly known as Codeium, is a close competitor with a similar IDE shape and a strong agentic flow it brands as Cascade, designed to keep the model aware of context as it works across files. The two are close enough that the choice often comes down to feel, pricing, and which agent behavior you prefer.\n\nBoth are aimed at people who want to live in a full editor while a capable agent does much of the typing.',
              },
              {
                heading: 'Claude Code, Copilot, And Generators',
                body:
                  'Claude Code is Anthropic\'s terminal-native agent. Because it lives in the shell and reads your whole project, it suits larger codebases, scripted workflows, and tasks that span many files. It leans fully agentic: plan, edit, run, observe, repeat, with memory and tool access rather than a single completion.\n\nGitHub Copilot, from GitHub and Microsoft, is the most widely deployed assistant. It started as autocomplete and grew chat and agentic features, and its strength is ubiquity and enterprise reach inside existing editors.\n\nBolt.new and v0 occupy the generator slot. Bolt.new spins up a full-stack app in the browser from a prompt, runnable and editable immediately. v0 by Vercel specializes in generating UI and front-end components, tightly tied to React, Next.js, and the Vercel deploy path. Both are fastest at the start of a project and need a handoff to an editor as complexity grows.',
              },
              {
                heading: 'MCP: The Connective Tissue',
                body:
                  'The Model Context Protocol, introduced by Anthropic and adopted broadly, is an open standard for connecting AI applications to external tools and data. Before MCP, every tool integration was bespoke. MCP gives a common interface so a coding agent can talk to your database, your issue tracker, your documentation, your design files, or any service that exposes an MCP server.\n\nThe practical effect is that the model stops being trapped inside your source files. With the right MCP servers connected, an agent can read your real schema before writing a query, pull the text of a ticket it is implementing, or check your component library before generating UI. It is sometimes described as a universal adapter, like a standard port that any tool and any data source can plug into.\n\nFor the tools above, MCP is increasingly how they gain new powers without each vendor building every integration by hand. You will go deeper on MCP, including building your own server, later in the track.',
              },
            ],
            sources: [
              { label: 'Cursor', url: 'https://www.cursor.com/' },
              { label: 'Claude Code overview (Anthropic)', url: 'https://docs.anthropic.com/en/docs/claude-code/overview' },
              { label: 'v0 by Vercel', url: 'https://v0.dev/' },
              { label: 'Model Context Protocol', url: 'https://modelcontextprotocol.io/' },
            ],
            furtherReading: [
              { title: 'Introducing the Model Context Protocol', author: 'Anthropic', publication: 'anthropic.com · 2024', url: 'https://www.anthropic.com/news/model-context-protocol', description: 'The announcement and rationale for the open standard now connecting AI tools to data.' },
              { title: 'Cursor documentation', author: 'Anysphere', publication: 'Cursor docs', url: 'https://docs.cursor.com/', description: 'Reference for tab, Composer, agent mode, and rules files.' },
              { title: 'v0 documentation', author: 'Vercel', publication: 'v0.dev/docs', url: 'https://v0.dev/docs', description: 'How prompt-to-UI generation works and where it fits in a real project.' },
            ],
          },
          matchingPairs: [
            { term: 'Cursor', definition: 'AI-first editor (VS Code fork) with tab, Composer, agent mode, and rules files' },
            { term: 'Claude Code', definition: "Anthropic's terminal-native agent, strong on large codebases and automation" },
            { term: 'GitHub Copilot', definition: 'The most widely deployed assistant, AI added to your existing editor' },
            { term: 'Bolt.new', definition: 'Generates a full-stack app from a prompt, runnable in the browser' },
            { term: 'v0 by Vercel', definition: 'Generates UI and front-end components tied to React, Next.js, and Vercel' },
            { term: 'MCP', definition: 'Open protocol connecting AI tools to external data and services' },
          ],
          scenarioQuiz: [
            {
              id: 'vc_m1_l4_s1',
              question: 'You want a working prototype of an app idea in the next ten minutes to show a friend. Which tool fits best?',
              options: [
                'A terminal agent on an empty repo',
                'A prompt-to-app generator like Bolt.new or v0',
                'A plain text editor with no AI',
                'A spreadsheet',
              ],
              correct: 1,
              explanation: 'Generators are optimized for going from a prompt to a running app or UI in minutes, which is exactly the fast-prototype job.',
            },
            {
              id: 'vc_m1_l4_s2',
              question: 'You are maintaining a large existing codebase and want an agent that can work across many files from the command line. Which is the most natural fit?',
              options: [
                'v0 by Vercel',
                'Bolt.new',
                'Claude Code',
                'A static prototype generator',
              ],
              correct: 2,
              explanation: 'Claude Code is terminal-native and reads the whole project, which suits large codebases and multi-file, scripted work.',
            },
            {
              id: 'vc_m1_l4_s3',
              question: 'Your coding agent keeps writing database queries against a schema it is guessing at. What standard lets it read your real schema and other systems directly?',
              options: [
                'A faster model',
                'The Model Context Protocol (MCP)',
                'A bigger monitor',
                'Turning off autocomplete',
              ],
              correct: 1,
              explanation: 'MCP is the open protocol that connects AI tools to external data and services, so the agent can read the real schema instead of guessing.',
            },
          ],
        },
        {
          id: 'vibecoding_m1_l5',
          title: 'Vibe Coding in Production',
          xp: 20,
          slides: [
            { type: 'intro', title: 'From Demo To Dependable', body: 'Vibe coding ships real things: internal tools, landing pages, prototypes that win funding, small products that make money. It also has a gap between a working demo and software real users depend on. Knowing where that gap is keeps you out of trouble.' },
            { type: 'text', title: 'What Actually Gets Shipped', body: 'The clearest wins are scoped: a CRUD app, an internal dashboard, a marketing site, an MVP to test demand. Solo founders and small teams use vibe coding to go from idea to live in days instead of months.' },
            { type: 'text', title: 'The Prototype-To-Product Gap', body: 'A prototype proves an idea. A product survives real users, edge cases, scale, security, and maintenance. AI gets you across the prototype line fast, then the unglamorous work begins: error handling, tests, auth, performance, and the parts of the spec the happy path ignored.' },
            { type: 'highlight', title: 'Handing Off AI-Generated Code', body: 'When a vibe coded project meets a real engineering team, the handoff matters. Document what it does, what is unverified, and where the risk is. Treat AI-generated code as a draft to be reviewed, tested, and hardened, not as a finished system that happens to run.' },
            { type: 'summary', title: 'Lesson Complete! +20 XP', body: 'Vibe coding genuinely ships scoped tools, sites, and MVPs, especially for solo builders. The risk lives in the prototype-to-product gap: edge cases, scale, security, and maintenance. Treat AI output as a reviewable draft and hand it off with honest documentation of what is and is not verified.' },
          ],
          summary:
            'Vibe coding is not just demos. People ship internal tools, marketing sites, and MVPs with it, and solo founders compress months into days. The catch is the prototype-to-product gap: the distance between code that runs on the happy path and software that survives real users, edge cases, scale, and security. The professional move is to treat AI output as a draft, harden it, and document honestly what has and has not been verified when handing it to a team.',
          sources: [
            { label: 'Simon Willison: AI-assisted programming notes', url: 'https://simonwillison.net/tags/ai-assisted-programming/' },
            { label: 'The Twelve-Factor App (production app principles)', url: 'https://12factor.net/' },
            { label: 'OWASP Top 10', url: 'https://owasp.org/www-project-top-ten/' },
          ],
          deepDive: {
            readingTime: '8 min',
            sections: [
              {
                heading: 'What Vibe Coding Really Ships',
                body:
                  'It is easy to swing between two myths: that vibe coding ships nothing serious, or that it ships everything effortlessly. The truth sits in between and is mostly about scope. The reliable wins are bounded problems: an internal dashboard, a CRUD app, a landing page, a scheduling tool, a minimum viable product to test whether anyone wants the thing.\n\nFor solo builders and small teams the leverage is real. Work that once needed a contractor and several weeks can now be a weekend. Founders use it to put a testable product in front of users while the idea is still hot, which changes what one person can attempt. None of that requires pretending the output is flawless. It requires choosing problems where a fast, scoped build is exactly what you need.',
              },
              {
                heading: 'The Prototype-To-Product Gap',
                body:
                  'A prototype has one job: prove the idea works on the happy path. A product has a harder job: keep working when reality arrives. Between them sits a gap made of unglamorous work, and AI gets you to the edge of that gap quickly, which can fool you into thinking you are done.\n\nThe gap is filled with the things the happy path ignores. What happens on bad input, network failure, or an empty state. What happens at a thousand times the load. How auth and permissions actually hold up. Whether there are tests so the next change does not silently break the last one. How the thing is monitored, backed up, and updated. Models will produce some of this if asked, but they will not notice it is missing unless you do.\n\nThe skill is recognizing which side of the gap you are on and being honest about it, especially when money or user trust is involved.',
              },
              {
                heading: 'When Vibe Coding Hits Its Limits',
                body:
                  'Vibe coding strains in predictable places. Complex business logic with many interacting rules is hard to specify in prose and easy for a model to get subtly wrong. Database migrations and data integrity reward careful, deliberate engineering over fast iteration. Performance work needs measurement and reasoning the model cannot do for you. Anything security-sensitive demands real review, because plausible-looking code can hide serious flaws.\n\nThe pattern is that vibe coding shines where iteration is cheap and mistakes are visible, and struggles where mistakes are expensive, invisible, or require holding a large, precise model of the system in mind. Recognizing those zones tells you when to slow down, read the code, write tests, and bring in human engineering judgment.',
              },
              {
                heading: 'Handing Off To A Real Team',
                body:
                  'Plenty of vibe coded projects succeed and then need to become real systems maintained by engineers. That handoff is where good intentions go wrong, because AI-generated code can look finished while hiding assumptions nobody wrote down.\n\nA clean handoff treats the code as a reviewed draft, not a finished product. Document what the app does and how it is structured. Flag what is unverified or known to be fragile. Point out where the security and data risks live. Add tests around the behavior you care about so the team can change things safely. And resist the urge to oversell: saying "this works but has not been load tested or security reviewed" is far more useful than implying it is production hardened.\n\nThe goal is to transfer not just the code but an honest map of its trust boundaries, so the receiving team knows what to harden first.',
              },
            ],
            sources: [
              { label: 'The Twelve-Factor App', url: 'https://12factor.net/' },
              { label: 'OWASP Top 10', url: 'https://owasp.org/www-project-top-ten/' },
              { label: 'Simon Willison: AI-assisted programming notes', url: 'https://simonwillison.net/tags/ai-assisted-programming/' },
            ],
            furtherReading: [
              { title: 'The Twelve-Factor App', author: 'Adam Wiggins et al.', publication: '12factor.net', url: 'https://12factor.net/', description: 'A durable checklist of what separates a prototype from a production-ready service.' },
              { title: 'AI-assisted programming', author: 'Simon Willison', publication: 'simonwillison.net', url: 'https://simonwillison.net/tags/ai-assisted-programming/', description: 'Field notes on what AI coding ships well and where it quietly fails.' },
              { title: 'OWASP Top 10', author: 'OWASP Foundation', publication: 'owasp.org', url: 'https://owasp.org/www-project-top-ten/', description: 'The risks to review before any AI-built app meets real users.' },
            ],
          },
          matchingPairs: [
            { term: 'Scoped win', definition: 'A bounded problem like a dashboard, CRUD app, landing page, or MVP' },
            { term: 'Prototype', definition: 'Code that proves the idea on the happy path' },
            { term: 'Product', definition: 'Software that survives real users, edge cases, scale, and security' },
            { term: 'Prototype-to-product gap', definition: 'The unglamorous work of error handling, tests, auth, and hardening' },
            { term: 'Hard zone for AI', definition: 'Complex business logic, migrations, performance, and security work' },
            { term: 'Honest handoff', definition: 'Documenting what is unverified and treating output as a reviewable draft' },
          ],
          scenarioQuiz: [
            {
              id: 'vc_m1_l5_s1',
              question: 'Your vibe coded MVP works in the demo. Before charging real customers, what is the priority?',
              options: [
                'Add more features immediately',
                'Close the prototype-to-product gap: error handling, edge cases, auth, tests, and a security review',
                'Rewrite everything from scratch by hand',
                'Nothing; if the demo works it is done',
              ],
              correct: 1,
              explanation: 'Working on the happy path is not the same as being production ready. The gap is the unglamorous hardening work, and it matters most once trust and money are involved.',
            },
            {
              id: 'vc_m1_l5_s2',
              question: 'Which task is most likely to expose vibe coding\'s limits?',
              options: [
                'A simple marketing landing page',
                'An internal dashboard reading from one table',
                'A complex billing system with many interacting rules and a tricky data migration',
                'A static about page',
              ],
              correct: 2,
              explanation: 'Complex business logic and migrations reward careful engineering over fast iteration, and subtle mistakes there are expensive and easy to miss.',
            },
            {
              id: 'vc_m1_l5_s3',
              question: 'You are handing a vibe coded project to an engineering team. What is the most professional thing to include?',
              options: [
                'A claim that it is fully production ready',
                'Only the source code with no notes',
                'An honest map: what it does, what is unverified or fragile, where security and data risks are, and tests around key behavior',
                'A request that they not change anything',
              ],
              correct: 2,
              explanation: 'A good handoff transfers an honest understanding of trust boundaries, not just code. Flagging what is unverified tells the team what to harden first.',
            },
          ],
        },
      ],
      quiz: [
        { id: 'vibecoding_m1_q1', question: 'What did Andrej Karpathy mean by "vibe coding" in his February 2025 post?', options: ['Writing code only at night for the vibes', 'Leaning fully on capable AI to write code while you describe what you want and stop reading every line', 'A new programming language', 'Coding without any tools at all'], correct: 1, explanation: 'He described giving in to the vibes: letting strong models write the code while you describe intent and iterate, to the point of forgetting the code exists.' },
        { id: 'vibecoding_m1_q2', question: 'Why is the context window described as the model\'s "working memory"?', options: ['It stores files permanently on disk', 'The model only knows what is currently in it, so curating that content controls output quality', 'It is where the AI saves your passwords', 'It has unlimited size'], correct: 1, explanation: 'The model has no memory of your project beyond its context window. Missing or stale content directly degrades output, so managing it is a core skill.' },
        { id: 'vibecoding_m1_q3', question: 'Which best describes the "pilot vs autopilot" stance toward vibe coding?', options: ['Trust the AI completely and never intervene', 'Refuse to use AI at all', 'Let AI handle routine work, but stay knowledgeable enough to set the goal, watch the instruments, and take over when needed', 'Only use AI for documentation'], correct: 2, explanation: 'Autopilot handles the routine; the pilot sets the destination, monitors instruments, and intervenes. Vibe coding works the same way.' },
      ],
    },
    {
      id: 'vibecoding_m2',
      level: 'beginner',
      title: 'The AI Coding Tools',
      emoji: '🧰',
      description: 'A hands-on tour of the tools: Cursor, Claude Code, GitHub Copilot, Bolt.new and v0, and the Model Context Protocol that connects them.',
      color: '#8B5CF6',
      lessons: [
        {
          id: 'vibecoding_m2_l1',
          title: 'Cursor',
          xp: 20,
          slides: [
            { type: 'intro', title: 'The Editor That Started The Wave', body: 'Cursor, built by Anysphere, is the tool most people picture when they hear AI coding. It is a fork of VS Code with a model woven through every surface, and its rapid growth in 2024 and 2025 helped turn AI-assisted coding from a novelty into a default.' },
            { type: 'text', title: 'Tab, Composer, Agent', body: 'Cursor has three core modes. Tab is predictive multi-line completion that anticipates your next edit. Composer (chat) lets you ask for changes across files in natural language. Agent mode plans a multi-step task, edits files, runs commands, reads the output, and iterates.' },
            { type: 'text', title: 'Writing .cursorrules', body: 'A rules file tells Cursor how your project works: the stack, conventions, libraries to prefer, things to avoid. With good rules, every generation already matches your style instead of you correcting it every time.' },
            { type: 'highlight', title: 'A Real Workflow', body: 'A typical loop: open the files you care about so they are in context, describe the change in Composer, let the agent edit and run, review the diff, accept or refine. You stay in the editor the whole time, reading diffs rather than typing lines.' },
            { type: 'summary', title: 'Lesson Complete! +20 XP', body: 'Cursor is an AI-first VS Code fork with Tab completion, Composer chat, and an agent mode. A rules file encodes your stack and standards so output fits your project, and the everyday workflow is context, describe, review the diff, refine.' },
          ],
          summary:
            'Cursor is the AI-first editor that pushed vibe coding into the mainstream. It pairs a familiar VS Code surface with three modes: Tab for predictive completion, Composer for natural-language changes, and an agent that plans, edits, and runs. The lever that makes it feel tailored is the rules file, which encodes your stack and conventions so generations match your project from the start.',
          sources: [
            { label: 'Cursor', url: 'https://www.cursor.com/' },
            { label: 'Cursor documentation', url: 'https://docs.cursor.com/' },
            { label: 'Cursor: rules for AI', url: 'https://docs.cursor.com/context/rules' },
          ],
          deepDive: {
            readingTime: '8 min',
            sections: [
              {
                heading: 'Why Cursor Caught On',
                body:
                  'Cursor succeeded partly by not making you switch tools. By forking VS Code it inherited the extensions, keybindings, and muscle memory millions of developers already had, then added deep model integration on top. The bet was that AI should meet you in the editor you already know, not ask you to learn a new one.\n\nThe other half was speed and quality of the integration. Cursor invested heavily in low-latency completion and in keeping the model aware of your codebase, so its suggestions felt relevant rather than generic. As the underlying models improved through 2024 and 2025, the editor that was best at feeding them context got disproportionate benefit, and Cursor rode that wave to become the reference point for the category.',
              },
              {
                heading: 'Tab, Composer, And Agent Mode',
                body:
                  'Cursor offers escalating levels of autonomy. Tab is predictive completion that goes beyond a single line: it guesses your next edit, including jumps to other places in the file, so accepting suggestions feels like the editor finishing your thought.\n\nComposer is the conversational layer. You describe a change in plain language, referencing files, and Cursor proposes edits you can review as diffs. It is the workhorse for "add this feature" or "refactor this" requests.\n\nAgent mode is the most autonomous. Given a goal, it plans a sequence of steps, edits multiple files, runs terminal commands and tests, reads the results, and keeps going until the task is done or it needs you. The skill is choosing the right level: Tab for flow, Composer for scoped changes, agent for multi-step work you are happy to supervise rather than micromanage.',
              },
              {
                heading: 'Rules Files As Project Memory',
                body:
                  'Left alone, a model writes in a generic style and re-guesses your conventions every session. A rules file fixes that by giving Cursor standing instructions about your project. Modern Cursor supports project rules (stored in the repo) as well as the older .cursorrules file, and the idea is the same: persistent context that is always present.\n\nGood rules state the stack and versions, the libraries and patterns to prefer, the conventions for naming and structure, and the things to avoid. For example: use TypeScript and the App Router, prefer server components, validate input with zod, never introduce a new state library, keep components under a certain size. With those in place, the first draft already looks like your code.\n\nBecause rules live in the repository, they also act as shared team memory: every contributor, human or AI, gets the same standards without anyone restating them.',
              },
              {
                heading: 'A Concrete Session',
                body:
                  'Picture adding a feature. You open the two or three files involved so they sit in context. In Composer you write a specific request: add a saved-items feature, store ids in localStorage through the existing useStorage hook, show a filled or outline icon based on state, and reuse the Button component. Cursor proposes a diff across those files.\n\nYou read the diff, not every character but enough to judge it. The state logic looks right; the icon import is wrong, so you reply "use the Heart icon from lucide-react instead" and it adjusts. You run the app, click the button, see it work, and accept. Total time, a few minutes.\n\nNotice the shape: your attention went to context, specification, and review, while the typing went to the agent. That is the Cursor loop, and it is the template for nearly every AI-first editor.',
              },
            ],
            sources: [
              { label: 'Cursor documentation', url: 'https://docs.cursor.com/' },
              { label: 'Cursor: rules for AI', url: 'https://docs.cursor.com/context/rules' },
              { label: 'Cursor: features overview', url: 'https://www.cursor.com/features' },
            ],
            furtherReading: [
              { title: 'Cursor documentation', author: 'Anysphere', publication: 'Cursor docs', url: 'https://docs.cursor.com/', description: 'The reference for Tab, Composer, agent mode, and context features.' },
              { title: 'Rules for AI', author: 'Anysphere', publication: 'Cursor docs', url: 'https://docs.cursor.com/context/rules', description: 'How to write project rules that keep generations on-style.' },
              { title: 'AI-assisted programming', author: 'Simon Willison', publication: 'simonwillison.net', url: 'https://simonwillison.net/tags/ai-assisted-programming/', description: 'Real-world notes on getting value out of editor-based AI coding.' },
            ],
          },
          matchingPairs: [
            { term: 'Cursor', definition: 'AI-first editor built as a fork of VS Code by Anysphere' },
            { term: 'Tab', definition: 'Predictive multi-line completion that anticipates your next edit' },
            { term: 'Composer', definition: 'Natural-language chat that proposes changes across files as diffs' },
            { term: 'Agent mode', definition: 'Plans steps, edits files, runs commands, and iterates toward a goal' },
            { term: '.cursorrules / project rules', definition: 'Standing instructions encoding your stack, conventions, and no-go list' },
            { term: 'Reviewing the diff', definition: 'Judging proposed changes instead of typing them yourself' },
          ],
          scenarioQuiz: [
            {
              id: 'vc_m2_l1_s1',
              question: 'Cursor keeps generating components with a styling approach your project does not use. What is the durable fix?',
              options: [
                'Correct it manually every single time',
                'Add a rules file stating your styling approach and conventions so every generation matches',
                'Stop using Cursor',
                'Switch models repeatedly until one guesses right',
              ],
              correct: 1,
              explanation: 'Rules files give Cursor persistent project context, so it stops re-guessing your conventions and produces on-style output from the first draft.',
            },
            {
              id: 'vc_m2_l1_s2',
              question: 'You want to make a focused, two-file change and carefully review it. Which Cursor mode fits best?',
              options: [
                'Tab completion only',
                'Composer, describing the change and reviewing the proposed diff',
                'Agent mode left fully unsupervised on the whole repo',
                'None; type it all by hand',
              ],
              correct: 1,
              explanation: 'Composer is the workhorse for scoped changes you describe and review as a diff. Agent mode is better for larger multi-step work.',
            },
            {
              id: 'vc_m2_l1_s3',
              question: 'Why did forking VS Code help Cursor succeed?',
              options: [
                'It made Cursor cheaper to run',
                'It let developers keep their existing extensions, keybindings, and habits while gaining deep AI integration',
                'It removed the need for any models',
                'It made the editor open source',
              ],
              correct: 1,
              explanation: 'Meeting developers in a familiar editor lowered the switching cost, so the value of the AI integration could land without forcing people to relearn their tools.',
            },
          ],
        },
        {
          id: 'vibecoding_m2_l2',
          title: 'Claude Code',
          xp: 20,
          slides: [
            { type: 'intro', title: 'AI Coding In The Terminal', body: 'Claude Code is Anthropic\'s coding agent, and it lives where a lot of real work happens: the terminal. Instead of wrapping an editor, it operates on your whole project from the command line, reading files, running commands, and making changes as an agent.' },
            { type: 'text', title: 'Agentic By Default', body: 'Claude Code does not just complete lines. Given a task it explores the codebase, plans, edits across files, runs tests and tools, reads the results, and keeps going. You supervise the loop rather than drive every keystroke.' },
            { type: 'text', title: 'Memory And CLAUDE.md', body: 'A CLAUDE.md file at the project root acts as persistent memory: your conventions, commands, architecture notes, and preferences. It is loaded into context so the agent behaves consistently across sessions, the terminal cousin of a rules file.' },
            { type: 'highlight', title: 'Why It Suits Large Codebases', body: 'Because it reads the whole project and works through the shell, Claude Code is comfortable with big repositories, scripted and automated tasks, and changes that span many files. MCP servers extend it to your database, issues, and other systems.' },
            { type: 'summary', title: 'Lesson Complete! +20 XP', body: 'Claude Code is a terminal-native, agentic coding tool from Anthropic. It plans and executes multi-file work through the shell, uses CLAUDE.md as persistent memory, connects to systems via MCP, and is well suited to larger codebases and automation.' },
          ],
          summary:
            'Claude Code is Anthropic\'s terminal-native coding agent. Rather than wrapping an editor, it works on your whole project from the command line: exploring, planning, editing across files, and running tools in a supervised loop. A CLAUDE.md file gives it persistent memory of your conventions and commands, and MCP connects it to external systems, which together make it strong for large codebases and automation.',
          sources: [
            { label: 'Claude Code overview (Anthropic)', url: 'https://docs.anthropic.com/en/docs/claude-code/overview' },
            { label: 'Claude Code: memory and CLAUDE.md', url: 'https://docs.anthropic.com/en/docs/claude-code/memory' },
            { label: 'Model Context Protocol', url: 'https://modelcontextprotocol.io/' },
          ],
          deepDive: {
            readingTime: '8 min',
            sections: [
              {
                heading: 'Why The Terminal',
                body:
                  'Most AI coding tools wrap an editor. Claude Code makes a different bet: that the command line is where serious project work converges. Builds, tests, version control, deployment, and scripts all run in the shell, so an agent that lives there can touch the whole development lifecycle, not just the text of your files.\n\nThe terminal is also composable. A tool that reads and writes through the shell can be scripted, piped, scheduled, and dropped into continuous integration. That makes Claude Code feel less like an assistant in one window and more like an agent you can point at a repository and a goal. The tradeoff is that it asks you to be comfortable in the terminal, which is exactly why it appeals to developers working on real, larger systems.',
              },
              {
                heading: 'How The Agent Loop Works',
                body:
                  'Given a task, Claude Code behaves like an agent rather than an autocomplete. It first explores: searching and reading files to understand the relevant parts of the codebase. It forms a plan, then carries it out by editing files and running commands such as tests, linters, or the app itself. It reads the output of those commands and uses it to correct course, repeating until the task is complete or it needs your input.\n\nThis is the same describe-run-fix loop from earlier, but the agent drives more of it. Your job is to give a clear goal, watch the steps, and approve or redirect. Because it can run your tests and read the errors itself, it often catches and fixes its own mistakes before handing control back, which is a large part of why it handles multi-file changes well.',
              },
              {
                heading: 'CLAUDE.md As Persistent Memory',
                body:
                  'A model starts each session with no memory of your project. Claude Code addresses this with a CLAUDE.md file, a markdown document at the root (and optionally in subdirectories) that is loaded into context automatically. It is the terminal equivalent of a rules file.\n\nUseful things to put there: the commands to build, test, and run the project; the architecture in a few sentences; coding conventions and libraries to prefer; and any sharp edges a newcomer should know. With this in place the agent stops asking how to run the tests or guessing your conventions, because the answers are always present. As with rules files, keeping CLAUDE.md in the repo turns it into shared memory for the whole team, human and AI alike.',
              },
              {
                heading: 'MCP And Larger Codebases',
                body:
                  'Claude Code\'s reach extends through the Model Context Protocol. By connecting MCP servers you let the agent read and act on systems beyond your files: query your real database schema, pull the text of an issue it is implementing, look up documentation, or interact with other developer services. This keeps the agent grounded in reality instead of guessing.\n\nCombined with its whole-project view and terminal home, this is why Claude Code suits large codebases and automation. It can navigate a big repository, make a coordinated change across many files, run the suite to verify, and do so as part of a scripted or scheduled workflow. Where an inline assistant helps you write the next function, a terminal agent like this is aimed at completing whole tasks with supervision, which is a meaningfully different unit of work.',
              },
            ],
            sources: [
              { label: 'Claude Code overview (Anthropic)', url: 'https://docs.anthropic.com/en/docs/claude-code/overview' },
              { label: 'Claude Code: memory and CLAUDE.md', url: 'https://docs.anthropic.com/en/docs/claude-code/memory' },
              { label: 'Model Context Protocol', url: 'https://modelcontextprotocol.io/' },
            ],
            furtherReading: [
              { title: 'Claude Code overview', author: 'Anthropic', publication: 'Anthropic docs', url: 'https://docs.anthropic.com/en/docs/claude-code/overview', description: 'What the terminal agent is and how its agentic loop works.' },
              { title: 'Claude Code memory', author: 'Anthropic', publication: 'Anthropic docs', url: 'https://docs.anthropic.com/en/docs/claude-code/memory', description: 'How CLAUDE.md gives the agent persistent project memory.' },
              { title: 'Building effective agents', author: 'Anthropic', publication: 'anthropic.com · 2024', url: 'https://www.anthropic.com/research/building-effective-agents', description: 'The patterns behind agentic tools like Claude Code, explained clearly.' },
            ],
          },
          matchingPairs: [
            { term: 'Claude Code', definition: "Anthropic's terminal-native, agentic coding tool" },
            { term: 'Agentic loop', definition: 'Explore, plan, edit, run, read output, and iterate toward a goal' },
            { term: 'CLAUDE.md', definition: 'Project-root memory file loaded into context for consistent behavior' },
            { term: 'Terminal home', definition: 'Lives in the shell, so it can script, automate, and touch the whole lifecycle' },
            { term: 'MCP servers', definition: 'Connect the agent to databases, issues, docs, and other systems' },
            { term: 'Large-codebase fit', definition: 'Whole-project view makes coordinated multi-file changes practical' },
          ],
          scenarioQuiz: [
            {
              id: 'vc_m2_l2_s1',
              question: 'A teammate keeps having to tell the agent how to run your tests and which conventions to follow. What fixes this in Claude Code?',
              options: [
                'Buy a faster machine',
                'Add a CLAUDE.md with the build/test commands, architecture, and conventions so they are always in context',
                'Use a bigger monitor',
                'Disable the terminal',
              ],
              correct: 1,
              explanation: 'CLAUDE.md is persistent project memory loaded into context. Putting commands and conventions there means the agent and teammates stop re-explaining them.',
            },
            {
              id: 'vc_m2_l2_s2',
              question: 'What most distinguishes Claude Code from an inline autocomplete assistant?',
              options: [
                'It only suggests the next line',
                'It is a terminal-native agent that plans and executes multi-step, multi-file tasks and runs your tools to verify',
                'It cannot edit files',
                'It requires no instructions ever',
              ],
              correct: 1,
              explanation: 'Inline assistants help write the next function; Claude Code aims to complete whole tasks agentically, running commands and iterating on the results.',
            },
            {
              id: 'vc_m2_l2_s3',
              question: 'Your agent keeps writing queries against a guessed database schema. How does Claude Code ground itself in the real one?',
              options: [
                'By restarting',
                'By connecting an MCP server so it can read the actual schema and other systems',
                'By using a larger font',
                'By disabling memory',
              ],
              correct: 1,
              explanation: 'MCP lets the agent reach external systems like your database, so it reads reality instead of guessing.',
            },
          ],
        },
        {
          id: 'vibecoding_m2_l3',
          title: 'GitHub Copilot',
          xp: 20,
          slides: [
            { type: 'intro', title: "Microsoft's Bet", body: 'GitHub Copilot, launched in 2021, was the first AI pair programmer to reach mainstream developers. Built by GitHub and Microsoft on OpenAI models, it put AI completion into millions of editors and made "AI writes code with you" a normal idea years before vibe coding had a name.' },
            { type: 'text', title: 'What It Trained On', body: 'Copilot was trained on a vast amount of public code from GitHub. That breadth is its strength and the root of its controversy: questions about licensing, attribution, and whether training on open-source repositories respects their licenses.' },
            { type: 'text', title: 'The Legal Controversies', body: 'Copilot drew lawsuits and debate over code provenance and open-source licenses. In response GitHub added filters for matching public code and indemnity options for enterprise customers. The legal questions around training data are still unsettled industry-wide.' },
            { type: 'highlight', title: 'Ubiquity And Enterprise', body: 'Copilot\'s edge is reach. It is deeply integrated into VS Code, Visual Studio, JetBrains, and GitHub itself, with enterprise controls, security, and compliance features that large organizations require. For many companies it is the sanctioned, in-place option.' },
            { type: 'summary', title: 'Lesson Complete! +20 XP', body: 'GitHub Copilot pioneered mainstream AI pair programming, trained on large amounts of public GitHub code. That training fueled licensing controversies and lawsuits, which GitHub answered with filters and enterprise indemnity. Its lasting advantage is ubiquity and enterprise readiness inside existing tools.' },
          ],
          summary:
            'GitHub Copilot, from GitHub and Microsoft, was the first AI pair programmer most developers ever used. Trained on a huge corpus of public GitHub code, it normalized AI-assisted coding years before "vibe coding" existed, while also triggering still-unsettled debates and lawsuits about open-source licensing and attribution. Its durable advantage today is ubiquity and enterprise readiness: it is everywhere developers already work, with the controls big organizations need.',
          sources: [
            { label: 'GitHub Copilot', url: 'https://github.com/features/copilot' },
            { label: 'GitHub Copilot documentation', url: 'https://docs.github.com/en/copilot' },
            { label: 'GitHub: about Copilot and public code', url: 'https://docs.github.com/en/copilot/responsible-use-of-github-copilot-features' },
          ],
          deepDive: {
            readingTime: '7 min',
            sections: [
              {
                heading: 'The First Mainstream AI Pair Programmer',
                body:
                  'When GitHub Copilot launched in 2021, the idea that an AI could write meaningful chunks of your code in real time was startling to most developers. Built by GitHub and Microsoft on OpenAI models, it appeared as autocomplete on steroids: you wrote a comment or a function signature and it proposed the body.\n\nCopilot mattered because of distribution. GitHub sits at the center of software development, so Copilot reached an enormous audience quickly and made AI assistance feel normal. Years before Karpathy named vibe coding, Copilot had already shifted expectations: a generation of developers got used to an AI suggesting their next lines, which laid the cultural groundwork for the more autonomous tools that followed.',
              },
              {
                heading: 'Training Data And Its Controversies',
                body:
                  'Copilot\'s capability came from training on a vast corpus of public code hosted on GitHub. That is also the source of its deepest controversy. Critics argued that training on open-source repositories, then emitting suggestions that can closely resemble that code, raises hard questions about licenses, attribution, and consent. A high-profile class-action lawsuit challenged the practice.\n\nThe core tension is unresolved across the whole industry: what does it mean to train a commercial model on openly licensed but not unconditionally free code, and what obligations follow. GitHub responded with practical mitigations, including a filter that can block suggestions matching public code and enterprise indemnification, but the underlying legal and ethical questions about training data remain open and apply well beyond Copilot.',
              },
              {
                heading: 'How It Compares To Newer Tools',
                body:
                  'Copilot began as completion and has since grown chat, multi-file edits, and agentic features, narrowing the gap with tools like Cursor. Still, its character is different. Cursor and Windsurf are AI-first editors designed from the ground up around an agent; Claude Code is a terminal agent for whole tasks. Copilot, by contrast, is AI added into the editors and workflows developers already have.\n\nThat framing explains its position. If you want the most aggressive agentic experience, a purpose-built tool may feel ahead. If you want capable AI that meets you inside Visual Studio, JetBrains, or GitHub with minimal disruption, Copilot is hard to beat. The category moves fast, so the precise feature gaps shift constantly, but the strategic difference, AI-native tool versus AI-augmented incumbent, is stable.',
              },
              {
                heading: 'Why Enterprises Choose It',
                body:
                  'For large organizations the deciding factors are rarely just raw capability. They are integration, governance, security, and risk. Copilot is strong on exactly those. It plugs into the editors and the GitHub platform companies already standardize on, and it ships with administrative controls, policy management, the public-code filter, and indemnity offerings aimed at enterprise legal and security teams.\n\nThe result is that Copilot is often the sanctioned option inside big companies even where individual developers might personally prefer a newer tool. For a vibe coder this is worth understanding: the best tool for a solo weekend project and the approved tool at a regulated employer can be different, and both choices are reasonable given their constraints.',
              },
            ],
            sources: [
              { label: 'GitHub Copilot documentation', url: 'https://docs.github.com/en/copilot' },
              { label: 'GitHub: responsible use of Copilot', url: 'https://docs.github.com/en/copilot/responsible-use-of-github-copilot-features' },
              { label: 'GitHub Copilot product page', url: 'https://github.com/features/copilot' },
            ],
            furtherReading: [
              { title: 'GitHub Copilot documentation', author: 'GitHub', publication: 'docs.github.com', url: 'https://docs.github.com/en/copilot', description: 'Official reference for features, completion, chat, and enterprise controls.' },
              { title: 'Responsible use of Copilot', author: 'GitHub', publication: 'docs.github.com', url: 'https://docs.github.com/en/copilot/responsible-use-of-github-copilot-features', description: 'How GitHub frames public-code matching, filtering, and responsible use.' },
              { title: 'AI-assisted programming', author: 'Simon Willison', publication: 'simonwillison.net', url: 'https://simonwillison.net/tags/ai-assisted-programming/', description: 'Comparative notes on Copilot versus newer AI coding tools.' },
            ],
          },
          matchingPairs: [
            { term: 'GitHub Copilot', definition: 'The first mainstream AI pair programmer, from GitHub and Microsoft (2021)' },
            { term: 'Training corpus', definition: 'A vast amount of public GitHub code, the source of both power and controversy' },
            { term: 'Licensing controversy', definition: 'Unsettled debate and lawsuits over open-source attribution and consent' },
            { term: 'Public-code filter', definition: 'A mitigation that can block suggestions matching public code' },
            { term: 'Enterprise indemnity', definition: 'Legal protection GitHub offers business customers' },
            { term: 'AI-augmented incumbent', definition: 'AI added into existing editors rather than a new AI-first tool' },
          ],
          scenarioQuiz: [
            {
              id: 'vc_m2_l3_s1',
              question: 'A regulated enterprise must pick an AI coding tool. Why might it choose Copilot over a newer AI-first editor?',
              options: [
                'It is always the most capable tool',
                'Its deep integration with existing editors and GitHub, plus enterprise controls, filtering, and indemnity, fit governance and risk needs',
                'It does not use any training data',
                'It is the only tool that exists',
              ],
              correct: 1,
              explanation: 'For enterprises, integration, governance, security, and legal protection often matter more than raw capability, and Copilot is built for exactly that.',
            },
            {
              id: 'vc_m2_l3_s2',
              question: 'What is the root of the legal controversy around Copilot?',
              options: [
                'It was too slow',
                'It was trained on large amounts of public code, raising unresolved questions about open-source licensing, attribution, and consent',
                'It only worked offline',
                'It refused to generate code',
              ],
              correct: 1,
              explanation: 'Training on openly licensed code and emitting similar suggestions raised hard, still-open questions about licenses and attribution, leading to lawsuits and mitigations.',
            },
            {
              id: 'vc_m2_l3_s3',
              question: 'How is Copilot best characterized relative to Cursor and Claude Code?',
              options: [
                'An AI-native editor built around an agent from scratch',
                'A terminal-only agent',
                'AI capability added into the editors and platform developers already use (an AI-augmented incumbent)',
                'A prompt-to-app generator',
              ],
              correct: 2,
              explanation: 'Cursor is AI-first and Claude Code is a terminal agent; Copilot brings AI into existing tools, which is the source of its ubiquity.',
            },
          ],
        },
        {
          id: 'vibecoding_m2_l4',
          title: 'Bolt.new and v0',
          xp: 20,
          slides: [
            { type: 'intro', title: 'From Prompt To Running App', body: 'Bolt.new and v0 by Vercel collapse the gap between an idea and something you can click. Type a description and minutes later there is a running app or a real UI in front of you. They are the fastest way to go from zero to a visible starting point.' },
            { type: 'text', title: 'What They Ship In Five Minutes', body: 'Bolt.new generates a full-stack app in the browser, runnable and editable immediately, including a frontend, basic backend, and the scaffolding to run it. v0 specializes in generating polished UI and React components you can drop into a project.' },
            { type: 'text', title: 'The Template Problem', body: 'Speed comes from leaning on patterns and templates. That is great until your idea diverges from what the generator assumes. Then you fight the template: the defaults, the structure, and the choices it made for you become friction instead of a head start.' },
            { type: 'highlight', title: 'From Prototype To Real App', body: 'The right mental model is bootstrap, then graduate. Use a generator to get a running prototype fast, then move it into an editor or agent (Cursor, Claude Code) where you can grow, harden, and maintain it past the template stage.' },
            { type: 'summary', title: 'Lesson Complete! +20 XP', body: 'Bolt.new and v0 turn a prompt into a running app or UI in minutes, ideal for prototypes and starting points. Their speed comes from templates, which become friction as your idea diverges. The pattern is to bootstrap with a generator, then graduate the project into an editor or agent to take it further.' },
          ],
          summary:
            'Bolt.new and v0 by Vercel are prompt-to-app generators. Bolt.new produces a runnable full-stack app in the browser; v0 produces polished UI and React components. Both are unbeatable for getting from idea to something visible in minutes. Their speed rests on templates, which turn into friction once your idea diverges, so the winning pattern is to bootstrap fast with a generator and then graduate the project into an editor or agent for real growth.',
          sources: [
            { label: 'Bolt.new', url: 'https://bolt.new/' },
            { label: 'v0 by Vercel', url: 'https://v0.dev/' },
            { label: 'v0 documentation', url: 'https://v0.dev/docs' },
          ],
          deepDive: {
            readingTime: '7 min',
            sections: [
              {
                heading: 'The Magic Of Zero To Running',
                body:
                  'The reason generators feel magical is that they collapse the most discouraging part of a project: the empty folder. Setting up a stack, wiring a build, and getting a first screen to render can eat an afternoon before you have learned anything about your idea. Bolt.new and v0 erase that. You describe what you want and you are immediately looking at something real.\n\nThat changes the economics of trying ideas. When a prototype costs five minutes instead of five hours, you experiment more and commit later. For founders pitching, for designers exploring, and for beginners who just want to see their idea exist, this is genuinely powerful. The key is to value it for what it is, the fastest possible start, rather than mistaking the start for the finish.',
              },
              {
                heading: 'Bolt.new Versus v0',
                body:
                  'The two tools aim at different slices. Bolt.new, from StackBlitz, generates and runs a full-stack application entirely in the browser. It gives you frontend, backend scaffolding, and a live environment you can edit and even deploy, which makes it well suited to standing up a complete working prototype from one prompt.\n\nv0, from Vercel, concentrates on the interface. It excels at generating polished, responsive UI and React components, and it is tightly woven into the React, Next.js, and Vercel ecosystem, including a smooth path to deployment there. You often reach for v0 when you want beautiful front-end building blocks to drop into an existing or growing app, and for Bolt.new when you want a whole runnable thing right now. Many builders use both at different moments.',
              },
              {
                heading: 'The Template Problem',
                body:
                  'Generators are fast because they lean on common patterns and templated choices. As long as your idea sits close to those patterns, you glide. The moment it diverges, the same templates become a headwind. The generated structure assumes things your app does not want, the defaults fight your requirements, and unwinding those choices can cost more than starting clean would have.\n\nThis is not a flaw so much as a boundary. The template is the source of the speed and the source of the ceiling. Recognizing when you have hit that ceiling, when you spend more time arguing with the generated structure than building, is the signal that the prototype has done its job and it is time to take the code somewhere more flexible.',
              },
              {
                heading: 'Bootstrap, Then Graduate',
                body:
                  'The healthiest workflow treats generators as launchpads. You bootstrap a prototype to prove the idea and learn what you actually want, then graduate the project into a full editor or terminal agent where you have complete control over structure, dependencies, tests, and deployment.\n\nIn practice that might mean generating a UI in v0, exporting the components, and continuing in Cursor or Claude Code as the app grows real features. Or spinning up a full prototype in Bolt.new, then moving the code into your own repository to harden it. The mistake to avoid is trying to scale a serious product entirely inside a generator past the point where the template fits. Use the tool for the phase it is best at, then move on deliberately rather than by frustration.',
              },
            ],
            sources: [
              { label: 'Bolt.new', url: 'https://bolt.new/' },
              { label: 'v0 by Vercel', url: 'https://v0.dev/' },
              { label: 'v0 documentation', url: 'https://v0.dev/docs' },
            ],
            furtherReading: [
              { title: 'v0 documentation', author: 'Vercel', publication: 'v0.dev/docs', url: 'https://v0.dev/docs', description: 'How prompt-to-UI generation works and how to move output into a real project.' },
              { title: 'Bolt.new', author: 'StackBlitz', publication: 'bolt.new', url: 'https://bolt.new/', description: 'Full-stack app generation that runs entirely in the browser.' },
              { title: 'AI-assisted programming', author: 'Simon Willison', publication: 'simonwillison.net', url: 'https://simonwillison.net/tags/ai-assisted-programming/', description: 'Notes on prototyping with generators and where they break down.' },
            ],
          },
          matchingPairs: [
            { term: 'Bolt.new', definition: 'Generates and runs a full-stack app in the browser from a prompt' },
            { term: 'v0 by Vercel', definition: 'Generates polished UI and React components in the React/Next.js ecosystem' },
            { term: 'Prompt-to-app', definition: 'Going from a text description to something runnable in minutes' },
            { term: 'The template problem', definition: 'Speed from templates becomes friction once your idea diverges' },
            { term: 'Bootstrap then graduate', definition: 'Prototype in a generator, then move to an editor or agent to grow it' },
            { term: 'Template ceiling', definition: 'The point where you fight the generated structure more than you build' },
          ],
          scenarioQuiz: [
            {
              id: 'vc_m2_l4_s1',
              question: 'You generated an app in Bolt.new, but now you spend more time fighting its structure than adding features. What does this signal?',
              options: [
                'You should add even more prompts inside the generator',
                'You have hit the template ceiling; it is time to graduate the project into a full editor or agent',
                'The idea is bad and you should quit',
                'You need a faster internet connection',
              ],
              correct: 1,
              explanation: 'Fighting the generated structure is the classic sign the prototype has done its job. Move the code somewhere more flexible to keep growing it.',
            },
            {
              id: 'vc_m2_l4_s2',
              question: 'You want polished, responsive React components to drop into an existing Next.js app. Which tool fits best?',
              options: [
                'A terminal agent on an empty repo',
                'v0 by Vercel',
                'A spreadsheet',
                'A static site with no components',
              ],
              correct: 1,
              explanation: 'v0 specializes in generating UI and React components tightly integrated with the React, Next.js, and Vercel ecosystem.',
            },
            {
              id: 'vc_m2_l4_s3',
              question: 'Why are prompt-to-app generators so fast, and what is the tradeoff?',
              options: [
                'They use no templates, so there is no tradeoff',
                'They lean on common patterns and templates for speed, which becomes a ceiling as your idea diverges from those assumptions',
                'They are slow but very flexible',
                'They only work for backends',
              ],
              correct: 1,
              explanation: 'The template is both the source of speed and the source of the ceiling. Great for the start, limiting once your needs leave the common path.',
            },
          ],
        },
        {
          id: 'vibecoding_m2_l5',
          title: 'MCP: Model Context Protocol',
          xp: 20,
          slides: [
            { type: 'intro', title: 'A Standard Port For AI', body: 'The Model Context Protocol, introduced by Anthropic in late 2024 and adopted across the industry, is an open standard for connecting AI applications to external tools and data. Think of it as a universal port: build one server, and any MCP-aware tool can plug in.' },
            { type: 'text', title: 'The Problem It Solves', body: 'Before MCP, every integration was bespoke: each tool needed custom glue to reach each data source. That does not scale. MCP defines a common interface so the number of integrations grows by addition, not by multiplication.' },
            { type: 'text', title: 'Why It Matters For Coding', body: 'With MCP, a coding agent stops being limited to your files. It can read your real database schema, pull an issue it is implementing, check your component library, or call internal services, all through a standard protocol rather than one-off hacks.' },
            { type: 'highlight', title: 'Building A Custom MCP Server', body: 'You can expose your own systems to AI by writing an MCP server. It advertises resources (data the model can read) and tools (actions the model can take). Once running, any MCP client, from Claude Code to other agents, can use it.' },
            { type: 'summary', title: 'Lesson Complete! +20 XP', body: 'MCP is an open standard that connects AI tools to external data and actions through one common interface, replacing bespoke integrations. For coding it grounds agents in your real systems, and you can extend any MCP-aware tool by writing a custom server that exposes resources and tools.' },
          ],
          summary:
            'The Model Context Protocol is an open standard, introduced by Anthropic and widely adopted, for connecting AI applications to external tools and data through one common interface. It replaces the bespoke, N-times-M integration problem with a universal port: build a server once and any MCP client can use it. For coding agents this means grounding in your real database, issues, docs, and services, and you can extend the ecosystem by writing your own server that exposes resources and tools.',
          sources: [
            { label: 'Model Context Protocol', url: 'https://modelcontextprotocol.io/' },
            { label: 'Anthropic: introducing MCP', url: 'https://www.anthropic.com/news/model-context-protocol' },
            { label: 'MCP: build a server', url: 'https://modelcontextprotocol.io/quickstart/server' },
          ],
          deepDive: {
            readingTime: '8 min',
            sections: [
              {
                heading: 'The Integration Explosion',
                body:
                  'AI tools are far more useful when they can reach beyond their own window into your databases, file systems, ticketing tools, documentation, and services. The trouble is combinatorial. With many AI applications and many data sources, building a custom connector for every pairing means an explosion of bespoke, fragile glue. Every new tool has to reintegrate with every system, and every system has to be re-taught for every tool.\n\nThis is the same problem hardware faced before universal standards. Every device once needed its own cable and port. MCP is an attempt at the USB moment for AI context: define one protocol that both sides speak, so a data source exposes itself once and any compliant tool can connect. The wins move from multiplication to addition.',
              },
              {
                heading: 'What MCP Actually Defines',
                body:
                  'MCP is a client-server protocol. The AI application (such as Claude Code or another agent) acts as an MCP client. A server wraps a particular system, your database, your repo, a SaaS API, and exposes it through the standard.\n\nServers offer a few well-defined things. Resources are data the model can read, like the contents of a file, a database schema, or a document. Tools are actions the model can invoke, like running a query, creating an issue, or sending a request. There are also prompts, reusable templated interactions a server can provide. Because the shapes are standardized, a client does not need to know the internals of a server to use it; it discovers the available resources and tools and works with them generically. That uniformity is the whole point.',
              },
              {
                heading: 'Why It Matters For AI Coding',
                body:
                  'Earlier lessons kept returning to one failure mode: the model guessing because it cannot see reality. MCP is the structural fix. With the right servers connected, a coding agent reads your actual database schema before writing a query, pulls the real text of the ticket it is implementing, checks your live component library before generating UI, or triggers a deployment through a sanctioned tool.\n\nThis is why MCP keeps appearing across this track. It is the connective tissue that turns an agent from something operating only on your source files into something that can act on your whole stack, grounded in real data. As more tools adopt it, the same servers you write or install become usable everywhere, which compounds the value over time.',
              },
              {
                heading: 'Building Your Own Server',
                body:
                  'The protocol is open, and writing a server is how you extend any MCP-aware tool to your own systems. Anthropic and the community provide SDKs in several languages, so the work is mostly describing your system in MCP terms rather than inventing plumbing.\n\nThe shape is straightforward. You decide what data the model should be able to read and expose it as resources. You decide what actions it should be able to take and expose them as tools, each with a clear description and typed inputs so the model knows how to call it safely. You run the server, connect it to an MCP client, and the agent can now use your system through the standard. A natural first project is a read-only server over an internal data source, which is low risk and immediately useful, before you add tools that can take actions. The deeper point is that MCP makes your own infrastructure a first-class citizen in the AI coding world, on your terms.',
              },
            ],
            sources: [
              { label: 'Model Context Protocol', url: 'https://modelcontextprotocol.io/' },
              { label: 'Anthropic: introducing MCP', url: 'https://www.anthropic.com/news/model-context-protocol' },
              { label: 'MCP: build a server', url: 'https://modelcontextprotocol.io/quickstart/server' },
            ],
            furtherReading: [
              { title: 'Introducing the Model Context Protocol', author: 'Anthropic', publication: 'anthropic.com · 2024', url: 'https://www.anthropic.com/news/model-context-protocol', description: 'The announcement explaining the standard and the integration problem it solves.' },
              { title: 'MCP specification and docs', author: 'MCP project', publication: 'modelcontextprotocol.io', url: 'https://modelcontextprotocol.io/', description: 'The protocol, concepts (resources, tools, prompts), and SDKs.' },
              { title: 'Build an MCP server', author: 'MCP project', publication: 'modelcontextprotocol.io', url: 'https://modelcontextprotocol.io/quickstart/server', description: 'A hands-on quickstart for exposing your own system to AI tools.' },
            ],
          },
          matchingPairs: [
            { term: 'MCP', definition: 'Open standard connecting AI applications to external tools and data' },
            { term: 'Integration explosion', definition: 'The N-times-M problem of custom glue MCP is designed to replace' },
            { term: 'Resource', definition: 'Data an MCP server exposes for the model to read' },
            { term: 'Tool', definition: 'An action an MCP server exposes for the model to invoke' },
            { term: 'Client and server', definition: 'The AI app is the client; a server wraps one system behind the standard' },
            { term: 'Custom server', definition: 'Code you write to expose your own systems to any MCP-aware tool' },
          ],
          scenarioQuiz: [
            {
              id: 'vc_m2_l5_s1',
              question: 'Your company has five AI tools and eight internal systems, and the custom connectors are becoming unmaintainable. How does MCP help?',
              options: [
                'It makes the models faster',
                'It defines one standard interface, so each system is exposed once and any compliant tool can use it, turning multiplication into addition',
                'It deletes the internal systems',
                'It replaces all the tools with one',
              ],
              correct: 1,
              explanation: 'MCP is the universal-port solution to the integration explosion. Build a server per system once, and all MCP clients can connect.',
            },
            {
              id: 'vc_m2_l5_s2',
              question: 'In MCP terms, what is the difference between a resource and a tool?',
              options: [
                'They are the same thing',
                'A resource is data the model can read; a tool is an action the model can invoke',
                'A resource is an action; a tool is data',
                'Both are only used for authentication',
              ],
              correct: 1,
              explanation: 'Resources expose readable data (files, schemas, documents); tools expose actions (run a query, create an issue). The standard shapes let clients use them generically.',
            },
            {
              id: 'vc_m2_l5_s3',
              question: 'You want a coding agent to safely read an internal data source. What is a sensible first MCP project?',
              options: [
                'A server that can delete production data',
                'A read-only server exposing that data as resources, before adding any action-taking tools',
                'Disabling MCP entirely',
                'A tool that runs arbitrary shell commands with no description',
              ],
              correct: 1,
              explanation: 'Starting read-only is low risk and immediately useful. You expose data as resources first, then add tools (actions) deliberately once you trust the setup.',
            },
          ],
        },
      ],
      quiz: [
        { id: 'vibecoding_m2_q1', question: 'What is the main difference between Cursor and Claude Code?', options: ['They are identical', 'Cursor is an AI-first editor (VS Code fork); Claude Code is a terminal-native agent suited to whole tasks and larger codebases', 'Cursor only works offline', 'Claude Code cannot edit files'], correct: 1, explanation: 'Cursor wraps a full editor around the model; Claude Code is an agent that works through the terminal across the whole project.' },
        { id: 'vibecoding_m2_q2', question: 'Why are Bolt.new and v0 best treated as launchpads rather than long-term homes for a serious product?', options: ['They cannot generate code', 'Their speed comes from templates, which become friction once your idea diverges, so you graduate the project into an editor or agent', 'They are too slow for prototypes', 'They only generate documentation'], correct: 1, explanation: 'Generators are fastest at the start. As an app outgrows their templates, the right move is to bootstrap then graduate to a more flexible tool.' },
        { id: 'vibecoding_m2_q3', question: 'What problem does the Model Context Protocol primarily solve?', options: ['Making models cheaper', 'The integration explosion: it gives AI tools a standard way to connect to external data and actions instead of bespoke glue per pairing', 'Replacing all coding editors', 'Encrypting source code'], correct: 1, explanation: 'MCP is a universal interface that lets a system be exposed once and used by any compliant AI tool, replacing custom one-off connectors.' },
      ],
    },
    {
      id: 'vibecoding_m3',
      level: 'intermediate',
      title: 'Prompt Engineering for Code',
      emoji: '✍️',
      description: 'Describe what you want, iterate on output, encode your standards in rules, handle multi-file projects, and debug AI-generated code.',
      color: '#A78BFA',
      lessons: [
        {
          id: 'vibecoding_m3_l1',
          title: 'How to Describe What You Want',
          xp: 20,
          slides: [
            { type: 'intro', title: 'The Prompt Is The Program', body: 'In vibe coding the prompt does the work a function signature used to do: it specifies intent. A weak description produces weak code not because the model is dumb, but because you left it too many ways to guess.' },
            { type: 'text', title: 'Specificity, Context, Constraints', body: 'Three ingredients turn a wish into a spec. Specificity: exactly what you want. Context: the existing code, stack, and components it should fit. Constraints: what it must and must not do. Drop any one and quality falls.' },
            { type: 'text', title: 'Login Page, Two Ways', body: '"Make a login page" leaves everything open. Compare: "Add an email and password form to app/login.tsx, reuse our Button and Input, validate with zod, show inline errors, no new dependencies." The second is a target the model can actually hit.' },
            { type: 'highlight', title: 'A Reusable Template', body: 'A dependable prompt shape: Goal (what and why), Context (files, stack, components to reuse), Requirements (behavior and edge cases), Constraints (do nots), and Done criteria (how you will judge success). Fill it in and guessing drops.' },
            { type: 'summary', title: 'Lesson Complete! +20 XP', body: 'Good code prompts supply specificity, context, and constraints. The difference between "make a login page" and a precise spec is the difference between rewriting the output and shipping it. A simple template (goal, context, requirements, constraints, done criteria) makes this repeatable.' },
          ],
          summary:
            'The prompt is where intent lives, so describing what you want well is the core skill. Three ingredients matter: specificity (exactly what), context (the code and stack it must fit), and constraints (the do-nots). The gap between "make a login page" and a precise specification is the gap between rewriting output and shipping it. A reusable template (goal, context, requirements, constraints, done criteria) turns this into a habit.',
          sources: [
            { label: 'Anthropic: prompt engineering overview', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview' },
            { label: 'Anthropic: be clear and direct', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/be-clear-and-direct' },
            { label: 'OpenAI: prompt engineering guide', url: 'https://platform.openai.com/docs/guides/prompt-engineering' },
          ],
          deepDive: {
            readingTime: '8 min',
            sections: [
              {
                heading: 'Why Vague Prompts Fail',
                body:
                  'A model answers the prompt you wrote, not the one in your head. When you say "make a login page," you are holding a dozen unstated assumptions: which framework, which components, what validation, what styling, where the file goes, what happens on error. The model cannot read those, so it picks defaults. Often reasonable defaults, but rarely yours.\n\nThe result is output you have to translate back into your project, which can cost more than writing it would have. The failure is not intelligence, it is underspecification. Every degree of freedom you leave open is a place the model must guess, and each guess is a chance to diverge from what you wanted. The fix is not longer prompts for their own sake, it is removing the specific ambiguities that matter.',
              },
              {
                heading: 'Specificity, Context, And Constraints',
                body:
                  'Three ingredients carry most of the weight. Specificity is naming exactly what you want: not "handle the form" but "validate email format and require a password of at least eight characters, then call signIn." Context is the surrounding reality: the file to edit, the framework and version, the components and hooks to reuse, the patterns already in the codebase. Constraints are the guardrails: do not add a new dependency, do not change the public API, keep it under a certain size, match the existing error style.\n\nSpecificity tells the model what to build, context tells it how to fit, and constraints tell it what to avoid. Together they shrink the space of possible outputs down to roughly the one you intended. Most disappointing generations are missing at least one of the three, and you can usually diagnose which by asking what the model had to guess.',
              },
              {
                heading: 'A Worked Comparison',
                body:
                  'Consider the same task at three levels. Level one: "make a login page." The model invents a stack and a style and you rewrite most of it. Level two: "add a login page to my Next.js app with email and password." Better, but it still guesses your components, validation, and error handling. Level three: "Add an email and password login form to app/login.tsx. Reuse the Button and Input components from components/ui. Validate with zod: a valid email and a password of at least eight characters. Show inline field errors in our existing red error style. On submit call the existing signIn function. Do not add new dependencies."\n\nThe third prompt is longer, but every clause removes a guess. The output arrives close to ready because there was little left to invent. This is the practical heart of prompt engineering for code: trade a minute of precise description for many minutes of not rewriting.',
              },
              {
                heading: 'A Template You Can Reuse',
                body:
                  'To make this repeatable, keep a mental template with five slots. Goal: what you want and, briefly, why. Context: the files, stack, and components to reuse. Requirements: the behavior, including edge cases and error states. Constraints: the explicit do-nots. Done criteria: how you will judge success, such as "the form rejects bad emails and the tests pass."\n\nYou do not need to fill every slot every time, but running through them catches the omission that would have caused a bad generation. Over time this becomes automatic, and you will notice your prompts naturally state the file, name the pieces to reuse, spell out the behavior, and list what to avoid. That structure, not any magic wording, is what reliably produces code you can actually use.',
              },
            ],
            sources: [
              { label: 'Anthropic: prompt engineering overview', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview' },
              { label: 'Anthropic: be clear and direct', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/be-clear-and-direct' },
              { label: 'OpenAI: prompt engineering guide', url: 'https://platform.openai.com/docs/guides/prompt-engineering' },
            ],
            furtherReading: [
              { title: 'Prompt engineering overview', author: 'Anthropic', publication: 'Anthropic docs', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview', description: 'A structured guide to clear, specific, constraint-driven prompting.' },
              { title: 'ChatGPT Prompt Engineering for Developers', author: 'DeepLearning.AI and OpenAI', publication: 'deeplearning.ai', url: 'https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/', description: 'A short, practical course on prompting principles for building with the API.' },
              { title: 'OpenAI prompt engineering guide', author: 'OpenAI', publication: 'platform.openai.com', url: 'https://platform.openai.com/docs/guides/prompt-engineering', description: 'Tactics for specificity and structure that apply across models.' },
            ],
          },
          matchingPairs: [
            { term: 'Specificity', definition: 'Naming exactly what you want, not a vague gesture at it' },
            { term: 'Context', definition: 'The files, stack, and components the output must fit into' },
            { term: 'Constraints', definition: 'The explicit do-nots that keep the model in bounds' },
            { term: 'Underspecification', definition: 'Leaving open degrees of freedom the model must fill by guessing' },
            { term: 'Done criteria', definition: 'How you will judge whether the generated code succeeded' },
            { term: 'Prompt template', definition: 'Goal, context, requirements, constraints, and done criteria' },
          ],
          scenarioQuiz: [
            {
              id: 'vc_m3_l1_s1',
              question: 'Your prompts keep producing code that ignores your component library and validation rules. What is the most effective change?',
              options: [
                'Make the prompts shorter',
                'Add context and constraints: name the components to reuse, the validation rules, and what not to add',
                'Repeat the same prompt until it works',
                'Only use one-word prompts',
              ],
              correct: 1,
              explanation: 'The model ignores what it cannot see. Supplying context (components, rules) and constraints (do-nots) removes the guesses that cause the mismatch.',
            },
            {
              id: 'vc_m3_l1_s2',
              question: 'Why can a longer, more detailed prompt actually save time overall?',
              options: [
                'It does not; shorter is always faster',
                'Each precise clause removes a guess, so the output arrives closer to ready and needs less rewriting',
                'Longer prompts make the model run faster',
                'It avoids using the model at all',
              ],
              correct: 1,
              explanation: 'A minute spent removing ambiguity often saves many minutes of rewriting underspecified output. Precision, not length for its own sake, is the goal.',
            },
            {
              id: 'vc_m3_l1_s3',
              question: 'Which prompt is most likely to produce usable code on the first try?',
              options: [
                '"Make a dashboard."',
                '"Build something nice for users."',
                '"Add a metrics card to app/dashboard/page.tsx reusing the Card component, showing total users and revenue from the existing useStats hook, with a loading skeleton and no new dependencies."',
                '"Dashboard please."',
              ],
              correct: 2,
              explanation: 'The detailed prompt supplies specificity, context (file, component, hook), requirements (loading state), and constraints (no new deps), leaving little to guess.',
            },
          ],
        },
        {
          id: 'vibecoding_m3_l2',
          title: 'Iterating on AI Output',
          xp: 20,
          slides: [
            { type: 'intro', title: 'The First Draft Is Not The Last', body: 'Vibe coding is rarely one prompt and done. The skill is steering: nudging output toward what you want, undoing dead ends, and knowing when to keep refining versus start fresh.' },
            { type: 'text', title: 'How To Steer', body: 'Give targeted feedback, not vague displeasure. "Use the Heart icon from lucide-react and move the button to the top right" beats "make it better." Point at the specific thing and the specific change.' },
            { type: 'text', title: 'Undo And Refactor', body: 'Treat version control as your safety net. Commit working states so you can roll back fearlessly. Ask the model to refactor in small, reviewable steps rather than one giant rewrite you cannot check.' },
            { type: 'highlight', title: 'Keep Iterating Or Start Fresh', body: 'When each round improves things, keep going. When you are fighting accumulated confusion, the model contradicting itself and rehashing old mistakes, that is context rot. Start a clean session with a crisp summary instead of pushing a tired thread.' },
            { type: 'summary', title: 'Lesson Complete! +20 XP', body: 'Iterating well means steering with targeted feedback, committing working states so you can undo fearlessly, and refactoring in small reviewable steps. When a thread degrades into contradictions and repeated mistakes (context rot), start fresh with a clean summary rather than fighting it.' },
          ],
          summary:
            'Output is a draft you steer, not a verdict. Good iteration uses targeted feedback ("use this icon, move this here"), commits working states so undo is fearless, and asks for small reviewable refactors over giant rewrites. The crucial judgment call is keep-iterating versus start-fresh: when a session degrades into contradictions and recycled mistakes, that is context rot, and a clean session with a crisp summary beats pushing a tired thread.',
          sources: [
            { label: 'Anthropic: prompt engineering overview', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview' },
            { label: 'Simon Willison: AI-assisted programming notes', url: 'https://simonwillison.net/tags/ai-assisted-programming/' },
            { label: 'Pro Git: version control basics', url: 'https://git-scm.com/book/en/v2' },
          ],
          deepDive: {
            readingTime: '8 min',
            sections: [
              {
                heading: 'Steering With Precise Feedback',
                body:
                  'When a generation is close but not right, the instinct is to say "make it better," which gives the model nothing to act on and invites a random new guess. Effective steering is the opposite: name the specific thing and the specific change. "The save button works, but use the Heart icon from lucide-react instead of the star, and move it to the top right of the card." That is a small, checkable adjustment.\n\nThis mirrors how you would direct a capable junior developer. You do not re-explain the whole task, you give the next concrete correction. Each precise nudge converges toward the target, while vague dissatisfaction tends to make the model rewrite working parts and reintroduce problems you had already fixed. Treat each iteration as one clear instruction, then look at the result before giving the next.',
              },
              {
                heading: 'Undo Fearlessly With Version Control',
                body:
                  'Fast iteration only feels safe when you can roll back. Version control is the safety net that makes aggressive experimentation rational. Commit whenever you reach a working state, even a small one, so that any later experiment can be abandoned with a single revert instead of a frantic attempt to remember what changed.\n\nThis changes your relationship to risk. You can let an agent attempt a bold refactor knowing that if it goes wrong you simply reset to the last good commit. Without that net, people cling to fragile working code and refuse to let the model touch it, which throws away much of the speed advantage. A simple habit, commit working states often, unlocks fearless iteration, and it is doubly important when an agent may change many files at once.',
              },
              {
                heading: 'Refactor In Small Steps',
                body:
                  'A common failure is asking for an enormous change in one shot: "rewrite the whole app to use a different state approach." Even if the model attempts it, the diff is too large to review, so you either accept it blindly or reject all of it. Both are bad.\n\nThe better path is to decompose. Ask for one coherent step, review it, commit, then ask for the next. "First extract the data fetching into a hook." Check. "Now move the list rendering into its own component." Check. Small steps keep every change reviewable, keep the model focused, and give you natural commit points to roll back to. This is ordinary good engineering discipline, and it matters more, not less, when an agent can generate large changes quickly, because the bottleneck shifts from writing to verifying.',
              },
              {
                heading: 'Context Rot And The Clean Restart',
                body:
                  'Long sessions decay. As a conversation grows, it accumulates superseded decisions, abandoned approaches, and stale file contents. Eventually the model starts contradicting itself, reviving mistakes you already corrected, or referencing code that no longer exists. This is context rot, and pushing harder on a rotted thread usually makes it worse.\n\nThe move is to start fresh deliberately. Open a new session, and seed it with a crisp summary of where things stand: what the app does, the current structure, the decision you are in the middle of, and the immediate next step. You are giving the model clean working memory instead of a cluttered one. Knowing when to do this is a real skill. The signal is simple: if you are spending more effort managing the model\'s confusion than making progress, reset. A short summary into a clean context almost always beats one more prompt into a tired one.',
              },
            ],
            sources: [
              { label: 'Simon Willison: AI-assisted programming notes', url: 'https://simonwillison.net/tags/ai-assisted-programming/' },
              { label: 'Pro Git: version control basics', url: 'https://git-scm.com/book/en/v2' },
              { label: 'Anthropic: prompt engineering overview', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview' },
            ],
            furtherReading: [
              { title: 'AI-assisted programming', author: 'Simon Willison', publication: 'simonwillison.net', url: 'https://simonwillison.net/tags/ai-assisted-programming/', description: 'Practical accounts of steering, undoing, and knowing when to restart.' },
              { title: 'Pro Git', author: 'Scott Chacon and Ben Straub', publication: 'git-scm.com', url: 'https://git-scm.com/book/en/v2', description: 'The version-control foundation that makes fearless iteration possible.' },
              { title: 'Prompt engineering overview', author: 'Anthropic', publication: 'Anthropic docs', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview', description: 'Guidance on iterative refinement and clear instruction.' },
            ],
          },
          matchingPairs: [
            { term: 'Targeted feedback', definition: 'Naming the specific thing and the specific change, not "make it better"' },
            { term: 'Commit working states', definition: 'Saving good points so any experiment can be reverted fearlessly' },
            { term: 'Small-step refactor', definition: 'One reviewable change at a time instead of a giant unreviewable rewrite' },
            { term: 'Context rot', definition: 'Decay of a long session into contradictions and recycled mistakes' },
            { term: 'Clean restart', definition: 'A fresh session seeded with a crisp summary of the current state' },
            { term: 'Steering', definition: 'Converging on the target through precise iterative corrections' },
          ],
          scenarioQuiz: [
            {
              id: 'vc_m3_l2_s1',
              question: 'The model is now contradicting earlier decisions and re-introducing bugs you already fixed in this long thread. Best move?',
              options: [
                'Keep prompting harder in the same thread',
                'Start a clean session seeded with a crisp summary of the current state and next step',
                'Accept whatever it produces',
                'Delete the project',
              ],
              correct: 1,
              explanation: 'That decay is context rot. A fresh session with clean working memory and a short summary almost always beats fighting a cluttered thread.',
            },
            {
              id: 'vc_m3_l2_s2',
              question: 'An agent is about to attempt a bold multi-file refactor. What makes this safe to try?',
              options: [
                'Hoping it works',
                'Having committed a working state first, so you can revert with one command if it goes wrong',
                'Disabling the tests',
                'Never reviewing the diff',
              ],
              correct: 1,
              explanation: 'Version control is the safety net. Committing working states makes aggressive experimentation rational because rollback is trivial.',
            },
            {
              id: 'vc_m3_l2_s3',
              question: 'Which feedback will steer the output most effectively?',
              options: [
                '"Make it better."',
                '"I don\'t like it."',
                '"Use the Heart icon from lucide-react and move the button to the top right of the card."',
                '"Fix everything."',
              ],
              correct: 2,
              explanation: 'Precise, checkable corrections converge on the target. Vague dissatisfaction makes the model rewrite working parts and reintroduce problems.',
            },
          ],
        },
        {
          id: 'vibecoding_m3_l3',
          title: 'System Prompts and Rules',
          xp: 20,
          slides: [
            { type: 'intro', title: 'Encode Yourself Once', body: 'Instead of restating your stack and preferences every prompt, encode them once. Rules files and custom instructions give the model standing context so it writes in your style by default.' },
            { type: 'text', title: 'The Files That Do This', body: '.cursorrules and project rules in Cursor, CLAUDE.md for Claude Code, and custom instructions in other tools all serve the same purpose: persistent guidance loaded into context every session.' },
            { type: 'text', title: 'What To Put In Them', body: 'Your tech stack and versions, libraries and patterns to prefer, naming and structure conventions, testing expectations, and an explicit do-not list. Concrete, current, and specific to your project.' },
            { type: 'highlight', title: 'Rules As Shared Team Memory', body: 'Because these files live in the repository, they standardize output across every contributor, human and AI. New teammates and new agent sessions inherit the same standards without anyone restating them.' },
            { type: 'summary', title: 'Lesson Complete! +20 XP', body: 'System prompts and rules files (.cursorrules, project rules, CLAUDE.md, custom instructions) encode your stack, conventions, and do-nots once, so the model writes in your style every session. Kept in the repo, they become shared memory that standardizes output across the whole team.' },
          ],
          summary:
            'Rules files and custom instructions let you encode your preferences once instead of repeating them. .cursorrules and project rules, CLAUDE.md, and custom instructions all give the model persistent context: your stack, libraries, conventions, testing expectations, and an explicit do-not list. Because they live in the repository, they double as shared memory that keeps output consistent across every contributor and every agent session.',
          sources: [
            { label: 'Cursor: rules for AI', url: 'https://docs.cursor.com/context/rules' },
            { label: 'Claude Code: memory and CLAUDE.md', url: 'https://docs.anthropic.com/en/docs/claude-code/memory' },
            { label: 'Anthropic: system prompts', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/system-prompts' },
          ],
          deepDive: {
            readingTime: '7 min',
            sections: [
              {
                heading: 'The Cost Of Repeating Yourself',
                body:
                  'Without standing instructions, every session starts from zero. You re-explain that you use TypeScript and the App Router, that you prefer a particular component library, that you do not want a new state package, that tests go in a certain place. The model forgets it all the moment the conversation ends, so you pay the tax again tomorrow.\n\nThis repetition is not just tedious, it is error prone. The day you forget to mention a preference is the day the model picks a different default, and your codebase drifts. Encoding your standards once removes both problems. The instructions are always present, so the model is always aligned, and you are free to spend your prompts on the actual task instead of re-establishing the ground rules.',
              },
              {
                heading: 'The Mechanisms Across Tools',
                body:
                  'Every serious tool offers a version of this. Cursor reads project rules stored in the repo, as well as the older .cursorrules file, and applies them automatically. Claude Code loads CLAUDE.md from the project root (and subdirectories) into context. Chat-style assistants expose custom instructions or a system prompt that persists across messages.\n\nThe names differ but the concept is identical: a persistent layer of context that sits above any individual prompt. Conceptually this is the system prompt idea applied to your project, a high-priority instruction set that shapes everything the model does. Learning where this lives in whatever tool you use, and actually maintaining it, is one of the highest-leverage habits in vibe coding, because it improves every future generation at once.',
              },
              {
                heading: 'What Good Rules Contain',
                body:
                  'The best rules are concrete and current. State the stack and versions so the model does not write for the wrong framework era. List the libraries and patterns to prefer, and just as importantly the ones to avoid, so it stops reaching for alternatives. Describe naming and file-structure conventions so new code lands in the right shape. Set testing expectations so generated code comes with the coverage you want. And keep an explicit do-not list: no new dependencies without asking, do not modify the public API, do not introduce a different styling approach.\n\nResist the urge to write a novel. Rules that are too long or vague get diluted. Aim for a tight, specific document that captures the decisions you would otherwise repeat, and prune it as your project evolves so it never describes a past version of your codebase.',
              },
              {
                heading: 'Rules As Shared Memory',
                body:
                  'Because these files live in version control alongside the code, they are not just personal convenience, they are team infrastructure. Every contributor who pulls the repository gets the same standards, and so does every agent session anyone runs. A new teammate does not have to absorb tribal knowledge before being productive, and the AI does not produce a different style depending on who prompted it.\n\nThis is a quiet but real shift. The conventions that used to live in senior engineers\' heads and code-review comments can now live in a file the model reads directly, so they are enforced continuously rather than caught after the fact. Maintained well, a rules file becomes the single source of truth for how code should be written here, aligning humans and machines on the same standard.',
              },
            ],
            sources: [
              { label: 'Cursor: rules for AI', url: 'https://docs.cursor.com/context/rules' },
              { label: 'Claude Code: memory and CLAUDE.md', url: 'https://docs.anthropic.com/en/docs/claude-code/memory' },
              { label: 'Anthropic: system prompts', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/system-prompts' },
            ],
            furtherReading: [
              { title: 'Rules for AI', author: 'Anysphere', publication: 'Cursor docs', url: 'https://docs.cursor.com/context/rules', description: 'How project rules and .cursorrules encode standards for every generation.' },
              { title: 'Claude Code memory', author: 'Anthropic', publication: 'Anthropic docs', url: 'https://docs.anthropic.com/en/docs/claude-code/memory', description: 'Using CLAUDE.md as persistent, shareable project memory.' },
              { title: 'System prompts', author: 'Anthropic', publication: 'Anthropic docs', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/system-prompts', description: 'How high-priority standing instructions shape model behavior.' },
            ],
          },
          matchingPairs: [
            { term: '.cursorrules / project rules', definition: 'Cursor files that apply your standards to every generation' },
            { term: 'CLAUDE.md', definition: 'Claude Code project memory loaded into context each session' },
            { term: 'Custom instructions', definition: 'Persistent guidance in chat-style assistants' },
            { term: 'Do-not list', definition: 'Explicit prohibitions that keep generations in bounds' },
            { term: 'Shared memory', definition: 'Repo-stored rules that standardize output across the whole team' },
            { term: 'System prompt idea', definition: 'A high-priority instruction layer shaping everything the model does' },
          ],
          scenarioQuiz: [
            {
              id: 'vc_m3_l3_s1',
              question: 'You are tired of restating your stack and "no new dependencies" rule in every prompt. What is the durable solution?',
              options: [
                'Keep restating it; there is no alternative',
                'Encode your stack, conventions, and do-not list in a rules file (e.g. project rules or CLAUDE.md) that loads every session',
                'Use shorter prompts',
                'Switch tools every day',
              ],
              correct: 1,
              explanation: 'Rules files give the model standing context, so your standards apply automatically and you spend prompts on the task instead of the ground rules.',
            },
            {
              id: 'vc_m3_l3_s2',
              question: 'Why is keeping rules in version control valuable beyond personal convenience?',
              options: [
                'It makes the repo larger',
                'Every contributor and every agent session inherits the same standards, so output stays consistent across the team',
                'It encrypts the code',
                'It speeds up the model',
              ],
              correct: 1,
              explanation: 'Repo-stored rules are shared memory. Conventions that once lived in senior engineers heads are now enforced continuously for humans and AI alike.',
            },
            {
              id: 'vc_m3_l3_s3',
              question: 'What makes a rules file effective rather than diluted?',
              options: [
                'Making it as long and exhaustive as possible',
                'Keeping it tight, concrete, current, and specific, and pruning it as the project evolves',
                'Leaving it vague so the model has freedom',
                'Never updating it',
              ],
              correct: 1,
              explanation: 'Overly long or vague rules get diluted, and stale rules describe a past codebase. Tight, current, specific rules capture the decisions worth enforcing.',
            },
          ],
        },
        {
          id: 'vibecoding_m3_l4',
          title: 'Multi-file Projects',
          xp: 20,
          slides: [
            { type: 'intro', title: 'When The Codebase Outgrows The Window', body: 'Small projects fit in context. Real ones do not. The central challenge of multi-file vibe coding is that your codebase is bigger than the model can hold at once, so it cannot see everything while it works.' },
            { type: 'text', title: 'How Tools Cope', body: 'AI tools use retrieval and indexing to pull in the relevant files for a task rather than the whole repo. Agents explore: they search, open files, and read just enough to act. You help by pointing them at the right places.' },
            { type: 'text', title: 'Design For The Window', body: 'Structure that helps humans helps the model too: modular code, clear file and function names, small focused files, and good comments. The more self-explanatory each piece is, the better the model works with partial context.' },
            { type: 'highlight', title: 'Decompose The Work', body: 'Match the work to the window. Break big tasks into focused changes that each touch a few files, give the relevant context for each, and let architecture (clear boundaries between modules) keep any one change local.' },
            { type: 'summary', title: 'Lesson Complete! +20 XP', body: 'The core multi-file challenge is that your codebase exceeds the context window. Tools cope with retrieval and exploration, and you help by writing modular, clearly named, well-commented code and by decomposing big tasks into focused, local changes with the right context supplied.' },
          ],
          summary:
            'Real codebases are bigger than any context window, so the model never sees everything at once. Tools handle this with indexing, retrieval, and agentic exploration, but you do most of the heavy lifting through structure: modular code, clear naming, small focused files, and good comments make the codebase legible from partial context. The complementary habit is decomposing big tasks into focused changes that stay local and supplying the right files for each.',
          sources: [
            { label: 'Cursor: codebase indexing and context', url: 'https://docs.cursor.com/context/codebase-indexing' },
            { label: 'Claude Code overview (Anthropic)', url: 'https://docs.anthropic.com/en/docs/claude-code/overview' },
            { label: 'Anthropic: long context tips', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/long-context-tips' },
          ],
          deepDive: {
            readingTime: '8 min',
            sections: [
              {
                heading: 'The Context Window Ceiling',
                body:
                  'Every model has a finite context window, and although windows have grown large, real codebases grow larger. A serious application is hundreds of files and tens of thousands of lines, far more than fits at once and far more than you would want to pay to include even if it did. So the model is always working with a partial view of your system.\n\nThis is the defining constraint of multi-file vibe coding. The failure mode is predictable: when the model cannot see a relevant file, it guesses what is in it, and the guess may not match reality. Understanding this ceiling reframes the whole task. Your job is not to somehow show the model everything, it is to make sure the right slice is visible for each piece of work, and to structure the code so that a partial view is still enough to act correctly.',
              },
              {
                heading: 'How Tools Manage Partial Views',
                body:
                  'Modern tools do not try to load the whole repository. Instead they index it and retrieve the relevant pieces for a given task, a bit like search. Cursor builds a codebase index so it can surface the files that relate to your request. Agentic tools like Claude Code explore on demand: they search for symbols, open the files that look relevant, read enough to understand, and proceed, much as a human would when dropped into an unfamiliar project.\n\nThese mechanisms reduce the problem but do not erase it. Retrieval can miss a file, and exploration costs steps. You make both work better by being explicit: mention the files or modules involved, name the function or feature, and open the key files yourself so they are unambiguously in context. You are steering the retrieval, not leaving it to chance.',
              },
              {
                heading: 'Structure That The Model Can Read',
                body:
                  'The single most effective thing you can do is write code that explains itself, because the model, like a new teammate, has to understand it from limited context. Modular code with clear boundaries means a change to one area does not require understanding the whole system. Descriptive file and function names let retrieval and exploration find the right place. Small, focused files fit in context and keep each generation scoped. Good comments and types capture intent that would otherwise have to be inferred.\n\nThe encouraging part is that none of this is special AI advice. It is exactly the structure that makes a codebase pleasant for humans. Vibe coding simply raises the stakes: well-organized code is now also more amenable to AI assistance, while a tangled, poorly named codebase frustrates the model the same way it frustrates a person, and more often, because the model cannot ask a colleague for help.',
              },
              {
                heading: 'Decomposing The Work',
                body:
                  'The complement to good structure is good task decomposition. Instead of asking for a sweeping change that touches the entire app at once, break it into focused steps that each affect a few files, and supply the relevant context for each. Implement one module, verify it, then move to the next. This keeps every change within a view the model can actually hold, and it keeps each diff small enough for you to review.\n\nArchitecture is what makes this possible. Clear separation between modules means a feature can be built mostly within its own boundary, so a change stays local instead of rippling everywhere. When you find that a small task requires understanding the whole system, that is often a signal the design is too tangled, for the AI and for you. Decomposition and clean boundaries are mutually reinforcing: each makes multi-file work tractable within the unavoidable limits of the context window.',
              },
            ],
            sources: [
              { label: 'Cursor: codebase indexing and context', url: 'https://docs.cursor.com/context/codebase-indexing' },
              { label: 'Claude Code overview (Anthropic)', url: 'https://docs.anthropic.com/en/docs/claude-code/overview' },
              { label: 'Anthropic: long context tips', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/long-context-tips' },
            ],
            furtherReading: [
              { title: 'Codebase indexing and context', author: 'Anysphere', publication: 'Cursor docs', url: 'https://docs.cursor.com/context/codebase-indexing', description: 'How retrieval surfaces relevant files when the repo exceeds the window.' },
              { title: 'Long context tips', author: 'Anthropic', publication: 'Anthropic docs', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/long-context-tips', description: 'Techniques for working effectively when context is large but finite.' },
              { title: 'AI-assisted programming', author: 'Simon Willison', publication: 'simonwillison.net', url: 'https://simonwillison.net/tags/ai-assisted-programming/', description: 'Real-world notes on guiding tools through large codebases.' },
            ],
          },
          matchingPairs: [
            { term: 'Context window ceiling', definition: 'The model can never see the whole large codebase at once' },
            { term: 'Indexing / retrieval', definition: 'Tools surface relevant files for a task instead of loading everything' },
            { term: 'Agentic exploration', definition: 'The agent searches and opens files on demand to understand the code' },
            { term: 'Modular structure', definition: 'Clear boundaries so a change stays local and legible from partial context' },
            { term: 'Task decomposition', definition: 'Breaking big work into focused changes that each touch a few files' },
            { term: 'Self-explaining code', definition: 'Clear names, small files, and comments that capture intent' },
          ],
          scenarioQuiz: [
            {
              id: 'vc_m3_l4_s1',
              question: 'Your app is hundreds of files and the model keeps guessing what is in code it has not seen. What helps most?',
              options: [
                'Demand the model memorize the whole repo',
                'Point it at the relevant files, keep code modular and well named, and decompose the task so each change stays local',
                'Put all code in one giant file',
                'Stop using AI on big projects',
              ],
              correct: 1,
              explanation: 'The codebase exceeds the window by nature. Supplying the right slice, structuring code legibly, and decomposing work keep each change within a view the model can hold.',
            },
            {
              id: 'vc_m3_l4_s2',
              question: 'Why does writing modular, clearly named code help AI tools specifically?',
              options: [
                'It does not affect AI at all',
                'The model works from partial context, so legible structure lets it act correctly without seeing the whole system',
                'It makes the model run on more cores',
                'It removes the need for any context',
              ],
              correct: 1,
              explanation: 'Like a new teammate, the model understands code from a limited view. Clear boundaries and names make a partial view sufficient to act correctly.',
            },
            {
              id: 'vc_m3_l4_s3',
              question: 'You ask for a change to one small feature, but it seems to require understanding the entire app. What is this often a sign of?',
              options: [
                'The model is broken',
                'The architecture is too tangled, which hurts both the AI and human developers; cleaner module boundaries would keep the change local',
                'You need a bigger context window only',
                'The feature is impossible',
              ],
              correct: 1,
              explanation: 'When a small task needs whole-system understanding, the design is too coupled. Clean boundaries keep changes local for both AI and people.',
            },
          ],
        },
        {
          id: 'vibecoding_m3_l5',
          title: 'Debugging AI-Generated Code',
          xp: 20,
          slides: [
            { type: 'intro', title: 'It Will Have Bugs', body: 'AI-generated code is often right and sometimes wrong, and the wrong parts can be subtle. Debugging is not a failure of vibe coding, it is part of it. The model can also be remarkably good at fixing its own mistakes when you point well.' },
            { type: 'text', title: 'What Goes Wrong And Why', body: 'Typical failures: hallucinated APIs, off-by-one and edge-case logic, mismatched assumptions about your data, and code that runs but does the wrong thing. The fluent, confident style makes subtle bugs easy to miss.' },
            { type: 'text', title: 'Get The Model To Fix It', body: 'Feed back the concrete evidence: the exact error message, the failing input, the unexpected output, what you expected instead. "It throws this error on this input, fix it" works far better than "it is broken."' },
            { type: 'highlight', title: 'Know When To Take Over', body: 'If the model loops, swapping one wrong fix for another, stop. Add logging, read the code yourself, form a hypothesis, and either fix it directly or hand the model your diagnosis. Sometimes writing it yourself is the fastest path.' },
            { type: 'summary', title: 'Lesson Complete! +20 XP', body: 'AI code has bugs, often subtle ones hidden by fluent output. Debug by feeding back concrete evidence (exact errors, failing inputs, expected versus actual) so the model can fix its own work. When it loops without progress, take over: add logging, read the code, diagnose, and fix or hand back a clear hypothesis.' },
          ],
          summary:
            'Debugging is part of vibe coding, not a sign it failed. AI code fails in recognizable ways: hallucinated APIs, edge-case logic, wrong assumptions about your data, and code that runs but misbehaves, all hidden by confident formatting. The model is often great at fixing its own bugs if you feed back concrete evidence: exact errors, failing inputs, expected versus actual. When it loops swapping bad fixes, take over with logging and a real hypothesis, and sometimes just write it yourself.',
          sources: [
            { label: 'Anthropic: reducing hallucinations', url: 'https://docs.anthropic.com/en/docs/test-and-evaluate/strengthen-guardrails/reduce-hallucinations' },
            { label: 'Simon Willison: AI-assisted programming notes', url: 'https://simonwillison.net/tags/ai-assisted-programming/' },
            { label: 'MDN: debugging JavaScript', url: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/What_went_wrong' },
          ],
          deepDive: {
            readingTime: '8 min',
            sections: [
              {
                heading: 'Why AI Code Breaks',
                body:
                  'Generated code fails in a handful of recognizable ways. It hallucinates: calling functions or APIs that do not exist or with the wrong signature. It mishandles edges: the happy path works, but empty inputs, nulls, large values, or concurrent access were never considered. It assumes wrong: it guesses the shape of your data or the behavior of a dependency and guesses incorrectly. And sometimes it produces code that runs cleanly while doing the wrong thing, which is the most dangerous category because nothing crashes to alert you.\n\nWhat ties these together is presentation. The output is fluent, well formatted, and confident regardless of correctness, so subtle bugs do not look like bugs. This is exactly why the test-and-verify step of the loop is non-negotiable, and why a developer who can read code remains essential even in a heavily AI-assisted workflow.',
              },
              {
                heading: 'Turning The Model Into Its Own Debugger',
                body:
                  'The good news is that the same model that wrote the bug is often excellent at fixing it, provided you give it something concrete to work with. Vague reports produce vague fixes. Specific evidence produces specific fixes.\n\nFeed back the exact error message, the input that triggers it, the output you got, and the output you expected. "This function throws this TypeError when the list is empty; it should return an empty array instead" gives the model a precise target. Pasting stack traces, failing test output, and unexpected values turns debugging into the same describe-run-fix loop you already use, now aimed at a defect. Often a single round of concrete feedback resolves it, because the model can see the discrepancy clearly once you make it explicit.',
              },
              {
                heading: 'Breaking The Fix Loop',
                body:
                  'Sometimes the model gets stuck: it offers a fix that does not work, you report that, it offers another wrong fix, and you spiral. This usually means the model is missing the real cause, often because it cannot see the relevant context or is reasoning from a wrong assumption it keeps reusing.\n\nWhen you notice two or three failed rounds, change tactics instead of continuing. Add logging or print statements to gather real data about what is actually happening. Narrow the problem to the smallest reproduction. Form your own hypothesis about the cause. Then either hand the model that hypothesis ("the bug is that the date is parsed in the wrong timezone here; fix that") which gives it the missing insight, or simply fix it yourself. Recognizing the loop early saves far more time than one more hopeful prompt.',
              },
              {
                heading: 'When To Write It Yourself',
                body:
                  'A mature vibe coder knows that the AI is one tool among several, and that sometimes the fastest path is your own hands on the keyboard. For a gnarly, stateful bug, a tricky concurrency issue, or a piece of logic you understand precisely and the model keeps fumbling, writing or fixing it directly can be quicker than steering a confused agent through it.\n\nThis is not a retreat from vibe coding, it is good judgment about where each tool is strongest. The model excels at breadth, boilerplate, and exploration; you excel at deep, precise reasoning about a specific problem you hold fully in your head. The point of learning to debug AI code is not to eliminate the human, it is to make the human a better director: knowing when to keep steering, when to feed a hypothesis, and when to take the wheel.',
              },
            ],
            sources: [
              { label: 'Anthropic: reducing hallucinations', url: 'https://docs.anthropic.com/en/docs/test-and-evaluate/strengthen-guardrails/reduce-hallucinations' },
              { label: 'Simon Willison: AI-assisted programming notes', url: 'https://simonwillison.net/tags/ai-assisted-programming/' },
              { label: 'MDN: debugging JavaScript', url: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/What_went_wrong' },
            ],
            furtherReading: [
              { title: 'Reduce hallucinations', author: 'Anthropic', publication: 'Anthropic docs', url: 'https://docs.anthropic.com/en/docs/test-and-evaluate/strengthen-guardrails/reduce-hallucinations', description: 'Why models invent APIs and how to make output more grounded.' },
              { title: 'What went wrong? Debugging JavaScript', author: 'MDN Web Docs', publication: 'developer.mozilla.org', url: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/What_went_wrong', description: 'Fundamentals of reading errors and forming hypotheses, still essential with AI.' },
              { title: 'AI-assisted programming', author: 'Simon Willison', publication: 'simonwillison.net', url: 'https://simonwillison.net/tags/ai-assisted-programming/', description: 'Field notes on debugging AI output and knowing when to take over.' },
            ],
          },
          matchingPairs: [
            { term: 'Hallucinated API', definition: 'A called function or signature that does not actually exist' },
            { term: 'Runs but wrong', definition: 'Code that executes cleanly while doing the wrong thing' },
            { term: 'Concrete evidence', definition: 'Exact error, failing input, and expected versus actual output' },
            { term: 'Fix loop', definition: 'The model swapping one wrong fix for another without progress' },
            { term: 'Add logging', definition: 'Gathering real data to find the true cause when stuck' },
            { term: 'Take the wheel', definition: 'Writing or fixing it yourself when that is the fastest path' },
          ],
          scenarioQuiz: [
            {
              id: 'vc_m3_l5_s1',
              question: 'The model gave you code that throws on empty input. What is the most effective way to get it fixed?',
              options: [
                'Tell it "this is broken, fix it"',
                'Paste the exact error, the input that triggers it, and the expected behavior ("should return an empty array")',
                'Switch to a different project',
                'Accept the bug',
              ],
              correct: 1,
              explanation: 'Concrete evidence (exact error, triggering input, expected output) gives the model a precise target, turning debugging into a focused describe-run-fix loop.',
            },
            {
              id: 'vc_m3_l5_s2',
              question: 'The model has offered three fixes in a row that each fail differently. What should you do?',
              options: [
                'Keep asking for more fixes the same way',
                'Break the loop: add logging, find the smallest reproduction, form a hypothesis, then feed that hypothesis to the model or fix it yourself',
                'Delete the file',
                'Assume the bug is unfixable',
              ],
              correct: 1,
              explanation: 'A fix loop means the model is missing the real cause. Gathering real data and supplying a concrete hypothesis (or fixing it yourself) breaks the spiral.',
            },
            {
              id: 'vc_m3_l5_s3',
              question: 'Why is the "runs but does the wrong thing" category especially dangerous?',
              options: [
                'It always crashes loudly',
                'Nothing errors to alert you, and the fluent, confident output makes the subtle bug easy to miss',
                'It only happens in old languages',
                'The model warns you about it automatically',
              ],
              correct: 1,
              explanation: 'Silent logic bugs do not announce themselves, and confident formatting hides them. This is why verifying behavior, not just that it runs, is essential.',
            },
          ],
        },
      ],
      quiz: [
        { id: 'vibecoding_m3_q1', question: 'What three ingredients most improve a code prompt?', options: ['Length, politeness, and emojis', 'Specificity, context, and constraints', 'Speed, cost, and luck', 'Vagueness, brevity, and hope'], correct: 1, explanation: 'Specificity says what to build, context says how to fit the existing code, and constraints say what to avoid. Together they remove the guesses that cause bad output.' },
        { id: 'vibecoding_m3_q2', question: 'When a long session decays into contradictions and recycled mistakes, what is the best response?', options: ['Prompt harder in the same thread', 'Recognize context rot and start a clean session with a crisp summary of the current state', 'Delete the codebase', 'Give up on the feature'], correct: 1, explanation: 'That decay is context rot. A fresh session with clean working memory and a short summary beats fighting a cluttered, confused thread.' },
        { id: 'vibecoding_m3_q3', question: 'Why does writing modular, clearly named, well-commented code matter for AI tools?', options: ['It does not matter for AI', 'The model works from partial context (the codebase exceeds the window), so legible structure lets it act correctly without seeing everything', 'It makes the model faster', 'It removes the need for prompts'], correct: 1, explanation: 'No model can hold a large codebase at once. Clear structure and naming make a partial view sufficient, the same property that helps human developers.' },
      ],
    },
    {
      id: 'vibecoding_m4',
      level: 'intermediate',
      title: 'Building Real Things',
      emoji: '🛠️',
      description: 'Ship an app from zero to deployed: your first build, frontend, backend and APIs, deployment, and a Web3 app that combines this course with MAIDEN.',
      color: '#A78BFA',
      lessons: [
        {
          id: 'vibecoding_m4_l1',
          title: 'Your First Vibe Coded App',
          xp: 20,
          slides: [
            { type: 'intro', title: 'Zero To Deployed', body: 'The fastest way to learn vibe coding is to ship one real thing. This lesson walks the whole arc: pick an idea, choose a stack, prompt your way to a working app, dodge the common pitfalls, and get it live.' },
            { type: 'text', title: 'Pick A Small, Real Idea', body: 'Choose something bounded and genuinely useful to you: a habit tracker, a link saver, a tip calculator. Small enough to finish, real enough to care about finishing. Scope is the difference between a shipped app and an abandoned one.' },
            { type: 'text', title: 'Choose A Boring Stack', body: 'Lean on what the models know best and what deploys easily. Next.js with React, a component library, and a managed backend like Supabase is a well-trodden path. Boring, popular choices mean better AI output and fewer surprises.' },
            { type: 'highlight', title: 'Prompt In Slices', body: 'Do not ask for the whole app in one prompt. Build it in slices: scaffold, then one feature, then the next, running after each. Commit working states. You are assembling a real thing step by step, not summoning it whole.' },
            { type: 'summary', title: 'Lesson Complete! +20 XP', body: 'Ship one small, real app end to end. Pick a bounded idea, choose a boring popular stack the models know well, build in slices with a run and commit after each, and deploy. The pitfalls are over-scoping, exotic tech, and one-giant-prompt thinking.' },
          ],
          summary:
            'Nothing teaches vibe coding like shipping one real app. The arc: pick a small, genuinely useful idea; choose a boring, popular stack (Next.js plus a managed backend) the models know well and that deploys easily; build in slices with a run and a commit after each; then deploy. The classic pitfalls are over-scoping, choosing exotic tech the model handles poorly, and trying to generate the whole app in one prompt.',
          sources: [
            { label: 'Next.js documentation', url: 'https://nextjs.org/docs' },
            { label: 'Supabase documentation', url: 'https://supabase.com/docs' },
            { label: 'Vercel: deploy a Next.js app', url: 'https://vercel.com/docs/frameworks/nextjs' },
          ],
          deepDive: {
            readingTime: '8 min',
            sections: [
              {
                heading: 'Scope Is Everything',
                body:
                  'The most common reason a first project dies is that it was too big. A grand idea has no obvious finish line, so it never gets finished. The antidote is ruthless scoping: pick something you could describe in a sentence and use yourself within a week. A habit tracker, a bookmark saver, a small calculator, a tool that solves one annoyance in your own life.\n\nSmall and real beats big and hypothetical for two reasons. Small means you reach a working, shippable state, which is where the real learning and the motivation live. Real means you actually care whether it works, which keeps you going through the unglamorous middle. You can always extend a shipped app. You cannot extend one you abandoned. Treat your first project as a vehicle for completing the whole loop once, end to end, not as your magnum opus.',
              },
              {
                heading: 'Pick A Stack The Models Know',
                body:
                  'Your choice of technology quietly determines how good your AI assistance will be. Models are strongest on popular, well-documented tools because they have seen vast amounts of that code. They are weaker and more error-prone on niche or brand-new frameworks. So for a first app, choose boring on purpose.\n\nA reliable default for web apps is Next.js with React for the frontend, a mainstream component or styling approach, and a managed backend such as Supabase for database and auth. This combination is everywhere in the training data, deploys cleanly to platforms like Vercel, and lets the model lean on patterns it knows cold. The payoff is fewer hallucinations, smoother generations, and a clear deployment path. Save the exotic, cutting-edge stack for when you have the experience to babysit the model through unfamiliar territory.',
              },
              {
                heading: 'Build In Slices',
                body:
                  'A whole app is too much to ask for in one prompt, and the result of trying is an unreviewable blob. Build in slices instead. Start by scaffolding the project and getting an empty app to run. Then add one feature, prompt it, run it, and commit. Then the next feature, the same way.\n\nFor a habit tracker that might be: scaffold the Next.js app and confirm it loads; add the data model and a list that shows hardcoded habits; wire up creating a habit; add marking a habit done; persist to Supabase; add basic styling. Each slice is a small, specific prompt with the right context, a quick run to verify, and a commit so you have a safe point to return to. This rhythm, slice, run, commit, is the practical core of building something real with AI, and it keeps you always close to a working state.',
              },
              {
                heading: 'The Common Pitfalls',
                body:
                  'A few traps catch nearly every beginner. Over-scoping, already discussed, is the biggest. Exotic tech is the second: a stack the model fumbles turns every step into a fight. One-giant-prompt thinking is the third: asking for everything at once yields code you cannot review and cannot debug. A fourth is skipping the run: accepting generations without actually running them lets bugs and hallucinations pile up invisibly until the whole thing is broken and you do not know which slice did it.\n\nThe meta-pitfall is treating vibe coding as a magic wand instead of a fast loop you steer. Avoid these by keeping scope tiny, tech boring, prompts sliced, and the app running after every change. Do that, and your first project will reach the most important milestone of all: actually being deployed and used.',
              },
            ],
            sources: [
              { label: 'Next.js documentation', url: 'https://nextjs.org/docs' },
              { label: 'Supabase documentation', url: 'https://supabase.com/docs' },
              { label: 'Vercel: deploy a Next.js app', url: 'https://vercel.com/docs/frameworks/nextjs' },
            ],
            furtherReading: [
              { title: 'Next.js documentation', author: 'Vercel', publication: 'nextjs.org', url: 'https://nextjs.org/docs', description: 'The framework most AI tools handle best, with a clean deploy path.' },
              { title: 'Supabase documentation', author: 'Supabase', publication: 'supabase.com', url: 'https://supabase.com/docs', description: 'A managed Postgres backend with auth, popular and well represented in training data.' },
              { title: 'AI-assisted programming', author: 'Simon Willison', publication: 'simonwillison.net', url: 'https://simonwillison.net/tags/ai-assisted-programming/', description: 'Practical accounts of shipping small projects with AI assistance.' },
            ],
          },
          matchingPairs: [
            { term: 'Ruthless scoping', definition: 'Choosing an idea small and real enough to actually finish' },
            { term: 'Boring stack', definition: 'Popular, well-documented tech the models handle reliably' },
            { term: 'Build in slices', definition: 'Scaffold, then one feature at a time, running after each' },
            { term: 'Slice, run, commit', definition: 'The practical rhythm that keeps you near a working state' },
            { term: 'One-giant-prompt trap', definition: 'Asking for the whole app at once and getting unreviewable code' },
            { term: 'Skipping the run', definition: 'Accepting generations without verifying, so bugs pile up invisibly' },
          ],
          scenarioQuiz: [
            {
              id: 'vc_m4_l1_s1',
              question: 'For a first vibe coded app, which idea is most likely to actually ship?',
              options: [
                'A full social network with messaging, feeds, and payments',
                'A small habit tracker you would use yourself this week',
                'An operating system',
                'A general-purpose AI assistant',
              ],
              correct: 1,
              explanation: 'Small and real reaches a shippable state, where the learning and motivation live. Grand scope has no finish line and tends to be abandoned.',
            },
            {
              id: 'vc_m4_l1_s2',
              question: 'Why choose a popular, "boring" stack for AI-assisted building?',
              options: [
                'Boring stacks are always faster at runtime',
                'Models are strongest on popular, well-documented tech, so you get fewer hallucinations and smoother generations',
                'It is the only stack that exists',
                'Exotic stacks deploy more easily',
              ],
              correct: 1,
              explanation: 'The model has seen far more popular-stack code, so output is more reliable. Niche frameworks produce more errors and need more babysitting.',
            },
            {
              id: 'vc_m4_l1_s3',
              question: 'What is the healthiest rhythm for building the app?',
              options: [
                'Generate the entire app in one prompt and deploy it untested',
                'Build in slices: scaffold, add one feature, run it, commit, repeat',
                'Never run the code until the very end',
                'Avoid version control to move faster',
              ],
              correct: 1,
              explanation: 'Slice, run, commit keeps every change small and reviewable and keeps you near a working state, which is the core practical loop.',
            },
          ],
        },
        {
          id: 'vibecoding_m4_l2',
          title: 'Frontend in a Day',
          xp: 20,
          slides: [
            { type: 'intro', title: 'Where AI Shines', body: 'Frontend work, components, layout, styling, responsiveness, is where AI assistance feels almost magical. The patterns are well known and visual, so the model produces good results fast and you can see immediately whether they are right.' },
            { type: 'text', title: 'Generate Components', body: 'Ask for focused, reusable components: a card, a modal, a form, a nav bar. Name the props and behavior. Reuse them across the app instead of regenerating similar markup, the same composition discipline good frontend always rewards.' },
            { type: 'text', title: 'Style And Make It Responsive', body: 'Describe the look you want and the breakpoints that matter. Models are fluent in popular styling approaches and responsive patterns, so "make this a two-column grid on desktop and stacked on mobile" usually just works.' },
            { type: 'highlight', title: 'Describe The Screenshot', body: 'A powerful technique: show or precisely describe a design and ask the model to build it. Multimodal models can turn an image of a UI into working components, collapsing the gap between a mockup and a real, coded interface.' },
            { type: 'summary', title: 'Lesson Complete! +20 XP', body: 'Frontend is AI\'s strongest suit: visual, pattern-rich, and instantly checkable. Generate focused reusable components, describe the look and breakpoints for responsive layouts, and use the describe-the-screenshot technique to turn a design into working code in a day.' },
          ],
          summary:
            'Frontend is where vibe coding feels magical, because UI patterns are common, visual, and instantly verifiable. The workflow: generate focused, reusable components with clear props; describe the look and the breakpoints to get responsive layouts the model already knows; and use the describe-the-screenshot technique, feeding a mockup or precise description to multimodal models that turn designs into working components. A polished frontend in a day is realistic.',
          sources: [
            { label: 'React documentation', url: 'https://react.dev/learn' },
            { label: 'v0 by Vercel', url: 'https://v0.dev/' },
            { label: 'Tailwind CSS: responsive design', url: 'https://tailwindcss.com/docs/responsive-design' },
          ],
          deepDive: {
            readingTime: '7 min',
            sections: [
              {
                heading: 'Why Frontend Is AI\'s Best Subject',
                body:
                  'Of all the kinds of code you might generate, user interfaces play most to a model\'s strengths. The patterns are extremely common in training data: there are millions of buttons, cards, forms, and navigation bars to learn from. The work is visual, so when the model gets it right or wrong, you can see immediately rather than tracing through hidden logic. And the feedback loop is tight, because rendering the component shows you the result in seconds.\n\nThis combination, common patterns plus instant visual verification, is why a polished frontend genuinely can come together in a day. The risks that haunt backend and business logic, silent wrong behavior, subtle data corruption, are largely absent. A misaligned button or a wrong color announces itself the moment you look. Frontend is the ideal place for a beginner to feel the power of vibe coding while staying in full control of judging the output.',
              },
              {
                heading: 'Components And Composition',
                body:
                  'The discipline that makes frontend maintainable, with or without AI, is composition: building from small, reusable components rather than one sprawling page. Vibe coding rewards this directly. Ask the model for a focused component with named props and clear behavior, a Card that takes a title and children, a Modal that takes an open state and an onClose, a form field with validation. Then reuse it everywhere instead of regenerating similar markup.\n\nThis keeps your codebase legible for both you and the model, since each component is small enough to hold in context and clear enough to retrieve by name. It also compounds: a good component library you build early makes every later prompt shorter, because you can say "reuse our Card" instead of redescribing it. Treat the model as a fast component factory, but apply the same composition standards you would by hand, so the output is something you can build on rather than a pile of one-off markup.',
              },
              {
                heading: 'Styling And Responsiveness',
                body:
                  'Models are fluent in the popular styling ecosystems and in responsive design patterns, which makes layout work unusually smooth. You can describe the look you want in plain language, the spacing, the color treatment, the typography feel, and get a reasonable first pass, then refine with targeted feedback the same way you steer any generation.\n\nResponsiveness is similar. Describe the behavior across screen sizes, a two-column grid on desktop that stacks on mobile, a nav that collapses into a menu below a breakpoint, and the model applies the standard responsive patterns it knows well. Because the result is visual, you verify by resizing the window. The one caution is consistency: without a rules file or a component library, the model may style each piece slightly differently, so encode your design tokens and reuse components to keep the whole app coherent rather than a patchwork of locally reasonable choices.',
              },
              {
                heading: 'The Describe-The-Screenshot Technique',
                body:
                  'One of the most striking capabilities is turning a design into code. Multimodal models can accept an image, a mockup, a screenshot of an app you admire, a hand sketch, and produce components that recreate it. Tools like v0 lean into this, and general assistants increasingly support it too. You collapse the traditional gap between "here is what it should look like" and "here is the working interface."\n\nEven without an image, a precise verbal description of a layout works remarkably well, because you are giving the model a clear visual target. The technique shifts your effort from writing markup to specifying design, which is exactly the kind of higher-level direction vibe coding is about. Used well, you can go from a picture in your head, or on your screen, to a responsive, working frontend in a single focused session, then spend your remaining energy on the behavior and the data behind it.',
              },
            ],
            sources: [
              { label: 'React documentation', url: 'https://react.dev/learn' },
              { label: 'v0 by Vercel', url: 'https://v0.dev/' },
              { label: 'Tailwind CSS: responsive design', url: 'https://tailwindcss.com/docs/responsive-design' },
            ],
            furtherReading: [
              { title: 'React documentation', author: 'Meta', publication: 'react.dev', url: 'https://react.dev/learn', description: 'The component and composition model underpinning most AI-built frontends.' },
              { title: 'v0 by Vercel', author: 'Vercel', publication: 'v0.dev', url: 'https://v0.dev/', description: 'A tool built around generating UI, including from images and descriptions.' },
              { title: 'Responsive design', author: 'Tailwind Labs', publication: 'tailwindcss.com', url: 'https://tailwindcss.com/docs/responsive-design', description: 'The breakpoint patterns models reach for when you ask for responsive layouts.' },
            ],
          },
          matchingPairs: [
            { term: 'Frontend strength', definition: 'Common visual patterns and instant verification make AI output reliable' },
            { term: 'Composition', definition: 'Building from small reusable components rather than one sprawling page' },
            { term: 'Reusable component', definition: 'A focused piece with named props you use across the app' },
            { term: 'Responsive description', definition: 'Stating breakpoint behavior so the model applies known patterns' },
            { term: 'Describe the screenshot', definition: 'Feeding a mockup or image so a multimodal model recreates the UI' },
            { term: 'Design tokens / rules', definition: 'Encoded styling so the whole app stays visually consistent' },
          ],
          scenarioQuiz: [
            {
              id: 'vc_m4_l2_s1',
              question: 'Why does frontend work feel especially reliable with AI compared to complex backend logic?',
              options: [
                'Frontend code never has bugs',
                'UI patterns are common in training data and the result is visual, so you can verify correctness instantly',
                'Backends are not supported by AI',
                'Frontend requires no review',
              ],
              correct: 1,
              explanation: 'Common patterns plus instant visual verification make UI a strong suit. A wrong color or layout announces itself immediately, unlike silent logic bugs.',
            },
            {
              id: 'vc_m4_l2_s2',
              question: 'You have a mockup of the screen you want. What is the fastest path to a working version?',
              options: [
                'Describe nothing and hope',
                'Use the describe-the-screenshot technique: give the image or a precise description to a multimodal model and have it generate components',
                'Hand-code every pixel first, then ask AI',
                'Avoid components entirely',
              ],
              correct: 1,
              explanation: 'Multimodal models can turn a mockup or screenshot into working components, collapsing the gap between design and code.',
            },
            {
              id: 'vc_m4_l2_s3',
              question: 'Your AI-built UI looks slightly inconsistent across pages. What prevents this?',
              options: [
                'Generating every element from scratch each time',
                'Encoding design tokens in a rules file and reusing a shared component library so styling stays coherent',
                'Using a different model per page',
                'Removing all styling',
              ],
              correct: 1,
              explanation: 'Without shared tokens and components, the model styles each piece slightly differently. Reuse and encoded design rules keep the app visually coherent.',
            },
          ],
        },
        {
          id: 'vibecoding_m4_l3',
          title: 'Backend and APIs',
          xp: 20,
          slides: [
            { type: 'intro', title: 'The Harder Half', body: 'Backends are less forgiving than frontends. The logic is invisible, the data is precious, and mistakes can be silent. AI can build working backends, but this is where judgment and verification earn their keep.' },
            { type: 'text', title: 'The Pieces', body: 'A typical backend: a database schema, authentication, and API routes. Tools like Express, FastAPI, and managed platforms like Supabase are well represented in training data, so the model handles the common shapes well.' },
            { type: 'text', title: 'Schemas And Auth', body: 'Describe your data model and let the model propose a schema, then review it carefully: types, relationships, indexes, constraints. For auth, prefer proven managed solutions over hand-rolled login, and never trust client input on the server.' },
            { type: 'highlight', title: 'Where AI Struggles', body: 'Backends expose vibe coding\'s weak spots: complex business logic with many rules, database migrations that must preserve data, and subtle security. These reward careful engineering over fast iteration. Slow down and verify here.' },
            { type: 'summary', title: 'Lesson Complete! +20 XP', body: 'AI builds working backends, schemas, auth, and API routes, on popular stacks, but this is the harder half. Review schemas closely, prefer managed auth, validate all input server-side, and slow down for complex business logic, migrations, and security, where mistakes are silent and expensive.' },
          ],
          summary:
            'Backends are the harder half of vibe coding: logic is invisible, data is precious, and errors are silent. AI handles the common shapes well on popular stacks (Express, FastAPI, Supabase): database schemas, authentication, and API routes. The discipline is to review schemas carefully, prefer proven managed auth over hand-rolled login, validate all input server-side, and deliberately slow down for the things AI struggles with: complex business logic, data-preserving migrations, and security.',
          sources: [
            { label: 'Supabase documentation', url: 'https://supabase.com/docs' },
            { label: 'FastAPI documentation', url: 'https://fastapi.tiangolo.com/' },
            { label: 'OWASP Top 10', url: 'https://owasp.org/www-project-top-ten/' },
          ],
          deepDive: {
            readingTime: '8 min',
            sections: [
              {
                heading: 'Why Backends Are Less Forgiving',
                body:
                  'Frontend mistakes are visible and usually harmless: a misaligned button is obvious and nobody loses data over it. Backend mistakes are the opposite. The logic runs out of sight, so a wrong calculation or a flawed permission check may produce no visible symptom while quietly corrupting data or leaking information. And the data itself is precious in a way pixels are not. You can re-render a screen; you cannot always recover a database you mangled.\n\nThis asymmetry should change how you work. On the frontend you can move fast and verify by looking. On the backend you must verify by testing behavior, checking edge cases, and reasoning about what happens when things go wrong. AI is perfectly capable of producing working backend code, but the cost of an unnoticed mistake is far higher, so the verify step of the loop becomes non-negotiable rather than nice to have.',
              },
              {
                heading: 'Schemas, Auth, And Routes',
                body:
                  'Most backends come down to three things, and the model handles all of them well on popular stacks. The database schema defines your data; describe your entities and relationships and let the model propose tables, but then review the proposal with care: are the types right, the relationships correct, the constraints and indexes sensible. A schema mistake propagates everywhere, so this review is worth your full attention.\n\nAuthentication decides who can do what. Here the strong advice is to lean on proven, managed solutions, the auth built into platforms like Supabase, or established libraries, rather than letting the model invent a login system from scratch, because security-critical code is exactly where subtle errors hide. API routes connect the frontend to the data; the model writes these readily, and your job is to ensure each one validates its input and enforces the right permissions. On well-trodden stacks like Express, FastAPI, or Supabase, you get reliable scaffolding for all three, leaving you to supply the review and the judgment.',
              },
              {
                heading: 'Never Trust The Client',
                body:
                  'The single most important backend principle, and one beginners using AI often miss, is that the server must never trust input from the client. Anything coming from the browser, form fields, URL parameters, request bodies, headers, can be forged by a malicious user, so the backend has to validate and authorize everything independently.\n\nAI-generated code frequently implements validation on the frontend, which is good for user experience but worthless for security, because an attacker simply bypasses the browser. The fix is to insist, in your prompts and your review, on server-side validation and authorization for every route: check that inputs are well formed, and check that the authenticated user is actually allowed to perform the action on that specific resource. This is also where SQL injection and similar attacks live; using parameterized queries and validating types closes those doors. Make "validate and authorize on the server" a standing rule, because the model will not always add it unprompted.',
              },
              {
                heading: 'Where To Slow Down',
                body:
                  'Backends concentrate the tasks vibe coding finds hardest, and knowing them tells you when to shift from fast iteration to careful engineering. Complex business logic, rules with many interacting cases and exceptions, is hard to specify in prose and easy for the model to get subtly wrong, so it deserves precise specification, tests, and your own reading of the code. Database migrations, changes to a schema that already holds real data, must preserve that data and are unforgiving of mistakes, so they reward deliberate, reviewed, reversible steps rather than a quick generation. And security throughout, as above, demands real scrutiny because plausible code can hide serious flaws.\n\nNone of this means avoiding AI on the backend. It means matching your mode to the stakes: vibe fast through routine CRUD and scaffolding, and slow down to engineer carefully through logic, migrations, and security. That judgment, when to trust the loop and when to take the controls, is the whole skill of building real backends with AI.',
              },
            ],
            sources: [
              { label: 'Supabase documentation', url: 'https://supabase.com/docs' },
              { label: 'FastAPI documentation', url: 'https://fastapi.tiangolo.com/' },
              { label: 'OWASP Top 10', url: 'https://owasp.org/www-project-top-ten/' },
            ],
            furtherReading: [
              { title: 'OWASP Top 10', author: 'OWASP Foundation', publication: 'owasp.org', url: 'https://owasp.org/www-project-top-ten/', description: 'The web security risks, including injection and broken access control, to review on every backend.' },
              { title: 'Supabase documentation', author: 'Supabase', publication: 'supabase.com', url: 'https://supabase.com/docs', description: 'Managed Postgres, auth, and row-level security, a beginner-friendly backend.' },
              { title: 'FastAPI documentation', author: 'Sebastián Ramírez', publication: 'fastapi.tiangolo.com', url: 'https://fastapi.tiangolo.com/', description: 'A popular, well-documented Python API framework models handle well.' },
            ],
          },
          matchingPairs: [
            { term: 'Silent backend bug', definition: 'A wrong calculation or check that corrupts data with no visible symptom' },
            { term: 'Schema review', definition: 'Checking types, relationships, constraints, and indexes before building on them' },
            { term: 'Managed auth', definition: 'Proven login systems preferred over hand-rolled, security-critical code' },
            { term: 'Never trust the client', definition: 'Validate and authorize every request on the server, not just the browser' },
            { term: 'Migration', definition: 'A schema change over real data that must preserve it and is unforgiving' },
            { term: 'Match mode to stakes', definition: 'Vibe fast through CRUD, slow down for logic, migrations, and security' },
          ],
          scenarioQuiz: [
            {
              id: 'vc_m4_l3_s1',
              question: 'The AI added validation only in the React form. Why is that insufficient for security?',
              options: [
                'It is sufficient; frontend validation is enough',
                'An attacker can bypass the browser entirely, so the server must independently validate and authorize every request',
                'Frontend validation is always wrong',
                'You should remove all validation',
              ],
              correct: 1,
              explanation: 'Client-side validation helps UX but is worthless for security. The server must never trust client input and must validate and authorize independently.',
            },
            {
              id: 'vc_m4_l3_s2',
              question: 'Which backend task most warrants slowing down from fast iteration to careful engineering?',
              options: [
                'A simple list endpoint returning rows',
                'A database migration that must preserve existing real data',
                'Rendering a static page',
                'Adding a CSS class',
              ],
              correct: 1,
              explanation: 'Migrations over real data are unforgiving and must preserve it. They reward deliberate, reviewed, reversible steps rather than a quick generation.',
            },
            {
              id: 'vc_m4_l3_s3',
              question: 'For authentication in a vibe coded app, what is the safest default?',
              options: [
                'Let the model invent a custom login system from scratch',
                'Lean on proven managed auth (e.g. Supabase) or established libraries rather than hand-rolling security-critical code',
                'Skip authentication entirely',
                'Store passwords in plain text for simplicity',
              ],
              correct: 1,
              explanation: 'Security-critical code is where subtle errors hide. Proven managed auth and established libraries are far safer than a model-invented login system.',
            },
          ],
        },
        {
          id: 'vibecoding_m4_l4',
          title: 'Deploying AI-Built Apps',
          xp: 20,
          slides: [
            { type: 'intro', title: 'Shipping Is The Point', body: 'An app that only runs on your laptop is a draft. Deployment makes it real. The good news: modern platforms make going live genuinely easy, and AI tools know them well.' },
            { type: 'text', title: 'The Platforms', body: 'Vercel is the smooth path for Next.js and frontends. Railway and Fly.io host backends and full-stack apps. Push your code, connect the repo, set environment variables, and the platform builds and serves it.' },
            { type: 'text', title: 'CI/CD Basics', body: 'Continuous deployment ties your git repo to your live site: push to your main branch and it deploys automatically. Add a check (build and tests must pass) so a broken commit does not reach production.' },
            { type: 'highlight', title: 'Review Before Production', body: 'Before exposing an AI-built app to the world, run the security checklist: no secrets in the code, all input validated server-side, auth and permissions enforced, dependencies verified as real, and HTTPS on. Plausible code is not the same as safe code.' },
            { type: 'summary', title: 'Lesson Complete! +20 XP', body: 'Deployment turns a draft into a product. Vercel, Railway, and Fly.io make going live easy, and CI/CD auto-deploys from git with build and test gates. Before production, run the security checklist for AI-built code: no leaked secrets, server-side validation, enforced auth, verified dependencies, and HTTPS.' },
          ],
          summary:
            'Deploying is what turns a local draft into a real product, and modern platforms make it easy. Vercel suits Next.js and frontends; Railway and Fly.io host backends and full-stack apps. CI/CD links your git repo to production so pushes deploy automatically, gated by build and test checks. The critical addition for AI-built apps is a pre-production security checklist: no secrets in code, server-side validation, enforced auth and permissions, verified dependencies, and HTTPS, because plausible code is not automatically safe.',
          sources: [
            { label: 'Vercel documentation', url: 'https://vercel.com/docs' },
            { label: 'Railway documentation', url: 'https://docs.railway.com/' },
            { label: 'OWASP Top 10', url: 'https://owasp.org/www-project-top-ten/' },
          ],
          deepDive: {
            readingTime: '7 min',
            sections: [
              {
                heading: 'From Localhost To The World',
                body:
                  'A surprising number of vibe coded projects never leave the laptop, which means they never really exist for anyone else. Deployment is the step that turns a private experiment into something a person can open in a browser, and it is where a project stops being a toy and becomes a product, however small. Treat reaching production as a core milestone of your first build, not an afterthought.\n\nThe encouraging reality is that deployment has never been easier. Platforms have absorbed most of the operational complexity that used to require a dedicated ops person, and because they are popular and well documented, AI tools know how to work with them. The model can scaffold the configuration, explain the steps, and help you debug a failed build. Going live is now a short, learnable process rather than a wall, and doing it once removes most of the fear for every future project.',
              },
              {
                heading: 'Choosing A Platform',
                body:
                  'Match the platform to what you built. For frontends and Next.js apps, Vercel is the smoothest path, it is made by the company behind Next.js, so the integration is seamless and the deploy is often just connecting your repository. For backends, full-stack apps, databases, and longer-running services, Railway and Fly.io are popular, flexible choices that host more general workloads.\n\nThe common shape across all of them is the same: connect your git repository, configure environment variables for your secrets and settings, and let the platform build and serve your app. Understanding that pattern, repo plus environment configuration plus managed build, transfers across providers, so you are not locked into memorizing one. Start with the platform that matches your stack and has the gentlest path, get something live, and broaden later as your needs grow.',
              },
              {
                heading: 'Continuous Deployment',
                body:
                  'Continuous integration and continuous deployment, CI/CD, connect your source repository to your running application so that shipping becomes automatic. The basic setup is simple and powerful: when you push to your main branch, the platform builds your app and deploys the new version, with no manual steps. Most of the platforms above offer this out of the box.\n\nThe safety upgrade is to add checks, or gates, before a deploy goes live: the build must succeed and your tests must pass, or the deployment is blocked. This is what keeps a broken commit from reaching real users, and it is where the tests you wrote earlier pay off. You do not need an elaborate pipeline to start; automatic deploy from main plus a build-and-test gate already gives you a professional workflow. As the project matters more, you can add preview deployments for branches, staging environments, and more thorough checks, but the core idea, push, verify, deploy, automatically, stays the same.',
              },
              {
                heading: 'The Pre-Production Security Checklist',
                body:
                  'The most important thing to add when deploying AI-built code is a deliberate security pass, because the model optimizes for code that works, not necessarily code that is safe, and plausible output can hide real vulnerabilities. Run a concrete checklist before you expose the app.\n\nFirst, no secrets in the code: API keys and credentials belong in environment variables, never committed to the repository, a mistake AI-assisted projects make often. Second, all input validated and authorized on the server, not just the client. Third, authentication and permissions actually enforced, so users cannot reach data that is not theirs. Fourth, dependencies verified as real and legitimate, since hallucinated or typosquatted packages are an attack vector. Fifth, HTTPS on and security headers set, which the platforms largely handle for you. You can even enlist the model as a reviewer, asking it to audit the code against this list, while remembering that you are ultimately responsible for the verdict. This checklist is the difference between shipping fast and shipping recklessly.',
              },
            ],
            sources: [
              { label: 'Vercel documentation', url: 'https://vercel.com/docs' },
              { label: 'Railway documentation', url: 'https://docs.railway.com/' },
              { label: 'Fly.io documentation', url: 'https://fly.io/docs/' },
            ],
            furtherReading: [
              { title: 'Vercel documentation', author: 'Vercel', publication: 'vercel.com', url: 'https://vercel.com/docs', description: 'Git-connected deploys, environment variables, and preview deployments.' },
              { title: 'OWASP Top 10', author: 'OWASP Foundation', publication: 'owasp.org', url: 'https://owasp.org/www-project-top-ten/', description: 'The risk list to check your AI-built app against before production.' },
              { title: 'The Twelve-Factor App', author: 'Adam Wiggins et al.', publication: '12factor.net', url: 'https://12factor.net/', description: 'Config-in-environment and other principles that make deploys clean and safe.' },
            ],
          },
          matchingPairs: [
            { term: 'Deployment', definition: 'The step that turns a local draft into a usable product' },
            { term: 'Vercel', definition: 'The smooth deploy path for Next.js and frontends' },
            { term: 'Railway / Fly.io', definition: 'Platforms for backends, full-stack apps, and longer-running services' },
            { term: 'CI/CD', definition: 'Push to main, build, and auto-deploy, gated by passing checks' },
            { term: 'Secrets in env vars', definition: 'Keys and credentials kept out of the repo, in environment variables' },
            { term: 'Security checklist', definition: 'Pre-production pass: no leaked secrets, server validation, auth, real deps, HTTPS' },
          ],
          scenarioQuiz: [
            {
              id: 'vc_m4_l4_s1',
              question: 'Before exposing your AI-built app to real users, which step is essential and easy to overlook?',
              options: [
                'Adding more animations',
                'A security pass: no secrets in code, server-side validation, enforced auth, verified dependencies, and HTTPS',
                'Renaming the project',
                'Removing the tests',
              ],
              correct: 1,
              explanation: 'Models optimize for code that works, not code that is safe. A concrete pre-production security checklist catches the vulnerabilities plausible output can hide.',
            },
            {
              id: 'vc_m4_l4_s2',
              question: 'What does adding a build-and-test gate to continuous deployment accomplish?',
              options: [
                'It slows deploys for no reason',
                'It blocks a broken commit from reaching production, so only passing builds go live',
                'It removes the need for version control',
                'It disables automatic deploys',
              ],
              correct: 1,
              explanation: 'Gates ensure the build succeeds and tests pass before a deploy goes live, which is how CI/CD keeps broken commits away from real users.',
            },
            {
              id: 'vc_m4_l4_s3',
              question: 'You notice the app reads an API key directly written in a committed source file. What should you do?',
              options: [
                'Leave it; it is convenient',
                'Move it into an environment variable and keep it out of the repository, since secrets must never be committed',
                'Email the key to yourself',
                'Make the repo public so others can use the key',
              ],
              correct: 1,
              explanation: 'Secrets belong in environment variables, never committed. Hardcoded keys in the repo are a common and serious AI-assisted mistake.',
            },
          ],
        },
        {
          id: 'vibecoding_m4_l5',
          title: 'Vibe Coding a Web3 App',
          xp: 20,
          slides: [
            { type: 'intro', title: 'This Course Meets MAIDEN', body: 'Now combine vibe coding with what you learned in MAIDEN\'s Web3 tracks. AI assistance makes building a dApp dramatically more approachable: wallet connection, on-chain reads, and contract interaction, described in English.' },
            { type: 'text', title: 'Connect A Wallet', body: 'Wallet connection is a well-trodden pattern. Ask the model to add a connect button using a standard library (like wagmi or RainbowKit with viem), and it scaffolds the provider, the hook, and the UI you need.' },
            { type: 'text', title: 'Read On-Chain Data', body: 'On-chain reads are free and safe to experiment with: balances, token info, NFT ownership, contract state. The model knows the common libraries and ABIs, so "show this wallet\'s ETH balance and USDC balance" is a quick win.' },
            { type: 'highlight', title: 'Transactions Demand Extra Care', body: 'Reads are forgiving; writes move real value. Anything that sends a transaction, transfers, swaps, contract writes, needs careful review, testing on a testnet first, and clear user confirmation. Apply the backend and security lessons doubly here.' },
            { type: 'summary', title: 'Lesson Complete! +20 XP', body: 'Vibe coding makes Web3 building approachable: scaffold wallet connection with standard libraries, read on-chain data freely as a safe first win, and interact with contracts. Because writes move real value, treat transactions with extra rigor, test on testnets, and apply the security discipline from this module.' },
          ],
          summary:
            'This capstone combines vibe coding with MAIDEN\'s Web3 tracks. AI makes dApp building far more approachable: scaffold wallet connection with standard libraries (wagmi, RainbowKit, viem), and read on-chain data (balances, token info, NFT ownership) freely, since reads are free and safe to experiment with. The crucial distinction is reads versus writes: anything that sends a transaction moves real value, so test on testnets first, require clear user confirmation, and apply the security discipline from this module with extra rigor.',
          sources: [
            { label: 'wagmi documentation', url: 'https://wagmi.sh/' },
            { label: 'viem documentation', url: 'https://viem.sh/' },
            { label: 'Ethereum: developer docs', url: 'https://ethereum.org/en/developers/docs/' },
          ],
          deepDive: {
            readingTime: '8 min',
            sections: [
              {
                heading: 'Why AI Lowers The Web3 Barrier',
                body:
                  'Web3 development has a reputation for a steep learning curve: new mental models, unfamiliar libraries, and the intimidating fact that mistakes can move real money. Vibe coding softens much of that. The common patterns, connecting a wallet, reading a balance, calling a contract method, are well represented in the libraries and documentation the models have learned from, so AI can scaffold the parts that used to require deep specialist knowledge.\n\nThis pairs naturally with what you learned in MAIDEN\'s Web3 tracks. Those tracks gave you the conceptual foundation: what a wallet is, how transactions and gas work, what smart contracts do, why bridges and tokens behave as they do. Vibe coding gives you the means to build on that understanding quickly. The concepts tell you what you are doing and why it is safe or risky; the AI handles much of the how. Together they let a relative newcomer build a working decentralized app in a way that would have taken far longer to learn from scratch.',
              },
              {
                heading: 'Wallet Connection',
                body:
                  'Almost every dApp starts the same way: let the user connect a wallet so the app can see their address and, later, request transactions. This is a thoroughly standardized pattern, which makes it ideal for AI assistance. Ask the model to add wallet connection using a mainstream stack, for example wagmi with viem, often paired with RainbowKit for a polished connect-button UI, and it will scaffold the provider setup, the connection hook, and the button.\n\nBecause this is so common, the output is usually reliable, and you can verify it immediately by clicking connect and seeing your address appear. As with any generation, supply context: name the library you want, the chains you intend to support, and how it should fit your existing app. The result is that the boilerplate which once gated newcomers becomes a few minutes of work, freeing you to focus on what your app actually does with the connection.',
              },
              {
                heading: 'Reading On-Chain Data',
                body:
                  'On-chain reads are the best possible playground for a Web3 beginner using AI, because they are free and safe. Reading data from the blockchain, an account balance, a token\'s symbol and supply, who owns an NFT, the current state of a contract, costs no gas and cannot damage anything. You can experiment freely, get it wrong, and try again with zero risk.\n\nThe model knows the common libraries and the standard contract interfaces, the ABIs for ERC-20 tokens and ERC-721 NFTs, so requests like "show this wallet\'s ETH balance and its USDC balance" or "display the name and total supply of this token contract" turn into working code quickly. This is where you should spend your early Web3 vibe coding time: building read-only features connects the concepts from MAIDEN to real, visible results on a real network, and it builds your intuition for how on-chain data flows before you ever touch anything that costs money or moves value.',
              },
              {
                heading: 'Transactions: Handle With Care',
                body:
                  'The line between reading and writing is the most important boundary in Web3 development. Reads are forgiving. Writes, anything that sends a transaction, transferring tokens, swapping, minting, or calling a state-changing contract method, move real value and are irreversible once confirmed. This is exactly where the backend and security discipline from this module must be applied with extra rigor.\n\nSeveral habits are essential. Test on a testnet first, where tokens have no real value, before ever touching mainnet. Make sure the user sees and explicitly confirms what they are signing, since their wallet is authorizing real movement of funds. Review transaction-building code carefully, because a mistake in an amount, an address, or an approval can be costly and unrecoverable. And be especially wary of anything that requests broad token approvals, a common vector for losing funds. The model can write transaction code, but here you are firmly the pilot: the stakes are real money, so verification, testnet rehearsal, and clear user consent are not optional. Used with that care, vibe coding plus your MAIDEN foundation lets you build genuine on-chain applications responsibly.',
              },
            ],
            sources: [
              { label: 'wagmi documentation', url: 'https://wagmi.sh/' },
              { label: 'viem documentation', url: 'https://viem.sh/' },
              { label: 'Ethereum: developer docs', url: 'https://ethereum.org/en/developers/docs/' },
            ],
            furtherReading: [
              { title: 'wagmi documentation', author: 'wevm', publication: 'wagmi.sh', url: 'https://wagmi.sh/', description: 'React hooks for wallet connection and contract interaction that models handle well.' },
              { title: 'viem documentation', author: 'wevm', publication: 'viem.sh', url: 'https://viem.sh/', description: 'A modern TypeScript library for reading and writing to Ethereum.' },
              { title: 'Ethereum developer docs', author: 'ethereum.org', publication: 'ethereum.org', url: 'https://ethereum.org/en/developers/docs/', description: 'The conceptual reference connecting MAIDEN theory to dApp practice.' },
            ],
          },
          matchingPairs: [
            { term: 'dApp', definition: 'A decentralized app that connects to wallets and interacts with on-chain contracts' },
            { term: 'Wallet connection', definition: 'A standardized pattern (wagmi, RainbowKit, viem) the model scaffolds reliably' },
            { term: 'On-chain read', definition: 'Free, safe data fetch (balances, token info, ownership) ideal for experimenting' },
            { term: 'Transaction (write)', definition: 'A state-changing action that moves real value and is irreversible' },
            { term: 'Testnet first', definition: 'Rehearsing writes where tokens have no real value before mainnet' },
            { term: 'Token approval risk', definition: 'Broad approvals are a common vector for losing funds; review carefully' },
          ],
          scenarioQuiz: [
            {
              id: 'vc_m4_l5_s1',
              question: 'You are new to Web3 and want a safe first feature to build with AI. Which is best?',
              options: [
                'A mainnet function that transfers your real tokens',
                'A read-only feature showing a wallet\'s ETH and USDC balances, since reads are free and cannot damage anything',
                'An unlimited token approval to a new contract',
                'A function that drains a wallet',
              ],
              correct: 1,
              explanation: 'On-chain reads cost no gas and carry no risk, making them the ideal playground to connect MAIDEN concepts to real, visible results.',
            },
            {
              id: 'vc_m4_l5_s2',
              question: 'Why do transactions (writes) demand far more care than reads in a vibe coded dApp?',
              options: [
                'Writes are slower to type',
                'Writes move real value and are irreversible once confirmed, so mistakes can permanently lose funds',
                'Reads are actually more dangerous',
                'There is no difference',
              ],
              correct: 1,
              explanation: 'Reads are forgiving; writes send real, irreversible transactions. That is why testnet rehearsal, careful review, and explicit user confirmation are essential.',
            },
            {
              id: 'vc_m4_l5_s3',
              question: 'Before deploying a feature that sends mainnet transactions, what is the responsible practice?',
              options: [
                'Test on a testnet first, review the transaction-building code, and ensure the user explicitly confirms what they sign',
                'Ship straight to mainnet to save time',
                'Hide the transaction details from the user',
                'Request the broadest possible token approvals by default',
              ],
              correct: 0,
              explanation: 'Testnet rehearsal, careful review of amounts and addresses, and clear user consent protect real funds. Here you are firmly the pilot.',
            },
          ],
        },
      ],
      quiz: [
        { id: 'vibecoding_m4_q1', question: 'What is the healthiest workflow for building a real app with AI?', options: ['Generate the whole app in one prompt and deploy untested', 'Pick a small scoped idea on a boring popular stack, build in slices with run-and-commit after each, then deploy', 'Choose the most exotic new framework available', 'Never use version control'], correct: 1, explanation: 'Small scope, a stack the models know, and a slice-run-commit rhythm keep you near a working state and reliably reach a deployed result.' },
        { id: 'vibecoding_m4_q2', question: 'Why is the backend the harder half of vibe coding?', options: ['Backends cannot be generated by AI', 'The logic is invisible and the data is precious, so mistakes are silent and costly, demanding more verification, especially for logic, migrations, and security', 'Frontends are always harder', 'Backends never have security concerns'], correct: 1, explanation: 'Unlike visible frontend bugs, backend errors can silently corrupt data or leak information, so review and testing matter most for logic, migrations, and security.' },
        { id: 'vibecoding_m4_q3', question: 'In a vibe coded Web3 app, what is the key safety distinction?', options: ['There is no distinction', 'Reads are free and safe to experiment with, while writes (transactions) move real value irreversibly and need testnet testing, review, and user confirmation', 'Writes are safer than reads', 'Everything should go straight to mainnet'], correct: 1, explanation: 'On-chain reads are risk-free, but transactions move real funds and cannot be undone, so they require the most rigor: testnets, review, and explicit consent.' },
      ],
    },
    {
      id: 'vibecoding_m5',
      level: 'expert',
      title: 'The Bigger Picture',
      emoji: '🔭',
      description: 'Is this the end of software engineering, the economics of vibe coding, AI safety in code, the future of the IDE, and learning to build in the AI age.',
      color: '#7C3AED',
      lessons: [
        {
          id: 'vibecoding_m5_l1',
          title: 'Is This the End of Software Engineering?',
          xp: 20,
          slides: [
            { type: 'intro', title: 'The Question Everyone Asks', body: 'If AI writes the code, are software engineers obsolete? The honest answer is no, but the job is changing fast. Some tasks are being automated; new ones are being created. The skill stack is shifting, not disappearing.' },
            { type: 'text', title: 'What Gets Disrupted', body: 'The parts most exposed are the mechanical ones: boilerplate, simple CRUD, routine glue code, and the rote work that filled a lot of junior tasks. If your value was typing known patterns, that value is under pressure.' },
            { type: 'text', title: 'What Gets Created', body: 'New roles appear around directing AI well: specifying systems, reviewing and integrating AI output, designing architecture, owning security and reliability, and building the AI tooling itself. Demand shifts up the stack toward judgment.' },
            { type: 'highlight', title: 'The New Skill Stack', body: 'The durable skills are the ones AI does not supply: systems thinking, architecture, debugging hard problems, security judgment, product sense, and the taste to tell good from merely-working. Plus the new craft of directing AI.' },
            { type: 'summary', title: 'Lesson Complete! +20 XP', body: 'Software engineering is not ending, it is moving up a level. Mechanical, boilerplate work is disrupted; roles around specifying, reviewing, architecting, and securing systems grow. The new skill stack favors systems thinking, judgment, taste, and the craft of directing AI over rote syntax.' },
          ],
          summary:
            'The headline fear is that AI ends software engineering. The grounded answer: no, but it relocates the work. The mechanical layer (boilerplate, routine CRUD, glue code, much rote junior work) is genuinely disrupted, while roles around specifying, reviewing, integrating, architecting, and securing systems grow. The durable skill stack is the part AI does not supply: systems thinking, architecture, hard debugging, security judgment, product sense, taste, plus the new craft of directing AI well.',
          sources: [
            { label: 'Matt Welsh: The End of Programming (CACM)', url: 'https://cacm.acm.org/magazines/2023/1/267976-the-end-of-programming/' },
            { label: 'Andrej Karpathy: Software Is Changing (Again)', url: 'https://www.youtube.com/watch?v=LCEmiRjPEtQ' },
            { label: 'Simon Willison: AI-assisted programming notes', url: 'https://simonwillison.net/tags/ai-assisted-programming/' },
          ],
          deepDive: {
            readingTime: '8 min',
            sections: [
              {
                heading: 'Why The Doomsaying Misses',
                body:
                  'The claim that AI ends software engineering rests on a narrow view of the job: that engineering is mostly typing code. It is not. Writing code was always the visible tip of a larger activity that includes figuring out what to build, deciding how the pieces fit, anticipating failure, ensuring security, and maintaining the result over years. AI is very good at the typing and much weaker at the rest.\n\nHistory rhymes here. Higher-level languages, compilers, frameworks, and open-source libraries each automated huge swaths of what programmers used to do by hand, and each time the demand for software grew faster than the automation reduced the work, so more people built more things. AI looks like another, larger step on that same staircase: it raises the level of abstraction at which people work, which tends to expand what is possible and who can participate, rather than simply deleting the profession.',
              },
              {
                heading: 'What Is Genuinely Disrupted',
                body:
                  'Honesty requires admitting real disruption, not just reassurance. The tasks most exposed are the mechanical ones. Boilerplate that follows a known template, simple CRUD endpoints, routine glue between systems, straightforward UI from a clear spec, the rote work that AI now produces in seconds. A lot of traditional entry-level work consisted of exactly these tasks, which raises a genuine concern about how juniors gain experience when the bottom rungs are automated.\n\nThe uncomfortable implication is that if your value was primarily the ability to type out known patterns, that value is under real pressure. This does not mean those skills are worthless, you still must understand what the AI produces, but it means the market reward is moving away from production and toward direction, review, and judgment. Pretending otherwise does not help anyone prepare.',
              },
              {
                heading: 'What Is Being Created',
                body:
                  'Disruption and creation happen together. As production gets cheaper, new value concentrates in the activities around it. Someone must specify systems precisely enough for AI to build them well. Someone must review and integrate AI output, catching the subtle bugs and security flaws. Someone must own architecture, the decisions about how a system is structured that AI cannot make for you because they depend on context, tradeoffs, and intent. Someone must guarantee reliability and security as more code is generated faster. And an entire new layer of work exists in building the AI tooling, agents, and infrastructure themselves.\n\nThere is also a quieter expansion: as building gets cheaper, more software that was never worth a team\'s time becomes worth one person\'s afternoon. That widens the universe of who builds and what gets built, creating opportunities, especially for small teams and individuals, that did not exist when every app required scarce, expensive engineering hours.',
              },
              {
                heading: 'The New Skill Stack',
                body:
                  'If syntax recall is depreciating, what appreciates? The durable skills are precisely the ones AI does not supply. Systems thinking, the ability to reason about how parts interact and where complexity hides, becomes more valuable as you direct rather than type. Architecture and design judgment matter more because they are the decisions you cannot delegate. The ability to debug genuinely hard problems remains a human strength. Security judgment grows in importance as generation accelerates. Product sense, knowing what is worth building, separates useful output from busywork. And taste, the capacity to tell excellent from merely-functional, is what lets you steer AI toward quality.\n\nOn top of these sits a new craft: directing AI well, the specification, prompting, reviewing, and orchestration skills this whole track has been teaching. The engineer of the near future is less a typist and more a director who combines timeless judgment with fluency in working alongside capable models. That is not the end of software engineering. It is its next, more leveraged form.',
              },
            ],
            sources: [
              { label: 'Matt Welsh: The End of Programming (CACM)', url: 'https://cacm.acm.org/magazines/2023/1/267976-the-end-of-programming/' },
              { label: 'Andrej Karpathy: Software Is Changing (Again)', url: 'https://www.youtube.com/watch?v=LCEmiRjPEtQ' },
              { label: 'Simon Willison: AI-assisted programming notes', url: 'https://simonwillison.net/tags/ai-assisted-programming/' },
            ],
            furtherReading: [
              { title: 'The End of Programming', author: 'Matt Welsh', publication: 'Communications of the ACM · 2023', url: 'https://cacm.acm.org/magazines/2023/1/267976-the-end-of-programming/', description: 'The provocative argument that hand-writing code is fading, worth engaging critically.' },
              { title: 'Software Is Changing (Again)', author: 'Andrej Karpathy', publication: 'YouTube · 2025', url: 'https://www.youtube.com/watch?v=LCEmiRjPEtQ', description: 'A measured view of how the role shifts rather than vanishes.' },
              { title: 'AI-assisted programming', author: 'Simon Willison', publication: 'simonwillison.net', url: 'https://simonwillison.net/tags/ai-assisted-programming/', description: 'Grounded, practitioner takes on what is changing and what is not.' },
            ],
          },
          matchingPairs: [
            { term: 'The disruption', definition: 'Mechanical work: boilerplate, simple CRUD, glue code, rote junior tasks' },
            { term: 'The creation', definition: 'Roles in specifying, reviewing, architecting, securing, and building AI tooling' },
            { term: 'Abstraction staircase', definition: 'Like compilers and frameworks, AI raises the level people work at' },
            { term: 'New skill stack', definition: 'Systems thinking, architecture, security judgment, product sense, taste' },
            { term: 'Directing AI', definition: 'The new craft of specifying, prompting, reviewing, and orchestrating' },
            { term: 'Junior pipeline concern', definition: 'How newcomers gain experience when the bottom rungs are automated' },
          ],
          scenarioQuiz: [
            {
              id: 'vc_m5_l1_s1',
              question: 'Which framing of AI and software engineering is most grounded?',
              options: [
                'Engineering is over; learn a different field',
                'Engineering is moving up a level: mechanical work is disrupted while specifying, reviewing, architecting, and securing grow in value',
                'Nothing is changing at all',
                'Only typing speed matters now',
              ],
              correct: 1,
              explanation: 'Writing code was always the tip of the job. AI automates much of the typing and raises the abstraction level, relocating value toward judgment rather than ending the profession.',
            },
            {
              id: 'vc_m5_l1_s2',
              question: 'Which skill is appreciating rather than depreciating in the AI age?',
              options: [
                'Memorizing exact API signatures',
                'Systems thinking and architecture judgment, which AI does not supply',
                'Typing boilerplate quickly by hand',
                'Avoiding all new tools',
              ],
              correct: 1,
              explanation: 'As you direct rather than type, the durable value is the judgment AI cannot provide: systems thinking, architecture, security, product sense, and taste.',
            },
            {
              id: 'vc_m5_l1_s3',
              question: 'Why is comparing AI to compilers and frameworks useful?',
              options: [
                'It proves AI will do nothing',
                'Each earlier abstraction automated huge amounts of manual work yet expanded software and who builds it, suggesting AI raises the level rather than deleting the field',
                'It shows software demand always shrinks',
                'It means no skills ever change',
              ],
              correct: 1,
              explanation: 'Past abstractions grew the field by raising the level of work and widening participation. AI looks like a larger step on that same staircase.',
            },
          ],
        },
        {
          id: 'vibecoding_m5_l2',
          title: 'Vibe Coding Economics',
          xp: 20,
          slides: [
            { type: 'intro', title: 'Cheaper Software Changes Everything', body: 'When building software gets dramatically cheaper and faster, the economics shift: how software is priced, who can build a business, and how teams are sized. Vibe coding is an economic event, not just a technical one.' },
            { type: 'text', title: 'The Solo Founder Era', body: 'One person can now build and ship what used to need a small team. The "$0 to meaningful revenue solo founder" story is increasingly real: indie hackers launching products in days and reaching paying customers without raising money or hiring.' },
            { type: 'text', title: 'Pricing And Competition', body: 'When the cost to produce software falls, more products exist, competition rises, and differentiation moves away from "can you build it" toward distribution, taste, brand, and solving the right problem. Building is no longer the moat.' },
            { type: 'highlight', title: 'Hiring And Team Shape', body: 'Teams may stay small longer, value generalists who can direct AI across the stack, and weight product and judgment over raw headcount. The leverage of a single capable builder goes up, reshaping how companies staff.' },
            { type: 'summary', title: 'Lesson Complete! +20 XP', body: 'Cheaper, faster building reshapes software economics. Solo founders can reach real revenue without a team; more products mean competition shifts from building to distribution, taste, and problem choice; and teams stay leaner, prizing generalists who direct AI. Building stops being the moat.' },
          ],
          summary:
            'Vibe coding is an economic shift, not only a technical one. When building gets cheap and fast, the solo founder reaching real revenue without a team becomes common, more products exist so competition moves from "can you build it" to distribution, taste, brand, and problem selection, and teams stay leaner while prizing generalists who can direct AI across the stack. The strategic takeaway: building is no longer the moat, so the durable advantages live elsewhere.',
          sources: [
            { label: 'Lenny\'s Newsletter (product and founder interviews)', url: 'https://www.lennysnewsletter.com/' },
            { label: 'Y Combinator: startup library', url: 'https://www.ycombinator.com/library' },
            { label: 'Andrej Karpathy: Software Is Changing (Again)', url: 'https://www.youtube.com/watch?v=LCEmiRjPEtQ' },
          ],
          deepDive: {
            readingTime: '8 min',
            sections: [
              {
                heading: 'When Production Cost Collapses',
                body:
                  'Economics turns on cost. For decades, building software was expensive and slow: it required scarce, well-paid engineers and months of work, which meant only ideas with enough expected value to justify that investment got built. Vibe coding attacks that cost directly. When a working product can be built in days by one person instead of months by a team, the threshold of "worth building" drops dramatically.\n\nThe consequences ripple outward. Far more software becomes economically viable, including niche tools and small products that never justified a team. The bottleneck shifts from the ability to build to the ability to decide what is worth building and to reach the people who want it. Whenever the cost of producing something collapses, the same pattern recurs: abundance on the production side, and a premium on everything that was not automated, taste, distribution, and judgment about what matters.',
              },
              {
                heading: 'The Solo Founder Era',
                body:
                  'The most visible economic story is the empowered individual. A single capable person can now design, build, deploy, and operate a real product, handling the frontend, backend, and infrastructure with AI doing much of the implementation. The archetype is the indie hacker who goes from an idea to paying customers in a short time, reaching meaningful monthly revenue without raising money or hiring anyone.\n\nThis is genuinely new in degree. Solo and tiny businesses always existed, but the range of products one person could plausibly build and maintain was narrow. Vibe coding widens it substantially, so more ambitious software is within reach of an individual. It is worth staying grounded: building the product is necessary but not sufficient, since distribution, support, and choosing a real problem still determine success. But the raw capability of one person has expanded, and that expansion is reshaping who gets to start a software business at all.',
              },
              {
                heading: 'Pricing, Competition, And Moats',
                body:
                  'If almost anyone can build a given product cheaply, then the ability to build it stops being a competitive advantage. This is the deepest economic implication: building is no longer the moat. When production is abundant, more competing products appear, and differentiation has to come from somewhere the AI does not commoditize.\n\nThat somewhere is distribution (can you reach and keep customers), taste and design (is your product genuinely better to use), brand and trust (do people choose you), and problem selection (are you solving something that truly matters to a specific audience). Pricing power follows differentiation, so in a world of cheap building, margins accrue to the products that win on these non-buildable dimensions rather than on technical existence. For a vibe coder this is a strategic reframing: getting the thing built is now the easy part, and the hard, valuable work is everything that makes a built thing succeed.',
              },
              {
                heading: 'Hiring And The Shape Of Teams',
                body:
                  'Cheaper building reshapes organizations, not just solo projects. If a small team augmented by AI can produce what once took a large one, companies may stay small longer, hire more deliberately, and weight judgment and product sense over raw headcount. The value of a generalist who can direct AI across the whole stack rises, because that single person now covers ground that used to require several specialists.\n\nThis does not mean engineers stop being hired, demand for people who can architect, review, and secure AI-assisted systems is real and growing. But the composition shifts: leverage per person increases, so teams optimize for high-judgment builders rather than large numbers of people producing code by hand. For individuals, the implication is to cultivate the directing and judgment skills that make you a force multiplier, since those are what a leaner, AI-augmented org most needs. The economy of software is being rewritten around the fact that a capable builder, equipped with AI, is dramatically more productive than before.',
              },
            ],
            sources: [
              { label: 'Lenny\'s Newsletter', url: 'https://www.lennysnewsletter.com/' },
              { label: 'Y Combinator: startup library', url: 'https://www.ycombinator.com/library' },
              { label: 'Andrej Karpathy: Software Is Changing (Again)', url: 'https://www.youtube.com/watch?v=LCEmiRjPEtQ' },
            ],
            furtherReading: [
              { title: 'Lenny\'s Newsletter', author: 'Lenny Rachitsky', publication: 'lennysnewsletter.com', url: 'https://www.lennysnewsletter.com/', description: 'Interviews with product leaders and AI tool founders on how building and teams are changing.' },
              { title: 'Y Combinator startup library', author: 'Y Combinator', publication: 'ycombinator.com', url: 'https://www.ycombinator.com/library', description: 'Foundational essays on distribution, problem choice, and why building is not the moat.' },
              { title: 'Software Is Changing (Again)', author: 'Andrej Karpathy', publication: 'YouTube · 2025', url: 'https://www.youtube.com/watch?v=LCEmiRjPEtQ', description: 'The framing of cheaper software and what it means for who builds.' },
            ],
          },
          matchingPairs: [
            { term: 'Production cost collapse', definition: 'Building cheaply and fast lowers the threshold of what is worth building' },
            { term: 'Solo founder era', definition: 'One person reaching real revenue without a team or funding' },
            { term: 'Building is not the moat', definition: 'When anyone can build it, advantage moves elsewhere' },
            { term: 'Real differentiation', definition: 'Distribution, taste, brand, and choosing the right problem' },
            { term: 'Leaner teams', definition: 'Small groups of high-judgment generalists who direct AI' },
            { term: 'Leverage per person', definition: 'A capable builder with AI is dramatically more productive' },
          ],
          scenarioQuiz: [
            {
              id: 'vc_m5_l2_s1',
              question: 'In a world where almost anyone can cheaply build a given app, where does competitive advantage move?',
              options: [
                'To whoever can write the most code by hand',
                'To distribution, taste, brand, and problem selection, since building itself is no longer the moat',
                'To the largest engineering team',
                'Nowhere; building remains the only advantage',
              ],
              correct: 1,
              explanation: 'When production is abundant, the ability to build stops differentiating. Advantage accrues to the non-buildable dimensions: reaching customers, design quality, trust, and solving a real problem.',
            },
            {
              id: 'vc_m5_l2_s2',
              question: 'What is the realistic version of the "solo founder era" claim?',
              options: [
                'Building the product guarantees a successful business',
                'One person can now build and ship far more, but distribution, support, and problem choice still determine success',
                'Founders no longer need customers',
                'Teams are now illegal',
              ],
              correct: 1,
              explanation: 'The individual\'s building capability has expanded dramatically, which is real and new, but building is necessary not sufficient; the rest of business still matters.',
            },
            {
              id: 'vc_m5_l2_s3',
              question: 'How does cheaper building tend to reshape team hiring?',
              options: [
                'Companies hire as many hand-coders as possible',
                'Teams stay leaner and weight high-judgment generalists who can direct AI across the stack over raw headcount',
                'Engineering hiring stops entirely',
                'Only typing speed is valued',
              ],
              correct: 1,
              explanation: 'Higher leverage per person favors smaller teams of high-judgment builders. Demand for architecture, review, and security skills grows even as headcount-for-code shrinks.',
            },
          ],
        },
        {
          id: 'vibecoding_m5_l3',
          title: 'AI Safety in Code',
          xp: 20,
          slides: [
            { type: 'intro', title: 'Fast Code Can Be Unsafe Code', body: 'Generating code quickly means generating vulnerabilities quickly if you are not careful. AI optimizes for code that works, not code that is secure. Reviewing AI output for safety is now a core skill, not an afterthought.' },
            { type: 'text', title: 'Hallucinated Dependencies', body: 'Models invent package names that do not exist. Attackers noticed and began publishing malicious packages under commonly hallucinated names, sometimes called slopsquatting. An unverified import can pull in hostile code. Always confirm a package is real and legitimate.' },
            { type: 'text', title: 'Injection And Insecure Defaults', body: 'AI code can produce SQL injection from unsanitized input, missing authorization checks, secrets left in code, and weak defaults. The output looks fine and is quietly exploitable. Validate input, parameterize queries, and never trust the client.' },
            { type: 'highlight', title: 'Tools That Help', body: 'You do not review by eye alone. Static analysis and security scanners like Semgrep and Snyk catch many issues automatically, including in AI-generated code. Add them to your workflow as a safety net, and ask the AI to audit its own code too.' },
            { type: 'summary', title: 'Lesson Complete! +20 XP', body: 'AI optimizes for working, not safe. Watch for hallucinated dependencies (a real supply-chain attack vector), SQL injection, missing auth, leaked secrets, and insecure defaults. Validate input, parameterize queries, verify packages, and add scanners like Semgrep and Snyk as a safety net.' },
          ],
          summary:
            'Generating code fast can mean generating vulnerabilities fast. AI optimizes for output that works, not output that is secure, so security review is a core skill. The big risks: hallucinated dependencies (attackers now publish malicious packages under names models commonly invent, a.k.a. slopsquatting), SQL injection from unsanitized input, missing authorization, leaked secrets, and insecure defaults, all hidden by fluent output. Defend with input validation, parameterized queries, package verification, and scanners like Semgrep and Snyk.',
          sources: [
            { label: 'OWASP Top 10', url: 'https://owasp.org/www-project-top-ten/' },
            { label: 'Semgrep (static analysis)', url: 'https://semgrep.dev/' },
            { label: 'Snyk (dependency and code security)', url: 'https://snyk.io/' },
          ],
          deepDive: {
            readingTime: '8 min',
            sections: [
              {
                heading: 'Speed Without Safety Is A Trap',
                body:
                  'Every multiplier on how fast you produce code is also a multiplier on how fast you produce vulnerabilities, unless safety keeps pace. This is the central tension of AI safety in code: the model is trained to produce output that looks right and runs, and looking right is not the same as being secure. A SQL injection, a missing permission check, or a hardcoded secret can all run perfectly while leaving the door wide open.\n\nThe danger is amplified by who is now building. Vibe coding brings in people with less security background, generating production-bound code at high speed, often without the instinct to ask "how could this be abused." Security can no longer be a specialized phase bolted on at the end; it has to be part of the loop. The good news is that a handful of concrete habits and tools catch the large majority of issues, so you do not need to be a security expert to ship responsibly, you need to know the common failure modes and check for them deliberately.',
              },
              {
                heading: 'Hallucinated Dependencies And Slopsquatting',
                body:
                  'One of the newest and most striking risks comes from hallucination. Models sometimes invent package names that sound plausible but do not exist. By itself that is a bug, your install fails. The danger is what attackers did in response: they began registering malicious packages under the names models commonly hallucinate, so that when a developer trustingly installs the suggested package, they get hostile code instead. This supply-chain attack has been nicknamed slopsquatting, a play on typosquatting.\n\nThe defense is simple discipline. Before adding any dependency the AI suggests, verify it actually exists as a known, legitimate package: check its real homepage, its download counts, its maintainers, its source. Be especially suspicious of a package you have never heard of that conveniently has exactly the name the model produced. Because a single malicious dependency can compromise your entire application and everyone who runs it, treating every AI-suggested import as unverified until you confirm it is one of the highest-value security habits in vibe coding.',
              },
              {
                heading: 'Injection, Authorization, And Insecure Defaults',
                body:
                  'Beyond dependencies, AI code reproduces the classic vulnerability families, often because the training data contained plenty of insecure examples. SQL injection appears when user input is concatenated into a query instead of being parameterized, letting an attacker run their own database commands. Broken access control appears when a route checks that you are logged in but not that you are allowed to touch this specific resource, so users can read or change data that is not theirs. Secrets get hardcoded into source and committed. Defaults come out permissive, broad CORS, verbose error messages that leak internals, missing rate limits.\n\nThe through-line is that all of these look fine in a quick read and run without complaint. The fixes are well established: validate and sanitize all input, use parameterized queries or an ORM, enforce authorization on every action at the resource level, keep secrets in environment variables, and choose strict defaults. Encoding these as standing rules and review habits, and never trusting client input, closes most of the doors that AI-generated code tends to leave open.',
              },
              {
                heading: 'Tools As A Safety Net',
                body:
                  'Human review is necessary but fallible, especially at the speed and volume vibe coding produces. The remedy is to automate a layer of security checking. Static analysis tools like Semgrep scan source code for known dangerous patterns, injection risks, insecure configurations, missing checks, and flag them before they ship. Dependency and code scanners like Snyk look for known vulnerabilities in your packages and code, including the supply-chain risks discussed above. Integrated into your workflow, ideally as an automatic step in CI, these tools catch a large share of issues without relying on you to notice everything by eye.\n\nYou can also enlist the model itself: asking an AI to review its own code specifically for security issues often surfaces real problems, since spotting a vulnerability in existing code is a different and sometimes easier task than avoiding it during generation. The mature posture combines all three layers: secure habits while prompting, your own review, and automated scanners as a backstop. Together they let you keep the speed of vibe coding without paying for it in breaches. Safety is not the enemy of velocity here; it is what makes velocity sustainable.',
              },
            ],
            sources: [
              { label: 'OWASP Top 10', url: 'https://owasp.org/www-project-top-ten/' },
              { label: 'Semgrep (static analysis)', url: 'https://semgrep.dev/' },
              { label: 'Snyk (dependency and code security)', url: 'https://snyk.io/' },
            ],
            furtherReading: [
              { title: 'OWASP Top 10', author: 'OWASP Foundation', publication: 'owasp.org', url: 'https://owasp.org/www-project-top-ten/', description: 'The canonical list of web vulnerabilities, including injection and broken access control.' },
              { title: 'AI package hallucinations as an attack vector', author: 'Security researchers', publication: 'Industry reporting · 2024', url: 'https://www.lasso.security/blog/ai-package-hallucinations', description: 'How hallucinated package names enable slopsquatting supply-chain attacks.' },
              { title: 'Semgrep', author: 'Semgrep / r2c', publication: 'semgrep.dev', url: 'https://semgrep.dev/', description: 'Open-source static analysis that catches insecure patterns in generated code.' },
            ],
          },
          matchingPairs: [
            { term: 'Works vs secure', definition: 'AI optimizes for code that runs, which is not the same as safe' },
            { term: 'Hallucinated dependency', definition: 'An invented package name that may be registered with malicious code' },
            { term: 'Slopsquatting', definition: 'Attackers publishing malware under names models commonly hallucinate' },
            { term: 'SQL injection', definition: 'Unsanitized input concatenated into a query, letting attackers run commands' },
            { term: 'Broken access control', definition: 'Checking login but not whether the user may touch this resource' },
            { term: 'Semgrep / Snyk', definition: 'Scanners that catch insecure patterns and vulnerable dependencies' },
          ],
          scenarioQuiz: [
            {
              id: 'vc_m5_l3_s1',
              question: 'The AI suggests installing a package you have never heard of that conveniently matches its description. What is the safe move?',
              options: [
                'Install it immediately to save time',
                'Verify it is a real, legitimate package (homepage, maintainers, downloads, source) before installing, because hallucinated names are a slopsquatting attack vector',
                'Install it and remove it later if there is a problem',
                'Trust it because the AI suggested it',
              ],
              correct: 1,
              explanation: 'Attackers register malware under commonly hallucinated names. A single malicious dependency can compromise the whole app, so verify every AI-suggested import.',
            },
            {
              id: 'vc_m5_l3_s2',
              question: 'AI-generated code builds a query by concatenating user input directly into the SQL string. What is the risk and the fix?',
              options: [
                'No risk; concatenation is fine',
                'SQL injection: use parameterized queries (or an ORM) and validate input so attackers cannot run their own database commands',
                'Only a performance issue',
                'Just add more comments',
              ],
              correct: 1,
              explanation: 'Concatenated input enables SQL injection. Parameterized queries and input validation are the established fix, and the code looks fine until exploited.',
            },
            {
              id: 'vc_m5_l3_s3',
              question: 'How should security checking fit into a fast vibe coding workflow?',
              options: [
                'Skip it to keep velocity',
                'Layer it: secure habits while prompting, your own review, and automated scanners (Semgrep, Snyk) in CI as a backstop',
                'Only review once a year',
                'Rely solely on the model never making mistakes',
              ],
              correct: 1,
              explanation: 'Speed multiplies vulnerabilities unless safety keeps pace. Combining secure prompting habits, human review, and automated scanners makes velocity sustainable.',
            },
          ],
        },
        {
          id: 'vibecoding_m5_l4',
          title: 'The Future of the IDE',
          xp: 20,
          slides: [
            { type: 'intro', title: 'Where Cursor And Claude Code Point', body: 'Today\'s AI editors and agents are early signals, not the destination. They hint at a development environment that understands your whole codebase, remembers context across time, and proposes changes proactively rather than waiting for prompts.' },
            { type: 'text', title: 'Reads Your Whole Codebase', body: 'The trajectory is toward tools with deep, persistent understanding of your entire project: every file, the architecture, the history, the conventions, so suggestions are grounded in your actual system rather than generic patterns.' },
            { type: 'text', title: 'Remembers And Acts', body: 'Future environments will carry memory across sessions and increasingly act on their own: noticing a bug, proposing a refactor, opening a draft change for review. Agentic behavior moves from a feature you invoke to an ambient collaborator.' },
            { type: 'highlight', title: 'You Become The Reviewer', body: 'As tools generate and propose more, your role shifts further toward review, direction, and judgment. The IDE becomes less a place you type and more a place you steer, approve, and integrate. Reading and deciding outweigh writing.' },
            { type: 'summary', title: 'Lesson Complete! +20 XP', body: 'Cursor and Claude Code point toward IDEs that deeply understand your whole codebase, remember context across time, and proactively propose refactors and fixes. As they generate and act more, your role shifts toward reviewing, directing, and integrating, with reading and judgment outweighing typing.' },
          ],
          summary:
            'Today\'s AI editors are early signals. The trajectory points to development environments that deeply understand your entire codebase, remember context across sessions, and proactively propose refactors and fixes rather than waiting to be prompted, agentic behavior shifting from a feature you invoke to an ambient collaborator. As tools generate and act more, the human role moves further toward reviewing, directing, and integrating, where reading and judgment outweigh typing. The IDE becomes a place you steer, not just type.',
          sources: [
            { label: 'Cursor', url: 'https://www.cursor.com/' },
            { label: 'Claude Code overview (Anthropic)', url: 'https://docs.anthropic.com/en/docs/claude-code/overview' },
            { label: 'Anthropic: building effective agents', url: 'https://www.anthropic.com/research/building-effective-agents' },
          ],
          deepDive: {
            readingTime: '7 min',
            sections: [
              {
                heading: 'Today\'s Tools Are A Beginning',
                body:
                  'It is easy to treat Cursor, Claude Code, and their peers as the finished form of AI development, but they are closer to the first generation of a much larger shift. Each already demonstrates a piece of the future: deep codebase awareness, agentic multi-step action, persistent project memory through rules and CLAUDE.md files. None has fully realized the whole, and the gaps between them and what is coming are the interesting part.\n\nForecasting precisely is foolish in a field moving this fast, but the direction is legible from the trajectory. Tools are steadily gaining more understanding of your code, more memory across time, and more autonomy to act. Extrapolating those vectors gives a reasonable picture of where the development environment is heading over the next few years, even if the exact products and timelines are unknowable.',
              },
              {
                heading: 'Deep Understanding And Memory',
                body:
                  'The first vector is comprehension. Current tools index your codebase and retrieve relevant pieces; the direction is toward environments with a genuinely deep, continuous model of your entire project, its files, architecture, history, dependencies, and conventions, so their suggestions are grounded in your specific system rather than generic patterns. The more completely a tool understands your code, the more its proposals feel like they came from a senior engineer who knows the project intimately.\n\nThe second vector is memory. Today persistence is shallow, a rules file here, a session there. The trajectory is toward environments that remember across time: the decisions you made and why, the patterns you prefer, the mistakes you corrected, accumulated into a durable understanding that does not reset each session. Combined, deep understanding and long memory turn the tool from a capable stranger you re-brief constantly into a collaborator that retains context the way a long-tenured teammate would.',
              },
              {
                heading: 'From Reactive To Proactive',
                body:
                  'The third and most consequential vector is autonomy. Current tools are largely reactive: they wait for you to ask, then respond. The direction is toward proactive environments that notice and propose on their own, flagging a bug they spotted, suggesting a refactor where complexity is accumulating, opening a draft change for a routine update, keeping dependencies current, all surfaced for your review rather than requiring your prompt.\n\nThis reframes the agent from a tool you invoke into an ambient collaborator working alongside you. It is the natural extension of agent modes that already plan and execute multi-step tasks. The careful version of this future keeps the human firmly in the loop: the environment proposes and acts within bounds, but you approve what matters, especially anything consequential. Done well, it feels less like commanding a tool and more like working with a tireless colleague who handles the routine and brings the important decisions to you.',
              },
              {
                heading: 'The Human As Director',
                body:
                  'Every vector points the same way for your role. As environments understand more, remember more, and act more, the balance of human work shifts decisively from writing toward reviewing, directing, and integrating. The IDE becomes less a place where you type code line by line and more a place where you set direction, evaluate proposals, approve changes, and ensure the pieces fit into a coherent, correct, secure whole.\n\nThis is the throughline of the entire track arriving at its conclusion. The skills that matter, specifying intent, judging quality, owning architecture and security, exercising taste, are exactly the ones a more capable IDE makes more central, not less. Reading and deciding come to outweigh writing. Preparing for this future is not about predicting which product wins; it is about becoming the kind of builder who can direct increasingly powerful tools with judgment. The development environment of the next few years will amplify whoever sits in front of it, and the value you add is the judgment it cannot supply.',
              },
            ],
            sources: [
              { label: 'Cursor', url: 'https://www.cursor.com/' },
              { label: 'Claude Code overview (Anthropic)', url: 'https://docs.anthropic.com/en/docs/claude-code/overview' },
              { label: 'Anthropic: building effective agents', url: 'https://www.anthropic.com/research/building-effective-agents' },
            ],
            furtherReading: [
              { title: 'Building effective agents', author: 'Anthropic', publication: 'anthropic.com · 2024', url: 'https://www.anthropic.com/research/building-effective-agents', description: 'The agent patterns that future proactive IDEs build on.' },
              { title: 'Software Is Changing (Again)', author: 'Andrej Karpathy', publication: 'YouTube · 2025', url: 'https://www.youtube.com/watch?v=LCEmiRjPEtQ', description: 'A vision of building for agents and the human-as-verifier role.' },
              { title: 'Cursor', author: 'Anysphere', publication: 'cursor.com', url: 'https://www.cursor.com/', description: 'An early example of the codebase-aware, agentic editor direction.' },
            ],
          },
          matchingPairs: [
            { term: 'Deep understanding', definition: 'A continuous model of your whole project, not generic patterns' },
            { term: 'Persistent memory', definition: 'Retaining decisions and preferences across sessions, not resetting' },
            { term: 'Proactive agent', definition: 'Noticing bugs and proposing refactors without being prompted' },
            { term: 'Ambient collaborator', definition: 'An agent working alongside you rather than only when invoked' },
            { term: 'Human in the loop', definition: 'The environment proposes and acts within bounds; you approve what matters' },
            { term: 'Human as director', definition: 'Reviewing, steering, and integrating outweigh writing code' },
          ],
          scenarioQuiz: [
            {
              id: 'vc_m5_l4_s1',
              question: 'Cursor and Claude Code are best understood as what?',
              options: [
                'The finished, final form of AI development tools',
                'Early signals of a trajectory toward deeper codebase understanding, persistent memory, and proactive agentic behavior',
                'A passing fad with no future',
                'Tools that remove the human entirely',
              ],
              correct: 1,
              explanation: 'They each show a piece of the future. Extrapolating their vectors, more understanding, memory, and autonomy, sketches where development environments are heading.',
            },
            {
              id: 'vc_m5_l4_s2',
              question: 'As IDEs become more proactive (proposing refactors and fixes on their own), what is the responsible design principle?',
              options: [
                'Let the tool act with no human oversight',
                'Keep the human in the loop: the environment proposes and acts within bounds, but you approve consequential changes',
                'Disable all automation',
                'Remove the review step to move faster',
              ],
              correct: 1,
              explanation: 'A careful proactive future surfaces proposals for review and keeps you approving what matters, especially anything consequential, rather than acting unchecked.',
            },
            {
              id: 'vc_m5_l4_s3',
              question: 'How does the human role evolve as these tools advance?',
              options: [
                'Toward typing even more code by hand',
                'Toward reviewing, directing, and integrating, where reading and judgment outweigh writing',
                'Toward doing nothing at all',
                'Toward memorizing more syntax',
              ],
              correct: 1,
              explanation: 'Every vector, more understanding, memory, and autonomy, shifts human work from writing toward setting direction, evaluating proposals, and ensuring coherence.',
            },
          ],
        },
        {
          id: 'vibecoding_m5_l5',
          title: 'Learning to Build in the AI Age',
          xp: 20,
          slides: [
            { type: 'intro', title: 'What To Learn When AI Can Code', body: 'If AI can write code, what should a beginner learn? Not nothing, and not the old curriculum unchanged. The answer is a new mix that emphasizes the durable human skills and the craft of working with AI.' },
            { type: 'text', title: 'Systems Thinking', body: 'Learn how software systems fit together: data flow, state, components, boundaries, tradeoffs. Understanding structure lets you direct AI, judge its output, and reason about problems it cannot solve for you.' },
            { type: 'text', title: 'Product Sense And Taste', body: 'Learn to tell what is worth building and what good looks like. When building is cheap, judgment about value and quality becomes the scarce, decisive skill. Taste is what separates useful from merely functional.' },
            { type: 'highlight', title: 'Prompt Craft And Fundamentals Together', body: 'Learn the new craft of directing AI, and enough fundamentals to supervise it. You still need core concepts (how the web works, data, security) so you can recognize good output and catch failures. Both, not either.' },
            { type: 'summary', title: 'Lesson Complete! +20 XP', body: 'In the AI age, learn the durable skills AI does not supply, systems thinking, product sense, and taste, alongside the new craft of prompt and direction, plus enough fundamentals to supervise the AI. The goal is to become a builder who directs powerful tools with judgment. You have everything to start.' },
          ],
          summary:
            'The closing question: what should a beginner learn when AI can code? Not nothing, and not the unchanged old curriculum. Emphasize the durable human skills AI does not supply, systems thinking, product sense, and taste, together with the new craft of prompting and directing AI, and enough fundamentals (how the web works, data, security) to supervise the output and catch failures. The aim is to become a builder who directs powerful tools with judgment, which is exactly what this track has been preparing you to do.',
          sources: [
            { label: 'Andrej Karpathy: Software Is Changing (Again)', url: 'https://www.youtube.com/watch?v=LCEmiRjPEtQ' },
            { label: 'fast.ai: Practical Deep Learning for Coders', url: 'https://course.fast.ai/' },
            { label: 'Simon Willison: AI-assisted programming notes', url: 'https://simonwillison.net/tags/ai-assisted-programming/' },
          ],
          deepDive: {
            readingTime: '8 min',
            sections: [
              {
                heading: 'The Curriculum Question',
                body:
                  'A natural fear grips beginners: if AI can write code, is learning to build pointless? The fear is misplaced, but so is the opposite reflex of pretending nothing has changed and grinding through the old curriculum unaltered. The truth is that what to learn has shifted, and learning the right mix now is more valuable than ever, because the people who can direct these tools well are exactly the ones the new landscape rewards.\n\nThe reframing is to stop thinking of learning to build as learning to type syntax, and start thinking of it as learning to turn ideas into working, valuable software, with AI as a powerful collaborator. Under that definition, the curriculum is not shrinking, it is changing shape: less emphasis on memorizing language details the AI recalls instantly, more emphasis on the judgment, structure, and craft that determine whether what gets built is any good. This whole track has been an example of that curriculum in action.',
              },
              {
                heading: 'The Durable Human Skills',
                body:
                  'At the center are the skills AI does not supply, the ones that appreciate as production gets automated. Systems thinking comes first: understanding how the parts of a software system relate, how data flows, where state lives, what the boundaries and tradeoffs are. This is what lets you specify what to build, judge whether the AI built it well, and reason through problems the model cannot solve for you. It is learnable, and vibe coding itself is a fast way to build it, since you can ask the model to explain its structural choices as you go.\n\nAlongside it sit product sense and taste. Product sense is judgment about what is worth building, which problems matter and which features earn their place. Taste is the ability to recognize quality, to tell excellent software from the merely functional. When building is cheap and everyone can produce working code, these become the decisive, scarce skills, because they determine whether your cheap-to-build output is actually worth anything. They are cultivated by paying attention: using great products, studying why they work, and forming opinions about quality rather than accepting whatever runs.',
              },
              {
                heading: 'Fundamentals You Still Need',
                body:
                  'It would be a mistake to read all this as permission to skip fundamentals. You still need a working understanding of core concepts, not to type them from memory, but to supervise the AI that does. How the web works, request and response, client and server. How data is modeled and stored. The basics of security, the failure modes from the last lesson. Enough of each domain to recognize good output and catch the model when it is wrong.\n\nThe difference from the old path is depth and order. You do not need to master every detail before you build, the way traditional curricula often demanded; you can learn fundamentals in context, pulling in the concept you need when you hit it, with the AI as a tutor that explains as you go. But you cannot skip them entirely, because without them you are a passenger who cannot tell when the autopilot is flying you into a mountain. The target is enough fundamentals to be the pilot: to set the destination, read the instruments, and take over when needed.',
              },
              {
                heading: 'Becoming A Builder Who Directs',
                body:
                  'Tie it together and a clear picture of the AI-age builder emerges. They combine durable judgment, systems thinking, product sense, taste, with the new craft of directing AI, the specifying, prompting, reviewing, and orchestrating this track has taught, resting on enough fundamentals to supervise the work. They learn fundamentals in context rather than in isolation, they treat the model as both collaborator and tutor, and they keep their hands near the controls on anything that matters.\n\nThis is an optimistic place to end. The barrier to turning ideas into software has never been lower, which means more people can build, and the people who build best are those who pair timeless judgment with fluency in these new tools. You do not need permission or a long credential to start; you need a small real idea and the willingness to run the loop. Everything in this track, from the Karpathy moment to security to this curriculum, was aimed at making you that kind of builder. The age of vibe coding rewards taste, judgment, and the courage to ship. Go build something.',
              },
            ],
            sources: [
              { label: 'Andrej Karpathy: Software Is Changing (Again)', url: 'https://www.youtube.com/watch?v=LCEmiRjPEtQ' },
              { label: 'fast.ai: Practical Deep Learning for Coders', url: 'https://course.fast.ai/' },
              { label: 'Simon Willison: AI-assisted programming notes', url: 'https://simonwillison.net/tags/ai-assisted-programming/' },
            ],
            furtherReading: [
              { title: 'Practical Deep Learning for Coders', author: 'Jeremy Howard, fast.ai', publication: 'course.fast.ai', url: 'https://course.fast.ai/', description: 'A top-down course embodying the learn-in-context philosophy for the AI age.' },
              { title: 'The Hugging Face NLP Course', author: 'Hugging Face', publication: 'huggingface.co', url: 'https://huggingface.co/learn/nlp-course', description: 'A free path into the models underneath the tools, for those who want depth.' },
              { title: 'Software Is Changing (Again)', author: 'Andrej Karpathy', publication: 'YouTube · 2025', url: 'https://www.youtube.com/watch?v=LCEmiRjPEtQ', description: 'A fitting close: how to think about building and learning as software changes.' },
            ],
          },
          matchingPairs: [
            { term: 'Systems thinking', definition: 'Understanding how parts relate, data flows, and tradeoffs are made' },
            { term: 'Product sense', definition: 'Judgment about what is worth building and which features matter' },
            { term: 'Taste', definition: 'Recognizing excellent software versus the merely functional' },
            { term: 'Fundamentals to supervise', definition: 'Enough core concepts to recognize good output and catch failures' },
            { term: 'Learn in context', definition: 'Pulling in concepts as you hit them, with AI as a tutor' },
            { term: 'Builder who directs', definition: 'Pairing durable judgment with the craft of working with AI' },
          ],
          scenarioQuiz: [
            {
              id: 'vc_m5_l5_s1',
              question: 'A beginner asks what to learn now that AI can write code. What is the best guidance?',
              options: [
                'Learn nothing; AI does it all',
                'Learn the durable skills AI does not supply (systems thinking, product sense, taste) plus the craft of directing AI and enough fundamentals to supervise it',
                'Memorize as much syntax as possible',
                'Avoid AI tools while learning',
              ],
              correct: 1,
              explanation: 'The curriculum shifts shape, not size: emphasize judgment and the new craft of direction, while keeping enough fundamentals to recognize good output and catch failures.',
            },
            {
              id: 'vc_m5_l5_s2',
              question: 'Why do product sense and taste become decisive skills when building is cheap?',
              options: [
                'They do not matter at all',
                'When everyone can produce working code, judgment about what is worth building and what good looks like is what makes output actually valuable',
                'Because they let you type faster',
                'Because they replace the need to ship',
              ],
              correct: 1,
              explanation: 'Cheap, abundant building shifts the scarce, decisive value to deciding what to build and recognizing quality, which is what separates useful from merely functional.',
            },
            {
              id: 'vc_m5_l5_s3',
              question: 'How should a beginner approach fundamentals in the AI age?',
              options: [
                'Skip them entirely; they are obsolete',
                'Master every detail in isolation before building anything',
                'Learn enough to supervise the AI, picking up concepts in context with the model as a tutor, so you can be the pilot rather than a passenger',
                'Only learn prompt wording and nothing else',
              ],
              correct: 2,
              explanation: 'You learn fundamentals in context, enough to recognize good output and catch errors. Without them you cannot tell when the autopilot is flying you into a mountain.',
            },
          ],
        },
      ],
      quiz: [
        { id: 'vibecoding_m5_q1', question: 'What is the most grounded answer to "is this the end of software engineering?"', options: ['Yes, engineers are obsolete', 'No, but it is moving up a level: mechanical work is disrupted while specifying, reviewing, architecting, and securing grow in value', 'Nothing is changing', 'Only typing speed matters now'], correct: 1, explanation: 'AI automates much of the typing and raises the abstraction level. Value relocates toward judgment, architecture, and security rather than disappearing.' },
        { id: 'vibecoding_m5_q2', question: 'Why is "building is no longer the moat" the key economic insight of vibe coding?', options: ['Because building is now impossible', 'Because when almost anyone can cheaply build a product, advantage shifts to distribution, taste, brand, and choosing the right problem', 'Because software is now free to sell', 'Because teams must grow much larger'], correct: 1, explanation: 'Cheap, abundant production means the ability to build stops differentiating. Competitive advantage moves to the non-buildable dimensions.' },
        { id: 'vibecoding_m5_q3', question: 'What is the single biggest security habit specific to AI-generated code?', options: ['Trusting all model output by default', 'Verifying that every AI-suggested dependency is real and legitimate before installing, since hallucinated names enable slopsquatting supply-chain attacks', 'Disabling all dependencies', 'Skipping review to ship faster'], correct: 1, explanation: 'Attackers publish malware under names models commonly hallucinate. A single malicious dependency can compromise the whole app, so verify every suggested import.' },
      ],
    },
  ],
};

export default vibecoding;
