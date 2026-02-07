import { useMemo, useState, useCallback } from "react";
import { Expense } from "../types";

interface UseExpenseFiltersProps {
	expenses: Expense[];
}

export function useExpenseFilters({ expenses }: UseExpenseFiltersProps) {
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

	const filteredExpenses = useMemo(() => {
		return expenses
			.filter((expense) => {
				const matchesSearch =
					expense.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
					expense.place?.name?.toLowerCase().includes(searchQuery.toLowerCase());
				
				const matchesCategory = selectedCategory
					? expense.category === selectedCategory
					: true;
				
				return matchesSearch && matchesCategory;
			})
			.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
	}, [expenses, searchQuery, selectedCategory]);

	const handleCategoryToggle = useCallback((categoryId: string) => {
		setSelectedCategory((prev) => (prev === categoryId ? null : categoryId));
	}, []);

	const clearSearch = useCallback(() => {
		setSearchQuery("");
	}, []);

	const clearFilters = useCallback(() => {
		setSearchQuery("");
		setSelectedCategory(null);
	}, []);

	return {
		searchQuery,
		setSearchQuery,
		selectedCategory,
		filteredExpenses,
		handleCategoryToggle,
		clearSearch,
		clearFilters,
		hasActiveFilters: searchQuery !== "" || selectedCategory !== null,
	};
}
