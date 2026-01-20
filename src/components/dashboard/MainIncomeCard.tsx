import { TrendingUp } from "lucide-react";
import { DashboardCard } from "../DashboardCard";
import { Skeleton } from "../Skeleton";

type MainIncomeCardProps = {
  label?: string;
  amount?: string;
  nextPayDate?: string;
};

export const MainIncomeCard = ({
  label = "Primary Income",
  amount = "$0.00",
  nextPayDate = "—",
}: MainIncomeCardProps) => {
  void amount;
  void nextPayDate;

  return (
    <DashboardCard title={label}>
      <div className="flex items-end justify-between">
        <div>
          <p className="text-muted text-sm mb-1">Monthly Income</p>
          <Skeleton className="h-10 w-32 mb-3" />
          <p className="text-muted text-xs">Next pay date:</p>
          <Skeleton className="h-4 w-24 mt-1" />
        </div>
        <div className="text-accent-500">
          <TrendingUp size={24} />
        </div>
      </div>
    </DashboardCard>
  );
};

