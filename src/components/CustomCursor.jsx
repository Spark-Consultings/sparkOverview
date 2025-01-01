import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const EnhancedCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorState, setCursorState] = useState({
    isPointer: false,
    isClicking: false,
    isHidden: false,
    lastActivity: Date.now()
  });

  useEffect(() => {
    let rafId;
    let hideTimeout;

    const mouseMove = (e) => {
      rafId = requestAnimationFrame(() => {
        setMousePosition({ x: e.clientX, y: e.clientY });
        const hoveredElement = document.elementFromPoint(e.clientX, e.clientY);
        setCursorState(prev => ({
          ...prev,
          isPointer: hoveredElement ? window.getComputedStyle(hoveredElement).cursor === 'pointer' : false,
          isHidden: false,
          lastActivity: Date.now()
        }));
      });
      
      // Reset hide timeout
      clearTimeout(hideTimeout);
      hideTimeout = setTimeout(() => {
        setCursorState(prev => ({ ...prev, isHidden: true }));
      }, 3000);
    };

    const mouseDown = () => {
      setCursorState(prev => ({ ...prev, isClicking: true }));
    };

    const mouseUp = () => {
      setCursorState(prev => ({ ...prev, isClicking: false }));
    };

    const mouseLeave = () => {
      setCursorState(prev => ({ ...prev, isHidden: true }));
    };

    const mouseEnter = () => {
      setCursorState(prev => ({ ...prev, isHidden: false }));
    };

    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('mousedown', mouseDown);
    window.addEventListener('mouseup', mouseUp);
    window.addEventListener('mouseleave', mouseLeave);
    window.addEventListener('mouseenter', mouseEnter);

    return () => {
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('mousedown', mouseDown);
      window.removeEventListener('mouseup', mouseUp);
      window.removeEventListener('mouseleave', mouseLeave);
      window.removeEventListener('mouseenter', mouseEnter);
      clearTimeout(hideTimeout);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const cursorVariants = {
    default: {
      scale: 1,
      opacity: cursorState.isHidden ? 0 : 1,
      transition: { duration: 0.2 }
    },
    pointer: {
      scale: 1.2,
      opacity: cursorState.isHidden ? 0 : 1,
      transition: { duration: 0.2 }
    },
    clicking: {
      scale: 0.8,
      opacity: cursorState.isHidden ? 0 : 1,
      transition: { duration: 0.1 }
    }
  };

  const ringVariants = {
    default: {
      scale: 1,
      opacity: cursorState.isHidden ? 0 : 0.5,
      transition: { duration: 0.3 }
    },
    pointer: {
      scale: 1.5,
      opacity: cursorState.isHidden ? 0 : 0.7,
      transition: { duration: 0.3 }
    },
    clicking: {
      scale: 0.9,
      opacity: cursorState.isHidden ? 0 : 0.8,
      transition: { duration: 0.1 }
    }
  };

  return (
    <>
      {/* Traînée du curseur */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="fixed top-0 left-0 w-4 h-4 rounded-full bg-gradient-to-r from-orange-500/30 to-red-500/30 pointer-events-none z-40 mix-blend-screen"
          style={{
            x: mousePosition.x - 8,
            y: mousePosition.y - 8,
          }}
          transition={{
            type: "tween",
            duration: 0.2 + (i * 0.1),
            ease: "linear"
          }}
        />
      ))}

      {/* Curseur principal */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50"
        style={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
        }}
        variants={cursorVariants}
        animate={cursorState.isClicking ? "clicking" : (cursorState.isPointer ? "pointer" : "default")}
      >
        <div className="w-4 h-4 rounded-full bg-gradient-to-r from-orange-500 to-red-500">
          <div className="w-full h-full rounded-full bg-white mix-blend-overlay opacity-50 animate-pulse" />
        </div>
      </motion.div>

      {/* Anneau extérieur */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50"
        style={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
        }}
        variants={ringVariants}
        animate={cursorState.isClicking ? "clicking" : (cursorState.isPointer ? "pointer" : "default")}
      >
        <div className="w-8 h-8 rounded-full border-2 border-orange-500">
          <div className="w-full h-full rounded-full border border-red-500 animate-ping opacity-50" />
        </div>
      </motion.div>
    </>
  );
};

export default EnhancedCursor;