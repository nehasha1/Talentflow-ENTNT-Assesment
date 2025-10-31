return (
  <header className="bg-black border-b-2 border-purple-600/30 sticky top-0 z-50 backdrop-blur-sm">
    <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
      <div className="flex justify-between items-center h-20">
        {/* Logo */}
        <div
          onClick={() => navigate("/dashboard")}
          className="cursor-pointer group"
        >
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
                    <p className="text-sm font-medium text-white">
                      HR Manager
                    </p>
                    <p className="text-xs text-gray-400">hr@company.com</p>
                    <p className="text-xs text-purple-400 font-medium">
                      HR Administrator
                    </p>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="py-1 bg-black border border-purple-600/30">
                <button className="cursor-pointer w-full px-4 py-2 text-left text-sm text-white hover:bg-purple-600/20 transition-colors duration-200 flex items-center space-x-3">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span>Preferences</span>
                </button>

                <button className="cursor-pointer w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200 flex items-center space-x-3">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>Help & Support</span>
                </button>
              </div>

              {/* Logout Section */}
              <div className="border-t border-purple-600/30 pt-1">
                <button
                  onClick={handleLogout}
                  className="cursor-pointer w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-red-900/20 transition-colors duration-200 flex items-center space-x-3"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
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
