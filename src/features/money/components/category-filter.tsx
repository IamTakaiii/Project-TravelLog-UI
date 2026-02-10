import { cn } from "@/lib/utils";
import { DEFAULT_CATEGORIES } from "../constants/categories";

interface CategoryFilterProps {
	selectedCategory: string | null;
	onCategoryToggle: (categoryId: string) => void;
}

export function CategoryFilter({
	selectedCategory,
	onCategoryToggle,
}: CategoryFilterProps) {
	return (
		<div className="flex flex-wrap gap-2">
			{DEFAULT_CATEGORIES.map((cat) => (
				<button
					key={cat.id}
					onClick={() => onCategoryToggle(cat.id)}
					className={cn(
						"px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all",
						selectedCategory === cat.id
							? "bg-primary text-white"
							: "bg-muted/50 text-muted-foreground hover:bg-muted"
					)}
				>
					{cat.name}
				</button>
			))}
		</div>
	);
}
