export const PROFILE = {
  name: "Saptha Shree",
  brand: "SAPTHA",
  email: "sapthashree448@gmail.com",
  githubUser: "sapthashree-uvce",
  github: "https://github.com/sapthashree-uvce",
  linkedin: "https://www.linkedin.com/in/saptha-shree-949604385",
  /** Set to a same-origin path (e.g. "/downloads/Saptha_Shree_Resume.pdf") once the resume is added. */
  resumeUrl: null as string | null,
} as const;

export const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
] as const;

export const ABOUT_FACTS = [
  { label: "Education", value: "B.Tech – Artificial Intelligence and Data Science" },
  { label: "College", value: "UVCE, Bengaluru" },
  { label: "Academic Year", value: "Second Year" },
  { label: "CGPA", value: "9.67" },
  { label: "Career Interest", value: "Data Engineering" },
] as const;

export const HOBBIES = ["Chess", "Drawing", "Reading novels", "Open-source software"] as const;

export type SkillIcon = { kind: "brand"; slug: string } | { kind: "lucide"; name: string };

export type Skill = { name: string; icon: SkillIcon };

export const SKILL_GROUPS: { title: string; note: string; skills: Skill[] }[] = [
  {
    title: "Programming Languages",
    note: "The foundations",
    skills: [
      { name: "Python", icon: { kind: "brand", slug: "python" } },
      { name: "C++", icon: { kind: "brand", slug: "cplusplus" } },
      { name: "C", icon: { kind: "brand", slug: "c" } },
    ],
  },
  {
    title: "Python Libraries & Data Science",
    note: "Working with data",
    skills: [
      { name: "NumPy", icon: { kind: "brand", slug: "numpy" } },
      { name: "Pandas", icon: { kind: "brand", slug: "pandas" } },
      { name: "Matplotlib", icon: { kind: "lucide", name: "chart" } },
      { name: "Scikit-learn", icon: { kind: "brand", slug: "scikitlearn" } },
      { name: "Seaborn", icon: { kind: "lucide", name: "waves" } },
    ],
  },
  {
    title: "Development & Tools",
    note: "Everyday workflow",
    skills: [
      { name: "Git", icon: { kind: "brand", slug: "git" } },
      { name: "GitHub", icon: { kind: "brand", slug: "github" } },
      { name: "VS Code", icon: { kind: "lucide", name: "code" } },
      { name: "Jupyter Notebook", icon: { kind: "brand", slug: "jupyter" } },
      { name: "PyCharm", icon: { kind: "brand", slug: "pycharm" } },
      { name: "Thonny", icon: { kind: "lucide", name: "terminal" } },
      { name: "Ubuntu", icon: { kind: "brand", slug: "ubuntu" } },
    ],
  },
  {
    title: "Design & Productivity",
    note: "Ideas, presented",
    skills: [
      { name: "Canva", icon: { kind: "lucide", name: "palette" } },
      { name: "MS Word", icon: { kind: "lucide", name: "file" } },
      { name: "MS Excel", icon: { kind: "lucide", name: "sheet" } },
      { name: "MS PowerPoint", icon: { kind: "lucide", name: "presentation" } },
    ],
  },
];

export const INTERESTS = [
  "Data Engineering",
  "Data Analytics",
  "Artificial Intelligence",
  "Machine Learning",
  "Computer Vision",
  "Web Development",
] as const;

export type Project = {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  contribution: string;
  tags: string[];
  github: string;
  githubLabel: string;
  status: "completed" | "ongoing";
};

export const PROJECTS: Project[] = [
  {
    number: "01",
    title: "Lumen Sweep",
    subtitle: "Smart Solar Panel Autonomous Cleaning System",
    description:
      "A smart solar panel cleaning system designed to monitor dust accumulation and automate cleaning operations. Developed the frontend interface and dashboard to display solar panel monitoring information and cleaning status.",
    contribution: "Frontend development and dashboard design.",
    tags: ["HTML", "CSS", "React.js", "Node.js", "Python"],
    github: "https://github.com/sapthashree-uvce/Solar-panel--Lumen-Sweep",
    githubLabel: "View repository",
    status: "completed",
  },
  {
    number: "02",
    title: "Precision Landing",
    subtitle: "Using Computer Vision",
    description:
      "A computer-vision-based precision landing project that aims to identify landing markers and their coordinates using OpenCV, helping drones achieve accurate autonomous landing.",
    contribution: "Currently working on developing the vision-based landing marker detection system.",
    tags: ["Python", "OpenCV", "ArUco Marker Detection", "Ubuntu"],
    github: "https://github.com/sapthashree-uvce",
    githubLabel: "GitHub profile",
    status: "ongoing",
  },
];

export const MINI_PROJECTS = {
  title: "Python Mini Projects",
  description:
    "A collection of beginner-level Python projects developed to strengthen programming fundamentals and logical thinking.",
  items: [
    { name: "Calculator", hint: "Arithmetic & clean input handling" },
    { name: "Blackjack", hint: "Card logic, game loops" },
    { name: "Cipher (Secret Pattern)", hint: "Encoding & decoding text" },
    { name: "Higher and Lower Game", hint: "Comparisons & scoring" },
    { name: "Guess the Number Game", hint: "Randomness & conditionals" },
  ],
  tags: ["Python"],
  github: "https://github.com/sapthashree-uvce",
};

export const ACHIEVEMENT = { title: "Strategy Sprint", result: "1st Place" };

export const DESIGN_TEAMS = [
  { name: "Kutuhala UVCE", role: "Design Team" },
  { name: "E-Cell UVCE", role: "Design Team" },
] as const;

export const EVENTS = [
  { name: "Kagada", kind: "Event" },
  { name: "Impetus", kind: "Event" },
  { name: "Git and GitHub Workshop", kind: "Workshop" },
  { name: "Google Summer of Code (GSoC) Workshop", kind: "Workshop" },
  { name: "Hacking Workshop", kind: "Workshop" },
  { name: "Codefury", kind: "Event" },
] as const;

export type Certificate = { title: string; issuer: string; url: string | null };

/** URLs come only from the resume's embedded links. Leave null until confirmed — never guess. */
export const CERTIFICATES: Certificate[] = [
  { title: "Kagada", issuer: "IEEE UVCE", url: null },
  { title: "Codefury", issuer: "IEEE UVCE", url: null },
  { title: "Hacking Certificate", issuer: "Marvel UVCE", url: null },
  { title: "CTF – Hacking Workshop", issuer: "Marvel UVCE", url: null },
  { title: "Codepup Hackathon", issuer: "E-Cell", url: null },
];
