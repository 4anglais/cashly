import { DashboardCard } from "../DashboardCard";
import { useFinance } from "../../context/useFinance";

export type AccountType = "Cash" | "Bank" | "Digital" | "Credit";

type AccountCardProps = {
  id: string;
  name: string;
  type: AccountType;
  balance: number;
};

const typePillClasses: Record<AccountType, string> = {
  Cash: "bg-mono-100 dark:bg-mono-700 text-mono-800 dark:text-mono-0",
  Bank: "bg-mono-100 dark:bg-mono-700 text-mono-800 dark:text-mono-0",
  Digital: "bg-mono-100 dark:bg-mono-700 text-mono-800 dark:text-mono-0",
  Credit: "bg-mono-100 dark:bg-mono-700 text-mono-800 dark:text-mono-0",
};

export const AccountCard = ({ name, type, balance }: AccountCardProps) => {
  const { formatCurrency } = useFinance();

  return (
    <DashboardCard className="transition-all hover:shadow-soft-sm hover:-translate-y-[1px]">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <p className="font-medium text-mono-900 dark:text-mono-0 truncate">{name}</p>
            <span
              className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap ${typePillClasses[type]}`}
            >
              {type}
            </span>
          </div>
          <div className="mt-2">
            <p className="text-2xl font-semibold text-mono-900 dark:text-mono-0">
              {formatCurrency(balance)}
            </p>
          </div>
          <p className="mt-2 text-xs text-muted">Balance</p>
        </div>

        <div className="h-12 w-12 rounded-2xl border border-mono-100 dark:border-mono-700 bg-mono-50 dark:bg-mono-700 shadow-soft-inset flex items-center justify-center shrink-0">
          <span className="text-lg">🏦</span>
        </div>
      </div>
    </DashboardCard>
  );
};

