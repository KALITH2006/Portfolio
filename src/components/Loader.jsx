import { useEffect, useState } from "react";

// Boot screen: a dashed progress rule and a counter, then it powers off.
export default function Loader({ onDone }) {
  const [n, setN] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      setN((v) => {
        if (v >= 100) {
          clearInterval(t);
          return 100;
        }
        return Math.min(100, v + 4);
      });
    }, 40);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (n < 100) return;
    setLeaving(true);
    const t = setTimeout(onDone, 500);
    return () => clearTimeout(t);
  }, [n, onDone]);

  return (
    <div className={`boot absolute inset-0 z-[80] bg-[#111] flex flex-col justify-end p-[3.2%] ${leaving ? "boot-off" : ""}`}>
      <div className="flex justify-between font-terminal-header text-xs tracking-widest text-on-surface-variant mb-3">
        <span>LOADING</span>
        <span>{n}</span>
      </div>
      <div className="h-px w-full border-t border-dashed border-white/30 relative">
        <div className="absolute -top-px left-0 h-px bg-primary-container" style={{ width: `${n}%` }} />
      </div>
    </div>
  );
}
