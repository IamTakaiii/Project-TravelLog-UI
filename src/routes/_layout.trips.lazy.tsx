import { createLazyFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_layout/trips")({
	component: TripsLayout,
});

function TripsLayout() {
	return <Outlet />;
}
