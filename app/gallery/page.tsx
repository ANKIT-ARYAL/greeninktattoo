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
    <div className="min-h-screen bg-neutral-950 pt-32 pb-24 px-4 md:px-20">
      <div className="max-w-7xl mx-auto">
        
        {/* ANIMATED HEADER */}
        <header className="text-center mb-16">
          <Reveal direction="down">
            <div className="flex justify-center items-center gap-2 mb-4">
              <Sparkles className="text-emerald-500" size={16} />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-500">
                The Archive
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <h1 className="text-7xl md:text-9xl font-display font-bold text-white uppercase italic tracking-tighter leading-none">
              Art on <span className="text-gray-700">Skin</span>
            </h1>
          </Reveal>
        </header>

        {/* FIX: Removed <Reveal> from here. 
            GalleryClient already uses motion.div for individual items.
            Wrapping the whole grid often causes 'sticky' visibility issues.
        */}
        <div className="min-h-[600px]">
          <GalleryClient designs={serializedDesigns} />
        </div>

      </div>
    </div>
  );
}