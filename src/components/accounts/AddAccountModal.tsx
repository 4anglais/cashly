import { X } from "lucide-react";
import { useState } from "react";
import { useFinance } from "../../context/useFinance";
import { Account } from "../../types/index";

type AddAccountModalProps = {
  open?: boolean;
  onClose?: () => void;
};

export const AddAccountModal = ({ open = false, onClose }: AddAccountModalProps) => {
  const { addAccount } = useFinance();
  const [name, setName] = useState("");
  const [type, setType] = useState<"cash" | "bank" | "digital" | "credit">("bank");
  const [balance, setBalance] = useState("");

  const handleSave = () => {
    if (!name.trim()) return;

    const newAccount: Account = {
      id: `acc-${Date.now()}`,
      name: name.trim(),
      type,
      balance: parseFloat(balance) || 0,
      createdAt: new Date().toISOString(),
    };

    addAccount(newAccount);

    // Reset form
    setName("");
    setType("bank");
    setBalance("");
    onClose?.();
  };

  if (!open) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-mono-900/40 backdrop-blur-sm" onClick={onClose} />

      {/* Sheet */}
      <div className="relative w-full max-w-xl rounded-3xl border border-mono-100 dark:border-mono-700 bg-mono-0 dark:bg-mono-800 shadow-soft">
        <div className="flex items-start justify-between gap-4 p-6 border-b border-mono-100 dark:border-mono-700">
          <div>
            <h2 className="text-lg font-semibold text-mono-900 dark:text-mono-0">Add Account</h2>
            <p className="text-sm text-muted mt-1">Create a new place to track your money.</p>
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
            <label className="grid gap-2">
              <span className="text-sm font-medium text-mono-900 dark:text-mono-0">Account name</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. My Savings"
                className="rounded-2xl border border-mono-100 dark:border-mono-700 bg-mono-25 dark:bg-mono-900/30 px-4 py-3 text-sm text-mono-900 dark:text-mono-0 placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent-500"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-medium text-mono-900 dark:text-mono-0">Account type</span>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as "cash" | "bank" | "digital" | "credit")}
                className="rounded-2xl border border-mono-100 dark:border-mono-700 bg-mono-25 dark:bg-mono-900/30 px-4 py-3 text-sm text-mono-900 dark:text-mono-0 focus:outline-none focus:ring-2 focus:ring-accent-500"
              >
                <option value="cash">Cash</option>
                <option value="bank">Bank</option>
                <option value="digital">Digital</option>
                <option value="credit">Credit</option>
              </select>
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-medium text-mono-900 dark:text-mono-0">Starting balance</span>
              <input
                type="number"
                value={balance}
                onChange={(e) => setBalance(e.target.value)}
                placeholder="0.00"
                step="0.01"
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
                disabled={!name.trim()}
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

