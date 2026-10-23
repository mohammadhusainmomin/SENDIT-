import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL
  ? `${process.env.REACT_APP_API_URL}/api`
  : "/api";

const api = axios.create({
  baseURL
});

// Cache token in memory for faster access
let cachedToken = localStorage.getItem("token");
let sessionExpiredNotified = false;

// Listen for storage changes (e.g., login/logout in other tabs)
window.addEventListener("storage", (e) => {
  if (e.key === "token") {
    cachedToken = e.newValue;
    if (cachedToken) sessionExpiredNotified = false;
  }
});

// Add token to all requests
api.interceptors.request.use(
  (config) => {
    if (cachedToken) {
      config.headers.Authorization = `Bearer ${cachedToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401 && cachedToken && !sessionExpiredNotified) {
      sessionExpiredNotified = true;
      cachedToken = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.dispatchEvent(new CustomEvent("sendit:session-expired"));
    }

    return Promise.reject(error);
  }
);

// Expose function to update cached token when it changes
export const updateCachedToken = (token) => {
  cachedToken = token;
  if (token) sessionExpiredNotified = false;
};

export default api;
