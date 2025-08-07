import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Clock, TrendingUp, Calendar } from 'lucide-react';
import '../../styles/neumorphism.css';

const LockPage = () => {
  const [lockAmount, setLockAmount] = useState('');
  const [lockPeriod, setLockPeriod] = useState(30);
  const [selectedToken, setSelectedToken] = useState('FAST');

  const lockPeriods = [
    { days: 30, apy: '12%', multiplier: '1x' },
    { days: 90, apy: '18%', multiplier: '1.5x' },
    { days: 180, apy: '25%', multiplier: '2x' },
    { days: 365, apy: '35%', multiplier: '3x' }
  ];

  const userLocks = [
    {
      id: 1,
      amount: '1,000 FAST',
      period: '90 days',
      remaining: '67 days',
      apy: '18%',
      rewards: '45.6 FAST'
    },
    {
      id: 2,
      amount: '500 FAST',
      period: '30 days',
      remaining: '12 days',
      apy: '12%',
      rewards: '15.2 FAST'
    }
  ];

  return (
    <div className="lock-page">
      <motion.div
        className="page-header mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
          Token Locking
        </h1>
        <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
          Lock your tokens to earn higher rewards
        </p>
      </motion.div>

      <div className="lock-content grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Lock Interface */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="neu-card">
            <h3 className="text-2xl font-bold mb-6">Lock Tokens</h3>
            
            {/* Amount Input */}
            <div className="neu-card mb-4">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                  Amount to Lock
                </span>
                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  Balance: 5,000 FAST
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <button className="neu-button flex items-center space-x-2 px-4 py-3">
                  <div className="w-8 h-8 rounded-full bg-purple-500"></div>
                  <span className="font-medium">{selectedToken}</span>
                </button>
                <input
                  type="number"
                  placeholder="0.0"
                  value={lockAmount}
                  onChange={(e) => setLockAmount(e.target.value)}
                  className="neu-input flex-1 text-right text-xl font-bold"
                />
              </div>
            </div>

            {/* Lock Period Selection */}
            <div className="mb-6">
              <h4 className="font-medium mb-4">Select Lock Period</h4>
              <div className="grid grid-cols-2 gap-3">
                {lockPeriods.map((period) => (
                  <button
                    key={period.days}
                    className={`neu-button p-4 text-left ${
                      lockPeriod === period.days ? 'neu-pressed' : ''
                    }`}
                    onClick={() => setLockPeriod(period.days)}
                  >
                    <div className="font-bold">{period.days} Days</div>
                    <div className="text-sm text-green-500">APY: {period.apy}</div>
                    <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                      Multiplier: {period.multiplier}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Lock Summary */}
            <div className="neu-card mb-6">
              <h4 className="font-medium mb-3">Lock Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span style={{ color: 'var(--text-secondary)' }}>Lock Amount:</span>
                  <span>{lockAmount || '0'} FAST</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: 'var(--text-secondary)' }}>Lock Period:</span>
                  <span>{lockPeriod} days</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: 'var(--text-secondary)' }}>APY:</span>
                  <span className="text-green-500">
                    {lockPeriods.find(p => p.days === lockPeriod)?.apy}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: 'var(--text-secondary)' }}>Estimated Rewards:</span>
                  <span className="font-bold">
                    {lockAmount ? (parseFloat(lockAmount) * 0.15 * (lockPeriod / 365)).toFixed(2) : '0'} FAST
                  </span>
                </div>
              </div>
            </div>

            <button 
              className="neu-button w-full py-4 text-lg font-bold"
              style={{
                background: 'linear-gradient(45deg, var(--accent-color), var(--success-color))',
                color: 'white'
              }}
            >
              <Lock size={20} className="inline mr-2" />
              Lock Tokens
            </button>
          </div>
        </motion.div>

        {/* Current Locks */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="neu-card">
            <h3 className="text-2xl font-bold mb-6">Your Locks</h3>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="neu-card text-center">
                <Lock size={20} className="mx-auto mb-2" style={{ color: 'var(--accent-color)' }} />
                <div className="text-lg font-bold">1,500</div>
                <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                  Total Locked
                </div>
              </div>
              <div className="neu-card text-center">
                <TrendingUp size={20} className="mx-auto mb-2" style={{ color: 'var(--success-color)' }} />
                <div className="text-lg font-bold">60.8</div>
                <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                  Pending Rewards
                </div>
              </div>
              <div className="neu-card text-center">
                <Calendar size={20} className="mx-auto mb-2" style={{ color: 'var(--warning-color)' }} />
                <div className="text-lg font-bold">39</div>
                <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                  Days Remaining
                </div>
              </div>
            </div>

            {/* Lock List */}
            <div className="space-y-4">
              {userLocks.map((lock, index) => (
                <motion.div
                  key={lock.id}
                  className="neu-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="font-bold text-lg">{lock.amount}</div>
                      <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                        {lock.period} lock
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-green-500">
                        APY: {lock.apy}
                      </div>
                      <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                        {lock.remaining} left
                      </div>
                    </div>
                  </div>
                  
                  <div className="neu-pressed p-3 mb-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                        Pending Rewards:
                      </span>
                      <span className="font-bold text-green-500">
                        {lock.rewards}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button className="neu-button flex-1 py-2 text-sm">
                      Claim Rewards
                    </button>
                    <button className="neu-button flex-1 py-2 text-sm">
                      Extend Lock
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Lock Benefits */}
            <div className="mt-8 neu-card">
              <h4 className="font-medium mb-3">Lock Benefits</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span>Higher APY rates for longer locks</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <span>Bonus rewards and multipliers</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                  <span>Governance voting power</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  <span>Exclusive access to new features</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LockPage;
