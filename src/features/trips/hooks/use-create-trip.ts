import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	createTripSchema,
	type CreateTripFormValues,
} from "../schemas/create-trip-schema";
import { tripsApi } from "../api/trips-api";

export function useCreateTrip() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const form = useForm<CreateTripFormValues>({
		resolver: zodResolver(createTripSchema),
		defaultValues: {
			title: "",
			destination: "",
			destinationType: "unknown",
			startDate: "",
			endDate: "",
			description: "",
			coverImage: "",
			budget: "",
		},
	});

	const {
		mutate: createTrip,
		isPending: isLoading,
		error,
	} = useMutation({
		mutationFn: tripsApi.create,
		onSuccess: () => {
			// Invalidate trips list cache so it refetches automatically
			queryClient.invalidateQueries({ queryKey: ["trips"] });

			// Navigate to trips list
			navigate({ to: "/trips" });
		},
	});

	const onSubmit = async (data: CreateTripFormValues) => {
		createTrip(data);
	};

	return {
		form,
		isLoading,
		error: error
			? error instanceof Error
				? error.message
				: "trips.errors.create_failed"
			: null,
		onSubmit,
	};
}
