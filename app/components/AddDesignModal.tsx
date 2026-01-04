'use client';
import React, { useState } from 'react';
import { X, Instagram, Image as ImageIcon, Link as LinkIcon, Loader2, ChevronDown } from 'lucide-react';

export function AddDesignModal({ isOpen, onClose, onSuccess }: any) {
  const [mode, setMode] = useState<'upload' | 'instagram'>('upload');
  const [loading, setLoading] = useState(false);
  
  // Added fixed categories for the dropdown
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

  const [formData, setFormData] = useState({ 
    title: '', 
    category: 'Other', // Default selection
    imageUrl: '' 
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Clean Instagram URL if needed
    let finalUrl = formData.imageUrl;
    if (mode === 'instagram' && finalUrl.includes('instagram.com')) {
      finalUrl = finalUrl.split('?')[0].replace(/\/$/, "");
    }

    try {
      const res = await fetch('/api/designs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, imageUrl: finalUrl }),
      });
      
      if (res.ok) {
        onSuccess();
        onClose();
        setFormData({ title: '', category: 'Other', imageUrl: '' });
      }
    } catch (err) {
      console.error("Save error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/95 backdrop-blur-md p-4">
      <div className="bg-neutral-900 border border-white/10 w-full max-w-md rounded-[3rem] p-10 shadow-2xl shadow-black/50">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-display font-bold text-white uppercase italic tracking-tighter">Add New Work</h2>
          <button onClick={onClose} className="text-neutral-500 hover:text-white transition-colors"><X size={28}/></button>
        </div>

        {/* Choice Toggle */}
        <div className="flex p-1.5 bg-black rounded-2xl mb-8 border border-white/5">
          <button 
            type="button"
            onClick={() => setMode('upload')}
            className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${mode === 'upload' ? 'bg-neutral-800 text-white shadow-lg' : 'text-neutral-600 hover:text-neutral-400'}`}
          >
            <ImageIcon size={14} /> My Upload
          </button>
          <button 
            type="button"
            onClick={() => setMode('instagram')}
            className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${mode === 'instagram' ? 'bg-neutral-800 text-white shadow-lg' : 'text-neutral-600 hover:text-neutral-400'}`}
          >
            <Instagram size={14} /> Instagram
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <label className="text-[9px] font-black uppercase text-neutral-500 tracking-[0.3em] ml-2">Work Title</label>
            <input 
              required
              placeholder="e.g. Traditional Dagger"
              className="w-full bg-black border border-white/5 rounded-2xl px-5 py-4 text-white focus:border-emerald-500 outline-none transition-all placeholder:text-neutral-800"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
          </div>

          {/* CATEGORY DROPDOWN */}
          <div className="space-y-2">
            <label className="text-[9px] font-black uppercase text-neutral-500 tracking-[0.3em] ml-2">Style Category</label>
            <div className="relative">
              <select 
                required
                className="w-full bg-black border border-white/5 rounded-2xl px-5 py-4 text-white focus:border-emerald-500 outline-none transition-all appearance-none cursor-pointer"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat} className="bg-neutral-900 text-white">
                    {cat}
                  </option>
                ))}
              </select>
              <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500">
                <ChevronDown size={16} />
              </div>
            </div>
          </div>
          
          {/* Image Link */}
          <div className="space-y-2">
            <label className="text-[9px] font-black uppercase text-neutral-500 tracking-[0.3em] ml-2">
              {mode === 'instagram' ? 'Instagram URL' : 'Image URL'}
            </label>
            <div className="relative">
              <input 
                required
                placeholder={mode === 'instagram' ? "https://instagram.com/p/..." : "https://link-to-your-image.jpg"}
                className="w-full bg-black border border-white/5 rounded-2xl pl-14 pr-5 py-4 text-white focus:border-emerald-500 outline-none transition-all placeholder:text-neutral-800"
                value={formData.imageUrl}
                onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
              />
              <div className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-700">
                {mode === 'instagram' ? <Instagram size={20} /> : <LinkIcon size={20} />}
              </div>
            </div>
          </div>

          <button 
            disabled={loading}
            className="w-full bg-white text-black font-black uppercase text-[10px] tracking-[0.4em] py-5 rounded-2xl hover:bg-emerald-500 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center"
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : 'Save Asset to Studio'}
          </button>
        </form>
      </div>
    </div>
  );
}