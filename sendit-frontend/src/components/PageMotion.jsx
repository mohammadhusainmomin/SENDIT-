import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const REVEAL_SELECTOR = [
  ".page-section > *",
  ".page-section > section",
  ".page-section > article",
  ".page-section > .si-card",
  ".page-section > .si-panel",
  ".hero-layout > *",
  ".content-section",
  ".feature-card",
  ".faq-item",
  ".blog-card",
  ".about-card",
  ".contact-card",
  ".about-copy-hero .about-copy-wrap > *",
  ".about-copy-mission .about-copy-wrap > *",
  ".about-copy-page > section:not(.about-copy-hero):not(.about-copy-mission) .about-copy-wrap > *",
  ".about-copy-value-card",
  ".about-copy-stats > *",
  ".about-copy-team-card",
].join(",");

export default function PageMotion() {
  const { pathname } = useLocation();

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const targets = Array.from(document.querySelectorAll(REVEAL_SELECTOR))
      .filter((element) => !element.closest("nav, footer, [role=dialog], .modal"));

    if (reducedMotion || !("IntersectionObserver" in window)) {
      targets.forEach((element) => element.classList.add("motion-visible"));
      return undefined;
    }

    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("motion-visible");
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -36px 0px" });

    targets.forEach((element, index) => {
      element.classList.add("motion-reveal");
      element.style.setProperty("--motion-delay", `${Math.min(index % 4, 3) * 75}ms`);
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
