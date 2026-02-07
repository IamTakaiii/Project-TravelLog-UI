import { useTripDetail } from "../trip-detail-context";
import { ItineraryTab } from "./itinerary-tab";
import { PlacesTab } from "./places-tab";
import { MoneyTab } from "./money-tab";

const TAB_COMPONENTS = {
    itinerary: ItineraryTab,
    places: PlacesTab,
    money: MoneyTab,
} as const;

export function TabContent() {
    const { activeTab } = useTripDetail();
    const TabComponent = TAB_COMPONENTS[activeTab];

    return <TabComponent />;
}
