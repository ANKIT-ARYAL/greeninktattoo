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
        <div className='flex flex-col items-center justify-center'>
        <Link href="/" className="z-[10000]">
           {/* If logo is invisible, change src to a known working path */}
           <Image src='/logo.png' alt='Logo' width={120} height={120} className="w-16 h-16 md:w-[120px] md:h-[120px]" />
        </Link>
        <p className="hidden md:block text-2xl font-pirata uppercase tracking-widest text-emerald-700 mt-3">
      Green Ink <span className='text-white'>Tattoo</span>
    </p>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {['Gallery', 'About', 'Blogs'].map((link) => (
            <Link key={link} href={`/${link.toLowerCase()}`} className="text-[14px] uppercase tracking-[0.2em] text-white hover:text-green-600 cursor-pointer hover:scale-110 transition-all font-allura">
              {link}
            </Link>
          ))}
          <Link href='/contact' className="bg-emerald-700 text-white px-6 py-3 uppercase font-allura font-bold text-[14px] tracking-[0.2em] hover:bg-emerald-500 hover:scale-110 transition-all">
            Book Now
          </Link>
        </div>

        {/* Mobile Toggle - Force contrast */}
        <button 
          onClick={() => setMenuOpen(true)} 
          className="md:hidden text-white absolute top-10 right-6 font-black uppercase text-[12px] z-[10000] p-4 border border-white"
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
            <div className="relative min-h-screen w-full px-6 py-8 flex flex-col items-center justify-center text-center">
              <button
                onClick={() => setMenuOpen(false)}
                className="absolute top-10 right-6  border border-white/20 bg-white/10 px-4 py-3 text-sm font-black uppercase tracking-[0.2em] text-white hover:bg-white/20 transition"
              >
                Close
              </button>

              <div className="space-y-8">
                {['Home', 'Gallery', 'About', 'Blogs', 'Book Now'].map((link) => (
                  <Link
                    key={link}
                    
                    href={link === 'Home' ? '/' : link === 'Book Now' ? '/contact' : `/${link.toLowerCase()}`}
                    onClick={() => setMenuOpen(false)}
                    className={`block text-xl font-black uppercase transition-all ${link === 'Book Now' ? 'text-black bg-white px-10 py-4 ' : 'text-white hover:text-gray-500 hover:scale-110 transition-all'}`}
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