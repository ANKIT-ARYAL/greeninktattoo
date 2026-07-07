'use client';
import React, { useState, useRef } from 'react';
import { X, Upload, Loader2, ChevronDown, Star, FileImage } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface AddDesignModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function AddDesignModal({ isOpen, onClose, onSuccess }: AddDesignModalProps) {
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  
  const [formData, setFormData] = useState({ 
    title: '', 
    category: 'Other',
    isFeatured: false
  });

  const categories = [
    'Blackwork / Black and Gray', 'Realism', 'Traditional', 'Minimalist', 
    'Fontwork and Linework', 'Colorwork and New School', 
    'Mandala , Dot Work and Geomatrical', 'Cover up', 'Color Realism', 'Other'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return alert('Please select an image file first.');
    setLoading(true);

    try {
      // 1. Upload to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      
      const { data, error: uploadError } = await supabase.storage
        .from('tattoo-designs')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // 2. Get Public URL
      const { data: { publicUrl } } = supabase.storage
        .from('tattoo-designs')
        .getPublicUrl(data.path);

      // 3. Save to your Prisma Database
      const res = await fetch('/api/designs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, imageUrl: publicUrl }),
      });
      
      if (!res.ok) throw new Error('Failed to save to database');
      
      onSuccess();
      onClose();
      setFile(null);
      setFormData({ title: '', category: 'Other', isFeatured: false });
    } catch (err) {
      console.error("Upload error:", err);
      alert('Failed to upload image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[150] overflow-y-auto bg-black/95 backdrop-blur-md p-4 sm:p-6">
      <div className="mx-auto my-4 flex min-h-[calc(100vh-2rem)] w-full max-w-md items-center justify-center">
        <div className="w-full max-h-[calc(100vh-2rem)] overflow-y-auto bg-neutral-900 border border-white/10 rounded-[3rem] p-6 sm:p-8 lg:p-10 shadow-2xl">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-display font-header text-white uppercase  tracking-widerer">Add New Work</h2>
          <button onClick={onClose} className="text-neutral-500 hover:text-white"><X size={28}/></button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* File Picker */}
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="w-full h-40 border-2 border-dashed border-neutral-700 rounded-2xl flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-emerald-500 transition-all bg-black/40"
          >
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
            {file ? <p className="text-white text-xs font-header">{file.name}</p> : (
              <>
                <Upload className="text-neutral-600" size={24} />
                <p className="text-neutral-500 text-[10px] font-black uppercase tracking-widest">Select Image File</p>
              </>
            )}
          </div>

          <input 
            required
            placeholder="Title"
            className="w-full bg-black border border-white/5 rounded-2xl px-5 py-4 text-white outline-none focus:border-emerald-500"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
          />

          <select 
            className="w-full bg-black border border-white/5 rounded-2xl px-5 py-4 text-white outline-none focus:border-emerald-500"
            value={formData.category}
            onChange={(e) => setFormData({...formData, category: e.target.value})}
          >
            {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
          </select>

          <button 
            disabled={loading}
            className="w-full bg-white text-black font-black uppercase text-[10px] tracking-[0.4em] py-5 rounded-2xl hover:bg-emerald-500 disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin mx-auto" size={18} /> : 'Save Asset'}
          </button>
        </form>
        </div>
      </div>
    </div>
  );
}