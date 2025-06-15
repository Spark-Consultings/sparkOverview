import React, { useState, useEffect } from 'react';
import { Sparkles, ChevronRight, Play, ArrowDown } from 'lucide-react';

const TypeWriter = ({ words }) => {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const currentWord = words[wordIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (text.length < currentWord.length) {
            setText(currentWord.slice(0, text.length + 1));
          } else {
            setIsPaused(true);
            setTimeout(() => {
              setIsPaused(false);
              setIsDeleting(true);
            }, 2000);
          }
        } else {
          if (text.length === 0) {
            setIsDeleting(false);
            setWordIndex((prev) => (prev + 1) % words.length);
          } else {
            setText(text.slice(0, -1));
          }
        }
      },
      isDeleting ? 80 : 120
    );

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words, isPaused]);

  return (
    <div className="flex items-center justify-center">
      <span className="font-light tracking-wide">{text}</span>
      <div 
        className="inline-block w-px h-6 ml-2 bg-gradient-to-b from-orange-400 to-red-500 animate-pulse" 
      />
    </div>
  );
};

const GradientButton = ({ children, primary = false, onClick, className = "" }) => (
  <button
    className={`group relative px-6 py-3 md:px-8 md:py-4 rounded-2xl font-medium flex items-center gap-3 transition-all duration-500 overflow-hidden transform hover:scale-105 hover:-translate-y-1 active:scale-95 ${
      primary
        ? "bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 text-white shadow-2xl shadow-orange-500/20 hover:shadow-orange-500/30"
        : "bg-white/5 backdrop-blur-xl text-white border border-white/10 hover:border-white/20 hover:bg-white/10"
    } ${className}`}
    onClick={onClick}
  >
    {primary && (
      <div
        className="absolute inset-0 bg-gradient-to-r from-orange-400 via-red-400 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      />
    )}
    <span className="relative z-10 flex items-center gap-3">
      {children}
    </span>
  </button>
);

const FloatingElements = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(6)].map((_, i) => (
      <div
        key={i}
        className="absolute w-2 h-2 bg-orange-400/30 rounded-full animate-pulse"
        style={{
          left: `${20 + i * 15}%`,
          top: `${30 + i * 10}%`,
          animationDelay: `${i * 1.5}s`,
          animationDuration: `${8 + i * 2}s`
        }}
      />
    ))}
  </div>
);

const TrustedBrands = () => {
  const brands = [
    'Boltshift', 'Lightbox', 'FeatherDev', 'Spherule', 'GlobalBank', 'Logoipsum'
  ];

  return (
    <div className="relative mt-16 md:mt-20">
      {/* Elegant Divider */}
      <div className="flex items-center justify-center mb-8 md:mb-12">
        <div className="w-12 md:w-16 h-px bg-gradient-to-r from-transparent via-orange-400/60 to-transparent" />
        <span className="mx-6 md:mx-8 text-gray-400/80 text-xs font-light tracking-[0.2em] uppercase">
          Ils nous font confiance
        </span>
        <div className="w-12 md:w-16 h-px bg-gradient-to-r from-transparent via-orange-400/60 to-transparent" />
      </div>

      {/* Brand Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8 lg:gap-12 max-w-5xl mx-auto">
        {brands.map((brand, index) => (
          <div
            key={brand}
            className="text-gray-500/70 hover:text-gray-300/90 font-light text-sm md:text-base tracking-wide cursor-pointer transition-all duration-300 text-center hover:transform hover:-translate-y-1"
          >
            {brand}
          </div>
        ))}
      </div>
    </div>
  );
};

const ScrollIndicator = () => (
  <div className="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2">
    <span className="text-gray-400/60 text-xs font-light tracking-wider">DÉCOUVRIR</span>
    <div className="w-6 h-10 border border-gray-400/30 rounded-full flex justify-center relative">
      <div className="w-1 h-3 bg-gradient-to-b from-orange-400 to-red-500 rounded-full mt-2 animate-bounce" />
    </div>
  </div>
);

const ModernHeroSection = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const typingWords = [
    "Évolution digitale",
    "Innovation technologique", 
    "Excellence technique",
    "Solutions sur mesure"
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* CSS Animations */}
      <style jsx>{`
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 200% 50%; }
        }
        
        @keyframes gradient-shift-reverse {
          0% { background-position: 200% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
      {/* Refined Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-slate-900 to-gray-950" />
        
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.02]" 
             style={{
               backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
               backgroundSize: '40px 40px'
             }} 
        />
        
        {/* Ambient Light Effects */}
        <div className="absolute top-1/3 left-1/5 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-orange-500/10 rounded-full blur-[60px] md:blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/3 right-1/5 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-blue-500/10 rounded-full blur-[50px] md:blur-[80px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <FloatingElements />

      {/* Main Content */}
      <section className="relative pt-20 md:pt-32 pb-16 md:pb-20 px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto text-center">
          
          {/* Refined Badge */}
          <div className="inline-flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-orange-500/10 via-red-500/10 to-orange-500/10 rounded-full border border-orange-500/20 text-orange-300/90 text-xs md:text-sm font-light tracking-wide mb-8 md:mb-12 transform hover:scale-105 transition-transform duration-300">
            <div className="animate-spin">
            </div>
            Soyez positivement surpris. Sparkline !
          </div>

          {/* Refined Main Title */}
          <div className="mb-8 md:mb-12">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[0.85] md:leading-[0.9] tracking-tight">
              <span 
                className="block bg-gradient-to-r from-orange-300 via-red-400 to-[#FF7900] text-transparent bg-clip-text"
                style={{ 
                  backgroundSize: "200% 100%",
                  animation: "gradient-shift 8s linear infinite"
                }}
              >
                SPARK
              </span>
              <span className="block text-gray-100 font-bold">THE CHANGE</span>
              <span 
                className="block bg-gradient-to-r from-blue-400 via-orange-400 to-[#FF7900] text-transparent bg-clip-text"
                style={{ 
                  backgroundSize: "200% 100%",
                  animation: "gradient-shift-reverse 8s linear infinite"
                }}
              >
                ILLUMINATE
              </span>
              <span className="block text-gray-100 font-bold">SUCCESS</span>
            </h1>
          </div>

          {/* Typing Animation with refined styling */}
          <div className="mb-12 md:mb-16">
            <div className="text-lg sm:text-xl md:text-2xl text-orange-400/90 font-light tracking-wide">
              <TypeWriter words={typingWords} />
            </div>
          </div>

          {/* Refined Description */}
          <div className="mb-12 md:mb-16">
            <p className="text-gray-300/80 text-base sm:text-lg md:text-xl leading-relaxed max-w-4xl mx-auto font-light tracking-wide px-4">
              Nous accompagnons les entreprises dans leur{' '}
              <span className="text-orange-400/90 font-normal">évolution numérique</span>{' '}
              grâce à une expertise pointue en développement de plateformes robustes, 
              en gestion optimisée des ressources, et en conception de{' '}
              <span className="text-blue-400/90 font-normal">stratégies digitales percutantes</span>.
            </p>
          </div>

          {/* Refined CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center mb-16 md:mb-20">
            <GradientButton primary>
              <span className="text-sm md:text-base">Découvrir nos services</span>
              <div className="group-hover:translate-x-1 transition-transform duration-300">
                <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
              </div>
            </GradientButton>
            <GradientButton onClick={() => setIsVideoOpen(true)}>
              <Play className="w-4 h-4 md:w-5 md:h-5" />
              <span className="text-sm md:text-base">Notre présentation</span>
            </GradientButton>
          </div>
        </div>
      </section>

      {/* Scroll Indicator */}
      <ScrollIndicator />

      {/* Enhanced Video Modal */}
      {isVideoOpen && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4 md:p-6"
          onClick={() => setIsVideoOpen(false)}
        >
          <div
            className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl md:rounded-3xl p-6 md:p-8 max-w-3xl w-full border border-gray-700/50 shadow-2xl transform scale-100 hover:scale-105 transition-transform duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl md:text-3xl font-light text-white mb-6 text-center">Notre Présentation</h3>
            <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl md:rounded-2xl flex items-center justify-center mb-6 md:mb-8 border border-gray-700/30">
              <div className="flex flex-col items-center gap-4 cursor-pointer group">
                <Play className="w-16 h-16 md:w-20 md:h-20 text-orange-400/70 group-hover:text-orange-400 group-hover:scale-110 transition-all duration-300" />
                <span className="text-gray-400/80 font-light text-sm md:text-base">Cliquez pour lire</span>
              </div>
            </div>
            <button
              onClick={() => setIsVideoOpen(false)}
              className="w-full px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl md:rounded-2xl hover:shadow-xl hover:shadow-orange-500/25 transition-all duration-300 font-medium text-sm md:text-base hover:scale-105 active:scale-95"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModernHeroSection;