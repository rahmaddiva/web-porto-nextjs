"use client";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedContent from "../component/AnimatedContent";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
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
];

export default function ExperienceSection() {
  useEffect(() => {
    const expCards = document.querySelectorAll(".exp-card");
    expCards.forEach((card, index) => {
      gsap.fromTo(
        card,
        { opacity: 0, x: index % 2 === 0 ? -60 : 60, y: 30 },
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
  }, []);

  return (
    <section id="experience" className="w-full py-20 px-4 bg-black flex items-center justify-center">
      <div className="w-full max-w-4xl mx-auto">
        <AnimatedContent direction="vertical" distance={60} duration={1} ease="power3.out">
          <h2 className="font-oxanium text-3xl sm:text-4xl md:text-5xl mb-4 text-white text-center">
            Experience .
          </h2>
          <p className="text-gray-400 font-poppins text-center mb-12 max-w-xl mx-auto">
            A journey through my professional career and the impactful projects I&apos;ve contributed to.
          </p>
        </AnimatedContent>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-lime-400 via-white/20 to-transparent transform md:-translate-x-1/2" />

          {experiences.map((exp, index) => (
            <div
              key={index}
              className={`exp-card relative flex items-center mb-12 ${
                exp.side === "left" ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-lime-400 rounded-full transform md:-translate-x-1/2 z-10 shadow-[0_0_20px_rgba(163,230,53,0.5)]">
                <div className="absolute inset-0 bg-lime-400 rounded-full animate-ping opacity-30" />
              </div>

              <div
                className={`ml-12 md:ml-0 md:w-[calc(50%-40px)] ${
                  exp.side === "left" ? "md:pr-8" : "md:pl-8"
                }`}
              >
                <div className="group relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-lime-400/30 transition-all duration-500 hover:shadow-[0_0_40px_rgba(163,230,53,0.1)]">
                  <div className="absolute inset-0 bg-gradient-to-br from-lime-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

                  <div className="relative inline-flex items-center gap-2 px-3 py-1 bg-lime-400/10 border border-lime-400/20 rounded-full mb-4">
                    <div className="w-2 h-2 bg-lime-400 rounded-full" />
                    <span className="text-lime-400 font-poppins text-sm font-medium">
                      {exp.year}
                    </span>
                  </div>

                  <h3 className="relative font-oxanium text-xl md:text-2xl text-white mb-1 group-hover:text-lime-400 transition-colors duration-500">
                    {exp.role}
                  </h3>
                  <p className="relative text-gray-400 font-poppins text-sm mb-4">
                    {exp.company}
                  </p>

                  <p className="relative text-gray-300 font-poppins text-sm leading-relaxed mb-5">
                    {exp.description}
                  </p>

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

                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-lime-400/10 to-transparent rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
