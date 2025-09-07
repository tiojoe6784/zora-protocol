import { useState } from 'react';
import { useAccount } from 'wagmi';
import { parseEther } from 'viem';
import { useTokenBalance, useTokenInfo } from '../hooks/useContracts';

export function Trade() {
  const { address, isConnected } = useAccount();
  const [formData, setFormData] = useState({
    tokenIn: '',
    tokenOut: '',
    amountIn: '',
    slippage: '0.5',
  });

  // Get token balances and info
  const { balance: balanceIn } = useTokenBalance(formData.tokenIn);
  const { balance: balanceOut } = useTokenBalance(formData.tokenOut);
  const { tokenInfo: tokenInInfo } = useTokenInfo(formData.tokenIn);
  const { tokenInfo: tokenOutInfo } = useTokenInfo(formData.tokenOut);

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
      // TODO: Implement swap functionality
      console.log('Swap:', formData);
    } catch (error) {
      console.error('Error swapping:', error);
      alert('Failed to swap. Check console for details.');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Trade</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Token In</label>
          <div className="flex gap-2">
            <input
              type="text"
              name="tokenIn"
              value={formData.tokenIn}
              onChange={handleChange}
              required
              className="flex-grow p-2 border rounded"
              placeholder="Token address"
            />
            {balanceIn && (
              <span className="text-sm text-gray-600 mt-2">
                Balance: {balanceIn.toString()}
              </span>
            )}
          </div>
        </div>

        <div>
          <label className="block mb-1">Amount In</label>
          <input
            type="text"
            name="amountIn"
            value={formData.amountIn}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
            placeholder="Enter amount"
          />
        </div>

        <div>
          <label className="block mb-1">Token Out</label>
          <div className="flex gap-2">
            <input
              type="text"
              name="tokenOut"
              value={formData.tokenOut}
              onChange={handleChange}
              required
              className="flex-grow p-2 border rounded"
              placeholder="Token address"
            />
            {balanceOut && (
              <span className="text-sm text-gray-600 mt-2">
                Balance: {balanceOut.toString()}
              </span>
            )}
          </div>
        </div>

        <div>
          <label className="block mb-1">Slippage (%)</label>
          <input
            type="number"
            name="slippage"
            value={formData.slippage}
            onChange={handleChange}
            required
            min="0.1"
            max="100"
            step="0.1"
            className="w-full p-2 border rounded"
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
          Swap
        </button>
      </form>

      {/* Price and route info would go here */}
      <div className="mt-4 text-sm text-gray-600">
        <p>Price impact: --</p>
        <p>Route: --</p>
      </div>
    </div>
  );
}
