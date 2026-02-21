import { useMemo } from "react";
import { Expense, DebtBreakdown, DebtSummary, BackendDebts } from "../types";
import { calculateDebts } from "../utils/debt-calculator";

export type { DebtBreakdown, DebtSummary };

/**
 * Computes debt balances for the current user.
 *
 * If `backendDebts` is provided (from the API), it is used directly —
 * transaction IDs are resolved to full Expense objects from the local cache.
 * Otherwise falls back to calculating debts client-side (useful during initial load).
 */
export function useDebtCalculator(
	expenses: Expense[],
	currentUserId: string,
	backendDebts?: BackendDebts,
): DebtSummary {
	return useMemo(() => {
		if (backendDebts) {
			const mapBreakdown = (list: BackendDebts["whoOwesMe"]): DebtBreakdown[] =>
				list.map((item) => ({
					userId: item.userId,
					amount: item.amount,
					transactions: item.transactionIds
						.map((id) => expenses.find((e) => e.id === id))
						.filter(Boolean) as Expense[],
				}));

			return {
				whoOwesMe: mapBreakdown(backendDebts.whoOwesMe),
				iOweWho: mapBreakdown(backendDebts.iOweWho),
				netBalance: backendDebts.netBalance,
				totalReceivable: backendDebts.totalReceivable,
				totalPayable: backendDebts.totalPayable,
			};
		}

		return calculateDebts(expenses, currentUserId);
	}, [expenses, currentUserId, backendDebts]);
}
