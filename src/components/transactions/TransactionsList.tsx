import { TransactionRow } from "./TransactionRow";

type TransactionsListProps = {
  rows?: Array<{
    description: string;
    date: string;
    amount: string;
    variant?: "neutral" | "income" | "expense";
  }>;
};

export const TransactionsList = ({
  rows = Array.from({ length: 8 }).map((_, i) => ({
    description: `Transaction ${i + 1}`,
    date: "—",
    amount: "$0.00",
    variant: i % 3 === 0 ? "income" : i % 3 === 1 ? "expense" : "neutral",
  })),
}: TransactionsListProps) => {
  return (
    <div className="space-y-3">
      {rows.map((r, idx) => (
        <TransactionRow
          key={idx}
          description={r.description}
          date={r.date}
          amount={r.amount}
          variant={r.variant}
        />
      ))}
    </div>
  );
};

