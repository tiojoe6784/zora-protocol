import { useEffect, useState } from 'react';

type TokenData = {
  address: string;
  name: string;
  totalSupply: string;
  holders: number;
  volume24h: string;
  price: string;
};

type TVLData = {
  timestamp: number;
  value: number;
};

export function Analytics() {
  // Mock data - replace with actual API calls
  const [tokens, setTokens] = useState<TokenData[]>([]);
  const [tvlData, setTVLData] = useState<TVLData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock data fetch
    const mockTokens: TokenData[] = [
      {
        address: '0x123',
        name: 'Creator Coin A',
        totalSupply: '1000000',
        holders: 150,
        volume24h: '25000',
        price: '0.15',
      },
      {
        address: '0x456',
        name: 'Content Coin B',
        totalSupply: '500000',
        holders: 75,
        volume24h: '12000',
        price: '0.08',
      },
    ];

    const mockTVL: TVLData[] = Array.from({ length: 30 }, (_, i) => ({
      timestamp: Date.now() - i * 24 * 60 * 60 * 1000,
      value: 1000000 + Math.random() * 500000,
    }));

    setTokens(mockTokens);
    setTVLData(mockTVL);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="text-center py-12">Loading analytics...</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Analytics</h2>

      {/* Overview Cards */}
      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <MetricCard
          title="Total Value Locked"
          value="$1.5M"
          change="+5.2%"
          isPositive={true}
        />
        <MetricCard
          title="24h Volume"
          value="$250K"
          change="-2.1%"
          isPositive={false}
        />
        <MetricCard
          title="Total Tokens"
          value={tokens.length.toString()}
          change="+2"
          isPositive={true}
        />
      </div>

      {/* Token Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
        <h3 className="text-xl font-semibold p-4 border-b">Tokens</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Token</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Total Supply</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Holders</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">24h Volume</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tokens.map((token) => (
                <tr key={token.address}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{token.name}</div>
                        <div className="text-sm text-gray-500">{token.address}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">{token.totalSupply}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">{token.holders}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">${token.volume24h}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">${token.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* TVL Chart placeholder */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4">Total Value Locked</h3>
        <div className="h-64 flex items-center justify-center text-gray-500">
          Chart placeholder - implement with your preferred charting library
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, change, isPositive }: {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
}) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <p className="mt-2 text-3xl font-semibold text-gray-900">{value}</p>
      <p className={`mt-2 flex items-center text-sm ${
        isPositive ? 'text-green-600' : 'text-red-600'
      }`}>
        <span>{change}</span>
      </p>
    </div>
  );
}
