const { ethers } = require("ethers");

// Replace with your RPC URL
const provider = new ethers.JsonRpcProvider("https://sepolia.base.org");

// Replace with your wallet private key (for simulation, not sending tx)
const signer = provider; // No private key needed for callStatic

// Replace with your contract ABI and address
const factoryAbi = require("./ZoraFactoryImpl.json"); // ABI file for ZoraFactoryImpl
const factoryAddress = "0x777777751622c0d3258f214F9DF38E35BF45baF3";

const factory = new ethers.Contract(factoryAddress, factoryAbi, signer);

async function main() {
  try {
    const payoutRecipient = "0xb843A2D0D4B9E628500d2E0f6f0382e063C14a95";
    const owners = [payoutRecipient];
    const uri = "https://raw.githubusercontent.com/jost305/zora-protocol/main/examples/coin-creation/sample-metadata.json";
    const name = "TEST YES";
    const symbol = "SAMPL";
    const poolConfig = "0x040000000000000000000000000000000000000000000000000000000000800a00000000000000000000000000000000000000000000000000000000000000c00000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000014000000000000000000000000000000000000000000000000000000000000001800000000000000000000000000000000000000000000000000000000000000001fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffde4f000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000013c680000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000b000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000b1a2bc2ec50000";
    const platformReferrer = "0x0000000000000000000000000000000000000000";
    const coinSalt = "0xef5441530e3c186c734a636eec88f6e9de3a32a2d331d149ea6d0c555a5df401";

    // Simulate the contract call
    await factory.callStatic.deployCreatorCoin(
      payoutRecipient,
      owners,
      uri,
      name,
      symbol,
      poolConfig,
      platformReferrer,
      coinSalt
    );
    console.log("Simulation succeeded, transaction would not revert.");
  } catch (err) {
    // Print the revert reason if available
    if (err && err.message) {
      console.error("Simulation reverted with reason:", err.message);
    } else {
      console.error("Simulation reverted with unknown error:", err);
    }
  }
}

main();
