import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Facebook,
  Instagram,
} from "lucide-react";
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-950 border-t border-gray-800">
      {/* Section principale */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          
          {/* Brand Section */}
          <div className="lg:col-span-1 space-y-6">
            <div className="space-y-3">
              <img
                alt="logo Sparkline"
                src={logo}
                className="w-48 h-auto"
              />
              <p className="text-gray-400 text-sm leading-relaxed">
                Spark the Change, Illuminate Success
              </p>
            </div>
          </div>

          {/* Contact & Social */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Contact */}
              <div className="space-y-4">
                <h3 className="text-white font-medium text-sm uppercase tracking-wider">
                  Contact
                </h3>
                <div className="space-y-3">
                  <a 
                    href="mailto:spark221@gmail.com"
                    className="flex items-center gap-3 text-gray-400 hover:text-orange-400 transition-colors text-sm group"
                  >
                    <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span>spark221@gmail.com</span>
                  </a>
                  <a 
                    href="tel:+221785286330"
                    className="flex items-center gap-3 text-gray-400 hover:text-orange-400 transition-colors text-sm group"
                  >
                    <Phone className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span>+221 78 528 63 30</span>
                  </a>
                  <div className="flex items-center gap-3 text-gray-400 text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>Dakar, Senegal</span>
                  </div>
                </div>
              </div>

              {/* Social */}
              <div className="space-y-4">
                <h3 className="text-white font-medium text-sm uppercase tracking-wider">
                  Suivez-nous
                </h3>
                <div className="flex gap-4">
                  <a
                    href="https://www.linkedin.com/in/sparkline-/"
                    className="w-10 h-10 bg-gray-800 hover:bg-orange-500 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin className="w-4 h-4 text-gray-400 group-hover:text-white" />
                  </a>
                  <a
                    href="https://www.facebook.com/profile.php?id=61571444070883"
                    className="w-10 h-10 bg-gray-800 hover:bg-orange-500 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Facebook className="w-4 h-4 text-gray-400 group-hover:text-white" />
                  </a>
                  <a
                    href="https://instagram.com/SPARKLINE"
                    className="w-10 h-10 bg-gray-800 hover:bg-orange-500 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Instagram className="w-4 h-4 text-gray-400 group-hover:text-white" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright minimal */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-xs">
              © 2025 Sparkline. Tous droits réservés.
            </p>
            <div className="flex items-center gap-6 text-xs">
              <button className="text-gray-500 hover:text-gray-300 transition-colors">
                Confidentialité
              </button>
              <button className="text-gray-500 hover:text-gray-300 transition-colors">
                Conditions
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;