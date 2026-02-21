import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { expensesApi } from "../api/expenses-api";
import { expenseQueryKeys } from "../queries/money-queries";
import { fundsQueryKeys } from "../queries/fund-queries";
import { ExpenseFormValues } from "../schemas/expense-schema";

export interface ExpenseMutationPayload {
  data: ExpenseFormValues;
}

/**
 * Provides create / update / delete mutations for expenses.
 *
 * On success, all expense list queries for the trip are invalidated
 * (using the `lists()` prefix key so that every filter permutation is cleared).
 */
export function useExpenseMutations(tripId: string) {
  const queryClient = useQueryClient();

  // Invalidate all list queries for this trip regardless of active filters,
  // and also refresh the distinct-categories list so new category chips appear immediately
  const invalidateLists = () => {
    queryClient.invalidateQueries({ queryKey: expenseQueryKeys.lists() });
    queryClient.invalidateQueries({ queryKey: expenseQueryKeys.categories(tripId) });
    // Also invalidate fund summary since an expense might have been paid by a fund
    queryClient.invalidateQueries({ queryKey: fundsQueryKeys.summary(tripId) });
  };

  const createExpense = useMutation({
    mutationFn: ({ data }: ExpenseMutationPayload) => expensesApi.create(tripId, data),
    onSuccess: invalidateLists,
    onError: (error: Error) => toast.error(error.message || "Failed to create expense"),
  });

  const updateExpense = useMutation({
    mutationFn: ({ id, data }: { id: string; data: ExpenseFormValues }) =>
      expensesApi.update(id, data),
    onSuccess: invalidateLists,
    onError: (error: Error) => toast.error(error.message || "Failed to update expense"),
  });

  const deleteExpense = useMutation({
    mutationFn: (id: string) => expensesApi.delete(id),
    onSuccess: invalidateLists,
    onError: (error: Error) => toast.error(error.message || "Failed to delete expense"),
  });

  return { createExpense, updateExpense, deleteExpense };
}
