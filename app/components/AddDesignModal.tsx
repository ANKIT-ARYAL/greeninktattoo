'use client';
import React, { useState } from 'react';
import { X, Instagram, Image as ImageIcon, Link as LinkIcon, Loader2 } from 'lucide-react';

export function AddDesignModal({ isOpen, onClose, onSuccess }: any) {
  const [mode, setMode] = useState<'upload' | 'instagram'>('upload');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ title: '', category: 'Black & Grey', imageUrl: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Logic to save to your database...
    const res = await fetch('/api/designs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    if (res.ok) {
      onSuccess();
      onClose();
    }
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/90 p-4">
      <div className="bg-neutral-900 border border-white/10 w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-display font-bold text-white uppercase italic">Add New Work</h2>
          <button onClick={onClose} className="text-neutral-500 hover:text-white"><X size={24}/></button>
        </div>

        {/* Choice Toggle */}
        <div className="flex p-1 bg-black rounded-2xl mb-8 border border-white/5">
          <button 
            type="button"
            onClick={() => setMode('upload')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${mode === 'upload' ? 'bg-neutral-800 text-white' : 'text-neutral-500'}`}
          >
            <ImageIcon size={14} /> My Upload
          </button>
          <button 
            type="button"
            onClick={() => setMode('instagram')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${mode === 'instagram' ? 'bg-neutral-800 text-white' : 'text-neutral-500'}`}
          >
            <Instagram size={14} /> Instagram
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input 
            placeholder="Work Title"
            className="w-full bg-black border border-white/5 rounded-xl px-4 py-3 text-white"
            onChange={(e) => setFormData({...formData, title: e.target.value})}
          />
          
          <div className="relative">
            <input 
              placeholder={mode === 'instagram' ? "Paste Instagram Link..." : "Paste Image URL..."}
              className="w-full bg-black border border-white/5 rounded-xl pl-12 pr-4 py-3 text-white"
              onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-600">
              {mode === 'instagram' ? <Instagram size={18} /> : <LinkIcon size={18} />}
            </div>
          </div>

          <button className="w-full bg-white text-black font-black uppercase py-4 rounded-xl">
            {loading ? <Loader2 className="animate-spin mx-auto" size={18} /> : 'Save Piece'}
          </button>
        </form>
      </div>
    </div>
  );
}