import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, Sparkles, Code2, Globe, Lock } from "lucide-react";

const ProjectCard = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 50,
      rotateX: 45
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 70,
        delay: index * 0.15
      }
    },
    hover: {
      scale: 1.02,
      rotateY: 5,
      transition: { duration: 0.3 }
    }
  };

  const glowVariants = {
    hover: {
      opacity: 0.8,
      scale: 1.1,
      transition: { duration: 0.3 }
    },
    initial: {
      opacity: 0.3,
      scale: 1
    }
  };

  const contentVariants = {
    hover: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.3 }
    },
    initial: {
      y: 30,
      opacity: 0
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true }}
      className="group relative perspective-1000"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {/* Card container with 3D effect */}
      <motion.div 
        className={`relative h-[450px] md:h-[500px] rounded-2xl overflow-hidden backdrop-blur-lg
                   transition-all duration-500 transform-gpu preserve-3d
                   bg-gradient-to-br from-gray-900/90 to-gray-800/90
                   border border-orange-500/20 shadow-xl
                   ${isExpanded ? "md:col-span-2 md:h-[600px]" : ""}`}
      >
        {/* Glow effect */}
        <motion.div
          variants={glowVariants}
          className="absolute inset-0 bg-gradient-to-tr from-orange-500/20 to-red-500/20 blur-2xl"
        />

        {/* Animated border */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden">
          <motion.div
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="absolute inset-0 bg-gradient-to-r "
          />
        </div>

        {/* Background image with parallax */}
        <motion.div
          animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 z-0"
        >
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover opacity-40"
          />
        </motion.div>

        {/* Content container */}
        <motion.div
          variants={contentVariants}
          className="relative h-full z-10 p-6 flex flex-col justify-between"
        >
          {/* Project type badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2 bg-orange-500/20 text-orange-300 px-4 py-2 rounded-full 
                     w-fit backdrop-blur-sm border border-orange-500/30"
          >
            <Code2 size={16} />
            <span className="text-sm font-medium">{project.technologies[0]}</span>
          </motion.div>

          <div className="space-y-4">
            {/* Title with animated underline */}
            <div className="relative">
              <motion.h3
                className="text-3xl font-bold text-white mb-2"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {project.title}
              </motion.h3>
              <motion.div
                className="h-0.5 bg-orange-500/50 rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              />
            </div>

            {/* Description */}
            <motion.p
              className="text-gray-300 line-clamp-3 md:text-lg"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {project.description}
            </motion.p>

            {/* Technologies */}
            <motion.div
              className="flex flex-wrap gap-1"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {project.technologies?.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-lg bg-gray-800/80 text-orange-300 text-sm font-medium
                           border border-orange-500/20 backdrop-blur-sm"
                >
                  {tech}
                </span>
              ))}
            </motion.div>

            {/* Action buttons */}
            <motion.div
              className="flex flex-wrap gap-3 pt-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {project.githubUrl && (
                <motion.a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, rotateZ: -1 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 
                           text-white font-medium group relative overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 opacity-0 group-hover:opacity-100 
                             transition-opacity"
                  />
                  <Github className="relative z-10" size={20} />
                  <span className="relative z-10">Code Source</span>
                </motion.a>
              )}
              {project.liveUrl && (
                <motion.a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, rotateZ: 1 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gray-800 text-white font-medium 
                           border border-orange-500/20 hover:bg-gray-700 group relative overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-500/10 opacity-0 
                             group-hover:opacity-100 transition-opacity"
                  />
                  <Globe className="relative z-10" size={20} />
                  <span className="relative z-10">Voir le Projet</span>
                </motion.a>
              )}
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const ProjectsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const projects = [
    {
      title: "Farlu ci diiné Ohio Colombus",
      description: "Une plateforme étant votre source d'information sur la spiritualité et l'histoire Layène.",
      image: "https://res.cloudinary.com/drxouwbms/image/upload/v1735739289/Capture_d_%C3%A9cran_du_2025-01-01_13-47-41_zmwfjs.png",
      githubUrl: "https://github.com/example/project1",
      liveUrl: "https://www.farlucidineohio.com/",
      technologies: ["React", "Cloudinary", "Drive", "vercel"],
      category: "web"
    },
    


    // ... autres projets avec leurs catégories
  ];

  const categories = [
    { id: "all", label: "Tous les Projets", icon: Sparkles },
    { id: "web", label: "Applications Web", icon: Globe },
    { id: "mobile", label: "Apps Mobiles", icon: Lock },
  ];

  const filteredProjects = projects.filter(
    project => selectedCategory === "all" || project.category === selectedCategory
  );

  return (
    <section className="py-24 px-4 md:px-8 relative overflow-hidden min-h-screen">
      {/* Animated background elements */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute inset-0 overflow-hidden opacity-50"
      >
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-red-500/10 rounded-full blur-3xl" />
      </motion.div>

      <div className="max-w-7xl mx-auto relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-8 mb-20"
        >
          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="flex items-center justify-center gap-3"
          >
            <motion.div
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <Sparkles size={28} className="text-orange-500" />
            </motion.div>
            <span className="text-orange-500 font-medium text-xl">
              Notre Portfolio
            </span>
          </motion.div>

          <h2 className="text-5xl md:text-7xl font-bold text-white leading-tight">
            Nos{" "}
            <span className="text-orange-500 relative inline-block">
              Réalisations
              <motion.div
                className="absolute -bottom-3 left-0 w-full h-1.5 bg-orange-500 rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />
            </span>
          </h2>

          <p className="text-gray-400 max-w-2xl mx-auto text-xl md:text-2xl font-light">
            Découvrez notre collection de projets innovants qui démontrent notre expertise et notre créativité.
          </p>

          {/* Category filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4 pt-8"
          >
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all
                          ${selectedCategory === category.id
                    ? "bg-orange-500 text-white"
                    : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50"
                  }`}
              >
                <category.icon size={20} />
                <span>{category.label}</span>
              </motion.button>
            ))}
          </motion.div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={index}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;