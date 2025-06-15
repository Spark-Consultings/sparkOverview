import React, { useState, useEffect, useMemo } from 'react';
import { Crown, Star, MapPin, Award, Code, Palette, Database, Rocket, Globe, Trophy } from 'lucide-react';

const foundersData = [
  {
    id: 'ndiaga',
    name: 'Ndiaga LO',
    role: 'FullStack developer, Junior IT consultant, ServiceNow System Administrator',
    image: 'https://res.cloudinary.com/drxouwbms/image/upload/v1732391040/h3gxu5c7wsfkmwbbkfiq.png',
    skills: ['React', 'Figma', 'TypeScript', 'Design Systems'],
    // experience: '5+ ans',
    // location: 'Dakar, SN',
    description: 'Architecte de solutions frontend innovantes avec une expertise en design d\'expériences utilisateur.',
    color: 'blue'
  },
  {
    id: 'fanta',
    name: 'Fanta Ndao Tine',
    role: 'Full-Stack Developer, Product Manager',
    image: 'https://res.cloudinary.com/drxouwbms/image/upload/v1734391711/fanta-removebg-preview_eamyrs.png',
    skills: ['Leadership', 'Strategy', 'WordPress', 'Innovation'],
    // experience: '7+ ans',
    // location: 'Dakar, SN',
    description: 'Visionnaire technologique qui guide l\'équipe vers l\'excellence et l\'innovation constante.',
    color: 'purple'
  },
  {
    id: 'fallou',
    name: 'Serigne Fallou Seck',
    role: 'DevOps Engineer, Site Reliability Engineer (SRE), FullStack developer',
    image: 'https://res.cloudinary.com/drxouwbms/image/upload/v1734391519/fallou-removebg-preview_rckbfz.png',
    skills: ['Cloud', 'DevOps', 'Java', 'Architecture'],
    // experience: '6+ ans',
    // location: 'Dakar, SN',
    description: 'Expert en architecture cloud et systèmes distribués, garant de la performance technique.',
    color: 'emerald'
  },
  {
    id: 'seydina',
    name: 'Seydina Mouhammad Diop',
    role: 'Full-Stack Developper, Lead UI/UX Designer',
    image: 'https://res.cloudinary.com/drxouwbms/image/upload/v1734391710/seydina-removebg-preview_btrgp6.png',
    skills: ['React', 'NuxtJs', 'UX Design', 'Frontend'],
    // experience: '4+ ans',
    // location: 'Dakar, SN',
    description: 'Créateur d\'expériences digitales alliant expertise technique et sensibilité artistique.',
    color: 'violet'
  }
];

const collaboratorsData = [
  {
    id: 'EHAC6',
    name: 'El Hadji Andaw Ciss',
    role: 'Développeur Full Stack, Spécialiste Gaming, UI/UX Designer',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b789?w=400&h=400&fit=crop&crop=face',
    skills: ['Growth', 'Analytics', 'Strategy', 'SEO'],
    experience: '3+ ans',
    location: 'Dakar, SN',
    description: 'Stratège digitale spécialisée dans la croissance et l\'optimisation des performances.',
    color: 'rose'
  },
  {
    id: 'mouhamed',
    name: 'Mouhamed Sambe',
    role: 'WebDesigner, Webmaster, Content Manager',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    skills: ['Product', 'Innovation', 'Agile', 'Research'],
    experience: '4+ ans',
    location: 'Dakar, SN',
    description: 'Manager produit qui transforme les idées innovantes en solutions concrètes et efficaces.',
    color: 'amber'
  }
];

const statsData = [
  { icon: Award, label: 'Années d\'expérience', value: '25+', color: 'blue' },
  { icon: Rocket, label: 'Projets réalisés', value: '150+', color: 'purple' },
  { icon: Globe, label: 'Clients satisfaits', value: '80+', color: 'emerald' },
  { icon: Code, label: 'Solutions créées', value: '200+', color: 'violet' }
];

// Optimized color system
const colorSystem = {
  blue: {
    accent: 'text-blue-400',
    bg: 'bg-blue-500/8',
    border: 'border-blue-500/20',
    hover: 'hover:border-blue-400/40',
    shadow: 'shadow-blue-500/20'
  },
  purple: {
    accent: 'text-purple-400',
    bg: 'bg-purple-500/8',
    border: 'border-purple-500/20',
    hover: 'hover:border-purple-400/40',
    shadow: 'shadow-purple-500/20'
  },
  emerald: {
    accent: 'text-emerald-400',
    bg: 'bg-emerald-500/8',
    border: 'border-emerald-500/20',
    hover: 'hover:border-emerald-400/40',
    shadow: 'shadow-emerald-500/20'
  },
  violet: {
    accent: 'text-violet-400',
    bg: 'bg-violet-500/8',
    border: 'border-violet-500/20',
    hover: 'hover:border-violet-400/40',
    shadow: 'shadow-violet-500/20'
  },
  rose: {
    accent: 'text-rose-400',
    bg: 'bg-rose-500/8',
    border: 'border-rose-500/20',
    hover: 'hover:border-rose-400/40',
    shadow: 'shadow-rose-500/20'
  },
  amber: {
    accent: 'text-amber-400',
    bg: 'bg-amber-500/8',
    border: 'border-amber-500/20',
    hover: 'hover:border-amber-400/40',
    shadow: 'shadow-amber-500/20'
  }
};

// Optimized Badge Component
const Badge = ({ icon: Icon, text, color, size = 'sm' }) => {
  const colors = colorSystem[color];
  const sizeClasses = {
    xs: 'px-2 py-1 text-xs',
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm'
  };

  return (
    <div className={`
      flex items-center gap-2 bg-gray-900/90 backdrop-blur-sm 
      border ${colors.border} rounded-full ${sizeClasses[size]}
      transition-all duration-200 hover:bg-gray-800/90
    `}>
      {Icon && <Icon className={`w-3.5 h-3.5 ${colors.accent}`} />}
      <span className="text-white font-medium">{text}</span>
    </div>
  );
};

// Optimized Skill Tag Component
const SkillTag = ({ skill, color, variant = 'default' }) => {
  const colors = colorSystem[color];
  
  return (
    <span className={`
      px-3 py-1.5 rounded-lg text-xs font-medium
      transition-all duration-200 hover:scale-105
      ${variant === 'overlay' 
        ? `bg-gray-900/80 backdrop-blur-sm border ${colors.border} text-white` 
        : `${colors.bg} ${colors.border} border text-gray-300 hover:text-white`
      }
    `}>
      {skill}
    </span>
  );
};

// Optimized Member Card Component
const MemberCard = ({ member, isFounder = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const colors = colorSystem[member.color];

  const handleInteraction = (hovered) => {
    setIsHovered(hovered);
  };

  return (
    <article
      className="group relative"
      onMouseEnter={() => handleInteraction(true)}
      onMouseLeave={() => handleInteraction(false)}
      role="article"
      aria-label={`${member.name}, ${member.role}`}
    >
      {/* Founder Badge */}
      {isFounder && (
        <div className="absolute -top-3 left-6 z-10">
          <Badge 
            icon={Crown} 
            text="Fondateur" 
            color={member.color}
            size="sm"
          />
        </div>
      )}

      {/* Main Card */}
      <div className={`
        relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 
        rounded-2xl overflow-hidden h-full
        transition-all duration-500 ease-out
        ${isHovered ? `${colors.border} ${colors.hover} shadow-2xl ${colors.shadow} transform -translate-y-2` : ''}
      `}>
        
        {/* Image Section */}
        <div className="relative h-80 overflow-hidden">
          <img
            src={member.image}
            alt={`Portrait de ${member.name}`}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60" />
          
          {/* Floating Skills */}
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            {member.skills.slice(0, 2).map((skill, index) => (
              <div
                key={skill}
                className={`
                  transition-all duration-300 delay-${index * 100}
                  ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-80 translate-x-2'}
                `}
              >
                <SkillTag skill={skill} color={member.color} variant="overlay" />
              </div>
            ))}
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 space-y-4">
          {/* Header */}
          <header className="space-y-2">
            <h3 className="text-xl font-bold text-white leading-tight">
              {member.name}
            </h3>
            <p className={`text-sm font-semibold ${colors.accent} leading-relaxed`}>
              {member.role}
            </p>
          </header>

          {/* Meta Information */}
          <div className="flex items-center gap-6 text-sm text-gray-400">
            <div className="flex items-center gap-1.5">
              <Trophy className="w-4 h-4" />
              <span>{member.experience}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4" />
              <span>{member.location}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-300 text-sm leading-relaxed">
            {member.description}
          </p>

          {/* Skills Grid */}
          <div className="flex flex-wrap gap-2 pt-2">
            {member.skills.map((skill) => (
              <SkillTag 
                key={skill} 
                skill={skill} 
                color={member.color} 
              />
            ))}
          </div>
        </div>
      </div>
    </article>
  );
};

// Optimized Section Header Component
const SectionHeader = ({ icon: Icon, title, subtitle, count, color = 'blue' }) => {
  const colors = colorSystem[color];
  
  return (
    <header className="text-center space-y-6 mb-16">
      <div className="flex items-center justify-center gap-4">
        <div className={`
          flex items-center justify-center w-12 h-12 
          bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl
          transition-all duration-300 hover:${colors.border}
        `}>
          <Icon className={`w-6 h-6 ${colors.accent}`} />
        </div>
        
        <h2 className="text-4xl font-bold text-white">
          {title}
        </h2>
        
        <div className={`
          flex items-center justify-center w-10 h-10 
          ${colors.bg} ${colors.border} border rounded-xl
          transition-all duration-300 hover:scale-105
        `}>
          <span className={`text-sm font-bold ${colors.accent}`}>
            {count}
          </span>
        </div>
      </div>
      
      <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
        {subtitle}
      </p>
    </header>
  );
};

// Optimized Stats Component
const StatsGrid = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
      {stats.map((stat, index) => {
        const colors = colorSystem[stat.color];
        return (
          <div 
            key={stat.label} 
            className="text-center group"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <div className={`
              flex items-center justify-center w-16 h-16 mx-auto mb-4
              bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl
              transition-all duration-300 group-hover:${colors.border} group-hover:${colors.shadow}
              group-hover:scale-105
            `}>
              <stat.icon className={`w-8 h-8 text-gray-400 group-hover:${colors.accent} transition-colors duration-300`} />
            </div>
            
            <div className={`text-3xl font-bold text-white mb-2 group-hover:${colors.accent} transition-colors duration-300`}>
              {stat.value}
            </div>
            
            <div className="text-gray-400 text-sm font-medium">
              {stat.label}
            </div>
          </div>
        );
      })}
    </div>
  );
};

// Main Component
const EnhancedTeamSection = () => {
  const [isMobile, setIsMobile] = useState(false);

  // Optimized responsive handler
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Memoized grid classes for performance
  const foundersGridClass = useMemo(() => {
    return isMobile 
      ? 'grid grid-cols-1 sm:grid-cols-2 gap-8' 
      : 'grid lg:grid-cols-4 gap-8';
  }, [isMobile]);

  return (
    <section className="relative bg-black py-24 px-4 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/20 via-transparent to-gray-900/20" />
      
      <div className="relative max-w-7xl mx-auto space-y-20">
        
        {/* Main Title */}
        <header className="text-center space-y-8">
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-gray-600" />
            <span className="text-gray-400 text-sm font-semibold tracking-widest uppercase">
              ÉQUIPE SPARKLINE
            </span>
            <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-gray-600" />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
            L'équipe qui
            <span className="block bg-gradient-to-r from-gray-400 to-gray-600 bg-clip-text text-transparent">
              transforme vos idées
            </span>
          </h1>
          
          <p className="text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed">
            Une équipe de talents passionnés qui combinent expertise technique 
            et vision créative pour créer des expériences digitales exceptionnelles.
          </p>
        </header>

        {/* Founders Section */}
        <section>
          <SectionHeader
            icon={Crown}
            title="Fondateurs"
            subtitle="Les visionnaires qui ont créé Sparkline et défini notre approche innovante du développement digital."
            count="4"
            color="purple"
          />
          
          <div className={foundersGridClass}>
            {foundersData.map((founder) => (
              <MemberCard
                key={founder.id}
                member={founder}
                isFounder={true}
              />
            ))}
          </div>
        </section>

        {/* Collaborators Section */}
        <section>
          <SectionHeader
            icon={Crown}
            title="Nos Collaborateurs"
            subtitle="Les visionnaires qui ont créé Sparkline et défini notre approche innovante du développement digital."
            count="2"
            color="purple"
          />
          
          <div className={foundersGridClass}>
            {collaboratorsData.map((collaborator) => (
              <MemberCard
                key={collaborator.id}
                member={collaborator}
                isFounder={false}
              />
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section>
          <SectionHeader
            icon={Trophy}
            title="Nos Réalisations"
            subtitle="Les chiffres qui témoignent de notre expertise et de notre engagement."
            count="4"
            color="blue"
          />
          
          <StatsGrid stats={statsData} />
        </section>
      </div>
    </section>
  );
};

export default EnhancedTeamSection;