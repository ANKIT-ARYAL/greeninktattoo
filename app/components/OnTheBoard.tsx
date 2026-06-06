// /Users/ankitaryal/green-ink-tattoo/app/components/OnTheBoard.tsx
'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function OnTheBoard({ works = [] }: { works?: any[] }) {
  const displayWorks = works.slice(0, 10);
  const showViewMore = works.length > 10;

  return (
    <section className="py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-8">
        <h2 className="text-7xl font-header uppercase text-white mb-20 text-center tracking-wider">
          On The Board
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {displayWorks.map((work, i) => (
            <motion.div
              key={work.id}
              initial={{ opacity: 0, rotate: i % 2 === 0 ? 3 : -3 }}
              whileInView={{ opacity: 1, rotate: i % 2 === 0 ? 2 : -2 }}
              viewport={{ once: true }}
              className="bg-[#e7e5dc] p-4 pb-16 shadow-xl relative"
              style={{ transformOrigin: 'top' }}
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-8 bg-white/40 rotate-1 mix-blend-overlay" />
              
              <img src={work.imageUrl} alt="Tattoo" className="w-full aspect-square object-cover" />
              <p className="mt-4 font-mono text-black text-sm">{work.date}</p>
              
              {work.note && (
                <div className="absolute -right-4 top-10 w-24 h-24 bg-yellow-200 p-2 rotate-6 text-[10px] text-black shadow-md font-bold">
                  {work.note}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {showViewMore && (
          <div className="mt-20 text-center">
            <Link 
              href="/gallery" 
              className="inline-block border border-white text-white px-12 py-4 uppercase tracking-[0.3em] font-black hover:bg-white hover:text-black transition-colors"
            >
              View More
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}