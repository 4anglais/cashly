import { useContext } from 'react';
import { FinanceContext } from './FinanceContext';

/**
 * Custom hook to access Finance Context
 * Must be used within a FinanceProvider
 */
export function useFinance() {
  const context = useContext(FinanceContext);

  if (context === undefined) {
    throw new Error('useFinance must be used within a FinanceProvider');
  }

  return context;
}
