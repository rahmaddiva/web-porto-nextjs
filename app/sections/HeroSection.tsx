"use client";
import GalleryShape from "../component/GalleryShape";
import Reveal from "../component/Reveal";
import { useSite } from "../context/SiteContext";

export default function HeroSection() {
  const { handleNavClick } = useSite();

  return (
    <section id="home" className="relative flex-1 flex items-center px-6 pt-20 pb-28 md:pt-28 md:pb-36 overflow-hidden">
      <GalleryShape name="asterisk" accent className="top-20 right-[8%] w-28 h-28" />
      <div className="relative z-10 w-full max-w-4xl mx-auto">
        <Reveal>
          <p className="font-display text-sm tracking-[0.25em] uppercase text-muted mb-8">
            Rahmad Diva — Full Stack Developer
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className="font-display font-bold tracking-[-0.04em] leading-[0.92] text-[clamp(3.5rem,12vw,9rem)] mb-10">
            Build fast.
            <br />
            Ship clean<span className="text-accent">.</span>
          </h1>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="text-muted text-lg md:text-xl leading-relaxed max-w-xl mb-12">
            React, Next.js, Laravel — web experiences that are fast,
            responsive, and accessible. From Tanah Laut, Kalimantan Selatan.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <a
            href="#project"
            onClick={(e) => handleNavClick(e, "#project")}
            className="group inline-flex items-baseline gap-2 font-display font-medium text-lg"
          >
            <span className="underline underline-offset-8 decoration-line group-hover:decoration-accent transition-colors duration-200">
              Selected work
            </span>
            <span aria-hidden="true" className="text-accent transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
