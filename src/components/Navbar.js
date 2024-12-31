import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import logo from "../assets/logo.png";

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('Accueil');

  const menuItems = [
    { name: 'Accueil', id: 'hero-section' },
    { name: 'Nos Services', id: 'features-section' },
    { name: 'Projets', id: 'performance-section' },
    { name: 'À Propos', id: 'company-values-section' },
    { name: 'Notre Équipe', id: 'team-section' },
    { name: 'Contact', id: 'contact-section' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      const sections = menuItems.map(item => document.getElementById(item.id));
      const currentSection = sections.find(section => {
        if (!section) return false;
        const rect = section.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });

      if (currentSection) {
        const activeItem = menuItems.find(item => item.id === currentSection.id);
        if (activeItem) setActiveSection(activeItem.name);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMobileNavClick = (sectionId) => {
    setMobileMenuOpen(false);
    setTimeout(() => {
      const section = document.getElementById(sectionId);
      if (section) {
        const navHeight = 80;
        const yOffset = -navHeight;
        const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 300);
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const navHeight = 80;
      const yOffset = -navHeight;
      const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const navVariants = {
    hidden: { y: -100 },
    visible: { 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    }
  };

  return (
    <>
      <motion.nav
        variants={navVariants}
        initial="hidden"
        animate="visible"
        className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300 ${
          scrolled ? 'bg-gray-900/90 backdrop-blur-lg shadow-lg' : 'bg-transparent'
        }`}
        role="navigation"
        aria-label="Navigation principale"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => handleMobileNavClick('hero-section')}
            >
              <img className="w-32 lg:w-40 font-bold text-white" src={logo} alt='Logo Spakline' />
            </motion.div>

            <div className="hidden lg:flex items-center space-x-8">
              {menuItems.map((item) => (
                <div 
                  key={item.name}
                  className="relative group"
                >
                  <motion.button 
                    className={`text-gray-300 hover:text-white transition-colors py-2 ${
                      activeSection === item.name ? 'text-white' : ''
                    }`}
                    onClick={() => scrollToSection(item.id)}
                    whileHover={{ scale: 1.05 }}
                  >
                    {item.name}
                    <div className={`absolute bottom-0 left-0 w-full h-0.5 bg-orange-500 
                      ${activeSection === item.name ? 'scale-x-100' : 'scale-x-0'} 
                      group-hover:scale-x-100 transition-transform duration-300 origin-left`} 
                    />
                  </motion.button>
                </div>
              ))}
            </div>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-white p-2 rounded-lg"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle menu mobile"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-x-0 top-[72px] bg-gray-900/95 backdrop-blur-lg z-40 lg:hidden overflow-hidden"
          >
            <div className="p-4 space-y-2">
              {menuItems.map((item) => (
                <motion.button
                  key={item.name}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className={`block w-full text-left py-3 px-4 text-gray-300 hover:text-white transition-colors rounded-lg hover:bg-gray-800 ${
                    activeSection === item.name ? 'text-white bg-gray-800' : ''
                  }`}
                  onClick={() => handleMobileNavClick(item.id)}
                >
                  {item.name}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavBar;