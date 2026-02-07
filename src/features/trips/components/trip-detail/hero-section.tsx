import { motion } from "framer-motion";
import { useTripDetail } from "./trip-detail-context";
import { HeroNavigationBar } from "./hero-navigation-bar";
import { HeroTitleOverlay } from "./hero-title-overlay";
import { itemVariants, DEFAULT_COVER_IMAGE } from "./constants";

export function HeroSection() {
    const { trip } = useTripDetail();
    const coverImage = trip.coverImage || DEFAULT_COVER_IMAGE;

    return (
        <motion.div
            variants={itemVariants}
            className="relative h-[40vh] min-h-[320px] lg:h-[45vh] w-full overflow-hidden"
        >
            <img
                src={coverImage}
                alt={trip.title}
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />

            <HeroNavigationBar />
            <HeroTitleOverlay />
        </motion.div>
    );
}
