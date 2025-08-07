import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { WalletProvider } from './components/Wallet/WalletProvider';
import MainLayout from './components/Layout/MainLayout';
import './styles/neumorphism.css';
import './App.css';

function App() {
  return (
    <WalletProvider>
      <Router>
        <div className="App">
          <MainLayout />
        </div>
      </Router>
    </WalletProvider>
  );
}

export default App;
