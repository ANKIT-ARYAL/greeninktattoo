'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Home, Image as ImageIcon, User, Instagram, BookOpen } from 'lucide-react';

export const Navbar = () => {
  const pathname = usePathname();

  const navLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Gallery', path: '/gallery', icon: ImageIcon },
    { name: 'About', path: '/about', icon: User },
    { name: 'Blogs', path: '/blogs', icon: BookOpen },
  ];

  return (
    <>
      {/* --- DESKTOP: GHOST NAVBAR --- */}
      <nav className="hidden lg:block absolute top-0 left-0 right-0 z-[100] pt-10">
        <div className="max-w-[1440px] mx-auto px-12 flex items-center justify-between">
          
          <div className="flex items-center">
            <Link href="/" className="relative transition-transform duration-500 hover:scale-110 active:scale-95">
              <Image 
                src='/logo.png' 
                alt='Anjit Tattoo' 
                width={200} 
                height={200} 
                className="invert brightness-200 object-contain drop-shadow-[0_0_15px_rgba(0,0,0,0.5)]" 
                priority
              />
            </Link>
          </div>

          <div className="flex items-center gap-16">
            <div className="flex items-center gap-12">
              {navLinks.map((link) => {
                const isActive = pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    href={link.path}                    
                    className={`group relative text-[18px] font-thin uppercase tracking-widest transition-all duration-300 ${
                      isActive ? 'text-emerald-500' : 'text-white hover:text-emerald-500/80'
                    }`}
                  >
                    {link.name}
                    <span className={`absolute -bottom-2 left-0 h-[1.5px] bg-emerald-500 transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                  </Link>
                );
              })}
            </div>

            <div className="flex items-center gap-8 pl-12 border-l border-white/10">
              <a href="https://instagram.com/anjit_tattoo" target="_blank" className="text-white hover:text-emerald-500 transition-colors">
                <Instagram size={24} strokeWidth={1.5} />
              </a>
              <Link 
                href="/contact"
                className="relative text-[12px] font-black uppercase tracking-widest text-black bg-emerald-500 px-6 py-3 rounded-full hover:bg-emerald-600 transition-all hover:scale-105"
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* --- MOBILE: TOP BAR --- */}
      <nav className="lg:hidden fixed top-0 left-0 right-0 z-[100] px-6 py-4 flex items-center justify-between pointer-events-none">
        <Link href="/" className="pointer-events-auto">
          <Image 
            src='/logo.png' 
            alt='Anjit Tattoo' 
            width={150} 
            height={150} 
            className="invert brightness-200 object-contain" 
          />
        </Link>
        
        {/* Mobile Actions: Instagram + Book Now Button */}
        <div className="flex items-center gap-4 pointer-events-auto">
          <a href="https://instagram.com/anjit_tattoo" className="text-white p-2">
            <Instagram size={22} />
          </a>
          <Link 
            href="/contact"
            className="text-[10px] font-black uppercase tracking-widest text-black bg-emerald-500 px-5 py-2.5 rounded-full active:scale-95 transition-transform"
          >
            Book Now
          </Link>
        </div>
      </nav>

      {/* --- MOBILE: PERMANENT LABELS DOCK --- */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-[100]">
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black via-black/90 to-transparent pointer-events-none" />
        
        <div className="relative px-4 pb-8 flex justify-between items-center w-full max-w-md mx-auto">
          {navLinks.map((link) => {
            const isActive = pathname === link.path;
            const Icon = link.icon;

            return (
              <Link 
                key={link.path} 
                href={link.path}
                className={`flex-1 transition-all active:scale-75 ${isActive ? 'text-emerald-500' : 'text-white'}`}
              >
                <div className="flex flex-col items-center gap-1.5">
                   <Icon size={18} strokeWidth={isActive ? 2.5 : 2} className="transition-all duration-300" />
                   <span className="text-[8px] font-black uppercase tracking-widest text-center">
                      {link.name}
                   </span>
                   {isActive && (
                      <div className="w-1 h-1 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                   )}
                </div>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
};