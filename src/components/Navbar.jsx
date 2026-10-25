import { useState } from "react";
import { goTo } from "../nav.js";
import { NAV_LINKS } from "../data/content.js";

export default function Navbar({ active }) {
  const [open, setOpen] = useState(false);
  const go = (e, id) => {
    goTo(e, id);
    setOpen(false);
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: "rgba(17,17,17,0.6)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 0 20px rgba(255,49,49,0.1)",
      }}>
      <div className="max-w-[1440px] mx-auto px-8 flex items-center justify-between h-[69px]">
        <a href="/" onClick={(e) => go(e, "hero")}
          className="font-display-xl text-xl font-semibold text-primary-container tracking-tight hover:scale-105 transition-transform duration-300 whitespace-nowrap">
          MOHAMED KALITH
        </a>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <a
              key={l.id}
              href={l.path}
              onClick={(e) => go(e, l.id)}
              className={`nav-link font-terminal-header text-sm text-on-surface-variant hover:text-primary-container pb-1 ${active === l.id ? "active" : ""}`}>
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <a href="/contact" onClick={(e) => go(e, "contact")} className="bg-primary-container text-[#111111] font-terminal-header text-sm px-6 py-2 rounded uppercase hover:shadow-[0_0_25px_rgba(255,49,49,0.5)] hover:scale-105 transition-all duration-300 hidden md:block">
            CONNECT
          </a>
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}>
            <span
              className="block w-6 h-0.5 bg-primary-container transition-all duration-300"
              style={{ transform: open ? "rotate(45deg) translate(5px,5px)" : "" }}
            />
            <span
              className="block w-6 h-0.5 bg-primary-container transition-all duration-300"
              style={{ opacity: open ? 0 : 1 }}
            />
            <span
              className="block w-4 h-0.5 bg-primary-container transition-all duration-300"
              style={{ transform: open ? "rotate(-45deg) translate(4px,-4px)" : "" }}
            />
          </button>
        </div>
      </div>

      <div className={`mobile-menu md:hidden border-t border-dashed border-white/10 ${open ? "open" : ""}`}>
        <div className="px-8 py-4 flex flex-col gap-4">
          {NAV_LINKS.map((l) => (
            <a
              key={l.id}
              href={l.path}
              onClick={(e) => go(e, l.id)}
              className={`font-terminal-header text-sm hover:text-primary-container ${
                active === l.id ? "text-primary-container" : "text-on-surface-variant"
              }`}>
              {l.label}
            </a>
          ))}
          <a
            href="/contact"
            onClick={(e) => go(e, "contact")}
            className="bg-primary-container text-[#111111] font-terminal-header text-sm px-6 py-2 rounded uppercase text-center mt-2">
            CONNECT
          </a>
        </div>
      </div>
    </nav>
  );
}
