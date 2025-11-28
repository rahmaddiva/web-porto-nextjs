"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";

import AnimatedContent from "./component/AnimatedContent";
import TextType from "./component/TextType";
import TiltedCard from "./component/TiltedCard";
import CardSwap, { Card } from "./component/CardSwap";
import dynamic from "next/dynamic";
import { SpeedInsights } from "@vercel/speed-insights/next";

const StaggeredMenu = dynamic(() => import("./component/StaggeredMenu"), {
  ssr: false,
});

import {
  SiReact,
  SiReactivex,
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
  SiLaravel,
  SiCodeigniter,
  SiGithub,
  SiLinkedin,
  SiInstagram,
  SiFacebook,
  SiGitter,
} from "react-icons/si";

export default function Home() {
  // New menu and social items for StaggeredMenu
  const menuItems = [
    { label: "Home", ariaLabel: "Go to home section", link: "#home" },
    { label: "About", ariaLabel: "Go to about section", link: "#about" },
    { label: "Project", ariaLabel: "Go to project section", link: "#project" },
    { label: "Contact", ariaLabel: "Go to contact section", link: "#contact" },
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

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const dateStr =
        now.toLocaleTimeString("en-US", { hour12: false }) +
        " " +
        now.getFullYear() +
        "-" +
        String(now.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(now.getDate()).padStart(2, "0");
      setDateTime(dateStr);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="min-h-screen bg-black text-white flex flex-col relative"
      style={{ scrollBehavior: "smooth" }}
    >
      {/* Navbar replaced with StaggeredMenu (updated usage) */}
      <StaggeredMenu
        position="right"
        items={menuItems}
        socialItems={socialItems}
        displaySocials={true}
        displayItemNumbering={true}
        menuButtonColor="#fff"
        openMenuButtonColor="#84cc16"
        changeMenuColorOnOpen={true}
        colors={["#18181b", "#232323", "#35353c", "#84cc16"]}
        logoUrl="/path-to-your-logo.svg"
        accentColor="#84cc16"
        onMenuOpen={() => console.log("Menu opened")}
        onMenuClose={() => console.log("Menu closed")}
        className="sticky top-0 z-50"
        isFixed={false}
      />
      {/* Home Section */}
      <section
        id="home"
        className="flex-1 mt-11 flex items-center justify-center px-4 relative overflow-hidden"
      >
        {/* Threads background */}
        <div
          style={{
            width: "100%",
            height: "300px",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 0,
          }}
        ></div>
        <div className="w-full max-w-4xl mx-auto text-left relative z-10">
          <AnimatedContent
            direction="vertical"
            distance={60}
            duration={1}
            ease="power3.out"
          >
            <TextType
              as="h1"
              text={[
                "Crafting purpose driven experiences that inspire & engage.",
                "Precision-driven code that solves real problems, not hypothetical ones.",
                "Building digital solutions that make a difference, one line of code at a time.",
              ]}
              className="font-oxanium text-4xl sm:text-6xl md:text-7xl leading-tight mb-6"
              typingSpeed={60}
              pauseDuration={900}
              showCursor={true}
              cursorClassName="text-lime-400"
              textColors={["white"]}
            />
          </AnimatedContent>
          <AnimatedContent
            direction="vertical"
            distance={40}
            duration={1}
            delay={0.3}
            ease="power3.out"
          >
            <p className="text-white font-poppins text-sm max-w-xl mb-8">
              I'm a passionate web developer specializing in creating dynamic
              and responsive websites using modern technologies like React,
              Next.js, Laravel, Codeigniter etc, With a keen eye for design and
              a commitment to performance, I build digital experiences that not
              only look great but also function seamlessly across all devices.
              Let's bring your ideas to life on the web!
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
                I am a full stack web developer based in Tanah Laut, Kalimantan
                Selatan, passionate about building modern, responsive, and
                accessible websites. My focus is on clean code, great user
                experience, and continuous learning in the world of web
                technology.
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
      <br />
      {/* Divider Section */}
      <div className="w-full mt-7 flex justify-center">
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
              cardDistance={60}
              verticalDistance={70}
              delay={5000}
              pauseOnHover={false}
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
          </div>
        </div>
      </section>
      <br />
      {/* Footer */}
      <footer className="w-full px-6 py-4 bg-[#18181b] text-center text-sm text-gray-400 font-poppins">
        &copy; {new Date().getFullYear()} Rahmad Diva S.M. All rights reserved.
      </footer>
      {/* Vercel Speed Insights */}
      <SpeedInsights />
    </div>
  );
}
