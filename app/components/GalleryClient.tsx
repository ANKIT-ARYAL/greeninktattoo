'use client';
import React from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface Design {
  id: string;
  title: string;
  imageUrl: string;
  category: string;
}

export default function GalleryClient({ designs, isFeatured }: { designs: Design[]; isFeatured?: boolean }) {
  if (!designs?.length) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full [perspective:1000px]">
      {designs.map((design, index) => (
        <GalleryCard key={design.id} design={design} index={index} />
      ))}
    </div>
  );
}

function GalleryCard({ design, index }: { design: Design; index: number }) {
  // 3D Tilt Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-200, 200], [15, -15]);
  const rotateY = useTransform(x, [-200, 200], [-15, 15]);

  return (
    <motion.div
      initial={{ opacity: 0, rotateX: 45, z: -100 }}
      whileInView={{ opacity: 1, rotateX: 0, z: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="relative aspect-[3/4] w-full group overflow-hidden border-[0.5px] border-white/10 preserve-3d"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - rect.left - rect.width / 2);
        y.set(e.clientY - rect.top - rect.height / 2);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX: useSpring(rotateX, { damping: 20 }), rotateY: useSpring(rotateY, { damping: 20 }) }}
    >
      {/* 3D Depth Layer */}
      <motion.div className="w-full h-full relative" style={{ zIndex: 1, transformStyle: 'preserve-3d' }}>
        <Image 
          src={design.imageUrl} 
          alt={design.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          priority={index < 4}
          className="object-cover transition-all duration-700 group-hover:scale-110"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0  opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 md:p-8">
          <span className="text-white text-[9px] font-black uppercase tracking-[0.3em] mb-1">
            {design.category}
          </span>
          <h3 className="text-xl md:text-2xl font-header text-white uppercase tracking-wider leading-none">
            {design.title}
          </h3>
        </div>
      </motion.div>
    </motion.div>
  );
}