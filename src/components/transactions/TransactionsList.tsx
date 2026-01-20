import { TransactionRow } from "./TransactionRow";
import { useFinance } from "../../context/useFinance";
import { format } from "date-fns";

export const TransactionsList = () => {
  const { transactions, categories } = useFinance();

  const getCategoryName = (categoryId: string) => {
    const category = categories.find((c) => c.id === categoryId);
    return category?.name || "Other";
  };

  if (transactions.length === 0) {
    return <p className="text-center text-muted py-8">No transactions yet</p>;
  }

  return (
    <div className="space-y-3">
      {transactions.map((t) => (
        <TransactionRow
          key={t.id}
          description={t.note || "—"}
          category={getCategoryName(t.categoryId)}
          date={format(new Date(t.date), "MMM d")}
          amount={t.amount}
          variant={t.type === "income" ? "income" : "expense"}
        />
      ))}
    </div>
  );
};

