import { useEffect } from "react";

// A card laid over the screen (project / internship details). Esc or a click outside closes it.
export default function Overlay({ label, onClose, children }) {
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
      aria-label={label}>
      <div
        className="relative w-full max-w-2xl max-h-full overflow-y-auto no-scrollbar bg-[#0d0d0d] border border-white/15 p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="px absolute top-4 right-4 text-ink-dim hover:text-primary-container transition-colors">
          [esc]
        </button>
        {children}
      </div>
    </div>
  );
}

export const Tag = ({ children }) => (
  <span className="px border border-white/20 px-2 py-0.5 text-on-surface-variant">{children}</span>
);

export function LinkRow({ children }) {
  return <div className="flex flex-wrap gap-6 mt-6 px">{children}</div>;
}

export const A = ({ href, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className="text-on-surface hover:text-primary-container transition-colors">
    {children}[↗]
  </a>
);
