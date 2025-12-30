import Link from 'next/link';
import Image from 'next/image';
import Reveal from './Reveal'; // Import the shared client wrapper

export default function Hero() {
  return (
    <section className="relative h-[95vh] flex items-center justify-center overflow-hidden bg-black">
      {/* BACKGROUND IMAGE - Still wraps in Reveal for the fade/scale effect */}
      <Reveal direction="none" duration={1.5} className="absolute inset-0 z-0">
        <Image 
          src="/herobg.jpg" 
          alt="Anjit Tattoo Studio"             
          className="w-full h-full object-cover blur-[2px] opacity-35"
          fill
          priority
          sizes="100vw"
          quality={80}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-neutral-950/60"></div>
      </Reveal>

      {/* CONTENT AREA */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <Reveal delay={0.2}>
          <span className="inline-block text-[10px] md:text-xs font-black tracking-[0.5em] text-emerald-500 uppercase mb-6 bg-emerald-500/10 px-4 py-2 rounded-full border border-emerald-500/20">
            Thamel, Kathmandu • Nepal
          </span>
        </Reveal>

        <Reveal delay={0.3}>
          <h1 className="text-6xl md:text-9xl font-display font-bold uppercase tracking-tighter mb-6 text-white leading-[0.85]">
            Ink That <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-600 italic">
              Endures
            </span>
          </h1>
        </Reveal>

        <Reveal delay={0.4}>
          <p className="text-neutral-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
            Anjit Tattoo brings world-class artistry to the heart of Nepal. Custom designs and impeccable hygiene for your next masterpiece.
          </p>
        </Reveal>

        <Reveal delay={0.5} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link 
            href="/contact" 
            className="group relative px-10 py-5 bg-white text-black font-black uppercase text-[11px] tracking-[0.2em] transition-all hover:scale-105 active:scale-95 rounded-full overflow-hidden"
          >
            <span className="relative z-10">Book Appointment</span>
            <div className="absolute inset-0 bg-emerald-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </Link>

          <Link 
            href="/gallery" 
            className="px-10 py-5 bg-transparent border border-white/20 text-white font-black uppercase text-[11px] tracking-[0.2em] transition-all hover:bg-white hover:text-black hover:border-white rounded-full"
          >
            View Gallery
          </Link>
        </Reveal>
      </div>

      {/* Subtle Scroll Indicator */}
      <Reveal delay={1.5} direction="none" className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <div className="w-[1px] h-12 bg-gradient-to-b from-emerald-500 to-transparent"></div>
      </Reveal>
    </section>
  );
}