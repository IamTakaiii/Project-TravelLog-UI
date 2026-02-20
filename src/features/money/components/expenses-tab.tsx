import { motion } from "framer-motion";
import { Expense } from "../types";
import { SearchInput } from "@/components/common/search-input";
import { CategoryFilter } from "./category-filter";
import { ExpenseList } from "./expense-list";
import { ANIMATION_VARIANTS } from "../constants/tabs";

interface ExpensesTabProps {
	searchQuery: string;
	onSearchChange: (value: string) => void;
	onSearchClear: () => void;
	selectedCategory: string | null;
	onCategoryToggle: (categoryId: string) => void;
	filteredExpenses: Expense[];
	onExpenseClick: (expense: Expense) => void;
	isLoading?: boolean;
	userMap?: Map<string, string>;
	tripCurrency?: import("../types").CurrencyCode;
}

export function ExpensesTab({
	searchQuery,
	onSearchChange,
	onSearchClear,
	selectedCategory,
	onCategoryToggle,
	filteredExpenses,
	onExpenseClick,
	isLoading,
	userMap,
	tripCurrency,
}: ExpensesTabProps) {
	return (
		<motion.div
			key="expenses"
			{...ANIMATION_VARIANTS.tab}
			className="space-y-6"
		>
			<div className="flex flex-col sm:flex-row gap-4">
				<SearchInput
					value={searchQuery}
					onChange={onSearchChange}
					onClear={onSearchClear}
					placeholder="Search expenses..."
				/>

				<CategoryFilter
					selectedCategory={selectedCategory}
					onCategoryToggle={onCategoryToggle}
				/>
			</div>

			<ExpenseList
				expenses={filteredExpenses}
				onExpenseClick={onExpenseClick}
				isLoading={isLoading}
				userMap={userMap}
				tripCurrency={tripCurrency}
			/>
		</motion.div>
	);
}


