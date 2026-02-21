import { useMutation, useQueryClient } from "@tanstack/react-query";
import { tripsApi } from "../api/trips-api";
import { tripQueryKeys } from "../queries/trips-queries";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { useNavigate } from "@tanstack/react-router";
import { useTranslateError } from "@/hooks/use-translate-error";
import { CreateTripPayload } from "../types";

export function useTripMutations() {
	const queryClient = useQueryClient();
	const { t } = useTranslation();
	const { translateError } = useTranslateError();
	const navigate = useNavigate();

	const createTrip = useMutation({
		mutationFn: tripsApi.create,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: tripQueryKeys.lists() });
			toast.success(t("Trip created successfully"));
			navigate({ to: "/trips" });
		},
		onError: (error: any) => {
			toast.error(translateError(error.message));
		},
	});

	const updateTrip = useMutation({
		mutationFn: ({ id, data }: { id: string; data: any }) =>
			tripsApi.update(id, data),
		onSuccess: (_, { id }) => {
			queryClient.invalidateQueries({ queryKey: tripQueryKeys.lists() });
			queryClient.invalidateQueries({ queryKey: tripQueryKeys.detail(id) });
			toast.success(t("Trip updated successfully"));
			navigate({ to: `/trips/${id}` as any });
		},
		onError: (error: any) => {
			toast.error(translateError(error.message));
		},
	});

	const deleteTrip = useMutation({
		mutationFn: tripsApi.delete,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: tripQueryKeys.lists() });
			toast.success(t("Trip deleted successfully"));
			navigate({ to: "/trips" });
		},
		onError: (error: any) => {
			toast.error(translateError(error.message));
		},
	});

	return { createTrip, updateTrip, deleteTrip };
}
