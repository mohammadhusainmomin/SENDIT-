import { useEffect, useRef, useState } from "react";

function CountdownTimer({ expiresInMinutes, onExpire }) {
  const [timeLeft, setTimeLeft] = useState(expiresInMinutes * 60);
  const timerRef = useRef(null);
  const onExpireRef = useRef(onExpire);

  useEffect(() => {
    onExpireRef.current = onExpire;
  }, [onExpire]);

  useEffect(() => {
    if (timeLeft <= 0) {
      onExpireRef.current && onExpireRef.current();
      return undefined;
    }

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
