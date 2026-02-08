import { Expense } from "../types";
import { ExpenseFormValues } from "../schemas/expense-schema";
import { DEFAULT_CURRENCIES } from "../utils/money-utils";

// Mock Data Store
let MOCK_EXPENSES: Expense[] = [
	{
		id: "1",
		tripId: "t1",
		description: "Welcome Dinner",
		amount: 15000,
		currency: "JPY",
		exchangeRate: 0.24,
		thbAmount: 3600,
		date: new Date().toISOString(),
		payerId: "u1",
		category: "food",
		splitDetails: { type: "equal", involvedUserIds: ["u1", "u2", "u3"] },
		createdBy: "u1",
		createdAt: new Date().toISOString(),
	},
	{
		id: "2",
		tripId: "t1",
		description: "Taxi to Hotel",
		amount: 4500,
		currency: "JPY",
		exchangeRate: 0.24,
		thbAmount: 1080,
		date: new Date().toISOString(),
		payerId: "u2",
		category: "transport",
		splitDetails: { type: "equal", involvedUserIds: ["u1", "u2", "u3"] },
		createdBy: "u1",
		createdAt: new Date().toISOString(),
	},
];

export const expensesApi = {
	async getByTripId(_tripId: string): Promise<Expense[]> {
		// Simulate network delay
		await new Promise((resolve) => setTimeout(resolve, 500));
		return MOCK_EXPENSES;
	},

	async create(tripId: string, data: ExpenseFormValues): Promise<Expense> {
		await new Promise((resolve) => setTimeout(resolve, 500));

		const rate =
			DEFAULT_CURRENCIES[data.currency as keyof typeof DEFAULT_CURRENCIES].rate;
		
		// Build split details based on type
		const splitDetails: Expense["splitDetails"] =
			data.splitType === "exact" && data.exactAmounts
				? {
						type: "exact",
						involvedUserIds: data.involvedUserIds,
						amounts: data.exactAmounts,
				  }
				: {
						type: "equal",
						involvedUserIds: data.involvedUserIds,
				  };

		const newExpense: Expense = {
			id: Date.now().toString(),
			tripId,
			description: data.description,
			amount: data.amount,
			currency: data.currency as any,
			exchangeRate: rate,
			thbAmount: data.amount * rate,
			date: new Date(data.date).toISOString(),
			payerId: data.payerId,
			category: data.category,
			splitDetails,
			place: data.placeName ? { name: data.placeName } : undefined,
			createdBy: "curr_user", // Mock current user
			createdAt: new Date().toISOString(),
		};

		MOCK_EXPENSES = [newExpense, ...MOCK_EXPENSES];
		return newExpense;
	},

	async delete(id: string): Promise<void> {
		await new Promise((resolve) => setTimeout(resolve, 300));
		MOCK_EXPENSES = MOCK_EXPENSES.filter((e) => e.id !== id);
	},

	async update(id: string, data: ExpenseFormValues): Promise<Expense> {
		await new Promise((resolve) => setTimeout(resolve, 500));

		const index = MOCK_EXPENSES.findIndex((e) => e.id === id);
		if (index === -1) throw new Error("Expense not found");

		const rate =
			DEFAULT_CURRENCIES[data.currency as keyof typeof DEFAULT_CURRENCIES].rate;

		const splitDetails: Expense["splitDetails"] =
			data.splitType === "exact" && data.exactAmounts
				? {
						type: "exact",
						involvedUserIds: data.involvedUserIds,
						amounts: data.exactAmounts,
				  }
				: {
						type: "equal",
						involvedUserIds: data.involvedUserIds,
				  };

		const updatedExpense: Expense = {
			...MOCK_EXPENSES[index],
			description: data.description,
			amount: data.amount,
			currency: data.currency as any,
			exchangeRate: rate,
			thbAmount: data.amount * rate,
			date: new Date(data.date).toISOString(),
			payerId: data.payerId,
			category: data.category,
			splitDetails,
			place: data.placeName ? { name: data.placeName } : undefined,
		};

		MOCK_EXPENSES[index] = updatedExpense;
		return updatedExpense;
	},
};
