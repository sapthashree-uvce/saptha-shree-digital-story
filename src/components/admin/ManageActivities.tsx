import { useState } from "react";
import { Plus, Edit2, Trash2, Users, Calendar, Sparkles } from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";
import type { ActivityItem } from "@/lib/portfolio-store";
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

export function ManageActivities() {
  const { portfolio, addActivity, updateActivity, deleteActivity } = usePortfolio();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [type, setType] = useState<"team" | "event">("team");
  const [name, setName] = useState("");
  const [roleOrKind, setRoleOrKind] = useState("");
  const [description, setDescription] = useState("");
  const [published, setPublished] = useState(true);

  const [deleteTarget, setDeleteTarget] = useState<ActivityItem | null>(null);

  const teams = portfolio.activities.filter((a) => a.type === "team");
  const events = portfolio.activities.filter((a) => a.type === "event");

  const handleOpenAdd = (defaultType: "team" | "event") => {
    setEditingId(null);
    setType(defaultType);
    setName("");
    setRoleOrKind(defaultType === "team" ? "Design Team" : "Workshop");
    setDescription("");
    setPublished(true);
    setDialogOpen(true);
  };

  const handleOpenEdit = (act: ActivityItem) => {
    setEditingId(act.id);
    setType(act.type);
    setName(act.name);
    setRoleOrKind(act.roleOrKind);
    setDescription(act.description || "");
    setPublished(act.published);
    setDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await updateActivity(editingId, {
        type,
        name,
        roleOrKind,
        description,
        published,
      });
    } else {
      await addActivity({
        type,
        name,
        roleOrKind,
        description,
        published,
      });
    }
    setDialogOpen(false);
  };

  const confirmDelete = async () => {
    if (deleteTarget) {
      await deleteActivity(deleteTarget.id);
      setDeleteTarget(null);
    }
  };

  return (
    <div className="space-y-8 p-5 sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-foreground">
            Manage Activities &amp; Involvement ({portfolio.activities.length})
          </h2>
          <p className="text-sm text-muted-foreground">
            Manage club design teams, workshops attended, and campus hackathons.
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={() => handleOpenAdd("team")}
            variant="outline"
            className="rounded-full"
          >
            <Plus className="mr-2 size-4" /> Add Club / Team
          </Button>
          <Button
            onClick={() => handleOpenAdd("event")}
            className="rounded-full bg-primary font-bold text-primary-foreground shadow-orange hover:bg-primary/90"
          >
            <Plus className="mr-2 size-4" /> Add Event / Workshop
          </Button>
        </div>
      </div>

      {/* Design Teams and Student Clubs */}
      <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="size-5 text-primary" />
            <h3 className="font-display text-lg font-bold uppercase tracking-tight text-foreground">
              Design Teams &amp; Student Organizations ({teams.length})
            </h3>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {teams.map((t) => (
            <div
              key={t.id}
              className="flex items-center justify-between rounded-xl border border-border bg-background p-4"
            >
              <div className="min-w-0 pr-3">
                <p className="eyebrow text-muted-foreground">{t.roleOrKind}</p>
                <h4 className="font-display text-lg font-bold text-foreground">{t.name}</h4>
              </div>

              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleOpenEdit(t)}
                  className="h-8 w-8 p-0"
                >
                  <Edit2 className="size-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setDeleteTarget(t)}
                  className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Events & Workshops */}
      <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="size-5 text-primary" />
            <h3 className="font-display text-lg font-bold uppercase tracking-tight text-foreground">
              Workshops &amp; Events ({events.length})
            </h3>
          </div>
        </div>

        <div className="divide-y divide-border rounded-xl border border-border bg-background">
          {events.map((e, idx) => (
            <div
              key={e.id}
              className="flex items-center justify-between p-4 transition-colors hover:bg-muted/30"
            >
              <div className="flex items-center gap-4">
                <span className="eyebrow text-muted-foreground">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <div>
                  <h4 className="font-display text-base font-bold text-foreground">{e.name}</h4>
                  <span className="inline-block rounded-full border border-border px-2 py-0.5 text-[11px] text-muted-foreground">
                    {e.roleOrKind}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleOpenEdit(e)}
                  className="h-8 w-8 p-0"
                >
                  <Edit2 className="size-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setDeleteTarget(e)}
                  className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add / Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md rounded-3xl p-6 sm:p-8">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl font-bold uppercase tracking-tight">
              {editingId ? "Edit Activity" : "Add Activity / Event"}
            </DialogTitle>
            <DialogDescription>
              Update organization or workshop details.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <div>
              <Label htmlFor="act-type">Activity Category</Label>
              <Select
                value={type}
                onValueChange={(val: "team" | "event") => setType(val)}
              >
                <SelectTrigger id="act-type" className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="team">Club / Design Team</SelectItem>
                  <SelectItem value="event">Workshop / Hackathon / Event</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="act-name">Name *</Label>
              <Input
                id="act-name"
                required
                placeholder={type === "team" ? "e.g. Kutuhala UVCE" : "e.g. Git and GitHub Workshop"}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1.5"
              />
            </div>

            <div>
              <Label htmlFor="act-role">Role or Kind *</Label>
              <Input
                id="act-role"
                required
                placeholder={type === "team" ? "e.g. Design Team / Core Member" : "e.g. Workshop / Event"}
                value={roleOrKind}
                onChange={(e) => setRoleOrKind(e.target.value)}
                className="mt-1.5"
              />
            </div>

            <div>
              <Label htmlFor="act-desc">Description (optional)</Label>
              <Input
                id="act-desc"
                placeholder="Brief participation notes"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1.5"
              />
            </div>

            <div className="flex items-center justify-between rounded-xl border border-border p-3">
              <span className="text-sm font-semibold">Published</span>
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
                {editingId ? "Save Changes" : "Add Activity"}
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
              Delete Activity
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove <strong className="text-foreground">{deleteTarget?.name}</strong>?
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
