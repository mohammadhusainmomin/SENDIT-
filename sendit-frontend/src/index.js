import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './context/AuthContext';

const GA_ID = "G-98LH16YFVT";

const loadAnalytics = () => {
  if (window.__senditGaLoaded) return;
  window.__senditGaLoaded = true;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA_ID, { transport_type: "beacon" });
};

if (process.env.NODE_ENV === "production") {
  const scheduleAnalytics = () => {
    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(loadAnalytics, { timeout: 4000 });
    } else {
      setTimeout(loadAnalytics, 2500);
    }
  };

  if (document.readyState === "complete") {
    scheduleAnalytics();
  } else {
    window.addEventListener("load", scheduleAnalytics, { once: true });
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <App />
  </AuthProvider>

);

// Register service worker for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then(
      (registration) => {
        console.log('Service Worker registered:', registration);

        // Check for updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'activated') {
              // New service worker is active
              console.log('New Service Worker activated');
            }
          });
        });
      },
      (error) => {
        console.log('Service Worker registration failed:', error);
      }
    );
  });
}
