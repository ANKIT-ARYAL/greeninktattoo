import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, MapPin } from 'lucide-react';
import Reveal from './Reveal'; // Adjusted path to your Reveal component

export default function Hero() {
  return (
    <section className="relative h-[100svh] w-full bg-[#050505] overflow-hidden flex flex-col lg:flex-row">
      
      {/* GLOBAL GRAIN OVERLAY - Subtle CSS background is faster than an image layer */}
      <div className="absolute inset-0 z-40 bg-grain pointer-events-none opacity-20" />

      {/* 1. CONTENT COLUMN */}
      <div className="relative z-30 h-full w-full lg:w-[58%] flex flex-col justify-center px-6 sm:px-12 lg:px-24 pt-32 lg:pt-40 pb-20 lg:pb-0">
        
        {/* MESH GRADIENT BACKDROP - Static CSS is better for performance */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent lg:bg-none" />
          <div className="absolute top-[10%] -left-[10%] w-[60%] h-[60%] bg-emerald-500/10 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-4xl space-y-10">
          <Reveal direction="right">
            <div className="flex items-center gap-3 bg-emerald-500/5 border border-emerald-500/10 w-fit px-5 py-2.5 rounded-full backdrop-blur-xl">
              <MapPin size={12} className="text-emerald-500" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-500/80">
                Thamel • Kathmandu
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <h1 className="text-6xl sm:text-7xl lg:text-[7.5rem] xl:text-[10rem] font-display font-bold uppercase italic leading-[0.8] tracking-tighter text-white">
              Ink That <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-white to-gray-400">
                Endures
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.4} direction="none">
            <div className="max-w-md">
              <p className="text-white lg:text-neutral-400 text-sm md:text-base leading-relaxed border-l border-emerald-500/30 pl-8 font-body">
                Anjit Tattoo merges ancestral soul with modern precision. Every line is a commitment to world-class artistry.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.6} direction="up">
            <div className="flex flex-wrap pt-6 gap-6">
              <Link 
                href="/contact" 
                className="group flex items-center gap-4 bg-emerald-500 text-black px-10 py-5 rounded-full font-black uppercase text-[11px] tracking-widest hover:bg-emerald-400 transition-all"
              >
                Book Now <ArrowUpRight size={18} className="group-hover:rotate-45 transition-transform" />
              </Link>
              <Link 
                href="/gallery" 
                className="group flex items-center gap-4 bg-white/5 border border-white/10 text-white px-10 py-5 rounded-full font-black uppercase text-[11px] tracking-widest hover:bg-white/10 transition-all"
              >
                View Work <ArrowUpRight size={18} className="group-hover:rotate-45 transition-transform" />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>

      {/* 2. THE IMAGE */}
      <div className="absolute lg:relative inset-0 lg:inset-auto h-full w-full lg:w-[42%] bg-neutral-900 overflow-hidden z-10 lg:z-20">
        <Image 
          src="/hero.jpg" 
          alt="Anjit Tattoo Studio"             
          className="w-full h-full object-cover grayscale-[30%] brightness-90 lg:brightness-100"
          fill
          priority // Extremely important for LCP speed
          sizes="(max-width: 1024px) 100vw, 42vw"
          quality={85} // Reduced from 100 to significantly decrease file size without visual loss
        />
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#050505] to-transparent z-10 hidden lg:block" />
      </div>     
    </section>
  );
}