import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useFinance } from "../../context/FinanceContext";
import { formatMoney } from "../../utils/money";
import { Skeleton } from "../Skeleton";
import { ReportsCard } from "./ReportsCard";

interface FeeCategory {
  name: string;
  amount: number;
}

interface FeeAnalysisCardProps {
  totalFees: number;
  feesByCategory: FeeCategory[];
  isLoading?: boolean;
}

export const FeeAnalysisCard = ({ totalFees, feesByCategory, isLoading = false }: FeeAnalysisCardProps) => {
  const { selectedCurrency, convertAmount } = useFinance();

  const convertedTotal = convertAmount(totalFees, "ZMW", selectedCurrency);
  const convertedCategories = feesByCategory.map((cat) => ({
    ...cat,
    amount: convertAmount(cat.amount, "ZMW", selectedCurrency),
  }));

  if (isLoading) {
    return (
      <ReportsCard title="Fee Analysis">
        <Skeleton className="h-64 w-full" />
      </ReportsCard>
    );
  }

  return (
    <ReportsCard title="Fee Analysis">
      <div className="space-y-6">
        {/* Total Fees */}
        <div className="flex items-center justify-between p-4 bg-mono-50 dark:bg-mono-700 rounded-lg border border-mono-200 dark:border-mono-600">
          <div>
            <p className="text-muted text-sm mb-1">Total Fees (This Month)</p>
            <p className="text-2xl font-semibold text-mono-900 dark:text-mono-0">
              {formatMoney(convertedTotal, selectedCurrency)}
            </p>
          </div>
          <div className="text-accent-500 text-3xl font-bold">💳</div>
        </div>

        {/* Breakdown Chart */}
        {convertedCategories.length > 0 && (
          <div>
            <p className="text-sm font-medium text-mono-700 dark:text-mono-200 mb-3">Breakdown by Category</p>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={convertedCategories} margin={{ top: 20, right: 20, left: 0, bottom: 60 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-mono-200 dark:text-mono-700" />
                <XAxis
                  dataKey="name"
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  stroke="currentColor"
                  className="text-mono-600 dark:text-mono-300 text-xs"
                />
                <YAxis stroke="currentColor" className="text-mono-600 dark:text-mono-300" />
                <Tooltip formatter={(value) => formatMoney(value as number, selectedCurrency)} />
                <Bar dataKey="amount" fill="#ef4444" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Tips Section */}
        <div className="p-4 bg-accent-50 dark:bg-mono-700 border border-accent-200 dark:border-accent-900 rounded-lg">
          <p className="text-sm font-medium text-accent-900 dark:text-accent-100 mb-2">💡 Tips to Reduce Fees</p>
          <ul className="text-xs text-accent-800 dark:text-accent-200 space-y-1">
            <li>• Keep minimum balance requirements to avoid monthly fees</li>
            <li>• Use ATMs within your bank's network</li>
            <li>• Review subscription charges regularly</li>
            <li>• Opt for digital statements instead of paper</li>
          </ul>
        </div>
      </div>
    </ReportsCard>
  );
};
