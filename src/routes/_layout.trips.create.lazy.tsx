import { createLazyFileRoute } from "@tanstack/react-router";
import { CreateTripPage } from "@/features/trips";

export const Route = createLazyFileRoute("/_layout/trips/create")({
	component: CreateTripPage,
});
