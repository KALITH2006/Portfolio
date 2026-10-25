import { useState } from "react";
import { CONTACT } from "../data/content.js";
import { Section, SectionHeading } from "./Section.jsx";

// Free key from https://web3forms.com (set in .env as VITE_WEB3FORMS_KEY).
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY;

const Icon = ({ d }) => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
    <path d={d} />
  </svg>
);
const ICON_PATHS = {
  linkedin: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  github: "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
  gmail: "M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const socialBtn =
  "w-12 h-12 rounded bg-[#050816] border border-white/10 flex items-center justify-center text-on-surface hover:text-primary-container hover:border-primary-container hover:shadow-[0_0_15px_rgba(0,245,255,0.3)] transition-all";
const inputCls =
  "form-input bg-[#050816]/80 border border-white/10 rounded px-4 py-3 text-on-surface font-body-sm text-sm placeholder-[#6b7280] transition-all w-full";
const labelCls = "font-terminal-header text-[11px] text-outline uppercase tracking-widest";

const link = "hover:text-primary-container transition-colors break-all";

const STATUS_ROWS = [
  { icon: "person", label: "NAME", value: <span className="text-primary-container">{CONTACT.name}</span> },
  {
    icon: "mail",
    label: "EMAIL",
    value: (
      <a href={`mailto:${CONTACT.email}`} className={`text-secondary ${link}`}>
        {CONTACT.email}
      </a>
    ),
  },
  {
    icon: "call",
    label: "CONTACT NO",
    value: (
      <a href={`tel:${CONTACT.phone}`} className={`text-primary-container ${link}`}>
        {CONTACT.phone}
      </a>
    ),
  },
  {
    icon: "location_on",
    label: "LOCATION",
    value: <span className="text-on-surface-variant">{CONTACT.location.replace(/,(?=\S)/g, ", ")}</span>,
  },
  {
    icon: "bolt",
    label: "AVAILABILITY",
    value: (
      <span className="inline-flex items-center gap-2 text-tertiary-container">
        <span className="w-2 h-2 rounded-full bg-tertiary-container animate-pulse" />
        OPEN_TO_OPPORTUNITIES
      </span>
    ),
  },
];

export default function Contact({ notify }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  async function submit(e) {
    e.preventDefault();
    const name = form.name.trim();
    const email = form.email.trim();
    const phone = form.phone.trim();

    if (!name || !email) return notify("⚠ Please enter your name and email.", "error");
    if (!EMAIL_RE.test(email)) return notify("⚠ Please enter a valid email address.", "error");

    if (!WEB3FORMS_KEY) return notify("✗ Contact form is not configured yet.", "error");

    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Portfolio contact from ${name}`,
          from_name: "Portfolio Contact Form",
          name,
          email,
          phone,
          botcheck: "", // honeypot: bots fill it, real users never see it
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || "Request failed");
      notify("✓ Message transmitted successfully!", "success");
      setForm({ name: "", email: "", phone: "" });
      setStatus("sent");
      setTimeout(() => setStatus("idle"), 3000);
    } catch {
      notify("✗ Transmission failed. Check your connection or email me directly.", "error");
      setStatus("idle");
    }
  }

  const sending = status === "sending";
  const icon = sending ? "hourglass_empty" : status === "sent" ? "check_circle" : "send";
  const label = sending ? "Transmitting..." : status === "sent" ? "Transmitted!" : "Send Message";

  return (
    <Section id="contact" className="border-t border-white/5">
      <SectionHeading icon="terminal">Let's Connect</SectionHeading>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="flex flex-col gap-8">
          <div className="glass-panel p-6 rounded-lg">
            <h3 className="font-terminal-header text-sm text-on-surface mb-6 border-b border-white/10 pb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse" />
              SYSTEM.STATUS
            </h3>
            <dl className="font-terminal-header text-sm divide-y divide-white/5">
              {STATUS_ROWS.map((r) => (
                <div key={r.label} className="group grid grid-cols-[auto_1fr] sm:grid-cols-[150px_1fr] gap-x-4 gap-y-1 items-center py-3 first:pt-0 last:pb-0">
                  <dt className="flex items-center gap-2 text-outline group-hover:text-primary-container transition-colors text-xs tracking-widest">
                    <span className="material-symbols-outlined text-base leading-none">{r.icon}</span>
                    {r.label}
                  </dt>
                  <dd className="sm:text-right col-span-2 sm:col-span-1">{r.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="flex gap-4">
            <a href={CONTACT.linkedin} target="_blank" rel="noreferrer" className={socialBtn} title="LinkedIn">
              <Icon d={ICON_PATHS.linkedin} />
            </a>
            <a href={CONTACT.github} target="_blank" rel="noreferrer" className={socialBtn} title="GitHub">
              <Icon d={ICON_PATHS.github} />
            </a>
            <a href={`mailto:${CONTACT.email}`} className={socialBtn} title="Gmail">
              <Icon d={ICON_PATHS.gmail} />
            </a>
          </div>

          <div className="glass-panel p-6 rounded-lg border-l-2 border-primary-container/40">
            <p className="font-body-sm text-on-surface-variant text-sm leading-relaxed">
              Open to <span className="text-primary-container">AI/ML engineering</span>,{" "}
              <span className="text-secondary">full-stack development</span>, and{" "}
              <span className="text-tertiary-container">cybersecurity</span> roles. Available for internships,
              freelance, and full-time opportunities.
            </p>
          </div>
        </div>

        <form onSubmit={submit} noValidate className="glass-panel p-8 rounded-lg relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-40 pointer-events-none"
            style={{ background: "linear-gradient(138deg,rgba(0,245,255,0.05) 0%,transparent 100%)" }}
          />
          <div className="relative z-10 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className={labelCls} htmlFor="c-name">
                ID / Name
              </label>
              <input
                id="c-name"
                type="text"
                autoComplete="name"
                placeholder="Enter identification..."
                value={form.name}
                onChange={set("name")}
                className={inputCls}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className={labelCls} htmlFor="c-email">
                Comms Link / Email
              </label>
              <input
                id="c-email"
                type="email"
                autoComplete="email"
                placeholder="Enter secure channel..."
                value={form.email}
                onChange={set("email")}
                className={inputCls}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className={labelCls} htmlFor="c-phone">
                Phone
              </label>
              <input
                id="c-phone"
                type="tel"
                autoComplete="tel"
                placeholder="Enter comm frequency..."
                value={form.phone}
                onChange={set("phone")}
                className={inputCls}
              />
            </div>
            <button
              type="submit"
              disabled={sending || status === "sent"}
              className="mt-2 bg-primary-container/10 border border-primary-container text-primary-container font-terminal-header text-sm py-4 rounded flex items-center justify-center gap-2 hover:bg-primary-container hover:text-[#0e131f] hover:shadow-[0_0_25px_rgba(0,245,255,0.35)] disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300">
              <span className="material-symbols-outlined text-lg leading-none">{icon}</span>
              <span>{label}</span>
            </button>
          </div>
        </form>
      </div>
    </Section>
  );
}
