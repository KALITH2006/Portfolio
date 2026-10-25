import { useEffect, useState } from "react";
import { PAGES } from "../data/content.js";

const pad = (n) => String(n).padStart(2, "0");

function useClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return now;
}

export default function TopBar({ page, onNavigate }) {
  const now = useClock();
  return (
    <header className="absolute top-0 inset-x-0 z-40 px-[3.2%] pt-[2.6%] pb-3 flex items-start justify-between gap-4 font-terminal-header text-[11px] sm:text-xs tracking-widest uppercase bg-gradient-to-b from-[#111] via-[#111]/90 to-transparent">
      <button onClick={() => onNavigate("home")} className="text-left hover:text-primary-container transition-colors">
        <span className="block text-on-surface">Mohamed Kalith ©&apos;26</span>
        <span className="block text-outline mt-1">
          Year <span className="text-on-surface">{now.getFullYear()}</span>
          <span className="hidden sm:inline">
            {" "}· {pad(now.getHours())}:{pad(now.getMinutes())}:{pad(now.getSeconds())}
          </span>
        </span>
      </button>

      <nav className="flex flex-col items-end gap-1" aria-label="Pages">
        {PAGES.map((p) => (
          <button
            key={p.id}
            onClick={() => onNavigate(p.id)}
            className={`nav-item transition-colors ${
              page === p.id ? "text-primary-container" : "text-on-surface-variant hover:text-on-surface"
            }`}>
            {page === p.id && <span aria-hidden="true">▸ </span>}
            {p.label}
          </button>
        ))}
      </nav>
    </header>
  );
}
