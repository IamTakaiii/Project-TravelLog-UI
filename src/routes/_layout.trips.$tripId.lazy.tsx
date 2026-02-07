import { createLazyFileRoute } from "@tanstack/react-router";
import { TripDetailPage } from "@/features/trips/pages/trip-detail-page";

export const Route = createLazyFileRoute("/_layout/trips/$tripId")({
	component: TripDetailPage,
});
