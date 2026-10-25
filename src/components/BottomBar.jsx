import { useEffect, useState } from "react";

export default function BottomBar({ bw, onToggleBw }) {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Asia/Kolkata" });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const t = setInterval(tick, 10000);
    return () => clearInterval(t);
  }, []);

  return (
    <footer className="absolute bottom-0 inset-x-0 z-40 px-[6%] pb-[3.4%] pt-10 bg-gradient-to-t from-[#121212] via-[#121212]/90 to-transparent flex items-end justify-between text-ink-dim">
      <span className="px">{time} IST</span>
      <button onClick={onToggleBw} className="px hover:text-on-surface transition-colors">
        B&amp;W [<span className={bw ? "text-primary-container" : ""}>{bw ? "ON" : "OFF"}</span>]
      </button>
    </footer>
  );
}
