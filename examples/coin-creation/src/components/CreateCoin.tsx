import { useState } from 'react';
import { useAccount } from 'wagmi';
import { useCreateCoin } from '../hooks/useContracts';

export function CreateCoin() {
  const { address, isConnected } = useAccount();
  const { createCreatorCoin, createContentCoin, isCreating } = useCreateCoin();

  const [formData, setFormData] = useState({
    name: '',
    symbol: '',
    metadata: '',
    creatorCoin: '',
    type: 'creator' as 'creator' | 'content',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, symbol, metadata, creatorCoin, type } = formData;

    if (!address || !isConnected) {
      alert('Please connect your wallet first');
      return;
    }

    try {
      if (type === 'creator') {
        await createCreatorCoin(name, symbol, metadata);
      } else {
        if (!creatorCoin) {
          alert('Please enter a creator coin address');
          return;
        }
        await createContentCoin(name, symbol, metadata, creatorCoin);
      }
    } catch (error) {
      console.error('Error creating coin:', error);
      alert('Failed to create coin. Check console for details.');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Create New Coin</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Coin Type</label>
          <select 
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="creator">Creator Coin</option>
            <option value="content">Content Coin</option>
          </select>
        </div>

        <div>
          <label className="block mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
            placeholder="Enter coin name"
          />
        </div>

        <div>
          <label className="block mb-1">Symbol</label>
          <input
            type="text"
            name="symbol"
            value={formData.symbol}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
            placeholder="Enter coin symbol"
          />
        </div>

        <div>
          <label className="block mb-1">Metadata URI</label>
          <input
            type="text"
            name="metadata"
            value={formData.metadata}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
            placeholder="Enter metadata URI"
          />
        </div>

        {formData.type === 'content' && (
          <div>
            <label className="block mb-1">Creator Coin Address</label>
            <input
              type="text"
              name="creatorCoin"
              value={formData.creatorCoin}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
              placeholder="Enter creator coin address"
            />
          </div>
        )}

        <button
          type="submit"
          disabled={!isConnected || isCreating}
          className={`w-full py-2 px-4 text-white rounded ${
            !isConnected || isCreating
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {isCreating ? 'Creating...' : 'Create Coin'}
        </button>
      </form>
    </div>
  );
}
