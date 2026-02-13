import { useState, useMemo, useCallback } from "react";
import { Trip } from "../types";

export function useTripFilters(trips: Trip[]) {
	const [searchQuery, setSearchQuery] = useState("");

	const filteredTrips = useMemo(() => {
		if (!searchQuery.trim()) return trips;

		const query = searchQuery.toLowerCase();
		return trips.filter(
			(trip) =>
				trip.title.toLowerCase().includes(query) ||
				trip.destination?.toLowerCase().includes(query) ||
				trip.description?.toLowerCase().includes(query)
		);
	}, [trips, searchQuery]);

	const clearSearch = useCallback(() => {
		setSearchQuery("");
	}, []);

	return {
		searchQuery,
		setSearchQuery,
		filteredTrips,
		clearSearch,
		hasActiveFilters: searchQuery.trim() !== "",
	};
}
