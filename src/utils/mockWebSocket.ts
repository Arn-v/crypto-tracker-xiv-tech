
import { store } from '../app/store';
import { updatePrices } from '../features/crypto/cryptoSlice';

class MockWebSocket {
  private intervalId: number | null = null;
  private updateFrequency: number;

  constructor(updateFrequency: number = 1500) {
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
    
    const updates = assets.map((asset) => {
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
    
    store.dispatch(updatePrices(updates));
  }
}

export default MockWebSocket;
