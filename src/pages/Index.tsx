
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import CryptoTable from '../components/CryptoTable';
import Header from '../components/Header';
import MockWebSocket from '../utils/mockWebSocket';

const Index = () => {
  useEffect(() => {
    // Start the mock WebSocket connection
    const mockSocket = new MockWebSocket(1500); // Update every 1.5 seconds
    mockSocket.connect();
    
    // Cleanup on component unmount
    return () => {
      mockSocket.disconnect();
    };
  }, []);

  return (
    <Provider store={store}>
      <div className="min-h-screen bg-crypto-black text-white">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">Today's Cryptocurrency Prices</h2>
            <p className="text-gray-400">
              The global crypto market cap is $2.43T. Get real-time updates on cryptocurrency prices.
            </p>
          </div>
          
          <div className="bg-crypto-darkgray/50 rounded-lg p-4 shadow-lg">
            <CryptoTable />
          </div>
        </main>
        
        <footer className="py-6 border-t border-crypto-darkgray">
          <div className="container mx-auto px-4 text-center text-gray-400">
            <p>© 2025 CryptoTracker. All prices update in real-time.</p>
          </div>
        </footer>
      </div>
    </Provider>
  );
};

export default Index;
