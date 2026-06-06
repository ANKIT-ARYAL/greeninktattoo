'use client';
import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function BlogCard3D({ children }: { children: React.ReactNode }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Tilt constraints
  const rotateX = useTransform(y, [-300, 300], [10, -10]);
  const rotateY = useTransform(x, [-300, 300], [-10, 10]);

  const springConfig = { damping: 20, stiffness: 150 };
  const smoothRotateX = useSpring(rotateX, springConfig);
  const smoothRotateY = useSpring(rotateY, springConfig);

  return (
    <motion.div
      className="w-full h-full [transform-style:preserve-3d]"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - rect.left - rect.width / 2);
        y.set(e.clientY - rect.top - rect.height / 2);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{
        rotateX: smoothRotateX,
        rotateY: smoothRotateY,
        willChange: 'transform', // Performance boost
      }}
    >
      {/* Container with depth */}
      <div className="w-full h-full [transform:translateZ(50px)]">
        {children}
      </div>
    </motion.div>
  );
}