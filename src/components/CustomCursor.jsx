import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const mouseMove = (e) => {
      // Utilisation de requestAnimationFrame pour optimiser les performances
      requestAnimationFrame(() => {
        setMousePosition({ x: e.clientX, y: e.clientY });
        const hoveredElement = document.elementFromPoint(e.clientX, e.clientY);
        setIsPointer(hoveredElement ? window.getComputedStyle(hoveredElement).cursor === 'pointer' : false);
      });
    };

    window.addEventListener('mousemove', mouseMove);
    return () => window.removeEventListener('mousemove', mouseMove);
  }, []);

  return (
    <>
      {/* Cursor principal optimisé */}
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 rounded-full bg-gradient-to-r from-orange-500 to-red-500 pointer-events-none z-50"
        style={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
          scale: isPointer ? 1.5 : 1,
        }}
        transition={{
          type: "tween",
          duration: 0.1
        }}
      />

      {/* Anneau extérieur simplifié */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-orange-500/50 pointer-events-none z-50"
        style={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isPointer ? 1.5 : 1,
        }}
        transition={{
          type: "tween",
          duration: 0.15
        }}
      />
    </>
  );
};

export default CustomCursor;