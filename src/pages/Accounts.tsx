import { Plus } from "lucide-react";
import { DashboardCard } from "../components/DashboardCard";
import { AccountsSummary } from "../components/accounts/AccountsSummary";
import { AccountsGrid } from "../components/accounts/AccountsGrid";
import { AddAccountModal } from "../components/accounts/AddAccountModal";

export const Accounts = () => {
  // UI-only: the modal will be wired later. For now we show it open so styling is visible.
  const modalOpen = true;

  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 bg-mono-25 dark:bg-mono-800">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div className="mb-4 sm:mb-0">
            <h1 className="section-title">Accounts</h1>
            <p className="text-sm text-muted mt-1">Manage where your money lives</p>
          </div>

          <button type="button" className="btn-primary inline-flex items-center gap-2 w-full sm:w-auto">
            <Plus size={18} />
            Add Account
          </button>
        </header>

        <section className="mb-8">
          <AccountsSummary />
        </section>

        <section aria-label="Accounts list">
          <DashboardCard className="p-0">
            <div className="p-6 border-b border-mono-100 dark:border-mono-700">
              <h2 className="text-lg font-semibold text-mono-900 dark:text-mono-0">Your accounts</h2>
              <p className="text-sm text-muted mt-1">Cash, bank, digital, and credit — all in one place.</p>
            </div>
            <div className="p-6">
              <AccountsGrid />
            </div>
          </DashboardCard>
        </section>

        <AddAccountModal open={modalOpen} />
      </div>
    </div>
  );
};

