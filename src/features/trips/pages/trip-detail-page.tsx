import { useParams } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { tripQueryOptions } from "../queries/trips-queries";
import {
	TripDetailProvider,
	HeroSection,
	StatsGrid,
	MainContent,
	TripSidebar,
	DeleteTripDialog,
	containerVariants,
} from "../components/trip-detail";

export function TripDetailPage() {
	const params = useParams({ from: "/_layout/trips/$tripId" });
	const { data: trip } = useSuspenseQuery(tripQueryOptions(params.tripId));

	return (
		<TripDetailProvider trip={trip}>
			<motion.div
				variants={containerVariants}
				initial="hidden"
				animate="show"
				className="min-h-screen bg-background pb-20"
			>
				<HeroSection />

				<div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
					<StatsGrid />

					<div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
						<MainContent />
						<TripSidebar />
					</div>
				</div>

				<DeleteTripDialog />
			</motion.div>
		</TripDetailProvider>
	);
}
