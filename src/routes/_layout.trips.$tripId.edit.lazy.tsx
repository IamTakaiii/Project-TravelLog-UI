import { createLazyFileRoute } from "@tanstack/react-router";
import { EditTripPage } from "@/features/trips/pages/edit-trip-page";

export const Route = createLazyFileRoute("/_layout/trips/$tripId/edit")({
	component: EditTripPage,
});
