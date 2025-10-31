import React from "react";
import Reveal from "../Reveal";

const steps = [
  {
    title: "Post a Job",
    desc: "Create a polished job in minutes with tags, salary (₹ LPA) and requirements.",
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 12v9m0-9V3m0 9H3m9 0h9" />
      </svg>
    ),
  },
  {
    title: "Manage Pipeline",
    desc: "Drag-and-drop candidates across stages, search instantly, add @notes.",
    iconBg: "bg-pink-100",
    iconColor: "text-pink-600",
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h18M3 12h18M3 17h18" />
      </svg>
    ),
  },
  {
    title: "Assess & Decide",
    desc: "Build assessments, preview live, and keep results locally for fast review.",
    iconBg: "bg-rose-100",
    iconColor: "text-rose-600",
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6M7 7h10" />
      </svg>
    ),
  },
];

const HowItWorks: React.FC = () => {
  return (
    <section id="how" className="relative overflow-hidden bg-white py-24 lg:py-32">
      {/* Section Number */}
      <div className="absolute top-24 left-12 text-9xl font-black text-gray-100 leading-none hidden lg:block">
        03
      </div>

      {/* Diagonal Stripe Pattern */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-br from-purple-50 to-transparent opacity-50"></div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-20 max-w-3xl">
          <Reveal>
            <div className="inline-block text-purple-600 font-bold text-sm uppercase tracking-widest mb-6">
              Process
            </div>
          </Reveal>

          <Reveal>
            <h2 className="text-6xl md:text-7xl lg:text-8xl font-black text-black leading-tight mb-8">
              HOW IT
              <br />
              <span className="text-purple-600">WORKS</span>
            </h2>
          </Reveal>

          <Reveal delayMs={200}>
            <p className="text-xl text-gray-600 font-light leading-relaxed">
              A streamlined flow from posting to decision — designed for real-world HR teams.
            </p>
          </Reveal>
        </div>

        {/* Steps - Vertical Timeline Style */}
        <div className="space-y-8">
          {steps.map((s, i) => (
            <Reveal key={i} delayMs={i * 200}>
              <div className="grid lg:grid-cols-12 gap-8 items-center group">
                {/* Step Number - Left Side */}
                <div className="lg:col-span-2">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-black text-white flex items-center justify-center font-black text-2xl border-4 border-purple-600 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    {i < steps.length - 1 && (
                      <div className="hidden lg:block w-px h-32 bg-gradient-to-b from-purple-600 to-transparent ml-10"></div>
                    )}
                  </div>
                </div>

                {/* Content - Right Side */}
                <div className="lg:col-span-10">
                  <div className="bg-gray-50 border-l-4 border-purple-600 p-8 lg:p-12 hover:bg-black hover:text-white transition-all duration-500 cursor-pointer group-hover:border-pink-600">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-8">
                      {/* Icon */}
                      <div className="flex-shrink-0">
                        <div className="w-24 h-24 bg-white border-4 border-purple-600 flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                          <div className="text-purple-600 text-4xl group-hover:text-pink-600 transition-colors">
                            {s.icon}
                          </div>
                        </div>
                      </div>

                      {/* Text */}
                      <div className="flex-grow">
                        <h3 className="text-4xl font-black mb-4 text-black group-hover:text-white transition-colors">
                          {s.title}
                        </h3>
                        <p className="text-lg text-gray-600 group-hover:text-gray-300 leading-relaxed transition-colors">
                          {s.desc}
                        </p>
                      </div>

                      {/* Arrow */}
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-purple-600 text-white flex items-center justify-center transform group-hover:translate-x-4 group-hover:bg-pink-600 transition-all duration-500">
                          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
