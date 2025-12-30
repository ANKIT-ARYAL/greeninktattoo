'use client';
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock, User, Phone, Mail, AlertCircle, Link as LinkIcon, Upload, X, Loader2, ChevronDown } from 'lucide-react';

export const BookingForm: React.FC = () => {
  // Opening Hours: 11:00 to 20:00 (8 PM)
  const OPENING_HOUR = 11;
  const CLOSING_HOUR = 20;

  const [formData, setFormData] = useState({
    name: '',
    contactNumber: '',
    email: '',
    date: new Date().toISOString().split('T')[0], // Default to today
    time: '',
    designType: 'url' as 'url' | 'upload',
    designData: '', 
  });
  
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Generate 30-minute interval time slots for the dropdown
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

  // Set default time to nearest available slot on mount
  useEffect(() => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMin = now.getMinutes();
    
    let defaultTime = "11:00"; // Fallback to opening time
    
    if (currentHour >= OPENING_HOUR && currentHour < CLOSING_HOUR) {
      const minStr = currentMin >= 30 ? "00" : "30";
      const hourStr = (currentMin >= 30 ? currentHour + 1 : currentHour).toString().padStart(2, '0');
      defaultTime = `${hourStr}:${minStr}`;
    }
    
    setFormData(prev => ({ ...prev, time: defaultTime }));
  }, []);

  const todayStr = useMemo(() => new Date().toISOString().split('T')[0], []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
    if (!formData.designData) {
      setLoading(false);
      return setError("Please provide a design link or upload an image.");
    }

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          scheduledAt: selectedDateTime.toISOString(),
          description: formData.designData,
          designType: formData.designType.toUpperCase() 
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

  return (
    <form onSubmit={validateAndSubmit} className="max-w-xl mx-auto space-y-6 bg-neutral-900/50 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/10 shadow-2xl">
      <div className="space-y-1 text-center">
        <h2 className="text-3xl font-display font-bold text-white uppercase italic">Appointment Booking Request</h2>
        <div className="flex justify-center items-center gap-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            <p className="text-neutral-500 text-[10px] font-bold uppercase tracking-[0.2em]">Shop Hours: 11AM — 8PM</p>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-xs font-bold uppercase">
          <AlertCircle size={16} /> {error}
        </div>
      )}

      <div className="grid gap-4">
        {/* Basic Info */}
        <div className="relative">
          <User className="absolute left-4 top-4 text-neutral-600" size={18} />
          <input name="name" placeholder="Full Name" onChange={handleInputChange} required className="w-full bg-black/40 border border-white/5 rounded-2xl p-4 pl-12 text-white focus:border-emerald-500/50 outline-none transition-all" />
        </div>
        <div className="relative">
          <Phone className="absolute left-4 top-4 text-neutral-600" size={18} />
          <input name="contactNumber" placeholder="WhatsApp Number" onChange={handleInputChange} required className="w-full bg-black/40 border border-white/5 rounded-2xl p-4 pl-12 text-white focus:border-emerald-500/50 outline-none transition-all" />
        </div>
        <div className="relative">
          <Mail className="absolute left-4 top-4 text-neutral-600" size={18} />
          <input name="email" type="email" placeholder="Email Address" onChange={handleInputChange} required className="w-full bg-black/40 border border-white/5 rounded-2xl p-4 pl-12 text-white focus:border-emerald-500/50 outline-none transition-all" />
        </div>

        {/* Date & Time Selectors */}
        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <CalendarIcon className="absolute left-4 top-4 text-neutral-600 pointer-events-none" size={18} />
            <input 
              name="date" 
              type="date" 
              value={formData.date}
              min={todayStr} 
              onChange={handleInputChange} 
              required 
              className="w-full bg-black/40 border border-white/5 rounded-2xl p-4 pl-12 text-white focus:border-emerald-500/50 outline-none appearance-none" 
            />
          </div>
          
          <div className="relative">
            <Clock className="absolute left-4 top-4 text-neutral-600 pointer-events-none" size={18} />
            <select 
              name="time" 
              value={formData.time}
              onChange={handleInputChange} 
              required 
              className="w-full bg-black/40 border border-white/5 rounded-2xl p-4 pl-12 text-white focus:border-emerald-500/50 outline-none appearance-none cursor-pointer"
            >
              {timeSlots.map(slot => (
                <option key={slot} value={slot} className="bg-neutral-900 text-white">
                  {slot}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-4 text-neutral-600 pointer-events-none" size={18} />
          </div>
        </div>

        {/* Design Section */}
        <div className="space-y-3">
          <div className="flex bg-black/40 p-1 rounded-2xl border border-white/5">
            <button type="button" onClick={() => { setFormData({...formData, designType: 'url', designData: ''}); setPreview(null); }} className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all ${formData.designType === 'url' ? 'bg-white text-black shadow-xl' : 'text-neutral-500'}`}>
              <LinkIcon size={14} /> Link
            </button>
            <button type="button" onClick={() => { setFormData({...formData, designType: 'upload', designData: ''}); setPreview(null); }} className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all ${formData.designType === 'upload' ? 'bg-white text-black shadow-xl' : 'text-neutral-500'}`}>
              <Upload size={14} /> Upload
            </button>
          </div>

          {formData.designType === 'url' ? (
            <input name="designData" placeholder="Paste Pinterest or Instagram Link" value={formData.designData} onChange={handleInputChange} className="w-full bg-black/40 border border-white/5 rounded-2xl p-4 text-white focus:border-emerald-500/50 outline-none" />
          ) : (
            <div className="relative group">
              {preview ? (
                <div className="relative aspect-video rounded-2xl overflow-hidden border border-emerald-500/30">
                  <img src={preview} className="w-full h-full object-cover" alt="Preview" />
                  <button type="button" onClick={() => {setPreview(null); setFormData({...formData, designData: ''})}} className="absolute top-2 right-2 bg-black/60 p-2 rounded-full text-white hover:bg-red-500"><X size={16} /></button>
                </div>
              ) : (
                <div onClick={() => fileInputRef.current?.click()} className="w-full h-32 border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center gap-2 text-neutral-500 hover:border-emerald-500/30 hover:bg-emerald-500/5 cursor-pointer transition-all">
                  <Upload size={24} />
                  <span className="text-xs font-bold uppercase tracking-widest text-center px-4">Upload Design (Max 4MB)</span>
                  <input type="file" ref={fileInputRef} hidden accept="image/*" onChange={handleFileChange} />
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <button disabled={loading} className="w-full py-5 bg-white text-black font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-neutral-200 active:scale-[0.98] transition-all flex items-center justify-center gap-3">
        {loading ? <Loader2 className="animate-spin" size={20} /> : "Send Request"}
      </button>
    </form>
  );
};