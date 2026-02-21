import { Trip } from "../api/trips-api";
import { TFunction } from "i18next";

export function getStatusConfig(status: Trip["status"] | string, t: TFunction) {
	switch (status) {
		case "active":
			return {
				label: t("trips.status.active"),
				className:
					"border-emerald-500/50 text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10",
			};
		case "completed":
			return {
				label: t("trips.status.completed"),
				className:
					"border-blue-500/50 text-blue-600 bg-blue-50 dark:bg-blue-500/10",
			};
		case "inactive":
			return {
				label: t("trips.status.inactive"),
				className:
					"border-gray-500/50 text-gray-600 bg-gray-50 dark:bg-gray-500/10",
			};
		default:
			return {
				label: status,
				className: "border-border text-muted-foreground bg-muted",
			};
	}
}
