import { DashboardCard } from "../DashboardCard";
import { Skeleton } from "../Skeleton";
import { useFinance } from "../../context/FinanceContext";
import { formatMoney } from "../../utils/money";

type OtherIncomeCardProps = {
  title?: string;
  total?: string;
};

export const OtherIncomeCard = ({ title = "Other Income", total = "$0.00" }: OtherIncomeCardProps) => {
  const { selectedCurrency, convertAmount } = useFinance();
  void total;
  const mockZmw = 600;

  return (
    <DashboardCard title={title}>
      <div className="h-10 w-fit min-w-32 flex items-center mb-3">
        <p className="text-3xl font-semibold text-mono-900 dark:text-mono-0">
          {formatMoney(convertAmount(mockZmw, "ZMW", selectedCurrency), selectedCurrency)}
        </p>
      </div>
      <div className="space-y-2">
        <Skeleton className="h-3 w-3/4" />
        <Skeleton className="h-3 w-2/3" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </DashboardCard>
  );
};

