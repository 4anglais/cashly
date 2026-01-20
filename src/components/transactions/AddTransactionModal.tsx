import { X } from "lucide-react";
import { useState } from "react";
import { useFinance } from "../../context/useFinance";
import { Transaction } from "../../types/index";

type AddTransactionModalProps = {
  open?: boolean;
  onClose?: () => void;
};

export const AddTransactionModal = ({ open = false, onClose }: AddTransactionModalProps) => {
  const { addTransaction, accounts, categories } = useFinance();
  const [type, setType] = useState<"income" | "expense">("expense");
  const [amount, setAmount] = useState("");
  const [accountId, setAccountId] = useState(accounts[0]?.id || "");
  const [categoryId, setCategoryId] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [note, setNote] = useState("");

  const handleSave = () => {
    if (!amount || !accountId || !categoryId) return;

    const newTransaction: Transaction = {
      id: `txn-${Date.now()}`,
      amount: parseFloat(amount),
      type,
      accountId,
      categoryId,
      date: new Date(date).toISOString(),
      note: note.trim() || undefined,
    };

    addTransaction(newTransaction);

    // Reset form
    setAmount("");
    setType("expense");
    setAccountId(accounts[0]?.id || "");
    setCategoryId("");
    setDate(new Date().toISOString().split("T")[0]);
    setNote("");
    onClose?.();
  };

  const availableCategories = categories.filter((c) => c.type === type);

  if (!open) return null;

  return (
    <div aria-hidden="true" className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-mono-900/40 backdrop-blur-sm" onClick={onClose} />

      {/* Sheet */}
      <div className="relative w-full max-w-2xl rounded-3xl border border-mono-100 dark:border-mono-700 bg-mono-0 dark:bg-mono-800 shadow-soft">
        <div className="flex items-start justify-between gap-4 p-6 border-b border-mono-100 dark:border-mono-700">
          <div>
            <h2 className="text-lg font-semibold text-mono-900 dark:text-mono-0">Add Transaction</h2>
            <p className="text-sm text-muted mt-1">Log income or spending — clean and fast.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
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
                  onClick={() => {
                    setType("income");
                    setCategoryId("");
                  }}
                  className={`flex-1 h-12 rounded-2xl border transition-colors ${
                    type === "income"
                      ? "border-accent-500 bg-accent-500/10"
                      : "border-mono-100 dark:border-mono-700 bg-mono-25 dark:bg-mono-900/30 hover:bg-mono-50 dark:hover:bg-mono-700"
                  }`}
                >
                  <span className="text-sm font-medium text-mono-900 dark:text-mono-0">Income</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setType("expense");
                    setCategoryId("");
                  }}
                  className={`flex-1 h-12 rounded-2xl border transition-colors ${
                    type === "expense"
                      ? "border-accent-500 bg-accent-500/10"
                      : "border-mono-100 dark:border-mono-700 bg-mono-25 dark:bg-mono-900/30 hover:bg-mono-50 dark:hover:bg-mono-700"
                  }`}
                >
                  <span className="text-sm font-medium text-mono-900 dark:text-mono-0">Expense</span>
                </button>
              </div>
            </div>

            <label className="grid gap-2">
              <span className="text-sm font-medium text-mono-900 dark:text-mono-0">Amount</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                step="0.01"
                className="rounded-2xl border border-mono-100 dark:border-mono-700 bg-mono-25 dark:bg-mono-900/30 px-4 py-3 text-sm text-mono-900 dark:text-mono-0 placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent-500"
              />
            </label>

            <div className="grid sm:grid-cols-2 gap-4">
              <label className="grid gap-2">
                <span className="text-sm font-medium text-mono-900 dark:text-mono-0">Account</span>
                <select
                  value={accountId}
                  onChange={(e) => setAccountId(e.target.value)}
                  className="rounded-2xl border border-mono-100 dark:border-mono-700 bg-mono-25 dark:bg-mono-900/30 px-4 py-3 text-sm text-mono-900 dark:text-mono-0 focus:outline-none focus:ring-2 focus:ring-accent-500"
                >
                  {accounts.map((acc) => (
                    <option key={acc.id} value={acc.id}>
                      {acc.name}
                    </option>
                  ))}
                </select>
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-medium text-mono-900 dark:text-mono-0">Category</span>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="rounded-2xl border border-mono-100 dark:border-mono-700 bg-mono-25 dark:bg-mono-900/30 px-4 py-3 text-sm text-mono-900 dark:text-mono-0 focus:outline-none focus:ring-2 focus:ring-accent-500"
                >
                  <option value="">Select a category</option>
                  {availableCategories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <label className="grid gap-2">
              <span className="text-sm font-medium text-mono-900 dark:text-mono-0">Date</span>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="rounded-2xl border border-mono-100 dark:border-mono-700 bg-mono-25 dark:bg-mono-900/30 px-4 py-3 text-sm text-mono-900 dark:text-mono-0 focus:outline-none focus:ring-2 focus:ring-accent-500"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-medium text-mono-900 dark:text-mono-0">Note (optional)</span>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Add a note..."
                rows={2}
                className="rounded-2xl border border-mono-100 dark:border-mono-700 bg-mono-25 dark:bg-mono-900/30 px-4 py-3 text-sm text-mono-900 dark:text-mono-0 placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent-500"
              />
            </label>

            <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="btn-secondary w-full sm:w-auto"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={!amount || !categoryId}
                className="btn-primary w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

