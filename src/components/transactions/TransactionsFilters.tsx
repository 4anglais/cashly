import { Filter } from "lucide-react";
import { DashboardCard } from "../DashboardCard";

export const TransactionsFilters = () => {
  return (
    <DashboardCard className="p-4">
      <div className="flex flex-col lg:flex-row gap-3">
        <div className="flex items-center gap-3 text-muted">
          <Filter size={18} />
          <span className="text-sm font-medium text-mono-900 dark:text-mono-0">Filters coming soon</span>
        </div>
      </div>
    </DashboardCard>
  );
};

