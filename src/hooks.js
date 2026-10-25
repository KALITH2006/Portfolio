import { useEffect, useState } from "react";

// Cycles through words on a timer; pair with a keyed element for a CSS transition.
export function useWordRotator(words, interval = 2800) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % words.length), interval);
    return () => clearInterval(t);
  }, [words, interval]);
  return words[i];
}

// Feeds the cursor position to any .glass-panel for its hover glow.
export function useGlassGlow() {
  useEffect(() => {
    const onMove = (e) => {
      const p = e.target.closest?.(".glass-panel");
      if (!p) return;
      const r = p.getBoundingClientRect();
      p.style.setProperty("--mx", `${e.clientX - r.left}px`);
      p.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    document.addEventListener("mousemove", onMove);
    return () => document.removeEventListener("mousemove", onMove);
  }, []);
}
