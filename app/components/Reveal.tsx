'use client';
import { motion } from 'framer-motion';

interface RevealProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  delay?: number;
  duration?: number;
  className?: string;
}

export default function Reveal({ 
  children, 
  direction = 'up', 
  delay = 0, 
  duration = 0.5,
  className = "" 
}: RevealProps) {
  
  return (
    <motion.div
      className={className}
      initial={{ 
        opacity: 0, 
        y: direction === 'up' ? 30 : direction === 'down' ? -30 : 0,
        x: direction === 'left' ? 30 : direction === 'right' ? -30 : 0,
        scale: direction === 'none' ? 0.95 : 1
      }}
      whileInView={{ 
        opacity: 1, 
        y: 0, 
        x: 0,
        scale: 1
      }}
      // margin: "200px" triggers the animation way before the element hits the screen
      viewport={{ once: true, margin: "0px 0px 200px 0px" }}
      transition={{ 
        duration: duration, 
        delay: delay, 
        ease: [0.25, 1, 0.5, 1] 
      }}
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </motion.div>
  );
}