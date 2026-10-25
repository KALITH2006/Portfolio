import { useState } from "react";
import { CONTACT } from "../data/content.js";
import { Section, SectionHeading } from "./Section.jsx";

// Free key from https://web3forms.com (set in .env as VITE_WEB3FORMS_KEY).
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const socialBtn =
  "w-12 h-12 rounded bg-[#050816] border border-white/10 flex items-center justify-center text-on-surface hover:text-primary-container hover:border-primary-container hover:shadow-[0_0_15px_rgba(0,245,255,0.3)] transition-all";
const inputCls =
  "form-input bg-[#050816]/80 border border-white/10 rounded px-4 py-3 text-on-surface font-body-sm text-sm placeholder-[#6b7280] transition-all w-full";
const labelCls = "font-terminal-header text-[11px] text-outline uppercase tracking-widest";

const STATUS_ROWS = [
  ["NAME", <span className="text-primary-container">{CONTACT.name}</span>],
  [
    "EMAIL",
    <a href={`mailto:${CONTACT.email}`} className="text-secondary hover:text-primary-container transition-colors text-xs">
      {CONTACT.email}
    </a>,
  ],
  ["CONTACT NO", <span className="text-primary-container">{CONTACT.phone}</span>],
  ["AVAILABILITY", <span className="text-tertiary-container text-xs">OPEN_TO_OPPORTUNITIES</span>],
  ["LOCATION", <span className="text-on-surface-variant">{CONTACT.location}</span>],
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
            <div className="space-y-4 font-terminal-header text-sm">
              {STATUS_ROWS.map(([k, v]) => (
                <div key={k} className="flex justify-between items-center group">
                  <span className="text-outline group-hover:text-primary-container transition-colors">&gt; {k}:</span>
                  {v}
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <a href={CONTACT.linkedin} target="_blank" rel="noreferrer" className={socialBtn} title="LinkedIn">
              <span className="material-symbols-outlined text-xl">link</span>
            </a>
            <a href={CONTACT.github} target="_blank" rel="noreferrer" className={socialBtn} title="GitHub">
              <span className="material-symbols-outlined text-xl">code</span>
            </a>
            <a href={`mailto:${CONTACT.email}`} className={socialBtn} title="Email">
              <span className="material-symbols-outlined text-xl">mail</span>
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
