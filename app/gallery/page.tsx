'use client';
import { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Filter } from 'lucide-react';

export default function GalleryPage() {
  const { designs } = useStore();
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Blackwork', 'Realism', 'Traditional', 'Japanese', 'Minimalist'];
  
  const filteredDesigns = activeCategory === 'All' 
    ? designs 
    : designs.filter(d => d.category === activeCategory);

  return (
    <div className="min-h-screen bg-neutral-950 pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-display font-bold text-white mb-4">The Collection</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Browse through our portfolio of custom designs and completed works. 
            From intricate line work to bold traditional pieces.
          </p>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                activeCategory === cat
                  ? 'bg-white text-black border-white'
                  : 'bg-transparent text-gray-400 border-white/10 hover:border-white/40 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDesigns.map((design) => (
            <div key={design.id} className="group relative break-inside-avoid">
              <div className="aspect-[3/4] overflow-hidden rounded-xl bg-neutral-900 border border-white/5">
                <img 
                  src={design.imageUrl} 
                  alt={design.title} 
                  className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-center p-4">
                  <h3 className="text-xl font-display font-bold text-white mb-1">{design.title}</h3>
                  <p className="text-sm text-gray-300">{design.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredDesigns.length === 0 && (
           <div className="text-center py-20">
             <Filter className="mx-auto h-12 w-12 text-gray-600 mb-4" />
             <h3 className="text-xl text-gray-400">No designs found in this category.</h3>
           </div>
        )}
      </div>
    </div>
  );
}