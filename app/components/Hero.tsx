'use client';
import { motion, useAnimation } from 'framer-motion';
import Link from 'next/link';

export default function HeroReveal() {
  const controls = {
    content: useAnimation(),
  };

  // Triggers the text/CTA reveal after the video component mounts
  const triggerReveal = async () => {
    await controls.content.start({ opacity: 1, y: 0 });
  };

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-end p-8 md:p-16">
      
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
        {/* Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* CONTENT (Bottom Left) */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={controls.content}
        className="relative z-10 flex flex-col items-start w-full max-w-2xl"
      >
        <h1 className="text-6xl md:text-8xl font-header text-white uppercase tracking-wider mb-2">
          The Kind of Tattoo
        </h1>
        <p className="text-white uppercase tracking-[0.3em] font-bold mb-4">You won't regret.</p>
        <p className='text-neutral-300 mb-8'>Exclusive tattoos by appointment. Walk-ins welcome too.</p>

        <div className="flex gap-6">
          <Link href="/contact" className="bg-white text-black px-10 py-4 uppercase font-black hover:scale-105 transition-all">
            Book Now
          </Link>
          <Link href="/gallery" className="bg-transparent text-white border border-white px-10 py-4 uppercase font-black hover:scale-105 transition-all">
            Gallery
          </Link>
        </div>
      </motion.div>
    </section>
  );
}