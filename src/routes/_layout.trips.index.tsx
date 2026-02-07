import { createFileRoute } from "@tanstack/react-router";
import { tripsQueryOptions } from "@/features/trips/queries/trips-queries";

export const Route = createFileRoute("/_layout/trips/")({
	loader: ({ context: { queryClient } }) => {
		return queryClient.ensureQueryData(tripsQueryOptions);
	},
});
