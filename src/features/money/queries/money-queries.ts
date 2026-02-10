import { queryOptions } from "@tanstack/react-query";
import { expensesApi } from "../api/expenses-api";

export const expenseQueryKeys = {
	all: ["expenses"] as const,
	lists: () => [...expenseQueryKeys.all, "list"] as const,
	list: (tripId: string) => [...expenseQueryKeys.lists(), tripId] as const,
	details: () => [...expenseQueryKeys.all, "detail"] as const,
	detail: (id: string) => [...expenseQueryKeys.details(), id] as const,
};

export const expensesQueryOptions = (tripId: string) =>
	queryOptions({
		queryKey: expenseQueryKeys.list(tripId),
		queryFn: () => expensesApi.getByTripId(tripId),
		enabled: !!tripId,
	});
