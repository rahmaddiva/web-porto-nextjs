"use client";
import GalleryShape from "../component/GalleryShape";
import Reveal from "../component/Reveal";

const experiences = [
  {
    year: "2024 — Present",
    role: "Full Stack Developer, Freelance",
    company: "Div Coding",
    tech: "Next.js · Laravel · CI4 · Nginx",
  },
  {
    year: "2023 — 2024",
    role: "Programmer & IT Support",
    company: "Dinas Perpustakaan dan Kearsipan Tanah Laut",
    tech: "React · CodeIgniter · Laravel · Nginx",
  },
  {
    year: "2022 — 2023",
    role: "Full Stack Developer & Mentor",
    company: "CV. Batuah Talenta Semesta",
    tech: "PHP · CodeIgniter · MySQL · Bootstrap",
  },
  {
    year: "2022 — 2023",
    role: "Intern",
    company: "PT. Cipta Krida Bahari Logistics",
    tech: "PHP · CodeIgniter · MySQL · Bootstrap",
  },
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="relative w-full py-24 md:py-32 px-6 overflow-hidden">
      <GalleryShape name="orbit" className="top-24 right-[3%] w-36 h-36" />
      <div className="max-w-4xl mx-auto">
        <Reveal>
          <p className="font-display text-sm tracking-[0.25em] uppercase text-muted mb-6">02 — Experience</p>
        </Reveal>

        <div>
          {experiences.map((exp, i) => (
            <Reveal key={i} delay={Math.min(i * 0.08, 0.2)}>
              <article className="group grid grid-cols-1 md:grid-cols-[160px_1fr] gap-2 md:gap-8 py-8 border-t border-line last:border-b">
                <p className="font-display text-sm text-muted tabular-nums pt-1">{exp.year}</p>
                <div>
                  <h3 className="font-display font-semibold tracking-tight text-2xl md:text-3xl mb-1 group-hover:text-accent transition-colors duration-200">
                    {exp.role}
                  </h3>
                  <p className="text-muted mb-2">{exp.company}</p>
                  <p className="text-sm text-muted/80">{exp.tech}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
