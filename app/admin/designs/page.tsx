'use client';
import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Loader2, Edit3, Image as ImageIcon, Instagram, X, Link as LinkIcon } from 'lucide-react';

interface Design {
  id: string;
  title: string;
  imageUrl: string;
  category: string;
}

export default function DesignsAdminPage() {
  const [designs, setDesigns] = useState<Design[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingDesign, setEditingDesign] = useState<Design | null>(null);

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
            // Using weserv proxy to bypass Instagram's CORP policy so you can see the image
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
                </div>

                <div className="p-7 flex justify-between items-center bg-neutral-900/50 backdrop-blur-md">
                  <div className="min-w-0">
                    <h3 className="text-white font-bold text-sm truncate uppercase italic tracking-tighter">{design.title}</h3>
                    <p className="text-[9px] text-emerald-500 font-black uppercase tracking-[0.2em] mt-1.5">{design.category}</p>
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => handleDelete(design.id)} className="p-3 text-neutral-600 hover:text-red-500 transition-colors">
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
    </div>
  );
}

// --- SUB-COMPONENT: ADD MODAL ---

function AddDesignModal({ isOpen, onClose, onSuccess }: { isOpen: boolean, onClose: () => void, onSuccess: () => void }) {
  const [mode, setMode] = useState<'upload' | 'instagram'>('upload');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ title: '', category: 'Black & Grey', imageUrl: '' });

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
        onSuccess();
        onClose();
        setFormData({ title: '', category: 'Black & Grey', imageUrl: '' });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm">
      <div className="bg-neutral-900 border border-white/10 w-full max-w-md rounded-[3rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)]">
        <div className="p-10">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-display font-bold text-white uppercase italic tracking-tighter">Add Design</h2>
            <button onClick={onClose} className="text-neutral-500 hover:text-white transition-all"><X size={28}/></button>
          </div>

          <div className="flex p-1.5 bg-black rounded-2xl mb-10 border border-white/5">
            <button 
              type="button"
              onClick={() => setMode('upload')}
              className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${mode === 'upload' ? 'bg-neutral-800 text-white shadow-xl' : 'text-neutral-600 hover:text-neutral-400'}`}
            >
              <ImageIcon size={14} /> My Upload
            </button>
            <button 
              type="button"
              onClick={() => setMode('instagram')}
              className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${mode === 'instagram' ? 'bg-neutral-800 text-white shadow-xl' : 'text-neutral-600 hover:text-neutral-400'}`}
            >
              <Instagram size={14} /> Instagram
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase text-neutral-500 tracking-[0.3em]">Title</label>
              <input 
                required
                className="w-full bg-black border border-white/5 rounded-2xl px-5 py-4 text-white focus:border-emerald-500 outline-none transition-all placeholder:text-neutral-800"
                placeholder="Design Name"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
              />
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase text-neutral-500 tracking-[0.3em]">
                {mode === 'instagram' ? 'Post Link' : 'Image URL'}
              </label>
              <div className="relative">
                <input 
                  required
                  className="w-full bg-black border border-white/5 rounded-2xl pl-14 pr-5 py-4 text-white focus:border-emerald-500 outline-none transition-all placeholder:text-neutral-800"
                  placeholder={mode === 'instagram' ? "https://www.instagram.com/p/..." : "https://your-image-link.jpg"}
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
              className="w-full bg-white text-black font-black uppercase text-[10px] tracking-[0.3em] py-5 rounded-2xl hover:bg-emerald-500 transition-all active:scale-95 flex items-center justify-center gap-3"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : 'Publish to Gallery'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}