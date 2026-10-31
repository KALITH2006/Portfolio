// Each page is one "channel" on the screen. Old section paths still resolve.
export const PAGES = [
  { id: "home", path: "/", label: "Home", aliases: ["/projects"] },
  { id: "profile", path: "/profile", label: "Profile", aliases: ["/skills"] },
  { id: "internships", path: "/internships", label: "Internships", aliases: ["/experience"] },
  { id: "certificates", path: "/certificates", label: "Certificates", aliases: ["/certifications", "/news-watch"] },
  { id: "contact", path: "/contact", label: "Contact", aliases: [] },
];

export const TYPING_WORDS = [
  "AI Engineer",
  "Cybersecurity Enthusiast",
  "Full Stack Developer",
  "ML Builder",
];

export const SKILLS = [
  { name: "Python", icon: "code", level: 90 },
  { name: "React", icon: "web", level: 85 },
  { name: "Next.js", icon: "javascript", level: 80 },
  { name: "FastAPI", icon: "api", level: 75 },
  { name: "Transformer", icon: "psychology", level: 80 },
  { name: "PyTorch", icon: "model_training", level: 70 },
  { name: "PostgreSQL", icon: "database", level: 85 },
  { name: "Docker", icon: "view_in_ar", level: 75 },
  { name: "Linux", icon: "terminal", level: 90 },
  { name: "Cybersecurity", icon: "security", level: 80 },
];

export const PROJECTS = [
  {
    title: "Smart Vehicle Assistance platform",
    visual: "/projects/ride-relief.png",
    badge: "STATUS: ACTIVE",
    description:
      "AI-powered emergency mobility and roadside assistance platform with PWA architecture, real-time services, Firebase backend, and modern mobile-first experience.",
    tech: ["React", "FastAPI", "MongoDB", "AI"],
    github: "https://github.com/KALITH2006/Ride_Relief",
    demo: "https://ride-relief-tkm.vercel.app",
  },
  {
    title: "Smart Berth Allocation System",
    visual: "/berth_allocation.svg",
    badge: "STATUS: ACTIVE",
    description:
      "A full-stack berth management platform developed using React frontend, Flask REST API, SQL Server database, and Tkinter desktop dashboard. Designed for real-time vessel tracking, berth scheduling, analytics visualization, and secure port automation workflows.",
    tech: ["React", "Flask API", "SQL Server", "Tkinter", "Python", "Tailwind CSS"],
    github: "https://github.com/KALITH2006/Smart_Berth_Allocation",
    demo: null,
  },
  {
    title: "AI Chat Summariser",
    visual: "nlp",
    badge: "NLP PROJECT",
    description:
      "Advanced NLP-powered tool for analyzing and summarizing AI conversations with emotion detection and session passport generation using BART, go_emotions, and KeyBERT.",
    tech: ["FastAPI", "PyTorch", "BART", "Transformers"],
    github: "https://github.com/KALITH2006/AI_Chat_Summariser",
    demo: null,
  },
];

PROJECTS.push({
  title: "Smart Automobile User Manual Assistant",
  visual: "/projects/manual-assistant.png",
  badge: "RAG PROJECT",
  description:
    "Upload a vehicle owner's manual and ask questions in plain English. A RAG system with adaptive retrieval (BM25 + dense search, query routing) returns step-by-step answers with exact manual page citations, and abstains when the evidence is too weak.",
  tech: ["FastAPI", "LangChain", "ChromaDB", "Next.js", "Ollama", "Docker"],
  github: "https://github.com/KALITH2006/vehicle-manual-assistant",
  demo: null,
});

PROJECTS.push({
  title: "Repo Atlas",
  visual: "/projects/repo-atlas.png",
  badge: "WEB APP",
  description:
    "Discover the most popular GitHub repositories by field without digging through GitHub. Twelve domains (AI, ML, Cybersecurity, Robotics and more) plus free-text search, filtering, sorting and CSV export, powered by the GitHub Search API with caching and rate-limit fallback.",
  tech: ["Flask", "Python", "GitHub API", "JavaScript", "Vercel"],
  github: "https://github.com/KALITH2006/repo-atlas",
  demo: null,
});

export const CERT_CATEGORIES = ["AI & ML", "Generative AI", "Data & Analytics", "Programming & Cloud"];

// date: "YYYY-MM" (used for sorting); file: served from /public/certificates
export const CERTIFICATIONS = [
  { title: "Applied AI Specialization (6 courses)", issuer: "Vanderbilt University", via: "Coursera", category: "Generative AI", date: "2026-10", file: "applied-ai-specialization.pdf" },
  { title: "Deep Learning", issuer: "Illinois Tech", via: "Coursera", category: "AI & ML", date: "2026-09", file: "deep-learning.pdf" },
  { title: "Applied Generative AI & Prompt Engineering Mastery", issuer: "LearnKartS", via: "Coursera", category: "Generative AI", date: "2026-08", file: "applied-genai-prompt-engineering-mastery.pdf" },
  { title: "Data Analysis with Python", issuer: "freeCodeCamp", category: "Data & Analytics", date: "2026-04", file: "data-analysis-with-python.png" },
  { title: "Applications of GeoGebra Training", issuer: "IIT Bombay", via: "EduPyramids, SINE", category: "Programming & Cloud", date: "2026-03", file: "geogebra-iit-bombay.pdf" },
  { title: "Learn Java", issuer: "CodeChef", category: "Programming & Cloud", date: "2026-03", file: "learn-java-codechef.pdf" },
  { title: "GenAI Powered Data Analytics Job Simulation", issuer: "Forage", category: "Data & Analytics", date: "2025-07", file: "genai-data-analytics-forage.pdf" },
  { title: "AI Training", issuer: "Corizo", category: "AI & ML", date: "2025-07", file: "corizo-ai-training.pdf" },
  { title: "Linux Training", issuer: "IIT Bombay", via: "Spoken Tutorial", category: "Programming & Cloud", date: "2025-04", file: "linux-iit-bombay.pdf" },
  { title: "AWS S3 Basics", issuer: "Coursera Project Network", category: "Programming & Cloud", date: "2025-04", file: "aws-s3-basics.pdf" },
  { title: "Advanced C++ Training", issuer: "IIT Bombay", via: "Spoken Tutorial", category: "Programming & Cloud", date: "2025-02", file: "advanced-cpp-iit-bombay.pdf" },
  { title: "SQL (Basic)", issuer: "HackerRank", category: "Data & Analytics", date: "2024-09", file: "sql-basic-hackerrank.pdf" },
];

export const MAJOR_SUBJECTS = [
  "Machine Learning",
  "Deep Learning",
  "Data Structures",
  "Artificial Intelligence",
  "Data Mining",
  "NLP",
  "Python",
];

export const CONTACT = {
  name: "Mohamed Kalith K",
  email: "mohamedkalith687@gmail.com",
  phone: "+917639834962",
  whatsapp: "917639834962",
  location: "Chennai,Tamil Nadu,India",
  linkedin: "https://www.linkedin.com/in/mohamed-kalith-",
  github: "https://github.com/KALITH2006",
};

// Tape cover art for the Home carousel.
const TAPES = {
  "Smart Vehicle Assistance platform": { tagline: "AI roadside assistance and emergency mobility, built as a PWA.", short: ["RIDE", "RELIEF"], year: "2025", tone: "#ff3131" },
  "Smart Berth Allocation System": { tagline: "Real-time vessel tracking and berth scheduling for port automation.", short: ["SMART", "BERTH"], year: "2025", tone: "#d8c24a" },
  "AI Chat Summariser": { tagline: "NLP summaries, emotion detection and session passports for AI chats.", short: ["CHAT", "SUMMARY"], year: "2026", tone: "#6d6ff5" },
  "Smart Automobile User Manual Assistant": { tagline: "Ask a vehicle manual anything and get answers cited to the exact pages.", short: ["MANUAL", "ASSIST"], year: "2026", tone: "#41d392" },
  "Repo Atlas": { tagline: "Discover the most popular GitHub repositories by field.", short: ["REPO", "ATLAS"], year: "2026", tone: "#4fb8e0" },
};
PROJECTS.forEach((p) => Object.assign(p, TAPES[p.title]));

export const INTERNSHIPS = [
  {
    org: "MedFits",
    role: "IT Intern",
    period: "March 2026 – May 2026",
    year: "2026",
    description:
      "Developed an intelligent AI Doctor Assistant for the MedFits healthcare platform to provide smart symptom analysis, health guidance, and AI-powered patient interaction experiences. Focused on scalable healthcare interfaces, conversational AI workflows, and secure backend integrations.",
    tech: ["Python", "FastAPI", "AI Chatbot", "NLP", "React", "Healthcare AI"],
    image: "/medfits.jpg",
    certificate: "/certificates/medfits-internship.pdf",
  },
  {
    org: "Chennai Port Authority",
    role: "Smart Automation Intern",
    period: "02 July 2025 – 16 July 2025",
    year: "2025",
    description:
      "Contributed to intelligent maritime automation and smart berth management systems. Built automation workflows and berth allocation solutions using Python, SQL Server and analytics tools to improve operational efficiency, streamline vessel tracking and optimise port management.",
    tech: ["Python", "SQL Server", "CustomTkinter", "PyODBC", "Pandas", "Excel Automation"],
    image: "/chennai_port.png",
    certificate: "/certificates/chennai-port-internship.jpg",
  },
  {
    org: "Corizo",
    role: "Artificial Intelligence Intern",
    period: "05 June 2025 – 05 July 2025",
    year: "2025",
    description:
      "Completed a one-month Artificial Intelligence internship at Corizo (certificate issued with IIT Bombay's Mood Indigo), after finishing the AI training programme there. Recognised for diligence, consistency, determination and active participation.",
    tech: ["Artificial Intelligence", "Machine Learning", "Python"],
    image: "/projects/corizo-internship.jpg",
    certificate: "/certificates/corizo-ai-internship.pdf",
  },
  {
    org: "Cognifyz Technologies",
    role: "Machine Learning Intern",
    period: "May 2025 – June 2025",
    year: "2025",
    description:
      "Worked as a Machine Learning Intern at Cognifyz Technologies. The internship letter credits dedication, strong coordination and communication skills, and attention to detail.",
    tech: ["Machine Learning", "Python"],
    image: "/projects/cognifyz-internship.jpg",
    certificate: "/certificates/cognifyz-ml-internship.pdf",
  },
];

export const SKILL_GROUPS = [
  { title: "Languages & Systems", skills: ["Python", "Linux"] },
  { title: "Web & APIs", skills: ["React", "Next.js", "FastAPI"] },
  { title: "AI & ML", skills: ["PyTorch", "Transformer"] },
  { title: "Data & Infra", skills: ["PostgreSQL", "Docker"] },
  { title: "Security", skills: ["Cybersecurity"] },
];

// URL fragment for each placement, e.g. /internships#medfits
INTERNSHIPS.forEach((it) => {
  it.slug = it.org.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
});
