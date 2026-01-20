import type { Currency } from "../context/FinanceContext";

export const formatMoney = (amount: number, currency: Currency) => {
  const symbol = currency === "USD" ? "$" : "K";
  return `${symbol}${amount.toFixed(2)}`;
};

