import { queryOptions } from "@tanstack/react-query";
import { expensesApi } from "../api/expenses-api";

export interface ExpenseFilters {
	categories?: string[];
	search?: string;
}

export const expenseQueryKeys = {
	all: ["expenses"] as const,
	lists: () => [...expenseQueryKeys.all, "list"] as const,
	list: (tripId: string, filters?: ExpenseFilters) =>
		[...expenseQueryKeys.lists(), tripId, filters] as const,
	details: () => [...expenseQueryKeys.all, "detail"] as const,
	detail: (id: string) => [...expenseQueryKeys.details(), id] as const,
	categories: (tripId: string) =>
		[...expenseQueryKeys.all, "categories", tripId] as const,
	history: (tripId: string) =>
		[...expenseQueryKeys.all, "history", tripId] as const,
};

export const expensesQueryOptions = (
	tripId: string,
	filters?: ExpenseFilters
) =>
	queryOptions({
		queryKey: expenseQueryKeys.list(tripId, filters),
		queryFn: () => expensesApi.getByTripId(tripId, filters),
		enabled: !!tripId,
	});

export const historyQueryOptions = (tripId: string) =>
	queryOptions({
		queryKey: expenseQueryKeys.history(tripId),
		queryFn: () => expensesApi.getHistory(tripId),
		enabled: !!tripId,
		staleTime: 1000 * 60, // 1 minute
	});

export const categoriesQueryOptions = (tripId: string) =>
	queryOptions({
		queryKey: expenseQueryKeys.categories(tripId),
		queryFn: () => expensesApi.getCategories(tripId),
		enabled: !!tripId,
		staleTime: 1000 * 60 * 5, // 5 minutes
	});
