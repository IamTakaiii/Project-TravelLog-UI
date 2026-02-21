import {
	createContext,
	useContext,
	useState,
	useCallback,
	type ReactNode,
} from "react";
import { type Trip } from "../../api/trips-api";
import { useTripMutations } from "../../hooks/use-trip-mutations";
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
	const [activeTab, setActiveTab] = useState<TabType>("itinerary");
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
	const { deleteTrip } = useTripMutations();

	const handleDelete = useCallback(() => {
		deleteTrip.mutate(trip.id);
	}, [deleteTrip, trip.id]);

	const value: TripDetailContextValue = {
		trip,
		activeTab,
		setActiveTab,
		isDeleteDialogOpen,
		setIsDeleteDialogOpen,
		handleDelete,
		isDeleting: deleteTrip.isPending,
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
