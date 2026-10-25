export const NAV_LINKS = [
  { id: "hero", path: "/", label: "About" },
  { id: "skills", path: "/skills", label: "Skills" },
  { id: "projects", path: "/projects", label: "Projects" },
  { id: "experience", path: "/internships", label: "Internships" },
  { id: "education-certifications", path: "/certifications", label: "Certifications" },
  { id: "contact", path: "/contact", label: "Contact" },
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
    visual: "ride",
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
    github: "https://github.com/KALITH2006/Claude_Chat_Summariser",
    demo: null,
  },
];

PROJECTS.push({
  title: "Smart Automobile User Manual Assistant",
  visual: "manual",
  badge: "RAG PROJECT",
  description:
    "Upload a vehicle owner's manual and ask questions in plain English. A RAG system with adaptive retrieval (BM25 + dense search, query routing) returns step-by-step answers with exact manual page citations, and abstains when the evidence is too weak.",
  tech: ["FastAPI", "LangChain", "ChromaDB", "Next.js", "Ollama", "Docker"],
  github: "https://github.com/KALITH2006/vehicle-manual-assistant",
  demo: null,
});

export const CERTIFICATIONS = [
  { icon: "cloud", color: "text-primary-container", issuer: "Coursera", title: "AWS Project Network", sub: "Cloud & Project Infrastructure" },
  { icon: "psychology_alt", color: "text-secondary", issuer: "Udemy", title: "Machine Learning A-Z", sub: "Machine Learning & AI Engineering" },
  { icon: "analytics", color: "text-cyan-300", issuer: "Forage", title: "GenAI Data Analytics", sub: "AI Analytics & Risk Profiling" },
  { icon: "dataset", color: "text-primary-container", issuer: "Infosys", title: "Data Mining in R", sub: "Data Analytics & Mining" },
  { icon: "monitoring", color: "text-primary-container", issuer: "Infosys", title: "Business Intelligence", sub: "Data Visualization & Decision Intelligence" },
  { icon: "database", color: "text-green-300", issuer: "HackerRank", title: "SQL (Basic)", sub: "SQL Queries & Relational Databases" },
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
  location: "Chennai,Tamil Nadu,India",
  linkedin: "https://www.linkedin.com/in/mohamed-kalith-",
  github: "https://github.com/KALITH2006",
};
