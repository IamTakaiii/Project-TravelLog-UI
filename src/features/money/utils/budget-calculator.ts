import { Expense, MoneyStats } from '../types';
import {
  BUDGET_WARNING_PERCENT,
  BUDGET_CRITICAL_PERCENT,
  CENTRAL_FUND_ID,
} from '../constants/thresholds';

export interface BudgetStats extends MoneyStats {
  percentage: number;
  isOverBudget: boolean;
  isNearLimit: boolean;
  isWarning: boolean;
}

/**
 * Calculates budget statistics from a list of expenses.
 *
 * Settlements and central fund payments are excluded from the total spent.
 * Handles edge cases: zero budget (percentage = 0), zero trip days (dailyAverage = 0).
 *
 * Threshold constants from `constants/thresholds.ts` determine warning/critical flags:
 * - isWarning: percentage >= BUDGET_WARNING_PERCENT (75)
 * - isNearLimit: percentage >= BUDGET_CRITICAL_PERCENT (90)
 * - isOverBudget: totalSpent > totalBudget
 */
export function calculateBudgetStats(
  expenses: Expense[],
  totalBudget: number,
  tripDays: number
): BudgetStats {
  const relevantExpenses = expenses.filter(
    (ex) => ex.category !== 'settlement' && ex.payerId !== CENTRAL_FUND_ID
  );

  const totalSpent = relevantExpenses.reduce(
    (sum, ex) => sum + ex.thbAmount,
    0
  );

  const remaining = totalBudget - totalSpent;

  const percentage =
    totalBudget > 0
      ? Math.min((totalSpent / totalBudget) * 100, 100)
      : 0;

  const dailyAverage = tripDays > 0 ? totalSpent / tripDays : 0;

  return {
    totalBudget,
    totalSpent,
    remaining,
    dailyAverage,
    percentage,
    isOverBudget: totalSpent > totalBudget,
    isNearLimit: percentage >= BUDGET_CRITICAL_PERCENT,
    isWarning: percentage >= BUDGET_WARNING_PERCENT,
  };
}
