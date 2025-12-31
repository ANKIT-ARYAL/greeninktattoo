import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* BACKGROUND AREA - Priority loading */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/herobg.jpg" 
          alt="Anjit Tattoo Studio Background"             
          className="w-full h-full object-cover blur-[1px] opacity-40"
          fill
          priority 
          fetchPriority="high" 
          sizes="100vw"
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-neutral-950/80"></div>
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* CONTENT AREA */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-20">
        <div className="animate-hero delay-1">
          <span className="inline-block text-[10px] md:text-xs font-black tracking-[0.5em] text-emerald-500 uppercase mb-6 bg-emerald-500/10 px-5 py-2.5 rounded-full border border-emerald-500/20 backdrop-blur-md">
            Thamel, Kathmandu • Nepal
          </span>
        </div>

        <div className="animate-hero delay-2">
          <h1 className="text-6xl md:text-[10rem] font-display font-bold uppercase tracking-tighter mb-8 text-white leading-[0.8] md:leading-[0.75]">
            Ink That <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-500 italic">
              Endures
            </span>
          </h1>
        </div>

        <div className="animate-hero delay-3">
          <p className="text-neutral-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
            Anjit Tattoo brings world-class artistry to the heart of Nepal. Custom designs and impeccable hygiene for your next masterpiece.
          </p>
        </div>

        <div className="animate-hero delay-4 flex flex-col sm:flex-row gap-5 justify-center items-center">
          <Link 
            href="/contact" 
            className="group relative px-12 py-6 bg-white text-black font-black uppercase text-[11px] tracking-[0.2em] transition-all hover:scale-105 active:scale-95 rounded-full overflow-hidden"
          >
            <span className="relative z-10">Book Appointment</span>
            <div className="absolute inset-0 bg-emerald-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </Link>

          <Link 
            href="/gallery" 
            className="px-12 py-6 bg-transparent border border-white/20 text-white font-black uppercase text-[11px] tracking-[0.2em] transition-all hover:bg-white hover:text-black hover:border-white rounded-full backdrop-blur-sm"
          >
            View Gallery
          </Link>
        </div>
      </div>

      {/* STATIC DECORATION */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
        <span className="text-[8px] font-black uppercase tracking-[1em] text-white rotate-90 mb-8">Scroll</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-emerald-500 to-transparent"></div>
      </div>
    </section>
  );
}