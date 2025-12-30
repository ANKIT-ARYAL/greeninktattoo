import './globals.css';
import React from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

export const metadata = {
  title: 'Anjit Tattoo',
  description: 'Premium tattoo artistry in the heart of Nepal. Specializing in Black & Grey, Realism, and Custom Designs.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      {/* overflow-x-hidden: Prevents side-scrolling from animations.
        selection: Custom highlight color for a premium feel.
      */}
      <ScrollToTop />
      <body className="min-h-[100dvh] bg-neutral-950 text-white font-sans selection:bg-emerald-500 selection:text-black antialiased overflow-x-hidden">
        
        <Navbar />

        {/* min-h-[100dvh]: Dynamically adjusts for mobile browser bars.
          w-full: Ensures no container collapses.
        */}
        <main className="relative min-h-[100dvh] w-full pb-24 md:pb-0">
          {children}
        </main>

        <Footer />
        
      </body>
    </html>
  );
}