import React from "react";
import {
  Sparkles,
  LayoutDashboard,
  PenTool,
  Film,
  GraduationCap,
  MonitorSmartphone,
  ArrowRight,
} from "lucide-react";

const ServiceCard = ({ icon: Icon, title, description, index }) => (
  <div className="group relative">
    {/* Subtle glow effect */}
    <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-3xl blur opacity-0 group-hover:opacity-100 transition-all duration-500" />
    
    <div className="relative p-8 bg-gray-900/30 backdrop-blur-sm rounded-3xl border border-gray-800/50 hover:border-gray-700/50 transition-all duration-500 h-full">
      {/* Icon avec effet minimaliste */}
      <div className="mb-6">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500/10 to-red-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-6 h-6 text-orange-400" />
        </div>
      </div>

      {/* Content */}
      <div className="space-y-4">
        <h3 className="text-xl font-medium text-white leading-tight">
          {title}
        </h3>
        
        <p className="text-gray-400 text-sm leading-relaxed">
          {description}
        </p>
      </div>

      {/* Subtle hover indicator */}
      <div className="mt-6 flex items-center text-orange-400/60 group-hover:text-orange-400 transition-colors duration-300">
        <span className="text-xs font-medium tracking-wide">En savoir plus</span>
        <ArrowRight className="w-3 h-3 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
      </div>

      {/* Accent line */}
      <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  </div>
);

const FeaturesSection = () => {
  const services = [
    {
      icon: LayoutDashboard,
      title: "Solutions sur mesure",
      description: "Développement de sites web, applications et logiciels personnalisés avec des technologies modernes pour des performances optimales.",
    },
    {
      icon: PenTool,
      title: "Identité & Communication",
      description: "Création de logos, supports physiques personnalisés et stratégies digitales pour une identité visuelle forte et cohérente.",
    },
    {
      icon: Film,
      title: "Production Audiovisuelle",
      description: "Services de voix off, vidéos publicitaires et animation événementielle pour captiver votre audience.",
    },
    {
      icon: GraduationCap,
      title: "Formation Personnalisée",
      description: "Programmes de formation adaptés couvrant le développement numérique et l'optimisation des communications.",
    },
    {
      icon: MonitorSmartphone,
      title: "Design UI/UX",
      description: "Conception d'interfaces élégantes et intuitives avec des maquettes interactives pour une expérience utilisateur unique.",
    },
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background subtil */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Header épuré */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 mb-6">
            <Sparkles className="w-4 h-4 text-orange-400" />
            <span className="text-orange-400 text-sm font-medium">Services</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 tracking-tight">
            Ce que nous
            <span className="block bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent font-normal">
              créons ensemble
            </span>
          </h2>

          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Une approche moderne et personnalisée pour transformer vos idées en solutions numériques exceptionnelles.
          </p>
        </div>

        {/* Grid moderne */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              icon={service.icon}
              title={service.title}
              description={service.description}
              index={index}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeaturesSection;