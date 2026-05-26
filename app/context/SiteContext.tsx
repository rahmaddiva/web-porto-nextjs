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
  toggleTheme: () => void;
  dateTime: string;
  handleNavClick: (e: React.MouseEvent, href: string) => void;
  menuItems: typeof menuItems;
  socialItems: typeof socialItems;
}

const SiteContext = createContext<SiteContextType | null>(null);

export function SiteProvider({ children }: { children: ReactNode }) {
  const [dateTime, setDateTime] = useState("");
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const smootherRef = useRef<any>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const datePart = now.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
      const timePart = now.toLocaleTimeString("en-GB", { hour12: false });
      setDateTime(`${datePart} ${timePart}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      smootherRef.current = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.2,
        effects: true,
      });
    }
    return () => {
      if (smootherRef.current) {
        try {
          smootherRef.current.kill();
        } catch (e) {}
      }
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") {
      setTheme(stored as "dark" | "light");
      return;
    }
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: light)").matches
    ) {
      setTheme("light");
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem("theme", theme);
    try {
      document.documentElement.setAttribute("data-theme", theme);
    } catch (e) {}

    const targetBg = theme === "light" ? "#ffffff" : "#0a0a0a";
    const targetFg = theme === "light" ? "#0f1724" : "#ededed";

    try {
      gsap.to(document.documentElement, {
        duration: 0.5,
        ease: "power2.out",
        css: {
          "--background": targetBg,
          "--foreground": targetFg,
        },
      });
    } catch (e) {
      try {
        document.documentElement.style.setProperty("--background", targetBg);
        document.documentElement.style.setProperty("--foreground", targetFg);
      } catch (err) {}
    }
  }, [theme]);

  const toggleTheme = useCallback(
    () => setTheme((t) => (t === "dark" ? "light" : "dark")),
    []
  );

  const handleNavClick = useCallback(
    (e: React.MouseEvent, href: string) => {
      e.preventDefault();
      const target = document.querySelector(href);
      if (!target) return;
      if (
        smootherRef.current &&
        typeof smootherRef.current.scrollTo === "function"
      ) {
        try {
          smootherRef.current.scrollTo(target, true);
        } catch (err) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        target.scrollIntoView({ behavior: "smooth" });
      }
    },
    []
  );

  return (
    <SiteContext.Provider
      value={{ theme, toggleTheme, dateTime, handleNavClick, menuItems, socialItems }}
    >
      <div
        id="smooth-wrapper"
        className="min-h-screen bg-black text-white flex flex-col relative"
      >
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
