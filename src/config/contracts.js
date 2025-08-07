// Contract addresses and configuration
export const CONTRACTS = {
  // Contract addresses will be updated after deployment
  FASTTERO_NFT: process.env.REACT_APP_NFT_CONTRACT || "0x...",
  
  // Network configurations
  SUPPORTED_CHAINS: {
    1: {
      name: "Ethereum Mainnet",
      rpcUrl: "https://mainnet.infura.io/v3/YOUR_INFURA_KEY",
      blockExplorer: "https://etherscan.io"
    },
    137: {
      name: "Polygon Mainnet",
      rpcUrl: "https://polygon-rpc.com",
      blockExplorer: "https://polygonscan.com"
    },
    56: {
      name: "BSC Mainnet", 
      rpcUrl: "https://bsc-dataseed1.binance.org",
      blockExplorer: "https://bscscan.com"
    }
  },

  // Contract ABIs
  NFT_ABI: [
    {
      "inputs": [{"internalType": "string", "name": "baseURI", "type": "string"}],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [{"internalType": "uint256", "name": "quantity", "type": "uint256"}],
      "name": "publicMint",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [{"internalType": "uint256", "name": "tokenId", "type": "uint256"}],
      "name": "stakeToken",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [{"internalType": "uint256[]", "name": "tokenIds", "type": "uint256[]"}],
      "name": "stakeMultipleTokens",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [{"internalType": "uint256", "name": "tokenId", "type": "uint256"}],
      "name": "unstakeToken",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [{"internalType": "uint256[]", "name": "tokenIds", "type": "uint256[]"}],
      "name": "claimRewards",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [{"internalType": "uint256", "name": "tokenId", "type": "uint256"}],
      "name": "calculateRewards",
      "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [{"internalType": "address", "name": "user", "type": "address"}],
      "name": "getUserStakedTokens",
      "outputs": [{"internalType": "uint256[]", "name": "", "type": "uint256[]"}],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [{"internalType": "address", "name": "user", "type": "address"}],
      "name": "getTotalPendingRewards",
      "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [{"internalType": "uint256", "name": "tokenId", "type": "uint256"}],
      "name": "getTokenRarity",
      "outputs": [{"internalType": "uint8", "name": "", "type": "uint8"}],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [{"internalType": "uint256", "name": "tokenId", "type": "uint256"}],
      "name": "isTokenStaked",
      "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalSupply",
      "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [{"internalType": "address", "name": "owner", "type": "address"}],
      "name": "balanceOf",
      "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [{"internalType": "uint256", "name": "tokenId", "type": "uint256"}],
      "name": "ownerOf",
      "outputs": [{"internalType": "address", "name": "", "type": "address"}],
      "stateMutability": "view",
      "type": "function"
    }
  ]
};

// Thirdweb configuration
export const THIRDWEB_CONFIG = {
  clientId: process.env.REACT_APP_THIRDWEB_CLIENT_ID || "your_client_id_here",
  activeChain: "ethereum", // or "polygon", "binance"
  supportedWallets: [
    "metamask",
    "walletConnect",
    "coinbaseWallet",
    "injected"
  ]
};

// API endpoints
export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_BASE_URL || "https://api.fasttero.com",
  NFT_METADATA_URL: process.env.REACT_APP_NFT_METADATA_URL || "https://metadata.fasttero.com",
  PRICE_API: "https://api.coingecko.com/api/v3",
  MORALIS_API: process.env.REACT_APP_MORALIS_API || "https://deep-index.moralis.io/api/v2"
};

// App configuration
export const APP_CONFIG = {
  name: "Fasttero",
  description: "The next generation DeFi platform",
  version: "1.0.0",
  social: {
    twitter: "https://twitter.com/fasttero",
    discord: "https://discord.gg/fasttero", 
    telegram: "https://t.me/fasttero",
    github: "https://github.com/fasttero"
  }
};
