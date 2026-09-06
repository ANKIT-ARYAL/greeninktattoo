// app/layout.tsx
import "./globals.css";
import localFont from 'next/font/local';
import { LayoutWrapper } from "./components/LayoutWrapper";
import { Geist, Cinzel, Black_Ops_One, Bebas_Neue } from "next/font/google"; // Import the font
import { GoogleTagManager } from "@next/third-parties/google";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

// Initialize the Black Ops One font
const blackOps = Bebas_Neue({ 
  subsets: ['latin'], 
  weight: '400',
  variable: '--font-Bebas_Neue' 
});

const blackOps1 = Black_Ops_One({ 
  subsets: ['latin'], 
  weight: '400',
  variable: '--font-Black_Ops_One' 
});

const customFont = Cinzel({
  subsets: ['latin'], 
  weight: '400',
  variable: '--font-Cinzel' 
})

const customHeaderFont = localFont({
  src: './fonts/SixCaps-Regular.ttf',
  variable: '--font-header',
  display: 'swap',
});

const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

export const metadata = {
  title: 'Green Ink Tattoo - Kathmandu\'s Premier Tattoo Studio',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // Apply the new variable to the html class list
    <html lang="en" className={cn(customHeaderFont.variable, "font-sans", geist.variable, blackOps.variable, blackOps1.variable, customFont.variable)}>
      <meta name="google-site-verification" content="IpJR-Mzjo0nVQZg_ivEJ7_ZoFD35WljOwqZhGZiMKc0" />
      <body className="bg-black text-white">
        {gtmId ? <GoogleTagManager gtmId={gtmId} /> : null}
        <div className="fixed inset-0 -z-50 bg-[#050505]">
          <div className="absolute inset-0 bg-[url('/hero.jpg')] bg-cover bg-center opacity-10" />
        </div>        
        <main className="relative z-10 w-full">
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </main>        
      </body>
    </html>
  );
}