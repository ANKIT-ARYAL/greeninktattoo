import './globals.css';
import React from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-neutral-950 text-white font-sans selection:bg-white selection:text-black">
        <title>Anjit Tattoo Studio</title>
        
          <Navbar />
          <main>{children}</main>
          <Footer />
        
      </body>
    </html>
  );
}
