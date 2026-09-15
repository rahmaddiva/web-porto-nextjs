"use client";
import { useEffect, useRef } from "react";

// Geometric glyphs; dots dominate so the field stays subtle.
const GLYPHS = ["·", "·", "·", "·", "+", "×", "○", "□", "△", "─", "│", "/", "◆", "◇"];
const CELL = 30;
const TICK_MS = 160;

export default function AsciiBackground() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let field: string[][] = [];
    let cols = 0;
    let rows = 0;
    let color = "237 237 237";

    const readColor = () => {
      const v = getComputedStyle(document.documentElement).getPropertyValue("--fg").trim();
      if (v) color = v;
    };

    const seed = () => {
      field = Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => GLYPHS[(Math.random() * GLYPHS.length) | 0])
      );
    };

    const resize = () => {
      cols = Math.ceil(window.innerWidth / CELL) + 1;
      rows = Math.ceil(window.innerHeight / CELL) + 1;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      seed();
      paint();
    };

    const paint = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = "14px ui-monospace, monospace";
      ctx.textBaseline = "middle";
      ctx.fillStyle = `rgb(${color} / 0.08)`;
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          ctx.fillText(field[y][x], x * CELL, y * CELL);
        }
      }
    };

    // A slow wave sweeps across the field, mutating a few cells per tick.
    let t = 0;
    const tick = () => {
      t++;
      const n = Math.max(4, (cols * rows) >> 7);
      for (let i = 0; i < n; i++) {
        const x = (Math.random() * cols) | 0;
        const wave = Math.sin(x / 6 + t / 8) > 0.3;
        const y = (Math.random() * rows) | 0;
        field[y][x] = wave
          ? GLYPHS[4 + (((Math.random() * (GLYPHS.length - 4)) | 0))]
          : GLYPHS[(Math.random() * 4) | 0];
      }
      paint();
    };

    readColor();
    resize();
    const observer = new MutationObserver(readColor);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme", "data-dither"],
    });
    window.addEventListener("resize", resize);
    let timer: number | undefined;
    if (!reduced) timer = window.setInterval(tick, TICK_MS);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", resize);
      if (timer) window.clearInterval(timer);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
    />
  );
}
