'use client';
import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Award, ShieldCheck, Zap } from 'lucide-react';

export default function AboutSection() {
  const textVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section className="py-32 bg-neutral-950 px-6 md:px-20 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT: The Biography & Story */}
          <div className="lg:col-span-5 space-y-8">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={textVariants}>
              <span className="text-emerald-500 text-[10px] font-black uppercase tracking-[0.5em] mb-4 block">Artist Profile</span>
              <h2 className="text-6xl md:text-8xl font-display font-bold text-white italic uppercase tracking-tighter leading-[0.85] mb-6">
                Anjit <span className="text-neutral-800">Rai</span>
              </h2>
              <p className="text-neutral-400 text-lg leading-relaxed mb-6 [text-wrap:balance]">
                Proprietor and lead artist at Anjit Tattoo Studio, Anjit has dedicated his life to transforming art into timeless expressions on skin. Starting as a junior trainee in 2012, he spent a decade mastering Black & Grey and New School styles before opening his Thamel sanctuary in 2022.
              </p>
              
              <div className="flex flex-wrap gap-4">
                 <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] text-white font-bold uppercase tracking-widest">
                    <ShieldCheck size={14} className="text-emerald-500" /> Professional since 2012
                 </div>
                 <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] text-white font-bold uppercase tracking-widest">
                    <Zap size={14} className="text-emerald-500" /> New School Specialist
                 </div>
              </div>
            </motion.div>

            {/* The Quote from the Image */}
            <motion.blockquote 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="border-l-4 border-emerald-500 pl-6 py-4 bg-neutral-900/30 rounded-r-3xl"
            >
              <p className="text-white text-xl italic font-display leading-tight">
                "Tattooing is not just art—it is about capturing memories, aspirations, and emotions in ink, turning them into permanent stories on skin."
              </p>
            </motion.blockquote>
          </div>

          {/* RIGHT: Visual Work Grid (The "Magazine" Look) */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-4">
            {/* Main Portrait */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="col-span-2 relative aspect-[16/9] rounded-[2rem] overflow-hidden border border-white/10"
            >
              <img src="/anjit-rai-tattooing.png" alt="Anjit Rai" className="w-full h-full object-cover object-top" />
              <div className="absolute bottom-6 left-6 bg-black/60 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                <p className="text-white font-display italic text-2xl uppercase">Lead Artist</p>
                <p className="text-emerald-500 text-[10px] font-black uppercase tracking-widest">Est. Kathmandu, Nepal</p>
              </div>
            </motion.div>

            {/* Featured Designs from the Magazine */}
            <motion.div whileHover={{ y: -10 }} className="aspect-[3/4] rounded-[2rem] overflow-hidden border border-white/10 bg-neutral-900">
              <img src="/wolf-tattoo.png" alt="Wolf Design" className="w-full h-full object-cover" />
            </motion.div>
            
            <motion.div whileHover={{ y: -10 }} className="aspect-[3/4] rounded-[2rem] overflow-hidden border border-white/10 bg-neutral-900">
              <img src="/samurai-tattoo.png" alt="Samurai Design" className="w-full h-full object-cover" />
            </motion.div>
          </div>
        </div>

        {/* --- TIMELINE SECTION --- */}
        <div className="mt-32 pt-20 border-t border-white/5">
           <h3 className="text-center text-white font-display italic text-4xl uppercase mb-16">The Journey</h3>
           <div className="relative flex flex-col md:flex-row justify-between items-center gap-8">
              {/* Central Line */}
              <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/10 hidden md:block" />
              
              <TimelinePoint year="2012" desc="Junior Trainee at Tikejhya" />
              <TimelinePoint year="2016" desc="Professional Artist Status" />
              <TimelinePoint year="2022" desc="Founded Anjit Tattoo Thamel" />
              <TimelinePoint year="Present" desc="Global Convention Artist" />
           </div>
        </div>
      </div>
    </section>
  );
}

function TimelinePoint({ year, desc }: { year: string, desc: string }) {
  return (
    <motion.div 
      whileInView={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 20 }}
      className="relative z-10 flex flex-col items-center text-center max-w-[200px]"
    >
      <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center text-black font-black text-xs mb-4 shadow-[0_0_20px_rgba(16,185,129,0.5)]">
        {year}
      </div>
      <p className="text-neutral-500 text-[10px] font-black uppercase tracking-widest leading-tight">{desc}</p>
    </motion.div>
  );
}