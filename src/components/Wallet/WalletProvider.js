import React, { createContext, useContext, useState, useEffect } from 'react';
import { THIRDWEB_CONFIG } from '../../config/contracts';

// Wallet Context
const WalletContext = createContext();

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};

// WalletProvider Component
export const WalletProvider = ({ children }) => {
  const [address, setAddress] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [provider, setProvider] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [balance, setBalance] = useState('0');

  // Check if wallet is already connected
  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          setAddress(accounts[0]);
          setIsConnected(true);
          setProvider(window.ethereum);
          
          // Get chain ID
          const chainId = await window.ethereum.request({ method: 'eth_chainId' });
          setChainId(parseInt(chainId, 16));
          
          // Get balance
          await updateBalance(accounts[0]);
        }
      } catch (error) {
        console.error('Error checking wallet connection:', error);
      }
    }
  };

  const connectWallet = async (walletType = 'metamask') => {
    setIsConnecting(true);
    
    try {
      if (walletType === 'metamask' && typeof window.ethereum !== 'undefined') {
        // Request account access
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        
        if (accounts.length > 0) {
          setAddress(accounts[0]);
          setIsConnected(true);
          setProvider(window.ethereum);
          
          // Get chain ID
          const chainId = await window.ethereum.request({ method: 'eth_chainId' });
          setChainId(parseInt(chainId, 16));
          
          // Get balance
          await updateBalance(accounts[0]);
          
          // Listen for account changes
          window.ethereum.on('accountsChanged', handleAccountsChanged);
          window.ethereum.on('chainChanged', handleChainChanged);
        }
      } else {
        throw new Error('MetaMask not detected');
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
      throw error;
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setAddress(null);
    setIsConnected(false);
    setProvider(null);
    setChainId(null);
    setBalance('0');
    
    // Remove listeners
    if (window.ethereum) {
      window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      window.ethereum.removeListener('chainChanged', handleChainChanged);
    }
  };

  const updateBalance = async (address) => {
    try {
      if (window.ethereum) {
        const balance = await window.ethereum.request({
          method: 'eth_getBalance',
          params: [address, 'latest']
        });
        
        // Convert from wei to ether
        const balanceInEther = parseInt(balance, 16) / Math.pow(10, 18);
        setBalance(balanceInEther.toFixed(4));
      }
    } catch (error) {
      console.error('Error updating balance:', error);
    }
  };

  const handleAccountsChanged = (accounts) => {
    if (accounts.length === 0) {
      disconnectWallet();
    } else {
      setAddress(accounts[0]);
      updateBalance(accounts[0]);
    }
  };

  const handleChainChanged = (chainId) => {
    setChainId(parseInt(chainId, 16));
    window.location.reload(); // Reload to avoid state issues
  };

  const switchNetwork = async (targetChainId) => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${targetChainId.toString(16)}` }],
      });
    } catch (error) {
      // If the chain is not added to MetaMask
      if (error.code === 4902) {
        try {
          const chainConfig = getChainConfig(targetChainId);
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [chainConfig],
          });
        } catch (addError) {
          console.error('Error adding chain:', addError);
        }
      } else {
        console.error('Error switching chain:', error);
      }
    }
  };

  const getChainConfig = (chainId) => {
    const configs = {
      1: {
        chainId: '0x1',
        chainName: 'Ethereum Mainnet',
        nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
        rpcUrls: ['https://mainnet.infura.io/v3/YOUR_INFURA_KEY'],
        blockExplorerUrls: ['https://etherscan.io/']
      },
      137: {
        chainId: '0x89',
        chainName: 'Polygon Mainnet',
        nativeCurrency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
        rpcUrls: ['https://polygon-rpc.com/'],
        blockExplorerUrls: ['https://polygonscan.com/']
      },
      56: {
        chainId: '0x38',
        chainName: 'Binance Smart Chain',
        nativeCurrency: { name: 'BNB', symbol: 'BNB', decimals: 18 },
        rpcUrls: ['https://bsc-dataseed1.binance.org/'],
        blockExplorerUrls: ['https://bscscan.com/']
      }
    };
    
    return configs[chainId];
  };

  const signMessage = async (message) => {
    try {
      if (!provider || !address) {
        throw new Error('Wallet not connected');
      }
      
      const signature = await provider.request({
        method: 'personal_sign',
        params: [message, address],
      });
      
      return signature;
    } catch (error) {
      console.error('Error signing message:', error);
      throw error;
    }
  };

  const sendTransaction = async (transaction) => {
    try {
      if (!provider || !address) {
        throw new Error('Wallet not connected');
      }
      
      const txHash = await provider.request({
        method: 'eth_sendTransaction',
        params: [transaction],
      });
      
      return txHash;
    } catch (error) {
      console.error('Error sending transaction:', error);
      throw error;
    }
  };

  const contextValue = {
    address,
    isConnected,
    isConnecting,
    provider,
    chainId,
    balance,
    connectWallet,
    disconnectWallet,
    switchNetwork,
    signMessage,
    sendTransaction,
    updateBalance
  };

  return (
    <WalletContext.Provider value={contextValue}>
      {children}
    </WalletContext.Provider>
  );
};

// Utility function to format address
export const formatAddress = (address, startLength = 6, endLength = 4) => {
  if (!address) return '';
  if (address.length <= startLength + endLength) return address;
  return `${address.slice(0, startLength)}...${address.slice(-endLength)}`;
};

// Chain name helper
export const getChainName = (chainId) => {
  const names = {
    1: 'Ethereum',
    137: 'Polygon', 
    56: 'BSC',
    43114: 'Avalanche',
    42161: 'Arbitrum'
  };
  
  return names[chainId] || `Chain ${chainId}`;
};
