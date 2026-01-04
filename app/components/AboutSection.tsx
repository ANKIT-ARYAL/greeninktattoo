import React from 'react';
import Image from 'next/image';
import { Sparkles, Youtube, ExternalLink } from 'lucide-react';
import StaticReveal from './StaticReveal'; // Use the CSS-only reveal we created

export default function AboutSection() {
  return (
    <section className="bg-neutral-950 px-4 sm:px-8 md:px-12 lg:px-20 w-full py-20">
      <div className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT: Complete Biography */}
          <div className="lg:col-span-6 space-y-8 md:space-y-10 relative z-10">
            
            {/* MOBILE ONLY BACKGROUND (Top Image) */}
            <div className="lg:hidden absolute -top-20 -left-4 -right-4 h-[80vh] pointer-events-none">
              <Image 
                src="/anjit-rai-tattooing.png" 
                alt="Background" 
                fill 
                className="object-cover object-top"
                sizes="100vw"
                quality={60} // Lower quality for mobile background to save speed
              />
              <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/40 via-neutral-950/90 to-neutral-950" />
            </div>

            <StaticReveal>
              <div className="flex items-center gap-2 mb-4 md:mb-6">
                <Sparkles className="text-emerald-500 w-3.5 h-3.5" />
                <span className="text-emerald-500 text-[9px] md:text-[10px] font-black uppercase tracking-[0.5em]">The Masterpiece</span>
              </div>
              
              <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-[8rem] font-display font-bold text-white italic uppercase tracking-tighter leading-none mb-6 md:mb-8 lg:whitespace-nowrap">
                Anjit <span className="text-emerald-500">Rai</span>
              </h2>
              
              <div className="space-y-4 md:space-y-6 text-neutral-400 text-base md:text-lg leading-relaxed font-sans">
                <p>
                  <span className="text-white font-bold">Anjit Rai</span>, the proprietor and lead tattoo artist at ANJIT TATTOO STUDIO, has dedicated his life to transforming art into timeless expressions on skin.
                </p>
                <p>
                  Every tattoo has a story but before the ink touched skin, there was a journey that began in 2012. Today the journey stands on experience, not shortcuts.
                </p>
                <p>
                  In 2022, Anjit fulfilled his dream of opening Anjit Tattoo Studio in Thamel, Kathmandu. His dedication to continuous learning has led him to major conventions, including the Nepal International Tattoo Conventions.
                </p>
              </div>
            </StaticReveal>

            <div className="hidden lg:block">
              <StaticReveal delay="delay-2">
                <YouTubeFeature />
              </StaticReveal>
            </div>
          </div>

          {/* RIGHT: Visual Work Grid */}
          <div className="lg:col-span-6 flex flex-col gap-4 md:gap-6">
            
            {/* Desktop Top Image - Removed 'priority' because the Hero Image is the real priority */}
            <div className="hidden lg:block relative aspect-[16/9] rounded-[2.5rem] overflow-hidden border border-white/10 bg-neutral-900 shadow-2xl">
              <Image 
                src="/anjit-rai-tattooing.png" 
                alt="Anjit Rai" 
                fill 
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={80} 
              />
              <div className="absolute bottom-8 left-8 bg-black/60 backdrop-blur-xl p-5 rounded-2xl border border-white/10">
                <p className="text-white font-display italic text-2xl uppercase leading-none">Lead Artist</p>
                <p className="text-emerald-500 text-[10px] font-black uppercase tracking-widest mt-2">Est. Kathmandu, Nepal</p>
              </div>
            </div>

            {/* Two Images Grid */}
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              <div className="relative aspect-[3/4] rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden border border-white/10 bg-neutral-900">
                <Image 
                  src="/wolf-tattoo.png" 
                  alt="Wolf" 
                  fill 
                  className="object-cover" 
                  sizes="25vw"
                  loading="lazy" // Don't load until the user scrolls down
                />
              </div>
              
              <div className="relative aspect-[3/4] rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden border border-white/10 bg-neutral-900">
                <Image 
                  src="/samurai-tattoo.png" 
                  alt="Samurai" 
                  fill 
                  className="object-cover" 
                  sizes="25vw"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="lg:hidden mt-2">
              <StaticReveal delay="delay-3">
                <YouTubeFeature />
              </StaticReveal>
            </div>
          </div>
        </div>        
      </div>
    </section>
  );
}

function YouTubeFeature() {
  return (
    <div className="relative group rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 bg-neutral-900 shadow-2xl">
      <a 
        href="https://www.youtube.com/watch?v=K9cBUeFQKQc" 
        target="_blank" 
        rel="noopener noreferrer"
        className="block relative aspect-video"
      >
        <Image 
          src="https://img.youtube.com/vi/K9cBUeFQKQc/mqdefault.jpg" // Use 'mq' (medium quality) for faster thumbnail load
          alt="Anjit Rai Interview"
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-red-600 flex items-center justify-center text-white">
            <Youtube className="w-6 h-6 md:w-8 md:h-8" fill="currentColor" />
          </div>
        </div>
      </a>
    </div>
  );
}