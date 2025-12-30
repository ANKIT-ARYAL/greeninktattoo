'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Loader2 } from 'lucide-react';

// Define the shape of your design data
interface Design {
  id: string;
  title: string;
  imageUrl: string;
  category: string;
}

export default function Designs() {
  const [designs, setDesigns] = useState<Design[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDesigns = async () => {
      try {
        const res = await fetch('/api/designs');
        const data = await res.json();
        // Assuming your API returns an array, or take the first 3 for "Featured"
        if (Array.isArray(data)) {
          setDesigns(data.slice(0, 3)); 
        }
      } catch (err) {
        console.error("Failed to fetch designs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDesigns();
  }, []);

  return (
    <div>
      <section className="py-24 bg-neutral-950">
        <div className="sm:px-6 md:px-20">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-display font-bold text-white mb-2 italic uppercase tracking-tighter">Featured Work</h2>
              <p className="text-gray-500 font-medium">Selected masterpieces from our studio</p>
            </div>
            <Link href="/gallery" className="hidden md:flex items-center gap-2 text-white hover:text-emerald-500 transition-all group font-bold uppercase text-xs tracking-widest">
              View Full Gallery <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {loading ? (
              // Skeleton Loader State
              [...Array(3)].map((_, i) => (
                <div key={i} className="aspect-[4/5] rounded-2xl bg-neutral-900 animate-pulse border border-white/5" />
              ))
            ) : designs.length > 0 ? (
              designs.map((design) => (
                <div key={design.id} className="group relative overflow-hidden rounded-2xl aspect-[4/5] bg-neutral-900 border border-white/5">
                  <img 
                    src={design.imageUrl} 
                    alt={design.title} 
                    className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                    <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em] mb-2">{design.category}</span>
                    <h3 className="text-2xl font-display font-bold text-white uppercase italic tracking-tighter">{design.title}</h3>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-20 text-center border border-dashed border-white/10 rounded-3xl">
                <p className="text-neutral-600 italic">No artwork to display at the moment.</p>
              </div>
            )}
          </div>
          
          <div className="mt-12 text-center md:hidden">
            <Link href="/gallery" className="inline-flex items-center gap-2 text-white bg-neutral-900 px-8 py-4 rounded-full font-bold uppercase text-xs tracking-widest border border-white/5">
              View All Works <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}