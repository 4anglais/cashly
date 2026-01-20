import { DashboardCard } from "../DashboardCard";
import { useFinance } from "../../context/FinanceContext";
import { formatMoney } from "../../utils/money";

export const AccountsSummary = () => {
  const { selectedCurrency } = useFinance();

  return (
    <DashboardCard>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-muted text-sm mb-2">Total Balance</p>
          <div className="h-10 w-fit min-w-44 rounded-xl mb-2 flex items-center">
            <p className="text-3xl font-semibold text-mono-900 dark:text-mono-0">
              {formatMoney(0, selectedCurrency)}
            </p>
          </div>
          <p className="text-xs text-muted">Across all accounts</p>
        </div>
        <div className="h-12 w-12 rounded-2xl border border-mono-100 dark:border-mono-700 bg-mono-50 dark:bg-mono-700 shadow-soft-inset flex items-center justify-center">
          <span className="text-lg">💰</span>
        </div>
      </div>
    </DashboardCard>
  );
};

