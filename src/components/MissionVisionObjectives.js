import React from "react";
import { motion } from "framer-motion";
import { Target, Eye, Flag } from 'lucide-react';

const Card = ({ icon: Icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    whileHover={{ scale: 1.05 }}
    className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-4 sm:p-6 relative group h-full"
  >
    <motion.div
      className="absolute inset-0 bg-white/5 rounded-xl blur-lg"
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.5, 0.8, 0.5],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse",
      }}
    />
    <div className="relative h-full flex flex-col">
      <motion.div
        className="flex items-center gap-2 sm:gap-4 mb-2 sm:mb-4"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          className="p-2 rounded-lg bg-white/10"
          whileHover={{ rotate: 360, scale: 1.01 }}
          transition={{ duration: 0.5 }}
        >
          <Icon size={20} className="text-[#FF7452]" />
        </motion.div>
        <h3 className="text-lg sm:text-xl font-semibold text-white">{title}</h3>
      </motion.div>
      <motion.p
        className="text-sm sm:text-base text-gray-400 flex-grow"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: delay + 0.4, duration: 0.5 }}
      >
        {description}
      </motion.p>
    </div>
  </motion.div>
);

export const MissionVisionObjectives = () => {
  return (
    <motion.div
      className="space-y-6 sm:space-y-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="flex items-center gap-2"
      >
        <motion.div
          className="h-1 w-12 bg-gradient-to-r from-[#FF7452] to-[#EC4899] rounded-full"
          animate={{
            width: ["3rem", "5rem", "3rem"],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <span className="text-[#FF7452] font-medium text-sm sm:text-base">Notre essence</span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6 sm:mb-8"
      >
        Mission, Vision et Objectifs
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <Card
          icon={Target}
          title="Mission"
          description="Notre mission est d'allumer l'étincelle qui propulse l'innovation, en traçant une ligne directe entre vision et réalisation grâce à des solutions numériques stratégiques et personnalisées qui surpassent les attentes."
          delay={0}
        />

        <Card
          icon={Eye}
          title="Vision"
          description="Nous aspirons à devenir le partenaire incontournable des entreprises dans leur transformation numérique, en les guidant sur un chemin fluide vers un monde connecté, innovant et durable."
          delay={0.2}
        />

        <Card
          icon={Flag}
          title="Objectifs"
          description="Devenir le moteur qui alimente l'innovation numérique de nos clients. Chez SPARKline, nous traçons une route claire vers la réussite en transformant des idées ambitieuses en solutions concrètes. Notre objectif est de connecter nos clients aux opportunités infinies qu'offre la technologie, tout en leur permettant de rester compétitifs, efficaces et inspirants dans un monde digital en constante évolution."
          delay={0.4}
        />
      </div>
    </motion.div>
  );
};

