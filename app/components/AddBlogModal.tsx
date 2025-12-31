import { Loader2, X } from "lucide-react";
import { useState } from "react";

export default function AddBlogModal({ isOpen, onClose, onSuccess }: any) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ title: '', excerpt: '', content: '', imageUrl: '' });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        onSuccess();
        onClose();
        setFormData({ title: '', excerpt: '', content: '', imageUrl: '' });
      }
    } catch (err) { console.error(err); } 
    finally { setLoading(false); }
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm">
      <div className="bg-neutral-900 border border-white/10 w-full max-w-2xl rounded-[3rem] overflow-hidden">
        <div className="p-10 max-h-[90vh] overflow-y-auto custom-scrollbar">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-display font-bold text-white uppercase italic tracking-tighter">New Article</h2>
            <button onClick={onClose} className="text-neutral-500 hover:text-white"><X size={28}/></button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-neutral-500 tracking-widest ml-1">Title</label>
              <input required className="w-full bg-black border border-white/5 rounded-2xl px-5 py-4 text-white focus:border-emerald-500 outline-none" 
                value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-neutral-500 tracking-widest ml-1">Excerpt (Short Summary)</label>
              <textarea required className="w-full bg-black border border-white/5 rounded-2xl px-5 py-4 text-white focus:border-emerald-500 outline-none h-20 resize-none" 
                value={formData.excerpt} onChange={e => setFormData({...formData, excerpt: e.target.value})} />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-neutral-500 tracking-widest ml-1">Content (Markdown/Text)</label>
              <textarea required className="w-full bg-black border border-white/5 rounded-2xl px-5 py-4 text-white focus:border-emerald-500 outline-none h-40 resize-none" 
                value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-neutral-500 tracking-widest ml-1">Featured Image URL</label>
              <input required className="w-full bg-black border border-white/5 rounded-2xl px-5 py-4 text-white focus:border-emerald-500 outline-none" 
                value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} />
            </div>

            <button disabled={loading} className="w-full bg-white text-black font-black uppercase text-[10px] tracking-[0.3em] py-5 rounded-2xl hover:bg-emerald-500 transition-all flex items-center justify-center gap-3">
              {loading ? <Loader2 className="animate-spin" size={18} /> : 'Publish Article'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}