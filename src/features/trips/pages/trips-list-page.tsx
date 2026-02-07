import { Link, useNavigate } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
	MapPin,
	Plus,
	Search,
	Plane,
	DollarSign,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { tripsQueryOptions } from "../queries/trips-queries";
import type { Trip } from "../api/trips-api";
import { useState, useMemo } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

interface TripCardProps {
	trip: Trip;
}

function getStatusConfig(status: Trip["status"]) {
	switch (status) {
		case "active":
			return {
				label: "Active",
				className:
					"border-emerald-500/50 text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10",
			};
		case "completed":
			return {
				label: "Completed",
				className:
					"border-blue-500/50 text-blue-600 bg-blue-50 dark:bg-blue-500/10",
			};
		case "inactive":
			return {
				label: "Inactive",
				className:
					"border-gray-500/50 text-gray-600 bg-gray-50 dark:bg-gray-500/10",
			};
		default:
			return {
				label: status,
				className: "border-border text-muted-foreground bg-muted",
			};
	}
}

function TripCard({ trip }: TripCardProps) {
	const navigate = useNavigate();
	const statusConfig = getStatusConfig(trip.status);

	const coverImage =
		trip.coverImage ||
		"https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&auto=format&fit=crop&q=60";

	const handleClick = () => {
		navigate({ to: "/trips/$tripId", params: { tripId: trip.id } });
	};

	return (
		<motion.div
			layout
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, scale: 0.95 }}
			whileHover={{ y: -5 }}
			transition={{ duration: 0.2 }}
			onClick={handleClick}
			className="group relative flex flex-col overflow-hidden rounded-3xl border border-border/40 bg-card shadow-sm hover:shadow-2xl hover:shadow-primary/10 cursor-pointer h-full transition-all duration-300"
		>
			{/* Image Section */}
			<div className="relative aspect-[4/3] overflow-hidden">
				<img
					src={coverImage}
					alt={trip.title}
					className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-80" />

				{/* Top Badges */}
				<div className="absolute top-4 inset-x-4 flex items-start justify-between">
					{/* Date Badge */}
					<div className="flex flex-col items-center justify-center rounded-xl bg-background/95 backdrop-blur-md px-3 py-1.5 shadow-sm text-xs font-bold ring-1 ring-black/5">
						<span className="text-primary uppercase text-[10px] leading-tight">
							{new Date(trip.startDate).toLocaleString('default', { month: 'short' })}
						</span>
						<span className="text-foreground text-lg leading-none">
							{new Date(trip.startDate).getDate()}
						</span>
					</div>

					{/* Status Badge */}
					<span
						className={cn(
							"px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md shadow-sm border border-white/10",
							statusConfig.className
						)}
					>
						{statusConfig.label}
					</span>
				</div>
			</div>

			{/* Content Section */}
			<div className="relative flex flex-1 flex-col p-5 pt-6">
				{/* Title */}
				<h3 className="mb-3 font-heading text-xl font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
					{trip.title}
				</h3>

				{/* Details Grid */}
				<div className="mb-4 grid gap-2.5">
					{/* Location */}
					<div className="flex items-center gap-2.5 text-sm text-muted-foreground/80">
						<div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
							<MapPin className="size-4" />
						</div>
						<span className="font-medium line-clamp-1">
							{trip.destination || "No destination"}
						</span>
					</div>

					{/* Budget */}
					<div className="flex items-center gap-2.5 text-sm text-muted-foreground/80">
						<div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
							<DollarSign className="size-4" />
						</div>
						<span className="font-medium">
							{trip.budget ? `${trip.currency || "USD"} ${trip.budget}` : "No budget set"}
						</span>
					</div>
				</div>

				{/* Footer */}
				<div className="mt-auto flex items-center justify-between border-t border-border/50 pt-4">
					<div className="flex -space-x-2">
						{/* Placeholder for avatars if added later */}
						<div className="size-6 rounded-full bg-muted border-2 border-background" />
						<div className="size-6 rounded-full bg-muted border-2 border-background" />
						<div className="flex size-6 items-center justify-center rounded-full border-2 border-background bg-muted text-[10px] font-medium text-muted-foreground">
							+
						</div>
					</div>

					<div className="flex items-center gap-1 text-xs font-semibold text-primary opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
						View Details
						<Plane className="size-3 rotate-45" />
					</div>
				</div>
			</div>
		</motion.div>
	);
}

function EmptyState() {
	const { t } = useTranslation();

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			className="flex flex-col items-center justify-center py-20 px-4 text-center"
		>
			<div className="relative mb-6">
				<div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl animate-pulse" />
				<div className="relative w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
					<Plane className="size-10 text-primary" />
				</div>
			</div>
			<h3 className="text-2xl font-bold mb-2">{t("trips.list.empty_title")}</h3>
			<p className="text-muted-foreground mb-6 max-w-md">
				{t("trips.list.empty_description")}
			</p>
			<Link to="/trips/create">
				<Button
					size="lg"
					className="rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all"
				>
					<Plus className="mr-2 size-5" />
					{t("trips.list.create_first_trip")}
				</Button>
			</Link>
		</motion.div>
	);
}

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
			<motion.div variants={itemVariants}>
				{/* Badge */}
				<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium uppercase tracking-wider mb-4">
					<Plane className="size-3" />
					{t("trips.list.badge")}
				</div>

				{/* Title Row with Actions */}
				<div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-2">
					<h1 className="text-4xl md:text-5xl font-[800] tracking-tight text-foreground">
						{t("trips.list.title")}{" "}
						<span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
							{t("trips.list.subtitle")}
						</span>
					</h1>

					{/* Actions - Search + Create Button */}
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
				</div>

				<p className="text-lg text-muted-foreground max-w-2xl">
					{t("trips.list.description")}
				</p>
			</motion.div>

			{/* Content */}
			<motion.div variants={itemVariants}>
				{trips.length === 0 ? (
					<EmptyState />
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
