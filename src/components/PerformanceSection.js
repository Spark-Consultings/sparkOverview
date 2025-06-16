import React, { useState } from 'react';
import { 
  Lightbulb, 
  Settings, 
  Rocket, 
  Copy, 
  User,
  MessageSquare,
  FileText,
  Users,
  Lock,
  Bell,
  Headphones,
  Ticket,
  GitBranch,
  Bot,
  UserPlus,
  Zap,
  BarChart3,
  TrendingUp
} from 'lucide-react';

const CodeBlock = ({ language, code, onCopy }) => (
  <div className="bg-gray-900/50 rounded-lg p-3 sm:p-4 border border-gray-700/30 backdrop-blur-sm">
    <div className="flex items-center justify-between mb-2">
      <span className="text-orange-400 text-xs font-mono">{language}</span>
      <button
        onClick={() => onCopy(code)}
        className="p-1 hover:bg-gray-700/50 rounded text-gray-400 hover:text-white transition-colors"
      >
        <Copy className="w-4 h-4" />
      </button>
    </div>
    <code className="text-green-400 text-sm font-mono block whitespace-pre-wrap break-all">
      {code}
    </code>
  </div>
);

const FeatureTag = ({ children, icon: Icon, color = "orange" }) => {
  const colorClasses = {
    orange: "bg-orange-500/10 text-orange-300 border-orange-500/20",
    blue: "bg-blue-500/10 text-blue-300 border-blue-500/20",
    green: "bg-green-500/10 text-green-300 border-green-500/20",
    purple: "bg-purple-500/10 text-purple-300 border-purple-500/20",
    red: "bg-red-500/10 text-red-300 border-red-500/20"
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium border ${colorClasses[color]}`}>
      {Icon && <Icon className="w-3 h-3" />}
      {children}
    </span>
  );
};

const TestimonialCard = ({ author, role, content, avatar }) => (
  <div className="bg-gradient-to-br from-pink-100 to-purple-100 rounded-2xl p-6 text-gray-800 max-w-md">
    <div className="flex items-center gap-3 mb-4">
      <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
        {avatar}
      </div>
      <div>
        <h4 className="font-semibold text-gray-900">{author}</h4>
        <p className="text-sm text-gray-600">{role}</p>
      </div>
    </div>
    <blockquote className="text-gray-700 leading-relaxed italic">
      "{content}"
    </blockquote>
  </div>
);

const SparklineFeatures = () => {
  const [copiedCode, setCopiedCode] = useState('');

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(''), 2000);
  };

  const npmCode = "npm install @sparkline/sdk";
  const reactCode = "import { SparklineClient } from '@sparkline/sdk'";

  return (
    <div className="bg-gradient-to-br from-gray-950 via-slate-900 to-gray-950 py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          
          {/* Left Column */}
          <div className="space-y-8">
            
            {/* Outils puissants */}
            <div className="bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-gray-700/30">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                  <Lightbulb className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  Outils puissants pour une gestion fluide
                </h3>
              </div>
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                Gérez vos projets, équipes et processus sur une seule plateforme. Intégrez 
                facilement vos outils existants et automatisez vos workflows.
              </p>

              <div className="space-y-4">
                <CodeBlock 
                  language="npm"
                  code={npmCode}
                  onCopy={handleCopy}
                />
                <CodeBlock 
                  language="react"
                  code={reactCode}
                  onCopy={handleCopy}
                />
              </div>
            </div>

            {/* Testimonial */}
            <TestimonialCard
              author="Marie Dubois"
              role="CTO de TechFlow"
              content="Avec Sparkline, nous révolutionnons la gestion de nos projets et de nos équipes. Une solution tout-en-un pour centraliser, automatiser et simplifier notre quotidien."
              avatar="MD"
            />
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            
            {/* Plateforme fiable */}
            <div className="bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-gray-700/30">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-lg flex items-center justify-center">
                  <Settings className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  Une plateforme fiable et évolutive
                </h3>
              </div>
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                Nous utilisons des technologies éprouvées pour garantir performance et sécurité. 
                Sparkline est conçu pour évoluer avec votre entreprise.
              </p>
            </div>

            {/* Allez plus vite */}
            <div className="bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-gray-700/30">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-red-500 rounded-lg flex items-center justify-center">
                  <Rocket className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  🚀 Allez plus vite avec Sparkline
                </h3>
              </div>
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                Nous avons intégré tout ce dont vous avez besoin pour booster votre productivité.
              </p>

              {/* Feature Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                <FeatureTag icon={MessageSquare} color="blue">Messagerie</FeatureTag>
                <FeatureTag icon={FileText} color="green">Documentation</FeatureTag>
                <FeatureTag icon={Users} color="purple">Équipes</FeatureTag>
                <FeatureTag icon={Lock} color="red">Sécurité</FeatureTag>
                <FeatureTag icon={Bell} color="orange">Notifications</FeatureTag>
                <FeatureTag icon={Headphones} color="blue">Support client</FeatureTag>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                <FeatureTag icon={Ticket} color="green">Gestion des tickets</FeatureTag>
                <FeatureTag icon={GitBranch} color="purple">Workflows</FeatureTag>
                <FeatureTag icon={Bot} color="blue">Chatbots</FeatureTag>
                <FeatureTag icon={Zap} color="orange">Automation</FeatureTag>
                <FeatureTag icon={UserPlus} color="green">Collaboration</FeatureTag>
                <FeatureTag icon={User} color="red">Personnalisation</FeatureTag>
              </div>

              <div className="flex flex-wrap gap-2">
                <FeatureTag icon={BarChart3} color="blue">Analytics</FeatureTag>
                <FeatureTag icon={TrendingUp} color="green">Scalabilité</FeatureTag>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-orange-500/10 via-red-500/10 to-orange-500/10 rounded-2xl p-8 border border-orange-500/20">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Prêt à transformer votre entreprise ?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Rejoignez les centaines d'entreprises qui font confiance à Sparkline 
              pour optimiser leurs processus et accélérer leur croissance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105">
                Commencer gratuitement
              </button>
              <button className="bg-white/10 backdrop-blur-xl text-white px-8 py-3 rounded-xl font-semibold border border-white/20 hover:bg-white/20 transition-all duration-300">
                Planifier une démo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SparklineFeatures;