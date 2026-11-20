import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import {
  DEFAULT_PORTFOLIO_DATA,
  getStoredPortfolio,
  loadPortfolioWithRemote,
  saveStoredPortfolio,
  PORTFOLIO_SYNC_EVENT,
  type PortfolioData,
  type ProjectItem,
  type SkillItem,
  type AboutData,
  type AchievementItem,
  type CertificateItem,
  type ActivityItem,
  type ContactData,
} from "@/lib/portfolio-store";
import {
  getAdminSession,
  loginAdmin,
  logoutAdmin,
  subscribeAdminAuth,
  type AdminUser,
} from "@/lib/admin-auth";
import { toast } from "sonner";

export type PortfolioContextType = {
  portfolio: PortfolioData;
  isLoading: boolean;
  isAdmin: boolean;
  adminUser: AdminUser | null;
  login: (
    email: string,
    pass: string
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
  savePortfolio: (data: PortfolioData) => Promise<void>;

  // Project CRUD
  addProject: (
    p: Omit<ProjectItem, "id" | "createdAt" | "updatedAt">
  ) => Promise<void>;
  updateProject: (id: string, updates: Partial<ProjectItem>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  toggleProjectPublish: (id: string) => Promise<void>;

  // Skill CRUD
  addSkill: (s: Omit<SkillItem, "id">) => Promise<void>;
  updateSkill: (id: string, updates: Partial<SkillItem>) => Promise<void>;
  deleteSkill: (id: string) => Promise<void>;
  toggleSkillVisibility: (id: string) => Promise<void>;

  // About CRUD
  updateAbout: (updates: Partial<AboutData>) => Promise<void>;

  // Achievements CRUD
  addAchievement: (
    a: Omit<AchievementItem, "id" | "updatedAt">
  ) => Promise<void>;
  updateAchievement: (
    id: string,
    updates: Partial<AchievementItem>
  ) => Promise<void>;
  deleteAchievement: (id: string) => Promise<void>;

  // Certifications CRUD
  addCertificate: (
    c: Omit<CertificateItem, "id" | "updatedAt">
  ) => Promise<void>;
  updateCertificate: (
    id: string,
    updates: Partial<CertificateItem>
  ) => Promise<void>;
  deleteCertificate: (id: string) => Promise<void>;

  // Activities CRUD
  addActivity: (a: Omit<ActivityItem, "id" | "updatedAt">) => Promise<void>;
  updateActivity: (id: string, updates: Partial<ActivityItem>) => Promise<void>;
  deleteActivity: (id: string) => Promise<void>;

  // Contact info
  updateContact: (updates: Partial<ContactData>) => Promise<void>;
};

const PortfolioContext = createContext<PortfolioContextType | undefined>(
  undefined
);

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [portfolio, setPortfolio] = useState<PortfolioData>(
    () => getStoredPortfolio()
  );
  const [isLoading, setIsLoading] = useState(true);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(() =>
    getAdminSession()
  );

  // Sync auth state
  useEffect(() => {
    const unsub = subscribeAdminAuth((user) => {
      setAdminUser(user);
    });
    return unsub;
  }, []);

  // Sync portfolio data
  useEffect(() => {
    let mounted = true;
    loadPortfolioWithRemote()
      .then((data) => {
        if (mounted) {
          setPortfolio(data);
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (mounted) setIsLoading(false);
      });

    const handleSync = (e: Event) => {
      const custom = e as CustomEvent<PortfolioData>;
      if (custom.detail) {
        setPortfolio(custom.detail);
      }
    };

    window.addEventListener(PORTFOLIO_SYNC_EVENT, handleSync);
    return () => {
      mounted = false;
      window.removeEventListener(PORTFOLIO_SYNC_EVENT, handleSync);
    };
  }, []);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    const data = await loadPortfolioWithRemote();
    setPortfolio(data);
    setIsLoading(false);
  }, []);

  const savePortfolio = useCallback(
    async (newData: PortfolioData) => {
      setPortfolio(newData);
      await saveStoredPortfolio(newData);
    },
    []
  );

  const login = useCallback(async (email: string, pass: string) => {
    const res = await loginAdmin(email, pass);
    if (res.success && res.user) {
      setAdminUser(res.user);
      toast.success("Welcome back, Administrator!");
    }
    return res;
  }, []);

  const logout = useCallback(async () => {
    await logoutAdmin();
    setAdminUser(null);
    toast.info("Logged out successfully.");
  }, []);

  // Project CRUD
  const addProject = useCallback(
    async (p: Omit<ProjectItem, "id" | "createdAt" | "updatedAt">) => {
      const now = new Date().toISOString();
      const newProj: ProjectItem = {
        ...p,
        id: `proj-${Date.now()}`,
        createdAt: now,
        updatedAt: now,
      };
      const updated = {
        ...portfolio,
        projects: [newProj, ...portfolio.projects],
      };
      await savePortfolio(updated);
      toast.success(`Project "${newProj.title}" added successfully!`);
    },
    [portfolio, savePortfolio]
  );

  const updateProject = useCallback(
    async (id: string, updates: Partial<ProjectItem>) => {
      const updated = {
        ...portfolio,
        projects: portfolio.projects.map((item) =>
          item.id === id
            ? { ...item, ...updates, updatedAt: new Date().toISOString() }
            : item
        ),
      };
      await savePortfolio(updated);
      toast.success("Project updated successfully!");
    },
    [portfolio, savePortfolio]
  );

  const deleteProject = useCallback(
    async (id: string) => {
      const proj = portfolio.projects.find((p) => p.id === id);
      const updated = {
        ...portfolio,
        projects: portfolio.projects.filter((item) => item.id !== id),
      };
      await savePortfolio(updated);
      toast.success(`Project "${proj?.title ?? ""}" deleted.`);
    },
    [portfolio, savePortfolio]
  );

  const toggleProjectPublish = useCallback(
    async (id: string) => {
      const proj = portfolio.projects.find((p) => p.id === id);
      if (!proj) return;
      const nextState = !proj.published;
      await updateProject(id, { published: nextState });
      toast.info(
        `Project "${proj.title}" is now ${
          nextState ? "published" : "in drafts"
        }.`
      );
    },
    [portfolio, updateProject]
  );

  // Skill CRUD
  const addSkill = useCallback(
    async (s: Omit<SkillItem, "id">) => {
      const newSkill: SkillItem = {
        ...s,
        id: `skill-${Date.now()}`,
      };
      const updated = {
        ...portfolio,
        skills: [...portfolio.skills, newSkill],
      };
      await savePortfolio(updated);
      toast.success(`Skill "${newSkill.name}" added!`);
    },
    [portfolio, savePortfolio]
  );

  const updateSkill = useCallback(
    async (id: string, updates: Partial<SkillItem>) => {
      const updated = {
        ...portfolio,
        skills: portfolio.skills.map((item) =>
          item.id === id ? { ...item, ...updates } : item
        ),
      };
      await savePortfolio(updated);
      toast.success("Skill updated!");
    },
    [portfolio, savePortfolio]
  );

  const deleteSkill = useCallback(
    async (id: string) => {
      const item = portfolio.skills.find((s) => s.id === id);
      const updated = {
        ...portfolio,
        skills: portfolio.skills.filter((s) => s.id !== id),
      };
      await savePortfolio(updated);
      toast.success(`Skill "${item?.name ?? ""}" deleted.`);
    },
    [portfolio, savePortfolio]
  );

  const toggleSkillVisibility = useCallback(
    async (id: string) => {
      const skill = portfolio.skills.find((s) => s.id === id);
      if (!skill) return;
      await updateSkill(id, { visible: !skill.visible });
      toast.info(`Skill "${skill.name}" is now ${!skill.visible ? "visible" : "hidden"}.`);
    },
    [portfolio, updateSkill]
  );

  // About CRUD
  const updateAbout = useCallback(
    async (updates: Partial<AboutData>) => {
      const updated = {
        ...portfolio,
        about: { ...portfolio.about, ...updates },
      };
      await savePortfolio(updated);
      toast.success("About Me updated successfully!");
    },
    [portfolio, savePortfolio]
  );

  // Achievements CRUD
  const addAchievement = useCallback(
    async (a: Omit<AchievementItem, "id" | "updatedAt">) => {
      const newAch: AchievementItem = {
        ...a,
        id: `ach-${Date.now()}`,
        updatedAt: new Date().toISOString(),
      };
      const updated = {
        ...portfolio,
        achievements: [...portfolio.achievements, newAch],
      };
      await savePortfolio(updated);
      toast.success(`Achievement "${newAch.title}" added!`);
    },
    [portfolio, savePortfolio]
  );

  const updateAchievement = useCallback(
    async (id: string, updates: Partial<AchievementItem>) => {
      const updated = {
        ...portfolio,
        achievements: portfolio.achievements.map((item) =>
          item.id === id
            ? { ...item, ...updates, updatedAt: new Date().toISOString() }
            : item
        ),
      };
      await savePortfolio(updated);
      toast.success("Achievement updated!");
    },
    [portfolio, savePortfolio]
  );

  const deleteAchievement = useCallback(
    async (id: string) => {
      const item = portfolio.achievements.find((a) => a.id === id);
      const updated = {
        ...portfolio,
        achievements: portfolio.achievements.filter((a) => a.id !== id),
      };
      await savePortfolio(updated);
      toast.success(`Achievement "${item?.title ?? ""}" deleted.`);
    },
    [portfolio, savePortfolio]
  );

  // Certifications CRUD
  const addCertificate = useCallback(
    async (c: Omit<CertificateItem, "id" | "updatedAt">) => {
      const newCert: CertificateItem = {
        ...c,
        id: `cert-${Date.now()}`,
        updatedAt: new Date().toISOString(),
      };
      const updated = {
        ...portfolio,
        certificates: [...portfolio.certificates, newCert],
      };
      await savePortfolio(updated);
      toast.success(`Certificate "${newCert.title}" added!`);
    },
    [portfolio, savePortfolio]
  );

  const updateCertificate = useCallback(
    async (id: string, updates: Partial<CertificateItem>) => {
      const updated = {
        ...portfolio,
        certificates: portfolio.certificates.map((item) =>
          item.id === id
            ? { ...item, ...updates, updatedAt: new Date().toISOString() }
            : item
        ),
      };
      await savePortfolio(updated);
      toast.success("Certificate updated!");
    },
    [portfolio, savePortfolio]
  );

  const deleteCertificate = useCallback(
    async (id: string) => {
      const item = portfolio.certificates.find((c) => c.id === id);
      const updated = {
        ...portfolio,
        certificates: portfolio.certificates.filter((c) => c.id !== id),
      };
      await savePortfolio(updated);
      toast.success(`Certificate "${item?.title ?? ""}" deleted.`);
    },
    [portfolio, savePortfolio]
  );

  // Activities CRUD
  const addActivity = useCallback(
    async (a: Omit<ActivityItem, "id" | "updatedAt">) => {
      const newAct: ActivityItem = {
        ...a,
        id: `act-${Date.now()}`,
        updatedAt: new Date().toISOString(),
      };
      const updated = {
        ...portfolio,
        activities: [...portfolio.activities, newAct],
      };
      await savePortfolio(updated);
      toast.success(`Activity "${newAct.name}" added!`);
    },
    [portfolio, savePortfolio]
  );

  const updateActivity = useCallback(
    async (id: string, updates: Partial<ActivityItem>) => {
      const updated = {
        ...portfolio,
        activities: portfolio.activities.map((item) =>
          item.id === id
            ? { ...item, ...updates, updatedAt: new Date().toISOString() }
            : item
        ),
      };
      await savePortfolio(updated);
      toast.success("Activity updated!");
    },
    [portfolio, savePortfolio]
  );

  const deleteActivity = useCallback(
    async (id: string) => {
      const item = portfolio.activities.find((a) => a.id === id);
      const updated = {
        ...portfolio,
        activities: portfolio.activities.filter((a) => a.id !== id),
      };
      await savePortfolio(updated);
      toast.success(`Activity "${item?.name ?? ""}" deleted.`);
    },
    [portfolio, savePortfolio]
  );

  // Contact info
  const updateContact = useCallback(
    async (updates: Partial<ContactData>) => {
      const updated = {
        ...portfolio,
        contact: { ...portfolio.contact, ...updates },
      };
      await savePortfolio(updated);
      toast.success("Contact information updated!");
    },
    [portfolio, savePortfolio]
  );

  const value: PortfolioContextType = {
    portfolio,
    isLoading,
    isAdmin: Boolean(adminUser),
    adminUser,
    login,
    logout,
    refresh,
    savePortfolio,
    addProject,
    updateProject,
    deleteProject,
    toggleProjectPublish,
    addSkill,
    updateSkill,
    deleteSkill,
    toggleSkillVisibility,
    updateAbout,
    addAchievement,
    updateAchievement,
    deleteAchievement,
    addCertificate,
    updateCertificate,
    deleteCertificate,
    addActivity,
    updateActivity,
    deleteActivity,
    updateContact,
  };

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    // Graceful fallback for non-provider or SSR environments
    return {
      portfolio: DEFAULT_PORTFOLIO_DATA,
      isLoading: false,
      isAdmin: false,
      adminUser: null,
      login: async () => ({ success: false, error: "Provider not mounted" }),
      logout: async () => {},
      refresh: async () => {},
      savePortfolio: async () => {},
      addProject: async () => {},
      updateProject: async () => {},
      deleteProject: async () => {},
      toggleProjectPublish: async () => {},
      addSkill: async () => {},
      updateSkill: async () => {},
      deleteSkill: async () => {},
      toggleSkillVisibility: async () => {},
      updateAbout: async () => {},
      addAchievement: async () => {},
      updateAchievement: async () => {},
      deleteAchievement: async () => {},
      addCertificate: async () => {},
      updateCertificate: async () => {},
      deleteCertificate: async () => {},
      addActivity: async () => {},
      updateActivity: async () => {},
      deleteActivity: async () => {},
      updateContact: async () => {},
    };
  }
  return context;
}
