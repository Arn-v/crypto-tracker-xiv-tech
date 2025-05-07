import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import {
  selectSortedAssets,
  selectSorting,
  setSorting,
  CryptoAsset
} from '../features/crypto/cryptoSlice';
import { Bitcoin, ChartLine, DollarSign, Cpu } from 'lucide-react';
import { cn } from '../lib/utils';
import SparklineChart from './SparklineChart';

const CryptoTable = () => {
  const assets = useAppSelector(selectSortedAssets);
  const sorting = useAppSelector(selectSorting);
  const dispatch = useAppDispatch();
  
  // Keep track of which prices have changed for animation
  const [changedPrices, setChangedPrices] = useState<Record<string, boolean>>({});
  const [previousPrices, setPreviousPrices] = useState<Record<string, number>>({});

  useEffect(() => {
    // Check which prices have changed
    const newChangedPrices: Record<string, boolean> = {};
    const newPreviousPrices: Record<string, number> = {};
    
    assets.forEach(asset => {
      const prevPrice = previousPrices[asset.id];
      if (prevPrice !== undefined && prevPrice !== asset.price) {
        newChangedPrices[asset.id] = true;
      }
      newPreviousPrices[asset.id] = asset.price;
    });
    
    if (Object.keys(newChangedPrices).length > 0) {
      setChangedPrices(newChangedPrices);
      setTimeout(() => setChangedPrices({}), 500); // Reset after animation duration
    }
    
    setPreviousPrices(newPreviousPrices);
  }, [assets]);

  const handleSort = (column: keyof CryptoAsset) => {
    const direction = sorting.column === column && sorting.direction === 'asc' ? 'desc' : 'asc';
    dispatch(setSorting({ column, direction }));
  };

  const formatNumber = (number: number | null, precision: number = 2): string => {
    if (number === null) return 'N/A';
    
    if (number >= 1_000_000_000_000) {
      return `$${(number / 1_000_000_000_000).toFixed(precision)}T`;
    }
    if (number >= 1_000_000_000) {
      return `$${(number / 1_000_000_000).toFixed(precision)}B`;
    }
    if (number >= 1_000_000) {
      return `$${(number / 1_000_000).toFixed(precision)}M`;
    }
    if (number >= 1_000) {
      return `$${(number / 1_000).toFixed(precision)}K`;
    }
    return `$${number.toFixed(precision)}`;
  };

  const renderLogo = (logoType: string) => {
    switch (logoType) {
      case 'bitcoin':
        return <Bitcoin className="h-6 w-6 text-crypto-orange" />;
      case 'ethereum':
        return <Cpu className="h-6 w-6 text-purple-400" />;
      default:
        return <DollarSign className="h-6 w-6 text-blue-400" />;
    }
  };

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse">
        <thead className="bg-crypto-darkgray">
          <tr>
            <th onClick={() => handleSort('rank')} className="py-4 px-4 text-left cursor-pointer">
              <div className="flex items-center gap-1 text-gray-300">
                #
                {sorting.column === 'rank' && (
                  <span>{sorting.direction === 'asc' ? '↑' : '↓'}</span>
                )}
              </div>
            </th>
            <th onClick={() => handleSort('name')} className="py-4 px-4 text-left cursor-pointer">
              <div className="flex items-center gap-1">
                Name
                {sorting.column === 'name' && (
                  <span>{sorting.direction === 'asc' ? '↑' : '↓'}</span>
                )}
              </div>
            </th>
            <th onClick={() => handleSort('price')} className="py-4 px-4 text-right cursor-pointer">
              <div className="flex items-center justify-end gap-1">
                Price
                {sorting.column === 'price' && (
                  <span>{sorting.direction === 'asc' ? '↑' : '↓'}</span>
                )}
              </div>
            </th>
            <th onClick={() => handleSort('priceChange1h')} className="py-4 px-4 text-right cursor-pointer">
              <div className="flex items-center justify-end gap-1">
                1h %
                {sorting.column === 'priceChange1h' && (
                  <span>{sorting.direction === 'asc' ? '↑' : '↓'}</span>
                )}
              </div>
            </th>
            <th onClick={() => handleSort('priceChange24h')} className="py-4 px-4 text-right cursor-pointer">
              <div className="flex items-center justify-end gap-1">
                24h %
                {sorting.column === 'priceChange24h' && (
                  <span>{sorting.direction === 'asc' ? '↑' : '↓'}</span>
                )}
              </div>
            </th>
            <th onClick={() => handleSort('priceChange7d')} className="py-4 px-4 text-right cursor-pointer">
              <div className="flex items-center justify-end gap-1">
                7d %
                {sorting.column === 'priceChange7d' && (
                  <span>{sorting.direction === 'asc' ? '↑' : '↓'}</span>
                )}
              </div>
            </th>
            <th onClick={() => handleSort('marketCap')} className="py-4 px-4 text-right cursor-pointer">
              <div className="flex items-center justify-end gap-1">
                Market Cap
                {sorting.column === 'marketCap' && (
                  <span>{sorting.direction === 'asc' ? '↑' : '↓'}</span>
                )}
              </div>
            </th>
            <th onClick={() => handleSort('volume24h')} className="py-4 px-4 text-right cursor-pointer">
              <div className="flex items-center justify-end gap-1">
                Volume(24h)
                {sorting.column === 'volume24h' && (
                  <span>{sorting.direction === 'asc' ? '↑' : '↓'}</span>
                )}
              </div>
            </th>
            <th onClick={() => handleSort('circulatingSupply')} className="py-4 px-4 text-right cursor-pointer">
              <div className="flex items-center justify-end gap-1">
                Circulating Supply
                {sorting.column === 'circulatingSupply' && (
                  <span>{sorting.direction === 'asc' ? '↑' : '↓'}</span>
                )}
              </div>
            </th>
            <th className="py-4 px-4 text-right">Last 7 Days</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((asset) => (
            <tr key={asset.id} className="border-b border-gray-800 hover:bg-crypto-darkgray/30">
              <td className="py-4 px-4 text-left">{asset.rank}</td>
              <td className="py-4 px-4 text-left">
                <div className="flex items-center gap-2">
                  {renderLogo(asset.logo)}
                  <div>
                    <div className="font-semibold text-white">{asset.name}</div>
                    <div className="text-sm text-gray-400">{asset.symbol}</div>
                  </div>
                </div>
              </td>
              <td className={cn(
                "py-4 px-4 text-right font-semibold",
                changedPrices[asset.id] && "price-changed"
              )}>
                ${asset.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </td>
              <td className={`py-4 px-4 text-right ${asset.priceChange1h >= 0 ? 'text-crypto-positive' : 'text-crypto-negative'}`}>
                {asset.priceChange1h >= 0 ? '▲' : '▼'} {Math.abs(asset.priceChange1h)}%
              </td>
              <td className={`py-4 px-4 text-right ${asset.priceChange24h >= 0 ? 'text-crypto-positive' : 'text-crypto-negative'}`}>
                {asset.priceChange24h >= 0 ? '▲' : '▼'} {Math.abs(asset.priceChange24h)}%
              </td>
              <td className={`py-4 px-4 text-right ${asset.priceChange7d >= 0 ? 'text-crypto-positive' : 'text-crypto-negative'}`}>
                {asset.priceChange7d >= 0 ? '▲' : '▼'} {Math.abs(asset.priceChange7d)}%
              </td>
              <td className="py-4 px-4 text-right">{formatNumber(asset.marketCap)}</td>
              <td className="py-4 px-4 text-right">
                <div>{formatNumber(asset.volume24h)}</div>
                <div className="text-sm text-gray-400">{asset.symbol}</div>
              </td>
              <td className="py-4 px-4 text-right">
                <div>{asset.circulatingSupply.toLocaleString()} {asset.symbol}</div>
                {asset.maxSupply && (
                  <div className="w-full bg-gray-700 rounded-full h-1.5 mt-1">
                    <div 
                      className="bg-crypto-orange h-1.5 rounded-full" 
                      style={{ 
                        width: `${(asset.circulatingSupply / asset.maxSupply) * 100}%` 
                      }}
                    ></div>
                  </div>
                )}
              </td>
              <td className="py-4 px-4">
                <SparklineChart trend={asset.priceChange7d >= 0 ? 'up' : 'down'} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoTable;
