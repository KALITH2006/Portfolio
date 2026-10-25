import { TYPING_WORDS } from "../data/content.js";
import { goTo } from "../nav.js";
import { useWordRotator } from "../hooks.js";

const btnPrimary =
  "bg-primary-container text-[#0e131f] font-terminal-header text-sm px-8 py-3 rounded flex items-center gap-2 hover:shadow-[0_0_30px_rgba(0,245,255,0.5)] hover:scale-105 transition-all duration-300";
const btnGhost =
  "border border-outline text-secondary font-terminal-header text-sm px-8 py-3 rounded flex items-center gap-2 hover:border-primary-container hover:text-primary-container hover:bg-primary-container/5 hover:scale-105 transition-all duration-300";

function NeuralNet() {
  return (
    <svg
      className="w-full h-full opacity-60 mix-blend-screen group-hover:opacity-90 transition-opacity duration-700"
      viewBox="0 0 220 300"
      xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="holo" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#00f5ff" stopOpacity="0.8" />
          <stop offset="60%" stopColor="#7bd0ff" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
        </radialGradient>
        <filter id="glow-f">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g stroke="#00f5ff" strokeOpacity="0.2" strokeWidth="0.5">
        <line x1="110" y1="50" x2="60" y2="120" />
        <line x1="110" y1="50" x2="160" y2="120" />
        <line x1="60" y1="120" x2="40" y2="200" />
        <line x1="60" y1="120" x2="110" y2="200" />
        <line x1="160" y1="120" x2="110" y2="200" />
        <line x1="160" y1="120" x2="180" y2="200" />
        <line x1="40" y1="200" x2="110" y2="260" />
        <line x1="180" y1="200" x2="110" y2="260" />
        <line x1="110" y1="200" x2="110" y2="260" />
      </g>
      <g stroke="#00f5ff" strokeOpacity="0.5" strokeWidth="0.8" filter="url(#glow-f)">
        <line x1="110" y1="50" x2="110" y2="200" />
        <line x1="60" y1="120" x2="180" y2="200" />
      </g>
      <g filter="url(#glow-f)">
        <circle cx="110" cy="50" r="6" fill="#00f5ff" fillOpacity="0.9" />
        <circle cx="60" cy="120" r="5" fill="#00f5ff" fillOpacity="0.7" />
        <circle cx="160" cy="120" r="5" fill="#7bd0ff" fillOpacity="0.7" />
        <circle cx="40" cy="200" r="4" fill="#00f5ff" fillOpacity="0.6" />
        <circle cx="110" cy="200" r="6" fill="#00f5ff" fillOpacity="0.9" />
        <circle cx="180" cy="200" r="4" fill="#7bd0ff" fillOpacity="0.6" />
        <circle cx="110" cy="260" r="7" fill="#00f5ff" fillOpacity="1" />
      </g>
      <circle cx="110" cy="50" r="12" fill="none" stroke="#00f5ff" strokeOpacity="0.2" strokeWidth="1">
        <animate attributeName="r" values="8;20;8" dur="3s" repeatCount="indefinite" />
        <animate attributeName="stroke-opacity" values="0.4;0;0.4" dur="3s" repeatCount="indefinite" />
      </circle>
      <circle cx="110" cy="260" r="14" fill="none" stroke="#00f5ff" strokeOpacity="0.3" strokeWidth="1">
        <animate attributeName="r" values="10;24;10" dur="3s" begin="1.5s" repeatCount="indefinite" />
        <animate attributeName="stroke-opacity" values="0.5;0;0.5" dur="3s" begin="1.5s" repeatCount="indefinite" />
      </circle>
      <ellipse cx="110" cy="155" rx="80" ry="100" fill="url(#holo)" fillOpacity="0.15" />
    </svg>
  );
}

const LOG = [
  ["Neural Network", "ACTIVE"],
  ["Security", "ENABLED"],
  ["Modules", "ONLINE"],
];

export default function Hero() {
  const typed = useWordRotator(TYPING_WORDS);
  return (
    <section
      id="hero"
      className="max-w-[1440px] mx-auto px-8 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-69px)]">
      <div className="hero-in flex flex-col gap-6">
        <div className="inline-flex items-center gap-2 border border-primary-container/30 px-3 py-1 rounded bg-primary-container/10 w-fit animate-float">
          <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse" />
          <span className="font-label-caps text-label-caps text-primary-container tracking-widest">AI ENGINEER</span>
        </div>

        <h1 className="font-display-xl text-display-xl hero-name leading-tight">MOHAMED KALITH K</h1>

        <p className="font-headline-lg text-xl md:text-2xl text-on-surface-variant leading-snug">
          <span key={typed} className="typing-text word-swap inline-block">
            {typed}
          </span>
        </p>

        <p className="font-body-md text-on-surface-variant/80 text-sm leading-relaxed max-w-md">
          Building intelligent systems, secure platforms, and futuristic digital experiences through AI engineering and
          modern technologies.
        </p>

        <div className="flex flex-wrap gap-4 mt-2">
          <a href="/projects" onClick={(e) => goTo(e, "projects")} className={btnPrimary}>
            View Projects
            <span className="material-symbols-outlined text-base leading-none">arrow_forward</span>
          </a>
          <a href="/resume.pdf" download="resume.pdf" className={btnGhost}>
            Download Resume
            <span className="material-symbols-outlined text-base leading-none">download</span>
          </a>
        </div>

        <div className="flex gap-8 mt-6 pt-6 border-t border-white/10">
          {[
            ["SYSTEM_UPTIME", "99.9%"],
            ["AI_MOD_ACTIVE", "12"],
          ].map(([k, v]) => (
            <div key={k} className="flex flex-col gap-1">
              <span className="font-terminal-header text-xs text-outline tracking-widest">{k}</span>
              <span className="font-terminal-header text-sm text-primary-container">{v}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="hero-card-in">
      <div className="glass-panel rounded-lg p-6 flex flex-col gap-4 h-[500px] cyan-glow animate-float-delayed">
        <div className="flex justify-between items-center border-b border-white/10 pb-4 shrink-0">
          <div className="border-r-2 border-primary-container/70 pr-2">
            <span className="font-terminal-header text-sm text-on-surface tracking-widest">MOHAMED_KALITH_AI_SYSTEM</span>
          </div>
          <div className="flex gap-2">
            <span className="w-3 h-3 rounded-full bg-error-container cursor-pointer hover:shadow-[0_0_10px_#93000a] transition-shadow" />
            <span className="w-3 h-3 rounded-full bg-tertiary-container cursor-pointer hover:shadow-[0_0_10px_#ffdb3f] transition-shadow" />
            <span className="w-3 h-3 rounded-full bg-primary-container cursor-pointer hover:shadow-[0_0_10px_#00f5ff] transition-shadow" />
          </div>
        </div>

        <div className="flex-grow grid grid-cols-2 gap-4 min-h-0">
          <div className="bg-[#050816]/80 p-4 rounded border border-white/5 flex flex-col gap-2 overflow-hidden hover:bg-[#050816] transition-colors duration-300">
            <span className="font-terminal-header text-xs text-outline tracking-widest mb-1">STATUS.INIT</span>
            {LOG.map(([k, v]) => (
              <div key={k} className="term-line font-terminal-header text-xs text-secondary leading-5">
                &gt; {k}: <span className="text-primary-container">{v}</span>
              </div>
            ))}
            <div className="term-line font-terminal-header text-xs text-secondary leading-5">
              &gt; <span className="cursor">_</span>
            </div>
          </div>

          <div className="bg-[#050816]/80 rounded border border-white/5 relative overflow-hidden flex items-center justify-center group hover:bg-[#050816] transition-colors duration-300">
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-primary-container/5 z-10 pointer-events-none" />
            <NeuralNet />
          </div>
        </div>
      </div>
    </div>
    </section>
  );
}
