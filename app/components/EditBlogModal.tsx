import { Loader2, X, Image as ImageIcon, AlignLeft, Type, FileText } from "lucide-react";
import { useState, FormEvent } from "react";

interface EditBlogModalProps {
  blog: {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    image?: string;
    imageUrl?: string;
  };
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function EditBlogModal({ blog, isOpen, onClose, onSuccess }: EditBlogModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(blog);

  if (!isOpen) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`/api/blogs/${blog.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) { 
        onSuccess(); 
        onClose(); 
      } else {
        const errorData = await res.json();
        console.error("Server Error:", errorData);
      }
    } catch (err) { 
      console.error("Fetch Error:", err); 
    } finally { 
      setLoading(false); 
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm">
      <div className="bg-neutral-900 border border-white/10 w-full max-w-2xl rounded-[3rem] overflow-hidden shadow-2xl">
        <div className="p-10 max-h-[90vh] overflow-y-auto custom-scrollbar">
          
          <div className="flex justify-between items-center mb-10">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#26ff00] mb-1">Editor</p>
              <h2 className="text-3xl font-display font-header text-white uppercase  tracking-widerer">Edit Article</h2>
            </div>
            <button onClick={onClose} className="p-3 bg-white/5 rounded-full text-neutral-500 hover:text-white transition-colors">
              <X size={24}/>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* TITLE FIELD */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-500 ml-2">
                <Type size={12} /> Article Title
              </label>
              <input 
                className="w-full bg-black border border-white/5 rounded-2xl px-6 py-4 text-white focus:border-emerald-500/50 outline-none transition-all" 
                placeholder="Enter title..."
                value={formData.title} 
                onChange={e => setFormData({...formData, title: e.target.value})} 
              />
            </div>

            {/* EXCERPT FIELD */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-500 ml-2">
                <AlignLeft size={12} /> Excerpt (Short Summary)
              </label>
              <textarea 
                className="w-full bg-black border border-white/5 rounded-2xl px-6 py-4 text-white h-24 resize-none focus:border-emerald-500/50 outline-none transition-all text-sm leading-relaxed" 
                placeholder="Brief summary for the list view..."
                value={formData.excerpt} 
                onChange={e => setFormData({...formData, excerpt: e.target.value})} 
              />
            </div>

            {/* CONTENT FIELD */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-500 ml-2">
                <FileText size={12} /> Main Content
              </label>
              <textarea 
                className="w-full bg-black border border-white/5 rounded-2xl px-6 py-4 text-white h-64 resize-y focus:border-emerald-500/50 outline-none transition-all text-sm leading-relaxed" 
                placeholder="Write your story here..."
                value={formData.content} 
                onChange={e => setFormData({...formData, content: e.target.value})} 
              />
            </div>

            {/* IMAGE URL FIELD */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-500 ml-2">
                <ImageIcon size={12} /> Cover Image URL
              </label>
              <input 
                className="w-full bg-black border border-white/5 rounded-2xl px-6 py-4 text-white focus:border-emerald-500/50 outline-none transition-all" 
                placeholder="https://images.unsplash.com/..."
                value={formData.image || formData.imageUrl} 
                onChange={e => setFormData({...formData, image: e.target.value, imageUrl: e.target.value})} 
              />
            </div>

            <div className="pt-4">
              <button 
                type="submit"
                disabled={loading} 
                className="w-full bg-white text-black font-black uppercase text-[11px] tracking-[0.3em] py-5 rounded-2xl hover:bg-emerald-500 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {loading ? <Loader2 className="animate-spin" size={18} /> : 'Update Article'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}