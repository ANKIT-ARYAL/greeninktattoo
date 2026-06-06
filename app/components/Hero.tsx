'use client';
import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import Link from 'next/link';

export default function HeroReveal({ designs = [] }: { designs?: any[] }) {
  const controls = {
    header: useAnimation(),
    cta: useAnimation(),
  };

  // Sequence: Cards -> Header -> CTA
  const triggerReveal = async () => {
    await controls.header.start({ opacity: 1, y: 0 });
    await controls.cta.start({ opacity: 1, y: 0 });
  };

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center px-8 pt-20 pb-20">
      
      {/* 1. HEADER (Visual Top, Animates Second) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={controls.header}
        className="z-10 text-center mb-12"
      >
        <h1 className="text-6xl md:text-8xl font-header text-white uppercase tracking-wider">
          The Kind of Tattoo
        </h1>
        <p className="text-[#26ff00] uppercase tracking-[0.3em] font-bold">You won't regret.</p>
        <p className='text-neutral-500 py-5'>Exclusive tattoos by appointment only.</p>
      </motion.div>

      {/* 2. CARDS (Visual Middle, Animates First) */}
      <div className="z-20 flex items-center justify-center w-full gap-4 [perspective:2000px] mb-16">
        {designs?.slice(0, 7).map((design, i) => {
          const offset = i - 3;
          const isLast = i === designs.slice(0, 7).length - 1;

          return (
            <motion.div
              key={design.id}
              initial={{ opacity: 0, rotateY: offset * 10, z: Math.abs(offset) * -40, scale: 0.8 }}
              animate={{ opacity: 1, rotateY: offset * 10, z: Math.abs(offset) * -40, scale: 1 }}
              transition={{ delay: (3 - Math.abs(offset)) * 0.1, duration: 0.8 }}
              onAnimationComplete={() => isLast && triggerReveal()}
              className="w-[240px] h-[360px] rounded-[24px] overflow-hidden border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.8)] origin-center shrink-0"
            >
              <img src={design.imageUrl} className="w-full h-full object-cover" alt="Tattoo Design" />
            </motion.div>
          );
        })}
      </div>

      {/* 3. CTA (Visual Bottom, Animates Last) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={controls.cta}
        className="z-30 flex gap-6"
      >
        <Link href="/contact" className="bg-white text-black px-10 py-4 uppercase font-black hover:scale-105 transition-transform">
          Book Now
        </Link>
        <Link href="/gallery" className="bg-transparent text-white border border-white px-10 py-4 uppercase font-black hover:bg-white hover:text-black transition-all">
          Gallery
        </Link>
      </motion.div>
    </section>
  );
}