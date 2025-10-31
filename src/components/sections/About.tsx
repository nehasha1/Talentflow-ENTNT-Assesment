import React, { useRef } from "react";
import { Button } from "../ui/Button";
import { useNavigate } from "react-router-dom";
import Reveal from "../Reveal";

const About: React.FC = () => {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);

  const features = [
    {
      title: "Smart Job Management",
      description: "Create, manage, and track job postings with our intuitive platform designed for efficient recruitment.",
      icon: "📋",
    },
    {
      title: "Candidate Pipeline Management",
      description: "Streamline your candidate workflow with advanced tracking, communication tools, and application management.",
      icon: "👥",
    },
    {
      title: "Comprehensive Assessment Tools",
      description: "Create and manage candidate assessments with our powerful evaluation system to find the right fit for your roles.",
      icon: "✅",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative overflow-hidden bg-white py-24 lg:py-32"
    >
      {/* Diagonal Split Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-transparent"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom_right,_#000_0%,_transparent_50%,_#fff_50%)] opacity-5"></div>

      {/* Numbered Section Indicator */}
      <div className="absolute top-24 left-12 text-9xl font-black text-purple-100/30 leading-none hidden lg:block">
        01
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 lg:px-12">
        {/* Split Layout: Image Left, Content Right */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          {/* Left: Large Image */}
          <Reveal className="order-2 lg:order-1">
            <div className="relative group">
              <div className="absolute -inset-8 bg-gradient-to-br from-purple-600 to-pink-600 opacity-20 blur-2xl group-hover:opacity-30 transition-opacity"></div>
              <div className="relative border-4 border-black transform rotate-[-2deg] group-hover:rotate-0 transition-transform duration-500">
                <img className="w-full h-auto block" src="/about.png" alt="About" />
                <div className="absolute -bottom-6 -right-6 bg-purple-600 text-white px-6 py-3 font-bold text-lg transform rotate-6 group-hover:rotate-0 transition-transform">
                  OUR PLATFORM
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right: Content */}
          <div className="order-1 lg:order-2 space-y-8">
            <Reveal>
              <div className="inline-block text-purple-600 font-bold text-sm uppercase tracking-widest mb-4">
                About Us
              </div>
            </Reveal>

            <Reveal>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-black leading-tight mb-8">
                Strategic
                <br />
                <span className="text-purple-600">Workforce</span>
                <br />
                Planning
              </h2>
            </Reveal>

            <Reveal delayMs={200}>
              <p className="text-xl text-gray-700 leading-relaxed font-light mb-10 max-w-xl">
                Empower your hiring team with data-driven tools to attract,
                assess, and retain top talent efficiently.
              </p>
            </Reveal>

            <Reveal delayMs={400}>
              <Button
                variant="default"
                size="lg"
                onClick={() => navigate("/hr-login")}
                className="bg-black text-white hover:bg-gray-800 px-10 py-5 text-lg font-bold rounded-none shadow-2xl hover-lift transform transition-all duration-300 group"
              >
                SIGN IN FOR DEMO
                <span className="ml-2 inline-block group-hover:translate-x-1 transition-transform">→</span>
              </Button>
            </Reveal>
          </div>
        </div>

        {/* Feature Cards - Horizontal Scroll Style */}
        <div className="space-y-6">
          {features.map((feature, index) => (
            <Reveal key={index} delayMs={index * 100 + 500}>
              <div 
                className="group relative bg-black text-white p-8 lg:p-12 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 transition-all duration-500 cursor-pointer overflow-hidden"
              >
                {/* Background Number */}
                <div className="absolute top-0 right-0 text-[120px] font-black text-white/5 leading-none">
                  {String(index + 1).padStart(2, '0')}
                </div>
                
                {/* Content */}
                <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                  <div className="flex items-start gap-6">
                    <div className="text-6xl transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-3xl font-black mb-3 group-hover:text-white">
                        {feature.title}
                      </h3>
                      <p className="text-gray-300 leading-relaxed max-w-2xl">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Arrow */}
                  <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500 transform group-hover:scale-125">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
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

export default About;
