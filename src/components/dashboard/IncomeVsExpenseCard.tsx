import { DashboardCard } from "../DashboardCard";
import { Skeleton } from "../Skeleton";

type IncomeVsExpenseCardProps = {
  title?: string;
};

export const IncomeVsExpenseCard = ({ title = "Income vs Expenses" }: IncomeVsExpenseCardProps) => {
  return (
    <DashboardCard title={title}>
      <Skeleton className="h-64 w-full rounded-lg" />
    </DashboardCard>
  );
};

