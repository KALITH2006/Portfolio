import { Section, SectionHeading } from "./Section.jsx";

const PORT_TECH = ["Python", "SQL Server", "CustomTkinter", "PyODBC", "Pandas", "Excel Automation"];
const MEDFITS_TECH = ["Python", "FastAPI", "AI Chatbot", "NLP", "React", "Healthcare AI"];

const hl = (t) => <span className="text-primary-container">{t}</span>;

export default function Experience() {
  return (
    <Section id="experience" className="border-t border-white/5">
      <SectionHeading icon="work_history" className="mb-14">
        Internships
      </SectionHeading>

      <div className="relative">
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary-container/30 via-primary-container/10 to-transparent" />

        {/* Chennai Port Authority */}
        <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6 group">
          <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-[#050816] border-2 border-primary-container md:-translate-x-1/2 mt-1 md:mt-0 timeline-dot z-10 group-hover:bg-primary-container group-hover:shadow-[0_0_20px_rgba(0,245,255,0.5)] transition-all duration-300" />

          <div className="pl-12 md:pl-0 md:w-[45%] md:text-right order-1">
            <span className="font-terminal-header text-xs text-primary-container tracking-widest">
              02 July 2025 – 16 July 2025
            </span>
            <h3 className="font-headline-lg text-2xl text-on-surface mt-2 leading-snug">Smart Automation Intern</h3>
            <p className="font-body-md text-on-surface-variant text-sm mt-2">Chennai Port Authority</p>
            <p className="font-body-md text-primary-container text-sm mt-1">On-Site Internship</p>
          </div>

          <div className="pl-12 md:pl-0 md:w-[45%] order-2">
            <div className="glass-panel p-6 rounded-2xl border border-primary-container/10 hover:border-primary-container/30 hover:shadow-[0_0_35px_rgba(0,245,255,0.08)] transition-all duration-500">
              <div className="mb-5 overflow-hidden rounded-xl border border-primary-container/20 relative group bg-white">
                <div className="absolute inset-0 bg-primary-container/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                <img
                  src="/chennai_port.png"
                  alt="Chennai Port Authority"
                  className="w-full h-56 object-contain p-3 hover:scale-105 transition-transform duration-700"
                />
              </div>

              <p className="font-body-md text-on-surface-variant text-sm mb-5 leading-relaxed">
                Worked as a {hl("Smart Automation Intern")} at Chennai Port Authority, contributing to intelligent
                maritime automation and smart berth management systems. Developed automation workflows and berth
                allocation solutions using {hl("Python")}, {hl("SQL Server")}, and analytics tools to improve
                operational efficiency, streamline vessel tracking, and optimize port management processes.
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {PORT_TECH.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 bg-white/5 border border-white/10 text-primary-container font-terminal-header text-[11px] rounded">
                    {t}
                  </span>
                ))}
              </div>

              <a
                href="/certificates/chennai-port-internship.jpg"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full border border-primary-container/40 text-primary-container font-terminal-header text-sm hover:bg-primary-container hover:text-[#050816] hover:shadow-[0_0_25px_rgba(0,245,255,0.35)] transition-all duration-300">
                <span>View Certificate</span>
                <span className="material-symbols-outlined text-lg group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                  open_in_new
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* MedFits */}
        <div className="relative flex flex-col md:flex-row-reverse items-start md:items-center justify-between gap-6 group mt-16">
          <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-[#050816] border-2 border-secondary md:-translate-x-1/2 mt-1 md:mt-0 z-10 group-hover:bg-secondary group-hover:shadow-[0_0_20px_rgba(123,208,255,0.5)] transition-all duration-300" />

          <div className="pl-12 md:pl-0 md:w-[45%] order-1">
            <span className="font-terminal-header text-xs text-secondary tracking-widest">AI HEALTHCARE PROJECT</span>
            <h3 className="font-headline-lg text-xl text-on-surface mt-1 leading-snug">AI Doctor Assistant</h3>
            <p className="font-body-md text-on-surface-variant text-sm mt-1">MedFits Healthcare Platform</p>
          </div>

          <div className="pl-12 md:pl-0 md:w-[45%] order-2">
            <div className="glass-panel p-6 rounded-lg hover:shadow-[0_0_20px_rgba(123,208,255,0.08)] transition-shadow">
              <div className="mb-5 overflow-hidden rounded-lg border border-secondary/20 bg-white">
                <img
                  src="/medfits.jpg"
                  alt="MedFits AI Doctor"
                  className="w-full h-56 object-contain p-3 hover:scale-105 transition-transform duration-500"
                />
              </div>

              <p className="font-body-md text-on-surface-variant text-sm mb-4 leading-relaxed">
                Developed an intelligent AI Doctor Assistant for the MedFits healthcare platform to provide smart
                symptom analysis, health guidance, and AI-powered patient interaction experiences. Focused on building
                scalable healthcare interfaces, conversational AI workflows, and secure backend integrations for modern
                digital healthcare systems.
              </p>

              <div className="flex flex-wrap gap-2">
                {MEDFITS_TECH.map((t) => (
                  <span key={t} className="px-2 py-1 bg-white/5 text-outline font-terminal-header text-[10px] rounded">
                    {t}
                  </span>
                ))}
              </div>

              <a
                href="/certificates/medfits-internship.pdf"
                target="_blank"
                rel="noreferrer"
                className="group mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full border border-secondary/40 text-secondary font-terminal-header text-sm hover:bg-secondary hover:text-[#050816] hover:shadow-[0_0_25px_rgba(123,208,255,0.35)] transition-all duration-300">
                <span>View Certificate</span>
                <span className="material-symbols-outlined text-lg group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                  open_in_new
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
