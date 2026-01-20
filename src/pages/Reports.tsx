import { useState } from "react";
import { BarChart3, TrendingUp } from "lucide-react";
import { DateRangeSelector, type DateRange } from "../components/reports/DateRangeSelector";
import { IncomeExpenseChart } from "../components/reports/IncomeExpenseChart";
import { SpendingCategoryChart } from "../components/reports/SpendingCategoryChart";
import { AccountBalanceChart } from "../components/reports/AccountBalanceChart";
import { FeeAnalysisCard } from "../components/reports/FeeAnalysisCard";
import { ReportsCard } from "../components/reports/ReportsCard";
import { useFinance } from "../context/FinanceContext";
import { formatMoney } from "../utils/money";

interface CategoryData {
  name: string;
  value: number;
  type: "income" | "expense";
}

interface BalanceHistory {
  date: string;
  balance: number;
}

export const Reports = () => {
  const { selectedCurrency, convertAmount } = useFinance();
  const [dateRange, setDateRange] = useState<DateRange>("thisMonth");
  const [isLoading] = useState(false);

  // Mock data - in a real app, this would be filtered based on dateRange and fetched from context/API
  const mockIncomeExpenseData = {
    income: 8200,
    expenses: 5400,
  };

  const mockCategoryData: CategoryData[] = [
    { name: "Groceries", value: 1200, type: "expense" },
    { name: "Transport", value: 900, type: "expense" },
    { name: "Utilities", value: 450, type: "expense" },
    { name: "Entertainment", value: 650, type: "expense" },
    { name: "Healthcare", value: 300, type: "expense" },
    { name: "Salary", value: 7600, type: "income" },
    { name: "Freelance", value: 600, type: "income" },
  ];

  const mockBalanceHistory: BalanceHistory[] = [
    { date: "Jan 1", balance: 11000 },
    { date: "Jan 8", balance: 12100 },
    { date: "Jan 15", balance: 11800 },
    { date: "Jan 22", balance: 12500 },
    { date: "Jan 29", balance: 13200 },
  ];

  const mockFeeData = {
    totalFees: 240,
    categories: [
      { name: "Bank Charges", amount: 120 },
      { name: "Payment Fees", amount: 85 },
      { name: "ATM Fees", amount: 35 },
    ],
  };

  // Filter data based on selected date range
  const getFilteredData = () => {
    switch (dateRange) {
      case "thisMonth":
        return {
          income: mockIncomeExpenseData.income,
          expenses: mockIncomeExpenseData.expenses,
        };
      case "lastMonth":
        return {
          income: mockIncomeExpenseData.income * 0.95,
          expenses: mockIncomeExpenseData.expenses * 1.05,
        };
      case "custom":
        return mockIncomeExpenseData;
      default:
        return mockIncomeExpenseData;
    }
  };

  const filteredData = getFilteredData();
  const convertedIncome = convertAmount(filteredData.income, "ZMW", selectedCurrency);
  const convertedExpenses = convertAmount(filteredData.expenses, "ZMW", selectedCurrency);
  const netAmount = convertedIncome - convertedExpenses;

  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 bg-mono-25 dark:bg-mono-800">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="section-title mb-2">Reports</h1>
            <p className="text-muted">Visualize your finances</p>
          </div>
          <div className="mt-4 sm:mt-0">
            <DateRangeSelector onRangeChange={setDateRange} selectedRange={dateRange} />
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {[
            {
              label: "Total Income",
              amount: convertedIncome,
              icon: "📈",
            },
            {
              label: "Total Expenses",
              amount: convertedExpenses,
              icon: "📉",
            },
            {
              label: "Net Amount",
              amount: netAmount,
              icon: "💰",
            },
          ].map((card) => (
            <ReportsCard key={card.label} className="flex items-center justify-between">
              <div>
                <p className="text-muted text-sm mb-2">{card.label}</p>
                <p className="text-2xl font-semibold text-mono-900 dark:text-mono-0">
                  {formatMoney(card.amount, selectedCurrency)}
                </p>
              </div>
              <div className="text-3xl">{card.icon}</div>
            </ReportsCard>
          ))}
        </div>

        {/* Charts Grid - Responsive */}
        <div className="space-y-8">
          {/* Income vs Expenses */}
          <div>
            <IncomeExpenseChart
              income={filteredData.income}
              expenses={filteredData.expenses}
              isLoading={isLoading}
            />
          </div>

          {/* Category & Balance Grid */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Spending by Category */}
            <div>
              <SpendingCategoryChart categories={mockCategoryData} isLoading={isLoading} />
            </div>

            {/* Account Balance History */}
            <div>
              <AccountBalanceChart data={mockBalanceHistory} isLoading={isLoading} />
            </div>
          </div>

          {/* Fee Analysis */}
          <div>
            <FeeAnalysisCard
              totalFees={mockFeeData.totalFees}
              feesByCategory={mockFeeData.categories}
              isLoading={isLoading}
            />
          </div>

          {/* Insights Section */}
          <ReportsCard title="Insights">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  <TrendingUp size={20} className="text-accent-500" />
                </div>
                <div>
                  <p className="font-medium text-mono-900 dark:text-mono-0 text-sm">Spending Trend</p>
                  <p className="text-muted text-xs mt-1">
                    Your expenses are {((filteredData.expenses / filteredData.income) * 100).toFixed(1)}% of your income
                    this period.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  <BarChart3 size={20} className="text-accent-500" />
                </div>
                <div>
                  <p className="font-medium text-mono-900 dark:text-mono-0 text-sm">Top Category</p>
                  <p className="text-muted text-xs mt-1">
                    Groceries is your highest spending category at{" "}
                    {formatMoney(convertAmount(1200, "ZMW", selectedCurrency), selectedCurrency)}.
                  </p>
                </div>
              </div>
            </div>
          </ReportsCard>
        </div>
      </div>
    </div>
  );
};
