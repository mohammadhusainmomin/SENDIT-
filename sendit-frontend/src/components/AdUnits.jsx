import { useEffect, useRef, useState } from "react";

const ADS = {
  native: {
    containerId: "container-0b41739035a6c7b36e01ff801da99984",
    scriptSrc:
      "https://pl30781421.effectivecpmnetwork.com/0b41739035a6c7b36e01ff801da99984/invoke.js",
  },

  mobileBanner: {
    key: "ff73f18e3434e76b54cfbc80a68791b3",
    width: 320,
    height: 50,
  },

  leaderboard: {
    key: "53144edc15430bb0f84e156fcc60251e",
    width: 728,
    height: 90,
  },

  rectangle: {
    key: "d52c2ea76b12ce827ad56929ab9ed113",
    width: 300,
    height: 250,
  },


};

function BannerAd({ ad }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    container.innerHTML = "";

    const options = {
      key: ad.key,
      format: "iframe",
      height: ad.height,
      width: ad.width,
      params: {},
    };

    const optionsScript = document.createElement("script");

    optionsScript.type = "text/javascript";
    optionsScript.text = `
      window.atOptions = ${JSON.stringify(options)};
    `;

    const adScript = document.createElement("script");

    adScript.type = "text/javascript";
    adScript.async = true;
    adScript.src = `https://www.highperformanceformat.com/${ad.key}/invoke.js`;

    container.appendChild(optionsScript);
    container.appendChild(adScript);

    return () => {
      container.innerHTML = "";
    };
  }, [ad]);

  return (
    <div
      ref={containerRef}
      className="sendit-ad-banner"
      style={{
        width: ad.width,
        height: ad.height,
        maxWidth: "100%",
        overflow: "hidden",
        margin: "0 auto",
      }}
      aria-label={`Advertisement ${ad.width}x${ad.height}`}
    />
  );
}

function NativeBannerAd() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    container.innerHTML = "";

    const script = document.createElement("script");

    script.async = true;
    script.setAttribute("data-cfasync", "false");
    script.src = ADS.native.scriptSrc;

    container.appendChild(script);

    return () => {
      container.innerHTML = "";
    };
  }, []);

  return (
    <div
      className="sendit-ad-card sendit-ad-card--native"
      aria-label="Advertisement"
    >
      <div
        ref={containerRef}
        id={ADS.native.containerId}
        className="sendit-native-ad-container"
      />
    </div>
  );
}

export function MobileAdGate({
  open,
  onContinue,
  title = "Sponsored Message",
}) {
  const [secondsLeft, setSecondsLeft] = useState(5);
  const [adClickedOnce, setAdClickedOnce] = useState(false);

  useEffect(() => {
    if (!open) {
      setSecondsLeft(5);
      setAdClickedOnce(false);
      return undefined;
    }

    setSecondsLeft(5);
    setAdClickedOnce(false);

    const timer = window.setInterval(() => {
      setSecondsLeft((current) => Math.max(current - 1, 0));
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, [open]);

  if (!open) {
    return null;
  }

  const canClose = secondsLeft === 0;

  const handleButtonClick = () => {
    if (!canClose) {
      return;
    }

    if (!adClickedOnce) {
      window.open(
        "https://www.effectivecpmnetwork.com/n6nm1kfv6?key=1aeeef1ae3f8beb331ab2d03f8d60d26",
        "_blank",
        "noopener,noreferrer",
      );

      setAdClickedOnce(true);
      return;
    }

    onContinue();
  };

  return (
    <div
      className="mobile-ad-gate"
      role="dialog"
      aria-modal="true"
      aria-labelledby="mobile-ad-gate-title"
    >
      <div className="mobile-ad-gate__panel">
        <div className="mobile-ad-gate__header">
          <span className="si-chip">Ad</span>

          <strong id="mobile-ad-gate-title">
            {title}
          </strong>
        </div>

        <div className="mobile-ad-gate__slot">
          <BannerAd ad={ADS.rectangle} />
        </div>

        <div className="mobile-ad-gate__footer">
          <div className="mobile-ad-gate__countdown">
            {canClose
              ? adClickedOnce
                ? "Click again to continue"
                : "Click once to open ad"
              : `Wait ${secondsLeft}s`}
          </div>

          <button
            className="si-button mobile-ad-gate__button"
            onClick={handleButtonClick}
            type="button"
            disabled={!canClose}
          >
            {canClose
              ? adClickedOnce
                ? "Continue"
                : "Open Sponsored Ad"
              : `Wait ${secondsLeft}s`}
          </button>
        </div>
      </div>
    </div>
  );
}



function SmartlinkAd() {
  return (
    <div
      className="sendit-smartlink"
      style={{
        margin: "16px auto",
        textAlign: "center",
      }}
    >
      <a
        href="https://www.effectivecpmnetwork.com/n6nm1kfv6?key=1aeeef1ae3f8beb331ab2d03f8d60d26"
        target="_blank"
        rel="noopener noreferrer sponsored"
        aria-label="Sponsored link"
      >
        Sponsored
      </a>
    </div>
  );
}

export default function AdUnits() {
return (
  <aside
    className="sendit-ad-section"
    aria-label="Advertisement"
  >
    <div className="sendit-ad-section-inner">

      <div className="sendit-ad-card sendit-ad-card--mobile">
        <BannerAd ad={ADS.mobileBanner} />
      </div>

      <div className="sendit-ad-card sendit-ad-card--desktop">
        <BannerAd ad={ADS.leaderboard} />
      </div>

      <div className="sendit-ad-grid">
        <NativeBannerAd />

        <div className="sendit-ad-card sendit-ad-card--rectangle">
          <BannerAd ad={ADS.rectangle} />
        </div>
      </div>

      <SmartlinkAd />

    </div>
  </aside>
);
}