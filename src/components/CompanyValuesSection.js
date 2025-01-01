import React from "react";
import { motion } from "framer-motion";
import { Lightbulb, Target, Users, Shield, Puzzle, Eye, Zap, Heart, Book, Flame, Flag } from 'lucide-react';

// Carte unifiée pour toutes les sections
const UnifiedCard = ({ icon: Icon, title, description, delay, isLarge = false }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="group relative h-full"
  >
    {/* Effet de lueur d'arrière-plan */}
    <motion.div
      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#FF7452]/20 to-[#EC4899]/20 rounded-xl blur-3xl" />
    </motion.div>

    {/* Carte principale */}
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className={`h-full rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 relative z-10 ${isLarge ? 'p-6 lg:p-8' : 'p-5 lg:p-6'}`}
    >
      <div className="relative h-full flex flex-col">
        {/* En-tête avec icône */}
        <motion.div
          className="flex items-start gap-4 mb-4"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          <motion.div
            className="relative"
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.6 }}
          >
            {/* Cercle de fond */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#FF7452] to-[#EC4899] rounded-xl blur-md opacity-50" />
            {/* Icône */}
            <div className={`relative rounded-xl bg-black/30 backdrop-blur-sm border border-white/10 ${isLarge ? 'p-3' : 'p-2.5'}`}>
              <Icon size={isLarge ? 24 : 20} className="text-[#FF7452]" />
            </div>
          </motion.div>
          
          <div>
            <h3 className={`font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent ${isLarge ? 'text-xl lg:text-2xl' : 'text-lg lg:text-xl'}`}>
              {title}
            </h3>
            {/* Ligne décorative */}
            <motion.div
              className="h-0.5 w-12 bg-gradient-to-r from-[#FF7452] to-[#EC4899] mt-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "3rem" }}
              transition={{ duration: 0.8, delay: delay + 0.2 }}
            />
          </div>
        </motion.div>

        {/* Description */}
        <motion.p
          className={`text-gray-300/90 leading-relaxed ${isLarge ? 'text-base lg:text-lg' : 'text-sm lg:text-base'}`}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: delay + 0.4, duration: 0.5 }}
        >
          {description}
        </motion.p>
      </div>

      {/* Particule d'arrière-plan */}
      <motion.div
        className="absolute -bottom-4 -right-4 w-32 h-32 bg-[#FF7452]/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
    </motion.div>
  </motion.div>
);

// Composant principal
const CompanyValuesSection = () => {
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
    
  ];

  return (
    <section className="relative min-h-screen bg-[#0B1120] pt-24 pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Particules d'arrière-plan animées */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 -left-32 w-64 h-64 bg-[#FF7452]/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 50, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-32 w-64 h-64 bg-[#EC4899]/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, -50, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 1,
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* En-tête de section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <motion.div 
            className="mb-6 inline-flex items-center gap-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <motion.div
              className="h-px w-12 bg-gradient-to-r from-[#FF7452] to-[#EC4899]"
              animate={{
                width: ["3rem", "5rem", "3rem"],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
            <span className="text-[#FF7452] font-medium tracking-wider uppercase text-sm">
              Notre ADN
            </span>
            <motion.div
              className="h-px w-12 bg-gradient-to-r from-[#EC4899] to-[#FF7452]"
              animate={{
                width: ["3rem", "5rem", "3rem"],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          </motion.div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              Notre{" "}
            </span>
            <span className="relative">
              <span className="bg-gradient-to-r from-[#FF7452] to-[#EC4899] bg-clip-text text-transparent">
                Identité
              </span>
              <motion.span
                className="absolute -bottom-2 left-0 h-1 w-full bg-gradient-to-r from-[#FF7452] to-[#EC4899] rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              />
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Découvrez ce qui nous définit et nous motive à repousser les limites de l'innovation
          </p>
        </motion.div>

        {/* Section Mission/Vision/Objectifs */}
        <div className="mb-32">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <UnifiedCard
              icon={Target}
              title="Mission"
              description="Notre mission est d'allumer l'étincelle qui propulse l'innovation, en traçant une ligne directe entre vision et réalisation grâce à des solutions numériques stratégiques et personnalisées qui surpassent les attentes."
              delay={0}
              isLarge={true}
            />
            <UnifiedCard
              icon={Eye}
              title="Vision"
              description="Nous aspirons à devenir le partenaire incontournable des entreprises dans leur transformation numérique, en les guidant sur un chemin fluide vers un monde connecté, innovant et durable."
              delay={0.2}
              isLarge={true}
            />
            <UnifiedCard
              icon={Flag}
              title="Objectifs"
              description="Devenir le moteur qui alimente l'innovation numérique de nos clients. Chez SPARKline, nous traçons une route claire vers la réussite en transformant des idées ambitieuses en solutions concrètes."
              delay={0.4}
              isLarge={true}
            />
          </div>
        </div>

        {/* Section Valeurs */}
        <div>
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent mb-4">
              Nos Valeurs
            </h2>
            <motion.div
              className="h-1 w-24 bg-gradient-to-r from-[#FF7452] to-[#EC4899] mx-auto rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: "6rem" }}
              transition={{ duration: 0.8 }}
            />
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 lg:gap-6"
          >
            {values.map((value, index) => (
              <UnifiedCard 
                key={index}
                icon={value.icon}
                title={value.title}
                description={value.description}
                delay={0.1 + index * 0.1}
                isLarge={false}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CompanyValuesSection;