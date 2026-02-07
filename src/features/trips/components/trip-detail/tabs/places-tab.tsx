import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";
import { tabContentVariants } from "../constants";
import { TabHeader } from "./tab-header";
import { EmptyState } from "./empty-state";

export function PlacesTab() {
    const { t } = useTranslation();

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={tabContentVariants}
            transition={{ duration: 0.2 }}
            className="space-y-6"
        >
            <TabHeader
                icon={MapPin}
                title={t("trips.detail.places_title", "Places to Visit")}
                actionLabel={t("trips.detail.add_place", "Add Place")}
            />

            <EmptyState
                icon={MapPin}
                title={t("trips.detail.no_places_title", "No places saved yet")}
                description={t(
                    "trips.detail.no_places_description",
                    "Collect ideas for places you want to visit during this trip. Add restaurants, attractions, hotels, and more."
                )}
                actionLabel={t("trips.detail.discover_places", "Discover Places")}
            />

            {/* Places Grid Placeholder - will show when places exist */}
            {/*
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				{places.map((place) => (
					<PlaceCard key={place.id} place={place} />
				))}
			</div>
			*/}
        </motion.div>
    );
}
