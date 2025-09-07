import React, { useState, useEffect } from 'react';
import {
  RainbowKitProvider,
  ConnectButton,
  darkTheme,
  lightTheme
} from '@rainbow-me/rainbowkit';
import { WagmiConfig } from 'wagmi';
import '@rainbow-me/rainbowkit/styles.css';
import { wagmiConfig, chains } from './config/rainbowkit';
import { CreateCoin } from './components/CreateCoin';
import { Trade } from './components/Trade';
import { Liquidity } from './components/Liquidity';
import { Portfolio } from './components/Portfolio';
import { Analytics } from './components/Analytics';

type Tab = 'create' | 'trade' | 'liquidity' | 'portfolio' | 'analytics';

function useDarkMode() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return { isDark, setIsDark };
}

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

function TabButton({ active, onClick, children }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`py-4 px-6 ${
        active
          ? 'border-b-2 border-black dark:border-white font-semibold'
          : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
      } transition-colors duration-200`}
    >
      {children}
    </button>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('create');
  const { isDark, setIsDark } = useDarkMode();

  const renderContent = () => {
    switch (activeTab) {
      case 'create':
        return <CreateCoin />;
      case 'trade':
        return <Trade />;
      case 'liquidity':
        return <Liquidity />;
      case 'portfolio':
        return <Portfolio />;
      case 'analytics':
        return <Analytics />;
      default:
        return null;
    }
  };

  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        chains={chains}
        theme={isDark ? darkTheme() : lightTheme()}
      >
        <div className="min-h-screen bg-[var(--zora-bg-color)] text-[var(--zora-fg-color)] transition-colors duration-200">
          {/* Header */}
          <header className="sticky top-0 z-50 backdrop-blur-lg bg-[var(--zora-bg-color)]/80 border-b border-[var(--zora-border-color)]">
            <div className="max-w-screen-xl mx-auto px-6">
              <div className="flex items-center justify-between h-20">
                <div className="flex items-center gap-8">
                  <a href="/" className="flex items-center gap-3">
                    <img 
                      src="https://zora.co/assets/zora-wordmark-black.svg" 
                      alt="Zora" 
                      className="h-6 dark:invert"
                    />
                    <span className="text-xl font-semibold">Coins</span>
                  </a>
                </div>
                <div className="flex items-center gap-6">
                  <button
                    onClick={() => setIsDark(!isDark)}
                    className="zora-button-secondary"
                    aria-label="Toggle theme"
                  >
                    <span className="text-lg">
                      {isDark ? '🌙' : '☀️'}
                    </span>
                  </button>
                  <ConnectButton />
                </div>
              </div>
            </div>
          </header>

          {/* Navigation */}
          <nav className="border-b border-[var(--zora-border-color)]">
            <div className="max-w-screen-xl mx-auto px-6">
              <div className="flex items-center space-x-8">
                {(['create', 'trade', 'liquidity', 'portfolio', 'analytics'] as const).map((tab) => (
                  <TabButton
                    key={tab}
                    active={activeTab === tab}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </TabButton>
                ))}
              </div>
            </div>
          </nav>

          {/* Main Content */}
          <main className="max-w-screen-xl mx-auto px-6 py-12">
            {renderContent()}
          </main>
        </div>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
