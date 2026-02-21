import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	createTripSchema,
	type CreateTripFormValues,
} from "../schemas/create-trip-schema";
import { Trip } from "../types";
import { useTripMutations } from "./use-trip-mutations";

export function useEditTrip(trip: Trip) {
	const { updateTrip } = useTripMutations();

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

	const onSubmit = async (data: CreateTripFormValues) => {
		updateTrip.mutate({ id: trip.id, data });
	};

	return {
		form,
		isLoading: updateTrip.isPending,
		error: updateTrip.error ? (updateTrip.error as any).message : null,
		onSubmit,
	};
}
