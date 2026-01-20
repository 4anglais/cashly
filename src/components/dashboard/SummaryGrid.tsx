import { SummaryCard } from "./SummaryCard";

type SummaryGridProps = {
  items?: Array<{
    title: string;
    value: string;
    variant?: "default" | "income" | "expense";
  }>;
};

export const SummaryGrid = ({
  items = [
    { title: "Total Balance", value: "$0.00", variant: "default" },
    { title: "Total Income", value: "$0.00", variant: "income" },
    { title: "Total Expenses", value: "$0.00", variant: "expense" },
    { title: "Net Difference", value: "$0.00", variant: "default" },
  ],
}: SummaryGridProps) => {
  return (
    <section aria-label="Summary" className="mb-8">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <SummaryCard
            key={item.title}
            title={item.title}
            value={item.value}
            variant={item.variant}
          />
        ))}
      </div>
    </section>
  );
};

