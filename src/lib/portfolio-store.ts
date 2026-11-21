import { supabase } from "@/integrations/supabase/client";
import type { Json } from "@/integrations/supabase/types";
import {
  ABOUT_FACTS,
  ACHIEVEMENT,
  CERTIFICATES,
  DESIGN_TEAMS,
  EVENTS,
  HOBBIES,
  INTERESTS,
  PROFILE,
  PROJECTS,
  SKILL_GROUPS,
  type SkillIcon,
} from "./portfolio-data";

export type ProjectItem = {
  id: string;
  number: string;
  title: string;
  category: string;
  subtitle: string;
  description: string;
  contribution: string;
  tags: string[];
  github: string;
  githubLabel: string;
  liveUrl?: string;
  imageUrl?: string;
  status: "completed" | "ongoing";
  featured: boolean;
  published: boolean;
  createdAt: string;
  updatedAt: string;
};

export type SkillItem = {
  id: string;
  name: string;
  category: string;
  icon: SkillIcon;
  description?: string;
  displayOrder: number;
  visible: boolean;
};

export type AboutFact = {
  label: string;
  value: string;
};

export type AboutData = {
  headline: string;
  subheadline: string;
  bioParagraphs: string[];
  facts: AboutFact[];
  hobbies: string[];
  profileImage?: string;
  resumeUrl: string | null;
};

export type AchievementItem = {
  id: string;
  title: string;
  result: string;
  description?: string;
  published: boolean;
  updatedAt: string;
};

export type CertificateItem = {
  id: string;
  title: string;
  issuer: string;
  url: string | null;
  date?: string;
  published: boolean;
  updatedAt: string;
};

export type ActivityItem = {
  id: string;
  type: "team" | "event";
  name: string;
  roleOrKind: string;
  description?: string;
  published: boolean;
  updatedAt: string;
};

export type ContactData = {
  name: string;
  brand: string;
  email: string;
  githubUser: string;
  github: string;
  linkedin: string;
  resumeUrl: string | null;
  additionalLinks?: { label: string; url: string }[];
};

export type PortfolioData = {
  projects: ProjectItem[];
  skills: SkillItem[];
  skillCategories: string[];
  interests: string[];
  about: AboutData;
  achievements: AchievementItem[];
  certificates: CertificateItem[];
  activities: ActivityItem[];
  contact: ContactData;
};

export const DEFAULT_SKILL_CATEGORIES = [
  "Programming Languages",
  "Libraries and Frameworks",
  "Data Science Tools",
  "Development Tools",
  "Design Tools",
  "Areas of Interest",
];

// Initialize default skills from existing skill groups
const initialSkills: SkillItem[] = [];
let skillCounter = 1;
SKILL_GROUPS.forEach((group) => {
  group.skills.forEach((s) => {
    initialSkills.push({
      id: `skill-${skillCounter}`,
      name: s.name,
      category:
        group.title === "Python Libraries & Data Science"
          ? "Libraries and Frameworks"
          : group.title === "Development & Tools"
          ? "Development Tools"
          : group.title === "Design & Productivity"
          ? "Design Tools"
          : group.title,
      icon: s.icon,
      displayOrder: skillCounter,
      visible: true,
    });
    skillCounter++;
  });
});

export const DEFAULT_PORTFOLIO_DATA: PortfolioData = {
  projects: PROJECTS.map((p, idx) => ({
    id: `project-${idx + 1}`,
    number: p.number,
    title: p.title,
    category: idx === 0 ? "Frontend & IoT" : "Computer Vision",
    subtitle: p.subtitle,
    description: p.description,
    contribution: p.contribution,
    tags: [...p.tags],
    github: p.github,
    githubLabel: p.githubLabel,
    liveUrl: "",
    status: p.status,
    featured: true,
    published: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  })),
  skills: initialSkills,
  skillCategories: DEFAULT_SKILL_CATEGORIES,
  interests: [...INTERESTS],
  about: {
    headline: "A little about me.",
    subheadline:
      "Second-year student at UVCE, Bengaluru · Aspiring Data Engineer",
    bioParagraphs: [
      "I'm Saptha Shree, a second-year Artificial Intelligence and Data Science student at UVCE, Bengaluru.",
      "I enjoy exploring technology, understanding how things work, and transforming ideas into practical solutions. My interests include Data Engineering, Data Analytics, Artificial Intelligence and software development.",
      "I believe in learning by building, experimenting with new technologies, and continuously improving my skills.",
    ],
    facts: ABOUT_FACTS.map((f) => ({ label: f.label, value: f.value })),
    hobbies: [...HOBBIES],
    resumeUrl: PROFILE.resumeUrl,
  },
  achievements: [
    {
      id: "achieve-1",
      title: ACHIEVEMENT.title,
      result: ACHIEVEMENT.result,
      description: "Secured 1st place in Strategy Sprint competition.",
      published: true,
      updatedAt: new Date().toISOString(),
    },
  ],
  certificates: CERTIFICATES.map((c, i) => ({
    id: `cert-${i + 1}`,
    title: c.title,
    issuer: c.issuer,
    url: c.url,
    published: true,
    updatedAt: new Date().toISOString(),
  })),
  activities: [
    ...DESIGN_TEAMS.map((t, i) => ({
      id: `act-team-${i + 1}`,
      type: "team" as const,
      name: t.name,
      roleOrKind: t.role,
      description: "Active contributor to the design team.",
      published: true,
      updatedAt: new Date().toISOString(),
    })),
    ...EVENTS.map((e, i) => ({
      id: `act-event-${i + 1}`,
      type: "event" as const,
      name: e.name,
      roleOrKind: e.kind,
      description: `Participated in ${e.name} (${e.kind}).`,
      published: true,
      updatedAt: new Date().toISOString(),
    })),
  ],
  contact: {
    name: PROFILE.name,
    brand: PROFILE.brand,
    email: PROFILE.email,
    githubUser: PROFILE.githubUser,
    github: PROFILE.github,
    linkedin: PROFILE.linkedin,
    resumeUrl: PROFILE.resumeUrl,
    additionalLinks: [],
  },
};

export const PORTFOLIO_STORAGE_KEY = "saptha_portfolio_data_v1";
export const PORTFOLIO_SYNC_EVENT = "saptha_portfolio_sync";

// Fill any missing sections with defaults so older saved data keeps working
export function normalizePortfolio(
  parsed: Partial<PortfolioData> | null | undefined
): PortfolioData {
  if (!parsed) return DEFAULT_PORTFOLIO_DATA;
  return {
    ...DEFAULT_PORTFOLIO_DATA,
    ...parsed,
    projects: parsed.projects ?? DEFAULT_PORTFOLIO_DATA.projects,
    skills: parsed.skills ?? DEFAULT_PORTFOLIO_DATA.skills,
    skillCategories:
      parsed.skillCategories ?? DEFAULT_PORTFOLIO_DATA.skillCategories,
    interests: parsed.interests ?? DEFAULT_PORTFOLIO_DATA.interests,
    about: { ...DEFAULT_PORTFOLIO_DATA.about, ...(parsed.about ?? {}) },
    achievements: parsed.achievements ?? DEFAULT_PORTFOLIO_DATA.achievements,
    certificates: parsed.certificates ?? DEFAULT_PORTFOLIO_DATA.certificates,
    activities: parsed.activities ?? DEFAULT_PORTFOLIO_DATA.activities,
    contact: { ...DEFAULT_PORTFOLIO_DATA.contact, ...(parsed.contact ?? {}) },
  };
}

// Browser cache of the last data loaded from / saved to the database.
// It is only a fast first paint; the database row is the source of truth.
export function getStoredPortfolio(): PortfolioData {
  if (typeof window === "undefined") {
    return DEFAULT_PORTFOLIO_DATA;
  }
  try {
    const raw = localStorage.getItem(PORTFOLIO_STORAGE_KEY);
    if (!raw) return DEFAULT_PORTFOLIO_DATA;
    return normalizePortfolio(JSON.parse(raw) as Partial<PortfolioData>);
  } catch (e) {
    console.error("Failed to parse stored portfolio data:", e);
    return DEFAULT_PORTFOLIO_DATA;
  }
}

function cachePortfolio(data: PortfolioData) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(PORTFOLIO_STORAGE_KEY, JSON.stringify(data));
    window.dispatchEvent(
      new CustomEvent(PORTFOLIO_SYNC_EVENT, { detail: data })
    );
  } catch (e) {
    console.error("Failed to cache portfolio locally:", e);
  }
}

export const PORTFOLIO_ROW_ID = "main";

// Save to the database first; only cache locally once the database accepted it.
// Throws when the save fails so the dashboard never reports a false success.
export async function saveStoredPortfolio(
  data: PortfolioData
): Promise<PortfolioData> {
  const { data: userData } = await supabase.auth.getUser();
  const { error } = await supabase.from("portfolio_content").upsert({
    id: PORTFOLIO_ROW_ID,
    content: data as unknown as Json,
    updated_at: new Date().toISOString(),
    updated_by: userData.user?.id ?? null,
  });

  if (error) {
    console.error("Failed to save portfolio to the database:", error);
    throw new Error(
      error.code === "42501"
        ? "You are not signed in as an administrator, so the change was not saved."
        : `Could not save to the database: ${error.message}`
    );
  }

  cachePortfolio(data);
  return data;
}

// Returns the saved portfolio from the database, or null when nothing is saved yet.
// Throws on network/database errors.
export async function fetchRemotePortfolio(): Promise<PortfolioData | null> {
  const { data, error } = await supabase
    .from("portfolio_content")
    .select("content")
    .eq("id", PORTFOLIO_ROW_ID)
    .maybeSingle();
  if (error) throw error;
  if (!data?.content) return null;
  return normalizePortfolio(data.content as unknown as Partial<PortfolioData>);
}

// Fetch from the database with fallback to the local cache when offline
export async function loadPortfolioWithRemote(): Promise<PortfolioData> {
  try {
    const remote = await fetchRemotePortfolio();
    if (remote) {
      cachePortfolio(remote);
      return remote;
    }
    return DEFAULT_PORTFOLIO_DATA;
  } catch (err) {
    console.error("Could not load portfolio from the database:", err);
    return getStoredPortfolio();
  }
}
