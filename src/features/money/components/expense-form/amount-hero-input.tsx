import { Control } from "react-hook-form";
import { DEFAULT_CURRENCIES } from "../../constants/currencies";
import { ExpenseFormValues } from "../../schemas/expense-schema";
import { FormInput } from "@/components/ui/form-input";
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
				<FormInput
					className="flex-1"
					control={control}
					name="amount"
					type="number"
					placeholder="0.00"
				/>
			</div>
		</div>
	);
}

