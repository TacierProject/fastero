import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Sidebar from './Sidebar';
import SwapPage from '../Pages/SwapPage';
import PoolPage from '../Pages/PoolPage';
import LockPage from '../Pages/LockPage';
import DailyPage from '../Pages/DailyPage';
import LabPage from '../Pages/LabPage';
import SupportPage from '../Pages/SupportPage';
import AboutPage from '../Pages/AboutPage';
import '../../styles/neumorphism.css';

const MainLayout = () => {
  const [activePage, setActivePage] = useState('swap');

  const renderPage = () => {
    switch (activePage) {
      case 'swap':
      case 'swap-settings':
      case 'swap-chains':
        return <SwapPage activeTab={activePage} />;
      case 'pool':
      case 'pool-add':
      case 'pool-all':
      case 'pool-my':
        return <PoolPage activeTab={activePage} />;
      case 'lock':
        return <LockPage />;
      case 'daily':
        return <DailyPage />;
      case 'lab':
      case 'lab-mint':
      case 'lab-laboratory':
        return <LabPage activeTab={activePage} />;
      case 'support':
        return <SupportPage />;
      case 'about':
        return <AboutPage />;
      default:
        return <SwapPage activeTab="swap" />;
    }
  };

  return (
    <div
      className="main-layout"
      style={{
        height: '100vh',
        overflow: 'hidden',
        background: 'var(--primary-bg)',
        width: '100vw',
        maxWidth: '100vw',
      }}
    >
      <Sidebar activePage={activePage} setActivePage={setActivePage} />

      <motion.main
        className="main-content"
        style={{
          marginLeft: '64px', // Space for the collapsed sidebar
          height: '100vh',
          overflow: 'auto',
          padding: '20px',
          scrollBehavior: 'smooth',
          width: 'calc(100vw - 64px)',
          maxWidth: 'calc(100vw - 64px)',
        }}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div
          className="content-wrapper"
          style={{
            maxWidth: '1400px',
            margin: '0 auto',
            paddingTop: '80px', // Space for menu button
            paddingBottom: '40px', // Footer spacing
            width: '100%',
            overflowX: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div style={{ width: '100%', maxWidth: '1200px' }}>{renderPage()}</div>
        </div>
      </motion.main>
    </div>
  );
};

export default MainLayout;
