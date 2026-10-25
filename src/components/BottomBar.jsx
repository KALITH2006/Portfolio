import { useEffect, useState } from "react";
import { CONTACT } from "../data/content.js";

export default function BottomBar({ bw, onToggleBw }) {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Asia/Kolkata",
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const t = setInterval(tick, 10000);
    return () => clearInterval(t);
  }, []);

  return (
    <footer className="absolute bottom-0 inset-x-0 z-40 px-[3.2%] pb-[2.6%] pt-6 flex items-end justify-between gap-4 font-terminal-header text-[11px] sm:text-xs tracking-widest uppercase bg-gradient-to-t from-[#111] via-[#111]/90 to-transparent">
      <div className="flex flex-col gap-1">
        <span className="text-on-surface">
          {time} <span className="text-outline">IST</span>
        </span>
        <button onClick={onToggleBw} className="text-left text-on-surface-variant hover:text-primary-container transition-colors">
          B&amp;W <span className="text-outline">[</span>
          <span className={bw ? "text-primary-container" : "text-on-surface"}>{bw ? "ON" : "OFF"}</span>
          <span className="text-outline">]</span>
        </button>
      </div>

      <div className="flex flex-col items-end gap-1">
        <span className="text-on-surface-variant">
          Source:{" "}
          <a
            href="https://github.com/KALITH2006/Portfolio"
            target="_blank"
            rel="noreferrer"
            className="text-on-surface hover:text-primary-container transition-colors">
            GitHub
          </a>
        </span>
        <a href={`mailto:${CONTACT.email}`} className="text-on-surface hover:text-primary-container transition-colors">
          Email
        </a>
      </div>
    </footer>
  );
}
