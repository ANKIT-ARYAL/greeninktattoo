// /Users/ankitaryal/anjit-tattoo/app/layout.tsx
import './globals.css';
import React from 'react';
import { Fraunces, Inter } from 'next/font/google';
import ScrollToTop from './components/ScrollToTop';
import { LayoutWrapper } from './components/LayoutWrapper'; // We will create this

const headingFont = Fraunces({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-tattoo',
});

const bodyFont = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata = {
  title: 'Anjit Tattoo',
  description: 'Premium tattoo artistry in the heart of Nepal.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${headingFont.variable} ${bodyFont.variable} scroll-smooth`}>
      <body className="bg-neutral-950 text-white font-sans antialiased">
        <ScrollToTop />
        {/* We use a Wrapper to handle the conditional Navbar/Footer logic */}
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}