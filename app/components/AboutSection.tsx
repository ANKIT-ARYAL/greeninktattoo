import Image from 'next/image';
import { Sparkles, Youtube, ExternalLink } from 'lucide-react';
import Reveal from './Reveal';

export default function AboutSection() {
  return (
    /* Removed overflow-hidden to prevent Intersection Observer conflicts */
    <section className="py-32 bg-neutral-950 px-6 md:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* LEFT: Complete Biography */}
          <div className="lg:col-span-6 space-y-10">
            <Reveal direction="right">
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="text-emerald-500" size={14} />
                <span className="text-emerald-500 text-[10px] font-black uppercase tracking-[0.5em]">The Masterpiece</span>
              </div>
              
              <h2 className="text-6xl md:text-8xl font-display font-bold text-white italic uppercase tracking-tighter leading-[0.85] mb-8">
                Anjit <span className="text-neutral-800">Rai</span>
              </h2>
              
              <div className="space-y-6 text-neutral-400 text-lg leading-relaxed">
                <p>
                  <span className="text-white font-bold">Anjit Rai</span>, the proprietor and lead tattoo artist at ANJIT TATTOO STUDIO, has dedicated his life to transforming art into timeless expressions on skin. From a young age, he was drawn to the world of painting, but his passion eventually evolved into the intricate realm of tattooing.
                </p>
                <p>
                  Every tattoo has a story but before the ink touched skin, there was a journey that began in 2012. Today the journey that started in 2012, stands on experience, not shortcuts.
                </p>
                <p>
                  In 2022, Anjit fulfilled his dream of opening Anjit Tattoo Studio in Thamel, Kathmandu. His dedication to continuous learning and global exposure has led him to participate in major conventions, including the Nepal International Tattoo Conventions and Heartwork Tattoo Festival (Delhi).
                </p>
                <p>
                  The years that followed were shaped by growth, styles evolved and hands that grew steadier. All of them mattered. Because tattooing is not about how long you have been doing it. It's about how deeply you have lived it. 
                </p>
              </div>
            </Reveal>

            {/* YouTube Interview Feature */}
            <Reveal direction="up" delay={0.2} className="relative group rounded-3xl overflow-hidden border border-white/10 bg-neutral-900 shadow-2xl min-h-[200px]">
              <a 
                href="https://www.youtube.com/watch?v=K9cBUeFQKQc" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block relative aspect-video"
              >
                <Image 
                  src="https://img.youtube.com/vi/K9cBUeFQKQc/maxresdefault.jpg"
                  alt="Anjit Rai Interview"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center text-white shadow-2xl group-hover:scale-110 transition-transform">
                    <Youtube size={32} fill="currentColor" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                  <div className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
                    <p className="text-[10px] font-black text-white uppercase tracking-widest">Featured Interview</p>
                    <p className="text-white/60 text-[9px] uppercase">On Air with Anit Gurung</p>
                  </div>
                  <div className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white">
                    <ExternalLink size={16} />
                  </div>
                </div>
              </a>
            </Reveal>
          </div>

          {/* RIGHT: Visual Work Grid */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-6">
            <Reveal direction="none" delay={0.1} className="col-span-2 relative aspect-[16/9] rounded-[2.5rem] overflow-hidden border border-white/10 bg-neutral-900 shadow-2xl min-h-[300px]">
              <Image src="/anjit-rai-tattooing.png" alt="Anjit Rai" fill priority className="object-cover object-top" sizes="800px" />
              <div className="absolute bottom-8 left-8 bg-black/60 backdrop-blur-xl p-5 rounded-2xl border border-white/10">
                <p className="text-white font-display italic text-2xl uppercase leading-none">Lead Artist</p>
                <p className="text-emerald-500 text-[10px] font-black uppercase tracking-widest mt-2">Est. Kathmandu, Nepal</p>
              </div>
            </Reveal>

            <Reveal direction="up" delay={0.2} className="relative aspect-[3/4] rounded-[2.5rem] overflow-hidden border border-white/10 bg-neutral-900 min-h-[250px]">
              <Image src="/wolf-tattoo.png" alt="Wolf" fill className="object-cover" sizes="400px" />
            </Reveal>
            
            <Reveal direction="up" delay={0.3} className="relative aspect-[3/4] rounded-[2.5rem] overflow-hidden border border-white/10 bg-neutral-900 min-h-[250px]">
              <Image src="/samurai-tattoo.png" alt="Samurai" fill className="object-cover" sizes="400px" />
            </Reveal>
          </div>
        </div>

        {/* --- TIMELINE SECTION --- */}
        <div className="mt-40 pt-24 border-t border-white/5">
           <Reveal direction="none" delay={0.1}>
             <h3 className="text-center text-white font-display italic text-5xl md:text-6xl uppercase mb-20 tracking-tighter">
               The <span className="text-neutral-800">Journey</span>
             </h3>
           </Reveal>
           
           <div className="relative flex flex-col md:flex-row justify-between items-center gap-12 md:gap-4">
              <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/10 hidden md:block -translate-y-1/2" />
              <TimelinePoint year="2012" desc="Started Tattoo Journey" delay={0.1} />
              <TimelinePoint year="2016" desc="Professional Artist Status" delay={0.2} />
              <TimelinePoint year="2022" desc="Founded Anjit Tattoo Thamel" delay={0.3} />
              <TimelinePoint year="Present" desc="Global Convention Artist" delay={0.4} />
           </div>
        </div>
      </div>
    </section>
  );
}

function TimelinePoint({ year, desc, delay }: { year: string, desc: string, delay: number }) {
  return (
    <Reveal direction="up" delay={delay} className="relative z-10 flex flex-col items-center text-center group">
      <div className="w-16 h-16 rounded-full bg-neutral-900 border border-emerald-500/30 flex items-center justify-center text-emerald-500 font-black text-xs mb-6 shadow-2xl transition-all duration-500 group-hover:bg-emerald-500 group-hover:text-black">
        {year}
      </div>
      <p className="text-white text-[11px] font-black uppercase tracking-[0.2em] mb-1">Year {year}</p>
      <p className="text-neutral-500 text-[10px] font-bold uppercase tracking-widest leading-tight max-w-[140px]">{desc}</p>
    </Reveal>
  );
}