import { ethers } from "hardhat";
import dotenv from "dotenv";
dotenv.config();

async function main() {
  // Example: Deploy ZoraFactoryImpl
  const Factory = await ethers.getContractFactory("ZoraFactoryImpl");
  const factory = await Factory.deploy(/* constructor args if any */);
  await factory.deployed();
  console.log("ZoraFactoryImpl deployed to:", factory.address);

  // Example: Deploy CreatorCoin
  const CreatorCoin = await ethers.getContractFactory("CreatorCoin");
  const creatorCoin = await CreatorCoin.deploy(/* constructor args if any */);
  await creatorCoin.deployed();
  console.log("CreatorCoin deployed to:", creatorCoin.address);

  // Repeat for other contracts as needed
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
