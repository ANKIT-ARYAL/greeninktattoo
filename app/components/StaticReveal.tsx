import React from 'react';

interface StaticRevealProps {
  children: React.ReactNode;
  delay?: string; // e.g., "delay-1", "delay-2" from your globals.css
  className?: string;
}

export default function StaticReveal({ children, delay = "", className = "" }: StaticRevealProps) {
  return (
    <div className={`animate-hero ${delay} ${className}`}>
      {children}
    </div>
  );
}