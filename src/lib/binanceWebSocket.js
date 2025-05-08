import { useEffect, useRef, useState } from 'react';

const BINANCE_WS_URL = 'wss://stream.binance.com:9443/ws';

export const useBinanceWebSocket = (symbols = ['btcusdt', 'ethusdt', 'bnbusdt']) => {
  const [prices, setPrices] = useState({});
  const [priceChanges, setPriceChanges] = useState({});
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState(null);
  const ws = useRef(null);
  const reconnectTimeout = useRef(null);

  const connect = () => {
    try {
      ws.current = new WebSocket(BINANCE_WS_URL);

      ws.current.onopen = () => {
        console.log('✅ Connected to Binance WebSocket');
        setIsConnected(true);
        setError(null);
        const subscribeMsg = {
          method: 'SUBSCRIBE',
          params: symbols.map(symbol => `${symbol}@ticker`),
          id: 1
        };
        ws.current.send(JSON.stringify(subscribeMsg));
      };

      ws.current.onmessage = (event) => {
        const data = JSON.parse(event.data);

        if (data.e === '24hrTicker') {
          const symbol = data.s.toLowerCase();
          const price = parseFloat(data.c);
          const priceChange = parseFloat(data.p);
          const priceChangePercent = parseFloat(data.P);
          const volume = parseFloat(data.v);

          setPrices(prev => ({
            ...prev,
            [symbol]: price
          }));

          setPriceChanges(prev => ({
            ...prev,
            [symbol]: {
              priceChange,
              priceChangePercent,
              volume
            }
          }));
        }
      };

      ws.current.onerror = (error) => {
        console.error('❌ WebSocket error:', error);
        setError('Connection error occurred');
        setIsConnected(false);
      };

      ws.current.onclose = () => {
        console.log('🔌 Disconnected from Binance WebSocket');
        setIsConnected(false);
        // Attempt to reconnect after 5 seconds
        reconnectTimeout.current = setTimeout(connect, 5000);
      };
    } catch (err) {
      console.error('Failed to create WebSocket:', err);
      setError('Failed to establish connection');
      setIsConnected(false);
    }
  };

  useEffect(() => {
    connect();

    return () => {
      if (reconnectTimeout.current) {
        clearTimeout(reconnectTimeout.current);
      }
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [symbols]);

  return { prices, priceChanges, isConnected, error };
};

// 📈 Sort by top gainers (desc)
export const sortByGainers = (prices, priceChanges) => {
  return Object.entries(priceChanges)
    .sort(([, a], [, b]) => b.priceChangePercent - a.priceChangePercent)
    .map(([symbol]) => ({
      symbol,
      price: prices[symbol],
      ...priceChanges[symbol]
    }));
};

// 📉 Sort by top losers (asc)
export const sortByLosers = (prices, priceChanges) => {
  return Object.entries(priceChanges)
    .sort(([, a], [, b]) => a.priceChangePercent - b.priceChangePercent)
    .map(([symbol]) => ({
      symbol,
      price: prices[symbol],
      ...priceChanges[symbol]
    }));
};

// 🔊 Sort by volume (desc)
export const sortByVolume = (prices, priceChanges) => {
  return Object.entries(priceChanges)
    .sort(([, a], [, b]) => b.volume - a.volume)
    .map(([symbol]) => ({
      symbol,
      price: prices[symbol],
      ...priceChanges[symbol]
    }));
};
