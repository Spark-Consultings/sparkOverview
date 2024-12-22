import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Globe, 
  Play, 
  Monitor, 
  Zap,
  ArrowRight,
  Star,
  Rocket
} from 'lucide-react';
import logo from "../assets/logo.png";


// Animated Spark Effect Component
const SparkEffect = () => (
  <motion.div
    className="absolute inset-0"
    initial={{ opacity: 0 }}
    animate={{ opacity: [0, 1, 0] }}
    transition={{
      duration: 0.5,
      repeat: Infinity,
      repeatType: "reverse"
    }}
  >
    <div className="absolute w-full h-full bg-gradient-to-r from-orange-500/0 via-orange-500/20 to-orange-500/0" />
  </motion.div>
);

const FloatingSphere = ({ delay, x, y, scale, color }) => (
  <motion.div
    initial={{ opacity: 0, x: -50 }}
    animate={{ 
      opacity: 1,
      x: 0,
      y: [0, -10, 0],
    }}
    transition={{
      duration: 3,
      delay,
      y: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }}
    className={`absolute ${x} ${y} w-${scale} h-${scale} rounded-full bg-gradient-to-br ${color} blur-sm`}
  />
);

// Animated Button with hover effects
const AnimatedButton = ({ icon: Icon, text }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative px-6 py-3 rounded-full overflow-hidden bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold"
    >
      <div className="relative z-10 flex items-center space-x-2">
        <Icon size={20} />
        <span>{text}</span>
        <motion.div
          animate={{ x: isHovered ? 5 : 0 }}
          className="transition-transform"
        >
          <ArrowRight size={20} />
        </motion.div>
      </div>
      {isHovered && <SparkEffect />}
    </motion.button>
  );
};

const NavigationLink = ({ children }) => (
  <motion.a
    href="#"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="text-gray-200 hover:text-white transition-colors relative group"
  >
    {children}
    <motion.div
      className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full"
      transition={{ duration: 0.3 }}
    />
  </motion.a>
);

const FeatureButton = ({ icon: Icon, text }) => (
  <motion.button
    whileHover={{
      scale: 1.05,
      background: "linear-gradient(to right, #FF7A18, #AF002D)",
      boxShadow: "0px 8px 15px rgba(255, 122, 24, 0.3)",
    }}
    whileTap={{ scale: 0.95 }}
    className="flex items-center space-x-3 px-5 py-3 rounded-full text-sm font-medium text-white transition-all duration-300 ease-out bg-gradient-to-r from-orange-500 to-red-500 shadow-md hover:shadow-lg"
  >
    <div className="flex items-center justify-center w-8 h-8 bg-white rounded-full shadow-sm">
      <Icon size={20} className="text-orange-500" />
    </div>
    <span className="tracking-wide">{text}</span>
  </motion.button>
);


const SparkCard = ({ icon: Icon, title, content }) => (
  <motion.div
    whileHover={{
      y: -10,
      boxShadow: "0px 15px 30px rgba(255, 122, 24, 0.3)",
    }}
    className="p-6 bg-gradient-to-br from-orange-500/10 via-orange-500/5 to-transparent backdrop-blur-lg rounded-3xl border border-orange-500/20 shadow-lg transition-all duration-300 ease-out"
  >
    <div className="flex items-center justify-center w-12 h-12 mb-4 bg-orange-500/10 rounded-full shadow-md">
      <Icon size={24} className="text-orange-500" />
    </div>
    <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
    <p className="text-gray-300 leading-relaxed">{content}</p>
  </motion.div>
);


const Web4Landing = () => {
   const [scrollY, setScrollY] = useState(0);
  
    useEffect(() => {
      const handleScroll = () => setScrollY(window.scrollY);
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-30">
        <FloatingSphere delay={0} x="left-1/4" y="top-1/4" scale="24" color="from-orange-400 to-orange-600" />
        <FloatingSphere delay={0.2} x="right-1/3" y="top-1/2" scale="32" color="from-orange-500 to-red-500" />
        <FloatingSphere delay={0.4} x="left-1/2" y="bottom-1/4" scale="40" color="from-yellow-500 to-orange-500" />
      </div>

      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed w-full z-50 px-8 py-4"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            animate={{
              boxShadow: scrollY > 50 ? "0 4px 30px rgba(0, 0, 0, 0.1)" : "none",
            }}
            className="flex justify-between items-center p-4 rounded-full bg-white/5 backdrop-blur-lg border border-orange-500/20"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2"
            >
              {/* <Sparkles className="text-orange-500" size={24} /> */}
              <img src={logo} alt="Logo" className="ml-4 w-40" />

            </motion.div>

            <div className="flex items-center space-x-8">
              <AnimatedButton icon={Rocket} text="Launch App" />
            </div>
          </motion.div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <main className="relative pt-32 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-block px-4 py-1 bg-orange-500/10 rounded-full border border-orange-500/20"
              >
                <span className="text-orange-500">✨ Spark your innovation</span>
              </motion.div>

              <h1 className="text-6xl font-bold leading-tight">
                Ignite Your <span className="text-orange-500">Digital</span> Future
              </h1>

              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-gray-300 text-lg"
              >
                Transform your ideas into reality with our cutting-edge platform
              </motion.p>

              <div className="flex flex-wrap gap-4">
                <FeatureButton icon={Play} text="Watch Demo" />
                <FeatureButton icon={Globe} text="Explore Platform" />
              </div>
            </motion.div>

            {/* Interactive Elements */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative h-[600px]"
            >
              <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-6">
                <SparkCard 
                  icon={Monitor}
                  title="Smart Analytics"
                  content="Real-time insights for your business growth"
                />
                <SparkCard 
                  icon={Globe}
                  title="Global Reach"
                  content="Connect with users worldwide instantly"
                />
                <SparkCard 
                  icon={Sparkles}
                  title="AI Powered"
                  content="Advanced algorithms for optimal performance"
                />
                <SparkCard 
                  icon={Zap}
                  title="Lightning Fast"
                  content="Blazing fast performance and reliability"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Web4Landing;