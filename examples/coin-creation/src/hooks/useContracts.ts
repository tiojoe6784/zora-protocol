import { useContractRead, useContractWrite, useAccount } from 'wagmi';
import type { FactoryAddresses, RewardInfo } from '../types/contracts';
import { parseEther } from 'viem';
import { ethers } from 'ethers';

// Contract addresses for Base Sepolia
const ADDRESSES = {
  CreatorCoinFactory: '0x777777751622c0d3258f214F9DF38E35BF45baF3' as const,
  ContentCoinFactory: '0x777777751622c0d3258f214F9DF38E35BF45baF3' as const, // Same factory for both
  RewardsDistributor: '0x7777777f999737e783d7428744052dbcb14c0aca' as const,
} satisfies FactoryAddresses;

const FACTORY_ABI = [
  {
    inputs: [
      { name: 'payoutRecipient', type: 'address' },
      { name: 'owners', type: 'address[]' },
      { name: 'uri', type: 'string' },
      { name: 'name', type: 'string' },
      { name: 'symbol', type: 'string' },
      { name: 'poolConfig', type: 'bytes' },
      { name: 'platformReferrer', type: 'address' },
      { name: 'coinSalt', type: 'bytes32' }
    ],
    name: 'deployCreatorCoin',
    outputs: [{ name: '', type: 'address' }],
    stateMutability: 'nonpayable',
    type: 'function'
  }
] as const;

const CONTENT_FACTORY_ABI = [
  {
    inputs: [
      { name: 'name', type: 'string' },
      { name: 'symbol', type: 'string' },
      { name: 'metadata', type: 'string' },
      { name: 'creatorCoin', type: 'address' },
    ],
    name: 'createCoin',
    outputs: [{ name: '', type: 'address' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;

const ERC20_ABI = [
  {
    inputs: [{ name: 'account', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'name',
    outputs: [{ name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const;

const REWARDS_ABI = [
  {
    inputs: [{ name: 'account', type: 'address' }],
    name: 'getRewards',
    outputs: [{ name: '', type: 'tuple[]' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'claimRewards',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;

export function useCreateCoin() {
  const { address } = useAccount();

  const { write: createCreatorCoin, isLoading: isCreatingCreator } = useContractWrite({
    address: ADDRESSES.CreatorCoinFactory,
    abi: FACTORY_ABI,
    functionName: 'deployCreatorCoin',
  });

  const { write: createContentCoin, isLoading: isCreatingContent } = useContractWrite({
    address: ADDRESSES.ContentCoinFactory,
    abi: CONTENT_FACTORY_ABI,
    functionName: 'createCoin',
  });

  const createPoolConfig = () => {
    // ABI encode the parameters according to CreatorCoin.t.sol test format
    const poolConfigParams = {
      version: "0x0000000000000000000000000000000000000000000000000000000000000001", // Version 1
      currency: "0x000000000000000000000000000000000000800A", // ZORA token on Base Sepolia
      tickLower: [-138000],
      tickUpper: [81000],
      numDiscoveryPositions: [11],
      maxDiscoverySupplyShare: [BigInt("50000000000000000")] // 0.05 in fixed point (5%)
    };

    // Encode following Solidity's abi.encode format
    const encoded = ethers.utils.defaultAbiCoder.encode(
      ["bytes32", "address", "int24[]", "int24[]", "uint16[]", "uint256[]"],
      [
        poolConfigParams.version,
        poolConfigParams.currency,
        poolConfigParams.tickLower,
        poolConfigParams.tickUpper,
        poolConfigParams.numDiscoveryPositions,
        poolConfigParams.maxDiscoverySupplyShare
      ]
    );

    return encoded;
  };

  return {
    createCreatorCoin: async (name: string, symbol: string, metadata: string) => {
      if (!address) throw new Error("Wallet not connected");

      // Create pool configuration following the test format
      const poolConfig = createPoolConfig();

      // Generate a deterministic salt based on address and timestamp
      const salt = ethers.utils.keccak256(
        ethers.utils.defaultAbiCoder.encode(
          ["address", "uint256"],
          [address, Math.floor(Date.now() / 1000)]
        )
      );

      await createCreatorCoin?.({
        args: [
          address as `0x${string}`, // payoutRecipient
          [address] as readonly `0x${string}`[], // owners array - current user is the owner
          metadata, // metadata URI
          name,  // token name
          symbol, // token symbol
          poolConfig as `0x${string}`, // encoded pool configuration
          "0x0000000000000000000000000000000000000000" as `0x${string}`, // no platform referrer
          salt as `0x${string}` // deterministic salt
        ],
      });
    },
    createContentCoin: (name: string, symbol: string, metadata: string, creatorCoin: string) =>
      createContentCoin?.({
        args: [name, symbol, metadata, creatorCoin as `0x${string}`],
      }),
    isCreating: isCreatingCreator || isCreatingContent,
  };
}

export function useTokenInfo(tokenAddress?: string) {
  const { data: tokenInfo } = useContractRead({
    address: tokenAddress as `0x${string}`,
    abi: ERC20_ABI,
    functionName: 'name',
    enabled: !!tokenAddress,
  });

  return { tokenInfo };
}

export function useTokenBalance(tokenAddress?: string) {
  const { address } = useAccount();

  const { data: balance } = useContractRead({
    address: tokenAddress as `0x${string}`,
    abi: ERC20_ABI,
    functionName: 'balanceOf',
    args: [address as `0x${string}`],
    enabled: !!address && !!tokenAddress,
  });

  return { balance };
}

export function useRewards() {
  const { address } = useAccount();

  const { data: rewards } = useContractRead({
    address: ADDRESSES.RewardsDistributor,
    abi: REWARDS_ABI,
    functionName: 'getRewards',
    args: [address as `0x${string}`],
    enabled: !!address,
  });

  const { write: claimRewards, isLoading: isClaiming } = useContractWrite({
    address: ADDRESSES.RewardsDistributor,
    abi: REWARDS_ABI,
    functionName: 'claimRewards',
  });

  return {
    rewards: rewards as RewardInfo[],
    claimRewards: () => claimRewards?.(),
    isClaiming,
  };
}
