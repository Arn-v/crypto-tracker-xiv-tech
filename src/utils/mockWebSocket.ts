
import { store } from '../app/store';
import { updatePrices } from '../features/crypto/cryptoSlice';

class MockWebSocket {
  private intervalId: number | null = null;
  private updateFrequency: number;

  constructor(updateFrequency: number = 10000) {  // Changed default to 10 seconds (10000ms)
    this.updateFrequency = updateFrequency;
  }

  connect(): void {
    this.intervalId = window.setInterval(() => {
      this.generatePriceUpdates();
    }, this.updateFrequency);
  }

  disconnect(): void {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  private generatePriceUpdates(): void {
    const assets = store.getState().crypto.assets;
    
    // Randomly select 1 to 3 assets to update instead of updating all at once
    const numberOfAssetsToUpdate = Math.floor(Math.random() * 3) + 1; // Random number between 1 and 3
    
    // Create a shuffled array of indexes to pick random assets
    const assetIndexes = assets.map((_, index) => index);
    this.shuffleArray(assetIndexes);
    
    // Select only some assets to update
    const selectedIndexes = assetIndexes.slice(0, numberOfAssetsToUpdate);
    
    const updates = selectedIndexes.map(index => {
      const asset = assets[index];
      
      // Generate random percentage changes between -2% and +2%
      const priceVariation = (Math.random() * 4 - 2) / 100;
      const hourChange = asset.priceChange1h + (Math.random() * 0.4 - 0.2);
      const dayChange = asset.priceChange24h + (Math.random() * 0.6 - 0.3);
      const weekChange = asset.priceChange7d + (Math.random() * 0.8 - 0.4);
      
      // Calculate new price based on previous price and variation
      const newPrice = asset.price * (1 + priceVariation);
      
      // Generate random volume change between -5% and +5%
      const volumeChange = (Math.random() * 10 - 5) / 100;
      const newVolume = asset.volume24h * (1 + volumeChange);
      
      return {
        id: asset.id,
        price: Number(newPrice.toFixed(2)),
        priceChange1h: Number(hourChange.toFixed(2)),
        priceChange24h: Number(dayChange.toFixed(2)),
        priceChange7d: Number(weekChange.toFixed(2)),
        volume24h: Math.floor(newVolume),
      };
    });
    
    // Only dispatch if there are updates to make
    if (updates.length > 0) {
      store.dispatch(updatePrices(updates));
    }
  }
  
  // Helper function to shuffle an array (Fisher-Yates algorithm)
  private shuffleArray(array: number[]): void {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
}

export default MockWebSocket;
