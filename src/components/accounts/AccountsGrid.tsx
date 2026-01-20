import { AccountCard, type AccountType } from "./AccountCard";

type AccountsGridProps = {
  accounts?: Array<{
    name: string;
    type: AccountType;
    balance: string;
  }>;
};

export const AccountsGrid = ({
  accounts = [
    { name: "Main Checking", type: "Bank", balance: "$0.00" },
    { name: "Cash Wallet", type: "Cash", balance: "$0.00" },
    { name: "Digital Wallet", type: "Digital", balance: "$0.00" },
    { name: "Credit Card", type: "Credit", balance: "$0.00" },
    { name: "Savings", type: "Bank", balance: "$0.00" },
    { name: "Travel Fund", type: "Digital", balance: "$0.00" }
  ],
}: AccountsGridProps) => {
  return (
    <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
      {accounts.map((a) => (
        <AccountCard key={`${a.type}-${a.name}`} name={a.name} type={a.type} balance={a.balance} />
      ))}
    </div>
  );
};

