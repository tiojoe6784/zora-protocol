// RainbowKit Configuration
import {
    getDefaultWallets,
    connectorsForWallets,
    wallet,
    createAuthenticationAdapter,
    RainbowKitAuthenticationProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { mainnet, sepolia } from 'wagmi/chains';

// Define Base Sepolia chain
const baseSepolia = {
    id: 84532,
    name: 'Base Sepolia',
    network: 'base-sepolia',
    nativeCurrency: {
        decimals: 18,
        name: 'Ether',
        symbol: 'ETH',
    },
    rpcUrls: {
        default: { http: ['https://sepolia.base.org'] },
        public: { http: ['https://sepolia.base.org'] },
    },
    blockExplorers: {
        default: {
            name: 'BaseScan',
            url: 'https://sepolia.basescan.org',
        },
    },
    testnet: true,
};

// Configure chains
const { chains, publicClient } = configureChains(
    [baseSepolia, mainnet, sepolia],
    [publicProvider()]
);

// Configure wallets
const projectId = '8b2d0dd39c1cced02ecce163a96a8cb5';

const { wallets } = getDefaultWallets({
    appName: 'Zora Creator Platform',
    projectId,
    chains,
});

const connectors = connectorsForWallets([
    ...wallets,
    {
        groupName: 'Other',
        wallets: [
            wallet.argent({ projectId, chains }),
            wallet.trust({ projectId, chains }),
            wallet.ledger({ projectId, chains }),
        ],
    },
]);

// Create wagmi config
export const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
});

// Export configured chains
export { chains };
