// app/layout.tsx
import "./globals.css";
import localFont from 'next/font/local';
import { LayoutWrapper } from "./components/LayoutWrapper";
import { Geist, Pirata_One, Cinzel, Black_Ops_One } from "next/font/google"; // Import the font
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

// Initialize the Black Ops One font
const blackOps = Pirata_One({ 
  subsets: ['latin'], 
  weight: '400',
  variable: '--font-Pirata_One' 
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

export const metadata = {
  title: 'Green Ink Tattoo - Kathmandu\'s Premier Tattoo Studio',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // Apply the new variable to the html class list
    <html lang="en" className={cn(customHeaderFont.variable, "font-sans", geist.variable, blackOps.variable, blackOps1.variable, customFont.variable)}>
      <body className="bg-black text-white">
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