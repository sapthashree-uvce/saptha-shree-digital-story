import { useState } from "react";
import { Save, UserCircle, BookOpen, GraduationCap, Award, Compass, FileText } from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function ManageAbout() {
  const { portfolio, updateAbout } = usePortfolio();
  const about = portfolio.about;

  const [bio1, setBio1] = useState(about.bioParagraphs[0] || "");
  const [bio2, setBio2] = useState(about.bioParagraphs[1] || "");
  const [bio3, setBio3] = useState(about.bioParagraphs[2] || "");

  // Facts
  const getFact = (label: string) =>
    about.facts.find((f) => f.label.toLowerCase() === label.toLowerCase())?.value || "";

  const [education, setEducation] = useState(getFact("Education"));
  const [college, setCollege] = useState(getFact("College"));
  const [academicYear, setAcademicYear] = useState(getFact("Academic Year"));
  const [cgpa, setCgpa] = useState(getFact("CGPA"));
  const [careerInterest, setCareerInterest] = useState(getFact("Career Interest"));

  const [resumeUrl, setResumeUrl] = useState(about.resumeUrl || "");
  const [hobbiesString, setHobbiesString] = useState(about.hobbies.join(", "));

  const [saving, setSaving] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const updatedFacts = [
      { label: "Education", value: education },
      { label: "College", value: college },
      { label: "Academic Year", value: academicYear },
      { label: "CGPA", value: cgpa },
      { label: "Career Interest", value: careerInterest },
    ];

    const updatedHobbies = hobbiesString
      .split(",")
      .map((h) => h.trim())
      .filter(Boolean);

    const paragraphs = [bio1, bio2, bio3].filter(Boolean);

    await updateAbout({
      bioParagraphs: paragraphs,
      facts: updatedFacts,
      hobbies: updatedHobbies,
      resumeUrl: resumeUrl.trim() || null,
    });

    setSaving(false);
  };

  return (
    <div className="space-y-6 p-5 sm:p-8">
      <div>
        <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-foreground">
          Manage About Me Section
        </h2>
        <p className="text-sm text-muted-foreground">
          Update your biography, academic qualifications, CGPA, career focus, and resume.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Academic and Education Quick Facts */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
          <div className="mb-4 flex items-center gap-2">
            <GraduationCap className="size-5 text-primary" />
            <h3 className="font-display text-lg font-bold uppercase tracking-tight text-foreground">
              Education &amp; Academic Credentials
            </h3>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="sm:col-span-2">
              <Label htmlFor="about-education">Education / Degree</Label>
              <Input
                id="about-education"
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                placeholder="B.Tech – Artificial Intelligence and Data Science"
                className="mt-1.5"
              />
            </div>

            <div>
              <Label htmlFor="about-cgpa">CGPA</Label>
              <Input
                id="about-cgpa"
                value={cgpa}
                onChange={(e) => setCgpa(e.target.value)}
                placeholder="9.67"
                className="mt-1.5 font-bold"
              />
            </div>

            <div>
              <Label htmlFor="about-college">College / University</Label>
              <Input
                id="about-college"
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                placeholder="UVCE, Bengaluru"
                className="mt-1.5"
              />
            </div>

            <div>
              <Label htmlFor="about-academic-year">Academic Year</Label>
              <Input
                id="about-academic-year"
                value={academicYear}
                onChange={(e) => setAcademicYear(e.target.value)}
                placeholder="Second Year"
                className="mt-1.5"
              />
            </div>

            <div>
              <Label htmlFor="about-career-interest">Career Interest</Label>
              <Input
                id="about-career-interest"
                value={careerInterest}
                onChange={(e) => setCareerInterest(e.target.value)}
                placeholder="Data Engineering"
                className="mt-1.5"
              />
            </div>
          </div>
        </div>

        {/* Biography Paragraphs */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
          <div className="mb-4 flex items-center gap-2">
            <UserCircle className="size-5 text-primary" />
            <h3 className="font-display text-lg font-bold uppercase tracking-tight text-foreground">
              Personal Narrative &amp; Bio Paragraphs
            </h3>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="bio-p1">Opening Introduction Paragraph</Label>
              <Textarea
                id="bio-p1"
                rows={3}
                value={bio1}
                onChange={(e) => setBio1(e.target.value)}
                className="mt-1.5"
                placeholder="Introduction sentence..."
              />
            </div>

            <div>
              <Label htmlFor="bio-p2">Secondary Paragraph (Interests &amp; Explorations)</Label>
              <Textarea
                id="bio-p2"
                rows={3}
                value={bio2}
                onChange={(e) => setBio2(e.target.value)}
                className="mt-1.5"
                placeholder="I enjoy exploring technology..."
              />
            </div>

            <div>
              <Label htmlFor="bio-p3">Philosophy / Core Values</Label>
              <Textarea
                id="bio-p3"
                rows={2}
                value={bio3}
                onChange={(e) => setBio3(e.target.value)}
                className="mt-1.5"
                placeholder="I believe in learning by building..."
              />
            </div>
          </div>
        </div>

        {/* Hobbies and Resume Link */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
          <div className="mb-4 flex items-center gap-2">
            <Compass className="size-5 text-primary" />
            <h3 className="font-display text-lg font-bold uppercase tracking-tight text-foreground">
              Beyond Technology &amp; Resume Download
            </h3>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="about-resume">Resume URL (PDF Link or Local Download Path)</Label>
              <Input
                id="about-resume"
                value={resumeUrl}
                onChange={(e) => setResumeUrl(e.target.value)}
                placeholder="/downloads/Saptha_Shree_Resume.pdf or https://..."
                className="mt-1.5"
              />
              <p className="mt-1.5 text-xs text-muted-foreground">
                Leave empty to display "Resume · coming soon" button on public hero.
              </p>
            </div>

            <div>
              <Label htmlFor="about-hobbies">Hobbies &amp; Personal Interests (comma separated)</Label>
              <Input
                id="about-hobbies"
                value={hobbiesString}
                onChange={(e) => setHobbiesString(e.target.value)}
                placeholder="Chess, Drawing, Reading novels, Open-source software"
                className="mt-1.5"
              />
              <p className="mt-1.5 text-xs text-muted-foreground">
                Renders as interactive interest pills in the About section.
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={saving}
            className="h-12 rounded-full bg-primary px-8 font-bold text-primary-foreground shadow-orange hover:bg-primary/90"
          >
            <Save className="mr-2 size-4" /> {saving ? "Saving Changes..." : "Save About Me Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
}
