import { Calendar } from "lucide-react";
import { Skeleton } from "../Skeleton";

type DashboardHeaderProps = {
  title?: string;
  subtitle?: string;
};

export const DashboardHeader = ({
  title = "Dashboard",
  subtitle = "Your monthly snapshot, at a glance.",
}: DashboardHeaderProps) => {
  return (
    <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
      <div className="mb-4 sm:mb-0">
        <h1 className="section-title">{title}</h1>
        <p className="text-sm text-muted mt-1">{subtitle}</p>
      </div>

      <div className="flex items-center gap-2 text-muted">
        <Calendar size={20} />
        <div className="flex items-center gap-2 rounded-xl border border-mono-100 dark:border-mono-700 bg-mono-0/70 dark:bg-mono-900/40 px-3 py-2 backdrop-blur">
          <Skeleton className="h-4 w-40 rounded-md" />
        </div>
      </div>
    </header>
  );
};

