'use client';
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock, User, Phone, Mail, AlertCircle, Upload, X, Loader2, ChevronDown, AlignLeft } from 'lucide-react';

export const BookingForm: React.FC = () => {
  const OPENING_HOUR = 11;
  const CLOSING_HOUR = 20;

  const [formData, setFormData] = useState({
    name: '',
    contactNumber: '',
    email: '',
    date: new Date().toISOString().split('T')[0],
    time: '',
    description: '',
    designData: '', 
  });
  
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const timeSlots = useMemo(() => {
    const slots = [];
    for (let hour = OPENING_HOUR; hour <= CLOSING_HOUR; hour++) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`);
      if (hour !== CLOSING_HOUR) {
        slots.push(`${hour.toString().padStart(2, '0')}:30`);
      }
    }
    return slots;
  }, []);

  useEffect(() => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMin = now.getMinutes();
    let defaultTime = "11:00";
    if (currentHour >= OPENING_HOUR && currentHour < CLOSING_HOUR) {
      const minStr = currentMin >= 30 ? "00" : "30";
      const hourStr = (currentMin >= 30 ? currentHour + 1 : currentHour).toString().padStart(2, '0');
      defaultTime = `${hourStr}:${minStr}`;
    }
    setFormData(prev => ({ ...prev, time: defaultTime }));
  }, []);

  const todayStr = useMemo(() => new Date().toISOString().split('T')[0], []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) return setError("Image too large (Max 4MB)");
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setPreview(base64);
        setFormData(prev => ({ ...prev, designData: base64 }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateAndSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const selectedDateTime = new Date(`${formData.date}T${formData.time}`);
    if (selectedDateTime <= new Date()) {
      setLoading(false);
      return setError("Please select a future time slot.");
    }

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          scheduledAt: selectedDateTime.toISOString(),
          designType: 'UPLOAD'
        }),
      });
      
      if (res.ok) {
        alert("Booking request sent successfully!");
        window.location.reload();
      } else {
        const data = await res.json();
        setError(data.error || "Submission failed");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Shared classes for input styling to ensure consistency
  const inputBaseClasses = "w-full bg-black/40 border border-white/5 rounded-xl md:rounded-2xl p-4 pl-14 text-white text-sm focus:border-emerald-500/50 outline-none transition-all placeholder:text-neutral-600";

  return (
    <form onSubmit={validateAndSubmit} className="max-w-xl mx-auto space-y-5 md:space-y-6 bg-neutral-900/50 backdrop-blur-xl p-5 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] border border-white/10 shadow-2xl">
      <div className="space-y-1 text-center">
        <h2 className="text-2xl md:text-3xl font-display font-bold text-white uppercase italic">Appointment Request</h2>
        <div className="flex justify-center items-center gap-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            <p className="text-neutral-500 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em]">Shop Hours: 11AM — 8PM</p>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-[10px] md:text-xs font-bold uppercase">
          <AlertCircle size={16} /> {error}
        </div>
      )}

      <div className="grid gap-3 md:gap-4">
        {/* Full Name */}
        <div className="relative">
          <User className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-600" size={18} />
          <input name="name" placeholder="Full Name" onChange={handleInputChange} required className={inputBaseClasses} />
        </div>

        {/* WhatsApp Number */}
        <div className="relative">
          <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-600" size={18} />
          <input name="contactNumber" placeholder="WhatsApp Number" onChange={handleInputChange} required className={inputBaseClasses} />
        </div>

        {/* Email */}
        <div className="relative">
          <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-600" size={18} />
          <input name="email" type="email" placeholder="Email Address" onChange={handleInputChange} required className={inputBaseClasses} />
        </div>

        {/* Date & Time Selectors */}
        <div className="grid grid-cols-2 gap-3 md:gap-4">
          <div className="relative">
            <CalendarIcon className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-600 pointer-events-none z-10" size={18} />
            <input 
                name="date" 
                type="date" 
                value={formData.date} 
                min={todayStr} 
                onChange={handleInputChange} 
                required 
                className={`${inputBaseClasses} [color-scheme:dark]`} 
            />
          </div>
          <div className="relative">
            <Clock className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-600 pointer-events-none z-10" size={18} />
            <select 
                name="time" 
                value={formData.time} 
                onChange={handleInputChange} 
                required 
                className={`${inputBaseClasses} appearance-none cursor-pointer`}
            >
              {timeSlots.map(slot => (<option key={slot} value={slot} className="bg-neutral-900 text-white">{slot}</option>))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-600 pointer-events-none" size={16} />
          </div>
        </div>

        {/* Design Upload Section */}
        <div className="relative group">
          {preview ? (
            <div className="relative aspect-video rounded-xl md:rounded-2xl overflow-hidden border border-emerald-500/30">
              <img src={preview} className="w-full h-full object-cover" alt="Preview" />
              <button type="button" onClick={() => {setPreview(null); setFormData({...formData, designData: ''})}} className="absolute top-2 right-2 bg-black/60 p-2 rounded-full text-white hover:bg-red-500 transition-colors"><X size={16} /></button>
            </div>
          ) : (
            <div onClick={() => fileInputRef.current?.click()} className="w-full h-28 md:h-32 border-2 border-dashed border-white/10 rounded-xl md:rounded-2xl flex flex-col items-center justify-center gap-2 text-neutral-500 hover:border-emerald-500/30 hover:bg-emerald-500/5 cursor-pointer transition-all">
              <Upload size={20} className="md:w-6 md:h-6" />
              <span className="text-[10px] font-black uppercase tracking-widest text-center px-4">Reference Image (Optional)</span>
              <input type="file" ref={fileInputRef} hidden accept="image/*" onChange={handleFileChange} />
            </div>
          )}
        </div>

        {/* Tattoo Description Field */}
        <div className="relative">
          <AlignLeft className="absolute left-5 top-5 text-neutral-600" size={18} />
          <textarea 
            name="description" 
            placeholder="Describe your tattoo idea (Size, placement, style...)" 
            value={formData.description}
            onChange={handleInputChange}
            rows={4}
            className="w-full bg-black/40 border border-white/5 rounded-xl md:rounded-2xl p-5 pl-14 text-white text-sm focus:border-emerald-500/50 outline-none transition-all resize-none placeholder:text-neutral-600"
          />
        </div>
      </div>

      <button disabled={loading} className="w-full py-4 md:py-5 bg-white text-black font-black uppercase tracking-[0.2em] text-xs md:text-sm rounded-xl md:rounded-2xl hover:bg-emerald-500 active:scale-[0.98] transition-all flex items-center justify-center gap-3">
        {loading ? <Loader2 className="animate-spin" size={20} /> : "Submit Booking"}
      </button>
    </form>
  );
};