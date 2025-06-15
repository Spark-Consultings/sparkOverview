import React, { useState, useEffect } from 'react';
import { Users, ArrowRight, Plus } from 'lucide-react';

const PartnersSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const section = document.getElementById('partners-section');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  // Logos des clients inspirés de l'image
  const clients = [
    { name: "TechFlow", logo: "TF", color: "from-blue-500 to-cyan-500" },
    { name: "Oïo", logo: "oïo", color: "from-blue-400 to-blue-600" },
    { name: "Innovation Hub", logo: "IH", color: "from-purple-500 to-pink-500" },
    { name: "Institut Français", logo: "IF", color: "from-blue-600 to-blue-800" },
    { name: "Simplon", logo: "S", color: "from-red-500 to-orange-500" },
    { name: "Digital Force", logo: "DF", color: "from-green-500 to-teal-500" },
    { name: "Quality Center", logo: "QC", color: "from-blue-500 to-indigo-600" },
    { name: "Le Groupe", logo: "LG", color: "from-purple-600 to-purple-800" },
    { name: "Tech Pro", logo: "TP", color: "from-blue-400 to-cyan-600" },
    { name: "Atypic Digital", logo: "AD", color: "from-orange-500 to-red-600" }
  ];

  return (
    <section id="partners-section" className="relative py-20 md:py-32 overflow-hidden">
      {/* Background sombre minimaliste */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-slate-900 to-gray-950" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        
        {/* Section Clients */}
        <div className="mb-24 md:mb-32">
          {/* Badge Nos Clients */}
          <div className="flex items-center gap-2 mb-8">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <span className="text-gray-300 text-sm font-light tracking-wide">Nos Clients</span>
          </div>

          {/* Titre principal */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-16 md:mb-20 leading-tight max-w-5xl">
            Notre engagement à gagner la confiance
            <br />
            <span className="text-gray-400">de nos clients dans le monde entier</span>
          </h2>

          {/* Grille des logos clients */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8">
            {clients.map((client, index) => (
              <div
                key={index}
                className={`group relative bg-gray-900/50 backdrop-blur-sm rounded-2xl aspect-video flex items-center justify-center border border-gray-800/50 hover:border-gray-700/50 transition-all duration-500 hover:transform hover:-translate-y-1 ${
                  isVisible ? 'animate-fade-in-up' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Logo/Texte du client */}
                <div className={`text-lg md:text-xl font-bold bg-gradient-to-r ${client.color} text-transparent bg-clip-text group-hover:scale-110 transition-transform duration-300`}>
                  {client.logo}
                </div>
                
                {/* Effet de brillance au survol */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </div>
        </div>

        {/* Section Partenariat - Style Vercel */}
        <div className="text-center">
          {/* Badge Partner */}
          <div className="inline-block mb-8">
            <span className="text-gray-400 text-sm font-light tracking-wider">Partner with Sparkline</span>
          </div>

          {/* Titre principal */}
          <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-16 leading-tight">
            Let's build. Together.
          </h3>

          {/* Logos symboliques avec animation */}
          <div className="flex items-center justify-center gap-8 mb-16">
            {/* Logo Sparkline (triangle) */}
            <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-900 rounded-2xl flex items-center justify-center border border-gray-800 group hover:border-orange-500/50 transition-all duration-300">
              <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r from-orange-400 to-red-500 transform rotate-0 group-hover:rotate-180 transition-transform duration-500" 
                   style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}>
              </div>
            </div>

            {/* Plus icon */}
            <Plus className="w-8 h-8 md:w-10 md:h-10 text-gray-600" />

            {/* Logo Partenaire (montagnes) */}
            <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-900 rounded-2xl flex items-center justify-center border border-gray-800 group hover:border-blue-500/50 transition-all duration-300">
              <div className="text-blue-400 text-xl md:text-2xl font-bold group-hover:scale-110 transition-transform duration-300">
                ⛰️
              </div>
            </div>
          </div>

          {/* Boutons CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="group relative px-8 py-4 bg-white text-black rounded-xl font-medium hover:bg-gray-100 transition-all duration-300 hover:transform hover:-translate-y-1 active:scale-95 min-w-[200px]">
              <span className="flex items-center justify-center gap-2">
                Become a Partner
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </button>
            
            <button className="group relative px-8 py-4 bg-transparent text-white border border-gray-700 rounded-xl font-medium hover:border-gray-600 hover:bg-gray-900/50 transition-all duration-300 hover:transform hover:-translate-y-1 active:scale-95 min-w-[200px]">
              <span className="flex items-center justify-center gap-2">
                Find a Partner
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default PartnersSection;