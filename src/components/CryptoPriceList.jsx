import { useState } from 'react';
import { useBinanceWebSocket, sortByGainers, sortByLosers, sortByVolume } from '@/lib/binanceWebSocket';

const CryptoPriceList = () => {
  const [sortBy, setSortBy] = useState('gainers');
  const { prices, priceChanges, isConnected, error } = useBinanceWebSocket();

  const getSortedData = () => {
    switch (sortBy) {
      case 'gainers':
        return sortByGainers(prices, priceChanges);
      case 'losers':
        return sortByLosers(prices, priceChanges);
      case 'volume':
        return sortByVolume(prices, priceChanges);
      default:
        return sortByGainers(prices, priceChanges);
    }
  };

  const sortedData = getSortedData();

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="mb-4 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Crypto Prices</h2>
          <div className="flex items-center gap-2 mt-1">
            <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {isConnected ? 'Connected to Binance' : 'Connecting...'}
            </span>
            {error && (
              <span className="text-sm text-red-500 ml-2">{error}</span>
            )}
          </div>
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="p-2 border rounded-md"
        >
          <option value="gainers">Top Gainers</option>
          <option value="losers">Top Losers</option>
          <option value="volume">By Volume</option>
        </select>
      </div>

      <div className="grid gap-4">
        {sortedData.map(({ symbol, price, priceChange, priceChangePercent }) => (
          <div
            key={symbol}
            className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md flex justify-between items-center"
          >
            <div>
              <h3 className="text-lg font-semibold">{symbol.toUpperCase()}</h3>
              <p className="text-gray-600 dark:text-gray-300">${price.toFixed(2)}</p>
            </div>
            <div className={`text-right ${priceChangePercent >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              <p className="font-semibold">{priceChangePercent.toFixed(2)}%</p>
              <p className="text-sm">${priceChange.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CryptoPriceList; 