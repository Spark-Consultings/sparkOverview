import React, { useState, useEffect } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, Zap, Facebook, Instagram, Linkedin, PartyPopper } from 'lucide-react';
import sparkLogo from '../assets/branding/sparkline-logo.png';

// --- Confetti & Fireworks Component (New Year Special) ---
const NewYearCelebration = () => {
  // Confetti pieces
  const confettiCount = 15;
  const confetti = Array.from({ length: confettiCount });

  // Fireworks bursts
  const [fireworks, setFireworks] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Add a new firework burst periodically
      const id = Date.now();
      setFireworks(prev => [...prev, { id, x: Math.random() * 80 + 10, y: Math.random() * 60 + 10 }]);
      // Remove firework after animation
      setTimeout(() => {
        setFireworks(prev => prev.filter(fw => fw.id !== id));
      }, 2000);
    }, 800); // New firework every 0.8s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-50">
      {/* Falling Confetti */}
      {confetti.map((_, i) => (
        <motion.div
          key={`confetti-${i}`}
          className="absolute w-1.5 h-3 rounded-[1px]"
          style={{
            backgroundColor: i % 2 === 0 ? '#fb923c' : (i % 3 === 0 ? '#fbbf24' : '#e2e8f0'), // Orange, Amber, Slate
            top: -20,
            left: `${Math.random() * 100}%`
          }}
          animate={{
            y: ['0vh', '100vh'],
            rotateX: [0, 360],
            rotateY: [0, 360],
            x: [0, (Math.random() - 0.5) * 100] // Drifting
          }}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 5
          }}
        />
      ))}

      {/* Subtle Fireworks */}
      <AnimatePresence>
        {fireworks.map(fw => (
          <FireworkBurst key={fw.id} x={fw.x} y={fw.y} />
        ))}
      </AnimatePresence>
    </div>
  );
};

const FireworkBurst = ({ x, y }) => {
  const particleCount = 24;
  const sparkleCount = 12; // New secondary sparkles
  const colors = ['#fb923c', '#f59e0b', '#fbbf24', '#ffffff', '#fdba74'];

  return (
    <div className="absolute z-50 pointer-events-none" style={{ top: `${y}%`, left: `${x}%` }}>
      {/* 1. Shockwave Ring - Explosive expansion */}
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-orange-200/50"
        initial={{ width: 0, height: 0, opacity: 0.8, borderWidth: 4 }}
        animate={{ width: 200, height: 200, opacity: 0, borderWidth: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />

      {/* 2. Main Explosion Particles (With Trails) */}
      {Array.from({ length: particleCount }).map((_, i) => {
        const angle = (i * 360) / particleCount + Math.random() * 10;
        const radius = Math.random() * 80 + 50;
        const color = colors[Math.floor(Math.random() * colors.length)];

        return (
          <motion.div
            key={`p-${i}`}
            className="absolute w-1 h-1 rounded-full"
            style={{
              backgroundColor: color,
              boxShadow: `0 0 6px ${color}` // Glow effect
            }}
            initial={{ scale: 0, opacity: 1, x: 0, y: 0 }}
            animate={{
              x: Math.cos(angle * (Math.PI / 180)) * radius,
              y: [
                0,
                Math.sin(angle * (Math.PI / 180)) * radius,
                Math.sin(angle * (Math.PI / 180)) * radius + 60 // Gravity fall
              ],
              opacity: [1, 1, 0],
              scale: [1.5, 1, 0]
            }}
            transition={{
              duration: 1.2 + Math.random(),
              ease: [0.15, 1, 0.3, 1], // Strong "Pop" curve
            }}
          />
        );
      })}

      {/* 3. Lingering Sparkles (Twinkling Glitters) */}
      {Array.from({ length: sparkleCount }).map((_, i) => {
        const angle = Math.random() * 360;
        const radius = Math.random() * 40 + 20;

        return (
          <motion.div
            key={`s-${i}`}
            className="absolute w-0.5 h-0.5 bg-white rounded-full"
            initial={{ scale: 0, opacity: 0, x: 0, y: 0 }}
            animate={{
              x: Math.cos(angle * (Math.PI / 180)) * radius,
              y: Math.sin(angle * (Math.PI / 180)) * radius + 20, // Gentle float
              opacity: [0, 1, 0, 1, 0], // Twinkle
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 2 + Math.random(),
              delay: 0.1,
              ease: "easeOut"
            }}
          />
        );
      })}

      {/* 4. Intense Center Flash */}
      <motion.div
        className="absolute w-8 h-8 bg-white/80 rounded-full -translate-x-1/2 -translate-y-1/2 blur-xl"
        initial={{ scale: 0, opacity: 1 }}
        animate={{ scale: 2.5, opacity: 0 }}
        transition={{ duration: 0.2 }}
      />
    </div>
  );
};


// --- Floating Lines Background Component ---
const FloatingPaths = ({ position }) => {
  const paths = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${380 - i * 5 * position
      } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${152 - i * 5 * position
      } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${684 - i * 5 * position
      } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    color: `rgba(15, 23, 42, ${0.2 + i * 0.05})`,
    width: 1 + i * 0.1,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg className="w-full h-full text-slate-400" viewBox="0 0 696 316" fill="none">
        <title>Floating Paths</title>
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={0.2 + path.id * 0.05}
            initial={{ pathLength: 0.3, opacity: 0.6 }}
            animate={{
              pathLength: 1,
              opacity: [0.3, 0.6, 0.3],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  );
};

// --- Spark Particles ---
const SparkParticles = () => {
  const particles = Array.from({ length: 40 });

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-orange-500 shadow-sm"
          initial={{
            x: Math.random() * 100 + "%",
            y: Math.random() * 100 + "%",
            scale: 0,
            opacity: 0
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
            y: [0, -50, -100]
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeOut"
          }}
          style={{
            width: Math.random() * 4 + 2 + "px",
            height: Math.random() * 4 + 2 + "px",
          }}
        />
      ))}
    </div>
  );
};

// --- Minimal Glass Input ---
const MinimalGlassInput = ({ email, setEmail, status, handleSubmit }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = ({ currentTarget, clientX, clientY }) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="group relative flex items-center p-2 rounded-[24px] bg-white/60 backdrop-blur-2xl border border-white/50 shadow-lg hover:shadow-2xl transition-all duration-500 max-w-sm mx-auto overflow-hidden ring-1 ring-white/40"
    >
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition duration-500"
        style={{
          background: useMotionTemplate`
                        radial-gradient(
                        450px circle at ${mouseX}px ${mouseY}px,
                        rgba(249, 115, 22, 0.15),
                        transparent 80%
                        )
                    `,
        }}
      />
      {status === 'success' ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full h-[52px] flex items-center justify-center gap-2 text-green-700 font-medium bg-green-50/50 rounded-[20px]"
        >
          <Check className="w-5 h-5" />
          <span className="text-sm">You are on the list!</span>
        </motion.div>
      ) : (
        <>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@company.com"
            className="flex-1 bg-transparent border-none outline-none px-4 text-slate-800 placeholder:text-slate-400/80 h-[52px] text-[15px] font-medium z-10"
          />
          <button
            onClick={handleSubmit}
            disabled={status === 'loading'}
            className="relative z-10 w-12 h-12 flex items-center justify-center bg-[#0F172A] hover:bg-black text-white rounded-[18px] transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
          >
            {status === 'loading' ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
            )}
          </button>
        </>
      )}
    </div>
  );
}

export default function ComingSoon() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  // Mouse tracking for background effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring animation for the gradient
  const springX = useSpring(mouseX, { stiffness: 40, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 25 });

  // Background parallax movement
  const bgX = useSpring(mouseX, { stiffness: 20, damping: 30 });
  const bgY = useSpring(mouseY, { stiffness: 20, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1500);
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  const stagger = {
    visible: { transition: { staggerChildren: 0.15 } }
  };

  const socialLinks = [
    { Icon: Linkedin, href: "https://www.linkedin.com/in/sparkline-/" },
    { Icon: Facebook, href: "https://www.facebook.com/profile.php?id=61571444070883" },
    { Icon: Instagram, href: "https://instagram.com/SPARKLINE" }
  ];

  return (
    <div className="relative min-h-[100dvh] w-full bg-[#FAFAFA] text-[#111] font-['Roboto'] overflow-hidden selection:bg-orange-500/20 flex flex-col justify-between">

      {/* --- New Year Celebration Layer --- */}
      <NewYearCelebration />

      {/* --- Dual Layer Background --- */}
      <div className="absolute inset-0 z-0 overflow-hidden">

        {/* Layer 1: Deep Background (The 'Back' Plane) */}
        <div className="absolute inset-0 z-0 scale-110">
          {/* Static Base */}
          <div className="absolute inset-0 bg-[#FAFAFA]" />

          {/* Deep Moving Lines */}
          <FloatingPaths position={1} />

          {/* Deep Sparks */}
          <SparkParticles />
        </div>

        {/* Layer 2: Superimposed Blur Layer (The 'Front' Glass Plane) */}
        {/* This layer moves slightly differently to create depth/separation */}
        <motion.div
          className="absolute inset-0 z-10 opacity-60 mix-blend-multiply pointer-events-none"
          style={{ x: bgX, y: bgY }} // Reacts to mouse for parallax
        >
          {/* Massive Blur Blob 1 */}
          <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-orange-200/30 rounded-full blur-[100px]" />

          {/* Massive Blur Blob 2 */}
          <div className="absolute bottom-[-20%] right-[-10%] w-[80vw] h-[80vw] bg-amber-100/30 rounded-full blur-[120px]" />
        </motion.div>

        {/* Layer 3: The "Motion Blur" Mouse Follower (Superimposed on top) */}
        <motion.div
          className="absolute inset-0 z-20 pointer-events-none mix-blend-overlay"
          style={{
            background: useMotionTemplate`
                    radial-gradient(
                        600px circle at ${springX}px ${springY}px,
                        rgba(255, 255, 255, 0.8),
                        transparent 50%
                    )
                `,
            backdropFilter: 'blur(3px)' // Subtle blur on the "lens"
          }}
        />

        {/* Foreground Floating Elements (Sharp) */}
        <div className="relative z-30">
          <FloatingPaths position={-1} /> {/* A second set of lines that feels "closer" */}
        </div>
      </div>

      {/* --- Navbar --- */}
      <nav className="relative z-20 w-full px-6 py-4 flex-none flex justify-end" />

      {/* --- Main Content --- */}
      <main className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 flex-1 flex flex-col items-center justify-center min-h-0">

        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center w-full max-w-4xl"
        >

          {/* --- New Year Badge --- */}
          <motion.div
            variants={fadeInUp}
            className="mb-4 overflow-hidden rounded-full shadow-lg border border-orange-200 scale-90 sm:scale-100"
            animate={{
              boxShadow: ["0px 0px 0px rgba(251, 146, 60, 0)", "0px 10px 30px rgba(251, 146, 60, 0.3)", "0px 0px 0px rgba(251, 146, 60, 0)"]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <div className="relative bg-white px-4 py-1.5 flex items-center gap-2">
              <PartyPopper className="w-3.5 h-3.5 text-orange-500 animate-bounce" />
              <span className="text-xs sm:text-sm font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-amber-600 tracking-wider">
                HAPPY NEW YEAR 2026
              </span>
            </div>
          </motion.div>


          {/* Logo */}
          <motion.div variants={fadeInUp} className="mb-4 sm:mb-6">
            <motion.img
              src={sparkLogo}
              alt="Sparkline"
              className="h-12 sm:h-16 md:h-20 object-contain"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
          </motion.div>

          {/* Badge (Standard) */}
          <motion.div variants={fadeInUp} className="mb-4 sm:mb-6 opacity-80">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 bg-white border border-slate-200/80 rounded-full shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
              </span>
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-slate-600">Coming Soon</span>
            </div>
          </motion.div>

          {/* Headline - Responsive typography */}
          <motion.h1 variants={fadeInUp} className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight text-slate-900 mb-4 py-1">
            <span className="block text-slate-900">We are</span>
            {/* Added pb-3 to prevent gradient text clipping descending letters */}
            <span className="block text-transparent bg-clip-text bg-gradient-to-br from-orange-500 via-orange-600 to-amber-700 pb-2">
              Cooking Something!
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p variants={fadeInUp} className="text-sm sm:text-base md:text-lg text-slate-500 max-w-lg mx-auto leading-relaxed mb-6 sm:mb-8 font-light px-4">
            Refonte complète en cours. <br />
            <span className="font-normal text-slate-600">L'excellence digitale, réinventée.</span>
          </motion.p>

          {/* Input */}
          <motion.div variants={fadeInUp} className="w-full px-4 sm:px-0 mb-2">
            <MinimalGlassInput
              email={email}
              setEmail={setEmail}
              status={status}
              handleSubmit={handleSubmit}
            />
          </motion.div>

        </motion.div>
      </main>

      {/* --- Footer --- */}
      <footer className="relative z-20 w-full flex-none flex flex-col justify-end pb-6 pt-2 items-center gap-4">
        <div className="flex gap-4">
          {socialLinks.map(({ Icon, href }, i) => (
            <a
              key={i}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center justify-center w-10 h-10 rounded-full bg-white/60 backdrop-blur-md border border-white/50 shadow-sm hover:shadow-lg hover:bg-white/90 transition-all duration-300 hover:-translate-y-1"
            >
              <Icon size={18} strokeWidth={1.5} className="text-slate-600 group-hover:text-orange-600 transition-colors" />
            </a>
          ))}
        </div>
        <p className="text-[9px] text-slate-400 font-medium uppercase tracking-[0.2em] opacity-40">
          © 2025 Sparkline. Tous droits réservés.
        </p>
      </footer>

    </div>
  );
}
