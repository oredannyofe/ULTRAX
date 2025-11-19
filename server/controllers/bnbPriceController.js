const axios = require("axios");

// --- Single-asset BNB price cache (legacy endpoint) ---
let cache = {
  price: null,
  lastUpdated: null,
  up: false,
  cacheUntil: 0,
};

// --- Multi-asset market trends cache ---
// Track a small basket of assets for the homepage "Market Trends" card.
// You can extend this list if you want more markets.
const MARKET_ASSETS = [
  { id: "bitcoin", symbol: "BTC", name: "Bitcoin" },
  { id: "ethereum", symbol: "ETH", name: "Ethereum" },
  { id: "binancecoin", symbol: "BNB", name: "BNB" },
];

let marketCache = {
  assets: null, // [{ id, symbol, name, price, up }]
  lastUpdated: null,
  cacheUntil: 0,
};

// Fetch current real prices (USD) for the basket from CoinGecko
async function fetchMarketPricesUSD() {
  const ids = MARKET_ASSETS.map((a) => a.id).join(",");
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`;
  const { data } = await axios.get(url, { timeout: 5000 });

  const nowIso = new Date().toISOString();

  const nextAssets = MARKET_ASSETS.map((asset) => {
    const price = data?.[asset.id]?.usd;
    if (typeof price !== "number") {
      throw new Error(`Invalid price for ${asset.id}`);
    }
    const prev = marketCache.assets?.find((a) => a.id === asset.id)?.price;
    const up = prev != null ? price >= prev : true;
    return {
      ...asset,
      price,
      up,
      lastUpdated: nowIso,
    };
  });

  marketCache = {
    assets: nextAssets,
    lastUpdated: nowIso,
    cacheUntil: Date.now() + 6000, // 6s cache window
  };

  return marketCache;
}

// Fetch current real BNB price (USD) from CoinGecko
async function fetchRealBnbPriceUSD() {
  const url = "https://api.coingecko.com/api/v3/simple/price?ids=binancecoin&vs_currencies=usd";
  const { data } = await axios.get(url, { timeout: 5000 });
  const price = data?.binancecoin?.usd;
  if (typeof price !== "number") throw new Error("Invalid price from provider");
  return price;
}

// Produce a simulated next price with ±0–2% change
function simulateNextPrice(prev) {
  // random between -0.02 and +0.02
  const delta = Math.random() * 0.04 - 0.02;
  const next = prev * (1 + delta);
  // Keep two decimal places typical for fiat display
  return Math.max(0.01, Math.round(next * 100) / 100);
}

// Legacy BNB-only endpoint kept for backward compatibility
exports.getBnbPrice = async function getBnbPrice(req, res) {
  const now = Date.now();

  // 6s cache to prevent abuse
  if (cache.price !== null && now < cache.cacheUntil) {
    return res.json({ price: cache.price, lastUpdated: cache.lastUpdated, up: cache.up });
  }

  try {
    let basePrice = cache.price;

    // Initialize from real price if we don't have a baseline yet or if the last update was long ago (e.g., > 10 minutes)
    const tooOld = cache.lastUpdated ? now - new Date(cache.lastUpdated).getTime() > 10 * 60 * 1000 : true;
    if (basePrice === null || tooOld) {
      basePrice = await fetchRealBnbPriceUSD();
    }

    const nextPrice = simulateNextPrice(basePrice);
    const up = cache.price !== null ? nextPrice > cache.price : true;

    cache = {
      price: nextPrice,
      up,
      lastUpdated: new Date().toISOString(),
      cacheUntil: now + 6000,
    };

    return res.json({ price: cache.price, lastUpdated: cache.lastUpdated, up: cache.up });
  } catch (e) {
    // On error, if we still have a cached value, return it; otherwise fail gracefully
    if (cache.price !== null) {
      return res.json({ price: cache.price, lastUpdated: cache.lastUpdated, up: cache.up });
    }
    return res.status(502).json({ error: "Failed to fetch BNB price" });
  }
};

// New multi-asset endpoint for homepage Market Trends
exports.getMarketTrends = async function getMarketTrends(req, res) {
  const now = Date.now();

  // Basic caching to avoid hammering CoinGecko.
  if (marketCache.assets && now < marketCache.cacheUntil) {
    return res.json({ assets: marketCache.assets, lastUpdated: marketCache.lastUpdated });
  }

  try {
    const fresh = await fetchMarketPricesUSD();
    return res.json({ assets: fresh.assets, lastUpdated: fresh.lastUpdated });
  } catch (e) {
    if (marketCache.assets) {
      // Serve stale data if we have it.
      return res.json({ assets: marketCache.assets, lastUpdated: marketCache.lastUpdated, stale: true });
    }
    return res.status(502).json({ error: "Failed to fetch market trends" });
  }
};
