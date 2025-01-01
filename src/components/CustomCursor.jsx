import React, { useState, useEffect } from 'react';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Check if the device is mobile or tablet
    const isMobileOrTablet = () => {
      const ua = navigator.userAgent;
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
    };

    // If it's a mobile or tablet device, don't set up any listeners
    if (isMobileOrTablet()) return;

    let lastTime = performance.now();

    const mouseMove = (e: MouseEvent) => {
      requestAnimationFrame(() => {
        const currentTime = performance.now();
        const deltaTime = currentTime - lastTime;
        const newPosition = { x: e.clientX, y: e.clientY };

        // Calculate velocity
        if (deltaTime > 0) {
          const newVelocity = {
            x: (newPosition.x - lastPosition.x) / deltaTime,
            y: (newPosition.y - lastPosition.y) / deltaTime,
          };
          setVelocity(newVelocity);
        }

        setLastPosition(newPosition);
        setMousePosition(newPosition);
        lastTime = currentTime;

        const hoveredElement = document.elementFromPoint(e.clientX, e.clientY);
        setIsPointer(
          hoveredElement
            ? window.getComputedStyle(hoveredElement).cursor === 'pointer'
            : false
        );
      });
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [lastPosition]);

  // If it's a mobile or tablet device, don't render anything
  if (typeof window !== 'undefined' && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    return null;
  }

  const getTrailStyle = () => {
    const speed = Math.sqrt(velocity.x ** 2 + velocity.y ** 2); 
    const maxTrailLength = 32;
    const trailLength = Math.min(speed * 2, maxTrailLength);
    const angle = Math.atan2(velocity.y, velocity.x);

    return {
      width: `${trailLength}px`,
      transform: `translate(${mousePosition.x - trailLength / 2}px, ${mousePosition.y}px) rotate(${angle}rad)`,
      opacity: Math.min(speed / 10, 0.5),
    };
  };

  return (
    <>
      <div
        className="fixed top-0 left-0 h-0.5 bg-orange-500/30 pointer-events-none z-50 transition-all duration-100"
        style={getTrailStyle()}
      />
      <div
        className={`fixed top-0 left-0 w-4 h-4 rounded-full bg-gradient-to-r from-orange-500 to-red-500 
          pointer-events-none z-50 transition-all duration-100 ease-out
          ${isClicking ? 'scale-75' : isPointer ? 'scale-150' : 'scale-100'}
        `}
        style={{
          transform: `translate(${mousePosition.x - 8}px, ${mousePosition.y - 8}px)`,
          boxShadow: '0 0 10px rgba(249, 115, 22, 0.5)',
        }}
      />
      <div
        className={`fixed top-0 left-0 w-8 h-8 rounded-full border border-orange-500/50 
          pointer-events-none z-50 transition-all duration-150 ease-out
          ${isClicking ? 'scale-90' : isPointer ? 'scale-150' : 'scale-100'}
        `}
        style={{
          transform: `translate(${mousePosition.x - 16}px, ${mousePosition.y - 16}px)`,
          boxShadow: isPointer
            ? '0 0 15px rgba(249, 115, 22, 0.3)'
            : 'none',
        }}
      />
      {isPointer && (
        <div
          className="fixed top-0 left-0 w-12 h-12 rounded-full border-2 border-orange-500/30 
            pointer-events-none z-50 animate-ping"
          style={{
            transform: `translate(${mousePosition.x - 24}px, ${mousePosition.y - 24}px)`,
          }}
        />
      )}
    </>
  );
};

export default CustomCursor;

