import { queryOptions } from "@tanstack/react-query";
import { tripsApi, type Trip } from "../api/trips-api";

// Query options for fetching all trips
export const tripsQueryOptions = queryOptions({
	queryKey: ["trips"],
	queryFn: () => tripsApi.getAll(),
});

// Query options for fetching a single trip by ID
export const tripQueryOptions = (tripId: string) =>
	queryOptions({
		queryKey: ["trips", tripId],
		queryFn: () => tripsApi.getById(tripId),
		enabled: !!tripId,
	});

// Type exports for convenience
export type TripsQueryData = Trip[];
export type TripQueryData = Trip;
