import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, TrendingUp, DollarSign, Percent } from 'lucide-react';
import '../../styles/neumorphism.css';

const PoolPage = ({ activeTab }) => {
  const [selectedTab, setSelectedTab] = useState('all');
  const [addLiquidityToken1, setAddLiquidityToken1] = useState('ETH');
  const [addLiquidityToken2, setAddLiquidityToken2] = useState('USDC');
  const [amount1, setAmount1] = useState('');
  const [amount2, setAmount2] = useState('');

  const poolData = [
    {
      id: 1,
      pair: 'ETH/USDC',
      tvl: '$2.4M',
      apr: '12.34%',
      volume24h: '$456K',
      myLiquidity: '$1,234.56',
      userShare: '0.05%',
    },
    {
      id: 2,
      pair: 'BTC/ETH',
      tvl: '$1.8M',
      apr: '8.92%',
      volume24h: '$234K',
      myLiquidity: '$890.12',
      userShare: '0.03%',
    },
    {
      id: 3,
      pair: 'MATIC/USDC',
      tvl: '$896K',
      apr: '15.67%',
      volume24h: '$123K',
      myLiquidity: '$0',
      userShare: '0%',
    },
  ];

  const tabContent = () => {
    switch (selectedTab) {
      case 'add':
        return (
          <motion.div
            className="add-liquidity-form neu-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold mb-6">Add Liquidity</h3>

            <div className="space-y-4">
              {/* Token 1 Input */}
              <div className="neu-card">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                    Token 1
                  </span>
                  <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    Balance: 2.456 ETH
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <button className="neu-button flex items-center space-x-2 px-4 py-3">
                    <div className="w-8 h-8 rounded-full bg-blue-500"></div>
                    <span className="font-medium">{addLiquidityToken1}</span>
                  </button>
                  <input
                    type="number"
                    placeholder="0.0"
                    value={amount1}
                    onChange={e => setAmount1(e.target.value)}
                    className="neu-input flex-1 text-right text-xl font-bold"
                  />
                </div>
              </div>

              {/* Plus Icon */}
              <div className="flex justify-center">
                <div className="neu-surface p-3 rounded-full">
                  <Plus size={24} />
                </div>
              </div>

              {/* Token 2 Input */}
              <div className="neu-card">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                    Token 2
                  </span>
                  <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    Balance: 1,234.56 USDC
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <button className="neu-button flex items-center space-x-2 px-4 py-3">
                    <div className="w-8 h-8 rounded-full bg-green-500"></div>
                    <span className="font-medium">{addLiquidityToken2}</span>
                  </button>
                  <input
                    type="number"
                    placeholder="0.0"
                    value={amount2}
                    onChange={e => setAmount2(e.target.value)}
                    className="neu-input flex-1 text-right text-xl font-bold"
                  />
                </div>
              </div>

              {/* Pool Info */}
              <div className="neu-card">
                <h4 className="font-medium mb-3">Pool Information</h4>
                <div className="space-y-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  <div className="flex justify-between">
                    <span>Pool Share</span>
                    <span>0.05%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated APR</span>
                    <span className="text-green-500">12.34%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>LP Tokens</span>
                    <span>0.0045 ETH-USDC LP</span>
                  </div>
                </div>
              </div>

              <button
                className="neu-button w-full py-4 text-lg font-bold"
                style={{
                  background: 'linear-gradient(45deg, var(--accent-color), var(--success-color))',
                  color: 'white',
                }}
              >
                Add Liquidity
              </button>
            </div>
          </motion.div>
        );

      case 'my':
        return (
          <motion.div
            className="my-pools"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold mb-6">My Pools</h3>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="neu-card text-center">
                <DollarSign
                  size={24}
                  className="mx-auto mb-2"
                  style={{ color: 'var(--accent-color)' }}
                />
                <div className="text-2xl font-bold">$2,124.68</div>
                <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  Total Liquidity
                </div>
              </div>
              <div className="neu-card text-center">
                <TrendingUp
                  size={24}
                  className="mx-auto mb-2"
                  style={{ color: 'var(--success-color)' }}
                />
                <div className="text-2xl font-bold">$156.78</div>
                <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  Total Earnings
                </div>
              </div>
              <div className="neu-card text-center">
                <Percent
                  size={24}
                  className="mx-auto mb-2"
                  style={{ color: 'var(--warning-color)' }}
                />
                <div className="text-2xl font-bold">11.2%</div>
                <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  Avg APR
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {poolData
                .filter(pool => parseFloat(pool.myLiquidity.replace('$', '').replace(',', '')) > 0)
                .map(pool => (
                  <motion.div
                    key={pool.id}
                    className="neu-card"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex -space-x-2">
                          <div className="w-10 h-10 rounded-full bg-blue-500 border-2 border-white"></div>
                          <div className="w-10 h-10 rounded-full bg-green-500 border-2 border-white"></div>
                        </div>
                        <div>
                          <div className="font-bold text-lg">{pool.pair}</div>
                          <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                            Your share: {pool.userShare}
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-lg font-bold">{pool.myLiquidity}</div>
                        <div className="text-sm text-green-500">+{pool.apr} APR</div>
                      </div>

                      <div className="flex space-x-2">
                        <button className="neu-button px-4 py-2">Add</button>
                        <button className="neu-button px-4 py-2">Remove</button>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>
          </motion.div>
        );

      default: // 'all'
        return (
          <motion.div
            className="all-pools"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-4">
              {poolData.map((pool, index) => (
                <motion.div
                  key={pool.id}
                  className="neu-card cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex -space-x-2">
                        <div className="w-12 h-12 rounded-full bg-blue-500 border-2 border-white"></div>
                        <div className="w-12 h-12 rounded-full bg-green-500 border-2 border-white"></div>
                      </div>
                      <div>
                        <div className="font-bold text-xl">{pool.pair}</div>
                        <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                          TVL: {pool.tvl}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-8 text-center">
                      <div>
                        <div
                          className="text-lg font-bold"
                          style={{ color: 'var(--success-color)' }}
                        >
                          {pool.apr}
                        </div>
                        <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                          APR
                        </div>
                      </div>
                      <div>
                        <div className="text-lg font-bold">{pool.volume24h}</div>
                        <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                          24h Volume
                        </div>
                      </div>
                      <div>
                        <div className="text-lg font-bold">{pool.tvl}</div>
                        <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                          Total Liquidity
                        </div>
                      </div>
                    </div>

                    <button
                      className="neu-button px-6 py-3 font-medium"
                      onClick={() => setSelectedTab('add')}
                    >
                      Add Liquidity
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );
    }
  };

  return (
    <div className="pool-page">
      <motion.div
        className="page-header mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
          Liquidity Pools
        </h1>
        <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
          Provide liquidity and earn trading fees
        </p>
      </motion.div>

      {/* Tab Navigation */}
      <motion.div
        className="tab-navigation neu-surface p-1 rounded-lg mb-6 inline-flex"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {[
          { id: 'add', label: 'Add' },
          { id: 'all', label: 'All' },
          { id: 'my', label: 'My' },
        ].map(tab => (
          <button
            key={tab.id}
            className={`neu-button px-4 py-2 mx-1 text-sm ${
              selectedTab === tab.id ? 'neu-pressed' : ''
            }`}
            onClick={() => setSelectedTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </motion.div>

      {/* Tab Content */}
      <div className="tab-content">{tabContent()}</div>
    </div>
  );
};

export default PoolPage;
