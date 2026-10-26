import { useEffect, useRef, useState } from "react";

// Opening sequence: the TV powers on, loses its signal, glitches, crashes to a dot, then reboots into the loader.
const PHASES = [
  ["on", 0],
  ["static", 260],
  ["glitch", 1650],
  ["off", 2050],
];
const END = 2650;

const TEARS = [8, 22, 37, 51, 66, 80];

export default function TvCrash({ onDone }) {
  const canvas = useRef(null);
  const [phase, setPhase] = useState("on");

  useEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      onDone();
      return;
    }
    const timers = PHASES.slice(1).map(([name, at]) => setTimeout(() => setPhase(name), at));
    timers.push(setTimeout(onDone, END));
    const skip = () => onDone();
    window.addEventListener("keydown", skip);
    window.addEventListener("pointerdown", skip);
    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
    };
  }, [onDone]);

  // live static
  useEffect(() => {
    const c = canvas.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    c.width = 200;
    c.height = 120;
    const img = ctx.createImageData(c.width, c.height);
    let raf;
    const draw = () => {
      const d = img.data;
      for (let i = 0; i < d.length; i += 4) {
        const v = (Math.random() * 255) | 0;
        d[i] = d[i + 1] = d[i + 2] = v;
        d[i + 3] = 255;
      }
      ctx.putImageData(img, 0, 0);
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className={`tvc absolute inset-0 z-[85] bg-black overflow-hidden tvc-${phase}`} aria-hidden="true">
      <div className="tvc-screen absolute inset-0">
        <canvas ref={canvas} className="tvc-noise absolute inset-0 w-full h-full" />
        <div className="tvc-bars absolute inset-0" />
        <div className="tvc-roll absolute inset-x-0" />

        <p className="tvc-text absolute inset-0 flex flex-col items-center justify-center text-center px">
          <span className="tvc-title serif" data-text="NO SIGNAL">
            NO SIGNAL
          </span>
          <span className="tvc-sub">CH 03 · VHS</span>
        </p>

        {TEARS.map((top, i) => (
          <span
            key={top}
            className="tvc-tear absolute inset-x-0"
            style={{ top: `${top}%`, animationDelay: `${i * 37}ms` }}
          />
        ))}
      </div>
      <div className="tvc-flash absolute inset-0" />
    </div>
  );
}
