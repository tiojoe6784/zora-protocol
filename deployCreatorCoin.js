const { JsonRpcProvider, Wallet, Contract, randomBytes, hexlify, AbiCoder } = require("ethers");
const provider = new JsonRpcProvider("https://rpc.ankr.com/base-sepolia");
const signer = new Wallet("0x17f57e5a5da1c7eb183fd1d8bd08d54d66303c4333ce70e344e95b1363d335ab", provider);
const factoryAddress = "0x777777751622c0d3258f214F9DF38E35BF45baF3";
const factoryAbi = [/* ABI for deployCreatorCoin */];
const factory = new Contract(factoryAddress, factoryAbi, signer);

async function main() {
  const payoutRecipient = "0xb843A2D0D4B9E628500d2E0f6f0382e063C14a95";
  const owners = [payoutRecipient];
  const uri = "https://raw.githubusercontent.com/jost305/zora-protocol/main/examples/coin-creation/sample-metadata.json";
  const name = "TEST YES";
  const symbol = "SAMPL";
  const platformReferrer = "0x0000000000000000000000000000000000000000";
  const coinSalt = hexlify(randomBytes(32));

  // Manually encode poolConfig using ethers v6 AbiCoder
  const abiCoder = new AbiCoder();
  const poolConfig = abiCoder.encode(
    ["uint8", "address", "int24[]", "int24[]", "uint16[]", "uint256[]"],
    [
      4, // DOPPLER_MULTICURVE_UNI_V4_POOL_VERSION
      "0x000000000000000000000000000000000000800A",
      [-138000],
      [81000],
      [11],
      ["50000000000000000"] // 0.05e18
    ]
  );

  // Deploy Creator Coin using Contract method
  try {
    const tx = await factory.deployCreatorCoin({
      signer,
      payoutRecipient,
      owners,
      uri,
      name,
      symbol,
      poolConfig,
      platformReferrer,
      coinSalt,
      chainId: 84532
    });
    console.log("Transaction sent:", tx.hash);
    await tx.wait();
    console.log("Deployment complete!");
  } catch (err) {
    console.error(err);
  }
}

main().catch(console.error);