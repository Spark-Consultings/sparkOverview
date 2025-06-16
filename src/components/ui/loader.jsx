import React from 'react';

const FuturisticLoader = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-950">
      <div className="relative">
        {/* Cercle principal avec animation de pulsation */}
        <div className="w-16 h-16 rounded-full border-2 border-orange-500/20 animate-pulse" />
        
        {/* Cercle rotatif */}
        <div className="absolute inset-0">
          <svg className="w-16 h-16 animate-spin" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
              strokeDasharray="80"
              strokeDashoffset="20"
            />
          </svg>
        </div>

        {/* Point central */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
        </div>
      </div>
    </div>
  );
};

export default FuturisticLoader;