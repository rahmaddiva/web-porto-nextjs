"use client";
import GalleryShape from "./GalleryShape";
import Reveal from "./Reveal";

const testimonials = [
  {
    quote: "Communication was clear and the quality of work exceeded our expectations.",
    name: "Ehsan Naufal",
    role: "CV. Batuah Talenta Semesta",
  },
  {
    quote: "A talented developer who delivers high-quality code on time. Highly recommended.",
    name: "Hamid",
    role: "CEO, CV. Batuah Talenta Semesta",
  },
  {
    quote: "Practical solutions, clean execution, and strong ownership on every project.",
    name: "Khairul Anwar Hafizd",
    role: "CV. Batuah Talenta Semesta",
  },
];

export default function FakeClients() {
  return (
    <section id="clients" className="relative w-full py-24 md:py-32 px-6 overflow-hidden">
      <GalleryShape name="petals" className="bottom-16 right-[3%] w-32 h-32" />
      <div className="max-w-4xl mx-auto">
        <Reveal>
          <p className="font-display text-sm tracking-[0.25em] uppercase text-muted mb-12">
            Kind words
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={Math.min(i * 0.1, 0.2)}>
              <figure>
                <blockquote className="font-display text-xl leading-snug tracking-tight mb-4">
                  “{t.quote}”
                </blockquote>
                <figcaption className="text-sm text-muted">
                  {t.name} — {t.role}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
