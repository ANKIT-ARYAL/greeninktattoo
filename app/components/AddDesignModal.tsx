// app/components/AddDesignModal.tsx
'use client';
import React, { useState } from 'react';
import { Image as ImageIcon, Tag, Type, X, Loader2 } from 'lucide-react';

interface AddDesignModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AddDesignModal = ({ isOpen, onClose, onSuccess }: AddDesignModalProps) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Blackwork',
    imageUrl: '',
    description: ''
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/designs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        onSuccess(); // Refresh the list on the main page
        onClose();   // Close this modal
        setFormData({ title: '', category: 'Blackwork', imageUrl: '', description: '' });
      }
    } catch (error) {
      console.error("Failed to save design:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
      <div className="w-full max-w-lg bg-neutral-900 border border-white/10 rounded-3xl p-8 shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-display font-bold text-white uppercase tracking-wider italic">Add New Work</h2>
          <button onClick={onClose} className="text-neutral-500 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title Input */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest flex items-center gap-2">
              <Type size={12} /> Design Title
            </label>
            <input 
              required
              type="text"
              placeholder="e.g. Traditional Dagger"
              className="w-full bg-black border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/20 transition-all"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
          </div>

          {/* Category Dropdown */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest flex items-center gap-2">
              <Tag size={12} /> Category
            </label>
            <select 
              className="w-full bg-black border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/20 appearance-none"
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
            >
              <option value="Blackwork">Blackwork</option>
              <option value="Realism">Realism</option>
              <option value="Fine Line">Fine Line</option>
              <option value="Traditional">Traditional</option>
            </select>
          </div>

          {/* Image URL Input */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest flex items-center gap-2">
              <ImageIcon size={12} /> Image URL
            </label>
            <input 
              required
              type="url"
              placeholder="Paste Cloudinary or Imbb link here"
              className="w-full bg-black border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/20 transition-all"
              value={formData.imageUrl}
              onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
            />
          </div>

          {/* Submit Button */}
          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-neutral-200 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : "Upload to Portfolio"}
          </button>
        </form>
      </div>
    </div>
  );
};