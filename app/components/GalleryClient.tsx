'use client';
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Instagram, Loader2, Plus, LayoutGrid } from 'lucide-react';

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
  const [visibleCount, setVisibleCount] = useState(6);

  const categories = [
  'All', 
  'Blackwork / Black and Gray', // Fixed string
  'Realism', 
  'Traditional', 
  'Fontwork and Linework', 
  'Minimalist', 
  'Colorwork and New School', 
  'Mandala , Dot Work and Geomatrical', 
  'Cover up',
  'Other'
];

  const getDisplayUrl = (url: string, width = 600) => {
    if (!url.includes('instagram.com')) return url;
    const cleanBase = url.split('?')[0].replace(/\/$/, "");
    return `https://images.weserv.nl/?url=${encodeURIComponent(cleanBase + "/media/?size=l")}&w=${width}&q=70&output=webp`;
  };
  
  const filtered = useMemo(() => {
    let result = designs;
    if (!isFeatured && activeCategory !== 'All') {
      result = designs.filter(d => d.category.toLowerCase() === activeCategory.toLowerCase());
    }
    return result;
  }, [activeCategory, designs, isFeatured]);

  const displayItems = filtered.slice(0, visibleCount);

  const navigate = (dir: 'next' | 'prev') => {
    const idx = filtered.findIndex(d => d.id === selectedImage?.id);
    if (idx === -1) return;
    let next = dir === 'next' ? idx + 1 : idx - 1;
    if (next >= filtered.length) next = 0;
    if (next < 0) next = filtered.length - 1;
    setSelectedImage(filtered[next]);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
      
      {/* SIDEBAR / TOPBAR CATEGORIES */}
      {!isFeatured && (
        <aside className="w-full lg:w-64 lg:sticky lg:top-32 z-40">
          <div className="flex flex-col gap-6">
            <div className="hidden lg:flex items-center gap-3 mb-2 px-2">
              <LayoutGrid className="text-emerald-500 w-4 h-4" />
              <h3 className="text-white text-[10px] font-black uppercase tracking-[0.3em]">Categories</h3>
            </div>

            {/* Horizontal Scroll on Mobile, Vertical List on Desktop */}
            <div className="flex flex-nowrap lg:flex-col overflow-x-auto lg:overflow-visible no-scrollbar gap-2 p-1 lg:p-0">
              {categories.map((cat) => (
                <button 
                  key={cat} 
                  onClick={() => {
                    setActiveCategory(cat);
                    setVisibleCount(6);
                  }} 
                  className={`px-5 lg:px-6 py-3 lg:py-4 rounded-full lg:rounded-2xl text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all duration-300 whitespace-nowrap lg:whitespace-normal text-left ${
                    activeCategory === cat 
                      ? 'bg-emerald-500 text-black shadow-[0_10px_20px_rgba(16,185,129,0.2)]' 
                      : 'bg-neutral-900/50 lg:bg-transparent text-neutral-500 hover:text-white border border-white/5 lg:border-transparent'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </aside>
      )}

      {/* GALLERY GRID */}
      <div className="flex-1 w-full">
        <div className={`grid gap-4 md:gap-6 sm:grid-cols-2 ${isFeatured ? 'lg:grid-cols-3' : 'xl:grid-cols-3 lg:grid-cols-2'} grid-cols-1`}>
          <AnimatePresence mode="popLayout">
            {displayItems.map((design, index) => {
              const displayUrl = getDisplayUrl(design.imageUrl, 600);

              return (
                <motion.div 
                  key={design.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  onClick={() => setSelectedImage(design)}
                  className="group relative rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden bg-neutral-900 aspect-[3/4] cursor-pointer border border-white/5"
                >
                  <img 
                    src={displayUrl} 
                    alt={design.title} 
                    loading={index < 3 ? "eager" : "lazy"}                
                    className="relative z-10 w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
                    onError={(e) => {
                      e.currentTarget.src = "https://placehold.co/400x600/171717/white?text=View+Post";
                    }}
                  />
                  <div className="absolute inset-0 z-20 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                  <div className="absolute inset-0 z-30 flex flex-col justify-end p-6 md:p-8 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                    <span className="text-[8px] md:text-[9px] font-black text-emerald-500 uppercase tracking-[0.4em] mb-1 md:mb-2">{design.category}</span>
                    <h3 className="text-xl md:text-2xl font-display font-bold text-white uppercase italic tracking-tighter leading-none">{design.title}</h3>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {!isFeatured && filtered.length > visibleCount && (
          <div className="flex justify-center mt-12 md:mt-20 px-4">
            <button 
              onClick={() => setVisibleCount(prev => prev + 6)}
              className="group w-full md:w-auto flex items-center justify-center gap-4 px-12 py-5 md:py-6 bg-white text-black rounded-full font-black uppercase text-[10px] md:text-[11px] tracking-[0.3em] hover:bg-emerald-500 transition-all active:scale-95"
            >
              <Plus className="w-4 h-4" /> Load More Art
            </button>
          </div>
        )}
      </div>

      {/* LIGHTBOX (SAME AS BEFORE) */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex items-center justify-center p-3 md:p-6"
            onClick={() => setSelectedImage(null)}
          >
            <button className="absolute top-4 right-4 md:top-8 md:right-8 text-white/50 hover:text-white z-[210] transition-colors p-2">
              <X className="w-8 h-8 md:w-10 md:h-10" />
            </button>
            
            <button 
              onClick={(e) => { e.stopPropagation(); navigate('prev'); }} 
              className="hidden md:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 p-4 text-white/20 hover:text-white z-[210]"
            >
              <ChevronLeft className="w-12 h-12 lg:w-16 lg:h-16" strokeWidth={1} />
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); navigate('next'); }} 
              className="hidden md:flex absolute right-4 lg:left-8 top-1/2 -translate-y-1/2 p-4 text-white/20 hover:text-white z-[210]"
            >
              <ChevronRight className="w-12 h-12 lg:w-16 lg:h-16" strokeWidth={1} />
            </button>

            <motion.div 
              key={selectedImage.id}
              initial={{ scale: 0.9, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-full md:max-w-lg w-full bg-neutral-900 rounded-[1.5rem] md:rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full aspect-[4/5] bg-black overflow-hidden flex items-center justify-center">
                <Loader2 className="absolute animate-spin text-neutral-800 w-8 h-8" />
                <img 
                  key={selectedImage.id}
                  src={selectedImage.imageUrl.includes('instagram.com') 
                    ? `https://images.weserv.nl/?url=${encodeURIComponent(selectedImage.imageUrl.split('?')[0].replace(/\/$/, ""))}/media/?size=l&w=1000&q=80&output=webp` 
                    : selectedImage.imageUrl
                  } 
                  alt={selectedImage.title} 
                  className="relative z-10 w-full h-full object-cover transition-opacity duration-300"
                />
              </div>
              
              <div className="p-5 md:p-10 bg-neutral-900 flex justify-between items-center border-t border-white/5">
                <div className="flex-1 min-w-0 pr-4">
                  <span className="text-emerald-500 text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] block mb-1 md:mb-2">{selectedImage.category}</span>
                  <h2 className="text-xl md:text-3xl font-display font-bold text-white uppercase italic tracking-tighter leading-none truncate md:whitespace-normal">{selectedImage.title}</h2>
                </div>
                {selectedImage.imageUrl.includes('instagram.com') && (
                  <a href={selectedImage.imageUrl} target="_blank" rel="noopener noreferrer" className="shrink-0 p-3 md:p-4 bg-white/5 rounded-xl md:rounded-2xl text-white hover:bg-emerald-500 transition-all">
                    <Instagram className="w-5 h-5 md:w-6 md:h-6" />
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}