import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { useTokenBalance, useTokenInfo, useRewards } from '../hooks/useContracts';

export function Portfolio() {
  const { address, isConnected } = useAccount();
  const { rewards, claimRewards, isClaiming } = useRewards();
  const [tokens, setTokens] = useState<string[]>([]);
  
  // TODO: Fetch user's tokens from an indexer or event logs
  useEffect(() => {
    // Mock data for now
    setTokens(['0x123', '0x456']);
  }, [address]);

  const handleClaimRewards = async () => {
    try {
      await claimRewards();
    } catch (error) {
      console.error('Error claiming rewards:', error);
      alert('Failed to claim rewards. Check console for details.');
    }
  };

  if (!isConnected) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center py-12">
          Please connect your wallet to view your portfolio.
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Portfolio</h2>
      
      {/* Token Holdings */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Your Tokens</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {tokens.map((tokenAddress) => (
            <TokenCard key={tokenAddress} address={tokenAddress} />
          ))}
        </div>
      </div>

      {/* Rewards Section */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Available Rewards</h3>
        <div className="bg-white rounded-lg shadow p-6">
          {rewards && rewards.length > 0 ? (
            <>
              <ul className="space-y-2 mb-4">
                {rewards.map((reward, index) => (
                  <li key={index} className="flex justify-between">
                    <span>{reward.token}</span>
                    <span>{reward.amount}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={handleClaimRewards}
                disabled={isClaiming}
                className={`w-full py-2 px-4 text-white rounded ${
                  isClaiming
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-500 hover:bg-blue-600'
                }`}
              >
                {isClaiming ? 'Claiming...' : 'Claim All Rewards'}
              </button>
            </>
          ) : (
            <p className="text-gray-500">No rewards available</p>
          )}
        </div>
      </div>
    </div>
  );
}

function TokenCard({ address }: { address: string }) {
  const { tokenInfo } = useTokenInfo(address);
  const { balance } = useTokenBalance(address);

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h4 className="font-semibold">{tokenInfo || 'Loading...'}</h4>
          <p className="text-sm text-gray-500">{address}</p>
        </div>
      </div>
      <div className="mt-2">
        <p className="text-lg">
          Balance: {balance ? balance.toString() : 'Loading...'}
        </p>
      </div>
    </div>
  );
}
