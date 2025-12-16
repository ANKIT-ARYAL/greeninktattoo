import React from 'react';
import { Instagram, Facebook, MapPin, Mail, Phone } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-900 border-t border-white/10 text-gray-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-white text-lg font-display font-bold uppercase mb-4">Anjit Tattoo</h3>
          <p className="mb-4 text-sm">
            Professional tattoo studio located in the heart of Thamel. We bring your stories to life with ink.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-white transition"><Instagram size={20} /></a>
            <a href="#" className="hover:text-white transition"><Facebook size={20} /></a>
          </div>
        </div>
        
        <div>
          <h3 className="text-white text-lg font-display font-bold uppercase mb-4">Contact</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <MapPin size={16} /> Thamel, Kathmandu, Nepal
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} /> +977 980-0000000
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} /> info@anjittattoo.com
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-white text-lg font-display font-bold uppercase mb-4">Hours</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex justify-between"><span>Sunday - Friday</span> <span>10:00 AM - 8:00 PM</span></li>
            <li className="flex justify-between"><span>Saturday</span> <span>11:00 AM - 6:00 PM</span></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 mt-8 pt-8 border-t border-white/5 text-center text-xs text-gray-600">
        © {new Date().getFullYear()} Anjit Tattoo Studio. All rights reserved.
      </div>
    </footer>
  );
};