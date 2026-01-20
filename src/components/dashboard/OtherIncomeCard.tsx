import { DashboardCard } from "../DashboardCard";
import { Skeleton } from "../Skeleton";

type OtherIncomeCardProps = {
  title?: string;
  total?: string;
};

export const OtherIncomeCard = ({ title = "Other Income", total = "$0.00" }: OtherIncomeCardProps) => {
  void total;

  return (
    <DashboardCard title={title}>
      <Skeleton className="h-10 w-32 mb-3" />
      <div className="space-y-2">
        <Skeleton className="h-3 w-3/4" />
        <Skeleton className="h-3 w-2/3" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </DashboardCard>
  );
};

