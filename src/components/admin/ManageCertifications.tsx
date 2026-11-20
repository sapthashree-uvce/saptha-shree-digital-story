import { useState } from "react";
import { Plus, Edit2, Trash2, Award, ExternalLink, Clock } from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";
import type { CertificateItem } from "@/lib/portfolio-store";
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

export function ManageCertifications() {
  const { portfolio, addCertificate, updateCertificate, deleteCertificate } =
    usePortfolio();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [issuer, setIssuer] = useState("");
  const [url, setUrl] = useState("");
  const [published, setPublished] = useState(true);

  const [deleteTarget, setDeleteTarget] = useState<CertificateItem | null>(null);

  const handleOpenAdd = () => {
    setEditingId(null);
    setTitle("");
    setIssuer("");
    setUrl("");
    setPublished(true);
    setDialogOpen(true);
  };

  const handleOpenEdit = (c: CertificateItem) => {
    setEditingId(c.id);
    setTitle(c.title);
    setIssuer(c.issuer);
    setUrl(c.url || "");
    setPublished(c.published);
    setDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await updateCertificate(editingId, {
        title,
        issuer,
        url: url.trim() || null,
        published,
      });
    } else {
      await addCertificate({
        title,
        issuer,
        url: url.trim() || null,
        published,
      });
    }
    setDialogOpen(false);
  };

  const confirmDelete = async () => {
    if (deleteTarget) {
      await deleteCertificate(deleteTarget.id);
      setDeleteTarget(null);
    }
  };

  return (
    <div className="space-y-6 p-5 sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-foreground">
            Manage Certifications ({portfolio.certificates.length})
          </h2>
          <p className="text-sm text-muted-foreground">
            Organize credentials, issuing authorities, and verification links.
          </p>
        </div>

        <Button
          onClick={handleOpenAdd}
          className="h-11 rounded-full bg-primary px-6 font-bold text-primary-foreground shadow-orange hover:bg-primary/90"
        >
          <Plus className="mr-2 size-4" /> Add Certificate
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {portfolio.certificates.map((cert, i) => (
          <div
            key={cert.id}
            className="group relative flex flex-col justify-between rounded-3xl border border-border bg-card p-6 shadow-card transition-all duration-300 hover:border-primary/50"
          >
            <div>
              <div className="flex items-start justify-between">
                <span className="grid size-12 place-items-center rounded-2xl bg-muted text-foreground">
                  <Award className="size-6 text-primary" />
                </span>
                <span className="eyebrow text-muted-foreground">
                  #{String(i + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="mt-6">
                <p className="eyebrow text-muted-foreground">{cert.issuer}</p>
                <h3 className="mt-1 font-display text-xl font-bold text-foreground">
                  {cert.title}
                </h3>
              </div>

              <div className="mt-4 flex items-center gap-2 text-xs font-semibold">
                {cert.url ? (
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-primary hover:underline"
                  >
                    <span>Verified Link</span>
                    <ExternalLink className="size-3" />
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-1 text-muted-foreground">
                    <Clock className="size-3" /> Link coming soon
                  </span>
                )}
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-bold ${
                  cert.published
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {cert.published ? "Published" : "Draft"}
              </span>

              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleOpenEdit(cert)}
                  className="h-8 w-8 p-0"
                >
                  <Edit2 className="size-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setDeleteTarget(cert)}
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
              {editingId ? "Edit Certificate" : "Add Certificate"}
            </DialogTitle>
            <DialogDescription>
              Provide credential details and optional certificate URL.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <div>
              <Label htmlFor="cert-title">Certificate Title *</Label>
              <Input
                id="cert-title"
                required
                placeholder="e.g. Kagada, CTF Hacking, Codefury"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1.5"
              />
            </div>

            <div>
              <Label htmlFor="cert-issuer">Issuing Organization *</Label>
              <Input
                id="cert-issuer"
                required
                placeholder="e.g. IEEE UVCE, Marvel UVCE, E-Cell"
                value={issuer}
                onChange={(e) => setIssuer(e.target.value)}
                className="mt-1.5"
              />
            </div>

            <div>
              <Label htmlFor="cert-url">Certificate Link / PDF URL (optional)</Label>
              <Input
                id="cert-url"
                type="url"
                placeholder="https://..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="mt-1.5"
              />
              <p className="mt-1 text-xs text-muted-foreground">
                Leave empty if certificate is pending release.
              </p>
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
                {editingId ? "Save Changes" : "Add Certificate"}
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
              Delete Certificate
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete <strong className="text-foreground">{deleteTarget?.title}</strong>?
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
