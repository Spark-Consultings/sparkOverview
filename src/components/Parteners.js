import React, { useState, useEffect } from 'react';
import { ArrowRight, Plus } from 'lucide-react';

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

  // Vrais logos des partenaires avec leurs vraies URLs
  const partnerLogos = [
    {
      name: "Partner 1",
      url: "https://res.cloudinary.com/dxernpnkd/image/upload/v1740074459/phdwopu68sbb9ige7uic.png",
      alt: "Partenaire 1"
    },
    {
      name: "UN Women",
      url: "https://www.unchk.sn/wp-content/uploads/2020/02/Logo_UN-Horizontal.png",
      alt: "UN Women"
    },
    {
      name: "EDP Senegal",
      url: "https://edpsenegal.com/wp-content/uploads/2025/02/cropped-Blue-Purple-Modern-Gradient-Computer-Service-and-Repair-Logo-Photoroom-1-150x150.png",
      alt: "EDP Senegal"
    }
  ];

  // Dupliquer les logos pour un défilement continu
  const scrollingLogos = [...partnerLogos, ...partnerLogos, ...partnerLogos];

  return (
    <section id="partners-section" className="relative py-20 md:py-32 overflow-hidden">
      {/* Background avec les couleurs Sparkline */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-gray-900 to-slate-950" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        
        {/* Section Clients/Partenaires */}
        <div className="mb-24 md:mb-32">
          {/* Badge Nos Partenaires avec les couleurs Sparkline */}
          <div className="flex items-center gap-2 mb-8">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            <span className="text-gray-300 text-sm font-light tracking-wide">Nos Partenaires</span>
          </div>

          {/* Titre principal */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-16 md:mb-20 leading-tight max-w-5xl">
            Des partenariats stratégiques
            <br />
            <span className="text-gray-400">pour votre croissance digitale</span>
          </h2>

          {/* Défilement automatique des logos partenaires */}
          <div className="relative overflow-hidden">
            <div className="flex animate-scroll gap-12 items-center">
              {scrollingLogos.map((partner, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-gray-800/50 hover:border-orange-500/30 transition-all duration-500 hover:transform hover:scale-105"
                  style={{ minWidth: '200px', height: '120px' }}
                >
                  <img
                    src={partner.url}
                    alt={partner.alt}
                    className="w-full h-full object-contain filter brightness-90 hover:brightness-100 transition-all duration-300"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="hidden w-full h-full items-center justify-center text-gray-400 font-medium">
                    {partner.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section Partenariat avec Sparkline */}
        <div className="text-center">
          {/* Badge Partner */}
          <div className="inline-block mb-8">
            <span className="text-gray-400 text-sm font-light tracking-wider">Partenaire avec Sparkline</span>
          </div>

          {/* Titre principal */}
          <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-16 leading-tight">
            Construisons. Ensemble.
          </h3>

          {/* Logos avec le vrai logo Sparkline */}
          <div className="flex items-center justify-center gap-8 mb-16">
            {/* Logo Sparkline réel */}
            <div className="w-20 h-20 md:w-24 md:h-24 bg-white rounded-2xl flex items-center justify-center border border-gray-800 group hover:border-orange-500/50 transition-all duration-300 hover:scale-105">
              <img
                src="https://www.sparkline.sn/static/media/logo.26e5a02177f92c4ebf72.png"
                alt="Sparkline Logo"
                className="w-12 h-12 md:w-16 md:h-16 object-contain group-hover:scale-110 transition-transform duration-300"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              <div className="hidden text-orange-500 text-xl md:text-2xl font-bold">S</div>
            </div>

            {/* Plus icon avec couleurs Sparkline */}
            <Plus className="w-8 h-8 md:w-10 md:h-10 text-orange-500/60" />

            {/* Placeholder pour logo partenaire */}
            <div className="w-20 h-20 md:w-24 md:h-24 bg-gray-900 rounded-2xl flex items-center justify-center border border-gray-800 group hover:border-blue-500/50 transition-all duration-300 hover:scale-105">
              <div className="text-blue-400 text-xl md:text-2xl font-bold group-hover:scale-110 transition-transform duration-300">
                Vous
              </div>
            </div>
          </div>

          {/* Boutons CTA avec les couleurs Sparkline */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="group relative px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-medium hover:from-orange-600 hover:to-red-600 transition-all duration-300 hover:transform hover:-translate-y-1 active:scale-95 min-w-[200px] shadow-lg hover:shadow-orange-500/25">
              <span className="flex items-center justify-center gap-2">
                Devenir Partenaire
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </button>
            
            <button className="group relative px-8 py-4 bg-transparent text-white border border-gray-700 rounded-xl font-medium hover:border-orange-500/50 hover:bg-orange-500/10 transition-all duration-300 hover:transform hover:-translate-y-1 active:scale-95 min-w-[200px]">
              <span className="flex items-center justify-center gap-2">
                Trouver un Partenaire
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </button>
          </div>

          {/* Description supplémentaire */}
          <p className="text-gray-400 mt-8 max-w-2xl mx-auto leading-relaxed">
            Rejoignez notre écosystème de partenaires et créons ensemble des solutions digitales innovantes qui transforment les entreprises au Sénégal et en Afrique.
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        
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
        
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default PartnersSection;