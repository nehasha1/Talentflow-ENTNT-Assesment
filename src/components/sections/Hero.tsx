import React, { useEffect, useRef, useState } from "react";
import { Button } from "../ui/Button";
import { COMPANY_INFO, PLATFORM_STATS } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import Reveal from "../Reveal";

const Hero: React.FC = () => {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        });
      }
    };

    const hero = heroRef.current;
    if (hero) {
      hero.addEventListener("mousemove", handleMouseMove);
      return () => hero.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative overflow-hidden min-h-screen flex items-center bg-black py-0"
    >
      {/* Animated Mesh Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-rose-900/20"></div>
      <div 
        className="absolute inset-0 opacity-40"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(168, 85, 247, 0.4), transparent 50%)`
        }}
      ></div>
      
      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `linear-gradient(rgba(168, 85, 247, 0.1) 1px, transparent 1px),
                         linear-gradient(90deg, rgba(168, 85, 247, 0.1) 1px, transparent 1px)`,
        backgroundSize: '50px 50px',
        transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`
      }}></div>

      {/* Floating Orbs */}
      <div 
        className="absolute top-20 left-20 w-64 h-64 bg-purple-500/30 rounded-full blur-3xl anim-float"
        style={{
          transform: `translate(${mousePosition.x * 30}px, ${mousePosition.y * 30}px)`
        }}
      ></div>
      <div 
        className="absolute bottom-20 right-20 w-96 h-96 bg-pink-500/30 rounded-full blur-3xl anim-float-reverse"
        style={{
          transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px)`,
          animationDelay: '1s'
        }}
      ></div>
      
      {/* Diagonal Lines */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent transform -rotate-12"></div>
        <div className="absolute top-2/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-pink-500/50 to-transparent transform rotate-12"></div>
      </div>

      {/* Main Content - Side by Side Layout */}
      <div className="relative z-10 max-w-[1800px] mx-auto px-6 lg:px-12 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-screen py-20">
          {/* Left: Large Typography */}
          <div className="space-y-8 lg:space-y-12">
            <Reveal>
              <div className="inline-block px-4 py-2 bg-purple-500/20 border border-purple-500/50 rounded-full text-purple-300 text-sm font-medium mb-6 backdrop-blur-sm">
                🎯 Next-Gen Talent Acquisition
              </div>
            </Reveal>

            <Reveal>
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9] tracking-tight">
                HIRE
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400">
                  SMARTER
                </span>
                <br />
                NOT
                <br />
                <span className="text-gray-400">HARDER</span>
              </h1>
            </Reveal>

            <Reveal delayMs={200}>
              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-xl font-light">
                {COMPANY_INFO.description}
              </p>
            </Reveal>

            <Reveal delayMs={400}>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  variant="default"
                  size="lg"
                  className="bg-white text-black hover:bg-gray-100 px-10 py-5 text-lg font-bold rounded-none shadow-2xl hover-lift transform transition-all duration-300 group"
                  onClick={() => navigate("/hr-login")}
                >
                  START NOW
                  <span className="ml-2 inline-block group-hover:translate-x-1 transition-transform">→</span>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-white/30 text-white hover:bg-white/10 px-10 py-5 text-lg font-bold rounded-none backdrop-blur-sm hover-lift transform transition-all duration-300"
                  onClick={() => navigate("/dashboard")}
                >
                  EXPLORE
                </Button>
              </div>
            </Reveal>

            {/* Stats - Horizontal Strip */}
            <Reveal delayMs={600}>
              <div className="pt-12 border-t border-white/10">
                <div className="grid grid-cols-2 gap-8">
                  {PLATFORM_STATS.map((stat, index) => (
                    <div key={index} className="group">
                      <div className="text-5xl md:text-6xl font-black text-white mb-2 group-hover:scale-110 transition-transform">
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-400 uppercase tracking-wider">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right: Visual Cards Stack */}
          <div className="relative hidden lg:block">
            <div className="space-y-6">
              {PLATFORM_STATS.map((stat, index) => (
                <Reveal key={index} delayMs={index * 150 + 300}>
                  <div 
                    className="group relative bg-white/5 backdrop-blur-xl border border-white/10 p-8 hover:bg-white/10 transition-all duration-500 hover-lift cursor-pointer"
                    style={{
                      transform: `translateX(${index * 20}px) rotate(${index % 2 === 0 ? '1deg' : '-1deg'})`,
                    }}
                  >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                        {stat.value}
                      </div>
                      <div className="w-12 h-12 rounded-full bg-purple-500/20 border border-purple-500/50 flex items-center justify-center group-hover:scale-125 transition-transform">
                        <span className="text-purple-300 text-xl">→</span>
                      </div>
                    </div>
                    
                    <div className="text-white font-semibold text-lg mb-3">
                      {stat.label}
                    </div>
                    <div className="text-gray-400 text-sm leading-relaxed">
                      {index === 0
                        ? "Recruiters and hiring managers trust our tools to simplify decision-making."
                        : "Join forward-thinking companies building better teams through structured recruitment."}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
            
            {/* Decorative Element */}
            <div className="absolute -top-10 -right-10 w-32 h-32 border-2 border-purple-500/30 transform rotate-45 anim-rotate-slow"></div>
            <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-pink-500/20 rounded-full anim-pulse-glow"></div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Bottom Right */}
      <Reveal delayMs={800}>
        <div className="absolute bottom-8 right-8 flex items-center gap-2 text-white/50 text-sm">
          <span className="uppercase tracking-wider">Scroll</span>
          <div className="w-10 h-16 border border-white/30 rounded-full flex justify-center p-2">
            <div className="w-1.5 h-4 bg-white/50 rounded-full anim-float"></div>
          </div>
        </div>
      </Reveal>
    </section>
  );
};

export default Hero;
