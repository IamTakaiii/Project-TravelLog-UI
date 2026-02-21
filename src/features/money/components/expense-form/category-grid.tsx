import { Control, useWatch } from "react-hook-form";
import { FormField, FormLabel } from "@/components/ui/form";
import { DEFAULT_CATEGORIES } from "../../constants/categories";
import { CategoryIcon } from "../category-icon";
import { cn } from "@/lib/utils";
import { ExpenseFormValues } from "../../schemas/expense-schema";
import { Input } from "@/components/ui/input";

interface CategoryGridProps {
	control: Control<ExpenseFormValues>;
}

export function CategoryGrid({ control }: CategoryGridProps) {
	// Let's see if current value matches any default category
	const currentVal = useWatch({ control, name: "category" });
	const isCustom = currentVal && !DEFAULT_CATEGORIES.some((c) => c.id === currentVal);

	return (
		<div className="space-y-3 px-1">
			<FormLabel className="text-xs font-black uppercase tracking-widest text-muted-foreground">
				Select Category
			</FormLabel>
			<FormField
				control={control}
				name="category"
				render={({ field }) => (
					<div className="space-y-4">
						<div className="grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-3">
							{DEFAULT_CATEGORIES.filter(c => c.id !== "settlement").map((cat) => (
								<div
									key={cat.id}
									onClick={() => field.onChange(cat.id)}
									className={cn(
										"cursor-pointer flex flex-col items-center gap-1.5 sm:gap-2 p-3 sm:p-4 rounded-[1.5rem] border-2 transition-all active:scale-95",
										field.value === cat.id && !isCustom
											? "border-primary bg-primary/5 shadow-inner"
											: "border-transparent bg-muted/30 hover:bg-muted/50"
									)}
								>
									<div
										className={cn(
											"size-8 sm:size-10 rounded-2xl flex items-center justify-center transition-transform",
											cat.color,
											field.value === cat.id && !isCustom ? "scale-110" : ""
										)}
									>
										<CategoryIcon
											iconName={cat.icon}
											className="size-4 sm:size-5"
										/>
									</div>
									<span className="text-[9px] sm:text-[10px] font-black uppercase tracking-tighter truncate w-full text-center">
										{cat.name}
									</span>
								</div>
							))}
						</div>

						{/* Custom Category Input */}
						<div>
							<FormLabel className="text-xs font-black uppercase tracking-widest text-muted-foreground block mb-2">
								Or Custom Category
							</FormLabel>
							<Input
								type="text"
								placeholder="E.g., Souvenirs, Tips... (Optional)"
								value={isCustom ? field.value : ""}
								onChange={(e) => {
									if (e.target.value.trim() === "") {
										field.onChange("others");
									} else {
										field.onChange(e.target.value);
									}
								}}
								className="rounded-xl border-2"
							/>
						</div>
					</div>
				)}
			/>
		</div>
	);
}
