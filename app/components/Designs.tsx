'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { ArrowRight, Sparkles, Loader2 } from 'lucide-react';

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
        // Fetching from your API route
        const res = await fetch('/api/designs');
        const data = await res.json();
        
        if (Array.isArray(data)) {
          // Taking only the first 3 for the "Featured" section
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

  // Animation Variants with explicit Types to fix the 'ease' error
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.22, 1, 0.36, 1] // Custom cubic-bezier for a "boutique" feel
      }
    },
  };

  return (
    <section className="py-32 bg-neutral-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-20">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="text-emerald-500" size={14} />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-500">Portfolio</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-display font-bold text-white italic uppercase tracking-tighter leading-none">
              Featured <span className="text-neutral-800">Work</span>
            </h2>
            <p className="text-neutral-500 font-medium max-w-sm">
              A curated selection of custom pieces designed and inked at our Thamel studio.
            </p>
          </div>
          
          <Link 
            href="/gallery" 
            className="group flex items-center gap-3 text-white hover:text-emerald-500 transition-all font-black uppercase text-[10px] tracking-[0.3em] pb-2 border-b border-white/10 hover:border-emerald-500"
          >
            Explore Full Gallery 
            <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </motion.div>

        {/* Designs Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="aspect-[3/4] rounded-[2rem] bg-neutral-900 animate-pulse border border-white/5 flex items-center justify-center">
                <Loader2 className="animate-spin text-neutral-800" size={24} />
              </div>
            ))}
          </div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-10"
          >
            {designs.length > 0 ? (
              designs.map((design) => (
                <motion.div 
                  key={design.id} 
                  variants={cardVariants}
                  className="group relative overflow-hidden rounded-[2.5rem] aspect-[3/4] bg-neutral-900 border border-white/5"
                >
                  {/* FULL COLOR IMAGE */}
                  <img 
                    src={design.imageUrl} 
                    alt={design.title} 
                    className="w-full h-full object-cover transition duration-[1.5s] group-hover:scale-110"
                  />
                  
                  {/* Subtle Gradient Overlay (Always visible at bottom for text readability) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-700" />

                  {/* Text Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-10 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="text-[9px] font-black text-emerald-500 uppercase tracking-[0.4em] mb-2 block overflow-hidden">
                      <motion.span
                        initial={{ y: "100%" }}
                        whileInView={{ y: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        {design.category}
                      </motion.span>
                    </span>
                    <h3 className="text-3xl font-display font-bold text-white uppercase italic tracking-tighter leading-tight">
                      {design.title}
                    </h3>
                    
                    {/* View Project Link - Only shows on hover */}
                    <div className="mt-4 pt-4 border-t border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <span className="text-[10px] font-bold text-white uppercase tracking-widest flex items-center gap-2">
                        View Details <ArrowRight size={12} />
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full py-32 text-center border border-dashed border-white/5 rounded-[3rem]">
                <p className="text-neutral-700 font-display italic text-2xl uppercase tracking-tighter">Gallery is being updated</p>
              </div>
            )}
          </motion.div>
        )}
        
        {/* Mobile Call to Action */}
        <div className="mt-16 text-center md:hidden">
          <Link href="/gallery" className="inline-flex items-center gap-4 bg-white text-black px-10 py-5 rounded-full font-black uppercase text-[10px] tracking-widest hover:bg-emerald-500 transition-colors">
            View All Work <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}