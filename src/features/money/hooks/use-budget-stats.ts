import { useMemo } from "react";
import { Expense } from "../types";
import { calculateBudgetStats, BudgetStats } from "../utils/budget-calculator";

interface UseBudgetStatsProps {
	expenses: Expense[];
	totalBudget: number;
	tripDays: number;
	backendSum?: number;
}

export function useBudgetStats({ expenses, totalBudget, tripDays, backendSum }: UseBudgetStatsProps): BudgetStats {
	return useMemo(
		() => calculateBudgetStats({ expenses, totalBudget, tripDays, backendSum }),
		[expenses, totalBudget, tripDays, backendSum]
	);
}
