import { useEffect, useState, useRef } from "react";
import "./styles/CountdownTimer.css";

function CountdownTimer({ expiresInMinutes, onExpire }) {
  const [timeLeft, setTimeLeft] = useState(expiresInMinutes * 60); // Convert to seconds
  const timerRef = useRef(null);
  const onExpireRef = useRef(onExpire);

  // Update ref when onExpire changes
  useEffect(() => {
    onExpireRef.current = onExpire;
  }, [onExpire]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    if (timeLeft <= 0) {
      onExpireRef.current && onExpireRef.current();
      return;
    }

    // Create timer only once and keep it running
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          onExpireRef.current && onExpireRef.current();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  const isLowTime = timeLeft < 300; // Less than 5 minutes

  return (
    <div className={`countdown-container ${isLowTime ? "low-time" : ""}`}>
      <div className="countdown-label">⏰ Expires in:</div>
      <div className="countdown-display">
        {hours > 0 && (
          <>
            <span className="time-unit">{String(hours).padStart(2, "0")}</span>
            <span className="time-separator">:</span>
          </>
        )}
        <span className="time-unit">{String(minutes).padStart(2, "0")}</span>
        <span className="time-separator">:</span>
        <span className="time-unit">{String(seconds).padStart(2, "0")}</span>
      </div>
      {isLowTime && (
        <p className="expire-warning">⚠️ Code expiring soon!</p>
      )}
    </div>
  );
}

export default CountdownTimer;
