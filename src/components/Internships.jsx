import { useCallback, useEffect, useRef, useState } from "react";
import { INTERNSHIPS } from "../data/content.js";
import Overlay, { A, LinkRow, Tag } from "./Overlay.jsx";

export function InternshipDetail({ it, onClose }) {
  return (
    <Overlay label={`${it.role}, ${it.org}`} onClose={onClose}>
      <span className="px text-primary-container">[{it.period}]</span>
      <h2 className="serif text-4xl sm:text-5xl text-on-surface mt-2 leading-[0.95]">{it.role}</h2>
      <p className="px text-on-surface-variant mt-1">{it.org}</p>
      <div className="mt-5 h-40 overflow-hidden border border-white/10 bg-white">
        <img src={it.image} alt={it.org} className="w-full h-full object-contain p-2" />
      </div>
      <p className="px !text-lg text-on-surface-variant mt-4 normal-case tracking-normal !leading-snug">{it.description}</p>
      <div className="flex flex-wrap gap-2 mt-5">
        {it.tech.map((t) => (
          <Tag key={t}>{t}</Tag>
        ))}
      </div>
      <LinkRow>
        <A href={it.certificate}>View certificate</A>
      </LinkRow>
    </Overlay>
  );
}

const TONES = ["#4a1d22", "#3d3a1a", "#1f2250", "#17383a"];

// Featured-work style: one big panel, scroll / swipe / arrows wipe to the next placement.
export default function Internships() {
  // /internships#<slug> opens on that placement (this is where the Profile links land)
  const [i, setI] = useState(() => {
    const at = INTERNSHIPS.findIndex((x) => x.slug === window.location.hash.slice(1));
    return at === -1 ? 0 : at;
  });
  const [open, setOpen] = useState(false);
  const lock = useRef(0);
  const touch = useRef(null);
  const n = INTERNSHIPS.length;

  const go = useCallback(
    (d) => {
      const now = Date.now();
      if (now - lock.current < 900) return;
      setI((v) => {
        const next = Math.min(n - 1, Math.max(0, v + d));
        if (next !== v) lock.current = now;
        return next;
      });
    },
    [n]
  );

  const jump = (idx) => {
    lock.current = Date.now();
    setI(idx);
  };

  useEffect(() => {
    if (open) return;
    const onWheel = (e) => Math.abs(e.deltaY) > 8 && go(e.deltaY > 0 ? 1 : -1);
    const onKey = (e) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowUp" || e.key === "ArrowLeft") go(-1);
      else if (e.key === "Enter") setOpen(true);
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
    };
  }, [go, open]);

  const it = INTERNSHIPS[i];

  useEffect(() => {
    window.history.replaceState(null, "", `/internships#${it.slug}`);
  }, [it.slug]);

  return (
    <div
      className="absolute inset-0"
      onTouchStart={(e) => (touch.current = e.touches[0].clientY)}
      onTouchEnd={(e) => {
        if (touch.current == null) return;
        const dy = touch.current - e.changedTouches[0].clientY;
        touch.current = null;
        if (Math.abs(dy) > 40) go(dy > 0 ? 1 : -1);
      }}>
      <p className="sr-only">Scroll, swipe or use the arrow keys to move between internships, and Enter to open details.</p>

      <div className="absolute left-[6%] right-[6%] sm:left-[12%] sm:right-[10%] top-[17%] bottom-[12%] rounded-[20px] overflow-hidden bg-[#0d0d0d]">
        {INTERNSHIPS.map((p, idx) => {
          const rel = idx - i;
          const style =
            rel === 0
              ? { clipPath: "inset(0% 0% 0% 0% round 20px)", transform: "none", opacity: 1, zIndex: 2 }
              : rel < 0
              ? { clipPath: "inset(0% 0% 0% 0% round 20px)", transform: "translateY(-6%) scale(0.94)", opacity: 0, zIndex: 1 }
              : { clipPath: "inset(100% 0% 0% 0% round 20px)", transform: "none", opacity: 1, zIndex: 3 };
          return (
            <div
              key={p.org}
              className="intern-slide absolute inset-0"
              style={{ ...style, background: `linear-gradient(135deg, ${TONES[idx % TONES.length]}, #111 85%)` }}>
              <span className="serif absolute right-[4%] bottom-[-6%] text-[clamp(8rem,26vw,22rem)] leading-none text-white/[0.06] select-none">
                {p.year}
              </span>
              <div
                className={`intern-img absolute right-[7%] top-1/2 -translate-y-1/2 w-[min(46%,380px)] aspect-[4/3] bg-white p-3 shadow-[0_30px_80px_rgba(0,0,0,0.6)] ${
                  rel === 0 ? "is-on" : ""
                }`}>
                <img src={p.image} alt={`${p.org}, ${p.role}`} className="w-full h-full object-contain" />
              </div>
            </div>
          );
        })}

        <div key={it.org} className="intern-copy absolute left-[5%] bottom-[10%] sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 max-w-[60%] sm:max-w-[42%] z-10">
          <p className="px text-white/80">
            Internship [{String(i + 1).padStart(2, "0")}/{String(n).padStart(2, "0")}]
          </p>
          <h2 className="font-sans font-semibold text-white text-[clamp(1.4rem,3.2vw,2.8rem)] leading-[0.98] uppercase mt-3 tracking-tight">
            {it.role}
          </h2>
          <p className="serif italic text-white/90 text-[clamp(1.1rem,2vw,1.7rem)] mt-1">{it.org}</p>
          <p className="px text-white/60 mt-3">{it.period}</p>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="px absolute right-[3%] bottom-[5%] z-10 rounded-full bg-[#f6d7bb] text-[#2d1d22] px-5 py-2.5 hover:bg-white transition-colors">
          Details ◉
        </button>
      </div>

      <div className="absolute right-[2.4%] sm:right-[3.2%] top-1/2 -translate-y-1/2 z-20 flex flex-col items-end gap-2.5">
        {INTERNSHIPS.map((p, idx) => (
          <button key={p.org} onClick={() => jump(idx)} aria-label={`Show ${p.org}`} className="py-1.5">
            <span
              className="block h-px bg-white transition-all duration-500"
              style={{ width: idx === i ? 30 : 16, opacity: idx === i ? 1 : 0.4 }}
            />
          </button>
        ))}
      </div>

      <p className="px absolute left-1/2 -translate-x-1/2 bottom-[8.2%] text-ink-dim hidden sm:block">
        {i < n - 1 ? "Scroll ↓" : "↑ Scroll back"}
      </p>

      {open && <InternshipDetail it={it} onClose={() => setOpen(false)} />}
    </div>
  );
}
