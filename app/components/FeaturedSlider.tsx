'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';

interface Design {
  id: string;
  title: string;
  imageUrl: string;
  category: string;
}

export default function FeaturedSlider({ designs }: { designs: Design[] }) {
  const getDisplayUrl = (url: string) => {
    if (!url.includes('instagram.com')) return url;
    const cleanBase = url.split('?')[0].replace(/\/$/, "");
    return `https://images.weserv.nl/?url=${encodeURIComponent(cleanBase + "/media/?size=l")}&w=1000&q=80&output=webp`;
  };

  return (
    <div className="relative py-10 featured-slider-container">
      <Swiper
        modules={[Autoplay, EffectCoverflow]}
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={'auto'}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
          slideShadows: false,
        }}
        className="w-full"
      >
        {designs.map((design) => (
          <SwiperSlide key={design.id} className="max-w-[300px] md:max-w-[500px]">
            {({ isActive }) => (
              <div 
                className={`relative aspect-[3/4] rounded-[2.5rem] md:rounded-[4rem] overflow-hidden transition-all duration-700 ease-in-out border border-white/10 ${
                  isActive 
                    ? 'scale-100 blur-0 opacity-100 shadow-[0_0_50px_rgba(16,185,129,0.2)]' 
                    : 'scale-90 blur-md opacity-40'
                }`}
              >
                <img 
                  src={getDisplayUrl(design.imageUrl)} 
                  alt={design.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay - Only visible when focused */}
                <div className={`absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent transition-opacity duration-700 ${isActive ? 'opacity-90' : 'opacity-0'}`} />
                
                {/* Content - Only visible when focused */}
                <div className={`absolute inset-0 flex flex-col justify-end p-8 md:p-14 transition-all duration-700 ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                  <span className="text-emerald-500 text-[9px] md:text-[11px] font-black uppercase tracking-[0.5em] mb-3">
                    {design.category}
                  </span>
                  <h3 className="text-3xl md:text-5xl font-display font-bold text-white uppercase italic tracking-tighter leading-none">
                    {design.title}
                  </h3>
                </div>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Styles for Swiper */}
      <style jsx global>{`
        .featured-slider-container .swiper {
          overflow: visible !important;
        }
      `}</style>
    </div>
  );
}