import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ExternalLink, 
  Twitter, 
  MessageCircle, 
  Github, 
  Globe,
  FileText,
  Calendar,
  Users,
  Target,
  TrendingUp,
  Award
} from 'lucide-react';
import '../../styles/neumorphism.css';

const AboutPage = () => {
  const [activeTab, setActiveTab] = useState('about');

  const socialLinks = [
    {
      name: 'Twitter',
      icon: Twitter,
      url: 'https://twitter.com/fasttero',
      color: '#1da1f2',
      followers: '12.5K'
    },
    {
      name: 'Discord',
      icon: MessageCircle,
      url: 'https://discord.gg/fasttero',
      color: '#5865f2',
      followers: '8.2K'
    },
    {
      name: 'Telegram',
      icon: MessageCircle,
      url: 'https://t.me/fasttero',
      color: '#0088cc',
      followers: '15.7K'
    },
    {
      name: 'GitHub',
      icon: Github,
      url: 'https://github.com/fasttero',
      color: '#333',
      followers: '1.2K'
    },
    {
      name: 'Website',
      icon: Globe,
      url: 'https://fasttero.com',
      color: '#4a90e2',
      followers: 'Official'
    },
    {
      name: 'Medium',
      icon: FileText,
      url: 'https://medium.com/@fasttero',
      color: '#00ab6c',
      followers: '3.4K'
    }
  ];

  const teamMembers = [
    {
      name: 'Alex Chen',
      role: 'CEO & Founder',
      bio: 'Former blockchain engineer at top DeFi protocols with 8+ years experience.',
      image: '/api/placeholder/100/100'
    },
    {
      name: 'Sarah Kim',
      role: 'CTO',
      bio: 'Smart contract expert and security auditor, previously at ConsenSys.',
      image: '/api/placeholder/100/100'
    },
    {
      name: 'Mike Rodriguez',
      role: 'Head of Product',
      bio: 'Product strategist with experience building user-centric DeFi platforms.',
      image: '/api/placeholder/100/100'
    },
    {
      name: 'Emma Thompson',
      role: 'Lead Designer',
      bio: 'UI/UX specialist focused on making DeFi accessible to everyone.',
      image: '/api/placeholder/100/100'
    }
  ];

  const roadmapItems = [
    {
      quarter: 'Q1 2024',
      status: 'completed',
      items: [
        'Platform Launch',
        'Basic Swap Functionality',
        'NFT Marketplace',
        'Community Building'
      ]
    },
    {
      quarter: 'Q2 2024',
      status: 'in_progress',
      items: [
        'Advanced Pool Features',
        'Cross-chain Bridge',
        'Mobile App Launch',
        'Governance Token'
      ]
    },
    {
      quarter: 'Q3 2024',
      status: 'planned',
      items: [
        'DAO Governance',
        'Yield Farming',
        'NFT Staking V2',
        'Institutional Tools'
      ]
    },
    {
      quarter: 'Q4 2024',
      status: 'planned',
      items: [
        'Layer 2 Integration',
        'Advanced Analytics',
        'API Marketplace',
        'Global Expansion'
      ]
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'var(--success-color)';
      case 'in_progress': return 'var(--warning-color)';
      case 'planned': return 'var(--accent-color)';
      default: return 'var(--text-secondary)';
    }
  };

  const AboutSection = () => (
    <div className="space-y-8">
      {/* Mission Statement */}
      <motion.div
        className="neu-card text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-6" style={{ color: 'var(--accent-color)' }}>
          Our Mission
        </h2>
        <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          Fasttero is revolutionizing DeFi by creating the most user-friendly, secure, and innovative 
          decentralized finance platform. We believe in making DeFi accessible to everyone while 
          maintaining the highest standards of security and transparency.
        </p>
      </motion.div>

      {/* Key Features */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="neu-card text-center">
          <TrendingUp size={32} className="mx-auto mb-4" style={{ color: 'var(--success-color)' }} />
          <h3 className="text-xl font-bold mb-3">High Yields</h3>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Competitive APY rates across all our liquidity pools and staking options.
          </p>
        </div>
        <div className="neu-card text-center">
          <Award size={32} className="mx-auto mb-4" style={{ color: 'var(--warning-color)' }} />
          <h3 className="text-xl font-bold mb-3">Security First</h3>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Audited smart contracts and battle-tested security protocols.
          </p>
        </div>
        <div className="neu-card text-center">
          <Users size={32} className="mx-auto mb-4" style={{ color: 'var(--accent-color)' }} />
          <h3 className="text-xl font-bold mb-3">Community Driven</h3>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Governed by our community through decentralized voting mechanisms.
          </p>
        </div>
      </motion.div>

      {/* Team Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              className="neu-card text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-20 h-20 rounded-full mx-auto mb-4 neu-surface" style={{
                background: 'linear-gradient(135deg, var(--accent-color), var(--success-color))'
              }}></div>
              <h4 className="font-bold text-lg">{member.name}</h4>
              <p className="text-sm mb-3" style={{ color: 'var(--accent-color)' }}>
                {member.role}
              </p>
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                {member.bio}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );

  const SocialSection = () => (
    <div className="space-y-6">
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-4">Connect With Us</h2>
        <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
          Stay updated with the latest news and join our growing community
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {socialLinks.map((social, index) => {
          const Icon = social.icon;
          return (
            <motion.a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="neu-card group cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center space-x-4">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: social.color + '20' }}
                >
                  <Icon size={24} style={{ color: social.color }} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg group-hover:opacity-80 transition-opacity">
                    {social.name}
                  </h3>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    {social.followers} {social.followers === 'Official' ? '' : 'followers'}
                  </p>
                </div>
                <ExternalLink size={16} className="opacity-50 group-hover:opacity-100 transition-opacity" />
              </div>
            </motion.a>
          );
        })}
      </div>

      {/* Community Stats */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="neu-card text-center">
          <div className="text-3xl font-bold mb-2" style={{ color: 'var(--success-color)' }}>
            45K+
          </div>
          <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Community Members
          </div>
        </div>
        <div className="neu-card text-center">
          <div className="text-3xl font-bold mb-2" style={{ color: 'var(--accent-color)' }}>
            $12M+
          </div>
          <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Total Value Locked
          </div>
        </div>
        <div className="neu-card text-center">
          <div className="text-3xl font-bold mb-2" style={{ color: 'var(--warning-color)' }}>
            25K+
          </div>
          <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            NFTs Minted
          </div>
        </div>
        <div className="neu-card text-center">
          <div className="text-3xl font-bold mb-2" style={{ color: 'var(--danger-color)' }}>
            150+
          </div>
          <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Countries
          </div>
        </div>
      </motion.div>
    </div>
  );

  const RoadmapSection = () => (
    <div className="space-y-6">
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-4">Development Roadmap</h2>
        <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
          Our journey to revolutionize DeFi
        </p>
      </motion.div>

      <div className="space-y-6">
        {roadmapItems.map((quarter, index) => (
          <motion.div
            key={quarter.quarter}
            className="neu-card"
            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <div className="flex items-start space-x-4">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: getStatusColor(quarter.status) }}
              >
                {quarter.quarter.split(' ')[0]}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-4">
                  <h3 className="text-xl font-bold">{quarter.quarter}</h3>
                  <span 
                    className="px-3 py-1 rounded-full text-xs font-medium text-white"
                    style={{ backgroundColor: getStatusColor(quarter.status) }}
                  >
                    {quarter.status.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {quarter.items.map((item, itemIndex) => (
                    <div 
                      key={itemIndex}
                      className="neu-pressed p-3 flex items-center space-x-2"
                    >
                      {quarter.status === 'completed' ? (
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      ) : quarter.status === 'in_progress' ? (
                        <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                      ) : (
                        <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                      )}
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="about-page">
      <motion.div
        className="page-header mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
          About Fasttero
        </h1>
        <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
          Building the future of decentralized finance
        </p>
      </motion.div>

      {/* Tab Navigation */}
      <motion.div
        className="tab-navigation neu-surface p-2 rounded-lg mb-8 inline-flex"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <button
          className={`neu-button px-6 py-3 mx-1 ${activeTab === 'about' ? 'neu-pressed' : ''}`}
          onClick={() => setActiveTab('about')}
        >
          <Target size={16} className="inline mr-2" />
          About Us
        </button>
        <button
          className={`neu-button px-6 py-3 mx-1 ${activeTab === 'social' ? 'neu-pressed' : ''}`}
          onClick={() => setActiveTab('social')}
        >
          <Users size={16} className="inline mr-2" />
          Community
        </button>
        <button
          className={`neu-button px-6 py-3 mx-1 ${activeTab === 'roadmap' ? 'neu-pressed' : ''}`}
          onClick={() => setActiveTab('roadmap')}
        >
          <Calendar size={16} className="inline mr-2" />
          Roadmap
        </button>
        <button
          className={`neu-button px-6 py-3 mx-1 ${activeTab === 'whitepaper' ? 'neu-pressed' : ''}`}
          onClick={() => setActiveTab('whitepaper')}
        >
          <FileText size={16} className="inline mr-2" />
          Whitepaper
        </button>
      </motion.div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'about' && <AboutSection />}
        {activeTab === 'social' && <SocialSection />}
        {activeTab === 'roadmap' && <RoadmapSection />}
        {activeTab === 'whitepaper' && (
          <div className="neu-card text-center">
            <FileText size={64} className="mx-auto mb-6" style={{ color: 'var(--accent-color)' }} />
            <h3 className="text-2xl font-bold mb-4">Whitepaper</h3>
            <p className="text-lg mb-6" style={{ color: 'var(--text-secondary)' }}>
              Read our comprehensive whitepaper to understand the technology and vision behind Fasttero.
            </p>
            <button className="neu-button px-8 py-4 font-bold" style={{
              background: 'linear-gradient(45deg, var(--accent-color), var(--success-color))',
              color: 'white'
            }}>
              <ExternalLink size={20} className="inline mr-2" />
              Download Whitepaper
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AboutPage;
