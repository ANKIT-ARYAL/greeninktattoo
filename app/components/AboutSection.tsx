'use client';
import { motion } from 'framer-motion';

export default function AboutSection() {
  return (
    <section className=" text-white py-24 px-8 md:px-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left: Portrait & Name */}
        <div className="lg:col-span-4 relative">
          <div className="w-full aspect-[3/4] rounded-2xl overflow-hidden bg-neutral-900">
            {/* Replace with your portrait image */}
            <img src="/sanjay-portrait.jpg" className="w-full h-full object-cover object-bottom" alt="Sanjay" />
          </div>
          <h2 className="text-7xl font-pirata mt-6 tracking-wider">Sanjay Balami</h2>
        </div>

        {/* Right: Content & Experience */}
        <div className="lg:col-span-8 flex flex-col gap-12">
          <h3 className="text-5xl font-allura uppercase tracking-wider">Meet The Artist</h3>
          
          <div className="space-y-8">
            {[
              {
                text: "Before tattooing, I filled sketchbooks with bold, abstract designs. Black ink felt powerful and timeless. My love for drawing evolved into an obsession with skin as a living canvas."
              },
              {
                text: "Tattooing is more than just skill; it requires discipline. I spent years honing clean lines and bold contrasts. In blackwork, every line has intention, making each piece unforgettable."
              },
              {
                text: "Now, I work from my private home studio, a space designed for focus and creativity. Here, clients feel comfortable and engaged in the process, ensuring every piece is meant to last a lifetime."
              }
            ].map((item, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.2 }}
                className="flex gap-4 items-start"
              >
                <span className="text-gray-400 text-2xl mt-1">✦</span>
                <p className="text-neutral-400 text-lg leading-relaxed max-w-2xl">{item.text}</p>
              </motion.div>
            ))}
          </div>

          {/* Secondary Image & Experience Badge */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden h-[300px] w-full">
              <img src="/studio-work.jpg" className="w-full h-full object-cover" alt="Studio work" />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white text-black p-6 rounded-2xl font-black text-center shadow-2xl">
              <span className="text-4xl block">10+</span>
              <span className="text-[10px] uppercase tracking-widest">Years of Experience</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}