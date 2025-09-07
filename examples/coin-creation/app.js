import { RainbowKitProvider, ConnectButton } from '@rainbow-me/rainbowkit';
import { WagmiConfig } from 'wagmi';
import { wagmiConfig, chains } from './rainbowkit-config';

// Initialize RainbowKit
document.addEventListener('DOMContentLoaded', () => {
    const rainbowButton = document.getElementById('rainbow-button');
    
    // Render the RainbowKit Connect Button
    const button = ConnectButton({
        chainStatus: 'icon',
        showBalance: true,
    });
    
    rainbowButton.appendChild(button);
    
    // Initialize WagmiConfig
    const app = document.getElementById('app');
    app.innerHTML = `
        <WagmiConfig config={wagmiConfig}>
            <RainbowKitProvider chains={chains}>
                ${app.innerHTML}
            </RainbowKitProvider>
        </WagmiConfig>
    `;
});

// Handle network switching
document.getElementById('network-selector').addEventListener('change', async (e) => {
    const chainId = parseInt(e.target.value);
    try {
        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: `0x${chainId.toString(16)}` }],
        });
    } catch (error) {
        console.error('Failed to switch network:', error);
    }
});
