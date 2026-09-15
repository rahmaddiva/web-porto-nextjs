"use client";
import { useSite } from "../context/SiteContext";

export default function FooterSection() {
  const { handleNavClick, menuItems } = useSite();

  return (
    <footer className="w-full border-t border-line">
      <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <p className="font-display font-bold tracking-tight">
          RD<span className="text-accent">.</span>
          <span className="ml-4 font-sans font-normal text-sm text-muted">
            © {new Date().getFullYear()} Rahmad Diva — Tanah Laut, ID
          </span>
        </p>
        <nav>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {menuItems.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="text-sm text-muted hover:text-fg transition-colors duration-200"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
