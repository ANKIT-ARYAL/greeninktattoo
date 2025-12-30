import './globals.css';
import React from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

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
    <html lang="en">
      <body className="min-h-screen bg-neutral-950 text-white font-sans selection:bg-white selection:text-black antialiased">
        
        {/* The Navbar now contains both Top branding and Bottom mobile nav */}
        <Navbar />

        {/* Main content area:
          - pb-24: Adds space at the bottom on mobile so content isn't hidden by the nav.
          - md:pb-0: Removes that space on desktop where there is no bottom nav.
        */}
        <main className="pb-24 md:pb-0">
          {children}
        </main>

        {/* Footer will now sit nicely above the bottom nav on mobile */}
        <Footer />
        
      </body>
    </html>
  );
}