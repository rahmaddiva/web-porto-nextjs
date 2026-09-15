"use client";
import { useState } from "react";
import { useSite } from "../context/SiteContext";

export default function Navbar() {
  const { theme, toggleTheme, handleNavClick, menuItems } = useSite();
  const [navOpen, setNavOpen] = useState(false);

  const toggleFromEvent = (e: React.MouseEvent) => toggleTheme({ x: e.clientX, y: e.clientY });

  return (
    <nav className="sticky top-0 z-[100] w-full">
      <div className="absolute inset-0 bg-bg/80 backdrop-blur-xl" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-line" />

      <div className="relative max-w-5xl mx-auto flex items-center justify-between px-6 py-4">
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, "#home")}
          className="font-display font-bold text-lg tracking-tight no-underline"
          aria-label="Rahmad Diva — home"
        >
          RD<span className="text-accent">.</span>
        </a>

        <div className="hidden md:flex items-center gap-1">
          {menuItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="px-4 py-1.5 text-sm text-muted hover:text-fg transition-colors duration-200"
            >
              {item.label}
            </a>
          ))}
          <ThemeButton onClick={toggleFromEvent} theme={theme} />
        </div>

        <div className="md:hidden flex items-center gap-2">
          <ThemeButton onClick={toggleFromEvent} theme={theme} />
          <button
            className="p-2.5 text-fg"
            onClick={() => setNavOpen((v) => !v)}
            aria-label={navOpen ? "Close menu" : "Open menu"}
            aria-expanded={navOpen}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d={navOpen ? "M6 6l12 12M6 18L18 6" : "M4 7h16M4 17h16"}
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {navOpen && (
        <div className="relative md:hidden border-b border-line bg-bg/95 backdrop-blur-xl">
          <ul className="px-6 py-4 flex flex-col">
            {menuItems.map((item, i) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  onClick={(e) => {
                    handleNavClick(e, item.href);
                    setNavOpen(false);
                  }}
                  className="flex items-baseline gap-4 px-2 py-3"
                >
                  <span className="font-display text-xs text-accent tabular-nums">0{i + 1}</span>
                  <span className="font-display font-medium text-2xl">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}

function ThemeButton({ theme, onClick }: { theme: "dark" | "light"; onClick: (e: React.MouseEvent) => void }) {
  return (
    <button
      onClick={onClick}
      aria-label="Toggle theme"
      className="w-9 h-9 rounded-full text-muted hover:text-fg flex items-center justify-center transition-colors duration-200"
    >
      {theme === "dark" ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
}
