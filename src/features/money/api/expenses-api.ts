import { apiClient } from "@/lib/api-client";
import { Expense, BackendDebts } from "../types";
import { ExpenseFormValues } from "../schemas/expense-schema";
import type { ExpenseFilters } from "../queries/money-queries";

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
		isSettlement: data.isSettlement ?? false,
	};
};

// Map UI Form Values to API DTO
const mapFormToPayload = (data: ExpenseFormValues, exchangeRate: number, tripId?: string) => {
	return {
		...(tripId ? { tripId } : {}),
		payerId: data.payerId,
		amount: data.amount,
		currency: data.currency,
		exchangeRate,
		title: data.description,
		category: data.category || "other",
		locationName: data.placeName || undefined,
		isSettlement: data.isSettlement || false,
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
};

export const expensesApi = {
	async getByTripId(tripId: string, filters?: ExpenseFilters): Promise<{ expenses: Expense[]; sum: number; debts?: BackendDebts }> {
		const qs = new URLSearchParams();
		if (filters?.categories?.length) {
			filters.categories.forEach((c) => qs.append("category", c));
		}
		if (filters?.search) qs.set("search", filters.search);

		const url = `/api/v1/expenses/trip/${tripId}${qs.toString() ? `?${qs}` : ""}`;
		const response = await apiClient<any>(url, { returnFullResponse: true });

		const expenses = Array.isArray(response.data)
			? response.data.map(mapExpenseResponse)
			: [];

		return {
			expenses,
			sum: response.meta?.sum || 0,
			debts: response.meta?.debts
		};
	},

	async getCategories(tripId: string): Promise<string[]> {
		return apiClient<string[]>(`/api/v1/expenses/trip/${tripId}/categories`);
	},

	async create(tripId: string, data: ExpenseFormValues, exchangeRate?: number): Promise<Expense> {
		const rate = exchangeRate ?? 1;
		const payload = mapFormToPayload(data, rate, tripId);

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
		const payload = mapFormToPayload(data, rate);

		const response = await apiClient<any>(`/api/v1/expenses/${id}`, {
			method: "PATCH",
			body: JSON.stringify(payload),
		});

		return mapExpenseResponse(response);
	},
};
