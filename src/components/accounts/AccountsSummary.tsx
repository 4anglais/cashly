import { DashboardCard } from "../DashboardCard";
import { Skeleton } from "../Skeleton";

type AccountsSummaryProps = {
  totalBalance?: string;
};

export const AccountsSummary = ({ totalBalance = "$0.00" }: AccountsSummaryProps) => {
  void totalBalance;

  return (
    <DashboardCard>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-muted text-sm mb-2">Total Balance</p>
          <Skeleton className="h-10 w-44 rounded-xl mb-2" />
          <p className="text-xs text-muted">Across all accounts</p>
        </div>
        <div className="h-12 w-12 rounded-2xl border border-mono-100 dark:border-mono-700 bg-mono-50 dark:bg-mono-700 shadow-soft-inset flex items-center justify-center">
          <Skeleton className="h-5 w-5 rounded-md" />
        </div>
      </div>
    </DashboardCard>
  );
};

