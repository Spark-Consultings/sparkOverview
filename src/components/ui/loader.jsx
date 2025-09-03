import React from 'react';

const EnhancedFuturisticLoader = () => {
  // Générer les positions et styles des particules une seule fois pour éviter le recalcul à chaque render
  const particles = React.useMemo(() => (
    [...Array(30)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 3}s`,
      animationDuration: `${2 + Math.random() * 2}s`,
      size: Math.random() > 0.5 ? 'w-1.5 h-1.5' : 'w-1 h-1',
      opacity: Math.random() > 0.5 ? 'bg-orange-400/30' : 'bg-orange-400/20',
    }))
  ), []);

  return (
    <div className="flex items-center justify-center min-h-screen h-dvh bg-gradient-to-br from-gray-950 via-gray-900 to-black overflow-hidden relative">
      {/* Particules d'arrière-plan améliorées et responsives */}
      <div className="absolute inset-0 pointer-events-none select-none">
        {particles.map((p, i) => (
          <div
            key={i}
            className={`absolute rounded-full animate-pulse ${p.size} ${p.opacity}`}
            style={{
              left: p.left,
              top: p.top,
              animationDelay: p.animationDelay,
              animationDuration: p.animationDuration,
            }}
          />
        ))}
      </div>

      <div className="relative flex flex-col items-center justify-center">
        {/* Logo principal responsive */}
        <div className="relative">
          <img
            src="https://www.sparkline.sn/static/media/logo.26e5a02177f92c4ebf72.png"
            alt="Logo"
            className="w-40 h-40 sm:w-60 sm:h-60 md:w-80 md:h-80 lg:w-96 lg:h-96 object-contain animate-pulse drop-shadow-2xl"
            style={{
              animationDuration: '3s',
              filter: 'drop-shadow(0 0 30px rgba(251, 146, 60, 0.6))',
            }}
          />
        </div>

        {/* Anneau rotatif autour du logo, visible uniquement sur md+ */}
        {/*
        <div className="absolute inset-0 -m-4 md:-m-8 hidden md:block">
          <svg className="w-64 h-64 md:w-[34rem] md:h-[34rem] animate-spin" viewBox="0 0 416 416" style={{ animationDuration: '4s' }}>
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
        </div>
        */}

        {/* Effet de respiration subtil, visible uniquement sur md+ */}
        {/*
        <div className="absolute inset-0 -m-6 md:-m-12 hidden md:block">
          <div className="w-48 h-48 md:w-[30rem] md:h-[30rem] rounded-full border border-orange-400/8 animate-ping"
               style={{ animationDuration: '3s' }} />
        </div>
        */}
      </div>
    </div>
  );
};

export default EnhancedFuturisticLoader;
