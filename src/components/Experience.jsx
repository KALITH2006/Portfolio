import { Section, SectionHeading } from "./Section.jsx";

const hl = (t) => <span className="text-primary-container">{t}</span>;

// Oldest first (chronological). `fit: "cover"` crops to fill the box, "contain" shows the whole image.
const INTERNSHIPS = [
  {
    period: "May 2025 – June 2025",
    role: "Machine Learning Intern",
    org: "Cognifyz Technologies",
    kind: "Internship",
    image: "/projects/cognifyz-internship.jpg",
    fit: "cover",
    description: (
      <>
        Worked as a {hl("Machine Learning Intern")} at Cognifyz Technologies, where the internship letter credits
        dedication, strong coordination and communication skills, and attention to detail.
      </>
    ),
    tech: ["Machine Learning", "Python"],
    certificate: "/certificates/cognifyz-ml-internship.pdf",
  },
  {
    period: "05 June 2025 – 05 July 2025",
    role: "Artificial Intelligence Intern",
    org: "Corizo",
    kind: "Internship",
    image: "/projects/corizo-internship.jpg",
    fit: "cover",
    description: (
      <>
        Completed a one-month {hl("Artificial Intelligence")} internship at Corizo (certificate issued with IIT
        Bombay's Mood Indigo), after finishing the AI training programme there. Recognised for diligence,
        consistency, determination and active participation.
      </>
    ),
    tech: ["Artificial Intelligence", "Machine Learning", "Python"],
    certificate: "/certificates/corizo-ai-internship.pdf",
  },
  {
    period: "02 July 2025 – 16 July 2025",
    role: "Smart Automation Intern",
    org: "Chennai Port Authority",
    kind: "On-Site Internship",
    image: "/chennai_port.png",
    fit: "contain",
    imageBg: "bg-white",
    description: (
      <>
        Worked as a {hl("Smart Automation Intern")} at Chennai Port Authority, contributing to intelligent maritime
        automation and smart berth management systems. Developed automation workflows and berth allocation solutions
        using {hl("Python")}, {hl("SQL Server")}, and analytics tools to improve operational efficiency, streamline
        vessel tracking, and optimize port management processes.
      </>
    ),
    tech: ["Python", "SQL Server", "CustomTkinter", "PyODBC", "Pandas", "Excel Automation"],
    certificate: "/certificates/chennai-port-internship.jpg",
  },
  {
    period: "March 2026 – May 2026",
    role: "IT Intern",
    org: "MedFits Healthcare Platform",
    kind: "AI Healthcare Project",
    image: "/medfits.jpg",
    fit: "contain",
    imageBg: "bg-white",
    description: (
      <>
        Developed an intelligent AI Doctor Assistant for the MedFits healthcare platform to provide smart symptom
        analysis, health guidance, and AI-powered patient interaction experiences. Focused on building scalable
        healthcare interfaces, conversational AI workflows, and secure backend integrations for modern digital
        healthcare systems.
      </>
    ),
    tech: ["Python", "FastAPI", "AI Chatbot", "NLP", "React", "Healthcare AI"],
    certificate: "/certificates/medfits-internship.pdf",
  },
];

function Card({ item, accent }) {
  const ring = accent === "secondary" ? "border-secondary/20" : "border-primary-container/20";
  return (
    <div className="glass-panel p-6 rounded-2xl border border-primary-container/10 hover:border-primary-container/30 hover:shadow-[0_0_35px_rgba(0,245,255,0.08)] transition-all duration-500">
      <div className={`mb-5 overflow-hidden rounded-xl border ${ring} relative group ${item.imageBg ?? "bg-[#050816]"}`}>
        <div className="absolute inset-0 bg-primary-container/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
        <img
          src={item.image}
          alt={`${item.org} – ${item.role}`}
          loading="lazy"
          className={`w-full h-56 hover:scale-105 transition-transform duration-700 ${
            item.fit === "contain" ? "object-contain p-3" : "object-cover object-top"
          }`}
        />
      </div>

      <p className="font-body-md text-on-surface-variant text-sm mb-5 leading-relaxed">{item.description}</p>

      <div className="flex flex-wrap gap-2 mb-6">
        {item.tech.map((t) => (
          <span
            key={t}
            className="px-3 py-1 bg-white/5 border border-white/10 text-primary-container font-terminal-header text-[11px] rounded">
            {t}
          </span>
        ))}
      </div>

      <a
        href={item.certificate}
        target="_blank"
        rel="noreferrer"
        className="group inline-flex items-center gap-2 px-6 py-3 rounded-full border border-primary-container/40 text-primary-container font-terminal-header text-sm hover:bg-primary-container hover:text-[#050816] hover:shadow-[0_0_25px_rgba(0,245,255,0.35)] transition-all duration-300">
        <span>View Certificate</span>
        <span className="material-symbols-outlined text-lg group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
          open_in_new
        </span>
      </a>
    </div>
  );
}

export default function Experience() {
  return (
    <Section id="experience" className="border-t border-white/5">
      <SectionHeading icon="work_history" className="mb-14">
        Internships
      </SectionHeading>

      <div className="relative">
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary-container/30 via-primary-container/10 to-transparent" />

        {INTERNSHIPS.map((item, i) => {
          const flip = i % 2 === 1;
          return (
            <div
              key={item.org}
              className={`relative flex flex-col ${
                flip ? "md:flex-row-reverse" : "md:flex-row"
              } items-start md:items-center justify-between gap-6 group ${i ? "mt-16" : ""}`}>
              <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-[#050816] border-2 border-primary-container md:-translate-x-1/2 mt-1 md:mt-0 timeline-dot z-10 group-hover:bg-primary-container group-hover:shadow-[0_0_20px_rgba(0,245,255,0.5)] transition-all duration-300" />

              <div className={`pl-12 md:pl-0 md:w-[45%] order-1 ${flip ? "" : "md:text-right"}`}>
                <span className="font-terminal-header text-xs text-primary-container tracking-widest">
                  {item.period}
                </span>
                <h3 className="font-headline-lg text-2xl text-on-surface mt-2 leading-snug">{item.role}</h3>
                <p className="font-body-md text-on-surface-variant text-sm mt-2">{item.org}</p>
                <p className="font-body-md text-primary-container text-sm mt-1">{item.kind}</p>
              </div>

              <div className="pl-12 md:pl-0 md:w-[45%] order-2">
                <Card item={item} accent={flip ? "secondary" : "primary"} />
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
