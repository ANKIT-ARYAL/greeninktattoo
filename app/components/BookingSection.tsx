import { BookingForm } from "./BookingForm";
import { Sparkles, ShieldCheck, Map } from "lucide-react";
import Reveal from "./Reveal"; 

export default function BookingSection() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden bg-neutral-950">
      {/* BACKGROUND IMAGE OVERLAY */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/herobg.jpg" 
          alt="Studio Ambiance" 
          className="w-full h-full object-cover opacity-10 grayscale brightness-50"
        />
        {/* Changed gradient to adapt to vertical stacking on mobile */}
        <div className="absolute inset-0 bg-gradient-to-b lg:bg-gradient-to-r from-neutral-950 via-neutral-950/90 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-20">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* LEFT SIDE: Content */}
          <div className="flex-1 space-y-6 md:space-y-8">
            <Reveal direction="right" className="space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="text-emerald-500" size={14} />
                <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] text-neutral-500">
                  Reservations
                </span>
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-7xl font-display font-bold italic uppercase tracking-tighter leading-[0.9] text-white">
                Secure your <br />
                <span className="text-emerald-500">Session</span>
              </h2>
              <p className="text-neutral-400 text-base md:text-lg max-w-md leading-relaxed font-medium">
                Whether it's your first ink or a complex masterpiece, we provide a sterile, professional environment for your story.
              </p>
            </Reveal>

            {/* Trust Badges - Stack on mobile, grid on sm+ */}
            <Reveal direction="right" delay={0.2} className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 pt-4 md:pt-6">
              <div className="flex items-center gap-4 group">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 group-hover:border-emerald-500/50 transition-colors">
                  <ShieldCheck className="text-emerald-500" size={20}/>
                </div>
                <div>
                  <h4 className="text-white text-[10px] md:text-xs font-bold uppercase tracking-widest">Medical Grade</h4>
                  <p className="text-neutral-500 text-[8px] md:text-[10px] uppercase font-black tracking-tighter">Hygiene Standards</p>
                </div>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 group-hover:border-emerald-500/50 transition-colors">
                  <Map className="text-emerald-500" size={20}/>
                </div>
                <div>
                  <h4 className="text-white text-[10px] md:text-xs font-bold uppercase tracking-widest">Global Artistry</h4>
                  <p className="text-neutral-500 text-[8px] md:text-[10px] uppercase font-black tracking-tighter">Nepal's Finest</p>
                </div>
              </div>
            </Reveal>
          </div>
          
          {/* RIGHT SIDE: Booking Form */}
          <Reveal direction="left" delay={0.3} className="flex-1 w-full max-w-xl relative">
            <div className="absolute -inset-4 bg-emerald-500/10 blur-3xl rounded-full opacity-50" />
            
            <div className="relative bg-neutral-900/40 backdrop-blur-xl p-6 sm:p-8 md:p-12 rounded-[1.5rem] md:rounded-[2.5rem] border border-white/5 shadow-2xl">
              <div className="mb-6 md:mb-8">
                <h3 className="text-xl md:text-2xl font-display font-bold text-white uppercase italic">Inquiry Form</h3>
                <div className="w-12 h-1 bg-emerald-500 mt-2" />
              </div>
              <BookingForm />
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}