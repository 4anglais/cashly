import { DashboardCard } from "../DashboardCard";
import { Skeleton } from "../Skeleton";

type TransactionsSummaryProps = {
  totalIncome?: string;
  totalExpenses?: string;
  netBalance?: string;
};

const SummaryItem = ({
  label,
  variant = "neutral",
}: {
  label: string;
  variant?: "neutral" | "income" | "expense";
}) => {
  const hint =
    variant === "income"
      ? "text-emerald-600 dark:text-emerald-400"
      : variant === "expense"
        ? "text-accent-500"
        : "text-muted";

  return (
    <DashboardCard className="p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium text-muted">{label}</p>
          <div className="mt-2 flex items-baseline gap-2">
            <Skeleton className="h-7 w-24 rounded-xl" />
            <span className={`text-xs ${hint}`}>placeholder</span>
          </div>
        </div>
        <div className="h-10 w-10 rounded-2xl border border-mono-100 dark:border-mono-700 bg-mono-50 dark:bg-mono-700 shadow-soft-inset flex items-center justify-center">
          <Skeleton className="h-4 w-4 rounded-md" />
        </div>
      </div>
    </DashboardCard>
  );
};

export const TransactionsSummary = ({
  totalIncome = "$0.00",
  totalExpenses = "$0.00",
  netBalance = "$0.00",
}: TransactionsSummaryProps) => {
  void totalIncome;
  void totalExpenses;
  void netBalance;

  return (
    <div className="grid sm:grid-cols-3 gap-4">
      <SummaryItem label="Total Income" variant="income" />
      <SummaryItem label="Total Expenses" variant="expense" />
      <SummaryItem label="Net Balance" variant="neutral" />
    </div>
  );
};

