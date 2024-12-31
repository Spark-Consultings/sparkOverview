import { motion } from 'framer-motion';
import { Sparkles, ExternalLink, Play, ChevronRight } from 'lucide-react';
import React, { useState, useEffect } from 'react';

const TypeWriter = ({ words }) => {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const currentWord = words[wordIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (text.length < currentWord.length) {
          setText(currentWord.slice(0, text.length + 1));
        } else {
          setIsPaused(true);
          setTimeout(() => {
            setIsPaused(false);
            setIsDeleting(true);
          }, 1500);
        }
      } else {
        if (text.length === 0) {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        } else {
          setText(text.slice(0, -1));
        }
      }
    }, isDeleting ? 50 : 150);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words, isPaused]);

  return (
    <div className="flex items-center">
      <span className="font-medium">{text}</span>
      <span className="inline-block w-0.5 h-4 ml-1 bg-orange-500 animate-pulse" />
    </div>
  );
};

const FloatingElement = ({ delay = 0, duration = 3, className, children }) => (
  <motion.div
    animate={{
      y: [-10, 10, -10],
      opacity: [0.5, 1, 0.5],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
    className={className}
  >
    {children}
  </motion.div>
);

const GradientButton = ({ children, primary = false }) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-medium flex items-center gap-2 transition-all ${
      primary 
        ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/20 hover:shadow-xl hover:shadow-orange-500/30' 
        : 'bg-gray-800/50 backdrop-blur-xl text-white border border-orange-500/20 hover:bg-gray-800/70'
    }`}
  >
    {children}
  </motion.button>
);

const StatCard = ({ label, value, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2 + (index * 0.1) }}
    className="relative group"
  >
    <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-xl blur-xl group-hover:blur-2xl transition-all" />
    <div className="relative p-3 sm:p-4 bg-gray-800/50 backdrop-blur-xl rounded-xl border border-orange-500/20">
      <div className="text-lg sm:text-2xl font-bold text-white mb-1">{value}</div>
      <div className="text-xs sm:text-sm text-gray-400">{label}</div>
    </div>
  </motion.div>
);

const HeroSection = () => {
  const typingWords = [
    "Evolution digitale",
    "Innovation technologique",
    "Maintenabilité",
    "Bonnes pratiques"
  ];

  return (
    <section className="relative min-h-screen pt-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gray-900">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900/95 to-gray-900/50" />
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, rgba(249, 115, 22, 0.15) 1px, transparent 0)",
            backgroundSize: '32px 32px',
          }} 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 360],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 -left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [360, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl"
        />
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto relative">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center lg:text-left w-full"
          >
            {/* Status Badge */}
            

            {/* Main Title */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-6 sm:mb-8"
            >
              <div className="flex items-center gap-2 justify-center lg:justify-start mb-4">
                <div className="px-3 sm:px-4 py-1 bg-orange-500/10 rounded-full border border-orange-500/20 text-orange-400 text-xs sm:text-sm flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                  Soyez positivement surpris
                </div>
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold text-white mb-4 leading-tight">
                ALLUMEZ
                <motion.span 
                  className="bg-gradient-to-r from-orange-400 to-red-500 text-transparent bg-clip-text block mt-2"
                  animate={{ backgroundPosition: ['0%', '100%', '0%'] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                >
                LA MÈCHE 
                </motion.span>
                DE VOTRE ÉVOLUTION DIGITALE.
              </h1>
              <p className="text-gray-400 text-sm sm:text-lg max-w-xl mx-auto lg:mx-0">
              Découvrez la prochaine évolution de la technologie avec notre plateforme de pointe.
              Conçue pour les innovateurs, pensée pour l'avenir.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start mb-8 sm:mb-12">
              <GradientButton primary>
                Decouvrir <ChevronRight className="w-[18px] h-[18px] sm:w-[20px] sm:h-[20px]" />
              </GradientButton>
              <GradientButton>
                <Play className="w-[18px] h-[18px] sm:w-[20px] sm:h-[20px] text-orange-500" />
                Regarder notre présentation
              </GradientButton>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
              <StatCard label="Active Users" value="100K+" index={0} />
              <StatCard label="Global Reach" value="150+ Countries" index={1} />
              <StatCard label="Uptime SLA" value="99.99%" index={2} />
            </div>
          </motion.div>

          {/* Right Visual Section - Visible on all screens */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-full"
          >
            <div className="relative w-full aspect-square max-w-[400px] lg:max-w-[600px] mx-auto">
              {/* Orbital Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0"
              >
                {Array.from({ length: 48 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute top-1/2 left-1/2 w-1 h-1 rounded-full bg-orange-500/30"
                    style={{
                      transform: `rotate(${i * 7.5}deg) translateX(clamp(140px, 30vw, 280px)) translate(-50%, -50%)`
                    }}
                  />
                ))}
              </motion.div>

              {/* Floating Cards */}
              <FloatingElement
                delay={0}
                className="absolute top-[10%] left-[10%] w-36 sm:w-48 h-28 sm:h-32 bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-orange-500/20 p-4 flex flex-col justify-between"
              >
                <div className="text-lg sm:text-xl text-orange-500">
                  <TypeWriter words={typingWords} />
                </div>
              </FloatingElement>

              <FloatingElement
                delay={0}
                className="absolute bottom-[10%] right-[10%] w-36 sm:w-48 h-28 sm:h-32 bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-orange-500/20 p-4 flex flex-col justify-between"
              >
                <div className="text-lg sm:text-xl text-orange-500">
                  <TypeWriter words={typingWords} />
                </div>
              </FloatingElement>

              {/* Center Element */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 360],
                  }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center"
                >
                  <div className="absolute inset-1 rounded-full bg-gray-900 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500" />
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;