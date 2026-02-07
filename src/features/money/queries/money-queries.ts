import { queryOptions } from "@tanstack/react-query";
import { expensesApi } from "../api/expenses-api";

export const expensesQueryOptions = (tripId: string) =>
	queryOptions({
		queryKey: ["expenses", tripId],
		queryFn: () => expensesApi.getByTripId(tripId),
		enabled: !!tripId,
	});
