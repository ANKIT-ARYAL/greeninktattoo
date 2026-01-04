// app/page.tsx
import { Suspense } from 'react';
import Hero from './components/Hero';
import Designs from './components/Designs';
import BookingSection from './components/BookingSection';
import ReviewSlider from './components/Reviews';

export default function Page() {
  return (
    // overflow-x-hidden prevents unwanted horizontal scrolling on mobile
    <main className="min-h-screen bg-neutral-950 text-white overflow-x-hidden">
      <Hero />
      
      {/* Standardizing padding-x ensures consistent alignment 
         across all sections as the screen grows.
      */}
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-24">
        <Suspense fallback={<LoadingState />}>
          <Designs />
        </Suspense>

        <BookingSection />

        <Suspense fallback={<div className="h-40" />}>
          <ReviewSlider />
        </Suspense>
      </div>
    </main>
  );
}

function LoadingState() {
  return (
    <div className="h-96 flex items-center justify-center text-neutral-800 uppercase tracking-[0.5em] text-[8px] md:text-[10px]">
      Loading Portfolio...
    </div>
  );
}