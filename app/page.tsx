'use client';
import  Link  from 'next/link';
import { ArrowRight, Star } from 'lucide-react';
import { useStore } from './context/StoreContext';
import { BookingForm } from './components/BookingForm';

export default function Page() {
  const { designs } = useStore();
  const featuredDesigns = designs.slice(0, 3);

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://a.storyblok.com/f/197805/5145e1ea3c/inspirational_tattoo_design_ideas_main_image.jpg/m/727x0/filters:format(jpeg):quality(75)" 
            alt="Tattoo Artist Working" 
            className="w-full h-full object-cover opacity-30 "
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-black/60"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
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

      {/* Featured Works */}
      <section className="py-24 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-display font-bold text-white mb-2">Featured Work</h2>
              <p className="text-gray-400">Selected masterpieces from our studio</p>
            </div>
            <Link href="/gallery" className="hidden md:flex items-center gap-2 text-white hover:text-gray-300 transition group">
              View All <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredDesigns.map((design) => (
              <div key={design.id} className="group relative overflow-hidden rounded-lg aspect-[4/5] bg-neutral-900">
                <img 
                  src={design.imageUrl} 
                  alt={design.title} 
                  className="w-full h-full object-cover transition duration-700 group-hover:scale-110 "
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{design.category}</span>
                  <h3 className="text-xl font-display font-bold text-white">{design.title}</h3>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center md:hidden">
            <Link href="/gallery" className="inline-flex items-center gap-2 text-white hover:text-gray-300 transition">
              View All Works <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA / Booking Section */}
      <section className="py-24 bg-neutral-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
               <div className="inline-block p-2 bg-white/5 rounded-lg mb-6">
                 <Star className="text-yellow-500 fill-yellow-500" size={24} />
               </div>
               <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
                 Ready for your next piece?
               </h2>
               <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                 Whether you have a specific design in mind or need a consultation to bring your vague ideas to life, Anjit is here to help. We prioritize safety, comfort, and artistic excellence.
               </p>
               <ul className="space-y-4 mb-8">
                 {['Sterile Environment', 'Custom Artworks', 'Free Consultation', 'Aftercare Support'].map((item) => (
                   <li key={item} className="flex items-center gap-3 text-gray-300">
                     <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                     {item}
                   </li>
                 ))}
               </ul>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-500 opacity-20 blur-xl rounded-xl"></div>
              <BookingForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}