import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from "framer-motion"
import { Menu, X, Facebook, Linkedin, Instagram, ChevronRight, Sparkles } from "lucide-react"
import SparklineLogo from "../assets/logo.png" // Assuming you have a separate component for the logo


const NavBar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("Accueil")
  const [hoverIndex, setHoverIndex] = useState(null)
  const navRef = useRef(null)

  // Advanced scroll animations
  const { scrollY } = useScroll()
  const navBackground = useTransform(scrollY, [0, 100], ["rgba(0, 0, 0, 0)", "rgba(10, 10, 20, 0.85)"])
  const navBlur = useTransform(scrollY, [0, 100], ["blur(0px)", "blur(12px)"])

  const menuItems = [
    { name: "Accueil", id: "hero-section" },
    { name: "Nos Services", id: "features-section" },
    { name: "Projets", id: "projects-section" },
    { name: "À Propos", id: "company-values-section" },
    { name: "Notre Équipe", id: "team-section" },
    { name: "Contact", id: "contact-section" },
  ]

  const socialLinks = [
    { icon: Facebook, href: "https://www.facebook.com/profile.php?id=61571444070883", label: "Facebook" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/sparkline-/", label: "LinkedIn" },
    { icon: Instagram, href: "https://www.instagram.com/sparkline221/", label: "Instagram" },
  ]

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 20)
  })

  useEffect(() => {
    const handleScroll = () => {
      const sections = menuItems.map((item) => document.getElementById(item.id))
      const currentSection = sections.find((section) => {
        if (!section) return false
        const rect = section.getBoundingClientRect()
        return rect.top <= 100 && rect.bottom >= 100
      })

      if (currentSection) {
        const activeItem = menuItems.find((item) => item.id === currentSection.id)
        if (activeItem) setActiveSection(activeItem.name)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const handleMobileNavClick = (sectionId) => {
    setMobileMenuOpen(false)
    setTimeout(() => {
      scrollToSection(sectionId)
    }, 300)
  }

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId)
    if (section) {
      const navHeight = navRef.current?.offsetHeight || 80
      const yOffset = -navHeight
      const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: "smooth" })
    }
  }

  // Enhanced animations
  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
  }

  const menuItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  }

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      clipPath: "circle(0% at top right)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 40,
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    open: {
      opacity: 1,
      clipPath: "circle(150% at top right)",
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 30,
        staggerChildren: 0.07,
        delayChildren: 0.1,
      },
    },
  }

  const mobileItemVariants = {
    closed: { x: -30, opacity: 0 },
    open: { x: 0, opacity: 1 },
  }

  return (
    <>
      <motion.nav
        ref={navRef}
        variants={navVariants}
        initial="hidden"
        animate="visible"
        style={{
          background: navBackground,
          backdropFilter: navBlur,
        }}
        className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300 border-b ${
          scrolled ? "border-purple-500/10" : "border-transparent"
        }`}
        role="navigation"
        aria-label="Navigation principale"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => scrollToSection("hero-section")}
            >
              <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => handleMobileNavClick('hero-section')}
            >
              <img className="w-32 lg:w-40 font-bold text-white" src={SparklineLogo} alt='Sparkline' />
            </motion.div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center">
              <div className="flex items-center bg-white/5 backdrop-blur-md rounded-full px-2 py-1 mr-6">
                {menuItems.map((item, i) => (
                  <motion.div
                    key={item.name}
                    custom={i}
                    variants={menuItemVariants}
                    initial="hidden"
                    animate="visible"
                    className="relative"
                    onHoverStart={() => setHoverIndex(i)}
                    onHoverEnd={() => setHoverIndex(null)}
                  >
                    <motion.button
                      className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-full ${
                        activeSection === item.name ? "text-white" : "text-gray-300 hover:text-white"
                      }`}
                      onClick={() => scrollToSection(item.id)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {item.name}
                      {hoverIndex === i && (
                        <motion.div
                          layoutId="navHover"
                          className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full -z-10"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        />
                      )}
                    </motion.button>
                    {activeSection === item.name && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute bottom-0 left-1/2 w-1 h-1 bg-purple-500 rounded-full -translate-x-1/2 translate-y-1"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Social Icons with glass effect */}
              <div className="flex items-center gap-1 bg-white/5 backdrop-blur-md rounded-full px-3 py-1.5">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon
                  return (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{
                        scale: 1.15,
                        backgroundColor: "rgba(255,255,255,0.1)",
                        rotate: 5,
                      }}
                      whileTap={{ scale: 0.9 }}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        transition: { delay: 0.3 + index * 0.1 },
                      }}
                      className="text-gray-400 hover:text-purple-400 transition-colors p-2 rounded-full"
                      aria-label={social.label}
                    >
                      <Icon size={18} />
                    </motion.a>
                  )
                })}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden relative z-50 w-10 h-10 flex items-center justify-center rounded-full bg-white/5 backdrop-blur-md text-white"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle menu mobile"
            >
              <AnimatePresence mode="wait">
                {mobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={20} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={20} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 z-40 lg:hidden pt-24 bg-gradient-to-b from-gray-900/95 to-black/95 backdrop-blur-xl"
          >
            <div className="h-full flex flex-col justify-between p-6 overflow-y-auto">
              <div className="space-y-2">
                {menuItems.map((item, i) => (
                  <motion.button
                    key={item.name}
                    variants={mobileItemVariants}
                    custom={i}
                    className={`group flex items-center w-full py-4 px-4 text-left rounded-xl transition-all ${
                      activeSection === item.name
                        ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white"
                        : "text-gray-300 hover:bg-white/5"
                    }`}
                    onClick={() => handleMobileNavClick(item.id)}
                  >
                    <span className="text-lg font-medium">{item.name}</span>
                    <motion.div
                      initial={false}
                      animate={{
                        x: activeSection === item.name ? 0 : -5,
                        opacity: activeSection === item.name ? 1 : 0,
                      }}
                      className="ml-auto"
                    >
                      <ChevronRight
                        size={18}
                        className={activeSection === item.name ? "text-purple-400" : "text-gray-500"}
                      />
                    </motion.div>
                  </motion.button>
                ))}
              </div>

              {/* Social Icons for Mobile */}
              <motion.div variants={mobileItemVariants} className="flex justify-center gap-6 py-6 mt-auto">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon
                  return (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{
                        scale: 1.2,
                        backgroundColor: "rgba(255,255,255,0.1)",
                      }}
                      whileTap={{ scale: 0.9 }}
                      className="text-gray-400 hover:text-purple-400 transition-all p-3 rounded-full bg-white/5"
                      aria-label={social.label}
                    >
                      <Icon size={20} />
                    </motion.a>
                  )
                })}
              </motion.div>

              <motion.div variants={mobileItemVariants} className="text-center text-xs text-gray-500 mt-6">
                © 2025 Sparkline
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default NavBar
