import { createLazyFileRoute } from "@tanstack/react-router";
import { TripsListPage } from "@/features/trips/pages/trips-list-page";

export const Route = createLazyFileRoute("/_layout/trips/")({
	component: TripsListPage,
});
