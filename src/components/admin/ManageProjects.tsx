import { useState } from "react";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Star,
  Github,
  Globe,
  CheckCircle,
  Clock,
  Sparkles,
} from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";
import type { ProjectItem } from "@/lib/portfolio-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

type ProjectFormData = {
  title: string;
  category: string;
  subtitle: string;
  description: string;
  contribution: string;
  tagsString: string;
  github: string;
  githubLabel: string;
  liveUrl: string;
  imageUrl: string;
  status: "completed" | "ongoing";
  featured: boolean;
  published: boolean;
};

const DEFAULT_FORM: ProjectFormData = {
  title: "",
  category: "Web Development",
  subtitle: "",
  description: "",
  contribution: "",
  tagsString: "React, Node.js, Python",
  github: "https://github.com/sapthashree-uvce",
  githubLabel: "View repository",
  liveUrl: "",
  imageUrl: "",
  status: "completed",
  featured: false,
  published: true,
};

export function ManageProjects() {
  const { portfolio, addProject, updateProject, deleteProject, toggleProjectPublish } =
    usePortfolio();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<ProjectFormData>(DEFAULT_FORM);

  const [deleteTarget, setDeleteTarget] = useState<ProjectItem | null>(null);

  // Filter projects
  const filteredProjects = portfolio.projects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      (p.category || "").toLowerCase().includes(search.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));

    if (!matchesSearch) return false;

    if (statusFilter === "published") return p.published;
    if (statusFilter === "draft") return !p.published;
    if (statusFilter === "completed") return p.status === "completed";
    if (statusFilter === "ongoing") return p.status === "ongoing";
    if (statusFilter === "featured") return p.featured;

    return true;
  });

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData(DEFAULT_FORM);
    setDialogOpen(true);
  };

  const handleOpenEdit = (project: ProjectItem) => {
    setEditingId(project.id);
    setFormData({
      title: project.title,
      category: project.category || "General",
      subtitle: project.subtitle || "",
      description: project.description || "",
      contribution: project.contribution || "",
      tagsString: project.tags.join(", "),
      github: project.github || "",
      githubLabel: project.githubLabel || "View repository",
      liveUrl: project.liveUrl || "",
      imageUrl: project.imageUrl || "",
      status: project.status || "completed",
      featured: Boolean(project.featured),
      published: Boolean(project.published),
    });
    setDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const tags = formData.tagsString
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    if (editingId) {
      await updateProject(editingId, {
        title: formData.title,
        category: formData.category,
        subtitle: formData.subtitle,
        description: formData.description,
        contribution: formData.contribution,
        tags,
        github: formData.github,
        githubLabel: formData.githubLabel,
        liveUrl: formData.liveUrl,
        imageUrl: formData.imageUrl,
        status: formData.status,
        featured: formData.featured,
        published: formData.published,
      });
    } else {
      const nextNumber = String(portfolio.projects.length + 1).padStart(2, "0");
      await addProject({
        number: nextNumber,
        title: formData.title,
        category: formData.category,
        subtitle: formData.subtitle,
        description: formData.description,
        contribution: formData.contribution,
        tags,
        github: formData.github,
        githubLabel: formData.githubLabel,
        liveUrl: formData.liveUrl,
        imageUrl: formData.imageUrl,
        status: formData.status,
        featured: formData.featured,
        published: formData.published,
      });
    }

    setDialogOpen(false);
  };

  const confirmDelete = async () => {
    if (deleteTarget) {
      await deleteProject(deleteTarget.id);
      setDeleteTarget(null);
    }
  };

  return (
    <div className="space-y-6 p-5 sm:p-8">
      {/* Header Toolbar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-foreground">
            Projects Portfolio ({portfolio.projects.length})
          </h2>
          <p className="text-sm text-muted-foreground">
            Manage your featured builds, descriptions, live demo links and visibility.
          </p>
        </div>

        <Button
          onClick={handleOpenAdd}
          className="h-11 rounded-full bg-primary px-6 font-bold text-primary-foreground shadow-orange hover:bg-primary/90"
        >
          <Plus className="mr-2 size-4" /> Add Project
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-3 size-4 text-muted-foreground" />
          <Input
            placeholder="Search projects by title, category, or technology..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-10 rounded-xl pl-9"
          />
        </div>

        <div className="w-full sm:w-52">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="h-10 rounded-xl">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Projects</SelectItem>
              <SelectItem value="published">Published Only</SelectItem>
              <SelectItem value="draft">Drafts Only</SelectItem>
              <SelectItem value="featured">Featured Only</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="ongoing">Ongoing</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Projects Management Table */}
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
        {filteredProjects.length === 0 ? (
          <div className="py-16 text-center">
            <p className="font-display text-lg font-bold text-foreground">No projects found</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {search
                ? "Try adjusting your search or status filter."
                : "Get started by adding your first project."}
            </p>
            <Button
              onClick={handleOpenAdd}
              variant="outline"
              className="mt-4 rounded-full"
            >
              <Plus className="mr-2 size-4" /> Add Project
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-border bg-muted/40 text-xs uppercase text-muted-foreground">
                <tr>
                  <th className="px-6 py-4 font-bold"># / Title</th>
                  <th className="px-6 py-4 font-bold">Category</th>
                  <th className="px-6 py-4 font-bold">Technologies</th>
                  <th className="px-6 py-4 font-bold">Status</th>
                  <th className="px-6 py-4 font-bold">Featured</th>
                  <th className="px-6 py-4 font-bold">Visibility</th>
                  <th className="px-6 py-4 text-right font-bold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredProjects.map((p, idx) => (
                  <tr
                    key={p.id}
                    className="transition-colors hover:bg-muted/30"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="font-display text-sm font-bold text-primary">
                          {p.number || String(idx + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <p className="font-display text-base font-bold text-foreground">
                            {p.title}
                          </p>
                          <p className="line-clamp-1 max-w-xs text-xs text-muted-foreground">
                            {p.subtitle || p.description}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span className="rounded-md bg-muted px-2.5 py-1 text-xs font-semibold text-foreground">
                        {p.category || "General"}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {p.tags.slice(0, 3).map((t) => (
                          <span
                            key={t}
                            className="rounded-full border border-border px-2 py-0.5 text-[10px] text-muted-foreground"
                          >
                            {t}
                          </span>
                        ))}
                        {p.tags.length > 3 && (
                          <span className="text-[10px] text-muted-foreground">
                            +{p.tags.length - 3}
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      {p.status === "ongoing" ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                          <Clock className="size-3" /> Ongoing
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                          <CheckCircle className="size-3" /> Completed
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-4">
                      <button
                        type="button"
                        onClick={() => updateProject(p.id, { featured: !p.featured })}
                        className="rounded-lg p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
                        title={p.featured ? "Featured on Hero / Top" : "Mark as featured"}
                      >
                        <Star
                          className={`size-4 ${
                            p.featured
                              ? "fill-primary text-primary"
                              : "text-muted-foreground"
                          }`}
                        />
                      </button>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={p.published}
                          onCheckedChange={() => toggleProjectPublish(p.id)}
                          aria-label="Toggle publish"
                        />
                        <span className="text-xs font-medium text-muted-foreground">
                          {p.published ? "Live" : "Draft"}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        {p.github && (
                          <a
                            href={p.github}
                            target="_blank"
                            rel="noreferrer"
                            className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
                            title="GitHub Repo"
                          >
                            <Github className="size-4" />
                          </a>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleOpenEdit(p)}
                          className="h-8 w-8 p-0"
                          title="Edit Project"
                        >
                          <Edit2 className="size-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setDeleteTarget(p)}
                          className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10"
                          title="Delete Project"
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add / Edit Project Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto rounded-3xl p-6 sm:p-8">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl font-bold uppercase tracking-tight">
              {editingId ? "Edit Project Details" : "Add New Portfolio Project"}
            </DialogTitle>
            <DialogDescription>
              Changes are immediately synchronized with the database and live portfolio.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="proj-title">Project Title *</Label>
                <Input
                  id="proj-title"
                  required
                  placeholder="e.g. Lumen Sweep"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="mt-1.5"
                />
              </div>

              <div>
                <Label htmlFor="proj-category">Category *</Label>
                <Input
                  id="proj-category"
                  required
                  placeholder="e.g. Computer Vision / Web Dev"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="mt-1.5"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="proj-subtitle">Short Tagline / Subtitle</Label>
              <Input
                id="proj-subtitle"
                placeholder="e.g. Smart Solar Panel Autonomous Cleaning System"
                value={formData.subtitle}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                className="mt-1.5"
              />
            </div>

            <div>
              <Label htmlFor="proj-desc">Detailed Description *</Label>
              <Textarea
                id="proj-desc"
                required
                rows={3}
                placeholder="Comprehensive overview of the system architecture, features and objective..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="mt-1.5"
              />
            </div>

            <div>
              <Label htmlFor="proj-contrib">My Contribution *</Label>
              <Input
                id="proj-contrib"
                required
                placeholder="e.g. Frontend development, ArUco detection, dashboard design."
                value={formData.contribution}
                onChange={(e) => setFormData({ ...formData, contribution: e.target.value })}
                className="mt-1.5"
              />
            </div>

            <div>
              <Label htmlFor="proj-tags">Technologies Used (comma separated)</Label>
              <Input
                id="proj-tags"
                placeholder="HTML, CSS, React.js, Node.js, Python, OpenCV"
                value={formData.tagsString}
                onChange={(e) => setFormData({ ...formData, tagsString: e.target.value })}
                className="mt-1.5"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="proj-github">GitHub Repository URL</Label>
                <Input
                  id="proj-github"
                  type="url"
                  placeholder="https://github.com/..."
                  value={formData.github}
                  onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                  className="mt-1.5"
                />
              </div>

              <div>
                <Label htmlFor="proj-live">Live Demo / Deployment URL (optional)</Label>
                <Input
                  id="proj-live"
                  type="url"
                  placeholder="https://example.com"
                  value={formData.liveUrl}
                  onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                  className="mt-1.5"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <Label htmlFor="proj-status">Project Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(val: "completed" | "ongoing") =>
                    setFormData({ ...formData, status: val })
                  }
                >
                  <SelectTrigger id="proj-status" className="mt-1.5">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="ongoing">Ongoing</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col justify-end">
                <div className="flex h-10 items-center justify-between rounded-xl border border-border px-3">
                  <span className="text-xs font-semibold">Featured</span>
                  <Switch
                    checked={formData.featured}
                    onCheckedChange={(val) => setFormData({ ...formData, featured: val })}
                  />
                </div>
              </div>

              <div className="flex flex-col justify-end">
                <div className="flex h-10 items-center justify-between rounded-xl border border-border px-3">
                  <span className="text-xs font-semibold">Published</span>
                  <Switch
                    checked={formData.published}
                    onCheckedChange={(val) => setFormData({ ...formData, published: val })}
                  />
                </div>
              </div>
            </div>

            <DialogFooter className="pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setDialogOpen(false)}
                className="rounded-full"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="rounded-full bg-primary px-6 font-bold text-primary-foreground shadow-orange hover:bg-primary/90"
              >
                {editingId ? "Save Changes" : "Create Project"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Alert Dialog */}
      <AlertDialog
        open={Boolean(deleteTarget)}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
      >
        <AlertDialogContent className="rounded-3xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-display text-xl font-bold uppercase">
              Delete Project
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete{" "}
              <strong className="text-foreground">{deleteTarget?.title}</strong>? This action
              will remove it from the public portfolio and cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-full">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete Project
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
