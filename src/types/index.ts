/**
 * Personal Finance App - TypeScript Type Definitions
 * Defines core data models for the application
 */

/**
 * Represents a financial account (bank, cash, digital wallet, credit card, etc.)
 */
export type Account = {
  id: string;
  name: string;
  type: 'cash' | 'bank' | 'digital' | 'credit';
  balance: number;
  color?: string;
  createdAt: string;
};

/**
 * Represents a financial transaction (income or expense)
 */
export type Transaction = {
  id: string;
  amount: number;
  type: 'income' | 'expense';
  accountId: string;
  categoryId: string;
  date: string;
  note?: string;
};

/**
 * Represents a transaction category for organizing and filtering transactions
 */
export type Category = {
  id: string;
  name: string;
  type: 'income' | 'expense';
  color?: string;
};

/**
 * Represents user settings for main income tracking
 */
export type UserIncomeSettings = {
  mainIncomeAmount: number;
  mainIncomeDate: string;
};

/**
 * Supported currencies for the application
 */
export type Currency = 'USD' | 'ZMW';
