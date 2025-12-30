import Hero from './components/Hero';
import Designs from './components/Designs';
import BookingSection from './components/BookingSection';
import ReviewSlider from './components/Reviews';

export default function Page() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      {/* Hero Section */}
      <Hero />
      {/* Featured Works */}
      <Designs />

      {/* CTA / Booking Section */}
      <BookingSection />

      {/* Review Section */}
      <ReviewSlider />
    </div>
  );
}