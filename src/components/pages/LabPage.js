import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Lock, Unlock, Star, Image, Coins } from 'lucide-react';
import '../../styles/neumorphism.css';

const LabPage = ({ activeTab }) => {
  const [selectedTab, setSelectedTab] = useState('mint');
  const [selectedNFT, setSelectedNFT] = useState(null);
  const [stakedNFTs, setStakedNFTs] = useState([]);
  const [mintAmount, setMintAmount] = useState(1);

  const nftCollections = [
    {
      id: 1,
      name: 'Fasttero Genesis',
      image: '/api/placeholder/200/250',
      price: '0.002 ETH',
      rarity: 'Common',
      attributes: ['Speed +10', 'Power +5'],
      stakeReward: '50 points/day',
    },
    {
      id: 2,
      name: 'Fasttero Rare',
      image: '/api/placeholder/200/250',
      price: '0.002 ETH',
      rarity: 'Rare',
      attributes: ['Speed +20', 'Power +15', 'Luck +5'],
      stakeReward: '100 points/day',
    },
    {
      id: 3,
      name: 'Fasttero Epic',
      image: '/api/placeholder/200/250',
      price: '0.002 ETH',
      rarity: 'Epic',
      attributes: ['Speed +35', 'Power +25', 'Luck +15'],
      stakeReward: '200 points/day',
    },
    {
      id: 4,
      name: 'Fasttero Legendary',
      image: '/api/placeholder/200/250',
      price: '0.002 ETH',
      rarity: 'Legendary',
      attributes: ['Speed +50', 'Power +40', 'Luck +30'],
      stakeReward: '500 points/day',
    },
  ];

  const userNFTs = [
    { id: 1, name: 'Fasttero #001', rarity: 'Common', staked: false, rewards: 0 },
    { id: 2, name: 'Fasttero #157', rarity: 'Rare', staked: true, rewards: 450 },
    { id: 3, name: 'Fasttero #888', rarity: 'Epic', staked: false, rewards: 0 },
    { id: 4, name: 'Fasttero #999', rarity: 'Legendary', staked: true, rewards: 2100 },
  ];

  const handleMint = () => {
    console.log(`Minting ${mintAmount} NFT(s)`);
    // Implementation for minting
  };

  const handleStake = nftId => {
    setStakedNFTs(prev => [...prev, nftId]);
    console.log(`Staking NFT ${nftId}`);
  };

  const handleUnstake = nftId => {
    setStakedNFTs(prev => prev.filter(id => id !== nftId));
    console.log(`Unstaking NFT ${nftId}`);
  };

  const getRarityColor = rarity => {
    switch (rarity) {
      case 'Common':
        return '#10b981';
      case 'Rare':
        return '#3b82f6';
      case 'Epic':
        return '#8b5cf6';
      case 'Legendary':
        return '#f59e0b';
      default:
        return '#6b7280';
    }
  };

  const MintTab = () => (
    <motion.div
      className="mint-tab"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Mint Controls */}
      <div className="mint-controls neu-card mb-8 text-center">
        <h3 className="text-2xl font-bold mb-4">Mint Fasttero NFTs</h3>
        <p className="text-lg mb-6" style={{ color: 'var(--text-secondary)' }}>
          Price: 0.002 ETH per NFT
        </p>

        <div className="mint-amount-selector mb-6">
          <label className="block text-sm font-medium mb-2">Mint Amount</label>
          <div className="flex items-center justify-center space-x-4">
            <button
              className="neu-button p-3"
              onClick={() => setMintAmount(Math.max(1, mintAmount - 1))}
            >
              -
            </button>
            <div className="neu-input text-center w-20 py-3 text-xl font-bold">{mintAmount}</div>
            <button
              className="neu-button p-3"
              onClick={() => setMintAmount(Math.min(10, mintAmount + 1))}
            >
              +
            </button>
          </div>
          <div className="text-sm mt-2" style={{ color: 'var(--text-secondary)' }}>
            Total: {(0.002 * mintAmount).toFixed(3)} ETH
          </div>
        </div>

        <button
          className="neu-button px-8 py-4 text-lg font-bold"
          style={{
            background: 'linear-gradient(45deg, var(--accent-color), var(--success-color))',
            color: 'white',
          }}
          onClick={handleMint}
        >
          <Zap size={20} className="inline mr-2" />
          Mint NFT{mintAmount > 1 ? 's' : ''}
        </button>
      </div>

      {/* NFT Masonry Layout */}
      <div className="masonry-container">
        {nftCollections.map((nft, index) => (
          <motion.div
            key={nft.id}
            className="masonry-item neu-card cursor-pointer"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -10 }}
            onClick={() => setSelectedNFT(nft)}
          >
            <div
              className="nft-image-placeholder neu-surface mb-4"
              style={{
                height: `${200 + Math.random() * 100}px`,
                borderRadius: '12px',
                background: `linear-gradient(135deg, ${getRarityColor(
                  nft.rarity
                )}, ${getRarityColor(nft.rarity)}dd)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Image size={48} style={{ color: 'white', opacity: 0.8 }} />
            </div>

            <div className="nft-info">
              <h4 className="font-bold text-lg mb-2">{nft.name}</h4>
              <div className="flex items-center justify-between mb-2">
                <span
                  className="px-2 py-1 rounded text-xs font-medium"
                  style={{
                    backgroundColor: getRarityColor(nft.rarity) + '20',
                    color: getRarityColor(nft.rarity),
                  }}
                >
                  {nft.rarity}
                </span>
                <span className="font-bold">{nft.price}</span>
              </div>

              <div
                className="attributes text-xs space-y-1"
                style={{ color: 'var(--text-secondary)' }}
              >
                {nft.attributes.map((attr, i) => (
                  <div key={i}>{attr}</div>
                ))}
              </div>

              <div
                className="stake-info text-xs mt-2 text-center"
                style={{ color: 'var(--success-color)' }}
              >
                Stake Reward: {nft.stakeReward}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  const LaboratoryTab = () => (
    <motion.div
      className="laboratory-tab"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Staking Stats */}
      <div className="staking-stats grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="neu-card text-center">
          <Star size={24} className="mx-auto mb-2" style={{ color: 'var(--warning-color)' }} />
          <div className="text-2xl font-bold">4</div>
          <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            NFTs Owned
          </div>
        </div>
        <div className="neu-card text-center">
          <Lock size={24} className="mx-auto mb-2" style={{ color: 'var(--accent-color)' }} />
          <div className="text-2xl font-bold">2</div>
          <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            NFTs Staked
          </div>
        </div>
        <div className="neu-card text-center">
          <Coins size={24} className="mx-auto mb-2" style={{ color: 'var(--success-color)' }} />
          <div className="text-2xl font-bold">2,550</div>
          <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Points Earned
          </div>
        </div>
        <div className="neu-card text-center">
          <Zap size={24} className="mx-auto mb-2" style={{ color: 'var(--danger-color)' }} />
          <div className="text-2xl font-bold">650</div>
          <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Daily Rate
          </div>
        </div>
      </div>

      {/* NFT Grid */}
      <div className="nft-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {userNFTs.map((nft, index) => (
          <motion.div
            key={nft.id}
            className="nft-card neu-card"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <div
              className="nft-image-placeholder neu-surface mb-4"
              style={{
                height: '200px',
                borderRadius: '12px',
                background: `linear-gradient(135deg, ${getRarityColor(
                  nft.rarity
                )}, ${getRarityColor(nft.rarity)}dd)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
              }}
            >
              <Image size={48} style={{ color: 'white', opacity: 0.8 }} />
              {nft.staked && (
                <div className="absolute top-2 right-2 neu-surface p-2 rounded-full">
                  <Lock size={16} style={{ color: 'var(--accent-color)' }} />
                </div>
              )}
            </div>

            <div className="nft-info">
              <h4 className="font-bold text-lg mb-2">{nft.name}</h4>
              <div className="flex items-center justify-between mb-3">
                <span
                  className="px-2 py-1 rounded text-xs font-medium"
                  style={{
                    backgroundColor: getRarityColor(nft.rarity) + '20',
                    color: getRarityColor(nft.rarity),
                  }}
                >
                  {nft.rarity}
                </span>
                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {nft.staked ? 'Staked' : 'Available'}
                </span>
              </div>

              {nft.staked && (
                <div className="rewards-info neu-pressed p-3 mb-3 text-center">
                  <div className="text-lg font-bold" style={{ color: 'var(--success-color)' }}>
                    {nft.rewards} Points
                  </div>
                  <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                    Pending Rewards
                  </div>
                </div>
              )}

              <button
                className={`neu-button w-full py-3 font-medium ${
                  nft.staked ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
                }`}
                style={{
                  background: nft.staked
                    ? 'linear-gradient(45deg, var(--danger-color), #ff6b6b)'
                    : 'linear-gradient(45deg, var(--success-color), #51cf66)',
                }}
                onClick={() => (nft.staked ? handleUnstake(nft.id) : handleStake(nft.id))}
              >
                {nft.staked ? (
                  <>
                    <Unlock size={16} className="inline mr-2" />
                    Unstake & Claim
                  </>
                ) : (
                  <>
                    <Lock size={16} className="inline mr-2" />
                    Stake NFT
                  </>
                )}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  return (
    <div className="lab-page">
      <motion.div
        className="page-header mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
          Laboratory
        </h1>
        <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
          Mint unique NFTs and stake them to earn rewards
        </p>
      </motion.div>

      {/* Tab Navigation */}
      <motion.div
        className="tab-navigation neu-surface p-1 rounded-lg mb-6 inline-flex"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <button
          className={`neu-button px-4 py-2 mx-1 text-sm ${
            selectedTab === 'mint' ? 'neu-pressed' : ''
          }`}
          onClick={() => setSelectedTab('mint')}
        >
          <Image size={14} className="inline mr-1" />
          Mint
        </button>
        <button
          className={`neu-button px-4 py-2 mx-1 text-sm ${
            selectedTab === 'laboratory' ? 'neu-pressed' : ''
          }`}
          onClick={() => setSelectedTab('laboratory')}
        >
          <Star size={14} className="inline mr-1" />
          Laboratory
        </button>
      </motion.div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {selectedTab === 'mint' ? <MintTab /> : <LaboratoryTab />}
      </AnimatePresence>

      {/* NFT Detail Modal */}
      <AnimatePresence>
        {selectedNFT && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedNFT(null)}
          >
            <motion.div
              className="neu-popup max-w-md w-full mx-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold mb-4">{selectedNFT.name}</h3>
              <div
                className="nft-image-placeholder neu-surface mb-4"
                style={{
                  height: '300px',
                  borderRadius: '12px',
                  background: `linear-gradient(135deg, ${getRarityColor(
                    selectedNFT.rarity
                  )}, ${getRarityColor(selectedNFT.rarity)}dd)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Image size={64} style={{ color: 'white', opacity: 0.8 }} />
              </div>

              <div className="details space-y-3">
                <div className="flex justify-between">
                  <span>Rarity:</span>
                  <span style={{ color: getRarityColor(selectedNFT.rarity) }}>
                    {selectedNFT.rarity}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Price:</span>
                  <span className="font-bold">{selectedNFT.price}</span>
                </div>
                <div>
                  <div className="mb-2">Attributes:</div>
                  <div className="space-y-1">
                    {selectedNFT.attributes.map((attr, i) => (
                      <div key={i} className="neu-pressed p-2 text-sm">
                        {attr}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between">
                  <span>Stake Reward:</span>
                  <span style={{ color: 'var(--success-color)' }}>{selectedNFT.stakeReward}</span>
                </div>
              </div>

              <button
                className="neu-button w-full mt-6 py-3 font-bold"
                style={{
                  background: 'linear-gradient(45deg, var(--accent-color), var(--success-color))',
                  color: 'white',
                }}
                onClick={() => {
                  handleMint();
                  setSelectedNFT(null);
                }}
              >
                Mint This NFT
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LabPage;
