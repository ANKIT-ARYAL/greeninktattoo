'use client';
import React from 'react';
import AboutSection from '../components/AboutSection';

export default function AboutPage() {
  return (
    // Increased pt-48 to ensure it clears the 150px logo/navbar
    <div className="relative min-h-screen bg-neutral-950 pt-40 md:pt-48 lg:pt-56 pb-16 md:pb-24 overflow-hidden">
      <AboutSection />
    </div>
  );
}