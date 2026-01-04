'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight, MapPin } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative h-[100svh] w-full bg-[#050505] overflow-hidden flex flex-col lg:flex-row">
      
      {/* GLOBAL GRAIN OVERLAY */}
      <div className="absolute inset-0 z-40 bg-grain pointer-events-none" />

      {/* 1. CONTENT COLUMN */}
      <div className="relative z-30 h-full w-full lg:w-[58%] flex flex-col justify-center px-6 sm:px-12 lg:px-24 pt-32 lg:pt-40 pb-20 lg:pb-0 overflow-hidden">
        
        {/* MESH GRADIENT BACKDROP */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* This gradient ensures text legibility on mobile by darkening ONLY the text area, not the whole image */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent lg:bg-none" />
          <div className="absolute top-[10%] -left-[10%] w-[60%] h-[60%] bg-emerald-500/10 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
        </div>

        <div className="relative z-10 max-w-4xl space-y-10">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 bg-emerald-500/5 border border-emerald-500/10 w-fit px-5 py-2.5 rounded-full backdrop-blur-xl"
          >
            <MapPin size={12} className="text-emerald-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-500/80">
              Thamel • Kathmandu
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-6xl sm:text-7xl lg:text-[7.5rem] xl:text-[10rem] font-display font-bold uppercase italic leading-[0.8] tracking-tighter text-white">
              Ink That <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-white to-gray-300">
                Endures
              </span>
            </h1>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="max-w-md"
          >
            <p className="text-white lg:text-neutral-400 text-sm md:text-base leading-relaxed border-l border-emerald-500/30 pl-8 font-body drop-shadow-lg">
              Anjit Tattoo merges ancestral soul with modern precision. Every line is a commitment to world-class artistry.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex pt-6 gap-x-10"
          >
            <Link 
              href="/contact" 
              className="group flex items-center gap-4 bg-emerald-500 text-black px-10 py-5 rounded-full font-black uppercase text-[11px] tracking-widest hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-500/20"
            >
              Book a Date <ArrowUpRight size={18} className="group-hover:rotate-45 transition-transform" />
            </Link>
            <Link 
              href="/gallery" 
              className="group flex items-center gap-4 bg-white text-black px-10 py-5 rounded-full font-black uppercase text-[11px] tracking-widest hover:bg-gray-300 transition-all shadow-xl shadow-emerald-500/20"
            >
              View Work <ArrowUpRight size={18} className="group-hover:rotate-45 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* 2. THE IMAGE: Same opacity for both mobile and desktop */}
      <div className="absolute lg:relative inset-0 lg:inset-auto h-full w-full lg:w-[42%] bg-neutral-900 overflow-hidden z-10 lg:z-20">
        <Image 
          src="/hero.jpg" 
          alt="Anjit Tattoo Studio Art"             
          className="w-full h-full object-cover grayscale-[30%] brightness-90 lg:brightness-100 transition-all duration-1000 ease-in-out scale-105"
          fill
          priority 
          quality={100}
        />
        
        {/* Desktop-only side blend */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#050505] to-transparent z-10 hidden lg:block" />
        
        {/* Artistic Vignette - Subtle enough to keep the image clear */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 z-10" />
      </div>     
    </section>
  );
}