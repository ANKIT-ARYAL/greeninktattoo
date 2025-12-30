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