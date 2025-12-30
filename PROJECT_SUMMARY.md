# 🧠 Deep Project Intelligence

Generated: 12/30/2025, 4:23:24 PM

## 🛠️ Stack
- Next.js: 16.0.10
- DB: Other

## 📂 Structure
```
├── .gitignore
├── .hintrc
├── README.md
├── app
│   ├── admin
│   │   └── page.tsx
│   ├── components
│   │   ├── BookingForm.tsx
│   │   ├── Footer.tsx
│   │   └── Navbar.tsx
│   ├── contact
│   │   └── page.tsx
│   ├── context
│   │   └── StoreContext.tsx
│   ├── favicon.ico
│   ├── gallery
│   │   └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   └── types.ts
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.ts
├── package-lock.json
├── package.json
├── pnpm-lock.yaml
├── postcss.config.mjs
├── summarize.mjs
└── tsconfig.json
```

## 📄 Logic & Code Implementation
### 📝 File: app/admin/page.tsx
```typescript
'use client';
import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { UserRole, TattooDesign } from '../types';
import { Trash2, Plus, LogOut, Lock, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const { role, login, logout, designs, addDesign, deleteDesign } = useStore();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const router = useRouter();

  // Login View
  if (role !== UserRole.ADMIN) {
    const handleLogin = (e: React.FormEvent) => {
      e.preventDefault();
      if (login(password)) {
        setError('');
        router.push('/admin');
      } else {
        setError('Invalid password');
      }
    };

    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center px-4">
        <div className="bg-neutral-900 p-8 rounded-xl border border-white/10 shadow-2xl w-full max-w-md">
          <div className="flex justify-center mb-6">
            <div className="bg-white/5 p-3 rounded-full">
              <Lock className="text-white" size={32} />
            </div>
          </div>
          <h2 className="text-2xl font-display font-bold text-white text-center mb-2">Admin Access</h2>
          <p className="text-gray-400 text-center mb-6 text-sm">Enter password to manage gallery (Hint: admin123)</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-white/50"
              placeholder="Password"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-gray-200 transition"
            >
              Login
            </button>
          </form>
          <button onClick={() => router.push('/')} className="w-full text-center text-gray-500 text-sm mt-4 hover:text-white">Back to Home</button>
        </div>
      </div>
    );
  }

  // Dashboard View
```

---
### 📝 File: app/components/BookingForm.tsx
```typescript
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
```

---
### 📝 File: app/components/Footer.tsx
```typescript
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
```

---
### 📝 File: app/components/Navbar.tsx
```typescript
'use client';
import React, { useState } from 'react';

import { Menu, X, ShieldCheck } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { UserRole } from '../types';
import Link from 'next/link';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { role } = useStore();


  const links = [
    { name: 'Home', path: '/' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Book Now', path: '/contact' },
  ];

  return (
    <nav className="fixed w-full z-50 bg-brand-black/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0 flex items-center gap-2">
            <Link href="/" className="text-2xl font-display font-bold tracking-wider text-white uppercase">
              Anjit<span className="text-gray-500">.</span>Tattoo
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  className={'px-3 py-2 text-sm font-medium tracking-wide text-gray-200 hover:text-gray-300 hover:scale-105 transition-all duration-200'}>
                  {link.name}
                </Link>
              ))}              
                 <Link
                 href="/admin"
                 className="px-3 py-2 text-sm font-medium text-red-500 hover:text-red-400 flex items-center gap-1"
               >
                 <ShieldCheck size={16} /> Admin
               </Link>              
            </div>
          </div>
          
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
```

---
### 📝 File: app/contact/page.tsx
```typescript
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
```

---
### 📝 File: app/context/StoreContext.tsx
```typescript
'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { TattooDesign, BookingRequest, UserRole } from '../types';

interface StoreContextType {
  designs: TattooDesign[];
  addDesign: (design: Omit<TattooDesign, 'id' | 'createdAt'>) => void;
  deleteDesign: (id: string) => void;
  role: UserRole;
  login: (password: string) => boolean;
  logout: () => void;
  submitBooking: (booking: Omit<BookingRequest, 'id' | 'status' | 'date'>) => Promise<boolean>;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

// Initial Seed Data
const INITIAL_DESIGNS: TattooDesign[] = [
  { id: '1', title: 'Dragon Back Piece', category: 'Japanese', imageUrl: 'https://picsum.photos/id/101/800/1000', createdAt: Date.now() },
  { id: '2', title: 'Geometric Wolf', category: 'Blackwork', imageUrl: 'https://picsum.photos/id/102/800/800', createdAt: Date.now() },
  { id: '3', title: 'Floral Sleeve', category: 'Realism', imageUrl: 'https://picsum.photos/id/103/600/900', createdAt: Date.now() },
  { id: '4', title: 'Traditional Dagger', category: 'Traditional', imageUrl: 'https://picsum.photos/id/104/800/800', createdAt: Date.now() },
  { id: '5', title: 'Minimalist Line Art', category: 'Minimalist', imageUrl: 'https://picsum.photos/id/106/800/800', createdAt: Date.now() },
  { id: '6', title: 'Koi Fish', category: 'Japanese', imageUrl: 'https://picsum.photos/id/108/800/1000', createdAt: Date.now() },
];

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [designs, setDesigns] = useState<TattooDesign[]>(INITIAL_DESIGNS);
  const [role, setRole] = useState<UserRole>(UserRole.GUEST);

  // Load from local storage if available (Persist data simulation)
  useEffect(() => {
    const stored = localStorage.getItem('anjit-designs');
    if (stored) {
      try {
        setDesigns(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse stored designs");
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('anjit-designs', JSON.stringify(designs));
  }, [designs]);

  const addDesign = (design: Omit<TattooDesign, 'id' | 'createdAt'>) => {
    const newDesign: TattooDesign = {
      ...design,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: Date.now(),
    };
    setDesigns(prev => [newDesign, ...prev]);
  };

  const deleteDesign = (id: string) => {
    setDesigns(prev => prev.filter(d => d.id !== id));
  };

  const login = (password: string) => {
```

---
### 📝 File: app/gallery/page.tsx
```typescript
'use client';
import { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Filter } from 'lucide-react';

export default function GalleryPage() {
  const { designs } = useStore();
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Blackwork', 'Realism', 'Traditional', 'Japanese', 'Minimalist'];
  
  const filteredDesigns = activeCategory === 'All' 
    ? designs 
    : designs.filter(d => d.category === activeCategory);

  return (
    <div className="min-h-screen bg-neutral-950 pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-display font-bold text-white mb-4">The Collection</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Browse through our portfolio of custom designs and completed works. 
            From intricate line work to bold traditional pieces.
          </p>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                activeCategory === cat
                  ? 'bg-white text-black border-white'
                  : 'bg-transparent text-gray-400 border-white/10 hover:border-white/40 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDesigns.map((design) => (
            <div key={design.id} className="group relative break-inside-avoid">
              <div className="aspect-[3/4] overflow-hidden rounded-xl bg-neutral-900 border border-white/5">
                <img 
                  src={design.imageUrl} 
                  alt={design.title} 
                  className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-center p-4">
                  <h3 className="text-xl font-display font-bold text-white mb-1">{design.title}</h3>
                  <p className="text-sm text-gray-300">{design.category}</p>
                </div>
              </div>
            </div>
```

---
### 📝 File: app/layout.tsx
```typescript
import './globals.css';
import React from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { StoreProvider } from './context/StoreContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-neutral-950 text-white font-sans selection:bg-white selection:text-black">
        <title>Anjit Tattoo Studio</title>
        <StoreProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}

```

---
### 📝 File: app/page.tsx
```typescript
'use client';
import  Link  from 'next/link';
import { ArrowRight, Star } from 'lucide-react';
import { useStore } from './context/StoreContext';
import { BookingForm } from './components/BookingForm';

export default function Page() {
  const { designs } = useStore();
  const featuredDesigns = designs.slice(0, 3);

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://a.storyblok.com/f/197805/5145e1ea3c/inspirational_tattoo_design_ideas_main_image.jpg/m/727x0/filters:format(jpeg):quality(75)" 
            alt="Tattoo Artist Working" 
            className="w-full h-full object-cover opacity-30 "
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-black/60"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h2 className="text-sm md:text-base font-bold tracking-[0.2em] text-gray-400 uppercase mb-4 animate-fade-in-up">
            Thamel, Kathmandu
          </h2>
          <h1 className="text-5xl md:text-8xl font-display font-bold uppercase tracking-tighter mb-6 text-white leading-none">
            Ink That <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Endures</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light">
            Anjit Tattoo brings world-class artistry to Nepal. Custom designs, impeccable hygiene, and a passion for storytelling through skin.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact" 
              className="px-8 py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-gray-200 transition duration-300 rounded-sm"
            >
              Book Appointment
            </Link>
            <Link 
              href="/gallery" 
              className="px-8 py-4 bg-transparent border border-white text-white font-bold uppercase tracking-widest hover:bg-white hover:text-black transition duration-300 rounded-sm"
            >
              View Gallery
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Works */}
      <section className="py-24 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-display font-bold text-white mb-2">Featured Work</h2>
              <p className="text-gray-400">Selected masterpieces from our studio</p>
            </div>
            <Link href="/gallery" className="hidden md:flex items-center gap-2 text-white hover:text-gray-300 transition group">
              View All <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
```

---
### 📝 File: app/types.ts
```typescript
export interface TattooDesign {
  id: string;
  title: string;
  category: 'Blackwork' | 'Realism' | 'Traditional' | 'Japanese' | 'Minimalist' | 'Other';
  imageUrl: string;
  createdAt: number;
}

export interface BookingRequest {
  id: string;
  name: string;
  contactNumber: string;
  email: string;
  designType: 'existing' | 'custom';
  selectedDesignId?: string; // If existing
  customDesignFile?: File | null; // If custom upload
  customDesignPreviewUrl?: string;
  status: 'pending' | 'confirmed' | 'completed';
  date: number;
}

export enum UserRole {
  GUEST = 'guest',
  ADMIN = 'admin',
}
```

---
