import type { Trip } from "../../api/trips-api";

export type TabType = "itinerary" | "places" | "money";

export interface TripDetailContextValue {
    trip: Trip;
    activeTab: TabType;
    setActiveTab: (tab: TabType) => void;
    isDeleteDialogOpen: boolean;
    setIsDeleteDialogOpen: (open: boolean) => void;
    handleDelete: () => void;
    isDeleting: boolean;
}

export interface StatCardProps {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    value: string;
}

export interface TabConfig {
    id: TabType;
    icon: React.ComponentType<{ className?: string }>;
    labelKey: string;
    defaultLabel: string;
}
