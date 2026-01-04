'use client';
import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Loader2, Edit3, Instagram, Star } from 'lucide-react';
import { EditDesignModal } from '../../components/EditDesignModal';
import { AddDesignModal } from '@/app/components/AddDesignModal';

interface Design {
  id: string;
  title: string;
  imageUrl: string;
  category: string;
  isFeatured: boolean;
}

export default function DesignsAdminPage() {
  const [designs, setDesigns] = useState<Design[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [designToEdit, setDesignToEdit] = useState<Design | null>(null);

  const fetchDesigns = async () => {
    try {
      const res = await fetch('/api/designs');
      const data = await res.json();
      if (Array.isArray(data)) setDesigns(data);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchDesigns(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this piece from your portfolio?")) return;
    const res = await fetch(`/api/designs/${id}`, { method: 'DELETE' });
    if (res.ok) setDesigns(prev => prev.filter(d => d.id !== id));
  };

  const toggleFeatured = async (design: Design) => {
    try {
      const res = await fetch(`/api/designs/${design.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...design, isFeatured: !design.isFeatured }),
      });
      if (res.ok) fetchDesigns();
    } catch (err) {
      console.error("Toggle featured error:", err);
    }
  };

  const handleEditClick = (design: Design) => {
    setDesignToEdit(design);
    setIsEditModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-black p-8 lg:p-12 space-y-10">
      <header className="flex justify-between items-end max-w-7xl mx-auto w-full">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-500 mb-2">Gallery Control</p>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white uppercase italic tracking-tighter">Portfolio Manager</h1>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 bg-white text-black px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-emerald-500 transition-all shadow-xl active:scale-95"
        >
          <Plus size={18} /> Add New Work
        </button>
      </header>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-40">
          <Loader2 className="animate-spin text-emerald-500 mb-4" size={40} />
          <p className="text-neutral-500 text-[10px] font-black uppercase tracking-widest">Loading Studio Assets...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {designs.map((design) => {
            const isIG = design.imageUrl.includes('instagram.com');
            const rawIgUrl = isIG 
              ? `${design.imageUrl.split('?')[0].replace(/\/$/, "")}/media/?size=l`
              : design.imageUrl;
            
            const displayUrl = isIG
              ? `https://images.weserv.nl/?url=${encodeURIComponent(rawIgUrl)}&w=800&fit=cover`
              : design.imageUrl;

            return (
              <div key={design.id} className="group bg-neutral-900 border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-white/20 transition-all duration-500">
                <div className="aspect-[4/5] overflow-hidden bg-black relative flex items-center justify-center">
                  <img 
                    src={displayUrl} 
                    alt={design.title} 
                    className="w-full h-full object-cover transition-all duration-1000"
                    onError={(e) => {
                       e.currentTarget.src = "https://www.instagram.com/static/images/ico/favicon-192.png/b306a2d9f771.png";
                       e.currentTarget.className = "w-10 h-10 object-contain opacity-10";
                    }}
                  />
                  {isIG && (
                    <div className="absolute top-6 right-6 bg-black/60 backdrop-blur-xl p-2.5 rounded-2xl border border-white/10 shadow-2xl">
                      <Instagram size={14} className="text-white" />
                    </div>
                  )}
                  {design.isFeatured && (
                    <div className="absolute top-6 left-6 bg-emerald-500 p-2.5 rounded-2xl shadow-2xl">
                      <Star size={14} className="text-black" fill="black" />
                    </div>
                  )}
                </div>

                <div className="p-7 flex justify-between items-center bg-neutral-900/50 backdrop-blur-md">
                  <div className="min-w-0">
                    <h3 className="text-white font-bold text-sm truncate uppercase italic tracking-tighter">{design.title}</h3>
                    <p className="text-[9px] text-emerald-500 font-black uppercase tracking-[0.2em] mt-1.5">{design.category}</p>
                  </div>
                  <div className="flex gap-1">
                    <button 
                      onClick={() => toggleFeatured(design)} 
                      className={`p-3 transition-colors ${design.isFeatured ? 'text-emerald-500' : 'text-neutral-600 hover:text-white'}`}
                      title="Toggle Featured"
                    >
                      <Star size={18} fill={design.isFeatured ? "currentColor" : "none"} />
                    </button>
                    <button 
                      onClick={() => handleEditClick(design)} 
                      className="p-3 text-neutral-600 hover:text-emerald-500 transition-colors"
                      title="Edit Design"
                    >
                      <Edit3 size={18} />
                    </button>
                    <button 
                      onClick={() => handleDelete(design.id)} 
                      className="p-3 text-neutral-600 hover:text-red-500 transition-colors"
                      title="Delete Design"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <AddDesignModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onSuccess={fetchDesigns} 
      />

      {isEditModalOpen && designToEdit && (
        <EditDesignModal 
          design={designToEdit}
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setDesignToEdit(null);
          }}
          onSuccess={fetchDesigns}
        />
      )}
    </div>
  );
}