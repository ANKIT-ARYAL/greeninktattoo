'use client';
import React from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import Navbar from './Navbar'; 
import StaticReveal from './StaticReveal';
import { Sparkles } from 'lucide-react';

export default function AboutPage() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  
  return (
    <main className=" min-h-screen [perspective:1200px]">
      <Navbar transparent={true} />

      <section className="relative w-full h-screen border-b border-white/10 flex items-end p-6 md:p-24 overflow-hidden preserve-3d">
        <motion.div style={{ y: y1 }} className="absolute inset-0 z-0">
          <Image src="/winner.jpg" alt="Sanjay Balami" fill className="object-cover object-top opacity-50" priority />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/60 z-0" />
        
        <div className="relative z-10 max-w-5xl translate-z-[100px] mb-12">
          <h1 className="text-6xl md:text-9xl font-header uppercase tracking-wider text-white drop-shadow-2xl">
            SANJAY <br/><span className='mt-5'> BALAMI</span>
          </h1>
          <div className="mt-8 flex items-center gap-6">
            <span className="h-[1px] w-12 bg-[#26ff00]" />
            <p className="text-white/80 uppercase tracking-[0.3em] text-[10px] font-bold">
              Professional Tattoo Artist // Kathmandu
            </p>
          </div>
        </div>
      </section>

      {/* BIOGRAPHY SECTION: Now visible */}
      <section className="py-24 px-6 md:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 border border-white/10 preserve-3d">
          <article className="p-12 lg:p-24 border-b lg:border-b-0 lg:border-r border-white/10 ">
            <StaticReveal>
              <h2 className="flex items-center gap-3 text-7xl font-header uppercase tracking-wider mb-8">
                <Sparkles size={12} /> Expert Profile
              </h2>
              <div className="space-y-8 text-neutral-400 text-sm leading-relaxed max-w-md font-light">
                <p>With over a decade of technical practice, <strong>Sanjay Balami</strong> has defined the standard for high-contrast realism in Kathmandu.</p>
                <p>Specializing in complex custom designs, Sanjay operates on a principle of absolute precision.</p>
                <p className=" italic">"Precision is the only variable that matters."</p>
              </div>
            </StaticReveal>
          </article>
          <TiltGrid />
        </div>
      </section>
    </main>
  );
}

function TiltGrid() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-300, 300], [10, -10]);
  const rotateY = useTransform(x, [-300, 300], [-10, 10]);

  // 1. Define your unique images here
  const portfolioImages = [
    "/certificate.jpg",
    "/winner.jpg",
    "/winner2.jpg",
    "/winner3.jpg" // Replace with your actual file paths
  ];

  return (
    <motion.div 
      className="grid grid-cols-2 preserve-3d"
      onMouseMove={(e: any) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - rect.left - rect.width / 2);
        y.set(e.clientY - rect.top - rect.height / 2);
      }}
      style={{ rotateX: useSpring(rotateX), rotateY: useSpring(rotateY) }}
    >
      {/* 2. Map over the array of images instead of numbers */}
      {portfolioImages.map((src, i) => (
        <div key={i} className="relative aspect-square border border-white/5 overflow-hidden translate-z-[20px]">
          <Image 
            src={src} 
            alt={`Tattoo Work ${i + 1}`} 
            fill 
            className="object-cover hover:scale-110 transition-transform duration-500" 
          />
        </div>
      ))}
    </motion.div>
  );
}