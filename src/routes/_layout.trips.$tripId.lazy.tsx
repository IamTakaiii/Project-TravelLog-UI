import { createLazyFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_layout/trips/$tripId")({
	component: Outlet,
});
