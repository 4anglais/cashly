import { TrendingUp } from "lucide-react";
import { DashboardCard } from "../DashboardCard";
import { Skeleton } from "../Skeleton";
import { useFinance } from "../../context/FinanceContext";
import { formatMoney } from "../../utils/money";

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
  const { selectedCurrency, convertAmount } = useFinance();
  void amount;
  void nextPayDate;
  const mockMonthlyZmw = 7600;

  return (
    <DashboardCard title={label}>
      <div className="flex items-end justify-between">
        <div>
          <p className="text-muted text-sm mb-1">Monthly Income</p>
          <div className="h-10 w-fit min-w-32 flex items-center mb-3">
            <p className="text-3xl font-semibold text-mono-900 dark:text-mono-0">
              {formatMoney(convertAmount(mockMonthlyZmw, "ZMW", selectedCurrency), selectedCurrency)}
            </p>
          </div>
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

