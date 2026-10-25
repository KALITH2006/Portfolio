import { useEffect, useRef, useState } from "react";

// Adds the "visible" class the first time the element scrolls into view.
export function useReveal(threshold = 0.08) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

// Returns the id of the section currently crossing the middle of the viewport.
export function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [ids]);
  return active;
}

export function useTypewriter(words) {
  const [text, setText] = useState("");
  useEffect(() => {
    let w = 0, c = 0, erasing = false, timer;
    const tick = () => {
      const word = words[w];
      if (!erasing) {
        c++;
        setText(word.slice(0, c));
        if (c === word.length) { erasing = true; timer = setTimeout(tick, 2000); return; }
        timer = setTimeout(tick, 100);
      } else {
        c--;
        setText(word.slice(0, c));
        if (c === 0) { erasing = false; w = (w + 1) % words.length; timer = setTimeout(tick, 300); return; }
        timer = setTimeout(tick, 50);
      }
    };
    timer = setTimeout(tick, 100);
    return () => clearTimeout(timer);
  }, [words]);
  return text;
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
