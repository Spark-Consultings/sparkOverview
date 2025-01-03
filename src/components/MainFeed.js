import React from "react";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
import CustomCursor from "./CustomCursor";
import FormLine from "./FormLine";
import PerformanceSection from "./PerformanceSection";
import logo from "../assets/logo.png";
import FuturisticOurTeam from "./FuturisticOurTeam";
import ProjectsSection from "./ProjectsSection";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  HelpCircle,
  Shield,
  FileText,
} from "lucide-react";
import CompanyValuesSection from "./CompanyValuesSection";
import { GlobalStyles, ScrollToTop } from './scroll-components';
import { SpeedInsights } from "@vercel/speed-insights/react"

const orangeIconClass = "w-5 h-5 text-orange-400";

const MainFeed = () => {
  return (
    <div className="min-h-screen  bg-gray-900">
      <SpeedInsights/>
      <CustomCursor />
      <GlobalStyles />
      <ScrollToTop />
      <Navbar />
      {/* Main Content ! */}
      <main className="flex flex-col ">
        <section id="hero-section">
          <HeroSection />
        </section>
        <section id="features-section">
          <FeaturesSection />
        </section>
        <section id="performance-section">
          <PerformanceSection />
        </section>
        <section className="pt-12" id="projects-section">
          <ProjectsSection />
        </section>
        <section id="company-values-section">
          <CompanyValuesSection />
        </section>
        <section id="team-section">
          <FuturisticOurTeam />
        </section>
        <section id="contact-section">
          <FormLine />
        </section>
      
        
        {/* Footer */}
        <footer className="bg-gray-900 border-t border-gray-800 py-12 px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Brand Column */}
              <div className="space-y-4">
                <img
                  alt="logo Sparkline"
                  src={logo}
                  className="text-2xl w-11/12 font-bold bg-gradient-to-r from-orange-400 to-red-500 text-transparent bg-clip-text"
                />
                <p className="text-gray-400">
                  Spark the Change, Illuminate Success
                </p>
              </div>

              {/* Quick Links */}
              {[
                {
                  title: "Contacts",
                  links: [
                    {
                      icon: <Mail className={orangeIconClass} />,
                      text: "spark221@gmail.com",
                    },
                    {
                      icon: <Phone className={orangeIconClass} />,
                      text: "+221 78 528 63 30",
                    },
                    {
                      icon: <MapPin className={orangeIconClass} />,
                      text: "Dakar, Senegal",
                    },
                  ],
                },
                {
                  title: "Réseaux Sociaux",
                  links: [
                    {
                      icon: <Linkedin className={orangeIconClass} />,
                      text: "LinkedIn",
                      url: "https://www.linkedin.com/in/sparkline-/",
                    },
                    {
                      icon: <Facebook className={orangeIconClass} />,
                      text: "Facebook",
                      url: "https://www.facebook.com/profile.php?id=61571444070883",
                    },
                    {
                      icon: <Instagram className={orangeIconClass} />,
                      text: "Instagram",
                      url: "https://instagram.com/SPARKLINE",
                    },
                  ],
                },
                {
                  title: "Informations",
                  links: [
                    {
                      icon: <HelpCircle className={orangeIconClass} />,
                      text: "FAQ",
                    },
                    {
                      icon: <Shield className={orangeIconClass} />,
                      text: "Support Technique",
                    },
                  ],
                },
              ].map((column) => (
                <div key={column.title} className="space-y-4">
                  <h3 className="text-white font-medium">{column.title}</h3>
                  <ul className="space-y-2">
                    {column.links.map((link) => (
                      <li
                        key={link.text}
                        className="flex items-center space-x-2"
                      >
                        {link.icon}
                        {link.url ? (
                          <a
                            href={link.url}
                            className="text-gray-400 hover:text-white transition-colors"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {link.text}
                          </a>
                        ) : (
                          <span className="text-gray-400">{link.text}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-gray-400">
                © 2025 Sparkline. Tous droits réservés.
              </div>
              <div className="flex items-center gap-6">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Politique de confidentialité
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Conditions d'utilisation
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Politique sur les cookies
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
