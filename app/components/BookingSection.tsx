'use client';
import React from 'react';
import { BookingForm } from "./BookingForm";
import { ShieldCheck, Zap } from "lucide-react";
import Reveal from "./Reveal"; 

interface BookingSectionProps {
  showGlow?: boolean;
}

export default function BookingSection({ showGlow = false }: BookingSectionProps) {
  return (    
    <section className="relative w-[100vw] left-1/2 right-1/2 -ml-[50vw] overflow-hidden bg-[#050505]">
      
      {/* 1. SEAMLESS BACKGROUND (Zero Padding, Full Screen Width) */}
      {showGlow && (
        <div className="absolute inset-0 z-0 pointer-events-none flex">
          {/* THE 40% EMERALD SIDE - Fixed Width */}
          <div className="w-full h-full bg-emerald-900 relative">
             {/* Edge glow to make the green feel richer */}
             <div className="absolute inset-y-0 left-0 w-1/4 bg-emerald-900 blur-3xl" />
          </div>

          {/* THE 60% BLACK SIDE */}
          <div className="w-[60%] h-full bg-black" />

          {/* THE HORIZONTAL BLEND: Merges the 40/60 split naturally */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 via-black/90 to-black" />
          
          <div className="absolute inset-0 bg-grain opacity-[0.05]" />
        </div>
      )}
      
      {/* 2. CONTENT CONTAINER (Padding only inside here) */}
      <div className="relative z-10 max-w-[1920px] mx-auto px-6 sm:px-12 lg:px-24 py-20 md:py-32">
        
        {/* THE BOX CONTAINER */}
        <div className="flex flex-col border border-white/5 rounded-[2.5rem] overflow-hidden bg-black/20 backdrop-blur-3xl shadow-2xl">
          
          {/* Top Header Bar */}
          <div className="w-full border-b border-white/5 px-8 md:px-16 py-8 flex justify-between items-center bg-white/[0.01]">
            <div className="flex items-center gap-4">
               <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.5)] animate-pulse" />
               <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40">Consultation Unit</span>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row items-stretch gap-0">
            {/* LEFT SIDE: 50% Content */}
            <div className="w-full lg:w-1/2 p-8 md:p-16 lg:p-20 flex flex-col justify-start border-b lg:border-b-0 lg:border-r border-white/5">
              <Reveal direction="right" className="space-y-10">
                <h2 className="text-5xl md:text-7xl font-display font-bold italic uppercase tracking-tighter leading-[0.85] text-white">
                  Secure <br />
                  <span className="text-emerald-500">Your Session</span>
                </h2>
                
                <p className="text-neutral-400 text-sm md:text-base leading-relaxed font-body max-w-sm">
                  Merging world-class precision with Kathmandu soul. Experience the highest medical-grade safety in an elite studio environment.
                </p>

                <div className="pt-4 space-y-6">
                  <div className="flex items-center gap-5 group">
                    <div className="p-2.5 rounded-full bg-emerald-500/10 text-emerald-500">
                      <ShieldCheck size={16} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-neutral-300 block transition-colors group-hover:text-emerald-500">Medical Grade Safety</span>
                  </div>
                  
                  <div className="flex items-center gap-5 group">
                    <div className="p-2.5 rounded-full bg-emerald-500/10 text-emerald-500">
                      <Zap size={16} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-neutral-300 block transition-colors group-hover:text-emerald-500">Custom Originality</span>
                  </div>
                </div>
              </Reveal>
            </div>
            
            {/* RIGHT SIDE: 50% Form */}
            <div className="w-full lg:w-1/2 p-8 md:p-16 lg:p-20 flex flex-col justify-start bg-black/40">
              <Reveal direction="left" delay={0.2} className="w-full">
                 <div className="mb-12">
                    <h3 className="text-[10px] font-black text-white uppercase tracking-[0.4em]">Inquiry Form</h3>
                    <div className="h-[2px] w-10 bg-emerald-500 mt-3" />
                 </div>
                 <BookingForm />
              </Reveal>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}