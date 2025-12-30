'use client';
import React, { useState } from 'react';
import { FileText, Image as ImageIcon, Globe, Lock, Save } from 'lucide-react';

export default function BlogEditor() {
  const [post, setPost] = useState({
    title: '',
    content: '',
    excerpt: '',
    image: '',
    published: false
  });

  // Validation: No leading spaces and auto-generate slug
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/^\s+/, '');
    setPost({ ...post, title: val });
  };

  const savePost = async () => {
    if (!post.title.trim() || !post.content.trim()) {
      alert("Title and Content are required.");
      return;
    }

    const slug = post.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    
    await fetch('/api/blog', {
      method: 'POST',
      body: JSON.stringify({ ...post, slug }),
    });
    
    alert("Post saved successfully!");
  };

  return (
    <div className="bg-neutral-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
      <div className="p-6 border-b border-white/5 bg-white/5 flex justify-between items-center">
        <h3 className="text-xl font-display font-bold text-white uppercase tracking-tight">Studio Journal</h3>
        <div className="flex gap-3">
          <button 
            onClick={() => setPost({...post, published: !post.published})}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all ${
              post.published ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'
            }`}
          >
            {post.published ? <Globe size={14} /> : <Lock size={14} />}
            {post.published ? 'PUBLIC' : 'DRAFT'}
          </button>
        </div>
      </div>

      <div className="p-8 space-y-6">
        <input
          type="text"
          placeholder="Article Title..."
          value={post.title}
          onChange={handleTitleChange}
          className="w-full bg-transparent text-4xl font-display font-bold text-white outline-none placeholder:text-neutral-800"
        />

        <div className="flex gap-4 items-center p-4 bg-black/40 rounded-xl border border-white/5">
          <ImageIcon className="text-neutral-600" size={20} />
          <input 
            type="url" 
            placeholder="Header Image URL"
            className="bg-transparent w-full text-sm text-gray-400 outline-none"
            onChange={(e) => setPost({...post, image: e.target.value})}
          />
        </div>

        <textarea
          placeholder="Write your story here..."
          className="w-full h-64 bg-transparent text-gray-300 leading-relaxed outline-none resize-none placeholder:text-neutral-800"
          onChange={(e) => setPost({...post, content: e.target.value})}
        />

        <button 
          onClick={savePost}
          className="flex items-center justify-center gap-2 w-full py-4 bg-white text-black font-bold uppercase tracking-widest rounded-xl hover:bg-neutral-200 transition-all"
        >
          <Save size={18} /> Save Article
        </button>
      </div>
    </div>
  );
};