import './globals.css';
import React from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { StoreProvider } from './context/StoreContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-neutral-950 text-white font-sans selection:bg-white selection:text-black">
        <title>Anjit Tattoo Studio</title>
        <StoreProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
