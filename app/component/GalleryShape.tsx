"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Paths adapted from shapes.gallery (free SVG set by Monika Michalczyk).
const PATHS: Record<string, string> = {
  // 52 — asterisk
  asterisk:
    "M 152 70.059 L 201.539 20.519 L 235.48 54.461 L 185.941 104 L 256 104 L 256 152 L 185.941 152 L 235.48 201.539 L 201.539 235.48 L 152 185.941 L 152 256 L 104 256 L 104 185.941 L 54.46 235.48 L 20.52 201.539 L 70.059 152 L 0 152 L 0 104 L 70.059 104 L 20.519 54.46 L 54.461 20.52 L 104 70.059 L 104 0 L 152 0 Z",
  // 14 — arrow
  arrow:
    "M 144 256 L 27.598 256 L 144 139.598 Z M 256 207.5 L 200 256 L 200 56 L 0 56 L 48 0 L 256 0 Z M 0 204.402 L 0 112 L 92.402 112 Z",
  // 4 — sparkle
  sparkle:
    "M 0 128 C 70.692 128 128 185.308 128 256 L 64 256 C 64 220.654 35.346 192 0 192 Z M 256 192 C 220.654 192 192 220.654 192 256 L 128 256 C 128 185.308 185.308 128 256 128 Z M 128 0 C 128 70.692 70.692 128 0 128 L 0 64 C 35.346 64 64 35.346 64 0 Z M 192 0 C 192 35.346 220.654 64 256 64 L 256 128 C 185.308 128 128 70.692 128 0 Z",
  // 24 — target rings
  target:
    "M 128 0 C 198.692 0 256 57.308 256 128 C 256 198.692 198.692 256 128 256 C 57.308 256 0 198.692 0 128 C 0 57.308 57.308 0 128 0 Z M 128 32 C 74.98 32 32 74.98 32 128 C 32 181.019 74.98 224 128 224 C 181.019 224 224 181.019 224 128 C 224 74.98 181.019 32 128 32 Z M 128 56 C 167.765 56 200 88.236 200 128 C 200 167.765 167.765 200 128 200 C 88.236 200 56 167.765 56 128 C 56 88.236 88.236 56 128 56 Z M 128 88 C 105.909 88 88 105.909 88 128 C 88 150.091 105.909 168 128 168 C 150.091 168 168 150.091 168 128 C 168 105.909 150.091 88 128 88 Z M 128 112 C 136.837 112 144 119.163 144 128 C 144 136.837 136.837 144 128 144 C 119.163 144 112 136.837 112 128 C 112 119.163 119.163 112 128 112 Z",
  // 49 — double curve
  curve:
    "M 0 0 C 70.692 0 128 57.308 128 128 C 128 198.692 70.692 256 0 256 Z M 256 256 C 185.308 256 128 198.692 128 128 C 128 57.308 185.308 0 256 0 Z",
  // 53 — petals
  petals:
    "M 128 128 C 128 198.692 70.692 256 0 256 C 0 185.308 57.308 128 128 128 Z M 128 128 C 198.692 128 256 185.308 256 256 C 185.308 256 128 198.692 128 128 Z M 0 0 C 70.692 0 128 57.308 128 128 C 57.308 128 0 70.692 0 0 Z M 256 0 C 256 70.692 198.692 128 128 128 C 128 57.308 185.308 0 256 0 Z",
  // 58 — orbit
  orbit:
    "M 0 128.007 C 0.004 198.696 57.31 256 128 256 L 0 256 Z M 256 256 L 128 256 C 198.69 256 255.996 198.696 256 128.007 Z M 192 128 C 192 163.346 163.346 192 128 192 C 92.654 192 64 163.346 64 128 Z M 128 0 C 198.692 0 256 57.308 256 128 L 192 128 C 192 92.654 163.346 64 128 64 C 92.654 64 64 92.654 64 128 L 0 128 C 0 57.308 57.308 0 128 0 Z",
  // 64 — plus in frame
  plus:
    "M 256 256 L 128 256 C 198.692 256 256 198.692 256 128 C 256 57.308 198.692 0 128 0 C 57.308 0 0 57.308 0 128 C 0 198.692 57.308 256 128 256 L 0 256 L 0 0 L 256 0 Z M 136 120 L 160 120 L 160 136 L 136 136 L 136 160 L 120 160 L 120 136 L 96 136 L 96 120 L 120 120 L 120 96 L 136 96 Z",
};

export type GalleryShapeName = keyof typeof PATHS;

interface GalleryShapeProps {
  name: GalleryShapeName;
  className?: string;
  accent?: boolean;
}

/** Gallery outline shape that drifts + rotates on scroll (scrub). */
export default function GalleryShape({ name, className = "", accent = false }: GalleryShapeProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.to(el, {
        y: -90,
        rotate: 45,
        ease: "none",
        scrollTrigger: {
          trigger: el.closest("section") ?? el,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute hidden md:block ${className}`}
    >
      <svg
        viewBox="0 0 256 256"
        className={`h-full w-full ${accent ? "text-accent" : "text-muted"}`}
        fill="none"
      >
        <path d={PATHS[name]} fill="currentColor" opacity={accent ? 0.9 : 0.5} />
      </svg>
    </div>
  );
}
