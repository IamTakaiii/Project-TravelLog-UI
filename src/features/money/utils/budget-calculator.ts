import { Expense, BudgetSummary } from "../types";
import {
	BUDGET_WARNING_PERCENT,
	BUDGET_CRITICAL_PERCENT,
	CENTRAL_FUND_ID,
} from "../constants/thresholds";

export interface BudgetStats extends BudgetSummary {
	percentage: number;
	isOverBudget: boolean;
	isNearLimit: boolean;
	isWarning: boolean;
}

/**
 * Calculates budget statistics from a list of expenses.
 *
 * If `backendSum` is provided, it is used directly as `totalSpent`
 * (the backend already excludes settlements and central-fund payments).
 * Otherwise the total is computed from the expense list client-side.
 *
 * Edge cases:
 *  - Zero budget  → percentage = 0
 *  - Zero trip days → dailyAverage = 0
 */
export function calculateBudgetStats({
	expenses,
	totalBudget,
	tripDays,
	backendSum,
}: {
	expenses: Expense[];
	totalBudget: number;
	tripDays: number;
	backendSum?: number;
}): BudgetStats {
	const totalSpent =
		backendSum ??
		expenses
			.filter((ex) => !ex.isSettlement && ex.payerId !== CENTRAL_FUND_ID)
			.reduce((sum, ex) => sum + ex.thbAmount, 0);

	const remaining = totalBudget - totalSpent;
	const percentage =
		totalBudget > 0 ? Math.min((totalSpent / totalBudget) * 100, 100) : 0;
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
