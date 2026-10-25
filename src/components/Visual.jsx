function RideVisual() {
  return (
    <svg className="w-full h-full opacity-60 mix-blend-screen" viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="rr" cx="30%" cy="60%" r="50%">
          <stop offset="0%" stopColor="#ff3131" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#0a0a0a" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="200" fill="#0a0a0a" />
      <rect width="400" height="200" fill="url(#rr)" />
      <rect x="0" y="140" width="400" height="20" fill="#111111" stroke="rgba(255,49,49,0.15)" strokeWidth="1" />
      <rect x="60" y="148" width="40" height="4" fill="rgba(236,233,225,0.4)" rx="2" />
      <rect x="160" y="148" width="40" height="4" fill="rgba(236,233,225,0.4)" rx="2" />
      <rect x="260" y="148" width="40" height="4" fill="rgba(236,233,225,0.4)" rx="2" />
      <rect x="150" y="110" width="100" height="30" fill="rgba(255,49,49,0.25)" rx="4" />
      <rect x="165" y="94" width="70" height="18" fill="rgba(255,49,49,0.35)" rx="3" />
      <circle cx="170" cy="142" r="10" fill="rgba(255,49,49,0.4)" />
      <circle cx="230" cy="142" r="10" fill="rgba(255,49,49,0.4)" />
      <circle cx="50" cy="100" r="3" fill="#ff3131" fillOpacity="0.8" />
      <circle cx="100" cy="80" r="3" fill="#ff3131" fillOpacity="0.6" />
      <circle cx="310" cy="90" r="3" fill="#ff3131" fillOpacity="0.7" />
      <circle cx="360" cy="70" r="3" fill="#b2aeab" fillOpacity="0.5" />
      <polyline
        points="50,100 100,80 200,80 310,90 360,70"
        fill="none"
        stroke="#ff3131"
        strokeOpacity="0.3"
        strokeWidth="1"
        strokeDasharray="4,4"
      />
    </svg>
  );
}

function NlpVisual() {
  const nodes = [
    [100, 80, 6, 0.8],
    [200, 50, 6, 0.7],
    [300, 90, 6, 0.8],
    [150, 150, 6, 0.6],
    [250, 160, 6, 0.7],
  ];
  return (
    <svg className="w-full h-full opacity-60 mix-blend-screen" viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="ai" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ff3131" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#0a0a0a" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="200" fill="#0a0a0a" />
      <rect width="400" height="200" fill="url(#ai)" />
      {nodes.map(([x, y, r, o]) => (
        <g key={`${x}-${y}`}>
          <line x1={x} y1={y} x2="200" y2="100" stroke="#ff3131" strokeOpacity={o - 0.4} strokeWidth="1.5" />
          <circle cx={x} cy={y} r={r} fill="#ff3131" fillOpacity={o} />
        </g>
      ))}
      <circle cx="200" cy="100" r="8" fill="#ff3131" fillOpacity="1" />
      <circle cx="200" cy="100" r="12" fill="none" stroke="#ff3131" strokeOpacity="0.3" strokeWidth="1" strokeDasharray="2,2" />
      <circle cx="200" cy="100" r="18" fill="none" stroke="#ff3131" strokeOpacity="0.15" strokeWidth="1" strokeDasharray="2,2" />
    </svg>
  );
}

function ManualVisual() {
  return (
    <svg className="w-full h-full opacity-70 mix-blend-screen" viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="mn" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#ff3131" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#0a0a0a" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="200" fill="#0a0a0a" />
      <rect width="400" height="200" fill="url(#mn)" />
      <rect x="70" y="35" width="110" height="140" rx="4" fill="rgba(255,49,49,0.08)" stroke="#ff3131" strokeOpacity="0.5" />
      {[55, 70, 85, 100, 115, 130].map((y) => (
        <line key={y} x1="85" y1={y} x2={y % 30 === 10 ? 150 : 165} y2={y} stroke="#ff3131" strokeOpacity="0.35" strokeWidth="2" />
      ))}
      <rect x="85" y="140" width="80" height="20" rx="2" fill="#ff3131" fillOpacity="0.25" />
      <path d="M180 105 C 215 105, 215 100, 245 100" fill="none" stroke="#ff3131" strokeOpacity="0.6" strokeDasharray="4,4" />
      <rect x="245" y="60" width="95" height="28" rx="14" fill="rgba(236,233,225,0.2)" stroke="#b2aeab" strokeOpacity="0.6" />
      <rect x="245" y="95" width="120" height="44" rx="10" fill="rgba(255,49,49,0.15)" stroke="#ff3131" strokeOpacity="0.6" />
      <line x1="257" y1="109" x2="350" y2="109" stroke="#ff3131" strokeOpacity="0.5" strokeWidth="2" />
      <line x1="257" y1="122" x2="320" y2="122" stroke="#ff3131" strokeOpacity="0.4" strokeWidth="2" />
      <text x="300" y="155" fill="#ff3131" fillOpacity="0.7" fontSize="10" fontFamily="monospace">p. 214</text>
    </svg>
  );
}

export function Visual({ type, title }) {
  if (type === "ride") return <RideVisual />;
  if (type === "nlp") return <NlpVisual />;
  if (type === "manual") return <ManualVisual />;
  return (
    <img
      src={type}
      alt={title}
      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
    />
  );
}
