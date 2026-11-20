import { useState } from "react";
import { Save, Mail, Github, Linkedin, Globe, Sparkles } from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ManageContact() {
  const { portfolio, updateContact } = usePortfolio();
  const contact = portfolio.contact;

  const [email, setEmail] = useState(contact.email);
  const [brand, setBrand] = useState(contact.brand);
  const [name, setName] = useState(contact.name);
  const [githubUser, setGithubUser] = useState(contact.githubUser);
  const [github, setGithub] = useState(contact.github);
  const [linkedin, setLinkedin] = useState(contact.linkedin);

  const [saving, setSaving] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    await updateContact({
      email: email.trim(),
      brand: brand.trim(),
      name: name.trim(),
      githubUser: githubUser.trim(),
      github: github.trim(),
      linkedin: linkedin.trim(),
    });

    setSaving(false);
  };

  return (
    <div className="space-y-6 p-5 sm:p-8">
      <div>
        <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-foreground">
          Manage Contact &amp; Social Links
        </h2>
        <p className="text-sm text-muted-foreground">
          Update primary email recipient, GitHub username, LinkedIn URL, and brand mark text.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
          <div className="mb-4 flex items-center gap-2">
            <Mail className="size-5 text-primary" />
            <h3 className="font-display text-lg font-bold uppercase tracking-tight text-foreground">
              Primary Identity &amp; Contact
            </h3>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="contact-name">Full Display Name</Label>
              <Input
                id="contact-name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Saptha Shree"
                className="mt-1.5"
              />
            </div>

            <div>
              <Label htmlFor="contact-brand">Brand Monogram / Header Logo</Label>
              <Input
                id="contact-brand"
                required
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="SAPTHA"
                className="mt-1.5"
              />
            </div>

            <div className="sm:col-span-2">
              <Label htmlFor="contact-email">Primary Email Address</Label>
              <Input
                id="contact-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="sapthashree448@gmail.com"
                className="mt-1.5"
              />
              <p className="mt-1.5 text-xs text-muted-foreground">
                All visitor mailto links and direct contact inquiries link to this address.
              </p>
            </div>
          </div>
        </div>

        {/* Professional Profiles */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
          <div className="mb-4 flex items-center gap-2">
            <Globe className="size-5 text-primary" />
            <h3 className="font-display text-lg font-bold uppercase tracking-tight text-foreground">
              Professional Profiles &amp; Repositories
            </h3>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="contact-github-user">GitHub Username</Label>
              <Input
                id="contact-github-user"
                required
                value={githubUser}
                onChange={(e) => setGithubUser(e.target.value)}
                placeholder="sapthashree-uvce"
                className="mt-1.5"
              />
            </div>

            <div>
              <Label htmlFor="contact-github-url">GitHub Profile URL</Label>
              <Input
                id="contact-github-url"
                type="url"
                required
                value={github}
                onChange={(e) => setGithub(e.target.value)}
                placeholder="https://github.com/sapthashree-uvce"
                className="mt-1.5"
              />
            </div>

            <div className="sm:col-span-2">
              <Label htmlFor="contact-linkedin">LinkedIn Profile URL</Label>
              <Input
                id="contact-linkedin"
                type="url"
                required
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                placeholder="https://www.linkedin.com/in/saptha-shree-949604385"
                className="mt-1.5"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={saving}
            className="h-12 rounded-full bg-primary px-8 font-bold text-primary-foreground shadow-orange hover:bg-primary/90"
          >
            <Save className="mr-2 size-4" /> {saving ? "Saving Changes..." : "Save Contact Information"}
          </Button>
        </div>
      </form>
    </div>
  );
}
