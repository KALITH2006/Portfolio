import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { restoreFavicon } from "../favicon.js";

// After the loader: "MOHAMED KALITH" appears, squeezes down to "MK", turns into the favicon badge,
// then flies up to where the browser-tab icon sits, and the real favicon takes over.
const TIMELINE = { collapse: 1150, badge: 1700, fly: 2150, done: 3150 };
const FLY_MS = 950;
const TAB_X = 30; // roughly where the tab icon is, from the left edge of the window
const TAB_Y = -14; // just above the page, i.e. inside the tab strip

export default function BrandReveal({ onReveal, onFinish }) {
  const [phase, setPhase] = useState("type"); // type | collapse | badge | fly
  const [veil, setVeil] = useState(true);
  const word = useRef(null);
  const finished = useRef(false);

  useEffect(() => {
    const el = word.current;
    const timers = [];
    const at = (ms, fn) => timers.push(setTimeout(fn, ms));

    const finish = () => {
      if (finished.current) return;
      finished.current = true;
      restoreFavicon();
      onFinish();
    };

    const fly = () => {
      setPhase("fly");
      setVeil(false);
      onReveal();
      if (!el) return finish();
      const r = el.getBoundingClientRect();
      const dx = TAB_X - (r.left + r.width / 2);
      const dy = TAB_Y - (r.top + r.height / 2);
      const s = 16 / r.width;
      const anim = el.animate(
        [
          { transform: "translate(0,0) scale(1)", opacity: 1 },
          { transform: `translate(${dx * 0.18}px, ${dy * 0.05 + 18}px) scale(0.92)`, opacity: 1, offset: 0.22 },
          { transform: `translate(${dx}px, ${dy}px) scale(${s})`, opacity: 1, offset: 0.92 },
          { transform: `translate(${dx}px, ${dy - 6}px) scale(${s})`, opacity: 0 },
        ],
        { duration: FLY_MS, easing: "cubic-bezier(0.55, 0, 0.25, 1)", fill: "forwards" }
      );
      anim.onfinish = finish;
    };

    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      onReveal();
      finish();
      return;
    }

    at(TIMELINE.collapse, () => setPhase("collapse"));
    at(TIMELINE.badge, () => {
      if (el) {
        // freeze the width so it can ease into a square
        el.style.width = `${el.offsetWidth}px`;
        void el.offsetWidth;
      }
      setPhase("badge");
    });
    at(TIMELINE.fly, fly);
    at(TIMELINE.done + 600, finish); // safety net

    const skip = () => {
      timers.forEach(clearTimeout);
      setVeil(false);
      onReveal();
      finish();
    };
    window.addEventListener("keydown", skip);
    window.addEventListener("pointerdown", skip);
    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className={`brand-veil absolute inset-0 z-[79] ${veil ? "" : "brand-veil-out"}`} aria-hidden="true" />
      {createPortal(
        <div className="brand-layer" aria-hidden="true">
          <div ref={word} className={`brand-word brand-${phase}`}>
            <span className="b-m">M</span>
            <span className="b-rest">OHAMED</span>
            <span className="b-sp">&nbsp;</span>
            <span className="b-k">K</span>
            <span className="b-rest">ALITH</span>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
