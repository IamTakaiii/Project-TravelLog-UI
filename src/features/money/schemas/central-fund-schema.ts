import { z } from "zod";

export const centralFundSchema = z.object({
	title: z.string().min(1, "Title is required"),
	amount: z.number().positive("Amount must be positive"),
	currency: z.string(),
});

export type CentralFundFormValues = z.infer<typeof centralFundSchema>;
