import { Skeleton } from "../Skeleton";
import { useFinance } from "../../context/FinanceContext";
import { formatMoney } from "../../utils/money";

export type TransactionVariant = "neutral" | "income" | "expense";

type TransactionRowProps = {
  description: string;
  date: string;
  amount: string;
  variant?: TransactionVariant;
};

export const TransactionRow = ({
  description,
  date,
  amount,
  variant = "neutral",
}: TransactionRowProps) => {
  void description;
  void date;
  void amount;
  const { selectedCurrency, convertAmount } = useFinance();

  // Mock baseline row amount (source currency: ZMW)
  const baseZmw =
    variant === "income" ? 850 : variant === "expense" ? 420 : 210;
  const displayAmount = formatMoney(convertAmount(baseZmw, "ZMW", selectedCurrency), selectedCurrency);

  const amountClass =
    variant === "income"
      ? "text-emerald-600 dark:text-emerald-400"
      : variant === "expense"
        ? "text-accent-500"
        : "text-mono-900 dark:text-mono-0";

  return (
    <div className="rounded-2xl border border-mono-100 dark:border-mono-700 bg-mono-0/60 dark:bg-mono-900/30 backdrop-blur px-4 py-4 hover:bg-mono-0 dark:hover:bg-mono-800 transition-colors">
      <div className="flex items-center gap-4">
        <div className="h-11 w-11 rounded-2xl border border-mono-100 dark:border-mono-700 bg-mono-50 dark:bg-mono-700 shadow-soft-inset flex items-center justify-center shrink-0">
          <Skeleton className="h-5 w-5 rounded-md" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <Skeleton className="h-4 w-40 rounded-md mb-2" />
              <div className="flex items-center gap-2 text-xs text-muted">
                <Skeleton className="h-3 w-20 rounded-md" />
                <span className="text-mono-200 dark:text-mono-600">•</span>
                <Skeleton className="h-3 w-24 rounded-md" />
              </div>
            </div>
            <div className={`text-sm font-semibold ${amountClass}`}>
              <span>{displayAmount}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

