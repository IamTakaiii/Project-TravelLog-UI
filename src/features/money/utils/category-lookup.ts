import { ExpenseCategory } from "../types";
import { DEFAULT_CATEGORIES } from "../constants/categories";

/**
 * Look up an expense category by its ID. It falls back to a custom category if not found.
 *
 * @param id - The category ID to search for
 * @returns The matching ExpenseCategory, or a generated custom one
 */
export function getCategoryById(
  id: string
): ExpenseCategory | undefined {
  if (!id) return DEFAULT_CATEGORIES.find((c) => c.id === "others");
  const found = DEFAULT_CATEGORIES.find((c) => c.id.toLowerCase() === id.toLowerCase());
  if (found) return found;

  return {
    id,
    name: id,
    icon: "PlusCircle",
    color: "bg-teal-100 text-teal-600 dark:bg-teal-500/20 dark:text-teal-400"
  };
}
