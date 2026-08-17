import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Disable browser's automatic scroll restoration
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // Wait until the new route has rendered
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "auto",
      });

      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    requestAnimationFrame(() => {
      requestAnimationFrame(scrollToTop);
    });

  }, [pathname]);

  return null;
}