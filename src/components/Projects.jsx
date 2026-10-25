import { PROJECTS } from "../data/content.js";
import { Chip, Section, SectionHeading } from "./Section.jsx";

function RideVisual() {
  return (
    <svg className="w-full h-full opacity-60 mix-blend-screen" viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="rr" cx="30%" cy="60%" r="50%">
          <stop offset="0%" stopColor="#00f5ff" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#050816" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="200" fill="#050816" />
      <rect width="400" height="200" fill="url(#rr)" />
      <rect x="0" y="140" width="400" height="20" fill="#0e131f" stroke="rgba(0,245,255,0.15)" strokeWidth="1" />
      <rect x="60" y="148" width="40" height="4" fill="rgba(255,219,63,0.4)" rx="2" />
      <rect x="160" y="148" width="40" height="4" fill="rgba(255,219,63,0.4)" rx="2" />
      <rect x="260" y="148" width="40" height="4" fill="rgba(255,219,63,0.4)" rx="2" />
      <rect x="150" y="110" width="100" height="30" fill="rgba(0,245,255,0.25)" rx="4" />
      <rect x="165" y="94" width="70" height="18" fill="rgba(0,245,255,0.35)" rx="3" />
      <circle cx="170" cy="142" r="10" fill="rgba(0,245,255,0.4)" />
      <circle cx="230" cy="142" r="10" fill="rgba(0,245,255,0.4)" />
      <circle cx="50" cy="100" r="3" fill="#00f5ff" fillOpacity="0.8" />
      <circle cx="100" cy="80" r="3" fill="#00f5ff" fillOpacity="0.6" />
      <circle cx="310" cy="90" r="3" fill="#00f5ff" fillOpacity="0.7" />
      <circle cx="360" cy="70" r="3" fill="#7bd0ff" fillOpacity="0.5" />
      <polyline
        points="50,100 100,80 200,80 310,90 360,70"
        fill="none"
        stroke="#00f5ff"
        strokeOpacity="0.3"
        strokeWidth="1"
        strokeDasharray="4,4"
      />
    </svg>
  );
}

function NlpVisual() {
  const nodes = [
    [100, 80, 6, 0.8],
    [200, 50, 6, 0.7],
    [300, 90, 6, 0.8],
    [150, 150, 6, 0.6],
    [250, 160, 6, 0.7],
  ];
  return (
    <svg className="w-full h-full opacity-60 mix-blend-screen" viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="ai" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00f5ff" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#050816" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="200" fill="#050816" />
      <rect width="400" height="200" fill="url(#ai)" />
      {nodes.map(([x, y, r, o]) => (
        <g key={`${x}-${y}`}>
          <line x1={x} y1={y} x2="200" y2="100" stroke="#00f5ff" strokeOpacity={o - 0.4} strokeWidth="1.5" />
          <circle cx={x} cy={y} r={r} fill="#00f5ff" fillOpacity={o} />
        </g>
      ))}
      <circle cx="200" cy="100" r="8" fill="#00f5ff" fillOpacity="1" />
      <circle cx="200" cy="100" r="12" fill="none" stroke="#00f5ff" strokeOpacity="0.3" strokeWidth="1" strokeDasharray="2,2" />
      <circle cx="200" cy="100" r="18" fill="none" stroke="#00f5ff" strokeOpacity="0.15" strokeWidth="1" strokeDasharray="2,2" />
    </svg>
  );
}

function ManualVisual() {
  return (
    <svg className="w-full h-full opacity-70 mix-blend-screen" viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="mn" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#00f5ff" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#050816" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="200" fill="#050816" />
      <rect width="400" height="200" fill="url(#mn)" />
      <rect x="70" y="35" width="110" height="140" rx="4" fill="rgba(0,245,255,0.08)" stroke="#00f5ff" strokeOpacity="0.5" />
      {[55, 70, 85, 100, 115, 130].map((y) => (
        <line key={y} x1="85" y1={y} x2={y % 30 === 10 ? 150 : 165} y2={y} stroke="#00f5ff" strokeOpacity="0.35" strokeWidth="2" />
      ))}
      <rect x="85" y="140" width="80" height="20" rx="2" fill="#00f5ff" fillOpacity="0.25" />
      <path d="M180 105 C 215 105, 215 100, 245 100" fill="none" stroke="#00f5ff" strokeOpacity="0.6" strokeDasharray="4,4" />
      <rect x="245" y="60" width="95" height="28" rx="14" fill="rgba(123,208,255,0.2)" stroke="#7bd0ff" strokeOpacity="0.6" />
      <rect x="245" y="95" width="120" height="44" rx="10" fill="rgba(0,245,255,0.15)" stroke="#00f5ff" strokeOpacity="0.6" />
      <line x1="257" y1="109" x2="350" y2="109" stroke="#00f5ff" strokeOpacity="0.5" strokeWidth="2" />
      <line x1="257" y1="122" x2="320" y2="122" stroke="#00f5ff" strokeOpacity="0.4" strokeWidth="2" />
      <text x="300" y="155" fill="#00f5ff" fillOpacity="0.7" fontSize="10" fontFamily="monospace">p. 214</text>
    </svg>
  );
}

function Visual({ type, title }) {
  if (type === "ride") return <RideVisual />;
  if (type === "nlp") return <NlpVisual />;
  if (type === "manual") return <ManualVisual />;
  return (
    <img
      src={type}
      alt={title}
      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
    />
  );
}

const linkBase =
  "flex-1 font-terminal-header text-xs py-2 rounded flex items-center justify-center gap-2 transition-all";

function ProjectCard({ p }) {
  return (
    <div className="glass-panel rounded-xl overflow-hidden group flex flex-col hover:shadow-[0_0_30px_rgba(0,245,255,0.1)] hover:-translate-y-1 transition-all duration-500">
      <div className="h-48 bg-[#050816] relative overflow-hidden shrink-0">
        <div className="absolute inset-0 bg-primary-container/10 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        <Visual type={p.visual} title={p.title} />
        <div className="absolute top-4 right-4 z-20">
          <span className="px-2 py-1 bg-[#050816]/80 text-primary-container font-terminal-header text-[10px] rounded border border-primary-container/30 backdrop-blur-sm tracking-wider">
            {p.badge}
          </span>
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="font-headline-lg text-2xl text-on-surface group-hover:text-primary-container transition-colors mb-2">
          {p.title}
        </h3>
        <p className="font-body-md text-on-surface-variant text-sm mb-6 leading-relaxed flex-grow">{p.description}</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {p.tech.map((t) => (
            <Chip key={t} className="text-secondary">
              {t}
            </Chip>
          ))}
        </div>
        <div className="flex gap-3">
          <a
            href={p.github}
            target="_blank"
            rel="noreferrer"
            className={`${linkBase} border border-white/15 text-on-surface-variant hover:border-primary-container hover:text-primary-container`}>
            <span className="material-symbols-outlined text-base leading-none">code</span> GitHub
          </a>
          {p.demo ? (
            <a
              href={p.demo}
              target="_blank"
              rel="noreferrer"
              className={`${linkBase} border border-primary-container/40 text-primary-container hover:bg-primary-container/10`}>
              <span className="material-symbols-outlined text-base leading-none">open_in_new</span> Live Demo
            </a>
          ) : (
            <span
              className={`${linkBase} border border-white/10 text-outline cursor-not-allowed`}
              title="Live demo coming soon">
              <span className="material-symbols-outlined text-base leading-none">schedule</span> Coming Soon
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <Section id="projects" className="border-t border-white/5">
      <SectionHeading icon="dns">Featured Engineering Projects</SectionHeading>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PROJECTS.map((p) => (
          <ProjectCard key={p.title} p={p} />
        ))}
      </div>
    </Section>
  );
}
