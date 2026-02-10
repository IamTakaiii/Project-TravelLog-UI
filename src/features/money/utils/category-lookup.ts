import { ExpenseCategory } from "../types";
import { DEFAULT_CATEGORIES } from "../constants/categories";

/**
 * Look up an expense category by its ID.
 *
 * @param id - The category ID to search for
 * @returns The matching ExpenseCategory, or undefined if not found
 */
export function getCategoryById(
  id: string
): ExpenseCategory | undefined {
  return DEFAULT_CATEGORIES.find((c) => c.id === id);
}
