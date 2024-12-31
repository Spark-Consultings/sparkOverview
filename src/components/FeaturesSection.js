import React from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Globe, 
  Shield, 
  Cpu,
  BarChart3,
  Cloud,
  Lock,
  Sparkles
} from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    whileHover={{ y: -5, transition: { duration: 0.2 } }}
    className="relative group"
  >
    <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
    <div className="relative p-8 bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-orange-500/20">
      <div className="flex flex-col h-full space-y-6">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-500">
            <Icon size={24} className="text-white" />
          </div>
          <h3 className="text-xl font-semibold text-white">{title}</h3>
        </div>
        <p className="text-gray-300 leading-relaxed">{description}</p>
        <motion.div 
          className="h-1 w-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
          whileHover={{ width: "100%" }}
        />
      </div>
    </div>
  </motion.div>
);

const FeaturesSection = () => {
  const features = [
    {
        icon: Zap,
        title: "Solutions Digitales Innovantes",
        description: "Développez votre entreprise avec des solutions digitales sur-mesure adaptées à vos besoins spécifiques."
    },
    {
        icon: Shield,
        title: "Améliorations de Logiciels",
        description: "Optimisez vos outils existants grâce à des améliorations logicielles performantes et sécurisées."
    },
    {
        icon: Globe,
        title: "Projets sur Mesure",
        description: "Transformez vos idées en réalité avec nos projets conçus spécifiquement pour répondre à vos objectifs uniques."
    },
    {
        icon: Cpu,
        title: "Applications Intelligentes",
        description: "Nous créons des applications modernes et intelligentes, intégrant les dernières avancées technologiques."
    },
    {
        icon: BarChart3,
        title: "Masterclasses Spécialisées",
        description: "Profitez de formations pointues pour monter en compétences et rester compétitif dans un monde digital en constante évolution."
    }
];


  return (
    <section className="py-24 px-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-red-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2"
          >
            <Sparkles size={20} className="text-orange-500" />
            <span className="text-orange-500 font-medium">Nous sommes là pour vous !</span> 
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-white"
          >
            Nos Services
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-gray-400 max-w-2xl mx-auto text-lg"
          >
            Découvrez nos services, et profitez de nos expertises pour améliorer et faire évoluer votre entreprise et répondre à vos besoins spécifiques.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={0.2 + (index * 0.1)}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-20 text-center"
        >
          <motion.button
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 0 20px rgba(249, 115, 22, 0.4)"
            }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-medium inline-flex items-center gap-2"
          >
            Start Building Now
            <Lock size={18} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;