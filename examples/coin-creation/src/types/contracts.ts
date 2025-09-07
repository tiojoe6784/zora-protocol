export interface TokenInfo {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  totalSupply: string;
}

export interface CreatorCoin extends TokenInfo {
  owner: string;
  metadata: string;
  type: 'CREATOR';
}

export interface ContentCoin extends TokenInfo {
  owner: string;
  metadata: string;
  creatorCoin: string;
  type: 'CONTENT';
}

export type Coin = CreatorCoin | ContentCoin;

export interface PoolInfo {
  token0: string;
  token1: string;
  fee: number;
  liquidity: string;
  sqrtPriceX96: string;
  tick: number;
}

export interface UserPosition {
  tokenId: string;
  coin: Coin;
  liquidity: string;
  amount0: string;
  amount1: string;
}

export interface RewardInfo {
  amount: string;
  token: string;
  claimed: boolean;
  timestamp: number;
}

export interface FactoryAddresses {
  CreatorCoinFactory: string;
  ContentCoinFactory: string;
  RewardsDistributor: string;
}
