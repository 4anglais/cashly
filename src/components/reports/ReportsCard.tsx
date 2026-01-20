import type { ReactNode } from "react";

interface ReportsCardProps {
  children: ReactNode;
  title?: string;
  className?: string;
}

export const ReportsCard = ({ children, title, className = "" }: ReportsCardProps) => {
  return (
    <div className={`bg-mono-0 dark:bg-mono-750 rounded-2xl p-6 shadow-sm dark:shadow-md border border-mono-100 dark:border-mono-700 ${className}`}>
      {title && <h3 className="text-lg font-semibold text-mono-900 dark:text-mono-0 mb-4">{title}</h3>}
      {children}
    </div>
  );
};
