'use client';
import { useState, ReactNode, CSSProperties } from 'react';

interface Props {
  children: ReactNode;
  hoverBorder: string;
  defaultBorder: string;
  defaultBg?: string;
  hoverBg?: string;
  lift?: boolean;
  style?: CSSProperties;
}

export default function HoverCard({ children, hoverBorder, defaultBorder, defaultBg = '#111', hoverBg = '#141414', lift = false, style }: Props) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...style,
        border: `1px solid ${hovered ? hoverBorder : defaultBorder}`,
        background: hovered ? hoverBg : defaultBg,
        transition: 'border-color 0.15s, background 0.15s, transform 0.15s',
        transform: lift && hovered ? 'translateY(-2px)' : 'none',
      }}
    >
      {children}
    </div>
  );
}
