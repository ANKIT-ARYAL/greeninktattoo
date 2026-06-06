import React from 'react';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, Calendar, User, Share2 } from 'lucide-react';
import Reveal from '@/app/components/Reveal';

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await prisma.post.findUnique({ where: { slug: slug } });

  if (!post || !post.published) notFound();

  return (
    <article className="min-h-screen pt-40 md:pt-48 lg:pt-56 pb-24 px-6 md:px-12 lg:px-20 w-full">
      <div className="max-w-7xl mx-auto w-full">
        
        {/* BACK BUTTON */}
        <Reveal direction="down">
          <Link href="/blogs" className="inline-flex items-center gap-3 text-neutral-400 hover:text-[#26ff00] transition-colors mb-16 group">
            <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">Back to Journal</span>
          </Link>
        </Reveal>

        {/* HEADER */}
        <header className="mb-20">
          <Reveal delay={0.1}>
            <div className="flex items-center gap-6 mb-8 text-[10px] font-black uppercase tracking-[0.3em] text-white/60">
              <span className="flex items-center gap-2 text-[#26ff00]">
                 <Calendar size={12} /> {new Date(post.createdAt).toLocaleDateString()}
              </span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span className="flex items-center gap-2">
                <User size={12} /> {post.author}
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <h1 className="text-5xl md:text-8xl lg:text-9xl font-header text-white uppercase tracking-wider leading-[0.9] mb-10">
              {post.title}
            </h1>
          </Reveal>

          <Reveal delay={0.3}>
            <p className="text-xl md:text-2xl text-neutral-300 leading-relaxed border-l border-[#26ff00] pl-8 max-w-3xl font-light">
              {post.excerpt}
            </p>
          </Reveal>
        </header>

        {/* FEATURED IMAGE */}
        <Reveal delay={0.4} direction="up">
          <div className="relative aspect-[21/9] w-full overflow-hidden mb-24 border border-white/5 shadow-2xl">
            <Image
              src={post.image || '/placeholder-blog.jpg'}
              alt={post.title}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
          </div>
        </Reveal>

        {/* CUSTOM CONTENT STYLING (Replacing default 'prose') */}
        <Reveal delay={0.5}>
          <div className="max-w-4xl space-y-10 text-neutral-400 font-light text-lg md:text-xl leading-relaxed">
            {post.content.split('\n').map((paragraph, i) => (
              paragraph ? (
                <p key={i} className=" first-letter:font-black first-letter:float-left">
                  {paragraph}
                </p>
              ) : <br key={i} />
            ))}
          </div>
        </Reveal>

        {/* FOOTER */}
        <footer className="mt-32 pt-16 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8">                 
          <button className="flex items-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 rounded-none text-[10px] font-black uppercase tracking-[0.3em] text-white transition-all">
            <Share2 size={14} /> Share Article
          </button>
        </footer>
      </div>
    </article>
  );
}