// /Users/ankitaryal/green-ink-tattoo/app/page.tsx
import { prisma } from '@/lib/prisma';
import Hero from './components/Hero';
import BookingSection from './components/BookingSection';
import AboutSection from './components/AboutSection';
import OnTheBoard from './components/OnTheBoard';
import Faqs from './components/Faqs';
import StageWrapper from './components/StageWrapper';
import ProcessSection from './components/ProcessSection';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Page() {
  
  
  // Fetch only featured work for the homepage board slider
  const allWorks = await prisma.tattooDesign.findMany({
    where: { isFeatured: true },
    orderBy: { createdAt: 'desc' },
    take: 11,
  });

  return (
    <main className="relative min-h-screen w-full">
      <StageWrapper>
        <Hero />
        <AboutSection />
        <OnTheBoard works={allWorks} />
        <ProcessSection />
        <Faqs />                
        <BookingSection />        
      </StageWrapper>
    </main>
  );
}