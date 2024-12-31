import React from "react";
import { motion } from "framer-motion";
import {
  Zap,
  Shield,
  Cpu,
  BarChart3,
  Cloud,
  Lock,
  Sparkles,
  Target,
  Layers,
  Globe,
  Monitor,
  BarChart,
  LayoutDashboard,
  PenTool,
  Film,
  GraduationCap,
  MonitorSmartphone,
} from "lucide-react";

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
    icon: LayoutDashboard,
    title: "Création de Sites Internet",
    description:
      "Nous concevons des sites web sur mesure, parfaitement adaptés aux objectifs de nos clients. Que ce soit un site vitrine, une plateforme e-commerce ou une application web, nos développeurs expérimentés mettent en œuvre des solutions technologiques modernes et performantes pour garantir une expérience en ligne exceptionnelle.",
  },
  {
    icon: PenTool,
    title: "Supports de Communication & Identité Visuelle",
    description:
      "Nous aidons nos clients à se démarquer grâce à des stratégies de communication digitales impactantes. De la conception de logos aux supports physiques personnalisés (T-shirts, casquettes, sacs, stylos, etc.), en passant par la création de contenus engageants et la gestion des réseaux sociaux, nous bâtissons des identités visuelles fortes et cohérentes, optimisant leur impact auprès de leur audience.",
  },
  {
    icon: Film,
    title: "Production Audiovisuelle & Voix Off",
    description:
      "Donnez vie à vos idées avec notre expertise en production audiovisuelle. Nous offrons des services de voix off professionnelles, de réalisation de vidéos publicitaires et d'animation événementielle (modération de cérémonies, meetings, bootcamps, etc.), pour captiver et inspirer votre audience à chaque interaction.",
  },
  {
    icon:  GraduationCap,
    title: "Formation Personnalisée",
    description:
      "Nous proposons des programmes de formation adaptés à vos besoins spécifiques, couvrant des domaines clés comme le développement numérique, l'utilisation des nouvelles technologies ou encore l'optimisation des communications en ligne. Ces formations sur mesure visent à renforcer vos compétences et à vous positionner en leader dans votre secteur.",
  },
  {
    icon: MonitorSmartphone ,
    title: "Design d’Expérience Utilisateur (UI/UX)",
    description:
      "Placez vos utilisateurs au centre de vos projets numériques grâce à nos services de design UI/UX. Nous concevons des interfaces élégantes, intuitives et fonctionnelles, en intégrant des maquettes interactives et des designs multi-plateformes. L’objectif : offrir une expérience utilisateur unique et mémorable.",
  },
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
            <span className="text-orange-500 font-medium">
              Nous sommes là pour vous !
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold text-white"
          >
            Nos{" "}
            <span
              className="text-orange-500 relative inline-block 
                after:content-[''] after:absolute after:-bottom-1 after:left-0 
                after:w-full after:h-1 after:bg-orange-500 after:rounded-full 
                after:origin-left after:scale-x-0 hover:after:scale-x-100 
                after:transition-transform after:duration-300"
            >
              Services
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-gray-400 max-w-2xl mx-auto text-lg"
          >
           SPARKLINE propose une gamme complète de services innovants pour répondre aux besoins
           numériques de ses clients.
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
              delay={0.2 + index * 0.1}
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
              boxShadow: "0 0 20px rgba(249, 115, 22, 0.4)",
            }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-medium inline-flex items-center gap-2"
          >
            Prenez rendez-vous dès maintenant
            <Lock size={18} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
