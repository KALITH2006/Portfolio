import { useCallback, useEffect, useState } from "react";
import { PROJECTS } from "../data/content.js";
import { Chip } from "./Section.jsx";
import { Visual } from "./Visual.jsx";

const linkBase =
  "flex-1 font-terminal-header text-xs py-3 rounded flex items-center justify-center gap-2 transition-all uppercase tracking-widest";

function Detail({ p, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="absolute inset-0 z-[70] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 channel-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={p.title}>
      <div
        className="glass-panel rounded-xl w-full max-w-3xl max-h-full overflow-y-auto no-scrollbar"
        onClick={(e) => e.stopPropagation()}>
        <div className="h-56 sm:h-72 bg-[#0a0a0a] relative overflow-hidden">
          <Visual type={p.visual} title={p.title} />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 px-3 py-1 bg-[#0a0a0a]/80 text-primary-container font-terminal-header text-[11px] rounded border border-primary-container/30 tracking-widest hover:bg-primary-container hover:text-[#111] transition-colors">
            ESC ✕
          </button>
        </div>
        <div className="p-6 sm:p-8">
          <span className="font-terminal-header text-[11px] text-primary-container tracking-widest">{p.badge}</span>
          <h3 className="font-headline-lg text-2xl sm:text-3xl text-on-surface mt-2 mb-3">{p.title}</h3>
          <p className="font-body-md text-on-surface-variant text-sm leading-relaxed mb-6">{p.description}</p>
          <div className="flex flex-wrap gap-2 mb-8">
            {p.tech.map((t) => (
              <Chip key={t} className="text-secondary">
                {t}
              </Chip>
            ))}
          </div>
          <div className="flex gap-3">
            <a
              href={p.github}
              target="_blank"
              rel="noreferrer"
              className={`${linkBase} border border-white/15 text-on-surface-variant hover:border-primary-container hover:text-primary-container`}>
              <span className="material-symbols-outlined text-base leading-none">code</span> GitHub
            </a>
            {p.demo ? (
              <a
                href={p.demo}
                target="_blank"
                rel="noreferrer"
                className={`${linkBase} border border-primary-container/40 text-primary-container hover:bg-primary-container/10`}>
                <span className="material-symbols-outlined text-base leading-none">open_in_new</span> Live Demo
              </a>
            ) : (
              <span className={`${linkBase} border border-white/10 text-outline cursor-not-allowed`}>
                <span className="material-symbols-outlined text-base leading-none">schedule</span> Coming Soon
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Projects as a row of "tapes": arrow keys move, Enter opens the centred one.
export default function Tapes({ active }) {
  const [i, setI] = useState(0);
  const [open, setOpen] = useState(false);
  const n = PROJECTS.length;
  const go = useCallback((d) => setI((v) => (v + d + n) % n), [n]);

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
    <section id="projects" className="max-w-[1440px] mx-auto px-8 py-16 border-t border-dashed border-white/10">
      <div className="flex items-center justify-between mb-8 font-terminal-header text-xs tracking-widest uppercase">
        <span className="text-on-surface">
          Projects <span className="text-outline">[{String(i + 1).padStart(2, "0")}/{String(n).padStart(2, "0")}]</span>
        </span>
        <span className="hidden sm:block text-outline">← → to browse · Enter to open</span>
      </div>

      <div className="relative h-[240px] sm:h-[300px] flex items-center justify-center overflow-hidden">
        {PROJECTS.map((proj, idx) => {
          let off = idx - i;
          if (off > n / 2) off -= n;
          if (off < -n / 2) off += n;
          const centre = off === 0;
          return (
            <button
              key={proj.title}
              onClick={() => (centre ? setOpen(true) : setI(idx))}
              aria-label={centre ? `Open ${proj.title}` : `Show ${proj.title}`}
              className="tape absolute w-[min(72vw,440px)] aspect-[2/1] rounded-lg overflow-hidden border border-white/15 bg-[#0a0a0a] text-left"
              style={{
                transform: `translateX(${off * 62}%) scale(${centre ? 1 : 0.72})`,
                opacity: Math.abs(off) > 1 ? 0 : centre ? 1 : 0.45,
                zIndex: centre ? 2 : 1,
                pointerEvents: Math.abs(off) > 1 ? "none" : "auto",
                boxShadow: centre ? "0 0 40px rgba(255,49,49,0.18)" : "none",
              }}>
              <Visual type={proj.visual} title={proj.title} />
              <span className="absolute bottom-0 inset-x-0 bg-[#111]/85 px-3 py-2 font-terminal-header text-[10px] tracking-widest uppercase text-on-surface-variant flex justify-between">
                <span>{proj.badge}</span>
                <span className="text-primary-container">▶ PLAY</span>
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-center gap-6 mt-8">
        <button onClick={() => go(-1)} className="font-terminal-header text-lg text-on-surface-variant hover:text-primary-container" aria-label="Previous project">
          ◀
        </button>
        <div className="text-center max-w-md" key={p.title}>
          <h3 className="font-headline-lg text-xl sm:text-2xl text-on-surface channel-in">{p.title}</h3>
          <p className="font-terminal-header text-[11px] text-outline tracking-widest uppercase mt-2 channel-in">
            {p.tech.slice(0, 4).join(" • ")}
          </p>
        </div>
        <button onClick={() => go(1)} className="font-terminal-header text-lg text-on-surface-variant hover:text-primary-container" aria-label="Next project">
          ▶
        </button>
      </div>

      {open && <Detail p={p} onClose={() => setOpen(false)} />}
    </section>
  );
}
