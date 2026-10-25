import { useEffect, useState } from "react";
import { CONTACT } from "../data/content.js";
import { ArrowIcon, ChatIcon, CopyIcon, GitHubIcon, LinkedInIcon, MailIcon, PhoneIcon, SendIcon } from "./icons.jsx";

// Free key from https://web3forms.com (set in .env as VITE_WEB3FORMS_KEY).
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TOPICS = ["Freelance project", "Internship", "Full-time role", "Just saying hi"];

const underline =
  "form-input w-full bg-transparent border-b border-white/25 py-2 text-on-surface placeholder-[#6f6c68] font-mono text-sm transition-all";
const label = "px text-ink-dim";

const pretty = (url) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
const phonePretty = CONTACT.phone.replace(/^\+91(\d{5})(\d{5})$/, "+91 $1 $2");

function useISTClock() {
  const [t, setT] = useState("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit", hour12: true, timeZone: "Asia/Kolkata" });
    const tick = () => setT(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 15000);
    return () => clearInterval(id);
  }, []);
  return t;
}

function Row({ icon, name, value, href, external = true }) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className="group grid grid-cols-[auto_6.5rem_1fr_auto] sm:grid-cols-[auto_7.5rem_1fr_auto] items-center gap-4 py-4 border-b border-white/10 first:border-t hover:bg-white/[0.03] transition-colors px-1">
      <span className="w-11 h-11 rounded-full border border-white/25 flex items-center justify-center text-on-surface group-hover:border-primary-container group-hover:text-primary-container transition-colors">
        {icon}
      </span>
      <span className="font-sans font-medium text-on-surface text-base sm:text-lg">{name}</span>
      <span className="font-mono text-[0.72rem] sm:text-xs text-on-surface-variant truncate">{value}</span>
      <span className="text-on-surface-variant group-hover:text-primary-container transition-colors">
        <ArrowIcon />
      </span>
    </a>
  );
}

export default function Contact({ notify }) {
  const [topic, setTopic] = useState("Internship");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent
  const [copied, setCopied] = useState(false);
  const time = useISTClock();
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const composed = () =>
    `Hi Kalith, I'd like to talk about: ${topic}.\n\n${form.message.trim() || "(message)"}\n\n— ${form.name.trim() || "Name"}${
      form.email.trim() ? ` (${form.email.trim()})` : ""
    }`;
  const whatsappHref = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(composed())}`;

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      notify("Could not copy. Select the address instead", "error");
    }
  };

  async function submit(e) {
    e.preventDefault();
    const name = form.name.trim();
    const email = form.email.trim();
    const message = form.message.trim();

    if (!name || !email) return notify("Please enter your name and email", "error");
    if (!EMAIL_RE.test(email)) return notify("Please enter a valid email address", "error");
    if (!WEB3FORMS_KEY) return notify("Contact form is not configured yet", "error");

    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Portfolio contact (${topic}) from ${name}`,
          from_name: "Portfolio Contact Form",
          topic,
          name,
          email,
          message,
          botcheck: "", // honeypot: bots fill it, real users never see it
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || "Request failed");
      notify("Message sent", "success");
      setForm({ name: "", email: "", message: "" });
      setStatus("sent");
      setTimeout(() => setStatus("idle"), 3000);
    } catch {
      notify("Sending failed. Try email or WhatsApp", "error");
      setStatus("idle");
    }
  }

  const sending = status === "sending";

  return (
    <div className="absolute inset-0 overflow-y-auto no-scrollbar pt-[17%] sm:pt-[10.5%] pb-[12%] px-[6%]">
      <div className="mx-auto max-w-6xl">
        <p className="px text-ink-dim">[Let&apos;s connect]</p>
        <div className="flex flex-wrap items-center gap-4 mt-2">
          <a
            href={`mailto:${CONTACT.email}`}
            className="serif text-[clamp(1.8rem,4.6vw,4rem)] leading-none text-on-surface hover:text-primary-container transition-colors break-all">
            {CONTACT.email}
          </a>
          <button
            onClick={copyEmail}
            className="px flex items-center gap-2 rounded-full border border-white/25 px-4 py-1.5 text-on-surface-variant hover:border-primary-container hover:text-primary-container transition-colors">
            <CopyIcon /> {copied ? "Copied" : "Copy"}
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 mt-6 py-3 border-y border-white/10 font-mono text-xs text-on-surface-variant">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            Available for internships, freelance &amp; full-time roles
          </span>
          <span>
            Chennai, IN · {time} IST
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-x-16 gap-y-12 mt-10">
          <form onSubmit={submit} noValidate>
            <p className={label}>I want to talk about</p>
            <div className="flex flex-wrap gap-2.5 mt-3" role="radiogroup" aria-label="Topic">
              {TOPICS.map((t) => (
                <button
                  key={t}
                  type="button"
                  role="radio"
                  aria-checked={topic === t}
                  onClick={() => setTopic(t)}
                  className={`rounded-full border px-4 py-2 font-sans text-sm transition-colors ${
                    topic === t
                      ? "bg-[#ece9e1] text-[#111] border-[#ece9e1]"
                      : "border-white/20 text-on-surface hover:border-primary-container hover:text-primary-container"
                  }`}>
                  {t}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 mt-8">
              <div>
                <label className={label} htmlFor="c-name">Your name</label>
                <input id="c-name" type="text" autoComplete="name" placeholder="Jane Doe" value={form.name} onChange={set("name")} className={underline} />
              </div>
              <div>
                <label className={label} htmlFor="c-email">Your email</label>
                <input id="c-email" type="email" autoComplete="email" placeholder="jane@company.com" value={form.email} onChange={set("email")} className={underline} />
              </div>
            </div>

            <div className="mt-6">
              <label className={label} htmlFor="c-msg">Message</label>
              <textarea
                id="c-msg"
                rows={4}
                placeholder="Tell me about the project, role or idea..."
                value={form.message}
                onChange={set("message")}
                className={`${underline} resize-none`}
              />
            </div>

            <div className="flex flex-wrap gap-3 mt-7">
              <button
                type="submit"
                disabled={sending || status === "sent"}
                className="flex items-center gap-2 rounded-full bg-[#ece9e1] text-[#111] px-6 py-3 font-sans font-medium hover:bg-white disabled:opacity-60 disabled:cursor-not-allowed transition-colors">
                <SendIcon />
                {sending ? "Sending..." : status === "sent" ? "Sent" : "Send message"}
              </button>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-full border border-white/25 text-on-surface px-6 py-3 font-sans font-medium hover:border-primary-container hover:text-primary-container transition-colors">
                <ChatIcon />
                Send on WhatsApp
              </a>
            </div>
            <p className="font-mono text-[0.7rem] text-ink-dim mt-4">
              Goes straight to my inbox, or opens WhatsApp with your message ready to send.
            </p>
          </form>

          <div>
            <Row icon={<MailIcon />} name="Email" value={CONTACT.email} href={`mailto:${CONTACT.email}`} external={false} />
            <Row icon={<PhoneIcon />} name="Phone" value={phonePretty} href={`tel:${CONTACT.phone}`} external={false} />
            <Row
              icon={<ChatIcon />}
              name="WhatsApp"
              value="Message me directly"
              href={`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent("Hi Kalith, I found your portfolio and would like to connect.")}`}
            />
            <Row icon={<LinkedInIcon />} name="LinkedIn" value={pretty(CONTACT.linkedin)} href={CONTACT.linkedin} />
            <Row icon={<GitHubIcon />} name="GitHub" value={pretty(CONTACT.github)} href={CONTACT.github} />
          </div>
        </div>
      </div>
    </div>
  );
}
