import { useState } from "react";
import { Lock, Mail, ArrowLeft, Loader2, Sparkles, Eye, EyeOff } from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BrandMark } from "@/components/portfolio/Navbar";

export function AdminLogin() {
  const { login } = usePortfolio();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    const res = await login(email, password);
    setLoading(false);
    if (!res.success) {
      setErrorMsg(res.error || "Authentication failed. Please check credentials.");
    }
  };

  const handleDemoFill = () => {
    setEmail("sapthashree448@gmail.com");
    setPassword("admin123");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink px-4 py-12 text-ink-foreground sm:px-6">
      <div className="w-full max-w-md">
        {/* Header Branding */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl border border-ink-line bg-ink-soft shadow-float">
            <BrandMark className="scale-125" />
          </div>
          <span className="eyebrow text-primary">Administration Portal</span>
          <h1 className="mt-2 font-display text-3xl font-extrabold uppercase tracking-tight text-ink-foreground sm:text-4xl">
            Portfolio <span className="serif-accent text-primary">Manager</span>
          </h1>
          <p className="mt-2 text-sm text-ink-muted">
            Authenticate to manage projects, skills, certifications and content.
          </p>
        </div>

        {/* Login Card */}
        <div className="rounded-3xl border border-ink-line bg-ink-soft/90 p-8 shadow-card backdrop-blur-xl">
          {errorMsg ? (
            <div className="mb-6 rounded-2xl border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">
              {errorMsg}
            </div>
          ) : null}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label htmlFor="admin-email" className="eyebrow mb-2 block text-ink-muted">
                Admin Email
              </Label>
              <div className="relative">
                <Input
                  id="admin-email"
                  type="email"
                  required
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 rounded-xl border-ink-line bg-ink pl-11 text-ink-foreground placeholder:text-ink-muted focus-visible:border-primary focus-visible:ring-primary/20"
                />
                <Mail className="absolute left-3.5 top-3.5 size-5 text-ink-muted" />
              </div>
            </div>

            <div>
              <Label htmlFor="admin-password" className="eyebrow mb-2 block text-ink-muted">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 rounded-xl border-ink-line bg-ink pl-11 pr-11 text-ink-foreground placeholder:text-ink-muted focus-visible:border-primary focus-visible:ring-primary/20"
                />
                <Lock className="absolute left-3.5 top-3.5 size-5 text-ink-muted" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-ink-muted transition-colors hover:text-ink-foreground"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="mt-2 h-12 w-full rounded-xl bg-primary font-bold text-primary-foreground shadow-orange transition-transform hover:-translate-y-0.5 hover:bg-primary/90"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 size-5 animate-spin" /> Authenticating...
                </>
              ) : (
                "Sign In to Dashboard"
              )}
            </Button>
          </form>

          {/* Quick Credential Fill Helper */}
          <div className="mt-6 border-t border-ink-line pt-4 text-center">
            <button
              type="button"
              onClick={handleDemoFill}
              className="inline-flex items-center gap-1.5 text-xs text-primary transition-colors hover:underline"
            >
              <Sparkles className="size-3.5" /> Quick fill default admin credentials
            </button>
          </div>
        </div>

        {/* Back Link */}
        <div className="mt-8 text-center">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-ink-muted transition-colors hover:text-primary"
          >
            <ArrowLeft className="size-4" /> Back to public portfolio
          </a>
        </div>
      </div>
    </div>
  );
}
