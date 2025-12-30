import { BookingForm } from "./BookingForm";

// Inside your BookingSection component
export default function BookingSection() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="relative z-10 sm:px-4 md:px-20">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 space-y-6">
            <h2 className="text-5xl font-display font-bold italic uppercase tracking-tighter">
              Secure your <span className="text-emerald-500">Session</span>
            </h2>
            <p className="text-neutral-400 text-lg">
              Whether it's your first ink or a full sleeve, let's create something that lasts forever.
            </p>
          </div>
          
          <div className="flex-1 w-full max-w-xl">
             <BookingForm />
          </div>
        </div>
      </div>
    </section>
  );
}