// /Users/ankitaryal/anjit-tattoo/app/layout.tsx
import './globals.css';
import React from 'react';
import { Fraunces, Inter } from 'next/font/google';
import ScrollToTop from './components/ScrollToTop';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Define the fonts
const headingFont = Fraunces({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-tattoo', // This creates a CSS variable
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
    // Inject the variables here
    <html lang="en" className={`${headingFont.variable} ${bodyFont.variable} scroll-smooth`}>
      <body className="bg-neutral-950 text-white font-sans antialiased">
        <ScrollToTop />
        <Navbar />
        <main className="relative min-h-screen w-full overflow-x-hidden">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}