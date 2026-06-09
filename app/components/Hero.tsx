'use client';
import { motion, useAnimation } from 'framer-motion';
import Link from 'next/link';

export default function HeroReveal() {
  const controls = {
    content: useAnimation(),
  };

  const triggerReveal = async () => {
    await controls.content.start({ opacity: 1, y: 0 });
  };

  return (
    // Changed justify-center to justify-end to anchor content to the bottom
    <section className="relative w-full min-h-screen flex items-end justify-start p-8 md:p-16">
      
      {/* BACKGROUND VIDEO */}
      <div className="absolute inset-0 z-0">
        <video
          src="/hero.mp4"
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={() => triggerReveal()}
          className="w-full h-full object-cover"
        />
        {/* Darker overlay for bottom-left text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      </div>

      {/* CONTENT (Bottom Left) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={controls.content}
        className="relative z-10 flex flex-col items-start text-left w-full max-w-4xl"
      >
        <h1 
          className="text-6xl md:text-7xl text-white uppercase mb-6 leading-none font-bold font-blackops"
        >
          Art Beyond <span className='text-white'>The Surface</span>
        </h1>
        
        <p className="text-white uppercase font-medium mb-10 opacity-80 text-lg max-w-2xl font-allura">
          More than ink on skin. Each piece is a unique expression of identity, passion, and individuality. 
        </p>

        <div className="flex gap-6">
          <Link href="/contact" className="border border-white/30 px-12 py-4 uppercase font-bold tracking-widest font-blackops text-white hover:bg-white hover:text-black transition-all rounded-full text-lg">
            Book Now
          </Link>
          <Link href="/gallery" className="border border-white/30 text-black px-12 py-4 uppercase font-bold bg-[#32CD32] tracking-widest font-blackops hover:bg-emerald-500 hover:text-black transition-all rounded-full text-lg">
            Gallery
          </Link>
        </div>
      </motion.div>
    </section>
  );
}