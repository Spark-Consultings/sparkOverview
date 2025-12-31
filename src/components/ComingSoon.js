import React, { useState, useEffect } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight, Check, Zap, Facebook, Instagram, Linkedin } from 'lucide-react';
import sparkLogo from '../assets/branding/sparkline-logo.png';

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
      className="group relative flex items-center p-1.5 rounded-2xl bg-white/60 backdrop-blur-xl border border-slate-200/60 shadow-lg hover:shadow-xl transition-all duration-500 max-w-sm mx-auto overflow-hidden"
    >
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition duration-500"
        style={{
          background: useMotionTemplate`
                        radial-gradient(
                        400px circle at ${mouseX}px ${mouseY}px,
                        rgba(249, 115, 22, 0.1),
                        transparent 80%
                        )
                    `,
        }}
      />
      {status === 'success' ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full h-[48px] flex items-center justify-center gap-2 text-green-700 font-medium bg-green-50/50 rounded-xl"
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
            className="flex-1 bg-transparent border-none outline-none px-4 text-slate-800 placeholder:text-slate-400 h-[48px] text-[15px] font-medium z-10"
          />
          <button
            onClick={handleSubmit}
            disabled={status === 'loading'}
            className="relative z-10 w-12 h-12 flex items-center justify-center bg-[#111] hover:bg-black text-white rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed shadow-md"
          >
            {status === 'loading' ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <ArrowRight className="w-5 h-5" strokeWidth={2} />
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
    <div className="relative h-screen w-full bg-[#FAFAFA] text-[#111] font-['Roboto'] overflow-hidden selection:bg-orange-500/20 flex flex-col justify-between">

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
      <nav className="relative z-20 w-full px-8 py-8 h-[10vh] flex justify-end" />

      {/* --- Main Content --- */}
      <main className="relative z-10 w-full max-w-7xl mx-auto px-6 h-[80vh] flex flex-col items-center justify-center">

        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center w-full max-w-4xl"
        >

          {/* Logo */}
          <motion.div variants={fadeInUp} className="mb-10">
            <motion.img
              src={sparkLogo}
              alt="Sparkline"
              className="h-20 sm:h-24 object-contain"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
          </motion.div>

          {/* Badge */}
          <motion.div variants={fadeInUp} className="mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white border border-slate-200/80 rounded-full shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
              </span>
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-600">Coming Soon</span>
            </div>
          </motion.div>

          {/* Headline - WITH FIX FOR CUT-OFF TEXT */}
          <motion.h1 variants={fadeInUp} className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-tight text-slate-900 mb-6 py-2">
            <span className="block text-slate-900">We are</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-br from-orange-500 via-orange-600 to-amber-700 pb-3">
              Cooking Something!
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p variants={fadeInUp} className="text-lg md:text-xl text-slate-500 max-w-lg mx-auto leading-relaxed mb-12 font-light">
            Refonte complète en cours. <br />
            <span className="font-normal text-slate-600">L'excellence digitale, réinventée.</span>
          </motion.p>

          {/* Input */}
          <motion.div variants={fadeInUp} className="w-full">
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
      <footer className="relative z-10 w-full h-[15vh] flex flex-col justify-end pb-8 items-center gap-6">
        <div className="flex gap-5">
          {socialLinks.map(({ Icon, href }, i) => (
            <a
              key={i}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center justify-center p-3 rounded-full bg-white border border-slate-200 shadow-sm hover:shadow-md hover:bg-slate-50 transition-all duration-300 hover:-translate-y-1"
            >
              <Icon size={18} strokeWidth={1.5} className="text-slate-500 group-hover:text-orange-600 transition-colors" />
            </a>
          ))}
        </div>
        <p className="text-[10px] text-slate-400 font-medium uppercase tracking-[0.2em] opacity-40">
          © 2025 Sparkline. Tous droits réservés.
        </p>
      </footer>

    </div>
  );
}
