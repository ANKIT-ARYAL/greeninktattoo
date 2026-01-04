import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Facebook, Youtube, Mail, MapPin } from 'lucide-react';
import { FaTiktok } from 'react-icons/fa6';
import Reveal from './Reveal';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    // Added pb-32 on mobile to avoid clashing with the Mobile Bottom Nav
    <footer className="bg-black border-t border-white/5 pt-16 md:pt-24 pb-32 md:pb-12 px-6 md:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 mb-16 md:mb-20">
          
          {/* BRANDING COLUMN */}
          <div className="md:col-span-5 space-y-6 md:space-y-8">
            <Reveal direction="none">
              <Image 
                src="/logo.png" 
                alt="Anjit Tattoo Logo" 
                width={150} 
                height={150} 
                className="invert brightness-200 mb-6"
              />
              <p className="text-neutral-500 text-sm leading-relaxed max-w-sm">
                Kathmandu's premier destination for custom tattooing. 
                Merging traditional discipline with modern artistry 
                in the heart of Thamel.
              </p>
            </Reveal>

            <div className="flex gap-4">
              {[
                { icon: Instagram, href: 'https://instagram.com/anjit_tattoo' },
                { icon: Facebook, href: 'https://www.facebook.com/tattooanjit' },
                { icon: FaTiktok, href: 'https://www.tiktok.com/@anjit_tattoo' }
              ].map((social, i) => (
                <Reveal key={i} delay={i * 0.1} direction="up">
                  <a 
                    href={social.href} 
                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:border-emerald-500 transition-all duration-300"
                  >
                    <social.icon size={18} />
                  </a>
                </Reveal>
              ))}
            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="md:col-span-3 space-y-6">
            <h4 className="text-white text-[10px] font-black uppercase tracking-[0.4em]">Navigation</h4>
            <ul className="space-y-4">
              {['Home', 'Gallery', 'About', 'Contact'].map((item) => (
                <li key={item}>
                  <Link 
                    href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    className="text-neutral-500 hover:text-emerald-500 text-xs font-bold uppercase tracking-widest transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* STUDIO INFO */}
          <div className="md:col-span-4 space-y-6">
            <h4 className="text-white text-[10px] font-black uppercase tracking-[0.4em]">Visit Studio</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-4 text-neutral-500">
                <MapPin size={18} className="text-emerald-500 shrink-0" />
                <p className="text-xs font-medium leading-relaxed italic">
                  Bhagwati Bahal, Thamel,<br />
                  Kathmandu, Nepal
                </p>
              </div>
              <div className="flex items-center gap-4 text-neutral-500">
                <Mail size={18} className="text-emerald-500 shrink-0" />
                {/* Added truncate for long emails on mobile */}
                <p className="text-xs font-medium tracking-wide truncate">anjittattoo@gmail.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM COPYRIGHT */}
        <div className="pt-10 md:pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6 text-center md:text-left">
          <p className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.3em] text-neutral-700">
            © {currentYear} Anjit Tattoo Studio. All Rights Reserved.
          </p>
          <p className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.3em] text-neutral-800">
            Crafted with Precision in Nepal
          </p>
        </div>
      </div>
    </footer>
  );
};