'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Star, CheckCircle } from 'lucide-react';

const REVIEWS = [
  {
    id: 1,
    name: "Sandeep Sharma",
    role: "Full Sleeve Client",
    text: "The attention to detail at Anjit Tattoo is unmatched in Kathmandu. I came in with a rough idea, and they transformed it into a masterpiece. Impeccable hygiene and world-class skill.",
    rating: 5
  },
  {
    id: 2,
    name: "Maya Jenkins",
    role: "Minimalist Ink",
    text: "Found this studio while traveling through Thamel. The artist was so patient and professional. The fine-line work is incredibly sharp and healed perfectly. Highly recommend!",
    rating: 5
  },
  {
    id: 3,
    name: "Rohan Batra",
    role: "Cover-up Project",
    text: "I was nervous about a cover-up, but the result exceeded my expectations. You can't even tell there was an old tattoo there. Truly the best custom artists in Nepal.",
    rating: 5
  }
];

export default function ReviewSlider() {
  const [index, setIndex] = useState(0);

  const nextReview = () => setIndex((prev) => (prev + 1) % REVIEWS.length);
  const prevReview = () => setIndex((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length);

  const slideVariants: Variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -100 : 100,
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.4 }
    })
  };

  return (
    <section className="py-32 bg-neutral-950 border-t border-white/5 relative overflow-hidden">
      {/* Decorative Quote Mark in BG */}
      <div className="absolute top-10 left-10 text-white/5 select-none pointer-events-none">
        <Quote size={300} strokeWidth={0.5} />
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16 space-y-4">
          <div className="flex justify-center items-center gap-1 text-emerald-500 mb-2">
            {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white uppercase italic tracking-tighter">
            Client <span className="text-neutral-800">Voices</span>
          </h2>
        </div>

        <div className="relative min-h-[350px] flex items-center justify-center">
          <AnimatePresence initial={false} custom={index}>
            <motion.div
              key={REVIEWS[index].id}
              custom={index}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute w-full flex flex-col items-center text-center"
            >
              <p className="text-xl md:text-3xl text-neutral-200 font-medium leading-relaxed mb-10 italic">
                "{REVIEWS[index].text}"
              </p>
              
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-white font-bold uppercase tracking-widest text-sm">
                    {REVIEWS[index].name}
                  </span>
                  <CheckCircle size={14} className="text-emerald-500" />
                </div>
                <span className="text-emerald-500 text-[10px] font-black uppercase tracking-[0.3em]">
                  {REVIEWS[index].role}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="absolute -bottom-12 md:bottom-auto md:inset-y-0 md:-left-20 md:-right-20 flex md:items-center justify-center md:justify-between gap-8 md:gap-0">
            <button 
              onClick={prevReview}
              className="p-4 rounded-full border border-white/10 text-white hover:bg-white hover:text-black transition-all group"
            >
              <ChevronLeft size={24} className="group-active:-translate-x-2 transition-transform" />
            </button>
            <button 
              onClick={nextReview}
              className="p-4 rounded-full border border-white/10 text-white hover:bg-white hover:text-black transition-all group"
            >
              <ChevronRight size={24} className="group-active:translate-x-2 transition-transform" />
            </button>
          </div>
        </div>

        {/* Progress Dots */}
        <div className="flex justify-center gap-3 mt-20">
          {REVIEWS.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-1 transition-all duration-500 rounded-full ${
                i === index ? 'w-12 bg-emerald-500' : 'w-4 bg-neutral-800 hover:bg-neutral-700'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}