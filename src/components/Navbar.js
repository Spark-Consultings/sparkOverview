import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, ExternalLink, Search } from 'lucide-react';

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when screen size changes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuItems = [
    { 
      label: 'Products',
      submenu: ['Analytics Platform', 'Cloud Solutions', 'Enterprise Suite']
    },
    {
      label: 'Solutions',
      submenu: ['For Startups', 'For Enterprise', 'For Developers']
    },
    { 
      label: 'Resources',
      submenu: ['Documentation', 'API Reference', 'Community']
    },
    { 
      label: 'Company',
      submenu: ['About Us', 'Careers', 'Contact']
    }
  ];

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

  const dropdownVariants = {
    hidden: { 
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.2
      }
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 30
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
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.a
              href="/"
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2"
            >
              <div className="text-2xl font-bold text-white">LOGO</div>
            </motion.a>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {menuItems.map((item) => (
                <div 
                  key={item.label} 
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button 
                    className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors"
                    aria-expanded={activeDropdown === item.label}
                    aria-haspopup="true"
                  >
                    <span>{item.label}</span>
                    <motion.span
                      animate={{ rotate: activeDropdown === item.label ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown size={16} />
                    </motion.span>
                  </button>
                  
                  <AnimatePresence>
                    {activeDropdown === item.label && (
                      <motion.div
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className="absolute top-full left-0 mt-2"
                      >
                        <div className="py-3 px-4 bg-gray-800 rounded-xl border border-orange-500/20 backdrop-blur-xl min-w-[220px] shadow-xl">
                          {item.submenu.map((subItem) => (
                            <motion.a
                              key={subItem}
                              href="#"
                              whileHover={{ x: 4 }}
                              className="block py-2 text-gray-300 hover:text-white transition-colors"
                            >
                              {subItem}
                            </motion.a>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 text-gray-300 hover:text-white transition-colors rounded-lg"
                onClick={() => setSearchOpen(!searchOpen)}
                aria-label="Search"
              >
                <Search size={20} />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
              >
                Sign In
              </motion.button>
              
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 0 20px rgba(249, 115, 22, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl text-white flex items-center gap-2 shadow-lg"
              >
                Get Started
                <ExternalLink size={16} />
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white p-2 rounded-lg"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-gray-900/95 backdrop-blur-xs z-50 p-4"
          >
            <div className="max-w-3xl mx-auto mt-20">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full bg-gray-800 text-white px-6 py-4 rounded-xl border border-orange-500/20 focus:outline-none focus:border-orange-500/40"
                  autoFocus
                />
                <button
                  onClick={() => setSearchOpen(false)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <X size={24} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-[72px] p-4 bg-gray-900/95 backdrop-blur-lg z-40 md:hidden"
          >
            <div className="space-y-4">
              {menuItems.map((item) => (
                <div key={item.label} className="space-y-2">
                  <div className="text-white font-medium">{item.label}</div>
                  <div className="pl-4 space-y-2">
                    {item.submenu.map((subItem) => (
                      <motion.a
                        key={subItem}
                        href="#"
                        whileHover={{ x: 4 }}
                        className="block text-gray-300 hover:text-white transition-colors"
                      >
                        {subItem}
                      </motion.a>
                    ))}
                  </div>
                </div>
              ))}
              <div className="pt-4 space-y-4">
                <button className="w-full px-4 py-2 text-gray-300 hover:text-white transition-colors">
                  Sign In
                </button>
                <button className="w-full px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl text-white flex items-center justify-center gap-2">
                  Get Started
                  <ExternalLink size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavBar;