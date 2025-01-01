import React from 'react';

const FuturisticLoader = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-[#1a1f2e]">
      <div className="relative">
        {/* Outer glow effect */}
        <div className="absolute inset-0 blur-2xl bg-orange-500/20" />
        
        <svg 
          width="120" 
          height="120" 
          viewBox="0 0 120 120" 
          className="relative"
        >
          <defs>
            {/* Gradient definition */}
            <linearGradient id="glowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" className="text-orange-500">
                <animate
                  attributeName="stop-color"
                  values="#f97316;#ea580c;#f97316"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </stop>
              <stop offset="100%" className="text-orange-600">
                <animate
                  attributeName="stop-color"
                  values="#ea580c;#f97316;#ea580c"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </stop>
            </linearGradient>
            
            {/* Glow filter */}
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Main circle */}
          <circle 
            cx="60" 
            cy="60" 
            r="50"
            className="fill-none stroke-orange-500/10" 
            strokeWidth="2"
          />

          {/* Rotating segments */}
          <g className="origin-center animate-[spin_4s_linear_infinite]">
            {[...Array(3)].map((_, i) => (
              <circle
                key={i}
                cx="60"
                cy="60"
                r="50"
                className="fill-none"
                stroke="url(#glowGradient)"
                strokeWidth="3"
                strokeDasharray="35,269"
                transform={`rotate(${i * 120} 60 60)`}
                filter="url(#glow)"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from="304"
                  to="0"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </circle>
            ))}
          </g>

          {/* Inner rotating ring */}
          <circle
            cx="60"
            cy="60"
            r="35"
            className="fill-none"
            stroke="url(#glowGradient)"
            strokeWidth="1"
            filter="url(#glow)"
            opacity="0.5"
          >
            <animate
              attributeName="stroke-dasharray"
              values="0,220;220,0;0,220"
              dur="3s"
              repeatCount="indefinite"
            />
          </circle>

          {/* Loading text */}
          <text
            x="60"
            y="63"
            className="text-xs fill-orange-500 font-light tracking-widest"
            textAnchor="middle"
            filter="url(#glow)"
          >
            LOADING
            <animate
              attributeName="opacity"
              values="0.4;1;0.4"
              dur="2s"
              repeatCount="indefinite"
            />
          </text>
        </svg>
      </div>
    </div>
  );
};

export default FuturisticLoader;