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
    <div className="min-h-screen bg-neutral-950 pt-24 md:pt-32 pb-16 md:pb-24 px-4 sm:px-8 md:px-20">
      <div className="max-w-7xl mx-auto">
        
        <header className="mb-12 md:mb-20">
          <Reveal direction="down">
            <p className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.5em] text-emerald-500 mb-3 md:mb-4">
              Insights & Artistry
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <h1 className="text-5xl sm:text-7xl md:text-9xl font-display font-bold text-white uppercase italic tracking-tighter leading-none">
              The <span className="text-neutral-800 text-outline">Journal</span>
            </h1>
          </Reveal>
        </header>

        <div 
          key={posts.length}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 min-h-[300px] md:min-h-[400px]"
        >
          {posts.map((post, index) => (
            <Reveal key={post.id} delay={0.05 * index} direction="up">
              <Link href={`/blogs/${post.slug}`} className="group flex flex-col h-full">
                <div className="relative aspect-[16/10] overflow-hidden rounded-[1.5rem] md:rounded-[2rem] bg-neutral-900 mb-5 md:mb-6 border border-white/5">
                  <Image
                    src={post.image || '/placeholder-blog.jpg'}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>

                <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4 text-[9px] md:text-[10px] font-black uppercase tracking-widest text-neutral-500">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} className="text-emerald-500" />
                    {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} className="text-emerald-500" />
                    {Math.ceil(post.content.length / 1000)} min read
                  </span>
                </div>

                <h3 className="text-xl md:text-2xl font-display font-bold text-white uppercase italic tracking-tight mb-3 md:mb-4 group-hover:text-emerald-500 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-neutral-400 text-xs md:text-sm leading-relaxed mb-5 md:mb-6 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="mt-auto flex items-center gap-2 text-white text-[9px] md:text-[10px] font-black uppercase tracking-widest group-hover:gap-4 transition-all">
                  Read Article <ArrowRight size={14} className="text-emerald-500" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-24 md:py-40 border border-dashed border-white/5 rounded-[1.5rem] md:rounded-[3rem]">
            <p className="text-neutral-600 font-display italic text-xl md:text-2xl">Stories are being inked...</p>
          </div>
        )}
      </div>
    </div>
  );
}