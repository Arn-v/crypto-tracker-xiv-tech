# Crypto Price Tracker

A real-time cryptocurrency price tracking dashboard built with React and Vite. Track prices, market caps, and price changes for various cryptocurrencies with live updates from Binance WebSocket API.

![Crypto Price Tracker Screenshot](public/favicon.jpg)

## Features

- 📊 Real-time price updates via Binance WebSocket
- 📈 Price change tracking (1h, 24h, 7d)
- 💰 Market cap and volume information
- 📱 Responsive design for all devices
- 🌓 Dark mode support
- 🔄 Live data updates
- 📉 Price change animations
- 🔍 Sortable columns
- 📊 Sparkline charts for 7-day trends

## Tech Stack

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **UI Components**: 
  - Radix UI (Accessible components)
  - Lucide Icons
  - Recharts (for sparklines)
- **Routing**: React Router v6
- **Data Fetching**: 
  - TanStack Query (React Query)
  - WebSocket for real-time data
- **Form Handling**: React Hook Form + Zod
- **Notifications**: Sonner

### Development Tools
- **Language**: JavaScript/JSX
- **Linting**: ESLint
- **Code Formatting**: Prettier
- **Package Manager**: npm

## 📹 Demo Video

Watch the demo here: [Click to watch the video](https://your-video-link.com)


## Architecture

```
src/
├── app/                 # Redux store configuration
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components
│   └── features/       # Feature-specific components
├── features/           # Feature modules
│   └── crypto/         # Crypto-related features
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and configurations
├── pages/              # Page components
└── utils/              # Helper functions
```

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm (v7 or higher)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd crypto-dash-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

### Environment Variables

Create a `.env` file in the root directory:
```env
VITE_API_URL=your_api_url_here
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run build:dev` - Build for development

### Code Structure

- **Components**: Reusable UI components in `src/components`
- **Features**: Feature-specific logic in `src/features`
- **Hooks**: Custom React hooks in `src/hooks`
- **Utils**: Helper functions in `src/utils`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Binance WebSocket API for real-time data
- Radix UI for accessible components
- Tailwind CSS for styling
- Vite for fast development experience
