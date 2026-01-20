import { Calendar, TrendingUp } from "lucide-react";
import { DashboardCard } from "../components/DashboardCard";
import { format, startOfMonth, endOfMonth } from "date-fns";
import { useFinance } from "../context/useFinance";

export const Dashboard = () => {
  const today = format(new Date(), "EEEE, MMMM d, yyyy");
  const { accounts, transactions, userIncomeSettings, categories } = useFinance();

  // Calculate total balance
  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);

  // Calculate this month's transactions
  const now = new Date();
  const monthStart = startOfMonth(now);
  const monthEnd = endOfMonth(now);

  const monthTransactions = transactions.filter((t) => {
    const date = new Date(t.date);
    return date >= monthStart && date <= monthEnd;
  });

  const totalIncome = monthTransactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = monthTransactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const netDifference = totalIncome - totalExpenses;

  // Get category name from ID
  const getCategoryName = (categoryId: string) => {
    const category = categories.find((c) => c.id === categoryId);
    return category?.name || "Other";
  };

  // Recent transactions (last 5)
  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 bg-mono-25 dark:bg-mono-800">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <h1 className="section-title mb-4 sm:mb-0">Dashboard</h1>
          <div className="flex items-center gap-2 text-muted">
            <Calendar size={20} />
            <span>{today}</span>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <DashboardCard>
            <p className="text-muted text-sm mb-3">Total Balance</p>
            <p className="text-2xl font-semibold text-mono-900 dark:text-mono-0 mb-2">
              ${totalBalance.toFixed(2)}
            </p>
            <p className="text-xs text-muted">Updated today</p>
          </DashboardCard>

          <DashboardCard>
            <p className="text-muted text-sm mb-3">Total Income</p>
            <p className="text-2xl font-semibold text-emerald-600 dark:text-emerald-400 mb-2">
              ${totalIncome.toFixed(2)}
            </p>
            <p className="text-xs text-muted">This month</p>
          </DashboardCard>

          <DashboardCard>
            <p className="text-muted text-sm mb-3">Total Expenses</p>
            <p className="text-2xl font-semibold text-accent-500 mb-2">
              ${totalExpenses.toFixed(2)}
            </p>
            <p className="text-xs text-muted">This month</p>
          </DashboardCard>

          <DashboardCard>
            <p className="text-muted text-sm mb-3">Net Difference</p>
            <p className={`text-2xl font-semibold mb-2 ${
              netDifference >= 0
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-accent-500"
            }`}>
              ${netDifference.toFixed(2)}
            </p>
            <p className="text-xs text-muted">Income - Expenses</p>
          </DashboardCard>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Income Section */}
            <section>
              <h2 className="text-xl font-semibold mb-4 text-mono-900 dark:text-mono-0">Income</h2>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                {/* Main Income Card */}
                <DashboardCard title="Primary Income">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-muted text-sm mb-1">Monthly Income</p>
                      <p className="text-3xl font-semibold text-mono-900 dark:text-mono-0 mb-3">
                        ${userIncomeSettings?.mainIncomeAmount.toFixed(2) || "0.00"}
                      </p>
                      <p className="text-muted text-xs">Next pay date:</p>
                      <p className="text-sm font-medium text-mono-900 dark:text-mono-0 mt-1">
                        {userIncomeSettings
                          ? format(new Date(userIncomeSettings.mainIncomeDate), "MMM d, yyyy")
                          : "Not set"}
                      </p>
                    </div>
                    <div className="text-accent-500">
                      <TrendingUp size={24} />
                    </div>
                  </div>
                </DashboardCard>

                {/* Other Income Card */}
                <DashboardCard title="Other Income">
                  <p className="text-3xl font-semibold text-mono-900 dark:text-mono-0 mb-3">
                    ${
                      monthTransactions
                        .filter((t) => t.type === "income")
                        .reduce((sum, t) => sum + t.amount, 0) - (userIncomeSettings?.mainIncomeAmount || 0)
                    }
                  </p>
                  <p className="text-muted text-sm">Additional sources</p>
                </DashboardCard>
              </div>

              {/* Income vs Expenses Chart */}
              <DashboardCard title="Income vs Expenses">
                <p className="text-center text-muted py-8">Chart placeholder</p>
              </DashboardCard>
            </section>

            {/* Spending by Category */}
            <section>
              <h2 className="text-xl font-semibold mb-4 text-mono-900 dark:text-mono-0">Spending by Category</h2>
              <DashboardCard>
                <p className="text-center text-muted py-8">Category breakdown placeholder</p>
              </DashboardCard>
            </section>

            {/* Recent Transactions */}
            <section>
              <h2 className="text-xl font-semibold mb-4 text-mono-900 dark:text-mono-0">Recent Transactions</h2>
              <DashboardCard>
                {recentTransactions.length === 0 ? (
                  <p className="text-center text-muted py-8">No transactions yet</p>
                ) : (
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-mono-100 dark:border-mono-700">
                        <th className="text-left py-3 text-sm font-medium text-muted">Description</th>
                        <th className="text-left py-3 text-sm font-medium text-muted">Category</th>
                        <th className="text-right py-3 text-sm font-medium text-muted">Amount</th>
                        <th className="text-right py-3 text-sm font-medium text-muted">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentTransactions.map((t) => (
                        <tr
                          key={t.id}
                          className="border-b border-mono-100 dark:border-mono-700 hover:bg-mono-50 dark:hover:bg-mono-700 transition-colors"
                        >
                          <td className="py-4 text-sm text-mono-900 dark:text-mono-0">{t.note || "—"}</td>
                          <td className="py-4 text-sm text-muted">{getCategoryName(t.categoryId)}</td>
                          <td className={`py-4 text-sm font-semibold text-right ${
                            t.type === "income"
                              ? "text-emerald-600 dark:text-emerald-400"
                              : "text-accent-500"
                          }`}>
                            {t.type === "income" ? "+" : "-"}${t.amount.toFixed(2)}
                          </td>
                          <td className="py-4 text-sm text-muted text-right">
                            {format(new Date(t.date), "MMM d")}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </DashboardCard>
            </section>
          </div>

          {/* Right Sidebar */}
          <aside className="space-y-6">
            {/* Budget Status */}
            <DashboardCard title="Budget Status">
              <p className="text-center text-muted py-6">Budget tracking coming soon</p>
            </DashboardCard>

            {/* Monthly Tips */}
            <DashboardCard title="Monthly Tips">
              <div className="flex gap-3">
                <div className="text-accent-500 text-2xl">💡</div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-mono-900 dark:text-mono-0">Pro tip</p>
                  <p className="text-xs text-muted mt-1">Track your spending patterns to optimize your budget</p>
                </div>
              </div>
            </DashboardCard>
          </aside>
        </div>
      </div>
    </div>
  );
};
