import { AccountCard } from "./AccountCard";
import { useFinance } from "../../context/useFinance";

export const AccountsGrid = () => {
  const { accounts } = useFinance();

  if (accounts.length === 0) {
    return <p className="text-center text-muted py-8">No accounts yet. Add one to get started!</p>;
  }

  return (
    <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
      {accounts.map((account) => (
        <AccountCard
          key={account.id}
          id={account.id}
          name={account.name}
          type={account.type as "Cash" | "Bank" | "Digital" | "Credit"}
          balance={account.balance}
        />
      ))}
    </div>
  );
};

