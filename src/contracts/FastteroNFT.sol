// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract FastteroNFT is ERC721, ERC721Enumerable, Pausable, Ownable, ReentrancyGuard {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    // NFT Configuration
    uint256 public constant MAX_SUPPLY = 10000;
    uint256 public constant MINT_PRICE = 0.002 ether;
    uint256 public constant MAX_MINT_PER_TX = 10;

    // Base URI for metadata
    string private _baseTokenURI;

    // Staking Configuration
    mapping(uint256 => bool) public stakedTokens;
    mapping(uint256 => uint256) public stakingStartTime;
    mapping(uint256 => uint256) public stakingRewards;
    mapping(address => uint256[]) public userStakedTokens;
    
    // Rarity and rewards mapping
    mapping(uint256 => uint8) public tokenRarity; // 0=Common, 1=Rare, 2=Epic, 3=Legendary
    uint256[4] public dailyRewards = [50, 100, 200, 500]; // Points per day by rarity
    
    // Events
    event TokenMinted(address indexed to, uint256 indexed tokenId, uint8 rarity);
    event TokenStaked(address indexed owner, uint256 indexed tokenId);
    event TokenUnstaked(address indexed owner, uint256 indexed tokenId, uint256 rewards);
    event RewardsClaimed(address indexed owner, uint256 totalRewards);

    constructor(string memory baseURI) ERC721("Fasttero NFT", "FAST") {
        _baseTokenURI = baseURI;
    }

    // Minting function
    function mint(address to, uint256 quantity) public payable nonReentrant whenNotPaused {
        require(quantity > 0 && quantity <= MAX_MINT_PER_TX, "Invalid quantity");
        require(totalSupply() + quantity <= MAX_SUPPLY, "Exceeds max supply");
        require(msg.value >= MINT_PRICE * quantity, "Insufficient payment");

        for (uint256 i = 0; i < quantity; i++) {
            uint256 tokenId = _tokenIdCounter.current();
            _tokenIdCounter.increment();
            
            // Determine rarity based on random generation
            uint8 rarity = _generateRarity(tokenId);
            tokenRarity[tokenId] = rarity;
            
            _safeMint(to, tokenId);
            emit TokenMinted(to, tokenId, rarity);
        }

        // Refund excess payment
        if (msg.value > MINT_PRICE * quantity) {
            payable(msg.sender).transfer(msg.value - (MINT_PRICE * quantity));
        }
    }

    // Public mint function
    function publicMint(uint256 quantity) external payable {
        mint(msg.sender, quantity);
    }

    // Staking functions
    function stakeToken(uint256 tokenId) external {
        require(ownerOf(tokenId) == msg.sender, "Not owner of token");
        require(!stakedTokens[tokenId], "Token already staked");

        stakedTokens[tokenId] = true;
        stakingStartTime[tokenId] = block.timestamp;
        userStakedTokens[msg.sender].push(tokenId);

        emit TokenStaked(msg.sender, tokenId);
    }

    function stakeMultipleTokens(uint256[] calldata tokenIds) external {
        for (uint256 i = 0; i < tokenIds.length; i++) {
            require(ownerOf(tokenIds[i]) == msg.sender, "Not owner of token");
            require(!stakedTokens[tokenIds[i]], "Token already staked");

            stakedTokens[tokenIds[i]] = true;
            stakingStartTime[tokenIds[i]] = block.timestamp;
            userStakedTokens[msg.sender].push(tokenIds[i]);

            emit TokenStaked(msg.sender, tokenIds[i]);
        }
    }

    function unstakeToken(uint256 tokenId) external {
        require(ownerOf(tokenId) == msg.sender, "Not owner of token");
        require(stakedTokens[tokenId], "Token not staked");

        uint256 rewards = calculateRewards(tokenId);
        stakingRewards[tokenId] += rewards;

        stakedTokens[tokenId] = false;
        stakingStartTime[tokenId] = 0;
        
        // Remove from user's staked tokens array
        _removeFromStakedTokens(msg.sender, tokenId);

        emit TokenUnstaked(msg.sender, tokenId, rewards);
    }

    function claimRewards(uint256[] calldata tokenIds) external {
        uint256 totalRewards = 0;

        for (uint256 i = 0; i < tokenIds.length; i++) {
            require(ownerOf(tokenIds[i]) == msg.sender, "Not owner of token");
            
            if (stakedTokens[tokenIds[i]]) {
                uint256 rewards = calculateRewards(tokenIds[i]);
                stakingRewards[tokenIds[i]] += rewards;
                stakingStartTime[tokenIds[i]] = block.timestamp; // Reset staking time
                totalRewards += rewards;
            }
            
            // Add any accumulated rewards
            totalRewards += stakingRewards[tokenIds[i]];
            stakingRewards[tokenIds[i]] = 0;
        }

        require(totalRewards > 0, "No rewards to claim");
        emit RewardsClaimed(msg.sender, totalRewards);
        
        // In a real implementation, you would transfer reward tokens here
        // For now, we just emit the event
    }

    // View functions
    function calculateRewards(uint256 tokenId) public view returns (uint256) {
        if (!stakedTokens[tokenId] || stakingStartTime[tokenId] == 0) {
            return 0;
        }

        uint256 stakingDuration = block.timestamp - stakingStartTime[tokenId];
        uint256 dailyReward = dailyRewards[tokenRarity[tokenId]];
        
        return (stakingDuration * dailyReward) / 1 days;
    }

    function getUserStakedTokens(address user) external view returns (uint256[] memory) {
        return userStakedTokens[user];
    }

    function getTotalPendingRewards(address user) external view returns (uint256) {
        uint256[] memory userTokens = userStakedTokens[user];
        uint256 totalRewards = 0;

        for (uint256 i = 0; i < userTokens.length; i++) {
            totalRewards += calculateRewards(userTokens[i]);
            totalRewards += stakingRewards[userTokens[i]];
        }

        return totalRewards;
    }

    function getTokenRarity(uint256 tokenId) external view returns (uint8) {
        require(_exists(tokenId), "Token does not exist");
        return tokenRarity[tokenId];
    }

    function isTokenStaked(uint256 tokenId) external view returns (bool) {
        return stakedTokens[tokenId];
    }

    // Internal functions
    function _generateRarity(uint256 tokenId) internal view returns (uint8) {
        uint256 randomValue = uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty, tokenId, msg.sender))) % 100;
        
        if (randomValue < 50) return 0; // 50% Common
        if (randomValue < 75) return 1; // 25% Rare
        if (randomValue < 95) return 2; // 20% Epic
        return 3; // 5% Legendary
    }

    function _removeFromStakedTokens(address user, uint256 tokenId) internal {
        uint256[] storage userTokens = userStakedTokens[user];
        for (uint256 i = 0; i < userTokens.length; i++) {
            if (userTokens[i] == tokenId) {
                userTokens[i] = userTokens[userTokens.length - 1];
                userTokens.pop();
                break;
            }
        }
    }

    function _baseURI() internal view override returns (string memory) {
        return _baseTokenURI;
    }

    function setBaseURI(string calldata baseURI) external onlyOwner {
        _baseTokenURI = baseURI;
    }

    // Admin functions
    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function withdraw() public onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds to withdraw");
        
        (bool success, ) = payable(owner()).call{value: balance}("");
        require(success, "Withdrawal failed");
    }

    function setDailyRewards(uint8 rarity, uint256 reward) external onlyOwner {
        require(rarity < 4, "Invalid rarity");
        dailyRewards[rarity] = reward;
    }

    // Override functions for ERC721Enumerable
    function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize)
        internal
        override(ERC721, ERC721Enumerable)
    {
        // Prevent transfer of staked tokens
        require(!stakedTokens[tokenId], "Cannot transfer staked token");
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
