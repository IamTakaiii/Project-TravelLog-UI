import { Control } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { MapPin } from "lucide-react";
import { ExpenseFormValues } from "../../schemas/expense-schema";

interface BasicInfoFieldsProps {
	control: Control<ExpenseFormValues>;
	mode: "quick" | "standard";
}

export function BasicInfoFields({ control, mode }: BasicInfoFieldsProps) {
	return (
		<div className="space-y-4 px-1">
			<FormField
				control={control}
				name="description"
				render={({ field }) => (
					<FormItem>
						<FormLabel className="text-xs font-black uppercase tracking-widest text-muted-foreground">
							What did you buy?
						</FormLabel>
						<FormControl>
							<Input
								placeholder="e.g. Sushi Dinner"
								className="h-12 rounded-2xl bg-muted/20 border-border/50 focus:bg-background transition-all font-medium"
								{...field}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>

			{mode === "standard" && (
				<FormField
					control={control}
					name="placeName"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
								<MapPin className="size-3" /> Where was this?
							</FormLabel>
							<FormControl>
								<Input
									placeholder="Location (Optional)"
									className="h-12 rounded-2xl bg-muted/20 border-border/50 focus:bg-background transition-all font-medium"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			)}
		</div>
	);
}
