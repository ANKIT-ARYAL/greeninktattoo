'use client';
import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Loader2, Edit3, Image as ImageIcon, AlertCircle } from 'lucide-react';
import { AddDesignModal } from '@/app/components/AddDesignModal';
import { EditDesignModal } from '@/app/components/EditDesignModal';

interface Design {
  id: string;
  title: string;
  imageUrl: string;
  category: string;
  description?: string;
}

export default function DesignsAdminPage() {
  const [designs, setDesigns] = useState<Design[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingDesign, setEditingDesign] = useState<Design | null>(null);

  // 1. Fetch Designs from API
  const fetchDesigns = async () => {
    try {
      const res = await fetch('/api/designs');
      const data = await res.json();
      if (Array.isArray(data)) {
        setDesigns(data);
      }
    } catch (err) {
      console.error("Failed to fetch designs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDesigns();
  }, []);

  // 2. Delete Design
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this piece from your portfolio?")) return;

    try {
      const res = await fetch(`/api/designs/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setDesigns(prev => prev.filter(design => design.id !== id));
      } else {
        alert("Failed to delete design");
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="space-y-10">
      {/* Header Section */}
      <header className="flex justify-between items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-600 mb-2">Gallery Management</p>
          <h1 className="text-4xl font-display font-bold text-white uppercase italic">Portfolio Manager</h1>
        </div>
        
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-2xl font-bold hover:bg-neutral-200 transition-all shadow-lg shadow-white/5 active:scale-95"
        >
          <Plus size={20} /> Add New Work
        </button>
      </header>

      {/* Main Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-32 space-y-4">
          <Loader2 className="animate-spin text-neutral-800" size={40} />
          <p className="text-neutral-600 font-medium animate-pulse">Loading your works...</p>
        </div>
      ) : designs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {designs.map((design) => (
            <div 
              key={design.id} 
              className="group relative bg-neutral-950 border border-white/5 rounded-3xl overflow-hidden hover:border-white/10 transition-all duration-500 shadow-2xl"
            >
              {/* Image Container */}
              <div className="aspect-[4/5] overflow-hidden bg-neutral-900 relative">
                <img 
                  src={design.imageUrl} 
                  alt={design.title} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-in-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
              </div>

              {/* Content / Controls */}
              <div className="p-5 flex justify-between items-center">
                <div className="min-w-0">
                  <h3 className="text-white font-bold text-sm truncate uppercase tracking-tight">{design.title}</h3>
                  <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest mt-1">{design.category}</p>
                </div>
                
                <div className="flex gap-1">
                  <button 
                    onClick={() => setEditingDesign(design)}
                    className="p-2.5 text-neutral-500 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                    title="Edit Design"
                  >
                    <Edit3 size={16} />
                  </button>
                  <button 
                    onClick={() => handleDelete(design.id)}
                    className="p-2.5 text-neutral-500 hover:text-red-500 hover:bg-red-500/5 rounded-xl transition-all"
                    title="Delete Design"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-32 text-center border-2 border-dashed border-white/5 rounded-[40px] bg-neutral-950/50">
          <ImageIcon size={48} className="mx-auto text-neutral-800 mb-4" />
          <h3 className="text-white font-bold text-lg">Your portfolio is empty</h3>
          <p className="text-neutral-600 text-sm mt-1 mb-8">Start by adding your latest tattoo designs or flash art.</p>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="text-xs font-bold uppercase tracking-widest text-white border border-white/10 px-6 py-3 rounded-xl hover:bg-white hover:text-black transition-all"
          >
            Upload First Piece
          </button>
        </div>
      )}

      {/* Modals */}
      <AddDesignModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onSuccess={fetchDesigns}
      />

      {editingDesign && (
        <EditDesignModal 
          isOpen={!!editingDesign} 
          design={editingDesign}
          onClose={() => setEditingDesign(null)} 
          onSuccess={fetchDesigns}
        />
      )}
    </div>
  );
}