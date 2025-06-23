import React, { useState, useEffect } from 'react';
import { ChevronRight, Play } from 'lucide-react';

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
      <span className="font-light tracking-wide text-center">{text}</span>
      <div 
        className="inline-block w-px h-4 sm:h-6 ml-2 bg-gradient-to-b from-orange-400 to-red-500 animate-pulse" 
      />
    </div>
  );
};

const GradientButton = ({ children, primary = false, onClick, className = "" }) => (
  <button
    className={`group relative px-4 py-3 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-xl sm:rounded-2xl font-medium flex items-center justify-center gap-2 sm:gap-3 transition-all duration-500 overflow-hidden transform hover:scale-105 hover:-translate-y-1 active:scale-95 w-full sm:w-auto min-w-[160px] sm:min-w-[200px] ${
      primary
        ? "bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 text-white shadow-xl sm:shadow-2xl shadow-orange-500/20 hover:shadow-orange-500/30"
        : "bg-white/5 backdrop-blur-xl text-white border border-white/10 hover:border-white/20 hover:bg-white/10"
    } ${className}`}
    onClick={onClick}
  >
    {primary && (
      <div
        className="absolute inset-0 bg-gradient-to-r from-orange-400 via-red-400 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      />
    )}
    <span className="relative z-10 flex items-center gap-2 sm:gap-3 text-sm sm:text-base">
      {children}
    </span>
  </button>
);

const FloatingElements = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(4)].map((_, i) => (
      <div
        key={i}
        className="absolute w-1 h-1 sm:w-2 sm:h-2 bg-orange-400/30 rounded-full animate-pulse"
        style={{
          left: `${20 + i * 20}%`,
          top: `${30 + i * 15}%`,
          animationDelay: `${i * 1.5}s`,
          animationDuration: `${8 + i * 2}s`
        }}
      />
    ))}
  </div>
);

const ScrollIndicator = () => (
  <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-1 sm:gap-2">
    <span className="text-gray-400/60 text-[10px] sm:text-xs font-light tracking-wider">DÉCOUVRIR</span>
    <div className="w-5 h-8 sm:w-6 sm:h-10 border border-gray-400/30 rounded-full flex justify-center relative">
      <div className="w-0.5 h-2 sm:w-1 sm:h-3 bg-gradient-to-b from-orange-400 to-red-500 rounded-full mt-1.5 sm:mt-2 animate-bounce" />
    </div>
  </div>
);

const ModernHeroSection = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isVideoLoading, setIsVideoLoading] = useState(false);
  
  // Remplacez cette URL par votre vidéo YouTube - SEULEMENT L'ID !
  const youtubeVideoId = "UF2o_HHbr_8"; // Extrait de: https://www.youtube.com/watch?v=fwx3lzHkura5MhjA
  
  const typingWords = [
    "Évolution digitale",
    "Innovation technologique", 
    "Excellence technique",
    "Solutions sur mesure"
  ];

  // Fonction pour fermer la vidéo
  const closeVideo = () => {
    setIsVideoOpen(false);
    setIsVideoLoading(false);
  };

  // Fonction pour ouvrir la vidéo
  const openVideo = () => {
    setIsVideoLoading(true);
    setIsVideoOpen(true);
  };

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
               backgroundSize: '30px 30px'
             }} 
        />
        
        {/* Ambient Light Effects - Reduced for mobile */}
        <div className="absolute top-1/4 left-1/6 w-[200px] sm:w-[300px] md:w-[500px] h-[200px] sm:h-[300px] md:h-[500px] bg-orange-500/8 sm:bg-orange-500/10 rounded-full blur-[40px] sm:blur-[60px] md:blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/6 w-[150px] sm:w-[250px] md:w-[400px] h-[150px] sm:h-[250px] md:h-[400px] bg-blue-500/8 sm:bg-blue-500/10 rounded-full blur-[30px] sm:blur-[50px] md:blur-[80px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <FloatingElements />

      {/* Main Content */}
      <section className="relative pt-16 sm:pt-20 md:pt-32 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto text-center">
          
          {/* Refined Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 md:px-6 md:py-3 bg-gradient-to-r from-orange-500/10 via-red-500/10 to-orange-500/10 rounded-full border border-orange-500/20 text-orange-300/90 text-[11px] sm:text-xs md:text-sm font-light tracking-wide mb-6 sm:mb-8 md:mb-12 transform hover:scale-105 transition-transform duration-300">
            <span className="whitespace-nowrap">Soyez positivement surpris. Sparkline !</span>
          </div>

          {/* Refined Main Title */}
          <div className="mb-6 sm:mb-8 md:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[0.9] sm:leading-[0.85] md:leading-[0.9] tracking-tight">
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
          <div className="mb-8 sm:mb-12 md:mb-16">
            <div className="text-base sm:text-lg md:text-2xl text-orange-400/90 font-light tracking-wide px-2">
              <TypeWriter words={typingWords} />
            </div>
          </div>

          {/* Refined Description */}
          <div className="mb-8 sm:mb-12 md:mb-16">
            <p className="text-gray-300/80 text-sm sm:text-base md:text-xl leading-relaxed max-w-4xl mx-auto font-light tracking-wide px-2 sm:px-4">
              Nous accompagnons les entreprises dans leur{' '}
              <span className="text-orange-400/90 font-normal">évolution numérique</span>{' '}
              grâce à une expertise pointue en développement de plateformes robustes, 
              en gestion optimisée des ressources, et en conception de{' '}
              <span className="text-blue-400/90 font-normal">stratégies digitales percutantes</span>.
            </p>
          </div>

          {/* Refined CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 justify-center items-center mb-12 sm:mb-16 md:mb-20 px-2">
            <GradientButton primary>
              <span>Découvrir nos services</span>
              <div className="group-hover:translate-x-1 transition-transform duration-300">
                <ChevronRight className="w-4 h-4" />
              </div>
            </GradientButton>
            <GradientButton onClick={openVideo}>
              <Play className="w-4 h-4" />
              <span>Notre présentation</span>
            </GradientButton>
          </div>
        </div>
      </section>

      {/* Scroll Indicator */}
      <ScrollIndicator />

      {/* Enhanced Video Modal with Mobile Optimization */}
      {isVideoOpen && (
        <div
          className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex items-center justify-center p-2 sm:p-4 md:p-6"
          onClick={closeVideo}
        >
          <div
            className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl sm:rounded-2xl md:rounded-3xl p-3 sm:p-4 md:p-6 w-full max-w-6xl border border-gray-700/50 shadow-2xl transform scale-100 transition-all duration-300 mx-2 sm:mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-3 sm:mb-4 md:mb-6">
              <h3 className="text-lg sm:text-xl md:text-2xl font-light text-white truncate pr-4">
                Notre Présentation
              </h3>
              <button
                onClick={closeVideo}
                className="p-1.5 sm:p-2 hover:bg-gray-700/50 rounded-full transition-colors duration-200 text-gray-400 hover:text-white flex-shrink-0"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Video Container */}
            <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden border border-gray-700/30 relative">
              {isVideoLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50 z-10">
                  <div className="flex flex-col items-center gap-3 sm:gap-4">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-gray-300 text-xs sm:text-sm text-center px-4">
                      Chargement de la vidéo...
                    </span>
                  </div>
                </div>
              )}
              
              <iframe
                src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&rel=0&modestbranding=1&showinfo=0&controls=1&playsinline=1`}
                title="Présentation de l'entreprise"
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                onLoad={() => setIsVideoLoading(false)}
              />
            </div>
            
            {/* Footer */}
            <div className="mt-3 sm:mt-4 md:mt-6 text-center">
              <p className="text-gray-400 text-xs sm:text-sm font-light px-2">
                Découvrez comment nous transformons vos défis en opportunités
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModernHeroSection;