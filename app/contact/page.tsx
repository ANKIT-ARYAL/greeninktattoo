import React from 'react';
import { BookingForm } from '../components/BookingForm';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-neutral-950 pt-32 pb-24 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h1 className="text-5xl font-display font-bold text-white mb-6">Get In Touch</h1>
          <p className="text-gray-400 text-lg mb-8">
            Located in the vibrant streets of Thamel, we are open 6 days a week. Drop by for a consultation or book your slot online.
          </p>
          
          <div className="space-y-6">
            <div className="bg-neutral-900 p-6 rounded-lg border border-white/5">
              <h3 className="text-white font-bold mb-2">Studio Location</h3>
              <p className="text-gray-400">Chaksibari Marg, Thamel<br/>Kathmandu 44600, Nepal</p>
            </div>
             <div className="bg-neutral-900 p-6 rounded-lg border border-white/5">
              <h3 className="text-white font-bold mb-2">Direct Contact</h3>
              <p className="text-gray-400">Phone: +977 980-0000000</p>
              <p className="text-gray-400">Email: info@anjittattoo.com</p>
            </div>
          </div>
        </div>
        <div>
          <BookingForm />
        </div>
      </div>
    </div>
  );
}