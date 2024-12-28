import React from 'react';

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-[#1a1f2e]">
      <div className="relative">
        {/* Outer glow effect */}
        <div className="absolute inset-0 blur-xl bg-[#ff5722] opacity-20 animate-pulse" />
        
        <svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
          {/* Background circle */}
          <circle 
            cx="60" 
            cy="60" 
            r="54" 
            fill="none" 
            stroke="#2a3142" 
            strokeWidth="2"
          />
          
          {/* Rotating outer ring */}
          <circle 
            cx="60" 
            cy="60" 
            r="54" 
            fill="none" 
            stroke="#ff5722" 
            strokeWidth="4"
            strokeDasharray="339.292"
            strokeDashoffset="339.292"
            className="origin-center animate-[spin_3s_linear_infinite]"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="339.292"
              to="0"
              dur="2s"
              repeatCount="indefinite"
            />
          </circle>

          {/* Inner sparkle effect */}
          <g className="origin-center animate-[spin_2s_linear_infinite]">
            <path 
              d="M60 20L63 32L60 44L57 32z" 
              fill="#ff5722"
            >
              <animate
                attributeName="opacity"
                values="1;0.3;1"
                dur="2s"
                repeatCount="indefinite"
              />
            </path>
            <path 
              d="M60 76L63 88L60 100L57 88z" 
              fill="#ff5722"
            >
              <animate
                attributeName="opacity"
                values="0.3;1;0.3"
                dur="2s"
                repeatCount="indefinite"
              />
            </path>
            <path 
              d="M20 60L32 63L44 60L32 57z" 
              fill="#ff5722"
            >
              <animate
                attributeName="opacity"
                values="0.3;1;0.3"
                dur="2s"
                repeatCount="indefinite"
              />
            </path>
            <path 
              d="M76 60L88 63L100 60L88 57z" 
              fill="#ff5722"
            >
              <animate
                attributeName="opacity"
                values="1;0.3;1"
                dur="2s"
                repeatCount="indefinite"
              />
            </path>
          </g>

          {/* Central spark icon */}
          <path 
            d="M60 45L67 55H53L60 45Z" 
            fill="#ff5722"
            className="origin-center"
          >
            <animate
              attributeName="opacity"
              values="1;0.5;1"
              dur="1.5s"
              repeatCount="indefinite"
            />
          </path>
          
          {/* Loading text */}
          <text 
            x="60" 
            y="70" 
            textAnchor="middle" 
            className="text-xs" 
            fill="#6b7280"
          >
          </text>
        </svg>
      </div>
    </div>
  );
};

export default Loader;