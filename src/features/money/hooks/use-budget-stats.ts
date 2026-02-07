import { useMemo } from "react";
import { Expense, MoneyStats } from "../types";
import { CENTRAL_FUND_ID } from "../utils/money-utils";

interface UseBudgetStatsProps {
	expenses: Expense[];
	totalBudget: number;
}

export function useBudgetStats({ expenses, totalBudget }: UseBudgetStatsProps) {
	const stats = useMemo<MoneyStats>(() => {
		const totalSpent = expenses
			.filter(
				(ex) => ex.category !== "settlement" && ex.payerId !== CENTRAL_FUND_ID
			)
			.reduce((sum, ex) => sum + ex.thbAmount, 0);

		const remaining = totalBudget - totalSpent;
		const percentage = totalBudget > 0 ? Math.min((totalSpent / totalBudget) * 100, 100) : 0;
		
		// Calculate daily average (mock: assuming 3 days for now)
		const dailyAverage = totalSpent / 3;

		return {
			totalBudget,
			totalSpent,
			remaining,
			dailyAverage,
		};
	}, [expenses, totalBudget]);

	const percentage = useMemo(() => {
		return stats.totalBudget > 0 
			? Math.min((stats.totalSpent / stats.totalBudget) * 100, 100) 
			: 0;
	}, [stats]);

	const isOverBudget = stats.remaining < 0;
	const isNearLimit = percentage >= 90;
	const isWarning = percentage >= 75 && percentage < 90;

	return {
		...stats,
		percentage,
		isOverBudget,
		isNearLimit,
		isWarning,
	};
}
