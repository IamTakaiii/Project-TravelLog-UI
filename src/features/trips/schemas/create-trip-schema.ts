import { z } from "zod";

export const createTripSchema = z
	.object({
		title: z.string().min(3, { message: "trips.validation.title_min_length" }),
		destination: z.string().optional(),
		destinationType: z.string().optional(),
		currency: z.string().optional(),
		startDate: z
			.string()
			.min(1, { message: "trips.validation.start_date_required" }),
		endDate: z
			.string()
			.min(1, { message: "trips.validation.end_date_required" }),
		description: z.string().optional(),
		coverImage: z.string().optional(),
		budget: z.string().optional(),
	})
	.refine(
		(data) => {
			if (data.startDate && data.endDate) {
				return new Date(data.startDate) <= new Date(data.endDate);
			}
			return true;
		},
		{
			message: "trips.validation.end_date_before_start",
			path: ["endDate"],
		}
	);

export type CreateTripFormValues = z.infer<typeof createTripSchema>;
