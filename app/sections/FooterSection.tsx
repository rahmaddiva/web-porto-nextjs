"use client";
import { useSite } from "../context/SiteContext";

export default function FooterSection() {
  const { theme, handleNavClick, menuItems } = useSite();

  return (
    <footer
      className={`w-full border-t transition-colors duration-500 ${
        theme === "dark"
          ? "bg-gradient-to-t from-black via-zinc-950 to-black border-white/5"
          : "bg-gradient-to-t from-gray-100 via-gray-50 to-white border-gray-200"
      }`}
    >
      <div className="max-w-5xl mx-auto px-6">
        <div className="py-12 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
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
                <p className={`font-oxanium font-semibold transition-colors duration-500 ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}>
                  Rahmad Diva
                </p>
                <p className={`text-xs font-poppins transition-colors duration-500 ${
                  theme === "dark" ? "text-gray-500" : "text-gray-500"
                }`}>
                  Full Stack Developer
                </p>
              </div>
            </div>
            <p className={`font-poppins text-sm leading-relaxed transition-colors duration-500 ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}>
              Crafting digital experiences with passion and precision. Let&apos;s build something amazing together.
            </p>
          </div>

          <div className="md:col-span-1">
            <h4 className={`font-oxanium font-medium mb-4 transition-colors duration-500 ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}>
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
                    <span className={`w-1 h-1 rounded-full group-hover:bg-lime-500 transition-colors duration-500 ${
                      theme === "dark" ? "bg-gray-600" : "bg-gray-400"
                    }`} />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-1">
            <h4 className={`font-oxanium font-medium mb-4 transition-colors duration-500 ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}>
              Get In Touch
            </h4>
            <div className="space-y-3">
              <a
                href="mailto:mahendradiva64@gmail.com"
                className={`font-poppins text-sm hover:text-lime-500 transition-colors duration-500 flex items-center gap-3 ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className={theme === "dark" ? "text-gray-500" : "text-gray-400"}>
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                mahendradiva64@gmail.com
              </a>
              <p className={`font-poppins text-sm flex items-center gap-3 transition-colors duration-500 ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className={theme === "dark" ? "text-gray-500" : "text-gray-400"}>
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5" />
                </svg>
                Tanah Laut, Kalimantan Selatan
              </p>
            </div>
          </div>
        </div>

        <div className={`py-6 border-t flex flex-col md:flex-row items-center justify-between gap-4 transition-colors duration-500 ${
          theme === "dark" ? "border-white/5" : "border-gray-200"
        }`}>
          <p className={`font-poppins text-sm transition-colors duration-500 ${
            theme === "dark" ? "text-gray-500" : "text-gray-500"
          }`}>
            &copy; {new Date().getFullYear()} Rahmad Diva S.M. All rights reserved.
          </p>
          <div className={`flex items-center gap-2 font-poppins text-sm transition-colors duration-500 ${
            theme === "dark" ? "text-gray-500" : "text-gray-500"
          }`}>
            <span>Built with</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-red-500">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <span>using Next.js & Tailwind</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
