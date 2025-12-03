"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";

import AnimatedContent from "./component/AnimatedContent";
import TextType from "./component/TextType";
import TiltedCard from "./component/TiltedCard";
import CardSwap, { Card } from "./component/CardSwap";
import dynamic from "next/dynamic";
import { SpeedInsights } from "@vercel/speed-insights/next";
import CurvedLoop from "./component/CurvedLoop";
import {
  SiReact,
  SiPhp,
  SiExpress,
  SiPython,
  SiCplusplus,
  SiBootstrap,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiJavascript,
  SiNodedotjs,
  SiFigma,
  SiGit,
  SiGo,
  SiYoutube,
  SiLaravel,
  SiCodeigniter,
  SiGithub,
  SiLinkedin,
  SiInstagram,
  SiFacebook,
  SiGitter,
} from "react-icons/si";

import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { label } from "motion/react-client";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

export default function Home() {
  // Navbar menu items
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
  const [dateTime, setDateTime] = useState("");
  const [navOpen, setNavOpen] = useState(false);
  // Default to 'dark' on server to avoid hydration mismatch.
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const smootherRef = useRef<any>(null);

  useEffect(() => {
    // DateTime updater
    const updateTime = () => {
      const now = new Date();
      // Date in format: 30 Nov 2025 14:23:12
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

    // GSAP ScrollSmoother initialization (client only)
    if (typeof window !== "undefined") {
      smootherRef.current = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.2,
        effects: true,
      });
    }

    // Animate experience cards with ScrollTrigger
    const expCards = document.querySelectorAll(".exp-card");
    expCards.forEach((card, index) => {
      gsap.fromTo(
        card,
        {
          opacity: 0,
          x: index % 2 === 0 ? -60 : 60,
          y: 30,
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            end: "top 50%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => {
      clearInterval(interval);
      if (smootherRef.current) {
        try {
          smootherRef.current.kill();
        } catch (e) {
          // ignore
        }
      }
    };
  }, []);

  // Smooth scroll handler that uses ScrollSmoother when available
  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (!target) return;
    if (
      smootherRef.current &&
      typeof smootherRef.current.scrollTo === "function"
    ) {
      // ScrollSmoother expects the target element or selector
      try {
        smootherRef.current.scrollTo(target, true);
      } catch (err) {
        // fallback to native
        target.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      target.scrollIntoView({ behavior: "smooth" });
    }
    setNavOpen(false);
  };

  // Persist theme and animate CSS variables for a smooth transition
  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem("theme", theme);
    // set data-theme attribute so CSS overrides that rely on the attribute still apply
    try {
      document.documentElement.setAttribute("data-theme", theme);
    } catch (e) {
      // ignore
    }

    // Animate the CSS variables that control colors for a smooth visual transition.
    const targetBg = theme === "light" ? "#ffffff" : "#0a0a0a";
    const targetFg = theme === "light" ? "#0f1724" : "#ededed";

    try {
      // Use GSAP if available to tween the CSS variables on the root element.
      gsap.to(document.documentElement, {
        duration: 0.5,
        ease: "power2.out",
        css: {
          "--background": targetBg,
          "--foreground": targetFg,
        },
      });
    } catch (e) {
      // Fallback: set inline variables immediately (no animation)
      try {
        document.documentElement.style.setProperty("--background", targetBg);
        document.documentElement.style.setProperty("--foreground", targetFg);
      } catch (err) {
        // ignore
      }
    }
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));
  // On first client mount, read stored preference or system preference
  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") {
      setTheme(stored as "light" | "dark");
      return;
    }
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: light)").matches
    ) {
      setTheme("light");
    }
  }, []);

  // Theme button ref + micro-interaction animation on theme change
  const themeBtnRef = useRef<HTMLButtonElement | null>(null);
  const themeBtnMobileRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // animate desktop button if present
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
      } catch (e) {
        // ignore
      }
    }

    // animate mobile button if present
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
      } catch (e) {
        // ignore
      }
    }
  }, [theme]);

  return (
    <div
      id="smooth-wrapper"
      className="min-h-screen bg-black text-white flex flex-col relative"
    >
      {/* Sticky Navbar outside GSAP ScrollSmoother content for best compatibility */}
      <nav className="sticky top-0 z-[100] w-full">
        {/* Glassmorphism background - theme aware */}
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
          {/* Logo section with glow effect */}
          <div className="flex items-center gap-4">
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, "#home")}
              className="group flex items-center gap-3 no-underline"
            >
              {/* Logo with animated ring */}
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

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {/* Nav Pills */}
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

            {/* Theme toggle */}
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
                <circle
                  cx="12"
                  cy="12"
                  r="4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
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

          {/* Mobile button */}
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
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                className="relative"
              >
                <path
                  d={
                    navOpen ? "M6 6l12 12M6 18L18 6" : "M4 6h16M4 12h16M4 18h16"
                  }
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  className="transition-all duration-300"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
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
                      onClick={(e) => handleNavClick(e, item.href)}
                      className={`group flex items-center gap-3 font-poppins font-medium px-4 py-3 rounded-xl transition-all duration-500 hover:bg-lime-400/10 border border-transparent hover:border-lime-400/20 ${
                        theme === "dark" ? "text-white" : "text-gray-800"
                      }`}
                      style={{ animationDelay: `${index * 50}ms` }}
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
                    style={{
                      opacity: theme === "dark" ? 1 : 0,
                      position: "absolute",
                      left: "1rem",
                    }}
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
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
                    style={{
                      opacity: theme === "dark" ? 0 : 1,
                      position: "absolute",
                      left: "1rem",
                    }}
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
      <div id="smooth-content">
        {/* Home Section */}
        <section
          id="home"
          className="flex-1 mt-11 flex items-center justify-center px-4 relative overflow-hidden"
        >
          <div className="w-full max-w-4xl mx-auto text-left relative z-10 flex flex-col">
            {/* Fixed height for h1+p block to keep p always in same position below h1 */}
            <div className="flex flex-col" style={{ minHeight: "220px" }}>
              <AnimatedContent
                direction="vertical"
                distance={60}
                duration={1}
                ease="power3.out"
              >
                <TextType
                  as="h1"
                  text={[
                    "Execution over theory. Always.",
                    "Performance first.Excuses never.",
                    "Turning complexity into leverage.",
                  ]}
                  className="font-oxanium text-3xl sm:text-5xl md:text-6xl leading-tight mb-6"
                  typingSpeed={60}
                  pauseDuration={900}
                  showCursor={true}
                  cursorClassName="text-lime-400"
                  textColors={[
                    theme === "dark" ? "white" : "var(--foreground)",
                  ]}
                />
              </AnimatedContent>
              <AnimatedContent
                direction="vertical"
                distance={40}
                duration={1}
                delay={0.3}
                ease="power3.out"
              >
                <p className="text-white font-poppins text-lg max-w-xl mb-8">
                  I'm a passionate web developer specializing in creating
                  dynamic and responsive websites using modern technologies like
                  React, Next.js, Laravel, Codeigniter etc, With a keen eye for
                  design and a commitment to performance, I build digital
                  experiences that not only look great but also function
                  seamlessly across all devices. Let's bring your ideas to life
                  on the web!
                </p>
              </AnimatedContent>
            </div>
            <AnimatedContent
              direction="horizontal"
              distance={80}
              duration={0.8}
              delay={0.6}
              ease="power3.out"
            >
              <a
                href="#about"
                className="inline-block border border-white text-white font-poppins px-8 py-3 rounded-full hover:bg-white hover:text-black transition"
              >
                Know me better
              </a>
            </AnimatedContent>
          </div>
        </section>
        <br />
        {/* Divider Section */}
        <div className="w-full mt-11 flex justify-center">
          <div className="h-px w-full max-w-4xl bg-white/10 my-0" />
        </div>
        {/* About Section */}
        <section
          id="about"
          className="w-full py-20 px-4 bg-black flex items-center justify-center"
        >
          <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-6 gap-12 items-center">
            {/* Caption Kiri */}
            <div className="md:col-span-4 col-span-1">
              <AnimatedContent
                direction="vertical"
                distance={60}
                duration={1}
                ease="power3.out"
              >
                <h2 className="font-oxanium text-3xl sm:text-4xl md:text-5xl mb-6 text-white">
                  About Me .
                </h2>
              </AnimatedContent>
              <AnimatedContent
                direction="vertical"
                distance={40}
                duration={1}
                delay={0.3}
                ease="power3.out"
              >
                <p className="text-gray-300 font-poppins text-lg mb-8">
                  I am a full stack web developer based in Tanah Laut,
                  Kalimantan Selatan, passionate about building modern,
                  responsive, and accessible websites. My focus is on clean
                  code, great user experience, and continuous learning in the
                  world of web technology.
                </p>
              </AnimatedContent>
              <AnimatedContent
                direction="horizontal"
                distance={80}
                duration={0.8}
                delay={0.6}
                ease="power3.out"
              >
                <ul className="flex flex-wrap gap-6 items-center mt-2">
                  <li className="flex items-center gap-2 text-sm font-poppins text-gray-100">
                    <SiReact className="text-blue-500" /> React.js
                  </li>
                  <li className="flex items-center gap-2 text-sm font-poppins text-gray-100">
                    <SiReact className="text-cyan-600" /> React Native
                  </li>
                  <li className="flex items-center gap-2 text-sm font-poppins text-gray-100">
                    <SiNextdotjs className="text-gray-900" /> Next.js
                  </li>
                  <li className="flex items-center gap-2 text-sm font-poppins text-gray-100">
                    <SiTailwindcss className="text-cyan-500" /> Tailwind CSS
                  </li>
                  <li className="flex items-center gap-2 text-sm font-poppins text-gray-100">
                    <SiTypescript className="text-blue-700" /> TypeScript
                  </li>
                  <li className="flex items-center gap-2 text-sm font-poppins text-gray-100">
                    <SiJavascript className="text-yellow-500" /> JavaScript
                  </li>
                  <li className="flex items-center gap-2 text-sm font-poppins text-gray-100">
                    <SiNodedotjs className="text-green-600" /> Node.js
                  </li>
                  <li className="flex items-center gap-2 text-sm font-poppins text-gray-100">
                    <SiExpress className="text-gray-700" /> Express.js
                  </li>
                  <li className="flex items-center gap-2 text-sm font-poppins text-gray-100">
                    <SiFigma className="text-pink-500" /> Figma
                  </li>
                  <li className="flex items-center gap-2 text-sm font-poppins text-gray-100">
                    <SiGit className="text-orange-600" /> Git
                  </li>
                  <li className="flex items-center gap-2 text-sm font-poppins text-gray-100">
                    <SiGo className="text-blue-400" /> Golang
                  </li>
                  <li className="flex items-center gap-2 text-sm font-poppins text-gray-100">
                    <SiLaravel className="text-red-600" /> Laravel
                  </li>
                  <li className="flex items-center gap-2 text-sm font-poppins text-gray-100">
                    <SiCodeigniter className="text-red-500" /> CodeIgniter
                  </li>
                  <li className="flex items-center gap-2 text-sm font-poppins text-gray-100">
                    <SiPhp className="text-indigo-600" /> PHP
                  </li>
                  <li className="flex items-center gap-2 text-sm font-poppins text-gray-100">
                    <SiPython className="text-yellow-400" /> Python
                  </li>
                  <li className="flex items-center gap-2 text-sm font-poppins text-gray-100">
                    <SiCplusplus className="text-blue-700" /> C++
                  </li>
                  <li className="flex items-center gap-2 text-sm font-poppins text-gray-100">
                    <SiBootstrap className="text-purple-600" /> Bootstrap
                  </li>
                </ul>
              </AnimatedContent>
            </div>
            {/* Foto Kanan */}
            <div className="md:col-span-2 col-span-1 flex justify-center">
              <AnimatedContent
                direction="horizontal"
                distance={80}
                duration={1}
                ease="power3.out"
              >
                <div className="w-full flex justify-center">
                  <TiltedCard
                    imageSrc="/assets/about.jpg"
                    altText="Profile Large"
                    captionText="That's me!"
                    containerHeight="270px"
                    containerWidth="270px"
                    imageHeight="260px"
                    imageWidth="260px"
                    scaleOnHover={1.12}
                    rotateAmplitude={20}
                    showMobileWarning={true}
                    showTooltip={true}
                    displayOverlayContent={true}
                    overlayContent={
                      <p className="bg-black/60 text-white text-sm px-3 py-1 rounded-full">
                        Rahmad Diva S.M
                      </p>
                    }
                  />
                </div>
              </AnimatedContent>
            </div>
          </div>
        </section>

        {/* section curvedloop */}
        <section className="w-full flex justify-center py-0 px-4 bg-black">
          <div className="w-full max-w-4xl mx-auto">
            <CurvedLoop
              marqueeText="Web Developer • React.js • Next.js • Laravel • Codeigniter • Full Stack Developer • Responsive Design • Web Performance • UI/UX Enthusiast • Passionate Coder • Problem Solver • Lifelong Learner • Tech Enthusiast • Critical Thinking • "
              speed={1.5}
              curveAmount={0}
              interactive={true}
            />
          </div>
        </section>

        {/* Experience Section */}
        <section
          id="experience"
          className="w-full py-20 px-4 bg-black flex items-center justify-center"
        >
          <div className="w-full max-w-4xl mx-auto">
            <AnimatedContent
              direction="vertical"
              distance={60}
              duration={1}
              ease="power3.out"
            >
              <h2 className="font-oxanium text-3xl sm:text-4xl md:text-5xl mb-4 text-white text-center">
                Experience .
              </h2>
              <p className="text-gray-400 font-poppins text-center mb-12 max-w-xl mx-auto">
                A journey through my professional career and the impactful
                projects I've contributed to.
              </p>
            </AnimatedContent>

            {/* Timeline */}
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-lime-400 via-white/20 to-transparent transform md:-translate-x-1/2" />

              {/* Experience Items */}
              {[
                {
                  year: "2024 - Present",
                  role: "Full Stack Developer | Freelance",
                  company: "Div Coding",
                  description:
                    "Leading development of enterprise web applications using Next.js, Laravel, and etc. Implementing scalable solutions and optimizing performance for diverse clients.",
                  tech: ["Next.js", "Laravel", "CI4", "Nginx"],
                  side: "left",
                },
                {
                  year: "2023 - 2024",
                  role: "Programmer | IT Support",
                  company: "Dinas Perpustakaan dan Kearsipan Tanah Laut",
                  description:
                    "Developed and maintained the library management system, enhancing user experience and system efficiency. Provided IT support and training to staff on new technologies.",
                  tech: ["React.js", "CodeIgniter", "Laravel", "Nginx"],
                  side: "right",
                },
                {
                  year: "2022 - 2023",
                  role: "Full Stack Developer | Mentor",
                  company: "CV. Batuah Talenta Semesta",
                  description:
                    "Spearheaded development of web applications for clients in various industries. Mentored junior developers and conducted code reviews to ensure best practices.",
                  tech: ["PHP", "CodeIgniter", "MySQL", "Bootstrap"],
                  side: "left",
                },
                {
                  year: "2022 - 2023",
                  role: "Intern",
                  company: "PT.Cipta Krida Bahari Logistics",
                  description:
                    "Assisted in developing and maintaining the company's logistics management system. Worked on enhancing user experience and optimizing backend processes.",
                  tech: ["PHP", "CodeIgniter", "MySQL", "Bootstrap"],
                  side: "right",
                },
              ].map((exp, index) => (
                <div
                  key={index}
                  className={`exp-card relative flex items-center mb-12 ${
                    exp.side === "left" ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-lime-400 rounded-full transform md:-translate-x-1/2 z-10 shadow-[0_0_20px_rgba(163,230,53,0.5)]">
                    <div className="absolute inset-0 bg-lime-400 rounded-full animate-ping opacity-30" />
                  </div>

                  {/* Content card */}
                  <div
                    className={`ml-12 md:ml-0 md:w-[calc(50%-40px)] ${
                      exp.side === "left" ? "md:pr-8" : "md:pl-8"
                    }`}
                  >
                    <div className="group relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-lime-400/30 transition-all duration-500 hover:shadow-[0_0_40px_rgba(163,230,53,0.1)]">
                      {/* Glow effect on hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-lime-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

                      {/* Year badge */}
                      <div className="relative inline-flex items-center gap-2 px-3 py-1 bg-lime-400/10 border border-lime-400/20 rounded-full mb-4">
                        <div className="w-2 h-2 bg-lime-400 rounded-full" />
                        <span className="text-lime-400 font-poppins text-sm font-medium">
                          {exp.year}
                        </span>
                      </div>

                      {/* Role & Company */}
                      <h3 className="relative font-oxanium text-xl md:text-2xl text-white mb-1 group-hover:text-lime-400 transition-colors duration-500">
                        {exp.role}
                      </h3>
                      <p className="relative text-gray-400 font-poppins text-sm mb-4">
                        {exp.company}
                      </p>

                      {/* Description */}
                      <p className="relative text-gray-300 font-poppins text-sm leading-relaxed mb-5">
                        {exp.description}
                      </p>

                      {/* Tech stack */}
                      <div className="relative flex flex-wrap gap-2">
                        {exp.tech.map((t, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-poppins text-gray-300 hover:bg-lime-400/10 hover:border-lime-400/30 hover:text-lime-400 transition-all duration-500"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      {/* Decorative corner */}
                      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-lime-400/10 to-transparent rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Divider Section */}
        <div className="w-full flex justify-center">
          <div className="h-px w-full max-w-4xl bg-white/10 my-0" />
        </div>

        {/* Project Section */}
        <section
          id="project"
          className="w-full py-20 px-4 mt-8 bg-black flex items-center justify-center"
        >
          <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start md:items-center">
            {/* Caption Kiri */}
            <div className="md:col-span-1 col-span-1 flex flex-col justify-center">
              <AnimatedContent
                direction="vertical"
                distance={60}
                duration={1}
                ease="power3.out"
              >
                <h2 className="font-oxanium text-3xl sm:text-4xl md:text-5xl mb-6 text-white">
                  My Projects .
                </h2>
              </AnimatedContent>
              <AnimatedContent
                direction="vertical"
                distance={40}
                duration={1}
                delay={0.3}
                ease="power3.out"
              >
                <p className="text-gray-300 font-poppins text-sm mb-8 max-w-2xl">
                  Here are some of the projects I've worked on, showcasing my
                  skills in web development. Each project reflects my commitment
                  to creating high-quality, user-friendly digital experiences.
                </p>
              </AnimatedContent>
              {/* github */}
              <AnimatedContent
                direction="horizontal"
                distance={80}
                duration={0.8}
                delay={0.6}
                ease="power3.out"
              >
                <a
                  href="https://github.com/rahmaddiva"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full border-1 border-white/40 text-white font-poppins px-6 py-2 rounded-full hover:bg-black/40 hover:text-white transition items-center justify-start text-left"
                >
                  <SiGithub className="text-xl mr-2" />
                  View My GitHub
                </a>
              </AnimatedContent>
            </div>
            {/* CardSwap Kanan */}
            <div
              className="md:col-span-1 col-span-1 flex justify-end items-center relative mt-8 md:mt-0 w-full max-w-full md:max-w-xs"
              style={{ minHeight: "320px", height: "100%" }}
            >
              <CardSwap
                cardDistance={35}
                verticalDistance={45}
                delay={3400}
                pauseOnHover={false}
                skewAmount={12}
              >
                <Card>
                  <div className="w-full h-full relative border border-white/30 rounded-xl shadow-md">
                    <div className="absolute top-0 left-0 w-full bg-black/60 p-4 rounded-t-xl z-10">
                      <h3 className="font-oxanium text-xl text-white mb-1">
                        SIMPUN DISPUSIP
                      </h3>
                      <p className="text-sm text-gray-300">
                        Codeigniter, MySql, Bootstrap
                      </p>
                    </div>
                    <img
                      src="/assets/projekdispusip.png"
                      alt="Portfolio Web"
                      className="absolute top-0 left-0 w-full h-full object-cover rounded-xl"
                    />
                  </div>
                </Card>
                <Card>
                  <div className="w-full h-full relative border border-white/30 rounded-xl shadow-md">
                    <div className="absolute top-0 left-0 w-full bg-black/60 p-4 rounded-t-xl z-10">
                      <h3 className="font-oxanium text-xl text-white mb-1">
                        E-Agenda Bupati
                      </h3>
                      <p className="text-sm text-gray-300">
                        Codeigniter, Bootstrap, MySQL
                      </p>
                    </div>
                    <img
                      src="/assets/projeksetda.png"
                      alt="Company Profile"
                      className="absolute top-0 left-0 w-full h-full object-cover rounded-xl"
                    />
                  </div>
                </Card>
                <Card>
                  <div className="w-full h-full relative border border-white/30 rounded-xl shadow-md">
                    <div className="absolute top-0 left-0 w-full bg-black/60 p-4 rounded-t-xl z-10">
                      <h3 className="font-oxanium text-xl text-white mb-1">
                        SABAR-BAWASLU
                      </h3>
                      <p className="text-sm text-gray-300">
                        Codeigniter, MySql, Bootstrap
                      </p>
                    </div>
                    <img
                      src="/assets/projekbawaslu.png"
                      alt="API Service"
                      className="absolute top-0 left-0 w-full h-full object-cover rounded-xl"
                    />
                  </div>
                </Card>
              </CardSwap>
            </div>
          </div>
        </section>
        <br />
        {/* Divider Section */}
        <div className="w-full mt-11 flex justify-center">
          <div className="h-px w-full max-w-4xl bg-white/10 my-0" />
        </div>
        {/* Contact Section */}
        <section
          id="contact"
          className={`w-full py-24 px-4 flex items-center justify-center relative overflow-hidden transition-colors duration-500 ${
            theme === "dark" ? "bg-black" : "bg-gray-50"
          }`}
        >
          {/* Background decorations */}
          <div className="absolute inset-0 overflow-hidden">
            <div
              className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl transition-colors duration-500 ${
                theme === "dark" ? "bg-lime-400/5" : "bg-lime-400/10"
              }`}
            />
            <div
              className={`absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl transition-colors duration-500 ${
                theme === "dark" ? "bg-cyan-400/5" : "bg-cyan-400/10"
              }`}
            />
          </div>

          <div className="w-full max-w-4xl mx-auto relative z-10">
            <AnimatedContent
              direction="vertical"
              distance={60}
              duration={1}
              ease="power3.out"
            >
              <div className="text-center mb-12">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-lime-400/10 border border-lime-400/20 rounded-full mb-6">
                  <span className="w-2 h-2 bg-lime-400 rounded-full animate-pulse" />
                  <span className="text-lime-400 font-poppins text-sm font-medium">
                    Available for work
                  </span>
                </span>
                <h2
                  className={`font-oxanium text-4xl sm:text-5xl md:text-6xl mb-4 transition-colors duration-500 ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}
                >
                  Let's Work <span className="text-lime-500">Together</span>
                </h2>
                <p
                  className={`font-poppins text-lg max-w-2xl mx-auto transition-colors duration-500 ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Have a project in mind? Let's create something amazing
                  together. I'm always excited to collaborate on innovative
                  ideas.
                </p>
              </div>
            </AnimatedContent>

            {/* Contact Cards */}
            <AnimatedContent
              direction="vertical"
              distance={40}
              duration={1}
              delay={0.3}
              ease="power3.out"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {/* Email Card */}
                <a
                  href="mailto:mahendradiva64@gmail.com"
                  className={`group relative backdrop-blur-sm rounded-2xl p-6 hover:border-lime-400/30 transition-all duration-500 hover:shadow-[0_0_40px_rgba(163,230,53,0.15)] ${
                    theme === "dark"
                      ? "bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10"
                      : "bg-white border border-gray-200 shadow-sm hover:shadow-lg"
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-lime-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                  <div className="relative flex items-center gap-4">
                    <div
                      className={`w-14 h-14 border rounded-xl flex items-center justify-center group-hover:bg-lime-400/20 transition-colors duration-500 ${
                        theme === "dark"
                          ? "bg-lime-400/10 border-lime-400/20"
                          : "bg-lime-50 border-lime-200"
                      }`}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="text-lime-500"
                      >
                        <path
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div>
                      <p
                        className={`font-poppins text-sm mb-1 transition-colors duration-500 ${
                          theme === "dark" ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        Email me at
                      </p>
                      <p
                        className={`font-poppins font-medium group-hover:text-lime-500 transition-colors duration-500 ${
                          theme === "dark" ? "text-white" : "text-gray-900"
                        }`}
                      >
                        mahendradiva64@gmail.com
                      </p>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="text-lime-400"
                    >
                      <path
                        d="M7 17L17 7M17 7H7M17 7V17"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </a>

                {/* Location Card */}
                <div
                  className={`group relative backdrop-blur-sm rounded-2xl p-6 transition-all duration-500 ${
                    theme === "dark"
                      ? "bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10"
                      : "bg-white border border-gray-200 shadow-sm"
                  }`}
                >
                  <div className="relative flex items-center gap-4">
                    <div
                      className={`w-14 h-14 border rounded-xl flex items-center justify-center transition-colors duration-500 ${
                        theme === "dark"
                          ? "bg-cyan-400/10 border-cyan-400/20"
                          : "bg-cyan-50 border-cyan-200"
                      }`}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="text-cyan-500"
                      >
                        <path
                          d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <circle
                          cx="12"
                          cy="9"
                          r="2.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                      </svg>
                    </div>
                    <div>
                      <p
                        className={`font-poppins text-sm mb-1 transition-colors duration-500 ${
                          theme === "dark" ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        Based in
                      </p>
                      <p
                        className={`font-poppins font-medium transition-colors duration-500 ${
                          theme === "dark" ? "text-white" : "text-gray-900"
                        }`}
                      >
                        Tanah Laut, Kalimantan Selatan
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedContent>

            {/* Social Links */}
            <AnimatedContent
              direction="horizontal"
              distance={80}
              duration={0.8}
              delay={0.6}
              ease="power3.out"
            >
              <div className="flex flex-col items-center">
                <p
                  className={`font-poppins text-sm mb-6 transition-colors duration-500 ${
                    theme === "dark" ? "text-gray-500" : "text-gray-500"
                  }`}
                >
                  Or find me on
                </p>
                <div className="flex items-center gap-4">
                  {[
                    {
                      icon: SiLinkedin,
                      href: "https://www.linkedin.com/in/diva-mahendra110902/",
                      label: "LinkedIn",
                      color:
                        "hover:bg-blue-500/20 hover:border-blue-500/30 hover:text-blue-500",
                    },
                    {
                      icon: SiGithub,
                      href: "https://github.com/rahmaddiva",
                      label: "GitHub",
                      color:
                        "hover:bg-gray-500/20 hover:border-gray-500/30 hover:text-gray-700",
                    },
                    {
                      icon: SiInstagram,
                      href: "https://instagram.com/divayeaaaaa",
                      label: "Instagram",
                      color:
                        "hover:bg-pink-500/20 hover:border-pink-500/30 hover:text-pink-500",
                    },
                    {
                      icon: SiFacebook,
                      href: "https://facebook.com/hendra.kazami",
                      label: "Facebook",
                      color:
                        "hover:bg-blue-600/20 hover:border-blue-600/30 hover:text-blue-600",
                    },
                    {
                      icon: SiYoutube,
                      href: "https://www.youtube.com/@RahmadDiva",
                      label: "YouTube",
                      color:
                        "hover:bg-red-500/20 hover:border-red-500/30 hover:text-red-500",
                    },
                  ].map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 ${
                        social.color
                      } ${
                        theme === "dark"
                          ? "bg-white/5 border border-white/10 text-gray-400"
                          : "bg-gray-100 border border-gray-200 text-gray-500"
                      }`}
                    >
                      <social.icon className="text-xl" />
                    </a>
                  ))}
                </div>
              </div>
            </AnimatedContent>
          </div>
        </section>

        {/* Footer */}
        <footer
          className={`w-full border-t transition-colors duration-500 ${
            theme === "dark"
              ? "bg-gradient-to-t from-black via-zinc-950 to-black border-white/5"
              : "bg-gradient-to-t from-gray-100 via-gray-50 to-white border-gray-200"
          }`}
        >
          <div className="max-w-5xl mx-auto px-6">
            {/* Main Footer Content */}
            <div className="py-12 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {/* Brand Column */}
              <div className="md:col-span-1">
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src="assets/logo1.png"
                    alt="Diva logo"
                    className={`w-10 h-10 object-contain rounded-full ring-2 transition-all duration-500 ${
                      theme === "dark" ? "ring-white/10" : "ring-gray-200"
                    }`}
                  />
                  <div>
                    <p
                      className={`font-oxanium font-semibold transition-colors duration-500 ${
                        theme === "dark" ? "text-white" : "text-gray-900"
                      }`}
                    >
                      Rahmad Diva
                    </p>
                    <p
                      className={`text-xs font-poppins transition-colors duration-500 ${
                        theme === "dark" ? "text-gray-500" : "text-gray-500"
                      }`}
                    >
                      Full Stack Developer
                    </p>
                  </div>
                </div>
                <p
                  className={`font-poppins text-sm leading-relaxed transition-colors duration-500 ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Crafting digital experiences with passion and precision. Let's
                  build something amazing together.
                </p>
              </div>

              {/* Quick Links */}
              <div className="md:col-span-1">
                <h4
                  className={`font-oxanium font-medium mb-4 transition-colors duration-500 ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}
                >
                  Quick Links
                </h4>
                <ul className="space-y-2">
                  {menuItems.map((item) => (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        onClick={(e) => handleNavClick(e, item.href)}
                        className={`font-poppins text-sm hover:text-lime-500 transition-colors duration-500 flex items-center gap-2 group ${
                          theme === "dark" ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        <span
                          className={`w-1 h-1 rounded-full group-hover:bg-lime-500 transition-colors duration-500 ${
                            theme === "dark" ? "bg-gray-600" : "bg-gray-400"
                          }`}
                        />
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact Info */}
              <div className="md:col-span-1">
                <h4
                  className={`font-oxanium font-medium mb-4 transition-colors duration-500 ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}
                >
                  Get In Touch
                </h4>
                <div className="space-y-3">
                  <a
                    href="mailto:mahendradiva64@gmail.com"
                    className={`font-poppins text-sm hover:text-lime-500 transition-colors duration-500 flex items-center gap-3 ${
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      className={
                        theme === "dark" ? "text-gray-500" : "text-gray-400"
                      }
                    >
                      <path
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    mahendradiva64@gmail.com
                  </a>
                  <p
                    className={`font-poppins text-sm flex items-center gap-3 transition-colors duration-500 ${
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      className={
                        theme === "dark" ? "text-gray-500" : "text-gray-400"
                      }
                    >
                      <path
                        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <circle
                        cx="12"
                        cy="9"
                        r="2.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                    </svg>
                    Tanah Laut, Kalimantan Selatan
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div
              className={`py-6 border-t flex flex-col md:flex-row items-center justify-between gap-4 transition-colors duration-500 ${
                theme === "dark" ? "border-white/5" : "border-gray-200"
              }`}
            >
              <p
                className={`font-poppins text-sm transition-colors duration-500 ${
                  theme === "dark" ? "text-gray-500" : "text-gray-500"
                }`}
              >
                &copy; {new Date().getFullYear()} Rahmad Diva S.M. All rights
                reserved.
              </p>
              <div
                className={`flex items-center gap-2 font-poppins text-sm transition-colors duration-500 ${
                  theme === "dark" ? "text-gray-500" : "text-gray-500"
                }`}
              >
                <span>Built with</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="text-red-500"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                <span>using Next.js & Tailwind</span>
              </div>
            </div>
          </div>
        </footer>
        {/* Vercel Speed Insights */}
        <SpeedInsights />
      </div>
    </div>
  );
}
