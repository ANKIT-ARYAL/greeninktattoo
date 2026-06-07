'use client';
import React from 'react';
import { BookingForm } from "./BookingForm";
import { Mail, Instagram, MapPin } from 'lucide-react';
import ReviewSlider from './Reviews';

export default function BookingSection() {
  const contactInfo = [
    { icon: Mail, title: "Email me at", value: "greeninktattoo1@gmail.com" },
    { icon: Instagram, title: "Follow us on Instagram", value: "@green_inktattoo" },
    { icon: MapPin, title: "Tattooing at", value: "Thamel – Kathmandu, Nepal" }
  ];

  return (
    <section id="booking" className="py-24 text-white">
      <div className="max-w-7xl mx-auto px-8 mb-24">
        <h3 className="text-7xl font-pirata text-emerald-700 uppercase tracking-wider mb-12">What Clients<span className='text-white'> Say</span></h3>
        <ReviewSlider /> 
      </div>
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* LEFT: Contact & Info */}
        <div className="space-y-12">
          <div>
            <h2 className="text-6xl md:text-7xl font-pirata uppercase mb-8">Let's Create <br /><span className='text-emerald-700'>Something Permanent.</span></h2>
            <p className="text-white/60 max-w-sm font-allura">
              Custom tattoos are available by appointment and walk-ins are welcome. Share your idea and I'll create a design made to last a lifetime.
            </p>
          </div>

          <div className="space-y-6">
            {contactInfo.map((info, i) => (
              <div key={i} className="border border-white/10 rounded-2xl p-6 flex items-center gap-4 hover:border-white/30 transition-all">
                <div className="p-3 bg-white/5 rounded-full"><info.icon size={20} /></div>
                <div className='font-allura'>
                  <p className="text-[10px] uppercase tracking-widest text-white/50">{info.title}</p>
                  <p className="text-sm">{info.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: Booking Form */}
        <div className="bg-[#0a0a0a] border border-white/10 p-8 rounded-3xl">
        <h1 className='font-pirata tracking-wider text-3xl p-3 text-white' >Book an <span className='text-emerald-700'>Appointment</span></h1>
          <BookingForm />
        </div>
      </div>
    </section>
  );
}