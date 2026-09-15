"use client";
import GalleryShape from "../component/GalleryShape";
import Reveal from "../component/Reveal";

const groups = [
  { label: "Frontend", items: "React · React Native · Next.js · TypeScript · Tailwind CSS" },
  { label: "Backend", items: "Node.js · Express · Laravel · CodeIgniter · PHP · Go · Python" },
  { label: "Data & Tools", items: "MySQL · Nginx · Git · Figma · Bootstrap" },
];

export default function AboutSection() {
  return (
    <section id="about" className="relative w-full py-24 md:py-32 px-6 overflow-hidden">
      <GalleryShape name="sparkle" className="bottom-24 left-[3%] w-32 h-32" />
      <div className="max-w-4xl mx-auto">
        <Reveal>
          <p className="font-display text-sm tracking-[0.25em] uppercase text-muted mb-6">01 — About</p>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="font-display font-medium tracking-tight leading-[1.15] text-3xl md:text-5xl max-w-3xl mb-16">
            Full stack developer obsessed with clean code, honest performance,
            and interfaces that stay out of the way.
          </p>
        </Reveal>

        <div>
          {groups.map((g, i) => (
            <Reveal key={g.label} delay={i * 0.1}>
              <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-2 md:gap-8 py-6 border-t border-line last:border-b">
                <p className="font-display text-sm tracking-[0.2em] uppercase text-accent">{g.label}</p>
                <p className="text-muted text-lg leading-relaxed">{g.items}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
