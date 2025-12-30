'use client';
import React, { useState } from 'react';

import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const links = [
    { name: 'Home', path: '/' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Book Now', path: '/contact' },
    { name: 'About', path: '/about' }
  ];

  return (
    <nav className="fixed w-full z-50 bg-brand-black/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className=" flex items-center gap-2">
            <Link href="/" className="text-2xl font-display font-bold tracking-wider text-white uppercase">
             <Image src='/logo.png' alt='Anjit Tattoo Logo' width={150} height={50} className='invert' priority/>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  className={'px-3 py-2 text-sm font-medium tracking-wide text-gray-200 hover:text-gray-300 hover:scale-105 transition-all duration-200'}>
                  {link.name}
                </Link>
              ))}                             
            </div>
          </div>
          
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-neutral-900 border-b border-white/10">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                onClick={() => setIsOpen(false)}
                className={'block px-3 py-2 rounded-md text-base font-medium text-white'}>
                {link.name}
              </Link>
            ))}             
          </div>
        </div>
      )}
    </nav>
  );
};