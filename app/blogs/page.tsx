import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import { Calendar, ArrowRight, Clock } from 'lucide-react';
import Reveal from '../components/Reveal';

export const revalidate = 0;
export const dynamic = 'force-dynamic';

export default async function BlogsPage() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
  });

  return (
    /* 1. Clear the 150px Logo with pt-40+ 
       2. Removed max-w for edge-to-edge content
    */
    <div className="min-h-screen bg-neutral-950 pt-40 md:pt-48 lg:pt-56 pb-16 md:pb-24 px-4 sm:px-8 md:px-12 lg:px-20 w-full">
      <div className="w-full">
        
        <header className="mb-16 md:mb-24 lg:mb-32">
          <Reveal direction="down">
            <p className="text-[9px] md:text-[11px] font-black uppercase tracking-[0.4em] md:tracking-[0.6em] text-emerald-500 mb-4 md:mb-6">
              Insights & Artistry
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            {/* Massive single-line title with Emerald accent */}
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-bold text-white uppercase italic tracking-tighter leading-[0.9] md:leading-none">
              The <span className="text-emerald-500">Journal</span>
            </h1>
          </Reveal>
        </header>

        <div 
          key={posts.length}
          /* Removed mx-auto and max-w constraints on the grid */
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-16 w-full"
        >
          {posts.map((post, index) => (
            <Reveal key={post.id} delay={0.05 * index} direction="up">
              <Link href={`/blogs/${post.slug}`} className="group flex flex-col h-full">
                {/* Image Container - No opacity reduction on inactive state */}
                <div className="relative aspect-[16/10] overflow-hidden rounded-[1.5rem] md:rounded-[2.5rem] bg-neutral-900 mb-6 md:mb-8 border border-white/5 shadow-2xl">
                  <Image
                    src={post.image || '/placeholder-blog.jpg'}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                </div>

                {/* Metadata - Icons Emerald, Text White */}
                <div className="flex items-center gap-4 md:gap-6 mb-4 md:mb-6 text-[10px] md:text-[11px] font-black uppercase tracking-widest text-white">
                  <span className="flex items-center gap-2">
                    <Calendar size={14} className="text-emerald-500" />
                    {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock size={14} className="text-emerald-500" />
                    {Math.ceil(post.content.length / 1000)} min read
                  </span>
                </div>

                {/* Title - Inactive White, Hover Emerald */}
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-white uppercase italic tracking-tight mb-4 md:mb-6 group-hover:text-emerald-500 transition-colors line-clamp-2 leading-tight">
                  {post.title}
                </h3>
                
                <p className="text-neutral-400 text-sm md:text-base leading-relaxed mb-6 md:mb-8 line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Button Action */}
                <div className="mt-auto flex items-center gap-3 text-white text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em] group-hover:gap-5 transition-all">
                  Read Article <ArrowRight size={16} className="text-emerald-500" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-left py-24 md:py-40 border-t border-white/10 mt-12">
            <p className="text-neutral-700 font-display italic text-3xl md:text-5xl uppercase tracking-tighter">
              Stories are being <span className="text-neutral-900">inked...</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}