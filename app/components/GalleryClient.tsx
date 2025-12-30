'use client';
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Instagram, Loader2 } from 'lucide-react';

interface Design {
  id: string;
  title: string;
  imageUrl: string;
  category: string;
}

interface GalleryClientProps {
  designs: Design[];
  isFeatured?: boolean;
}

export default function GalleryClient({ designs, isFeatured = false }: GalleryClientProps) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState<Design | null>(null);

  const categories = ['All', 'Blackwork', 'Realism', 'Traditional', 'Japanese', 'Minimalist'];
  
  const filtered = useMemo(() => {
    if (isFeatured) return designs;
    return activeCategory === 'All' 
      ? designs 
      : designs.filter(d => d.category.toLowerCase() === activeCategory.toLowerCase());
  }, [activeCategory, designs, isFeatured]);

  const navigate = (dir: 'next' | 'prev') => {
    const idx = filtered.findIndex(d => d.id === selectedImage?.id);
    if (idx === -1) return;
    let next = dir === 'next' ? idx + 1 : idx - 1;
    if (next >= filtered.length) next = 0;
    if (next < 0) next = filtered.length - 1;
    setSelectedImage(filtered[next]);
  };

  return (
    <>
      {!isFeatured && (
        <div className="sticky top-28 z-40 flex justify-center mb-16 px-4">
          <div className="flex flex-wrap justify-center gap-2 bg-neutral-900/50 backdrop-blur-xl p-2 rounded-[2rem] border border-white/5">
            {categories.map((cat) => (
              <button 
                key={cat} 
                onClick={() => setActiveCategory(cat)} 
                className={`px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
                  activeCategory === cat ? 'bg-emerald-500 text-black' : 'text-neutral-500 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className={`grid gap-6 ${isFeatured ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'}`}>
        <AnimatePresence mode="popLayout">
          {filtered.map((design, index) => {
            const isIG = design.imageUrl.includes('instagram.com');
            // Clean URL for Weserv proxy
            const cleanUrl = design.imageUrl.split('?')[0].replace(/\/$/, "");
            const displayUrl = isIG 
              ? `https://images.weserv.nl/?url=${encodeURIComponent(cleanUrl + "/media/?size=l")}&w=600&q=75&output=webp` 
              : design.imageUrl;

            return (
              <motion.div 
                key={design.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={() => setSelectedImage(design)}
                className="group relative rounded-[2.5rem] overflow-hidden bg-neutral-900 aspect-[3/4] cursor-pointer border border-white/5"
              >
                <div className="absolute inset-0 bg-neutral-800 animate-pulse" />
                <img 
                  src={displayUrl} 
                  alt={design.title} 
                  loading={index < 4 ? "eager" : "lazy"}
                  onLoad={(e) => (e.currentTarget.style.opacity = "1")}
                  className="relative z-10 w-full h-full object-cover transition-all duration-700 group-hover:scale-110 opacity-0" 
                />
                <div className="absolute inset-0 z-20 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                <div className="absolute inset-0 z-30 flex flex-col justify-end p-8 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                  <span className="text-[9px] font-black text-emerald-500 uppercase tracking-[0.4em] mb-2">{design.category}</span>
                  <h3 className="text-2xl font-display font-bold text-white uppercase italic tracking-tighter leading-none">{design.title}</h3>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/98 backdrop-blur-2xl flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button className="absolute top-8 right-8 text-white/50 hover:text-white z-[210] transition-colors">
              <X size={40} />
            </button>
            
            {!isFeatured && (
              <>
                <button onClick={(e) => { e.stopPropagation(); navigate('prev'); }} className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-4 text-white/20 hover:text-white z-[210]">
                  <ChevronLeft size={60} strokeWidth={1} />
                </button>
                <button onClick={(e) => { e.stopPropagation(); navigate('next'); }} className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-4 text-white/20 hover:text-white z-[210]">
                  <ChevronRight size={60} strokeWidth={1} />
                </button>
              </>
            )}

            <motion.div 
              key={selectedImage.id}
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-lg w-full bg-neutral-900 rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full aspect-[4/5] bg-black overflow-hidden flex items-center justify-center">
                <Loader2 className="absolute animate-spin text-neutral-800" size={40} />
                
                {selectedImage.imageUrl.includes('instagram.com') ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
                    <iframe 
                      // Fixed logic: ensures URL ends in /embed/captioned/ for IG to render
                      src={`${selectedImage.imageUrl.split('?')[0].replace(/\/$/, "")}/embed/captioned/`}
                      className="absolute w-full h-[140%] border-0"
                      style={{ top: '-15%' }}
                      title="IG Preview"
                      scrolling="no"
                    />
                    <div className="absolute top-0 left-0 w-full h-[60px] bg-neutral-900 z-20" />
                  </div>
                ) : (
                  <img src={selectedImage.imageUrl} alt={selectedImage.title} className="relative z-10 w-full h-full object-cover" />
                )}
              </div>
              
              <div className="p-10 bg-neutral-900 flex justify-between items-center border-t border-white/5">
                <div className="min-w-0">
                  <span className="text-emerald-500 text-[10px] font-black uppercase tracking-[0.4em] block mb-2">{selectedImage.category}</span>
                  <h2 className="text-3xl font-display font-bold text-white uppercase italic tracking-tighter truncate">{selectedImage.title}</h2>
                </div>
                {selectedImage.imageUrl.includes('instagram.com') && (
                  <a href={selectedImage.imageUrl} target="_blank" rel="noopener noreferrer" className="p-4 bg-white/5 rounded-2xl text-white hover:bg-emerald-500 hover:text-black transition-all">
                    <Instagram size={24} />
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}