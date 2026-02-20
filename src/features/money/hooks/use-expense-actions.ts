import { useCallback } from "react";
import { useCrudUiState } from "@/hooks/use-crud-ui-state";
import { useExpenseMutations } from "./use-expense-mutations";
import { Expense } from "../types";
import { expensesApi } from "../api/expenses-api";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { expenseQueryKeys } from "../queries/money-queries";

export function useExpenseActions(tripId: string) {
	const uiState = useCrudUiState<Expense>();
	const { deleteExpense } = useExpenseMutations(tripId);
	const queryClient = useQueryClient();

	const handleDelete = useCallback(() => {
		if (uiState.selectedItem) {
			deleteExpense.mutate(uiState.selectedItem.id, {
				onSuccess: () => {
					uiState.closeAll();
				},
			});
		}
	}, [uiState, deleteExpense]);

	const handleSettle = useCallback(async (
		amount: number,
		type: 'pay' | 'receive',
		targetUserId: string,
		currentUserId: string,
		targetUserName: string,
		currency: string
	) => {
		try {
			// Create a new settlement expense to balance the debt
			await expensesApi.create(tripId, {
				description: `Settlement: ${type === 'pay' ? 'Paid to' : 'Received from'} ${targetUserName}`,
				amount: Math.abs(amount),
				currency: currency,
				date: new Date().toISOString(),
				category: "OTHER",
				isSettlement: true,
				payerId: type === 'pay' ? currentUserId : targetUserId,
				splitType: "equal",
				involvedUserIds: [type === 'pay' ? targetUserId : currentUserId],
			});

			queryClient.invalidateQueries({ queryKey: expenseQueryKeys.list(tripId) });
			toast.success("Debt settlement recorded");
		} catch (error: any) {
			toast.error(error.message || "Failed to settle debt");
		}
	}, [tripId, queryClient]);

	return {
		...uiState,
		isDeleting: deleteExpense.isPending,
		handleDelete,
		handleSettle,
	};
}
