import { useNavigate } from "@tanstack/react-router";
import { Calendar, DollarSign, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Trip } from "../api/trips-api";
import { formatDateRange, getStatusConfig } from "../utils/trip-utils";

interface TripCardProps {
	trip: Trip;
}

export function TripCard({ trip }: TripCardProps) {
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
			initial={{ opacity: 0, scale: 0.9 }}
			animate={{ opacity: 1, scale: 1 }}
			exit={{ opacity: 0, scale: 0.9 }}
			transition={{ duration: 0.3 }}
			onClick={handleClick}
			className="group relative overflow-hidden rounded-2xl border border-border/50 bg-background shadow-sm hover:shadow-xl hover:-translate-y-1 cursor-pointer h-full"
		>
			{/* Cover Image */}
			<div className="aspect-[16/10] overflow-hidden relative">
				<img
					src={coverImage}
					alt={trip.title}
					className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

				{/* Status Badge */}
				<div className="absolute top-4 right-4">
					<span
						className={cn(
							"text-[10px] uppercase font-bold px-2.5 py-1 rounded-full border backdrop-blur-sm",
							statusConfig.className
						)}
					>
						{statusConfig.label}
					</span>
				</div>

				{/* Title Overlay */}
				<div className="absolute bottom-0 left-0 right-0 p-5">
					<h3 className="font-bold text-xl text-white group-hover:text-primary transition-colors line-clamp-1">
						{trip.title}
					</h3>
				</div>
			</div>

			{/* Card Content */}
			<div className="p-5 space-y-3">
				{/* Date Range */}
				<div className="flex items-center gap-2 text-sm text-muted-foreground">
					<Calendar className="size-4 text-primary" />
					<span>{formatDateRange(trip.startDate, trip.endDate)}</span>
				</div>

				{/* Destination */}
				{trip.destination && (
					<div className="flex items-center gap-2 text-sm text-muted-foreground">
						<MapPin className="size-4 text-primary" />
						<span className="line-clamp-1">{trip.destination}</span>
					</div>
				)}

				{/* Budget */}
				{trip.budget && (
					<div className="flex items-center gap-2 text-sm text-muted-foreground">
						<DollarSign className="size-4 text-primary" />
						<span>{trip.budget}</span>
					</div>
				)}

				{/* Description Preview */}
				{trip.description && (
					<p className="text-sm text-muted-foreground line-clamp-2 pt-2 border-t border-border/50">
						{trip.description}
					</p>
				)}
			</div>

			{/* Hover Overlay Indicator */}
			<div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-primary to-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
		</motion.div>
	);
}
