import { useState, useCallback } from "react";

export function useExpenseFilters() {
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

	const handleCategoryToggle = useCallback((categoryId: string) => {
		setSelectedCategories((prev) =>
			prev.includes(categoryId)
				? prev.filter((c) => c !== categoryId)
				: [...prev, categoryId]
		);
	}, []);

	const clearSearch = useCallback(() => {
		setSearchQuery("");
	}, []);

	const clearFilters = useCallback(() => {
		setSearchQuery("");
		setSelectedCategories([]);
	}, []);

	return {
		searchQuery,
		setSearchQuery,
		selectedCategories,
		handleCategoryToggle,
		clearSearch,
		clearFilters,
		hasActiveFilters: searchQuery !== "" || selectedCategories.length > 0,
	};
}
