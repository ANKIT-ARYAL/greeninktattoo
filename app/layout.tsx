// app/layout.tsx
import "./globals.css";
import localFont from 'next/font/local';
import { LayoutWrapper } from "./components/LayoutWrapper";

const customHeaderFont = localFont({
  src: './fonts/SixCaps-Regular.ttf',
  variable: '--font-header',
  display: 'swap',
});

// app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${customHeaderFont.variable}`}>
      <body className="bg-black text-white">
        
        {/* Global Background Layer - The ONLY place this should exist */}
        <div className="fixed inset-0 -z-50 bg-[#050505]">
          <div className="absolute inset-0 bg-[url('/hero.jpg')] bg-cover bg-center opacity-10" />
        </div>        

        {/* Page Content */}
        <main className="relative z-10 w-full">
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </main>        
      </body>
    </html>
  );
}