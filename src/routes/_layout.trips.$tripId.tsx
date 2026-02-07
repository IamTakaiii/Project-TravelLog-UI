import { createFileRoute } from "@tanstack/react-router";
import { tripQueryOptions } from "@/features/trips/queries/trips-queries";

export const Route = createFileRoute("/_layout/trips/$tripId")({
	loader: ({ context: { queryClient }, params: { tripId } }) => {
		return queryClient.ensureQueryData(tripQueryOptions(tripId));
	},
});
