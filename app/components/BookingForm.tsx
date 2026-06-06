'use client';
import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import { Calendar as CalendarIcon, Clock, User, Phone, AlertCircle, Upload, X, Loader2 } from 'lucide-react';

const OWNER_WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_OWNER_WHATSAPP_NUMBER || '+9779849080469';

interface BookingFormData {
  name: string;
  contactNumber: string;
  email: string;
  date: string;
  time: string;
  description: string;
  designData?: string | null;
}

export const BookingForm: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    contactNumber: '',
    email: '',
    date: '',
    time: '11:00',
    description: '',
    designData: null,
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-300, 300], [10, -10]);
  const rotateY = useTransform(x, [-300, 300], [-10, 10]);
  const springConfig = { damping: 25, stiffness: 150 };
  const smoothRotateX = useSpring(rotateX, springConfig);
  const smoothRotateY = useSpring(rotateY, springConfig);

  useEffect(() => {
    setMounted(true);
    const today = new Date().toISOString().split('T')[0];
    setFormData((prev) => ({ ...prev, date: today }));
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setPreview(result);
      setFormData((prev) => ({ ...prev, designData: result }));
    };
    reader.readAsDataURL(file);
  };

  const validateAndSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setMessage(null);
    // no whatsapp link from frontend anymore

    const errors: string[] = [];
    if (!formData.name.trim()) errors.push('Full name is required.');
    if (!formData.contactNumber.trim()) errors.push('WhatsApp number is required.');
    if (!formData.email?.trim()) errors.push('Email is required.');
    if (!formData.date) errors.push('Please choose a date.');
    if (!formData.time) errors.push('Please choose a time.');

    if (errors.length) {
      setMessage({ type: 'error', text: errors.join(' ') });
      return;
    }

    setLoading(true);

    try {
      const scheduledAt = `${formData.date}T${formData.time}:00`;
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          contactNumber: formData.contactNumber.trim(),
          email: formData.email?.trim(),
          description: formData.description.trim(),
          designData: formData.designData,
          scheduledAt,
        }),
      });

      if (!response.ok) {
        const errorResponse = await response.json().catch(() => null);
        throw new Error(errorResponse?.error || 'Failed to create booking.');
      }

      const booking = await response.json();
      const scheduleText = new Date(booking.scheduledAt).toLocaleString('en-US', {
        timeZone: 'Asia/Kathmandu',
        dateStyle: 'medium',
        timeStyle: 'short',
      });

      setMessage({
        type: 'success',
        text: `Booking sent (ID: ${booking.id}).`,
      });
      setFormData((prev) => ({ ...prev, name: '', contactNumber: '', email: '', description: '', designData: null }));
      setPreview(null);
    } catch (error) {
      console.error(error);
      setMessage({ type: 'error', text: 'Unable to submit booking right now. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return <div className="min-h-[400px]" />;

  return (
    <motion.div
      style={{ perspective: 1000 }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - rect.left - rect.width / 2);
        y.set(e.clientY - rect.top - rect.height / 2);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className="w-full"
    >
      <motion.form
        onSubmit={validateAndSubmit}
        style={{
          rotateX: smoothRotateX,
          rotateY: smoothRotateY,
          transformStyle: 'preserve-3d',
        }}
        className="w-full space-y-6 bg-[#0a0a0a] p-8 border border-white/10 shadow-2xl relative"
      >
        <div className="absolute inset-0 border border-[#26ff00]/10 translate-z-[-20px]" />

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          <FormInput icon={User} name="name" placeholder="FULL NAME" required value={formData.name} onChange={(e: any) => setFormData({ ...formData, name: e.target.value })} />
          <FormInput icon={Phone} name="contactNumber" placeholder="WHATSAPP NUMBER" required value={formData.contactNumber} onChange={(e: any) => setFormData({ ...formData, contactNumber: e.target.value })} />
          <FormInput icon={AlertCircle} name="email" placeholder="EMAIL" required value={formData.email} onChange={(e: any) => setFormData({ ...formData, email: e.target.value })} />
        </div>

        <div className="relative z-10 grid grid-cols-2 gap-8">
          <div className="relative group">
            <CalendarIcon className="absolute left-0 top-1/2 -translate-y-1/2 text-[#26ff00]" size={16} />
            <input
              name="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
              className="w-full bg-transparent border-b border-white/20 p-4 pl-12 text-white text-[10px] uppercase tracking-widest [color-scheme:dark] outline-none focus:border-[#26ff00]"
            />
          </div>
          <div className="relative group">
            <Clock className="absolute left-0 top-1/2 -translate-y-1/2 text-[#26ff00]" size={16} />
            <select
              name="time"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              className="w-full bg-transparent border-b border-white/20 p-4 pl-12 text-white text-[10px] uppercase tracking-widest appearance-none cursor-pointer outline-none focus:border-[#26ff00]"
            >
              <option className="bg-black">11:00</option>
              <option className="bg-black">12:00</option>
            </select>
          </div>
        </div>

        <div className="pt-4 relative z-10">
          {preview ? (
            <div className="relative h-32 w-32 border border-white/20">
              <Image src={preview} alt="Preview" fill className="object-cover" />
              <button type="button" onClick={() => { setPreview(null); setFormData({ ...formData, designData: null }); }} className="absolute top-0 right-0 bg-black p-1 text-white"><X size={16} /></button>
            </div>
          ) : (
            <div onClick={() => fileInputRef.current?.click()} className="border border-dashed border-white/20 p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-[#26ff00]/5 transition-all">
              <Upload size={20} className="mb-3 text-[#26ff00]" />
              <span className="text-[9px] uppercase tracking-widest text-neutral-500">Attach Reference</span>
              <input type="file" ref={fileInputRef} hidden accept="image/*" onChange={handleFileChange} />
            </div>
          )}
        </div>

        <textarea
          name="description"
          placeholder="TATTOO CONCEPT & PLACEMENT"
          rows={3}
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full bg-transparent border-b border-white/20 p-4 pl-12 text-white text-[10px] focus:border-[#26ff00] outline-none transition-all resize-none placeholder:text-neutral-600 uppercase tracking-widest relative z-10"
        />

        {message && (
          <div className={`rounded-2xl px-4 py-3 text-sm ${message.type === 'success' ? 'bg-emerald-500/10 text-emerald-200 border border-emerald-500/20' : 'bg-red-500/10 text-red-200 border border-red-500/20'}`}>
            {message.text}
          </div>
        )}

        {/* no direct whatsapp CTA from the booking form */}

        <motion.button
          whileHover={{ scale: 1.02, z: 20 }}
          disabled={loading}
          className="w-full py-4 bg-[#26ff00] text-black font-black uppercase tracking-[0.2em] text-[12px] relative z-10"
        >
          {loading ? <Loader2 className="animate-spin mx-auto" size={18} /> : 'Submit Booking Request'}
        </motion.button>
      </motion.form>
    </motion.div>
  );
};

const FormInput = ({ icon: Icon, ...props }: any) => (
  <div className="relative group">
    <Icon className="absolute left-0 top-1/2 -translate-y-1/2 text-[#26ff00]" size={16} />
    <input
      {...props}
      className="w-full bg-transparent border-b border-white/20 p-4 pl-12 text-white text-[10px] focus:border-[#26ff00] outline-none transition-all placeholder:text-neutral-600 uppercase tracking-widest"
    />
  </div>
);
