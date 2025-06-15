import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, Zap, Target } from 'lucide-react';

const SimpleProgress = () => {
  const [progress, setProgress] = useState(0);
  const [isActive, setIsActive] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(25);
      setIsActive(true);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-80 h-80 flex items-center justify-center">
      {/* Effet de pulsation subtile en arrière-plan */}
      <div 
        className="absolute w-72 h-72 rounded-full opacity-20 animate-pulse"
        style={{
          background: `radial-gradient(circle, rgba(255, 255, 255, 0.1), transparent 70%)`,
          animation: 'gentlePulse 3s ease-in-out infinite'
        }}
      />
      
      {/* Cercle principal blanc moderne sans ombre */}
      <div 
        className="relative w-64 h-64 rounded-full flex items-center justify-center transition-all duration-1000 ease-out"
        style={{
          background: `linear-gradient(135deg, 
            rgba(255, 255, 255, 0.95), 
            rgba(255, 255, 255, 0.85))`,
          border: '3px solid rgba(255, 255, 255, 0.6)',
          backdropFilter: 'blur(30px)',
          transform: isActive ? 'scale(1.02) rotate(0.5deg)' : 'scale(1) rotate(0deg)'
        }}
      >
        {/* Nombre central avec animation */}
        <div className="text-center relative">
          <div 
            className="text-7xl font-black text-transparent bg-clip-text transition-all duration-1000 ease-out"
            style={{
              backgroundImage: `linear-gradient(135deg, #FF7900, #FF4500, #E63946)`,
              filter: 'drop-shadow(0 4px 8px rgba(255, 121, 0, 0.3))',
              transform: isActive ? 'scale(1.1) translateY(-2px)' : 'scale(1) translateY(0px)',
              animation: isActive ? 'numberFloat 4s ease-in-out infinite' : 'none'
            }}
          >
            {progress}
          </div>
          <div 
            className="text-slate-600 font-semibold text-sm tracking-widest mt-2 transition-all duration-700"
            style={{
              opacity: isActive ? 1 : 0.5,
              transform: isActive ? 'translateY(0)' : 'translateY(10px)'
            }}
          >
            PROJETS RÉALISÉS
          </div>
        </div>
        
        {/* Ring de progression animé */}
        <div 
          className="absolute inset-3 rounded-full"
          style={{
            background: `conic-gradient(from 0deg, 
              rgba(255, 121, 0, 0.8) 0deg, 
              rgba(255, 121, 0, 0.6) 90deg, 
              transparent 90deg)`,
            mask: 'radial-gradient(circle at center, transparent 88px, black 90px, black 96px, transparent 98px)',
            WebkitMask: 'radial-gradient(circle at center, transparent 88px, black 90px, black 96px, transparent 98px)',
            opacity: isActive ? 1 : 0,
            transition: 'opacity 1.2s ease-in-out',
            animation: isActive ? 'rotateRing 8s linear infinite' : 'none'
          }}
        />
        
        {/* Points décoratifs */}
        <div 
          className="absolute top-4 right-8 w-2 h-2 bg-orange-400 rounded-full transition-all duration-1000"
          style={{
            opacity: isActive ? 1 : 0,
            animation: isActive ? 'twinkle 2s ease-in-out infinite' : 'none'
          }}
        />
        <div 
          className="absolute bottom-6 left-6 w-1.5 h-1.5 bg-red-400 rounded-full transition-all duration-1000"
          style={{
            opacity: isActive ? 1 : 0,
            animation: isActive ? 'twinkle 2.5s ease-in-out infinite 0.5s' : 'none'
          }}
        />
      </div>
    </div>
  );
};

const SimpleMetric = ({ icon: Icon, label, value, delay, color }) => (
  <div 
    className="group p-5 rounded-2xl backdrop-blur-2xl bg-white/40 border border-white/30 hover:border-white/50 hover:bg-white/50 transition-all duration-500 hover:scale-105 hover:-translate-y-2"
    style={{
      opacity: 0,
      transform: 'translateY(30px) scale(0.9)',
      animation: `slideInScale 0.8s ease-out ${delay}s forwards`,
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)'
    }}
  >
    <div className="flex items-center gap-4">
      <div 
        className="p-3 rounded-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
        style={{ 
          background: `linear-gradient(135deg, ${color}, ${color}dd)`,
          boxShadow: `0 4px 20px ${color}30`
        }}
      >
        <Icon size={20} className="text-white" />
      </div>
      <div>
        <div 
          className="text-slate-800 font-bold text-xl transition-all duration-300"
          style={{
            animation: 'countUp 0.6s ease-out forwards'
          }}
        >
          {value}
        </div>
        <div className="text-slate-600 text-sm font-medium">{label}</div>
      </div>
    </div>
  </div>
);

const PerformanceSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="min-h-screen flex items-center py-20 px-8 relative overflow-hidden">
      {/* Background moderne et doux */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 25% 20%, rgba(99, 102, 241, 0.12) 0%, transparent 50%),
            radial-gradient(ellipse at 75% 80%, rgba(236, 72, 153, 0.08) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, rgba(59, 130, 246, 0.06) 0%, transparent 70%),
            linear-gradient(135deg, 
              #18181b 0%, 
              #1e293b 100%,
          `
        }}
      />
      
      {/* Formes géométriques modernes flottantes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-1/4 left-1/4 w-32 h-32 rounded-3xl bg-gradient-to-br from-blue-400/10 to-purple-500/10 backdrop-blur-3xl"
          style={{ animation: 'modernFloat 8s ease-in-out infinite', transform: 'rotate(12deg)' }}
        />
        <div 
          className="absolute top-1/3 right-1/3 w-24 h-24 rounded-full bg-gradient-to-br from-pink-400/15 to-orange-500/10 backdrop-blur-2xl"
          style={{ animation: 'modernFloat 6s ease-in-out infinite 2s' }}
        />
        <div 
          className="absolute bottom-1/4 left-1/2 w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-400/12 to-blue-500/8"
          style={{ animation: 'modernFloat 10s ease-in-out infinite 1s', transform: 'rotate(-15deg)' }}
        />
        <div 
          className="absolute top-1/2 right-1/4 w-16 h-16 rounded-full bg-gradient-to-br from-violet-400/10 to-indigo-500/8"
          style={{ animation: 'modernFloat 7s ease-in-out infinite 3s' }}
        />
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Section gauche - Visualisation */}
          <div className="text-center lg:text-left">
            <div 
              className="flex justify-center lg:justify-start mb-8"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.9)',
                transition: 'all 1s ease-out 0.3s'
              }}
            >
              <SimpleProgress />
            </div>
            
            {/* Métriques avec animations décalées */}
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto lg:mx-0">
              <SimpleMetric 
                icon={Zap} 
                label="Performance" 
                value="98%"
                delay={1.2}
                color="#FF7900"
              />
              <SimpleMetric 
                icon={Target} 
                label="Satisfaction" 
                value="100%"
                delay={1.4}
                color="#10B981"
              />
            </div>
          </div>

          {/* Section droite - Contenu avec animations fluides */}
          <div className="space-y-8">
            <div 
              className="flex items-center gap-3"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateX(0) scale(1)' : 'translateX(-30px) scale(0.95)',
                transition: 'all 0.8s ease-out 0.1s'
              }}
            >
              <div 
                className="p-2 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 shadow-lg"
                style={{
                  animation: isVisible ? 'iconGlow 3s ease-in-out infinite' : 'none'
                }}
              >
                <Sparkles size={18} className="text-white" />
              </div>
              <span className="text-orange-400 font-semibold text-sm tracking-wide uppercase">
                Excellence • Innovation
              </span>
            </div>

            <h1 
              className="text-5xl lg:text-6xl font-bold leading-tight"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 1s ease-out 0.3s'
              }}
            >
              <span 
                className="block text-transparent bg-clip-text transition-all duration-700"
                style={{
                  backgroundImage: `linear-gradient(135deg, #FF7900, #FF4500, #E63946)`,
                  animation: isVisible ? 'gradientShift 4s ease-in-out infinite' : 'none'
                }}
              >
                Solutions
              </span>
              <span 
                className="block text-white mt-2"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateX(0)' : 'translateX(-20px)',
                  transition: 'all 0.8s ease-out 0.5s'
                }}
              >
                Digitales
              </span>
              <span 
                className="block text-xl lg:text-2xl font-normal text-gray-400 mt-4"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'all 0.8s ease-out 0.7s'
                }}
              >
                modernes et performantes
              </span>
            </h1>
            
            <p 
              className="text-gray-300 text-lg leading-relaxed max-w-xl"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(25px)',
                transition: 'all 0.8s ease-out 0.6s'
              }}
            >
              Nous créons des <span className="text-orange-400 font-semibold">solutions web</span> sur mesure 
              qui allient <span className="text-blue-400 font-semibold">design moderne</span> et 
              <span className="text-green-400 font-semibold"> performance optimale</span> pour 
              faire grandir votre business.
            </p>

            <div 
              className="flex flex-col sm:flex-row gap-4 pt-6"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 0.8s ease-out 0.8s'
              }}
            >
              <button className="group px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-semibold shadow-lg shadow-orange-500/25 hover:shadow-orange-500/50 transition-all duration-500 hover:scale-105 hover:-translate-y-1">
                <span className="flex items-center gap-3">
                  Découvrir nos services
                  <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-300" />
                </span>
              </button>
              
              <button className="group px-8 py-4 backdrop-blur-xl bg-white/10 text-white rounded-xl font-semibold border border-white/20 hover:border-white/40 hover:bg-white/20 transition-all duration-500 hover:scale-105 hover:-translate-y-1">
                <span className="flex items-center gap-3">
                  Voir nos réalisations
                  <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-300" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes gentlePulse {
          0%, 100% { transform: scale(1); opacity: 0.2; }
          50% { transform: scale(1.05); opacity: 0.3; }
        }
        
        @keyframes numberFloat {
          0%, 100% { transform: scale(1.1) translateY(-2px); }
          50% { transform: scale(1.1) translateY(-6px); }
        }
        
        @keyframes rotateRing {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.2); }
        }
        
        @keyframes slideInScale {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes countUp {
          from { transform: scale(0.8); opacity: 0.8; }
          to { transform: scale(1); opacity: 1; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          33% { transform: translateY(-10px) translateX(5px); }
          66% { transform: translateY(5px) translateX(-5px); }
        }
        
        @keyframes iconGlow {
          0%, 100% { box-shadow: 0 4px 15px rgba(255, 121, 0, 0.3); }
          50% { box-shadow: 0 6px 25px rgba(255, 121, 0, 0.5); }
        }
        
        @keyframes gradientShift {
          0%, 100% { 
            background-image: linear-gradient(135deg, #FF7900, #FF4500, #E63946);
          }
          50% { 
            background-image: linear-gradient(135deg, #FF4500, #E63946, #FF7900);
          }
        }
      `}</style>
    </section>
  );
};

export default PerformanceSection;