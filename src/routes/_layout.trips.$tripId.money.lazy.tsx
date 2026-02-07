import { createLazyFileRoute } from "@tanstack/react-router";
import { MoneyManagementPage } from "@/features/money/pages/money-management-page";

export const Route = createLazyFileRoute("/_layout/trips/$tripId/money")({
	component: MoneyManagementPage,
});
