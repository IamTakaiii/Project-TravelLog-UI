import { Control, useWatch } from "react-hook-form";
import { FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { DEFAULT_CURRENCIES } from "../../constants/currencies";
import { CurrencyCode } from "../../types";
import { ExpenseFormValues } from "../../schemas/expense-schema";

interface AmountHeroInputProps {
	control: Control<ExpenseFormValues>;
}

export function AmountHeroInput({ control }: AmountHeroInputProps) {
	const currency = useWatch({ control, name: "currency" }) as CurrencyCode;

	return (
		<div className="bg-muted/30 p-6 rounded-3xl border border-border/50 space-y-4">
			<div className="flex gap-3">
				<FormField
					control={control}
					name="currency"
					render={({ field }) => (
						<FormItem className="w-24">
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger className="h-12 bg-background border-none shadow-sm rounded-xl font-bold">
										<SelectValue />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{Object.values(DEFAULT_CURRENCIES).map((c) => (
										<SelectItem key={c.code} value={c.code} className="font-bold">
											{c.flag} {c.code}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</FormItem>
					)}
				/>
				<FormField
					control={control}
					name="amount"
					render={({ field }) => (
						<FormItem className="flex-1">
							<FormControl>
								<div className="relative group">
									<span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-black text-xl">
										{DEFAULT_CURRENCIES[currency]?.symbol}
									</span>
									<Input
										type="number"
										placeholder="0.00"
										className="h-12 pl-10 text-2xl font-black bg-background border-none shadow-sm rounded-xl focus-visible:ring-2 focus-visible:ring-primary/20"
										{...field}
										onChange={(e) => field.onChange(Number(e.target.value))}
									/>
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>
		</div>
	);
}
