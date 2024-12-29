import React from 'react';
import Navbar from './Navbar';
import HeroSection from './HeroSection';
import FeaturesSection from './FeaturesSection';
import CustomCursor from './CustomCursor';
import FormLine from './FormLine';
import PerformanceSection from './PerformanceSection';
import FuturisticOurTeam from './FuturisticOurTeam';

const MainFeed = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      <CustomCursor />
      <Navbar />
      {/* Main Content */}
      <main className="flex flex-col">
        <HeroSection />
        <FeaturesSection />
        <PerformanceSection />
        <FuturisticOurTeam />
        <FormLine />
        {/* Footer */}
        <footer className="bg-gray-900 border-t border-gray-800 py-12 px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Brand Column */}
              <div className="space-y-4">
                <div className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-500 text-transparent bg-clip-text">
                  TechPlatform
                </div>
                <p className="text-gray-400">
                  Building the future of technology, one line of code at a time.
                </p>
              </div>
              
              {/* Quick Links */}
              {[
                {
                  title: "Product",
                  links: ["Features", "Solutions", "Pricing", "Enterprise"]
                },
                {
                  title: "Company",
                  links: ["About", "Careers", "Blog", "Press"]
                },
                {
                  title: "Resources",
                  links: ["Documentation", "Help Center", "Community", "Contact"]
                }
              ].map((column) => (
                <div key={column.title} className="space-y-4">
                  <h3 className="text-white font-medium">{column.title}</h3>
                  <ul className="space-y-2">
                    {column.links.map((link) => (
                      <li key={link}>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            
            <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-gray-400">
                © 2024 TechPlatform. All rights reserved.
              </div>
              <div className="flex items-center gap-6">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default MainFeed;