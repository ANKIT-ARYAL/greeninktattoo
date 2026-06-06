'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const REVIEWS = [
  { name: "Niko Chelsea", text: "Sanjay is very professional and helped me creating all the artworks and ideas... Highly recommended." },
  { name: "Nabu Chaudhary", text: "Really amazing and talented artist ever seen highly recommended guys 🔥🔥🔥🔥🔥" },
  { name: "Kristina Balami", text: "Super talented artist. very good work. clean shop n excellent service." },
  { name: "Ashok Bahadur Thapa Magar", text: "Very friendly and high experience. I am very surprised to get and work with him." },
  { name: "Swornim Mandal", text: "Worth every rupee and highly recommend green ink whoever wants to exceed their expectations." },
  { name: "Prakrit Roka", text: "The living legend as a Tattoo Artist !! Mark my word, this guy is super duper dope." },
  { name: "Bibek Shrestha", text: "One art with lot of meaning which came out to be the finest! Highly recommended!" },
  { name: "punk skull", text: "Very great work at a reasonable price." }
];

export default function ReviewSlider() {
  const [index, setIndex] = useState(0);

  const nextReview = useCallback(() => {
    setIndex((prev) => (prev + 1 >= REVIEWS.length ? 0 : prev + 1));
  }, []);

  useEffect(() => {
    const timer = setInterval(nextReview, 6000);
    return () => clearInterval(timer);
  }, [nextReview]);

  return (
    <div className="w-full flex flex-col pt-12">
      {/* 3D Container with Perspective */}
      <div className="relative min-h-[250px] flex items-center overflow-visible" style={{ perspective: '1200px' }}>
        <AnimatePresence mode="popLayout">
          <motion.div
            key={index}
            // 3D Motion Logic: Entering from deep space, rotating from the X axis
            initial={{ opacity: 0, rotateX: -45, z: -300, y: 50 }}
            animate={{ opacity: 1, rotateX: 0, z: 0, y: 0 }}
            exit={{ opacity: 0, rotateX: 45, z: 300, y: -50 }}
            transition={{ 
              duration: 0.8, 
              ease: [0.16, 1, 0.3, 1] // Custom cubic-bezier for a more "physical" feel
            }}
            className="w-full space-y-6 origin-center"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <p className="text-white/90 text-2xl font-light leading-relaxed tracking-tight">
              "{REVIEWS[index].text}"
            </p>
            <div className="flex items-center gap-4">
              <div className="h-[2px] w-8 bg-[#26ff00]" />
              <span className="text-[10px] text-white font-black uppercase tracking-[0.3em]">
                {REVIEWS[index].name}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress Indicators */}
      <div className="flex gap-2 mt-8">
        {REVIEWS.map((_, i) => (
          <motion.div 
            key={i} 
            className="h-[2px] bg-white/20"
            animate={{ 
              width: i === index ? 40 : 16,
              backgroundColor: i === index ? '#26ff00' : 'rgba(255,255,255,0.2)'
            }}
            transition={{ duration: 0.4 }}
          />
        ))}
      </div>
    </div>
  );
}