# BNB Price Tracker Integration

A production-ready addition that exposes a real-time BNB price endpoint and a landing-page “Market Trends” widget.

- Status: Implemented
- Owner: Core Web Team
- Created: 2025-11-12

## Table of Contents
- [Summary](#summary)
- [Architecture](#architecture)
- [API Contract](#api-contract)
- [Security](#security)
- [Configuration](#configuration)
- [Frontend Integration](#frontend-integration)
- [Run Locally](#run-locally)
- [Testing](#testing)
- [Performance & Scalability](#performance--scalability)
- [Operational Notes](#operational-notes)
- [Files Added / Changed](#files-added--changed)
- [Future Work](#future-work)

## Summary
Implements a simulated BNB/USD price feed that:
- Initializes from the current real price (CoinGecko) and then applies ±0–2% drift on each request
- Caches values for 6 seconds
- Rate limits requests to 10/min/IP and restricts CORS
- Surfaces on the homepage with a 10-second auto-refresh, showing a green/red background on up/down moves

## Architecture
- Controller: `server/controllers/bnbPriceController.js`
  - Fetches real BNB/USD (CoinGecko) on cold start or when baseline is stale (>10 min)
  - Applies drift and returns `{ price, lastUpdated, up }`
  - 6-second in-memory cache
- Route: `server/routes/bnbPriceRoute.js`
  - GET `/api/bnb-price`, CORS restriction, per-IP rate limiting (10/min)
- App wiring: `server/app.js`
  - `app.use('/api', bnbPriceRouter)`
- Frontend: `src/components/MarketTrends/BNBPriceCard.*` + `src/pages/Homepage/Homepage.js`
  - 10s polling, dynamic background based on movement

## API Contract
GET `/api/bnb-price`

Response 200:
```json
{
  "price": 969.12,
  "lastUpdated": "2025-11-12T00:01:23.456Z",
  "up": true
}
```

Errors:
- 429 Too many requests: exceeded 10/min/IP
- 502 Upstream failure when no baseline and no cache are available

## Security
- CORS: Allowed origin via `FRONTEND_ORIGIN` (defaults to `http://localhost:3000`)
- Rate limiting: In-route, per-IP 10/min
- Do not log secrets; upstream fetch has a timeout

## Configuration
- `FRONTEND_ORIGIN` (optional env): allowed origin
- CRA dev proxy added in `package.json`: `"proxy": "http://localhost:3099"`
- To tune:
  - Cache TTL: `cacheUntil: now + 6000` (controller)
  - Rate limit: `RATE_LIMIT`, `WINDOW_MS` (route)

## Frontend Integration
- Component: `src/components/MarketTrends/BNBPriceCard.js`
  - Fetches `/api/bnb-price` (proxied in dev) every 10s
  - Applies `bg-green-500/80` if price increased, else `bg-red-500/80`
- Placement: `src/pages/Homepage/Homepage.js` – directly above the metrics row

## Run Locally
```bash
npm install
npm start
```
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:3099`
- Proxy path (dev only): `http://localhost:3000/api/bnb-price`

## Testing
- Unit (controller):
  - Drift within ±2%
  - Cache returns same value within 6s
  - Baseline refresh after 10 minutes (can be time-mocked)
- Integration (route):
  - 200 JSON structure
  - 429 after 10 rapid requests
  - CORS header present for allowed origin
- UI:
  - Card renders; price updates every 10s; background flips appropriately

## Performance & Scalability
- Cache yields O(1) low-latency responses
- For horizontal scaling, externalize cache and rate limiting (e.g., Redis)
- Consider metrics endpoint for SLOs in production

## Operational Notes
- Behind a reverse proxy: set `app.set('trust proxy', true)` so `req.ip` is accurate
- Upstream failures: if baseline exists, serve cached value; otherwise return 502

## Files Added / Changed
- Added
  - `server/controllers/bnbPriceController.js`
  - `server/routes/bnbPriceRoute.js`
  - `server/index.js`
  - `src/components/MarketTrends/BNBPriceCard.js`
  - `src/components/MarketTrends/BNBPriceCard.css`
  - `scripts/print_to_pdf.ps1` (optional utility to export docs to PDF)
- Changed
  - `server/app.js` (wire route)
  - `src/pages/Homepage/Homepage.js` (place card)
  - `package.json` (CRA proxy)

## Future Work
- Replace in-memory cache/limiter with Redis and a robust limiter library
- Add metrics/health endpoints and dashboards
- Optional: swap simulation with a websocket live feed
