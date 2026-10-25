import { CERTIFICATIONS, MAJOR_SUBJECTS } from "../data/content.js";
import { Section, SectionHeading } from "./Section.jsx";

export default function Education() {
  return (
    <Section id="education-certifications" className="border-t border-white/5">
      <SectionHeading icon="school" className="mb-14">
        Education &amp; Certifications
      </SectionHeading>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="glass-panel rounded-xl p-8 border border-primary-container/10 hover:border-primary-container/30 transition-all duration-500 lg:col-span-1">
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

          <div className="flex items-center gap-2 mb-6">
            <span className="material-symbols-outlined text-secondary text-lg">calendar_month</span>
            <span className="text-on-surface-variant text-sm">Aug 2023 – June 2027 | Chennai, India</span>
          </div>

          <div className="bg-[#050816]/80 border border-primary-container/10 rounded-lg p-5 mb-6">
            <div className="flex items-center justify-between">
              <span className="font-terminal-header text-outline text-xs tracking-widest">CURRENT_CGPA</span>
              <span className="font-display-xl text-3xl hero-name">7.00</span>
            </div>
          </div>

          <h4 className="font-terminal-header text-sm text-secondary mb-4 tracking-wider">MAJOR SUBJECTS</h4>
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

        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CERTIFICATIONS.map((c) => (
              <div
                key={c.title}
                className="cert-badge p-6 rounded-lg flex flex-col gap-4 hover:-translate-y-1 transition-all duration-300 group">
                <div className="flex items-start justify-between">
                  <span
                    className={`material-symbols-outlined ${c.color} text-3xl group-hover:scale-110 transition-transform`}>
                    {c.icon}
                  </span>
                  <span className="font-terminal-header text-[10px] text-outline border border-white/10 px-2 py-1 rounded">
                    {c.issuer}
                  </span>
                </div>
                <div>
                  <h4 className="font-terminal-header text-sm text-on-surface group-hover:text-primary-container transition-colors mb-1">
                    {c.title}
                  </h4>
                  <p className="font-body-sm text-outline text-xs">{c.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
