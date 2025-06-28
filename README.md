# BetMetric

**BetMetric** is a lightweight monorepo project focused on sports betting analysis, specifically **arbitrage** and **EV+ (expected value positive)** opportunities.

## 🧱 Project Structure

This is a monorepo with two main components:

- **Backend** (`/backend`):  
  A Node.js (Express) API that fetches real-time sports odds using [The Odds API](https://the-odds-api.com/). It analyzes the data to identify:
  - Arbitrage betting opportunities across sportsbooks
  - EV+ bets based on probability and odds comparisons

- **Frontend** (`/frontend`):  
  A Next.js app (in development) that will visualize arbitrage and EV+ bets in a trader-style dashboard. Built with:
  - React
  - Material UI
  - Tailwind CSS (planned)
  - WebSocket support (planned for live odds updates)

## 🧪 Status

- ✅ Backend API is functional and fetches + processes data
- 🚧 Frontend is under active development

## 📦 Tech Stack

- **Backend:** Node.js, Express, Axios  
- **Frontend:** Next.js (React), Material UI, Tailwind CSS (planned)  
- **Data Source:** The Odds API

## 📈 Features (Planned)

- EV betting analysis with bankroll scaling
- Arbitrage bet detection between top Canadian sportsbooks
- Live odds refresh using WebSockets
- Filtering by sport, market, and bookmaker


