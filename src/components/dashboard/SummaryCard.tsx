import { DashboardCard } from "../DashboardCard";
import { useFinance } from "../../context/FinanceContext";
import { formatMoney } from "../../utils/money";

export type SummaryCardVariant = "default" | "income" | "expense";

type SummaryCardProps = {
  title: string;
  value: string;
  variant?: SummaryCardVariant;
};

export const SummaryCard = ({ title, value, variant = "default" }: SummaryCardProps) => {
  // Props are accepted for future wiring; UI is placeholder-only for now.
  const { selectedCurrency, convertAmount } = useFinance();
  void variant;

  // `value` is a placeholder; when it's numeric later, we'll parse/use it.
  void value;
  const mockZmw = title === "Total Income" ? 8200 : title === "Total Expenses" ? 5400 : title === "Net Difference" ? 2800 : 12500;
  const display = formatMoney(convertAmount(mockZmw, "ZMW", selectedCurrency), selectedCurrency);

  return (
    <DashboardCard>
      <p className="text-muted text-sm mb-3">{title}</p>
      <div className="h-8 w-fit min-w-24 flex items-center mb-2">
        <p className="text-2xl font-semibold text-mono-900 dark:text-mono-0">{display}</p>
      </div>
      <p className="text-xs text-muted">Updated today</p>
    </DashboardCard>
  );
};

