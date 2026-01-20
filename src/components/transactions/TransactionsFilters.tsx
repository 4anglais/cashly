import { Calendar, ChevronDown, Filter } from "lucide-react";
import { DashboardCard } from "../DashboardCard";
import { Skeleton } from "../Skeleton";

type TransactionsFiltersProps = {
  dateRange?: string;
  account?: string;
  category?: string;
  type?: "Income" | "Expense";
};

export const TransactionsFilters = ({
  dateRange = "Last 30 days",
  account = "All accounts",
  category = "All categories",
  type = "Expense",
}: TransactionsFiltersProps) => {
  void dateRange;
  void account;
  void category;
  void type;

  return (
    <DashboardCard className="p-4">
      <div className="flex flex-col lg:flex-row gap-3">
        <div className="flex items-center gap-3 text-muted">
          <Filter size={18} />
          <span className="text-sm font-medium text-mono-900 dark:text-mono-0">Filters</span>
        </div>

        <div className="flex flex-col sm:flex-row flex-wrap gap-3 flex-1">
          <div className="flex items-center justify-between gap-3 h-12 rounded-2xl border border-mono-100 dark:border-mono-700 bg-mono-0/70 dark:bg-mono-900/40 px-4 backdrop-blur min-w-[220px]">
            <div className="flex items-center gap-2 text-muted">
              <Calendar size={18} />
              <Skeleton className="h-4 w-28 rounded-md" />
            </div>
            <ChevronDown size={16} className="text-muted" />
          </div>

          <div className="flex items-center justify-between gap-3 h-12 rounded-2xl border border-mono-100 dark:border-mono-700 bg-mono-0/70 dark:bg-mono-900/40 px-4 backdrop-blur min-w-[220px]">
            <div className="flex items-center gap-2 text-muted">
              <Skeleton className="h-4 w-24 rounded-md" />
            </div>
            <ChevronDown size={16} className="text-muted" />
          </div>

          <div className="flex items-center justify-between gap-3 h-12 rounded-2xl border border-mono-100 dark:border-mono-700 bg-mono-0/70 dark:bg-mono-900/40 px-4 backdrop-blur min-w-[220px]">
            <div className="flex items-center gap-2 text-muted">
              <Skeleton className="h-4 w-28 rounded-md" />
            </div>
            <ChevronDown size={16} className="text-muted" />
          </div>

          <div className="flex items-center justify-between gap-3 h-12 rounded-2xl border border-mono-100 dark:border-mono-700 bg-mono-0/70 dark:bg-mono-900/40 px-4 backdrop-blur min-w-[220px]">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-mono-100 dark:bg-mono-700 text-mono-800 dark:text-mono-0">
                Income
              </span>
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-mono-100 dark:bg-mono-700 text-mono-800 dark:text-mono-0">
                Expense
              </span>
            </div>
            <ChevronDown size={16} className="text-muted" />
          </div>
        </div>
      </div>
    </DashboardCard>
  );
};

