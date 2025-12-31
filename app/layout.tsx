import './globals.css';
import React from 'react';

import ScrollToTop from './components/ScrollToTop';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

export const metadata = {
  title: 'Anjit Tattoo',
  description: 'Premium tattoo artistry in the heart of Nepal.',
  icons: {
    icon: '/icon.png', // This points to your new, cropped, transparent file
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-neutral-950 text-white font-sans antialiased selection:bg-emerald-500 selection:text-black">
        <ScrollToTop />
        <Navbar />
        {/* We move overflow-x-hidden here to avoid breaking IntersectionObservers on the body */}
        <main className="relative min-h-screen w-full overflow-x-hidden">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}