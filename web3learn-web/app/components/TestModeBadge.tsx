'use client';
import { useState, useEffect } from 'react';

export default function TestModeBadge() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(localStorage.getItem('maiden_test_mode') === 'true');
  }, []);

  if (!active) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 8,
      right: 8,
      background: '#EF4444',
      color: '#fff',
      padding: '4px 10px',
      borderRadius: 6,
      fontSize: 11,
      fontWeight: 700,
      zIndex: 9999,
      letterSpacing: '0.05em',
      fontFamily: "'Outfit', sans-serif",
      boxShadow: '0 2px 8px rgba(239,68,68,0.4)',
    }}>
      TEST MODE
    </div>
  );
}
