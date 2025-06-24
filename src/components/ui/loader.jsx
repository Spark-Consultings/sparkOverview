import React from 'react';

const EnhancedFuturisticLoader = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black overflow-hidden">
      {/* Particules d'arrière-plan améliorées */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-orange-400/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative">
        {/* Logo principal agrandi */}
        <div className="relative">
          <img 
            src="http://localhost:3000/static/media/logo.26e5a02177f92c4ebf72.png"
            alt="Logo"
            className="w-96 h-96 object-contain animate-pulse drop-shadow-2xl"
            style={{ 
              animationDuration: '3s',
              filter: 'drop-shadow(0 0 30px rgba(251, 146, 60, 0.6))'
            }}
          />
        </div>

        {/* Anneau rotatif autour du logo agrandi */}
        {/* <div className="absolute inset-0 -m-8">
          <svg className="w-[34rem] h-[34rem] animate-spin" viewBox="0 0 416 416" style={{ animationDuration: '4s' }}>
            <circle
              className="text-orange-400"
              cx="208"
              cy="208"
              r="200"
              stroke="currentColor"
              strokeWidth="1"
              fill="none"
              strokeDasharray="120 300"
              strokeLinecap="round"
              opacity="0.4"
            />
          </svg>
        </div> */}

        {/* Effet de respiration subtil agrandi */}
        {/* <div className="absolute inset-0 -m-12">
          <div className="w-[30rem] h-[30rem] rounded-full border border-orange-400/8 animate-ping" 
               style={{ animationDuration: '3s' }} />
        </div> */}
      </div>

    </div>
  );
};

export default EnhancedFuturisticLoader;