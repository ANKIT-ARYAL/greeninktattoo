import React from 'react';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, Calendar, User, Share2 } from 'lucide-react';
import Reveal from '@/app/components/Reveal';

export default async function BlogPostPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;

  const post = await prisma.post.findUnique({
    where: { slug: slug },
  });

  if (!post || !post.published) {
    notFound();
  }

  return (
    /* 1. Clear 150px Logo: pt-40+ 
       2. Full Width: No max-w-4xl 
    */
    <article className="min-h-screen bg-neutral-950 pt-40 md:pt-48 lg:pt-56 pb-16 md:pb-24 px-4 sm:px-8 md:px-12 lg:px-20 w-full">
      <div className="w-full">
        
        {/* BACK BUTTON */}
        <Reveal direction="down">
          <Link 
            href="/blogs" 
            className="inline-flex items-center gap-2 text-white hover:text-emerald-500 transition-colors mb-10 md:mb-16 group"
          >
            <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">Back to Journal</span>
          </Link>
        </Reveal>

        {/* HEADER */}
        <header className="mb-12 md:mb-20">
          <Reveal delay={0.1}>
            <div className="flex flex-wrap items-center gap-4 md:gap-6 mb-6 md:mb-8 text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em] text-white">
              <span className="flex items-center gap-2 text-emerald-500">
                 <Calendar size={16} /> 
                 <span className="text-white">{new Date(post.createdAt).toLocaleDateString()}</span>
              </span>
              <span className="hidden sm:block w-1.5 h-1.5 rounded-full bg-neutral-800" />
              <span className="flex items-center gap-2 text-emerald-500">
                <User size={16} /> 
                <span className="text-white">{post.author}</span>
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            {/* Massive Journal-style Title */}
            <h1 className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white uppercase italic tracking-tighter leading-[0.85] mb-8 md:mb-12 max-w-6xl">
              {post.title}
            </h1>
          </Reveal>

          <Reveal delay={0.3}>
            <p className="text-xl md:text-2xl text-neutral-400 leading-relaxed italic border-l-4 border-emerald-500 pl-6 md:pl-10 max-w-4xl">
              {post.excerpt}
            </p>
          </Reveal>
        </header>

        {/* FEATURED IMAGE - No Max Width */}
        <Reveal delay={0.4} direction="up">
          <div className="relative aspect-[21/9] w-full overflow-hidden rounded-[2rem] md:rounded-[3.5rem] mb-12 md:mb-24 border border-white/5 shadow-2xl">
            <Image
              src={post.image || '/placeholder-blog.jpg'}
              alt={post.title}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          </div>
        </Reveal>

        {/* CONTENT - Expanding to width */}
        <Reveal delay={0.5}>
          <div className="prose prose-invert prose-emerald max-w-none 
            prose-headings:font-display prose-headings:uppercase prose-headings:italic prose-headings:tracking-tighter
            prose-p:text-neutral-400 prose-p:leading-relaxed prose-p:text-base md:prose-p:text-lg lg:prose-p:text-xl
            prose-p:max-w-4xl
            prose-strong:text-white prose-blockquote:border-emerald-500
            prose-img:rounded-[1.5rem] md:prose-img:rounded-[2.5rem] prose-img:border prose-img:border-white/10">
            
            {post.content.split('\n').map((paragraph, i) => (
              paragraph ? <p key={i}>{paragraph}</p> : <br key={i} />
            ))}
          </div>
        </Reveal>

        {/* FOOTER / SHARE */}
        <footer className="mt-16 md:mt-32 pt-10 md:pt-16 border-t border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="flex items-center gap-6">
             <div className="h-14 w-14 md:h-16 md:w-16 bg-emerald-500 rounded-[1.2rem] md:rounded-[1.5rem] flex items-center justify-center text-black font-black text-xl">
               {post.author.charAt(0)}
             </div>
             <div>
               <p className="text-[10px] md:text-[11px] font-black text-emerald-500 uppercase tracking-[0.4em]">Written By</p>
               <p className="text-white text-lg md:text-xl font-display font-bold uppercase italic">{post.author}</p>
             </div>
          </div>
          
          <button className="w-full md:w-auto flex items-center justify-center gap-4 px-10 py-5 bg-white/5 hover:bg-emerald-500 hover:text-black rounded-full text-[11px] font-black uppercase tracking-[0.3em] text-white transition-all duration-500">
            <Share2 size={18} /> Share Article
          </button>
        </footer>
      </div>
    </article>
  );
}