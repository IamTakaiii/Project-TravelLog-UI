import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Plus, Search, Plane } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { tripsQueryOptions } from "../queries/trips-queries";
import { motion, AnimatePresence } from "framer-motion";
import { TripCard } from "../components/trip-card";
import { TripListEmptyState } from "../components/trip-list-empty-state";
import { PageHeader } from "@/components/common/page-header";
import { FeaturePageLayout } from "@/components/common/feature-page-layout";
import { fadeInUp } from "@/lib/animations";
import { TripCardSkeleton } from "../components/trip-card-skeleton";
import { useTripFilters } from "../hooks/use-trip-filters";

export function TripsListPage() {
	const { t } = useTranslation();

	const { data: trips = [], isLoading } = useQuery(tripsQueryOptions);
	const {
		searchQuery,
		setSearchQuery,
		filteredTrips,
	} = useTripFilters(trips);

	return (
		<FeaturePageLayout>
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
						{(trips.length > 0 || isLoading) && (
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

			<motion.div variants={fadeInUp}>
				{isLoading ? (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{[...Array(6)].map((_, i) => (
							<TripCardSkeleton key={i} />
						))}
					</div>
				) : trips.length === 0 ? (
					<TripListEmptyState />
				) : (
					<AnimatePresence mode="popLayout">
						{filteredTrips.length === 0 ? (
							<motion.div
								initial={{ opacity: 0, scale: 0.95 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.95 }}
								className="flex flex-col items-center justify-center py-20 text-center"
							>
								<Search className="size-12 text-muted-foreground/50 mb-4" />
								<h3 className="text-xl font-bold mb-2">{t("trips.list.no_results_title")}</h3>
								<p className="text-muted-foreground">
									{t("trips.list.no_results_description", { query: searchQuery })}
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

			{!isLoading && trips.length > 0 && (
				<motion.div
					variants={fadeInUp}
					className="mt-12 text-center text-sm text-muted-foreground"
				>
					{searchQuery.trim()
						? t("trips.list.showing_count", { filtered: filteredTrips.length, total: trips.length })
						: t("trips.list.total_count", { count: trips.length })}
				</motion.div>
			)}
		</FeaturePageLayout>
	);
}




