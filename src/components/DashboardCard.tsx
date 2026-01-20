import { ReactNode } from "react";

interface DashboardCardProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export const DashboardCard = ({ title, children, className = "" }: DashboardCardProps) => (
  <div className={`card p-6 ${className}`}>
    {title && <h3 className="text-lg font-semibold text-mono-900 dark:text-mono-0 mb-4">{title}</h3>}
    {children}
  </div>
);
