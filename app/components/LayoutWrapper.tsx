// /Users/ankitaryal/anjit-tattoo/app/components/LayoutWrapper.tsx
'use client';

import { usePathname } from 'next/navigation';
import  Navbar  from './Navbar';
import { Footer } from './Footer';


// LayoutWrapper.tsx
export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  const isAdminPath = pathname?.startsWith('/admin');
  // Define routes that manage their own navbar
  const isCustomNavbarPage = pathname === '/about'; 

  if (isAdminPath) {
    return <main className="relative min-h-screen w-full">{children}</main>;
  }

  return (
    <>
      {/* Only show global navbar if it's not a custom page */}
      {!isCustomNavbarPage && <Navbar />}
      
      <main className="relative min-h-screen w-full overflow-x-hidden">        
        {children}
      </main>
      <Footer />
    </>
  );
}

 