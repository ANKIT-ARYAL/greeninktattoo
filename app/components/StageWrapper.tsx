'use client';
import { motion } from 'framer-motion';

export default function StageWrapper({ children }: { children: React.ReactNode }) {
  // REMOVE useScroll and useTransform. 
  // Tilting the entire page is killing your scroll UX.
  return (
    <div className="w-full h-full">
      {children}
    </div>
  );
}