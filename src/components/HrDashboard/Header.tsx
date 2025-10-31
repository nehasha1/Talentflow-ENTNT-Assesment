import React, { useState, useEffect, useRef } from "react";
import Logo from "../ui/Logo";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();
  const profileRef = useRef<HTMLDivElement>(null);

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-black border-b-2 border-purple-600/30 sticky top-0 z-50 backdrop-blur-sm">
      <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div onClick={() => navigate("/dashboard")} className="cursor-pointer group">
            <Logo />
          </div>

          {/* HR Profile Accordion */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={toggleProfile}
              className="cursor-pointer flex items-center space-x-3 text-white hover:text-purple-400 transition-colors duration-200 p-2 rounded-lg hover:bg-white/10"
            >
              <div className="w-8 h-8 bg-purple-600/30 border border-purple-500/50 rounded-full flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium">HR Manager</p>
                <p className="text-xs text-gray-500">hr@company.com</p>
              </div>
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${
                  isProfileOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Profile Dropdown */}
            {isProfileOpen && (
              <div className="cursor-pointer absolute -right-1/3 mt-2 w-64 bg-black border-2 border-purple-600/50 shadow-xl py-2 z-50">
                {/* User Info Section */}
                <div className="px-4 py-3 border-b border-purple-600/30">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-600/30 border border-purple-500/50 rounded-full flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-purple-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">HR Manager</p>
                      <p className="text-xs text-gray-400">hr@company.com</p>
                      <p className="text-xs text-purple-400 font-medium">HR Administrator</p>
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="py-1 bg-black border border-purple-600/30">
                  <button className="cursor-pointer w-full px-4 py-2 text-left text-sm text-white hover:bg-purple-600/20 transition-colors duration-200 flex items-center space-x-3">
                    <span>Preferences</span>
                  </button>

                  <button className="cursor-pointer w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200 flex items-center space-x-3">
                    <span>Help & Support</span>
                  </button>
                </div>

                {/* Logout Section */}
                <div className="border-t border-purple-600/30 pt-1">
                  <button
                    onClick={handleLogout}
                    className="cursor-pointer w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-red-900/20 transition-colors duration-200 flex items-center space-x-3"
                  >
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
