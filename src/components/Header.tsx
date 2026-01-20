import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useFinance, type Currency } from "../context/FinanceContext";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { selectedCurrency, setCurrency } = useFinance();

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

            <div className="pl-2 border-l border-mono-100 dark:border-mono-700">
              <label className="sr-only" htmlFor="currency">
                Currency
              </label>
              <select
                id="currency"
                value={selectedCurrency}
                onChange={(e) => setCurrency(e.target.value as Currency)}
                className="h-10 rounded-xl border border-mono-100 dark:border-mono-700 bg-mono-0/80 dark:bg-mono-900/40 px-3 text-sm text-mono-900 dark:text-mono-0 backdrop-blur hover:bg-mono-0 dark:hover:bg-mono-800 transition-colors"
              >
                <option value="ZMW">ZMW</option>
                <option value="USD">USD</option>
              </select>
            </div>
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
            <div className="pt-2">
              <p className="text-xs text-muted mb-2">Currency</p>
              <select
                value={selectedCurrency}
                onChange={(e) => setCurrency(e.target.value as Currency)}
                className="w-full h-12 rounded-2xl border border-mono-100 dark:border-mono-700 bg-mono-0/80 dark:bg-mono-900/40 px-4 text-sm text-mono-900 dark:text-mono-0 backdrop-blur"
              >
                <option value="ZMW">ZMW</option>
                <option value="USD">USD</option>
              </select>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
