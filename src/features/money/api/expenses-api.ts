import { apiClient } from "@/lib/api-client";
import { Expense } from "../types";
import { ExpenseFormValues } from "../schemas/expense-schema";

// Map API response to UI Expense type
const mapExpenseResponse = (data: any): Expense => {
	const type = data.splits?.[0]?.splitType?.toLowerCase() || "equal";
	const involvedUserIds = data.splits?.map((s: any) => s.userId) || [];
	const amounts: Record<string, number> = {};
	if (type === "exact" && data.splits) {
		data.splits.forEach((s: any) => {
			amounts[s.userId] = Number(s.amount);
		});
	}

	return {
		id: data.id,
		tripId: data.tripId,
		description: data.title,
		amount: Number(data.amount),
		currency: data.currency as any,
		exchangeRate: Number(data.exchangeRate || 1),
		rateAt: data.rateAt ?? undefined,
		thbAmount: Number(data.baseAmount || data.amount),
		date: data.date || data.createdAt,
		payerId: data.payerId || "", // Payer ID might be null if it's from fund, need to handle or trust UI validation
		category: data.category || "other",
		splitDetails: {
			type: type as any,
			involvedUserIds,
			...(type === "exact" ? { amounts } : {}),
		},
		place: data.locationName ? { name: data.locationName } : undefined,
		createdBy: data.createdBy,
		createdAt: data.createdAt,
	};
};

export const expensesApi = {
	async getByTripId(tripId: string): Promise<Expense[]> {
		const response = await apiClient<any[]>(`/api/v1/expenses/trip/${tripId}`);
		return response.map(mapExpenseResponse);
	},

	async create(tripId: string, data: ExpenseFormValues, exchangeRate?: number): Promise<Expense> {
		// exchangeRate = "how many tripCurrency per 1 unit of data.currency"
		// Provided by useExchangeRates(tripCurrency) at submit time.
		// Falls back to 1 (same currency) if not provided.
		const rate = exchangeRate ?? 1;

		// Map UI Form Values to API DTO
		const payload = {
			tripId,
			payerId: data.payerId,
			amount: data.amount,
			currency: data.currency,
			exchangeRate: rate,
			title: data.description,
			category: data.category || "other",
			locationName: data.placeName || undefined,
			splits: data.involvedUserIds.map((userId) => {
				const isExact = data.splitType === "exact";
				const splitAmount = isExact && data.exactAmounts
					? data.exactAmounts[userId] || 0
					: data.amount / data.involvedUserIds.length;

				return {
					userId,
					amount: splitAmount,
					splitType: data.splitType.toUpperCase(),
					splitValue: splitAmount, // In this system maybe exact value is splitValue
				};
			}),
		};

		const response = await apiClient<any>("/api/v1/expenses", {
			method: "POST",
			body: JSON.stringify(payload),
		});

		return mapExpenseResponse(response);
	},

	async delete(id: string): Promise<void> {
		return apiClient<void>(`/api/v1/expenses/${id}`, {
			method: "DELETE",
		});
	},

	async update(id: string, data: ExpenseFormValues, exchangeRate?: number): Promise<Expense> {
		const rate = exchangeRate ?? 1;

		const payload = {
			payerId: data.payerId,
			amount: data.amount,
			currency: data.currency,
			exchangeRate: rate,
			title: data.description,
			category: data.category || "other",
			locationName: data.placeName || undefined,
			splits: data.involvedUserIds.map((userId) => {
				const isExact = data.splitType === "exact";
				const splitAmount = isExact && data.exactAmounts
					? data.exactAmounts[userId] || 0
					: data.amount / data.involvedUserIds.length;

				return {
					userId,
					amount: splitAmount,
					splitType: data.splitType.toUpperCase(),
					splitValue: splitAmount,
				};
			}),
		};

		const response = await apiClient<any>(`/api/v1/expenses/${id}`, {
			method: "PATCH",
			body: JSON.stringify(payload),
		});

		return mapExpenseResponse(response);
	},
};
