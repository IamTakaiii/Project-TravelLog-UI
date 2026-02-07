import { CurrencyCode, CurrencyConfig, ExpenseCategory } from "../types";
import {
	Utensils,
	MapPin,
	Hotel,
	ShoppingBag,
	Ticket,
	Car,
	Gift,
	Music,
	MoreHorizontal,
	Receipt,
} from "lucide-react";

export const DEFAULT_CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
	THB: { code: "THB", symbol: "฿", rate: 1, flag: "🇹🇭" },
	JPY: { code: "JPY", symbol: "¥", rate: 0.24, flag: "🇯🇵" },
	USD: { code: "USD", symbol: "$", rate: 35.5, flag: "🇺🇸" },
	EUR: { code: "EUR", symbol: "€", rate: 38.2, flag: "🇪🇺" },
	GBP: { code: "GBP", symbol: "£", rate: 43.5, flag: "🇬🇧" },
	CNY: { code: "CNY", symbol: "¥", rate: 5.0, flag: "🇨🇳" },
};

export const DEFAULT_CATEGORIES: ExpenseCategory[] = [
	{
		id: "food",
		name: "Food",
		icon: "Utensils",
		color:
			"bg-orange-100 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400",
	},
	{
		id: "transport",
		name: "Transport",
		icon: "MapPin",
		color: "bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400",
	},
	{
		id: "hotel",
		name: "Hotel",
		icon: "Hotel",
		color:
			"bg-purple-100 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400",
	},
	{
		id: "shopping",
		name: "Shopping",
		icon: "ShoppingBag",
		color: "bg-pink-100 text-pink-600 dark:bg-pink-500/20 dark:text-pink-400",
	},
	{
		id: "activity",
		name: "Activity",
		icon: "Ticket",
		color:
			"bg-yellow-100 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-400",
	},
	{
		id: "others",
		name: "Others",
		icon: "MoreHorizontal",
		color: "bg-gray-100 text-gray-600 dark:bg-gray-500/20 dark:text-gray-400",
	},
];

export const CATEGORY_ICONS: Record<string, any> = {
	Utensils,
	MapPin,
	Hotel,
	ShoppingBag,
	Ticket,
	Car,
	Gift,
	Music,
	MoreHorizontal,
	Receipt,
};

export function formatMoney(
	amount: number,
	currency: CurrencyCode = "THB"
): string {
	const config = DEFAULT_CURRENCIES[currency] || DEFAULT_CURRENCIES["THB"];
	return `${config.symbol}${amount.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
}

export const CENTRAL_FUND_ID = "central_fund";
