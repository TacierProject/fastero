import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, ChevronDown, ArrowUpDown, Zap } from 'lucide-react';
import '../../styles/neumorphism.css';

const SwapPage = ({ activeTab }) => {
  const [currentTab, setCurrentTab] = useState('swap');
  const [fromToken, setFromToken] = useState('ETH');
  const [toToken, setToToken] = useState('USDC');
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [slippage, setSlippage] = useState(0.5);
  const [showSettings, setShowSettings] = useState(false);
  const [showChains, setShowChains] = useState(false);
  const [selectedChain, setSelectedChain] = useState('Ethereum');

  const chains = ['Ethereum', 'Polygon', 'BSC', 'Avalanche', 'Arbitrum'];
  const slippageOptions = [0.1, 0.5, 1.0, 3.0];

  const handleSwapTokens = () => {
    setFromToken(toToken);
    setToToken(fromToken);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  return (
    <div className="swap-page">
      <motion.div
        className="page-header mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
          {currentTab === 'swap' ? 'Swap Tokens' : 'Bridge Assets'}
        </h1>
        <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
          {currentTab === 'swap'
            ? 'Exchange tokens instantly with the best rates'
            : 'Move assets seamlessly between different blockchains'}
        </p>
      </motion.div>

      {/* Tab Navigation */}
      <motion.div
        className="tab-navigation neu-surface p-2 rounded-lg mb-8 inline-flex"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <button
          className={`neu-button px-4 py-2 mx-1 text-sm ${
            currentTab === 'swap' ? 'neu-pressed' : ''
          }`}
          onClick={() => setCurrentTab('swap')}
        >
          Swap
        </button>
        <button
          className={`neu-button px-4 py-2 mx-1 text-sm ${
            currentTab === 'bridge' ? 'neu-pressed' : ''
          }`}
          onClick={() => setCurrentTab('bridge')}
        >
          Bridge
        </button>
      </motion.div>

      <div className="swap-container grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Swap Interface */}
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="neu-card">
            {/* Settings Row */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex space-x-2">
                <button
                  className={`neu-button px-3 py-1 flex items-center space-x-1 text-xs ${
                    showSettings ? 'neu-pressed' : ''
                  }`}
                  onClick={() => setShowSettings(!showSettings)}
                >
                  <Settings size={14} />
                  <span>Slippage</span>
                </button>
                <button
                  className={`neu-button px-3 py-1 flex items-center space-x-1 text-xs ${
                    showChains ? 'neu-pressed' : ''
                  }`}
                  onClick={() => setShowChains(!showChains)}
                >
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
                  <span className="font-medium">{selectedChain}</span>
                  <ChevronDown size={12} />
                </button>
              </div>

              {currentTab === 'bridge' && (
                <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  Cross-chain transfers may take 5-30 minutes
                </div>
              )}
            </div>

            {/* Settings Panel */}
            {showSettings && (
              <motion.div
                className="neu-card mb-4"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h4 className="font-medium mb-4">Slippage Tolerance</h4>
                <div className="grid grid-cols-4 gap-2 mb-3">
                  {slippageOptions.map(option => (
                    <button
                      key={option}
                      className={`neu-button text-sm py-2 ${
                        slippage === option ? 'neu-pressed' : ''
                      }`}
                      onClick={() => setSlippage(option)}
                    >
                      {option}%
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  step="0.1"
                  value={slippage}
                  onChange={e => setSlippage(parseFloat(e.target.value))}
                  className="neu-input w-full"
                  placeholder="Custom %"
                />
              </motion.div>
            )}

            {/* Chain Selection Panel */}
            {showChains && (
              <motion.div
                className="neu-card mb-4"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h4 className="font-medium mb-4">
                  {currentTab === 'swap' ? 'Select Network' : 'Source Network'}
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {chains.map(chain => (
                    <button
                      key={chain}
                      className={`neu-button p-3 text-left ${
                        selectedChain === chain ? 'neu-pressed' : ''
                      }`}
                      onClick={() => {
                        setSelectedChain(chain);
                        setShowChains(false);
                      }}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
                        <span className="text-sm">{chain}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* From Token */}
            <div className="neu-card mb-4">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                  {currentTab === 'swap' ? 'From' : 'Send'}
                </span>
                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  Balance: 2.456 {fromToken}
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <button className="neu-button flex items-center space-x-2 px-4 py-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500"></div>
                  <span className="font-medium">{fromToken}</span>
                  <ChevronDown size={16} />
                </button>
                <input
                  type="number"
                  placeholder="0.0"
                  value={fromAmount}
                  onChange={e => setFromAmount(e.target.value)}
                  className="neu-input flex-1 text-right text-2xl font-bold"
                />
              </div>
              {currentTab === 'bridge' && (
                <div className="text-xs mt-2" style={{ color: 'var(--text-secondary)' }}>
                  Network: {selectedChain}
                </div>
              )}
            </div>

            {/* Swap Button */}
            <div className="flex justify-center my-4">
              <button className="neu-button p-3 rounded-full" onClick={handleSwapTokens}>
                <ArrowUpDown size={20} />
              </button>
            </div>

            {/* To Token */}
            <div className="neu-card mb-6">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                  {currentTab === 'swap' ? 'To' : 'Receive'}
                </span>
                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {currentTab === 'bridge' ? 'Destination Network' : `Balance: 1,234.56 ${toToken}`}
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <button className="neu-button flex items-center space-x-2 px-4 py-3">
                  <div className="w-8 h-8 rounded-full bg-green-500"></div>
                  <span className="font-medium">
                    {currentTab === 'bridge' ? fromToken : toToken}
                  </span>
                  <ChevronDown size={16} />
                </button>
                <input
                  type="number"
                  placeholder="0.0"
                  value={toAmount}
                  onChange={e => setToAmount(e.target.value)}
                  className="neu-input flex-1 text-right text-2xl font-bold"
                  readOnly={currentTab === 'bridge'}
                />
              </div>
              {currentTab === 'bridge' && (
                <div className="text-xs mt-2" style={{ color: 'var(--text-secondary)' }}>
                  Network: Polygon • Estimated arrival: ~5 minutes
                </div>
              )}
            </div>

            {/* Transaction Info */}
            <div className="neu-card mb-6 text-sm" style={{ color: 'var(--text-secondary)' }}>
              {currentTab === 'swap' ? (
                <>
                  <div className="flex justify-between mb-2">
                    <span>Rate</span>
                    <span>1 ETH = 2,456.78 USDC</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Slippage Tolerance</span>
                    <span>{slippage}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Network Fee</span>
                    <span>~$12.34</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-between mb-2">
                    <span>Bridge Fee</span>
                    <span>0.1% + Gas</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Estimated Time</span>
                    <span>5-30 minutes</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Source Network Fee</span>
                    <span>~$12.34</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Destination Network</span>
                    <span>Polygon</span>
                  </div>
                </>
              )}
            </div>

            {/* Action Button */}
            <button
              className="neu-button w-full py-3 text-base font-bold"
              style={{
                background: 'linear-gradient(45deg, var(--accent-color), var(--success-color))',
                color: 'white',
              }}
            >
              <Zap size={18} className="inline mr-2" />
              {currentTab === 'swap' ? 'Swap Tokens' : 'Bridge Assets'}
            </button>
          </div>
        </motion.div>

        {/* Recent Transactions */}
        <motion.div
          className="lg:col-span-1"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="neu-card">
            <h3 className="text-lg font-bold mb-4">Recent Transactions</h3>
            <div className="space-y-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="neu-card text-sm">
                  <div className="flex justify-between items-center">
                    <span>
                      {currentTab === 'swap' ? 'Swap ETH → USDC' : 'Bridge ETH to Polygon'}
                    </span>
                    <span className="text-green-500">✓</span>
                  </div>
                  <div className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
                    {i === 1 ? '2 minutes ago' : i === 2 ? '1 hour ago' : '1 day ago'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SwapPage;
