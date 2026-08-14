import { useEffect, useMemo, useState } from "react";

const NATIVE_AD = {
  containerId: "container-0b41739035a6c7b36e01ff801da99984",
  scriptSrc:
    "https://pl30781421.effectivecpmnetwork.com/0b41739035a6c7b36e01ff801da99984/invoke.js",
};

const DISPLAY_ADS = {
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

const SMARTLINK_URL =
  "https://www.effectivecpmnetwork.com/n6nm1kfv6?key=1aeeef1ae3f8beb331ab2d03f8d60d26";

export function useMediaQuery(query, fallback = false) {
  const [matches, setMatches] = useState(() => {
    if (typeof window === "undefined" || !window.matchMedia) {
      return fallback;
    }

    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (!window.matchMedia) {
      return undefined;
    }

    const mediaQuery = window.matchMedia(query);
    const handleChange = () => setMatches(mediaQuery.matches);

    handleChange();

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }

    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, [query]);

  return matches;
}

function buildDisplayAdSrcDoc({ key, width, height }) {
  const atOptions = JSON.stringify({
    key,
    format: "iframe",
    height,
    width,
    params: {},
  });

  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
      html,
      body {
        width: 100%;
        height: 100%;
        margin: 0;
        overflow: hidden;
        background: transparent;
      }

      body {
        display: grid;
        place-items: center;
      }
    </style>
  </head>
  <body>
    <script type="text/javascript">
      window.atOptions = ${atOptions};
    </script>
    <script type="text/javascript" src="https://www.highperformanceformat.com/${key}/invoke.js"></script>
  </body>
</html>`;
}

export function DisplayAdFrame({ ad }) {
  const srcDoc = useMemo(() => buildDisplayAdSrcDoc(ad), [ad]);

  return (
    <iframe
      className="sendit-ad-frame"
      title={`Advertisement ${ad.width}x${ad.height}`}
      srcDoc={srcDoc}
      width={ad.width}
      height={ad.height}
      loading="lazy"
      scrolling="no"
      sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-forms allow-top-navigation-by-user-activation"
      style={{
        "--sendit-ad-width": `${ad.width}px`,
        "--sendit-ad-height": `${ad.height}px`,
      }}
    />
  );
}

export function MobileAdGate({ open, onContinue, title = "Sponsored Message" }) {
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

    return () => window.clearInterval(timer);
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
      window.open(SMARTLINK_URL, "_blank", "noopener,noreferrer");
      setAdClickedOnce(true);
      return;
    }

    onContinue();
  };

  return (
    <div className="mobile-ad-gate" role="dialog" aria-modal="true" aria-labelledby="mobile-ad-gate-title">
      <div className="mobile-ad-gate__panel">
        <div className="mobile-ad-gate__header">
          <span className="si-chip">Ad</span>
          <strong id="mobile-ad-gate-title">{title}</strong>
        </div>

        <div className="mobile-ad-gate__slot">
          <DisplayAdFrame key={open ? "mobile-ad-gate-open" : "mobile-ad-gate-closed"} ad={DISPLAY_ADS.rectangle} />
        </div>

        <div className="mobile-ad-gate__footer">
          <div className="mobile-ad-gate__countdown">
            {canClose
              ? adClickedOnce
                ? "Click again to close"
                : "Click once to open ad"
              : `Wait ${secondsLeft}s`}
          </div>
          <button
            className="si-button mobile-ad-gate__button"
            onClick={handleButtonClick}
            type="button"
            disabled={!canClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function NativeBannerAd() {
  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const existingScript = document.querySelector(
      `script[data-sendit-native-ad="${NATIVE_AD.containerId}"]`
    );

    if (existingScript) {
      return undefined;
    }

    const load = () => {
      try {
        if (document.querySelector(`script[data-sendit-native-ad="${NATIVE_AD.containerId}"]`)) return;

        const script = document.createElement("script");
        script.async = true;
        script.src = NATIVE_AD.scriptSrc;
        script.setAttribute("data-cfasync", "false");
        script.setAttribute("data-sendit-native-ad", NATIVE_AD.containerId);

        script.onerror = () => {
          // remove faulty script to avoid repeated failures
          if (script.parentNode) script.parentNode.removeChild(script);
        };

        const container = document.getElementById(NATIVE_AD.containerId);
        const parent = container?.parentNode || document.body;
        parent.insertBefore(script, container || null);
      } catch (err) {
        // swallow — ad loading must not break app
      }
    };

    if (process.env.NODE_ENV === "production") {
      if ("requestIdleCallback" in window) {
        window.requestIdleCallback(load, { timeout: 3000 });
      } else {
        setTimeout(load, 2500);
      }
    } else {
      // in development load quickly for easier testing
      setTimeout(load, 500);
    }

    return undefined;
  }, []);

  return (
    <div className="sendit-ad-card sendit-ad-card--native">
      <div id={NATIVE_AD.containerId} className="sendit-native-ad-container" />
    </div>
  );
}

export default function AdUnits() {
  const isMobile = useMediaQuery("(max-width: 780px)");
  const isCompact = useMediaQuery("(max-width: 860px)");
  const topAd = isMobile ? DISPLAY_ADS.mobileBanner : DISPLAY_ADS.leaderboard;

  return (
    <aside className="sendit-ad-section" aria-label="Advertisement">
      <div className="sendit-ad-section-inner">
        <div className="sendit-ad-card sendit-ad-card--top">
          <DisplayAdFrame key={topAd.key} ad={topAd} />
        </div>

        <div className="sendit-ad-grid">
          <NativeBannerAd />
          {!isCompact && (
            <div className="sendit-ad-card sendit-ad-card--rectangle">
              <DisplayAdFrame ad={DISPLAY_ADS.rectangle} />
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
