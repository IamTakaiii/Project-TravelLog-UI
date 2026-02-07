// Types
export type { TabType, TripDetailContextValue, StatCardProps, TabConfig } from "./types";

// Constants
export { containerVariants, itemVariants, tabContentVariants, TAB_CONFIGS, DEFAULT_COVER_IMAGE } from "./constants";

// Context
export { TripDetailProvider, useTripDetail } from "./trip-detail-context";

// Components
export { HeroSection } from "./hero-section";
export { HeroNavigationBar } from "./hero-navigation-bar";
export { HeroTitleOverlay } from "./hero-title-overlay";
export { StatsGrid } from "./stats-grid";
export { DescriptionSection } from "./description-section";
export { TabNavigation } from "./tab-navigation";
export { MainContent } from "./main-content";
export { DeleteTripDialog } from "./delete-trip-dialog";

// Tabs
export { ItineraryTab, PlacesTab, MoneyTab, EmptyState, TabHeader } from "./tabs";
export { TabContent } from "./tabs/tab-content";

// Sidebar
export { MapCard, CompanionsCard, MetadataCard } from "./sidebar";
export { TripSidebar } from "./sidebar/trip-sidebar";
