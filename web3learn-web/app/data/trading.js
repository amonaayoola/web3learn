const trading = {
  id: 'trading',
  title: 'Crypto Trading',
  emoji: '📈',
  color: '#10B981',
  gradient: ['#059669', '#10B981'],
  description: 'Master market analysis, risk management, and trading strategies from spot to derivatives.',
  category: 'Finance',
  modules: [

    // ─── BEGINNER ────────────────────────────────────────────────────────────
    {
      id: 'trading_beg',
      level: 'beginner',
      title: 'Trading 101',
      emoji: '💰',
      description: 'Learn how crypto markets work, read order books, and make your first trade safely.',
      color: '#10B981',
      lessons: [
        {
          id: 'trading_beg_l1',
          title: 'How Crypto Markets Work',
          slides: [
            { type: 'intro', title: 'Markets Never Sleep', body: 'Unlike the NYSE (open 9:30am-4pm on weekdays), crypto markets run 24 hours a day, 7 days a week, 365 days a year. There are no circuit breakers, no trading halts, no market makers with obligations. Pure supply and demand, globally, always.' },
            { type: 'text', title: 'What Sets the Price?', body: 'Crypto prices are determined by supply and demand across thousands of exchanges simultaneously. When more people want to buy than sell, price rises. When sellers overwhelm buyers, price falls. Arbitrage bots ensure prices on different exchanges stay within fractions of a percent of each other.' },
            { type: 'text', title: 'Centralized Exchanges (CEX)', body: 'Binance, Coinbase, Kraken, and OKX are custodial exchanges — they hold your funds and match buyers with sellers internally. CEXs require KYC (Know Your Customer) verification. They offer the best liquidity and lowest spreads but require trusting the exchange with your assets.' },
            { type: 'highlight', title: 'Decentralized Exchanges (DEX)', body: 'Uniswap, Curve, and dYdX let you trade directly from your wallet using smart contracts. No KYC. No custody risk. But: you pay gas fees for every trade, no fiat on-ramps, and you\'re responsible for your own security. DEX volume exceeds $2 trillion in 2023.' },
            { type: 'text', title: 'Market Cap vs Price', body: 'A $1,000 coin isn\'t necessarily more valuable than a $0.001 coin. Market cap = price × circulating supply. Bitcoin at $60,000 with 19.5M supply = $1.17T market cap. A $0.001 altcoin with 1 trillion supply = $1B market cap. Always compare market caps, not prices.' },
            { type: 'summary', title: 'Lesson Complete! +20 XP', body: 'Crypto markets are 24/7 global supply-and-demand systems. CEXs offer liquidity and ease; DEXs offer self-custody and permissionlessness. Market cap, not price, determines size.' },
          ],
        },
        {
          id: 'trading_beg_l2',
          title: 'Reading Charts & Candlesticks',
          slides: [
            { type: 'intro', title: 'The Language of Price', body: 'Candlestick charts were invented in 18th century Japan by rice trader Munehisa Homma. They remain the most information-dense way to visualize price action — every candle tells a story about the battle between buyers and sellers.' },
            { type: 'text', title: 'Anatomy of a Candle', body: 'Each candlestick shows 4 data points for its time period: Open (price at start), Close (price at end), High (highest price), Low (lowest price). Green/white candle = price went up (close > open). Red/black candle = price went down (close < open). The "wicks" (shadows) show the high and low.' },
            { type: 'text', title: 'Key Patterns: Doji', body: 'A Doji candle has open and close at nearly the same price (very small body). This signals indecision — neither buyers nor sellers won. A Doji after a strong trend often signals a reversal. A Doji in a range just means... nothing particular is happening.' },
            { type: 'highlight', title: 'Key Patterns: Engulfing', body: 'Bullish Engulfing: a red candle followed by a larger green candle that "engulfs" the red candle\'s body. Bulls took control. Bearish Engulfing: opposite. These are high-probability reversal signals, especially at key support/resistance levels.' },
            { type: 'text', title: 'Timeframes', body: '1-minute charts: for scalpers making dozens of trades per day. 15-minute: day traders. 4-hour: swing traders. Daily: position traders. Weekly: investors. The longer the timeframe, the more significant and reliable the signals. Beginners should start with the daily chart.' },
            { type: 'summary', title: 'Lesson Complete! +20 XP', body: 'Candlestick charts pack Open, High, Low, Close into visual patterns. Key patterns (Doji, Engulfing) signal potential reversals. Longer timeframes produce more reliable signals.' },
          ],
        },
        {
          id: 'trading_beg_l3',
          title: 'Order Types Explained',
          slides: [
            { type: 'intro', title: 'The Right Order for Every Situation', body: 'How you place an order determines your fill price, slippage, and risk. Professionals use the right order type for each situation — beginners use market orders for everything and wonder why they always buy the top.' },
            { type: 'text', title: 'Market Orders', body: 'A market order executes immediately at the best available price. Guaranteed fill. Not guaranteed price. In thin markets or volatile periods, market orders can suffer significant slippage — you might buy at $100 when the screen shows $98. Never use market orders for large amounts in low-liquidity coins.' },
            { type: 'text', title: 'Limit Orders', body: 'A limit order only executes at your specified price or better. Buy limit at $95: your order sits in the order book waiting for someone willing to sell at $95. You control your entry price. The risk: market moves away before your order fills, and you miss the trade.' },
            { type: 'highlight', title: 'Stop-Loss Orders', body: 'A stop-loss automatically sells your position when price reaches a specified level — protecting you from catastrophic losses while you sleep. Set a stop-loss at 5-10% below entry on every trade. This is not optional. Traders who skip stop-losses eventually blow up their accounts.' },
            { type: 'text', title: 'OCO: One Cancels the Other', body: 'OCO orders let you set a take-profit and stop-loss simultaneously. When one triggers, the other cancels automatically. This lets you define your entire trade — entry, profit target, and exit — before it even starts. Professional risk management in one click.' },
            { type: 'summary', title: 'Lesson Complete! +20 XP', body: 'Market orders guarantee fills, not prices. Limit orders guarantee prices, not fills. Stop-losses are non-negotiable risk management. OCO orders complete a professional trade setup.' },
          ],
        },
        {
          id: 'trading_beg_l4',
          title: 'Risk Management Fundamentals',
          slides: [
            { type: 'intro', title: 'Staying in the Game', body: 'The best traders in the world are wrong 40-50% of the time. They\'re profitable because of how they manage losses. Risk management is not optional — it\'s the difference between surviving bear markets and blowing up.' },
            { type: 'text', title: 'The 1-2% Rule', body: 'Never risk more than 1-2% of your total trading capital on a single trade. If you have $10,000, your maximum loss per trade should be $100-200. This means a run of 10 losing trades in a row only costs you 10-20% — survivable. Professional traders use this religiously.' },
            { type: 'text', title: 'Position Sizing', body: 'Your position size is determined by your risk amount and your stop-loss distance. Risk $100, stop-loss 5% from entry: buy $2,000 worth. Risk $100, stop-loss 10% from entry: buy $1,000 worth. The stop-loss determines position size — not some arbitrary round number.' },
            { type: 'highlight', title: 'Risk:Reward Ratios', body: 'A trade with 1:3 risk:reward means you risk $100 to potentially make $300. Over 100 trades with a 40% win rate: 40 wins × $300 = $12,000 profit. 60 losses × $100 = $6,000 loss. Net: +$6,000. Even losing more than you win, you can be profitable with good R:R.' },
            { type: 'text', title: 'Never Average Down on Losers', body: 'Averaging down (buying more as price falls) feels logical but is how retail traders turn small losses into account-destroying ones. If your thesis was right, why is price moving against you? The market knows something you don\'t. Respect your stop-loss. Always.' },
            { type: 'summary', title: 'Lesson Complete! +20 XP', body: 'Risk 1-2% max per trade. Size positions based on stop-loss distance. Aim for 1:2+ risk:reward. Never average down into losers. Risk management, not prediction, creates consistent profitability.' },
          ],
        },
        {
          id: 'trading_beg_l5',
          title: 'Crypto Market Cycles',
          slides: [
            { type: 'intro', title: 'The 4-Year Rhythm', body: 'Crypto has followed a remarkably consistent 4-year cycle tied to Bitcoin\'s halving. Understanding this cycle doesn\'t guarantee timing perfection — but it contextualizes where the market might be and why.' },
            { type: 'text', title: 'The Bitcoin Halving', body: 'Every 210,000 blocks (~4 years), Bitcoin\'s block reward halves. This cuts new supply in half while demand grows. The halvings happened in 2012, 2016, 2020, and 2024. Within 12-18 months after each halving, Bitcoin has reached a new all-time high. Correlation is not causation, but the pattern is notable.' },
            { type: 'text', title: 'The 4 Phases', body: 'Accumulation: price flat/down, smart money buying quietly. Bull Run: price rises, retail FOMO enters, media coverage explodes. Blow-off Top: parabolic rise, extreme euphoria, "this time is different" sentiment. Bear Market: 70-90% drawdowns, projects die, weak hands sell to strong hands.' },
            { type: 'highlight', title: 'Altcoin Season', body: 'Altcoin Season typically follows Bitcoin\'s run: BTC makes new highs → ETH follows → Large caps → Small caps → Speculative tokens. The pattern: BTC dominance rises as BTC leads, then falls as altcoins outperform. The last altcoins to pump are often the first to crash hardest.' },
            { type: 'text', title: 'Positioning for Cycles', body: 'Buy fear, sell greed — easier said than done emotionally. The Crypto Fear & Greed Index tracks market sentiment (0=extreme fear, 100=extreme greed). Historically, buying below 20 and selling above 80 dramatically outperforms holding through cycles. But most people do the opposite.' },
            { type: 'summary', title: 'Module Almost Done! +20 XP', body: 'The 4-year halving cycle creates predictable market phases: accumulation, bull run, blow-off top, bear market. Altcoin season follows Bitcoin. Sentiment indicators help time entries — but psychology makes it hard to act rationally.' },
          ],
        },
      ],
      quiz: [
        { id: 'trading_beg_q1', question: 'What is the key difference between a market order and a limit order?', options: ['Market orders are only for buying; limit orders are for selling', 'Market orders execute immediately at any available price; limit orders execute only at your specified price or better', 'Market orders cost more in fees', 'Limit orders are instant; market orders take days'], correct: 1, explanation: 'Market orders guarantee execution but not price — you may suffer slippage. Limit orders guarantee your price but not execution — the market may move away before your order fills.' },
        { id: 'trading_beg_q2', question: 'You have $10,000. Using the 1-2% rule, your maximum loss per trade should be:', options: ['$1,000 - $2,000', '$500 - $1,000', '$100 - $200', '$50 - $100'], correct: 2, explanation: '1-2% of $10,000 = $100-200 maximum risk per trade. This ensures a run of 10 consecutive losses only costs 10-20% of your portfolio — survivable and recoverable.' },
        { id: 'trading_beg_q3', question: 'What does a Bearish Engulfing candlestick pattern signal?', options: ['A strong uptrend continuation', 'A potential trend reversal from up to down — sellers took control, engulfing the previous bullish candle', 'Market indecision', 'Neutral market conditions'], correct: 1, explanation: 'A Bearish Engulfing pattern (large red candle consuming the previous green candle) signals that sellers overwhelmed buyers. Most reliable as a reversal signal after an uptrend, especially at resistance levels.' },
        { id: 'trading_beg_q4', question: 'Approximately how often does Bitcoin have a halving?', options: ['Every 1 year', 'Every 2 years', 'Every 4 years (every 210,000 blocks)', 'Every 10 years'], correct: 2, explanation: 'Bitcoin\'s halving occurs every 210,000 blocks, which takes approximately 4 years at Bitcoin\'s 10-minute target block time. Halvings occurred in 2012, 2016, 2020, and 2024.' },
        { id: 'trading_beg_q5', question: 'You risk $200 on a trade with a 1:3 risk:reward ratio. What\'s your profit target?', options: ['$200', '$400', '$600', '$1,000'], correct: 2, explanation: '1:3 risk:reward means you target $3 for every $1 risked. $200 risk × 3 = $600 profit target. Over many trades, even a 40% win rate makes this profitable: 40 × $600 − 60 × $200 = +$12,000.' },
      ],
    },

    // ─── INTERMEDIATE ─────────────────────────────────────────────────────────
    {
      id: 'trading_int',
      level: 'intermediate',
      title: 'Technical Analysis',
      emoji: '📊',
      description: 'Master indicators, support/resistance, chart patterns, and the psychology behind price action.',
      color: '#10B981',
      lessons: [
        {
          id: 'trading_int_l1',
          title: 'Support, Resistance & Structure',
          slides: [
            { type: 'intro', title: 'Where Price Remembers', body: 'Price levels from the past have a remarkable tendency to act as barriers in the future — support (floor) and resistance (ceiling). This isn\'t magic: it\'s the collective memory of thousands of traders whose positions were created at those levels.' },
            { type: 'text', title: 'Why Support and Resistance Work', body: 'At a support level, buyers who missed the previous bottom want to buy again. Short sellers who bet on a breakdown have stop-losses clustered just above. This creates a self-fulfilling concentration of buy orders. At resistance, sellers from a previous peak exit, and short sellers enter — creating a wall.' },
            { type: 'text', title: 'Role Reversal', body: 'One of the most reliable patterns in TA: when a support level breaks, it becomes resistance (and vice versa). Why? Buyers trapped below their entry need to sell when price returns to break-even. This concentrated selling turns the old support into new resistance.' },
            { type: 'highlight', title: 'Volume Confirms', body: 'A breakout on high volume = conviction. A breakout on low volume = possible fake-out. Always check volume before trading breakouts. The 2021 Bitcoin bull run\'s $64k high was accompanied by extreme volume. The retest of $69k (the true ATH) came on declining volume — a bearish divergence that preceded the 2022 bear market.' },
            { type: 'text', title: 'Higher Timeframe Structure', body: 'Weekly support/resistance levels carry far more weight than 5-minute levels. Professional traders map the daily and weekly structure first, then drill into lower timeframes for entry precision. Never fight a major weekly level with a 15-minute chart setup.' },
            { type: 'summary', title: 'Lesson Complete! +20 XP', body: 'Support and resistance are price memory zones. Role reversal (broken support becomes resistance) is one of the most consistent TA concepts. Volume confirms or invalidates breakouts.' },
          ],
        },
        {
          id: 'trading_int_l2',
          title: 'Essential Indicators',
          slides: [
            { type: 'intro', title: 'Tools, Not Holy Grails', body: 'Indicators are mathematical transformations of price and volume data. They don\'t predict the future — they summarize the past in ways that highlight momentum, trend, and potential reversals. No indicator is 70%+ reliable in isolation. Used together with structure, they add value.' },
            { type: 'text', title: 'Moving Averages', body: 'The 200-day moving average (200MA) is the single most-watched indicator. Price above 200MA = bull market structure. Price below = bear. When the 50MA crosses above the 200MA, it\'s called a "Golden Cross" (historically bullish). When 50MA crosses below 200MA: "Death Cross" (historically bearish). Bitcoin\'s 200MA has acted as key support/resistance through every cycle.' },
            { type: 'text', title: 'RSI: Relative Strength Index', body: 'RSI measures momentum on a scale of 0-100. Above 70 = overbought (price may be overextended). Below 30 = oversold (potential bounce). In strong trends, RSI can stay above 70 for weeks — "overbought" is not automatically a sell signal. The most powerful RSI signal is divergence: price makes new highs but RSI makes lower highs → bearish divergence.' },
            { type: 'highlight', title: 'MACD: Trend + Momentum', body: 'Moving Average Convergence Divergence (MACD) tracks the difference between two EMAs (typically 12-day and 26-day). The signal line is a 9-day EMA of the MACD. MACD crossing above signal line = bullish. Below = bearish. The histogram shows the strength of the crossover. Best used to confirm direction, not timing.' },
            { type: 'text', title: 'Bollinger Bands', body: 'Bollinger Bands are a volatility indicator: a 20-day moving average with upper and lower bands 2 standard deviations away. When bands narrow (squeeze), low volatility is likely to be followed by a strong move. When price tags the upper band repeatedly without crossing it — distribution. When price rides the upper band — strong uptrend. Don\'t trade band touches alone without structure context.' },
            { type: 'summary', title: 'Lesson Complete! +20 XP', body: 'The 200MA defines macro structure. RSI divergence is a high-quality signal. MACD confirms momentum direction. Bollinger Band squeezes signal imminent volatility. Combine, never use alone.' },
          ],
        },
        {
          id: 'trading_int_l3',
          title: 'Chart Patterns That Work',
          slides: [
            { type: 'intro', title: 'Patterns Are Supply/Demand Battles', body: 'Classic chart patterns aren\'t arbitrary shapes — each represents a specific dynamic between buyers and sellers playing out in price. Understanding what\'s happening behind the pattern dramatically improves your ability to trade them correctly.' },
            { type: 'text', title: 'Head and Shoulders', body: 'The Head & Shoulders is one of the most reliable reversal patterns: left shoulder (rally, pullback), head (higher rally, pullback), right shoulder (lower rally, can\'t reach the head). The "neckline" connecting the two pullback lows is the key level. Break below the neckline = bearish reversal confirmation. Measured target: neckline minus the height of the head.' },
            { type: 'text', title: 'Triangles', body: 'Ascending Triangle (horizontal resistance, rising support): buyers are gradually more willing to pay up but sellers hold firm at resistance — tension builds until a breakout, typically bullish. Descending Triangle: bearish mirror. Symmetrical Triangle: compression, breakout direction less predictable — wait for confirmation.' },
            { type: 'highlight', title: 'Bull/Bear Flags', body: 'After a strong directional move, price often consolidates in a tight rectangle or slight counter-trend channel (the "flag"). This represents brief profit-taking before the trend resumes. Bull flags (consolidation after a surge) tend to break up. Bear flags break down. These are high-probability continuation patterns with clear measured targets.' },
            { type: 'text', title: 'Double Tops and Bottoms', body: 'A Double Top forms when price reaches the same resistance level twice and fails — signaling buyers are exhausted. The break below the neckline (the low between the two tops) confirms the reversal. Double Bottom is the inverse — a reliable bullish reversal pattern. Real-world example: Bitcoin\'s $20k double top in 2021 preceded the multi-year bear market.' },
            { type: 'summary', title: 'Lesson Complete! +20 XP', body: 'Chart patterns are supply/demand dynamics made visible. H&S, triangles, flags, and double tops/bottoms are the most statistically reliable. Always wait for the breakout confirmation — never anticipate.' },
          ],
        },
        {
          id: 'trading_int_l4',
          title: 'On-Chain Analysis',
          slides: [
            { type: 'intro', title: 'The Blockchain Never Lies', body: 'Unlike traditional markets where fund positioning is hidden or delayed, every crypto transaction is public. On-chain analysis reads the blockchain directly — giving you data that fundamental and technical analysis can\'t.' },
            { type: 'text', title: 'UTXO Age Bands / HODL Waves', body: 'Bitcoin\'s UTXO age analysis tracks what percentage of supply was last moved at each time period. When old coins (1y+) start moving, it often signals distribution — long-term holders selling into strength. When young coins dominate (new buyers), it signals speculative activity at tops.' },
            { type: 'text', title: 'Exchange Flows', body: 'Crypto flowing into exchanges = potential selling pressure (people send to exchanges to sell). Crypto flowing out of exchanges = accumulation (people withdrawing to cold storage). During the 2020-2021 bull run, Bitcoin exchange reserves fell from 3.1M to 2.5M BTC — sustained buying pressure. Pre-crash 2022, flows reversed.' },
            { type: 'highlight', title: 'The MVRV Ratio', body: 'Market Value to Realized Value compares current market cap to the cost basis of all holders. MVRV above 3.5: historically signals a market top (most holders are deeply profitable and likely to sell). MVRV below 1: historically signals bottom territory (holders are underwater, capitulation near completion). One of the most reliable cycle indicators.' },
            { type: 'text', title: 'Funding Rates', body: 'Perpetual futures use funding rates to keep contract price close to spot price. When funding is highly positive, longs are paying shorts — longs are overcrowded, overleveraged, and vulnerable to a squeeze. Extreme negative funding signals aggressive short positions — vulnerable to a short squeeze. Funding rates are a real-time sentiment gauge.' },
            { type: 'summary', title: 'Lesson Complete! +20 XP', body: 'On-chain data reveals what technical analysis can\'t. Exchange flows track real accumulation/distribution. MVRV identifies cycle extremes. Funding rates gauge futures sentiment. Combined, they\'re powerful tools for positioning.' },
          ],
        },
        {
          id: 'trading_int_l5',
          title: 'Trading Psychology',
          slides: [
            { type: 'intro', title: 'The Last Unfair Edge', body: 'In modern markets, information edges are rare and algorithmic advantages are inaccessible to most traders. The genuine edge available to everyone: psychological discipline. Most traders give up 30-50% of their potential returns to emotional errors.' },
            { type: 'text', title: 'FOMO: Fear of Missing Out', body: 'Bitcoin pumps 20%. You didn\'t buy earlier. It pumps another 10%. You buy now at the top, chasing. This is FOMO — and it\'s how most retail traders buy the exact top. Solution: have a trading plan before markets open. If you don\'t have an entry thesis at current prices, you don\'t have a trade.' },
            { type: 'text', title: 'Loss Aversion', body: 'Research by Kahneman and Tversky shows humans feel losses ~2.5x more intensely than equivalent gains. This causes traders to hold losing positions too long ("it\'ll come back") and cut winners too short ("I should take profits before it reverses"). This bias is the exact inverse of what profitable trading requires.' },
            { type: 'highlight', title: 'Revenge Trading', body: 'After a stop-loss triggers, the urge to "get it back" immediately is overwhelming and almost always leads to a second, larger loss. The market doesn\'t know you exist — there\'s nothing to avenge. After any loss, take a break. Review your journal. Return tomorrow. Never increase position size after a loss to make it back faster.' },
            { type: 'text', title: 'The Trading Journal', body: 'The single most underutilized tool in trading. Log every trade: entry reasoning, position size, target, stop-loss, actual outcome, and emotional state during entry and exit. After 50 trades, you\'ll see patterns — setups that work for you, times of day when you make emotional decisions, recurring mistakes you can systematically eliminate.' },
            { type: 'summary', title: 'Module Complete! +20 XP', body: 'FOMO, loss aversion, and revenge trading destroy more accounts than bad strategies. A written trading plan, strict rules, and a trading journal are your psychological defenses. Consistency beats brilliance.' },
          ],
        },
      ],
      quiz: [
        { id: 'trading_int_q1', question: 'What happens when a support level is broken in role reversal?', options: ['Price immediately recovers', 'The broken support becomes new resistance — trapped buyers sell when price returns to their entry', 'Support remains valid until confirmed by another test', 'Nothing — the next support level simply becomes relevant'], correct: 1, explanation: 'When price breaks below support, buyers trapped at that level need to exit when price returns — creating selling pressure that turns the old support into new resistance. One of the most reliable TA concepts.' },
        { id: 'trading_int_q2', question: 'What is a bearish RSI divergence?', options: ['RSI falls below 30 while price is also falling', 'Price makes new highs while RSI makes lower highs — signaling weakening momentum behind the price move', 'RSI exceeds 70 in an uptrend', 'RSI and price move in the same direction'], correct: 1, explanation: 'Bearish divergence: price makes a new high but RSI makes a lower high. This means the upward move has less momentum behind it — buyers are tiring. It\'s one of RSI\'s highest-quality signals, especially at key resistance levels.' },
        { id: 'trading_int_q3', question: 'What does the MVRV ratio above 3.5 historically indicate?', options: ['A bear market bottom — good time to buy', 'Strong fundamental value — hold indefinitely', 'A market top — most holders are deeply profitable and likely to take profits', 'Normal market conditions'], correct: 2, explanation: 'MVRV (Market Value / Realized Value) above 3.5 means the average holder is sitting on 250%+ gains. Historically this zone marks Bitcoin cycle tops where distribution from long-term holders overwhelms new buyers.' },
        { id: 'trading_int_q4', question: 'Highly positive perpetual funding rates signal what risk?', options: ['Sellers are dominant and a rally is likely', 'Longs are overcrowded — the market is vulnerable to a long squeeze if price drops', 'The market is balanced with no bias', 'Institutional buying is confirmed'], correct: 1, explanation: 'Positive funding means longs pay shorts to keep the contract near spot price. When funding is very high, there are too many longs — a small drop triggers cascading liquidations (a long squeeze), amplifying the move down.' },
        { id: 'trading_int_q5', question: 'Why does loss aversion make trading psychologically difficult?', options: ['Traders fear losses more than they value equivalent gains, causing them to hold losers too long and cut winners too short', 'Traders become too confident after winning streaks', 'Loss aversion leads to overtrading', 'Loss aversion causes traders to avoid taking any positions'], correct: 0, explanation: 'Kahneman\'s research: losses feel ~2.5x more intense than gains. This means traders irrationally hold losing positions ("it\'ll recover") while exiting winners prematurely — the exact opposite of what profitable trading requires (cut losses fast, let winners run).' },
      ],
    },

    // ─── EXPERT ───────────────────────────────────────────────────────────────
    {
      id: 'trading_exp',
      level: 'expert',
      title: 'Derivatives & Advanced Strategies',
      emoji: '🎯',
      description: 'Perpetuals, options, basis trading, market making, and systematic strategy development.',
      color: '#10B981',
      lessons: [
        {
          id: 'trading_exp_l1',
          title: 'Perpetual Futures',
          slides: [
            { type: 'intro', title: 'The Dominant Crypto Instrument', body: 'Perpetual futures (perps) are the most traded instrument in crypto — often 5-10x more volume than spot markets. They allow traders to take leveraged long or short positions without an expiry date. BitMEX introduced them in 2016; they\'ve since become the backbone of crypto speculation.' },
            { type: 'text', title: 'How Perps Work', body: 'A perpetual futures contract tracks the spot price via a funding rate mechanism. Every 8 hours, longs pay shorts (or shorts pay longs) a small percentage based on the premium or discount between perp price and spot price. This keeps the perp price anchored to spot without an expiry.' },
            { type: 'text', title: 'Leverage and Liquidation', body: '10x leverage on a $10,000 position controls $100,000 worth of BTC. But a 10% adverse move wipes out your entire collateral — liquidation. Most exchanges now offer 1-125x leverage. Professional traders rarely exceed 3-5x. High leverage is how retail traders lose everything in a single bad trade.' },
            { type: 'highlight', title: 'Cross vs Isolated Margin', body: 'Isolated margin: only your margin for that specific position is at risk. Cross margin: your entire account balance is collateral. Isolated is safer for beginners — a liquidation only loses the margin allocated to that position, not your whole account.' },
            { type: 'text', title: 'The Liquidation Cascade', body: 'When price drops rapidly, leveraged longs get liquidated — forced selling that pushes price down further, triggering more liquidations, creating a waterfall effect. The March 2020 COVID crash saw $1B liquidated in hours. The May 2021 crash: $10B in a day. These cascades create the violent wicks visible on crypto charts.' },
            { type: 'summary', title: 'Lesson Complete! +20 XP', body: 'Perps are the dominant crypto instrument, offering 24/7 leveraged exposure via funding rates. Leverage amplifies gains and losses symmetrically. Isolated margin and disciplined sizing prevent catastrophic liquidations.' },
          ],
        },
        {
          id: 'trading_exp_l2',
          title: 'Options Strategies',
          slides: [
            { type: 'intro', title: 'Asymmetric Risk Tools', body: 'Options give the buyer the right (not obligation) to buy or sell an asset at a specific price before a specific date. Unlike futures, your maximum loss is the premium paid — creating asymmetric risk profiles unavailable in spot or futures trading.' },
            { type: 'text', title: 'Calls and Puts', body: 'Call option: right to BUY at the strike price. Profitable when price rises above strike + premium. Put option: right to SELL at the strike price. Profitable when price falls below strike − premium. Buyers pay premium; sellers (writers) receive premium and take on potentially unlimited risk.' },
            { type: 'text', title: 'The Greeks', body: 'Delta: how much option price moves per $1 move in the underlying. Gamma: rate of change of delta. Theta: time decay — options lose value daily as expiry approaches, hurting buyers and helping sellers. Vega: sensitivity to implied volatility changes. IV spikes before major events — buying options before earnings is often expensive.' },
            { type: 'highlight', title: 'Key Strategies', body: 'Covered Call: hold BTC, sell call at resistance — collect premium, cap upside. Protective Put: hold BTC, buy put — insurance against downside. Straddle: buy both call and put at the same strike — profit from large moves in either direction, ideal before binary events. Iron Condor: sell strangle + buy wider strangle — profit from low volatility.' },
            { type: 'text', title: 'Deribit: The Crypto Options Exchange', body: 'Deribit handles ~85% of crypto options volume. BTC and ETH options with strikes ranging weeks to years out. The options market provides powerful information: put/call ratio (bearish or bullish skew), implied volatility term structure, and max pain (price where the most options expire worthless — often where price gravitates near expiry).' },
            { type: 'summary', title: 'Lesson Complete! +20 XP', body: 'Options enable asymmetric risk. Calls and puts are building blocks for complex strategies. Greeks quantify sensitivities. Deribit dominates crypto options. Max pain and IV skew are powerful market indicators.' },
          ],
        },
        {
          id: 'trading_exp_l3',
          title: 'Market-Neutral Strategies',
          slides: [
            { type: 'intro', title: 'Making Money Regardless of Direction', body: 'The most sophisticated crypto funds generate returns from market structure and inefficiencies — not by predicting price direction. Market-neutral strategies generate alpha without the stress of being long or short.' },
            { type: 'text', title: 'Cash-and-Carry (Basis Trading)', body: 'Buy BTC spot and simultaneously short BTC perpetual futures. The funding rate pays you (in positive funding regimes) while your price exposure is flat. During the 2020-2021 bull run, this trade generated 30-100%+ APY with near-zero directional risk. Risk: funding rate reversal.' },
            { type: 'text', title: 'Statistical Arbitrage', body: 'BTC and ETH correlation typically stays above 0.85. When correlation temporarily diverges, a stat-arb trader longs the underperformer and shorts the outperformer, betting on reversion to normal correlation. Requires sophisticated backtesting, execution infrastructure, and careful hedging.' },
            { type: 'highlight', title: 'Yield Farming Arbitrage', body: 'DeFi protocols offer high yields for liquidity provision. Sophisticated traders farm yield, hedge the underlying asset price with short futures, and pocket the net yield minus hedging costs. Risk-free rate extraction from DeFi. During 2021, yields often exceeded 100% APY on new protocols — attracting hundreds of millions in capital.' },
            { type: 'text', title: 'Exchange Rate Arbitrage', body: 'Small price differences between exchanges can be arbitraged — buy on Kraken, sell on Binance. Requires capital on both exchanges, fast execution, and accounts for withdrawal fees and timing risk. True arbitrage is riskless but requires significant infrastructure. Most "arbitrage" in crypto involves some timing risk.' },
            { type: 'summary', title: 'Lesson Complete! +20 XP', body: 'Market-neutral strategies generate returns from structure, not direction. Basis trading, stat arb, yield farming arb, and exchange arbitrage all have different risk profiles. The best traders stack several non-correlated strategies.' },
          ],
        },
        {
          id: 'trading_exp_l4',
          title: 'Algorithmic Trading',
          slides: [
            { type: 'intro', title: 'Code the Edge', body: 'Algorithmic trading removes emotion, ensures consistency, and can execute at speeds impossible for humans. It\'s estimated that 70-80% of crypto spot volume and nearly all derivatives volume is algorithmically generated. Understanding algos means understanding what\'s driving price.' },
            { type: 'text', title: 'Strategy Types', body: 'Market making: continuously quote bid and ask, profiting from the spread. Trend following: detect momentum and ride it until reversal signals. Mean reversion: trade back toward historical averages after extreme moves. Arbitrage: profit from temporary price discrepancies. Statistical arbitrage: trade correlated assets. Each has distinct market regimes where it thrives or suffers.' },
            { type: 'text', title: 'Backtesting Essentials', body: 'Backtesting applies your strategy to historical data to estimate performance. But: look-ahead bias (using future data), survivorship bias (only testing assets that survived), and overfitting (curve-fitting to past patterns) all produce artificially positive results. Always use out-of-sample data for final testing. Walk-forward optimization prevents overfitting.' },
            { type: 'highlight', title: 'Execution Quality', body: 'The best strategy can be destroyed by poor execution: slippage (especially in low-liquidity markets), exchange latency (important for high-frequency strategies), API rate limits, and partial fills. Co-location (placing servers near exchange matching engines) reduces latency. For most strategies, execution quality matters more than signal quality.' },
            { type: 'text', title: 'Infrastructure Stack', body: 'A professional algo trading stack: data feed (raw tick data, order book snapshots), signal generation (Python/C++ strategy code), risk management layer (position limits, max drawdown circuit breakers), order management system (OMS), and post-trade analytics. Services like Hummingbot, Freqtrade, and ccxt provide open-source starting points.' },
            { type: 'summary', title: 'Lesson Complete! +20 XP', body: 'Algos dominate crypto volume. Strategy types include market making, trend following, mean reversion, and arbitrage. Rigorous backtesting avoids curve fitting. Execution quality often determines profitability more than signal quality.' },
          ],
        },
        {
          id: 'trading_exp_l5',
          title: 'Portfolio Construction',
          slides: [
            { type: 'intro', title: 'The Portfolio is the Strategy', body: 'Individual trade selection is overrated. The composition, sizing, and rebalancing of your overall portfolio determines long-term performance more than any single trade. This is what separates sophisticated allocators from retail traders chasing the next 100x.' },
            { type: 'text', title: 'Correlation in Crypto', body: 'Most altcoins are highly correlated to BTC — when BTC falls 30%, alts often fall 50-80%. A portfolio of 20 altcoins isn\'t diversified — it\'s a leveraged BTC bet. True diversification in crypto requires non-crypto assets (gold, bonds, equities) or genuine on-chain yield strategies that decorrelate from price.' },
            { type: 'text', title: 'The Kelly Criterion', body: 'Kelly Criterion calculates optimal position sizing: f* = (bp - q) / b, where b = odds, p = win probability, q = loss probability. Kelly maximizes long-term growth but can suggest very large positions. Most professionals use "fractional Kelly" (25-50% of Kelly) to reduce volatility. A rigorous framework for position sizing.' },
            { type: 'highlight', title: 'Dynamic Rebalancing', body: 'If you allocate 60% BTC / 40% ETH and BTC outperforms, the portfolio drifts to 70% BTC. Rebalancing forces you to sell the outperformer and buy the underperformer — systematically buy-low, sell-high. Research shows monthly or threshold-based (>5% drift) rebalancing outperforms hold-and-ignore over full cycles.' },
            { type: 'text', title: 'Risk-Adjusted Returns', body: 'Never evaluate returns without risk context. Sharpe Ratio: excess return per unit of volatility. Sortino Ratio: excess return per unit of downside volatility (better for crypto). Max Drawdown: largest peak-to-trough decline. Calmar Ratio: annual return / max drawdown. A strategy with 100% annual return and 90% max drawdown is not better than one with 40% return and 20% drawdown.' },
            { type: 'summary', title: 'Module Complete! +20 XP', body: 'Portfolio construction beats individual trade selection long-term. Most crypto assets are BTC-correlated. Kelly Criterion optimizes sizing. Dynamic rebalancing systematizes buy-low/sell-high. Always evaluate performance on risk-adjusted metrics.' },
          ],
        },
      ],
      quiz: [
        { id: 'trading_exp_q1', question: 'What is the funding rate mechanism in perpetual futures?', options: ['A fee charged by the exchange for using leverage', 'A periodic payment between longs and shorts that keeps the perp price anchored to spot price', 'An interest rate charged on borrowed capital', 'A penalty for holding positions overnight'], correct: 1, explanation: 'Every 8 hours, the perpetual contract pays funding from one side to the other based on the perp/spot premium. Positive funding: longs pay shorts. This mechanism keeps perp price close to spot without requiring an expiry date.' },
        { id: 'trading_exp_q2', question: 'What does a Theta value of -0.05 mean for an options buyer?', options: ['The option gains $0.05 per day', 'The option loses $0.05 in value per day due to time decay — this works against buyers', 'The option has 5% probability of expiring profitable', 'The option\'s price will move 5% with the underlying'], correct: 1, explanation: 'Theta represents time decay. Negative theta means the option loses value daily as expiry approaches. This hurts buyers (who paid a premium) and helps sellers (who collected it). Options lose value fastest in the final 30 days before expiry.' },
        { id: 'trading_exp_q3', question: 'What is cash-and-carry (basis) trading?', options: ['Buying crypto and immediately selling it for cash', 'Buying spot and shorting perps simultaneously to collect funding rate with near-zero directional risk', 'Using borrowed funds to amplify returns', 'Holding cash during bear markets and buying at the bottom'], correct: 1, explanation: 'Cash-and-carry: long spot BTC + short BTC perps = zero delta position. In positive funding regimes (bull markets), the short perp collects funding payments. During 2020-2021, this generated 30-100%+ APY with minimal directional risk.' },
        { id: 'trading_exp_q4', question: 'What is "look-ahead bias" in backtesting?', options: ['Using too much historical data', 'Inadvertently using data in your backtest that wouldn\'t have been available at the time of the trade — creating artificially positive results', 'Testing only during bull market periods', 'Focusing only on assets that performed well'], correct: 1, explanation: 'Look-ahead bias is one of the most common backtesting errors. If your strategy uses future price data at any point (e.g., referencing today\'s close to make a trade "today"), the backtest results are meaningless. Always validate that your signals only use data that would have been available at execution time.' },
        { id: 'trading_exp_q5', question: 'Why is the Sortino Ratio often preferred over the Sharpe Ratio for crypto strategies?', options: ['It\'s easier to calculate', 'It only penalizes downside volatility — in crypto, upside volatility (large gains) should not be penalized the same as losses', 'It ignores outliers better', 'It measures absolute returns rather than risk-adjusted returns'], correct: 1, explanation: 'The Sharpe Ratio penalizes all volatility equally. But upside volatility (large gains) is desirable! The Sortino Ratio only counts downside deviation — more appropriate for highly asymmetric crypto returns where large positive moves are common.' },
      ],
    },

  ],
};

export default trading;
