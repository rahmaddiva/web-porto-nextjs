"use client";
import AnimatedContent from "../component/AnimatedContent";
import CardSwap, { Card } from "../component/CardSwap";
import { SiGithub } from "react-icons/si";

export default function ProjectSection() {
  return (
    <section id="project" className="w-full py-20 px-4 mt-8 bg-black flex items-center justify-center">
      <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start md:items-center">
        <div className="md:col-span-1 col-span-1 flex flex-col justify-center">
          <AnimatedContent direction="vertical" distance={60} duration={1} ease="power3.out">
            <h2 className="font-oxanium text-3xl sm:text-4xl md:text-5xl mb-6 text-white">
              My Projects .
            </h2>
          </AnimatedContent>
          <AnimatedContent direction="vertical" distance={40} duration={1} delay={0.3} ease="power3.out">
            <p className="text-gray-300 font-poppins text-sm mb-8 max-w-2xl">
              Here are some of the projects I&apos;ve worked on, showcasing my skills in web development. Each project reflects my commitment to creating high-quality, user-friendly digital experiences.
            </p>
          </AnimatedContent>
          <AnimatedContent direction="horizontal" distance={80} duration={0.8} delay={0.6} ease="power3.out">
            <a
              href="https://github.com/rahmaddiva"
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full border-1 border-white/40 text-white font-poppins px-6 py-2 rounded-full hover:bg-black/40 hover:text-white transition items-center justify-start text-left"
            >
              <SiGithub className="text-xl mr-2" />
              View My GitHub
            </a>
          </AnimatedContent>
        </div>
        <div
          className="md:col-span-1 col-span-1 flex justify-end items-center relative mt-8 md:mt-0 w-full max-w-full md:max-w-xs"
          style={{ minHeight: "320px", height: "100%" }}
        >
          <CardSwap cardDistance={35} verticalDistance={45} delay={3400} pauseOnHover={false} skewAmount={12}>
            <Card>
              <div className="w-full h-full relative border border-white/30 rounded-xl shadow-md">
                <div className="absolute top-0 left-0 w-full bg-black/60 p-4 rounded-t-xl z-10">
                  <h3 className="font-oxanium text-xl text-white mb-1">SIMPUN DISPUSIP</h3>
                  <p className="text-sm text-gray-300">Codeigniter, MySql, Bootstrap</p>
                </div>
                <img src="/assets/projekdispusip.png" alt="SIM PUSIP" className="absolute top-0 left-0 w-full h-full object-cover rounded-xl" />
              </div>
            </Card>
            <Card>
              <div className="w-full h-full relative border border-white/30 rounded-xl shadow-md">
                <div className="absolute top-0 left-0 w-full bg-black/60 p-4 rounded-t-xl z-10">
                  <h3 className="font-oxanium text-xl text-white mb-1">E-Agenda Bupati</h3>
                  <p className="text-sm text-gray-300">Codeigniter, Bootstrap, MySQL</p>
                </div>
                <img src="/assets/projeksetda.png" alt="E-Agenda" className="absolute top-0 left-0 w-full h-full object-cover rounded-xl" />
              </div>
            </Card>
            <Card>
              <div className="w-full h-full relative border border-white/30 rounded-xl shadow-md">
                <div className="absolute top-0 left-0 w-full bg-black/60 p-4 rounded-t-xl z-10">
                  <h3 className="font-oxanium text-xl text-white mb-1">SABAR-BAWASLU</h3>
                  <p className="text-sm text-gray-300">Codeigniter, MySql, Bootstrap</p>
                </div>
                <img src="/assets/projekbawaslu.png" alt="SABAR BAWASLU" className="absolute top-0 left-0 w-full h-full object-cover rounded-xl" />
              </div>
            </Card>
            <Card>
              <div className="w-full h-full relative border border-white/30 rounded-xl shadow-md">
                <div className="absolute top-0 left-0 w-full bg-black/60 p-4 rounded-t-xl z-10">
                  <h3 className="font-oxanium text-xl text-white mb-1">DP3AP2KB Kab. Tanah Laut</h3>
                  <p className="text-sm text-gray-300">Codeigniter, MySql, Bootstrap, Jquery</p>
                </div>
                <img src="/assets/dp3ap2kb.png" alt="DP3AP2KB" className="absolute top-0 left-0 w-full h-full object-cover rounded-xl" />
              </div>
            </Card>
          </CardSwap>
        </div>
      </div>
    </section>
  );
}
