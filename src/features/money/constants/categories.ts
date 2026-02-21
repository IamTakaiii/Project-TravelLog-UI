import { LucideIcon } from "lucide-react";
import { ExpenseCategory } from "../types";
import {
	Utensils,
	Coffee,
	Car,
	Plane,
	Hotel,
	Ticket,
	ShoppingBag,
	HeartPulse,
	Wifi,
	Gift,
	Shirt,
	CreditCard,
	MoreHorizontal,
	Receipt,
	PlusCircle,
	Handshake,
	Landmark,
	Bus,
	UtensilsCrossed,
} from "lucide-react";

/**
 * Predefined travel expense categories, ordered from most to least frequently used.
 * The `settlement` category is reserved for debt settlement entries and never shown in the form grid.
 */
export const DEFAULT_CATEGORIES: ExpenseCategory[] = [
	// ── Food & Drink ─────────────────────────────────────────────────────────
	{
		id: "food",
		name: "Food",
		icon: "Utensils",
		color:
			"bg-orange-100 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400",
	},
	{
		id: "cafe",
		name: "Café",
		icon: "Coffee",
		color:
			"bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400",
	},
	{
		id: "drinks",
		name: "Drinks",
		icon: "UtensilsCrossed",
		color:
			"bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400",
	},

	// ── Getting Around ────────────────────────────────────────────────────────
	{
		id: "transport",
		name: "Transport",
		icon: "Car",
		color: "bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400",
	},
	{
		id: "flight",
		name: "Flight",
		icon: "Plane",
		color: "bg-sky-100 text-sky-600 dark:bg-sky-500/20 dark:text-sky-400",
	},
	{
		id: "bus",
		name: "Bus / Train",
		icon: "Bus",
		color: "bg-cyan-100 text-cyan-600 dark:bg-cyan-500/20 dark:text-cyan-400",
	},

	// ── Stay ─────────────────────────────────────────────────────────────────
	{
		id: "hotel",
		name: "Hotel",
		icon: "Hotel",
		color:
			"bg-purple-100 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400",
	},

	// ── Things to Do ─────────────────────────────────────────────────────────
	{
		id: "activity",
		name: "Activity",
		icon: "Landmark",
		color: "bg-lime-100 text-lime-700 dark:bg-lime-500/20 dark:text-lime-400",
	},
	{
		id: "ticket",
		name: "Ticket",
		icon: "Ticket",
		color:
			"bg-violet-100 text-violet-600 dark:bg-violet-500/20 dark:text-violet-400",
	},

	// ── Shopping ─────────────────────────────────────────────────────────────
	{
		id: "shopping",
		name: "Shopping",
		icon: "ShoppingBag",
		color: "bg-pink-100 text-pink-600 dark:bg-pink-500/20 dark:text-pink-400",
	},
	{
		id: "souvenir",
		name: "Souvenir",
		icon: "Gift",
		color: "bg-rose-100 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400",
	},

	// ── Other Essentials ─────────────────────────────────────────────────────
	{
		id: "health",
		name: "Health",
		icon: "HeartPulse",
		color: "bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400",
	},
	{
		id: "internet",
		name: "SIM / WiFi",
		icon: "Wifi",
		color:
			"bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400",
	},
	{
		id: "laundry",
		name: "Laundry",
		icon: "Shirt",
		color: "bg-teal-100 text-teal-600 dark:bg-teal-500/20 dark:text-teal-400",
	},
	{
		id: "fees",
		name: "Fees / Visa",
		icon: "CreditCard",
		color:
			"bg-slate-100 text-slate-600 dark:bg-slate-500/20 dark:text-slate-400",
	},
	{
		id: "others",
		name: "Others",
		icon: "MoreHorizontal",
		color: "bg-gray-100 text-gray-600 dark:bg-gray-500/20 dark:text-gray-400",
	},

	// ── Reserved ─────────────────────────────────────────────────────────────
	{
		id: "settlement",
		name: "Settlement",
		icon: "Handshake",
		color:
			"bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400",
	},
];

export const CATEGORY_ICONS: Record<string, LucideIcon> = {
	Utensils,
	Coffee,
	UtensilsCrossed,
	Car,
	Plane,
	Bus,
	Hotel,
	Landmark,
	Ticket,
	ShoppingBag,
	Gift,
	HeartPulse,
	Wifi,
	Shirt,
	CreditCard,
	MoreHorizontal,
	Receipt,
	PlusCircle,
	Handshake,
};
