'use client';
import React, { useState } from 'react';
import { Check, X, Calendar, Clock, Phone } from 'lucide-react';
import { BookingRequest } from '../types';

export const BookingManager = ({ bookings }: { bookings: BookingRequest[] }) => {
  const [reschedulingId, setReschedulingId] = useState<string | null>(null);

  const updateStatus = async (id: string, status: string) => {
    await fetch(`/api/bookings/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
    alert(`Booking ${status}`);
    window.location.reload(); // Temporary way to refresh data
  };

  return (
    <div className="space-y-4">
      {bookings.map((booking) => (
        <div key={booking.id} className="group relative bg-neutral-900 border border-white/5 p-6 rounded-2xl hover:border-white/20 transition-all">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="text-white font-bold text-lg">{booking.name}</h4>
              <div className="flex gap-4 text-sm text-neutral-500 mt-1">
                <span className="flex items-center gap-1"><Clock size={14}/> {new Date(booking.scheduledAt).toLocaleString()}</span>
                <span className="flex items-center gap-1"><Phone size={14}/> {booking.contactNumber}</span>
              </div>
            </div>

            <div className="flex gap-2">
              {/* ACCEPT BUTTON */}
              <button 
                onClick={() => updateStatus(booking.id, 'CONFIRMED')}
                className="p-2 bg-white text-black rounded-lg hover:bg-neutral-200 transition-colors"
              >
                <Check size={18} />
              </button>

              {/* RESCHEDULE BUTTON */}
              <button 
                onClick={() => setReschedulingId(booking.id)}
                className="p-2 bg-neutral-800 text-white rounded-lg hover:bg-neutral-700 transition-colors"
              >
                <Calendar size={18} />
              </button>

              {/* REJECT BUTTON */}
              <button 
                onClick={() => updateStatus(booking.id, 'REJECTED')}
                className="p-2 border border-red-500/20 text-red-500 rounded-lg hover:bg-red-500/10 transition-colors"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* If the admin clicks Reschedule, show this mini-form */}
          {reschedulingId === booking.id && (
            <div className="mt-4 pt-4 border-t border-white/5 flex gap-2 items-center animate-in slide-in-from-top-2">
              <input type="datetime-local" className="bg-black border border-white/10 text-white p-2 rounded-lg text-sm outline-none" />
              <button className="text-xs font-bold uppercase text-white bg-blue-600 px-3 py-2 rounded-lg">Update Time</button>
              <button onClick={() => setReschedulingId(null)} className="text-xs text-neutral-500">Cancel</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};