import { motion } from "framer-motion";
import { Expense } from "../types";
import { ExpenseSearch } from "./expense-search";
import { CategoryFilter } from "./category-filter";
import { ExpenseList } from "./expense-list";
import { ANIMATION_VARIANTS } from "../constants";

interface ExpensesTabProps {
	searchQuery: string;
	onSearchChange: (value: string) => void;
	onSearchClear: () => void;
	selectedCategory: string | null;
	onCategoryToggle: (categoryId: string) => void;
	filteredExpenses: Expense[];
	onExpenseClick: (expense: Expense) => void;
}

export function ExpensesTab({
	searchQuery,
	onSearchChange,
	onSearchClear,
	selectedCategory,
	onCategoryToggle,
	filteredExpenses,
	onExpenseClick,
}: ExpensesTabProps) {
	return (
		<motion.div
			key="expenses"
			{...ANIMATION_VARIANTS.tab}
			className="space-y-6"
		>
			<div className="flex flex-col sm:flex-row gap-4">
				<ExpenseSearch
					value={searchQuery}
					onChange={onSearchChange}
					onClear={onSearchClear}
				/>

				<CategoryFilter
					selectedCategory={selectedCategory}
					onCategoryToggle={onCategoryToggle}
				/>
			</div>

			<ExpenseList expenses={filteredExpenses} onExpenseClick={onExpenseClick} />
		</motion.div>
	);
}
