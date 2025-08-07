import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, Star, Gift, Trophy, Clock } from 'lucide-react';
import '../../styles/neumorphism.css';

const DailyPage = () => {
  const [totalPoints, setTotalPoints] = useState(15420);
  const [dailyPoints, setDailyPoints] = useState(250);
  const [isSpinning, setIsSpinning] = useState(false);
  const [canSpin, setCanSpin] = useState(true);
  const [nextSpinTime, setNextSpinTime] = useState(null);
  const [recentWin, setRecentWin] = useState(null);
  const [spinHistory, setSpinHistory] = useState([
    { date: '2024-01-15', points: 500, type: 'bonus' },
    { date: '2024-01-14', points: 100, type: 'normal' },
    { date: '2024-01-13', points: 250, type: 'normal' },
    { date: '2024-01-12', points: 1000, type: 'jackpot' },
  ]);

  const spinPrizes = [
    { points: 50, probability: 30, type: 'normal' },
    { points: 100, probability: 25, type: 'normal' },
    { points: 250, probability: 20, type: 'normal' },
    { points: 500, probability: 15, type: 'bonus' },
    { points: 1000, probability: 8, type: 'bonus' },
    { points: 2500, probability: 2, type: 'jackpot' },
  ];

  const handleSpin = async () => {
    if (!canSpin || isSpinning) return;

    setIsSpinning(true);

    // Simulate spin animation delay
    setTimeout(() => {
      // Calculate random prize based on probability
      const random = Math.random() * 100;
      let cumulativeProbability = 0;
      let wonPrize = spinPrizes[0];

      for (const prize of spinPrizes) {
        cumulativeProbability += prize.probability;
        if (random <= cumulativeProbability) {
          wonPrize = prize;
          break;
        }
      }

      // Update points
      setTotalPoints(prev => prev + wonPrize.points);
      setDailyPoints(prev => prev + wonPrize.points);
      setRecentWin(wonPrize);

      // Add to history
      const newEntry = {
        date: new Date().toISOString().split('T')[0],
        points: wonPrize.points,
        type: wonPrize.type,
      };
      setSpinHistory(prev => [newEntry, ...prev.slice(0, 9)]);

      // Set cooldown (24 hours)
      setCanSpin(false);
      const nextSpin = new Date();
      nextSpin.setDate(nextSpin.getDate() + 1);
      setNextSpinTime(nextSpin);

      setIsSpinning(false);
    }, 3000);
  };

  const formatTimeUntilNextSpin = () => {
    if (!nextSpinTime) return null;

    const now = new Date();
    const diff = nextSpinTime - now;

    if (diff <= 0) {
      setCanSpin(true);
      setNextSpinTime(null);
      return null;
    }

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      formatTimeUntilNextSpin();
    }, 60000);

    return () => clearInterval(timer);
  }, [nextSpinTime]);

  return (
    <div className="daily-page">
      <motion.div
        className="page-header mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
          Daily Rewards
        </h1>
        <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
          Spin daily to earn points and unlock rewards
        </p>
      </motion.div>

      <div className="daily-content grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Points Summary */}
        <motion.div
          className="lg:col-span-1"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="space-y-6">
            {/* Total Points */}
            <div className="neu-card text-center">
              <Star size={32} className="mx-auto mb-4" style={{ color: 'var(--warning-color)' }} />
              <div className="text-3xl font-bold mb-2">{totalPoints.toLocaleString()}</div>
              <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                Total Points
              </div>
            </div>

            {/* Daily Points */}
            <div className="neu-card text-center">
              <Trophy
                size={32}
                className="mx-auto mb-4"
                style={{ color: 'var(--success-color)' }}
              />
              <div className="text-3xl font-bold mb-2">{dailyPoints}</div>
              <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                Daily Points
              </div>
            </div>

            {/* Next Spin Timer */}
            {!canSpin && (
              <div className="neu-card text-center">
                <Clock
                  size={32}
                  className="mx-auto mb-4"
                  style={{ color: 'var(--accent-color)' }}
                />
                <div className="text-xl font-bold mb-2">{formatTimeUntilNextSpin()}</div>
                <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  Until Next Spin
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Spin Wheel */}
        <motion.div
          className="lg:col-span-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="neu-card text-center">
            <h3 className="text-2xl font-bold mb-6">Daily Spin</h3>

            <div className="spin-wheel-container mb-8 relative">
              <motion.div
                className="spin-wheel neu-surface"
                style={{
                  width: '200px',
                  height: '200px',
                  borderRadius: '50%',
                  margin: '0 auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background:
                    'conic-gradient(from 0deg, #4a90e2, #27ae60, #f39c12, #e74c3c, #9b59b6, #4a90e2)',
                }}
                animate={{ rotate: isSpinning ? 1440 : 0 }}
                transition={{ duration: 3, ease: 'easeOut' }}
              >
                <div className="text-white font-bold text-lg">SPIN</div>
              </motion.div>

              {/* Spinner Arrow */}
              <div
                className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2"
                style={{ zIndex: 10 }}
              >
                <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-red-500"></div>
              </div>
            </div>

            <motion.button
              className={`spin-button ${
                !canSpin || isSpinning ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              onClick={handleSpin}
              disabled={!canSpin || isSpinning}
              whileHover={canSpin && !isSpinning ? { scale: 1.05 } : {}}
              whileTap={canSpin && !isSpinning ? { scale: 0.95 } : {}}
            >
              <RotateCcw size={24} className="mr-2" />
              {isSpinning ? 'Spinning...' : canSpin ? 'SPIN NOW' : 'Used Today'}
            </motion.button>

            {recentWin && (
              <motion.div
                className="recent-win mt-6 neu-card"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Gift
                  size={24}
                  className="mx-auto mb-2"
                  style={{ color: 'var(--success-color)' }}
                />
                <div className="text-lg font-bold">You Won!</div>
                <div className="text-2xl font-bold" style={{ color: 'var(--success-color)' }}>
                  +{recentWin.points} Points
                </div>
                <div className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
                  {recentWin.type === 'jackpot'
                    ? '🎊 JACKPOT!'
                    : recentWin.type === 'bonus'
                    ? '⭐ Bonus!'
                    : 'Nice!'}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Spin History */}
        <motion.div
          className="lg:col-span-1"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="neu-card">
            <h3 className="text-xl font-bold mb-4">Recent Spins</h3>

            <div className="space-y-3">
              {spinHistory.map((entry, index) => (
                <motion.div
                  key={index}
                  className="neu-card flex items-center justify-between"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div>
                    <div className="font-medium">{entry.date}</div>
                    <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                      {entry.type === 'jackpot'
                        ? '🎊 Jackpot'
                        : entry.type === 'bonus'
                        ? '⭐ Bonus'
                        : '🎯 Regular'}
                    </div>
                  </div>
                  <div
                    className={`text-lg font-bold ${
                      entry.type === 'jackpot'
                        ? 'text-purple-500'
                        : entry.type === 'bonus'
                        ? 'text-yellow-500'
                        : 'text-green-500'
                    }`}
                  >
                    +{entry.points}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Rewards Info */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <h4 className="font-medium mb-3">Possible Rewards</h4>
              <div className="space-y-2 text-sm">
                {spinPrizes.map((prize, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span>{prize.points} Points</span>
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        prize.type === 'jackpot'
                          ? 'bg-purple-100 text-purple-600'
                          : prize.type === 'bonus'
                          ? 'bg-yellow-100 text-yellow-600'
                          : 'bg-green-100 text-green-600'
                      }`}
                    >
                      {prize.probability}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DailyPage;
