import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Rocket, Globe, Cpu, Sparkles, Bot } from 'lucide-react';
import React, { useState, useEffect, useCallback } from 'react';

const slides = [
  {
    id: 1,
    title: "AI-First Design",
    subtitle: "Neural Interface",
    description: "Experience our adaptive UI that learns and evolves with your interactions.",
    icon: Bot,
    gradient: "from-violet-600 to-fuchsia-600",
    accent: "violet",
    particles: 15
  },
  {
    id: 2,
    title: "Quantum Ready",
    subtitle: "Future Proof",
    description: "Built for the next generation of quantum-enhanced web applications.",
    icon: Sparkles,
    gradient: "from-cyan-500 to-blue-600",
    accent: "cyan",
    particles: 20
  },
  {
    id: 3,
    title: "Neural Network",
    subtitle: "Deep Learning",
    description: "Harness the power of distributed neural processing across the metaverse.",
    icon: Cpu,
    gradient: "from-rose-500 to-orange-600",
    accent: "rose",
    particles: 12
  }
];

const FloatingParticles = ({ count, accent }) => (
  <div className="absolute inset-0 overflow-hidden">
    {Array.from({ length: count }).map((_, i) => (
      <motion.div
        key={i}
        className={`absolute w-1 h-1 md:w-2 md:h-2 rounded-full bg-${accent}-500/30`}
        animate={{
          x: ['0%', `${Math.random() * 100}%`],
          y: ['0%', `${Math.random() * 100}%`],
          scale: [1, Math.random() + 0.5, 1],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: Math.random() * 5 + 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
      />
    ))}
  </div>
);

const SlideIndicator = ({ total, current, onClick }) => (
  <div className="flex gap-3 items-center backdrop-blur-xl p-2 rounded-2xl bg-gray-900/30">
    {Array.from({ length: total }).map((_, index) => (
      <motion.button
        key={index}
        onClick={() => onClick(index)}
        className={`group relative h-14 rounded-xl overflow-hidden ${
          current === index ? 'w-24' : 'w-14'
        }`}
        whileHover={{ width: 96, scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        <div className={`absolute inset-0 bg-gradient-to-r opacity-30 ${slides[index].gradient}`} />
        <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-md group-hover:opacity-0 transition-opacity" />
        <motion.div
          className="relative h-full flex items-center justify-center"
          animate={{ opacity: current === index ? 1 : 0.5 }}
        >
          {React.createElement(slides[index].icon, {
            className: `w-6 h-6 text-${slides[index].accent}-500`,
            strokeWidth: 1.5
          })}
        </motion.div>
      </motion.button>
    ))}
  </div>
);

const SlideContent = ({ slide, direction }) => {
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.9,
    }),
  };

  return (
    <motion.div
      custom={direction}
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
      className="absolute inset-0 flex flex-col lg:flex-row items-center gap-12 px-6 lg:px-12"
    >
      <div className="w-full lg:w-1/2 text-center lg:text-left mt-8 lg:mt-0 relative">
        <FloatingParticles count={slide.particles} accent={slide.accent} />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6 backdrop-blur-sm bg-gray-900/30 p-8 rounded-3xl border border-gray-800/50"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800/50 border border-gray-700/50">
            <div className={`w-2 h-2 rounded-full bg-${slide.accent}-500 animate-pulse`} />
            <span className="text-gray-300 text-sm font-medium">{slide.subtitle}</span>
          </div>

          <h1 className="text-4xl lg:text-7xl font-bold tracking-tight">
            <span className={`bg-gradient-to-r ${slide.gradient} text-transparent bg-clip-text`}>
              {slide.title}
            </span>
          </h1>

          <p className="text-gray-400 text-lg max-w-xl">
            {slide.description}
          </p>

          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className={`px-8 py-4 rounded-2xl bg-gradient-to-r ${slide.gradient} text-white font-medium
              shadow-lg shadow-${slide.accent}-500/20 hover:shadow-2xl hover:shadow-${slide.accent}-500/40
              text-base relative overflow-hidden group`}
          >
            <span className="relative z-10">Explore Now</span>
            <motion.div
              className="absolute inset-0 bg-white/20"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.5 }}
            />
          </motion.button>
        </motion.div>
      </div>

      <div className="w-full lg:w-1/2 relative aspect-square max-w-[500px]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0"
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={i}
              className={`absolute top-1/2 left-1/2 w-1 h-1 rounded-full bg-${slide.accent}-500/30`}
              style={{
                transform: `rotate(${i * 30}deg) translateY(-200px)`,
              }}
            />
          ))}
        </motion.div>
        
        <div className="absolute inset-0 backdrop-blur-3xl">
          <motion.div
            className={`absolute inset-8 rounded-full bg-gradient-to-r ${slide.gradient}`}
            animate={{
              scale: [1, 1.1, 1],
              rotate: 360,
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute inset-1 rounded-full bg-gray-900/90 flex items-center justify-center backdrop-blur-xl">
              {React.createElement(slide.icon, {
                className: `w-20 h-20 text-${slide.accent}-500`,
                strokeWidth: 1
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const HeroSection2 = () => {
  const [[page, direction], setPage] = useState([0, 0]);

  const paginate = useCallback((newDirection) => {
    const newPage = page + newDirection;
    if (newPage >= 0 && newPage < slides.length) {
      setPage([newPage, newDirection]);
    } else if (newPage < 0) {
      setPage([slides.length - 1, -1]);
    } else {
      setPage([0, 1]);
    }
  }, [page]);

  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, 6000);

    return () => clearInterval(timer);
  }, [page, paginate]);

  return (
    <section className="relative min-h-screen bg-gray-900 py-20 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-800/20 via-gray-900 to-gray-900" />
      
      <div className="max-w-7xl mx-auto relative">
        <div className="relative h-[800px]">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <SlideContent
              key={page}
              slide={slides[page]}
              direction={direction}
            />
          </AnimatePresence>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-8">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => paginate(-1)}
              className="p-3 rounded-full bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 text-gray-300"
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>

            <SlideIndicator
              total={slides.length}
              current={page}
              onClick={(index) => setPage([index, index > page ? 1 : -1])}
            />

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => paginate(1)}
              className="p-3 rounded-full bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 text-gray-300"
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection2;