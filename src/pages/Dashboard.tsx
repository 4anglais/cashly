import { Calendar, TrendingUp } from "lucide-react";
import { DashboardCard } from "../components/DashboardCard";
import { Skeleton } from "../components/Skeleton";
import { format } from "date-fns";
import { useFinance } from "../context/FinanceContext";
import { formatMoney } from "../utils/money";

export const Dashboard = () => {
  const today = format(new Date(), "EEEE, MMMM d, yyyy");
  const { selectedCurrency, convertAmount } = useFinance();

  // Mock baseline values (source currency: ZMW)
  const totals = {
    balance: 12500,
    income: 8200,
    expenses: 5400,
  };
  const net = totals.income - totals.expenses;
  const primaryIncomeMonthly = 7600;

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
          {[
            {
              label: "Total Balance",
              amountZmw: totals.balance,
            },
            {
              label: "Total Income",
              amountZmw: totals.income,
            },
            {
              label: "Total Expenses",
              amountZmw: totals.expenses,
            },
            {
              label: "Net Difference",
              amountZmw: net,
            },
          ].map((card) => {
            const amount = convertAmount(card.amountZmw, "ZMW", selectedCurrency);
            return (
              <DashboardCard key={card.label}>
                <p className="text-muted text-sm mb-3">{card.label}</p>
                <div className="h-8 w-fit min-w-24 flex items-center">
                  <p className="text-2xl font-semibold text-mono-900 dark:text-mono-0">
                    {formatMoney(amount, selectedCurrency)}
                  </p>
                </div>
                <p className="text-xs text-muted">Updated today</p>
              </DashboardCard>
            );
          })}
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
                      <div className="h-10 w-fit min-w-32 flex items-center mb-3">
                        <p className="text-3xl font-semibold text-mono-900 dark:text-mono-0">
                          {formatMoney(convertAmount(primaryIncomeMonthly, "ZMW", selectedCurrency), selectedCurrency)}
                        </p>
                      </div>
                      <p className="text-muted text-xs">Next pay date:</p>
                      <Skeleton className="h-4 w-24 mt-1" />
                    </div>
                    <div className="text-accent-500">
                      <TrendingUp size={24} />
                    </div>
                  </div>
                </DashboardCard>

                {/* Other Income Card */}
                <DashboardCard title="Other Income">
                  <div className="h-10 w-fit min-w-32 flex items-center mb-3">
                    <p className="text-3xl font-semibold text-mono-900 dark:text-mono-0">
                      {formatMoney(convertAmount(600, "ZMW", selectedCurrency), selectedCurrency)}
                    </p>
                  </div>
                  <p className="text-muted text-sm">Additional sources</p>
                </DashboardCard>
              </div>

              {/* Income vs Expenses Chart */}
              <DashboardCard title="Income vs Expenses">
                <Skeleton className="h-64 w-full rounded-lg" />
              </DashboardCard>
            </section>

            {/* Spending by Category */}
            <section>
              <h2 className="text-xl font-semibold mb-4 text-mono-900 dark:text-mono-0">Spending by Category</h2>
              <DashboardCard>
                <Skeleton className="h-80 w-full rounded-lg" />
              </DashboardCard>
            </section>

            {/* Recent Transactions */}
            <section>
              <h2 className="text-xl font-semibold mb-4 text-mono-900 dark:text-mono-0">Recent Transactions</h2>
              <DashboardCard>
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
                    {[1, 2, 3, 4, 5].map((i) => (
                      <tr key={i} className="border-b border-mono-100 dark:border-mono-700 hover:bg-mono-50 dark:hover:bg-mono-700 transition-colors">
                        <td className="py-4">
                          <Skeleton className="h-4 w-28" />
                        </td>
                        <td className="py-4">
                          <Skeleton className="h-4 w-20" />
                        </td>
                        <td className="py-4">
                          <div className="ml-auto w-fit">
                            <span className="text-sm font-medium text-mono-900 dark:text-mono-0">
                              {formatMoney(convertAmount(180 + i * 35, "ZMW", selectedCurrency), selectedCurrency)}
                            </span>
                          </div>
                        </td>
                        <td className="py-4">
                          <Skeleton className="h-4 w-24 ml-auto" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </DashboardCard>
            </section>
          </div>

          {/* Right Sidebar */}
          <aside className="space-y-6">
            {/* Budget Status */}
            <DashboardCard title="Budget Status">
              <Skeleton className="h-32 w-full rounded-lg mb-4" />
              <p className="text-xs text-muted">Monthly progress</p>
            </DashboardCard>

            {/* Upcoming Payments */}
            <DashboardCard title="Upcoming Payments">
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="pb-3 border-b border-mono-100 dark:border-mono-700 last:border-0 last:pb-0">
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                ))}
              </div>
            </DashboardCard>

            {/* Monthly Tips */}
            <DashboardCard title="Monthly Tips">
              <div className="flex gap-3">
                <div className="text-accent-500 text-2xl">💡</div>
                <div className="flex-1">
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-3 w-4/5" />
                </div>
              </div>
            </DashboardCard>
          </aside>
        </div>
      </div>
    </div>
  );
};
