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

export interface Fund {
	id: string;
	tripId: string;
	title: string;
	amount: number; // From API as number
	currency: CurrencyCode;
	createdAt: string;
	updatedAt: string;
	createdBy: string;
	updatedBy: string;
}

export type CreateFundInput = Pick<Fund, "title" | "tripId" | "amount" | "currency">;
export type UpdateFundInput = Partial<CreateFundInput>;

// Discriminated union for split results (Requirement 3.3)
export interface EqualSplitResult {
  type: 'equal';
  perPersonAmount: number;
  involvedUserIds: string[];
  totalAmount: number;
}

export interface ExactSplitResult {
  type: 'exact';
  amounts: Record<string, number>;
  involvedUserIds: string[];
  totalAmount: number;
}

export type SplitResult = EqualSplitResult | ExactSplitResult;

// Split validation result (Requirement 8.4)
export interface SplitValidation {
  isValid: boolean;
  totalAssigned: number;
  expectedTotal: number;
  discrepancy: number;
}

