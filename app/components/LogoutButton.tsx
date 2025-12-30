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
      const res = await fetch('/api/auth/logout', { method: 'POST' });
      
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