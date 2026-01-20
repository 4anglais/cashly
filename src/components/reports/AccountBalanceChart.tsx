import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useFinance } from "../../context/FinanceContext";
import { formatMoney } from "../../utils/money";
import { Skeleton } from "../Skeleton";
import { ReportsCard } from "./ReportsCard";

interface BalanceHistory {
  date: string;
  balance: number;
}

interface AccountBalanceChartProps {
  data: BalanceHistory[];
  isLoading?: boolean;
}

export const AccountBalanceChart = ({ data, isLoading = false }: AccountBalanceChartProps) => {
  const { selectedCurrency, convertAmount } = useFinance();

  // Convert balance amounts to selected currency
  const convertedData = data.map((item) => ({
    ...item,
    balance: convertAmount(item.balance, "ZMW", selectedCurrency),
  }));

  if (isLoading || convertedData.length === 0) {
    return (
      <ReportsCard title="Account Balance History">
        <Skeleton className="h-72 w-full" />
      </ReportsCard>
    );
  }

  return (
    <ReportsCard title="Account Balance History">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={convertedData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-mono-200 dark:text-mono-700" />
          <XAxis dataKey="date" stroke="currentColor" className="text-mono-600 dark:text-mono-300" />
          <YAxis stroke="currentColor" className="text-mono-600 dark:text-mono-300" />
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--color-mono-0)",
              border: "1px solid var(--color-mono-200)",
              borderRadius: "8px",
            }}
            formatter={(value) => formatMoney(value as number, selectedCurrency)}
          />
          <Line
            type="monotone"
            dataKey="balance"
            stroke="#ef4444"
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </ReportsCard>
  );
};
