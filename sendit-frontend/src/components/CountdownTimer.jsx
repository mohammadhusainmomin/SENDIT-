import { useEffect, useRef, useState } from "react";

function CountdownTimer({ expiresInMinutes = 0, expiresAt, onExpire }) {
  const [timeLeft, setTimeLeft] = useState(0);
  const onExpireRef = useRef(onExpire);
  const hasExpiredRef = useRef(false);

  useEffect(() => {
    onExpireRef.current = onExpire;
  }, [onExpire]);

  useEffect(() => {
    hasExpiredRef.current = false;
    const serverDeadline = expiresAt ? new Date(expiresAt).getTime() : NaN;
    const deadline = Number.isFinite(serverDeadline)
      ? serverDeadline
      : Date.now() + Math.max(0, expiresInMinutes) * 60 * 1000;

    const updateRemainingTime = () => {
      const remainingSeconds = Math.max(
        0,
        Math.ceil((deadline - Date.now()) / 1000),
      );
      setTimeLeft(remainingSeconds);

      if (remainingSeconds === 0 && !hasExpiredRef.current) {
        hasExpiredRef.current = true;
        onExpireRef.current?.();
      }
    };

    updateRemainingTime();
    const timerId = window.setInterval(updateRemainingTime, 1000);
    return () => window.clearInterval(timerId);
  }, [expiresAt, expiresInMinutes]);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;
  const isLowTime = timeLeft < 300;

  return (
    <div className="countdown-redesign">
      <div className="si-meta-label">Expires In</div>
      <div style={{ marginTop: "0.35rem", fontSize: "1.3rem", fontWeight: 800, fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
        {hours > 0 ? `${String(hours).padStart(2, "0")}:` : ""}
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </div>
      {isLowTime ? <div className="si-footer-copy" style={{ marginTop: "0.35rem" }}>Code expiring soon</div> : null}
    </div>
  );
}

export default CountdownTimer;
