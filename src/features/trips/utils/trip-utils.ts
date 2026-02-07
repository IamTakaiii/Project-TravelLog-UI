import { Trip } from "../api/trips-api";

export function formatDate(dateString: string): string {
	const date = new Date(dateString);
	return date.toLocaleDateString("en-US", {
		weekday: "long",
		month: "long",
		day: "numeric",
		year: "numeric",
		hour: "numeric",
		minute: "numeric",
	});
}

export function formatDateRange(startDate: string, endDate: string): string {
	const start = new Date(startDate);
	const end = new Date(endDate);

	const startMonth = start.toLocaleDateString("en-US", { month: "short" });
	const startDay = start.getDate();
	const endMonth = end.toLocaleDateString("en-US", { month: "short" });
	const endDay = end.getDate();
	const year = end.getFullYear();

	if (startMonth === endMonth) {
		return `${startMonth} ${startDay} - ${endDay}, ${year}`;
	}
	return `${startMonth} ${startDay} - ${endMonth} ${endDay}, ${year}`;
}

export function calculateDuration(startDate: string, endDate: string): number {
	const start = new Date(startDate);
	const end = new Date(endDate);
	const diffTime = Math.abs(end.getTime() - start.getTime());
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
	return diffDays + 1; // Include both start and end day
}

export function getStatusConfig(status: Trip["status"] | string) {
	switch (status) {
		case "active":
			return {
				label: "Active",
				className:
					"border-emerald-500/50 text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10",
			};
		case "completed":
			return {
				label: "Completed",
				className:
					"border-blue-500/50 text-blue-600 bg-blue-50 dark:bg-blue-500/10",
			};
		case "inactive":
			return {
				label: "Inactive",
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
