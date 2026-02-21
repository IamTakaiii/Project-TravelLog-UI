import { cn } from "@/lib/utils";
import { DEFAULT_CATEGORIES } from "../constants/categories";

interface CategoryFilterProps {
	selectedCategories: string[];
	onCategoryToggle: (categoryId: string) => void;
	categories?: string[];
}

export function CategoryFilter({
	selectedCategories,
	onCategoryToggle,
	categories,
}: CategoryFilterProps) {
	// If we have backend categories, build list from them; otherwise fall back to defaults
	const items =
		categories && categories.length > 0
			? categories.map((id) => {
					const known = DEFAULT_CATEGORIES.find(
						(c) => c.id.toLowerCase() === id.toLowerCase()
					);
					return {
						id: id.toLowerCase(),
						name: known?.name ?? id,
					};
				})
			: DEFAULT_CATEGORIES.map((c) => ({ id: c.id, name: c.name }));

	return (
		<div className="flex flex-wrap gap-2">
			{items.map((cat) => {
				const isSelected = selectedCategories.includes(cat.id);
				return (
					<button
						key={cat.id}
						onClick={() => onCategoryToggle(cat.id)}
						className={cn(
							"px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all",
							isSelected
								? "bg-primary text-white shadow-md scale-105"
								: "bg-muted/50 text-muted-foreground hover:bg-muted"
						)}
					>
						{cat.name}
					</button>
				);
			})}
		</div>
	);
}
