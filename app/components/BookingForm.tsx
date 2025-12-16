'use client';
import React, { useState, useRef } from 'react';
import { Upload, CheckCircle, Image as ImageIcon, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { TattooDesign } from '../types';

export const BookingForm: React.FC = () => {
  const { designs, submitBooking } = useStore();
  
  const [step, setStep] = useState<1 | 2>(1); // 1 = Details, 2 = Design
  const [formData, setFormData] = useState({
    name: '',
    contactNumber: '',
    email: '',
    description: '',
  });
  
  const [designType, setDesignType] = useState<'existing' | 'custom'>('existing');
  const [selectedDesign, setSelectedDesign] = useState<TattooDesign | null>(null);
  const [customFile, setCustomFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCustomFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.contactNumber) return;

    setIsSubmitting(true);
    
    const success = await submitBooking({
      ...formData,
      designType,
      selectedDesignId: selectedDesign?.id,
      customDesignFile: customFile,
      customDesignPreviewUrl: customFile ? URL.createObjectURL(customFile) : undefined
    });

    if (success) {
      setSuccess(true);
    }
    setIsSubmitting(false);
  };

  if (success) {
    return (
      <div className="text-center py-16 px-6 bg-neutral-900 border border-green-900/30 rounded-lg shadow-2xl">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-900/20 text-green-500 mb-6">
          <CheckCircle size={32} />
        </div>
        <h3 className="text-2xl font-display font-bold text-white mb-2">Booking Request Sent!</h3>
        <p className="text-gray-400 mb-8 max-w-md mx-auto">
          Thanks {formData.name}, Anjit has received your request. We will contact you at {formData.contactNumber} shortly to confirm your appointment.
        </p>
        <button 
          onClick={() => window.location.reload()} 
          className="text-sm text-gray-500 hover:text-white underline"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <div className="bg-neutral-900 p-8 rounded-xl border border-white/10 shadow-2xl max-w-2xl mx-auto">
      <h2 className="text-3xl font-display font-bold text-white mb-6">Book an Appointment</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Details Section */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">01. Your Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-400 mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                required
                className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-white/40 transition"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Contact Number</label>
              <input
                type="tel"
                name="contactNumber"
                required
                className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-white/40 transition"
                placeholder="+977 98..."
                value={formData.contactNumber}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1">Email Address (Optional)</label>
            <input
              type="email"
              name="email"
              className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-white/40 transition"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="h-px bg-white/10 my-6"></div>

        {/* Design Selection Section */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">02. The Design</h3>
          
          <div className="flex gap-4 mb-4">
            <button
              type="button"
              onClick={() => setDesignType('existing')}
              className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all ${
                designType === 'existing' 
                  ? 'bg-white text-black' 
                  : 'bg-black text-gray-400 border border-white/10 hover:border-white/30'
              }`}
            >
              Choose from Gallery
            </button>
            <button
              type="button"
              onClick={() => setDesignType('custom')}
              className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all ${
                designType === 'custom' 
                  ? 'bg-white text-black' 
                  : 'bg-black text-gray-400 border border-white/10 hover:border-white/30'
              }`}
            >
              Upload Your Own
            </button>
          </div>

          {designType === 'existing' && (
            <div className="space-y-4">
              {selectedDesign ? (
                <div className="flex items-center justify-between bg-black p-3 rounded-lg border border-white/20">
                  <div className="flex items-center gap-3">
                    <img src={selectedDesign.imageUrl} alt={selectedDesign.title} className="w-12 h-12 rounded object-cover" />
                    <div>
                      <p className="text-sm font-bold text-white">{selectedDesign.title}</p>
                      <p className="text-xs text-gray-500">{selectedDesign.category}</p>
                    </div>
                  </div>
                  <button 
                    type="button"
                    onClick={() => setSelectedDesign(null)}
                    className="p-2 hover:bg-white/10 rounded-full transition"
                  >
                    <X size={18} />
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-60 overflow-y-auto p-2 bg-black rounded-lg border border-white/10">
                  {designs.map(design => (
                    <div 
                      key={design.id}
                      onClick={() => setSelectedDesign(design)}
                      className="cursor-pointer group relative aspect-square overflow-hidden rounded-md border border-white/5 hover:border-white transition"
                    >
                      <img src={design.imageUrl} alt={design.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                        <span className="text-xs font-bold">Select</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {designType === 'custom' && (
            <div 
              className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center hover:bg-white/5 transition cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*"
                onChange={handleFileChange}
              />
              {customFile ? (
                <div className="flex flex-col items-center">
                   <ImageIcon className="text-white mb-2" size={32} />
                   <span className="text-sm font-medium text-white">{customFile.name}</span>
                   <span className="text-xs text-gray-500 mt-1">Click to change</span>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <Upload className="text-gray-400 mb-2" size={32} />
                  <span className="text-sm font-medium text-gray-300">Click to upload image</span>
                  <span className="text-xs text-gray-500 mt-1">JPG, PNG supported</span>
                </div>
              )}
            </div>
          )}

          <div>
             <label className="block text-xs text-gray-400 mb-1">Additional Notes (Placement, Size, etc.)</label>
             <textarea
                name="description"
                rows={3}
                className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-white/40 transition resize-none"
                placeholder="I want this on my left forearm, about 5 inches..."
                value={formData.description}
                onChange={handleInputChange}
             />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-4 px-6 rounded-lg font-bold text-black uppercase tracking-wide transition-all ${
            isSubmitting ? 'bg-gray-500 cursor-not-allowed' : 'bg-white hover:bg-gray-200 shadow-lg shadow-white/10'
          }`}
        >
          {isSubmitting ? 'Sending Request...' : 'Confirm Booking'}
        </button>
      </form>
    </div>
  );
};