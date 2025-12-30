'use client';
import React, { useState, useEffect } from 'react';
import { Filter, Loader2, Maximize2, Sparkles, X, ChevronLeft, ChevronRight } from 'lucide-react';

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
  
  // LIGHTBOX STATE
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

  return (
    <div className="min-h-screen bg-neutral-950 pt-32 pb-24 sm:px-6 md:px-20">
      {/* --- LIGHTBOX OVERLAY --- */}
{selectedImage && (
  <div 
    className="fixed inset-0 z-[100] bg-black/98 backdrop-blur-3xl flex items-center justify-center overflow-hidden"
    onClick={() => setSelectedImage(null)}
  >
    {/* Close Button - More visible and higher up */}
    <button className="absolute top-8 right-8 text-white/40 hover:text-white hover:scale-110 transition-all z-[120]">
      <X size={48} strokeWidth={1.5} />
    </button>

    <div 
      className="relative w-screen h-screen flex items-center justify-center p-0 md:p-4"
      onClick={(e) => e.stopPropagation()}
    >
      {/* THE IMAGE: Forced to nearly full screen height */}
      <img 
        src={selectedImage.imageUrl} 
        alt={selectedImage.title} 
        className="h-full md:h-[95vh] w-auto max-w-full object-contain shadow-[0_0_150px_rgba(0,0,0,0.8)] animate-in zoom-in-95 duration-500 ease-out"
      />
      
      {/* FLOATING CAPTION: Positioned over the image bottom to save vertical space */}
      <div className="absolute bottom-12 left-0 right-0 flex flex-col items-center pointer-events-none">
         <div className="bg-black/40 backdrop-blur-md px-8 py-4 rounded-2xl border border-white/10 flex flex-col items-center">
            <span className="text-emerald-500 text-[10px] font-black uppercase tracking-[0.6em] mb-1 animate-in fade-in slide-in-from-bottom-2 duration-700">
              {selectedImage.category}
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white uppercase italic tracking-tighter animate-in fade-in slide-in-from-bottom-4 duration-1000">
              {selectedImage.title}
            </h2>
         </div>
      </div>
    </div>
  </div>
)}

      <div className="sm:px-6 md:px-20">
        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
          <div className="flex justify-center items-center gap-2 mb-4">
            <Sparkles className="text-emerald-500" size={16} />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-500">Portfolio Archive</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-display font-bold text-white uppercase italic tracking-tighter leading-none">
            The <span className="text-neutral-800">Collection</span>
          </h1>
        </div>

        {/* Filter Bar */}
        <div className="sticky top-24 z-30 flex flex-wrap justify-center gap-3 mb-16 bg-black/20 backdrop-blur-md p-4 rounded-3xl border border-white/5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all duration-500 border ${
                activeCategory === cat
                  ? 'bg-white text-black border-white'
                  : 'bg-neutral-900/50 text-neutral-500 border-white/5 hover:border-white/20 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-40">
            <Loader2 className="animate-spin text-neutral-800" size={48} />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredDesigns.map((design) => (
              <div 
                key={design.id} 
                className="group relative rounded-2xl overflow-hidden bg-neutral-900 border border-white/5 aspect-[2/3]"
              >
                <img 
                  src={design.imageUrl} 
                  alt={design.title} 
                  className="w-full h-full object-cover transition duration-1000 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8 translate-y-4 group-hover:translate-y-0">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[9px] font-black text-emerald-500 uppercase tracking-[0.2em] mb-1 block">
                        {design.category}
                      </span>
                      <h3 className="text-xl font-display font-bold text-white uppercase italic tracking-tighter">
                        {design.title}
                      </h3>
                    </div>
                    {/* ZOOM BUTTON TRIGGER */}
                    <button 
                      onClick={() => setSelectedImage(design)}
                      className="p-3 bg-white/10 rounded-full backdrop-blur-md border border-white/10 text-white hover:bg-white hover:text-black transition-all"
                    >
                      <Maximize2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}