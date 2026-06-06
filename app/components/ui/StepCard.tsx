// components/ui/StepCard.tsx
import BackgroundGradient from "./background-gradient";

export const StepCard = ({ number, title, desc }: { number: string, title: string, desc: string }) => (
  <div className="relative w-[340px] p-8 rounded-2xl bg-[#d1d5db] border-t border-white/20 shadow-xl overflow-hidden">
    <BackgroundGradient />
    {/* Red Pin */}
    <div className="absolute -top-3 -right-3 w-6 h-6 bg-red-600 rounded-full shadow-[0_0_10px_rgba(220,38,38,0.5)] z-20" />
    <div className="relative z-10">
      <span className="text-4xl font-light text-black/30">{number}</span>
      <h3 className="text-xl font-bold mt-2 mb-4 text-black">{title}</h3>
      <p className="text-black/70 text-sm leading-relaxed">{desc}</p>
    </div>
  </div>
);