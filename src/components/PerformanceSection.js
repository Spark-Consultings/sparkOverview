import React, { useState, useEffect } from 'react';
import { ArrowRight, Zap, Clock, Server, Target, TrendingUp, Users, Award } from 'lucide-react';

const CircularProgress = () => {
  const [score, setScore] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [currentCount, setCurrentCount] = useState(0);
  
  const segments = [
    { color: '#FF7900', rotation: 0, size: 90 },     // Orange principal
    { color: '#FF4500', rotation: 90, size: 85 },    // Orange-rouge  
    { color: '#FF6B35', rotation: 180, size: 95 },   // Orange clair
    { color: '#E63946', rotation: 270, size: 88 }    // Rouge
  ];

  useEffect(() => {
    // Animation du compteur
    const countTimer = setInterval(() => {
      setCurrentCount(prev => {
        if (prev < 25) return prev + 1;
        clearInterval(countTimer);
        return 25;
      });
    }, 80);

    const scoreTimer = setTimeout(() => {
      setScore(25);
    }, 1000);

    return () => {
      clearInterval(countTimer);
      clearTimeout(scoreTimer);
    };
  }, []);

  return (
    <div className="relative w-[500px] h-[500px] cursor-pointer group">
      {/* Glow effects multiples et complexes */}
      <div
        className="absolute inset-0 rounded-full blur-3xl"
        style={{
          background: `
            radial-gradient(circle at 30% 30%, rgba(255, 121, 0, 0.4) 0%, transparent 50%),
            radial-gradient(circle at 70% 70%, rgba(255, 69, 0, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(230, 57, 70, 0.2) 0%, transparent 70%)
          `,
          opacity: isHovered ? 0.8 : 0.5,
          transform: isHovered ? 'scale(1.3) rotate(180deg)' : 'scale(1)',
          transition: 'all 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)'
        }}
      />
      
      {/* Anneaux orbitaux multiples */}
      <div 
        className="absolute inset-8 border-2 rounded-full"
        style={{
          borderImage: 'linear-gradient(45deg, #FF7900, #FF4500, #FF6B35) 1',
          animation: 'orbit-1 25s linear infinite',
          opacity: 0.6
        }}
      />
      <div 
        className="absolute inset-16 border rounded-full"
        style={{
          borderImage: 'linear-gradient(-45deg, #E63946, #FF4500) 1',
          animation: 'orbit-2 35s linear infinite reverse',
          opacity: 0.4
        }}
      />
      <div 
        className="absolute inset-20 border rounded-full border-orange-400/20"
        style={{
          animation: 'orbit-3 45s linear infinite',
          opacity: 0.3
        }}
      />
      
      {/* Segments principaux avec effets 3D */}
      {segments.map((segment, index) => (
        <div
          key={index}
          className="absolute inset-0 rounded-full"
          style={{
            opacity: 1,
            transform: `rotate(${segment.rotation}deg) ${isHovered ? 'scale(1.08)' : 'scale(1)'}`,
            transition: `all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.1}s`,
            background: `conic-gradient(
              from 0deg, 
              transparent 0deg, 
              ${segment.color} ${segment.size/2}deg, 
              ${segment.color}DD ${segment.size}deg, 
              transparent ${segment.size + 5}deg
            )`,
            filter: isHovered ? 'brightness(1.3) saturate(1.2)' : 'brightness(1)',
            mixBlendMode: 'screen'
          }}
        />
      ))}
      
      {/* Éléments orbitaux décoratifs */}
      {[...Array(12)].map((_, i) => (
        <div
          key={`orbital-${i}`}
          className="absolute w-3 h-3 rounded-full"
          style={{
            background: `linear-gradient(135deg, ${segments[i % 4].color}, ${segments[(i + 1) % 4].color})`,
            top: '50%',
            left: '50%',
            transform: `translate(-50%, -50%) rotate(${i * 30}deg) translateY(-${120 + (i % 3) * 20}px)`,
            opacity: isHovered ? 0.8 : 0.4,
            animation: `orbital-float-${i} ${8 + (i % 3) * 2}s ease-in-out infinite`,
            animationDelay: `${i * 0.5}s`,
            boxShadow: `0 0 10px ${segments[i % 4].color}`,
            transition: 'all 0.6s ease-out'
          }}
        />
      ))}
      
      {/* Centre ultra-moderne */}
      <div 
        className="absolute inset-16 rounded-full flex items-center justify-center overflow-hidden"
        style={{
          background: `
            linear-gradient(135deg, 
              rgba(255, 255, 255, 0.95) 0%, 
              rgba(248, 250, 252, 0.9) 50%, 
              rgba(241, 245, 249, 0.95) 100%
            )
          `,
          boxShadow: isHovered 
            ? `
              0 30px 60px -12px rgba(0, 0, 0, 0.3),
              inset 0 4px 8px 0 rgba(255, 121, 0, 0.15),
              0 0 40px rgba(255, 121, 0, 0.2)
            ` 
            : `
              0 25px 50px -12px rgba(0, 0, 0, 0.15),
              inset 0 2px 4px 0 rgba(255, 121, 0, 0.08)
            `,
          transform: isHovered ? 'scale(1.05)' : 'scale(1)',
          transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
          backdropFilter: 'blur(20px)'
        }}
      >
        <div className="relative text-center">
          {/* Nombre animé */}
          <div className="relative mb-2">
            <span 
              className="text-8xl font-black bg-gradient-to-br from-orange-600 via-red-500 to-orange-700 bg-clip-text text-transparent drop-shadow-lg"
              style={{
                fontSize: isHovered ? '6rem' : '5.5rem',
                transition: 'font-size 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
                textShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
              }}
            >
              {currentCount}
            </span>
            
            {/* Effet de brillance sur le nombre */}
            <div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              style={{
                transform: 'translateX(-100%)',
                animation: isHovered ? 'shine 2s ease-in-out infinite' : 'none',
                clipPath: 'polygon(0 0, 100% 0, 95% 100%, -5% 100%)'
              }}
            />
          </div>
          
          <div className="text-gray-700 font-bold text-lg tracking-[0.3em] mb-4">
            PROJETS
          </div>
          
          {/* Barre de progression circulaire */}
          <div className="absolute -inset-2 rounded-full">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="48"
                fill="none"
                stroke="rgba(0,0,0,0.05)"
                strokeWidth="0.5"
              />
              <circle
                cx="50"
                cy="50"
                r="48"
                fill="none"
                stroke="url(#progress-gradient)"
                strokeWidth="1"
                strokeLinecap="round"
                strokeDasharray={`${(currentCount / 25) * 301.6} 301.6`}
                style={{
                  transition: 'stroke-dasharray 0.5s ease-out',
                  filter: 'drop-shadow(0 0 4px rgba(255, 121, 0, 0.3))'
                }}
              />
              <defs>
                <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FF7900" />
                  <stop offset="50%" stopColor="#FF4500" />
                  <stop offset="100%" stopColor="#E63946" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          
          {/* Particules énergétiques */}
          {[...Array(16)].map((_, i) => (
            <div
              key={`energy-${i}`}
              className="absolute w-1 h-1 rounded-full"
              style={{
                background: `linear-gradient(45deg, ${segments[i % 4].color}, ${segments[(i + 2) % 4].color})`,
                top: '50%',
                left: '50%',
                opacity: 0,
                animation: `energy-burst-${i} 4s ease-out infinite`,
                animationDelay: `${i * 0.25}s`,
                filter: `blur(${Math.random() * 0.5}px)`,
                transform: `translate(-50%, -50%) rotate(${i * 22.5}deg) translateY(-60px) scale(${0.5 + Math.random() * 0.5})`
              }}
            />
          ))}
        </div>
      </div>
      
      <style jsx>{`
        @keyframes orbit-1 {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes orbit-2 {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        
        @keyframes orbit-3 {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes shine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        
        ${[...Array(12)].map((_, i) => `
          @keyframes orbital-float-${i} {
            0%, 100% { 
              transform: translate(-50%, -50%) rotate(${i * 30}deg) translateY(-${120 + (i % 3) * 20}px) scale(1);
              opacity: 0.4;
            }
            50% { 
              transform: translate(-50%, -50%) rotate(${i * 30 + 180}deg) translateY(-${140 + (i % 3) * 20}px) scale(1.5);
              opacity: 0.8;
            }
          }
        `).join('')}
        
        ${[...Array(16)].map((_, i) => `
          @keyframes energy-burst-${i} {
            0% { 
              opacity: 0; 
              transform: translate(-50%, -50%) rotate(${i * 22.5}deg) translateY(-30px) scale(0.3);
            }
            20% { 
              opacity: 1; 
              transform: translate(-50%, -50%) rotate(${i * 22.5}deg) translateY(-60px) scale(1);
            }
            80% { 
              opacity: 0.6; 
              transform: translate(-50%, -50%) rotate(${i * 22.5}deg) translateY(-100px) scale(0.5);
            }
            100% { 
              opacity: 0; 
              transform: translate(-50%, -50%) rotate(${i * 22.5}deg) translateY(-120px) scale(0);
            }
          }
        `).join('')}
      `}</style>
    </div>
  );
};

const MetricCard = ({ icon: Icon, title, value, delay, gradient }) => (
  <div
    className="group relative"
    style={{
      opacity: 0,
      transform: 'translateY(20px)',
      animation: `fadeInUp 0.8s ease-out ${delay}s forwards`
    }}
  >
    <div 
      className="absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-all duration-500"
      style={{ background: gradient }}
    />
    <div className="relative p-6 bg-white/[0.03] backdrop-blur-2xl rounded-2xl border border-white/[0.05] hover:border-white/20 transition-all duration-500 group-hover:transform group-hover:-translate-y-2 group-hover:shadow-2xl">
      <div className="flex items-center gap-4">
        <div 
          className="p-3 rounded-xl bg-gradient-to-br shadow-lg group-hover:scale-110 transition-transform duration-300"
          style={{ background: gradient }}
        >
          <Icon size={24} className="text-white drop-shadow-sm" />
        </div>
        <div>
          <p className="text-gray-400 text-sm font-medium tracking-wide">{title}</p>
          <p className="text-white font-bold text-xl mt-1">{value}</p>
        </div>
      </div>
    </div>
  </div>
);

const CodeSnippet = () => (
  <div 
    className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl w-80 overflow-hidden shadow-2xl border border-gray-700/50"
    style={{
      opacity: 0,
      transform: 'translateY(20px) scale(0.9)',
      animation: 'fadeInScale 0.8s ease-out 1.2s forwards'
    }}
  >
    <div className="px-4 py-3 border-b border-gray-700/50 bg-gradient-to-r from-gray-800 to-gray-750">
      <div className="flex items-center gap-2">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500 shadow-lg" />
          <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-lg" />
          <div className="w-3 h-3 rounded-full bg-green-500 shadow-lg" />
        </div>
        <div className="text-gray-400 text-xs font-mono ml-4">sparkline-projects.tsx</div>
      </div>
    </div>
    <div className="p-5 font-mono text-sm">
      <div className="text-blue-400 font-semibold">const projects = {`{`}</div>
      <div className="text-gray-300 ml-4 mt-2">
        <div><span className="text-purple-400">completed:</span> <span className="text-green-400">25</span>,</div>
        <div><span className="text-purple-400">technologies:</span> <span className="text-yellow-400">['React', 'Node.js']</span>,</div>
        <div><span className="text-purple-400">satisfaction:</span> <span className="text-green-400">100%</span></div>
      </div>
      <div className="text-blue-400 font-semibold mt-2">{`}`}</div>
    </div>
  </div>
);

const PerformanceSection = () => {
  return (
    <section className="min-h-screen flex items-center py-32 px-8 relative overflow-hidden">
      {/* Background amélioré */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-slate-900 to-gray-950" />
      
      {/* Effets de grille subtile */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 121, 0, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 121, 0, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />
      
      {/* Effets de lumière ambiante */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-red-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="relative flex justify-center items-center">
              <CircularProgress />
              
              <div 
                className="absolute -top-20 -right-32 z-10"
                style={{
                  opacity: 0,
                  animation: 'fadeInRight 0.8s ease-out 1.4s forwards'
                }}
              >
                <CodeSnippet />
              </div>
              
              {/* Éléments décoratifs flottants */}
              <div className="absolute -top-32 -left-16 w-24 h-24 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-2xl rotate-12 blur-sm animate-pulse" />
              <div className="absolute -bottom-20 -right-20 w-32 h-32 bg-gradient-to-tl from-blue-500/10 to-purple-500/10 rounded-3xl -rotate-12 blur-lg animate-pulse" style={{ animationDelay: '1s' }} />
              
              {/* Lignes de connexion animées */}
              <div className="absolute top-1/2 -right-12 w-24 h-px bg-gradient-to-r from-orange-500/50 to-transparent animate-pulse" />
              <div className="absolute top-1/2 -left-12 w-16 h-px bg-gradient-to-l from-red-500/40 to-transparent animate-pulse" style={{ animationDelay: '0.5s' }} />
              
              <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-full max-w-3xl grid grid-cols-4 gap-8 mt-20">
                <MetricCard 
                  icon={Zap} 
                  title="Performance" 
                  value="99.8%"
                  delay={1.6}
                  gradient="linear-gradient(135deg, #FF7900, #FF4500)"
                />
                <MetricCard 
                  icon={Clock} 
                  title="Délai Moyen" 
                  value="2 sem"
                  delay={1.8}
                  gradient="linear-gradient(135deg, #10B981, #059669)"
                />
                <MetricCard 
                  icon={Users} 
                  title="Clients" 
                  value="25+"
                  delay={2.0}
                  gradient="linear-gradient(135deg, #8B5CF6, #7C3AED)"
                />
                <MetricCard 
                  icon={Award} 
                  title="Satisfaction" 
                  value="100%"
                  delay={2.2}
                  gradient="linear-gradient(135deg, #F59E0B, #D97706)"
                />
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="h-1 w-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full" />
              <span className="text-orange-400 font-semibold tracking-wide">Excellence & Innovation</span>
            </div>

            <h2 
              className="text-6xl lg:text-7xl font-black text-white leading-tight"
              style={{
                opacity: 0,
                transform: 'translateY(30px)',
                animation: 'fadeInUp 0.8s ease-out 0.2s forwards'
              }}
            >
              <span className="bg-gradient-to-r from-orange-400 via-red-500 to-orange-600 bg-clip-text text-transparent">
                Projets
              </span>
              <br />
              <span className="text-gray-100">Réalisés</span>
            </h2>
            
            <p 
              className="text-gray-300 text-xl leading-relaxed font-light"
              style={{
                opacity: 0,
                transform: 'translateY(20px)',
                animation: 'fadeInUp 0.8s ease-out 0.4s forwards'
              }}
            >
              Découvrez notre portfolio de <span className="text-orange-400 font-semibold">solutions digitales innovantes</span>, 
              conçues avec une architecture moderne, un design cutting-edge et un code 
              <span className="text-blue-400 font-semibold"> évolutif et maintenable</span>.
            </p>

            <div 
              className="pt-4"
              style={{
                opacity: 0,
                transform: 'translateY(20px)',
                animation: 'fadeInUp 0.8s ease-out 0.6s forwards'
              }}
            >
              <a
                href="#"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl font-semibold text-lg shadow-2xl shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-300 hover:scale-105 hover:-translate-y-1"
              >
                Découvrir nos réalisations
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(30px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }
        
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </section>
  );
};

export default PerformanceSection;