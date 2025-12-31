import React from 'react';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, Calendar, User, Clock, Share2 } from 'lucide-react';
import Reveal from '@/app/components/Reveal';

export default async function BlogPostPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;

  // Fetch post by slug
  const post = await prisma.post.findUnique({
    where: { slug: slug },
  });

  if (!post || !post.published) {
    notFound();
  }

  return (
    <article className="min-h-screen bg-neutral-950 pt-32 pb-24 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* BACK BUTTON */}
        <Reveal direction="down">
          <Link 
            href="/blogs" 
            className="inline-flex items-center gap-2 text-neutral-500 hover:text-emerald-500 transition-colors mb-12 group"
          >
            <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Back to Journal</span>
          </Link>
        </Reveal>

        {/* HEADER */}
        <header className="mb-12">
          <Reveal delay={0.1}>
            <div className="flex items-center gap-4 mb-6 text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500">
              <span className="flex items-center gap-1.5"><Calendar size={14} /> {new Date(post.createdAt).toLocaleDateString()}</span>
              <span className="w-1 h-1 rounded-full bg-neutral-800" />
              <span className="flex items-center gap-1.5"><User size={14} /> {post.author}</span>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white uppercase italic tracking-tighter leading-[0.9] mb-8">
              {post.title}
            </h1>
          </Reveal>

          <Reveal delay={0.3}>
            <p className="text-xl text-neutral-400 leading-relaxed italic border-l-2 border-emerald-500 pl-6">
              {post.excerpt}
            </p>
          </Reveal>
        </header>

        {/* FEATURED IMAGE */}
        <Reveal delay={0.4} direction="up">
          <div className="relative aspect-video w-full overflow-hidden rounded-[3rem] mb-16 border border-white/5">
            <Image
              src={post.image || '/placeholder-blog.jpg'}
              alt={post.title}
              fill
              priority
              className="object-cover"
            />
          </div>
        </Reveal>

        {/* CONTENT */}
        <Reveal delay={0.5}>
          <div className="prose prose-invert prose-emerald max-w-none 
            prose-headings:font-display prose-headings:uppercase prose-headings:italic prose-headings:tracking-tighter
            prose-p:text-neutral-400 prose-p:leading-relaxed prose-p:text-lg
            prose-strong:text-white prose-blockquote:border-emerald-500
            prose-img:rounded-[2rem] prose-img:border prose-img:border-white/10">
            
            {/* Using a simple split/map to handle line breaks if not using a Markdown parser yet */}
            {post.content.split('\n').map((paragraph, i) => (
              paragraph ? <p key={i}>{paragraph}</p> : <br key={i} />
            ))}
          </div>
        </Reveal>

        {/* FOOTER / SHARE */}
        <footer className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-4">
             <div className="h-12 w-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-black font-bold">
               {post.author.charAt(0)}
             </div>
             <div>
               <p className="text-[10px] font-black text-neutral-500 uppercase tracking-widest">Written By</p>
               <p className="text-white font-bold uppercase italic">{post.author}</p>
             </div>
          </div>
          
          <button className="flex items-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white transition-all">
            <Share2 size={16} /> Share Article
          </button>
        </footer>
      </div>
    </article>
  );
}