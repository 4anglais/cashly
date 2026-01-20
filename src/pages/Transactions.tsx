import { Plus, Search, SlidersHorizontal } from "lucide-react";
import { DashboardCard } from "../components/DashboardCard";
import { TransactionsFilters } from "../components/transactions/TransactionsFilters";
import { TransactionsSummary } from "../components/transactions/TransactionsSummary";
import { TransactionsList } from "../components/transactions/TransactionsList";
import { AddTransactionModal } from "../components/transactions/AddTransactionModal";

export const Transactions = () => {
  // UI-only: modal wiring will come later; for now keep it visible to validate styling.
  const modalOpen = true;

  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 bg-mono-25 dark:bg-mono-800">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-8">
          <div>
            <h1 className="section-title">Transactions</h1>
            <p className="text-sm text-muted mt-1">Track your income and spending</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-72">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted">
                <Search size={18} />
              </div>
              <div className="h-12 rounded-2xl border border-mono-100 dark:border-mono-700 bg-mono-0/70 dark:bg-mono-900/40 px-10 flex items-center backdrop-blur">
                <span className="text-sm text-muted">Search transactions…</span>
              </div>
            </div>

            <button type="button" className="btn-secondary inline-flex items-center justify-center gap-2 h-12">
              <SlidersHorizontal size={18} />
              Filter
            </button>

            <button type="button" className="btn-primary inline-flex items-center justify-center gap-2 h-12">
              <Plus size={18} />
              Add Transaction
            </button>
          </div>
        </header>

        <section className="mb-6">
          <TransactionsFilters />
        </section>

        <section className="mb-8">
          <TransactionsSummary />
        </section>

        <section aria-label="Transactions list">
          <DashboardCard className="p-0">
            <div className="p-6 border-b border-mono-100 dark:border-mono-700">
              <h2 className="text-lg font-semibold text-mono-900 dark:text-mono-0">Recent activity</h2>
              <p className="text-sm text-muted mt-1">A clean view of your latest money movement.</p>
            </div>
            <div className="p-2 sm:p-4">
              <TransactionsList />
            </div>
          </DashboardCard>
        </section>

        <AddTransactionModal open={modalOpen} />
      </div>
    </div>
  );
};

