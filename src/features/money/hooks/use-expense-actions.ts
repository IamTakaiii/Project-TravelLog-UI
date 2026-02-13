import { useCallback } from "react";
import { useCrudUiState } from "@/hooks/use-crud-ui-state";
import { useExpenseMutations } from "./use-expense-mutations";
import { Expense } from "../types";

export function useExpenseActions(tripId: string) {
	const uiState = useCrudUiState<Expense>();
	const { deleteExpense } = useExpenseMutations(tripId);

	const handleDelete = useCallback(() => {
		if (uiState.selectedItem) {
			deleteExpense.mutate(uiState.selectedItem.id, {
				onSuccess: () => {
					uiState.closeAll();
				},
			});
		}
	}, [uiState, deleteExpense]);

	return {
		...uiState,
		isDeleting: deleteExpense.isPending,
		handleDelete,
	};
}
