import { z } from "zod";

export const expenseSchema = z
	.object({
		description: z.string().min(1, "Description is required"),
		amount: z.number().positive("Amount must be positive"),
		currency: z.string(),
		date: z.string(),
		category: z.string(),
		payerId: z.string().min(1, "Payer is required"),
		splitType: z.enum(["equal", "exact"]),
		involvedUserIds: z
			.array(z.string())
			.min(1, "Select at least one person to split with"),
		exactAmounts: z.record(z.string(), z.number()).optional(),
		placeName: z.string().optional(),
	})
	.refine(
		(data) => {
			// If exact split, validate that amounts sum to total
			if (data.splitType === "exact") {
				if (!data.exactAmounts || Object.keys(data.exactAmounts).length === 0) {
					return false;
				}
				const total = Object.values(data.exactAmounts).reduce(
					(sum, amt) => sum + (amt || 0),
					0
				);
				// Allow small floating point differences
				return Math.abs(total - data.amount) < 0.01;
			}
			return true;
		},
		{
			message: "Exact amounts must sum to total amount",
			path: ["splitType"],
		}
	);

export type ExpenseFormValues = z.infer<typeof expenseSchema>;
