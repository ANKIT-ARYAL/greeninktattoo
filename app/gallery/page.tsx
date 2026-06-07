import React, { Suspense } from 'react';
import GalleryClient from '../components/GalleryClient';
import { prisma } from '@/lib/prisma';
import StageWrapper from '../components/StageWrapper';

export const dynamic = 'force-dynamic';

async function getDesigns() {
  try {
    return await prisma.tattooDesign.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50
    });
  } catch (error) {
    console.error("Database fetch failed:", error);
    return [];
  }
}

export default async function GalleryPage() {
  const designs = await getDesigns();

  if (!designs || designs.length === 0) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#050505]">
        <p className="text-white/50 uppercase tracking-[0.3em] text-[10px]">No designs currently available.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen ">
      <StageWrapper>
        {/* REFINED HEADER: Integrated with your design system */}
        <header className="relative px-6 md:px-12 pt-32 pb-20 border-b border-white/10 flex flex-col items-center">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent pointer-events-none" />
          
          <h1 className="text-6xl md:text-9xl font-pirata  text-center text-white uppercase tracking-wider relative z-10">
            Portfolio
          </h1>
          <div className="mt-8 flex items-center gap-6">
            <span className="h-[1px] w-12 bg-[#26ff00]" />
            <p className="text-white/60 uppercase tracking-[0.3em] text-[10px] font-bold">
              {designs.length} Selected Works // {new Date().getFullYear()}
            </p>
          </div>
        </header>

        <section className="w-full">
          <Suspense fallback={<div className="h-screen w-full animate-pulse bg-neutral-900" />}>
            <GalleryClient designs={designs} />
          </Suspense>
        </section>
      </StageWrapper>
    </main>
  );
}