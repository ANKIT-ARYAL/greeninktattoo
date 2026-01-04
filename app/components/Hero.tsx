import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, MapPin } from 'lucide-react';
import StaticReveal from './StaticReveal';

export default function Hero() {
  return (
    <section className="relative h-[100svh] w-full bg-[#050505] overflow-hidden flex flex-col lg:flex-row">
      <div className="absolute inset-0 z-40 bg-grain pointer-events-none opacity-20" />

      {/* 1. CONTENT COLUMN */}
      <div className="relative z-30 h-full w-full lg:w-[58%] flex flex-col justify-center px-6 sm:px-12 lg:px-24 pt-32 lg:pt-40 pb-20 lg:pb-0">
        
        {/* Optimized Backdrop: Using a simple div instead of complex blur filters for faster paint */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/50 to-transparent lg:bg-none" />
        </div>

        <div className="relative z-10 max-w-4xl space-y-8 md:space-y-10">
          <StaticReveal>
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 w-fit px-5 py-2.5 rounded-full">
              <MapPin size={12} className="text-emerald-500" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/80">
                Thamel • Kathmandu
              </span>
            </div>
          </StaticReveal>

          <StaticReveal delay="delay-1">
            <h1 className="text-6xl sm:text-7xl lg:text-[7.5rem] xl:text-[10rem] font-display font-bold uppercase italic leading-[0.8] tracking-tighter text-white">
              Ink That <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-white to-neutral-600">
                Endures
              </span>
            </h1>
          </StaticReveal>

          <StaticReveal delay="delay-2">
            <div className="max-w-md">
              <p className="text-white/90 lg:text-neutral-400 text-sm md:text-base leading-relaxed border-l border-emerald-500/50 pl-8 font-sans">
                Anjit Tattoo merges ancestral soul with modern precision. Every line is a commitment to world-class artistry.
              </p>
            </div>
          </StaticReveal>

          <StaticReveal delay="delay-3">
            <div className="flex flex-wrap pt-4 gap-6">
              <Link 
                href="/contact" 
                className="group flex items-center gap-4 bg-emerald-500 text-black px-10 py-5 rounded-full font-black uppercase text-[11px] tracking-widest hover:bg-emerald-400 transition-colors"
              >
                Book Now <ArrowUpRight size={18} className="group-hover:rotate-45 transition-transform" />
              </Link>
              <Link 
                href="/gallery" 
                className="group flex items-center gap-4 bg-white/5 border border-white/10 text-white px-10 py-5 rounded-full font-black uppercase text-[11px] tracking-widest hover:bg-white/10 transition-colors"
              >
                View Work <ArrowUpRight size={18} className="group-hover:rotate-45 transition-transform" />
              </Link>
            </div>
          </StaticReveal>
        </div>
      </div>

      {/* 2. THE IMAGE: Optimized for LCP */}
      <div className="absolute lg:relative inset-0 lg:inset-auto h-full w-full lg:w-[42%] bg-neutral-900 overflow-hidden z-10 lg:z-20">
<img 
    src="/hero-opt.avif" 
    alt="Anjit Tattoo Studio"             
    fetchPriority="high" // Critical for raw img tags
    className="w-full h-full object-cover grayscale-[30%] brightness-90 lg:brightness-100"
    style={{ 
      contentVisibility: 'auto', // Optimization for modern browsers
      aspectRatio: '16/9' 
    }}
  />
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#050505] to-transparent z-10 hidden lg:block" />
      </div>     
    </section>
  );
}