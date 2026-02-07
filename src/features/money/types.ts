export type CurrencyCode = "THB" | "USD" | "JPY" | "EUR" | "GBP" | "CNY";

export interface CurrencyConfig {
	code: CurrencyCode;
	rate: number;
	symbol: string;
	flag: string;
}

export type SplitType = "equal" | "exact";

export interface SplitDetails {
	type: SplitType;
	involvedUserIds: string[];
	amounts?: Record<string, number>; // UserId -> Amount
}

export interface ExpenseCategory {
	id: string;
	name: string;
	icon: string;
	color: string;
}

export interface Expense {
	id: string;
	tripId: string;
	description: string;
	amount: number; // Original currency amount
	currency: CurrencyCode;
	exchangeRate: number;
	thbAmount: number; // Converted to base (THB for now, or trip base)
	date: string; // ISO string
	payerId: string;
	category: string;
	splitDetails: SplitDetails;
	place?: {
		name: string;
		location?: { lat: number; lng: number };
	};
	image?: string;
	createdBy: string;
	createdAt: string;
}

export interface MoneyStats {
	totalBudget: number;
	totalSpent: number;
	remaining: number;
	dailyAverage: number;
}

export interface DebtItem {
	userId: string;
	amount: number; // Positive = They owe me, Negative = I owe them
}
