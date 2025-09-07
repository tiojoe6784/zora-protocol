import { defineConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";

export default defineConfig({
  solidity: "0.8.20",
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  networks: {
    base_sepolia: {
      url: "https://sepolia.base.org", // Replace with your preferred RPC endpoint
      chainId: 84532,
      accounts: [process.env.PRIVATE_KEY || ""] // Set your deployer private key in .env
    }
  }
});
