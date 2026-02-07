import { Link, useParams, useNavigate } from "@tanstack/react-router";
import { useSuspenseQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
	ArrowLeft,
	Calendar,
	MapPin,
	DollarSign,
	Clock,
	Edit,
	Trash2,
	Share2,
	Loader2,
	Globe,
	Users,
	Plane
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { tripsApi } from "../api/trips-api";
import { tripQueryOptions, tripsQueryOptions } from "../queries/trips-queries";
import { motion, type Variants } from "framer-motion";
import {
	formatDate,
	formatDateRange,
	calculateDuration,
	getStatusConfig,
} from "../utils/trip-utils";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { useTranslateError } from "@/hooks/use-translate-error";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

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
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const { translateError } = useTranslateError();
	const params = useParams({ from: "/_layout/trips/$tripId" });
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

	const { data: trip } = useSuspenseQuery(tripQueryOptions(params.tripId));

	const deleteTripMutation = useMutation({
		mutationFn: (id: string) => tripsApi.delete(id),
		onSuccess: () => {
			toast.success(t("Trip deleted successfully"));
			queryClient.invalidateQueries({ queryKey: tripsQueryOptions.queryKey });
			navigate({ to: "/trips" });
		},
		onError: (error) => {
			toast.error(translateError(error.message));
		}
	});

	const handleDelete = () => {
		deleteTripMutation.mutate(trip.id);
	};

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
			className="min-h-screen bg-background pb-20"
		>
			{/* Hero Section with Cover Image */}
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

				{/* Navigation Bar */}
				<div className="absolute top-0 left-0 right-0 p-4 lg:p-6 flex justify-between items-start z-10">
					<Link to="/trips">
						<Button
							variant="ghost"
							size="sm"
							className="bg-black/20 backdrop-blur-md hover:bg-black/40 text-white border border-white/10 rounded-full gap-2 pl-2 pr-4 transition-all hover:scale-105"
						>
							<div className="bg-white/20 p-1 rounded-full">
								<ArrowLeft className="size-4" />
							</div>
							{t("trips.create.back_button")}
						</Button>
					</Link>

					<div className="flex gap-2">
						<Button
							variant="ghost"
							size="icon"
							className="bg-black/30 backdrop-blur-md hover:bg-sky-500 text-white/80 hover:text-white border border-white/20 hover:border-sky-400 rounded-full transition-all duration-200 hover:scale-110 hover:shadow-lg hover:shadow-sky-500/30"
							onClick={() => toast.info("Sharing coming soon!")}
						>
							<Share2 className="size-4" />
						</Button>

						<Link to={`/trips/${trip.id}/edit` as any}>
							<Button
								variant="ghost"
								size="icon"
								className="bg-black/30 backdrop-blur-md hover:bg-amber-500 text-white/80 hover:text-white border border-white/20 hover:border-amber-400 rounded-full transition-all duration-200 hover:scale-110 hover:shadow-lg hover:shadow-amber-500/30"
							>
								<Edit className="size-4" />
							</Button>
						</Link>

						<AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
							<AlertDialogTrigger asChild>
								<Button
									variant="ghost"
									size="icon"
									className="bg-black/30 backdrop-blur-md hover:bg-rose-500 text-white/80 hover:text-white border border-white/20 hover:border-rose-400 rounded-full transition-all duration-200 hover:scale-110 hover:shadow-lg hover:shadow-rose-500/30"
								>
									<Trash2 className="size-4" />
								</Button>
							</AlertDialogTrigger>
							<AlertDialogContent>
								<AlertDialogHeader>
									<AlertDialogTitle>Are you sure?</AlertDialogTitle>
									<AlertDialogDescription>
										This action cannot be undone. This will permanently delete your trip
										and remove your data from our servers.
									</AlertDialogDescription>
								</AlertDialogHeader>
								<AlertDialogFooter>
									<AlertDialogCancel>Cancel</AlertDialogCancel>
									<AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
										{deleteTripMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Delete"}
									</AlertDialogAction>
								</AlertDialogFooter>
							</AlertDialogContent>
						</AlertDialog>
					</div>
				</div>

				{/* Title & Metadata Overlay */}
				<div className="absolute bottom-0 left-0 right-0 p-6 lg:px-12 lg:pb-8">
					<div className="max-w-7xl mx-auto w-full">
						<div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
							<div className="space-y-3 max-w-3xl">
								<div className="flex flex-wrap items-center gap-2">
									<span
										className={cn(
											"inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider backdrop-blur-md border border-white/10 shadow-sm",
											statusConfig.className.replace("bg-", "bg-opacity-80 bg-").replace("border-", "border-opacity-50 border-")
										)}
									>
										<div className={cn("size-1.5 rounded-full animate-pulse",
											trip.status === 'active' ? "bg-emerald-400" :
												trip.status === 'completed' ? "bg-blue-400" : "bg-gray-400"
										)} />
										{statusConfig.label}
									</span>

									{trip.destinationType && trip.destinationType !== 'unknown' && (
										<span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/40 text-white backdrop-blur-md border border-white/10 text-[11px] font-bold uppercase tracking-wider shadow-sm">
											<Globe className="size-3" />
											{t(`trips.destination_types.${trip.destinationType}`, { defaultValue: trip.destinationType })}
										</span>
									)}
								</div>

								<h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight drop-shadow-lg leading-tight">
									{trip.title}
								</h1>

								{trip.destination && (
									<div className="flex items-center gap-2 text-white/90 text-base font-medium drop-shadow-md">
										<MapPin className="size-4 text-emerald-400" />
										<span>{trip.destination}</span>
									</div>
								)}
							</div>

							{/* Author/Collaborators Placeholder */}
							<div className="hidden md:flex items-center gap-3 bg-black/30 backdrop-blur-md rounded-full px-4 py-2 border border-white/10">
								<div className="flex -space-x-2">
									<div className="size-8 rounded-full border-2 border-white/20 bg-white/20 flex items-center justify-center text-[10px] font-bold text-white" title="You">
										ME
									</div>
									<div className="size-8 rounded-full border-2 border-white/20 bg-white/10 flex items-center justify-center text-xs text-white/70 hover:bg-white/20 transition-colors cursor-pointer">
										+
									</div>
								</div>
								<span className="text-xs text-white/70 font-medium">Members</span>
							</div>
						</div>
					</div>
				</div>
			</motion.div>

			{/* Main Content Layout */}
			<div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">

				{/* Stats Grid */}
				<motion.div
					variants={itemVariants}
					className="grid grid-cols-2 lg:grid-cols-4 gap-4 my-8"
				>
					{/* Date Card */}
					<div className="bg-card hover:bg-primary/5 transition-all duration-200 p-5 flex flex-col items-center text-center justify-center group rounded-xl border border-border/50 shadow-sm">
						<div className="mb-3 p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
							<Calendar className="size-5 text-primary" />
						</div>
						<span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
							{t("trips.detail.travel_dates", "Travel Dates")}
						</span>
						<p className="font-bold text-foreground text-sm">
							{formatDateRange(trip.startDate, trip.endDate)}
						</p>
					</div>

					{/* Duration Card */}
					<div className="bg-card hover:bg-primary/5 transition-all duration-200 p-5 flex flex-col items-center text-center justify-center group rounded-xl border border-border/50 shadow-sm">
						<div className="mb-3 p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
							<Clock className="size-5 text-primary" />
						</div>
						<span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
							{t("trips.detail.duration", "Duration")}
						</span>
						<p className="font-bold text-foreground text-sm">
							{duration} {duration === 1 ? t("trips.detail.day", "Day") : t("trips.detail.days", "Days")}
						</p>
					</div>

					{/* Destination/Type Card */}
					<div className="bg-card hover:bg-primary/5 transition-all duration-200 p-5 flex flex-col items-center text-center justify-center group rounded-xl border border-border/50 shadow-sm">
						<div className="mb-3 p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
							<Plane className="size-5 text-primary" />
						</div>
						<span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
							{t("trips.detail.type")}
						</span>
						<p className="font-bold text-foreground text-sm">
							{trip.destinationType && trip.destinationType !== 'unknown'
								? t(`trips.destination_types.${trip.destinationType}`, { defaultValue: trip.destinationType })
								: t("trips.detail.trip")}
						</p>
					</div>

					{/* Budget Card */}
					<div className="bg-card hover:bg-primary/5 transition-all duration-200 p-5 flex flex-col items-center text-center justify-center group rounded-xl border border-border/50 shadow-sm">
						<div className="mb-3 p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
							<DollarSign className="size-5 text-primary" />
						</div>
						<span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
							{t("trips.detail.budget", "Budget")}
						</span>
						<p className="font-bold text-foreground text-sm">
							{trip.budget ? `${trip.currency || 'USD'} ${trip.budget.toLocaleString()}` : "-"}
						</p>
					</div>
				</motion.div>

				{/* Two Column Layout for Details */}
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
					{/* Left Column - Main Details */}
					<div className="lg:col-span-2 space-y-12">
						{/* Description Section */}
						<motion.div variants={itemVariants} className="space-y-4">
							<h2 className="text-2xl font-bold flex items-center gap-2">
								About this trip
							</h2>
							<div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
								{trip.description ? (
									<p className="whitespace-pre-wrap">{trip.description}</p>
								) : (
									<div className="italic text-muted-foreground/60 p-6 bg-muted/20 rounded-xl border border-dashed border-border text-center">
										No description provided yet.
									</div>
								)}
							</div>
						</motion.div>

						{/* Itinerary Sections Placeholder */}
						<motion.div variants={itemVariants} className="space-y-6">
							<div className="flex items-center justify-between">
								<h2 className="text-2xl font-bold">Itinerary</h2>
								<Button variant="outline" size="sm" className="gap-2">
									<Plus className="size-4" />
									Add Activity
								</Button>
							</div>

							{/* Empty State for Itinerary */}
							<div className="bg-muted/20 border border-dashed border-border rounded-3xl p-12 text-center flex flex-col items-center justify-center space-y-4">
								<div className="bg-background p-4 rounded-full shadow-sm">
									<MapPin className="size-8 text-muted-foreground/50" />
								</div>
								<div className="space-y-1">
									<h3 className="text-lg font-semibold">No itinerary yet</h3>
									<p className="text-muted-foreground max-w-md mx-auto">
										Start planning your trip by adding daily activities, places to visit, and reservations.
									</p>
								</div>
								<Button className="rounded-full mt-2">
									Create Itinerary
								</Button>
							</div>
						</motion.div>
					</div>

					{/* Right Column - Sidebar */}
					<div className="space-y-8">
						{/* Map Placeholder */}
						<motion.div variants={itemVariants} className="bg-card rounded-3xl overflow-hidden border border-border shadow-sm">
							<div className="p-4 border-b border-border/50 font-semibold flex items-center gap-2">
								<MapPin className="size-4 text-primary" />
								Location
							</div>
							<div className="aspect-square bg-muted/50 relative flex items-center justify-center group overflow-hidden cursor-pointer">
								{/* Simulated Map background */}
								<div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/100.5018,13.7563,10,0/600x600@2x?access_token=YOUR_ACCESS_TOKEN')] bg-cover bg-center opacity-50 grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-110" />

								<div className="z-10 bg-background/80 backdrop-blur-sm p-4 rounded-2xl shadow-lg text-center transform transition-transform group-hover:scale-105">
									<MapPin className="size-8 text-primary mx-auto mb-2" />
									<p className="font-bold text-sm">View on Map</p>
								</div>
							</div>
						</motion.div>

						{/* Collaborators */}
						<motion.div variants={itemVariants} className="bg-card rounded-3xl p-6 border border-border shadow-sm space-y-4">
							<h3 className="font-semibold flex items-center gap-2">
								<Users className="size-4 text-primary" />
								Companions
							</h3>
							<div className="flex flex-wrap gap-2">
								<div className="flex items-center gap-3 p-2 pr-4 rounded-full bg-muted/50 border border-border/50">
									<div className="size-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
										ME
									</div>
									<span className="text-sm font-medium">You</span>
								</div>
								<Button variant="outline" size="sm" className="rounded-full h-12 px-4 border-dashed border-2">
									<Plus className="size-4 mr-2" />
									Invite
								</Button>
							</div>
						</motion.div>

						{/* Metadata */}
						<div className="pt-6 border-t border-border/50 text-xs text-muted-foreground space-y-2">
							<p className="flex justify-between">
								<span>Created</span>
								<span className="font-medium text-foreground">{formatDate(trip.createdAt)}</span>
							</p>
							{trip.updatedAt !== trip.createdAt && (
								<p className="flex justify-between">
									<span>Last Updated</span>
									<span className="font-medium text-foreground">{formatDate(trip.updatedAt)}</span>
								</p>
							)}
						</div>
					</div>
				</div>
			</div>
		</motion.div>
	);
}

// Helper icon component for Itinerary placeholder
function Plus({ className }: { className?: string }) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			className={className}
		>
			<path d="M5 12h14" />
			<path d="M12 5v14" />
		</svg>
	)
}
