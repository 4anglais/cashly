import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Currency = "USD" | "ZMW";

type FinanceContextValue = {
  selectedCurrency: Currency;
  setCurrency: (currency: Currency) => void;
  convertAmount: (amount: number, from: Currency, to: Currency) => number;
};

const FinanceContext = createContext<FinanceContextValue | null>(null);

const STORAGE_KEY = "cashly:selectedCurrency";
const USD_TO_ZMW = 20; // Mock rate: 1 USD = 20 ZMW

const round2 = (n: number) => Math.round(n * 100) / 100;

export const FinanceProvider = ({ children }: { children: ReactNode }) => {
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === "USD" || saved === "ZMW" ? saved : "ZMW";
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, selectedCurrency);
  }, [selectedCurrency]);

  const value = useMemo<FinanceContextValue>(() => {
    const convertAmount = (amount: number, from: Currency, to: Currency) => {
      if (from === to) return round2(amount);
      if (from === "USD" && to === "ZMW") return round2(amount * USD_TO_ZMW);
      if (from === "ZMW" && to === "USD") return round2(amount / USD_TO_ZMW);
      return round2(amount);
    };

    return {
      selectedCurrency,
      setCurrency: setSelectedCurrency,
      convertAmount,
    };
  }, [selectedCurrency]);

  return <FinanceContext.Provider value={value}>{children}</FinanceContext.Provider>;
};

export const useFinance = () => {
  const ctx = useContext(FinanceContext);
  if (!ctx) throw new Error("useFinance must be used within a FinanceProvider");
  return ctx;
};

