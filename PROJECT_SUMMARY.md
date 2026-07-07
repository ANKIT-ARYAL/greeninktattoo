# 🧠 Deep Project Intelligence

Generated: 6/4/2026, 7:20:52 AM

## 🛠️ Stack
- Next.js: 16.0.10
- DB: Prisma

## 📂 Structure
```
├── .env
├── .gitignore
├── .hintrc
├── .vscode
│   └── settings.json
├── PROJECT_SUMMARY.md
├── README.md
├── app
│   ├── about
│   │   └── page.tsx
│   ├── admin
│   │   ├── blogs
│   │   │   └── page.tsx
│   │   ├── bookings
│   │   │   ├── [id]
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   ├── dashboard
│   │   │   └── page.tsx
│   │   ├── designs
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── api
│   │   ├── auth
│   │   │   ├── login
│   │   │   │   └── route.ts
│   │   │   └── logout
│   │   │       └── route.ts
│   │   ├── blogs
│   │   │   ├── [id]
│   │   │   │   └── route.ts
│   │   │   └── route.ts
│   │   ├── bookings
│   │   │   ├── [id]
│   │   │   │   └── route.ts
│   │   │   └── route.ts
│   │   ├── designs
│   │   │   ├── [id]
│   │   │   │   └── route.ts
│   │   │   └── route.ts
│   │   └── proxy-image
│   │       └── route.ts
│   ├── blogs
│   │   ├── [slug]
│   │   │   └── page.tsx
│   │   └── page.tsx
│   ├── components
│   │   ├── AboutSection.tsx
│   │   ├── AddBlogModal.tsx
│   │   ├── AddDesignModal.tsx
│   │   ├── BookingForm.tsx
│   │   ├── BookingManager.tsx
│   │   ├── BookingSection.tsx
│   │   ├── Designs.tsx
│   │   ├── EditBlogModal.tsx
│   │   ├── EditDesignModal.tsx
│   │   ├── EmailTemplate.tsx
│   │   ├── FeaturedSlider.tsx
│   │   ├── Footer.tsx
│   │   ├── GalleryClient.tsx
│   │   ├── Hero.tsx
│   │   ├── LayoutWrapper.tsx
│   │   ├── LogoutButton.tsx
│   │   ├── Navbar.tsx
│   │   ├── Reveal.tsx
│   │   ├── Reviews.tsx
│   │   ├── ScrollToTop.tsx
│   │   └── StaticReveal.tsx
│   ├── contact
│   │   └── page.tsx
│   ├── favicon.ico
│   ├── fonts
│   │   └── SixCaps-Regular.ttf
│   ├── gallery
│   │   └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   └── types.ts
├── eslint.config.mjs
├── lib
│   └── prisma.ts
├── next-env.d.ts
├── next.config.ts
├── package-lock.json
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── postcss.config.mjs
├── prisma
│   └── schema.prisma
├── prisma.config.ts
├── proxy.ts
├── scripts
│   └── fix-prisma-client-symlink.mjs
├── summarize.mjs
└── tsconfig.json
```

## 📄 Logic & Code Implementation
### 📝 File: app/about/page.tsx
```typescript
'use client';
import React from 'react';
import AboutSection from '../components/AboutSection';

export default function AboutPage() {
  return (
    // Increased pt-48 to ensure it clears the 150px logo/navbar
    <div className="relative min-h-screen bg-neutral-950 pt-40 md:pt-48 lg:pt-56 pb-16 md:pb-24 overflow-hidden">
      <AboutSection />
    </div>
  );
}
```

---
### 📝 File: app/admin/blogs/page.tsx
```typescript
'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Plus, Trash2, Loader2, Edit3, Calendar } from 'lucide-react';
import AddBlogModal from '@/app/components/AddBlogModal';
import EditBlogModal from '@/app/components/EditBlogModal';

interface Blog {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  createdAt: string;
}

export default function BlogsAdminPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [blogToEdit, setBlogToEdit] = useState<Blog | null>(null);

  const fetchBlogs = async () => {
    try {
      const res = await fetch('/api/blogs');
      const data = await res.json();
      if (Array.isArray(data)) setBlogs(data);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBlogs(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;
    const res = await fetch(`/api/blogs/${id}`, { method: 'DELETE' });
    if (res.ok) setBlogs(prev => prev.filter(b => b.id !== id));
  };

  return (
    <div className="min-h-screen bg-black p-8 lg:p-12 space-y-10">
      <header className="flex justify-between items-end max-w-7xl mx-auto w-full">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#26ff00] mb-2">Editorial Control</p>
          <h1 className="text-4xl md:text-5xl font-display font-header text-white uppercase  tracking-widerer">Blog Manager</h1>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 bg-white text-black px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-emerald-500 transition-all shadow-xl active:scale-95"
        >
          <Plus size={18} /> New Article
        </button>
      </header>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-40">
          <Loader2 className="animate-spin text-[#26ff00] mb-4" size={40} />
```

---
### 📝 File: app/admin/bookings/[id]/page.tsx
```typescript
import React from 'react';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { 
  ChevronLeft, 
  Calendar, 
  Clock, 
  Phone, 
  MessageSquare, 
  Instagram,
  ExternalLink,
} from 'lucide-react';

export default async function BookingDetailsPage({ params }: { params: { id: string } }) {
    // Await the params
    const {id} = await params;
    // Fetch the specific booking
  const booking = await prisma.booking.findUnique({
    where: { id: id }
  });

  if (!booking) {
    notFound();
  }

  // Format the date
  const dateStr = new Date(booking.scheduledAt).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const timeStr = new Date(booking.scheduledAt).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12 lg:p-20">
      <div className="max-w-4xl mx-auto">
        
        {/* BACK BUTTON */}
        <Link 
          href="/admin" 
          className="inline-flex items-center gap-2 text-neutral-500 hover:text-[#26ff00] transition-colors mb-12 group"
        >
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">Back to Dashboard</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* LEFT COLUMN: MAIN INFO */}
          <div className="lg:col-span-2 space-y-12">
            <header>
              <div className="flex items-center gap-3 mb-4">
                <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                  booking.status === 'PENDING' ? 'bg-orange-500/10 text-orange-500' : 'bg-emerald-500/10 text-[#26ff00]'
```

---
### 📝 File: app/admin/bookings/page.tsx
```typescript
'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  Calendar, Clock, Phone, Mail, Trash2, CheckCircle2, 
  Loader2, Download, Eye, ExternalLink, CalendarClock, FileText
} from 'lucide-react';

interface Booking {
  id: string;
  name: string;
  contactNumber: string;
  email?: string;
  description?: string;
  scheduledAt: string;
  status: string;
}

export default function BookingsAdminPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [adjustedTimes, setAdjustedTimes] = useState<{ [key: string]: string }>({});
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchBookings = async () => {
    try {
      const res = await fetch('/api/bookings');
      const data = await res.json();
      if (Array.isArray(data)) setBookings(data);
    } catch (_err) {
      console.error("Fetch error:", _err);
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
```

---
### 📝 File: app/admin/dashboard/page.tsx
```typescript
'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ImageIcon, 
  PenTool, 
  Calendar, 
  ChevronRight,
  Clock,
  AlertCircle,
  Phone,
} from 'lucide-react';
import { BookingRequest } from '../../types';

export default function AdminDashboard() {
  const [bookings, setBookings] = useState<BookingRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch('/api/bookings');
        const data = await res.json();
        if (res.ok && Array.isArray(data)) {
          setBookings(data);
        } else {
          setBookings([]);
        }
      } catch {
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  return (
    <div className="min-h-screen bg-black flex text-neutral-400">      
      <main className="flex-1 p-12">
        <header className="flex justify-between items-end mb-12">
          <div>
            <p className="text-xs font-header uppercase tracking-[0.2em] text-[#26ff00] mb-2">Control Center</p>
            <h2 className="text-4xl font-display font-header text-white uppercase ">Overview</h2>
          </div>
          
          <div className="bg-neutral-900 border border-white/5 px-6 py-4 rounded-2xl">
            <p className="text-[10px] font-black text-neutral-500 uppercase tracking-widest mb-1">Total Inquiries</p>
            <p className="text-3xl font-display font-header text-white leading-none">
              {bookings.length}
            </p>
          </div>
        </header>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Link href="/admin/designs" className="bg-neutral-900 border border-white/5 p-8 rounded-[2.5rem] group hover:border-emerald-500/50 transition-all duration-500">
            <div className="flex justify-between items-start mb-4">
               <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-emerald-500 group-hover:text-black transition-colors">
                 <ImageIcon size={24}/>
```

---
### 📝 File: app/admin/designs/page.tsx
```typescript
'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Plus, Trash2, Loader2, Edit3, Instagram, Star } from 'lucide-react';
import { EditDesignModal } from '../../components/EditDesignModal';
import { AddDesignModal } from '@/app/components/AddDesignModal';

interface Design {
  id: string;
  title: string;
  imageUrl: string;
  category: string;
  isFeatured: boolean;
}

export default function DesignsAdminPage() {
  const [designs, setDesigns] = useState<Design[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [designToEdit, setDesignToEdit] = useState<Design | null>(null);

  const fetchDesigns = async () => {
    try {
      const res = await fetch('/api/designs');
      const data = await res.json();
      if (Array.isArray(data)) setDesigns(data);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchDesigns(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this piece from your portfolio?")) return;
    const res = await fetch(`/api/designs/${id}`, { method: 'DELETE' });
    if (res.ok) setDesigns(prev => prev.filter(d => d.id !== id));
  };

  const toggleFeatured = async (design: Design) => {
    try {
      const res = await fetch(`/api/designs/${design.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...design, isFeatured: !design.isFeatured }),
      });
      if (res.ok) fetchDesigns();
    } catch (err) {
      console.error("Toggle featured error:", err);
    }
  };

  const handleEditClick = (design: Design) => {
    setDesignToEdit(design);
    setIsEditModalOpen(true);
  };

```

---
### 📝 File: app/admin/layout.tsx
```typescript
import React from 'react';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { 
  LayoutDashboard, Image as ImageIcon, PenTool, 
  ChevronRight, BookImageIcon 
} from 'lucide-react';
import LogoutButton from '../components/LogoutButton';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.has('admin_session');

  // 1. PUBLIC VIEW: No Sidebar, No Margins
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        {children}
      </div>
    );
  }

  // 2. PROTECTED VIEW: Sidebar + Offset Content
  return (
    <div className="min-h-screen bg-black flex text-neutral-400">
      {/* SIDEBAR */}
      <aside className="w-64 border-r border-white/5 bg-neutral-950 flex flex-col p-6 fixed h-full z-50">
        <div className="mb-10 px-2">
          <h1 className="text-white font-display font-header text-xl tracking-widerer uppercase">
            Anjit <span className="text-[#26ff00] ml-2">Tattoo</span>
          </h1>
        </div>

        <nav className="flex-1 space-y-2">
          <Link href="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 hover:text-white rounded-xl transition-all">
            <LayoutDashboard size={20} /> <span className="font-medium">Dashboard</span>
          </Link>
          <Link href="/admin/designs" className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 hover:text-white rounded-xl transition-all group">
            <ImageIcon size={20} /> <span>Designs</span>
            <ChevronRight size={14} className="ml-auto opacity-0 group-hover:opacity-100" />
          </Link>
          <Link href="/admin/blogs" className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 hover:text-white rounded-xl transition-all group">
            <PenTool size={20} /> <span>Journal/Blog</span>
            <ChevronRight size={14} className="ml-auto opacity-0 group-hover:opacity-100" />
          </Link>
          <Link href="/admin/bookings" className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 hover:text-white rounded-xl transition-all group">
            <BookImageIcon size={20} /> <span>Bookings</span>
            <ChevronRight size={14} className="ml-auto opacity-0 group-hover:opacity-100" />
          </Link>
        </nav>

        <LogoutButton />
      </aside>

      {/* MAIN CONTENT - Only uses ml-64 when sidebar exists */}
      <main className="flex-1 ml-64 p-12">
        {children}
      </main>
    </div>
  );
```

---
### 📝 File: app/admin/page.tsx
```typescript
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [creds, setCreds] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(creds),
    });

    if (res.ok) {
      router.push('/admin/dashboard'); 
      router.refresh();
    } else {
      setError('Wrong username or password.');
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <form onSubmit={handleLogin} className="max-w-md w-full bg-neutral-900 p-8 rounded-3xl border border-white/5 space-y-6">
        <h1 className="text-white text-2xl font-header  uppercase tracking-widerer">Admin Access</h1>
        {error && <p className="text-red-500 text-xs font-header uppercase">{error}</p>}
        <input 
          type="text" 
          placeholder="Username" 
          className="w-full bg-black p-4 rounded-xl text-white outline-none border border-white/5 focus:border-emerald-500"
          onChange={(e) => setCreds({...creds, username: e.target.value})}
        />
        <input 
          type="password" 
          placeholder="Password" 
          className="w-full bg-black p-4 rounded-xl text-white outline-none border border-white/5 focus:border-emerald-500"
          onChange={(e) => setCreds({...creds, password: e.target.value})}
        />
        <button className="w-full bg-white text-black py-4 rounded-xl font-header uppercase tracking-widest">Enter</button>
      </form>
    </div>
  );
}
```

---
### 📝 File: app/api/auth/login/route.ts
```typescript
import { NextResponse } from 'next/server';
import { SignJWT } from 'jose';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    if (
      username === process.env.ADMIN_USERNAME &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const token = await new SignJWT({ authenticated: true })
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime('24h')
        .sign(secret);

      const cookieStore = await cookies();
      cookieStore.set('admin_session', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24, // 1 day
        path: '/',
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
```

---
### 📝 File: app/api/auth/logout/route.ts
```typescript
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_session');
  return NextResponse.json({ success: true });
}
```

---
### 📝 File: app/api/blogs/[id]/route.ts
```typescript
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> } // Use 'id' here
) {
  try {
    const { id } = await params;
    await prisma.post.delete({
      where: { id: id }, // Delete by ID
    });
    return NextResponse.json({ message: "Post deleted" });
  } catch {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}

export async function PUT(
  req: Request, 
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const updatedPost = await prisma.post.update({
      where: { id: id },
      data: {
        title: body.title,
        content: body.content,
        excerpt: body.excerpt,
        // Auto-generate slug from the new title
        slug: body.title.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, ''),
        image: body.imageUrl || body.image,
        published: body.published ?? true,
      },
    });
    
    return NextResponse.json(updatedPost);
  } catch {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
```

---
### 📝 File: app/api/blogs/route.ts
```typescript
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Helper to create a URL-friendly slug
const slugify = (text: string) => 
  text.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(posts);
  } catch {
    console.error("GET BLOGS ERROR: unknown error");
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Ensure slug exists since it's @unique and required in your schema
    const slug = body.slug || slugify(body.title);

    const post = await prisma.post.create({
      data: {
        title: body.title,
        slug: slug,
        content: body.content,
        excerpt: body.excerpt,
        image: body.imageUrl || body.image, // Supporting both naming conventions
        published: true,
        author: body.author || "Anjit",
      },
    });
    
    return NextResponse.json(post);
  } catch {
    console.error("POST BLOG ERROR: unknown error");
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}
```

---
### 📝 File: app/api/bookings/[id]/route.ts
```typescript
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import nodemailer from 'nodemailer';

export async function PATCH(
  req: Request, 
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const ANJIT_TATTOO_CONTACT = "+977 9801017750"; 
    // Create a clickable WhatsApp link
    const whatsappLink = `https://wa.me/${ANJIT_TATTOO_CONTACT.replace(/\s+/g, '')}`;

    const updated = await prisma.booking.update({
      where: { id: id },
      data: {
        status: body.status,
        // Ensure we handle date updates correctly
        scheduledAt: body.scheduledAt ? new Date(body.scheduledAt) : undefined,
      },
    });

    if (body.status === 'CONFIRMED') {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      // Format time specifically for Nepal timezone
      const formattedDate = new Date(updated.scheduledAt).toLocaleString('en-US', {
        timeZone: 'Asia/Kathmandu',
        dateStyle: 'full',
        timeStyle: 'short',
      });

      const mailOptions = {
        from: `"Anjit Tattoo" <${process.env.EMAIL_USER}>`,
        to: updated.email,
        replyTo: process.env.EMAIL_USER,
        subject: 'Booking Confirmed - Anjit Tattoo',
        html: `
          <div style="background-color: #000; color: #fff; padding: 40px; font-family: sans-serif; border-radius: 20px; max-width: 600px; margin: auto; border: 1px solid #333;">
            <h1 style="font-style: ; text-transform: uppercase; color: #fff; letter-spacing: 2px;">Session Confirmed</h1>
            <p style="color: #888;">Hi ${updated.name},</p>
            <p style="color: #ccc;">Your tattoo appointment has been officially confirmed. We have reserved the following time slot for you:</p>
            
            <div style="background: #111; padding: 24px; border: 1px solid #333; border-radius: 12px; font-size: 18px; font-weight: bold; color: #10b981; text-align: center; margin: 20px 0;">
              ${formattedDate}
            </div>
            
            <p style="color: #ccc;">Please arrive 10 minutes early. If you need to reschedule or have questions, please reach out via WhatsApp.</p>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #222;">
              <p style="font-size: 12px; color: #555; text-transform: uppercase; margin-bottom: 5px;">Studio Contact</p>
```

---
### 📝 File: app/api/bookings/route.ts
```typescript
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// app/api/bookings/route.ts
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const booking = await prisma.booking.create({
      data: {
        name: body.name,
        contactNumber: body.contactNumber,
        email: body.email,
        description: body.description, 
        designData: body.designData,      // Now recognized by TypeScript
        designType: body.designType || 'UPLOAD',
        scheduledAt: new Date(body.scheduledAt), // Saves Date + Time
        status: 'PENDING',
      },
    });

    return NextResponse.json(booking, { status: 201 });
  } catch (error: unknown) {
    console.error("API_ERROR:", error);
    return NextResponse.json({ error: "Check server logs" }, { status: 500 });
  }
}
export async function GET() {
  try {
    const bookings = await prisma.booking.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(bookings);
  } catch {
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 });
  }
}
```

---
### 📝 File: app/api/designs/[id]/route.ts
```typescript
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function DELETE(
  req: Request, 
  { params }: { params: Promise<{ id: string }> } // Change to Promise
) {
  try {
    const { id } = await params; // Await the id

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    await prisma.tattooDesign.delete({
      where: { id: id },
    });

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error("❌ DELETE_ERROR:", message);
    return NextResponse.json(
      { error: "Delete failed", details: message }, 
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request, 
  { params }: { params: Promise<{ id: string }> } // Change to Promise
) {
  try {
    const { id } = await params; // Await the id
    const body = await req.json();

    const updated = await prisma.tattooDesign.update({
      where: { id: id },
      data: {
        title: body.title,
        category: body.category,
        imageUrl: body.imageUrl,
        isFeatured: body.isFeatured,
      },
    });

    return NextResponse.json(updated);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error("❌ PUT_ERROR:", message);
    return NextResponse.json(
      { error: "Update failed", details: message }, 
      { status: 500 }
    );
  }
}
```

---
### 📝 File: app/api/designs/route.ts
```typescript
// app/api/designs/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET: Fetch all designs
export async function GET() {
  try {
    const designs = await prisma.tattooDesign.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(designs);
  } catch {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

// POST: Create a new design
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newDesign = await prisma.tattooDesign.create({
      data: {
        title: body.title,
        imageUrl: body.imageUrl,
        category: body.category,
        isFeatured: body.isFeatured || false,
      },
    });
    return NextResponse.json(newDesign);
  } catch {
    return NextResponse.json({ error: "Failed to create" }, { status: 500 });
  }
}
```

---
### 📝 File: app/api/proxy-image/route.ts
```typescript
// app/api/proxy-image/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const imageUrl = searchParams.get('url');

  if (!imageUrl) return new Response('No URL provided', { status: 400 });

  try {
    const response = await fetch(imageUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
    });

    const blob = await response.blob();
    const headers = new Headers();
    headers.set('Content-Type', response.headers.get('Content-Type') || 'image/jpeg');
    headers.set('Cache-Control', 'public, max-age=31536000, immutable');

    return new NextResponse(blob, { headers });
  } catch {
    return new Response('Failed to fetch image', { status: 500 });
  }
}
```

---
### 📝 File: app/blogs/[slug]/page.tsx
```typescript
import React from 'react';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, Calendar, User, Share2 } from 'lucide-react';
import Reveal from '@/app/components/Reveal';

export default async function BlogPostPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;

  const post = await prisma.post.findUnique({
    where: { slug: slug },
  });

  if (!post || !post.published) {
    notFound();
  }

  return (
    /* 1. Clear 150px Logo: pt-40+ 
       2. Full Width: No max-w-4xl 
    */
    <article className="min-h-screen bg-neutral-950 pt-40 md:pt-48 lg:pt-56 pb-16 md:pb-24 px-4 sm:px-8 md:px-12 lg:px-20 w-full">
      <div className="w-full">
        
        {/* BACK BUTTON */}
        <Reveal direction="down">
          <Link 
            href="/blogs" 
            className="inline-flex items-center gap-2 text-white hover:text-[#26ff00] transition-colors mb-10 md:mb-16 group"
          >
            <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">Back to Journal</span>
          </Link>
        </Reveal>

        {/* HEADER */}
        <header className="mb-12 md:mb-20">
          <Reveal delay={0.1}>
            <div className="flex flex-wrap items-center gap-4 md:gap-6 mb-6 md:mb-8 text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em] text-white">
              <span className="flex items-center gap-2 text-[#26ff00]">
                 <Calendar size={16} /> 
                 <span className="text-white">{new Date(post.createdAt).toLocaleDateString()}</span>
              </span>
              <span className="hidden sm:block w-1.5 h-1.5 rounded-full bg-neutral-800" />
              <span className="flex items-center gap-2 text-[#26ff00]">
                <User size={16} /> 
                <span className="text-white">{post.author}</span>
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            {/* Massive Journal-style Title */}
            <h1 className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-display font-header text-white uppercase  tracking-widerer leading-[0.85] mb-8 md:mb-12 max-w-6xl">
```

---
### 📝 File: app/blogs/page.tsx
```typescript
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import { Calendar, ArrowRight, Clock } from 'lucide-react';
import Reveal from '../components/Reveal';

export const revalidate = 0;
export const dynamic = 'force-dynamic';

export default async function BlogsPage() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
  });

  return (
    /* 1. Clear the 150px Logo with pt-40+ 
       2. Removed max-w for edge-to-edge content
    */
    <div className="min-h-screen bg-neutral-950 pt-40 md:pt-48 lg:pt-56 pb-16 md:pb-24 px-4 sm:px-8 md:px-12 lg:px-20 w-full">
      <div className="w-full">
        
        <header className="mb-16 md:mb-24 lg:mb-32">
          <Reveal direction="down">
            <p className="text-[9px] md:text-[11px] font-black uppercase tracking-[0.4em] md:tracking-[0.6em] text-[#26ff00] mb-4 md:mb-6">
              Insights & Artistry
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            {/* Massive single-line title with Emerald accent */}
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-header text-white uppercase  tracking-widerer leading-[0.9] md:leading-none">
              The <span className="text-[#26ff00]">Journal</span>
            </h1>
          </Reveal>
        </header>

        <div 
          key={posts.length}
          /* Removed mx-auto and max-w constraints on the grid */
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-16 w-full"
        >
          {posts.map((post, index) => (
            <Reveal key={post.id} delay={0.05 * index} direction="up">
              <Link href={`/blogs/${post.slug}`} className="group flex flex-col h-full">
                {/* Image Container - No opacity reduction on inactive state */}
                <div className="relative aspect-[16/10] overflow-hidden rounded-[1.5rem] md:rounded-[2.5rem] bg-neutral-900 mb-6 md:mb-8 border border-white/5 shadow-2xl">
                  <Image
                    src={post.image || '/placeholder-blog.jpg'}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                </div>

                {/* Metadata - Icons Emerald, Text White */}
                <div className="flex items-center gap-4 md:gap-6 mb-4 md:mb-6 text-[10px] md:text-[11px] font-black uppercase tracking-widest text-white">
                  <span className="flex items-center gap-2">
                    <Calendar size={14} className="text-[#26ff00]" />
```

---
### 📝 File: app/components/AboutSection.tsx
```typescript
import React from 'react';
import Image from 'next/image';
import { Sparkles, Youtube } from 'lucide-react';
import StaticReveal from './StaticReveal'; // Use the CSS-only reveal we created

export default function AboutSection() {
  return (
    <section className="bg-neutral-950 px-4 sm:px-8 md:px-12 lg:px-20 w-full py-20">
      <div className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT: Complete Biography */}
          <div className="lg:col-span-6 space-y-8 md:space-y-10 relative z-10">
            
            {/* MOBILE ONLY BACKGROUND (Top Image) */}
            <div className="lg:hidden absolute -top-20 -left-4 -right-4 h-[80vh] pointer-events-none">
              <Image 
                src="/anjit-rai-tattooing.png" 
                alt="Background" 
                fill 
                className="object-cover object-top"
                sizes="100vw"
                quality={60} // Lower quality for mobile background to save speed
              />
              <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/40 via-neutral-950/90 to-neutral-950" />
            </div>

            <StaticReveal>
              <div className="flex items-center gap-2 mb-4 md:mb-6">
                <Sparkles className="text-[#26ff00] w-3.5 h-3.5" />
                <span className="text-[#26ff00] text-[9px] md:text-[10px] font-black uppercase tracking-[0.5em]">The Masterpiece</span>
              </div>
              
              <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-[8rem] font-display font-header text-white  uppercase tracking-widerer leading-none mb-6 md:mb-8 lg:whitespace-nowrap">
                Anjit <span className="text-[#26ff00]">Rai</span>
              </h2>
              
              <div className="space-y-4 md:space-y-6 text-neutral-400 text-base md:text-lg leading-relaxed font-sans">
                <p>
                  <span className="text-white font-header">Anjit Rai</span>, the proprietor and lead tattoo artist at ANJIT TATTOO STUDIO, has dedicated his life to transforming art into timeless expressions on skin.
                </p>
                <p>
                  Every tattoo has a story but before the ink touched skin, there was a journey that began in 2012. Today the journey stands on experience, not shortcuts.
                </p>
                <p>
                  In 2022, Anjit fulfilled his dream of opening Anjit Tattoo Studio in Thamel, Kathmandu. His dedication to continuous learning has led him to major conventions, including the Nepal International Tattoo Conventions.
                </p>
              </div>
            </StaticReveal>

            <div className="hidden lg:block">
              <StaticReveal delay="delay-2">
                <YouTubeFeature />
              </StaticReveal>
            </div>
          </div>

          {/* RIGHT: Visual Work Grid */}
          <div className="lg:col-span-6 flex flex-col gap-4 md:gap-6">
            
```

---
### 📝 File: app/components/AddBlogModal.tsx
```typescript
import { Loader2, X } from "lucide-react";
import { useState, FormEvent } from "react";

interface AddBlogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddBlogModal({ isOpen, onClose, onSuccess }: AddBlogModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ title: '', excerpt: '', content: '', imageUrl: '' });

  if (!isOpen) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        onSuccess();
        onClose();
        setFormData({ title: '', excerpt: '', content: '', imageUrl: '' });
      }
    } catch (err) { console.error(err); } 
    finally { setLoading(false); }
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm">
      <div className="bg-neutral-900 border border-white/10 w-full max-w-2xl rounded-[3rem] overflow-hidden">
        <div className="p-10 max-h-[90vh] overflow-y-auto custom-scrollbar">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-display font-header text-white uppercase  tracking-widerer">New Article</h2>
            <button onClick={onClose} className="text-neutral-500 hover:text-white"><X size={28}/></button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-neutral-500 tracking-widest ml-1">Title</label>
              <input required className="w-full bg-black border border-white/5 rounded-2xl px-5 py-4 text-white focus:border-emerald-500 outline-none" 
                value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-neutral-500 tracking-widest ml-1">Excerpt (Short Summary)</label>
              <textarea required className="w-full bg-black border border-white/5 rounded-2xl px-5 py-4 text-white focus:border-emerald-500 outline-none h-20 resize-none" 
                value={formData.excerpt} onChange={e => setFormData({...formData, excerpt: e.target.value})} />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-neutral-500 tracking-widest ml-1">Content (Markdown/Text)</label>
              <textarea required className="w-full bg-black border border-white/5 rounded-2xl px-5 py-4 text-white focus:border-emerald-500 outline-none h-40 resize-none" 
                value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} />
            </div>
```

---
### 📝 File: app/components/AddDesignModal.tsx
```typescript
'use client';
import React, { useState } from 'react';
import { X, Instagram, Image as ImageIcon, Link as LinkIcon, Loader2, ChevronDown, Star } from 'lucide-react';

interface AddDesignModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function AddDesignModal({ isOpen, onClose, onSuccess }: AddDesignModalProps) {
  const [mode, setMode] = useState<'upload' | 'instagram'>('upload');
  const [loading, setLoading] = useState(false);
  
  const categories = [
    'Blackwork / Black and Gray', 
    'Realism', 
    'Traditional', 
    'Minimalist', 
    'Fontwork and Linework',
    'Colorwork and New School', 
    'Mandala , Dot Work and Geomatrical', 
    'Cover up',
    'Other'
  ];

  const [formData, setFormData] = useState({ 
    title: '', 
    category: 'Other',
    imageUrl: '',
    isFeatured: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    let finalUrl = formData.imageUrl;
    if (mode === 'instagram' && finalUrl.includes('instagram.com')) {
      finalUrl = finalUrl.split('?')[0].replace(/\/$/, "");
    }

    try {
      const res = await fetch('/api/designs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, imageUrl: finalUrl }),
      });
      
      if (res.ok) {
        onSuccess();
        onClose();
        setFormData({ title: '', category: 'Other', imageUrl: '', isFeatured: false });
      }
    } catch (err) {
      console.error("Save error:", err);
    } finally {
      setLoading(false);
    }
  };
```

---
### 📝 File: app/components/BookingForm.tsx
```typescript
'use client';
import React, { useState, useMemo, useRef, useEffect } from 'react';
import Image from 'next/image';
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
```

---
### 📝 File: app/components/BookingManager.tsx
```typescript
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
              <h4 className="text-white font-header text-lg">{booking.name}</h4>
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
```

---
### 📝 File: app/components/BookingSection.tsx
```typescript
'use client';
import React from 'react';
import { BookingForm } from "./BookingForm";
import { ShieldCheck, Zap } from "lucide-react";
import Reveal from "./Reveal"; 

interface BookingSectionProps {
  showGlow?: boolean;
}

export default function BookingSection({ showGlow = false }: BookingSectionProps) {
  return (    
    <section className="relative w-[100vw] left-1/2 right-1/2 -ml-[50vw] overflow-hidden bg-[#050505]">
      
      {/* 1. SEAMLESS BACKGROUND (Zero Padding, Full Screen Width) */}
      {showGlow && (
        <div className="absolute inset-0 z-0 pointer-events-none flex">
          {/* THE 40% EMERALD SIDE - Fixed Width */}
          <div className="w-full h-full bg-emerald-900 relative">
             {/* Edge glow to make the green feel richer */}
             <div className="absolute inset-y-0 left-0 w-1/4 bg-emerald-900 blur-3xl" />
          </div>

          {/* THE 60% BLACK SIDE */}
          <div className="w-[60%] h-full bg-black" />

          {/* THE HORIZONTAL BLEND: Merges the 40/60 split naturally */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 via-black/90 to-black" />
          
          <div className="absolute inset-0 bg-grain opacity-[0.05]" />
        </div>
      )}
      
      {/* 2. CONTENT CONTAINER (Padding only inside here) */}
      <div className="relative z-10 max-w-[1920px] mx-auto px-6 sm:px-12 lg:px-24 py-20 md:py-32">
        
        {/* THE BOX CONTAINER */}
        <div className="flex flex-col border border-white/5 rounded-[2.5rem] overflow-hidden bg-black/20 backdrop-blur-3xl shadow-2xl">
          
          {/* Top Header Bar */}
          <div className="w-full border-b border-white/5 px-8 md:px-16 py-8 flex justify-between items-center bg-white/[0.01]">
            <div className="flex items-center gap-4">
               <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.5)] animate-pulse" />
               <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40">Consultation Unit</span>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row items-stretch gap-0">
            {/* LEFT SIDE: 50% Content */}
            <div className="w-full lg:w-1/2 p-8 md:p-16 lg:p-20 flex flex-col justify-start border-b lg:border-b-0 lg:border-r border-white/5">
              <Reveal direction="right" className="space-y-10">
                <h2 className="text-5xl md:text-7xl font-display font-header  uppercase tracking-widerer leading-[0.85] text-white">
                  Secure <br />
                  <span className="text-[#26ff00]">Your Session</span>
                </h2>
                
                <p className="text-neutral-400 text-sm md:text-base leading-relaxed font-body max-w-sm">
                  Merging world-class precision with Kathmandu soul. Experience the highest medical-grade safety in an elite studio environment.
                </p>

```

---
### 📝 File: app/components/Designs.tsx
```typescript
// components/Designs.tsx
import React from 'react';
import Link from 'next/link';
import GalleryClient from './GalleryClient';
import { ArrowRight, Sparkles } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import Reveal from './Reveal';

export const revalidate = 0;
export default async function Designs() {
  const designs = await prisma.tattooDesign.findMany({
    take: 6,
    orderBy: { createdAt: 'desc' },
    select: { id: true, title: true, imageUrl: true, category: true }
  });

  const serializedDesigns = JSON.parse(JSON.stringify(designs));

  return (
    // Reduced padding on mobile (py-20) vs desktop (py-32)
    <section className="py-20 md:py-32 bg-neutral-950">
      {/* - max-w-7xl limits width on huge screens
          - px-4 for small phones, px-8 for tablets, px-12+ for desktop
      */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 lg:px-20">
        
        <Reveal direction="up" className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-20 gap-8">
          <div className="space-y-3 md:space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="text-[#26ff00]" size={12} />
              <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-neutral-500">
                Portfolio
              </span>
            </div>
            {/* Fluid typography for the heading */}
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-display font-header text-white  uppercase tracking-widerer leading-none">
              Featured <span className="text-neutral-800">Work</span>
            </h2>
          </div>

          {/* Link width is full on mobile for better touch target, auto on desktop */}
          <Link 
            href="/gallery" 
            className="group w-full md:w-auto flex items-center justify-between md:justify-start gap-3 text-white hover:text-[#26ff00] transition-all font-black uppercase text-[10px] tracking-[0.3em] pb-3 border-b border-white/10"
          >
            Explore Full Gallery 
            <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </Reveal>

        {/* Container for the gallery to handle its own internal spacing.
            Make sure GalleryClient uses a responsive grid (e.g., grid-cols-1 md:grid-cols-2 lg:grid-cols-3)
        */}
        <div className="w-full">
          <GalleryClient designs={serializedDesigns} isFeatured={true} />
        </div>
      </div>
    </section>
  );
}
```

---
### 📝 File: app/components/EditBlogModal.tsx
```typescript
import { Loader2, X, Image as ImageIcon, AlignLeft, Type, FileText } from "lucide-react";
import { useState, FormEvent } from "react";

interface EditBlogModalProps {
  blog: {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    image?: string;
    imageUrl?: string;
  };
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function EditBlogModal({ blog, isOpen, onClose, onSuccess }: EditBlogModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(blog);

  if (!isOpen) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`/api/blogs/${blog.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) { 
        onSuccess(); 
        onClose(); 
      } else {
        const errorData = await res.json();
        console.error("Server Error:", errorData);
      }
    } catch (err) { 
      console.error("Fetch Error:", err); 
    } finally { 
      setLoading(false); 
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm">
      <div className="bg-neutral-900 border border-white/10 w-full max-w-2xl rounded-[3rem] overflow-hidden shadow-2xl">
        <div className="p-10 max-h-[90vh] overflow-y-auto custom-scrollbar">
          
          <div className="flex justify-between items-center mb-10">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#26ff00] mb-1">Editor</p>
              <h2 className="text-3xl font-display font-header text-white uppercase  tracking-widerer">Edit Article</h2>
            </div>
            <button onClick={onClose} className="p-3 bg-white/5 rounded-full text-neutral-500 hover:text-white transition-colors">
              <X size={24}/>
```

---
### 📝 File: app/components/EditDesignModal.tsx
```typescript
'use client';
import React, { useState } from 'react';
import { X, Loader2, Star, ChevronDown } from 'lucide-react';

interface EditDesignModalProps {
  design: {
    id: string;
    title: string;
    category: string;
    imageUrl: string;
    isFeatured: boolean;
  };
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const EditDesignModal = ({ design, isOpen, onClose, onSuccess }: EditDesignModalProps) => {
  const [formData, setFormData] = useState(design);
  const [loading, setLoading] = useState(false);
  if (!isOpen) return null;


  const categories = [
    'Blackwork / Black and Gray', 
    'Realism', 
    'Traditional', 
    'Minimalist', 
    'Fontwork and Linework',
    'Colorwork and New School', 
    'Mandala , Dot Work and Geomatrical', 
    'Cover up',
    'Other'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`/api/designs/${design.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        onSuccess();
        onClose();
      }
    } catch (err) { console.error(err); } 
    finally { setLoading(false); }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
      <div className="w-full max-w-lg bg-neutral-900 border border-white/10 rounded-[2.5rem] p-10 shadow-2xl">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-display font-header text-white uppercase  tracking-widerer">Edit Work</h2>
          <button onClick={onClose} className="text-neutral-500 hover:text-white transition-colors"><X size={24} /></button>
        </div>
        
```

---
### 📝 File: app/components/EmailTemplate.tsx
```typescript
import * as React from 'react';

interface EmailTemplateProps {
  name: string;
  time: string;
  contactNumber: string;
}

export const EmailTemplate = ({
  name,
  time,
  contactNumber,
}: EmailTemplateProps) => (
  <div style={{
    backgroundColor: '#000',
    color: '#fff',
    padding: '40px',
    fontFamily: 'sans-serif',
    borderRadius: '20px',
  }}>
    <h1 style={{ fontSize: '24px', fontStyle: '', textTransform: 'uppercase', color: '#fff' }}>
      Session Confirmed
    </h1>
    <p style={{ color: '#ccc' }}>Hi {name},</p>
    <p style={{ color: '#ccc' }}>Your tattoo appointment has been officially confirmed for:</p>
    
    <div style={{
      background: '#111',
      padding: '24px',
      border: '1px solid #333',
      borderRadius: '12px',
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#10b981',
      textAlign: 'center' as const,
      margin: '20px 0'
    }}>
      {time}
    </div>
    
    <p style={{ fontSize: '14px', color: '#888' }}>
      Please arrive 10 minutes early. If you need to reschedule, 
      reach out via WhatsApp: <strong>{contactNumber}</strong>.
    </p>
    
    <hr style={{ border: '0', borderTop: '1px solid #222', margin: '30px 0' }} />
    <p style={{ fontSize: '10px', color: '#444', textAlign: 'center' as const }}>
      ANJIT TATTOO STUDIO • PRIVATE SESSIONS
    </p>
  </div>
);
```

---
### 📝 File: app/components/FeaturedSlider.tsx
```typescript
'use client';

import React from 'react';
import Image from 'next/image';

interface Design {
  id: string;
  title: string;
  imageUrl: string;
  category: string;
}

export default function FeaturedGrid({ designs }: { designs: Design[] }) {

  const getDisplayUrl = (url: string) => {
    if (!url.includes('instagram.com')) return url;

    const cleanBase = url.split('?')[0].replace(/\/$/, "");

    return `https://images.weserv.nl/?url=${encodeURIComponent(cleanBase + "/media/?size=l")}&w=1000&q=80&output=webp`;
  };

  return (
    <div className="py-10">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

        {designs.map((design) => (
          <div key={design.id} className="relative aspect-[3/4] overflow-hidden border border-white/10 group">

            <Image
              src={getDisplayUrl(design.imageUrl)}
              alt={design.title}
              fill
              sizes="(max-width: 768px) 100vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              unoptimized
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-6">
              <span className="text-[#26ff00] text-[10px] font-black uppercase tracking-[0.4em] mb-2">
                {design.category}
              </span>

              <h3 className="text-2xl font-header text-white uppercase  leading-none">
                {design.title}
              </h3>
            </div>

          </div>
        ))}

      </div>
    </div>
  );
}
```

---
### 📝 File: app/components/Footer.tsx
```typescript
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Facebook, Mail, MapPin } from 'lucide-react';
import { FaTiktok } from 'react-icons/fa6';
import Reveal from './Reveal';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    // Added pb-32 on mobile to avoid clashing with the Mobile Bottom Nav
    <footer className="bg-black border-t border-white/5 pt-16 md:pt-24 pb-32 md:pb-12 px-6 md:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 mb-16 md:mb-20">
          
          {/* BRANDING COLUMN */}
          <div className="md:col-span-5 space-y-6 md:space-y-8">
            <Reveal direction="none">
              <Image 
                src="/logo.png" 
                alt="Anjit Tattoo Logo" 
                width={150} 
                height={150} 
                className="invert brightness-200 mb-6"
              />
              <p className="text-neutral-500 text-sm leading-relaxed max-w-sm">
                {'Kathmandu\u2019s premier destination for custom tattooing.'} 
                Merging traditional discipline with modern artistry 
                in the heart of Thamel.
              </p>
            </Reveal>

            <div className="flex gap-4">
              {[
                { icon: Instagram, href: 'https://instagram.com/anjit_tattoo' },
                { icon: Facebook, href: 'https://www.facebook.com/tattooanjit' },
                { icon: FaTiktok, href: 'https://www.tiktok.com/@anjit_tattoo' }
              ].map((social, i) => (
                <Reveal key={i} delay={i * 0.1} direction="up">
                  <a 
                    href={social.href} 
                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:border-emerald-500 transition-all duration-300"
                  >
                    <social.icon size={18} />
                  </a>
                </Reveal>
              ))}
            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="md:col-span-3 space-y-6">
            <h4 className="text-white text-[10px] font-black uppercase tracking-[0.4em]">Navigation</h4>
            <ul className="space-y-4">
              {['Home', 'Gallery', 'About', 'Contact'].map((item) => (
                <li key={item}>
                  <Link 
                    href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    className="text-neutral-500 hover:text-[#26ff00] text-xs font-header uppercase tracking-widest transition-colors"
```

---
### 📝 File: app/components/GalleryClient.tsx
```typescript
'use client';
import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Instagram, Loader2, Plus, LayoutGrid } from 'lucide-react';

interface Design {
  id: string;
  title: string;
  imageUrl: string;
  category: string;
}

interface GalleryClientProps {
  designs: Design[];
  isFeatured?: boolean;
}

export default function GalleryClient({ designs, isFeatured = false }: GalleryClientProps) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState<Design | null>(null);
  const [visibleCount, setVisibleCount] = useState(6);

  const categories = [
  'All', 
  'Blackwork / Black and Gray', // Fixed string
  'Realism', 
  'Traditional', 
  'Fontwork and Linework', 
  'Minimalist', 
  'Colorwork and New School', 
  'Mandala , Dot Work and Geomatrical', 
  'Cover up',
  'Other'
];

  const getDisplayUrl = (url: string, width = 600) => {
    if (!url.includes('instagram.com')) return url;
    const cleanBase = url.split('?')[0].replace(/\/$/, "");
    return `https://images.weserv.nl/?url=${encodeURIComponent(cleanBase + "/media/?size=l")}&w=${width}&q=70&output=webp`;
  };
  
  const filtered = useMemo(() => {
    let result = designs;
    if (!isFeatured && activeCategory !== 'All') {
      result = designs.filter(d => d.category.toLowerCase() === activeCategory.toLowerCase());
    }
    return result;
  }, [activeCategory, designs, isFeatured]);

  const displayItems = filtered.slice(0, visibleCount);

  const navigate = (dir: 'next' | 'prev') => {
    const idx = filtered.findIndex(d => d.id === selectedImage?.id);
    if (idx === -1) return;
    let next = dir === 'next' ? idx + 1 : idx - 1;
    if (next >= filtered.length) next = 0;
    if (next < 0) next = filtered.length - 1;
    setSelectedImage(filtered[next]);
  };
```

---
### 📝 File: app/components/Hero.tsx
```typescript
// app/components/home/Hero.tsx
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <Image 
          src='/hero.jpg' 
          alt='Hero Image' 
          fill 
          priority
          className='object-cover object-center opacity-80' 
        />
        {/* Dark gradient for readability - moved to bottom for better contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
      </div>
    
      {/* Text Container Layer - justify-end pushes items to the bottom */}
      <div className="relative z-10 flex flex-col justify-end items-center h-full pb-24 p-12 text-center text-white ">
        <h1 className="text-6xl font-black uppercase tracking-wider mb-6 font-header">
  Custom Tattoo Art <br></br><span className="text-green-500">in Kathmandu</span>
</h1>
<p className="text-lg text-gray-400 mb-8 max-w-lg">
  Specializing in bold, atmospheric dark art and precision fine-line tattoos. Transform your vision into permanent, high-contrast masterpieces at the premier studio in Kathmandu.
</p>
        <div className="flex gap-10 items-center justify-center">
        <Link 
          href="/book" 
          className="bg-green-600 hover:bg-green-500 text-white px-8 py-4 rounded-full font-header transition-all hover:scale-105"
        >
          Book Your Session
        </Link>
        <Link href='/gallery' 
          className="bg-white text-black hover:bg-gray-300  px-8 py-4 rounded-full font-header transition-all hover:scale-105">
          Explore the Gallery
        </Link>
        </div>
      </div>
    </div>
  )
}
```

---
### 📝 File: app/components/LayoutWrapper.tsx
```typescript
// /Users/ankitaryal/anjit-tattoo/app/components/LayoutWrapper.tsx
'use client';

import { usePathname } from 'next/navigation';
import  Navbar  from './Navbar';
import { Footer } from './Footer';

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Check if the current path starts with /admin
  const isAdminPath = pathname?.startsWith('/admin');

  if (isAdminPath) {
    return (
      <main className="relative min-h-screen w-full">
        {children}
      </main>
    );
  }

  return (
    <>
      <Navbar />
      <main className="relative min-h-screen w-full overflow-x-hidden">
        {children}
      </main>
      <Footer />
    </>
  );
}
```

---
### 📝 File: app/components/LogoutButton.tsx
```typescript
'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    // 1. If you are using NextAuth, use: signOut({ callbackUrl: '/' });
    // 2. If you are using custom cookies, you'd call an API to clear them:
    try {
      // Example for custom session clearing
      await fetch('/api/auth/logout', { method: 'POST' });
      
      // Redirect to home or login page
      router.push('/');
      router.refresh();
    } catch (err) {
      console.error("Logout failed", err);
      // Fallback redirect
      window.location.href = '/';
    }
  };

  return (
    <button 
      onClick={handleLogout}
      className="flex items-center gap-3 px-4 py-3 text-red-500/60 hover:text-red-500 transition-colors mt-auto w-full border-t border-white/5 pt-6"
    >
      <LogOut size={20} /> <span>Sign Out</span>
    </button>
  );
}
```

---
### 📝 File: app/components/Navbar.tsx
```typescript
'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  
  const navLinks = [
    { name: 'Gallery', path: '/gallery' },
    { name: 'About', path: '/about' },
    { name: 'Blogs', path: '/blogs' },
  ];

  return (
    <nav className="absolute top-0 left-0 w-full z-[100] flex items-center justify-between px-10 py-6 text-white">
      {/* Logo */}
      <Link href="/" className="transition-transform duration-500 hover:scale-105">
        <Image 
          src='/logo-2.png'
          alt='Logo'
          width={220} 
          height={220}
          className='object-contain'
          priority
        />
      </Link>

      {/* Nav Links + CTA */}
      <div className="flex items-center gap-10">
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.path}
                href={link.path}
                className={`text-[14px] font-medium uppercase tracking-widest transition-all duration-300 hover:text-green-500 ${
                  isActive ? 'text-green-500' : 'text-white/80'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        <Link 
          href='/book' 
          className='bg-green-800 hover:bg-green-600 text-white px-8 py-3 rounded-full font-header text-[14px] uppercase tracking-widest transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-green-900/20'
        >
          Book Now
        </Link>
      </div>
    </nav>
  );
}
```

---
### 📝 File: app/components/Reveal.tsx
```typescript
'use client';
import { motion } from 'framer-motion';

interface RevealProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  delay?: number;
  duration?: number;
  className?: string;
}

export default function Reveal({ 
  children, 
  direction = 'up', 
  delay = 0, 
  duration = 0.5,
  className = "" 
}: RevealProps) {
  
  return (
    <motion.div
      className={className}
      initial={{ 
        opacity: 0, 
        y: direction === 'up' ? 30 : direction === 'down' ? -30 : 0,
        x: direction === 'left' ? 30 : direction === 'right' ? -30 : 0,
        scale: direction === 'none' ? 0.95 : 1
      }}
      whileInView={{ 
        opacity: 1, 
        y: 0, 
        x: 0,
        scale: 1
      }}
      // margin: "200px" triggers the animation way before the element hits the screen
      viewport={{ once: true, margin: "0px 0px 200px 0px" }}
      transition={{ 
        duration: duration, 
        delay: delay, 
        ease: [0.25, 1, 0.5, 1] 
      }}
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </motion.div>
  );
}
```

---
### 📝 File: app/components/Reviews.tsx
```typescript
'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, CheckCircle } from 'lucide-react';

const REVIEWS = [
  {
    id: 1,
    name: "Andrew Warren",
    role: "Verified Client",
    text: "I had an amazing experience getting a tattoo from Anjit! He’s incredibly talented, with great attention to detail and a real passion for his work. The design turned out even better than I imagined, and the whole process was smooth and comfortable.",
  },
  {
    id: 2,
    name: "Ajaya Karki",
    role: "Local Guide",
    text: "Loved the work that he did. It was amazing beyond what I had imagined. This was my second visit to ANJIT TATTOO. I am amazed at the work that they do... They are very professional.",
  },
  {
    id: 3,
    name: "Filip Mitricevic",
    role: "Verified Client",
    text: "I had the best tattooing experience of my life so far with Anjit. I am thrilled with the design and the finished product. But I've never been to a studio that dedicates so much attention to the process and hygiene.",
  },
  {
    id: 4,
    name: "Monika J. Vaidya",
    role: "Customer",
    text: "I had a fantastic experience at ANJIT TATTOO. The studio is clean, and the staff are professional and friendly. ANJIT ji did an amazing job on my tattoo. Highly recommend!",
  }
];

export default function ReviewSlider() {
  const [index, setIndex] = useState(0);

  const nextReview = useCallback(() => {
    setIndex((prev) => (prev + 1 >= REVIEWS.length ? 0 : prev + 1));
  }, []);

  useEffect(() => {
    const timer = setInterval(nextReview, 6000);
    return () => clearInterval(timer);
  }, [nextReview]);

  // Safety Guard for Next.js 16/Turbopack
  if (!REVIEWS[index]) return null;

  return (
    <section className="relative py-24 overflow-hidden">
      {/* BACKGROUND: Emerald Mesh & Gradient */}
      <div className="absolute inset-0 bg-[#050505] z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.08),transparent_70%)] z-0" />
      
      <motion.div 
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 blur-[120px] rounded-full z-0"
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
```

---
### 📝 File: app/components/ScrollToTop.tsx
```typescript
'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // Force the window to the top-left immediately on route change
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant', // 'instant' prevents the 'sliding' look
    });
  }, [pathname]);

  return null;
}
```

---
### 📝 File: app/components/StaticReveal.tsx
```typescript
import React from 'react';

interface StaticRevealProps {
  children: React.ReactNode;
  delay?: string; // e.g., "delay-1", "delay-2" from your globals.css
  className?: string;
}

export default function StaticReveal({ children, delay = "", className = "" }: StaticRevealProps) {
  return (
    <div className={`animate-hero ${delay} ${className}`}>
      {children}
    </div>
  );
}
```

---
### 📝 File: app/contact/page.tsx
```typescript
'use client';
import React, { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import { BookingForm } from '../components/BookingForm';
import { MapPin, Phone, Clock, Sparkles, Navigation, XCircle, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const checkStatus = () => {
      const ktmTime = new Date().toLocaleString("en-US", { timeZone: "Asia/Kathmandu" });
      const hours = new Date(ktmTime).getHours();
      setIsOpen(hours >= 11 && hours < 20);
    };
    checkStatus();
    const interval = setInterval(checkStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.5, ease: "easeOut" } 
    }
  };

  return (
    <div className="relative min-h-screen bg-neutral-950 pt-24 md:pt-32 lg:mt-44 pb-16 md:pb-24 overflow-hidden">
      {/* Background Orbs - Scaled for mobile */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.08, 0.05] 
        }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-0 right-0 w-72 h-72 md:w-[500px] md:h-[500px] bg-emerald-500 rounded-full blur-[80px] md:blur-[120px] -z-10" 
      />
      <div className="absolute bottom-0 left-0 w-48 h-48 md:w-[300px] md:h-[300px] bg-white/5 blur-[60px] md:blur-[100px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-start">
          
          {/* LEFT COLUMN: Info & Branding */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="lg:col-span-5 space-y-8 md:space-y-12"
          >
```

---
### 📝 File: app/gallery/page.tsx
```typescript
import React from 'react';
import GalleryClient from '../components/GalleryClient';
import { Sparkles } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import Reveal from '../components/Reveal';

// Forces the page to fetch fresh data on every request
export const revalidate = 0; 

export default async function GalleryPage() {
  // 1. Fetch data
  const designs = await prisma.tattooDesign.findMany({
    orderBy: { createdAt: 'desc' }
  });

  // 2. Serialize
  const serializedDesigns = JSON.parse(JSON.stringify(designs));

  return (
    // Reduced pt-32 to pt-24 on mobile to reduce initial empty space
    <div className="min-h-screen bg-neutral-950 pt-24 md:pt-32 pb-16 md:pb-24 px-4 sm:px-8 md:px-12 lg:px-20 lg:pt-44">
      <div className="mx-auto">
        
        {/* ANIMATED HEADER */}
        <header className="text-center mb-10 md:mb-16">
          <Reveal direction="down">
            <div className="flex justify-center items-center gap-2 mb-3 md:mb-4">
              <Sparkles className="text-[#26ff00] w-3.5 h-3.5 md:w-4 md:h-4" />
              <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-neutral-500">
                The Archive
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            {/* - text-5xl for small mobile
                - text-7xl for tablets
                - text-9xl for desktop
                - whitespace-pre-line or br helps control word breaks on narrow screens
            */}
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-header text-white uppercase  tracking-widerer leading-[0.9] md:leading-none">
              Art on <br className="block sm:hidden" /> 
              <span className="text-[#26ff00]">Skin</span>
            </h1>
          </Reveal>
        </header>

        {/* The min-height ensures no layout shift while data loads, 
            but we lower it slightly for mobile screens. 
        */}
        <div className="min-h-[400px] md:min-h-[600px]">
          <GalleryClient designs={serializedDesigns} />
        </div>

      </div>
    </div>
  );
}
```

---
### 📝 File: app/layout.tsx
```typescript

// app/layout.tsx
import "./globals.css";
import localFont from 'next/font/local'
import { LayoutWrapper } from "./components/LayoutWrapper";

const customHeaderFont = localFont({
  src: './fonts/SixCaps-Regular.ttf',
  variable: '--font-header',
  display: 'swap',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${customHeaderFont.variable}`}>
      <body className="relative min-h-screen w-full bg-black text-white">
        {/* Persistent Global Background */}
        <div className="fixed inset-0 -z-20 w-full h-full">
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat hero-background" />
          {/* Dark Overlay to protect text readability */}
          <div className="absolute inset-0 bg-black/70" />
        </div>        

        {/* Page Content */}
        <main className="relative z-0">
          <LayoutWrapper>
            {children}
            </LayoutWrapper>
          </main>        
      </body>
    </html>
  );
}
```

---
### 📝 File: app/page.tsx
```typescript
// app/page.tsx
import { Suspense } from 'react';
import Hero from './components/Hero';
import BookingSection from './components/BookingSection';
import ReviewSlider from './components/Reviews';
import FeaturedSlider from './components/FeaturedSlider';
import { prisma } from '@/lib/prisma';
import Image from 'next/image';


export const revalidate = 0;
export default async function Page() {
  // Fetch only featured designs from the DB
  const featuredWork = await prisma.tattooDesign.findMany({
    where: { isFeatured: true },
    orderBy: { createdAt: 'desc' },
    take: 10, // Limit to top 10 for performance
  });

  return (
    <main className="relative min-h-screen w-full">
      <div className="fixed bottom-8 right-8 z-50 w-48 h-48 opacity-40 pointer-events-none hidden lg:block">
        <Image 
          src='/logo.png' 
          alt='Background Logo' 
          fill 
          className='object-contain' 
        />
      </div>
      <Hero />
      
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-24 py-20">
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-header font-header text-white uppercase tracking-widerer leading-tight">
              Portfolio <span className="text-green-500">Highlights</span>
            </h1>
          </div>         
        </header>

        <Suspense fallback={<LoadingState />}>
          <FeaturedSlider designs={JSON.parse(JSON.stringify(featuredWork))} />
        </Suspense>
        
        <BookingSection showGlow={true}/>
        

        <Suspense fallback={<div className="h-40" />}>
          <ReviewSlider />
        </Suspense>
      </div>
      <div className="fixed bottom-8 left-8 z-10 pointer-events-none flex items-center gap-3">
  <div className="relative flex items-center justify-center">
    <div className="w-3 h-3 bg-green-500 rounded-full shadow-[0_0_15px_rgba(34,197,94,0.6)] animate-pulse" />
  </div>
  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">
    Booking Open
  </span>
</div>
    </main>
```

---
### 📝 File: app/types.ts
```typescript
// 🎨 Design Type
export interface TattooDesign {
  id: string;
  title: string;
  category: 'Blackwork / Black and Gray' | 'Realism' | 'Traditional' | 'Fontwork and Linework' | 'Minimalist' | 'Colorwork and New School' | 'Mandala , Dot Work and Geomatrical' | 'Cover up' | 'Other';
  imageUrl: string;
  isFeatured: boolean; // Added for homepage control
  createdAt: number;
}

// 📅 Booking Type (Enhanced for Rescheduling/Rejection)
export interface BookingRequest {
  id: string;
  name: string;
  contactNumber: string;
  email: string;
  description?: string;
  designType: 'existing' | 'custom';
  selectedDesignId?: string;
  status: 'PENDING' | 'CONFIRMED' | 'REJECTED' | 'RESCHEDULED'; // Statuses for Admin logic
  scheduledAt: string | Date; // Exact date and time for the appointment
  createdAt: number;
}

// ✍️ Blog/Post Type
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  image?: string;
  published: boolean;
  createdAt: number;
}

// 👤 User Roles
export enum UserRole {
  GUEST = 'guest',
  ADMIN = 'admin',
}
```

---
### 📝 File: prisma/schema.prisma
```typescript
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
}

model Booking {
  id               String   @id @default(cuid())
  name             String
  contactNumber    String
  email            String
  description      String?
  designType       String
  selectedDesignId String?
  status           String   @default("PENDING")
  scheduledAt      DateTime
  createdAt        DateTime @default(now())
  updatedAt        DateTime @updatedAt
  designData       String?
  
}

model TattooDesign {
  id          String   @id @default(cuid())
  title       String
  category    String
  imageUrl    String
  description String?
  isFeatured  Boolean  @default(false)
  createdAt   DateTime @default(now())
}

model Post {
  id        String   @id @default(cuid())
  title     String
  slug      String   @unique
  content   String
  excerpt   String?
  image     String?
  published Boolean  @default(false)
  author    String   @default("Anjit")
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

```

---
### 📝 File: lib/prisma.ts
```typescript
import { Pool, types } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

// This ensures dates are handled correctly between PG and Prisma
types.setTypeParser(1114, (str) => str);

const connectionString = process.env.DATABASE_URL?.replace('?sslmode=require', '');

const pool = new Pool({ 
  connectionString,
  max: 10, // Recommended for serverless/Next.js
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
  ssl: { rejectUnauthorized: false }
});

const adapter = new PrismaPg(pool);

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Pass the adapter inside the PrismaClient constructor
export const prisma = globalForPrisma.prisma ?? new PrismaClient({ 
  adapter,
  log: ['query', 'error', 'warn'] // This helps you see what's happening in terminal
});

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
```

---
