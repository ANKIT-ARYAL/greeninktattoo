'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Expanded FAQ_DATA to match the 6 questions in your screenshot
const FAQ_DATA = [
  { q: "How do I book an appointment?", a: "Fill out the contact form on the booking page with your idea, placement, and preferred dates. I will get back to you with availability." },
  { q: "Do you require a deposit?", a: "Yes, a non-refundable deposit is required to secure your appointment date and time. This goes toward the final cost of the tattoo." },
  { q: "Can I see your designs before booking?", a: "Custom designs are usually revealed during the session or the day before, depending on the complexity of the piece." },
  { q: "Can I bring a friend to my session?", a: "To maintain a focused environment, please come alone. Exceptions can be made for medical needs—please discuss this during booking." },
  { q: "Do you take walk-ins?", a: "My studio is by appointment only to ensure I can give every client my full focus and preparation time." },
  { q: "How should I prepare for my appointment?", a: "Get a good night's sleep, eat a solid meal beforehand, and stay hydrated. Wear comfortable clothing that provides easy access to the tattoo area." }
];

export default function Faqs() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="w-full py-24">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header Section */}
        <div className="mb-16">
          <h2 className="text-6xl md:text-7xl font-header uppercase text-white mb-4">Frequently Asked Questions</h2>
          <p className="text-white/50">A few things you might want to know before booking.</p>
        </div>

        {/* Grid Layout (2 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {FAQ_DATA.map((item, i) => (
            <div key={i} className="flex flex-col">
              <motion.div 
                className="border border-white/20 rounded-full overflow-hidden"
                initial={false}
              >
                <button 
                  onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                  className="w-full flex justify-between items-center px-8 py-5 text-white hover:bg-white/5 transition-colors"
                >
                  <span className="text-sm uppercase tracking-wider">{item.q}</span>
                  <motion.span 
                    animate={{ rotate: activeIndex === i ? 45 : 0 }}
                    className="text-white text-xl"
                  >+</motion.span>
                </button>
              </motion.div>
              
              {/* Answer pill */}
              <AnimatePresence>
                {activeIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden px-8"
                  >
                    <p className="py-4 text-white/60 text-sm leading-relaxed">
                      {item.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}