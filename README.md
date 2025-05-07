
# CryptoTracker - Real-time Cryptocurrency Dashboard

A responsive cryptocurrency price tracker app built with React and Redux Toolkit.

![CryptoTracker App](./screenshot.png)

## Features

- Real-time cryptocurrency price updates (simulated using intervals)
- State management with Redux Toolkit
- Responsive design that works on all devices
- Sorting capabilities for all data columns
- Visual indicators for price changes
- Color-coded indicators for price movements

## Tech Stack

- React for the UI
- Redux Toolkit for state management
- Tailwind CSS for styling
- TypeScript for type checking

## How It Works

The application simulates real-time data updates by randomly adjusting cryptocurrency prices and metrics every 1-2 seconds. This is managed through a mock WebSocket service that dispatches updates to the Redux store.

### Key Components

- **CryptoTable**: Displays cryptocurrency data in a sortable, responsive table
- **SparklineChart**: Shows a simplified 7-day price trend chart
- **MockWebSocket**: Simulates real-time data updates
- **cryptoSlice**: Redux slice that manages the state of the cryptocurrency data

## Getting Started

1. Clone the repository
2. Install dependencies with `npm install`
3. Start the development server with `npm run dev`
4. Open your browser to the URL shown in the terminal

## Customization

You can modify the update frequency in the `MockWebSocket` class by changing the `updateFrequency` parameter when instantiating the class.

## License

MIT
