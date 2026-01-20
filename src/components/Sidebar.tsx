import { Home, Settings, FileText } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { icon: Home, label: "Dashboard", href: "/dashboard" },
    { icon: FileText, label: "Transactions", href: "#" },
    { icon: Settings, label: "Settings", href: "#" },
  ];

  return (
    <aside className="hidden lg:block w-64 border-r border-mono-100 dark:border-mono-700 bg-mono-25 dark:bg-mono-800">
      <nav className="p-6 space-y-2">
        {navItems.map(({ icon: Icon, label, href }) => (
          <Link
            key={label}
            to={href}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
              location.pathname === href
                ? "bg-accent-500 text-white"
                : "text-mono-700 dark:text-mono-300 hover:bg-mono-100 dark:hover:bg-mono-700"
            }`}
          >
            <Icon size={20} />
            <span>{label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};
