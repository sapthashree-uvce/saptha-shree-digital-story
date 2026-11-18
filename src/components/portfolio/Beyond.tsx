import beyondChess from "@/assets/beyond-chess.jpg";
import beyondDrawing from "@/assets/beyond-drawing.jpg";
import beyondNovels from "@/assets/beyond-novels.jpg";
import beyondOpenSource from "@/assets/beyond-opensource.jpg";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const ITEMS = [
  {
    title: "Open-source software",
    note: "Reading code, learning in public.",
    image: beyondOpenSource,
    width: 1200,
    height: 912,
    alt: "Commit graph on a laptop screen",
    className: "lg:col-span-7 lg:row-span-1",
    aspect: "aspect-[16/10]",
    rotate: "lg:-rotate-1",
  },
  {
    title: "Chess",
    note: "Patience, patterns and planning ahead.",
    image: beyondChess,
    width: 1008,
    height: 1200,
    alt: "Black knight on a wooden chess board",
    className: "lg:col-span-4 lg:col-start-9 lg:-mt-10",
    aspect: "aspect-[4/5]",
    rotate: "lg:rotate-2",
  },
  {
    title: "Drawing",
    note: "Where ideas take shape on paper.",
    image: beyondDrawing,
    width: 1008,
    height: 1008,
    alt: "Pencil sketch in an open sketchbook",
    className: "lg:col-span-4 lg:col-start-2 lg:-mt-24",
    aspect: "aspect-square",
    rotate: "lg:rotate-2",
  },
  {
    title: "Reading novels",
    note: "Other worlds, one chapter at a time.",
    image: beyondNovels,
    width: 1008,
    height: 1200,
    alt: "Stack of novels under a reading lamp",
    className: "lg:col-span-5 lg:col-start-7 lg:mt-4",
    aspect: "aspect-[5/4]",
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

        <div className="mt-20 grid gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-y-16">
          {ITEMS.map((item, i) => (
            <Reveal key={item.title} delay={i * 90} className={item.className}>
              <figure className={`group transition-transform duration-700 hover:rotate-0 ${item.rotate}`}>
                <div className={`overflow-hidden rounded-3xl bg-ink shadow-float ${item.aspect}`}>
                  <img
                    src={item.image}
                    alt={item.alt}
                    width={item.width}
                    height={item.height}
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105"
                  />
                </div>
                <figcaption className="mt-4 flex items-baseline justify-between gap-4">
                  <span className="font-display text-2xl normal-case tracking-tight">{item.title}</span>
                  <span className="serif-accent text-right text-lg text-muted-foreground">{item.note}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
