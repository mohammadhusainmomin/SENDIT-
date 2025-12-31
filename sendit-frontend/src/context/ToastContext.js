import { createContext, useContext, useState, useCallback } from "react";

export const ToastContext = createContext();

export function ToastProvider({ children }) {
  // eslint-disable-next-line no-unused-vars
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = "success", duration = 3000) => {
    const id = Date.now();
    const toast = { id, message, type, duration };

    setToasts((prev) => [...prev, toast]);

    if (duration > 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, duration);
    }

    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const success = useCallback(
    (message, duration) => showToast(message, "success", duration ?? 3000),
    [showToast]
  );

  const error = useCallback(
    (message, duration) => showToast(message, "error", duration ?? 4000),
    [showToast]
  );

  const info = useCallback(
    (message, duration) => showToast(message, "info", duration ?? 3000),
    [showToast]
  );

  return (
    <ToastContext.Provider value={{ toasts, showToast, removeToast, success, error, info }}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
}
