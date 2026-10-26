import { useEffect, useState } from "react";
import { PAGES } from "../data/content.js";

const pad = (n) => String(n).padStart(2, "0");

// Time spent on the page, shown as a running counter.
function useSessionClock() {
  const [s, setS] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setS((v) => v + 1), 1000);
    return () => clearInterval(t);
  }, []);
  return `${pad(Math.floor(s / 3600))}:${pad(Math.floor(s / 60) % 60)}:${pad(s % 60)}`;
}

const Item = ({ p, page, onNavigate }) => (
  <button
    onClick={() => onNavigate(p.id)}
    className={`px transition-colors whitespace-nowrap ${
      page === p.id ? "text-on-surface" : "text-on-surface-variant hover:text-on-surface"
    }`}>
    {page === p.id && <span className="inline-block w-[0.55em] h-[0.55em] bg-primary-container mr-[0.45em] align-baseline" />}
    {p.label}
  </button>
);

export default function TopBar({ page, onNavigate }) {
  const clock = useSessionClock();
  const [home, ...rest] = PAGES;
  return (
    <header className="stage absolute top-0 inset-x-0 z-40 px-[6%] pt-[3.4%] pb-8 bg-gradient-to-b from-[#151515] via-[#151515]/90 to-transparent grid grid-cols-[1fr_auto_1fr] items-start gap-3">
      <div className="flex items-start gap-[8%] sm:gap-10">
        <Item p={home} page={page} onNavigate={onNavigate} />
        <span className="px text-ink-dim hidden sm:block">{clock}</span>
      </div>

      <button onClick={() => onNavigate("home")} className="flex flex-col items-center -mt-1" aria-label="Home">
        <span className="px !text-[1.9rem] sm:!text-[2.3rem] text-on-surface leading-none flex items-center border-b border-white/70 pb-1">
          KALITH
        </span>
        <span className="px !text-[0.8rem] text-ink-dim flex justify-between w-full mt-1">
          <span>Year</span>
          <span>{new Date().getFullYear()}</span>
        </span>
      </button>

      <nav className="flex justify-end gap-[5%] sm:gap-8 flex-wrap" aria-label="Pages">
        {rest.map((p) => (
          <Item key={p.id} p={p} page={page} onNavigate={onNavigate} />
        ))}
      </nav>
    </header>
  );
}
