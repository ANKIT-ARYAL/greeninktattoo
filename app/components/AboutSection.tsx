'use client';
import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Shield, PenTool, Users, History } from 'lucide-react';

export default function AboutSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const textVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
    }
  };

  const stats = [
    { icon: <Shield size={20} />, label: "Sterile", value: "100%" },
    { icon: <PenTool size={20} />, label: "Custom", value: "Designs" },
    { icon: <Users size={20} />, label: "Global", value: "Clients" },
    { icon: <History size={20} />, label: "Legacy", value: "Thamel" },
  ];

  return (
    <section className="relative py-32 bg-neutral-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* LEFT SIDE: Visual Content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, x: -50 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden border border-white/10">
              <img 
                src="/herobg.jpg" 
                alt="Artist at Work" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent" />
            </div>
            
            {/* Floating Experience Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute -bottom-10 -right-10 hidden md:block bg-emerald-500 p-8 rounded-[2rem] shadow-2xl rotate-3"
            >
              <p className="text-black font-display font-black text-4xl leading-none italic uppercase">
                Est. <br /> 2018
              </p>
            </motion.div>
          </motion.div>

          {/* RIGHT SIDE: Narrative Content */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            <motion.div variants={textVariants} className="space-y-4">
              <span className="text-emerald-500 text-[10px] font-black uppercase tracking-[0.5em]">
                Our Philosophy
              </span>
              <h2 className="text-6xl md:text-7xl font-display font-bold text-white uppercase italic tracking-tighter leading-none">
                More Than <br />
                <span className="text-neutral-800">Just Ink.</span>
              </h2>
              <p className="text-neutral-400 text-lg font-medium leading-relaxed max-w-xl">
                Nestled in the heart of Kathmandu, Anjit Tattoo is a sanctuary for custom artistry. We believe every tattoo is a collaboration—a permanent bridge between your story and our craftsmanship.
              </p>
            </motion.div>

            {/* Core Values Grid */}
            <motion.div 
              variants={textVariants}
              className="grid grid-cols-2 gap-4"
            >
              {stats.map((stat, i) => (
                <div key={i} className="p-6 rounded-3xl bg-neutral-900/50 border border-white/5 hover:border-emerald-500/30 transition-all group">
                  <div className="text-emerald-500 mb-3 group-hover:scale-110 transition-transform">
                    {stat.icon}
                  </div>
                  <h4 className="text-white font-bold text-xl uppercase italic tracking-tighter">
                    {stat.value}
                  </h4>
                  <p className="text-neutral-500 text-[10px] font-black uppercase tracking-widest">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>

            <motion.p variants={textVariants} className="text-neutral-500 text-sm leading-relaxed italic">
              "We don't just follow trends; we create icons that stand the test of time. Your skin is the canvas, and Thamel is our inspiration."
            </motion.p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}