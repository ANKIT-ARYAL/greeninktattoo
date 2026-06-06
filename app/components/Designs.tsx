// components/Designs.tsx
import React from 'react';
import Link from 'next/link';
import GalleryClient from './GalleryClient';
import { ArrowRight, Sparkles } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import Reveal from './Reveal';

export const revalidate = 0;
export default async function Designs() {
  const designs = await prisma.tattooDesign.findMany({
    take: 6,
    orderBy: { createdAt: 'desc' },
    select: { id: true, title: true, imageUrl: true, category: true }
  });

  const serializedDesigns = JSON.parse(JSON.stringify(designs));

  return (
    // Reduced padding on mobile (py-20) vs desktop (py-32)
    <section className="py-20 md:py-32 bg-neutral-950">
      {/* - max-w-7xl limits width on huge screens
          - px-4 for small phones, px-8 for tablets, px-12+ for desktop
      */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 lg:px-20">
        
        <Reveal direction="up" className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-20 gap-8">
          <div className="space-y-3 md:space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="text-[#26ff00]" size={12} />
              <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-neutral-500">
                Portfolio
              </span>
            </div>
            {/* Fluid typography for the heading */}
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-display font-header text-white  uppercase tracking-widerer leading-none">
              Featured <span className="text-neutral-800">Work</span>
            </h2>
          </div>

          {/* Link width is full on mobile for better touch target, auto on desktop */}
          <Link 
            href="/gallery" 
            className="group w-full md:w-auto flex items-center justify-between md:justify-start gap-3 text-white hover:text-[#26ff00] transition-all font-black uppercase text-[10px] tracking-[0.3em] pb-3 border-b border-white/10"
          >
            Explore Full Gallery 
            <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </Reveal>

        {/* Container for the gallery to handle its own internal spacing.
            Make sure GalleryClient uses a responsive grid (e.g., grid-cols-1 md:grid-cols-2 lg:grid-cols-3)
        */}
        <div className="w-full">
          <GalleryClient designs={serializedDesigns} isFeatured={true} />
        </div>
      </div>
    </section>
  );
}