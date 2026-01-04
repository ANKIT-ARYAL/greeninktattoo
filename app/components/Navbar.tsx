'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Home, Image as ImageIcon, Calendar, User, Instagram } from 'lucide-react';

export const Navbar = () => {
  const pathname = usePathname();

  const navLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Gallery', path: '/gallery', icon: ImageIcon },
    { name: 'Book', path: '/contact', icon: Calendar },
    { name: 'About', path: '/about', icon: User },
    { name: 'Blogs', path: '/blogs', icon: ImageIcon },
  ];

  return (
    <>
      {/* --- TOP BAR (Desktop & Mobile Logo) --- */}
      <nav className="fixed top-0 left-0 right-0 z-[100] bg-black/60 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-12">
          <div className="flex items-center justify-between h-16 md:h-24">
            
            {/* Logo Section - Scaled for mobile */}
            <div className="flex items-center">
              <Link href="/" className="relative hover:scale-105 transition-transform duration-300">
                <Image 
                  src='/logo.png' 
                  alt='Anjit Tattoo Logo' 
                  width={150} 
                  height={150} 
                  className='invert brightness-200' 
                  priority
                />
              </Link>
            </div>

            {/* Desktop-Only Links */}
            <div className="hidden md:flex items-center space-x-10">
              {navLinks.map((link) => {
                const isActive = pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    href={link.path}
                    className={`text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-300 hover:text-emerald-500 ${
                      isActive ? 'text-emerald-500' : 'text-neutral-400'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <a 
                href="https://instagram.com/anjit_tattoo" 
                target="_blank" 
                className="text-neutral-400 hover:text-white transition-colors"
              >
                <Instagram size={18} />
              </a>
            </div>

            {/* Mobile-Only Instagram */}
            <div className="md:hidden">
              <a href="https://instagram.com/anjittattoo" className="text-white p-2">
                <Instagram size={20} strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* --- MOBILE BOTTOM NAV --- */}
      <nav className="fixed bottom-0 left-0 right-0 z-[100] md:hidden">
        {/* Shadow Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/95 to-transparent -top-10 pointer-events-none" />
        
        {/* Adjusted padding for safe area insets on mobile devices (pb-6) */}
        <div className="relative bg-black/80 backdrop-blur-3xl border-t border-white/10 px-4 sm:px-8 pt-3 pb-6">
          <div className="flex justify-between items-center max-w-md mx-auto">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              const Icon = link.icon;

              return (
                <Link 
                  key={link.path} 
                  href={link.path}
                  className="flex flex-col items-center gap-1 transition-all active:scale-90 flex-1"
                >
                  <div className={`relative p-2 rounded-xl transition-all duration-500 ${
                    isActive 
                      ? 'bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.3)]' 
                      : 'text-neutral-500'
                  }`}>
                    <Icon size={18} strokeWidth={isActive ? 2.5 : 1.5} />
                    {isActive && (
                      <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-white rounded-full border border-emerald-500" />
                    )}
                  </div>
                  <span className={`text-[7px] font-black uppercase tracking-wider transition-colors duration-300 ${
                    isActive ? 'text-emerald-500' : 'text-neutral-600'
                  }`}>
                    {link.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </>
  );
};