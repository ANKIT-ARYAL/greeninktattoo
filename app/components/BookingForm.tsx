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

      if (!response.ok) throw new Error('Failed');

      const booking = await response.json();

      setMessage({
        type: 'success',
        text: `Booking sent (ID: ${booking.id}).`,
      });

      setFormData({
        name: '',
        contactNumber: '',
        email: '',
        date: formData.date,
        time: '11:00',
        description: '',
        designData: null,
      });

      setPreview(null);
    } catch (error) {
      setMessage({ type: 'error', text: 'Unable to submit booking right now.' });
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return <div className="min-h-[400px]" />;

  return (
    <motion.div
      style={{ perspective: 1000 }}
      className="w-full font-blackops tracking-widest space-y-6 sm:space-y-8"
    >

      {/* INPUT GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        <FormInput icon={User} name="name" placeholder="FULL NAME" value={formData.name} onChange={(e: any) => setFormData({ ...formData, name: e.target.value })} />
        <FormInput icon={Phone} name="contactNumber" placeholder="WHATSAPP NUMBER" value={formData.contactNumber} onChange={(e: any) => setFormData({ ...formData, contactNumber: e.target.value })} />
        <FormInput icon={AlertCircle} name="email" placeholder="EMAIL" value={formData.email} onChange={(e: any) => setFormData({ ...formData, email: e.target.value })} />
      </div>

      {/* DATE + TIME */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div className="relative">
          <CalendarIcon className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-white/60" size={16} />
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="w-full bg-transparent border border-white/20 rounded-xl p-3 sm:p-4 pl-10 sm:pl-12 text-white text-xs sm:text-sm outline-none focus:border-[#32CD32] [color-scheme:dark]"
          />
        </div>

        <div className="relative">
          <Clock className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-white/60" size={16} />
          <select
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            className="w-full bg-transparent border border-white/20 rounded-xl p-3 sm:p-4 pl-10 sm:pl-12 text-white text-xs sm:text-sm outline-none focus:border-[#32CD32]"
          >
            <option className="bg-black">11:00</option>
            <option className="bg-black">12:00</option>
          </select>
        </div>
      </div>

      {/* UPLOAD */}
      <div>
        {preview ? (
          <div className="relative w-full max-w-[160px] sm:max-w-[200px] aspect-square border border-white/20 rounded-xl overflow-hidden">
            <Image src={preview} alt="Preview" fill className="object-cover" />
            <button
              type="button"
              onClick={() => setPreview(null)}
              className="absolute top-2 right-2 bg-black p-1 rounded-full"
            >
              <X size={14} />
            </button>
          </div>
        ) : (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border border-dashed border-white/20 rounded-xl p-6 sm:p-10 flex flex-col items-center justify-center cursor-pointer hover:border-[#32CD32] transition"
          >
            <Upload size={20} className="mb-2 sm:mb-3 text-white/70" />
            <span className="text-[10px] sm:text-xs uppercase tracking-widest text-neutral-400 text-center">
              Attach Reference Image
            </span>
            <input type="file" ref={fileInputRef} hidden accept="image/*" onChange={handleFileChange} />
          </div>
        )}
      </div>

      {/* DESCRIPTION */}
      <textarea
        placeholder="TATTOO CONCEPT & PLACEMENT"
        rows={4}
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        className="w-full bg-transparent border border-white/20 rounded-xl p-3 sm:p-4 text-white text-xs sm:text-sm outline-none focus:border-[#32CD32] resize-none"
      />

      {/* MESSAGE */}
      {message && (
        <div className={`rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm ${
          message.type === 'success'
            ? 'bg-emerald-500/10 text-emerald-200 border border-emerald-500/20'
            : 'bg-red-500/10 text-red-200 border border-red-500/20'
        }`}>
          {message.text}
        </div>
      )}

      {/* SUBMIT */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        disabled={loading}
        className="w-full py-3 sm:py-4 bg-[#32CD32] text-black uppercase tracking-widest text-sm sm:text-lg rounded-full font-blackops"
      >
        {loading ? <Loader2 className="animate-spin mx-auto" size={18} /> : 'Submit Booking Request'}
      </motion.button>

    </motion.div>
  );
};

/* INPUT */
const FormInput = ({ icon: Icon, ...props }: any) => (
  <div className="relative">
    <Icon className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-white/60" size={16} />
    <input
      {...props}
      className="w-full bg-transparent border border-white/20 rounded-xl p-3 sm:p-4 pl-10 sm:pl-12 text-white text-xs sm:text-sm outline-none focus:border-[#32CD32] placeholder:text-neutral-500"
    />
  </div>
);