import { DashboardCard } from "../DashboardCard";
import { Skeleton } from "../Skeleton";
import { useFinance } from "../../context/FinanceContext";
import { formatMoney } from "../../utils/money";

export type AccountType = "Cash" | "Bank" | "Digital" | "Credit";

type AccountCardProps = {
  name: string;
  type: AccountType;
  balance: string;
};

const typePillClasses: Record<AccountType, string> = {
  Cash: "bg-mono-100 dark:bg-mono-700 text-mono-800 dark:text-mono-0",
  Bank: "bg-mono-100 dark:bg-mono-700 text-mono-800 dark:text-mono-0",
  Digital: "bg-mono-100 dark:bg-mono-700 text-mono-800 dark:text-mono-0",
  Credit: "bg-mono-100 dark:bg-mono-700 text-mono-800 dark:text-mono-0",
};

export const AccountCard = ({ name, type, balance }: AccountCardProps) => {
  // UI-only: accept props now, wire later.
  void name;
  void balance;
  const { selectedCurrency, convertAmount } = useFinance();

  // Mock baseline per-type balances (source currency: ZMW)
  const mockByType: Record<AccountType, number> = {
    Bank: 9200,
    Cash: 540,
    Digital: 2100,
    Credit: 1800,
  };
  const displayAmount = formatMoney(convertAmount(mockByType[type], "ZMW", selectedCurrency), selectedCurrency);

  return (
    <DashboardCard className="transition-all hover:shadow-soft-sm hover:-translate-y-[1px]">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-32 rounded-md" />
            <span
              className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${typePillClasses[type]}`}
            >
              {type}
            </span>
          </div>
          <div className="mt-2">
            <div className="h-9 w-fit min-w-28 rounded-xl flex items-center">
              <p className="text-2xl font-semibold text-mono-900 dark:text-mono-0">{displayAmount}</p>
            </div>
          </div>
          <p className="mt-2 text-xs text-muted">Balance</p>
        </div>

        <div className="h-12 w-12 rounded-2xl border border-mono-100 dark:border-mono-700 bg-mono-50 dark:bg-mono-700 shadow-soft-inset flex items-center justify-center shrink-0">
          <Skeleton className="h-5 w-5 rounded-md" />
        </div>
      </div>
    </DashboardCard>
  );
};

