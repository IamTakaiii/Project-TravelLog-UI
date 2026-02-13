import { Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Plus, Search, Plane } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { tripsQueryOptions } from "../queries/trips-queries";
import { useState, useMemo } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { TripCard } from "../components/trip-card";
import { TripListEmptyState } from "../components/trip-list-empty-state";
import { PageHeader } from "@/components/common/page-header";

const containerVariants: Variants = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
		},
	},
};

const itemVariants: Variants = {
	hidden: { opacity: 0, y: 20 },
	show: { opacity: 1, y: 0 },
};

export function TripsListPage() {
	const { t } = useTranslation();

	// Data is already prefetched by the route loader, so this will be instant
	const { data: trips } = useSuspenseQuery(tripsQueryOptions);
	const [searchQuery, setSearchQuery] = useState("");

	const filteredTrips = useMemo(() => {
		if (!searchQuery.trim()) return trips;

		const query = searchQuery.toLowerCase();
		return trips.filter(
			(trip) =>
				trip.title.toLowerCase().includes(query) ||
				trip.destination?.toLowerCase().includes(query) ||
				trip.description?.toLowerCase().includes(query)
		);
	}, [trips, searchQuery]);

	return (
		<motion.div
			initial="hidden"
			animate="show"
			variants={containerVariants}
			className="min-h-screen bg-background p-6 lg:p-10 space-y-10"
		>
			{/* Decorative Background Elements */}
			<div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
				<div className="absolute top-20 right-20 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
				<div className="absolute bottom-20 left-20 w-[300px] h-[300px] bg-accent/10 rounded-full blur-[100px] animate-pulse delay-1000" />
			</div>

			{/* Header Section */}
			<PageHeader
				badge={{
					icon: Plane,
					text: t("trips.list.badge"),
				}}
				title={
					<>
						{t("trips.list.title")}{" "}
						<span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
							{t("trips.list.subtitle")}
						</span>
					</>
				}
				description={t("trips.list.description")}
				actions={
					<div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
						{/* Search Bar */}
						{trips.length > 0 && (
							<div className="relative w-full sm:w-64">
								<Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
								<Input
									type="text"
									placeholder={t("trips.list.search_placeholder")}
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									className="pl-10 h-10 bg-background border-border/60 rounded-xl shadow-sm focus:shadow-md focus:border-primary/50 transition-all"
								/>
							</div>
						)}

						{/* Create Trip Button */}
						<Link to="/trips/create" className="shrink-0">
							<Button
								size="sm"
								className="h-10 rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all gap-2 w-full sm:w-auto"
							>
								<Plus className="size-4" />
								{t("trips.list.create_button")}
							</Button>
						</Link>
					</div>
				}
			/>

			{/* Content */}
			<motion.div variants={itemVariants}>
				{trips.length === 0 ? (
					<TripListEmptyState />
				) : (
					<AnimatePresence mode="popLayout">
						{filteredTrips.length === 0 ? (
							// No search results
							<motion.div
								initial={{ opacity: 0, scale: 0.95 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.95 }}
								className="flex flex-col items-center justify-center py-20 text-center"
							>
								<Search className="size-12 text-muted-foreground/50 mb-4" />
								<h3 className="text-xl font-bold mb-2">No trips found</h3>
								<p className="text-muted-foreground">
									No trips match your search "{searchQuery}"
								</p>
							</motion.div>
						) : (
							<motion.div
								layout
								className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
							>
								{filteredTrips.map((trip) => (
									<TripCard key={trip.id} trip={trip} />
								))}
							</motion.div>
						)}
					</AnimatePresence>
				)}
			</motion.div>

			{/* Stats Footer */}
			{trips.length > 0 && (
				<motion.div
					variants={itemVariants}
					className="mt-12 text-center text-sm text-muted-foreground"
				>
					{searchQuery
						? `Showing ${filteredTrips.length} of ${trips.length} trips`
						: `You have ${trips.length} trip${trips.length !== 1 ? "s" : ""}`}
				</motion.div>
			)}
		</motion.div>
	);
}

