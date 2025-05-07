
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface CryptoAsset {
  id: string;
  rank: number;
  name: string;
  symbol: string;
  logo: string;
  price: number;
  priceChange1h: number;
  priceChange24h: number;
  priceChange7d: number;
  marketCap: number;
  volume24h: number;
  circulatingSupply: number;
  maxSupply: number | null;
  lastUpdated: string;
}

interface PriceUpdate {
  id: string;
  price: number;
  priceChange1h: number;
  priceChange24h: number;
  priceChange7d: number;
  volume24h: number;
}

interface CryptoState {
  assets: CryptoAsset[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  sorting: {
    column: keyof CryptoAsset | null;
    direction: 'asc' | 'desc';
  };
}

// Initial mock data
const initialState: CryptoState = {
  assets: [
    {
      id: 'bitcoin',
      rank: 1,
      name: 'Bitcoin',
      symbol: 'BTC',
      logo: 'bitcoin',
      price: 65432.10,
      priceChange1h: 0.43,
      priceChange24h: 0.93,
      priceChange7d: 11.11,
      marketCap: 1861618902186,
      volume24h: 43874950947,
      circulatingSupply: 19.85,
      maxSupply: 21,
      lastUpdated: new Date().toISOString(),
    },
    {
      id: 'ethereum',
      rank: 2,
      name: 'Ethereum',
      symbol: 'ETH',
      logo: 'ethereum',
      price: 3456.78,
      priceChange1h: 0.60,
      priceChange24h: 3.21,
      priceChange7d: 13.68,
      marketCap: 417581279327,
      volume24h: 23547469307,
      circulatingSupply: 120.71,
      maxSupply: null,
      lastUpdated: new Date().toISOString(),
    },
    {
      id: 'tether',
      rank: 3,
      name: 'Tether',
      symbol: 'USDT',
      logo: 'dollar-sign',
      price: 1.00,
      priceChange1h: 0.00,
      priceChange24h: 0.00,
      priceChange7d: 0.04,
      marketCap: 145320022085,
      volume24h: 92288882007,
      circulatingSupply: 145.27,
      maxSupply: null,
      lastUpdated: new Date().toISOString(),
    },
    {
      id: 'xrp',
      rank: 4,
      name: 'XRP',
      symbol: 'XRP',
      logo: 'dollar-sign',
      price: 2.22,
      priceChange1h: 0.46,
      priceChange24h: 0.54,
      priceChange7d: 6.18,
      marketCap: 130073814966,
      volume24h: 5131481491,
      circulatingSupply: 58.39,
      maxSupply: 100,
      lastUpdated: new Date().toISOString(),
    },
    {
      id: 'solana',
      rank: 5,
      name: 'Solana',
      symbol: 'SOL',
      logo: 'dollar-sign',
      price: 151.51,
      priceChange1h: 0.53,
      priceChange24h: 1.26,
      priceChange7d: 14.74,
      marketCap: 78381958631,
      volume24h: 4881674486,
      circulatingSupply: 517.31,
      maxSupply: null,
      lastUpdated: new Date().toISOString(),
    },
  ],
  status: 'idle',
  error: null,
  sorting: {
    column: 'rank',
    direction: 'asc',
  },
};

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    updatePrices: (state, action: PayloadAction<PriceUpdate[]>) => {
      action.payload.forEach((update) => {
        const asset = state.assets.find((a) => a.id === update.id);
        if (asset) {
          asset.price = update.price;
          asset.priceChange1h = update.priceChange1h;
          asset.priceChange24h = update.priceChange24h;
          asset.priceChange7d = update.priceChange7d;
          asset.volume24h = update.volume24h;
          asset.lastUpdated = new Date().toISOString();
        }
      });
    },
    setSorting: (state, action: PayloadAction<{ column: keyof CryptoAsset; direction: 'asc' | 'desc' }>) => {
      state.sorting = action.payload;
    },
  },
});

export const { updatePrices, setSorting } = cryptoSlice.actions;

// Selectors
export const selectAllAssets = (state: RootState) => state.crypto.assets;
export const selectSorting = (state: RootState) => state.crypto.sorting;

// Memoized selector for sorted assets
export const selectSortedAssets = (state: RootState) => {
  const { assets, sorting } = state.crypto;
  const { column, direction } = sorting;
  
  if (!column) return assets;
  
  return [...assets].sort((a, b) => {
    const aValue = a[column];
    const bValue = b[column];
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return direction === 'asc' ? aValue - bValue : bValue - aValue;
    }
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return direction === 'asc' 
        ? aValue.localeCompare(bValue) 
        : bValue.localeCompare(aValue);
    }
    
    return 0;
  });
};

export default cryptoSlice.reducer;
