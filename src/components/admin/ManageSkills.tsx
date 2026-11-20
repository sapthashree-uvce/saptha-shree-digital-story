import { useState } from "react";
import { Plus, Search, Edit2, Trash2, Eye, EyeOff, Layers, Sparkles, MoveUp, MoveDown } from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";
import type { SkillItem } from "@/lib/portfolio-store";
import { DEFAULT_SKILL_CATEGORIES } from "@/lib/portfolio-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { BrandIcon } from "@/components/portfolio/BrandIcon";

type SkillFormData = {
  name: string;
  category: string;
  iconKind: "brand" | "lucide";
  iconIdentifier: string;
  description: string;
  displayOrder: number;
  visible: boolean;
};

const DEFAULT_FORM: SkillFormData = {
  name: "",
  category: "Programming Languages",
  iconKind: "brand",
  iconIdentifier: "python",
  description: "",
  displayOrder: 1,
  visible: true,
};

export function ManageSkills() {
  const { portfolio, addSkill, updateSkill, deleteSkill, toggleSkillVisibility, savePortfolio } =
    usePortfolio();

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<SkillFormData>(DEFAULT_FORM);

  const [deleteTarget, setDeleteTarget] = useState<SkillItem | null>(null);

  // Quick Interest input state
  const [newInterest, setNewInterest] = useState("");

  const filteredSkills = portfolio.skills.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.category.toLowerCase().includes(search.toLowerCase());
    if (!matchesSearch) return false;
    if (selectedCategory !== "all" && s.category !== selectedCategory) return false;
    return true;
  });

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      ...DEFAULT_FORM,
      displayOrder: portfolio.skills.length + 1,
    });
    setDialogOpen(true);
  };

  const handleOpenEdit = (skill: SkillItem) => {
    setEditingId(skill.id);
    setFormData({
      name: skill.name,
      category: skill.category,
      iconKind: skill.icon.kind,
      iconIdentifier: skill.icon.kind === "brand" ? skill.icon.slug : skill.icon.name,
      description: skill.description || "",
      displayOrder: skill.displayOrder || 1,
      visible: skill.visible,
    });
    setDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const icon =
      formData.iconKind === "brand"
        ? { kind: "brand" as const, slug: formData.iconIdentifier.toLowerCase() }
        : { kind: "lucide" as const, name: formData.iconIdentifier.toLowerCase() };

    if (editingId) {
      await updateSkill(editingId, {
        name: formData.name,
        category: formData.category,
        icon,
        description: formData.description,
        displayOrder: Number(formData.displayOrder),
        visible: formData.visible,
      });
    } else {
      await addSkill({
        name: formData.name,
        category: formData.category,
        icon,
        description: formData.description,
        displayOrder: Number(formData.displayOrder),
        visible: formData.visible,
      });
    }

    setDialogOpen(false);
  };

  const confirmDelete = async () => {
    if (deleteTarget) {
      await deleteSkill(deleteTarget.id);
      setDeleteTarget(null);
    }
  };

  const handleAddInterest = async () => {
    if (!newInterest.trim()) return;
    const updated = {
      ...portfolio,
      interests: [...portfolio.interests, newInterest.trim()],
    };
    await savePortfolio(updated);
    setNewInterest("");
  };

  const handleRemoveInterest = async (index: number) => {
    const updated = {
      ...portfolio,
      interests: portfolio.interests.filter((_, i) => i !== index),
    };
    await savePortfolio(updated);
  };

  return (
    <div className="space-y-8 p-5 sm:p-8">
      {/* Header Toolbar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-foreground">
            Skills &amp; Technical Capabilities ({portfolio.skills.length})
          </h2>
          <p className="text-sm text-muted-foreground">
            Organize programming languages, libraries, dev tools, and interest tags.
          </p>
        </div>

        <Button
          onClick={handleOpenAdd}
          className="h-11 rounded-full bg-primary px-6 font-bold text-primary-foreground shadow-orange hover:bg-primary/90"
        >
          <Plus className="mr-2 size-4" /> Add Skill
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-3 size-4 text-muted-foreground" />
          <Input
            placeholder="Search skills by name or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-10 rounded-xl pl-9"
          />
        </div>

        <div className="w-full sm:w-64">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="h-10 rounded-xl">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {DEFAULT_SKILL_CATEGORIES.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Skills Table */}
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
        {filteredSkills.length === 0 ? (
          <div className="py-16 text-center">
            <p className="font-display text-lg font-bold text-foreground">No skills found</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Add a new skill or adjust your category filter.
            </p>
            <Button onClick={handleOpenAdd} variant="outline" className="mt-4 rounded-full">
              <Plus className="mr-2 size-4" /> Add Skill
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-border bg-muted/40 text-xs uppercase text-muted-foreground">
                <tr>
                  <th className="px-6 py-4 font-bold">Skill</th>
                  <th className="px-6 py-4 font-bold">Category</th>
                  <th className="px-6 py-4 font-bold">Icon Type</th>
                  <th className="px-6 py-4 font-bold">Order</th>
                  <th className="px-6 py-4 font-bold">Visibility</th>
                  <th className="px-6 py-4 text-right font-bold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredSkills
                  .sort((a, b) => a.displayOrder - b.displayOrder)
                  .map((skill) => (
                    <tr key={skill.id} className="transition-colors hover:bg-muted/30">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <span className="grid size-9 place-items-center rounded-xl bg-muted text-foreground">
                            <BrandIcon icon={skill.icon} className="size-4" />
                          </span>
                          <div>
                            <p className="font-display text-base font-bold text-foreground">
                              {skill.name}
                            </p>
                            {skill.description && (
                              <p className="text-xs text-muted-foreground">{skill.description}</p>
                            )}
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span className="rounded-md bg-muted px-2.5 py-1 text-xs font-semibold text-foreground">
                          {skill.category}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <span className="text-xs text-muted-foreground">
                          {skill.icon.kind}:{" "}
                          {skill.icon.kind === "brand" ? skill.icon.slug : skill.icon.name}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <span className="font-display font-bold text-primary">
                          #{skill.displayOrder}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={skill.visible}
                            onCheckedChange={() => toggleSkillVisibility(skill.id)}
                            aria-label="Toggle visibility"
                          />
                          <span className="text-xs font-medium text-muted-foreground">
                            {skill.visible ? "Visible" : "Hidden"}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleOpenEdit(skill)}
                            className="h-8 w-8 p-0"
                            title="Edit Skill"
                          >
                            <Edit2 className="size-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setDeleteTarget(skill)}
                            className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10"
                            title="Delete Skill"
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

      {/* Areas of Interest (Marquee Strip Management) */}
      <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
        <div className="mb-4">
          <h3 className="font-display text-lg font-bold uppercase tracking-tight text-foreground">
            Manage Areas of Interest (Marquee Strip)
          </h3>
          <p className="text-xs text-muted-foreground">
            These keywords animate continuously across the bottom of the public Skills section.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 pb-4">
          {portfolio.interests.map((interest, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background py-1.5 pl-3.5 pr-2 text-sm font-semibold text-foreground"
            >
              <span>{interest}</span>
              <button
                type="button"
                onClick={() => handleRemoveInterest(i)}
                className="grid size-5 place-items-center rounded-full text-muted-foreground hover:bg-destructive hover:text-destructive-foreground"
                title={`Remove ${interest}`}
              >
                ×
              </button>
            </span>
          ))}
        </div>

        <div className="flex max-w-md gap-2">
          <Input
            placeholder="Add new interest (e.g. Distributed Systems)..."
            value={newInterest}
            onChange={(e) => setNewInterest(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddInterest())}
            className="h-10 rounded-xl"
          />
          <Button onClick={handleAddInterest} className="rounded-xl">
            Add
          </Button>
        </div>
      </div>

      {/* Add / Edit Skill Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md rounded-3xl p-6 sm:p-8">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl font-bold uppercase tracking-tight">
              {editingId ? "Edit Skill" : "Add New Skill"}
            </DialogTitle>
            <DialogDescription>
              Assign the skill to its category and configure icon rendering.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <div>
              <Label htmlFor="skill-name">Skill Name *</Label>
              <Input
                id="skill-name"
                required
                placeholder="e.g. Python, Docker, TensorFlow"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1.5"
              />
            </div>

            <div>
              <Label htmlFor="skill-category">Category *</Label>
              <Select
                value={formData.category}
                onValueChange={(val) => setFormData({ ...formData, category: val })}
              >
                <SelectTrigger id="skill-category" className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {DEFAULT_SKILL_CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="skill-icon-kind">Icon Library</Label>
                <Select
                  value={formData.iconKind}
                  onValueChange={(val: "brand" | "lucide") =>
                    setFormData({ ...formData, iconKind: val })
                  }
                >
                  <SelectTrigger id="skill-icon-kind" className="mt-1.5">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="brand">Brand Slug (SimpleIcons)</SelectItem>
                    <SelectItem value="lucide">Lucide Generic Icon</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="skill-icon-id">Icon Slug / Name</Label>
                <Input
                  id="skill-icon-id"
                  required
                  placeholder={formData.iconKind === "brand" ? "python, git, react" : "code, terminal, chart"}
                  value={formData.iconIdentifier}
                  onChange={(e) => setFormData({ ...formData, iconIdentifier: e.target.value })}
                  className="mt-1.5"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="skill-order">Display Order</Label>
                <Input
                  id="skill-order"
                  type="number"
                  min={1}
                  value={formData.displayOrder}
                  onChange={(e) => setFormData({ ...formData, displayOrder: Number(e.target.value) })}
                  className="mt-1.5"
                />
              </div>

              <div className="flex flex-col justify-end">
                <div className="flex h-10 items-center justify-between rounded-xl border border-border px-3">
                  <span className="text-xs font-semibold">Visible</span>
                  <Switch
                    checked={formData.visible}
                    onCheckedChange={(val) => setFormData({ ...formData, visible: val })}
                  />
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="skill-desc">Description (optional)</Label>
              <Input
                id="skill-desc"
                placeholder="e.g. Data manipulation and analysis"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="mt-1.5"
              />
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
                {editingId ? "Save Changes" : "Add Skill"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Alert Dialog */}
      <AlertDialog
        open={Boolean(deleteTarget)}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
      >
        <AlertDialogContent className="rounded-3xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-display text-xl font-bold uppercase">
              Delete Skill
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove{" "}
              <strong className="text-foreground">{deleteTarget?.name}</strong>? It will no longer
              appear in the public Skills matrix.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-full">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete Skill
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
