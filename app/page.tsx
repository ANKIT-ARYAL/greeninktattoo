// app/page.tsx
import { Suspense } from 'react';
import Hero from './components/Hero';
import Designs from './components/Designs';
import BookingSection from './components/BookingSection';
import ReviewSlider from './components/Reviews';

export default function Page() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <Hero />
      
      {/* We wrap the components that fetch data in Suspense */}
      <Suspense fallback={<div className="h-96 flex items-center justify-center text-neutral-800 uppercase tracking-[0.5em] text-[10px]">Loading Portfolio...</div>}>
        <Designs />
      </Suspense>

      <BookingSection />

      <Suspense fallback={<div className="h-40" />}>
        <ReviewSlider />
      </Suspense>
    </div>
  );
}