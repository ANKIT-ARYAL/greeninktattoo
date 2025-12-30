'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, Loader2, X, Instagram } from 'lucide-react';

interface Design {
  id: string;
  title: string;
  imageUrl: string;
  category: string;
}

export default function Designs() {
  const [designs, setDesigns] = useState<Design[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<Design | null>(null);

  useEffect(() => {
    const fetchDesigns = async () => {
      try {
        const res = await fetch('/api/designs');
        const data = await res.json();
        if (Array.isArray(data)) setDesigns(data.slice(0, 3));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDesigns();
  }, []);

  return (
    <section className="py-32 bg-neutral-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-20">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="text-emerald-500" size={14} />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-500">Portfolio</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-display font-bold text-white italic uppercase tracking-tighter leading-none">
              Featured <span className="text-neutral-800">Work</span>
            </h2>
          </div>
          <Link href="/gallery" className="group flex items-center gap-3 text-white hover:text-emerald-500 transition-all font-black uppercase text-[10px] tracking-[0.3em] pb-2 border-b border-white/10 hover:border-emerald-500">
            Explore Full Gallery <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {loading ? (
            [1, 2, 3].map((i) => <div key={i} className="aspect-[3/4] rounded-[2rem] bg-neutral-900 animate-pulse" />)
          ) : (
            designs.map((design) => {
              const isIG = design.imageUrl.includes('instagram.com');
              const displayUrl = isIG
                ? `https://images.weserv.nl/?url=${encodeURIComponent(design.imageUrl.split('?')[0].replace(/\/$/, "") + "/media/?size=l")}&w=800&fit=cover`
                : design.imageUrl;

              return (
                <motion.div 
                  key={design.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  onClick={() => setSelectedImage(design)}
                  className="group relative overflow-hidden rounded-[2.5rem] aspect-[3/4] bg-neutral-900 border border-white/5 cursor-pointer"
                >
                  <img src={displayUrl} alt={design.title} className="w-full h-full object-cover transition duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80" />
                  <div className="absolute inset-0 flex flex-col justify-end p-10">
                    <span className="text-[9px] font-black text-emerald-500 uppercase tracking-[0.4em] mb-2">{design.category}</span>
                    <h3 className="text-3xl font-display font-bold text-white uppercase italic tracking-tighter">{design.title}</h3>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      </div>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10 bg-black/95 backdrop-blur-xl"
            onClick={() => setSelectedImage(null)}
          >
            <button className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-[210]">
              <X size={32} />
            </button>

            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-lg w-full bg-neutral-900 rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full aspect-[4/5] bg-black overflow-hidden">
                {selectedImage.imageUrl.includes('instagram.com') ? (
                  /* THE CROP: Hiding IG header and footer */
                  <div className="absolute inset-0 flex items-center justify-center bg-white">
                    <iframe 
                      src={`${selectedImage.imageUrl.split('?')[0].replace(/\/$/, "")}/embed/captioned/`}
                      className="absolute w-full h-[140%] border-0 pointer-events-auto"
                      style={{ top: '-15%' }} // This pushes the IG profile name out of view
                      title="Instagram Design Preview"
                    />
                    {/* Visual mask to prevent interaction with IG header */}
                    <div className="absolute top-0 left-0 w-full h-[60px] bg-neutral-900 z-20" />
                  </div>
                ) : (
                  <img src={selectedImage.imageUrl} alt={selectedImage.title} className="w-full h-full object-cover" />
                )}
              </div>
              
              <div className="p-8 bg-neutral-900 flex justify-between items-center">
                <div>
                  <p className="text-emerald-500 text-[10px] font-black uppercase tracking-[0.4em] mb-1">{selectedImage.category}</p>
                  <h3 className="text-2xl font-display font-bold text-white uppercase italic tracking-tighter">{selectedImage.title}</h3>
                </div>
                {selectedImage.imageUrl.includes('instagram.com') && (
                  <a href={selectedImage.imageUrl} target="_blank" rel="noopener noreferrer" className="p-4 bg-white/5 rounded-2xl text-white hover:bg-emerald-500 hover:text-black transition-all">
                    <Instagram size={20} />
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}