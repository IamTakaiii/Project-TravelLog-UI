import { createLazyFileRoute } from "@tanstack/react-router";
import { DashboardPage } from "@/features/dashboard/pages/dashboard-page";

export const Route = createLazyFileRoute("/_layout/dashboard")({
	component: DashboardPage,
});
