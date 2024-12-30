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
    skills: ['PHP', 'Java', 'ELK-Stack', 'ExpressJs', ],
    description: 'Pionnier du développement full-stack et DevOps'
  },
  {
    name: 'Seydina Mouhammad Diop',
    role: 'Développeur Fullstack | UI/UX Designer',
    image: 'https://res.cloudinary.com/drxouwbms/image/upload/v1734391710/seydina-removebg-preview_btrgp6.png',
    skills: ['ReactJs', 'NuxtJs', 'ExpressJs', 'Figma', '...'],
    description: 'Créative passionnée par l\'expérience utilisateur'
  }
];

const FuturisticOurTeam = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);

  return (
    <section className="bg-gray-900 py-8 sm:py-12 md:py-16 lg:py-20 px-4 min-h-screen relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-50" />
      
      {/* Animated grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px] [transform-origin:0_0] animate-[gradient_20s_ease-in-out_infinite]" />

      <div className="max-w-7xl mx-auto relative px-4 sm:px-6 lg:px-8">
        {/* Header Section with animated text */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16 relative">
          <div className="inline-block relative">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4 relative z-10">
              Our <span className="text-orange-500 relative inline-block 
                after:content-[''] after:absolute after:-bottom-1 sm:after:-bottom-2 after:left-0 
                after:w-full after:h-0.5 sm:after:h-1 after:bg-orange-500 after:rounded-full 
                after:origin-left after:scale-x-0 hover:after:scale-x-100 
                after:transition-transform after:duration-300">Team</span>
            </h2>
          </div>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto mt-3 sm:mt-4 leading-relaxed px-2 sm:px-4">
            Une équipe de développeurs full-stack passionnés par la création 
            d'expériences numériques exceptionnelles.
          </p>
        </div>

        {/* Team Grid with hover effects */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={member.name}
              className="relative group cursor-pointer h-48 sm:h-64 md:h-72 lg:h-96"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => setSelectedMember(selectedMember === index ? null : index)}
            >
              {/* Card Container */}
              <div className="relative h-full w-full overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl bg-gray-800 
                transform transition-all duration-500 ease-out
                hover:scale-105 hover:shadow-xl hover:shadow-orange-500/20">
                
                {/* Image Container */}
                <div className="relative h-full w-full overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60" />
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transform transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                </div>

                {/* Info Overlay */}
                <div className={`absolute inset-x-0 bottom-0 top-[54%] p-3 sm:p-4 md:p-5 bg-gradient-to-t from-gray-900 to-transparent
                  transform transition-all duration-500 ease-out
                  ${hoveredIndex === index ? 'translate-y-0' : 'translate-y-16 sm:translate-y-20'}`}>
                  <h3 className="text-base sm:text-lg md:text-xl -mt-3  lg:text-2xl font-extrabold text-white mb-1">{member.name}</h3>
                  <p className="text-xs sm:text-sm md:text-base text-orange-500 font-bold mb-1">{member.role}</p>
                  
                  {/* Skills Tags */}
                  <div className="flex flex-wrap gap-1 mt-1">
                    {member.skills.map((skill) => (
                      <span key={skill} className="px-1 sm:px-1.5 py-0.5 text-[0.6rem] sm:text-xs md:text-sm bg-orange-500/20 text-orange-400 rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Spotlight Effect */}
                <div className={`absolute -bottom-24 sm:-bottom-32 left-1/2 -translate-x-1/2 w-36 sm:w-48 md:w-56 h-36 sm:h-48 md:h-56 
                  transition-opacity duration-300 ease-in-out pointer-events-none
                  ${hoveredIndex === index ? 'opacity-100' : 'opacity-0'}`}>
                  <div className="w-full h-full bg-orange-500 rounded-full blur-2xl sm:blur-3xl opacity-30 animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-32 sm:w-48 md:w-56 h-32 sm:h-48 md:h-56 bg-orange-500/10 rounded-full blur-2xl sm:blur-3xl" />
      </div>
    </section>
  );
};

export default FuturisticOurTeam;

