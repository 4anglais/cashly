import { X } from "lucide-react";
import { Skeleton } from "../Skeleton";

type AddTransactionModalProps = {
  open?: boolean;
};

export const AddTransactionModal = ({ open = false }: AddTransactionModalProps) => {
  if (!open) return null;

  return (
    <div aria-hidden="true" className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-mono-900/40 backdrop-blur-sm" />

      {/* Sheet */}
      <div className="relative w-full max-w-2xl rounded-3xl border border-mono-100 dark:border-mono-700 bg-mono-0 dark:bg-mono-800 shadow-soft">
        <div className="flex items-start justify-between gap-4 p-6 border-b border-mono-100 dark:border-mono-700">
          <div>
            <h2 className="text-lg font-semibold text-mono-900 dark:text-mono-0">Add Transaction</h2>
            <p className="text-sm text-muted mt-1">Log income or spending — clean and fast.</p>
          </div>
          <button
            type="button"
            className="h-10 w-10 rounded-2xl border border-mono-100 dark:border-mono-700 bg-mono-25 dark:bg-mono-700 hover:bg-mono-50 dark:hover:bg-mono-600 transition-colors flex items-center justify-center"
            aria-label="Close"
          >
            <X size={18} className="text-mono-700 dark:text-mono-0" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid gap-5">
            <div className="grid gap-2">
              <span className="text-sm font-medium text-mono-900 dark:text-mono-0">Type</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="flex-1 h-12 rounded-2xl border border-mono-100 dark:border-mono-700 bg-mono-25 dark:bg-mono-900/30 hover:bg-mono-50 dark:hover:bg-mono-700 transition-colors"
                >
                  <span className="text-sm font-medium text-mono-900 dark:text-mono-0">Income</span>
                </button>
                <button
                  type="button"
                  className="flex-1 h-12 rounded-2xl border border-mono-100 dark:border-mono-700 bg-mono-25 dark:bg-mono-900/30 hover:bg-mono-50 dark:hover:bg-mono-700 transition-colors"
                >
                  <span className="text-sm font-medium text-mono-900 dark:text-mono-0">Expense</span>
                </button>
              </div>
            </div>

            <label className="grid gap-2">
              <span className="text-sm font-medium text-mono-900 dark:text-mono-0">Amount</span>
              <div className="rounded-2xl border border-mono-100 dark:border-mono-700 bg-mono-25 dark:bg-mono-900/30 px-4 py-3">
                <Skeleton className="h-4 w-28 rounded-md" />
              </div>
            </label>

            <div className="grid sm:grid-cols-2 gap-4">
              <label className="grid gap-2">
                <span className="text-sm font-medium text-mono-900 dark:text-mono-0">Account</span>
                <div className="rounded-2xl border border-mono-100 dark:border-mono-700 bg-mono-25 dark:bg-mono-900/30 px-4 py-3 flex items-center justify-between">
                  <Skeleton className="h-4 w-24 rounded-md" />
                  <Skeleton className="h-4 w-4 rounded-md" />
                </div>
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-medium text-mono-900 dark:text-mono-0">Category</span>
                <div className="rounded-2xl border border-mono-100 dark:border-mono-700 bg-mono-25 dark:bg-mono-900/30 px-4 py-3 flex items-center justify-between">
                  <Skeleton className="h-4 w-28 rounded-md" />
                  <Skeleton className="h-4 w-4 rounded-md" />
                </div>
              </label>
            </div>

            <label className="grid gap-2">
              <span className="text-sm font-medium text-mono-900 dark:text-mono-0">Date</span>
              <div className="rounded-2xl border border-mono-100 dark:border-mono-700 bg-mono-25 dark:bg-mono-900/30 px-4 py-3 flex items-center justify-between">
                <Skeleton className="h-4 w-32 rounded-md" />
                <Skeleton className="h-4 w-4 rounded-md" />
              </div>
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-medium text-mono-900 dark:text-mono-0">Note</span>
              <div className="rounded-2xl border border-mono-100 dark:border-mono-700 bg-mono-25 dark:bg-mono-900/30 px-4 py-4">
                <Skeleton className="h-4 w-4/5 rounded-md mb-2" />
                <Skeleton className="h-4 w-3/5 rounded-md" />
              </div>
            </label>

            <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-2">
              <button type="button" className="btn-secondary w-full sm:w-auto">
                Cancel
              </button>
              <button type="button" className="btn-primary w-full sm:w-auto">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

