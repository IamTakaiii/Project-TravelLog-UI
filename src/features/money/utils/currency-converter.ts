import { CurrencyCode, CurrencyConfig } from "../types";

export interface ConversionResult {
	originalAmount: number;
	convertedAmount: number;
	exchangeRate: number;
	sourceCurrency: CurrencyCode;
	targetCurrency: CurrencyCode;
}

/**
 * Converts an amount from one currency to another using the provided rate configuration.
 *
 * Each currency's `rate` represents how many THB (base currency) one unit is worth.
 * The exchange rate from source to target is computed as `sourceRate / targetRate`,
 * and the converted amount is `amount * exchangeRate`.
 *
 * When source and target are the same currency, the amount is returned unchanged
 * with an exchange rate of 1.
 */
export function convertCurrency(
	amount: number,
	sourceCurrency: CurrencyCode,
	targetCurrency: CurrencyCode,
	rates: Record<CurrencyCode, CurrencyConfig>
): ConversionResult {
	if (sourceCurrency === targetCurrency) {
		return {
			originalAmount: amount,
			convertedAmount: amount,
			exchangeRate: 1,
			sourceCurrency,
			targetCurrency,
		};
	}

	const sourceRate = rates[sourceCurrency].rate;
	const targetRate = rates[targetCurrency].rate;
	const exchangeRate = sourceRate / targetRate;

	return {
		originalAmount: amount,
		convertedAmount: amount * exchangeRate,
		exchangeRate,
		sourceCurrency,
		targetCurrency,
	};
}
