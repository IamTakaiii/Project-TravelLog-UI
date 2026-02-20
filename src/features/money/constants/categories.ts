import { LucideIcon } from "lucide-react";
import { ExpenseCategory } from "../types";
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
	PlusCircle,
	Handshake,
} from "lucide-react";

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
	{
		id: "settlement",
		name: "Settlement",
		icon: "Handshake",
		color: "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400",
	},
];

export const CATEGORY_ICONS: Record<string, LucideIcon> = {
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
	PlusCircle,
	Handshake,
};
