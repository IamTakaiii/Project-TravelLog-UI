import { Link, useParams } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
	ArrowLeft,
	Calendar,
	MapPin,
	DollarSign,
	Clock,
	Edit,
	Trash2,
	Share2,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { tripQueryOptions } from "../queries/trips-queries";
import { motion, type Variants } from "framer-motion";
import {
	formatDate,
	formatDateRange,
	calculateDuration,
	getStatusConfig,
} from "../utils/trip-utils";

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

export function TripDetailPage() {
	const { t } = useTranslation();
	const params = useParams({ from: "/_layout/trips/$tripId" });

	// Data is already prefetched by the route loader, so this will be instant
	const { data: trip } = useSuspenseQuery(tripQueryOptions(params.tripId));

	const statusConfig = getStatusConfig(trip.status);
	const duration = calculateDuration(trip.startDate, trip.endDate);
	const coverImage =
		trip.coverImage ||
		"https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&auto=format&fit=crop&q=80";

	return (
		<motion.div
			variants={containerVariants}
			initial="hidden"
			animate="show"
			className="min-h-screen bg-background"
		>
			{/* Hero Section with Cover Image */}
			<motion.div
				variants={itemVariants}
				className="relative h-[300px] md:h-[400px] overflow-hidden"
			>
				<img
					src={coverImage}
					alt={trip.title}
					className="w-full h-full object-cover"
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

				{/* Back Button */}
				<div className="absolute top-6 left-6">
					<Link to="/trips">
						<Button
							variant="outline"
							size="sm"
							className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 hover:text-white gap-2"
						>
							<ArrowLeft className="size-4" />
							{t("trips.create.back_button")}
						</Button>
					</Link>
				</div>

				{/* Action Buttons */}
				<div className="absolute top-6 right-6 flex gap-2">
					<Button
						variant="outline"
						size="icon"
						className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 hover:text-white"
					>
						<Share2 className="size-4" />
					</Button>
					<Button
						variant="outline"
						size="icon"
						className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 hover:text-white"
					>
						<Edit className="size-4" />
					</Button>
					<Button
						variant="outline"
						size="icon"
						className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-destructive/80 hover:text-white hover:border-destructive"
					>
						<Trash2 className="size-4" />
					</Button>
				</div>

				{/* Title Overlay */}
				<div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
					<div className="max-w-4xl">
						<span
							className={`inline-flex text-xs uppercase font-bold px-3 py-1 rounded-full border backdrop-blur-sm mb-4 ${statusConfig.className}`}
						>
							{statusConfig.label}
						</span>
						<h1 className="text-3xl md:text-5xl font-bold text-white mb-2">
							{trip.title}
						</h1>
						{trip.destination && (
							<div className="flex items-center gap-2 text-white/80">
								<MapPin className="size-5" />
								<span className="text-lg">{trip.destination}</span>
							</div>
						)}
					</div>
				</div>
			</motion.div>

			{/* Content */}
			<div className="p-6 lg:p-10 max-w-4xl">
				{/* Trip Info Cards */}
				<motion.div
					variants={itemVariants}
					className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
				>
					{/* Date Card */}
					<div className="bg-muted/30 rounded-2xl p-5 border border-border/50">
						<div className="flex items-center gap-3 mb-3">
							<div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
								<Calendar className="size-5 text-primary" />
							</div>
							<span className="text-sm font-medium text-muted-foreground">
								Travel Dates
							</span>
						</div>
						<p className="font-semibold text-foreground">
							{formatDateRange(trip.startDate, trip.endDate)}
						</p>
					</div>

					{/* Duration Card */}
					<div className="bg-muted/30 rounded-2xl p-5 border border-border/50">
						<div className="flex items-center gap-3 mb-3">
							<div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
								<Clock className="size-5 text-accent" />
							</div>
							<span className="text-sm font-medium text-muted-foreground">
								Duration
							</span>
						</div>
						<p className="font-semibold text-foreground">
							{duration} {duration === 1 ? "day" : "days"}
						</p>
					</div>

					{/* Budget Card */}
					{trip.budget && (
						<div className="bg-muted/30 rounded-2xl p-5 border border-border/50">
							<div className="flex items-center gap-3 mb-3">
								<div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
									<DollarSign className="size-5 text-emerald-500" />
								</div>
								<span className="text-sm font-medium text-muted-foreground">
									Budget
								</span>
							</div>
							<p className="font-semibold text-foreground">{trip.budget}</p>
						</div>
					)}
				</motion.div>

				{/* Description */}
				{trip.description && (
					<motion.div variants={itemVariants} className="mb-8">
						<h2 className="text-xl font-bold mb-4">About this trip</h2>
						<p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
							{trip.description}
						</p>
					</motion.div>
				)}

				{/* Timeline/Details Section Placeholder */}
				<motion.div
					variants={itemVariants}
					className="border border-dashed border-border rounded-2xl p-8 text-center"
				>
					<p className="text-muted-foreground mb-2">
						Itinerary and activities coming soon
					</p>
					<p className="text-sm text-muted-foreground/70">
						You'll be able to add daily plans, activities, and notes here.
					</p>
				</motion.div>

				{/* Meta Info */}
				<motion.div
					variants={itemVariants}
					className="mt-8 pt-6 border-t border-border/50 text-sm text-muted-foreground"
				>
					<p>Created: {formatDate(trip.createdAt)}</p>
					{trip.updatedAt !== trip.createdAt && (
						<p>Last updated: {formatDate(trip.updatedAt)}</p>
					)}
				</motion.div>
			</div>
		</motion.div>
	);
}
