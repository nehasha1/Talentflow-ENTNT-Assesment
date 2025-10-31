import React from "react";
import { FEATURES } from "../../utils/constants";
import Card from "../ui/Card";
import Reveal from "../Reveal";

const Features: React.FC = () => {
  const getFeatureIcon = (iconName: string) => {
    switch (iconName) {
      case "briefcase":
        return (
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 01-2 2H10a2 2 0 01-2-2V8m8 0V6a2 2 0 00-2-2H10a2 2 0 00-2 2v2m8 0v8a2 2 0 01-2 2H10a2 2 0 01-2-2v-8"
            />
          </svg>
        );
      case "users":
        return (
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        );
      case "message-circle":
        return (
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        );
      case "clipboard-check":
        return (
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <section
      id="features"
      className="relative overflow-hidden bg-gradient-to-b from-black via-purple-950 to-black py-24 lg:py-32"
    >
      {/* Section Number */}
      <div className="absolute top-24 right-12 text-9xl font-black text-purple-900/20 leading-none hidden lg:block">
        02
      </div>

      {/* Grid Lines */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                         linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
        backgroundSize: '100px 100px'
      }}></div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-20">
          <Reveal>
            <div className="inline-block text-purple-400 font-bold text-sm uppercase tracking-widest mb-6">
              Features
            </div>
          </Reveal>
          
          <Reveal>
            <h2 className="text-6xl md:text-7xl lg:text-8xl font-black text-white leading-tight mb-8 max-w-4xl">
              EVERYTHING
              <br />
              YOU NEED TO
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                HIRE BETTER
              </span>
            </h2>
          </Reveal>

          <Reveal delayMs={200}>
            <p className="text-xl text-gray-400 max-w-2xl font-light leading-relaxed">
              Comprehensive tools designed to make every step of your recruitment
              process more efficient and effective.
            </p>
          </Reveal>
        </div>

        {/* Features Grid - Large Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, index) => (
            <Card
              key={feature.id}
              className="group relative bg-gradient-to-br from-gray-900 to-black border-2 border-purple-900/50 hover:border-purple-500 text-white overflow-hidden transition-all duration-500 hover-lift"
            >
              {/* Animated gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 to-pink-600/0 group-hover:from-purple-600/20 group-hover:to-pink-600/20 transition-all duration-500"></div>
              
              <div className="relative z-10 p-10 h-full flex flex-col">
              <Reveal delayMs={index * 150}>
              {/* Number Badge */}
              <div className="absolute top-6 right-6 text-6xl font-black text-purple-900/30 group-hover:text-purple-600/50 transition-colors">
                {String(index + 1).padStart(2, '0')}
              </div>

              <div className="w-20 h-20 mb-8 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600 opacity-50 blur-xl group-hover:opacity-100 transition-opacity"></div>
                <div className="relative w-20 h-20 flex items-center justify-center bg-black border-2 border-purple-500/50 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500">
                  <div className="text-purple-400">
                    {getFeatureIcon(feature.icon)}
                  </div>
                </div>
              </div>

              <h3 className="text-3xl font-black mb-6 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all">
                {feature.title}
              </h3>

              <p className="text-gray-400 leading-relaxed mb-8 flex-grow">
                {feature.description}
              </p>

              {/* Feature Preview Card */}
              {index === 0 && (
                <div className="mt-6 bg-purple-600 rounded-xl p-6 text-white">
                  <div className="bg-white rounded-lg p-4 text-left">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
                        Microsoft
                      </span>
                    </div>
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">
                      Senior Product Manager
                    </h4>
                    <p className="text-xs text-gray-600 mb-2">
                      Lead the design and process, from discovery, ideation,
                      prototyping, and final UI & development.
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        5+ Positions
                      </span>
                      <span className="md:text-sm text-xs font-semibold text-gray-900">
                        $8,000/Month
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {index === 1 && (
                <div className="mt-6 bg-purple-100 rounded-xl p-6">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                        <span className="text-xs font-semibold">MA</span>
                      </div>
                      <div className="flex-1 text-left">
                        <p className="md:text-sm text-xs font-medium text-gray-900">
                          Maria Angelica M
                        </p>
                        <p className="text-xs text-gray-600">
                          Product Designer
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-1">
                          <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                          <span className="text-xs text-gray-600">78%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {index === 2 && (
                <div className="mt-6 bg-gray-100 rounded-xl p-6">
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4 border-l-4 border-purple-500">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="md:text-sm text-xs font-semibold text-gray-900">
                          Technical Assessment
                        </h4>
                        <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
                          In Progress
                        </span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-600">JavaScript</span>
                          <span className="text-purple-600 font-medium">
                            85%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div
                            className="bg-purple-500 h-1.5 rounded-full"
                            style={{ width: "85%" }}
                          ></div>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-600">React</span>
                          <span className="text-purple-600 font-medium">
                            92%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div
                            className="bg-purple-500 h-1.5 rounded-full"
                            style={{ width: "92%" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              </Reveal>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
