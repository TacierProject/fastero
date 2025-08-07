# Fasttero DeFi Platform

A modern, user-friendly decentralized finance (DeFi) platform built with React, featuring neumorphism design, NFT staking, and comprehensive DeFi tools.

![Fasttero Logo](./public/logo192.png)

## Features

### 🔄 Swap & Bridge
- Token swapping with multiple DEX integration
- Cross-chain bridging capabilities
- Adjustable slippage tolerance
- Real-time price feeds
- Gas optimization

### 💧 Liquidity Pools
- Add/remove liquidity
- View all available pools
- Track personal positions
- Real-time APY calculations
- Rewards distribution

### 🎯 Daily Rewards
- Daily spin-to-earn mechanism
- Point-based reward system
- Progressive jackpots
- Streak bonuses
- Leaderboards

### 🔬 NFT Laboratory
- Mint unique Fasttero NFTs (0.002 ETH each)
- NFT staking for passive rewards
- Rarity-based reward multipliers
- Masonry layout gallery
- Animated NFT showcase

### 🔒 Token Locking
- Lock tokens for higher yields
- Multiple lock periods (30-365 days)
- Compound rewards
- Early withdrawal penalties
- Governance voting power

### 🎨 Design
- Neumorphism UI design
- Fully responsive layout
- Smooth animations with Framer Motion
- Scroll-lock navigation
- Realistic 3D icons

## Technology Stack

- **Frontend**: React 18, Framer Motion
- **Styling**: Custom CSS with Neumorphism design
- **Web3**: Thirdweb SDK, Ethers.js
- **Icons**: Lucide React, Custom SVGs
- **Deployment**: Vercel-ready configuration

## Smart Contracts

### FastteroNFT Contract
- **Price**: 0.002 ETH per NFT
- **Max Supply**: 10,000 NFTs
- **Rarities**: Common (50%), Rare (25%), Epic (20%), Legendary (5%)
- **Staking Rewards**: 50-500 points/day based on rarity
- **Features**: Batch minting, staking, reward claiming

## Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/fasttero-defi.git
   cd fasttero-defi
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment setup**
   ```bash
   cp .env.example .env
   # Update .env with your configuration
   ```

4. **Start development server**
   ```bash
   npm start
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## Environment Variables

Required environment variables (see `.env.example`):

```env
REACT_APP_THIRDWEB_CLIENT_ID=your_thirdweb_client_id
REACT_APP_NFT_CONTRACT=deployed_contract_address
REACT_APP_API_BASE_URL=your_api_endpoint
```

## Deployment

### Vercel Deployment (Recommended)

1. **Connect to Vercel**
   - Import your GitHub repository to Vercel
   - Configure environment variables in Vercel dashboard

2. **Environment Variables in Vercel**
   ```
   REACT_APP_THIRDWEB_CLIENT_ID
   REACT_APP_NFT_CONTRACT
   REACT_APP_API_BASE_URL
   REACT_APP_NFT_METADATA_URL
   ```

3. **Deploy**
   - Push to main branch for automatic deployment
   - Or use `vercel --prod` for manual deployment

### Manual Deployment

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy build folder** to your preferred hosting service

## Smart Contract Deployment

1. **Compile contracts**
   ```bash
   # Using Hardhat (recommended)
   npx hardhat compile
   ```

2. **Deploy to testnet first**
   ```bash
   npx hardhat run scripts/deploy.js --network goerli
   ```

3. **Verify contract**
   ```bash
   npx hardhat verify --network goerli DEPLOYED_CONTRACT_ADDRESS "constructor_args"
   ```

4. **Update environment variables** with deployed contract address

## Project Structure

```
src/
├── components/
│   ├── Layout/
│   │   ├── MainLayout.js      # Main application layout
│   │   └── Sidebar.js         # Navigation sidebar
│   ├── Pages/
│   │   ├── SwapPage.js        # Token swap interface
│   │   ├── PoolPage.js        # Liquidity pools
│   │   ├── DailyPage.js       # Daily rewards
│   │   ├── LabPage.js         # NFT minting & staking
│   │   ├── LockPage.js        # Token locking
│   │   ├── SupportPage.js     # Support center
│   │   └── AboutPage.js       # About & social
│   └── Wallet/
│       ├── WalletProvider.js  # Wallet context
│       └── ConnectWallet.js   # Wallet connection UI
├── contracts/
│   └── FastteroNFT.sol        # NFT contract with staking
├── config/
│   └── contracts.js           # Contract addresses & ABIs
├── api/
│   └── services.js            # API service functions
├── assets/
│   └── icons/                 # Chain icons & assets
└── styles/
    └── neumorphism.css        # Neumorphism design system
```

## Features in Detail

### Neumorphism Design
- Soft, embossed button effects
- Subtle shadows and highlights
- Smooth color transitions
- Responsive design patterns

### Wallet Integration
- MetaMask connection
- WalletConnect support
- Network switching
- Balance display
- Transaction signing

### NFT System
- Dynamic rarity generation
- Masonry layout display
- Staking mechanism
- Reward calculations
- Batch operations

### Points System
- Daily spin rewards
- Staking rewards
- Achievement bonuses
- Leaderboard tracking

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Security

- All smart contracts should be audited before mainnet deployment
- Use hardware wallets for production deployments
- Implement proper access controls
- Regular security updates

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- 📧 Email: support@fasttero.com
- 💬 Discord: https://discord.gg/fasttero
- 📱 Telegram: https://t.me/fasttero
- 🐦 Twitter: https://twitter.com/fasttero

## Roadmap

- [x] Core DeFi features
- [x] NFT minting & staking
- [x] Neumorphism UI
- [ ] Cross-chain bridging
- [ ] Mobile app
- [ ] DAO governance
- [ ] Advanced analytics

---

Built with ❤️ by the Fasttero Team
