import { createContext, useReducer, useEffect, ReactNode } from 'react';
import {
  Account,
  Transaction,
  Category,
  UserIncomeSettings,
  Currency,
} from '../types/index';

/**
 * Finance context state shape
 */
type FinanceState = {
  accounts: Account[];
  transactions: Transaction[];
  categories: Category[];
  userIncomeSettings: UserIncomeSettings | null;
  selectedCurrency: Currency;
};

/**
 * Finance context value shape including state and functions
 */
type FinanceContextValue = FinanceState & {
  addAccount: (account: Account) => void;
  addTransaction: (transaction: Transaction) => void;
  updateAccountBalance: (accountId: string, newBalance: number) => void;
  setMainIncome: (settings: UserIncomeSettings) => void;
  setCurrency: (currency: Currency) => void;
  convertAmount: (amount: number, from: Currency, to: Currency) => number;
  formatCurrency: (amount: number) => string;
};

/**
 * Initial default data for the application
 */
const DEFAULT_ACCOUNTS: Account[] = [
  {
    id: '1',
    name: 'Cash',
    type: 'cash',
    balance: 0,
    color: '#10b981',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Bank',
    type: 'bank',
    balance: 0,
    color: '#3b82f6',
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Mobile Money',
    type: 'digital',
    balance: 0,
    color: '#f59e0b',
    createdAt: new Date().toISOString(),
  },
];

const DEFAULT_CATEGORIES: Category[] = [
  {
    id: 'cat-1',
    name: 'Food',
    type: 'expense',
    color: '#ec4899',
  },
  {
    id: 'cat-2',
    name: 'Transport',
    type: 'expense',
    color: '#06b6d4',
  },
  {
    id: 'cat-3',
    name: 'Airtime',
    type: 'expense',
    color: '#8b5cf6',
  },
  {
    id: 'cat-4',
    name: 'Shopping',
    type: 'expense',
    color: '#f43f5e',
  },
  {
    id: 'cat-5',
    name: 'Salary',
    type: 'income',
    color: '#10b981',
  },
  {
    id: 'cat-6',
    name: 'Other Income',
    type: 'income',
    color: '#14b8a6',
  },
];

const INITIAL_STATE: FinanceState = {
  accounts: DEFAULT_ACCOUNTS,
  transactions: [],
  categories: DEFAULT_CATEGORIES,
  userIncomeSettings: null,
  selectedCurrency: 'ZMW',
};

/**
 * Create the Finance Context
 */
export const FinanceContext = createContext<FinanceContextValue | undefined>(
  undefined
);

/**
 * Action types for the reducer
 */
type Action =
  | { type: 'ADD_ACCOUNT'; payload: Account }
  | { type: 'ADD_TRANSACTION'; payload: Transaction }
  | { type: 'UPDATE_ACCOUNT_BALANCE'; payload: { accountId: string; newBalance: number } }
  | { type: 'SET_MAIN_INCOME'; payload: UserIncomeSettings }
  | { type: 'SET_CURRENCY'; payload: Currency }
  | { type: 'LOAD_STATE'; payload: FinanceState };

/**
 * Reducer function to handle state updates
 */
function financeReducer(state: FinanceState, action: Action): FinanceState {
  switch (action.type) {
    case 'ADD_ACCOUNT':
      return {
        ...state,
        accounts: [...state.accounts, action.payload],
      };

    case 'ADD_TRANSACTION': {
      const transaction = action.payload;
      const updatedAccounts = state.accounts.map((account) => {
        if (account.id === transaction.accountId) {
          const balanceChange =
            transaction.type === 'income'
              ? transaction.amount
              : -transaction.amount;
          return {
            ...account,
            balance: account.balance + balanceChange,
          };
        }
        return account;
      });

      return {
        ...state,
        transactions: [...state.transactions, transaction],
        accounts: updatedAccounts,
      };
    }

    case 'UPDATE_ACCOUNT_BALANCE':
      return {
        ...state,
        accounts: state.accounts.map((account) =>
          account.id === action.payload.accountId
            ? { ...account, balance: action.payload.newBalance }
            : account
        ),
      };

    case 'SET_MAIN_INCOME':
      return {
        ...state,
        userIncomeSettings: action.payload,
      };

    case 'SET_CURRENCY':
      return {
        ...state,
        selectedCurrency: action.payload,
      };

    case 'LOAD_STATE':
      return action.payload;

    default:
      return state;
  }
}

/**
 * FinanceProvider component that wraps the app with the Finance Context
 */
export function FinanceProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(financeReducer, INITIAL_STATE);

  const STORAGE_KEY = 'finance_v1';
  const CURRENCY_STORAGE_KEY = 'finance_currency';

  /**
   * Load state from localStorage on component mount
   */
  useEffect(() => {
    const storedState = localStorage.getItem(STORAGE_KEY);
    if (storedState) {
      try {
        const parsedState = JSON.parse(storedState);
        dispatch({ type: 'LOAD_STATE', payload: parsedState });
      } catch (error) {
        // If parsing fails, use initial state
      }
    }

    // Load saved currency preference
    const storedCurrency = localStorage.getItem(CURRENCY_STORAGE_KEY) as Currency | null;
    if (storedCurrency && (storedCurrency === 'USD' || storedCurrency === 'ZMW')) {
      dispatch({ type: 'SET_CURRENCY', payload: storedCurrency });
    }
  }, []);

  /**
   * Save state to localStorage whenever it changes
   */
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  /**
   * Save currency preference separately when it changes
   */
  useEffect(() => {
    localStorage.setItem(CURRENCY_STORAGE_KEY, state.selectedCurrency);
  }, [state.selectedCurrency]);

  /**
   * Convert amount between currencies
   * Conversion rate: 1 USD = 20 ZMW
   */
  const convertAmount = (amount: number, from: Currency, to: Currency): number => {
    if (from === to) return amount;

    const CONVERSION_RATE = 20; // 1 USD = 20 ZMW

    if (from === 'ZMW' && to === 'USD') {
      return Math.round((amount / CONVERSION_RATE) * 100) / 100;
    } else if (from === 'USD' && to === 'ZMW') {
      return Math.round(amount * CONVERSION_RATE * 100) / 100;
    }

    return amount;
  };

  /**
   * Format currency with symbol and decimal places
   */
  const formatCurrency = (amount: number): string => {
    const symbol = state.selectedCurrency === 'USD' ? '$' : 'K';
    return `${symbol}${amount.toFixed(2)}`;
  };

  const value: FinanceContextValue = {
    ...state,
    addAccount: (account: Account) => {
      dispatch({ type: 'ADD_ACCOUNT', payload: account });
    },
    addTransaction: (transaction: Transaction) => {
      dispatch({ type: 'ADD_TRANSACTION', payload: transaction });
    },
    updateAccountBalance: (accountId: string, newBalance: number) => {
      dispatch({
        type: 'UPDATE_ACCOUNT_BALANCE',
        payload: { accountId, newBalance },
      });
    },
    setMainIncome: (settings: UserIncomeSettings) => {
      dispatch({ type: 'SET_MAIN_INCOME', payload: settings });
    },
    setCurrency: (currency: Currency) => {
      dispatch({ type: 'SET_CURRENCY', payload: currency });
    },
    convertAmount,
    formatCurrency,
  };

  return (
    <FinanceContext.Provider value={value}>{children}</FinanceContext.Provider>
  );
}
