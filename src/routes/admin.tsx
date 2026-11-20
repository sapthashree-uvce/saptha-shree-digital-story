import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { usePortfolio } from "@/context/PortfolioContext";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { AdminSidebar, type AdminTab } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { DashboardOverview } from "@/components/admin/DashboardOverview";
import { ManageProjects } from "@/components/admin/ManageProjects";
import { ManageSkills } from "@/components/admin/ManageSkills";
import { ManageAbout } from "@/components/admin/ManageAbout";
import { ManageAchievements } from "@/components/admin/ManageAchievements";
import { ManageCertifications } from "@/components/admin/ManageCertifications";
import { ManageActivities } from "@/components/admin/ManageActivities";
import { ManageContact } from "@/components/admin/ManageContact";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Management — Saptha Shree Portfolio" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const { isAdmin, isLoading } = usePortfolio();
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // If loading and not sure yet
  if (isLoading && typeof window === "undefined") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="size-8 animate-spin text-primary" />
      </div>
    );
  }

  // Not authenticated -> show Admin Login
  if (!isAdmin) {
    return <AdminLogin />;
  }

  // Authenticated -> render Integrated Admin Management Dashboard
  return (
    <div className="flex min-h-screen bg-background font-sans text-foreground">
      {/* Integrated Admin Sidebar */}
      <AdminSidebar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      {/* Main Admin Content Region */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <AdminHeader
          activeTab={activeTab}
          onOpenMobile={() => setMobileSidebarOpen(true)}
        />

        <main className="flex-1 overflow-y-auto bg-muted/20">
          <div className="mx-auto max-w-7xl">
            {activeTab === "overview" && (
              <DashboardOverview onNavigateTab={setActiveTab} />
            )}
            {activeTab === "projects" && <ManageProjects />}
            {activeTab === "skills" && <ManageSkills />}
            {activeTab === "about" && <ManageAbout />}
            {activeTab === "achievements" && <ManageAchievements />}
            {activeTab === "certifications" && <ManageCertifications />}
            {activeTab === "activities" && <ManageActivities />}
            {activeTab === "contact" && <ManageContact />}
          </div>
        </main>
      </div>
    </div>
  );
}
