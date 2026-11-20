import { Trophy, Users } from "lucide-react";

import { ACHIEVEMENT, DESIGN_TEAMS, EVENTS } from "@/lib/portfolio-data";
import { usePortfolio } from "@/context/PortfolioContext";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Achievements() {
  const { portfolio } = usePortfolio();
  const publishedAchievements = (portfolio?.achievements || []).filter((a) => a.published);

  const dynamicTeams = (portfolio?.activities || [])
    .filter((a) => a.type === "team" && a.published)
    .map((t) => ({ name: t.name, role: t.roleOrKind }));
  const teams = portfolio ? dynamicTeams : DESIGN_TEAMS;

  const dynamicEvents = (portfolio?.activities || [])
    .filter((a) => a.type === "event" && a.published)
    .map((e) => ({ name: e.name, kind: e.roleOrKind }));
  const events = portfolio ? dynamicEvents : EVENTS;

  const hasAchievements = publishedAchievements.length > 0;
  const hasTeams = teams.length > 0;
  const hasEvents = events.length > 0;

  if (!hasAchievements && !hasTeams && !hasEvents) {
    return null;
  }

  return (
    <section id="achievements" className="bg-paper-deep py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading index="04" label="Achievements & involvement">
          Learning, participating <br className="hidden sm:block" />
          &amp; <span className="serif-accent text-primary">growing.</span>
        </SectionHeading>

        {(hasAchievements || hasTeams) && (
          <div className="mt-16 grid gap-5 lg:grid-cols-12">
            {publishedAchievements.map((ach) => (
              <Reveal
                key={ach.id}
                className={
                  publishedAchievements.length === 1 && hasTeams
                    ? "lg:col-span-5 lg:row-span-2"
                    : "lg:col-span-6"
                }
              >
                <article className="relative flex h-full min-h-[22rem] flex-col justify-between overflow-hidden rounded-3xl bg-primary p-8 text-primary-foreground shadow-orange sm:p-10">
                  <span
                    aria-hidden="true"
                    className="absolute -right-6 -top-10 font-display text-[12rem] leading-none text-primary-foreground/15"
                  >
                    {ach.result.match(/\d+(?:st|nd|rd|th)?/i)?.[0] || "★"}
                  </span>
                  <span className="grid size-14 place-items-center rounded-full bg-primary-foreground/15">
                    <Trophy className="size-6" />
                  </span>
                  <div>
                    <p className="eyebrow mb-3 text-primary-foreground/80">Achievement</p>
                    <h3 className="font-display text-5xl sm:text-6xl">{ach.title}</h3>
                    <p className="serif-accent mt-2 text-3xl">{ach.result}</p>
                  </div>
                </article>
              </Reveal>
            ))}

            {teams.map((team, i) => (
              <Reveal
                key={team.name}
                delay={100 + i * 80}
                className={
                  hasAchievements
                    ? publishedAchievements.length === 1
                      ? "lg:col-span-7"
                      : "lg:col-span-6"
                    : "lg:col-span-6"
                }
              >
                <article className="group flex h-full items-center justify-between gap-6 rounded-3xl border border-border bg-card p-6 shadow-card transition-all duration-500 hover:-translate-y-1 sm:p-8">
                  <div className="flex min-w-0 items-center gap-5">
                    <span className="grid size-12 shrink-0 place-items-center rounded-full bg-ink text-ink-foreground transition-colors duration-500 group-hover:bg-primary">
                      <Users className="size-5" />
                    </span>
                    <div className="min-w-0">
                      <p className="eyebrow text-muted-foreground">{team.role}</p>
                      <h3 className="truncate font-display text-2xl sm:text-3xl">{team.name}</h3>
                    </div>
                  </div>
                  <span className="serif-accent hidden shrink-0 text-xl text-muted-foreground sm:block">
                    teamwork
                  </span>
                </article>
              </Reveal>
            ))}
          </div>
        )}

        {hasEvents && (
          <Reveal className="mt-16">
            <div className="mb-6 flex items-center justify-between">
              <p className="eyebrow text-muted-foreground">Events &amp; workshops</p>
              <p className="serif-accent text-lg text-muted-foreground">always curious</p>
            </div>
            <ol className="border-t border-foreground/15">
              {events.map((event, i) => (
                <li
                  key={event.name}
                  className="group grid grid-cols-[3rem_minmax(0,1fr)_auto] items-center gap-4 border-b border-foreground/15 py-5 transition-colors duration-300 hover:bg-background sm:grid-cols-[5rem_minmax(0,1fr)_auto] sm:px-4"
                >
                  <span className="eyebrow text-muted-foreground transition-colors group-hover:text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 font-display text-xl normal-case tracking-tight transition-transform duration-500 group-hover:translate-x-2 sm:text-3xl">
                    {event.name}
                  </span>
                  <span className="rounded-full border border-foreground/15 px-3 py-1 text-xs font-medium text-muted-foreground transition-colors group-hover:border-primary group-hover:text-primary">
                    {event.kind}
                  </span>
                </li>
              ))}
            </ol>
          </Reveal>
        )}
      </div>
    </section>
  );
}
