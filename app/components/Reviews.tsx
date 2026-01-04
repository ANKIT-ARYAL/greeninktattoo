'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Star, CheckCircle } from 'lucide-react';

const REVIEWS = [
  {
    id: 1,
    name: "Andrew Warren",
    role: "Verified Client",
    text: "I had an amazing experience getting a tattoo from Anjit! He’s incredibly talented, with great attention to detail and a real passion for his work. The design turned out even better than I imagined, and the whole process was smooth and comfortable.",
  },
  {
    id: 2,
    name: "Ajaya Karki",
    role: "Local Guide",
    text: "Loved the work that he did. It was amazing beyond what I had imagined. This was my second visit to ANJIT TATTOO. I am amazed at the work that they do... They are very professional.",
  },
  {
    id: 3,
    name: "Filip Mitricevic",
    role: "Verified Client",
    text: "I had the best tattooing experience of my life so far with Anjit. I am thrilled with the design and the finished product. But I've never been to a studio that dedicates so much attention to the process and hygiene.",
  },
  {
    id: 4,
    name: "Monika J. Vaidya",
    role: "Customer",
    text: "I had a fantastic experience at ANJIT TATTOO. The studio is clean, and the staff are professional and friendly. ANJIT ji did an amazing job on my tattoo. Highly recommend!",
  }
];

export default function ReviewSlider() {
  const [index, setIndex] = useState(0);

  const nextReview = useCallback(() => {
    setIndex((prev) => (prev + 1 >= REVIEWS.length ? 0 : prev + 1));
  }, []);

  const prevReview = () => {
    setIndex((prev) => (prev - 1 < 0 ? REVIEWS.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(nextReview, 6000);
    return () => clearInterval(timer);
  }, [nextReview]);

  // Safety Guard for Next.js 16/Turbopack
  if (!REVIEWS[index]) return null;

  return (
    <section className="relative py-24 overflow-hidden">
      {/* BACKGROUND: Emerald Mesh & Gradient */}
      <div className="absolute inset-0 bg-[#050505] z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.08),transparent_70%)] z-0" />
      
      <motion.div 
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 blur-[120px] rounded-full z-0"
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-6xl font-display font-bold text-white uppercase italic mb-12">
          The <span className="text-emerald-500">Reviews</span>
        </h2>

        <div className="relative min-h-[300px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full flex flex-col items-center"
            >
              <Quote className="text-emerald-500/20 mb-6" size={40} />
              <p className="text-lg md:text-xl text-neutral-300 italic leading-relaxed max-w-2xl mb-8">
                "{REVIEWS[index].text}"
              </p>
              
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-2 text-white font-bold uppercase tracking-widest text-xs">
                  {REVIEWS[index].name} <CheckCircle size={14} className="text-emerald-500" />
                </div>
                <span className="text-neutral-500 text-[9px] uppercase tracking-[0.3em] mt-1">{REVIEWS[index].role}</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Custom Progress Dots */}
        <div className="flex justify-center gap-2 mt-12">
          {REVIEWS.map((_, i) => (
            <div 
              key={i} 
              className={`h-1 transition-all duration-500 rounded-full ${i === index ? 'w-8 bg-emerald-500' : 'w-2 bg-white/10'}`} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}