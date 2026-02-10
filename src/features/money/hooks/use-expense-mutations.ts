import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { expensesApi } from '../api/expenses-api';
import { expenseQueryKeys } from '../queries/money-queries';
import { ExpenseFormValues } from '../schemas/expense-schema';

/**
 * Encapsulates create, update, and delete expense mutations with
 * cache invalidation and error toast notifications.
 * (Requirements 7.1, 8.1)
 */
export function useExpenseMutations(tripId: string) {
  const queryClient = useQueryClient();

  const createExpense = useMutation({
    mutationFn: (data: ExpenseFormValues) => expensesApi.create(tripId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: expenseQueryKeys.list(tripId) });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create expense');
    },
  });

  const updateExpense = useMutation({
    mutationFn: ({ id, data }: { id: string; data: ExpenseFormValues }) =>
      expensesApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: expenseQueryKeys.list(tripId) });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update expense');
    },
  });

  const deleteExpense = useMutation({
    mutationFn: (id: string) => expensesApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: expenseQueryKeys.list(tripId) });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete expense');
    },
  });

  return { createExpense, updateExpense, deleteExpense };
}
