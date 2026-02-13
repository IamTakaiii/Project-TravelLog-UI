import { useNavigate } from "@tanstack/react-router";
import { MapPin, DollarSign, Plane } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Trip } from "../api/trips-api";
import { getStatusConfig } from "../utils/trip-status";


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
							{new Date(trip.startDate).toLocaleString("default", {
								month: "short",
							})}
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
							{trip.budget
								? `${trip.currency || "USD"} ${trip.budget}`
								: "No budget set"}
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
