import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Plus, Users, Globe, Handshake } from 'lucide-react';

const PartnersSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    const section = document.getElementById('partners-section');
    if (section) observer.observe(section);
    
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Vrais logos des partenaires avec métadonnées
  const partnerLogos = [
    {
      name: "Orange Digital Center",
      url: "https://res.cloudinary.com/dxernpnkd/image/upload/v1740074459/phdwopu68sbb9ige7uic.png",
      alt: "ODC",
      category: "Technology & Innovation"
    },
    {
    name: "UNCHK",
      url: "https://www.unchk.sn/wp-content/uploads/2020/02/Logo_UN-Horizontal.png",
      alt: "UNCHK",
      category: "Education & Innovation"
    },
    {
      name: "EDP Senegal",
      url: "https://edpsenegal.com/wp-content/uploads/2025/02/cropped-Blue-Purple-Modern-Gradient-Computer-Service-and-Repair-Logo-Photoroom-1-150x150.png",
      alt: "EDP Senegal",
      category: "Art Oratoire"
    },
    {
      name: "Impact RSE",
      url: "https://impactrsesn.org/wp-content/uploads/2025/01/cropped-logoImpactRSE.jpg",
      alt: "Impact RSE",
      category: "RSE Sénégal",
    },
    {
      name: "SenTech Academy",
      url: "https://senegal.sentechacademy.com/wp-content/uploads/2022/08/d-removebg-preview.png",
      alt: "SenTech Academy",
      category: "Education"
    },
    {
      name: "Madjiguene Logistic",
      url: "https://madjiguenelogistic.com/assets/images/lmt.png",
      alt: "Madjiguene Logistic",
      category: "Logistique",
    },
    {
      name: "BayreHost",
      url: "https://bayrehost.com/wp-content/uploads/2021/06/mobile-logo-1.png",
      alt: "BayreHost",
      category: "Hébergement & Cloud",
    }


  ];

  // Tripler les logos pour un défilement fluide
  const scrollingLogos = [...partnerLogos, ...partnerLogos, ...partnerLogos];

  const stats = [
    { number: "50+", label: "Partenaires actifs", icon: Handshake },
    { number: "15+", label: "Pays couverts", icon: Globe },
    { number: "200+", label: "Projets réalisés", icon: Users }
  ];

  return (
    <section id="partners-section" className="relative py-12 sm:py-16 md:py-20 lg:py-32 overflow-hidden">
      {/* Background avancé avec motifs */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950" />
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
      
      {/* Container principal avec padding pour le titre */}
      <div className="relative max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12">
        {/* Badge avec animation */}
        <div className={`flex items-center gap-2 mb-6 sm:mb-8 ${isVisible ? 'animate-slide-in-left' : 'opacity-0'}`}>
          <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
          <span className="text-gray-300 text-xs sm:text-sm font-light tracking-wide uppercase">Nos Partenaires de confiance</span>
        </div>

        {/* Titre responsive avec tailles adaptées */}
        <h2 className={`text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-8 sm:mb-12 md:mb-16 lg:mb-20 leading-[1.1] max-w-6xl ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
            style={{ animationDelay: '300ms' }}>
          Des partenariats
          <span className="block sm:inline"> stratégiques</span>
          <br />
          <span className="text-gray-400 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
            pour votre transformation digitale
          </span>
        </h2>
      </div>

      {/* Section logos full width */}
      <div className={`relative w-full mb-16 sm:mb-20 md:mb-24 lg:mb-32 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
           style={{ animationDelay: '600ms' }}>
        
        {/* Défilement des logos ultra-optimisé - Full Width */}
        <div className="relative w-full overflow-hidden bg-gray-900/20 backdrop-blur-sm border-y border-gray-800/30 py-8 sm:py-12 md:py-16">
          {/* Gradients de fade sur les côtés */}
          <div className="absolute left-0 top-0 bottom-0 w-32 sm:w-48 md:w-64 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent pointer-events-none z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 sm:w-48 md:w-64 bg-gradient-to-l from-slate-950 via-slate-950/80 to-transparent pointer-events-none z-10" />
          
          <div 
            ref={scrollRef}
            className="flex animate-scroll-smooth gap-8 sm:gap-12 md:gap-16 lg:gap-20 items-center"
            style={{ '--scroll-width': isMobile ? '200px' : '320px' }}
          >
            {scrollingLogos.map((partner, index) => (
              <div
                key={index}
                className="flex-shrink-0 bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10 border border-gray-200/20 hover:border-orange-500/30 transition-all duration-500 hover:transform hover:scale-105 hover:-rotate-1 shadow-lg hover:shadow-orange-500/10 group relative"
                style={{ 
                  minWidth: isMobile ? '180px' : '280px', 
                  height: isMobile ? '100px' : '140px' 
                }}
              >
                <img
                  src={partner.url}
                  alt={partner.alt}
                  className="w-full h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
                  loading="lazy"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="hidden w-full h-full items-center justify-center text-gray-700 font-bold text-sm sm:text-base">
                  {partner.name}
                </div>
                
                {/* Tooltip avec catégorie */}
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-20">
                  {partner.category}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Container pour la section partenariat */}
      <div className="relative max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12">
        {/* Section Partenariat redesignée */}
        <div className={`text-center ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '900ms' }}>
          {/* Badge élégant */}
          <div className="inline-flex items-center gap-2 bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-full px-4 sm:px-6 py-2 sm:py-3 mb-6 sm:mb-8">
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
            <span className="text-gray-300 text-xs sm:text-sm font-light tracking-wider">Partenaire avec Sparkline</span>
          </div>

          {/* Titre impactant */}
          <h3 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-8 sm:mb-12 md:mb-16 leading-[1.1]">
            Construisons.
            <br />
            <span className="bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 text-transparent bg-clip-text">
              Ensemble.
            </span>
          </h3>

          {/* Logos avec animations avancées */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 md:gap-12 mb-12 sm:mb-16">
            {/* Logo Sparkline avec effet de brillance */}
            <div className="group relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 bg-white rounded-2xl sm:rounded-3xl flex items-center justify-center border-2 border-gray-800 hover:border-orange-500/50 transition-all duration-500 hover:scale-110 hover:rotate-3 shadow-xl hover:shadow-2xl hover:shadow-orange-500/20 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <img
                src="https://www.sparkline.sn/static/media/logo.26e5a02177f92c4ebf72.png"
                alt="Sparkline Logo"
                className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 object-contain group-hover:scale-110 transition-transform duration-300 relative z-10"
                loading="lazy"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              <div className="hidden text-orange-500 text-xl sm:text-2xl md:text-3xl font-bold relative z-10">S</div>
            </div>

            {/* Plus icon animé */}
            <div className="flex items-center justify-center">
              <Plus className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-orange-500/60 animate-pulse hover:text-orange-500 hover:rotate-90 transition-all duration-300" />
            </div>

            {/* Placeholder partenaire futur */}
            <div className="group relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl sm:rounded-3xl flex items-center justify-center border-2 border-gray-700 hover:border-blue-500/50 transition-all duration-500 hover:scale-110 hover:-rotate-3 shadow-xl hover:shadow-2xl hover:shadow-blue-500/20 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <div className="text-blue-400 text-lg sm:text-xl md:text-2xl font-bold group-hover:scale-110 transition-transform duration-300 relative z-10">
                Vous
              </div>
            </div>
          </div>

          {/* Description enrichie */}
          <div className="max-w-4xl mx-auto">
            <p className="text-gray-400 text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8">
              Rejoignez notre écosystème de partenaires et créons ensemble des solutions digitales innovantes qui transforment les entreprises au Sénégal et en Afrique.
            </p>
            
            {/* Avantages du partenariat */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-left">
              <div className="bg-gray-900/30 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-gray-800/30 hover:border-orange-500/30 transition-all duration-300 group">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-500/20 rounded-lg flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
                </div>
                <h4 className="text-white font-semibold text-sm sm:text-base mb-2">Expansion Géographique</h4>
                <p className="text-gray-400 text-xs sm:text-sm">Accédez à de nouveaux marchés grâce à notre réseau continental.</p>
              </div>
              
              <div className="bg-gray-900/30 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-gray-800/30 hover:border-orange-500/30 transition-all duration-300 group">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-500/20 rounded-lg flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
                </div>
                <h4 className="text-white font-semibold text-sm sm:text-base mb-2">Expertise Partagée</h4>
                <p className="text-gray-400 text-xs sm:text-sm">Bénéficiez de notre expertise technique et de nos bonnes pratiques.</p>
              </div>
              
              <div className="bg-gray-900/30 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-gray-800/30 hover:border-orange-500/30 transition-all duration-300 group">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-500/20 rounded-lg flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Handshake className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
                </div>
                <h4 className="text-white font-semibold text-sm sm:text-base mb-2">Croissance Mutuelle</h4>
                <p className="text-gray-400 text-xs sm:text-sm">Développons nos activités ensemble avec des synergies fortes.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-smooth {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-1 * var(--scroll-width) * 3));
          }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(40px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-scroll-smooth {
          animation: scroll-smooth 30s linear infinite;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        
        .animate-slide-in-left {
          animation: slide-in-left 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .animate-scroll-smooth:hover {
          animation-play-state: paused;
        }

        /* Breakpoints personnalisés */
        @media (max-width: 475px) {
          .xs\\:text-3xl { font-size: 1.875rem; }
          .xs\\:text-4xl { font-size: 2.25rem; }
        }

        /* Optimisations pour très petits écrans */
        @media (max-width: 360px) {
          .text-2xl { font-size: 1.5rem; }
          .text-3xl { font-size: 1.875rem; }
        }

        /* Mode sombre amélioré */
        @media (prefers-color-scheme: dark) {
          .bg-white\\/95 {
            background-color: rgba(15, 23, 42, 0.95);
          }
        }

        /* Réduction des animations pour accessibilité */
        @media (prefers-reduced-motion: reduce) {
          .animate-scroll-smooth,
          .animate-fade-in-up,
          .animate-slide-in-left,
          .animate-pulse {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
};

export default PartnersSection;