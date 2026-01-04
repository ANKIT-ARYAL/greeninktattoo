'use client';
import React, { useState } from 'react';
import { X, Loader2, Star, ChevronDown } from 'lucide-react';

export const EditDesignModal = ({ design, isOpen, onClose, onSuccess }: any) => {
  const [formData, setFormData] = useState(design);
  const [loading, setLoading] = useState(false);

  const categories = [
    'Blackwork / Black and Gray', 
    'Realism', 
    'Traditional', 
    'Minimalist', 
    'Fontwork and Linework',
    'Colorwork and New School', 
    'Mandala , Dot Work and Geomatrical', 
    'Cover up',
    'Other'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`/api/designs/${design.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        onSuccess();
        onClose();
      }
    } catch (err) { console.error(err); } 
    finally { setLoading(false); }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
      <div className="w-full max-w-lg bg-neutral-900 border border-white/10 rounded-[2.5rem] p-10 shadow-2xl">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-display font-bold text-white uppercase italic tracking-tighter">Edit Work</h2>
          <button onClick={onClose} className="text-neutral-500 hover:text-white transition-colors"><X size={24} /></button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
             <label className="text-[9px] font-black uppercase text-neutral-500 tracking-[0.3em] ml-2">Title</label>
             <input 
                className="w-full bg-black border border-white/5 rounded-2xl px-5 py-4 text-white focus:border-emerald-500 outline-none transition-all"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
              />
          </div>

          <div className="space-y-2">
            <label className="text-[9px] font-black uppercase text-neutral-500 tracking-[0.3em] ml-2">Style Category</label>
            <div className="relative">
              <select 
                className="w-full bg-black border border-white/5 rounded-2xl px-5 py-4 text-white focus:border-emerald-500 outline-none appearance-none cursor-pointer"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat} className="bg-neutral-900 text-white">{cat}</option>
                ))}
              </select>
              <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500">
                <ChevronDown size={16} />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[9px] font-black uppercase text-neutral-500 tracking-[0.3em] ml-2">Image Source</label>
            <input 
              className="w-full bg-black border border-white/5 rounded-2xl px-5 py-4 text-white focus:border-emerald-500 outline-none"
              value={formData.imageUrl}
              onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
            />
          </div>

          <label className="flex items-center gap-3 cursor-pointer group bg-black/40 p-4 rounded-2xl border border-white/5 hover:border-emerald-500/30 transition-all">
            <input 
              type="checkbox"
              className="hidden"
              checked={formData.isFeatured}
              onChange={(e) => setFormData({...formData, isFeatured: e.target.checked})}
            />
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${formData.isFeatured ? 'bg-emerald-500 text-black' : 'bg-neutral-800 text-neutral-500'}`}>
              <Star size={18} fill={formData.isFeatured ? "currentColor" : "none"} />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-widest text-white">Featured Status</span>
              <span className="text-[8px] text-neutral-500 uppercase tracking-wider">Highlight this piece on your home screen</span>
            </div>
          </label>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-white text-black font-black uppercase text-[10px] tracking-[0.4em] py-5 rounded-2xl hover:bg-emerald-500 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center"
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : "Update Design Asset"}
          </button>
        </form>
      </div>
    </div>
  );
};