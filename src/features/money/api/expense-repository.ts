import { Expense } from '../types';
import { ExpenseFormValues } from '../schemas/expense-schema';

/**
 * Typed error thrown when an expense is not found during update operations.
 * (Requirement 8.3)
 */
export class ExpenseNotFoundError extends Error {
  constructor(public readonly expenseId: string) {
    super(`Expense not found: ${expenseId}`);
    this.name = 'ExpenseNotFoundError';
  }
}

/**
 * Repository interface for expense CRUD operations.
 * Implementations can be swapped between mock and real backends.
 * (Requirement 4.1)
 */
export interface ExpenseRepository {
  getByTripId(tripId: string): Promise<Expense[]>;
  create(tripId: string, data: ExpenseFormValues): Promise<Expense>;
  update(id: string, data: ExpenseFormValues): Promise<Expense>;
  delete(id: string): Promise<void>;
}
