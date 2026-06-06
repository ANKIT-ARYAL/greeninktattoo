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

  return (
    <div className="relative min-h-screen  pt-48 pb-24 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto w-full">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* LEFT: Branding & Info */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-5 space-y-12"
          >
            <div>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white">Inquiry & Booking</span>
                <div className={`flex items-center gap-1.5 px-3 py-1 border ${isOpen ? 'border-emerald-500/30 text-white' : 'border-red-500/30 text-red-400'}`}>
                  {isOpen ? <CheckCircle2 size={10} /> : <XCircle size={10} />}
                  <span className="text-[8px] font-black uppercase tracking-widest">{isOpen ? 'Open Now' : 'Closed'}</span>
                </div>
              </div>

              <h1 className="text-6xl md:text-8xl font-header text-white uppercase tracking-wider leading-[0.9] mb-8">
                Let's Start <br/> 
                <span className="text-white">Your Story</span>
              </h1>
              <p className="text-neutral-400 text-lg leading-relaxed max-w-sm">
                Located in the heart of Thamel. Custom ink, precise execution, and a environment built for your vision.
              </p>
            </div>

            {/* Info Cards */}
            <div className="space-y-4">
              {[
                { icon: MapPin, title: 'Studio', desc: 'Bhagwati Bahal, Thamel' },
                { icon: Phone, title: 'Reach Out', desc: '+977 9801017750' },
                { icon: Clock, title: 'Opening Hours', desc: '11:00 AM — 08:00 PM' }
              ].map((item, i) => (
                <div key={i} className="group p-6 border border-white/10 hover:border-white/20 transition-all flex items-start gap-6">
                  <div className="text-white mt-1"><item.icon size={18} /></div>
                  <div>
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-white mb-1">{item.title}</h3>
                    <p className="text-neutral-500 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT: Booking Form */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-7 bg-[#0a0a0a] border border-white/10 p-8 md:p-16"
          >
            <div className="mb-10">
              <h2 className="text-3xl font-header text-white uppercase tracking-wider">Book an Appointment</h2>
              <p className="text-white text-[10px] font-black uppercase tracking-[0.3em] mt-2">Response within 24 hours</p>
            </div>
            <BookingForm />
          </motion.div>
        </div>
      </div>
    </div>
  );
}