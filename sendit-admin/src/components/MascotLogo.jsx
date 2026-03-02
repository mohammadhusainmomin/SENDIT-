/**
 * MascotLogo Component
 * Professional mascot logo component for SendIt
 * Can be used as favicon, header logo, or branded element
 */

function MascotLogo({ size = "medium", className = "" }) {
  const sizeMap = {
    small: 32,
    medium: 64,
    large: 128,
    xl: 200,
  };

  const dimension = sizeMap[size] || 64;

  return (
    <svg
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      className={`mascot-logo mascot-logo-${size} ${className}`}
      width={dimension}
      height={dimension}
      style={{ width: dimension, height: dimension }}
    >
      <defs>
        <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#00d4ff", stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: "#0099dd", stopOpacity: 1 }} />
        </linearGradient>
        <linearGradient id="headGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#00e5ff", stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: "#00a8e8", stopOpacity: 1 }} />
        </linearGradient>
        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow
            dx="0"
            dy="2"
            stdDeviation="3"
            floodOpacity="0.15"
            floodColor="#000000"
          />
        </filter>
      </defs>

      {/* Background circle */}
      <circle cx="100" cy="100" r="95" fill="#ffffff" filter="url(#shadow)" />

      {/* Body */}
      <ellipse cx="100" cy="130" rx="45" ry="55" fill="url(#bodyGrad)" />

      {/* Left arm */}
      <g>
        <ellipse cx="55" cy="120" rx="14" ry="38" fill="url(#bodyGrad)" />
        <circle
          cx="50"
          cy="165"
          r="10"
          fill="#ffffff"
          stroke="#00d4ff"
          strokeWidth="2"
        />
      </g>

      {/* Right arm */}
      <g>
        <ellipse cx="145" cy="120" rx="14" ry="38" fill="url(#bodyGrad)" />
        <circle
          cx="150"
          cy="165"
          r="10"
          fill="#ffffff"
          stroke="#00d4ff"
          strokeWidth="2"
        />
      </g>

      {/* Left leg */}
      <g>
        <rect x="80" y="180" width="12" height="28" rx="6" fill="#0099dd" />
        <ellipse cx="86" cy="213" rx="11" ry="9" fill="#ffa502" />
      </g>

      {/* Right leg */}
      <g>
        <rect x="108" y="180" width="12" height="28" rx="6" fill="#0099dd" />
        <ellipse cx="114" cy="213" rx="11" ry="9" fill="#ffa502" />
      </g>

      {/* Head */}
      <circle cx="100" cy="65" r="42" fill="url(#headGrad)" />

      {/* Head shine/highlight */}
      <ellipse cx="80" cy="45" rx="12" ry="16" fill="#ffffff" opacity="0.4" />

      {/* Left eye white */}
      <circle cx="82" cy="60" r="10" fill="#ffffff" />
      {/* Left eye pupil */}
      <circle cx="82" cy="63" r="6" fill="#0f1419" />
      {/* Left eye shine */}
      <circle cx="84" cy="61" r="2" fill="#ffffff" />

      {/* Right eye white */}
      <circle cx="118" cy="60" r="10" fill="#ffffff" />
      {/* Right eye pupil */}
      <circle cx="118" cy="63" r="6" fill="#0f1419" />
      {/* Right eye shine */}
      <circle cx="120" cy="61" r="2" fill="#ffffff" />

      {/* Smile */}
      <path
        d="M 85 80 Q 100 92 115 80"
        stroke="#0f1419"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />

      {/* Rosy cheeks */}
      <circle cx="65" cy="70" r="8" fill="#ff69b4" opacity="0.5" />
      <circle cx="135" cy="70" r="8" fill="#ff69b4" opacity="0.5" />

      {/* Upload arrow accent */}
      <g transform="translate(100, 25)">
        <path d="M 0 10 L 6 0 L -6 0 Z" fill="#0066cc" opacity="0.8" />
        <line
          x1="0"
          y1="0"
          x2="0"
          y2="8"
          stroke="#0066cc"
          strokeWidth="1.5"
          opacity="0.8"
        />
      </g>

      {/* Floating file icon 1 */}
      <g transform="translate(140, 45) scale(0.8)">
        <rect x="0" y="0" width="20" height="25" rx="2" fill="#00d4ff" opacity="0.7" />
        <line x1="3" y1="8" x2="17" y2="8" stroke="#0f1419" strokeWidth="1" opacity="0.6" />
        <line x1="3" y1="13" x2="17" y2="13" stroke="#0f1419" strokeWidth="1" opacity="0.6" />
      </g>

      {/* Floating file icon 2 */}
      <g transform="translate(35, 60) scale(0.8)">
        <rect x="0" y="0" width="20" height="25" rx="2" fill="#ffa502" opacity="0.7" />
        <line x1="3" y1="8" x2="17" y2="8" stroke="#0f1419" strokeWidth="1" opacity="0.6" />
        <line x1="3" y1="13" x2="17" y2="13" stroke="#0f1419" strokeWidth="1" opacity="0.6" />
      </g>
    </svg>
  );
}

export default MascotLogo;
