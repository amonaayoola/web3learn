# Web3Learn

A Duolingo-style mobile app for learning Web3, built with React Native + Expo.

## Quick Start

```bash
cd web3learn
npm install
npx expo start
```

Scan the QR code with the **Expo Go** app on your phone (iOS or Android).

## What's Inside

**3 modules, 12 lessons, 15 quiz questions:**
- Module 1: What is Blockchain? (⛓️)
- Module 2: Wallets & Keys (🔑)
- Module 3: Transactions & Gas (⛽)

**Phase 2 Gamification:**
- 🔥 Daily streaks with weekly freeze protection
- ❤️ Hearts/lives system (5 hearts, refills every 4 hours)
- 🏆 XP rank system: Crypto Curious → Block Builder → Chain Explorer → DeFi Navigator → Web3 Master
- ⚡ Daily Challenge with 2× XP bonus
- 📊 Animated XP progress bar toward next rank

## Project Structure

```
src/
├── context/ProgressContext.js   — XP, hearts, streaks, progress state
├── data/curriculum.js           — All lesson and quiz content
├── navigation/AppNavigator.js   — React Navigation stack
├── screens/
│   ├── HomeScreen.js            — Dashboard
│   ├── ModuleScreen.js          — Lesson list
│   ├── LessonScreen.js          — Slide-based lesson viewer
│   ├── QuizScreen.js            — Multiple choice quiz
│   ├── LevelCompleteScreen.js   — XP reward screen
│   └── DailyChallengeScreen.js  — Daily challenge lobby
├── components/
│   ├── HeartsDisplay.js         — ❤️ hearts with shake animation
│   ├── StreakDisplay.js          — 🔥 streak counter + freeze badge
│   ├── RankBadge.js             — Rank name with colored badge
│   ├── AnimatedXPBar.js         — Smooth animated XP progress bar
│   ├── DailyChallengeCard.js    — Pulsing daily challenge card
│   └── HotStreakBanner.js       — "You're on fire!" spring banner
└── utils/
    ├── rankUtils.js             — Rank thresholds and progress math
    ├── streakUtils.js           — Streak tracking with freeze logic
    ├── heartsUtils.js           — Hearts refill timer
    └── dailyChallengeUtils.js   — Seeded daily question shuffle
```

## Notes

- `assets/` folder with `icon.png`, `splash.png`, `adaptive-icon.png` needed to silence warnings (optional — app runs without them)
- Progress persists via AsyncStorage across app restarts
- Modules 2 and 3 unlock after completing the previous module
