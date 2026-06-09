'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface Design {
  id: string;
  title: string;
  imageUrl: string;
  category: string;
}

export default function OnTheBoard({
  works = [],
}: {
  works?: Design[];
}) {
  const displayWorks = works.slice(0, 10);
  const showViewMore = works.length > 10;

  if (!displayWorks.length) return null;

  // duplicate for infinite loop illusion
  const looped = [...displayWorks, ...displayWorks];

  return (
    <section className="text-white py-24 px-8 md:px-24 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">

        {/* HEADER (matches AboutSection style) */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-4">
            <h2 className="text-7xl font-blackops tracking-wider">
              On The Board
            </h2>

            <p className="text-neutral-400 text-lg max-w-md">
              Selected work showcase — built with precision, motion, and intent.
            </p>
          </div>
        <Link href='/gallery' className="border border-white/30 text-black px-12 py-4 text-xl bg-[#32CD32] font-blackops hover:bg-emerald-500 transition-all rounded-full treacking-widest">
        View More
        </Link>          
        </div>

        {/* FULL WIDTH SLIDER */}
        <div className="relative overflow-hidden w-full">
          <motion.div
            className="flex gap-8 w-max"
            animate={{
              x: ['0%', '-50%'],
            }}
            transition={{
              duration: 25,
              ease: 'linear',
              repeat: Infinity,
            }}
          >
            {looped.map((work, index) => (
              <TiltCard key={`${work.id}-${index}`} work={work} />
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}

function TiltCard({ work }: { work: any }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-200, 200], [15, -15]);
  const rotateY = useTransform(x, [-200, 200], [-15, 15]);

  const rX = useSpring(rotateX, { damping: 20 });
  const rY = useSpring(rotateY, { damping: 20 });

  return (
    <motion.div
      className="min-w-[320px] aspect-[3/4] bg-[#e7e5dc] relative overflow-hidden border border-white/10"
      style={{
        rotateX: rX,
        rotateY: rY,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - rect.left - rect.width / 2);
        y.set(e.clientY - rect.top - rect.height / 2);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {/* FULL CLICKABLE LAYER (fixes your bug) */}
      <Link href="/gallery" className="absolute inset-0 z-20" />

      <Image
        src={work.imageUrl}
        alt={work.title}
        fill
        className="object-cover transition-transform duration-700 hover:scale-110"
      />

      <div className="absolute inset-0 opacity-0 hover:opacity-100 transition flex flex-col justify-end p-6">
        <span className="text-[10px] uppercase tracking-[0.3em] text-white">
          {work.category}
        </span>
        <h3 className="text-lg font-bold text-white">
          {work.title}
        </h3>
      </div>
    </motion.div>
  );
}