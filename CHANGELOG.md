# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]
### Added
- BNB Price Tracker feature:
  - Backend endpoint `GET /api/bnb-price` with 6s cache, ±0–2% drift, and `{ price, lastUpdated, up }` response
  - Per-IP rate limiting (10 requests/min) and CORS restriction to `FRONTEND_ORIGIN`
  - Frontend “Market Trends” card with 10s polling and dynamic background (green on increase, red on decrease)
- CRA dev proxy in `package.json` for `/api` during development
- Documentation: `docs/BNB_PRICE_TRACKER.md`, deep-dive HTML(s) in project root

### Changed
- `server/app.js` to mount the new router under `/api`
- `src/pages/Homepage/Homepage.js` to include the BNB card above the metrics row

### Notes
- To run locally: `npm install && npm start`
- Optional: set `FRONTEND_ORIGIN` in `.env` to adjust allowed CORS origin
