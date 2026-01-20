import { DashboardCard } from "../DashboardCard";
import { Skeleton } from "../Skeleton";

export type SummaryCardVariant = "default" | "income" | "expense";

type SummaryCardProps = {
  title: string;
  value: string;
  variant?: SummaryCardVariant;
};

export const SummaryCard = ({ title, value, variant = "default" }: SummaryCardProps) => {
  // Props are accepted for future wiring; UI is placeholder-only for now.
  void value;
  void variant;

  return (
    <DashboardCard>
      <p className="text-muted text-sm mb-3">{title}</p>
      <Skeleton className="h-8 w-24 mb-2" />
      <p className="text-xs text-muted">Updated today</p>
    </DashboardCard>
  );
};

