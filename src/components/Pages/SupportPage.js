import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MessageCircle, 
  Mail, 
  Phone, 
  FileText, 
  HelpCircle, 
  ExternalLink,
  Search,
  Clock,
  CheckCircle
} from 'lucide-react';
import '../../styles/neumorphism.css';

const SupportPage = () => {
  const [activeSection, setActiveSection] = useState('contact');
  const [searchQuery, setSearchQuery] = useState('');

  const supportOptions = [
    {
      id: 'discord',
      title: 'Discord Community',
      description: 'Join our active community for real-time support',
      icon: MessageCircle,
      color: '#5865F2',
      link: 'https://discord.gg/fasttero'
    },
    {
      id: 'telegram',
      title: 'Telegram Support',
      description: 'Get instant help from our support team',
      icon: MessageCircle,
      color: '#0088cc',
      link: 'https://t.me/fasttero'
    },
    {
      id: 'email',
      title: 'Email Support',
      description: 'Send us detailed questions via email',
      icon: Mail,
      color: '#34a853',
      link: 'mailto:support@fasttero.com'
    },
    {
      id: 'docs',
      title: 'Documentation',
      description: 'Comprehensive guides and tutorials',
      icon: FileText,
      color: '#ff6b35',
      link: '/docs'
    }
  ];

  const faqItems = [
    {
      question: 'How do I connect my wallet?',
      answer: 'Click the "Connect Wallet" button in the sidebar and select your preferred wallet provider. We support MetaMask, WalletConnect, and more.'
    },
    {
      question: 'What are the fees for swapping?',
      answer: 'Swap fees are typically 0.3% of the transaction amount plus network gas fees. Exact fees are shown before confirming any transaction.'
    },
    {
      question: 'How does NFT staking work?',
      answer: 'Stake your Fasttero NFTs in the Laboratory to earn daily point rewards. Different rarities provide different reward rates.'
    },
    {
      question: 'When can I claim my daily spin?',
      answer: 'The daily spin resets every 24 hours. You can spin once per day to earn points and other rewards.'
    },
    {
      question: 'How do I add liquidity to pools?',
      answer: 'Go to the Pool section, select "Add Liquidity", choose your token pair, enter amounts, and confirm the transaction.'
    },
    {
      question: 'Is my wallet secure?',
      answer: 'Yes, we never store your private keys. All transactions are signed securely in your wallet before being submitted to the blockchain.'
    }
  ];

  const tickets = [
    {
      id: '#001234',
      subject: 'Unable to stake NFT',
      status: 'open',
      created: '2024-01-15',
      priority: 'high'
    },
    {
      id: '#001235',
      subject: 'Swap transaction failed',
      status: 'resolved',
      created: '2024-01-14',
      priority: 'medium'
    },
    {
      id: '#001236',
      subject: 'Daily spin not working',
      status: 'in_progress',
      created: '2024-01-13',
      priority: 'low'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'open': return 'var(--danger-color)';
      case 'in_progress': return 'var(--warning-color)';
      case 'resolved': return 'var(--success-color)';
      default: return 'var(--text-secondary)';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'open': return HelpCircle;
      case 'in_progress': return Clock;
      case 'resolved': return CheckCircle;
      default: return HelpCircle;
    }
  };

  const ContactSection = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {supportOptions.map((option, index) => {
          const Icon = option.icon;
          return (
            <motion.a
              key={option.id}
              href={option.link}
              target="_blank"
              rel="noopener noreferrer"
              className="neu-card block cursor-pointer group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center space-x-4">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: option.color + '20' }}
                >
                  <Icon size={24} style={{ color: option.color }} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg group-hover:text-blue-500 transition-colors">
                    {option.title}
                  </h3>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    {option.description}
                  </p>
                </div>
                <ExternalLink size={16} className="opacity-50 group-hover:opacity-100 transition-opacity" />
              </div>
            </motion.a>
          );
        })}
      </div>

      <motion.div
        className="neu-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h3 className="text-xl font-bold mb-4">Submit a Support Ticket</h3>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Subject</label>
            <input
              type="text"
              className="neu-input w-full"
              placeholder="Brief description of your issue"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Priority</label>
            <select className="neu-input w-full">
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
              <option>Critical</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              className="neu-input w-full h-32 resize-none"
              placeholder="Please provide detailed information about your issue..."
            ></textarea>
          </div>
          <button
            type="submit"
            className="neu-button w-full py-3 font-bold"
            style={{
              background: 'linear-gradient(45deg, var(--accent-color), var(--success-color))',
              color: 'white'
            }}
          >
            Submit Ticket
          </button>
        </form>
      </motion.div>
    </div>
  );

  const FAQSection = () => (
    <div className="space-y-6">
      <div className="neu-card">
        <div className="relative">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2" style={{ color: 'var(--text-secondary)' }} />
          <input
            type="text"
            className="neu-input w-full pl-10"
            placeholder="Search FAQ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-4">
        {faqItems
          .filter(item => 
            item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.answer.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((item, index) => (
            <motion.div
              key={index}
              className="neu-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <details className="group">
                <summary className="font-bold text-lg cursor-pointer list-none flex items-center justify-between">
                  {item.question}
                  <HelpCircle size={20} className="group-open:rotate-180 transition-transform" />
                </summary>
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <p style={{ color: 'var(--text-secondary)' }}>{item.answer}</p>
                </div>
              </details>
            </motion.div>
          ))}
      </div>
    </div>
  );

  const TicketsSection = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold">Your Support Tickets</h3>
        <button 
          className="neu-button px-4 py-2"
          onClick={() => setActiveSection('contact')}
        >
          New Ticket
        </button>
      </div>

      <div className="space-y-4">
        {tickets.map((ticket, index) => {
          const StatusIcon = getStatusIcon(ticket.status);
          return (
            <motion.div
              key={ticket.id}
              className="neu-card cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <StatusIcon size={20} style={{ color: getStatusColor(ticket.status) }} />
                  <div>
                    <div className="font-bold">{ticket.id}</div>
                    <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                      {ticket.subject}
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div 
                    className="px-2 py-1 rounded text-xs font-medium mb-1"
                    style={{ 
                      backgroundColor: getStatusColor(ticket.status) + '20',
                      color: getStatusColor(ticket.status)
                    }}
                  >
                    {ticket.status.replace('_', ' ').toUpperCase()}
                  </div>
                  <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                    {ticket.created}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="support-page">
      <motion.div
        className="page-header mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
          Support Center
        </h1>
        <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
          Get help and find answers to your questions
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
          className={`neu-button px-6 py-3 mx-1 ${activeSection === 'contact' ? 'neu-pressed' : ''}`}
          onClick={() => setActiveSection('contact')}
        >
          <MessageCircle size={16} className="inline mr-2" />
          Contact
        </button>
        <button
          className={`neu-button px-6 py-3 mx-1 ${activeSection === 'faq' ? 'neu-pressed' : ''}`}
          onClick={() => setActiveSection('faq')}
        >
          <HelpCircle size={16} className="inline mr-2" />
          FAQ
        </button>
        <button
          className={`neu-button px-6 py-3 mx-1 ${activeSection === 'tickets' ? 'neu-pressed' : ''}`}
          onClick={() => setActiveSection('tickets')}
        >
          <FileText size={16} className="inline mr-2" />
          My Tickets
        </button>
      </motion.div>

      {/* Tab Content */}
      <motion.div
        key={activeSection}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeSection === 'contact' && <ContactSection />}
        {activeSection === 'faq' && <FAQSection />}
        {activeSection === 'tickets' && <TicketsSection />}
      </motion.div>
    </div>
  );
};

export default SupportPage;
