export type TransactionVariant = "neutral" | "income" | "expense";

type TransactionRowProps = {
  description: string;
  category: string;
  date: string;
  amount: string;
  variant?: TransactionVariant;
};

export const TransactionRow = ({
  description,
  category,
  date,
  amount,
  variant = "neutral",
}: TransactionRowProps) => {
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
          <span className="text-lg">{variant === "income" ? "📈" : "📉"}</span>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-sm font-medium text-mono-900 dark:text-mono-0 truncate">{description}</p>
              <div className="flex items-center gap-2 text-xs text-muted">
                <span>{category}</span>
                <span className="text-mono-200 dark:text-mono-600">•</span>
                <span>{date}</span>
              </div>
            </div>
            <div className={`text-sm font-semibold whitespace-nowrap ${amountClass}`}>
              {amount}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

