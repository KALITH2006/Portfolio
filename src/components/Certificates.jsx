import { useCallback, useEffect, useRef, useState } from "react";
import { CERTIFICATIONS } from "../data/content.js";

const PASTELS = ["#c9d3e2", "#bdb8ea", "#ece9e1", "#d9d2bd", "#c8dccf", "#e3c9c9"];

const LOGOS = [
  [/coursera/i, "coursera"],
  [/udemy/i, "udemy"],
  [/hackerrank/i, "hackerrank"],
  [/codechef/i, "codechef"],
  [/freecodecamp/i, "freecodecamp"],
  [/infosys/i, "infosys"],
];

const logoFor = (c) => {
  const hay = `${c.title} ${c.issuer} ${c.via ?? ""}`;
  return LOGOS.find(([re]) => re.test(hay))?.[1];
};

const fmt = (d) =>
  d ? new Date(`${d}-01T00:00:00`).toLocaleString("en-US", { month: "short", year: "numeric" }).toUpperCase() : "";

// public/certificates/previews/<file name>.jpg is rendered from the certificate itself.
const previewFor = (c) => (c.file ? `/certificates/previews/${c.file.replace(/\.[^.]+$/, "")}.jpg` : null);

function Card({ c, i }) {
  const src = previewFor(c);
  if (src) {
    return (
      <img
        src={src}
        alt={`${c.title} certificate, ${c.issuer}`}
        draggable={false}
        className="w-full h-full object-contain bg-[#ece9e1] shadow-[0_18px_50px_rgba(0,0,0,0.6)]"
      />
    );
  }
  // No file for this one: a plain text card.
  const logo = logoFor(c);
  return (
    <div
      className="w-full h-full p-4 flex flex-col justify-between text-[#111] shadow-[0_18px_50px_rgba(0,0,0,0.55)]"
      style={{ background: PASTELS[i % PASTELS.length] }}>
      <div className="flex items-center gap-1.5">
        {logo && <img src={`/logos/${logo}.svg`} alt="" className="ml-auto w-5 h-5 invert" />}
      </div>
      <div>
        <p className="serif text-[clamp(1.3rem,2.3vw,2.1rem)] leading-[0.95]">{c.title}</p>
        <p className="px !text-[0.8rem] mt-2 opacity-70 leading-none">{c.issuer}</p>
      </div>
    </div>
  );
}

const AUTO_MS = 3200;

// Carousel of the real certificates: auto-advances, pauses on hover/drag, swipe or arrow keys to move.
export default function Certificates() {
  const n = CERTIFICATIONS.length;
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const drag = useRef(null);
  const moved = useRef(false);

  const go = useCallback((d) => setI((v) => (v + d + n) % n), [n]);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => go(1), AUTO_MS);
    return () => clearInterval(t);
  }, [paused, go]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  const onDown = (e) => {
    drag.current = e.clientX;
    moved.current = false;
    setPaused(true);
  };
  const onUp = (e) => {
    if (drag.current == null) return;
    const dx = e.clientX - drag.current;
    drag.current = null;
    if (Math.abs(dx) > 40) {
      moved.current = true;
      go(dx < 0 ? 1 : -1);
    }
    setPaused(false);
  };

  const loop = [...CERTIFICATIONS, ...CERTIFICATIONS];
  const cur = CERTIFICATIONS[i];

  return (
    <div className="absolute inset-0">
      <p className="sr-only">Certificates slide automatically. Swipe, drag or use the left and right arrow keys to browse.</p>

      <div
        className="cert-stage absolute inset-x-0 top-[12%] bottom-[31%] touch-pan-y select-none"
        onPointerDown={onDown}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => {
          drag.current = null;
          setPaused(false);
        }}>
        {CERTIFICATIONS.map((c, idx) => {
          let off = idx - i;
          if (off > n / 2) off -= n;
          if (off < -n / 2) off += n;
          const a = Math.abs(off);
          const centre = off === 0;
          const face = <Card c={c} i={idx} />;
          return (
            <div
              key={c.title}
              className="cert-slide absolute top-1/2 left-1/2"
              style={{
                transform: `translate(-50%, -50%) translateX(calc(${off} * var(--cw) * 1.06)) scale(${1 - a * 0.14})`,
                opacity: a > 2 ? 0 : centre ? 1 : a === 1 ? 0.45 : 0.18,
                filter: centre ? "none" : "brightness(0.7)",
                zIndex: 10 - a,
                pointerEvents: a > 2 ? "none" : "auto",
              }}>
              {centre && c.file ? (
                <a
                  href={`/certificates/${c.file}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Open ${c.title}, ${c.issuer}`}
                  draggable={false}
                  onClick={(e) => moved.current && e.preventDefault()}
                  className="block w-full h-full">
                  {face}
                </a>
              ) : (
                <button
                  type="button"
                  aria-label={centre ? c.title : `Show ${c.title}`}
                  onClick={() => !moved.current && setI(idx)}
                  className="block w-full h-full text-left cursor-pointer">
                  {face}
                </button>
              )}
            </div>
          );
        })}
      </div>

      <div key={cur.title} className="absolute inset-x-0 bottom-[19%] px-[6%] text-center channel-in">
        <h2 className="serif text-[clamp(1.6rem,3.4vw,2.8rem)] leading-[0.95] text-on-surface">{cur.title}</h2>
        <p className="px text-on-surface-variant mt-2">
          {cur.issuer}
          {cur.via ? ` · via ${cur.via}` : ""}
          {cur.date ? ` · ${fmt(cur.date)}` : ""}
        </p>
        <div className="flex items-center justify-center gap-5 px mt-2">
          <button onClick={() => go(-1)} aria-label="Previous certificate" className="text-ink-dim hover:text-primary-container transition-colors">
            ◀
          </button>
          <span className="text-ink-dim">
            [{String(i + 1).padStart(2, "0")}/{String(n).padStart(2, "0")}]{cur.file ? " · click to open" : ""}
          </span>
          <button onClick={() => go(1)} aria-label="Next certificate" className="text-ink-dim hover:text-primary-container transition-colors">
            ▶
          </button>
        </div>
      </div>

      <div className="absolute inset-x-[2%] bottom-[11.5%] overflow-hidden border-y border-dashed border-white/20 py-1.5">
        <div className="ticker-track flex whitespace-nowrap px text-on-surface">
          {loop.map((c, k) => (
            <span key={k} className="mr-6">
              {c.title} — {c.issuer} •
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
