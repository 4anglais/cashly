import { TrendingUp } from "lucide-react";
import { DashboardCard } from "../DashboardCard";
import { useFinance } from "../../context/useFinance";

type MainIncomeCardProps = {
  label?: string;
  amount?: number;
  nextPayDate?: string;
};

export const MainIncomeCard = ({
  label = "Primary Income",
  amount = 0,
  nextPayDate = "—",
}: MainIncomeCardProps) => {
  const { formatCurrency } = useFinance();

  return (
    <DashboardCard title={label}>
      <div className="flex items-end justify-between">
        <div>
          <p className="text-muted text-sm mb-1">Monthly Income</p>
          <p className="text-3xl font-semibold text-mono-900 dark:text-mono-0 mb-3">
            {formatCurrency(amount)}
          </p>
          <p className="text-muted text-xs">Next pay date:</p>
          <p className="text-sm font-medium text-mono-900 dark:text-mono-0 mt-1">
            {nextPayDate}
          </p>
        </div>
        <div className="text-accent-500">
          <TrendingUp size={24} />
        </div>
      </div>
    </DashboardCard>
  );
};

