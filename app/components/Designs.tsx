import React from 'react';
import Link from 'next/link';
import GalleryClient from './GalleryClient';
import { ArrowRight, Sparkles } from 'lucide-react';
import { prisma } from '@/lib/prisma';

export default async function Designs() {
  const designs = await prisma.tattooDesign.findMany({
    take: 3,
    orderBy: { createdAt: 'desc' }
  });

  return (
    <section className="py-32 bg-neutral-950">
      <div className="max-w-7xl mx-auto px-6 md:px-20">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="text-emerald-500" size={14} />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-500">Portfolio</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-display font-bold text-white italic uppercase tracking-tighter">Featured <span className="text-neutral-800">Work</span></h2>
          </div>
          <Link href="/gallery" className="group flex items-center gap-3 text-white hover:text-emerald-500 transition-all font-black uppercase text-[10px] tracking-[0.3em] pb-2 border-b border-white/10">
            Explore Full Gallery <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

        <GalleryClient designs={JSON.parse(JSON.stringify(designs))} isFeatured={true} />
      </div>
    </section>
  );
}