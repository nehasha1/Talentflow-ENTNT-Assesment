import React from "react";
import { Button } from "../ui/Button";
import { useNavigate } from "react-router-dom";
import Reveal from "../Reveal";

const Cta: React.FC = () => {
  const navigate = useNavigate();
  return (
    <section className="relative overflow-hidden bg-black py-32 lg:py-40">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-900/30 via-pink-900/30 to-black"></div>
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.3), transparent 70%)`
        }}></div>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                         linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
        backgroundSize: '80px 80px'
      }}></div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 lg:px-12">
        <div className="text-center max-w-4xl mx-auto">
          <Reveal>
            <div className="inline-block text-purple-400 font-bold text-sm uppercase tracking-widest mb-8">
              Ready to Start?
            </div>
          </Reveal>

          <Reveal>
            <h2 className="text-6xl md:text-7xl lg:text-8xl font-black text-white leading-tight mb-10">
              HIRE FASTER
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                WITH INDUSTRY-GRADE
              </span>
              <br />
              WORKFLOW
            </h2>
          </Reveal>

          <Reveal delayMs={200}>
            <p className="text-xl text-gray-400 mb-12 font-light leading-relaxed">
              Launch a full HR pipeline locally — jobs, candidates, assessments — backed by realistic APIs and local persistence. No server required.
            </p>
          </Reveal>

          <Reveal delayMs={400}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button 
                className="bg-white text-black hover:bg-gray-100 px-12 py-6 text-lg font-bold rounded-none shadow-2xl hover-lift transform transition-all duration-300 group" 
                onClick={() => navigate('/hr-login')}
              >
                GET STARTED
                <span className="ml-2 inline-block group-hover:translate-x-1 transition-transform">→</span>
              </Button>
              <Button 
                className="border-2 border-white/30 text-white hover:bg-white/10 px-12 py-6 text-lg font-bold rounded-none backdrop-blur-sm hover-lift transform transition-all duration-300" 
                onClick={() => navigate('/dashboard')}
              >
                OPEN DASHBOARD
              </Button>
            </div>
          </Reveal>

          {/* Features List */}
          <Reveal delayMs={600}>
            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {[
                'Server-like pagination and filtering',
                'Drag-and-drop with optimistic updates',
                'Assessment builder with validation rules',
                'IndexedDB persistence via Dexie'
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-4 text-left bg-white/5 border border-white/10 p-6 hover:bg-white/10 transition-all group">
                  <div className="w-2 h-2 bg-purple-500 rounded-full group-hover:scale-150 transition-transform"></div>
                  <span className="text-gray-300 group-hover:text-white transition-colors">{feature}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Cta;


