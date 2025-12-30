'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Image as ImageIcon, 
  PenTool, 
  Calendar, 
  Settings, 
  LogOut,
  ChevronRight,
  Clock,
  User,
  AlertCircle
} from 'lucide-react';
import { BookingManager } from '../../components/BookingManager';
import { BookingRequest } from '../../types';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('bookings');
  const [bookings, setBookings] = useState<BookingRequest[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch real bookings from Prisma API
  useEffect(() => {
    const fetchBookings = async () => {
  try {
    const res = await fetch('/api/bookings');
    const data = await res.json();
    
    // Check if the response is actually an array
    if (res.ok && Array.isArray(data)) {
      setBookings(data);
    } else {
      console.error("API Error:", data.error || "Unknown error");
      setBookings([]); // Set to empty array so .filter() doesn't break
    }
  } catch (err) {
    console.error("Network error:", err);
    setBookings([]); 
  } finally {
    setLoading(false);
  }
};
    fetchBookings();
  }, []);

  return (
    <div className="min-h-screen bg-black flex text-neutral-400">      
      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 p-12">
        <header className="flex justify-between items-end mb-12">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-600 mb-2">Control Center</p>
            <h2 className="text-4xl font-display font-bold text-white uppercase italic">Overview</h2>
          </div>
          
          <div className="flex gap-4">
            <div className="bg-neutral-900 border border-white/5 px-6 py-3 rounded-2xl">
              <p className="text-[10px] font-bold text-neutral-500 uppercase">Pending Bookings</p>
              <p className="text-2xl font-display font-bold text-white">{Array.isArray(bookings) ? bookings.filter(b => b.status === 'PENDING').length : 0}</p>
            </div>
          </div>
        </header>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          <div className="bg-gradient-to-br from-neutral-900 to-neutral-950 border border-white/5 p-8 rounded-3xl group hover:border-white/10 transition-all">
            <h3 className="text-white font-bold mb-2">Portfolio Management</h3>
            <p className="text-sm text-neutral-500 mb-6">Upload new flash designs or realism pieces to your gallery.</p>
            <Link href="/admin/designs" className="text-xs font-bold uppercase tracking-widest text-white flex items-center gap-2 group-hover:gap-4 transition-all">
              Manage Designs <ChevronRight size={14}/>
            </Link>
          </div>

          <div className="bg-gradient-to-br from-neutral-900 to-neutral-950 border border-white/5 p-8 rounded-3xl group hover:border-white/10 transition-all">
            <h3 className="text-white font-bold mb-2">Journal Entries</h3>
            <p className="text-sm text-neutral-500 mb-6">Write aftercare tips or share the stories behind your tattoos.</p>
            <Link href="/admin/blogs" className="text-xs font-bold uppercase tracking-widest text-white flex items-center gap-2 group-hover:gap-4 transition-all">
              Write Post <ChevronRight size={14}/>
            </Link>
          </div>
        </div>

        {/* LIVE BOOKING FEED */}
        <div className="bg-neutral-950 border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
          <div className="p-6 border-b border-white/5 flex items-center justify-between">
            <h3 className="text-lg font-display font-bold text-white uppercase tracking-tight flex items-center gap-2">
              <Calendar size={18} className="text-neutral-500" /> Recent Inquiries
            </h3>
          </div>
          
          <div className="p-6">
            {loading ? (
              <div className="animate-pulse flex space-y-4 flex-col">
                <div className="h-20 bg-white/5 rounded-2xl w-full"></div>
                <div className="h-20 bg-white/5 rounded-2xl w-full"></div>
              </div>
            ) : bookings.length > 0 ? (
              <BookingManager bookings={bookings} />
            ) : (
              <div className="py-20 text-center border-2 border-dashed border-white/5 rounded-3xl">
                <AlertCircle size={40} className="mx-auto text-neutral-800 mb-4" />
                <p className="text-neutral-600">No pending booking requests found.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}