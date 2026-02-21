export function calculateTripDuration(
	startDate: string,
	endDate: string
): number {
	const start = new Date(startDate);
	const end = new Date(endDate);
	const diffTime = Math.abs(end.getTime() - start.getTime());
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
	return diffDays + 1; // Include both start and end day
}
