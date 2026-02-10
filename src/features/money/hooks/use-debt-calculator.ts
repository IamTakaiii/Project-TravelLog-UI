import { useMemo } from "react";
import { Expense } from "../types";
import {
	calculateDebts,
	type DebtBreakdown,
	type DebtSummary,
} from "../services/debt-calculator";

export type { DebtBreakdown, DebtSummary };

export function useDebtCalculator(expenses: Expense[], currentUserId: string) {
	return useMemo(
		() => calculateDebts(expenses, currentUserId),
		[expenses, currentUserId]
	);
}
