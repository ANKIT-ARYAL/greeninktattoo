'use client';
import React, { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import { BookingForm } from '../components/BookingForm';
import { MapPin, Phone, Clock, Sparkles, Navigation, XCircle, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const checkStatus = () => {
      const ktmTime = new Date().toLocaleString("en-US", { timeZone: "Asia/Kathmandu" });
      const hours = new Date(ktmTime).getHours();
      setIsOpen(hours >= 11 && hours < 20);
    };
    checkStatus();
    const interval = setInterval(checkStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  // Animation Variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.5, ease: "easeOut" } 
    }
  };

  return (
    <div className="relative min-h-screen bg-neutral-950 pt-32 pb-24 overflow-hidden">
      {/* Background Orbs */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.08, 0.05] 
        }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500 rounded-full blur-[120px] -z-10" 
      />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-white/5 blur-[100px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* LEFT COLUMN: Info & Branding */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="lg:col-span-5 space-y-12"
          >
            <motion.div variants={itemVariants}>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="text-emerald-500" size={16} />
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-500">Inquiry & Booking</span>
                </div>
                <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border ${isOpen ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>
                  {isOpen ? <CheckCircle2 size={10} /> : <XCircle size={10} />}
                  <span className="text-[9px] font-black uppercase tracking-widest">{isOpen ? 'Open Now' : 'Closed'}</span>
                </div>
              </div>

              <h1 className="text-6xl md:text-7xl font-display font-bold text-white uppercase italic tracking-tighter leading-none mb-6">
                Let's Start <br />
                <span className="text-neutral-800">Your Story</span>
              </h1>
              <p className="text-neutral-400 text-lg font-medium leading-relaxed max-w-md">
                Located in the vibrant heart of Thamel. We are ready to transform your ideas into permanent masterpieces.
              </p>
            </motion.div>

            {/* Contact Grid */}
            <div className="grid grid-cols-1 gap-4">
              {/* Address Card */}
              <motion.div variants={itemVariants} className="group bg-neutral-900/40 backdrop-blur-sm p-6 rounded-3xl border border-white/5 hover:border-emerald-500/30 transition-all duration-500">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-neutral-800 rounded-2xl text-emerald-500 group-hover:scale-110 transition-transform">
                    <MapPin size={20} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white text-xs font-black uppercase tracking-widest mb-1">Studio Address</h3>
                    <p className="text-neutral-500 text-sm leading-relaxed italic mb-4">
                      Chaksibari Marg, Thamel, Kathmandu
                    </p>
                    
                    <div className="w-full h-40 rounded-2xl overflow-hidden border border-white/5 opacity-50 hover:opacity-100 transition-all duration-700">
                      <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.181824479901!2d85.3093223!3d27.7116172!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19003366f68b%3A0xc0733d712fa6b45a!2sAnjit%20Tattoo%20Studio!5e0!3m2!1sen!2snp!4v1700000000000" 
                        width="100%" 
                        height="100%" 
                        style={{ border: 0 }} 
                        allowFullScreen 
                        loading="lazy"
                      />
                    </div>

                    <a 
                      href="https://maps.app.goo.gl/YourActualLinkHere" 
                      target="_blank" 
                      className="inline-flex items-center gap-2 text-[10px] text-white font-bold uppercase mt-4 tracking-widest hover:text-emerald-500 transition-colors"
                    >
                      <Navigation size={12} /> Get Directions
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* Phone Card */}
              <motion.div variants={itemVariants} className="group bg-neutral-900/40 backdrop-blur-sm p-6 rounded-3xl border border-white/5 hover:border-emerald-500/30 transition-all duration-500">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-neutral-800 rounded-2xl text-emerald-500 group-hover:scale-110 transition-transform">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h3 className="text-white text-xs font-black uppercase tracking-widest mb-1">Reach Out</h3>
                    <p className="text-neutral-500 text-sm font-medium">+977 9840015954</p>
                    <p className="text-neutral-500 text-sm font-medium">anjittattoo@gmail.com</p>
                  </div>
                </div>
              </motion.div>

              {/* Hours Card */}
              <motion.div variants={itemVariants} className="group bg-neutral-900/40 backdrop-blur-sm p-6 rounded-3xl border border-white/5 hover:border-emerald-500/30 transition-all duration-500">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-neutral-800 rounded-2xl text-emerald-500 group-hover:scale-110 transition-transform">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h3 className="text-white text-xs font-black uppercase tracking-widest mb-1">Opening Hours</h3>
                    <p className="text-neutral-500 text-sm font-medium">Monday — Sunday</p>
                    <p className="text-neutral-300 text-sm font-bold italic tracking-tight">11:00 AM — 08:00 PM</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: The Form Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-7 relative"
          >
            <div className="absolute -inset-1 bg-gradient-to-tr from-emerald-500/20 to-white/5 blur-2xl opacity-20" />
            <div className="relative bg-neutral-900/80 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-[2.5rem] shadow-2xl">
              <div className="mb-10">
                <h2 className="text-3xl font-display font-bold text-white uppercase italic tracking-tighter">
                  Book an Appointment
                </h2>
                <p className="text-neutral-500 text-xs font-bold uppercase tracking-widest mt-2">
                  Response within 24 hours
                </p>
              </div>
              <BookingForm />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}