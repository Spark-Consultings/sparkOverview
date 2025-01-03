import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Sparkles, Globe, Smartphone, Palette } from 'lucide-react';

const ProjectCard = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);

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
      scale: 1.05,
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
    >
      <motion.div
        className="relative h-[400px] rounded-xl overflow-hidden backdrop-blur-lg
                   transition-all duration-500 transform-gpu preserve-3d
                   bg-gradient-to-br from-gray-900/90 to-gray-800/90
                   border border-orange-500/20 shadow-xl"
      >
        <motion.div
          variants={glowVariants}
          className="absolute inset-0"
        />

        <motion.div
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-xl"
        />

        <motion.div
          animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 z-0"
        >
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover opacity-70"
          />
        </motion.div>

        <motion.div
          variants={contentVariants}
          className="relative h-full z-10 p-4 flex flex-col justify-between"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <img
              src={project.logo}
              alt={project.title}
              className="w-16 h-16 rounded-full object-cover opacity-70"
            />
          </motion.div>

          <div className="space-y-3">
            <motion.h3
              className="text-2xl font-bold text-white mb-2 line-clamp-1"
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

            <motion.p
              className="text-gray-300 line-clamp-2 text-sm"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {project.description}
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-1.5"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {project.technologies?.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 rounded-lg bg-orange-500 text-white text-xs font-medium
                           border border-orange-500/20 backdrop-blur-sm"
                >
                  {tech}
                </span>
              ))}
            </motion.div>

            <motion.div
              className="flex flex-wrap gap-2 pt-2"
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
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 
                           text-white text-sm font-medium group relative overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 opacity-0 group-hover:opacity-100 
                             transition-opacity"
                  />
                  <Github className="relative z-10" size={16} />
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
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-800 text-white text-sm font-medium 
                           border border-orange-500/20 hover:bg-gray-700 group relative overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-500/10 opacity-0 
                             group-hover:opacity-100 transition-opacity"
                  />
                  <Globe className="relative z-10" size={16} />
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
      image: "https://res.cloudinary.com/drxouwbms/image/upload/v1735754062/techback_ymazyq.jpg",
      liveUrl: "https://www.farlucidineohio.com/",
      technologies: ["React", "Cloudinary", "Drive", "vercel"],
      category: "web",
      logo: "https://res.cloudinary.com/drxouwbms/image/upload/v1735753581/farlu_teiota_1_mot1qq.png"
    },
    {
      title: "Sentech Academy",
      description: "L'école des métiers d'avenir en Management, développement web, IT et programmation informatique",
      image: "https://res.cloudinary.com/drxouwbms/image/upload/v1735754062/techback_ymazyq.jpg",
      liveUrl: "https://senegal.sentechacademy.com/",
      technologies: ["Wordpress", "PHP"],
      category: "web",
      logo: "https://res.cloudinary.com/drxouwbms/image/upload/t_crop/v1735752711/sentech_ujdofs.png"
    },
    {
      title: "Madjiguene TMT",
      description: "Entreprise sénégalaise evoluant dans le transport routier, la manutention et le transit",
      image: "https://res.cloudinary.com/drxouwbms/image/upload/v1735754062/techback_ymazyq.jpg",
      liveUrl: "https://madjiguenelogistic.com/",
      technologies: ["PHP"],
      category: "web",
      logo: "https://res.cloudinary.com/drxouwbms/image/upload/v1735753437/madjiguene_r5orlf.png"
    },
    {
      title: "Bayre Host",
      description: "Plateforme d'hébergement de sites web",
      image: "https://res.cloudinary.com/drxouwbms/image/upload/v1735754062/techback_ymazyq.jpg",
      liveUrl: "https://bayrehost.com/",
      technologies: ["Wordpress", "PHP", "Js"],
      category: "web",
      logo: "https://res.cloudinary.com/drxouwbms/image/upload/v1735753785/bayrehost_i4hkgh.png"
    },
    {
      title: "Bayre Host",
      description: "Plateforme d'hébergement de sites web",
      image: "https://res.cloudinary.com/drxouwbms/image/upload/v1735754062/techback_ymazyq.jpg",
      liveUrl: "https://bayrehost.com/",
      technologies: ["Wordpress", "PHP", "Js"],
      category: "web",
      logo: "https://res.cloudinary.com/drxouwbms/image/upload/v1735753785/bayrehost_i4hkgh.png"
    },
    
  ];

  const categories = [
    { id: "all", label: "Tous les Projets", icon: Sparkles },
    { id: "web", label: "Applications Web", icon: Globe },
    { id: "mobile", label: "Apps Mobiles", icon: Smartphone },
    { id: "uiux", label: "UI/UX Design", icon: Palette },
  ];

  const filteredProjects = projects.filter(
    project => selectedCategory === "all" || project.category === selectedCategory
  );

  return (
    <section className="py-16 px-4 md:px-6 lg:px-8 relative overflow-hidden min-h-screen">
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

      <div className="max-w-[1600px] mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-6 mb-16"
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
              <Sparkles size={24} className="text-orange-500" />
            </motion.div>
            <span className="text-orange-500 font-medium text-lg">
              Notre Portfolio
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
            Nos{" "}
            <span className="text-orange-500 relative inline-block">
              Réalisations
              <motion.div
                className="absolute -bottom-2 left-0 w-full h-1 bg-orange-500 rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />
            </span>
          </h2>

          <p className="text-gray-400 max-w-2xl mx-auto text-lg md:text-xl font-light">
            Découvrez notre collection de projets innovants qui démontrent notre expertise et notre créativité.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap justify-center gap-3 pt-6"
          >
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
                          ${selectedCategory === category.id
                    ? "bg-orange-500 text-white"
                    : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50"
                  }`}
              >
                <category.icon size={18} />
                <span>{category.label}</span>
              </motion.button>
            ))}
          </motion.div>
        </motion.div>

        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 justify-items-center"
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
      </div>
    </section>
  );
};

export default ProjectsSection;