"use client";
import dynamic from "next/dynamic";
import { SiteProvider } from "./context/SiteContext";
import { SpeedInsights } from "@vercel/speed-insights/next";
import FakeClients from "./component/FakeClients";
import AsciiBackground from "./component/AsciiBackground";

const Navbar = dynamic(() => import("./sections/Navbar"));
const HeroSection = dynamic(() => import("./sections/HeroSection"));
const AboutSection = dynamic(() => import("./sections/AboutSection"));
const ExperienceSection = dynamic(() => import("./sections/ExperienceSection"));
const ProjectSection = dynamic(() => import("./sections/ProjectSection"));
const ContactSection = dynamic(() => import("./sections/ContactSection"));
const FooterSection = dynamic(() => import("./sections/FooterSection"));

export default function ClientShell() {
  return (
    <SiteProvider>
      <AsciiBackground />
      <Navbar />
      <div id="smooth-content" className="relative z-10">
        <HeroSection />
        <AboutSection />
        <FakeClients />
        <ExperienceSection />
        <ProjectSection />
        <ContactSection />
        <FooterSection />
        <SpeedInsights />
      </div>
    </SiteProvider>
  );
}
