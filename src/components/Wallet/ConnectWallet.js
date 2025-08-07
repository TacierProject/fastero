import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wallet, ChevronDown, ExternalLink, Copy, LogOut } from 'lucide-react';
import { useWallet, formatAddress, getChainName } from './WalletProvider';
import '../../styles/neumorphism.css';

const ConnectWallet = () => {
  const {
    address,
    isConnected,
    isConnecting,
    chainId,
    balance,
    connectWallet,
    disconnectWallet,
    switchNetwork,
  } = useWallet();

  const [showDropdown, setShowDropdown] = useState(false);
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const walletOptions = [
    {
      id: 'metamask',
      name: 'MetaMask',
      icon: '🦊',
      description: 'Connect using MetaMask wallet',
    },
    {
      id: 'walletconnect',
      name: 'WalletConnect',
      icon: '🔗',
      description: 'Connect using WalletConnect',
    },
    {
      id: 'coinbase',
      name: 'Coinbase Wallet',
      icon: '🔵',
      description: 'Connect using Coinbase Wallet',
    },
  ];

  const supportedChains = [
    { id: 1, name: 'Ethereum', icon: '🔷' },
    { id: 137, name: 'Polygon', icon: '🟣' },
    { id: 56, name: 'BSC', icon: '🟡' },
  ];

  const handleConnect = async walletType => {
    try {
      await connectWallet(walletType);
      setShowWalletModal(false);
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      // You could show an error toast here
    }
  };

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (error) {
      console.error('Failed to copy address:', error);
    }
  };

  const openExplorer = () => {
    const explorers = {
      1: `https://etherscan.io/address/${address}`,
      137: `https://polygonscan.com/address/${address}`,
      56: `https://bscscan.com/address/${address}`,
    };

    const url = explorers[chainId] || `https://etherscan.io/address/${address}`;
    window.open(url, '_blank');
  };

  if (isConnected) {
    return (
      <div className="relative">
        <motion.button
          className="neu-button flex items-center space-x-3 px-4 py-3 w-full"
          onClick={() => setShowDropdown(!showDropdown)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
              <Wallet size={16} className="text-white" />
            </div>
            <div className="text-left">
              <div className="font-medium text-sm">{formatAddress(address)}</div>
              <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                {balance} ETH
              </div>
            </div>
          </div>
          <ChevronDown size={16} />
        </motion.button>

        <AnimatePresence>
          {showDropdown && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowDropdown(false)} />
              <motion.div
                className="absolute top-full right-0 mt-2 w-80 neu-popup z-50"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {/* Wallet Info */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium">Connected Wallet</span>
                    <span
                      className="text-sm px-2 py-1 rounded"
                      style={{
                        backgroundColor: 'var(--success-color)',
                        color: 'white',
                      }}
                    >
                      {getChainName(chainId)}
                    </span>
                  </div>

                  <div className="neu-card p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                        Address
                      </span>
                      <div className="flex space-x-2">
                        <button
                          className="neu-button p-1"
                          onClick={copyAddress}
                          title="Copy address"
                        >
                          <Copy size={14} />
                        </button>
                        <button
                          className="neu-button p-1"
                          onClick={openExplorer}
                          title="View on explorer"
                        >
                          <ExternalLink size={14} />
                        </button>
                      </div>
                    </div>
                    <div className="font-mono text-sm break-all">{address}</div>
                    {copySuccess && (
                      <div className="text-xs text-green-500 mt-1">Address copied!</div>
                    )}
                  </div>

                  <div className="neu-card p-3 mt-3">
                    <div className="text-sm mb-1" style={{ color: 'var(--text-secondary)' }}>
                      Balance
                    </div>
                    <div className="text-lg font-bold">{balance} ETH</div>
                  </div>
                </div>

                {/* Network Switching */}
                <div className="mb-4">
                  <div className="font-medium mb-3">Switch Network</div>
                  <div className="grid grid-cols-3 gap-2">
                    {supportedChains.map(chain => (
                      <button
                        key={chain.id}
                        className={`neu-button p-3 text-center text-sm ${
                          chainId === chain.id ? 'neu-pressed' : ''
                        }`}
                        onClick={() => switchNetwork(chain.id)}
                      >
                        <div className="text-lg mb-1">{chain.icon}</div>
                        <div>{chain.name}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Disconnect */}
                <button
                  className="neu-button w-full py-3 flex items-center justify-center space-x-2"
                  style={{
                    background: 'linear-gradient(45deg, var(--danger-color), #ff6b6b)',
                    color: 'white',
                  }}
                  onClick={() => {
                    disconnectWallet();
                    setShowDropdown(false);
                  }}
                >
                  <LogOut size={16} />
                  <span>Disconnect</span>
                </button>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <>
      <motion.button
        className="neu-button flex items-center space-x-2 px-6 py-3 font-medium w-full"
        style={{
          background: 'linear-gradient(45deg, var(--accent-color), var(--success-color))',
          color: 'white',
        }}
        onClick={() => setShowWalletModal(true)}
        disabled={isConnecting}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Wallet size={20} />
        <span>{isConnecting ? 'Connecting...' : 'Connect Wallet'}</span>
      </motion.button>

      {/* Wallet Selection Modal */}
      <AnimatePresence>
        {showWalletModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowWalletModal(false)}
          >
            <motion.div
              className="neu-popup max-w-md w-full mx-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold mb-6 text-center">Connect Wallet</h3>

              <div className="space-y-3">
                {walletOptions.map(wallet => (
                  <motion.button
                    key={wallet.id}
                    className="neu-button w-full p-4 text-left flex items-center space-x-4"
                    onClick={() => handleConnect(wallet.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="text-2xl">{wallet.icon}</div>
                    <div>
                      <div className="font-medium">{wallet.name}</div>
                      <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                        {wallet.description}
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>

              <div className="mt-6 text-center">
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  By connecting a wallet, you agree to our Terms of Service
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ConnectWallet;
