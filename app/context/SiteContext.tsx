"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
  type ReactNode,
} from "react";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

const menuItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Project", href: "#project" },
  { label: "Contact", href: "#contact" },
];

const socialItems = [
  { label: "Instagram", link: "https://instagram.com/divayeaaaaa" },
  { label: "GitHub", link: "https://github.com/rahmaddiva" },
  {
    label: "LinkedIn",
    link: "https://www.linkedin.com/in/diva-mahendra110902/",
  },
];

interface SiteContextType {
  theme: "dark" | "light";
  toggleTheme: (origin?: { x: number; y: number }) => void;
  dither: boolean;
  toggleDither: (origin?: { x: number; y: number }) => void;
  handleNavClick: (e: React.MouseEvent, href: string) => void;
  menuItems: typeof menuItems;
  socialItems: typeof socialItems;
}

const SiteContext = createContext<SiteContextType | null>(null);

export function SiteProvider({ children }: { children: ReactNode }) {
  // "dark" matches SSR output; post-hydration effect syncs from
  // the pre-paint script's data-theme (avoids hydration mismatch).
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [dither, setDither] = useState(false);
  const mountedRef = useRef(false);
  const smootherRef = useRef<any>(null);


  useEffect(() => {
    smootherRef.current = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.2,
      effects: true,
    });
    return () => {
      try {
        smootherRef.current?.kill();
      } catch {}
    };
  }, []);

  // Persist runs first so its mount commit skips (mountedRef unset).
  useEffect(() => {
    if (!mountedRef.current) return;
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);
  useEffect(() => {
    if (!mountedRef.current) return;
    localStorage.setItem("dither", dither ? "on" : "off");
    document.documentElement.setAttribute("data-dither", dither ? "on" : "off");
  }, [dither]);
  useEffect(() => {
    const t = document.documentElement.getAttribute("data-theme");
    if (t === "light" || t === "dark") setTheme(t);
    setDither(document.documentElement.getAttribute("data-dither") === "on");
    mountedRef.current = true;
  }, []);
  // Reveal the dither change from the toggle button; falls back to
  // the CSS cross-fade when View Transitions are unsupported.
  const toggleDither = useCallback((origin?: { x: number; y: number }) => {
    const apply = () => setDither((d) => !d);
    if (origin && document.startViewTransition) {
      const { x, y } = origin;
      const r = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );
      const root = document.documentElement;
      root.style.setProperty("--vt-x", `${x}px`);
      root.style.setProperty("--vt-y", `${y}px`);
      root.style.setProperty("--vt-r", `${r}px`);
      document.startViewTransition(apply);
    } else {
      apply();
    }
  }, []);

  // Circular reveal from the toggle button; falls back to the
  // plain CSS color cross-fade when View Transitions are unsupported.
  const toggleTheme = useCallback((origin?: { x: number; y: number }) => {
    const apply = () =>
      setTheme((t) => (t === "dark" ? "light" : "dark"));
    if (origin && document.startViewTransition) {
      const { x, y } = origin;
      const r = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );
      const root = document.documentElement;
      root.style.setProperty("--vt-x", `${x}px`);
      root.style.setProperty("--vt-y", `${y}px`);
      root.style.setProperty("--vt-r", `${r}px`);
      document.startViewTransition(apply);
    } else {
      apply();
    }
  }, []);

  const handleNavClick = useCallback(
    (e: React.MouseEvent, href: string) => {
      e.preventDefault();
      const target = document.querySelector(href);
      if (!target) return;
      if (smootherRef.current) {
        try {
          smootherRef.current.scrollTo(target, true);
          return;
        } catch {}
      }
      target.scrollIntoView({ behavior: "smooth" });
    },
    []
  );

  return (
    <SiteContext.Provider
      value={{ theme, toggleTheme, dither, toggleDither, handleNavClick, menuItems, socialItems }}
    >
      <div id="smooth-wrapper" className="min-h-screen bg-bg text-fg flex flex-col relative">
        {children}
      </div>
    </SiteContext.Provider>
  );
}

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error("useSite must be used within SiteProvider");
  return ctx;
}
