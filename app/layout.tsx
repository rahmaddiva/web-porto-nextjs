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
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark"){t=matchMedia("(prefers-color-scheme: light)").matches?"light":"dark"}document.documentElement.setAttribute("data-theme",t);document.documentElement.setAttribute("data-dither",localStorage.getItem("dither")==="on"?"on":"off")}catch(e){}})()`,
          }}
        />
      </head>
      <body>
        <div className="dither-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
