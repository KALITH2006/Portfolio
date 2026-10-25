import { useState } from "react";
import { CERTIFICATIONS, CERT_CATEGORIES, MAJOR_SUBJECTS } from "../data/content.js";
import { Section, SectionHeading } from "./Section.jsx";

const DOT = {
  "AI & ML": "bg-primary-container",
  "Generative AI": "bg-violet-500",
  "Data & Analytics": "bg-tertiary-container",
  "Programming & Cloud": "bg-emerald-400",
  Internships: "bg-secondary",
};
const TEXT = {
  "AI & ML": "text-primary-container",
  "Generative AI": "text-violet-400",
  "Data & Analytics": "text-tertiary-container",
  "Programming & Cloud": "text-emerald-300",
  Internships: "text-secondary",
};

const fmtDate = (d) =>
  d ? new Date(`${d}-01T00:00:00`).toLocaleString("en-US", { month: "short", year: "numeric" }).toUpperCase() : "";

function Pill({ active, onClick, children, count }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full border font-body-sm text-sm whitespace-nowrap transition-all duration-300 ${
        active
          ? "bg-white text-[#0e131f] border-white"
          : "border-white/15 text-on-surface hover:border-primary-container hover:text-primary-container"
      }`}>
      {children} <sup className="text-[10px] opacity-70">{count}</sup>
    </button>
  );
}

function CertCard({ c }) {
  const Wrapper = c.file ? "a" : "div";
  const props = c.file ? { href: `/certificates/${c.file}`, target: "_blank", rel: "noreferrer" } : {};
  return (
    <Wrapper
      {...props}
      className="group glass-panel rounded-2xl p-6 flex flex-col gap-3 min-h-[200px] border border-white/10 hover:border-primary-container/40 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(0,245,255,0.08)] transition-all duration-300">
      <div className="flex items-center justify-between font-terminal-header text-[11px] tracking-widest text-outline">
        <span className="flex items-center gap-2 uppercase">
          <span className={`w-2 h-2 rounded-full ${DOT[c.category]}`} />
          {c.category}
        </span>
        <span>{fmtDate(c.date)}</span>
      </div>
      <h4 className="font-headline-lg text-xl text-on-surface leading-snug group-hover:text-primary-container transition-colors">
        {c.title}
      </h4>
      <p className="font-body-sm text-on-surface-variant text-sm">
        {c.issuer}
        {c.via && <> · via {c.via}</>}
      </p>
      {c.file && (
        <span className={`mt-auto font-terminal-header text-sm ${TEXT[c.category]} flex items-center gap-1`}>
          view
          <span className="material-symbols-outlined text-base group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
            north_east
          </span>
        </span>
      )}
    </Wrapper>
  );
}

export default function Education() {
  const [filter, setFilter] = useState("All");
  const count = (cat) => CERTIFICATIONS.filter((c) => cat === "All" || c.category === cat).length;
  const shown = CERTIFICATIONS.filter((c) => filter === "All" || c.category === filter);

  return (
    <Section id="education-certifications" className="border-t border-white/5">
      <SectionHeading icon="school" className="mb-14">
        Education
      </SectionHeading>

      <div className="glass-panel rounded-xl p-8 border border-primary-container/10 hover:border-primary-container/30 transition-all duration-500 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div className="inline-flex items-center gap-2 border border-primary-container/30 px-3 py-1 rounded bg-primary-container/10 mb-6">
            <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse" />
            <span className="font-terminal-header text-[11px] text-primary-container tracking-widest">EDUCATION</span>
          </div>
          <h3 className="font-headline-lg text-2xl text-on-surface leading-snug mb-2">
            B.S. Abdur Rahman Crescent Institute of Science and Technology
          </h3>
          <p className="font-terminal-header text-primary-container text-sm mb-4">
            B.Tech in Artificial Intelligence and Data Science
          </p>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-lg">calendar_month</span>
            <span className="text-on-surface-variant text-sm">Aug 2023 – June 2027 | Chennai, India</span>
          </div>
        </div>
        <div>
          <div className="bg-[#050816]/80 border border-primary-container/10 rounded-lg p-5 mb-6">
            <div className="flex items-center justify-between">
              <span className="font-terminal-header text-outline text-xs tracking-widest">CURRENT_CGPA</span>
              <span className="font-display-xl text-3xl hero-name">7.00</span>
            </div>
          </div>
          <h4 className="font-terminal-header text-sm text-secondary mb-3 tracking-wider">MAJOR SUBJECTS</h4>
          <div className="flex flex-wrap gap-2">
            {MAJOR_SUBJECTS.map((s) => (
              <span
                key={s}
                className="px-3 py-1 bg-white/5 border border-white/10 rounded text-xs font-terminal-header text-outline">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-20 flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
        <h2 className="font-display-xl text-3xl md:text-5xl font-bold text-on-surface tracking-tight">
          Certifications <sup className="text-xl text-outline font-normal">({CERTIFICATIONS.length})</sup>
        </h2>
        <div className="flex flex-wrap gap-3">
          {["All", ...CERT_CATEGORIES].map((cat) => (
            <Pill key={cat} active={filter === cat} onClick={() => setFilter(cat)} count={count(cat)}>
              {cat}
            </Pill>
          ))}
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {shown.map((c) => (
          <CertCard key={c.title} c={c} />
        ))}
      </div>
    </Section>
  );
}
