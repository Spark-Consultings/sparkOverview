import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Globe, ArrowUpRight, Filter } from 'lucide-react';

const ProjectCard = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
        delay: index * 0.1
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="group relative h-[420px]"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
        className="relative h-full bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-500"
      >
        {/* Image Container */}
        <div className="relative h-48 overflow-hidden">
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
          
          {/* Logo */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className="absolute top-4 left-4"
          >
            <div className="w-12 h-12 rounded-xl bg-white/90 backdrop-blur-sm p-2 shadow-lg">
              <img
                src={project.logo}
                alt={project.title}
                className="w-full h-full rounded-lg object-cover"
              />
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-4 right-4 flex gap-2"
          >
            {project.githubUrl && (
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg hover:bg-white transition-colors"
              >
                <Github size={18} className="text-gray-700" />
              </motion.a>
            )}
            {project.liveUrl && (
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg hover:bg-orange-600 transition-colors"
              >
                <ArrowUpRight size={18} className="text-white" />
              </motion.a>
            )}
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col justify-between h-[172px]">
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="text-xl font-bold text-white mb-2 line-clamp-2"
            >
              {project.title}
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="text-gray-300 text-sm line-clamp-3 mb-4"
            >
              {project.description}
            </motion.p>
          </div>

          {/* Technologies */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            className="flex flex-wrap gap-1.5"
          >
            {project.technologies?.slice(0, 3).map((tech, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-lg font-medium"
              >
                {tech}
              </span>
            ))}
            {project.technologies?.length > 3 && (
              <span className="px-2 py-1 bg-orange-900/50 text-orange-400 text-xs rounded-lg font-medium">
                +{project.technologies.length - 3}
              </span>
            )}
          </motion.div>
        </div>

        {/* Hover Effect Border */}
        <motion.div
          className="absolute inset-0 rounded-2xl border-2 border-orange-500/0 pointer-events-none"
          animate={isHovered ? { borderColor: "rgb(249 115 22 / 0.3)" } : { borderColor: "rgb(249 115 22 / 0)" }}
          transition={{ duration: 0.3 }}
        />
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
      technologies: ["React", "Cloudinary", "Drive", "Vercel"],
      category: "web",
      logo: "https://res.cloudinary.com/drxouwbms/image/upload/v1735753581/farlu_teiota_1_mot1qq.png"
    },
    {
      title: "Sentech Academy",
      description: "L'école des métiers d'avenir en Management, développement web, IT et programmation informatique",
      image: "https://res.cloudinary.com/drxouwbms/image/upload/v1735754062/techback_ymazyq.jpg",
      liveUrl: "https://senegal.sentechacademy.com/",
      technologies: ["WordPress", "PHP", "MySQL"],
      category: "web",
      logo: "https://res.cloudinary.com/drxouwbms/image/upload/t_crop/v1735752711/sentech_ujdofs.png"
    },
    {
      title: "Madjiguene TMT",
      description: "Entreprise sénégalaise évoluant dans le transport routier, la manutention et le transit",
      image: "https://res.cloudinary.com/drxouwbms/image/upload/v1735754062/techback_ymazyq.jpg",
      liveUrl: "https://madjiguenelogistic.com/",
      technologies: ["PHP", "JavaScript", "CSS"],
      category: "web",
      logo: "https://res.cloudinary.com/drxouwbms/image/upload/v1735753437/madjiguene_r5orlf.png"
    },
    {
      title: "Bayre Host",
      description: "Plateforme d'hébergement de sites web avec solutions personnalisées",
      image: "https://res.cloudinary.com/drxouwbms/image/upload/v1735754062/techback_ymazyq.jpg",
      liveUrl: "https://bayrehost.com/",
      technologies: ["WordPress", "PHP", "JavaScript"],
      category: "web",
      logo: "https://res.cloudinary.com/drxouwbms/image/upload/v1735753785/bayrehost_i4hkgh.png"
    },
  ];

  const categories = [
    { id: "all", label: "Tous" },
    { id: "web", label: "Web" },
    { id: "mobile", label: "Mobile" },
    { id: "design", label: "Design" },
  ];

  const filteredProjects = projects.filter(
    project => selectedCategory === "all" || project.category === selectedCategory
  );

  return (
    <section className="py-20 px-4 md:px-6 lg:px-8 bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-medium mb-6"
          >
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
            Portfolio
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Nos{" "}
            <span className="text-orange-500 relative">
              Réalisations
              <motion.div
                className="absolute -bottom-2 left-0 w-full h-1 bg-orange-500 rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, duration: 0.8 }}
              />
            </span>
          </h2>

          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Découvrez notre collection de projets qui allient innovation, design moderne et performance technique.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-center mb-12"
        >
          <div className="flex items-center gap-2 bg-gray-800 rounded-2xl p-2 shadow-lg border border-gray-700">
            <Filter size={16} className="text-gray-400 ml-2" />
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? "bg-orange-500 text-white shadow-lg"
                    : "text-gray-400 hover:text-white hover:bg-gray-700"
                }`}
              >
                {category.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={`${project.title}-${selectedCategory}`}
                project={project}
                index={index}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Filter size={24} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Aucun projet trouvé
            </h3>
            <p className="text-gray-400">
              Essayez de changer le filtre pour voir plus de projets.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;