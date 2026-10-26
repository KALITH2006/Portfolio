import { useCallback, useEffect, useRef, useState } from "react";
import { PROJECTS } from "../data/content.js";
import { Visual } from "./Visual.jsx";
import Overlay, { A, LinkRow, Tag } from "./Overlay.jsx";

function Tape({ p }) {
  return (
    <div className="tape-face" style={{ "--tone": p.tone }}>
      <div className="tape-label">Project Video</div>
      <div className="tape-frame">
        <Visual type={p.visual} title={p.title} />
      </div>
      <div className="tape-title">
        {p.short.map((w) => (
          <div key={w}>{w}</div>
        ))}
      </div>
      <div className="tape-foot">
        <span className="tape-badge">VHS</span>
        <span className="serif" style={{ fontSize: "8cqw" }}>
          {p.year}
        </span>
        <span className="logo-band" style={{ background: p.tone, height: "0.6em", width: "1.2em" }} />
      </div>
    </div>
  );
}

function Detail({ p, onClose }) {
  return (
    <Overlay label={p.title} onClose={onClose}>
      <span className="px text-primary-container">[{p.badge}]</span>
      <h2 className="serif text-4xl sm:text-5xl text-on-surface mt-2 leading-[0.95]">{p.title}</h2>
      <p className="px !text-lg text-on-surface-variant mt-4 normal-case tracking-normal !leading-snug">{p.description}</p>
      <div className="flex flex-wrap gap-2 mt-5">
        {p.tech.map((t) => (
          <Tag key={t}>{t}</Tag>
        ))}
      </div>
      <LinkRow>
        <A href={p.github}>GitHub</A>
        {p.demo ? <A href={p.demo}>Live demo</A> : <span className="text-ink-dim">Live demo — coming soon</span>}
      </LinkRow>
    </Overlay>
  );
}

const AUTO_MS = 3500;

// Projects as VHS tapes (they roll on by themselves; hover to hold): arrows move, Enter opens the centred one.
export default function Tapes({ active }) {
  const [i, setI] = useState(0);
  const [open, setOpen] = useState(false);
  const n = PROJECTS.length;
  const go = useCallback((d) => setI((v) => (v + d + n) % n), [n]);
  const [paused, setPaused] = useState(false);
  const drag = useRef(null);

  // Auto-advance to the next tape; any manual move (or hover) restarts / holds the timer.
  useEffect(() => {
    if (!active || open || paused) return;
    const t = setTimeout(() => go(1), AUTO_MS);
    return () => clearTimeout(t);
  }, [active, open, paused, i, go]);

  useEffect(() => {
    if (!active || open) return;
    const onKey = (e) => {
      if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "Enter") setOpen(true);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, open, go]);

  const p = PROJECTS[i];

  return (
    <div
      className="absolute inset-0"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => {
        drag.current = null;
        setPaused(false);
      }}
      onPointerDown={(e) => {
        drag.current = e.clientX;
        setPaused(true);
      }}
      onPointerUp={(e) => {
        if (drag.current == null) return;
        const dx = e.clientX - drag.current;
        drag.current = null;
        if (Math.abs(dx) > 60) go(dx < 0 ? 1 : -1);
        if (e.pointerType !== "mouse") setPaused(false);
      }}>
      <p className="sr-only">
        Use the left and right arrow keys to move between projects, and Enter to open the one in the centre.
      </p>

      <div className="absolute inset-x-0 top-[17%] bottom-[27%] flex items-center justify-center tape-stage">
        {PROJECTS.map((proj, idx) => {
          let off = idx - i;
          if (off > n / 2) off -= n;
          if (off < -n / 2) off += n;
          const a = Math.abs(off);
          const centre = off === 0;
          return (
            <button
              key={proj.title}
              onClick={() => (centre ? setOpen(true) : setI(idx))}
              aria-label={centre ? `Open ${proj.title}` : `Show ${proj.title}`}
              className="tape absolute"
              style={{
                transform: `translateX(calc(${off} * var(--w) * 1.35)) translateY(${a * 3.5}vh) rotate(${off * 13}deg) scale(${1 - a * 0.07})`,
                opacity: a > 2 ? 0 : centre ? 1 : a === 1 ? 0.5 : 0.22,
                filter: centre ? "none" : "brightness(0.7)",
                zIndex: 10 - a,
                pointerEvents: a > 2 ? "none" : "auto",
              }}>
              <Tape p={proj} />
            </button>
          );
        })}
      </div>

      <div key={p.title} className="absolute inset-x-0 bottom-[9.5%] px-[6%] text-center channel-in">
        <p className="px text-ink-dim">
          {p.title}, {String(i + 1).padStart(3, "0")}, {p.year}
        </p>
        <p className="px text-on-surface mt-1 max-w-[46ch] mx-auto !leading-tight line-clamp-2">{p.tagline}</p>
        <p className="cap-tech px text-ink-dim mt-1 truncate">{p.tech.slice(0, 3).join(" • ")}</p>
      </div>

      {open && <Detail p={p} onClose={() => setOpen(false)} />}
    </div>
  );
}
