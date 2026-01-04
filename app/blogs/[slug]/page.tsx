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
    // Reduced top padding on mobile (pt-24) to keep content visible sooner
    <article className="min-h-screen bg-neutral-950 pt-24 md:pt-32 pb-16 md:pb-24 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* BACK BUTTON */}
        <Reveal direction="down">
          <Link 
            href="/blogs" 
            className="inline-flex items-center gap-2 text-neutral-500 hover:text-emerald-500 transition-colors mb-8 md:mb-12 group"
          >
            <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Back to Journal</span>
          </Link>
        </Reveal>

        {/* HEADER */}
        <header className="mb-8 md:mb-12">
          <Reveal delay={0.1}>
            {/* Added flex-wrap for metadata to prevent overflow on very narrow screens */}
            <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-4 md:mb-6 text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500">
              <span className="flex items-center gap-1.5"><Calendar size={14} /> {new Date(post.createdAt).toLocaleDateString()}</span>
              <span className="hidden sm:block w-1 h-1 rounded-full bg-neutral-800" />
              <span className="flex items-center gap-1.5"><User size={14} /> {post.author}</span>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            {/* Scaled header font size for mobile (text-4xl) up to desktop (text-7xl) */}
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-display font-bold text-white uppercase italic tracking-tighter leading-[1] md:leading-[0.9] mb-6 md:mb-8">
              {post.title}
            </h1>
          </Reveal>

          <Reveal delay={0.3}>
            {/* Adjusted text size and padding for mobile excerpt */}
            <p className="text-lg md:text-xl text-neutral-400 leading-relaxed italic border-l-2 border-emerald-500 pl-4 md:pl-6">
              {post.excerpt}
            </p>
          </Reveal>
        </header>

        {/* FEATURED IMAGE */}
        <Reveal delay={0.4} direction="up">
          {/* Adjusted border radius for mobile (rounded-[1.5rem]) */}
          <div className="relative aspect-video w-full overflow-hidden rounded-[1.5rem] md:rounded-[3rem] mb-10 md:mb-16 border border-white/5">
            <Image
              src={post.image || '/placeholder-blog.jpg'}
              alt={post.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 896px"
            />
          </div>
        </Reveal>

        {/* CONTENT */}
        <Reveal delay={0.5}>
          {/* prose utilities modified for mobile readability (prose-p:text-base md:prose-p:text-lg) */}
          <div className="prose prose-invert prose-emerald max-w-none 
            prose-headings:font-display prose-headings:uppercase prose-headings:italic prose-headings:tracking-tighter
            prose-p:text-neutral-400 prose-p:leading-relaxed prose-p:text-base md:prose-p:text-lg
            prose-strong:text-white prose-blockquote:border-emerald-500
            prose-img:rounded-[1.5rem] md:prose-img:rounded-[2rem] prose-img:border prose-img:border-white/10">
            
            {post.content.split('\n').map((paragraph, i) => (
              paragraph ? <p key={i}>{paragraph}</p> : <br key={i} />
            ))}
          </div>
        </Reveal>

        {/* FOOTER / SHARE */}
        <footer className="mt-12 md:mt-20 pt-8 md:pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="flex items-center gap-4">
             <div className="h-10 w-10 md:h-12 md:w-12 bg-emerald-500 rounded-xl md:rounded-2xl flex items-center justify-center text-black font-bold text-sm md:text-base">
               {post.author.charAt(0)}
             </div>
             <div>
               <p className="text-[9px] md:text-[10px] font-black text-neutral-500 uppercase tracking-widest">Written By</p>
               <p className="text-white text-sm md:text-base font-bold uppercase italic">{post.author}</p>
             </div>
          </div>
          
          <button className="w-full md:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 rounded-xl md:rounded-2xl text-[10px] font-black uppercase tracking-widest text-white transition-all">
            <Share2 size={16} /> Share Article
          </button>
        </footer>
      </div>
    </article>
  );
}