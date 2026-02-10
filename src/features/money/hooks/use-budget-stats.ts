import { useMemo } from "react";
import { Expense } from "../types";
import { calculateBudgetStats, BudgetStats } from "../services/budget-calculator";

interface UseBudgetStatsProps {
	expenses: Expense[];
	totalBudget: number;
	tripDays: number;
}

export function useBudgetStats({ expenses, totalBudget, tripDays }: UseBudgetStatsProps): BudgetStats {
	return useMemo(
		() => calculateBudgetStats(expenses, totalBudget, tripDays),
		[expenses, totalBudget, tripDays]
	);
}
