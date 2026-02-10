import { CurrencyCode, CurrencyConfig } from "../types";

export const DEFAULT_CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
	THB: { code: "THB", symbol: "฿", rate: 1, flag: "🇹🇭" },
	JPY: { code: "JPY", symbol: "¥", rate: 0.24, flag: "🇯🇵" },
	USD: { code: "USD", symbol: "$", rate: 35.5, flag: "🇺🇸" },
	EUR: { code: "EUR", symbol: "€", rate: 38.2, flag: "🇪🇺" },
	GBP: { code: "GBP", symbol: "£", rate: 43.5, flag: "🇬🇧" },
	CNY: { code: "CNY", symbol: "¥", rate: 5.0, flag: "🇨🇳" },
};
