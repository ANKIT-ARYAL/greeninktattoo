import Link from 'next/link'
import Image from 'next/image';
export default function Hero() {
  return (
    <div>
            <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 w-full min-h-screen">
          <Image 
            src="/herobg.jpg" 
            alt="Tattoo Artist Working"             
            className="w-full h-full object-cover opacity-30 blur-xs"
            fill
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-black/60"></div>
        </div>

        <div className="relative z-10 text-center px-4 mt-32 max-w-4xl mx-auto">
          <h2 className="text-sm md:text-base font-bold tracking-[0.2em] text-gray-400 uppercase mb-4 animate-fade-in-up">
            Thamel, Kathmandu
          </h2>
          <h1 className="text-5xl md:text-8xl font-display font-bold uppercase tracking-tighter mb-6 text-white leading-none">
            Ink That <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Endures</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light">
            Anjit Tattoo brings world-class artistry to Nepal. Custom designs, impeccable hygiene, and a passion for storytelling through skin.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact" 
              className="px-8 py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-gray-200 transition duration-300 rounded-sm"
            >
              Book Appointment
            </Link>
            <Link 
              href="/gallery" 
              className="px-8 py-4 bg-transparent border border-white text-white font-bold uppercase tracking-widest hover:bg-white hover:text-black transition duration-300 rounded-sm"
            >
              View Gallery
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
