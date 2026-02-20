import { Control, useWatch } from "react-hook-form";
import { DEFAULT_CURRENCIES } from "../../constants/currencies";
import { ExpenseFormValues } from "../../schemas/expense-schema";
import { FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormSelect } from "@/components/ui/form-select";
import { useExchangeRates } from "../../hooks/use-exchange-rates";
import { CurrencyCode } from "../../types";
import { useEffect } from "react";

interface AmountHeroInputProps {
	control: Control<ExpenseFormValues>;
	/** The trip's base currency — exchange rates are expressed relative to this */
	tripCurrency: CurrencyCode;
	/** Called whenever the live exchange rate for the selected currency changes */
	onRateChange?: (rate: number) => void;
}

export function AmountHeroInput({ control, tripCurrency, onRateChange }: AmountHeroInputProps) {
	// Fetch rates with tripCurrency as base: getRate(X) = "how many tripCurrency per 1 X"
	const { getRate, isLoading, isError, lastUpdated } = useExchangeRates(tripCurrency);
	const selectedCurrency = useWatch({ control, name: "currency" }) as CurrencyCode;

	// Rate = how many tripCurrency units per 1 unit of selected currency
	const rate = getRate(selectedCurrency ?? tripCurrency);

	// Notify parent whenever currency or rate changes
	useEffect(() => {
		onRateChange?.(rate);
	}, [rate, onRateChange]);

	const currencyOptions = Object.values(DEFAULT_CURRENCIES).map((c) => ({
		label: `${c.flag} ${c.code}`,
		value: c.code,
	}));

	// Show hint only if user selected a different currency from trip base
	const showRateHint = selectedCurrency && selectedCurrency !== tripCurrency;
	const tripSymbol = DEFAULT_CURRENCIES[tripCurrency]?.symbol ?? tripCurrency;

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

			{/* Exchange Rate Hint — shows conversion to trip currency */}
			{showRateHint && (
				<p className="text-xs text-muted-foreground font-medium">
					{isLoading ? (
						"Loading rate..."
					) : isError ? (
						<span className="text-amber-500">
							⚠ Fallback: 1 {selectedCurrency} ≈ {tripSymbol}{rate.toFixed(2)} {tripCurrency}
						</span>
					) : (
						<>
							<span className="text-emerald-500 font-bold">●</span>{" "}
							1 {selectedCurrency} = {tripSymbol}{rate.toFixed(selectedCurrency === "JPY" || tripCurrency === "JPY" ? 2 : 2)} {tripCurrency}
							{lastUpdated && <span className="opacity-60"> (updated {lastUpdated})</span>}
						</>
					)}
				</p>
			)}
		</div>
	);
}



