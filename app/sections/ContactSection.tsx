"use client";
import AnimatedContent from "../component/AnimatedContent";
import { useSite } from "../context/SiteContext";
import {
  SiGithub,
  SiLinkedin,
  SiInstagram,
  SiFacebook,
  SiYoutube,
} from "react-icons/si";

export default function ContactSection() {
  const { theme, handleNavClick } = useSite();

  return (
    <section
      id="contact"
      className={`w-full py-24 px-4 flex items-center justify-center relative overflow-hidden transition-colors duration-500 ${
        theme === "dark" ? "bg-black" : "bg-gray-50"
      }`}
    >
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
        <AnimatedContent direction="vertical" distance={60} duration={1} ease="power3.out">
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
              Let&apos;s Work <span className="text-lime-500">Together</span>
            </h2>
            <p
              className={`font-poppins text-lg max-w-2xl mx-auto transition-colors duration-500 ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Have a project in mind? Let&apos;s create something amazing together. I&apos;m always excited to collaborate on innovative ideas.
            </p>
          </div>
        </AnimatedContent>

        <AnimatedContent direction="vertical" distance={40} duration={1} delay={0.3} ease="power3.out">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
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
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-lime-500">
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
                  <p className={`font-poppins text-sm mb-1 transition-colors duration-500 ${
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  }`}>
                    Email me at
                  </p>
                  <p className="font-poppins font-medium group-hover:text-lime-500 transition-colors duration-500 text-white">
                    mahendradiva64@gmail.com
                  </p>
                </div>
              </div>
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-lime-400">
                  <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </a>

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
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-cyan-500">
                    <path
                      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </div>
                <div>
                  <p className={`font-poppins text-sm mb-1 transition-colors duration-500 ${
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  }`}>
                    Based in
                  </p>
                  <p className="font-poppins font-medium transition-colors duration-500 text-white">
                    Tanah Laut, Kalimantan Selatan
                  </p>
                </div>
              </div>
            </div>
          </div>
        </AnimatedContent>

        <AnimatedContent direction="horizontal" distance={80} duration={0.8} delay={0.6} ease="power3.out">
          <div className="flex flex-col items-center">
            <p className={`font-poppins text-sm mb-6 transition-colors duration-500 ${
              theme === "dark" ? "text-gray-500" : "text-gray-500"
            }`}>
              Or find me on
            </p>
            <div className="flex items-center gap-4">
              {[
                { icon: SiLinkedin, href: "https://www.linkedin.com/in/diva-mahendra110902/", label: "LinkedIn", color: "hover:bg-blue-500/20 hover:border-blue-500/30 hover:text-blue-500" },
                { icon: SiGithub, href: "https://github.com/rahmaddiva", label: "GitHub", color: "hover:bg-gray-500/20 hover:border-gray-500/30 hover:text-gray-700" },
                { icon: SiInstagram, href: "https://instagram.com/divayeaaaaa", label: "Instagram", color: "hover:bg-pink-500/20 hover:border-pink-500/30 hover:text-pink-500" },
                { icon: SiFacebook, href: "https://facebook.com/hendra.kazami", label: "Facebook", color: "hover:bg-blue-600/20 hover:border-blue-600/30 hover:text-blue-600" },
                { icon: SiYoutube, href: "https://www.youtube.com/@RahmadDiva", label: "YouTube", color: "hover:bg-red-500/20 hover:border-red-500/30 hover:text-red-500" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 ${social.color} ${
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
  );
}
