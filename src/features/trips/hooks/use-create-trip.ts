import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	createTripSchema,
	type CreateTripFormValues,
} from "../schemas/create-trip-schema";
import { useTripMutations } from "./use-trip-mutations";

export function useCreateTrip() {
	const { createTrip } = useTripMutations();

	const form = useForm<CreateTripFormValues>({
		resolver: zodResolver(createTripSchema),
		defaultValues: {
			title: "",
			destination: "",
			destinationType: "unknown",
			currency: "USD",
			startDate: "",
			endDate: "",
			description: "",
			coverImage: "",
			budget: "",
		},
	});

	const onSubmit = async (data: CreateTripFormValues) => {
		createTrip.mutate(data);
	};

	return {
		form,
		isLoading: createTrip.isPending,
		error: createTrip.error ? (createTrip.error as any).message : null,
		onSubmit,
	};
}
