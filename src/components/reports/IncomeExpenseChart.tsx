import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useFinance } from "../../context/FinanceContext";
import { formatMoney } from "../../utils/money";
import { Skeleton } from "../Skeleton";
import { ReportsCard } from "./ReportsCard";

interface IncomeExpenseChartProps {
  income: number;
  expenses: number;
  isLoading?: boolean;
}

export const IncomeExpenseChart = ({ income, expenses, isLoading = false }: IncomeExpenseChartProps) => {
  const { selectedCurrency, convertAmount } = useFinance();

  const convertedIncome = convertAmount(income, "ZMW", selectedCurrency);
  const convertedExpenses = convertAmount(expenses, "ZMW", selectedCurrency);

  const data = [
    {
      name: "Amount",
      Income: convertedIncome,
      Expenses: convertedExpenses,
    },
  ];

  if (isLoading) {
    return (
      <ReportsCard title="Income vs Expenses">
        <Skeleton className="h-72 w-full" />
      </ReportsCard>
    );
  }

  return (
    <ReportsCard title="Income vs Expenses">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-mono-200 dark:text-mono-700" />
          <XAxis dataKey="name" stroke="currentColor" className="text-mono-600 dark:text-mono-300" />
          <YAxis stroke="currentColor" className="text-mono-600 dark:text-mono-300" />
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--color-mono-0)",
              border: "1px solid var(--color-mono-200)",
              borderRadius: "8px",
            }}
            formatter={(value) => formatMoney(value as number, selectedCurrency)}
          />
          <Legend />
          <Bar dataKey="Income" fill="#ef4444" radius={[8, 8, 0, 0]} />
          <Bar dataKey="Expenses" fill="#9ca3af" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ReportsCard>
  );
};
