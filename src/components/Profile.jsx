import { useState } from "react";
import { CONTACT, INTERNSHIPS, MAJOR_SUBJECTS, SKILLS, SKILL_GROUPS } from "../data/content.js";
import { InternshipDetail } from "./Internships.jsx";

const FACTS = [
  ["Based in", "Chennai, India"],
  ["Studying", "B.Tech AI & Data Science"],
  ["CGPA", "7.00"],
  ["Status", "Open to opportunities"],
];

const FOCUS = ["AI / ML engineering", "Full-stack development", "Cybersecurity"];

const level = (name) => SKILLS.find((s) => s.name === name)?.level ?? 0;

function Block({ no, title, children }) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-[11rem_1fr] gap-x-10 gap-y-3 py-8 border-t border-dashed border-white/15">
      <h3 className="px text-ink-dim">
        [{no}] {title}
      </h3>
      <div>{children}</div>
    </section>
  );
}

function Meter({ value }) {
  const on = Math.round(value / 10);
  return (
    <span className="flex gap-[3px]" role="img" aria-label={`${value} percent`}>
      {Array.from({ length: 10 }, (_, k) => (
        <span key={k} className={`h-2 w-3 sm:w-4 ${k < on ? "bg-primary-container" : "bg-white/15"}`} />
      ))}
    </span>
  );
}

export default function Profile({ onNavigate }) {
  const [open, setOpen] = useState(null);

  return (
    <div className="absolute inset-0 overflow-y-auto no-scrollbar pt-[17%] sm:pt-[10.5%] pb-[13%] px-[6%]">
      <div className="mx-auto max-w-5xl">
        {/* header */}
        <header className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-end pb-8">
          <div>
            <p className="px text-ink-dim">[Profile]</p>
            <h2 className="serif text-[clamp(2.6rem,6.5vw,5.4rem)] leading-[0.9] text-on-surface mt-2">Mohamed Kalith K</h2>
            <p className="px !text-lg text-primary-container mt-3">AI Engineer · Full-stack Developer · Cybersecurity enthusiast</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="/resume.pdf"
              download="resume.pdf"
              className="px !text-lg rounded-full bg-[#ece9e1] text-[#111] px-6 py-2.5 hover:bg-white transition-colors">
              Download resume ↓
            </a>
            <a
              href="/contact"
              onClick={(e) => {
                e.preventDefault();
                onNavigate("contact");
              }}
              className="px !text-lg rounded-full border border-white/25 px-6 py-2.5 hover:border-primary-container hover:text-primary-container transition-colors">
              Get in touch →
            </a>
          </div>
        </header>

        <dl className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 border border-white/10">
          {FACTS.map(([k, v]) => (
            <div key={k} className="bg-[#141414] p-4">
              <dt className="px text-ink-dim">[{k}]</dt>
              <dd className="px !text-lg text-on-surface mt-1.5">{v}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-8">
          <Block no="01" title="About">
            <p className="serif text-[clamp(1.5rem,2.8vw,2.3rem)] leading-[1.02] text-on-surface max-w-3xl">
              I build intelligent systems, secure platforms and futuristic digital experiences through AI engineering and
              modern technologies.
            </p>
            <div className="flex flex-wrap gap-2 mt-5">
              {FOCUS.map((f) => (
                <span key={f} className="px border border-white/20 px-3 py-1 text-on-surface-variant">
                  {f}
                </span>
              ))}
            </div>
          </Block>

          <Block no="02" title="Education">
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
              <h4 className="serif text-3xl leading-none text-on-surface">B.S. Abdur Rahman Crescent Institute</h4>
              <span className="px text-ink-dim">Aug 2023 – Jun 2027</span>
            </div>
            <p className="px !text-lg text-on-surface-variant mt-2">B.Tech · Artificial Intelligence &amp; Data Science · Chennai, India</p>
            <p className="px mt-3 text-primary-container">CGPA 7.00</p>
            <div className="flex flex-wrap gap-2 mt-4">
              {MAJOR_SUBJECTS.map((s) => (
                <span key={s} className="px !text-[0.85rem] border border-white/15 px-2 py-0.5 text-on-surface-variant">
                  {s}
                </span>
              ))}
            </div>
          </Block>

          <Block no="03" title="Experience">
            <ul className="flex flex-col">
              {INTERNSHIPS.map((it) => (
                <li key={it.org} className="border-b border-white/10 first:pt-0">
                  <button
                    onClick={() => setOpen(it)}
                    className="group w-full text-left grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-x-6 gap-y-1 py-4 items-baseline">
                    <span>
                      <span className="serif text-2xl sm:text-3xl leading-none text-on-surface group-hover:text-primary-container transition-colors">
                        {it.role}
                      </span>
                      <span className="px block text-on-surface-variant mt-1">{it.org}</span>
                    </span>
                    <span className="px text-ink-dim sm:text-right">
                      {it.period} <span className="text-primary-container">[→]</span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </Block>

          <Block no="04" title="Skills">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-7">
              {SKILL_GROUPS.map((g) => (
                <div key={g.title}>
                  <h4 className="px text-ink-dim mb-3">{g.title}</h4>
                  <ul className="flex flex-col gap-2.5">
                    {g.skills.map((name) => (
                      <li key={name} className="flex items-center justify-between gap-4 px !text-lg text-on-surface">
                        {name}
                        <Meter value={level(name)} />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Block>

          <Block no="05" title="Links">
            <ul className="grid grid-cols-2 sm:grid-cols-4 gap-4 px !text-lg">
              {[
                ["LinkedIn", CONTACT.linkedin],
                ["GitHub", CONTACT.github],
                ["Email", `mailto:${CONTACT.email}`],
                ["WhatsApp", `https://wa.me/${CONTACT.whatsapp}`],
              ].map(([label, href]) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="text-on-surface hover:text-primary-container transition-colors">
                    {label}
                    <span className="text-ink-dim">[↗]</span>
                  </a>
                </li>
              ))}
            </ul>
          </Block>
        </div>
      </div>

      {open && <InternshipDetail it={open} onClose={() => setOpen(null)} />}
    </div>
  );
}
