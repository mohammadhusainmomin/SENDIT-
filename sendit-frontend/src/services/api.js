import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL
  ? `${process.env.REACT_APP_API_URL}/api`
  : "/api";

const api = axios.create({
  baseURL
});

// Cache token in memory for faster access
let cachedToken = localStorage.getItem("token");

// Listen for storage changes (e.g., login/logout in other tabs)
window.addEventListener("storage", (e) => {
  if (e.key === "token") {
    cachedToken = e.newValue;
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

// Expose function to update cached token when it changes
export const updateCachedToken = (token) => {
  cachedToken = token;
};

export default api;
