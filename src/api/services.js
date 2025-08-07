import { API_CONFIG } from '../config/contracts';

// NFT and Contract interaction services
export const NFTService = {
  // Get NFT metadata
  async getNFTMetadata(tokenId) {
    try {
      const response = await fetch(`${API_CONFIG.NFT_METADATA_URL}/${tokenId}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching NFT metadata:', error);
      return null;
    }
  },

  // Get user's NFTs
  async getUserNFTs(address) {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/nfts/user/${address}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching user NFTs:', error);
      return [];
    }
  },

  // Get staking information
  async getStakingInfo(address) {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/staking/${address}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching staking info:', error);
      return null;
    }
  }
};

// Price and market data services
export const PriceService = {
  // Get token prices
  async getTokenPrices(tokenIds) {
    try {
      const ids = Array.isArray(tokenIds) ? tokenIds.join(',') : tokenIds;
      const response = await fetch(
        `${API_CONFIG.PRICE_API}/simple/price?ids=${ids}&vs_currencies=usd`
      );
      return await response.json();
    } catch (error) {
      console.error('Error fetching token prices:', error);
      return {};
    }
  },

  // Get ETH price
  async getETHPrice() {
    try {
      const response = await fetch(
        `${API_CONFIG.PRICE_API}/simple/price?ids=ethereum&vs_currencies=usd`
      );
      const data = await response.json();
      return data.ethereum?.usd || 0;
    } catch (error) {
      console.error('Error fetching ETH price:', error);
      return 0;
    }
  }
};

// Pool and DeFi services
export const PoolService = {
  // Get pool information
  async getPoolData() {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/pools`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching pool data:', error);
      return [];
    }
  },

  // Get user's liquidity positions
  async getUserLiquidity(address) {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/pools/user/${address}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching user liquidity:', error);
      return [];
    }
  },

  // Get pool APY
  async getPoolAPY(poolId) {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/pools/${poolId}/apy`);
      const data = await response.json();
      return data.apy || 0;
    } catch (error) {
      console.error('Error fetching pool APY:', error);
      return 0;
    }
  }
};

// User data services
export const UserService = {
  // Get user profile
  async getUserProfile(address) {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/users/${address}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  },

  // Update user points
  async updateUserPoints(address, points) {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/users/${address}/points`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ points })
      });
      return await response.json();
    } catch (error) {
      console.error('Error updating user points:', error);
      return null;
    }
  },

  // Get user's daily spin status
  async getDailySpinStatus(address) {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/users/${address}/daily-spin`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching daily spin status:', error);
      return { canSpin: false, lastSpin: null };
    }
  },

  // Record daily spin
  async recordDailySpin(address, points) {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/users/${address}/daily-spin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ points, timestamp: Date.now() })
      });
      return await response.json();
    } catch (error) {
      console.error('Error recording daily spin:', error);
      return null;
    }
  }
};

// Utility functions
export const Utils = {
  // Format wallet address
  formatAddress(address, startLength = 6, endLength = 4) {
    if (!address) return '';
    if (address.length <= startLength + endLength) return address;
    return `${address.slice(0, startLength)}...${address.slice(-endLength)}`;
  },

  // Format number with commas
  formatNumber(num) {
    return new Intl.NumberFormat().format(num);
  },

  // Format currency
  formatCurrency(amount, currency = 'USD') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  },

  // Format percentage
  formatPercentage(value, decimals = 2) {
    return `${(value * 100).toFixed(decimals)}%`;
  },

  // Calculate time difference
  getTimeDifference(timestamp) {
    const now = Date.now();
    const diff = now - timestamp;
    
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
  }
};

// Error handling
export const ErrorHandler = {
  // Handle blockchain errors
  handleBlockchainError(error) {
    if (error.code === 4001) {
      return "Transaction rejected by user";
    }
    if (error.code === -32603) {
      return "Internal error occurred";
    }
    if (error.message?.includes("insufficient funds")) {
      return "Insufficient funds for transaction";
    }
    if (error.message?.includes("gas")) {
      return "Gas estimation failed. Try increasing gas limit";
    }
    return error.message || "An unknown error occurred";
  },

  // Log error to service
  async logError(error, context = {}) {
    try {
      await fetch(`${API_CONFIG.BASE_URL}/errors`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          error: error.message || error,
          stack: error.stack,
          context,
          timestamp: Date.now(),
          userAgent: navigator.userAgent
        })
      });
    } catch (logError) {
      console.error('Failed to log error:', logError);
    }
  }
};
