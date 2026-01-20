import { DashboardCard } from "../DashboardCard";
import { useFinance } from "../../context/useFinance";
import { startOfMonth, endOfMonth } from "date-fns";

const SummaryItem = ({
  label,
  amount,
  variant = "neutral",
}: {
  label: string;
  amount: string;
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
            <p className={`text-2xl font-semibold ${hint}`}>{amount}</p>
          </div>
        </div>
        <div className="h-10 w-10 rounded-2xl border border-mono-100 dark:border-mono-700 bg-mono-50 dark:bg-mono-700 shadow-soft-inset flex items-center justify-center">
          <span className="text-lg">{variant === "income" ? "📈" : variant === "expense" ? "📉" : "📊"}</span>
        </div>
      </div>
    </DashboardCard>
  );
};

export const TransactionsSummary = () => {
  const { transactions, formatCurrency } = useFinance();

  // This month's transactions
  const now = new Date();
  const monthStart = startOfMonth(now);
  const monthEnd = endOfMonth(now);

  const monthTransactions = transactions.filter((t) => {
    const date = new Date(t.date);
    return date >= monthStart && date <= monthEnd;
  });

  const totalIncome = monthTransactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = monthTransactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const netBalance = totalIncome - totalExpenses;

  return (
    <div className="grid sm:grid-cols-3 gap-4">
      <SummaryItem label="Total Income" amount={formatCurrency(totalIncome)} variant="income" />
      <SummaryItem label="Total Expenses" amount={formatCurrency(totalExpenses)} variant="expense" />
      <SummaryItem
        label="Net Balance"
        amount={formatCurrency(netBalance)}
        variant={netBalance >= 0 ? "income" : "expense"}
      />
    </div>
  );
};

