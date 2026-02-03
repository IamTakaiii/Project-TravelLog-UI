import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { createTripSchema, type CreateTripFormValues } from "../schemas/create-trip-schema";

export function useCreateTrip() {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const form = useForm<CreateTripFormValues>({
		resolver: zodResolver(createTripSchema),
		defaultValues: {
			title: "",
			destination: "",
			startDate: "",
			endDate: "",
			description: "",
			budget: "",
			travelers: "",
		},
	});

	const onSubmit = async (data: CreateTripFormValues) => {
		try {
			setIsLoading(true);
			setError(null);

			// TODO: Implement API call to create trip
			console.log("Creating trip:", data);

			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 1000));

			// Navigate to trips list or trip detail
			navigate({ to: "/dashboard" });
		} catch (err) {
			setError(err instanceof Error ? err.message : "trips.errors.create_failed");
		} finally {
			setIsLoading(false);
		}
	};

	return {
		form,
		isLoading,
		error,
		onSubmit,
	};
}
