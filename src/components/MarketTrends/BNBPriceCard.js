import React, { useEffect, useRef, useState } from "react";
import "./BNBPriceCard.css";

// Fetch a small basket of market prices from the backend
const fetchMarketTrends = async (signal) => {
  const res = await fetch("/api/market-trends", { signal });
  if (!res.ok) throw new Error("Failed to fetch market trends");
  return res.json();
};

export default function BNBPriceCard() {
  const [assets, setAssets] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(null);
  const abortRef = useRef();

  const load = async () => {
    try {
      if (abortRef.current) abortRef.current.abort();
      const controller = new AbortController();
      abortRef.current = controller;
      const data = await fetchMarketTrends(controller.signal);
      setAssets(Array.isArray(data.assets) ? data.assets : []);
      setLastUpdated(data.lastUpdated || null);
    } catch (e) {
      // swallow errors for UI; could add a toast if desired
    }
  };

  useEffect(() => {
    // initial load
    load();
    // 10-second auto-refresh
    const id = setInterval(load, 10000);
    return () => {
      clearInterval(id);
      if (abortRef.current) abortRef.current.abort();
    };
  }, []);

  return (
    <div className="bnb-card">
      <div className="bnb-card__header">
        <span className="bnb-card__title">Market Trends</span>
        <span className="bnb-card__pair">Top markets / USD</span>
      </div>
      <div className="bnb-card__body bnb-card__body--list">
        {assets.length === 0 && <span className="bnb-card__price">--</span>}
        {assets.map((asset) => (
          <div key={asset.symbol} className="bnb-row">
            <div className="bnb-row__left">
              <span className="bnb-row__symbol">{asset.symbol}</span>
              <span className="bnb-row__name">{asset.name}</span>
            </div>
            <div className="bnb-row__right">
              <span className="bnb-row__price">
                {typeof asset.price === "number"
                  ? `$${asset.price.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}`
                  : "--"}
              </span>
              <span className={`bnb-card__delta ${asset.up ? "up" : "down"}`}>
                {asset.up ? "▲" : "▼"}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="bnb-card__footer">
        <span className="bnb-card__updated">
          {lastUpdated ? new Date(lastUpdated).toLocaleTimeString() : ""}
        </span>
      </div>
    </div>
  );
}
