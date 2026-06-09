'use client';
import { StepCard } from "./ui/StepCard";

const steps = [
  { id: "01", title: "Share Your Idea", desc: "It all starts with a conversation. We'll sit down - in person or virtually - to talk about your vision, placement, and style preferences. Whether you have a clear concept or just a feeling, I'll help refine it into something that works perfectly for your skin and body." },
  { id: "02", title: "Bringing It to Paper", desc: "Once I understand your vision, I create a one-of-a-kind design tailored to you. This stage is about precision - clean composition, bold contrast, and a layout that flows naturally with your body. For flash tattoos, you'll simply choose a design from my curated flash book." },
  { id: "03", title: "The Tattoo Session", desc: "On the day of your appointment, we'll confirm placement and walk through the process before the needle ever touches skin. My focus is on clean, steady work with minimal discomfort. You'll leave with a bold, striking piece of blackwork designed to last a lifetime." },
  { id: "04", title: "Keeping It Sharp", desc: "Your tattoo is only as good as its healing process. I'll provide clear aftercare instructions to ensure the design heals cleanly and stays bold for years to come. From touch-ups to long-term care, I'm here to make sure your piece looks as good on day 1,000 as it did on day 1." }
];

export default function ProcessSection() {
  return (
    <section className="py-20 relative">
      <div className="max-w-6xl mx-auto px-8 relative">

        {/* SVG stays untouched */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 1000 1600">
          <path
            d="M 850 150 Q 200 350 200 650 T 850 1000 T 200 1350"
            stroke="#dc2626"
            strokeWidth="2"
            fill="none"
          />
        </svg>

        {/* Header */}
        <div className="relative md:absolute top-0 left-0 md:left-8 w-full md:w-[300px] z-10 mb-8">
          <div className="md:sticky top-20">
            <h2 className="text-5xl md:text-7xl font-blackops uppercase text-white mb-6">
              From<br />Idea To Ink
            </h2>

            <p className="text-white/60 max-w-sm font-allura leading-relaxed">
              Here’s how we bring your tattoo to life, guiding you through every step of the process from start to finish.
            </p>
          </div>
        </div>

        {/* Zig-zag layout (your actual request) */}
        <div className="flex flex-col gap-10 md:gap-14">

          {/* 1 - right */}
          <div className="w-full flex justify-end md:pr-12">
            <StepCard number={steps[0].id} title={steps[0].title} desc={steps[0].desc} />
          </div>

          {/* 2 - left */}
          <div className="w-full flex justify-start md:pl-12">
            <StepCard number={steps[1].id} title={steps[1].title} desc={steps[1].desc} />
          </div>

          {/* 3 - right */}
          <div className="w-full flex justify-end md:pr-12">
            <StepCard number={steps[2].id} title={steps[2].title} desc={steps[2].desc} />
          </div>

          {/* 4 - left */}
          <div className="w-full flex justify-start md:pl-12">
            <StepCard number={steps[3].id} title={steps[3].title} desc={steps[3].desc} />
          </div>

        </div>

      </div>
    </section>
  );
}