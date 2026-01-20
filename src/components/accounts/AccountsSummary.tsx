import { DashboardCard } from "../DashboardCard";
import { useFinance } from "../../context/useFinance";

export const AccountsSummary = () => {
  const { accounts, formatCurrency } = useFinance();

  // Calculate total balance
  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);

  return (
    <DashboardCard>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-muted text-sm mb-2">Total Balance</p>
          <p className="text-3xl font-semibold text-mono-900 dark:text-mono-0 rounded-xl mb-2">
            {formatCurrency(totalBalance)}
          </p>
          <p className="text-xs text-muted">Across all accounts</p>
        </div>
        <div className="h-12 w-12 rounded-2xl border border-mono-100 dark:border-mono-700 bg-mono-50 dark:bg-mono-700 shadow-soft-inset flex items-center justify-center">
          <span className="text-lg">💰</span>
        </div>
      </div>
    </DashboardCard>
  );
};

