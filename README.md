# ULTRAX – Arbitrum‑First Perpetual DEX

ULTRAX is a GMX‑style perpetual DEX fork refocused on **Arbitrum**. It exposes a React + TypeScript trading interface backed by an Express server and ethers.js, enabling leveraged trading, liquidity provision, and staking for the UTX / ULP token system.

Production dApp: **`https://ultrax.onrender.com`**

---

## Features

- **Perpetual trading interface**
  - Leverage trading on major assets with on‑chain execution
  - Integrated TradingView‑style charting and order history
  - Wallet‑aware UI (balances, open positions, collateral, PnL)

- **Arbitrum‑focused deployment**
  - Default network and routing configured for Arbitrum
  - Arbitrum metrics highlighted on the homepage

- **Liquidity and staking**
  - UTX (utility / governance) and ULP (liquidity index) tokens
  - Staking flows, vesting, and fee revenue distribution

- **Unified dashboard**
  - 24h volume, open interest and pool metrics
  - Token and index composition views for UTX / ULP

- **Backend API layer**
  - Express server serving the compiled React app
  - REST helpers (e.g. BNB price tracker) and Web3 utilities

---

## Tech Stack

- **Frontend**: React 17, TypeScript, react‑router, react‑toastify
- **Styling**: CSS modules, custom design system, responsive layout
- **Web3**: ethers.js, web3‑react, WalletConnect, MetaMask / Coinbase Wallet support
- **Backend**: Node.js + Express, simple API + static asset serving
- **Build tooling**: Create React App + `react-app-rewired`, custom webpack override, Yarn scripts

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

Use Node **18.x** or **20.x** to avoid dependency issues.

### 2. Start the app (local development)

This runs the React dev server and the Express backend together.

```bash
npm start
```

- Frontend dev server: `http://localhost:3000`
- Backend (Express): serves API routes and the built bundle in production

### 3. Production build (Render / CI)

Render is configured as a **Web Service**, not a static site. A typical configuration is:

- **Build command** (Yarn):

```bash
yarn install --frozen-lockfile
yarn build-ci
```

- **Start command**:

```bash
node server/index.js
```

> `build-ci` is a lightweight wrapper around `react-app-rewired build` that skips tests and focuses on producing a production bundle suitable for the server to serve.

---

## BNB Price Tracker (API)

The project includes a small backend utility used on the homepage **“Live market trends”** card.

- Endpoint: `GET /api/bnb-price`
- Response shape: `{ price, lastUpdated, up }`
- Caching and limits:
  - 6s in‑memory cache
  - Simulated ±0–2% drift between refreshes
  - 10 requests / minute / IP
  - CORS restricted to the configured `FRONTEND_ORIGIN`
- Further details: `docs/BNB_PRICE_TRACKER.md`

---

## Application Modules

### Trade

The **Trade** page exposes the core perpetual trading interface:

- Real‑time price chart for the selected market
- Last 24h **high / low**, **volume**, and **open interest**
- Order ticket with collateral, leverage, long/short selection and validation
- Open positions, pending orders and recent trade history

### Dashboard

The **Dashboard** aggregates protocol‑level data:

- **24h volume** and **open interest** across markets
- Long vs short exposure
- Liquidity pool size and utilization
- Composition and stats for **UTX** and **ULP**

### Earn

The **Earn** section focuses on staking and rewards:

- Overview of the connected wallet (UTX, esUTX, ULP balances, claimable rewards)
- Stake / unstake flows for UTX and ULP
- Per‑pool stats: total staked, reward token price, APR, multipliers
- Vesting / vault views to convert rewards into UTX and manage vesting positions

### Buy

The **Buy** page simplifies acquiring protocol tokens:

- Guides to purchase **UTX** and **ULP** using supported on‑ramps / exchanges
- UTX captures **30%** of platform fees as the governance / utility token
- ULP captures **70%** of fees as the liquidity provider index token
- Ability to buy or sell ULP directly against supported assets (e.g. ETH, USDT, BTC, BNB)

---

## UI Screenshots

Screenshots are stored under `public/images` and rendered below for quick reference.

- **Homepage**

  ![ULTRAX Homepage](public/images/ultrax-home.png)

- **Trade**

  ![ULTRAX Trade](public/images/ultrax-trade.png)

- **Earn**

  ![ULTRAX Earn](public/images/ultrax-earn.png)

- **Buy**

  ![ULTRAX Buy](public/images/ultrax-buy.png)

- **Dashboard**

  ![ULTRAX Dashboard](public/images/ultrax-dashboard.png)

---

## Development Notes

- TypeScript is used across most of the codebase; a few legacy UI files are `// @ts-nocheck` to work around React 17 vs new `@types/react` mismatches.
- Custom webpack overrides (`config-overrides.js`) are used for:
  - Lingui `.po` loader (historical i18n support)
  - Polyfills for certain Node built‑ins in the browser
- The i18n layer has been simplified so that UI text renders in source English by default, avoiding hashed message IDs in production.

---

## License

This project is based on an open‑source perpetual DEX fork. Please review the upstream license and this repository’s license file (if present) before using ULTRAX in production or for commercial purposes.
