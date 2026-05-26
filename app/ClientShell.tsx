"use client";
import dynamic from "next/dynamic";
import { SiteProvider } from "./context/SiteContext";
import { SpeedInsights } from "@vercel/speed-insights/next";
import FakeClients from "./component/FakeClients";

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
      <Navbar />
      <div id="smooth-content">
        <HeroSection />
        <br />
        <div className="w-full mt-11 flex justify-center">
          <div className="h-px w-full max-w-4xl bg-white/10 my-0" />
        </div>
        <AboutSection />
        <FakeClients />
        <ExperienceSection />
        <div className="w-full flex justify-center">
          <div className="h-px w-full max-w-4xl bg-white/10 my-0" />
        </div>
        <ProjectSection />
        <br />
        <div className="w-full mt-11 flex justify-center">
          <div className="h-px w-full max-w-4xl bg-white/10 my-0" />
        </div>
        <ContactSection />
        <FooterSection />
        <SpeedInsights />
      </div>
    </SiteProvider>
  );
}
