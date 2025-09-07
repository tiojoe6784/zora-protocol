import { useState } from 'react';
import { useAccount } from 'wagmi';
import { parseEther } from 'viem';
import { useTokenBalance, useTokenInfo } from '../hooks/useContracts';

export function Liquidity() {
  const { address, isConnected } = useAccount();
  const [formData, setFormData] = useState({
    tokenA: '',
    tokenB: '',
    amountA: '',
    amountB: '',
  });

  // Get token balances and info
  const { balance: balanceA } = useTokenBalance(formData.tokenA);
  const { balance: balanceB } = useTokenBalance(formData.tokenB);
  const { tokenInfo: tokenAInfo } = useTokenInfo(formData.tokenA);
  const { tokenInfo: tokenBInfo } = useTokenInfo(formData.tokenB);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!address || !isConnected) {
      alert('Please connect your wallet first');
      return;
    }

    try {
      // TODO: Implement liquidity addition functionality
      console.log('Add liquidity:', formData);
    } catch (error) {
      console.error('Error adding liquidity:', error);
      alert('Failed to add liquidity. Check console for details.');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Add Liquidity</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">First Token</label>
          <div className="flex gap-2">
            <input
              type="text"
              name="tokenA"
              value={formData.tokenA}
              onChange={handleChange}
              required
              className="flex-grow p-2 border rounded"
              placeholder="Token address"
            />
            {balanceA && (
              <span className="text-sm text-gray-600 mt-2">
                Balance: {balanceA.toString()}
              </span>
            )}
          </div>
        </div>

        <div>
          <label className="block mb-1">First Token Amount</label>
          <input
            type="text"
            name="amountA"
            value={formData.amountA}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
            placeholder="Enter amount"
          />
        </div>

        <div>
          <label className="block mb-1">Second Token</label>
          <div className="flex gap-2">
            <input
              type="text"
              name="tokenB"
              value={formData.tokenB}
              onChange={handleChange}
              required
              className="flex-grow p-2 border rounded"
              placeholder="Token address"
            />
            {balanceB && (
              <span className="text-sm text-gray-600 mt-2">
                Balance: {balanceB.toString()}
              </span>
            )}
          </div>
        </div>

        <div>
          <label className="block mb-1">Second Token Amount</label>
          <input
            type="text"
            name="amountB"
            value={formData.amountB}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
            placeholder="Enter amount"
          />
        </div>

        <button
          type="submit"
          disabled={!isConnected}
          className={`w-full py-2 px-4 text-white rounded ${
            !isConnected
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          Add Liquidity
        </button>
      </form>

      {/* Pool info would go here */}
      <div className="mt-4 text-sm text-gray-600">
        <p>Pool share: --</p>
        <p>Current ratio: --</p>
      </div>
    </div>
  );
}
