import { createSlice } from '@reduxjs/toolkit';

// Initial mock data
const initialState = {
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
    // New cryptocurrencies
    {
      id: 'litecoin',
      rank: 6,
      name: 'Litecoin',
      symbol: 'LTC',
      logo: 'dollar-sign',
      price: 83.45,
      priceChange1h: 0.22,
      priceChange24h: -0.75,
      priceChange7d: 5.67,
      marketCap: 6176894532,
      volume24h: 378596214,
      circulatingSupply: 73.89,
      maxSupply: 84,
      lastUpdated: new Date().toISOString(),
    },
    {
      id: 'cardano',
      rank: 7,
      name: 'Cardano',
      symbol: 'ADA',
      logo: 'dollar-sign',
      price: 0.45,
      priceChange1h: -0.12,
      priceChange24h: 1.34,
      priceChange7d: 8.92,
      marketCap: 16349875210,
      volume24h: 512369741,
      circulatingSupply: 36234.71,
      maxSupply: 45000,
      lastUpdated: new Date().toISOString(),
    },
    {
      id: 'sui',
      rank: 8,
      name: 'Sui',
      symbol: 'SUI',
      logo: 'dollar-sign',
      price: 1.68,
      priceChange1h: 1.23,
      priceChange24h: 5.62,
      priceChange7d: 20.34,
      marketCap: 3452987615,
      volume24h: 621478952,
      circulatingSupply: 2053.57,
      maxSupply: 10000,
      lastUpdated: new Date().toISOString(),
    },
    {
      id: 'kaito',
      rank: 9,
      name: 'Kaito',
      symbol: 'KAITO',
      logo: 'dollar-sign',
      price: 0.047,
      priceChange1h: 2.34,
      priceChange24h: 7.89,
      priceChange7d: 15.32,
      marketCap: 124598763,
      volume24h: 32148967,
      circulatingSupply: 2650.42,
      maxSupply: 5000,
      lastUpdated: new Date().toISOString(),
    },
    {
      id: 'pepe',
      rank: 10,
      name: 'Pepe',
      symbol: 'PEPE',
      logo: 'dollar-sign',
      price: 0.0000092,
      priceChange1h: 3.45,
      priceChange24h: 12.67,
      priceChange7d: 42.19,
      marketCap: 3876543219,
      volume24h: 789456123,
      circulatingSupply: 420690000000,
      maxSupply: 1000000000000,
      lastUpdated: new Date().toISOString(),
    },
    {
      id: 'fartcoin',
      rank: 11,
      name: 'Fartcoin',
      symbol: 'FART',
      logo: 'dollar-sign',
      price: 0.00069,
      priceChange1h: 6.90,
      priceChange24h: -4.20,
      priceChange7d: 69.42,
      marketCap: 42069420,
      volume24h: 6942069,
      circulatingSupply: 60942069,
      maxSupply: 69420000,
      lastUpdated: new Date().toISOString(),
    },
  ],
  status: 'idle',
  error: null,
  sorting: {
    column: null,
    direction: 'asc',
  },
};

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    updatePrices: (state, action) => {
      const updates = action.payload;
      updates.forEach(update => {
        const asset = state.assets.find(a => a.id === update.id);
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
    setSorting: (state, action) => {
      state.sorting = action.payload;
    },
  },
});

export const { updatePrices, setSorting } = cryptoSlice.actions;
export default cryptoSlice.reducer;

export const selectAllAssets = (state) => state.crypto.assets;
export const selectSorting = (state) => state.crypto.sorting;
export const selectSortedAssets = (state) => {
  const { assets, sorting } = state.crypto;
  if (!sorting.column) return assets;
  const sorted = [...assets].sort((a, b) => {
    if (a[sorting.column] < b[sorting.column]) return sorting.direction === 'asc' ? -1 : 1;
    if (a[sorting.column] > b[sorting.column]) return sorting.direction === 'asc' ? 1 : -1;
    return 0;
  });
  return sorted;
};
