'use client';
import About from '../components/About';

export default function AboutPage() {
  return (
    // Increased pt-48 to ensure it clears the 150px logo/navbar
    <div className="relative min-h-screen bg-neutral-950 pb-16 md:pb-24 overflow-hidden">
      <About />
    </div>
  );
}