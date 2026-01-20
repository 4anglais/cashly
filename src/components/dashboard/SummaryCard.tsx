import { DashboardCard } from "../DashboardCard";
import { useFinance } from "../../context/useFinance";

export type SummaryCardVariant = "default" | "income" | "expense";

type SummaryCardProps = {
  title: string;
  value: number;
  variant?: SummaryCardVariant;
};

export const SummaryCard = ({ title, value }: SummaryCardProps) => {
  const { formatCurrency } = useFinance();

  return (
    <DashboardCard>
      <p className="text-muted text-sm mb-3">{title}</p>
      <p className="text-2xl font-semibold text-mono-900 dark:text-mono-0 mb-2">
        {formatCurrency(value)}
      </p>
      <p className="text-xs text-muted">Updated today</p>
    </DashboardCard>
  );
};

