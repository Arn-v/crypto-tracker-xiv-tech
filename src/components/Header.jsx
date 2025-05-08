import React from 'react';

const Header = () => {
  return (
    <header className="bg-crypto-black py-6 border-b border-crypto-darkgray">
      <div className="container  mx-auto px-4">
        <div className="flex items-center justify-between ">
          <div className="flex  space-x-2  ">
            <div className="h-8 w-8 bg-crypto-orange rounded-full"></div>
            <h1 className="text-3xl font-bold text-white">Crypto<span className="text-crypto-orange">Tracker</span></h1>
          </div>
          <div className="text-xs text-gray-300">
            Live Crypto Prices
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
