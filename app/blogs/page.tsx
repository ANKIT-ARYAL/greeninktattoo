import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import { Calendar, ArrowRight, Clock } from 'lucide-react';
import Reveal from '../components/Reveal';
import BlogCard3D from '../components/BlogCard3D';

export const dynamic = 'force-dynamic';
// ISR set to 1 hour (revalidate every 3600 seconds)
export const revalidate = 3600;

export default async function BlogsPage() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="min-h-screen  pt-40 pb-24 px-6 md:px-12 lg:px-20 w-full [perspective:1200px]">
      <div className="w-full">
        
        {/* REFINED HEADER */}
        <header className="mb-24 flex flex-col md:flex-row md:items-end md:justify-between border-b border-white/10 pb-12">
          <div>
            <Reveal direction="down">
              <p className="text-[9px] font-black uppercase tracking-[0.6em] text-[#26ff00] mb-6">Insights & Artistry</p>
            </Reveal>
            <Reveal delay={0.2}>
              <h1 className="text-7xl md:text-9xl font-header text-white uppercase tracking-wider leading-[0.9]">
                The Journal
              </h1>
            </Reveal>
          </div>
          <Reveal delay={0.4}>
            <p className="text-neutral-500 text-sm max-w-xs mt-6 md:mt-0">
              Technique, philosophy, and the evolution of the craft. Updated regularly from Kathmandu.
            </p>
          </Reveal>
        </header>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 w-full">
          {posts.map((post, index) => (
            <Reveal key={post.id} delay={0.05 * index} direction="up">
              <BlogCard3D>
               
                <article className="group flex flex-col h-full bg-[#0a0a0a] p-6 border border-white/5 shadow-2xl">
                
                  <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900 mb-8 border border-white/5">
                    <Image
                      src={post.image || '/placeholder-blog.jpg'}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>

                  <div className="flex items-center gap-6 mb-6 text-[10px] font-black uppercase tracking-widest text-white">
                    <span className="flex items-center gap-2">
                      <Calendar size={12} className="text-[#26ff00]" />
                      {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                    <span className="flex items-center gap-2">
                      <Clock size={12} className="text-[#26ff00]" />
                      {/* Ensure 'readTime' exists in your DB schema */}
                      {Math.ceil(post.content.split(' ').length / 200)} min
                    </span>
                  </div>

                  <h3 className="text-4xl font-header text-white uppercase tracking-wider mb-6 group-hover:text-[#26ff00] transition-colors line-clamp-2 leading-tight">
                    {post.title}
                  </h3>
                  
                  <p className="text-neutral-400 text-sm leading-relaxed mb-8 line-clamp-3">
                    {post.excerpt}
                  </p>
<Link href={`/blogs/${post.slug}`} className="mt-auto flex items-center gap-3 text-white text-[10px] font-black uppercase tracking-[0.3em] group-hover:gap-5 transition-all">
                  
                    Read Article <ArrowRight size={14} className="text-[#26ff00]" />
                  </Link>
                </article>
              </BlogCard3D>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}