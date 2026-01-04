// app/page.tsx
import { Suspense } from 'react';
import Hero from './components/Hero';
import BookingSection from './components/BookingSection';
import ReviewSlider from './components/Reviews';
import FeaturedSlider from './components/FeaturedSlider';
import { prisma } from '@/lib/prisma';

export default async function Page() {
  // Fetch only featured designs from the DB
  const featuredWork = await prisma.tattooDesign.findMany({
    where: { isFeatured: true },
    orderBy: { createdAt: 'desc' },
    take: 10, // Limit to top 10 for performance
  });

  return (
    <main className="min-h-screen bg-neutral-950 text-white overflow-x-hidden">
      <Hero />
      
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-24 py-20">
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-emerald-500 text-[10px] font-black uppercase tracking-[0.4em] mb-2 block">
              Curated Portfolio
            </span>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white uppercase italic tracking-tighter leading-tight">
              Featured <span className="text-neutral-800">Work</span>
            </h2>
          </div>
          <p className="text-neutral-500 text-[10px] font-black uppercase tracking-widest border-l border-white/10 pl-4 hidden md:block">
            Drag or Swipe <br /> to explore
          </p>
        </header>

        <Suspense fallback={<LoadingState />}>
          <FeaturedSlider designs={JSON.parse(JSON.stringify(featuredWork))} />
        </Suspense>
        
        <BookingSection showGlow={true}/>
        

        <Suspense fallback={<div className="h-40" />}>
          <ReviewSlider />
        </Suspense>
      </div>
    </main>
  );
}

function LoadingState() {
  return (
    <div className="h-[500px] flex items-center justify-center text-neutral-800 uppercase tracking-[0.5em] text-[8px] md:text-[10px]">
      Loading Featured Assets...
    </div>
  );
}