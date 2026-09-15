import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Web Porto - Rahmad Diva",
  description:
    "Full Stack Web Developer portfolio - React, Next.js, Laravel, TypeScript. Based in Tanah Laut, Kalimantan Selatan.",
  icons: {
    icon: "/assets/logo1.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Pre-paint theme: prevents dark/light flash before React hydrates. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark"){t=matchMedia("(prefers-color-scheme: light)").matches?"light":"dark"}document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
