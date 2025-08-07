import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeftRight,
  Droplets,
  Lock,
  Calendar,
  HelpCircle,
  Info,
  Beaker,
  Settings,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
} from 'lucide-react';
import ConnectWallet from '../Wallet/ConnectWallet';
import '../../styles/neumorphism.css';

const Sidebar = ({ activePage, setActivePage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState(null);

  const menuItems = [
    {
      id: 'swap',
      label: 'Swap',
      icon: ArrowLeftRight,
      subItems: [],
    },
    {
      id: 'pool',
      label: 'Pool',
      icon: Droplets,
      subItems: ['Add', 'All', 'My'],
    },
    {
      id: 'lock',
      label: 'Lock',
      icon: Lock,
      subItems: [],
    },
    {
      id: 'daily',
      label: 'Daily',
      icon: Calendar,
      subItems: [],
    },
    {
      id: 'lab',
      label: 'Lab',
      icon: Beaker,
      subItems: ['Mint', 'Laboratory'],
    },
    {
      id: 'support',
      label: 'Support',
      icon: HelpCircle,
      subItems: [],
    },
    {
      id: 'about',
      label: 'About',
      icon: Info,
      subItems: [],
    },
  ];

  const handleMenuClick = itemId => {
    setActivePage(itemId);
    if (window.innerWidth <= 768) {
      setIsOpen(false);
    }
  };

  const sidebarVariants = {
    closed: {
      x: '-100%',
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40,
      },
    },
    open: {
      x: '0%',
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40,
      },
    },
  };

  const submenuVariants = {
    closed: {
      height: 0,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
    open: {
      height: 'auto',
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <>
      {/* Menu Toggle Button */}
      <button
        className="neu-button fixed top-6 left-6 z-50 p-2"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          minWidth: '44px',
          height: '44px',
          background: isOpen ? 'var(--accent-color)' : 'var(--primary-bg)',
          color: isOpen ? 'white' : 'var(--text-primary)',
        }}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-30 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Collapsed Sidebar (Always Visible) */}
      <div
        className="fixed left-0 top-0 h-full w-16 z-30 flex flex-col items-center py-4"
        style={{
          background: 'rgba(240, 240, 240, 0.1)',
          backdropFilter: 'blur(10px)',
          borderRight: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <div className="mt-16 flex flex-col space-y-3">
          {menuItems.map(item => {
            const Icon = item.icon;
            const isActive = activePage === item.id || activePage.startsWith(item.id);

            return (
              <button
                key={item.id}
                className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${
                  isActive
                    ? 'bg-white bg-opacity-20 shadow-lg'
                    : 'hover:bg-white hover:bg-opacity-10'
                }`}
                onClick={() => handleMenuClick(item.id)}
                title={item.label}
              >
                <Icon
                  size={16}
                  style={{
                    color: isActive ? 'var(--accent-color)' : 'var(--text-primary)',
                  }}
                />
              </button>
            );
          })}
        </div>

        <div className="mt-auto mb-4">
          <div className="w-10 h-8 rounded-lg overflow-hidden">
            <ConnectWallet />
          </div>
        </div>
      </div>

      {/* Expanded Sidebar */}
      <motion.div
        className="fixed left-0 top-0 h-full w-96 neu-surface p-6 z-50 overflow-y-auto"
        variants={sidebarVariants}
        initial="closed"
        animate={isOpen ? 'open' : 'closed'}
        style={{
          background: 'var(--primary-bg)',
          boxShadow: isOpen ? '20px 0 40px rgba(0, 0, 0, 0.2)' : 'none',
        }}
      >
        {/* Logo/Title */}
        <div className="mb-8 mt-16">
          <h1 className="text-3xl font-bold text-center" style={{ color: 'var(--accent-color)' }}>
            Fasttero
          </h1>
          <p className="text-center text-sm mt-2" style={{ color: 'var(--text-secondary)' }}>
            DeFi Platform
          </p>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-3">
          {menuItems.map(item => {
            const Icon = item.icon;
            const isActive = activePage === item.id || activePage.startsWith(item.id);

            return (
              <motion.button
                key={item.id}
                className={`neu-button w-full flex items-center space-x-3 p-3 text-left ${
                  isActive ? 'neu-pressed' : ''
                }`}
                onClick={() => handleMenuClick(item.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon size={18} className="icon-realistic" />
                <span className="font-medium text-sm">{item.label}</span>
              </motion.button>
            );
          })}
        </nav>

        {/* Connect Wallet Button */}
        <div className="mt-8">
          <ConnectWallet />
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
