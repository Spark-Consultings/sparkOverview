import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ChevronRight, Play} from 'lucide-react';
import VideoPlayer from "./VideoPlayer";

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
      },
      isDeleting ? 50 : 150
    );

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
      rotateX: [0, 5, 0],
      rotateY: [0, 5, 0],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
    className={className}
  >
    {children}
  </motion.div>
);

const GradientButton = ({ children, primary = false, onClick }) => (
  <motion.button
    whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(249, 115, 22, 0.5)" }}
    whileTap={{ scale: 0.95 }}
    transition={{ type: "spring", stiffness: 400, damping: 10 }}
    className={`px-6 py-3 rounded-full font-medium flex items-center gap-2 transition-all ${
      primary
        ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/20 hover:shadow-xl hover:shadow-orange-500/30"
        : "bg-gray-800/50 backdrop-blur-xl text-white border border-orange-500/20 hover:bg-gray-800/70"
    }`}
    onClick={onClick}
  >
    {children}
  </motion.button>
);

const ParticleEffect = () => {
  const particles = Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-orange-500"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            x: [0, Math.random() * 100 - 50],
            y: [0, Math.random() * 100 - 50],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

const HeroSection = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const typingWords = [
    "Evolution digitale",
    "Innovation technologique",
    "Maintenabilité",
    "Bonnes pratiques",
  ];

  return (
    <section className="relative min-h-screen pt-44 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gray-900">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900/95 to-gray-900/50" />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, rgba(249, 115, 22, 0.15) 1px, transparent 0)",
            backgroundSize: "32px 32px",
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

      <ParticleEffect />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto relative">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-left w-full"
          >
            {/* Main Title */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="mb-6 sm:mb-8"
            >
              <div className="flex items-center gap-2 justify-center lg:justify-start mb-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="px-3 sm:px-4 py-1 bg-orange-500/10 rounded-full border border-orange-500/20 text-orange-400 text-xs sm:text-sm flex items-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                  Soyez positivement surpris. Sparkline !
                </motion.div>
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold text-white mb-4 leading-tight">
                <motion.span
                  className="bg-gradient-to-r from-orange-400 to-red-500 text-transparent bg-clip-text block mt-2"
                  animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                >
                  SPARK
                </motion.span>
                THE CHANGE
                <motion.span
                  className="bg-gradient-to-r from-orange-400 to-red-500 text-transparent bg-clip-text block mt-2"
                  animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                >
                  ILLUMINATE
                </motion.span>
                SUCCESS !
              </h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-gray-400 text-sm sm:text-lg max-w-xl mx-auto lg:mx-0"
              >
                Nous accompagnons les entreprises dans leur évolution numérique
                grâce à une expertise pointue en développement de plateformes
                robustes, en gestion optimisée des ressources, et en conception
                de stratégies digitales percutantes.
              </motion.p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8 sm:mb-12"
            >
              <GradientButton primary>
                Découvrir{" "}
                <ChevronRight className="w-5 h-5" />
              </GradientButton>
              <GradientButton onClick={() => setIsVideoOpen(true)}>
                <Play className="w-5 h-5 text-orange-500" />
                Regarder notre présentation
              </GradientButton>
            </motion.div>
          </motion.div>

          {/* Right Visual Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
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
                  <motion.div
                    key={i}
                    className="absolute top-1/2 left-1/2 w-1 h-1 rounded-full bg-orange-500/30"
                    style={{
                      transform: `rotate(${i * 7.5}deg) translateX(clamp(140px, 30vw, 280px)) translate(-50%, -50%)`,
                    }}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
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
                delay={0.5}
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
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
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
      <AnimatePresence>
        {isVideoOpen && <VideoPlayer onClose={() => setIsVideoOpen(false)} />}
      </AnimatePresence>
    </section>
  );
};

export default HeroSection;

