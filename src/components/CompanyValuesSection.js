import React from "react";
import { motion } from "framer-motion";
import { MissionVisionObjectives } from "./MissionVisionObjectives";
import { CompanyValues } from "./CompanyValues";

const CompanyValuesSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center py-24 px-8 relative overflow-hidden bg-[#0B1120]">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl w-full"
      >
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl font-bold text-white mb-4">
            Notre{" "}
            <span
              className="text-orange-500 relative inline-block 
                after:content-[''] after:absolute after:-bottom-1 after:left-0 
                after:w-full after:h-1 after:bg-orange-500 after:rounded-full 
                after:origin-left after:scale-x-0 hover:after:scale-x-100 
                after:transition-transform after:duration-300"
            >
              Identité
            </span>
          </h1>
          <p className="text-xl text-gray-400">
            Découvrez ce qui nous définit et nous motive
          </p>
        </motion.div>
        <div className="grid grid-rows-2 gap-16 items-start">
          <MissionVisionObjectives />
          <CompanyValues />
        </div>
      </motion.div>
    </section>
  );
};

export default CompanyValuesSection;
