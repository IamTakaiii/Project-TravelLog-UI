import { Expense, CurrencyCode } from '../types';
import { ExpenseFormValues } from '../schemas/expense-schema';
import { ExpenseRepository, ExpenseNotFoundError } from './expense-repository';
import { DEFAULT_CURRENCIES } from '../constants/currencies';
import { convertCurrency } from '../services/currency-converter';
import { calculateEqualSplit } from '../services/split-calculator';
import { MOCK_USER_IDS } from '../mock/mock-users';

/**
 * Base currency used for THB conversion in mock data.
 */
const BASE_CURRENCY: CurrencyCode = 'THB';

/**
 * In-memory mock expense data store.
 * Moved from expenses-api.ts to separate mock data from the API contract.
 * (Requirement 4.2)
 */
let mockExpenses: Expense[] = [
  {
    id: '1',
    tripId: 't1',
    description: 'Welcome Dinner',
    amount: 15000,
    currency: 'JPY',
    exchangeRate: 0.24,
    thbAmount: 3600,
    date: new Date().toISOString(),
    payerId: MOCK_USER_IDS.CURRENT_USER,
    category: 'food',
    splitDetails: {
      type: 'equal',
      involvedUserIds: [
        MOCK_USER_IDS.CURRENT_USER,
        MOCK_USER_IDS.USER_2,
        MOCK_USER_IDS.USER_3,
      ],
    },
    createdBy: MOCK_USER_IDS.CURRENT_USER,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    tripId: 't1',
    description: 'Taxi to Hotel',
    amount: 4500,
    currency: 'JPY',
    exchangeRate: 0.24,
    thbAmount: 1080,
    date: new Date().toISOString(),
    payerId: MOCK_USER_IDS.USER_2,
    category: 'transport',
    splitDetails: {
      type: 'equal',
      involvedUserIds: [
        MOCK_USER_IDS.CURRENT_USER,
        MOCK_USER_IDS.USER_2,
        MOCK_USER_IDS.USER_3,
      ],
    },
    createdBy: MOCK_USER_IDS.CURRENT_USER,
    createdAt: new Date().toISOString(),
  },
];

/**
 * Builds split details from form values, delegating equal split construction
 * to the split-calculator service.
 * (Requirement 4.3)
 */
function buildSplitDetails(data: ExpenseFormValues): Expense['splitDetails'] {
  if (data.splitType === 'exact' && data.exactAmounts) {
    return {
      type: 'exact',
      involvedUserIds: data.involvedUserIds,
      amounts: data.exactAmounts,
    };
  }

  const equalSplit = calculateEqualSplit(data.amount, data.involvedUserIds);
  return {
    type: 'equal',
    involvedUserIds: equalSplit.involvedUserIds,
  };
}

/**
 * Converts form values to an Expense, using the currency-converter service
 * for currency conversion instead of inline math.
 * (Requirements 3.1, 3.4)
 */
function formValuesToExpense(
  data: ExpenseFormValues,
  overrides: { id: string; tripId: string; createdBy: string; createdAt: string }
): Expense {
  const currency = data.currency as CurrencyCode;
  const conversion = convertCurrency(
    data.amount,
    currency,
    BASE_CURRENCY,
    DEFAULT_CURRENCIES
  );

  return {
    id: overrides.id,
    tripId: overrides.tripId,
    description: data.description,
    amount: data.amount,
    currency,
    exchangeRate: conversion.exchangeRate,
    thbAmount: conversion.convertedAmount,
    date: new Date(data.date).toISOString(),
    payerId: data.payerId,
    category: data.category,
    splitDetails: buildSplitDetails(data),
    place: data.placeName ? { name: data.placeName } : undefined,
    createdBy: overrides.createdBy,
    createdAt: overrides.createdAt,
  };
}

/**
 * Mock implementation of ExpenseRepository using in-memory data.
 * Delegates currency conversion to currency-converter service and
 * split construction to split-calculator service.
 * (Requirements 4.2, 4.3)
 */
export const mockExpenseRepository: ExpenseRepository = {
  async getByTripId(_tripId: string): Promise<Expense[]> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockExpenses;
  },

  async create(tripId: string, data: ExpenseFormValues): Promise<Expense> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const newExpense = formValuesToExpense(data, {
      id: Date.now().toString(),
      tripId,
      createdBy: MOCK_USER_IDS.CURRENT_USER,
      createdAt: new Date().toISOString(),
    });

    mockExpenses = [newExpense, ...mockExpenses];
    return newExpense;
  },

  async update(id: string, data: ExpenseFormValues): Promise<Expense> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const index = mockExpenses.findIndex((e) => e.id === id);
    if (index === -1) {
      throw new ExpenseNotFoundError(id);
    }

    const existing = mockExpenses[index]!;
    const updatedExpense = formValuesToExpense(data, {
      id: existing.id,
      tripId: existing.tripId,
      createdBy: existing.createdBy,
      createdAt: existing.createdAt,
    });

    mockExpenses[index] = updatedExpense;
    return updatedExpense;
  },

  async delete(id: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    mockExpenses = mockExpenses.filter((e) => e.id !== id);
  },
};
