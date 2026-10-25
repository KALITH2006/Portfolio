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
    github: "https://github.com/KALITH2006/Claude_Chat_Summariser",
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
  { title: "Machine Learning A-Z", issuer: "Udemy", category: "AI & ML" },
  { title: "Data Mining in R", issuer: "Infosys Springboard", category: "Data & Analytics" },
  { title: "Business Intelligence", issuer: "Infosys Springboard", category: "Data & Analytics" },
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
