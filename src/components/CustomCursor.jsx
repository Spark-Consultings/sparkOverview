import React, { useState, useEffect } from 'react';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let lastTime = performance.now();

    const mouseMove = (e) => {
      requestAnimationFrame(() => {
        const currentTime = performance.now();
        const deltaTime = currentTime - lastTime;
        const newPosition = { x: e.clientX, y: e.clientY };
        
        // Calculate velocity
        if (deltaTime > 0) {
          const newVelocity = {
            x: (newPosition.x - lastPosition.x) / deltaTime,
            y: (newPosition.y - lastPosition.y) / deltaTime
          };
          setVelocity(newVelocity);
        }

        setLastPosition(newPosition);
        setMousePosition(newPosition);
        lastTime = currentTime;

        const hoveredElement = document.elementFromPoint(e.clientX, e.clientY);
        setIsPointer(hoveredElement ? window.getComputedStyle(hoveredElement).cursor === 'pointer' : false);
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

  // Calculate trail effect based on velocity
  const getTrailStyle = () => {
    const speed = Math.sqrt(velocity.x ** 2 + velocity.y ** 2);
    const maxTrailLength = 32;
    const trailLength = Math.min(speed * 2, maxTrailLength);
    const angle = Math.atan2(velocity.y, velocity.x);
    
    return {
      width: `${trailLength}px`,
      transform: `translate(${mousePosition.x - trailLength/2}px, ${mousePosition.y}px) rotate(${angle}rad)`,
      opacity: Math.min(speed / 10, 0.5)
    };
  };

  return (
    <>
      {/* Velocity-based trail effect */}
      <div
        className="fixed top-0 left-0 h-0.5 bg-orange-500/30 pointer-events-none z-50 transition-all duration-100"
        style={getTrailStyle()}
      />

      {/* Main cursor dot */}
      <div
        className={`fixed top-0 left-0 w-4 h-4 rounded-full bg-gradient-to-r from-orange-500 to-red-500 
          pointer-events-none z-50 transition-all duration-100 ease-out
          ${isClicking ? 'scale-75' : isPointer ? 'scale-150' : 'scale-100'}
        `}
        style={{
          transform: `translate(${mousePosition.x - 8}px, ${mousePosition.y - 8}px)`,
          boxShadow: '0 0 10px rgba(249, 115, 22, 0.5)'
        }}
      />

      {/* Outer ring with dynamic effects */}
      <div
        className={`fixed top-0 left-0 w-8 h-8 rounded-full border border-orange-500/50 
          pointer-events-none z-50 transition-all duration-150 ease-out
          ${isClicking ? 'scale-90' : isPointer ? 'scale-150' : 'scale-100'}
        `}
        style={{
          transform: `translate(${mousePosition.x - 16}px, ${mousePosition.y - 16}px)`,
          boxShadow: isPointer ? '0 0 15px rgba(249, 115, 22, 0.3)' : 'none'
        }}
      />

      {/* Interactive pulse effect */}
      {isPointer && (
        <div
          className="fixed top-0 left-0 w-12 h-12 rounded-full border-2 border-orange-500/30 
            pointer-events-none z-50 animate-ping"
          style={{
            transform: `translate(${mousePosition.x - 24}px, ${mousePosition.y - 24}px)`
          }}
        />
      )}
    </>
  );
};

export default CustomCursor;