'use client';
import { motion } from 'framer-motion';

const steps = [
  { id: "01", title: "Share Your Idea", desc: "It all starts with a conversation. We'll sit down - in person or virtually - to talk about your vision, placement, and style preferences." },
  { id: "02", title: "Bringing It to Paper", desc: "Once I understand your vision, I create a one-of-a-kind design tailored to you. This stage is about precision - clean composition, bold contrast." },
  { id: "03", title: "The Tattoo Session", desc: "On the day of your appointment, we'll confirm placement and walk through the process before the needle ever touches skin." },
  { id: "04", title: "Keeping It Sharp", desc: "Your tattoo is only as good as its healing process. I'll provide clear aftercare instructions to ensure the design heals cleanly." }
];

export default function ProcessSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-8">
        {/* Header */}
        <div className="mb-20">
          <h2 className="text-7xl font-header uppercase text-white mb-6">From Idea To Ink</h2>
          <p className="text-white/60 max-w-md">Here’s how we bring your tattoo to life, guiding you through every step of the process.</p>
        </div>

        {/* Steps Grid */}
        <div className="relative">
          {steps.map((step, i) => (
            <motion.div 
              key={step.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              className={`relative flex items-start gap-8 mb-20 ${i % 2 !== 0 ? 'flex-row-reverse' : ''}`}
            >
              {/* Card */}
              <div className="w-full md:w-1/2 bg-white p-8 rounded-lg shadow-2xl relative">
                {/* Pin Icon */}
                <div className="absolute -top-3 -right-3 w-6 h-6 bg-red-600 rounded-full shadow-lg" />
                <span className="text-4xl font-header text-black/40">{step.id}</span>
                <h3 className="text-2xl font-bold mt-2 mb-4 text-black">{step.title}</h3>
                <p className="text-black/80 text-sm leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}