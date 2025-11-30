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
        duration: 0.45,
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
      <nav className="sticky top-0 z-[100] w-full bg-black/75 backdrop-blur-md shadow-lg border-b border-white/6">
        <div className="max-w-4xl mx-auto flex items-center justify-between px-4 py-3">
          {/* Minimal logo (text + accent) */}
          <div className="flex items-center gap-3">
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, "#home")}
              className="flex items-center gap-2 no-underline"
            >
              {/* image */}
              <img
                src="assets/logo1.png"
                alt="Diva logo"
                className="w-8 h-8 object-contain"
              />
              <div className="flex flex-col leading-tight">
                <span className="text-sm font-oxanium text-white">
                  Tanah Laut, Kalimantan Selatan
                </span>
                <span className="text-xs text-gray-300">{dateTime}</span>
              </div>
            </a>
          </div>

          {/* Theme toggle button */}
          <div className="hidden md:flex items-center gap-3">
            <button
              ref={themeBtnRef}
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-md bg-white/5 hover:bg-white/10 transition text-white relative w-9 h-9 flex items-center justify-center"
            >
              {/* Always render both icons and control opacity via GSAP so we can animate morph/crossfade */}
              <svg
                className="icon-sun absolute"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                style={{ opacity: theme === "dark" ? 1 : 0 }}
              >
                <path
                  d="M12 4V2"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 22v-2"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M4 12H2"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M22 12h-2"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M5 5l-1.4-1.4"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M19.4 19.4L18 18"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M5 19l-1.4 1.4"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M19.4 4.6L18 6"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="3"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
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
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="sr-only">Toggle theme</span>
            </button>
          </div>

          {/* Desktop menu: simple, icon-free, strong hover */}
          <ul className="hidden md:flex gap-4 items-center">
            {menuItems.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="group relative text-white font-medium px-4 py-2 rounded-md transition-colors duration-200 hover:text-black hover:bg-lime-400/90"
                >
                  <span className="relative z-10">{item.label}</span>
                  <span className="absolute left-2 right-2 -bottom-1 h-0.5 bg-lime-400 rounded-full scale-x-0 group-hover:scale-x-100 transform origin-left transition-transform duration-200" />
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile button */}
          <div className="md:hidden">
            <button
              className="text-white p-2 rounded-md focus:outline-none bg-black/60 hover:bg-white/10 transition"
              onClick={() => setNavOpen((v) => !v)}
              aria-label="Open menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 6h16M4 12h16M4 18h16"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown (simpler) */}
        {navOpen && (
          <div className="md:hidden bg-black/90 px-4 pb-4 pt-3 border-t border-white/6">
            <ul className="flex flex-col gap-2">
              {menuItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="block text-white font-medium px-4 py-2 rounded-md transition-colors duration-200 hover:bg-lime-400/90 hover:text-black"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-3 px-2">
              <button
                ref={themeBtnMobileRef}
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="w-full flex items-center gap-3 justify-center px-4 py-2 rounded-md bg-white/5 hover:bg-white/10 text-white transition relative h-10"
              >
                <svg
                  className="icon-sun absolute left-4"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  style={{ opacity: theme === "dark" ? 1 : 0 }}
                >
                  <path
                    d="M12 4V2"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 22v-2"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4 12H2"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M22 12h-2"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="3"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <svg
                  className="icon-moon absolute left-4"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  style={{ opacity: theme === "dark" ? 0 : 1 }}
                >
                  <path
                    d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="font-poppins">
                  {theme === "dark" ? "Light mode" : "Dark mode"}
                </span>
              </button>
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
          className="w-full py-20 px-4 bg-black flex items-center justify-center"
        >
          <div className="w-full max-w-4xl mx-auto text-center">
            <AnimatedContent
              direction="vertical"
              distance={60}
              duration={1}
              ease="power3.out"
            >
              <h2 className="font-oxanium text-3xl sm:text-4xl md:text-5xl mb-6 text-white">
                Get In Touch .
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
                I'm always open to discussing new projects, creative ideas, or
                opportunities to be part of your visions. Feel free to reach out
                to me via email or connect with me on LinkedIn.
              </p>
            </AnimatedContent>
            <AnimatedContent
              direction="horizontal"
              distance={80}
              duration={0.8}
              delay={0.6}
              ease="power3.out"
            >
              <a
                href="mailto:mahendradiva64@gmail.com"
                className="inline-block border border-white text-white font-poppins px-8 py-3 rounded-full hover:bg-white hover:text-black transition"
              >
                Contact Me
              </a>
            </AnimatedContent>
            {/* Social Media Icons */}
            <div className="flex justify-center gap-6 mt-8">
              <a
                href="https://www.linkedin.com/in/diva-mahendra110902/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <SiLinkedin className="text-white hover:text-lime-400 text-2xl transition" />
              </a>
              <a
                href="https://instagram.com/divayeaaaaa"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <SiInstagram className="text-white hover:text-lime-400 text-2xl transition" />
              </a>
              <a
                href="https://facebook.com/hendra.kazami"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <SiFacebook className="text-white hover:text-lime-400 text-2xl transition" />
              </a>
              {/* youtube */}
              <a
                href="https://www.youtube.com/@RahmadDiva"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
              >
                <SiYoutube className="text-white hover:text-lime-400 text-2xl transition" />
              </a>
            </div>
          </div>
        </section>
        <br />
        {/* Footer */}
        <footer className="w-full px-6 py-4 bg-[#18181b] text-center text-sm text-gray-400 font-poppins">
          &copy; {new Date().getFullYear()} Rahmad Diva S.M. All rights
          reserved.
        </footer>
        {/* Vercel Speed Insights */}
        <SpeedInsights />
      </div>
    </div>
  );
}
