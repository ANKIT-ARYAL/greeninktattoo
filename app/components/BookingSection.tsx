'use client';
import { motion, Variants } from "framer-motion";
import { BookingForm } from "./BookingForm";
import { Sparkles, ShieldCheck, Map } from "lucide-react";

export default function BookingSection() {
  // Animation Variants
  const textVariants: Variants = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
    }
  };

  const formVariants: Variants = {
    hidden: { opacity: 0, x: 50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 } 
    }
  };

  return (
    <section className="relative py-32 overflow-hidden bg-neutral-950">
      {/* BACKGROUND IMAGE OVERLAY */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/herobg.jpg" // Using your studio background image
          alt="Studio Ambiance" 
          className="w-full h-full object-cover opacity-10 grayscale brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/90 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-20">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          
          {/* LEFT SIDE: Content */}
          <motion.div 
            variants={textVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex-1 space-y-8"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="text-emerald-500" size={16} />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-500">
                  Reservations
                </span>
              </div>
              <h2 className="text-6xl md:text-7xl font-display font-bold italic uppercase tracking-tighter leading-[0.9] text-white">
                Secure your <br />
                <span className="text-emerald-500">Session</span>
              </h2>
              <p className="text-neutral-400 text-lg max-w-md leading-relaxed font-medium">
                Whether it's your first ink or a complex masterpiece, we provide a sterile, professional environment for your story.
              </p>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
              <div className="flex items-center gap-4 group">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 group-hover:border-emerald-500/50 transition-colors">
                  <ShieldCheck className="text-emerald-500" size={24} />
                </div>
                <div>
                  <h4 className="text-white text-xs font-bold uppercase tracking-widest">Medical Grade</h4>
                  <p className="text-neutral-500 text-[10px] uppercase font-black tracking-tighter">Hygiene Standards</p>
                </div>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 group-hover:border-emerald-500/50 transition-colors">
                  <Map className="text-emerald-500" size={24} />
                </div>
                <div>
                  <h4 className="text-white text-xs font-bold uppercase tracking-widest">Global Artistry</h4>
                  <p className="text-neutral-500 text-[10px] uppercase font-black tracking-tighter">Nepal's Finest</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* RIGHT SIDE: Booking Form */}
          <motion.div 
            variants={formVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex-1 w-full max-w-xl relative"
          >
            {/* Subtle glow behind the form */}
            <div className="absolute -inset-4 bg-emerald-500/10 blur-3xl rounded-full opacity-50" />
            
            <div className="relative bg-neutral-900/40 backdrop-blur-xl p-8 md:p-12 rounded-[2.5rem] border border-white/5 shadow-2xl">
              <div className="mb-8">
                <h3 className="text-2xl font-display font-bold text-white uppercase italic">Inquiry Form</h3>
                <div className="w-12 h-1 bg-emerald-500 mt-2" />
              </div>
              <BookingForm />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}