'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface NavbarProps {
  transparent?: boolean;
}

export default function Navbar({ transparent = true }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* FORCE VISIBLE NAV */}
      <nav className={`fixed top-0 left-0 w-full z-[9999] flex items-center justify-between px-6 md:px-16 py-6 ${transparent ? 'bg-transparent' : 'bg-black/80'}`}>
        <Link href="/" className="z-[10000]">
           {/* If logo is invisible, change src to a known working path */}
           <Image src='/logo-2.png' alt='Logo' width={80} height={40} />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {['Gallery', 'About', 'Blogs'].map((link) => (
            <Link key={link} href={`/${link.toLowerCase()}`} className="text-[10px] uppercase tracking-[0.2em] text-white hover:text-[#26ff00] cursor-pointer">
              {link}
            </Link>
          ))}
          <Link href='/contact' className="bg-white text-black px-6 py-3 uppercase font-black text-[10px] tracking-[0.2em]">Book Now</Link>
        </div>

        {/* Mobile Toggle - Force contrast */}
        <button 
          onClick={() => setMenuOpen(true)} 
          className="md:hidden text-[#26ff00] font-black uppercase text-[12px] z-[10000] p-4 border border-[#26ff00]"
        >
          MENU
        </button>
      </nav>

      {/* Mobile Full-Screen Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[20000] bg-black/95 backdrop-blur-sm overflow-y-auto"
          >
            <div className="relative min-h-screen w-full px-6 py-8 flex flex-col items-center justify-center gap-10 text-center">
              <button
                onClick={() => setMenuOpen(false)}
                className="absolute top-6 right-6 rounded-full border border-white/20 bg-white/10 px-4 py-3 text-sm font-black uppercase tracking-[0.2em] text-white hover:bg-white/20 transition"
              >
                Close
              </button>

              <div className="space-y-8">
                {['Gallery', 'About', 'Blogs', 'Book Now'].map((link) => (
                  <Link
                    key={link}
                    href={link === 'Book Now' ? '/contact' : `/${link.toLowerCase()}`}
                    onClick={() => setMenuOpen(false)}
                    className={`block text-4xl font-black uppercase transition-colors ${link === 'Book Now' ? 'text-black bg-white px-10 py-4 rounded-full' : 'text-white hover:text-[#26ff00]'}`}
                  >
                    {link}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}