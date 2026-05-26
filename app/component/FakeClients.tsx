"use client";
import React, { useEffect, useRef, useState } from "react";
import { useSite } from "../context/SiteContext";

type Props = {
  pauseOnHover?: boolean;
};

export default function FakeClients({ pauseOnHover = true }: Props) {
  const { theme } = useSite();
  const testimonials = [
    {
      id: 1,
      name: "Ehsan Naufal",
      role: "Teammates, CV. Batuah Talenta Semesta",
      quote:
        "Working with Rahmad was a pleasure — communication was clear and the quality of work exceeded our expectations.",
    },
    {
      id: 2,
      name: "Hamid",
      role: "CEO, CV. Batuah Talenta Semesta",
      quote:
        "Rahmad is a talented developer who delivers high-quality code on time. Highly recommended!",
    },
    {
      id: 3,
      name: "Khairul Anwar Hafizd",
      role: "CEO Batuah Talenta Semesta",
      quote:
        "Rahmad consistently brings practical solutions, clean execution, and strong ownership to every project we work on.",
    },
    {
      id: 4,
      name: "Abdul Ghani Zaen",
      role: "Teamates Batuah Talenta Semesta",
      quote:
        "Working with Rahmad is smooth and productive - he communicates clearly, solves problems fast, and delivers reliable results.",
    },
  ];

  // refs and ready-state ensure we measure first set width before enabling animation
  const containerRef = useRef<HTMLDivElement | null>(null);
  const firstSetRef = useRef<HTMLDivElement | null>(null);
  const [ready, setReady] = useState(false);

  // Respect reduced-motion preference
  const prefersReduced =
    typeof window !== "undefined" && window.matchMedia
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  useEffect(() => {
    if (prefersReduced) return; // don't animate
    // measure width of first set and set CSS variable
    const measure = () => {
      if (!containerRef.current || !firstSetRef.current) return;
      const w = firstSetRef.current.scrollWidth;
      try {
        containerRef.current.style.setProperty("--loop-width", `${w}px`);
      } catch (e) {
        // ignore
      }
      // small timeout to allow CSS paint before enabling animation to avoid jump
      setTimeout(() => setReady(true), 40);
    };

    measure();
    // re-measure on resize
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [prefersReduced]);

  // Pause-on-hover / pointer handlers for touch devices
  useEffect(() => {
    if (!pauseOnHover) return;
    const el = containerRef.current;
    if (!el) return;
    const pause = () => {
      try {
        el.style.animationPlayState = "paused";
      } catch (e) {}
    };
    const resume = () => {
      try {
        el.style.animationPlayState = "running";
      } catch (e) {}
    };
    el.addEventListener("pointerenter", pause);
    el.addEventListener("pointerleave", resume);
    el.addEventListener("touchstart", pause, { passive: true });
    el.addEventListener("touchend", resume, { passive: true });
    return () => {
      el.removeEventListener("pointerenter", pause);
      el.removeEventListener("pointerleave", resume);
      el.removeEventListener("touchstart", pause as EventListener);
      el.removeEventListener("touchend", resume as EventListener);
    };
  }, [pauseOnHover]);

  const speed = 20; // seconds for full loop (adjustable)

  return (
    <section
      id="clients"
      className={`w-full py-12 px-4 transition-colors duration-500 ${
        theme === "dark" ? "bg-black" : "bg-white"
      }`}
    >
      <div className="w-full max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h3
            className={`font-oxanium text-xl font-medium transition-colors duration-500 ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            What Clients Say
          </h3>
          <p
            className={`text-sm font-poppins transition-colors duration-500 ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          ></p>
        </div>

        <div className="overflow-hidden">
          {prefersReduced ? (
            <div className="flex gap-6 overflow-x-auto py-2">
              {testimonials.map((t) => (
                <blockquote
                  key={t.id}
                  className={`flex-shrink-0 w-[540px] md:w-96 rounded-xl p-6 transition-colors duration-500 border ${
                    theme === "dark"
                      ? "bg-white/3 border-white/10 text-white"
                      : "bg-gray-50 border-gray-200 text-gray-900"
                  }`}
                >
                  <p className="font-poppins text-sm leading-relaxed mb-4">
                    “{t.quote}”
                  </p>
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-md flex items-center justify-center font-bold text-sm transition-colors duration-500 ${
                        theme === "dark"
                          ? "bg-lime-600/80 text-black"
                          : "bg-lime-500 text-white"
                      }`}
                    >
                      {t.name
                        .split(" ")
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join("")}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-poppins text-sm font-medium">
                        {t.name}
                      </span>
                      <span
                        className={`text-xs font-poppins transition-colors duration-500 ${
                          theme === "dark" ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        {t.role}
                      </span>
                    </div>
                  </div>
                </blockquote>
              ))}
            </div>
          ) : (
            <div className={`relative ${pauseOnHover ? "pause-hover" : ""}`}>
              <div
                ref={containerRef}
                className={`flex gap-6 ${ready ? "animate-slide-left" : ""}`}
                // duration variable for convenience; --loop-width set in effect
                style={{ ["--slide-duration" as any]: `${speed}s` }}
              >
                <div ref={firstSetRef} className="flex gap-6">
                  {testimonials.map((t) => (
                    <blockquote
                      key={`first-${t.id}`}
                      className={`flex-shrink-0 w-[540px] md:w-96 rounded-xl p-6 transition-colors duration-500 border ${
                        theme === "dark"
                          ? "bg-white/3 border-white/10 text-white"
                          : "bg-gray-50 border-gray-200 text-gray-900"
                      }`}
                    >
                      <p className="font-poppins text-sm leading-relaxed mb-4">
                        “{t.quote}”
                      </p>
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-md flex items-center justify-center font-bold text-sm transition-colors duration-500 ${
                            theme === "dark"
                              ? "bg-lime-600/80 text-black"
                              : "bg-lime-500 text-white"
                          }`}
                        >
                          {t.name
                            .split(" ")
                            .map((n) => n[0])
                            .slice(0, 2)
                            .join("")}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-poppins text-sm font-medium">
                            {t.name}
                          </span>
                          <span
                            className={`text-xs font-poppins transition-colors duration-500 ${
                              theme === "dark"
                                ? "text-gray-400"
                                : "text-gray-500"
                            }`}
                          >
                            {t.role}
                          </span>
                        </div>
                      </div>
                    </blockquote>
                  ))}
                </div>

                {/* duplicate set */}
                <div className="flex gap-6">
                  {testimonials.map((t) => (
                    <blockquote
                      key={`dup-${t.id}`}
                      className={`flex-shrink-0 w-[540px] md:w-96 rounded-xl p-6 transition-colors duration-500 border ${
                        theme === "dark"
                          ? "bg-white/3 border-white/10 text-white"
                          : "bg-gray-50 border-gray-200 text-gray-900"
                      }`}
                    >
                      <p className="font-poppins text-sm leading-relaxed mb-4">
                        “{t.quote}”
                      </p>
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-md flex items-center justify-center font-bold text-sm transition-colors duration-500 ${
                            theme === "dark"
                              ? "bg-lime-600/80 text-black"
                              : "bg-lime-500 text-white"
                          }`}
                        >
                          {t.name
                            .split(" ")
                            .map((n) => n[0])
                            .slice(0, 2)
                            .join("")}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-poppins text-sm font-medium">
                            {t.name}
                          </span>
                          <span
                            className={`text-xs font-poppins transition-colors duration-500 ${
                              theme === "dark"
                                ? "text-gray-400"
                                : "text-gray-500"
                            }`}
                          >
                            {t.role}
                          </span>
                        </div>
                      </div>
                    </blockquote>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-1 * var(--loop-width)));
          }
        }
        .animate-slide-left {
          display: flex;
          gap: 1.5rem;
          animation: slide-left var(--slide-duration, 20s) linear infinite;
          will-change: transform;
        }
        /* pause on hover via CSS for desktop */
        .pause-hover:hover .animate-slide-left {
          animation-play-state: paused;
        }
        blockquote {
          min-height: 120px;
        }
      `}</style>
    </section>
  );
}
