import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { useFinance } from "../../context/FinanceContext";
import { formatMoney } from "../../utils/money";
import { Skeleton } from "../Skeleton";
import { ReportsCard } from "./ReportsCard";

interface CategoryData {
  name: string;
  value: number;
  type: "income" | "expense";
}

interface SpendingCategoryChartProps {
  categories: CategoryData[];
  isLoading?: boolean;
}

export const SpendingCategoryChart = ({ categories, isLoading = false }: SpendingCategoryChartProps) => {
  const { selectedCurrency, convertAmount } = useFinance();

  // Take top 5 categories and convert amounts
  const topCategories = categories.slice(0, 5).map((cat) => ({
    ...cat,
    value: convertAmount(cat.value, "ZMW", selectedCurrency),
  }));

  // Colors: red accent for first item, grays for others
  const colors = ["#ef4444", "#d1d5db", "#b3b3b3", "#999999", "#7a7a7a"];

  if (isLoading || topCategories.length === 0) {
    return (
      <ReportsCard title="Spending by Category">
        <Skeleton className="h-80 w-full" />
      </ReportsCard>
    );
  }

  return (
    <ReportsCard title="Spending by Category (Top 5)">
      <ResponsiveContainer width="100%" height={320}>
        <PieChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <Pie
            data={topCategories}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, value }) => `${name}: ${formatMoney(value, selectedCurrency)}`}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {topCategories.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => formatMoney(value as number, selectedCurrency)} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </ReportsCard>
  );
};
