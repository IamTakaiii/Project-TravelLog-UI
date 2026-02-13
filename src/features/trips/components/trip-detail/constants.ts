import type { Variants } from "framer-motion";
import {
	Calendar,
	Clock,
	Plane,
	DollarSign,
	Route,
	MapPin,
	Wallet,
} from "lucide-react";
import type { TabConfig } from "./types";

export const DEFAULT_COVER_IMAGE =
	"https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&auto=format&fit=crop&q=80";

export const tabContentVariants: Variants = {
	hidden: { opacity: 0, y: 10 },
	visible: { opacity: 1, y: 0 },
};

export const TAB_CONFIGS: TabConfig[] = [
	{
		id: "itinerary",
		icon: Route,
		labelKey: "trips.detail.tab_itinerary",
		defaultLabel: "Itinerary",
	},
	{
		id: "places",
		icon: MapPin,
		labelKey: "trips.detail.tab_places",
		defaultLabel: "Places",
	},
	{
		id: "money",
		icon: Wallet,
		labelKey: "trips.detail.tab_money",
		defaultLabel: "Money",
	},
];

export const STAT_ICONS = {
	calendar: Calendar,
	clock: Clock,
	plane: Plane,
	dollar: DollarSign,
} as const;
