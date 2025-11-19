const express = require("express");
const cors = require("cors");
const { getBnbPrice, getMarketTrends } = require("../controllers/bnbPriceController");

const router = express.Router();

// CORS restricted to frontend origin
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "http://localhost:3000";
const corsOptions = {
  origin: FRONTEND_ORIGIN,
};

// Simple in-memory rate limiter: 10 requests / minute per IP
const requestsByIp = new Map();
const RATE_LIMIT = 10; // requests
const WINDOW_MS = 60 * 1000; // 1 minute

function rateLimiter(req, res, next) {
  const ip = req.ip || req.headers["x-forwarded-for"] || req.connection?.remoteAddress || "unknown";
  const now = Date.now();
  let arr = requestsByIp.get(ip) || [];
  // prune
  arr = arr.filter((t) => now - t < WINDOW_MS);
  if (arr.length >= RATE_LIMIT) {
    return res.status(429).json({ error: "Too many requests. Please try again later." });
  }
  arr.push(now);
  requestsByIp.set(ip, arr);
  next();
}

router.options("/bnb-price", cors(corsOptions));
router.get("/bnb-price", cors(corsOptions), rateLimiter, getBnbPrice);

// New multi-asset market trends endpoint
router.options("/market-trends", cors(corsOptions));
router.get("/market-trends", cors(corsOptions), rateLimiter, getMarketTrends);

module.exports = router;
