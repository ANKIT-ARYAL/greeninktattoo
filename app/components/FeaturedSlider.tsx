'use client';
import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow } from 'swiper/modules';
import { motion } from 'framer-motion';

import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/effect-coverflow';

export default function FeaturedGrid({ designs }: { designs: any[] }) {
  if (!designs?.length) return null;

  return (
    <div className="w-full py-20 overflow-visible [perspective:2000px]">
      <Swiper
        modules={[Autoplay, EffectCoverflow]}
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        slidesPerView={1.2}
        breakpoints={{ 768: { slidesPerView: 2.5 }, 1024: { slidesPerView: 3 } }}
        coverflowEffect={{ rotate: 20, stretch: 0, depth: 200, modifier: 1, slideShadows: true }}
        className="w-full h-[700px]"
      >
        {designs.map((design) => (
          <SwiperSlide key={design.id} className="flex items-center justify-center">
            {({ isActive }) => (
              <motion.div 
                animate={{ 
                  filter: isActive ? "blur(0px) brightness(1)" : "blur(4px) brightness(0.4)",
                  scale: isActive ? 1 : 0.9,
                  z: isActive ? 20 : 0
                }}
                className="relative w-full h-[600px] border border-white/20 shadow-[0_0_50px_rgba(0,0,0,0.8)] preserve-3d"
              >
                <div className="absolute inset-0 border border-white/20 pointer-events-none" />
                <Image src={design.imageUrl} fill className="object-cover" alt={design.title} />
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-30" />
                <div className="absolute bottom-10 left-10 z-20">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-white mb-2">{design.category}</p>
                  <h3 className="text-3xl font-black text-white uppercase tracking-tight">{design.title}</h3>
                </div>
              </motion.div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}