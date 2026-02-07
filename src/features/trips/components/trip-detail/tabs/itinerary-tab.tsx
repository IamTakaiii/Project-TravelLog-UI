import { motion } from "framer-motion";
import { Route, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";
import { tabContentVariants } from "../constants";
import { TabHeader } from "./tab-header";
import { EmptyState } from "./empty-state";

export function ItineraryTab() {
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
                icon={Route}
                title={t("trips.detail.itinerary_title", "Itinerary")}
                actionLabel={t("trips.detail.add_activity", "Add Activity")}
            />

            <EmptyState
                icon={MapPin}
                title={t("trips.detail.no_itinerary", "No itinerary yet")}
                description={t(
                    "trips.detail.no_itinerary_description",
                    "Start planning your trip by adding daily activities, places to visit, and reservations."
                )}
                actionLabel={t("trips.detail.create_itinerary", "Create Itinerary")}
            />
        </motion.div>
    );
}
