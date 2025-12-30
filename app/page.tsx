'use client';

import Hero from './components/Hero';
import Designs from './components/Designs';
import BookingSection from './components/BookingSection';

export default function Page() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      {/* Hero Section */}
      <Hero />
      {/* Featured Works */}
      <Designs />

      {/* CTA / Booking Section */}
      <BookingSection />
    </div>
  );
}