import { CurrencyCode } from '../types';
import { DEFAULT_CURRENCIES } from '../constants/currencies';

/**
 * Returns the currency symbol for a given currency code.
 *
 * If the currency code is not found in the configuration,
 * falls back to the THB symbol (Requirement 8.2).
 */
export function getCurrencySymbol(currency: CurrencyCode): string {
  const config = DEFAULT_CURRENCIES[currency] || DEFAULT_CURRENCIES['THB'];
  return config.symbol;
}

/**
 * Formats a monetary amount with the correct currency symbol
 * and locale-aware number formatting.
 *
 * If the currency code is not found in the configuration,
 * falls back to THB formatting (Requirement 8.2).
 */
export function formatMoney(amount: number, currency: CurrencyCode): string {
  const config = DEFAULT_CURRENCIES[currency] || DEFAULT_CURRENCIES['THB'];
  return `${config.symbol}${amount.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
}
