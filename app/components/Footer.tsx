'use client';
import React from 'react';
import Link from 'next/link';
import { Phone, MapPin, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 pt-20 pb-12 px-6 md:px-24 ">
      <div className="max-w-[1920px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          
          {/* BRAND */}
          <div className="col-span-1 md:col-span-2 space-y-8">
            <Image 
               src='/logo.png' 
               alt='Green Ink Studio' 
               width={150} 
               height={75} 
               className="grayscale hover:grayscale-0 transition-all duration-500" 
            />
            <p className="text-neutral-500 text-[10px] uppercase tracking-[0.2em] max-w-xs leading-relaxed">
              Kathmandu’s premier destination for custom ink. Merging traditional discipline with modern artistic precision.
            </p>
          </div>

          {/* NAV */}
          <div className="space-y-6">
            <h4 className="text-[9px] font-black uppercase tracking-[0.4em] text-[#26ff00]">Navigation</h4>
            <ul className="space-y-4">
              {[
                { name: 'Home', path: '/' },
                { name: 'Gallery', path: '/gallery' },
                { name: 'About', path: '/about' },
                { name: 'Contact', path: '/contact' }
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.path} className="group flex items-center text-[10px] text-white hover:text-[#26ff00] uppercase tracking-[0.2em] transition-colors">
                    {link.name}
                    <ArrowUpRight size={10} className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT */}
          <div className="space-y-6">
            <h4 className="text-[9px] font-black uppercase tracking-[0.4em] text-[#26ff00]">Studio</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3 text-[10px] text-white uppercase tracking-[0.2em]">
                <MapPin size={12} className="text-[#26ff00] shrink-0 mt-0.5" />
                Thamel, Kathmandu
              </div>
              <a href="https://wa.me/9779840015954" target="_blank" rel="noreferrer noopener" className="flex items-center gap-3 text-[10px] text-white hover:text-[#26ff00] transition-colors uppercase tracking-[0.2em]">
                <Phone size={12} className="text-[#26ff00] shrink-0" />
                WhatsApp: +977 9840015954
              </a>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between gap-6 text-[9px] font-black uppercase tracking-[0.3em] text-neutral-600">
          <p>© {currentYear} Green Ink Tattoo. Kathmandu.</p>
          <p>Precision Engineering</p>
        </div>
      </div>
    </footer>
  );
};