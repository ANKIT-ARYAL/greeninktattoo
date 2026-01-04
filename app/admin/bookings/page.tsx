'use client';
import React, { useState, useEffect } from 'react';
import { 
  Calendar, Clock, User, Phone, Mail, Trash2, CheckCircle2, 
  XCircle, Loader2, Download, Eye, ExternalLink, CalendarClock, AlertCircle, FileText
} from 'lucide-react';

export default function BookingsAdminPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [adjustedTimes, setAdjustedTimes] = useState<{ [key: string]: string }>({});
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchBookings = async () => {
    try {
      const res = await fetch('/api/bookings');
      const data = await res.json();
      if (Array.isArray(data)) setBookings(data);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const formatForInput = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const offset = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() - offset).toISOString().slice(0, 16);
  };

  const downloadImage = (base64Data: string, fileName: string) => {
    try {
      if (!base64Data.includes('base64,')) {
        window.open(base64Data, '_blank');
        return;
      }
      const parts = base64Data.split(';base64,');
      const contentType = parts[0].split(':')[1];
      const raw = window.atob(parts[1]);
      const uInt8Array = new Uint8Array(raw.length);
      for (let i = 0; i < raw.length; ++i) { uInt8Array[i] = raw.charCodeAt(i); }
      const blob = new Blob([uInt8Array], { type: contentType });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `anjit-tattoo-${fileName.replace(/\s+/g, '-').toLowerCase()}`;
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      const link = document.createElement("a");
      link.href = base64Data;
      link.download = "design.png";
      link.click();
    }
  };

  const handleUpdate = async (id: string, currentStatus: string, originalTime: string) => {
    setActionLoading(id);
    const newStatus = currentStatus === 'PENDING' ? 'CONFIRMED' : currentStatus;
    const finalTime = adjustedTimes[id] || originalTime;
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          status: newStatus,
          scheduledAt: new Date(finalTime).toISOString()
        })
      });
      if (res.ok) {
        if (newStatus === 'CONFIRMED') alert("Booking confirmed and email sent!");
        fetchBookings();
      }
    } catch (err) {
      alert("Error updating booking.");
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this inquiry?")) return;
    try {
      const res = await fetch(`/api/bookings/${id}`, { method: 'DELETE' });
      if (res.ok) fetchBookings();
    } catch (err) {
      alert("Delete failed");
    }
  };

  return (
    <div className="space-y-10 p-8 min-h-screen bg-black text-white">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/5 pb-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <p className="text-xs font-bold text-neutral-500 uppercase tracking-[0.3em]">Studio Control</p>
          </div>
          <h1 className="text-6xl font-display font-bold uppercase italic tracking-tighter">Inquiries</h1>
        </div>
        <div className="text-right">
          <p className="text-3xl font-display font-bold text-neutral-800 uppercase italic leading-none">{bookings.length}</p>
          <p className="text-[10px] font-bold text-neutral-600 uppercase tracking-widest">Total Requests</p>
        </div>
      </header>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-32 space-y-4">
          <Loader2 className="animate-spin text-neutral-800" size={40} />
          <p className="text-neutral-500 font-bold uppercase text-[10px] tracking-widest">Loading Records...</p>
        </div>
      ) : (
        <div className="grid gap-8">
          {bookings.map((booking) => (
            <div 
              key={booking.id} 
              className={`group relative bg-neutral-900/30 border ${booking.status === 'CONFIRMED' ? 'border-emerald-500/20 shadow-[0_0_50px_-12px_rgba(16,185,129,0.1)]' : 'border-white/5'} rounded-[2.5rem] p-8 transition-all duration-500 hover:bg-neutral-900/50`}
            >
              <div className="grid lg:grid-cols-12 gap-10 items-start">
                
                {/* 1. Profile & Info */}
                <div className="lg:col-span-4 space-y-6">
                  <div className="flex items-center gap-5">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-neutral-800 to-neutral-900 border border-white/10 flex items-center justify-center text-2xl font-black italic text-white shadow-2xl">
                      {booking.name[0]}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold tracking-tight">{booking.name}</h3>
                      <div className={`mt-1 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                        booking.status === 'CONFIRMED' ? 'bg-emerald-500 text-black' : 'bg-amber-500 text-black'
                      }`}>
                        {booking.status === 'CONFIRMED' ? <CheckCircle2 size={10}/> : <Clock size={10}/>}
                        {booking.status}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-white/5">
                    <div className="bg-black/20 p-4 rounded-2xl border border-white/5">
                      <p className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest mb-2">Requested Slot</p>
                      <div className="flex items-center gap-3 text-emerald-500">
                        <Calendar size={14} />
                        <span className="text-sm font-bold uppercase tracking-tight">
                          {new Date(booking.scheduledAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-white mt-1">
                        <Clock size={14} />
                        <span className="text-lg font-display italic font-bold">
                          {new Date(booking.scheduledAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2 px-1">
                        <div className="flex items-center gap-3 text-neutral-400">
                          <Phone size={14} className="text-neutral-700" />
                          <span className="text-xs font-medium">{booking.contactNumber}</span>
                        </div>
                        <div className="flex items-center gap-3 text-neutral-400">
                          <Mail size={14} className="text-neutral-700" />
                          <span className="text-xs font-medium">{booking.email}</span>
                        </div>
                    </div>
                  </div>
                </div>

                {/* 2. Reference & Description Management */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="bg-black/40 rounded-3xl p-6 border border-white/5 space-y-6">
                    {/* IMAGE SECTION */}
                    <div>
                      <p className="text-[10px] font-bold text-neutral-600 uppercase mb-3 tracking-widest flex items-center gap-2">
                        <Eye size={12}/> Art Reference
                      </p>
                      
                      {/* Priority check for designData or Base64 description */}
                      {(booking.designData || (booking.description && booking.description.startsWith('data:image'))) ? (
                        <div className="flex flex-col sm:flex-row items-center gap-4">
                          <img 
                            src={booking.designData || booking.description} 
                            className="w-20 h-20 rounded-xl object-cover border border-white/10 hover:scale-105 transition-transform cursor-pointer" 
                            alt="Design" 
                            onClick={() => {
                              const imgWindow = window.open("");
                              imgWindow?.document.write(`<img src="${booking.designData || booking.description}" style="max-width:100%">`);
                            }}
                          />
                          <button 
                            onClick={() => downloadImage(booking.designData || booking.description, booking.name)}
                            className="flex items-center gap-2 text-[10px] font-black uppercase bg-white/5 hover:bg-white text-neutral-400 hover:text-black px-4 py-3 rounded-xl transition-all"
                          >
                            <Download size={14} /> Download Image
                          </button>
                        </div>
                      ) : (
                        <p className="text-[10px] text-neutral-700 uppercase font-bold italic">No image provided</p>
                      )}
                    </div>

                    {/* TEXT DESCRIPTION SECTION */}
                    <div className="pt-4 border-t border-white/5">
                      <p className="text-[10px] font-bold text-neutral-600 uppercase mb-3 tracking-widest flex items-center gap-2">
                        <FileText size={12}/> Idea Description
                      </p>
                      {booking.description && !booking.description.startsWith('data:image') ? (
                        <div className="space-y-2">
                          <p className="text-xs text-neutral-300 italic leading-relaxed bg-white/5 p-3 rounded-xl border border-white/5">
                            "{booking.description}"
                          </p>
                          {booking.description.includes('http') && (
                            <a href={booking.description} target="_blank" className="inline-flex items-center gap-2 text-[10px] text-emerald-500 font-bold uppercase underline">
                              <ExternalLink size={10}/> Open External Link
                            </a>
                          )}
                        </div>
                      ) : (
                        <p className="text-[10px] text-neutral-700 uppercase font-bold italic">No text notes provided</p>
                      )}
                    </div>
                  </div>

                  {/* Schedule Picker */}
                  <div className="bg-emerald-500/5 rounded-3xl p-6 border border-emerald-500/10">
                    <p className="text-[10px] font-bold text-emerald-500/50 uppercase mb-4 tracking-widest flex items-center gap-2">
                      <CalendarClock size={12}/> Confirm or Reschedule
                    </p>
                    <input 
                      type="datetime-local"
                      defaultValue={formatForInput(booking.scheduledAt)}
                      onChange={(e) => setAdjustedTimes({ ...adjustedTimes, [booking.id]: e.target.value })}
                      className="w-full bg-black/40 border border-white/5 rounded-xl p-3 text-sm font-bold text-white focus:border-emerald-500 outline-none transition-all"
                    />
                  </div>
                </div>

                {/* 3. Action Hub */}
                <div className="lg:col-span-3 flex flex-col justify-between gap-4 h-full">
                  <div className="space-y-3">
                    {booking.status === 'PENDING' ? (
                      <button 
                        onClick={() => handleUpdate(booking.id, 'PENDING', booking.scheduledAt)}
                        disabled={actionLoading === booking.id}
                        className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-black py-5 rounded-2xl font-black uppercase text-[11px] tracking-[0.15em] transition-all flex items-center justify-center gap-3"
                      >
                        {actionLoading === booking.id ? <Loader2 className="animate-spin" size={18}/> : <CheckCircle2 size={18}/>}
                        Confirm & Email
                      </button>
                    ) : (
                      <div className="w-full bg-white/5 border border-white/5 py-5 rounded-2xl flex items-center justify-center gap-2 text-emerald-500">
                        <CheckCircle2 size={16}/>
                        <span className="text-[11px] font-black uppercase tracking-widest">Confirmed Slot</span>
                      </div>
                    )}
                    <button 
                      onClick={() => handleUpdate(booking.id, 'REJECTED', booking.scheduledAt)}
                      className="w-full bg-neutral-900 hover:bg-red-500/10 border border-white/5 text-neutral-500 hover:text-red-500 py-4 rounded-2xl font-bold uppercase text-[10px] tracking-widest transition-all"
                    >
                      Decline Request
                    </button>
                  </div>
                  <button onClick={() => handleDelete(booking.id)} className="flex items-center justify-center gap-2 text-neutral-700 hover:text-red-500 transition-colors text-[10px] font-bold uppercase tracking-widest">
                    <Trash2 size={14} /> Remove Entry
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}