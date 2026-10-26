import { useEffect, useRef, useState } from "react";
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
const RATE = 7; // critically damped spring, same feel as the reference site
const SETTLE = 4.2;
const FLING_MAX = 5200;
const WHEEL_IDLE_MS = 140;
const ENTER_SECONDS = 2.2;

const mod = (a, b) => ((a % b) + b) % b;
const clamp01 = (v) => Math.min(1, Math.max(0, v));
const easeOut = (v) => 1 - Math.pow(1 - v, 3);

function springTo(x, v, target, dt) {
  const d = x - target;
  const e = Math.exp(-RATE * dt);
  const k = v + RATE * d;
  return { x: target + (d + k * dt) * e, v: (v - k * RATE * dt) * e };
}
const releaseSpeed = (v, sinceMove) => Math.max(-FLING_MAX, Math.min(FLING_MAX, v * Math.exp(-Math.max(0, sinceMove - 40) / 45)));
function settleSlot(x, from, step) {
  const slot = Math.round(x / step) * step;
  const moved = x - from;
  return Math.abs(slot - from) < step / 2 && Math.abs(moved) > step * 0.12 ? from + Math.sign(moved) * step : slot;
}

// Projects as VHS tapes on a shallow arc. Spring-driven: drag and fling, scroll wheel, arrow keys, or let them roll.
export default function Tapes({ active }) {
  const n = PROJECTS.length;
  // repeat the list so the arc always has enough tapes to wrap around
  const slots = Array.from({ length: Math.ceil(Math.max(5, n) / n) * n }, (_, k) => k % n);
  const [open, setOpen] = useState(false);
  const [cur, setCur] = useState(0);
  const root = useRef(null);
  const stage = useRef(null);
  const els = useRef([]);
  const dims = useRef(null);
  const st = useRef({ offset: 0, target: 0, vel: 0, dragging: false, down: false, moved: 0, lastX: 0, lastT: 0, dragV: 0, from: 0, enter: 0, last: 0, raf: 0, active: 0, hold: false, paused: false });
  const flags = useRef({ active, open });
  const tick = useRef(() => {});
  flags.current = { active, open };

  useEffect(() => {
    const s = st.current;
    const measure = () => {
      const el = els.current[0];
      const box = stage.current;
      if (!el || !box) return;
      const w = el.offsetWidth;
      const spacing = (window.innerWidth < 700 ? 1.24 : 1.3) * w;
      const old = dims.current;
      dims.current = { w, spacing, R: 4 * spacing, total: slots.length * spacing, bh: box.clientHeight };
      if (old && old.spacing !== spacing) s.offset = s.target = Math.round(s.target / old.spacing) * spacing;
      tick.current();
    };
    const ro = new ResizeObserver(measure);
    ro.observe(stage.current);
    measure();

    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const snap = (x) => Math.round(x / dims.current.spacing) * dims.current.spacing;
    const rel = (i) => mod(i * dims.current.spacing - s.offset + dims.current.total / 2, dims.current.total) - dims.current.total / 2;

    const frame = (now) => {
      const D = dims.current;
      if (!D) {
        s.raf = 0;
        return;
      }
      const dt = s.last ? Math.min(0.1, (now - s.last) / 1000) : 1 / 60;
      s.last = now;
      if (!s.dragging) {
        if (reduce) {
          s.offset = s.target;
          s.vel = 0;
        } else {
          const r = springTo(s.offset, s.vel, s.target, dt);
          s.offset = r.x;
          s.vel = r.v;
          if (Math.abs(s.target - s.offset) < 0.5 && Math.abs(s.vel) < 5) {
            s.offset = s.target;
            s.vel = 0;
          }
        }
      }
      if (flags.current.active && s.enter < 1) s.enter = reduce ? 1 : Math.min(1, s.enter + dt / ENTER_SECONDS);

      slots.forEach((_, i) => {
        const el = els.current[i];
        if (!el) return;
        const o = rel(i);
        const ang = o / D.R;
        if (Math.abs(ang) > 1.3) {
          el.style.visibility = "hidden";
          return;
        }
        const k = Math.abs(Math.round(o / D.spacing));
        const u = easeOut(clamp01(1.7 * s.enter - 0.22 * k));
        const rise = (1 - u) * D.bh * 0.6;
        const x = D.R * Math.sin(ang);
        const drop = D.R * (1 - Math.cos(ang)) + rise;
        el.style.visibility = "visible";
        el.style.opacity = String(u);
        el.style.transform = `translate(${x.toFixed(1)}px, ${drop.toFixed(1)}px) rotate(${ang.toFixed(4)}rad)`;
        el.style.zIndex = String(10 - k);
        const dim = el.lastElementChild;
        if (dim) dim.style.opacity = ((1 - clamp01(1 - Math.abs(o) / D.spacing)) * 0.86).toFixed(3);
      });

      const a = mod(Math.round(s.offset / D.spacing), slots.length);
      if (a !== s.active) {
        s.active = a;
        setCur(slots[a]);
      }
      if (s.dragging || s.offset !== s.target || (flags.current.active && s.enter < 1)) s.raf = requestAnimationFrame(frame);
      else {
        s.raf = 0;
        s.last = 0;
      }
    };
    tick.current = () => {
      if (!s.raf) s.raf = requestAnimationFrame(frame);
    };
    tick.current();

    // pointer: drag + fling
    const down = (e) => {
      if (e.button > 0 || flags.current.open || !dims.current) return;
      s.down = true;
      s.moved = 0;
      s.lastX = e.clientX;
      s.lastT = performance.now();
      s.dragV = 0;
      s.from = snap(s.offset);
    };
    const move = (e) => {
      if (!s.down) return;
      const dx = e.clientX - s.lastX;
      const t = performance.now();
      s.moved += Math.abs(dx);
      if (s.moved > 4) s.dragging = true;
      if (s.dragging) {
        s.offset -= dx;
        s.target = s.offset;
        s.dragV = 0.6 * s.dragV + 0.4 * ((-dx / Math.max(8, t - s.lastT)) * 1000);
        tick.current();
      }
      s.lastX = e.clientX;
      s.lastT = t;
    };
    const up = () => {
      if (!s.down) return;
      s.down = false;
      if (!s.dragging) return;
      s.dragging = false;
      s.vel = releaseSpeed(s.dragV, performance.now() - s.lastT);
      s.target = settleSlot(s.offset + s.vel / SETTLE, s.from, dims.current.spacing);
      tick.current();
      s.hold = true; // swallow the click that follows a drag
      setTimeout(() => (s.hold = false), 0);
    };

    // wheel / trackpad
    let wheelTimer = 0;
    let wheeling = false;
    const wheel = (e) => {
      if (flags.current.open || !dims.current) return;
      e.preventDefault();
      if (!wheeling) {
        wheeling = true;
        s.from = snap(s.target);
      }
      const d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      s.target += (e.deltaMode === 1 ? 16 * d : d) * 1.2;
      clearTimeout(wheelTimer);
      wheelTimer = setTimeout(() => {
        wheeling = false;
        s.target = settleSlot(s.target, s.from, dims.current.spacing);
        tick.current();
      }, WHEEL_IDLE_MS);
      tick.current();
    };

    const key = (e) => {
      if (flags.current.open || !dims.current) return;
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        e.preventDefault();
        s.target = snap(s.target) + (e.key === "ArrowRight" ? 1 : -1) * dims.current.spacing;
        tick.current();
      } else if (e.key === "Enter") setOpen(true);
    };

    // auto-roll to the right; hovering or touching holds it
    const auto = setInterval(() => {
      if (!flags.current.active || flags.current.open || s.down || s.dragging || s.paused || !dims.current) return;
      s.target = snap(s.target) + dims.current.spacing;
      tick.current();
    }, AUTO_MS);

    const box = root.current;
    box.addEventListener("pointerdown", down);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
    box.addEventListener("wheel", wheel, { passive: false });
    window.addEventListener("keydown", key);
    return () => {
      cancelAnimationFrame(s.raf);
      s.raf = 0;
      clearInterval(auto);
      clearTimeout(wheelTimer);
      ro.disconnect();
      box.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
      box.removeEventListener("wheel", wheel);
      window.removeEventListener("keydown", key);
      tick.current = () => {};
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (active) tick.current(); // start the entrance
  }, [active]);

  const clickTape = (i) => {
    const s = st.current;
    const D = dims.current;
    if (s.hold || !D) return;
    const o = mod(i * D.spacing - s.offset + D.total / 2, D.total) - D.total / 2;
    if (Math.abs(o) < 0.25 * D.spacing) setOpen(true);
    else {
      s.target = Math.round((s.offset + o) / D.spacing) * D.spacing;
      tick.current();
    }
  };

  const p = PROJECTS[cur];

  return (
    <div
      ref={root}
      className="absolute inset-0 select-none"
      onMouseEnter={() => (st.current.paused = true)}
      onMouseLeave={() => (st.current.paused = false)}>
      <p className="sr-only">
        Use the left and right arrow keys to move between projects, and Enter to open the one in the centre.
      </p>

      <div ref={stage} className="absolute inset-x-0 top-[17%] bottom-[27%] flex items-center justify-center tape-stage">
        {slots.map((pi, i) => (
          <button
            key={i}
            ref={(el) => (els.current[i] = el)}
            onClick={() => clickTape(i)}
            aria-label={PROJECTS[pi].title}
            tabIndex={i < n ? 0 : -1}
            aria-hidden={i < n ? undefined : true}
            className="tape absolute"
            style={{ visibility: "hidden", opacity: 0 }}>
            <Tape p={PROJECTS[pi]} />
            <span className="tape-dim" />
          </button>
        ))}
      </div>

      <div key={p.title} className="absolute z-20 inset-x-0 bottom-[9.5%] px-[6%] text-center channel-in">
        <p className="px text-ink-dim">
          {p.title}, {String(cur + 1).padStart(3, "0")}, {p.year}
        </p>
        <p className="px text-on-surface mt-1 max-w-[46ch] mx-auto !leading-tight line-clamp-2">{p.tagline}</p>
        <p className="cap-tech px text-ink-dim mt-1 truncate">{p.tech.slice(0, 3).join(" • ")}</p>
      </div>

      {open && <Detail p={p} onClose={() => setOpen(false)} />}
    </div>
  );
}
