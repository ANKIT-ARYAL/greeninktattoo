export default function BackgroundGradient() {
  return (
    // Changed to absolute to fit inside the parent container
    // Added overflow-hidden so the gradient doesn't bleed out of the card
    <div className="absolute inset-0 overflow-hidden rounded-lg">
      <div className="absolute inset-0 bg-[radial-gradient(circle_600px_at_30%_20px,#fde04740,transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_600px_at_70%_200px,#f9731640,transparent)]" />
    </div>
  );
}