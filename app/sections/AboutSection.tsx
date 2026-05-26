"use client";
import AnimatedContent from "../component/AnimatedContent";
import TiltedCard from "../component/TiltedCard";
import {
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript,
  SiJavascript,
  SiNodedotjs,
  SiExpress,
  SiFigma,
  SiGit,
  SiGo,
  SiLaravel,
  SiCodeigniter,
  SiPhp,
  SiPython,
  SiCplusplus,
  SiBootstrap,
} from "react-icons/si";
import { useSite } from "../context/SiteContext";

export default function AboutSection() {
  const { handleNavClick } = useSite();

  return (
    <section id="about" className="w-full py-20 px-4 bg-black flex items-center justify-center">
      <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-6 gap-12 items-center">
        <div className="md:col-span-4 col-span-1">
          <AnimatedContent direction="vertical" distance={60} duration={1} ease="power3.out">
            <h2 className="font-oxanium text-3xl sm:text-4xl md:text-5xl mb-6 text-white">
              About Me .
            </h2>
          </AnimatedContent>
          <AnimatedContent direction="vertical" distance={40} duration={1} delay={0.3} ease="power3.out">
            <p className="text-gray-300 font-poppins text-lg mb-8">
              I am a full stack web developer based in Tanah Laut, Kalimantan Selatan, passionate about building modern, responsive, and accessible websites. My focus is on clean code, great user experience, and continuous learning in the world of web technology.
            </p>
          </AnimatedContent>
          <AnimatedContent direction="horizontal" distance={80} duration={0.8} delay={0.6} ease="power3.out">
            <ul className="flex flex-wrap gap-6 items-center mt-2">
              <li className="flex items-center gap-2 text-sm font-poppins text-gray-100"><SiReact className="text-blue-500" /> React.js</li>
              <li className="flex items-center gap-2 text-sm font-poppins text-gray-100"><SiReact className="text-cyan-600" /> React Native</li>
              <li className="flex items-center gap-2 text-sm font-poppins text-gray-100"><SiNextdotjs className="text-gray-900" /> Next.js</li>
              <li className="flex items-center gap-2 text-sm font-poppins text-gray-100"><SiTailwindcss className="text-cyan-500" /> Tailwind CSS</li>
              <li className="flex items-center gap-2 text-sm font-poppins text-gray-100"><SiTypescript className="text-blue-700" /> TypeScript</li>
              <li className="flex items-center gap-2 text-sm font-poppins text-gray-100"><SiJavascript className="text-yellow-500" /> JavaScript</li>
              <li className="flex items-center gap-2 text-sm font-poppins text-gray-100"><SiNodedotjs className="text-green-600" /> Node.js</li>
              <li className="flex items-center gap-2 text-sm font-poppins text-gray-100"><SiExpress className="text-gray-700" /> Express.js</li>
              <li className="flex items-center gap-2 text-sm font-poppins text-gray-100"><SiFigma className="text-pink-500" /> Figma</li>
              <li className="flex items-center gap-2 text-sm font-poppins text-gray-100"><SiGit className="text-orange-600" /> Git</li>
              <li className="flex items-center gap-2 text-sm font-poppins text-gray-100"><SiGo className="text-blue-400" /> Golang</li>
              <li className="flex items-center gap-2 text-sm font-poppins text-gray-100"><SiLaravel className="text-red-600" /> Laravel</li>
              <li className="flex items-center gap-2 text-sm font-poppins text-gray-100"><SiCodeigniter className="text-red-500" /> CodeIgniter</li>
              <li className="flex items-center gap-2 text-sm font-poppins text-gray-100"><SiPhp className="text-indigo-600" /> PHP</li>
              <li className="flex items-center gap-2 text-sm font-poppins text-gray-100"><SiPython className="text-yellow-400" /> Python</li>
              <li className="flex items-center gap-2 text-sm font-poppins text-gray-100"><SiCplusplus className="text-blue-700" /> C++</li>
              <li className="flex items-center gap-2 text-sm font-poppins text-gray-100"><SiBootstrap className="text-purple-600" /> Bootstrap</li>
            </ul>
          </AnimatedContent>
        </div>
        <div className="md:col-span-2 col-span-1 flex justify-center">
          <AnimatedContent direction="horizontal" distance={80} duration={1} ease="power3.out">
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
  );
}
