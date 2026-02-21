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
	amounts?: Record<string, number>; // UserId -> Amount (only for exact splits)
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
	rateAt?: string; // "YYYY-MM-DD" — which day's exchange rate was used
	thbAmount: number; // Converted to trip base currency
	date: string; // ISO string
	/** UUID of the user who paid. Null/empty when a fund paid. */
	payerId: string;
	/** UUID of the central fund that paid. Set when a fund covers this expense. */
	payerFundId?: string;
	category: string;
	splitDetails: SplitDetails;
	place?: {
		name: string;
		location?: { lat: number; lng: number };
	};
	image?: string;
	createdBy: string;
	createdAt: string;
	isSettlement: boolean;
}

// ── Budget ────────────────────────────────────────────────────────────────────

export interface BudgetSummary {
	totalBudget: number;
	totalSpent: number;
	remaining: number;
	dailyAverage: number;
}

// ── Debts ─────────────────────────────────────────────────────────────────────

export interface DebtBreakdown {
	userId: string;
	amount: number;
	transactions: Expense[];
}

export interface DebtSummary {
	whoOwesMe: DebtBreakdown[];
	iOweWho: DebtBreakdown[];
	netBalance: number;
	totalReceivable: number;
	totalPayable: number;
}

/** Raw debt breakdown received from the backend (transactionIds instead of full Expense objects) */
export interface BackendDebtBreakdown {
	userId: string;
	amount: number;
	transactionIds: string[];
}

export interface BackendDebts {
	whoOwesMe: BackendDebtBreakdown[];
	iOweWho: BackendDebtBreakdown[];
	netBalance: number;
	totalReceivable: number;
	totalPayable: number;
}

// ── Funds ─────────────────────────────────────────────────────────────────────

export interface Fund {
	id: string;
	tripId: string;
	title: string;
	amount: number;
	currency: CurrencyCode;
	createdAt: string;
	updatedAt: string;
	createdBy: string;
	updatedBy: string;
}

export type CreateFundInput = Pick<
	Fund,
	"title" | "tripId" | "amount" | "currency"
>;
export type UpdateFundInput = Partial<CreateFundInput>;

// ── Split results ─────────────────────────────────────────────────────────────

export interface EqualSplitResult {
	type: "equal";
	perPersonAmount: number;
	involvedUserIds: string[];
	totalAmount: number;
}

export interface ExactSplitResult {
	type: "exact";
	amounts: Record<string, number>;
	involvedUserIds: string[];
	totalAmount: number;
}

export type SplitResult = EqualSplitResult | ExactSplitResult;

export interface SplitValidation {
	isValid: boolean;
	totalAssigned: number;
	expectedTotal: number;
	discrepancy: number;
}

export interface ChangeEntry {
	field: string;
	from: any;
	to: any;
}

export interface ExpenseLog {
	id: string;
	expenseId: string | null;
	tripId: string;
	action: "CREATE" | "UPDATE" | "DELETE";
	data: any & { changes?: ChangeEntry[] };
	userId: string;
	timestamp: string;
	user: {
		id: string;
		name: string;
		email: string;
		image?: string | null;
	};
}
