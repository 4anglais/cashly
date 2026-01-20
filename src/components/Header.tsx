import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-mono-0/80 dark:bg-mono-900/80 border-b border-mono-100 dark:border-mono-700">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold text-accent-500">
            Cashly
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className={`transition-colors ${isActive("/") ? "text-accent-500" : "text-mono-700 dark:text-mono-300 hover:text-mono-900 dark:hover:text-mono-0"}`}
            >
              Home
            </Link>
            <Link
              to="/dashboard"
              className={`transition-colors ${isActive("/dashboard") ? "text-accent-500" : "text-mono-700 dark:text-mono-300 hover:text-mono-900 dark:hover:text-mono-0"}`}
            >
              Dashboard
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-mono-100 dark:hover:bg-mono-800"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-mono-100 dark:border-mono-700 py-4 space-y-4">
            <Link
              to="/"
              className="block text-mono-700 dark:text-mono-300 hover:text-mono-900 dark:hover:text-mono-0"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/dashboard"
              className="block text-mono-700 dark:text-mono-300 hover:text-mono-900 dark:hover:text-mono-0"
              onClick={() => setIsOpen(false)}
            >
              Dashboard
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};
