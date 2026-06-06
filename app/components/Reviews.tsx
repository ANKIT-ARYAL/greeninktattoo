'use client';
import React from 'react';
import { TestimonialsColumn } from '../components/ui/testimonials-columns-1';

const REVIEWS = [
  { text: "Sanjay is very professional and helped me creating all the artworks and ideas... Highly recommended.", image: "https://i.pravatar.cc/150?u=1", name: "Niko Chelsea", role: "Client" },
  { text: "Really amazing and talented artist ever seen highly recommended guys 🔥🔥🔥🔥🔥", image: "https://i.pravatar.cc/150?u=2", name: "Nabu Chaudhary", role: "Client" },
  { text: "Super talented artist. very good work. clean shop n excellent service.", image: "https://i.pravatar.cc/150?u=3", name: "Kristina Balami", role: "Client" },
  { text: "Very friendly and high experience. I am very surprised to get and work with him.", image: "https://i.pravatar.cc/150?u=4", name: "Ashok B. Thapa", role: "Client" },
  { text: "Worth every rupee and highly recommend green ink whoever wants to exceed expectations.", image: "https://i.pravatar.cc/150?u=5", name: "Swornim Mandal", role: "Client" },
  { text: "The living legend as a Tattoo Artist !! Mark my word, this guy is super duper dope.", image: "https://i.pravatar.cc/150?u=6", name: "Prakrit Roka", role: "Client" }
];

export default function ReviewSlider() {
  // Split data into 2 columns for the UI
  const col1 = REVIEWS.slice(0, 2);
  const col2 = REVIEWS.slice(2, 4);
  const col3 = REVIEWS.slice(4, 6);

  return (
    <section className=" py-20 overflow-hidden">
      <div className="container mx-auto px-6">
        
        {/* Masked Scroll Area */}
        <div className="flex justify-center gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[600px] overflow-hidden">
          <TestimonialsColumn testimonials={col1} duration={15} />
          <TestimonialsColumn testimonials={col2} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={col3} className="hidden md:block" duration={23} />
        </div>
      </div>
    </section>
  );
}