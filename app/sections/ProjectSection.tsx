"use client";
import GalleryShape from "../component/GalleryShape";
import { useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "../component/Reveal";

interface Repo {
  name: string;
  url: string;
  description: string | null;
  language: string | null;
  stars: number;
  updated: string;
}

const FALLBACK: Repo[] = [
  { name: "SIMPUN DISPUSIP", url: "https://github.com/rahmaddiva", description: "Library system — CodeIgniter · MySQL · Bootstrap", language: null, stars: 0, updated: "2024" },
  { name: "E-Agenda Bupati", url: "https://github.com/rahmaddiva", description: "Government agenda — CodeIgniter · Bootstrap · MySQL", language: null, stars: 0, updated: "2023" },
  { name: "SABAR-BAWASLU", url: "https://github.com/rahmaddiva", description: "Reporting system — CodeIgniter · MySQL · Bootstrap", language: null, stars: 0, updated: "2023" },
  { name: "DP3AP2KB Kab. Tanah Laut", url: "https://github.com/rahmaddiva", description: "Agency website — CodeIgniter · MySQL · jQuery", language: null, stars: 0, updated: "2022" },
  { name: "erdekatala", url: "https://github.com/rahmaddiva/erdekatala", description: "JavaScript project", language: "JavaScript", stars: 0, updated: "2026" },
  { name: "lafagen", url: "https://github.com/rahmaddiva/lafagen", description: "Vue project", language: "Vue", stars: 0, updated: "2026" },
];

export default function ProjectSection() {
  const [repos, setRepos] = useState<Repo[]>(FALLBACK);
  const [live, setLive] = useState(false);

  useEffect(() => {
    fetch("/api/repos")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data: Repo[]) => {
        if (Array.isArray(data) && data.length > 0) {
          setRepos(data);
          setLive(true);
          requestAnimationFrame(() => ScrollTrigger.refresh());
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section id="project" className="relative w-full py-24 md:py-32 px-6 overflow-hidden">
      <GalleryShape name="arrow" accent className="top-24 left-[3%] w-24 h-24 opacity-80" />
      <div className="max-w-4xl mx-auto">
        <Reveal>
          <p className="font-display text-sm tracking-[0.25em] uppercase text-muted mb-6">
            03 — Projects{live && <span className="normal-case tracking-normal"> · synced from GitHub</span>}
          </p>
        </Reveal>

        <div>
          {repos.map((p, i) => (
            <Reveal key={p.name} delay={Math.min(i * 0.08, 0.2)}>
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group grid grid-cols-[1fr_auto] items-baseline gap-4 py-7 border-t border-line last:border-b"
              >
                <div>
                  <h3 className="font-display font-semibold tracking-tight text-2xl md:text-4xl group-hover:text-accent transition-colors duration-200">
                    {p.name}
                  </h3>
                  <p className="text-muted mt-1">
                    {p.description ?? "No description"}
                    {p.language && <span> · {p.language}</span>}
                  </p>
                </div>
                <p className="font-display text-sm text-muted tabular-nums">
                  {yearOf(p.updated)}
                </p>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <a
            href="https://github.com/rahmaddiva"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-baseline gap-2 font-display font-medium text-lg mt-12"
          >
            <span className="underline underline-offset-8 decoration-line group-hover:decoration-accent transition-colors duration-200">
              More on GitHub
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

function yearOf(updated: string) {
  const d = new Date(updated);
  return Number.isNaN(d.getTime()) ? updated : String(d.getFullYear());
}
