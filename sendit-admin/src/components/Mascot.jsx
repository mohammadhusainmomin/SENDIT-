import "./styles/Mascot.css";

function Mascot({ size = "medium", style = {} }) {
  return (
    <div className={`mascot-container mascot-${size}`} style={style}>
      <svg
        viewBox="0 0 200 240"
        className="mascot-svg"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Body */}
        <ellipse cx="100" cy="140" rx="55" ry="65" fill="#00d4ff" opacity="0.9" />

        {/* Body accent */}
        <path
          d="M 60 120 Q 100 100 140 120"
          stroke="#00bce6"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />

        {/* Left arm */}
        <g className="arm arm-left">
          <ellipse cx="45" cy="130" rx="18" ry="48" fill="#00d4ff" />
          <circle cx="40" cy="180" r="12" fill="#ffffff" />
        </g>

        {/* Right arm */}
        <g className="arm arm-right">
          <ellipse cx="155" cy="130" rx="18" ry="48" fill="#00d4ff" />
          <circle cx="160" cy="180" r="12" fill="#ffffff" />
        </g>

        {/* Left leg */}
        <g className="leg">
          <rect x="75" y="195" width="16" height="35" rx="8" fill="#00bce6" />
          <ellipse cx="83" cy="235" rx="14" ry="12" fill="#ffa502" />
        </g>

        {/* Right leg */}
        <g className="leg">
          <rect x="109" y="195" width="16" height="35" rx="8" fill="#00bce6" />
          <ellipse cx="117" cy="235" rx="14" ry="12" fill="#ffa502" />
        </g>

        {/* Head */}
        <circle cx="100" cy="70" r="50" fill="#00d4ff" />

        {/* Head shine */}
        <ellipse cx="80" cy="50" rx="15" ry="20" fill="#ffffff" opacity="0.3" />

        {/* Left eye */}
        <g className="eye eye-left">
          <circle cx="80" cy="65" r="12" fill="#ffffff" />
          <circle cx="80" cy="68" r="7" fill="#0f1419" />
          <circle cx="82" cy="66" r="3" fill="#00d4ff" className="pupil" />
        </g>

        {/* Right eye */}
        <g className="eye eye-right">
          <circle cx="120" cy="65" r="12" fill="#ffffff" />
          <circle cx="120" cy="68" r="7" fill="#0f1419" />
          <circle cx="122" cy="66" r="3" fill="#00d4ff" className="pupil" />
        </g>

        {/* Smile */}
        <path
          d="M 80 90 Q 100 105 120 90"
          stroke="#0f1419"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />

        {/* Rosy cheeks */}
        <circle cx="55" cy="75" r="10" fill="#ff69b4" opacity="0.4" />
        <circle cx="145" cy="75" r="10" fill="#ff69b4" opacity="0.4" />

        {/* File icons floating around */}
        <g className="floating-file file-1">
          <rect
            x="140"
            y="30"
            width="25"
            height="32"
            rx="2"
            fill="#00d4ff"
            opacity="0.8"
          />
          <line x1="145" y1="40" x2="160" y2="40" stroke="#0f1419" strokeWidth="1" />
          <line x1="145" y1="48" x2="160" y2="48" stroke="#0f1419" strokeWidth="1" />
        </g>

        <g className="floating-file file-2">
          <rect
            x="30"
            y="50"
            width="25"
            height="32"
            rx="2"
            fill="#ffa502"
            opacity="0.8"
          />
          <line x1="35" y1="60" x2="50" y2="60" stroke="#0f1419" strokeWidth="1" />
          <line x1="35" y1="68" x2="50" y2="68" stroke="#0f1419" strokeWidth="1" />
        </g>

        {/* Arrow accent */}
        <path
          d="M 100 20 L 110 35 L 105 35 L 105 45 L 95 45 L 95 35 L 90 35 Z"
          fill="#00d4ff"
          opacity="0.6"
          className="arrow-accent"
        />
      </svg>

      {/* Floating animation container */}
      <div className="mascot-aura"></div>
    </div>
  );
}

export default Mascot;
