import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const ITEMS = [
  {
    title: "Open-source software",
    note: "Reading code, learning in public.",
    className: "lg:col-span-7",
    rotate: "lg:-rotate-1",
  },
  {
    title: "Chess",
    note: "Patience, patterns and planning ahead.",
    className: "lg:col-span-4 lg:col-start-9 lg:-mt-10",
    rotate: "lg:rotate-2",
  },
  {
    title: "Drawing",
    note: "Where ideas take shape on paper.",
    className: "lg:col-span-4 lg:col-start-2 lg:-mt-4",
    rotate: "lg:rotate-2",
  },
  {
    title: "Reading novels",
    note: "Other worlds, one chapter at a time.",
    className: "lg:col-span-5 lg:col-start-7 lg:mt-4",
    rotate: "lg:-rotate-1",
  },
];

export function Beyond() {
  return (
    <section id="beyond" className="relative overflow-hidden bg-paper-deep py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading index="06" label="Beyond the code">
          More than just <span className="serif-accent text-primary">technology.</span>
        </SectionHeading>

        <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-12 lg:gap-y-12">
          {ITEMS.map((item, i) => (
            <Reveal key={item.title} delay={i * 90} className={item.className}>
              <div
                className={`group h-full rounded-3xl border border-border bg-card p-8 transition-all duration-500 hover:border-primary/50 hover:shadow-float sm:p-10 ${item.rotate} hover:rotate-0`}
              >
                <span className="eyebrow text-muted-foreground">0{i + 1}</span>
                <h3 className="mt-6 font-display text-3xl uppercase tracking-tight text-foreground sm:text-4xl">
                  {item.title}
                </h3>
                <p className="mt-3 text-lg font-bold text-muted-foreground">{item.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
