import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	createTripSchema,
	type CreateTripFormValues,
} from "../schemas/create-trip-schema";
import { tripsApi, type Trip } from "../api/trips-api";
import { tripsQueryOptions } from "../queries/trips-queries";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

export function useEditTrip(trip: Trip) {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const { t } = useTranslation();

	const form = useForm<CreateTripFormValues>({
		resolver: zodResolver(createTripSchema),
		defaultValues: {
			title: trip.title,
			destination: trip.destination || "",
			destinationType: trip.destinationType || "unknown",
			currency: trip.currency || "USD",
			startDate: trip.startDate.split("T")[0],
			endDate: trip.endDate.split("T")[0],
			description: trip.description || "",
			coverImage: trip.coverImage || "",
			budget: trip.budget || "",
		},
	});

	const {
		mutate: updateTrip,
		isPending: isLoading,
		error,
	} = useMutation({
		mutationFn: (data: CreateTripFormValues) => tripsApi.update(trip.id, data),
		onSuccess: () => {
			// Invalidate trips list cache so it refetches automatically
			queryClient.invalidateQueries({ queryKey: tripsQueryOptions.queryKey });
			queryClient.invalidateQueries({ queryKey: ["trips", trip.id] });

			toast.success(t("Trip updated successfully"));

			// Navigate to trips list or detail
			navigate({ to: `/trips/${trip.id}` as any });
		},
	});

	const onSubmit = async (data: CreateTripFormValues) => {
		updateTrip(data);
	};

	return {
		form,
		isLoading,
		error: error
			? error instanceof Error
				? error.message
				: "trips.errors.update_failed"
			: null,
		onSubmit,
	};
}
