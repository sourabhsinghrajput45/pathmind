import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, Brain, User } from "lucide-react";

interface NavLink {
  name: string;
  path: string;
}

const pageNavMap: { [key: string]: NavLink[] } = {
  "/": [
    { name: "Features", path: "/#features" },
    { name: "How It Works", path: "/#how-it-works" },
    { name: "About", path: "/about" },
  ],
  "/quiz": [{ name: "Home", path: "/" }],
  "/ai-analysis": [{ name: "Home", path: "/" }, { name: "AI Analysis", path: "/ai-analysis" }],
  "/interactive-quizzes": [
    { name: "Home", path: "/" },
    { name: "Interactive Quizzes", path: "/interactive-quizzes" },
  ],
  "/career-roadmaps": [
    { name: "Home", path: "/" },
    { name: "Career Roadmaps", path: "/career-roadmaps" },
  ],
  "/learning-resources": [
    { name: "Home", path: "/" },
    { name: "Learning Resources", path: "/learning-resources" },
  ],
  "/progress-tracking": [
    { name: "Home", path: "/" },
    { name: "Progress Tracking", path: "/progress-tracking" },
  ],
  "/expert-guidance": [
    { name: "Home", path: "/" },
    { name: "Expert Guidance", path: "/expert-guidance" },
  ],
};

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();
  const location = useLocation();

  // Load user from localStorage
  useEffect(() => {
    try {
      const savedUser = JSON.parse(localStorage.getItem("user") || "null");
      if (savedUser) setUser(savedUser);
    } catch {}
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleStartQuiz = () => {
    navigate("/quiz");
    setIsMenuOpen(false);
  };

  const handleLogin = () => {
    navigate("/login");
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setDropdownOpen(false);
    navigate("/");
  };

  const handleProfile = () => {
    navigate("/profile");
    setDropdownOpen(false);
  };

  // Generate initials
  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n: string) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "U";

  const currentPath = location.pathname;
  const navLinks: NavLink[] = pageNavMap[currentPath] || [{ name: "Home", path: "/" }];

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-2 rounded-xl">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              PathMind
            </span>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) =>
              link.path.startsWith("/#") ? (
                <a
                  key={link.name}
                  href={link.path.replace("/", "")}
                  className="text-gray-700 hover:text-blue-600 transition font-medium"
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-gray-700 hover:text-blue-600 transition font-medium"
                >
                  {link.name}
                </Link>
              )
            )}

            {/* Start Quiz */}
            {currentPath !== "/quiz" && (
              <button
                onClick={handleStartQuiz}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-xl 
                hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 font-medium"
              >
                Start Quiz
              </button>
            )}

            {/* User menu */}
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center space-x-3 px-3 py-1 rounded-xl hover:bg-gray-100 transition"
                >
                  <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
                    {initials}
                  </div>
                  <span className="text-gray-700 font-medium">{user.name}</span>
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-44 bg-white shadow-lg border rounded-xl py-2 z-50">
                    <button
                      onClick={handleProfile}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
                    >
                      Profile
                    </button>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 hover:bg-red-100 text-red-600"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              // Login
              <button
                onClick={handleLogin}
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 font-medium"
              >
                <User className="h-5 w-5" />
                <span>Login</span>
              </button>
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) =>
                link.path.startsWith("/#") ? (
                  <a
                    key={link.name}
                    href={link.path.replace("/", "")}
                    className="text-gray-700 hover:text-blue-600 transition font-medium"
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-gray-700 hover:text-blue-600 transition font-medium"
                  >
                    {link.name}
                  </Link>
                )
              )}

              {currentPath !== "/quiz" && (
                <button
                  onClick={handleStartQuiz}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl 
                  hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-medium text-left"
                >
                  Start Quiz
                </button>
              )}

              {/* Mobile user section */}
              {user ? (
                <>
                  <button
                    onClick={handleProfile}
                    className="flex items-center space-x-2 text-gray-700 hover:text-blue-600"
                  >
                    <User className="h-5 w-5" />
                    <span>Profile</span>
                  </button>

                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 text-gray-700 hover:text-red-600"
                  >
                    <User className="h-5 w-5" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={handleLogin}
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600"
                >
                  <User className="h-5 w-5" />
                  <span>Login</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
