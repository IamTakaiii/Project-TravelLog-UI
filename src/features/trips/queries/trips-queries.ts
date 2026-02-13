import { queryOptions } from "@tanstack/react-query";
import { tripsApi, type Trip } from "../api/trips-api";

export const tripQueryKeys = {
	all: ["trips"] as const,
	lists: () => [...tripQueryKeys.all, "list"] as const,
	list: (filters: string = "") => [...tripQueryKeys.lists(), { filters }] as const,
	details: () => [...tripQueryKeys.all, "detail"] as const,
	detail: (id: string) => [...tripQueryKeys.details(), id] as const,
};

// Query options for fetching all trips
export const tripsQueryOptions = queryOptions({
	queryKey: tripQueryKeys.list(),
	queryFn: () => tripsApi.getAll(),
});

// Query options for fetching a single trip by ID
export const tripQueryOptions = (tripId: string) =>
	queryOptions({
		queryKey: tripQueryKeys.detail(tripId),
		queryFn: () => tripsApi.getById(tripId),
		enabled: !!tripId,
	});

// Type exports for convenience
export type TripsQueryData = Trip[];
export type TripQueryData = Trip;

