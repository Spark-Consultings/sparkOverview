import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Target, Users, Shield, Puzzle, Eye, Zap, Heart, Book, Flame } from 'lucide-react';

const ValueCard = ({ icon: Icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.2 }}
    whileHover={{ scale: 1.02, zIndex: 1 }}
    className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-3 sm:p-4 lg:p-5 relative group w-full"
  >
    <motion.div 
      className="absolute inset-0 bg-white/5 rounded-xl blur-lg"
      animate={{
        scale: [1, 1.1, 1],
        opacity: [0.3, 0.6, 0.3]
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse"
      }}
    />
    <div className="relative flex items-start sm:items-center gap-2 sm:gap-3 lg:gap-4">
      <motion.div 
        className="p-1.5 sm:p-2 rounded-lg bg-white/10 flex-shrink-0"
        whileHover={{ rotate: 360, scale: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Icon size={16} className="text-[#FF7452] sm:size-4 lg:size-5" />
      </motion.div>
      <div className="flex-1">
        <motion.h4 
          className="text-white font-semibold text-sm sm:text-base lg:text-lg"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: delay + 0.2, duration: 0.3 }}
        >
          {title}
        </motion.h4>
        <motion.p 
          className="text-gray-400 text-xs sm:text-sm lg:text-base mt-0.5 sm:mt-1"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: delay + 0.4, duration: 0.3 }}
        >
          {description}
        </motion.p>
      </div>
    </div>
  </motion.div>
);

export const CompanyValues = () => {
  const values = [
    { icon: Lightbulb, title: "Innovation audacieuse", description: "Stimuler la créativité et l'innovation pour proposer des solutions numériques uniques et avant-gardistes." },
    { icon: Target, title: "Excellence stratégique", description: "Offrir des solutions de qualité exceptionnelle, en combinant expertise technique et vision stratégique." },
    { icon: Users, title: "Engagement client", description: "Mettre les besoins de nos clients au premier plan, en leur fournissant des solutions sur mesure qui dépassent leurs attentes." },
    { icon: Shield, title: "Intégrité et confiance", description: "Agir avec éthique, transparence et fiabilité dans toutes nos interactions." },
    { icon: Puzzle, title: "Collaboration active", description: "Travailler main dans la main avec nos clients et notre équipe pour atteindre des objectifs communs." },
    { icon: Eye, title: "Vision éclairée", description: "Guider nos clients vers un avenir numérique prospère en leur offrant une vision claire et des solutions concrètes." },
    { icon: Zap, title: "Flexibilité et adaptation", description: "Répondre aux évolutions du marché et aux besoins changeants de nos clients avec agilité et réactivité." },
    { icon: Heart, title: "Impact positif", description: "S'engager pour des pratiques responsables, en contribuant au bien-être de nos communautés et à la protection de l'environnement." },
    { icon: Book, title: "Apprentissage continu", description: "Encourager le développement de notre équipe pour rester à la pointe des dernières technologies et tendances." },
    { icon: Flame, title: "Passion pour la transformation", description: "Mettre notre passion pour le numérique au service de la réussite et de la croissance de nos clients." }
  ];

  return (
    <motion.div 
      className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 -mt-44 lg:py-16 space-y-6 sm:space-y-8 lg:space-y-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white text-center"
      >
        Nos Valeurs
      </motion.h2>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0, staggerChildren: 0 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 max-w-7xl mx-auto"
      >
        {values.map((value, index) => (
          <ValueCard 
            key={index}
            icon={value.icon}
            title={value.title}
            description={value.description}
            delay={0.2 + index * 0.1}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default CompanyValues;