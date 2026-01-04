import React from 'react';
import GalleryClient from '../components/GalleryClient';
import { Sparkles } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import Reveal from '../components/Reveal';

// Forces the page to fetch fresh data on every request
export const revalidate = 0; 

export default async function GalleryPage() {
  // 1. Fetch data
  const designs = await prisma.tattooDesign.findMany({
    orderBy: { createdAt: 'desc' }
  });

  // 2. Serialize
  const serializedDesigns = JSON.parse(JSON.stringify(designs));

  return (
    // Reduced pt-32 to pt-24 on mobile to reduce initial empty space
    <div className="min-h-screen bg-neutral-950 pt-24 md:pt-32 pb-16 md:pb-24 px-4 sm:px-8 md:px-12 lg:px-20 lg:pt-44">
      <div className="mx-auto">
        
        {/* ANIMATED HEADER */}
        <header className="text-center mb-10 md:mb-16">
          <Reveal direction="down">
            <div className="flex justify-center items-center gap-2 mb-3 md:mb-4">
              <Sparkles className="text-emerald-500 w-3.5 h-3.5 md:w-4 md:h-4" />
              <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-neutral-500">
                The Archive
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            {/* - text-5xl for small mobile
                - text-7xl for tablets
                - text-9xl for desktop
                - whitespace-pre-line or br helps control word breaks on narrow screens
            */}
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-bold text-white uppercase italic tracking-tighter leading-[0.9] md:leading-none">
              Art on <br className="block sm:hidden" /> 
              <span className="text-emerald-500">Skin</span>
            </h1>
          </Reveal>
        </header>

        {/* The min-height ensures no layout shift while data loads, 
            but we lower it slightly for mobile screens. 
        */}
        <div className="min-h-[400px] md:min-h-[600px]">
          <GalleryClient designs={serializedDesigns} />
        </div>

      </div>
    </div>
  );
}