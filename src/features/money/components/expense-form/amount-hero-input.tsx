import { Control } from "react-hook-form";
import { DEFAULT_CURRENCIES } from "../../constants/currencies";
import { ExpenseFormValues } from "../../schemas/expense-schema";
import { FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormSelect } from "@/components/ui/form-select";

interface AmountHeroInputProps {
	control: Control<ExpenseFormValues>;
}

export function AmountHeroInput({ control }: AmountHeroInputProps) {
	const currencyOptions = Object.values(DEFAULT_CURRENCIES).map((c) => ({
		label: `${c.flag} ${c.code}`,
		value: c.code,
	}));

	return (
		<div className="bg-muted/30 p-6 rounded-3xl border border-border/50 space-y-4">
			<div className="flex gap-3">
				<FormSelect
					className="w-24"
					control={control}
					name="currency"
					options={currencyOptions}
				/>
				<FormField
					control={control}
					name="amount"
					render={({ field }) => (
						<FormItem className="flex-1 space-y-0">
							<FormControl>
								<Input
									{...field}
									type="number"
									placeholder="0.00"
									className="h-12 bg-muted/30 border-border/50 focus:bg-background text-right font-mono text-lg"
									onChange={(e) => {
										const value = e.target.value;
										field.onChange(value === "" ? "" : Number(value));
									}}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>
		</div>
	);
}

