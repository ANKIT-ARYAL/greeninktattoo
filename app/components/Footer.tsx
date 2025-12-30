import React from 'react';
import { Instagram, Facebook, MapPin, Mail, Phone, Clock } from 'lucide-react';
import Image from 'next/image';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-950 border-t border-white/5 text-neutral-500 py-16">
      <div className="px-6 md:px-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <Image
              src="/logo.png"
              alt="Anjit Tattoo Logo"
              width={120}
              height={60}
              className="invert opacity-80"
            />
            <p className="text-sm leading-relaxed max-w-xs font-medium">
              Professional tattoo studio located in the heart of Thamel. 
              We bring your stories to life with precision and art.
            </p>
            <div className="flex items-center gap-5">
              <a href="https://www.instagram.com/anjit_tattoo/" className="text-neutral-600 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-neutral-600 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
            </div>
          </div>
          
          {/* Contact Column */}
          <div className="flex flex-col">
            <h3 className="text-white text-xs font-black uppercase tracking-[0.3em] mb-6">Location & Reach</h3>
            <ul className="space-y-4 text-sm font-medium">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-emerald-500 shrink-0" />
                <span>Thamel, Kathmandu, Nepal <br/> <span className="text-[10px] text-neutral-700 uppercase">Opposite to Garden of Dreams</span></span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-emerald-500 shrink-0" />
                <span>+977 9840015954</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-emerald-500 shrink-0" />
                <span className="break-all">anjittattoo@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Hours Column */}
          <div className="flex flex-col">
            <h3 className="text-white text-xs font-black uppercase tracking-[0.3em] mb-6">Opening Hours</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Clock size={18} className="text-emerald-500" />
                <div className="flex flex-col">
                  <span className="text-sm text-neutral-300 font-bold uppercase italic">Everyday</span>
                  <span className="text-sm">11:00 AM — 8:00 PM</span>
                </div>
              </div>
              <div className="inline-block px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Open Now</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-neutral-700">
          <p>© {new Date().getFullYear()} Anjit Tattoo Studio.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-neutral-400">Privacy Policy</a>
            <a href="#" className="hover:text-neutral-400">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};