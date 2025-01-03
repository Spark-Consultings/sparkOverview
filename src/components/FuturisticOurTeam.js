import React, { useState } from 'react';

const teamMembers = [
  {
    name: 'Ndiaga LO',
    role: 'Développeur Fullstack | UI/UX Designer',
    image: 'https://res.cloudinary.com/drxouwbms/image/upload/v1732391040/h3gxu5c7wsfkmwbbkfiq.png',
    skills: ['React', 'Figma', 'TailwindCSS', 'TypeScript'],
    description: 'Créatif passionné par l\'expérience utilisateur'
  },
  {
    name: 'Fanta Ndao Tine',
    role: 'CEO | Développeur Fullstack | CMS',
    image: 'https://res.cloudinary.com/drxouwbms/image/upload/v1734391711/fanta-removebg-preview_eamyrs.png',
    skills: ['WordPress', 'PHP', 'MySQL', 'Angular'],
    description: 'Experte en architecture logicielle et gestion d\'équipe'
  },
  {
    name: 'Serigne Fallou Seck',
    role: 'Développeur Fullstack | DevOps Engineer',
    image: 'https://res.cloudinary.com/drxouwbms/image/upload/v1734391519/fallou-removebg-preview_rckbfz.png',
    skills: ['PHP', 'Java', 'ELK-Stack', 'ExpressJs'],
    description: 'Pionnier du développement full-stack et DevOps'
  },
  {
    name: 'Seydina Mouhammad Diop',
    role: 'Développeur Fullstack | UI/UX Designer',
    image: 'https://res.cloudinary.com/drxouwbms/image/upload/v1734391710/seydina-removebg-preview_btrgp6.png',
    skills: ['ReactJs', 'NuxtJs', 'ExpressJs', 'NuxtJs', 'Figma'],
    description: 'Créative passionnée par l\'expérience utilisateur'
  }
];

// Composant pour la version Desktop
const DesktopTeamCard = ({ member, isHovered, onHover, onLeave, onClick, isSelected }) => (
  <div
    className="relative group cursor-pointer h-96"
    onMouseEnter={onHover}
    onMouseLeave={onLeave}
    onClick={onClick}
  >
    <div className="relative h-full w-full overflow-hidden rounded-2xl bg-gray-800 
      transform transition-all duration-500 ease-out
      hover:scale-105 hover:shadow-xl hover:shadow-orange-500/20">
      
      <div className="relative h-full w-full  overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60" />
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover transform transition-transform duration-700 ease-out group-hover:scale-110"
        />
      </div>

      <div className={`absolute inset-x-0 bottom-0 top-[44%] p-5 bg-gradient-to-t from-gray-900 to-transparent
        transform transition-all duration-500 ease-out
        ${isHovered ? 'translate-y-0' : 'translate-y-20'}`}>
        <h3 className="text-2xl font-extrabold text-white mb-1">{member.name}</h3>
        <p className="text-base text-orange-500 font-bold mb-1">{member.role}</p>
        
        <div className="flex flex-wrap gap-1 mt-8">
          {member.skills.map((skill) => (
            <span key={skill} className="px-1.5 py-0.5 text-sm bg-orange-500/20 text-orange-400 rounded-full">
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className={`absolute -bottom-32 left-1/2 -translate-x-1/2 w-56 h-56 
        transition-opacity duration-300 ease-in-out pointer-events-none
        ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        <div className="w-full h-full bg-orange-500 rounded-full blur-3xl opacity-30 animate-pulse" />
      </div>
    </div>
  </div>
);

// Composant pour la version Mobile
const MobileTeamCard = ({ member, isHovered, onHover, onLeave, onClick, isSelected }) => (
  <div
    className="relative group cursor-pointer h-64"
    onMouseEnter={onHover}
    onMouseLeave={onLeave}
    onClick={onClick}
  >
    <div className="relative h-full w-full overflow-hidden rounded-lg bg-gray-800 
      transform transition-all duration-500 ease-out
      hover:scale-105 hover:shadow-xl hover:shadow-orange-500/20">
      
      <div className="relative h-full w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60" />
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover transform transition-transform duration-700 ease-out group-hover:scale-110"
        />
      </div>

      <div className={`absolute inset-x-0 bottom-0 top-[38%] p-3 bg-gradient-to-t from-gray-900 to-transparent
        transform transition-all duration-500 ease-out
        ${isHovered ? 'translate-y-0' : 'translate-y-16'}`}>
        <h3 className="text-sm font-bold text-white mb-1 ">{member.name}</h3>
        <p className="text-xs text-orange-500 font-bold mb-1 ">{member.role}</p>
        
        <div className="flex flex-wrap gap-1 mt-6">
          {member.skills.map((skill) => (
            <span key={skill} className="px-1 py-0.5 text-xs bg-orange-500/20 text-orange-400 rounded-full">
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className={`absolute -bottom-16 left-1/2 -translate-x-1/2 w-32 h-32 
        transition-opacity duration-300 ease-in-out pointer-events-none
        ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        <div className="w-full h-full bg-orange-500 rounded-full blur-xl opacity-30 animate-pulse" />
      </div>
    </div>
  </div>
);

const FuturisticOurTeam = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Effet pour détecter la taille de l'écran
  React.useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1024); // 1024px est le breakpoint lg de Tailwind
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const TeamCard = isMobile ? MobileTeamCard : DesktopTeamCard;

  return (
    <section className="bg-gray-900 py-8 sm:py-12 md:py-16 lg:py-20 px-4 min-h-screen relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-50" />
      
      {/* Animated grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px] [transform-origin:0_0] animate-[gradient_20s_ease-in-out_infinite]" />

      <div className="max-w-7xl mx-auto relative px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16 relative">
          <div className="inline-block relative">
            <h2 className={`font-bold text-white mb-3 relative z-10 ${
              isMobile ? 'text-3xl' : 'text-6xl'
            }`}>
              Notre <span className="text-orange-500 relative inline-block 
                after:content-[''] after:absolute after:-bottom-1 after:left-0 
                after:w-full after:h-1 after:bg-orange-500 after:rounded-full 
                after:origin-left after:scale-x-0 hover:after:scale-x-100 
                after:transition-transform after:duration-300">Équipe</span>
            </h2>
          </div>
          <p className={`text-gray-400 max-w-3xl mx-auto mt-3 leading-relaxed ${
            isMobile ? 'text-sm px-2' : 'text-xl px-4'
          }`}>
            Une équipe de développeurs full-stack passionnés par la création 
            d'expériences numériques exceptionnelles.
          </p>
        </div>

        {/* Team Grid */}
        <div className={`grid gap-4 sm:gap-6 md:gap-8 ${
          isMobile ? 'grid-cols-2' : 'lg:grid-cols-4'
        }`}>
          {teamMembers.map((member, index) => (
            <TeamCard
              key={member.name}
              member={member}
              isHovered={hoveredIndex === index}
              onHover={() => setHoveredIndex(index)}
              onLeave={() => setHoveredIndex(null)}
              onClick={() => setSelectedMember(selectedMember === index ? null : index)}
              isSelected={selectedMember === index}
            />
          ))}
        </div>

        {/* Decorative Elements */}
        <div className={`absolute top-0 right-0 bg-orange-500/10 rounded-full blur-3xl ${
          isMobile ? 'w-32 h-32' : 'w-56 h-56'
        }`} />
      </div>
    </section>
  );
};

export default FuturisticOurTeam;