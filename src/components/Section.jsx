import { useReveal } from "../hooks.js";

export function Section({ id, className = "", children }) {
  const [ref, visible] = useReveal();
  return (
    <section
      id={id}
      ref={ref}
      className={`max-w-[1440px] mx-auto px-8 py-24 reveal ${visible ? "visible" : ""} ${className}`}>
      {children}
    </section>
  );
}

export function SectionHeading({ icon, children, className = "mb-12" }) {
  return (
    <div className={`${className} flex items-center gap-4`}>
      <span className="material-symbols-outlined text-primary-container text-3xl">{icon}</span>
      <h2 className="font-display-xl text-3xl md:text-5xl font-bold text-on-surface tracking-tight section-line">
        {children}
      </h2>
    </div>
  );
}

export const Chip = ({ children, className = "" }) => (
  <span className={`px-3 py-1 bg-white/5 font-terminal-header text-[11px] rounded border border-white/10 ${className}`}>
    {children}
  </span>
);
