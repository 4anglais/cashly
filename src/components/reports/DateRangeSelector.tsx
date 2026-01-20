import { useState } from "react";
import { ChevronDown } from "lucide-react";

export type DateRange = "thisMonth" | "lastMonth" | "custom";

interface DateRangeSelectorProps {
  onRangeChange: (range: DateRange) => void;
  selectedRange: DateRange;
}

export const DateRangeSelector = ({ onRangeChange, selectedRange }: DateRangeSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const rangeOptions: { value: DateRange; label: string }[] = [
    { value: "thisMonth", label: "This Month" },
    { value: "lastMonth", label: "Last Month" },
    { value: "custom", label: "Custom" },
  ];

  const selectedLabel = rangeOptions.find((opt) => opt.value === selectedRange)?.label || "Select";

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-mono-50 dark:bg-mono-700 border border-mono-200 dark:border-mono-600 text-mono-900 dark:text-mono-0 hover:bg-mono-100 dark:hover:bg-mono-600 transition-colors"
      >
        <span className="text-sm font-medium">{selectedLabel}</span>
        <ChevronDown size={16} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-mono-0 dark:bg-mono-750 border border-mono-200 dark:border-mono-700 rounded-lg shadow-md z-50 min-w-40">
          {rangeOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onRangeChange(option.value);
                setIsOpen(false);
              }}
              className={`block w-full text-left px-4 py-2 text-sm transition-colors ${
                selectedRange === option.value
                  ? "bg-accent-500 text-mono-0 font-medium"
                  : "text-mono-700 dark:text-mono-200 hover:bg-mono-50 dark:hover:bg-mono-700"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
