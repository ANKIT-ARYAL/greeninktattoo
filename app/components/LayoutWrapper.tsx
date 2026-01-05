// /Users/ankitaryal/anjit-tattoo/app/components/LayoutWrapper.tsx
'use client';

import { usePathname } from 'next/navigation';
import { Navbar } from './Navbar';
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