import { useState, useEffect, useCallback } from 'react';
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

function getDefaultValues(expense?: Expense, currency?: string, users: UserInfo[] = []): ExpenseFormValues {
  if (expense) {
    return {
      description: expense.description,
      amount: expense.amount,
      currency: expense.currency || currency || 'THB',
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
    currency: currency || 'THB',
    date: new Date().toISOString().slice(0, 16),
    category: 'food',
    payerId: payerId as string,
    splitType: 'equal',
    involvedUserIds: allUserIds,
    exactAmounts: {},
    placeName: '',
  };
}

/**
 * Encapsulates React Hook Form setup, mode switching, form reset,
 * and mutation submission for the expense form.
 */
export function useExpenseForm({ tripId, currency, expense, users = [], onSuccess }: UseExpenseFormParams) {
  const isEditing = !!expense;
  const [mode, setMode] = useState<FormMode>(expense ? 'standard' : 'quick');

  const { createExpense, updateExpense } = useExpenseMutations(tripId);

  const form = useForm<ExpenseFormValues>({
    resolver: zodResolver(expenseSchema),
    defaultValues: getDefaultValues(expense, currency, users),
  });

  // Reset form when expense or users change (edit mode)
  useEffect(() => {
    if (expense) {
      form.reset(getDefaultValues(expense, currency, users));
      setMode('standard');
    } else {
      form.reset(getDefaultValues(undefined, currency, users));
      setMode(mode === 'standard' ? 'standard' : 'quick'); // preserve mode if it was changed
    }
  }, [expense, currency, users, form]);

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
        createExpense.mutate({ data }, {
          onSuccess: () => {
            toast.success('Expense added');
            form.reset(getDefaultValues(undefined, currency, users));
            onSuccess?.();
          },
        });
      }
    },
    [isEditing, expense, createExpense, updateExpense, form, currency, users, onSuccess],
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
