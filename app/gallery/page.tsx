'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Loader2, Maximize2, Sparkles, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface Design {
  id: string;
  title: string;
  imageUrl: string;
  category: string;
}

export default function GalleryPage() {
  const [designs, setDesigns] = useState<Design[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedImage, setSelectedImage] = useState<Design | null>(null);

  const categories = ['All', 'Blackwork', 'Realism', 'Traditional', 'Japanese', 'Minimalist'];

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await fetch('/api/designs');
        const data = await res.json();
        if (Array.isArray(data)) setDesigns(data);
      } catch (err) {
        console.error("Gallery fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  const filteredDesigns = activeCategory === 'All' 
    ? designs 
    : designs.filter(d => d.category.toLowerCase() === activeCategory.toLowerCase());

  // Handle Lightbox Navigation
  const navigateLightbox = (direction: 'next' | 'prev') => {
    if (!selectedImage) return;
    const currentIndex = filteredDesigns.findIndex(d => d.id === selectedImage.id);
    let nextIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
    
    if (nextIndex >= filteredDesigns.length) nextIndex = 0;
    if (nextIndex < 0) nextIndex = filteredDesigns.length - 1;
    
    setSelectedImage(filteredDesigns[nextIndex]);
  };

  return (
    <div className="min-h-screen bg-neutral-950 pt-32 pb-24 px-4 md:px-20 overflow-x-hidden">
      
      {/* --- ENHANCED LIGHTBOX --- */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button className="absolute top-8 right-8 text-white/50 hover:text-white z-[110] transition-colors">
              <X size={40} />
            </button>

            {/* Navigation Buttons */}
            <button 
              onClick={(e) => { e.stopPropagation(); navigateLightbox('prev'); }}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-4 text-white/30 hover:text-white transition-colors"
            >
              <ChevronLeft size={48} />
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); navigateLightbox('next'); }}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-4 text-white/30 hover:text-white transition-colors"
            >
              <ChevronRight size={48} />
            </button>

            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl max-h-[85vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={selectedImage.imageUrl} 
                alt={selectedImage.title} 
                className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl"
              />
              <div className="mt-8 text-center">
                <span className="text-emerald-500 text-[10px] font-black uppercase tracking-[0.6em] block mb-2">
                  {selectedImage.category}
                </span>
                <h2 className="text-3xl md:text-5xl font-display font-bold text-white uppercase italic tracking-tighter">
                  {selectedImage.title}
                </h2>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- MAIN PAGE CONTENT --- */}
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-16 space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center items-center gap-2 mb-4"
          >
            <Sparkles className="text-emerald-500" size={16} />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-500">The Portfolio Archive</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-7xl md:text-9xl font-display font-bold text-white uppercase italic tracking-tighter leading-none"
          >
            Art on <span className="text-neutral-900">Skin</span>
          </motion.h1>
        </header>

        {/* Categories Bar */}
        <div className="sticky top-28 z-40 flex justify-center mb-16">
          <div className="flex flex-wrap justify-center gap-2 bg-neutral-900/50 backdrop-blur-xl p-2 rounded-[2rem] border border-white/5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-emerald-500 text-black shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                    : 'text-neutral-500 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-40 gap-4">
            <Loader2 className="animate-spin text-emerald-500" size={40} />
            <p className="text-[10px] font-black uppercase tracking-widest text-neutral-700">Loading Masterpieces</p>
          </div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence mode='popLayout'>
              {filteredDesigns.map((design) => (
                <motion.div 
                  key={design.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="group relative rounded-[2rem] overflow-hidden bg-neutral-900 aspect-[2/3] cursor-pointer"
                  onClick={() => setSelectedImage(design)}
                >
                  <img 
                    src={design.imageUrl} 
                    alt={design.title} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="absolute inset-0 flex flex-col justify-end p-8 translate-y-2 group-hover:translate-y-0 transition-transform">
                    <span className="text-[9px] font-black text-emerald-500 uppercase tracking-[0.3em] mb-1">
                      {design.category}
                    </span>
                    <h3 className="text-xl font-display font-bold text-white uppercase italic tracking-tighter leading-none">
                      {design.title}
                    </h3>
                    <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                       <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
                          <Maximize2 size={16} />
                       </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}