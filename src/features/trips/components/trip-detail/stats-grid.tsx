import { motion } from "framer-motion";
import { Calendar, Clock, Plane, DollarSign } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useTripDetail } from "./trip-detail-context";
import { staggerContainer } from "@/lib/animations";
import { StatCard } from "@/components/common/stat-card";
import { calculateTripDuration } from "@/features/trips/utils/trip-duration";
import { formatTripDateRange } from "@/features/trips/utils/trip-formatter";

export function StatsGrid() {
	const { t } = useTranslation();
	const { trip } = useTripDetail();
	const duration = calculateTripDuration(trip.startDate, trip.endDate);

	const stats = [
		{
			icon: Calendar,
			label: t("trips.detail.travel_dates", "Travel Dates"),
			value: formatTripDateRange(trip.startDate, trip.endDate),
		},
		{
			icon: Clock,
			label: t("trips.detail.duration", "Duration"),
			value: `${duration} ${duration === 1 ? t("trips.detail.day", "Day") : t("trips.detail.days", "Days")}`,
		},
		{
			icon: Plane,
			label: t("trips.detail.type"),
			value:
				trip.destinationType && trip.destinationType !== "unknown"
					? t(`trips.destination_types.${trip.destinationType}`, {
							defaultValue: trip.destinationType,
						})
					: t("trips.detail.trip"),
		},
		{
			icon: DollarSign,
			label: t("trips.detail.budget", "Budget"),
			value: trip.budget
				? `${trip.currency || "USD"} ${Number(trip.budget).toLocaleString()}`
				: "-",
		},
	];

	return (
		<motion.div
			variants={staggerContainer}
			initial="hidden"
			animate="show"
			className="grid grid-cols-2 lg:grid-cols-4 gap-4 my-8"
		>
			{stats.map((stat, index) => (
				<StatCard
					key={index}
					title={stat.label}
					value={stat.value}
					icon={stat.icon}
					variant="centered"
				/>
			))}
		</motion.div>
	);
}


