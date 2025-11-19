import React from "react";
import { useHistory } from "react-router-dom";
import { Trans } from "@lingui/macro";
import BNBPriceCard from "components/MarketTrends/BNBPriceCard";
import "./Homepage.css";

const Homepage = () => {
  const history = useHistory();

  const goToTrade = () => history.push("/trade");
  const goToBuy = () => history.push("/buy");

  return (
    <div className="container-fluid padding0 homepage-root">
      <main className="homepage-main">
        {/* HERO */}
        <section className="homepage-hero">
          {/* Web3 themed hero artwork */}
          <img className="light2" src="images/web3.jpg" alt="UTX web3 hero" />
          <div className="container homepage-hero-inner">
            <div className="row align-items-center">
              <div className="col-12 col-lg-7">
                <div className="homepage-hero-eyebrow">
                  <span className="homepage-hero-eyebrow-dot" />
                  <span>
                    <Trans>On-chain perpetual exchange on Arbitrum</Trans>
                  </span>
                </div>
                <h1 className="homepage-hero-title">
                  <Trans>
                    Trade perpetuals with deep liquidity
                    <span> & low fees.</span>
                  </Trans>
                </h1>
                <p className="homepage-hero-copy">
                  <Trans>
                    Access BTC, ETH and top altcoins with up to 100x leverage directly from your wallet. Non-custodial,
                    transparent and built for active traders.
                  </Trans>
                </p>
                <div className="homepage-hero-cta-group">
                  <button type="button" className="homepage-cta-primary" onClick={goToTrade}>
                    <Trans>Start trading</Trans>
                  </button>
                  <button type="button" className="homepage-cta-secondary" onClick={goToTrade}>
                    <Trans>View markets</Trans>
                  </button>
                </div>
                <div className="homepage-hero-meta">
                  <div className="homepage-hero-meta-item">
                    <strong>
                      <Trans>Non-custodial</Trans>
                    </strong>
                    <Trans>Connect your wallet. Your keys, your assets.</Trans>
                  </div>
                  <div className="homepage-hero-meta-item">
                    <strong>
                      <Trans>Ultra-low fees</Trans>
                    </strong>
                    <Trans>Efficient routing for spot and perpetual trading.</Trans>
                  </div>
                  <div className="homepage-hero-meta-item">
                    <strong>
                      <Trans>Built on Arbitrum</Trans>
                    </strong>
                    <Trans>Secure rollup scaling for Ethereum with low fees and fast finality.</Trans>
                  </div>
                </div>
              </div>

              <div className="col-12 col-lg-5">
                <div className="homepage-hero-right">
                  <div className="homepage-market-card">
                    <div className="homepage-market-header">
                      <span>
                        <Trans>Live market trends</Trans>
                      </span>
                      <span className="homepage-market-pill">
                        <Trans>Auto-refreshing</Trans>
                      </span>
                    </div>
                    <BNBPriceCard />
                    <p className="homepage-market-subcopy">
                      <Trans>
                        Stay on top of BTC, ETH, BNB and other key markets in real time. Additional markets can be
                        explored in the trading interface.
                      </Trans>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* METRICS */}
        <section className="homepage-metrics">
          <div className="container">
            <div className="homepage-section-header">
              <div className="homepage-section-eyebrow">
                <Trans>By the numbers</Trans>
              </div>
              <h2 className="homepage-section-title">
                <Trans>Protocol at a glance</Trans>
              </h2>
            </div>
            <div className="row">
              <div className="col-12 col-md-6 col-xl-3">
                <article className="homepage-metric-card">
                  <div className="homepage-metric-label">
                    <Trans>Total trading volume</Trans>
                  </div>
                  <div className="homepage-metric-value">$2,323,323,000</div>
                  <div className="homepage-metric-caption">
                    <Trans>Aggregated across perpetual and spot markets.</Trans>
                  </div>
                </article>
              </div>
              <div className="col-12 col-md-6 col-xl-3">
                <article className="homepage-metric-card">
                  <div className="homepage-metric-label">
                    <Trans>Total fees</Trans>
                  </div>
                  <div className="homepage-metric-value">$5,000,000</div>
                  <div className="homepage-metric-caption">
                    <Trans>Earned by liquidity providers and the protocol.</Trans>
                  </div>
                </article>
              </div>
              <div className="col-12 col-md-6 col-xl-3">
                <article className="homepage-metric-card">
                  <div className="homepage-metric-label">
                    <Trans>Open interest</Trans>
                  </div>
                  <div className="homepage-metric-value">$4,323,323,000</div>
                  <div className="homepage-metric-caption">
                    <Trans>Notional exposure across all perpetual markets.</Trans>
                  </div>
                </article>
              </div>
              <div className="col-12 col-md-6 col-xl-3">
                <article className="homepage-metric-card">
                  <div className="homepage-metric-label">
                    <Trans>Total traders</Trans>
                  </div>
                  <div className="homepage-metric-value">1,000,000</div>
                  <div className="homepage-metric-caption">
                    <Trans>Wallets that have interacted with the protocol.</Trans>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>

        {/* CORE FEATURES */}
        <section className="homepage-feature-section" id="features">
          <div className="container">
            <div className="homepage-section-header">
              <div className="homepage-section-eyebrow">
                <Trans>Why trade on UTX</Trans>
              </div>
              <h2 className="homepage-section-title">
                <Trans>Powerful infrastructure for sophisticated traders</Trans>
              </h2>
            </div>
            <div className="row">
              <div className="col-12 col-md-4 d-flex">
                <article className="homepage-feature-card">
                  <h5 className="homepage-feature-title">
                    <Trans>Efficient execution</Trans>
                  </h5>
                  <p className="homepage-feature-body">
                    <Trans>
                      Route orders through deep on-chain liquidity with minimal slippage and transparent execution, even
                      in volatile markets.
                    </Trans>
                  </p>
                </article>
              </div>
              <div className="col-12 col-md-4 d-flex">
                <article className="homepage-feature-card">
                  <h5 className="homepage-feature-title">
                    <Trans>Flexible collateral</Trans>
                  </h5>
                  <p className="homepage-feature-body">
                    <Trans>
                      Post margin in multiple assets so you can stay fully deployed while managing risk across your
                      portfolio.
                    </Trans>
                  </p>
                </article>
              </div>
              <div className="col-12 col-md-4 d-flex">
                <article className="homepage-feature-card">
                  <h5 className="homepage-feature-title">
                    <Trans>Transparent & open</Trans>
                  </h5>
                  <p className="homepage-feature-body">
                    <Trans>
                      All core contracts are open-source and auditable, giving you full visibility into how the
                      protocol behaves.
                    </Trans>
                  </p>
                </article>
              </div>
            </div>
          </div>
        </section>

        {/* NETWORK OVERVIEW */}
        <section id="network" className="space_section">
          <div className="container">
            <hgroup className="title-main">
              <h2>
                <Trans>Built on Arbitrum</Trans>
              </h2>
            </hgroup>
            <article>
              <div className="row">
                <div className="col-12 col-lg-7 order-a">
                  <h6>
                    <Trans>Arbitrum network metrics</Trans>
                  </h6>
                  <ul>
                    <li>
                      <span>
                        <Trans>Total volume</Trans>:
                      </span>{" "}
                      <strong>$1,413,184,702</strong>
                    </li>
                    <li>
                      <span>
                        <Trans>Total value locked</Trans>:
                      </span>{" "}
                      <strong>$5,711,914</strong>
                    </li>
                    <li>
                      <span>
                        <Trans>Total fees</Trans>:
                      </span>{" "}
                      <strong>$2,515,491</strong>
                    </li>
                  </ul>
                </div>
                <div className="col-12 col-lg-5 order-b">
                  <img src="images/logo-vertical.svg" alt="Unicorn Ultra logo" />
                  <div className="text-a">
                    <button
                      type="button"
                      className="btn-a btn-blue"
                      style={{ cursor: "pointer", userSelect: "none" }}
                      onClick={goToTrade}
                    >
                      <Trans>Start trading on Arbitrum</Trans>
                    </button>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* ECOSYSTEM TOKENS */}
        <section id="ecosystem" className="homepage-ecosystem-section">
          <div className="container">
            <div className="homepage-section-header">
              <div className="homepage-section-eyebrow">
                <Trans>Protocol tokens</Trans>
              </div>
              <h2 className="homepage-section-title">
                <Trans>Aligned incentives for traders and liquidity</Trans>
              </h2>
            </div>
            <div className="row">
              <div className="col-12 col-lg-4 d-flex">
                <article className="homepage-token-card">
                  <div className="homepage-token-header">
                    <img src="images/icon-uniultra.png?v=1.0.0" alt="ETH token" />
                    <h6>
                      <strong>ETH</strong>
                      <Trans>Native gas token</Trans>
                    </h6>
                  </div>
                  <div className="homepage-token-body">
                    <Trans>
                      ETH is the native gas token used to pay transaction fees on Arbitrum and the broader Ethereum
                      ecosystem. It powers every interaction on the network.
                    </Trans>
                  </div>
                  <div className="homepage-token-actions item-footer">
                    <button type="button" className="btn-a-link btn-blue" onClick={goToBuy}>
                      <Trans>Buy</Trans>
                    </button>
                    <a
                      className="btn-a-link btn-blue-border"
                      href="https://utxio.gitbook.io/utx/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Trans>Read docs</Trans>
                    </a>
                  </div>
                </article>
              </div>
              <div className="col-12 col-lg-4 d-flex">
                <article className="homepage-token-card">
                  <div className="homepage-token-header">
                    <img src="images/icon-uniultra.png?v=1.0.0" alt="UTX token" />
                    <h6>
                      <strong>UTX</strong>
                      <Trans>Utility & governance</Trans>
                    </h6>
                  </div>
                  <div className="homepage-token-body">
                    <Trans>
                      UTX is the core utility and governance token of the protocol. Holders can participate in
                      governance and capture value from protocol fees.
                    </Trans>
                  </div>
                  <div className="homepage-token-actions item-footer">
                    <button type="button" className="btn-a-link btn-blue" onClick={goToBuy}>
                      <Trans>Buy</Trans>
                    </button>
                    <a
                      className="btn-a-link btn-blue-border"
                      href="https://utxio.gitbook.io/utx/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Trans>Read docs</Trans>
                    </a>
                  </div>
                </article>
              </div>
              <div className="col-12 col-lg-4 d-flex">
                <article className="homepage-token-card">
                  <div className="homepage-token-header">
                    <img src="images/icon-uniultra.png?v=1.0.0" alt="ULP token" />
                    <h6>
                      <strong>ULP</strong>
                      <Trans>Liquidity index</Trans>
                    </h6>
                  </div>
                  <div className="homepage-token-body">
                    <Trans>
                      ULP is a basket of assets that backs swaps and leverage trading. LPs earn a share of fees while
                      providing deep, diversified liquidity to traders.
                    </Trans>
                  </div>
                  <div className="homepage-token-actions item-footer">
                    <button type="button" className="btn-a-link btn-blue" onClick={goToBuy}>
                      <Trans>Buy</Trans>
                    </button>
                    <a
                      className="btn-a-link btn-blue-border"
                      href="https://utxio.gitbook.io/utx/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Trans>Read docs</Trans>
                    </a>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="homepage-footer">
        <div className="content-footer">
          <a className="logo-footer" href="/">
            <img src="images/icon-logo.png" alt="UTX logo" />
          </a>
          <p>
            <Trans>Join our community</Trans>
          </p>
          <ul>
            <li>
              <a href="/" target="_blank" rel="noreferrer" aria-label="Discord">
                <img src="images/f-discord.png" alt="Discord" />
              </a>
            </li>
            <li>
              <a href="/" target="_blank" rel="noreferrer" aria-label="GitHub">
                <img src="images/f-github.png" alt="GitHub" />
              </a>
            </li>
            <li>
              <a href="/" target="_blank" rel="noreferrer" aria-label="Telegram">
                <img src="images/f-telegram.png" alt="Telegram" />
              </a>
            </li>
            <li>
              <a href="/" target="_blank" rel="noreferrer" aria-label="Twitter">
                <img src="images/f-twitter.png" alt="Twitter" />
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
