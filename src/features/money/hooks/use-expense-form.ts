import { useState, useEffect, useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { expenseSchema, ExpenseFormValues } from '../schemas/expense-schema';
import { useExpenseMutations } from './use-expense-mutations';
import { Expense } from '../types';

export type FormMode = 'quick' | 'standard';

interface UserInfo {
  id: string;
  name: string;
  avatar?: string;
}

interface UseExpenseFormParams {
  tripId: string;
  currency?: string;
  expense?: Expense;
  users?: UserInfo[];
  onSuccess?: () => void;
}

/**
 * Encapsulates React Hook Form setup, mode switching, form reset,
 * and mutation submission for the expense form.
 */
export function useExpenseForm({ tripId, currency = 'THB', expense, users = [], onSuccess }: UseExpenseFormParams) {
  const isEditing = !!expense;
  const [mode, setMode] = useState<FormMode>(expense ? 'standard' : 'quick');

  const { createExpense, updateExpense } = useExpenseMutations(tripId);

  const defaultValues = useMemo((): ExpenseFormValues => {
    if (expense) {
      return {
        description: expense.description,
        amount: expense.amount,
        currency: expense.currency || currency,
        date: new Date(expense.date).toISOString().slice(0, 16),
        category: expense.category,
        payerId: expense.payerId,
        splitType: expense.splitDetails.type,
        involvedUserIds: expense.splitDetails.involvedUserIds,
        exactAmounts: expense.splitDetails.amounts || {},
        placeName: expense.place?.name || '',
      };
    }

    const allUserIds = users.map(u => u.id);
    const payerId = allUserIds.length > 0 ? allUserIds[0] : '';

    return {
      description: '',
      amount: 0,
      currency: currency,
      date: new Date().toISOString().slice(0, 16),
      category: 'food',
      payerId: payerId as string,
      splitType: 'equal',
      involvedUserIds: allUserIds,
      exactAmounts: {},
      placeName: '',
    };
  }, [expense, currency, users]);

  const form = useForm<ExpenseFormValues>({
    resolver: zodResolver(expenseSchema),
    defaultValues,
  });

  // Reset form when defaultValues change (important for edit mode transitions)
  useEffect(() => {
    form.reset(defaultValues);
    if (expense) {
      setMode('standard');
    }
  }, [defaultValues, form, expense]);

  const onSubmit = useCallback(
    (data: ExpenseFormValues) => {
      const mutationOptions = {
        onSuccess: () => {
          toast.success(isEditing ? 'Expense updated' : 'Expense added');
          if (!isEditing) {
            form.reset(defaultValues);
          }
          onSuccess?.();
        },
      };

      if (isEditing && expense) {
        updateExpense.mutate({ id: expense.id, data }, mutationOptions);
      } else {
        createExpense.mutate({ data }, mutationOptions);
      }
    },
    [isEditing, expense, createExpense, updateExpense, form, defaultValues, onSuccess],
  );

  const isPending = createExpense.isPending || updateExpense.isPending;

  return {
    form,
    mode,
    setMode,
    isEditing,
    isPending,
    onSubmit,
  };
}
