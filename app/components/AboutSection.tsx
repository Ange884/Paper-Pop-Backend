"use client";

import { CountUp, FadeInOnScroll } from "./AnimationComponents";

export function AboutSection() {
  return (
    <section className="bg-[#0d1117] py-16 sm:py-24 md:py-32 px-4 sm:px-8 overflow-hidden relative">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Left Side - Headline */}
          <FadeInOnScroll>
            <div className="text-white">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-8">
                We Turn
                <br />
                Ideas into
                <br />
                Visual Masterpieces
              </h2>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-8 max-w-md">
                Whether it&apos;s an engaging explainer video, a vibrant social
                media campaign, or captivating motion graphics, we bring
                creativity and expertise to every project.
              </p>
              <button className="px-6 py-3 border border-gray-600 rounded-full text-white text-sm font-medium hover:bg-white hover:text-[#0d1117] transition-all hover:scale-105 active:scale-95">
                Know More About us
              </button>
            </div>
          </FadeInOnScroll>

          {/* Right Side - Stats Grid */}
          <div className="grid grid-cols-2 gap-6 sm:gap-8">
            {/* Stat 1 */}
            <FadeInOnScroll delay={100}>
              <div className="text-white">
                <div className="text-4xl sm:text-5xl md:text-6xl font-bold mb-3">
                  <CountUp end={200} suffix="+" />
                </div>
                <div className="inline-block bg-[#1a2332] text-[10px] sm:text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full text-gray-300 mb-3">
                  Projects Delivered
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Creative work that drives real results
                </p>
              </div>
            </FadeInOnScroll>

            {/* Stat 2 */}
            <FadeInOnScroll delay={200}>
              <div className="text-white">
                <div className="text-4xl sm:text-5xl md:text-6xl font-bold mb-3">
                  <CountUp end={100} suffix="+" />
                </div>
                <div className="inline-block bg-[#1a2332] text-[10px] sm:text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full text-gray-300 mb-3">
                  Happy Clients
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Brands that keep coming back for more
                </p>
              </div>
            </FadeInOnScroll>

            {/* Stat 3 */}
            <FadeInOnScroll delay={300}>
              <div className="text-white">
                <div className="text-4xl sm:text-5xl md:text-6xl font-bold mb-3">
                  <CountUp end={15} />
                </div>
                <div className="inline-block bg-[#1a2332] text-[10px] sm:text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full text-gray-300 mb-3">
                  Years of Experience
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Mastering the art of animation, content and design
                </p>
              </div>
            </FadeInOnScroll>

            {/* Stat 4 */}
            <FadeInOnScroll delay={400}>
              <div className="text-white">
                <div className="text-4xl sm:text-5xl md:text-6xl font-bold mb-3">
                  <CountUp end={95} suffix="%" />
                </div>
                <div className="inline-block bg-[#1a2332] text-[10px] sm:text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full text-gray-300 mb-3">
                  Client Satisfaction
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  We mostly focus on exceeding expectations
                </p>
              </div>
            </FadeInOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}
