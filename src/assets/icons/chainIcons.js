// Chain icons and configurations
export const CHAIN_ICONS = {
  ethereum: {
    name: "Ethereum",
    symbol: "ETH",
    icon: "🔷",
    color: "#627EEA",
    gradient: "linear-gradient(135deg, #627EEA, #1E90FF)"
  },
  polygon: {
    name: "Polygon",
    symbol: "MATIC",
    icon: "🟣",
    color: "#8247E5",
    gradient: "linear-gradient(135deg, #8247E5, #A855F7)"
  },
  binance: {
    name: "BSC",
    symbol: "BNB",
    icon: "🟡",
    color: "#F3BA2F",
    gradient: "linear-gradient(135deg, #F3BA2F, #FBBF24)"
  },
  avalanche: {
    name: "Avalanche",
    symbol: "AVAX",
    icon: "🔺",
    color: "#E84142",
    gradient: "linear-gradient(135deg, #E84142, #EF4444)"
  },
  arbitrum: {
    name: "Arbitrum",
    symbol: "ARB",
    icon: "🔵",
    color: "#28A0F0",
    gradient: "linear-gradient(135deg, #28A0F0, #3B82F6)"
  },
  optimism: {
    name: "Optimism",
    symbol: "OP",
    icon: "🔴",
    color: "#FF0420",
    gradient: "linear-gradient(135deg, #FF0420, #EF4444)"
  }
};

export const getChainIcon = (chainName) => {
  const chain = CHAIN_ICONS[chainName.toLowerCase()];
  return chain || CHAIN_ICONS.ethereum;
};

export const getChainGradient = (chainName) => {
  const chain = CHAIN_ICONS[chainName.toLowerCase()];
  return chain?.gradient || CHAIN_ICONS.ethereum.gradient;
};
