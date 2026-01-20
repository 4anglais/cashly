import { DashboardCard } from "../DashboardCard";
import { useFinance } from "../../context/useFinance";

type OtherIncomeCardProps = {
  title?: string;
  total?: number;
};

export const OtherIncomeCard = ({ title = "Other Income", total = 0 }: OtherIncomeCardProps) => {
  const { formatCurrency } = useFinance();

  return (
    <DashboardCard title={title}>
      <p className="text-3xl font-semibold text-mono-900 dark:text-mono-0 mb-3">
        {formatCurrency(total)}
      </p>
      <p className="text-xs text-muted">Total other income</p>
    </DashboardCard>
  );
};

