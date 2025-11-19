## Pull Request Title

BNB Price Tracker: Backend endpoint + Frontend Market Trends card

## Summary
- Adds `/api/bnb-price` endpoint with 6s cache and ±0–2% simulated drift from real BNB/USD
- Secures with CORS (restricted origin) and 10 req/min/IP rate limit
- Frontend card polling every 10s with dynamic background (green/red)

## Changes
- server/controllers/bnbPriceController.js (NEW)
- server/routes/bnbPriceRoute.js (NEW)
- server/app.js (wire route)
- server/index.js (bootstrap)
- src/components/MarketTrends/BNBPriceCard.js (NEW)
- src/components/MarketTrends/BNBPriceCard.css (NEW)
- src/pages/Homepage/Homepage.js (add card above metrics)
- package.json (add CRA dev proxy)
- docs/BNB_PRICE_TRACKER.md (feature docs)

## Screenshots
<!-- Attach before/after UI screenshots as needed -->

## Testing
- curl http://localhost:3099/api/bnb-price -> 200 JSON
- Hit >10 times/min -> 429
- Frontend: card updates every 10s, bg flips on price move

## Configuration
- Optional .env: FRONTEND_ORIGIN=http://localhost:3000

## Checklist
- [ ] Code builds locally (npm install && npm start)
- [ ] Lint/type checks pass (if applicable)
- [ ] Docs updated (docs/BNB_PRICE_TRACKER.md)
- [ ] No secrets committed
