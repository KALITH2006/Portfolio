import { SKILLS } from "../data/content.js";
import { useReveal } from "../hooks.js";
import { Section, SectionHeading } from "./Section.jsx";

export default function Skills() {
  const [gridRef, animate] = useReveal(0.2);
  return (
    <Section id="skills">
      <SectionHeading icon="developer_board">Core Technologies &amp; Engineering Systems</SectionHeading>
      <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {SKILLS.map((s) => (
          <div
            key={s.name}
            className="glass-panel p-6 rounded-lg group hover:-translate-y-2 transition-transform duration-300 flex flex-col items-center gap-4 cursor-pointer">
            <div className="w-16 h-16 rounded-full bg-[#050816] flex items-center justify-center border border-primary-container/20 group-hover:border-primary-container group-hover:shadow-[0_0_15px_rgba(0,245,255,0.35)] transition-all duration-300">
              <span className="material-symbols-outlined text-primary-container text-3xl group-hover:scale-110 transition-transform">
                {s.icon}
              </span>
            </div>
            <div className="w-full text-center">
              <h4 className="font-terminal-header text-sm text-on-surface group-hover:text-primary-container transition-colors mb-3">
                {s.name}
              </h4>
              <div className={`skill-bar w-full bg-white/10 h-1 rounded overflow-hidden ${animate ? "animate" : ""}`}>
                <div className="fill bg-primary-container h-full rounded" style={{ "--w": `${s.level}%` }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
