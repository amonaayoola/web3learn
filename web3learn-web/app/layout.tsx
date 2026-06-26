import type { Metadata } from 'next';
import './globals.css';
import Providers from './Providers';
import AnimatedBackground from './components/AnimatedBackground';
import TestModeBadge from './components/TestModeBadge';

export const metadata: Metadata = {
  title: 'MAIDEN: Web3 Learning Platform',
  description: 'Your maiden voyage into Web3 starts here. Learn blockchain, DeFi, NFTs and more.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <body>
        {/* Canvas aurora: fixed, pointer-events:none, z-index:0 */}
        <AnimatedBackground />
        {/* Test mode badge */}
        <TestModeBadge />
        {/* All app content sits above the canvas */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
