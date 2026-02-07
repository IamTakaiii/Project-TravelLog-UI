import {
	createContext,
	useContext,
	useState,
	useCallback,
	type ReactNode,
} from "react";
import { useNavigate } from "@tanstack/react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { tripsApi, type Trip } from "../../api/trips-api";
import { tripsQueryOptions } from "../../queries/trips-queries";
import { useTranslateError } from "@/hooks/use-translate-error";
import type { TabType, TripDetailContextValue } from "./types";

const TripDetailContext = createContext<TripDetailContextValue | null>(null);

interface TripDetailProviderProps {
	trip: Trip;
	children: ReactNode;
}

export function TripDetailProvider({
	trip,
	children,
}: TripDetailProviderProps) {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const { translateError } = useTranslateError();

	const [activeTab, setActiveTab] = useState<TabType>("itinerary");
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

	const deleteTripMutation = useMutation({
		mutationFn: (id: string) => tripsApi.delete(id),
		onSuccess: () => {
			toast.success(t("Trip deleted successfully"));
			queryClient.invalidateQueries({ queryKey: tripsQueryOptions.queryKey });
			navigate({ to: "/trips" });
		},
		onError: (error) => {
			toast.error(translateError(error.message));
		},
	});

	const handleDelete = useCallback(() => {
		deleteTripMutation.mutate(trip.id);
	}, [deleteTripMutation, trip.id]);

	const value: TripDetailContextValue = {
		trip,
		activeTab,
		setActiveTab,
		isDeleteDialogOpen,
		setIsDeleteDialogOpen,
		handleDelete,
		isDeleting: deleteTripMutation.isPending,
	};

	return (
		<TripDetailContext.Provider value={value}>
			{children}
		</TripDetailContext.Provider>
	);
}

export function useTripDetail() {
	const context = useContext(TripDetailContext);
	if (!context) {
		throw new Error("useTripDetail must be used within a TripDetailProvider");
	}
	return context;
}
