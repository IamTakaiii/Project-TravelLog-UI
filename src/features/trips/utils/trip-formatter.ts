export function formatTripDate(dateString: string): string {
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

export function formatTripDateRange(startDate: string, endDate: string): string {
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
