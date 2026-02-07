import { useMemo } from "react";
import { Expense } from "../types";
import { CENTRAL_FUND_ID } from "../utils/money-utils";

export interface DebtBreakdown {
	userId: string;
	amount: number;
	transactions: Expense[]; // List of expenses causing this debt
}

export function useDebtCalculator(expenses: Expense[], currentUserId: string) {
	return useMemo(() => {
		const debtMap: Record<string, number> = {};
		const transactionsMap: Record<string, Expense[]> = {};

		expenses.forEach((ex) => {
			if (ex.payerId === CENTRAL_FUND_ID) return;

			const payerId = ex.payerId;
			const splitters = ex.splitDetails.involvedUserIds;
			const amountPerPerson = ex.thbAmount / splitters.length;

			if (payerId === currentUserId) {
				// I paid, others owe me
				splitters.forEach((uid) => {
					if (uid !== currentUserId) {
						debtMap[uid] = (debtMap[uid] || 0) + amountPerPerson;

						if (!transactionsMap[uid]) transactionsMap[uid] = [];
						transactionsMap[uid].push(ex);
					}
				});
			} else if (splitters.includes(currentUserId)) {
				// Someone else paid, I owe them
				debtMap[payerId] = (debtMap[payerId] || 0) - amountPerPerson;

				if (!transactionsMap[payerId]) transactionsMap[payerId] = [];
				transactionsMap[payerId].push(ex);
			}
		});

		const whoOwesMe: DebtBreakdown[] = Object.entries(debtMap)
			.filter(([_, amt]) => amt > 1) // Tolerance for floating point
			.map(([uid, amt]) => ({
				userId: uid,
				amount: amt,
				transactions: transactionsMap[uid] || [],
			}));

		const iOweWho: DebtBreakdown[] = Object.entries(debtMap)
			.filter(([_, amt]) => amt < -1)
			.map(([uid, amt]) => ({
				userId: uid,
				amount: amt,
				transactions: transactionsMap[uid] || [],
			}));

		const netBalance = Object.values(debtMap).reduce(
			(sum, amt) => sum + amt,
			0
		);

		// Calculate totals
		const totalReceivable = whoOwesMe.reduce(
			(sum, item) => sum + item.amount,
			0
		);
		const totalPayable = iOweWho.reduce(
			(sum, item) => sum + Math.abs(item.amount),
			0
		);

		return { whoOwesMe, iOweWho, netBalance, totalReceivable, totalPayable };
	}, [expenses, currentUserId]);
}
