import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Zap, Clock, Server } from 'lucide-react';

const CircularProgress = () => {
  const [score, setScore] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  
  const segments = [
    { color: '#FF7452', rotation: '-45deg', delay: 0 },    // Orange
    { color: '#A855F7', rotation: '45deg', delay: 0.2 },   // Purple
    { color: '#10B981', rotation: '135deg', delay: 0.4 },  // Green
    { color: '#EC4899', rotation: '225deg', delay: 0.6 }   // Pink
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setScore(0);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div 
      className="relative w-80 h-80"
      whileHover={{ scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {/* Outer glow effect */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: isHovered ? 0.2 : 0.15,
          scale: isHovered ? [1, 1.1, 1] : 1
        }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 rounded-full bg-white blur-xl"
      />
      
      {segments.map((segment, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, rotate: -30 }}
          animate={{ 
            opacity: 1, 
            rotate: 0,
            scale: isHovered ? [1, 1.03, 1] : [1, 1.02, 1]
          }}
          transition={{ 
            delay: segment.delay,
            duration: 0.8,
            rotate: { type: "spring", stiffness: 100 },
            scale: { repeat: Infinity, duration: isHovered ? 1.5 : 2 }
          }}
          className="absolute inset-0"
        >
          <div 
            style={{
              position: 'absolute',
              inset: '0',
              background: segment.color,
              transform: `rotate(${segment.rotation})`,
              clipPath: 'polygon(50% 50%, 50% 0, 52% 0, 52% 52%, 50% 50%)',
              borderRadius: '50%'
            }}
          />
        </motion.div>
      ))}
      
      {/* Inner circle with score */}
      <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ 
          delay: 0.8, 
          type: "spring",
          bounce: 0.4
        }}
        className="absolute inset-2 bg-white rounded-full flex items-center justify-center shadow-lg"
      >
        <div className="relative">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-6xl font-bold text-gray-900"
          >
            <AnimatePresence>
              <motion.span
                key={score}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
              >
                {score}
              </motion.span>
            </AnimatePresence>
          </motion.span>
          
          {/* Floating particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
                y: [-20, -40],
                x: Math.random() * 40 - 20
              }}
              transition={{
                duration: 2,
                delay: 1.2 + (i * 0.2),
                repeat: Infinity,
                repeatDelay: Math.random() * 2
              }}
              className="absolute w-2 h-2 rounded-full"
              style={{
                background: segments[i % segments.length].color,
                top: '50%',
                left: '50%'
              }}
            />
          ))}
        </div>
      </motion.div>
      
      {/* Rotating outer ring */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: 0.2,
          rotate: 360 
        }}
        transition={{
          delay: 0.5,
          duration: 8,
          rotate: {
            repeat: Infinity,
            ease: "linear"
          }
        }}
        className="absolute inset-0 border-4 border-white rounded-full"
      />
    </motion.div>
  );
};

const MetricCard = ({ icon: Icon, title, value, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    whileHover={{ 
      y: -5, 
      transition: { duration: 0.2 },
      scale: 1.05
    }}
    className="relative group"
  >
    <motion.div 
      className="absolute inset-0 bg-white/5 rounded-xl blur-lg"
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.5, 0.8, 0.5]
      }}
      transition={{
        duration: 2,
        repeat: Infinity
      }}
    />
    <div className="relative p-4 bg-white/5 backdrop-blur-xl rounded-xl border border-white/10">
      <div className="flex items-center gap-3">
        <motion.div 
          className="p-2 rounded-lg bg-white/10"
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.5 }}
        >
          <Icon size={18} className="text-white" />
        </motion.div>
        <div>
          <p className="text-gray-400 text-sm">{title}</p>
          <p className="text-white font-semibold">{value}</p>
        </div>
      </div>
    </div>
  </motion.div>
);

const CodeSnippet = () => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    className="bg-gray-900 rounded-lg w-64 overflow-hidden"
  >
    <div className="px-3 py-2 border-b border-gray-800">
      <div className="flex gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
      </div>
    </div>
    <div className="p-4 font-mono text-sm">
      <span className="text-blue-400">index.jsx</span>
      <pre className="text-gray-300 mt-1">
        {'components: ({\n  heading2: ({ children })'}<br />
      </pre>
    </div>
  </motion.div>
);

const PerformanceSection = () => {
  return (
    <section className="min-h-screen flex items-center py-24 px-8 relative overflow-hidden bg-[#0B1120]">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="relative flex justify-center">
              <CircularProgress />
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="absolute -bottom-8 right-12"
              >
                <CodeSnippet />
              </motion.div>
              
              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-full max-w-sm grid grid-cols-3 gap-4 mt-10">
                <MetricCard 
                  icon={Zap} 
                  title="Load Time" 
                  value="0.3s"
                  delay={1.4}
                />
                <MetricCard 
                  icon={Clock} 
                  title="Response" 
                  value="12ms"
                  delay={1.5}
                />
                <MetricCard 
                  icon={Server} 
                  title="Uptime" 
                  value="99.9%"
                  delay={1.6}
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2"
            >
              <motion.div 
                className="h-1 w-12 bg-gradient-to-r from-[#FF7452] to-[#EC4899] rounded-full"
                animate={{
                  width: ["3rem", "5rem", "3rem"]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity
                }}
              />
              <span className="text-[#FF7452] font-medium">La satisfaction avant tout</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-5xl font-bold text-white"
            >
              Nombre de Projets réalisés
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-gray-400 text-lg leading-relaxed"
            >
              Ici on vous presente nos projets realisés basé sur une architecture bien pensée, un design moderne et un code propre evolutif, scalable et maintenable.
            </motion.p>

            <motion.a
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              whileHover={{ x: 5, color: "#FF7452" }}
              href="#"
              className="inline-flex items-center gap-2 text-[#FF7452] hover:text-orange-400 font-medium"
            >
              Voir tous nos projets realisés
              <ArrowRight size={20} />
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PerformanceSection;