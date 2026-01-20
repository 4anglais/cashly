import { ArrowRight, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { DashboardCard } from "../components/DashboardCard";
import { Skeleton } from "../components/Skeleton";

export const Landing = () => {
  return (
    <div className="min-h-screen bg-mono-0 dark:bg-mono-900">
      {/* Navigation Bar - Sticky with blur */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-mono-0/80 dark:bg-mono-900/80 border-b border-mono-100 dark:border-mono-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <span className="text-2xl font-bold text-accent-500">Cashly</span>
          <div className="hidden md:flex gap-8 items-center">
            <Link to="/dashboard" className="text-mono-700 dark:text-mono-300 hover:text-mono-900 dark:hover:text-mono-0">
              Dashboard
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 text-center">
        <h1 className="section-title mb-4">Manage Your Finances with Ease</h1>
        <p className="text-lg text-muted mb-12 max-w-2xl mx-auto">
          Cashly helps you track income, expenses, and budgets. Get insights into your spending patterns and build better financial habits.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
          <Link to="/dashboard" className="btn-primary inline-flex items-center justify-center gap-2">
            Get Started
            <ArrowRight size={20} />
          </Link>
          <button className="btn-secondary inline-flex items-center justify-center gap-2">
            Learn More
            <ChevronRight size={20} />
          </button>
        </div>
      </section>

      {/* Feature Preview - Skeleton Cards */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="section-title text-center mb-12">Features</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <DashboardCard key={i}>
              <Skeleton className="h-32" />
              <Skeleton className="h-4 w-3/4 mt-4" />
              <Skeleton className="h-4 w-1/2 mt-2" />
            </DashboardCard>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-mono-100 dark:border-mono-700 bg-mono-25 dark:bg-mono-800 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center text-muted">
            <p>&copy; 2026 Cashly. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
