import { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { expenseSchema, ExpenseFormValues } from '../schemas/expense-schema';
import { useExpenseMutations } from './use-expense-mutations';
import { Expense } from '../types';

export type FormMode = 'quick' | 'standard';

interface UseExpenseFormParams {
  tripId: string;
  currency?: string;
  expense?: Expense;
  onSuccess?: () => void;
}

function getDefaultValues(expense?: Expense, currency?: string): ExpenseFormValues {
  if (expense) {
    return {
      description: expense.description,
      amount: expense.amount,
      currency: expense.currency,
      date: new Date(expense.date).toISOString().slice(0, 16),
      category: expense.category,
      payerId: expense.payerId,
      splitType: expense.splitDetails.type,
      involvedUserIds: expense.splitDetails.involvedUserIds,
      exactAmounts: expense.splitDetails.amounts || {},
      placeName: expense.place?.name || '',
    };
  }

  return {
    description: '',
    amount: 0,
    currency: currency || 'THB',
    date: new Date().toISOString().slice(0, 16),
    category: 'food',
    payerId: 'u1',
    splitType: 'equal',
    involvedUserIds: ['u1', 'u2', 'u3'],
    exactAmounts: {},
    placeName: '',
  };
}

/**
 * Encapsulates React Hook Form setup, mode switching, form reset,
 * and mutation submission for the expense form.
 * (Requirements 5.1, 7.2)
 */
export function useExpenseForm({ tripId, currency, expense, onSuccess }: UseExpenseFormParams) {
  const isEditing = !!expense;
  const [mode, setMode] = useState<FormMode>(expense ? 'standard' : 'quick');

  const { createExpense, updateExpense } = useExpenseMutations(tripId);

  const form = useForm<ExpenseFormValues>({
    resolver: zodResolver(expenseSchema),
    defaultValues: getDefaultValues(expense, currency),
  });

  // Reset form when expense changes (edit mode)
  useEffect(() => {
    if (expense) {
      form.reset(getDefaultValues(expense));
      setMode('standard');
    } else {
      form.reset(getDefaultValues(undefined, currency));
      setMode('quick');
    }
  }, [expense, currency, form]);

  const onSubmit = useCallback(
    (data: ExpenseFormValues) => {
      if (isEditing && expense) {
        updateExpense.mutate(
          { id: expense.id, data },
          {
            onSuccess: () => {
              toast.success('Expense updated');
              onSuccess?.();
            },
          },
        );
      } else {
        createExpense.mutate(data, {
          onSuccess: () => {
            toast.success('Expense added');
            form.reset(getDefaultValues(undefined, currency));
            onSuccess?.();
          },
        });
      }
    },
    [isEditing, expense, createExpense, updateExpense, form, onSuccess],
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
