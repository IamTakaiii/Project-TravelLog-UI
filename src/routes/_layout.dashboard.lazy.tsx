import { createLazyFileRoute } from "@tanstack/react-router";
import { DashboardFeature } from "@/features/dashboard";

export const Route = createLazyFileRoute("/_layout/dashboard")({
  component: DashboardFeature,
});
