"use client";
import GalleryShape from "../component/GalleryShape";
import Reveal from "../component/Reveal";

export default function ContactSection() {
  return (
    <section id="contact" className="relative w-full py-28 md:py-40 px-6 overflow-hidden">
      <GalleryShape name="target" className="top-20 right-[6%] w-32 h-32" />
      <div className="max-w-4xl mx-auto text-center">
        <Reveal>
          <p className="font-display text-sm tracking-[0.25em] uppercase text-muted mb-8">04 — Contact</p>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="font-display font-bold tracking-[-0.03em] leading-[1.02] text-[clamp(2rem,7vw,4.5rem)] mb-10">
            Have something
            <br />
            to build<span className="text-accent">?</span>
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <a
            href="mailto:mahendradiva64@gmail.com"
            className="group inline-flex items-baseline gap-3 font-display font-medium text-xl md:text-2xl"
          >
            <span className="underline underline-offset-8 decoration-accent">
              mahendradiva64@gmail.com
            </span>
            <span aria-hidden="true" className="text-accent transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1">
              ↗
            </span>
          </a>
        </Reveal>

        <Reveal delay={0.3}>
          <p className="mt-14 text-sm text-muted">
            GitHub <span aria-hidden="true">·</span>{" "}
            <a href="https://github.com/rahmaddiva" target="_blank" rel="noopener noreferrer" className="hover:text-fg transition-colors duration-200">
              rahmaddiva
            </a>
            {"  "}LinkedIn <span aria-hidden="true">·</span>{" "}
            <a href="https://www.linkedin.com/in/diva-mahendra110902/" target="_blank" rel="noopener noreferrer" className="hover:text-fg transition-colors duration-200">
              Rahmad Diva
            </a>
            {"  "}Instagram <span aria-hidden="true">·</span>{" "}
            <a href="https://instagram.com/divayeaaaaa" target="_blank" rel="noopener noreferrer" className="hover:text-fg transition-colors duration-200">
              @divayeaaaaa
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
