import { useCreateTrip } from "../hooks/use-create-trip";
import { TripForm } from "./trip-form";

export function CreateTripForm() {
	const { form, isLoading, error, onSubmit } = useCreateTrip();

	return (
		<TripForm
			form={form}
			onSubmit={onSubmit}
			isLoading={isLoading}
			error={error}
		/>
	);
}
