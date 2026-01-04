'use client';
import React, { useState, useEffect } from 'react';
import { X, Loader2 } from 'lucide-react';

export const EditDesignModal = ({ design, isOpen, onClose, onSuccess }: any) => {
  const [formData, setFormData] = useState(design);
  const [loading, setLoading] = useState(false);

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
      <div className="w-full max-w-lg bg-neutral-900 border border-white/10 rounded-3xl p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white uppercase italic">Edit Work</h2>
          <button onClick={onClose} className="text-neutral-500 hover:text-white"><X size={24} /></button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            className="w-full bg-black border border-white/5 rounded-xl px-4 py-3 text-white"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
          />
          <select 
  className="w-full bg-black border border-white/5 rounded-xl px-4 py-3 text-white focus:border-emerald-500 outline-none"
  value={formData.category}
  onChange={(e) => setFormData({...formData, category: e.target.value})}
>
  <option value="Blackwork / Black and Gray">Blackwork / Black and Gray</option>
  <option value="Realism">Realism</option>
  <option value="Traditional">Traditional</option>
  <option value="Minimalist">Minimalist</option>
  <option value="Fontwork and Linework">Fontwork and Linework</option>
  <option value="Colorwork and New School">Colorwork and New School</option>
  <option value="Mandala , Dot Work and Geomatrical">Mandala , Dot Work and Geometrical</option>
  <option value="Cover up">Cover up</option>
  <option value="Other">Other</option>
</select>
          <input 
            className="w-full bg-black border border-white/5 rounded-xl px-4 py-3 text-white"
            value={formData.imageUrl}
            onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
          />
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-neutral-200 transition-all"
          >
            {loading ? <Loader2 className="animate-spin mx-auto" size={20} /> : "Update Design"}
          </button>
        </form>
      </div>
    </div>
  );
};