// components/Hero.tsx
import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-black">
      {/* BACKGROUND AREA */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/herobg.jpg" 
          alt="Anjit Tattoo Studio Background"             
          className="w-full h-full object-cover blur-[1px] opacity-40"
          fill
          priority 
          sizes="100vw" // Essential for responsiveness: tells browser to expect full width
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-neutral-950/80"></div>
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* CONTENT AREA */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-[95vw] lg:max-w-7xl mx-auto pt-10 md:pt-20">
        
        {/* Location Badge */}
        <div className="animate-hero delay-1">
          <span className="inline-block text-[9px] md:text-xs font-black tracking-[0.3em] md:tracking-[0.5em] text-emerald-500 uppercase mb-4 md:mb-6 bg-emerald-500/10 px-4 md:px-5 py-2 md:py-2.5 rounded-full border border-emerald-500/20 backdrop-blur-md whitespace-nowrap">
            Thamel, Kathmandu • Nepal
          </span>
        </div>

        {/* Responsive Heading: Uses fluid scaling logic */}
        <div className="animate-hero delay-2">
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[9rem] xl:text-[11rem] font-display font-bold uppercase tracking-tighter mb-6 md:mb-8 text-white leading-[0.9] md:leading-[0.75]">
            Ink That <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-500 italic">
              Endures
            </span>
          </h1>
        </div>

        {/* Subtext: Capped width to prevent long lines on wide screens */}
        <div className="animate-hero delay-3">
          <p className="text-neutral-400 text-base md:text-lg lg:text-xl max-w-sm md:max-w-2xl mx-auto mb-8 md:mb-12 font-medium leading-relaxed">
            Anjit Tattoo brings world-class artistry to the heart of Nepal. Custom designs and impeccable hygiene for your next masterpiece.
          </p>
        </div>

        {/* Responsive Buttons: Stack on mobile, side-by-side on sm+ */}
        <div className="animate-hero delay-4 flex flex-col sm:flex-row gap-4 md:gap-5 justify-center items-center">
          <Link 
            href="/contact" 
            className="w-full sm:w-auto group relative px-8 md:px-12 py-4 md:py-6 bg-white text-black font-black uppercase text-[10px] md:text-[11px] tracking-[0.2em] transition-all hover:scale-105 active:scale-95 rounded-full overflow-hidden text-center"
          >
            <span className="relative z-10">Book Appointment</span>
            <div className="absolute inset-0 bg-emerald-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </Link>

          <Link 
            href="/gallery" 
            className="w-full sm:w-auto px-8 md:px-12 py-4 md:py-6 bg-transparent border border-white/20 text-white font-black uppercase text-[10px] md:text-[11px] tracking-[0.2em] transition-all hover:bg-white hover:text-black hover:border-white rounded-full backdrop-blur-sm text-center"
          >
            View Gallery
          </Link>
        </div>
      </div>

      {/* STATIC DECORATION - Hidden on very small mobile screens to save space */}
      <div className="hidden sm:flex absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 flex-col items-center gap-4">
        <span className="text-[8px] font-black uppercase tracking-[1em] text-white rotate-90 mb-8">Scroll</span>
        <div className="w-[1px] h-12 md:h-16 bg-gradient-to-b from-emerald-500 to-transparent"></div>
      </div>
    </section>
  );
}