import { useState } from "react";
import { Plus, Edit2, Trash2, Trophy, Award } from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";
import type { AchievementItem } from "@/lib/portfolio-store";
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

export function ManageAchievements() {
  const { portfolio, addAchievement, updateAchievement, deleteAchievement } =
    usePortfolio();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [result, setResult] = useState("");
  const [description, setDescription] = useState("");
  const [published, setPublished] = useState(true);

  const [deleteTarget, setDeleteTarget] = useState<AchievementItem | null>(null);

  const handleOpenAdd = () => {
    setEditingId(null);
    setTitle("");
    setResult("1st Place");
    setDescription("");
    setPublished(true);
    setDialogOpen(true);
  };

  const handleOpenEdit = (a: AchievementItem) => {
    setEditingId(a.id);
    setTitle(a.title);
    setResult(a.result);
    setDescription(a.description || "");
    setPublished(a.published);
    setDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await updateAchievement(editingId, {
        title,
        result,
        description,
        published,
      });
    } else {
      await addAchievement({
        title,
        result,
        description,
        published,
      });
    }
    setDialogOpen(false);
  };

  const confirmDelete = async () => {
    if (deleteTarget) {
      await deleteAchievement(deleteTarget.id);
      setDeleteTarget(null);
    }
  };

  return (
    <div className="space-y-6 p-5 sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-foreground">
            Manage Achievements ({portfolio.achievements.length})
          </h2>
          <p className="text-sm text-muted-foreground">
            Highlight competition victories, hackathons and honors.
          </p>
        </div>

        <Button
          onClick={handleOpenAdd}
          className="h-11 rounded-full bg-primary px-6 font-bold text-primary-foreground shadow-orange hover:bg-primary/90"
        >
          <Plus className="mr-2 size-4" /> Add Achievement
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {portfolio.achievements.map((ach) => (
          <div
            key={ach.id}
            className="group relative flex flex-col justify-between rounded-3xl border border-border bg-card p-6 shadow-card transition-all duration-300 hover:border-primary/50"
          >
            <div>
              <div className="flex items-start justify-between">
                <span className="grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                  <Trophy className="size-6" />
                </span>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                    ach.published
                      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {ach.published ? "Published" : "Draft"}
                </span>
              </div>

              <div className="mt-5">
                <p className="eyebrow text-primary">{ach.result}</p>
                <h3 className="mt-1 font-display text-2xl font-bold text-foreground">
                  {ach.title}
                </h3>
                {ach.description && (
                  <p className="mt-2 text-sm text-muted-foreground">{ach.description}</p>
                )}
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
              <span className="text-xs text-muted-foreground">
                Updated: {new Date(ach.updatedAt).toLocaleDateString()}
              </span>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleOpenEdit(ach)}
                  className="h-8 w-8 p-0"
                >
                  <Edit2 className="size-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setDeleteTarget(ach)}
                  className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md rounded-3xl p-6 sm:p-8">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl font-bold uppercase tracking-tight">
              {editingId ? "Edit Achievement" : "Add Achievement"}
            </DialogTitle>
            <DialogDescription>
              Detail the award or competition placement.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <div>
              <Label htmlFor="ach-title">Achievement / Competition Title *</Label>
              <Input
                id="ach-title"
                required
                placeholder="e.g. Strategy Sprint"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1.5"
              />
            </div>

            <div>
              <Label htmlFor="ach-result">Result / Placement *</Label>
              <Input
                id="ach-result"
                required
                placeholder="e.g. 1st Place, Winner, Finalist"
                value={result}
                onChange={(e) => setResult(e.target.value)}
                className="mt-1.5"
              />
            </div>

            <div>
              <Label htmlFor="ach-desc">Description / Details (optional)</Label>
              <Input
                id="ach-desc"
                placeholder="Brief description of the milestone"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1.5"
              />
            </div>

            <div className="flex items-center justify-between rounded-xl border border-border p-3">
              <span className="text-sm font-semibold">Published on Public Site</span>
              <Switch checked={published} onCheckedChange={setPublished} />
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
                {editingId ? "Save Changes" : "Add Achievement"}
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
              Delete Achievement
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove <strong className="text-foreground">{deleteTarget?.title}</strong>?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-full">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
