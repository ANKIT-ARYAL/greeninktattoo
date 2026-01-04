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
          <h1 className="text-white font-display font-bold text-xl tracking-tighter uppercase">
            Anjit <span className="text-neutral-600">Admin</span>
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
}