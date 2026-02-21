import { useNavigate } from "@tanstack/react-router";
import { Plane } from "lucide-react";
import { useTranslation } from "react-i18next";
import { EmptyState } from "@/components/common/empty-state";

export function TripListEmptyState() {
	const { t } = useTranslation();
	const navigate = useNavigate();

	return (
		<EmptyState
			icon={Plane}
			title={t("trips.list.empty_title")}
			description={t("trips.list.empty_description")}
			actionLabel={t("trips.list.create_first_trip")}
			onAction={() => navigate({ to: "/trips/create" })}
		/>
	);
}
