import Footer from "components/Footer/Footer";
import "./BuyUTX.css";
import { Trans, t } from "@lingui/macro";
import Button from "components/Button/Button";
import { ARBITRUM, getChainName } from "config/chains";
import { useChainId } from "lib/chains";
import Card from "components/Common/Card";
import { getContract } from "config/contracts";
import uniswapArbitrumIcon from "img/ic_uni_arbitrum.svg";

export default function BuyUTX() {
  const { chainId } = useChainId();
  const isArbitrum = chainId === ARBITRUM;

  // UTX token address on Arbitrum (from contracts config)
  const utxAddress = getContract(ARBITRUM, "UTX");
  const uniswapUrl = `https://app.uniswap.org/explore/tokens/arbitrum/${utxAddress}`;

  if (!isArbitrum) {
    return (
      <div
        className="BuyUTXULP default-container page-layout"
        style={{ background: "var(--bg-black)" }}
      >
        <div className="BuyUTXULP-container">
          <div className="section-title-block">
            <div className="section-title-content">
              <div className="Page-title">
                <Trans>Switch network to Arbitrum</Trans>
              </div>
              <div className="Page-description fz-base fw-400 text-secondary">
                <Trans>
                  The current MVP is focused on Arbitrum. Please switch your wallet network to Arbitrum to see
                  buy options.
                </Trans>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div
      className="BuyUTXULP default-container page-layout"
      style={{ background: "var(--bg-black)" }}
    >
      <div className="BuyUTXULP-container">
        <div className="section-title-block">
          <div className="section-title-content">
            <div className="Page-title">
              <Trans>Fund your wallet &amp; buy UTX on {getChainName(chainId)}</Trans>
            </div>
            <div className="Page-description fz-base fw-400 text-secondary">
              <Trans>
                Bridge ETH to Arbitrum, then swap it for UTX using a decentralized exchange.
              </Trans>
            </div>
          </div>
        </div>
        <div className="cards-row">
          <BridgeToArbitrumCard />
          <SwapForUTXCard uniswapUrl={uniswapUrl} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

function BridgeToArbitrumCard() {
  return (
    <Card title={t`Step 1  Bridge ETH to Arbitrum`} className="style-card-buy-utx">
      <div className="App-card-content">
        <p className="BuyUTXULP-description fz-base fw-400 text-secondary">
          <Trans>
            Use a trusted bridge to move ETH from Ethereum or another network to Arbitrum. You&apos;ll use this ETH as
            gas and trading collateral.
          </Trans>
        </p>
        <div className="buttons-group col-2">
          <Button
            variant="secondary"
            to="https://bridge.arbitrum.io/"
            newTab
          >
            <Trans>Arbitrum Bridge</Trans>
          </Button>
          <Button
            variant="secondary"
            to="https://www.bungee.exchange/bridge"
            newTab
          >
            <Trans>Bungee</Trans>
          </Button>
          <Button
            variant="secondary"
            to="https://app.hop.exchange/"
            newTab
          >
            <Trans>Hop</Trans>
          </Button>
          <Button
            variant="secondary"
            to="https://www.orbiter.finance/"
            newTab
          >
            <Trans>Orbiter</Trans>
          </Button>
        </div>
      </div>
    </Card>
  );
}

function SwapForUTXCard({ uniswapUrl }: { uniswapUrl: string }) {
  return (
    <Card title={t`Step 2  Swap ETH for UTX`} className="style-card-buy-utx">
      <div className="App-card-content">
        <p className="BuyUTXULP-description fz-base fw-400 text-secondary">
          <Trans>
            Once your ETH is on Arbitrum, use a decentralized exchange like Uniswap to swap it for UTX. Always
            doublecheck the token address when you trade.
          </Trans>
        </p>
        <div className="buttons-group col-1">
          <Button
            variant="secondary"
            imgInfo={{ src: uniswapArbitrumIcon, alt: "Uniswap" }}
            to={uniswapUrl}
            newTab
          >
            <Trans>Open Uniswap (Arbitrum)</Trans>
          </Button>
        </div>
      </div>
    </Card>
  );
}
