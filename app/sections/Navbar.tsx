"use client";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useSite } from "../context/SiteContext";

export default function Navbar() {
  const { theme, toggleTheme, dateTime, handleNavClick, menuItems } = useSite();
  const [navOpen, setNavOpen] = useState(false);
  const themeBtnRef = useRef<HTMLButtonElement | null>(null);
  const themeBtnMobileRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (themeBtnRef.current) {
      const btn = themeBtnRef.current;
      const sun = btn.querySelector(".icon-sun") as SVGElement | null;
      const moon = btn.querySelector(".icon-moon") as SVGElement | null;
      try {
        if (sun)
          gsap.to(sun, {
            duration: 0.34,
            opacity: theme === "dark" ? 1 : 0,
            ease: "power1.out",
          });
        if (moon)
          gsap.to(moon, {
            duration: 0.34,
            opacity: theme === "dark" ? 0 : 1,
            ease: "power1.out",
          });
        gsap.fromTo(
          btn,
          { scale: 0.92, rotation: theme === "dark" ? -8 : 8 },
          { duration: 0.5, scale: 1, rotation: 0, ease: "elastic.out(1,0.6)" }
        );
      } catch (e) {}
    }
    if (themeBtnMobileRef.current) {
      const mbtn = themeBtnMobileRef.current;
      const msun = mbtn.querySelector(".icon-sun") as SVGElement | null;
      const mmoon = mbtn.querySelector(".icon-moon") as SVGElement | null;
      try {
        if (msun)
          gsap.to(msun, {
            duration: 0.34,
            opacity: theme === "dark" ? 1 : 0,
            ease: "power1.out",
          });
        if (mmoon)
          gsap.to(mmoon, {
            duration: 0.34,
            opacity: theme === "dark" ? 0 : 1,
            ease: "power1.out",
          });
        gsap.fromTo(
          mbtn,
          { scale: 0.94, rotation: theme === "dark" ? -6 : 6 },
          { duration: 0.45, scale: 1, rotation: 0, ease: "back.out(1.2)" }
        );
      } catch (e) {}
    }
  }, [theme]);

  return (
    <nav className="sticky top-0 z-[100] w-full">
      <div
        className={`absolute inset-0 backdrop-blur-xl transition-colors duration-500 ${
          theme === "dark"
            ? "bg-gradient-to-r from-black/80 via-black/70 to-black/80"
            : "bg-gradient-to-r from-white/90 via-white/85 to-white/90"
        }`}
      />
      <div
        className={`absolute inset-0 bg-gradient-to-b to-transparent transition-colors duration-500 ${
          theme === "dark" ? "from-lime-400/5" : "from-lime-500/10"
        }`}
      />
      <div
        className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent to-transparent transition-colors duration-500 ${
          theme === "dark" ? "via-lime-400/30" : "via-lime-600/40"
        }`}
      />
      <div className="relative max-w-5xl mx-auto flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, "#home")}
            className="group flex items-center gap-3 no-underline"
          >
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-lime-400/20 to-cyan-400/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <img
                src="assets/logo1.png"
                alt="Diva logo"
                className={`relative w-10 h-10 object-contain rounded-full ring-2 group-hover:ring-lime-500/50 transition-all duration-500 ${
                  theme === "dark" ? "ring-white/10" : "ring-black/10"
                }`}
              />
            </div>
            <div className="flex flex-col leading-tight">
              <span
                className={`text-sm font-oxanium font-medium tracking-wide group-hover:text-lime-500 transition-colors duration-500 ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                Rahmad Diva
              </span>
              <span
                className={`text-[11px] font-poppins transition-colors duration-500 ${
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {dateTime}
              </span>
            </div>
          </a>
        </div>

        <div className="hidden md:flex items-center gap-2">
          <div
            className={`flex items-center gap-1 backdrop-blur-sm rounded-full p-1.5 border transition-colors duration-500 ${
              theme === "dark"
                ? "bg-white/5 border-white/10"
                : "bg-black/5 border-black/10 shadow-sm"
            }`}
          >
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`group relative px-4 py-2 rounded-full text-sm font-poppins font-medium transition-all duration-500 ${
                  theme === "dark"
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <span className="relative z-10">{item.label}</span>
                <span className="absolute inset-0 bg-gradient-to-r from-lime-400/80 to-lime-500/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="absolute inset-0 bg-lime-400/20 rounded-full opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300" />
              </a>
            ))}
          </div>

          <button
            ref={themeBtnRef}
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className={`ml-3 p-2.5 rounded-full border hover:border-lime-500/50 transition-all duration-500 relative w-10 h-10 flex items-center justify-center group ${
              theme === "dark"
                ? "bg-white/5 hover:bg-white/10 border-white/10 text-white"
                : "bg-black/5 hover:bg-black/10 border-black/10 text-gray-700"
            }`}
          >
            <div className="absolute inset-0 bg-lime-400/10 rounded-full opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300" />
            <svg
              className="icon-sun absolute"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              style={{ opacity: theme === "dark" ? 1 : 0 }}
            >
              <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
              <path
                d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            <svg
              className="icon-moon absolute"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              style={{ opacity: theme === "dark" ? 0 : 1 }}
            >
              <path
                d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="sr-only">Toggle theme</span>
          </button>
        </div>

        <div className="md:hidden">
          <button
            className={`relative p-2.5 rounded-full border hover:border-lime-500/50 focus:outline-none transition-all duration-500 group ${
              theme === "dark"
                ? "bg-white/5 border-white/10 text-white"
                : "bg-black/5 border-black/10 text-gray-700"
            }`}
            onClick={() => setNavOpen((v) => !v)}
            aria-label="Open menu"
          >
            <div className="absolute inset-0 bg-lime-400/10 rounded-full opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300" />
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="relative">
              <path
                d={navOpen ? "M6 6l12 12M6 18L18 6" : "M4 6h16M4 12h16M4 18h16"}
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                className="transition-all duration-300"
              />
            </svg>
          </button>
        </div>
      </div>

      {navOpen && (
        <div className="relative md:hidden">
          <div
            className={`absolute inset-0 backdrop-blur-xl transition-colors duration-500 ${
              theme === "dark" ? "bg-black/95" : "bg-white/95"
            }`}
          />
          <div className="relative px-6 pb-6 pt-4">
            <ul className="flex flex-col gap-2">
              {menuItems.map((item, index) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={(e) => {
                      handleNavClick(e, item.href);
                      setNavOpen(false);
                    }}
                    className={`group flex items-center gap-3 font-poppins font-medium px-4 py-3 rounded-xl transition-all duration-500 hover:bg-lime-400/10 border border-transparent hover:border-lime-400/20 ${
                      theme === "dark" ? "text-white" : "text-gray-800"
                    }`}
                  >
                    <span className="w-1.5 h-1.5 bg-lime-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <div
              className={`mt-4 pt-4 border-t transition-colors duration-500 ${
                theme === "dark" ? "border-white/10" : "border-black/10"
              }`}
            >
              <button
                ref={themeBtnMobileRef}
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className={`w-full flex items-center gap-3 justify-center px-4 py-3 rounded-xl hover:bg-lime-400/10 border hover:border-lime-400/20 transition-all duration-500 relative ${
                  theme === "dark"
                    ? "bg-white/5 border-white/10 text-white"
                    : "bg-black/5 border-black/10 text-gray-700"
                }`}
              >
                <svg
                  className="icon-sun"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  style={{ opacity: theme === "dark" ? 1 : 0, position: "absolute", left: "1rem" }}
                >
                  <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
                  <path
                    d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                <svg
                  className="icon-moon"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  style={{ opacity: theme === "dark" ? 0 : 1, position: "absolute", left: "1rem" }}
                >
                  <path
                    d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="font-poppins text-sm">
                  {theme === "dark" ? "Switch to Light" : "Switch to Dark"}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
