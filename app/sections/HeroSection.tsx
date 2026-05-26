"use client";
import AnimatedContent from "../component/AnimatedContent";
import TextType from "../component/TextType";
import { useSite } from "../context/SiteContext";

export default function HeroSection() {
  const { theme, handleNavClick } = useSite();

  return (
    <section
      id="home"
      className="flex-1 mt-11 flex items-center justify-center px-4 relative overflow-hidden"
    >
      <div className="w-full max-w-4xl mx-auto text-left relative z-10 flex flex-col">
        <div className="flex flex-col" style={{ minHeight: "220px" }}>
          <AnimatedContent direction="vertical" distance={60} duration={1} ease="power3.out">
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
              textColors={[theme === "dark" ? "white" : "var(--foreground)"]}
            />
          </AnimatedContent>
          <AnimatedContent direction="vertical" distance={40} duration={1} delay={0.3} ease="power3.out">
            <p className="text-white font-poppins text-lg max-w-xl mb-8">
              I&apos;m a passionate web developer specializing in creating dynamic and responsive websites using modern technologies like React, Next.js, Laravel, Codeigniter etc, With a keen eye for design and a commitment to performance, I build digital experiences that not only look great but also function seamlessly across all devices. Let&apos;s bring your ideas to life on the web!
            </p>
          </AnimatedContent>
        </div>
        <AnimatedContent direction="horizontal" distance={80} duration={0.8} delay={0.6} ease="power3.out">
          <a
            href="#about"
            onClick={(e) => handleNavClick(e, "#about")}
            className="inline-block border border-white text-white font-poppins px-8 py-3 rounded-full hover:bg-white hover:text-black transition"
          >
            Know me better
          </a>
        </AnimatedContent>
      </div>
    </section>
  );
}
